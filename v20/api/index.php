<?php
declare(strict_types=1);

// Em public_html/impulso_capital/api/index.php, sobe 3 níveis para alcançar /home/usuario/impulso_core
$corePath = dirname(__DIR__, 3) . '/impulso_core';
require_once $corePath . '/bootstrap.php';

use App\Domain\Finance\LedgerService;
use App\Domain\Newsletter\FinancialNewsCuratorService;
use App\Domain\Security\AccessControlAndMarketService;
use App\Http\Controllers\AccountClosureAndReports;
use App\Http\Controllers\AdminMetricsController;
use App\Http\Controllers\AdminReportController;
use App\Http\Controllers\AuthLifecycleController;
use App\Http\Controllers\ClientBootstrapController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\PixController;
use App\Http\Controllers\ReportExportController;
use App\Http\Controllers\SiteCmsController;
use App\Http\Controllers\WithdrawalController;
use App\Http\Middleware\SecurityFirewallMiddleware;
use App\Infrastructure\Database;
use App\Infrastructure\Queue\AsyncJobQueue;

ini_set('display_errors', '0');
date_default_timezone_set($_ENV['APP_TIMEZONE'] ?? 'America/Sao_Paulo');

function sendJson(int $statusCode, array $data): never
{
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function getCookieBasePath(): string
{
    $basePath = rtrim((string)($_ENV['APP_BASE_PATH'] ?? '/impulso_capital'), '/');
    return $basePath !== '' ? $basePath . '/' : '/';
}

function authenticateJwtFromCookie(PDO $pdo): array
{
    $token = $_COOKIE['access_token'] ?? '';
    if ($token === '') {
        sendJson(401, ['error' => 'Autenticação obrigatória.']);
    }
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        sendJson(401, ['error' => 'Token inválido.']);
    }
    [$headerB64, $payloadB64, $sigB64] = $parts;
    $expectedSig = rtrim(strtr(base64_encode(
        hash_hmac('sha256', "{$headerB64}.{$payloadB64}", $_ENV['JWT_SECRET'], true)
    ), '+/', '-_'), '=');

    if (!hash_equals($expectedSig, $sigB64)) {
        sendJson(401, ['error' => 'Assinatura de sessão inválida.']);
    }
    $claims = json_decode((string)base64_decode(strtr($payloadB64, '-_', '+/'), true), true);
    if (!is_array($claims) || ($claims['exp'] ?? 0) < time() || empty($claims['uid'])) {
        sendJson(401, ['error' => 'Sessão expirada.']);
    }
    $stmt = $pdo->prepare('SELECT full_name, role, status FROM users WHERE id = :uid LIMIT 1');
    $stmt->execute([':uid' => (int)$claims['uid']]);
    $dbUser = $stmt->fetch();
    if (!$dbUser || $dbUser['status'] !== 'ATIVO') {
        sendJson(403, ['error' => 'Conta inativa ou revogada.']);
    }
    return ['uid' => (int)$claims['uid'], 'role' => $dbUser['role'], 'name' => $dbUser['full_name']];
}

function assertRole(string $currentRole, array $allowedRoles): void
{
    if (!in_array($currentRole, $allowedRoles, true)) {
        sendJson(403, ['error' => 'Acesso negado: privilégios insuficientes.']);
    }
}

function requireIdempotencyKey(): string
{
    $key = trim($_SERVER['HTTP_IDEMPOTENCY_KEY'] ?? '');
    if (!preg_match('/^[a-zA-Z0-9\-_]{16,128}$/', $key)) {
        sendJson(400, ['error' => 'Cabeçalho Idempotency-Key obrigatório.']);
    }
    return $key;
}

function validateRequestOrigin(): void
{
    $allowedOrigin = rtrim((string)($_ENV['APP_ORIGIN'] ?? 'https://agenciabola.com'), '/');
    $origin        = rtrim($_SERVER['HTTP_ORIGIN'] ?? '', '/');

    if ($origin !== '' && !hash_equals($allowedOrigin, $origin)) {
        sendJson(403, ['error' => 'Origem da requisição bloqueada pela política anti-CSRF.']);
    }
}

try {
    $pdo      = Database::getConnection();
    $firewall = new SecurityFirewallMiddleware($pdo);
    $firewall->enforcePerimeterSecurity();

    $method   = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
    $rawPath  = rtrim((string)parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/') ?: '/';

    // Remove o prefixo /impulso_capital da URI para manter todas as rotas /api/v1/* limpas
    $basePrefix = rtrim((string)($_ENV['APP_BASE_PATH'] ?? '/impulso_capital'), '/');
    if ($basePrefix !== '' && str_starts_with($rawPath, $basePrefix)) {
        $path = substr($rawPath, strlen($basePrefix)) ?: '/';
    } else {
        $path = $rawPath;
    }

    if (in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'], true) && !str_starts_with($path, '/api/v1/webhooks/')) {
        validateRequestOrigin();
    }

    $clientIp = $firewall->getClientIp();

    $rawBody = file_get_contents('php://input') ?: '';
    if (strlen($rawBody) > 262144) {
        sendJson(413, ['error' => 'Payload excede 256 KB.']);
    }
    $payload = ($rawBody !== '' && in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'], true))
        ? (json_decode($rawBody, true) ?? [])
        : [];

    $ledgerService = new LedgerService($pdo);
    $jobQueue      = new AsyncJobQueue($pdo);

    // Rotas Públicas
    if ($method === 'GET' && $path === '/api/v1/public/site-content') {
        sendJson(200, (new SiteCmsController($pdo))->getPublishedContent());
    }
    if ($method === 'GET' && $path === '/api/v1/public/contact/challenge') {
        sendJson(200, (new ContactController($pdo))->issueFormChallenge());
    }
    if ($method === 'POST' && $path === '/api/v1/public/contact') {
        sendJson(200, (new ContactController($pdo, $jobQueue))->submitContactForm($payload, $clientIp));
    }
    if ($method === 'GET' && $path === '/api/v1/public/newsletter/unsubscribe') {
        sendJson(200, (new NewsletterController($pdo, $jobQueue))->unsubscribeClient((string)($_GET['uid'] ?? ''), (string)($_GET['sig'] ?? '')));
    }
    if ($method === 'POST' && $path === '/api/v1/auth/register') {
        sendJson(201, (new AuthLifecycleController($pdo, $jobQueue))->registerClient($payload));
    }
    if ($method === 'GET' && $path === '/api/v1/auth/activate') {
        sendJson(200, (new AuthLifecycleController($pdo, $jobQueue))->activateAccount((string)($_GET['token'] ?? '')));
    }
    if ($method === 'POST' && $path === '/api/v1/auth/reactivate') {
        sendJson(200, (new AuthLifecycleController($pdo, $jobQueue))->reactivateExistingAccount($payload));
    }
    if ($method === 'POST' && $path === '/api/v1/auth/login') {
        sendJson(200, (new AuthLifecycleController($pdo, $jobQueue))->login($payload, $clientIp));
    }
    if ($method === 'POST' && $path === '/api/v1/auth/logout') {
        setcookie('access_token', '', [
            'expires'  => time() - 3600,
            'path'     => getCookieBasePath(),
            'secure'   => true,
            'httponly' => true,
            'samesite' => 'Strict'
        ]);
        sendJson(200, ['authenticated' => false, 'message' => 'Sessão encerrada com segurança.']);
    }
    if ($method === 'POST' && $path === '/api/v1/webhooks/pix') {
        $sig = $_SERVER['HTTP_X_WEBHOOK_SIGNATURE'] ?? '';
        sendJson(200, (new PixController($pdo, $ledgerService, $jobQueue))->handlePixWebhook($rawBody, $sig));
    }

    // Autenticação JWT obrigatória
    $authUser = authenticateJwtFromCookie($pdo);
    $userId   = (int)$authUser['uid'];
    $userRole = (string)$authUser['role'];

    // Rotas do Cliente
    if ($method === 'GET' && $path === '/api/v1/client/bootstrap') {
        assertRole($userRole, ['CLIENT']);
        $data = (new ClientBootstrapController($pdo))->getBootstrapPayload($userId, $_SERVER['HTTP_IF_NONE_MATCH'] ?? null);
        $data['usd_daily_quote'] = (new AccessControlAndMarketService($pdo))->getUsdBrlRate3Hours();
        sendJson(200, $data);
    }
    if ($method === 'PATCH' && $path === '/api/v1/client/profile') {
        assertRole($userRole, ['CLIENT']);
        sendJson(200, (new DashboardController($pdo))->updateProfile($userId, $payload));
    }
    if ($method === 'POST' && $path === '/api/v1/client/investments/pix') {
        assertRole($userRole, ['CLIENT']);
        sendJson(201, (new PixController($pdo, $ledgerService, $jobQueue))->createPixCharge($userId, requireIdempotencyKey(), $payload));
    }
    if ($method === 'POST' && $path === '/api/v1/client/withdrawals') {
        assertRole($userRole, ['CLIENT']);
        sendJson(201, (new WithdrawalController($pdo, $ledgerService, $jobQueue))->requestWithdrawal($userId, requireIdempotencyKey(), $payload));
    }
    if ($method === 'POST' && $path === '/api/v1/client/account/request-closure-otp') {
        assertRole($userRole, ['CLIENT']);
        sendJson(200, (new AccountClosureAndReports($pdo, $ledgerService, $jobQueue))->sendClosureOtpWhatsApp($userId));
    }
    if ($method === 'POST' && $path === '/api/v1/client/account/confirm-closure') {
        assertRole($userRole, ['CLIENT']);
        sendJson(200, (new AccountClosureAndReports($pdo, $ledgerService, $jobQueue))->confirmClientClosure($userId, (string)($payload['otp'] ?? '')));
    }

    // Rotas Administrativas (ADMIN + ACCOUNT_MANAGER)
    if ($method === 'GET' && $path === '/api/v1/admin/dashboard') {
        assertRole($userRole, ['ADMIN', 'ACCOUNT_MANAGER']);
        sendJson(200, array_merge(
            (new AdminReportController($pdo))->getExecutiveReport(),
            (new AdminMetricsController($pdo))->getFastAnalytics()
        ));
    }
    if ($method === 'GET' && $path === '/api/v1/admin/clients') {
        assertRole($userRole, ['ADMIN', 'ACCOUNT_MANAGER']);
        sendJson(200, (new AdminReportController($pdo))->listClients($_GET));
    }
    if ($method === 'GET' && preg_match('#^/api/v1/admin/reports/(investments|withdrawals)/export$#', $path, $m)) {
        assertRole($userRole, ['ADMIN', 'ACCOUNT_MANAGER']);
        (new ReportExportController($pdo))->exportReport($userId, $userRole, $authUser['name'], $m[1], (string)($_GET['format'] ?? 'csv'), $clientIp);
    }

    // Rotas Exclusivas Administrador Geral (ADMIN)
    if ($method === 'GET' && $path === '/api/v1/admin/reports/access') {
        assertRole($userRole, ['ADMIN']);
        sendJson(200, (new AccountClosureAndReports($pdo, $ledgerService, $jobQueue))->getSecurityAccessReport());
    }
    if ($method === 'DELETE' && preg_match('#^/api/v1/admin/clients/([a-f0-9\-]{36})$#i', $path, $m)) {
        assertRole($userRole, ['ADMIN']);
        sendJson(200, (new AccountClosureAndReports($pdo, $ledgerService, $jobQueue))->adminDeactivateClient($m[1]));
    }
    if ($method === 'PUT' && preg_match('#^/api/v1/admin/site-content/([A-Z_]+)$#i', $path, $m)) {
        assertRole($userRole, ['ADMIN']);
        sendJson(200, (new SiteCmsController($pdo))->updateSection($userId, $m[1], $payload, $clientIp));
    }
    if ($method === 'GET' && $path === '/api/v1/admin/newsletter/auto-curate') {
        assertRole($userRole, ['ADMIN']);
        sendJson(200, (new FinancialNewsCuratorService($pdo))->buildPreFilledNewsletterDraft($userId));
    }
    if ($method === 'PUT' && $path === '/api/v1/admin/newsletter/publish') {
        assertRole($userRole, ['ADMIN']);
        sendJson(200, (new NewsletterController($pdo, $jobQueue))->saveAndPublishNewsletter($userId, $payload));
    }

    sendJson(404, ['error' => 'Endpoint não encontrado.']);
} catch (Throwable $e) {
    error_log('[IMPULSO_API_FATAL] ' . $e->getMessage());
    sendJson(500, ['error' => 'Erro interno no servidor.']);
}

window.IMPULSO_CONFIG = {
  appUrl: 'https://agenciabola.com/impulso_capital',
  apiBaseUrl: '/impulso_capital/api/v1'
};

const ROLE_LABELS_PT = {
  CLIENT: 'Cliente',
  ACCOUNT_MANAGER: 'Gerente de Contas',
  ADMIN: 'Administrador'
};
const ROLE_LABELS_EN = {
  CLIENT: 'Client',
  ACCOUNT_MANAGER: 'Account Manager',
  ADMIN: 'Administrator'
};

function getRoleLabel(roleCode) {
  return currentLang === 'en'
    ? (ROLE_LABELS_EN[roleCode] || roleCode)
    : (ROLE_LABELS_PT[roleCode] || roleCode);
}

function setFaviconUrl(url) {
  const link = document.getElementById('dynamic-favicon');
  const prevImg = document.getElementById('cms-favicon-preview-img');
  if (link) link.href = url;
  if (prevImg) prevImg.src = url;
}

function updateFavicon(badgeText = 'IC', imgUrl = '') {
  if (imgUrl) {
    setFaviconUrl(imgUrl);
    return;
  }
  const cleanBadge = (badgeText || 'IC').slice(0, 3).replace(/[<>&"]/g, '');
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='10' fill='%23242424'/><rect x='3' y='3' width='58' height='58' rx='8' fill='none' stroke='%23D4AF37' stroke-width='2.5'/><text x='32' y='41' text-anchor='middle' font-family='Georgia, serif' font-weight='700' font-size='26' fill='%23D4AF37'>${cleanBadge}</text></svg>`;
  setFaviconUrl('data:image/svg+xml,' + encodeURIComponent(svg));
}

function startDollarRandomEffects() {
  const el = document.getElementById('animated-dollar-sign');
  if (!el) return;
  setInterval(() => {
    const dx = Math.round((Math.random() - 0.5) * 14);
    const dy = Math.round((Math.random() - 0.5) * 14);
    const scale = (0.94 + Math.random() * 0.16).toFixed(2);
    const rot = Math.round((Math.random() - 0.5) * 18);
    const bright = (0.95 + Math.random() * 0.45).toFixed(2);
    el.style.setProperty('--quirk-transform', `translate(${dx}px, ${dy}px) scale(${scale}) rotate(${rot}deg)`);
    el.style.setProperty('--quirk-filter', `brightness(${bright})`);
  }, 1100);
}

let currentLang = localStorage.getItem('impulso_lang') || 'pt';

const TRANSLATIONS = {
  pt: {
    lbl_language: 'Idioma', menu_nav_title: 'Navegação Institucional',
    nav_home: 'Início', nav_about: 'Quem Somos', nav_offer: 'O Que Oferecemos', nav_invest: 'Invista Agora', nav_contact: 'Contato',
    menu_client_title: 'Painel do Investidor', ctab_overview: 'Visão Geral & Extrato', ctab_deposit: 'Investir via Pix', ctab_withdraw: 'Solicitar Saque', ctab_profile: 'Meus Dados & Encerramento',
    menu_manager_title: 'Gerência de Contas', mtab_clients: 'Clientes', menu_admin_title: 'Administração Geral',
    atab_overview: 'Dashboard', atab_users: 'Usuários (Administrador / Gerente de Contas / Cliente)', atab_reports: 'Relatórios Auditados (CSV/PDF)',
    atab_security: 'Segurança & Acessos', atab_cms: 'Personalizar Site & Newsletter', btn_back_site: 'Ver Site Institucional',
    btn_login: 'Entrar', btn_register: 'Abrir Conta', btn_my_panel: 'Meu Painel', btn_logout: 'Sair',
    hero_badge: 'Rendimento Diário de 1% ao Dia • Liquidez via Pix',
    hero_title: 'Gestão Inteligente de Capital com <span class="shiny-gold-text">Rentabilidade Diária</span>',
    hero_subtitle: 'A <strong>Impulso Capital</strong> oferece uma estrutura transparente, auditável e automatizada para multiplicar seus recursos com apuração diária às 23:59 e liquidação imediata via Pix.',
    hero_cta: 'Começar a Investir Agora', hero_secondary: 'Conhecer Diferenciais',
    stat_daily_card: 'Rendimento ao dia', stat_min_card: 'Aporte mínimo', stat_time_card: 'Crédito diário automático',
    dollar_badge: 'Liquidez & Rentabilidade Auditada', dollar_sub: 'Apuração diária às 23:59 com liquidação imediata via Pix.',
    sim_title: 'Simulador de Investimento', sim_sub: 'Projeção baseada na taxa fixa de 1% ao dia', sim_amount_lbl: 'Valor do Aporte (R$)',
    sim_days_lbl: 'Período em Dias:', sim_daily_lbl: 'Rendimento Diário (1%):',
    sim_profit_lbl: 'Lucro Acumulado no Período:', sim_total_lbl: 'Total Disponível ao Final:', sim_cta: 'Aportar com Pix Agora',
    about_kicker: 'Institucional', about_title: 'Quem Somos',
    about_desc: 'A <strong>Impulso Capital</strong> nasceu com o propósito de democratizar operações estruturadas de alta liquidez, unindo governança rigorosa, criptografia de padrão bancário e acompanhamento transparente em tempo real para cada investidor.',
    about_c1_t: 'Governança & Auditoria', about_c1_d: 'Cada movimentação é registrada em livro-razão imutável com rastreabilidade completa de aportes, rendimentos diários e liquidações Pix.',
    about_c2_t: 'Proteção LGPD Total', about_c2_d: 'Dados sensíveis como CPF e chaves Pix são protegidos com criptografia AES-256-GCM e controle estrito de acesso por perfil.',
    about_c3_t: 'Atendimento Dedicado', about_c3_d: 'Suporte direto por Gerentes de Contas e relatórios semanais automatizados no WhatsApp toda sexta-feira.',
    offer_kicker: 'Soluções Financeiras', offer_title: 'O Que Oferecemos',
    offer_desc: 'Estrutura completa para você investir sem burocracia, acompanhar seus ganhos todos os dias e resgatar via Pix sempre que desejar.',
    offer_c1_t: 'Rentabilidade de 1% ao Dia', offer_c1_d: 'Todo capital aportado e confirmado gera 1% de rendimento diário creditado automaticamente às 23:59 no seu painel.',
    offer_c2_t: 'Saques Flexíveis & Automáticos', offer_c2_d: 'Saque apenas seus rendimentos acumulados, resgate o valor total a qualquer momento ou receba automaticamente no último dia útil do mês.',
    offer_c3_t: 'Briefing Semanal de Mercado', offer_c3_d: 'Receba toda segunda-feira às 06:00 nossa curadoria exclusiva com Ibovespa, Selic, juros BACEN, dólar e as 5 principais notícias financeiras.',
    invest_kicker: 'Acesso Imediato', invest_title: 'Invista Agora na Impulso Capital',
    invest_desc: 'Abra sua conta em menos de 2 minutos, ative seu cadastro pelo link enviado ao seu e-mail e realize seu primeiro aporte a partir de 20 USDT via Pix.',
    invest_cta1: 'Criar Minha Conta de Investidor', invest_cta2: 'Já Tenho Conta (Acessar Painel)',
    contact_kicker: 'Fale Conosco', contact_title: 'Atendimento & Suporte',
    contact_desc: 'Dúvidas sobre aportes, prazos de liquidação ou gestão patrimonial? Envie sua mensagem diretamente para nossa equipe administrativa e gerência de contas.',
    contact_info_email: 'E-mail Institucional:', contact_info_pix: 'Horário de Liquidação:', contact_info_yield: 'Apuração de Rendimentos:',
    lbl_fullname: 'Nome Completo *', lbl_email: 'E-mail *', lbl_subject: 'Assunto *', lbl_message: 'Mensagem *', btn_send_msg: 'Enviar Mensagem',
    lbl_hello: 'Olá,', usd_quote_title: 'Dólar do Dia (Atualiza 3h)', btn_sim_2359: 'Simular Virada 23:59 (+1%)', btn_sim_friday: 'Simular Sexta WhatsApp',
    card_inv_month: 'Total Investido no Mês', card_last_dep: 'Último aporte:', card_daily_yld: 'Rendimento do Dia (1%)', card_daily_sub: 'Crédito automático às 23:59',
    card_accum_yld: 'Rendimentos Acumulados', card_accum_sub: 'Disponível para saque imediato', card_tot_wd: 'Total Disponível p/ Saque', card_cap_lbl: 'Capital:',
    chart_client_title: 'Frequência Diária de Investimentos', chart_client_sub: 'Evolução de aportes e saldo ao longo dos dias',
    timeline_title: 'Linha do Tempo Financeira', timeline_sub: 'Histórico auditável de aportes, rendimentos 23:59 e saques',
    dep_title: 'Novo Aporte via Pix', dep_sub: 'Valor mínimo equivalente a 20 USDT na cotação atual.', btn_gen_pix: 'Gerar QR Code Pix',
    pix_generated: 'Pix Copia e Cola Gerado', btn_confirm_pix: 'Simular Pagamento Pix Confirmado',
    wd_title: 'Solicitar Saque via Pix', wd_sub: 'Saque apenas seus rendimentos acumulados ou resgate o saldo total.',
    wd_mode_lbl: 'Modalidade de Saque', wd_opt_yield: 'Somente Rendimentos Acumulados', wd_opt_full: 'Saque Total (Capital Principal + Rendimentos)', wd_opt_custom: 'Valor Personalizado',
    wd_amount_lbl: 'Valor do Saque (R$)', btn_confirm_wd: 'Confirmar Solicitação de Saque Pix',
    prof_title: 'Meus Dados Cadastrais', lbl_cpf_locked: 'CPF (Bloqueado para edição)', lbl_pix_key: 'Chave Pix para Recebimento',
    lbl_news_opt: 'Receber Newsletter semanal do mercado financeiro (Segundas às 06:00)', btn_save_prof: 'Salvar Alterações',
    close_title: 'Encerramento de Conta (LGPD)', close_desc: 'Ao encerrar sua conta, todo o seu saldo disponível é transferido via Pix para sua chave cadastrada e seu acesso torna-se INATIVO. Exige código OTP de 4 dígitos enviado no seu WhatsApp.',
    btn_req_otp: 'Solicitar Código OTP no WhatsApp', otp_sent_hint: 'Código enviado para seu WhatsApp (Simulação:', btn_confirm_close: 'Confirmar Encerramento',
    admin_exec_title: 'Gestão Executiva — Impulso Capital', adm_kpi1: 'Total Aportado (Mês)', adm_kpi2: 'Rendimentos Distribuídos', adm_kpi3: 'Total Sacado no Mês', adm_kpi4: 'Total a Sacar (Passivo Ativo)',
    adm_line_title: 'Investimentos & Rentabilidade ao Longo do Tempo', adm_line_sub: 'Linha Dourada: Aportes | Linha Verde: Rentabilidade',
    adm_pie_title: 'Liquidez Mensal (Pizza)', adm_pie_sub: 'Total Sacado no Mês vs. Total a Sacar', pie_leg1: 'Sacado no Mês', pie_leg2: 'Total a Sacar',
    adm_new_user_title: 'Cadastrar Novo Usuário', btn_create_user_manual: 'Cadastrar & Enviar Manual', adm_users_list_title: 'Base de Usuários Cadastrados',
    th_name: 'Nome', th_role: 'Tipo de Usuário', th_contact: 'E-mail / WhatsApp', th_balance: 'Saldo Total', th_actions: 'Ações',
    rep_area_title: 'Relatórios Auditados', rep_area_sub: 'Clique sobre qualquer relatório para visualizar os detalhes e exportar em CSV ou PDF.',
    rep_click_view: 'Clique para abrir e exportar (CSV / PDF) →',
    rep_inv_title: 'Relatório de Investimentos (Aportes Pix)', rep_wd_title: 'Relatório de Saques Solicitados e Liquidados', rep_yld_title: 'Relatório de Rendimentos Diários (1% • 23:59)',
    sec_title: 'Relatório de Tentativas de Acesso & Bloqueios', sec_sub: 'Monitoramento de tentativas falhas, bloqueios de 30 minutos e geolocalização de IP',
    th_datetime: 'Data/Hora', th_identifier: 'Identificador', th_location: 'Localização', th_result: 'Resultado',
    footer_copy: '© 2026 Impulso Capital. Todos os direitos reservados. Conformidade LGPD (Lei nº 13.709/2018).',
    footer_terms: 'Termos de Serviço', footer_cookies: 'Preferências de Cookies (LGPD)',
    lgpd_banner_text: '<strong class="text-[#F0B90B]">Privacidade & Conformidade LGPD:</strong> Este site segue rigorosamente as diretrizes da Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e utiliza cookies essenciais de segurança e sessão para garantir a integridade das suas operações financeiras.',
    btn_reject_cookies: 'Rejeitar Cookies', btn_accept_cookies: 'Concordar com Cookies',
    auth_tab_login: 'Entrar no Sistema', auth_tab_register: 'Cadastrar Novo Cliente', login_id_lbl: 'CPF (Cliente) ou E-mail (Administrador / Gerente de Contas)',
    login_pass_lbl: 'Senha de 6 Dígitos', btn_access_account: 'Acessar Conta', quick_demo_lbl: 'Acesso Rápido de Demonstração (3 Perfis):',
    demo_client: 'Cliente', demo_manager: 'Gerente de Contas', demo_admin: 'Administrador', lbl_pix_short: 'Chave Pix *', lbl_strong_pass: 'Senha Forte (6 dígitos) *',
    reg_news_check: 'Concordo em receber notícias e boletins semanais do setor financeiro no meu e-mail (toda segunda-feira às 06:00).',
    reg_terms_pre: 'Li e concordo integralmente com os', btn_finish_reg: 'Finalizar Cadastro & Receber Manual PDF',
    terms_modal_title: 'Termos de Serviço — Impulso Capital',
    terms_modal_body: '<p><strong class="text-[#EAECEF]">1. Objeto e Elegibilidade:</strong> A plataforma Impulso Capital destina-se a pessoas físicas maiores de 18 anos com CPF regularizado no Brasil, mediante ativação cadastral confirmada por e-mail.</p><p><strong class="text-[#EAECEF]">2. Aportes e Piso Mínimo:</strong> Os investimentos são realizados exclusivamente via Pix com valor mínimo equivalente a 20 USDT na cotação vigente no momento da geração da cobrança.</p><p><strong class="text-[#EAECEF]">3. Rentabilidade Diária (1% ao dia):</strong> Os aportes confirmados passam a render 1,00% ao dia sobre o capital principal ativo, com apuração e crédito automático realizados diariamente às 23:59 (Horário de Brasília).</p><p><strong class="text-[#EAECEF]">4. Resgates e Liquidação Mensal:</strong> O investidor pode solicitar o saque parcial (rendimentos acumulados) ou total (principal + rendimentos) via Pix. No último dia útil de cada mês, o saldo total disponível é liquidado automaticamente para a chave Pix cadastrada.</p><p><strong class="text-[#EAECEF]">5. Privacidade e LGPD:</strong> Em conformidade com a Lei nº 13.709/2018, dados pessoais sensíveis são armazenados com criptografia AES-256-GCM e jamais são comercializados a terceiros.</p><p><strong class="text-[#EAECEF]">6. Encerramento de Conta:</strong> O titular pode encerrar sua conta a qualquer momento mediante validação de código OTP de 4 dígitos enviado ao seu WhatsApp cadastrado, recebendo integralmente seu saldo residual via Pix.</p>',
    btn_close: 'Fechar', btn_accept_terms: 'Li e Aceito os Termos'
  },
  en: {
    lbl_language: 'Language', menu_nav_title: 'Institutional Navigation',
    nav_home: 'Home', nav_about: 'About Us', nav_offer: 'What We Offer', nav_invest: 'Invest Now', nav_contact: 'Contact',
    menu_client_title: 'Investor Dashboard', ctab_overview: 'Overview & Statement', ctab_deposit: 'Invest via Pix', ctab_withdraw: 'Request Withdrawal', ctab_profile: 'My Profile & Closure',
    menu_manager_title: 'Account Management', mtab_clients: 'Clients', menu_admin_title: 'General Administration',
    atab_overview: 'Dashboard', atab_users: 'Users (Administrator / Account Manager / Client)', atab_reports: 'Audited Reports (CSV/PDF)',
    atab_security: 'Security & Access Logs', atab_cms: 'Customize Site & Newsletter', btn_back_site: 'View Institutional Site',
    btn_login: 'Sign In', btn_register: 'Open Account', btn_my_panel: 'My Dashboard', btn_logout: 'Log Out',
    hero_badge: '1% Daily Fixed Return • Instant Pix Liquidity',
    hero_title: 'Intelligent Wealth Management with <span class="shiny-gold-text">Daily Profitability</span>',
    hero_subtitle: '<strong>Impulso Capital</strong> delivers a transparent, auditable, and automated structure to multiply your capital with daily accrual at 23:59 and instant Pix settlement.',
    hero_cta: 'Start Investing Now', hero_secondary: 'Explore Advantages',
    stat_daily_card: 'Daily return', stat_min_card: 'Minimum deposit', stat_time_card: 'Automated daily credit',
    dollar_badge: 'Audited Liquidity & Return', dollar_sub: 'Daily accrual at 23:59 with instant Pix settlement.',
    sim_title: 'Investment Simulator', sim_sub: 'Projection based on the fixed 1% daily rate', sim_amount_lbl: 'Investment Amount (BRL)',
    sim_days_lbl: 'Period in Days:', sim_daily_lbl: 'Daily Return (1%):',
    sim_profit_lbl: 'Accumulated Profit in Period:', sim_total_lbl: 'Total Available at End:', sim_cta: 'Deposit via Pix Now',
    about_kicker: 'Institutional', about_title: 'About Us',
    about_desc: '<strong>Impulso Capital</strong> was founded to democratize high-liquidity structured operations, combining strict governance, bank-grade encryption, and real-time transparency for every investor.',
    about_c1_t: 'Governance & Audit', about_c1_d: 'Every transaction is recorded in an immutable financial ledger with full traceability of deposits, daily yields, and Pix payouts.',
    about_c2_t: 'Full LGPD Data Protection', about_c2_d: 'Sensitive data such as Tax ID (CPF) and Pix keys are encrypted with AES-256-GCM and strict role-based access control.',
    about_c3_t: 'Dedicated Support', about_c3_d: 'Direct assistance from Account Managers and automated weekly WhatsApp balance summaries every Friday.',
    offer_kicker: 'Financial Solutions', offer_title: 'What We Offer',
    offer_desc: 'Complete infrastructure to invest seamlessly, monitor your earnings daily, and withdraw via Pix whenever you wish.',
    offer_c1_t: '1% Daily Profitability', offer_c1_d: 'All confirmed principal capital generates 1% daily return credited automatically at 23:59 in your dashboard.',
    offer_c2_t: 'Flexible & Automated Withdrawals', offer_c2_d: 'Withdraw only your accumulated yields, redeem your full balance anytime, or receive automatic payouts on the last business day of the month.',
    offer_c3_t: 'Weekly Market Briefing', offer_c3_d: 'Receive our exclusive market curation every Monday at 06:00 AM covering Ibovespa, Selic, Central Bank rates, USD, and top 5 financial news.',
    invest_kicker: 'Immediate Access', invest_title: 'Invest Now with Impulso Capital',
    invest_desc: 'Open your account in under 2 minutes, activate your profile via email, and make your first deposit starting at 20 USDT via Pix.',
    invest_cta1: 'Create My Investor Account', invest_cta2: 'Already Have an Account (Sign In)',
    contact_kicker: 'Get in Touch', contact_title: 'Customer Care & Support',
    contact_desc: 'Questions about deposits, settlement schedules, or wealth management? Send your message directly to our administrative and account management team.',
    contact_info_email: 'Institutional Email:', contact_info_pix: 'Settlement Hours:', contact_info_yield: 'Yield Accrual Time:',
    lbl_fullname: 'Full Name *', lbl_email: 'Email Address *', lbl_subject: 'Subject *', lbl_message: 'Message *', btn_send_msg: 'Send Message',
    lbl_hello: 'Hello,', usd_quote_title: 'Daily USD Quote (3h Refresh)', btn_sim_2359: 'Simulate 23:59 Closing (+1%)', btn_sim_friday: 'Simulate Friday WhatsApp',
    card_inv_month: 'Total Invested This Month', card_last_dep: 'Last deposit:', card_daily_yld: 'Today’s Yield (1%)', card_daily_sub: 'Automated credit at 23:59',
    card_accum_yld: 'Accumulated Yields', card_accum_sub: 'Available for immediate withdrawal', card_tot_wd: 'Total Available to Withdraw', card_cap_lbl: 'Principal:',
    chart_client_title: 'Daily Investment Frequency', chart_client_sub: 'Evolution of deposits and balance over time',
    timeline_title: 'Financial Timeline', timeline_sub: 'Auditable history of deposits, 23:59 yields, and withdrawals',
    dep_title: 'New Pix Deposit', dep_sub: 'Minimum amount equivalent to 20 USDT at current rate.', btn_gen_pix: 'Generate Pix QR Code',
    pix_generated: 'Pix Copy & Paste Code Generated', btn_confirm_pix: 'Simulate Confirmed Pix Payment',
    wd_title: 'Request Pix Withdrawal', wd_sub: 'Withdraw accumulated yields only or redeem your entire balance.',
    wd_mode_lbl: 'Withdrawal Mode', wd_opt_yield: 'Accumulated Yields Only', wd_opt_full: 'Full Redemption (Principal + Yields)', wd_opt_custom: 'Custom Amount',
    wd_amount_lbl: 'Withdrawal Amount (BRL)', btn_confirm_wd: 'Confirm Pix Withdrawal Request',
    prof_title: 'My Profile Details', lbl_cpf_locked: 'Tax ID / CPF (Locked for editing)', lbl_pix_key: 'Pix Key for Payouts',
    lbl_news_opt: 'Receive weekly financial market Newsletter (Mondays at 06:00 AM)', btn_save_prof: 'Save Changes',
    close_title: 'Account Closure (LGPD)', close_desc: 'Closing your account transfers your entire remaining balance via Pix to your registered key and sets your status to INACTIVE. Requires 4-digit WhatsApp OTP verification.',
    btn_req_otp: 'Request 4-Digit WhatsApp OTP', otp_sent_hint: 'Code sent to your WhatsApp (Simulation:', btn_confirm_close: 'Confirm Account Closure',
    admin_exec_title: 'Executive Management — Impulso Capital', adm_kpi1: 'Total Deposited (Month)', adm_kpi2: 'Yields Distributed', adm_kpi3: 'Total Withdrawn (Month)', adm_kpi4: 'Total to Withdraw (Active Liability)',
    adm_line_title: 'Investments & Profitability Over Time', adm_line_sub: 'Gold Line: Deposits | Green Line: Profitability',
    adm_pie_title: 'Monthly Liquidity (Pie Chart)', adm_pie_sub: 'Withdrawn This Month vs. Total to Withdraw', pie_leg1: 'Withdrawn This Month', pie_leg2: 'Total to Withdraw',
    adm_new_user_title: 'Register New User', btn_create_user_manual: 'Register & Send PDF Manual', adm_users_list_title: 'Registered Users Database',
    th_name: 'Name', th_role: 'User Type', th_contact: 'Email / WhatsApp', th_balance: 'Total Balance', th_actions: 'Actions',
    rep_area_title: 'Audited Reports', rep_area_sub: 'Click any report to view details and export in CSV or PDF.',
    rep_click_view: 'Click to open and export (CSV / PDF) →',
    rep_inv_title: 'Investments Report (Pix Deposits)', rep_wd_title: 'Withdrawals Report (Requested & Settled)', rep_yld_title: 'Daily Yields Report (1% • 23:59)',
    sec_title: 'Security & Failed Access Attempts Report', sec_sub: 'Monitoring of failed logins, 30-minute lockouts, and IP geolocation',
    th_datetime: 'Date/Time', th_identifier: 'Identifier', th_location: 'Location', th_result: 'Outcome',
    footer_copy: '© 2026 Impulso Capital. All rights reserved. LGPD Compliant (Law 13.709/2018).',
    footer_terms: 'Terms of Service', footer_cookies: 'Cookie Preferences (LGPD)',
    lgpd_banner_text: '<strong class="text-[#F0B90B]">Privacy & LGPD Compliance:</strong> This website strictly complies with the General Data Protection Law (Law 13.709/2018) and uses essential security and session cookies to safeguard your financial operations.',
    btn_reject_cookies: 'Reject Cookies', btn_accept_cookies: 'Accept Cookies',
    auth_tab_login: 'Sign In to System', auth_tab_register: 'Register New Client', login_id_lbl: 'Tax ID / CPF (Client) or Email (Administrator / Account Manager)',
    login_pass_lbl: '6-Digit Password', btn_access_account: 'Access Account', quick_demo_lbl: 'Quick Demo Login (3 Roles):',
    demo_client: 'Client', demo_manager: 'Account Manager', demo_admin: 'Administrator', lbl_pix_short: 'Pix Key *', lbl_strong_pass: 'Strong Password (6 chars) *',
    reg_news_check: 'I agree to receive weekly financial sector news and market briefings via email (every Monday at 06:00 AM).',
    reg_terms_pre: 'I have read and fully agree to the', btn_finish_reg: 'Complete Registration & Receive PDF Manual',
    terms_modal_title: 'Terms of Service — Impulso Capital',
    terms_modal_body: '<p><strong class="text-[#EAECEF]">1. Scope & Eligibility:</strong> Impulso Capital is intended for individuals aged 18 or older with a valid Brazilian CPF, subject to email activation confirmation.</p><p><strong class="text-[#EAECEF]">2. Deposits & Minimum Threshold:</strong> Investments are processed exclusively via Pix with a minimum amount equivalent to 20 USDT at the prevailing exchange rate.</p><p><strong class="text-[#EAECEF]">3. Daily Profitability (1% per day):</strong> Confirmed deposits accrue 1.00% daily return on active principal capital, credited automatically every day at 23:59 (Brasília Time).</p><p><strong class="text-[#EAECEF]">4. Withdrawals & Monthly Settlement:</strong> Investors may request partial (accumulated yields) or full (principal + yields) withdrawals via Pix. On the last business day of each month, the entire available balance is automatically settled to the registered Pix key.</p><p><strong class="text-[#EAECEF]">5. Privacy & LGPD:</strong> In accordance with Law 13.709/2018, sensitive personal data is encrypted using AES-256-GCM and is never sold to third parties.</p><p><strong class="text-[#EAECEF]">6. Account Closure:</strong> Account holders may close their accounts at any time via 4-digit WhatsApp OTP verification, receiving their full remaining balance via Pix.</p>',
    btn_close: 'Close', btn_accept_terms: 'I Have Read & Accept the Terms'
  }
};

const DEFAULT_STATE = {
  usdtRate: 5.75,
  usdRate: 5.72,
  usdUpdatedAt: '12:00',
  currentUser: null,
  contactInfo: {
    email: 'contato@agenciabola.com',
    pixHours: '24/7 via Pix Automático',
    yieldTime: 'Diariamente às 23:59 (Brasília)'
  },
  users: [
    {
      id: 'u-client-1', name: 'Carlos Eduardo Mendes', cpf: '111.222.333-44', email: 'carlos@investidor.com.br',
      whatsapp: '(11) 98888-1111', pix: '111.222.333-44', password: 'Ab1@98', role: 'CLIENT', status: 'ATIVO',
      newsletter: true, principal: 10000.00, yieldAccum: 420.00, investedMonth: 10000.00, lastDeposit: 5000.00,
      timeline: [
        { date: '22/11/2026 23:59', type: 'Rendimento Diário (1%)', amount: 100.00, dir: '+' },
        { date: '20/11/2026 14:20', type: 'Aporte Pix Confirmado', amount: 5000.00, dir: '+' },
        { date: '15/11/2026 10:05', type: 'Aporte Inicial Pix', amount: 5000.00, dir: '+' }
      ]
    },
    {
      id: 'u-client-inactive', name: 'Mariana Silva Costa', cpf: '999.888.777-66', email: 'mariana.costa@email.com',
      whatsapp: '(21) 97777-2222', pix: 'mariana.costa@email.com', password: 'Mc2@45', role: 'CLIENT', status: 'INATIVO',
      newsletter: false, principal: 0, yieldAccum: 0, investedMonth: 0, lastDeposit: 0, timeline: []
    },
    {
      id: 'u-manager-1', name: 'Fernanda Oliveira', cpf: '222.333.444-55', email: 'gerente@agenciabola.com',
      whatsapp: '(11) 96666-3333', pix: 'gerente@agenciabola.com', password: 'Ge5$82', role: 'ACCOUNT_MANAGER', status: 'ATIVO',
      newsletter: true, principal: 0, yieldAccum: 0, investedMonth: 0, lastDeposit: 0, timeline: []
    },
    {
      id: 'u-admin-1', name: 'Administrador Geral', cpf: '000.111.222-33', email: 'admin@agenciabola.com',
      whatsapp: '(11) 95555-4444', pix: 'admin@agenciabola.com', password: 'Ad9#74', role: 'ADMIN', status: 'ATIVO',
      newsletter: true, principal: 0, yieldAccum: 0, investedMonth: 0, lastDeposit: 0, timeline: []
    }
  ],
  securityLogs: [
    { date: '22/11/2026 09:14', identifier: 'admin@agenciabola.com', ip: '187.45.112.89', loc: 'São Paulo, BR', ok: true, reason: 'Login autorizado' },
    { date: '22/11/2026 03:42', identifier: '111.222.333-44', ip: '45.229.88.14', loc: 'Rio de Janeiro, BR', ok: false, reason: 'Bloqueio 30m (3 senhas incorretas)' }
  ],
  newsletterArticles: [
    { id: 1, title: 'Comitê de Política Monetária mantém projeção de Selic em 11,25% a.a.', summary: 'Ata do Banco Central destaca cautela fiscal e ancoragem das expectativas de inflação para os próximos trimestres.', source: 'InfoMoney', url: 'https://www.infomoney.com.br' },
    { id: 2, title: 'Ibovespa avança apoiado por bancos e commodities metálicas', summary: 'Índice de referência da B3 opera em alta de 0,62% com fluxo estrangeiro positivo na abertura da semana.', source: 'Exame Invest', url: 'https://exame.com/invest/' },
    { id: 3, title: 'Dólar comercial abre a R$ 5,72 com investidores atentos aos juros nos EUA', summary: 'Câmbio reflete equilíbrio na balança comercial brasileira e declarações do Federal Reserve.', source: 'CNN Brasil Business', url: 'https://www.cnnbrasil.com.br/economia/' },
    { id: 4, title: 'Tesouro Direto e ativos pós-fixados seguem atraindo captação recorde', summary: 'Investidores priorizam liquidez diária e proteção contra volatilidade no curto prazo.', source: 'E-Investidor Estadão', url: 'https://einvestidor.estadao.com.br' },
    { id: 5, title: 'Liquidações instantâneas via Pix batem novo recorde no mercado financeiro', summary: 'Banco Central aponta crescimento de 38% no volume transacionado por investidores pessoa física.', source: 'InfoMoney', url: 'https://www.infomoney.com.br' }
  ]
};

let currentReportKey = 'investments';
let activeCmsKey = 'logo';
let draggedIdx = null;

const REPORT_DATA = {
  investments: {
    code: 'REL-INV-2026',
    title: 'Relatório de Investimentos (Aportes Pix)',
    meta: 'Aportes confirmados via Pix (mínimo equivalente a 20 USDT) • Auditoria SHA-256.',
    headers: ['Protocolo', 'Cliente', 'Valor Aportado', 'Data'],
    rows: [
      ['PIX-99281', 'Carlos Eduardo Mendes', 'R$ 5.000,00', '20/11/2026 14:20'],
      ['PIX-99104', 'Carlos Eduardo Mendes', 'R$ 5.000,00', '15/11/2026 10:05']
    ]
  },
  withdrawals: {
    code: 'REL-WD-2026',
    title: 'Relatório de Saques Solicitados e Liquidados',
    meta: 'Solicitações de saque de rendimentos e resgates totais liquidados via Pix.',
    headers: ['Protocolo', 'Cliente', 'Valor Sacado', 'Status'],
    rows: [
      ['WD-44102', 'Carlos Eduardo Mendes', 'R$ 1.250,00', 'LIQUIDADO PIX'],
      ['WD-44189', 'Carlos Eduardo Mendes', 'R$ 420,00', 'SOLICITADO']
    ]
  },
  yields: {
    code: 'REL-YLD-2026',
    title: 'Relatório de Rendimentos Diários (1% • 23:59)',
    meta: 'Apuração automática diária de 1,00% sobre o capital principal ativo às 23:59.',
    headers: ['Lote', 'Cliente', 'Rendimento (1%)', 'Apuração'],
    rows: [
      ['YLD-221126', 'Carlos Eduardo Mendes', 'R$ 100,00', '22/11/2026 23:59'],
      ['YLD-211126', 'Carlos Eduardo Mendes', 'R$ 100,00', '21/11/2026 23:59']
    ]
  }
};

function safeLoadState() {
  try {
    const raw = localStorage.getItem('impulso_agenciabola_state_v7');
    if (!raw || raw === 'null') return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return structuredClone(DEFAULT_STATE);
    return parsed;
  } catch (_) {
    return structuredClone(DEFAULT_STATE);
  }
}

let appState = safeLoadState();
if (!appState.contactInfo) appState.contactInfo = { ...DEFAULT_STATE.contactInfo };
if (!Array.isArray(appState.users) || appState.users.length === 0) appState.users = structuredClone(DEFAULT_STATE.users);
if (!Array.isArray(appState.securityLogs)) appState.securityLogs = structuredClone(DEFAULT_STATE.securityLogs);
if (!Array.isArray(appState.newsletterArticles)) appState.newsletterArticles = structuredClone(DEFAULT_STATE.newsletterArticles);

function saveState() {
  try {
    localStorage.setItem('impulso_agenciabola_state_v7', JSON.stringify(appState));
  } catch (_) {}
}

function applyContactInfoToSite() {
  const emailEl = document.getElementById('site-contact-email-val');
  const pixEl = document.getElementById('site-contact-pix-val');
  const yieldEl = document.getElementById('site-contact-yield-val');
  if (emailEl) emailEl.textContent = appState.contactInfo.email;
  if (pixEl) pixEl.textContent = appState.contactInfo.pixHours;
  if (yieldEl) yieldEl.textContent = appState.contactInfo.yieldTime;
}

function applyTranslations() {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.pt;
  document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en-US';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key]) el.innerHTML = dict[key];
  });

  applyContactInfoToSite();
  updateSidebarAuthUI();

  document.querySelectorAll('.lang-flag-pt').forEach(btn => {
    btn.style.opacity = currentLang === 'pt' ? '1' : '0.5';
    if (btn.classList.contains('border')) btn.style.borderColor = currentLang === 'pt' ? '#D4AF37' : '#333333';
  });
  document.querySelectorAll('.lang-flag-en').forEach(btn => {
    btn.style.opacity = currentLang === 'en' ? '1' : '0.5';
    if (btn.classList.contains('border')) btn.style.borderColor = currentLang === 'en' ? '#D4AF37' : '#333333';
  });

  if (appState.currentUser && appState.currentUser.role !== 'CLIENT') {
    renderAdminDashboard();
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('impulso_lang', lang);
  applyTranslations();
  showToast(
    lang === 'pt' ? 'Português (BR)' : 'English (US)',
    lang === 'pt' ? 'Todo o site e o painel de controle foram traduzidos para Português do Brasil.' : 'The entire website and control panel have been translated to US English.'
  );
}

document.addEventListener('mousemove', (e) => {
  document.querySelectorAll('.spotlight-card, .hero-metric-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});

function toggleMobileDrawer() {
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  if (!sidebar || !backdrop) return;
  const isClosed = sidebar.classList.contains('-translate-x-full');
  if (isClosed) {
    sidebar.classList.remove('-translate-x-full');
    backdrop.classList.remove('hidden');
  } else {
    closeMobileDrawer();
  }
}

function closeMobileDrawer() {
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  if (sidebar) sidebar.classList.add('-translate-x-full');
  if (backdrop) backdrop.classList.add('hidden');
}

function applyLayoutForView(viewName) {
  const heroWrap = document.getElementById('hero-banner-wrapper');
  if (heroWrap) {
    if (viewName === 'SITE') {
      heroWrap.classList.add('hero-desk-bg', 'parallax-bg-section');
    } else {
      heroWrap.classList.remove('hero-desk-bg', 'parallax-bg-section');
    }
  }
  const isSite = viewName === 'SITE';
  const body = document.getElementById('app-body');
  const siteTopHeader = document.getElementById('site-desktop-header');
  const sidebar = document.getElementById('app-sidebar');
  const mainContentArea = document.querySelector('#app-body > div.flex-1');

  closeMobileDrawer();

  if (body) {
    if (isSite) {
      body.classList.remove('lg:flex-row');
      body.classList.add('flex-col');
    } else {
      body.classList.remove('flex-col');
      body.classList.add('lg:flex-row');
    }
  }

  if (mainContentArea) {
    if (isSite) {
      mainContentArea.classList.remove('lg:pl-72');
    } else {
      mainContentArea.classList.add('lg:pl-72');
    }
  }

  if (siteTopHeader) {
    if (isSite) {
      siteTopHeader.classList.remove('lg:hidden');
      siteTopHeader.classList.add('lg:block');
    } else {
      siteTopHeader.classList.remove('lg:block');
      siteTopHeader.classList.add('lg:hidden');
    }
  }

  if (sidebar) {
    if (isSite) {
      sidebar.classList.remove('lg:translate-x-0', 'lg:sticky', 'lg:top-0');
      sidebar.classList.add('fixed', '-translate-x-full');
    } else {
      sidebar.classList.remove('-translate-x-full', 'lg:sticky');
      sidebar.classList.add('lg:translate-x-0', 'fixed', 'top-0', 'left-0');
    }
  }

  ['sidebar-menu-site', 'sidebar-menu-client', 'sidebar-menu-manager', 'sidebar-menu-admin'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  const u = appState.currentUser;
  if (isSite || !u) {
    document.getElementById('sidebar-menu-site')?.classList.remove('hidden');
  } else if (u.role === 'CLIENT') {
    document.getElementById('sidebar-menu-client')?.classList.remove('hidden');
  } else if (u.role === 'ACCOUNT_MANAGER') {
    document.getElementById('sidebar-menu-manager')?.classList.remove('hidden');
  } else if (u.role === 'ADMIN') {
    document.getElementById('sidebar-menu-admin')?.classList.remove('hidden');
  }
}

function navigateToSiteSection(sectionId) {
  switchMainView('SITE');
  closeMobileDrawer();
  document.querySelectorAll('[data-site-nav]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-site-nav') === sectionId);
  });
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function fmtBRL(v) {
  return Number(v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

let toastTimer = null;
function showToast(title, msg) {
  const titleEl = document.getElementById('toast-title');
  const msgEl = document.getElementById('toast-msg');
  const boxEl = document.getElementById('toast-box');
  if (!titleEl || !msgEl || !boxEl) return;
  titleEl.textContent = title;
  msgEl.textContent = msg;
  boxEl.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 6000);
}

function hideToast() {
  document.getElementById('toast-box')?.classList.add('hidden');
}

function checkFirstVisitLgpd() {
  if (!localStorage.getItem('impulso_lgpd_consent')) {
    document.getElementById('lgpd-cookie-banner')?.classList.remove('hidden');
  }
}

function handleCookieConsent(choice) {
  localStorage.setItem('impulso_lgpd_consent', choice);
  document.getElementById('lgpd-cookie-banner')?.classList.add('hidden');
  showToast('LGPD', choice === 'ACCEPTED' ? 'Cookies aceitos.' : 'Cookies não essenciais rejeitados.');
}

function reopenCookieBanner() {
  document.getElementById('lgpd-cookie-banner')?.classList.remove('hidden');
}

function openTermsModal() {
  document.getElementById('terms-modal')?.classList.remove('hidden');
}

function closeTermsModal() {
  document.getElementById('terms-modal')?.classList.add('hidden');
}

function acceptTermsFromModal() {
  const chk = document.getElementById('reg-terms-req');
  if (chk) chk.checked = true;
  closeTermsModal();
}

function updateSimulator() {
  const amount = parseFloat(document.getElementById('sim-amount')?.value) || 0;
  const days = parseInt(document.getElementById('sim-days')?.value, 10) || 1;
  const amtLbl = document.getElementById('sim-amount-label');
  const daysLbl = document.getElementById('sim-days-label');
  const dailyOut = document.getElementById('sim-daily-out');
  const profitOut = document.getElementById('sim-profit-out');
  const totalOut = document.getElementById('sim-total-out');

  if (amtLbl) amtLbl.textContent = fmtBRL(amount);
  if (daysLbl) daysLbl.textContent = days;
  const daily = amount * 0.01;
  const profit = daily * days;
  if (dailyOut) dailyOut.textContent = fmtBRL(daily);
  if (profitOut) profitOut.textContent = '+ ' + fmtBRL(profit);
  if (totalOut) totalOut.textContent = fmtBRL(amount + profit);
}

function switchMainView(viewName) {
  document.getElementById('view-site')?.classList.add('hidden');
  document.getElementById('view-client-dashboard')?.classList.add('hidden');
  document.getElementById('view-admin-dashboard')?.classList.add('hidden');

  applyLayoutForView(viewName);

  if (viewName === 'SITE') {
    document.getElementById('view-site')?.classList.remove('hidden');
  } else if (viewName === 'CLIENT') {
    document.getElementById('view-client-dashboard')?.classList.remove('hidden');
    switchClientTab('overview');
    renderClientDashboard();
  } else if (viewName === 'ADMIN') {
    document.getElementById('view-admin-dashboard')?.classList.remove('hidden');
    switchAdminTab('overview');
    renderAdminDashboard();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function returnToActiveDashboard() {
  if (!appState.currentUser) {
    openAuthModal('login');
    return;
  }
  switchMainView(appState.currentUser.role === 'CLIENT' ? 'CLIENT' : 'ADMIN');
}

function openAuthModal(tab) {
  document.getElementById('auth-modal')?.classList.remove('hidden');
  switchAuthTab(tab || 'login');
}

function closeAuthModal() {
  document.getElementById('auth-modal')?.classList.add('hidden');
}

function switchAuthTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('form-login')?.classList.toggle('hidden', !isLogin);
  document.getElementById('form-register')?.classList.toggle('hidden', isLogin);
  const tabLogin = document.getElementById('auth-tab-login');
  const tabReg = document.getElementById('auth-tab-register');
  if (tabLogin) {
    tabLogin.className = isLogin
      ? 'text-sm font-bold text-[#F0B90B] border-b-2 border-[#F0B90B] pb-2 cursor-pointer'
      : 'text-sm font-bold text-[#848E9C] pb-2 cursor-pointer';
  }
  if (tabReg) {
    tabReg.className = !isLogin
      ? 'text-sm font-bold text-[#F0B90B] border-b-2 border-[#F0B90B] pb-2 cursor-pointer'
      : 'text-sm font-bold text-[#848E9C] pb-2 cursor-pointer';
  }
}

function quickFillLogin(id, pass) {
  const idInput = document.getElementById('login-identifier');
  const passInput = document.getElementById('login-password');
  if (idInput) idInput.value = id;
  if (passInput) passInput.value = pass;
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const id = (document.getElementById('login-identifier')?.value || '').trim().toLowerCase();
  const pass = document.getElementById('login-password')?.value || '';

  const user = appState.users.find(u => u.cpf.toLowerCase() === id || u.email.toLowerCase() === id);
  if (!user || user.password !== pass) {
    appState.securityLogs.unshift({
      date: new Date().toLocaleString('pt-BR'), identifier: id, ip: '191.32.44.10', loc: 'Brasil', ok: false, reason: 'Credenciais inválidas'
    });
    saveState();
    showToast('Acesso Negado', 'CPF/E-mail ou senha incorretos.');
    return;
  }

  if (user.status !== 'ATIVO') {
    showToast('Conta Inativa', 'Utilize a aba Cadastrar com seu CPF para solicitar reativação.');
    return;
  }

  hideToast();
  closeAuthModal();
  closeMobileDrawer();
  document.getElementById('form-login')?.reset();

  appState.currentUser = user;
  saveState();
  updateSidebarAuthUI();
  switchMainView(user.role === 'CLIENT' ? 'CLIENT' : 'ADMIN');
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = (document.getElementById('reg-name')?.value || '').trim();
  const cpf = (document.getElementById('reg-cpf')?.value || '').trim();
  const email = (document.getElementById('reg-email')?.value || '').trim();
  const whats = (document.getElementById('reg-whats')?.value || '').trim();
  const pix = (document.getElementById('reg-pix')?.value || '').trim();
  const pass = document.getElementById('reg-pass')?.value || '';
  const newsletter = !!document.getElementById('reg-newsletter-opt')?.checked;
  const termsOk = !!document.getElementById('reg-terms-req')?.checked;

  if (!termsOk) {
    showToast('Termos Obrigatórios', 'Aceite os Termos de Serviço para prosseguir.');
    return;
  }

  const forbidden = ['admin', 'administrador', 'administrativo', 'atendimento'];
  if (forbidden.some(w => name.toLowerCase().includes(w))) {
    showToast('Nome Inválido', 'O nome não pode conter termos reservados pelo sistema.');
    return;
  }

  const existing = appState.users.find(u => u.cpf === cpf);
  if (existing) {
    if (existing.status === 'INATIVO') {
      existing.status = 'ATIVO';
      saveState();
      const maskedEmail = existing.email.replace(/(.{3}).+(@.+)/, '$1***$2');
      showToast('Conta Reativada!', `Link enviado para ${maskedEmail} e acesso reativado.`);
      switchAuthTab('login');
      return;
    }
    showToast('CPF Já Cadastrado', 'Este CPF já possui conta ativa.');
    return;
  }

  const newUser = {
    id: 'u-' + Date.now(), name, cpf, email, whatsapp: whats, pix, password: pass,
    role: 'CLIENT', status: 'ATIVO', newsletter, principal: 0, yieldAccum: 0, investedMonth: 0, lastDeposit: 0,
    timeline: [{ date: new Date().toLocaleString('pt-BR'), type: 'Conta Criada & Ativada', amount: 0, dir: '+' }]
  };
  appState.users.push(newUser);
  appState.currentUser = newUser;
  saveState();
  updateSidebarAuthUI();
  closeAuthModal();
  showToast('Cadastro Concluído!', `Manual do Cliente PDF enviado para ${email}.`);
  switchMainView('CLIENT');
}

function updateSidebarAuthUI() {
  const u = appState.currentUser;
  document.querySelectorAll('.guest-header-actions').forEach(el => el.classList.toggle('hidden', !!u));
  document.querySelectorAll('.user-header-actions').forEach(el => {
    el.classList.toggle('hidden', !u);
    el.classList.toggle('flex', !!u);
  });
  document.getElementById('sidebar-guest-box')?.classList.toggle('hidden', !!u);
  document.getElementById('sidebar-logged-box')?.classList.toggle('hidden', !u);

  if (u) {
    const roleLabel = getRoleLabel(u.role);
    const nameEl = document.getElementById('sidebar-user-name');
    const roleEl = document.getElementById('sidebar-user-role');
    if (nameEl) nameEl.textContent = u.name;
    if (roleEl) roleEl.textContent = roleLabel;
    document.querySelectorAll('.user-role-pill').forEach(el => {
      el.textContent = `${u.name} • ${roleLabel}`;
    });
  }
}

function logoutUser() {
  appState.currentUser = null;
  saveState();
  updateSidebarAuthUI();
  switchMainView('SITE');
}

function submitContactForm(e) {
  e.preventDefault();
  e.target.reset();
  showToast('Mensagem Enviada', 'Sua mensagem foi encaminhada ao Administrador e ao Gerente de Contas.');
}

function getActiveClient() {
  if (!appState.currentUser) return null;
  const found = appState.users.find(u => u.id === appState.currentUser.id);
  if (found && !Array.isArray(found.timeline)) found.timeline = [];
  return found || appState.currentUser;
}

function renderClientDashboard() {
  const c = getActiveClient();
  if (!c) return;

  const welcomeEl = document.getElementById('client-welcome-name');
  const usdRateEl = document.getElementById('client-usd-rate');
  const usdTimeEl = document.getElementById('client-usd-time');
  if (welcomeEl) welcomeEl.textContent = c.name;
  if (usdRateEl) usdRateEl.textContent = appState.usdRate.toFixed(2).replace('.', ',');
  if (usdTimeEl) usdTimeEl.textContent = appState.usdUpdatedAt;

  const dailyEst = c.principal * 0.01;
  const totalWithdrawable = c.principal + c.yieldAccum;

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setText('card-invested-month', fmtBRL(c.investedMonth));
  setText('card-last-deposit', fmtBRL(c.lastDeposit));
  setText('card-daily-yield', fmtBRL(dailyEst));
  setText('card-accum-yield', fmtBRL(c.yieldAccum));
  setText('card-total-withdrawable', fmtBRL(totalWithdrawable));
  setText('card-principal-total', fmtBRL(c.principal));

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  };
  setVal('prof-name', c.name || '');
  setVal('prof-cpf', c.cpf || '');
  setVal('prof-whatsapp', c.whatsapp || '');
  setVal('prof-pix', c.pix || '');
  const newsChk = document.getElementById('prof-newsletter');
  if (newsChk) newsChk.checked = !!c.newsletter;

  const timelineList = document.getElementById('client-timeline-list');
  if (timelineList) {
    const items = Array.isArray(c.timeline) ? c.timeline : [];
    timelineList.innerHTML = items.length
      ? items.map(item => `
        <div class="flex items-center justify-between bg-[#0B0E11] border border-[#2B3139] px-4 py-3 text-xs">
          <div>
            <div class="font-semibold text-[#EAECEF]">${item.type}</div>
            <div class="text-[#848E9C] mt-0.5">${item.date}</div>
          </div>
          <div class="font-bold ${item.dir === '-' ? 'text-red-400' : 'text-[#F0B90B]'}">${item.dir} ${fmtBRL(item.amount)}</div>
        </div>
      `).join('')
      : `<div class="text-xs text-[#848E9C] bg-[#0B0E11] border border-[#2B3139] p-4">Nenhuma movimentação registrada ainda.</div>`;
  }

  requestAnimationFrame(() => drawClientLineChart(c));
}

function refreshUsdQuote() {
  const delta = (Math.random() - 0.48) * 0.04;
  appState.usdRate = Math.max(5.10, +(appState.usdRate + delta).toFixed(2));
  const now = new Date();
  appState.usdUpdatedAt = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  saveState();
  renderClientDashboard();
  showToast('USD/BRL', `Cotação atualizada: R$ ${appState.usdRate.toFixed(2).replace('.', ',')}`);
}

function switchClientTab(tab) {
  closeMobileDrawer();
  ['overview', 'deposit', 'withdraw', 'profile'].forEach(t => {
    document.getElementById('ctab-' + t)?.classList.toggle('hidden', t !== tab);
    const sLink = document.getElementById('slink-client-' + t);
    if (sLink) sLink.classList.toggle('active', t === tab);
  });
  if (tab === 'withdraw') updateWithdrawPreset();
  if (tab === 'overview') {
    const c = getActiveClient();
    if (c) requestAnimationFrame(() => drawClientLineChart(c));
  }
}

function generateClientPix() {
  const val = parseFloat(document.getElementById('deposit-amount-input')?.value) || 0;
  const minBrl = 20 * appState.usdtRate;
  if (val < minBrl) {
    showToast('Mínimo 20 USDT', `Valor mínimo: ${fmtBRL(minBrl)}`);
    return;
  }
  const codeInput = document.getElementById('pix-copy-code');
  const qrBox = document.getElementById('pix-qr-box');
  if (codeInput) {
    codeInput.value = `00020126580014BR.GOV.BCB.PIX0136IMPULSOCAPITAL${Date.now()}5204000053039865406${val.toFixed(2)}5802BR`;
  }
  if (qrBox) qrBox.classList.remove('hidden');
}

function confirmSimulatedPixDeposit() {
  const c = getActiveClient();
  if (!c) return;
  const val = parseFloat(document.getElementById('deposit-amount-input')?.value) || 0;
  if (val <= 0) return;
  c.principal += val;
  c.investedMonth += val;
  c.lastDeposit = val;
  c.timeline = c.timeline || [];
  c.timeline.unshift({ date: new Date().toLocaleString('pt-BR'), type: 'Aporte Pix Confirmado', amount: val, dir: '+' });
  saveState();
  document.getElementById('pix-qr-box')?.classList.add('hidden');
  switchClientTab('overview');
  renderClientDashboard();
  showToast('Aporte Confirmado!', `Crédito de ${fmtBRL(val)} confirmado.`);
}

function updateWithdrawPreset() {
  const c = getActiveClient();
  if (!c) return;
  const mode = document.getElementById('withdraw-mode')?.value;
  const input = document.getElementById('withdraw-amount-input');
  if (!input) return;
  if (mode === 'YIELD') input.value = Number(c.yieldAccum || 0).toFixed(2);
  else if (mode === 'FULL') input.value = Number((c.principal || 0) + (c.yieldAccum || 0)).toFixed(2);
}

function submitClientWithdrawal() {
  const c = getActiveClient();
  if (!c) return;
  const val = parseFloat(document.getElementById('withdraw-amount-input')?.value) || 0;
  const totalAvail = c.principal + c.yieldAccum;
  if (val <= 0 || val > totalAvail + 0.0001) {
    showToast('Saldo Insuficiente', 'Informe um valor dentro do saldo disponível.');
    return;
  }
  const cleanVal = Math.min(val, totalAvail);
  if (cleanVal <= c.yieldAccum) {
    c.yieldAccum = +(c.yieldAccum - cleanVal).toFixed(2);
  } else {
    const rem = cleanVal - c.yieldAccum;
    c.yieldAccum = 0;
    c.principal = Math.max(0, +(c.principal - rem).toFixed(2));
  }
  const nowStr = new Date().toLocaleString('pt-BR');
  c.timeline = c.timeline || [];
  c.timeline.unshift({ date: nowStr, type: 'Saque Pix Solicitado', amount: cleanVal, dir: '-' });
  saveState();
  switchClientTab('overview');
  renderClientDashboard();
  showToast('Saque Solicitado!', `Saque de ${fmtBRL(cleanVal)} registrado em ${nowStr}.`);
}

function simulate2359Yield() {
  const c = getActiveClient();
  if (!c) return;
  if (c.principal <= 0) {
    showToast('Sem Capital Ativo', 'Realize um aporte via Pix para simular o rendimento de 1%.');
    return;
  }
  const gain = +(c.principal * 0.01).toFixed(2);
  c.yieldAccum = +(c.yieldAccum + gain).toFixed(2);
  c.timeline = c.timeline || [];
  c.timeline.unshift({ date: '23:59', type: 'Rendimento Diário (1%)', amount: gain, dir: '+' });
  saveState();
  renderClientDashboard();
  showToast('23:59 (+1%)', `Crédito de ${fmtBRL(gain)} realizado!`);
}

function simulateFridayWhatsApp() {
  const c = getActiveClient();
  if (!c) return;
  showToast('WhatsApp Sexta-feira', `Enviado para ${c.whatsapp}: Rendimentos ${fmtBRL(c.yieldAccum)} | Total ${fmtBRL(c.principal + c.yieldAccum)}.`);
}

function saveClientProfile(e) {
  e.preventDefault();
  const c = getActiveClient();
  if (!c) return;
  c.name = (document.getElementById('prof-name')?.value || '').trim();
  c.whatsapp = (document.getElementById('prof-whatsapp')?.value || '').trim();
  c.pix = (document.getElementById('prof-pix')?.value || '').trim();
  c.newsletter = !!document.getElementById('prof-newsletter')?.checked;
  appState.currentUser = c;
  saveState();
  updateSidebarAuthUI();
  renderClientDashboard();
  showToast('Perfil Salvo', 'Dados atualizados com sucesso.');
}

function requestClosureOtp() {
  document.getElementById('closure-otp-box')?.classList.remove('hidden');
  showToast('OTP WhatsApp', 'Código de 4 dígitos enviado.');
}

function confirmAccountClosure() {
  const code = (document.getElementById('closure-otp-input')?.value || '').trim();
  if (code.length !== 4) {
    showToast('Código Inválido', 'Digite o código OTP de 4 dígitos.');
    return;
  }
  const c = getActiveClient();
  if (!c) return;
  const residual = c.principal + c.yieldAccum;
  c.principal = 0;
  c.yieldAccum = 0;
  c.status = 'INATIVO';
  appState.currentUser = null;
  saveState();
  updateSidebarAuthUI();
  switchMainView('SITE');
  showToast('Conta Encerrada', `Saldo de ${fmtBRL(residual)} transferido via Pix.`);
}

function drawClientLineChart(client) {
  const canvas = document.getElementById('client-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth || 500;
  const h = canvas.height = 210;
  ctx.clearRect(0, 0, w, h);

  const base = Math.max(1000, client.principal || 0);
  const pts = [base * 0.4, base * 0.5, base * 0.7, base * 0.85, base, base + (client.yieldAccum || 0)];
  const maxV = Math.max(...pts, 1) * 1.15;

  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 1;
  for (let i = 1; i <= 4; i++) {
    const y = (h / 5) * i;
    ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(w - 20, y); ctx.stroke();
  }

  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.beginPath();
  pts.forEach((val, idx) => {
    const x = 30 + (idx * ((w - 60) / (pts.length - 1)));
    const y = h - 25 - ((val / maxV) * (h - 50));
    if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

function renderAdminDashboard() {
  const u = appState.currentUser;
  if (!u) return;
  const isAdmin = u.role === 'ADMIN';

  const roleLbl = document.getElementById('admin-role-label');
  const roleNotice = document.getElementById('admin-role-notice');
  if (roleLbl) {
    roleLbl.textContent = isAdmin
      ? (currentLang === 'pt' ? 'Administrador (Acesso Total)' : 'Administrator (Full Access)')
      : (currentLang === 'pt' ? 'Gerente de Contas (Acesso Operacional)' : 'Account Manager (Operational Access)');
  }
  if (roleNotice) {
    roleNotice.textContent = isAdmin
      ? (currentLang === 'pt' ? 'Acesso irrestrito a usuários, exclusões, relatórios, segurança e CMS.' : 'Unrestricted access to users, deletions, reports, security, and CMS.')
      : (currentLang === 'pt' ? 'Acesso permitido a Clientes e Relatórios Financeiros.' : 'Access to Clients and Financial Reports.');
  }

  document.getElementById('opt-role-manager')?.classList.toggle('hidden', !isAdmin);
  document.getElementById('opt-role-admin')?.classList.toggle('hidden', !isAdmin);

  renderAdminUsersTable(isAdmin);
  openAuditedReportDetail(currentReportKey);
  renderSecurityLogsTable();
  renderNewsletterDragList();
  requestAnimationFrame(() => drawAdminCharts());
}

function switchAdminTab(tab) {
  closeMobileDrawer();
  const u = appState.currentUser;
  if (u && u.role !== 'ADMIN' && (tab === 'security' || tab === 'cms')) {
    showToast('Acesso Restrito', 'Apenas o Administrador possui acesso a esta seção.');
    return;
  }
  ['overview', 'users', 'reports', 'security', 'cms'].forEach(t => {
    document.getElementById('atab-' + t)?.classList.toggle('hidden', t !== tab);
    const sAdm = document.getElementById('slink-adm-' + t);
    const sMgr = document.getElementById('slink-mgr-' + t);
    if (sAdm) sAdm.classList.toggle('active', t === tab);
    if (sMgr) sMgr.classList.toggle('active', t === tab);
  });

  if (tab === 'overview') requestAnimationFrame(() => drawAdminCharts());
  if (tab === 'cms') switchCmsSection('logo');
}

function adminCreateUser(e) {
  e.preventDefault();
  const current = appState.currentUser;
  if (!current) return;
  const role = document.getElementById('new-u-role')?.value || 'CLIENT';
  if (current.role !== 'ADMIN' && role !== 'CLIENT') {
    showToast('Permissão Negada', 'Apenas o Administrador pode criar outros perfis.');
    return;
  }

  const name = (document.getElementById('new-u-name')?.value || '').trim();
  const cpf = (document.getElementById('new-u-cpf')?.value || '').trim();
  const email = (document.getElementById('new-u-email')?.value || '').trim();
  const whats = (document.getElementById('new-u-whats')?.value || '').trim();
  const pix = (document.getElementById('new-u-pix')?.value || '').trim();
  const pass = document.getElementById('new-u-pass')?.value || '';

  appState.users.push({
    id: 'u-' + Date.now(), name, cpf, email, whatsapp: whats, pix, password: pass,
    role, status: 'ATIVO', newsletter: true, principal: 0, yieldAccum: 0, investedMonth: 0, lastDeposit: 0, timeline: []
  });
  saveState();
  e.target.reset();
  renderAdminUsersTable(current.role === 'ADMIN');
  showToast('Usuário Cadastrado', `${getRoleLabel(role)} cadastrado e manual enviado para ${email}.`);
}

function applyUsersFilter() {
  const isAdmin = appState.currentUser?.role === 'ADMIN';
  renderAdminUsersTable(isAdmin);
}

function renderAdminUsersTable(isAdmin) {
  const tbody = document.getElementById('admin-users-tbody');
  if (!tbody) return;
  const queryName = (document.getElementById('user-filter-name')?.value || '').trim().toLowerCase();
  const statusFilter = document.getElementById('user-filter-status')?.value || 'ALL';

  let visibleUsers = isAdmin ? appState.users : appState.users.filter(u => u.role === 'CLIENT');

  if (statusFilter !== 'ALL') {
    visibleUsers = visibleUsers.filter(u => u.status === statusFilter);
  }
  if (queryName) {
    visibleUsers = visibleUsers.filter(u => u.name.toLowerCase().includes(queryName));
  }

  if (visibleUsers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="py-6 text-center text-xs text-[#848E9C]">Nenhum registro encontrado para o filtro selecionado.</td></tr>`;
    return;
  }

  tbody.innerHTML = visibleUsers.map(u => `
    <tr>
      <td class="py-3 px-2 font-semibold">${u.name}</td>
      <td class="py-3 px-2"><span class="px-2.5 py-0.5 bg-[#0B0E11] border border-[#2B3139] text-xs text-[#F0B90B]">${getRoleLabel(u.role)}</span></td>
      <td class="py-3 px-2 text-xs text-[#848E9C]">${u.email}<br>${u.whatsapp}</td>
      <td class="py-3 px-2 font-semibold text-[#EAECEF]">${fmtBRL((u.principal || 0) + (u.yieldAccum || 0))}</td>
      <td class="py-3 px-2 text-xs ${u.status === 'ATIVO' ? 'text-emerald-400' : 'text-red-400'}">${u.status}</td>
      <td class="py-3 px-2 text-right space-x-2">
        ${isAdmin && u.role === 'CLIENT' && u.status === 'ATIVO'
          ? `<button type="button" onclick="adminDeleteClient('${u.id}')" class="bg-red-950 border border-red-800 text-red-300 px-2.5 py-1 text-xs hover:bg-red-900">Desativar & Pix Saldo</button>`
          : '<span class="text-[11px] text-[#848E9C]">—</span>'}
      </td>
    </tr>
  `).join('');
}

function adminDeleteClient(uid) {
  if (appState.currentUser?.role !== 'ADMIN') return;
  const target = appState.users.find(u => u.id === uid);
  if (!target) return;
  const residual = (target.principal || 0) + (target.yieldAccum || 0);
  target.principal = 0;
  target.yieldAccum = 0;
  target.status = 'INATIVO';
  saveState();
  renderAdminUsersTable(true);
  showToast('Cliente Desativado', `Saldo residual de ${fmtBRL(residual)} enviado via Pix para ${target.pix}.`);
}

function openAuditedReportDetail(key) {
  currentReportKey = key;
  const rep = REPORT_DATA[key] || REPORT_DATA.investments;
  const codeEl = document.getElementById('selected-report-code');
  const titleEl = document.getElementById('selected-report-title');
  const metaEl = document.getElementById('selected-report-meta');
  const wrapEl = document.getElementById('selected-report-table-wrap');

  if (codeEl) codeEl.textContent = rep.code;
  if (titleEl) titleEl.textContent = rep.title;
  if (metaEl) metaEl.textContent = rep.meta;

  if (wrapEl) {
    wrapEl.innerHTML = `
      <table class="w-full text-left border-collapse">
        <thead><tr class="border-b border-[#2B3139] text-[#848E9C]">
          ${rep.headers.map(h => `<th class="py-2.5 px-2">${h}</th>`).join('')}
        </tr></thead>
        <tbody class="divide-y divide-[#333333]">
          ${rep.rows.map(r => `
            <tr>
              <td class="py-2.5 px-2 font-mono">${r[0]}</td>
              <td class="py-2.5 px-2">${r[1]}</td>
              <td class="py-2.5 px-2 text-[#F0B90B] font-bold">${r[2]}</td>
              <td class="py-2.5 px-2">${r[3]}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>`;
  }
}

function exportSelectedReport(format) {
  const rep = REPORT_DATA[currentReportKey] || REPORT_DATA.investments;
  const op = appState.currentUser?.name || 'Operador';
  const uuid = 'AUD-' + Math.random().toString(36).substring(2, 10).toUpperCase();

  if (format === 'csv') {
    const lines = [
      `IMPULSO CAPITAL - ${rep.title.toUpperCase()}`,
      `Protocolo;${uuid}`,
      `Emitido por;${op}`,
      `Data;${new Date().toLocaleString('pt-BR')}`,
      '',
      rep.headers.join(';'),
      ...rep.rows.map(r => r.join(';'))
    ];
    const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `impulso_capital_${currentReportKey}_${uuid}.csv`;
    link.click();
    showToast('CSV Exportado', `Arquivo ${link.download} gerado.`);
  } else {
    const win = window.open('', '_blank');
    if (!win) {
      showToast('Bloqueio de Pop-up', 'Permita pop-ups para exportar o relatório em PDF.');
      return;
    }
    win.document.write(`<html><head><title>${rep.title} - ${uuid}</title><style>body{font-family:Arial;padding:32px;background:#121212;color:#f3f4f6;}h1{color:#D4AF37;}table{width:100%;border-collapse:collapse;margin-top:20px;}td,th{border:1px solid #333;padding:10px;text-align:left;}</style></head><body><h1>IMPULSO CAPITAL — ${rep.title}</h1><p><strong>Protocolo:</strong> ${uuid} | <strong>Operador:</strong> ${op}</p><table><tr>${rep.headers.map(h => `<th>${h}</th>`).join('')}</tr>${rep.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table><script>window.print();<\/script></body></html>`);
    win.document.close();
  }
}

function renderSecurityLogsTable() {
  const tbody = document.getElementById('admin-security-tbody');
  if (!tbody) return;
  tbody.innerHTML = appState.securityLogs.map(l => `
    <tr>
      <td class="py-2.5 px-2">${l.date}</td>
      <td class="py-2.5 px-2 font-mono">${l.identifier}</td>
      <td class="py-2.5 px-2 font-mono">${l.ip}</td>
      <td class="py-2.5 px-2">${l.loc}</td>
      <td class="py-2.5 px-2 ${l.ok ? 'text-emerald-400' : 'text-red-400'}">${l.reason}</td>
    </tr>
  `).join('');
}

function drawAdminCharts() {
  const lineCanvas = document.getElementById('admin-line-chart');
  if (lineCanvas) {
    const ctx = lineCanvas.getContext('2d');
    const w = lineCanvas.width = lineCanvas.offsetWidth || 540;
    const h = lineCanvas.height = 230;
    ctx.clearRect(0, 0, w, h);

    const invPts = [40, 62, 85, 110, 128, 148.5];
    const yldPts = [4, 7.2, 10.5, 13.8, 16.1, 18.4];

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.beginPath();
    invPts.forEach((v, i) => {
      const x = 30 + i * ((w - 60) / 5);
      const y = h - 25 - (v / 170) * (h - 50);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    yldPts.forEach((v, i) => {
      const x = 30 + i * ((w - 60) / 5);
      const y = h - 25 - (v / 170) * (h - 50);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  const pieCanvas = document.getElementById('admin-pie-chart');
  if (pieCanvas) {
    const ctx = pieCanvas.getContext('2d');
    const w = pieCanvas.width = pieCanvas.offsetWidth || 380;
    const h = pieCanvas.height = 210;
    ctx.clearRect(0, 0, w, h);

    const withdrawn = 42300;
    const toWithdraw = 124620;
    const total = withdrawn + toWithdraw;
    const angle1 = (withdrawn / total) * Math.PI * 2;

    const cx = w / 2, cy = h / 2, r = 75;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, 0, angle1); ctx.fillStyle = '#10B981'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, angle1, Math.PI * 2); ctx.fillStyle = '#D4AF37'; ctx.fill();
  }
}

function switchCmsSection(sec) {
  const allSecs = ['logo', 'hero', 'about', 'offer', 'invest', 'contact', 'newsletter'];
  allSecs.forEach(s => {
    const tabBtn = document.getElementById('cms-tab-' + s);
    if (tabBtn) {
      tabBtn.className = s === sec ? 'btn-gold px-3 py-1.5 text-xs' : 'btn-outline px-3 py-1.5 text-xs';
    }
  });

  document.getElementById('cms-pane-logo')?.classList.toggle('hidden', sec !== 'logo');
  document.getElementById('cms-pane-newsletter')?.classList.toggle('hidden', sec !== 'newsletter');
  const isTextSec = !['logo', 'newsletter'].includes(sec);
  document.getElementById('cms-pane-texts')?.classList.toggle('hidden', !isTextSec);

  if (sec === 'logo') {
    const curFav = document.getElementById('dynamic-favicon')?.href || '';
    const prevImg = document.getElementById('cms-favicon-preview-img');
    if (prevImg && curFav) prevImg.src = curFav;
  }

  if (isTextSec) {
    activeCmsKey = sec;
    const map = {
      hero: { label: 'Início (Hero)', t: 'cms-hero-title', d: 'cms-hero-subtitle' },
      about: { label: 'Quem Somos', t: 'cms-about-title', d: 'cms-about-desc' },
      offer: { label: 'O Que Oferecemos', t: 'cms-offer-title', d: 'cms-offer-desc' },
      invest: { label: 'Invista Agora', t: 'cms-invest-title', d: 'cms-invest-desc' },
      contact: { label: 'Contato', t: 'cms-contact-title', d: 'cms-contact-desc' }
    };
    const headingEl = document.getElementById('cms-editor-heading');
    const titleIn = document.getElementById('cms-in-sec-title');
    const descIn = document.getElementById('cms-in-sec-desc');
    if (headingEl) headingEl.textContent = 'Editar Seção: ' + map[sec].label;
    if (titleIn) titleIn.value = (document.getElementById(map[sec].t)?.innerHTML || '').trim();
    if (descIn) descIn.value = (document.getElementById(map[sec].d)?.innerHTML || '').trim();

    const isContact = sec === 'contact';
    document.getElementById('cms-contact-details-box')?.classList.toggle('hidden', !isContact);
    if (isContact) {
      const emailIn = document.getElementById('cms-in-contact-email');
      const pixIn = document.getElementById('cms-in-contact-pix');
      const yieldIn = document.getElementById('cms-in-contact-yield');
      if (emailIn) emailIn.value = appState.contactInfo.email;
      if (pixIn) pixIn.value = appState.contactInfo.pixHours;
      if (yieldIn) yieldIn.value = appState.contactInfo.yieldTime;
    }
  }
}

function handleFaviconFileUpload(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    const dataUrl = evt.target?.result;
    if (typeof dataUrl === 'string') {
      const urlIn = document.getElementById('cms-in-favicon-url');
      if (urlIn) urlIn.value = dataUrl;
      setFaviconUrl(dataUrl);
      showToast('Favicon Carregado', 'Imagem carregada na prévia. Clique em "Salvar e Publicar Logo & Favicon" para fixar.');
    }
  };
  reader.readAsDataURL(file);
}

function applyCmsChanges() {
  const badge = (document.getElementById('cms-in-badge')?.value || '').trim() || 'IC';
  const title = (document.getElementById('cms-in-brand-title')?.value || '').trim() || 'IMPULSO CAPITAL';
  const sub = (document.getElementById('cms-in-brand-sub')?.value || '').trim() || 'Gestão Patrimonial';
  const imgUrl = (document.getElementById('cms-in-logo-url')?.value || '').trim();
  const favUrl = (document.getElementById('cms-in-favicon-url')?.value || '').trim();

  document.querySelectorAll('.brand-logo-badge').forEach(el => { el.textContent = badge; });
  document.querySelectorAll('.brand-title-text').forEach(el => { el.textContent = title; });
  document.querySelectorAll('.brand-subtitle-text').forEach(el => { el.textContent = sub; });

  if (imgUrl) {
    document.querySelectorAll('.brand-logo-img').forEach(el => { el.src = imgUrl; el.classList.remove('hidden'); });
    document.querySelectorAll('.brand-logo-badge').forEach(el => el.classList.add('hidden'));
  } else {
    document.querySelectorAll('.brand-logo-img').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.brand-logo-badge').forEach(el => el.classList.remove('hidden'));
  }

  if (favUrl) {
    setFaviconUrl(favUrl);
  } else {
    updateFavicon(badge, imgUrl);
  }

  showToast('Logomarca & Favicon Atualizados', 'Identidade visual e ícone da aba publicados.');
}

function applyCmsTextSection() {
  const map = {
    hero: { t: 'cms-hero-title', d: 'cms-hero-subtitle' },
    about: { t: 'cms-about-title', d: 'cms-about-desc' },
    offer: { t: 'cms-offer-title', d: 'cms-offer-desc' },
    invest: { t: 'cms-invest-title', d: 'cms-invest-desc' },
    contact: { t: 'cms-contact-title', d: 'cms-contact-desc' }
  };
  const target = map[activeCmsKey];
  if (!target) return;
  const tEl = document.getElementById(target.t);
  const dEl = document.getElementById(target.d);
  if (tEl) tEl.innerHTML = document.getElementById('cms-in-sec-title')?.value || '';
  if (dEl) dEl.innerHTML = document.getElementById('cms-in-sec-desc')?.value || '';

  if (activeCmsKey === 'contact') {
    appState.contactInfo = {
      email: (document.getElementById('cms-in-contact-email')?.value || '').trim() || 'contato@agenciabola.com',
      pixHours: (document.getElementById('cms-in-contact-pix')?.value || '').trim() || '24/7 via Pix Automático',
      yieldTime: (document.getElementById('cms-in-contact-yield')?.value || '').trim() || 'Diariamente às 23:59 (Brasília)'
    };
    saveState();
    applyContactInfoToSite();
  }
  showToast('Conteúdo Publicado', 'Alterações salvas e refletidas no site.');
}

function renderNewsletterDragList() {
  const container = document.getElementById('newsletter-drag-list');
  if (!container) return;
  container.innerHTML = appState.newsletterArticles.map((art, idx) => `
    <div draggable="true" ondragstart="draggedIdx=${idx}" ondragover="event.preventDefault()" ondrop="dropNewsletterItem(${idx})"
         class="drag-item bg-[#0B0E11] border border-[#2B3139] p-4 flex items-start justify-between gap-4">
      <div class="space-y-1 flex-1">
        <div class="text-[11px] text-[#F0B90B] uppercase font-bold">☰ Matéria #${idx + 1} • Fonte: ${art.source}</div>
        <input type="text" value="${art.title.replace(/"/g, '&quot;')}" onchange="appState.newsletterArticles[${idx}].title=this.value;saveState();" class="input-dark w-full px-2.5 py-1.5 text-sm font-semibold" />
        <textarea rows="2" onchange="appState.newsletterArticles[${idx}].summary=this.value;saveState();" class="input-dark w-full px-2.5 py-1.5 text-xs text-[#848E9C]">${art.summary}</textarea>
        <input type="url" value="${art.url.replace(/"/g, '&quot;')}" onchange="appState.newsletterArticles[${idx}].url=this.value;saveState();" class="input-dark w-full px-2.5 py-1 text-[11px] text-[#F0B90B]" />
      </div>
    </div>
  `).join('');
}

function dropNewsletterItem(targetIdx) {
  if (draggedIdx === null || draggedIdx === targetIdx) return;
  const moved = appState.newsletterArticles.splice(draggedIdx, 1)[0];
  appState.newsletterArticles.splice(targetIdx, 0, moved);
  draggedIdx = null;
  saveState();
  renderNewsletterDragList();
}

function autoCurateNews() {
  appState.newsletterArticles.reverse();
  saveState();
  renderNewsletterDragList();
  showToast('Curadoria Atualizada', '5 principais matérias financeiras carregadas.');
}

function previewNewsletterModal() {
  const articlesHtml = appState.newsletterArticles.map(a => `
    <div class="bg-[#181A20] border border-[#2B3139] p-4 space-y-2">
      <h4 class="font-serif-title text-base font-bold text-[#EAECEF]">${a.title}</h4>
      <p class="text-[#848E9C] leading-relaxed">${a.summary}</p>
      <a href="${a.url}" target="_blank" rel="noopener noreferrer" class="inline-block text-[#F0B90B] font-semibold underline">Ler matéria na íntegra (${a.source}) &rarr;</a>
    </div>
  `).join('');

  const bodyEl = document.getElementById('newsletter-preview-body');
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div class="border-b border-[#2B3139] pb-3">
        <div class="font-serif-title text-xl font-bold text-[#F0B90B]">IMPULSO CAPITAL — PANORAMA SEMANAL</div>
        <div class="text-[#848E9C]">Disparo automático toda segunda-feira às 06:00</div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#181A20] p-3 border border-[#2B3139]">
        <div>IBOVESPA: <strong>128.940 pts</strong></div>
        <div>SELIC: <strong class="text-[#F0B90B]">11,25% a.a.</strong></div>
        <div>BACEN: <strong>11,15% a.a.</strong></div>
        <div>Dólar Abertura: <strong>R$ 5,72</strong></div>
      </div>
      ${articlesHtml}
      <div class="pt-4 border-t border-[#2B3139] text-center">
        <button type="button" onclick="showToast('Descadastro', 'Removido da lista de mailing.')" class="border border-[#2B3139] px-4 py-2 text-[#848E9C] hover:text-white">
          Cancelar inscrição na Newsletter (Sair da lista de mailing)
        </button>
      </div>
    `;
  }
  document.getElementById('newsletter-preview-modal')?.classList.remove('hidden');
}

function publishNewsletter() {
  saveState();
  showToast('Newsletter Agendada!', 'Publicada para disparo automático toda segunda-feira às 06:00.');
}

function updateSectionsParallax() {
  document.querySelectorAll('.parallax-bg-section').forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.bottom > -200 && rect.top < window.innerHeight + 200) {
      const offset = Math.round(rect.top * 0.28);
      sec.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    }
  });
}
window.addEventListener('scroll', updateSectionsParallax, { passive: true });
window.addEventListener('resize', updateSectionsParallax, { passive: true });

window.addEventListener('DOMContentLoaded', () => {
  updateFavicon('IC', '');
  startDollarRandomEffects();
  checkFirstVisitLgpd();
  updateSimulator();
  applyContactInfoToSite();
  applyLayoutForView('SITE');
  updateSidebarAuthUI();
  updateSectionsParallax();
});
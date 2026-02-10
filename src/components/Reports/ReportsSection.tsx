import styles from './Reports.module.css';

const TELEGRAM_LINK = 'https://t.me/SEU_CANAL_AQUI';

const TelegramIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const freeFeatures = [
  'Resumo diário do mercado',
  'Análises semanais das principais bolsas',
  'Alertas de movimentações relevantes',
  'Comunidade de investidores',
];

const proFeatures = [
  'Tudo do plano gratuito',
  'Relatórios completos com recomendações',
  'Análises técnicas detalhadas (ações e crypto)',
  'Sinais antecipados de oportunidades',
  'Acesso a planilhas e modelos exclusivos',
  'Suporte direto via chat',
];

export default function ReportsSection() {
  return (
    <section>
      <div className="section-header animate-in">
        <h2 className="section-title">Relatórios</h2>
        <p className="section-subtitle">Análises de mercado direto no seu Telegram</p>
      </div>

      {/* Hero Banner */}
      <div className={`${styles.heroBanner} animate-in animate-delay-1`}>
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>
            <TelegramIcon />
          </div>
          <h3 className={styles.heroTitle}>
            Receba relatórios e análises<br />direto no Telegram
          </h3>
          <p className={styles.heroDescription}>
            Acompanhe o mercado com análises fundamentalistas, relatórios técnicos
            e alertas em tempo real. Tudo entregue diretamente no seu Telegram.
          </p>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroButton}
          >
            <TelegramIcon />
            Entrar no canal gratuito
          </a>
        </div>
      </div>

      {/* Plans */}
      <div className={`${styles.plansGrid} animate-in animate-delay-2`}>
        {/* Free Plan */}
        <div className={`card ${styles.planCard}`}>
          <div className={styles.planHeader}>
            <span className={styles.planBadge}>Gratuito</span>
            <div className={styles.planPrice}>
              <span className={styles.priceValue}>R$ 0</span>
              <span className={styles.pricePeriod}>/mês</span>
            </div>
          </div>
          <ul className={styles.featureList}>
            {freeFeatures.map((feature, i) => (
              <li key={i} className={styles.featureItem}>
                <span className={styles.checkIcon}><CheckIcon /></span>
                {feature}
              </li>
            ))}
          </ul>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.planButton}
          >
            Começar grátis
          </a>
        </div>

        {/* Pro Plan */}
        <div className={`card ${styles.planCard} ${styles.proPlan}`}>
          <div className={styles.proGlow} />
          <div className={styles.planHeader}>
            <span className={`${styles.planBadge} ${styles.proBadge}`}>
              <StarIcon /> Pro
            </span>
            <div className={styles.planPrice}>
              <span className={styles.priceValue}>R$ --</span>
              <span className={styles.pricePeriod}>/mês</span>
            </div>
            <p className={styles.priceNote}>Em breve</p>
          </div>
          <ul className={styles.featureList}>
            {proFeatures.map((feature, i) => (
              <li key={i} className={styles.featureItem}>
                <span className={`${styles.checkIcon} ${styles.proCheck}`}><CheckIcon /></span>
                {feature}
              </li>
            ))}
          </ul>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.planButton} ${styles.proButton}`}
          >
            Lista de espera
          </a>
        </div>
      </div>
    </section>
  );
}

import { useStaticData } from '../../hooks/useStaticData';
import { MOCK_CRYPTO, MOCK_METALS, MOCK_EXCHANGES } from '../../data';
import type { CryptoQuote, MetalQuote, ExchangeQuote } from '../../types';
import QuoteItem from './QuoteItem';
import styles from './Quotes.module.css';

export default function QuotesSection() {
  const crypto = useStaticData<CryptoQuote[]>('crypto.json', MOCK_CRYPTO);
  const metals = useStaticData<MetalQuote[]>('metals.json', MOCK_METALS);
  const exchanges = useStaticData<ExchangeQuote[]>('exchanges.json', MOCK_EXCHANGES);

  // Pega o timestamp mais recente entre as fontes
  const latestUpdate = [crypto.updatedAt, metals.updatedAt, exchanges.updatedAt]
    .filter(Boolean)
    .sort()
    .pop();

  const isLoading = crypto.loading || metals.loading || exchanges.loading;

  return (
    <section>
      <div className="section-header animate-in">
        <h2 className="section-title">Cotações</h2>
        <p className="section-subtitle">
          {latestUpdate
            ? `Atualizado em ${new Date(latestUpdate).toLocaleString('pt-BR')}`
            : isLoading
            ? 'Carregando...'
            : 'Mercados em tempo real'}
        </p>
      </div>

      {/* Crypto */}
      <div className="animate-in animate-delay-1">
        <div className={styles.sectionTitle}>Top 10 Criptomoedas</div>
        <div className={`${styles.grid} ${styles.crypto}`}>
          {(crypto.data ?? []).map((coin) => (
            <QuoteItem
              key={coin.symbol}
              icon={
                (coin as any).image ? (
                  <img
                    src={(coin as any).image}
                    alt={coin.symbol}
                    style={{ width: 20, height: 20, borderRadius: 4 }}
                  />
                ) : (
                  coin.icon
                )
              }
              name={coin.name}
              subtitle={coin.symbol}
              price={coin.price}
              change={coin.change}
              extra={coin.marketCap}
            />
          ))}
        </div>
      </div>

      {/* Metals */}
      <div className="animate-in animate-delay-2">
        <div className={styles.sectionTitle}>Metais Preciosos</div>
        <div className={styles.grid}>
          {(metals.data ?? []).map((metal) => (
            <QuoteItem
              key={metal.symbol}
              icon={metal.symbol === 'XAU' ? 'Au' : 'Ag'}
              name={metal.name}
              subtitle={metal.unit}
              price={metal.price}
              change={metal.change}
              iconStyle={{ background: 'rgba(240, 185, 11, 0.12)', color: '#f0b90b' }}
            />
          ))}
        </div>
      </div>

      {/* Exchanges */}
      <div className="animate-in animate-delay-3">
        <div className={styles.sectionTitle}>Bolsas do Mundo</div>
        <div className={styles.grid}>
          {(exchanges.data ?? []).map((ex) => (
            <QuoteItem
              key={ex.name}
              icon={ex.name.substring(0, 2)}
              name={ex.name}
              subtitle={ex.location}
              price={ex.value}
              change={ex.change}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

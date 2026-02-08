import { useStaticData } from '../../hooks/useStaticData';
import { MOCK_CRYPTO, MOCK_EXCHANGES } from '../../data';
import type { CryptoQuote, ExchangeQuote } from '../../types';
import styles from './MarqueeTicker.module.css';

interface TickerItem {
  symbol: string;
  price: string;
  change: number;
}

function formatPrice(value: number, prefix = '$'): string {
  if (value >= 1000) {
    return prefix + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return prefix + value.toFixed(2);
}

export default function MarqueeTicker() {
  const crypto = useStaticData<CryptoQuote[]>('crypto.json', MOCK_CRYPTO);
  const exchanges = useStaticData<ExchangeQuote[]>('exchanges.json', MOCK_EXCHANGES);

  const items: TickerItem[] = [];

  // Crypto
  (crypto.data ?? []).forEach((c) => {
    items.push({
      symbol: c.symbol,
      price: formatPrice(c.price, 'US$ '),
      change: c.change,
    });
  });

  // Exchanges
  (exchanges.data ?? []).forEach((e) => {
    items.push({
      symbol: e.name,
      price: formatPrice(e.value, ''),
      change: e.change,
    });
  });

  if (items.length === 0) return null;

  // Duplicar os itens para criar o efeito infinito
  const tickerContent = (
    <>
      {items.map((item, i) => (
        <span key={i} className={styles.item}>
          <span className={styles.symbol}>{item.symbol}</span>
          <span className={styles.price}>{item.price}</span>
          <span className={`${styles.change} ${item.change >= 0 ? styles.positive : styles.negative}`}>
            {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change).toFixed(2)}%
          </span>
          <span className={styles.separator}>│</span>
        </span>
      ))}
    </>
  );

  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        <div className={styles.content}>
          {tickerContent}
          {tickerContent}
        </div>
      </div>
    </div>
  );
}

import { ArrowUpIcon, ArrowDownIcon } from '../Icons';
import { formatCurrency } from '../../utils/formatters';
import styles from './Quotes.module.css';

interface QuoteItemProps {
  icon: React.ReactNode;
  name: string;
  subtitle: string;
  price: number;
  change: number;
  extra?: string;
  iconStyle?: React.CSSProperties;
}

export default function QuoteItem({ icon, name, subtitle, price, change, extra, iconStyle }: QuoteItemProps) {
  const isPositive = change >= 0;

  return (
    <div className={styles.quoteItem}>
      <div className={styles.quoteLeft}>
        <div className={styles.quoteIcon} style={iconStyle}>
          {icon}
        </div>
        <div>
          <div className={styles.quoteName}>{name}</div>
          <div className={styles.quoteSymbol}>{subtitle}</div>
        </div>
      </div>
      <div className={styles.quoteRight}>
        <div className={styles.quotePrice}>${formatCurrency(price)}</div>
        <span className={`${styles.quoteChange} ${isPositive ? styles.positive : styles.negative}`}>
          {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
          {Math.abs(change)}%
        </span>
        {extra && <div className={styles.quoteCap}>{extra}</div>}
      </div>
    </div>
  );
}

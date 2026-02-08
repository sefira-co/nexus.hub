import styles from './Ticker.module.css';

export default function Ticker() {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.ticker}>
      <div className={styles.dot} />
      <span>Mercados abertos • {today}</span>
    </div>
  );
}

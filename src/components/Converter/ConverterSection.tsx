import { useState } from 'react';
import { SwapIcon } from '../Icons';
import { useStaticData } from '../../hooks/useStaticData';
import { CURRENCIES, MOCK_RATES, POPULAR_PAIRS } from '../../data';
import { formatCurrency } from '../../utils/formatters';
import styles from './Converter.module.css';

export default function ConverterSection() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [amount, setAmount] = useState('1000');

  const { data: rates, updatedAt } = useStaticData<Record<string, number>>(
    'currencies.json',
    MOCK_RATES
  );

  const activeRates = rates ?? MOCK_RATES;

  const convert = (): number => {
    const val = parseFloat(amount) || 0;
    const fromRate = activeRates[fromCurrency] ?? 1;
    const toRate = activeRates[toCurrency] ?? 1;
    return (val / fromRate) * toRate;
  };

  const rate = (activeRates[toCurrency] ?? 1) / (activeRates[fromCurrency] ?? 1);
  const result = convert();

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromInfo = CURRENCIES.find((c) => c.code === fromCurrency);
  const toInfo = CURRENCIES.find((c) => c.code === toCurrency);

  return (
    <section>
      <div className="section-header animate-in">
        <h2 className="section-title">Conversor</h2>
        <p className="section-subtitle">
          {updatedAt
            ? `Taxas atualizadas em ${new Date(updatedAt).toLocaleString('pt-BR')}`
            : 'Converta entre moedas em tempo real'}
        </p>
      </div>

      <div className={`card ${styles.converterCard} animate-in animate-delay-1`}>
        {/* From */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>De</label>
          <div className={styles.row}>
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} — {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.amountWrapper}>
              <input
                type="number"
                className={styles.amountInput}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Swap */}
        <button className={styles.swapBtn} onClick={swap} title="Trocar moedas">
          <SwapIcon />
        </button>

        {/* To */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Para</label>
          <div className={styles.row}>
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} — {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className={styles.resultBox}>
          <div className={styles.resultLabel}>
            {fromInfo?.flag} {parseFloat(amount || '0').toLocaleString()} {fromCurrency} =
          </div>
          <div className={styles.resultValue}>
            {toInfo?.flag} {formatCurrency(result)}
          </div>
          <div className={styles.resultRate}>
            1 {fromCurrency} = {formatCurrency(rate, 4)} {toCurrency}
          </div>
        </div>

        {/* Popular rates */}
        <div className={styles.popularGrid}>
          {POPULAR_PAIRS.map((pair) => {
            const r = (activeRates[pair.to] ?? 1) / (activeRates[pair.from] ?? 1);
            return (
              <div key={`${pair.from}-${pair.to}`} className={styles.popularItem}>
                <div className={styles.popularPair}>{pair.from}/{pair.to}</div>
                <div className={styles.popularValue}>{formatCurrency(r, 4)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

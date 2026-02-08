import type { Currency } from '../types';

export const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'Dólar Americano', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'BRL', name: 'Real Brasileiro', flag: '🇧🇷' },
  { code: 'GBP', name: 'Libra Esterlina', flag: '🇬🇧' },
  { code: 'JPY', name: 'Iene Japonês', flag: '🇯🇵' },
  { code: 'CHF', name: 'Franco Suíço', flag: '🇨🇭' },
  { code: 'CAD', name: 'Dólar Canadense', flag: '🇨🇦' },
  { code: 'AUD', name: 'Dólar Australiano', flag: '🇦🇺' },
  { code: 'CNY', name: 'Yuan Chinês', flag: '🇨🇳' },
  { code: 'KRW', name: 'Won Sul-Coreano', flag: '🇰🇷' },
  { code: 'ARS', name: 'Peso Argentino', flag: '🇦🇷' },
  { code: 'MXN', name: 'Peso Mexicano', flag: '🇲🇽' },
];

export const MOCK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  BRL: 5.78,
  GBP: 0.79,
  JPY: 157.34,
  CHF: 0.88,
  CAD: 1.37,
  AUD: 1.55,
  CNY: 7.24,
  KRW: 1345.67,
  ARS: 875.50,
  MXN: 17.12,
};

export const POPULAR_PAIRS = [
  { from: 'USD', to: 'BRL' },
  { from: 'EUR', to: 'BRL' },
  { from: 'USD', to: 'EUR' },
  { from: 'GBP', to: 'USD' },
];

import type { CryptoQuote, MetalQuote, ExchangeQuote } from '../types';

export const MOCK_CRYPTO: CryptoQuote[] = [
  { name: 'Bitcoin', symbol: 'BTC', price: 104532.80, change: 2.34, marketCap: '2.05T', icon: '₿' },
  { name: 'Ethereum', symbol: 'ETH', price: 3892.45, change: -1.23, marketCap: '468B', icon: 'Ξ' },
  { name: 'BNB', symbol: 'BNB', price: 712.30, change: 0.87, marketCap: '106B', icon: '◆' },
  { name: 'Solana', symbol: 'SOL', price: 198.67, change: 5.12, marketCap: '92B', icon: '◎' },
  { name: 'XRP', symbol: 'XRP', price: 2.48, change: -0.45, marketCap: '87B', icon: '✕' },
  { name: 'Cardano', symbol: 'ADA', price: 0.89, change: 1.76, marketCap: '31B', icon: '◇' },
  { name: 'Avalanche', symbol: 'AVAX', price: 42.35, change: -2.10, marketCap: '16B', icon: '▲' },
  { name: 'Dogecoin', symbol: 'DOGE', price: 0.182, change: 3.45, marketCap: '26B', icon: 'Ð' },
  { name: 'Polkadot', symbol: 'DOT', price: 8.92, change: 0.34, marketCap: '13B', icon: '●' },
  { name: 'Chainlink', symbol: 'LINK', price: 18.76, change: -0.89, marketCap: '11B', icon: '⬡' },
];

export const MOCK_METALS: MetalQuote[] = [
  { name: 'Ouro', symbol: 'XAU', price: 2438.50, change: 0.67, unit: 'USD/oz' },
  { name: 'Prata', symbol: 'XAG', price: 31.24, change: -0.32, unit: 'USD/oz' },
];

export const MOCK_EXCHANGES: ExchangeQuote[] = [
  { name: 'S&P 500', location: 'EUA', value: 5892.34, change: 0.45 },
  { name: 'NASDAQ', location: 'EUA', value: 19234.12, change: 0.78 },
  { name: 'Dow Jones', location: 'EUA', value: 43125.67, change: 0.23 },
  { name: 'IBOVESPA', location: 'Brasil', value: 134567.89, change: -0.34 },
  { name: 'FTSE 100', location: 'UK', value: 8234.56, change: 0.12 },
  { name: 'DAX', location: 'Alemanha', value: 18945.23, change: -0.56 },
  { name: 'Nikkei 225', location: 'Japão', value: 39876.45, change: 1.23 },
  { name: 'Shanghai', location: 'China', value: 3234.67, change: -0.89 },
  { name: 'Hang Seng', location: 'Hong Kong', value: 18456.78, change: 0.67 },
  { name: 'CAC 40', location: 'França', value: 7823.45, change: 0.34 },
];

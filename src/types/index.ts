export interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  summary: string;
}

export type NewsCategory = 'tecnologia' | 'economia' | 'politica';

export interface CryptoQuote {
  name: string;
  symbol: string;
  price: number;
  change: number;
  marketCap: string;
  icon: string;
}

export interface MetalQuote {
  name: string;
  symbol: string;
  price: number;
  change: number;
  unit: string;
}

export interface ExchangeQuote {
  name: string;
  location: string;
  value: number;
  change: number;
}

export interface Currency {
  code: string;
  name: string;
  flag: string;
}

export interface Report {
  id: number;
  name: string;
  size: number;
  type: FileType;
  date: string;
  url: string;
}

export type FileType = 'pdf' | 'doc' | 'xls' | 'img' | 'other';

export type SectionId = 'news' | 'quotes' | 'reports' | 'converter';

export interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
}

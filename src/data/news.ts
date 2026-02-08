import type { NewsItem, NewsCategory } from '../types';

/**
 * Dados de fallback exibidos APENAS antes do primeiro GitHub Actions rodar.
 * Depois que o cron popular public/data/news.json, esses mocks não são mais usados.
 */
export const MOCK_NEWS: Record<NewsCategory, NewsItem[]> = {
  tecnologia: [
    { id: 1, title: '[DEMO] Aguardando dados reais — Execute o GitHub Actions', source: 'NEXUS.hub', time: 'agora', summary: 'Os dados reais serão carregados automaticamente após o primeiro run do workflow "Atualizar Dados" no GitHub Actions.' },
  ],
  economia: [
    { id: 2, title: '[DEMO] Aguardando dados reais — Execute o GitHub Actions', source: 'NEXUS.hub', time: 'agora', summary: 'Vá na aba Actions do seu repositório e rode o workflow manualmente para popular os dados.' },
  ],
  politica: [
    { id: 3, title: '[DEMO] Aguardando dados reais — Execute o GitHub Actions', source: 'NEXUS.hub', time: 'agora', summary: 'Após configurar o secret GNEWS_API_KEY, as notícias reais aparecerão aqui.' },
  ],
};

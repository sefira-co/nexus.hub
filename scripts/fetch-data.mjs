/**
 * NEXUS.hub - Data Fetcher
 * Roda 2x/dia via GitHub Actions, busca dados de APIs gratuitas
 * e salva como JSON estático em public/data/
 *
 * APIs utilizadas (todas gratuitas, sem chave):
 * - CoinGecko: criptomoedas
 * - ExchangeRate API: câmbio
 * - Open Metais via frankfurter.app: câmbio backup
 * - GNews: notícias (precisa de chave gratuita)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'public', 'data');

// ─── Helpers ───

async function fetchJSON(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
    return await res.json();
  } catch (err) {
    console.error(`❌ Falha ao buscar ${url}:`, err.message);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function saveJSON(filename, data) {
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ Salvo: ${filename}`);
}

function loadExisting(filename) {
  const filepath = path.join(DATA_DIR, filename);
  if (fs.existsSync(filepath)) {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  }
  return null;
}

// ─── Crypto (CoinGecko - sem chave) ───

async function fetchCrypto() {
  console.log('\n🪙 Buscando criptomoedas...');

  const data = await fetchJSON(
    'https://api.coingecko.com/api/v3/coins/markets?' +
    new URLSearchParams({
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: '10',
      page: '1',
      sparkline: 'false',
      price_change_percentage: '24h',
    })
  );

  if (!data) return loadExisting('crypto.json');

  const crypto = data.map((coin) => ({
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    price: coin.current_price,
    change: parseFloat((coin.price_change_percentage_24h || 0).toFixed(2)),
    marketCap: formatMarketCap(coin.market_cap),
    image: coin.image,
  }));

  return { data: crypto, updated_at: new Date().toISOString() };
}

function formatMarketCap(cap) {
  if (cap >= 1e12) return (cap / 1e12).toFixed(2) + 'T';
  if (cap >= 1e9) return (cap / 1e9).toFixed(2) + 'B';
  if (cap >= 1e6) return (cap / 1e6).toFixed(2) + 'M';
  return cap.toString();
}

// ─── Metais preciosos (Metal Price API - sem chave) ───

async function fetchMetals() {
  console.log('\n🥇 Buscando metais preciosos...');

  // Usa a API pública do Frankfurter como base USD
  // Para ouro e prata, usamos a API gratuita metals.dev ou fallback
  const data = await fetchJSON(
    'https://api.metalpriceapi.com/v1/latest?api_key=demo&base=USD&currencies=XAU,XAG'
  );

  // Se a API pública não funcionar, tenta alternativa
  if (!data || !data.rates) {
    console.log('  ⚠️ Tentando API alternativa para metais...');

    // Fallback: usar goldapi.io demo ou dados anteriores
    const goldData = await fetchJSON('https://www.goldapi.io/api/XAU/USD', {
      headers: { 'x-access-token': 'goldapi-demo' }
    });

    const silverData = await fetchJSON('https://www.goldapi.io/api/XAG/USD', {
      headers: { 'x-access-token': 'goldapi-demo' }
    });

    if (goldData?.price || silverData?.price) {
      return {
        data: [
          {
            name: 'Ouro',
            symbol: 'XAU',
            price: goldData?.price || 0,
            change: parseFloat((goldData?.ch_percentage || 0).toFixed(2)),
            unit: 'USD/oz',
          },
          {
            name: 'Prata',
            symbol: 'XAG',
            price: silverData?.price || 0,
            change: parseFloat((silverData?.ch_percentage || 0).toFixed(2)),
            unit: 'USD/oz',
          },
        ],
        updated_at: new Date().toISOString(),
      };
    }

    return loadExisting('metals.json');
  }

  // XAU e XAG vêm como fração (1 USD = X onças), precisamos inverter
  const metals = [
    {
      name: 'Ouro',
      symbol: 'XAU',
      price: data.rates.XAU ? parseFloat((1 / data.rates.XAU).toFixed(2)) : 0,
      change: 0, // API básica não retorna variação
      unit: 'USD/oz',
    },
    {
      name: 'Prata',
      symbol: 'XAG',
      price: data.rates.XAG ? parseFloat((1 / data.rates.XAG).toFixed(2)) : 0,
      change: 0,
      unit: 'USD/oz',
    },
  ];

  return { data: metals, updated_at: new Date().toISOString() };
}

// ─── Bolsas do mundo (Yahoo Finance scraping via API gratuita) ───

async function fetchExchanges() {
  console.log('\n📊 Buscando bolsas...');

  const indices = [
    { symbol: '^GSPC', name: 'S&P 500', location: 'EUA' },
    { symbol: '^IXIC', name: 'NASDAQ', location: 'EUA' },
    { symbol: '^DJI', name: 'Dow Jones', location: 'EUA' },
    { symbol: '^BVSP', name: 'IBOVESPA', location: 'Brasil' },
    { symbol: '^FTSE', name: 'FTSE 100', location: 'UK' },
    { symbol: '^GDAXI', name: 'DAX', location: 'Alemanha' },
    { symbol: '^N225', name: 'Nikkei 225', location: 'Japão' },
    { symbol: '000001.SS', name: 'Shanghai', location: 'China' },
    { symbol: '^HSI', name: 'Hang Seng', location: 'Hong Kong' },
    { symbol: '^FCHI', name: 'CAC 40', location: 'França' },
  ];

  const symbols = indices.map((i) => i.symbol).join(',');

  // Tenta Yahoo Finance v8 (pública, sem chave)
  const data = await fetchJSON(
    `https://query1.finance.yahoo.com/v8/finance/spark?symbols=${encodeURIComponent(symbols)}&range=1d&interval=1d`
  );

  if (!data?.spark?.result) {
    console.log('  ⚠️ Yahoo Finance indisponível, tentando alternativa...');

    // Alternativa: buscar individualmente via v6 quote
    const quoteData = await fetchJSON(
      `https://query1.finance.yahoo.com/v6/finance/quote?symbols=${encodeURIComponent(symbols)}`
    );

    if (quoteData?.quoteResponse?.result) {
      const exchanges = quoteData.quoteResponse.result.map((quote) => {
        const meta = indices.find((i) => i.symbol === quote.symbol);
        return {
          name: meta?.name || quote.shortName,
          location: meta?.location || '',
          value: quote.regularMarketPrice || 0,
          change: parseFloat((quote.regularMarketChangePercent || 0).toFixed(2)),
        };
      });

      return { data: exchanges, updated_at: new Date().toISOString() };
    }

    return loadExisting('exchanges.json');
  }

  const exchanges = data.spark.result.map((item) => {
    const meta = indices.find((i) => i.symbol === item.symbol);
    const close = item.response?.[0]?.meta?.regularMarketPrice || 0;
    const prevClose = item.response?.[0]?.meta?.chartPreviousClose || close;
    const changePct = prevClose ? ((close - prevClose) / prevClose) * 100 : 0;

    return {
      name: meta?.name || item.symbol,
      location: meta?.location || '',
      value: parseFloat(close.toFixed(2)),
      change: parseFloat(changePct.toFixed(2)),
    };
  });

  return { data: exchanges, updated_at: new Date().toISOString() };
}

// ─── Câmbio (Frankfurter.app - totalmente gratuita, sem chave) ───

async function fetchCurrencies() {
  console.log('\n💱 Buscando câmbio...');

  const currencies = ['EUR', 'BRL', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'CNY', 'KRW', 'ARS', 'MXN'];

  // Frankfurter.app - gratuita, sem limite, sem chave
  const data = await fetchJSON(
    `https://api.frankfurter.app/latest?from=USD&to=${currencies.join(',')}`
  );

  if (!data?.rates) {
    // Fallback: exchangerate.host
    const fallback = await fetchJSON(
      `https://open.er-api.com/v6/latest/USD`
    );

    if (fallback?.rates) {
      const rates = { USD: 1 };
      currencies.forEach((c) => {
        if (fallback.rates[c]) rates[c] = fallback.rates[c];
      });
      return { data: rates, updated_at: new Date().toISOString() };
    }

    return loadExisting('currencies.json');
  }

  const rates = { USD: 1, ...data.rates };
  return { data: rates, updated_at: new Date().toISOString() };
}

// ─── Notícias (GNews - gratuita com chave, 100 requests/dia) ───

async function fetchNews() {
  console.log('\n📰 Buscando notícias...');

  const GNEWS_KEY = process.env.GNEWS_API_KEY || '';

  if (!GNEWS_KEY) {
    console.log('  ⚠️ GNEWS_API_KEY não configurada, pulando notícias...');
    return loadExisting('news.json');
  }

  const categories = {
    tecnologia: { q: 'technology', topic: 'technology' },
    economia: { q: 'economy OR finance OR market', topic: 'business' },
    politica: { q: 'politics OR government', topic: 'world' },
  };

  const news = {};

  for (const [key, params] of Object.entries(categories)) {
    const data = await fetchJSON(
      `https://gnews.io/api/v4/top-headlines?` +
      new URLSearchParams({
        token: GNEWS_KEY,
        lang: 'pt',
        country: 'br',
        topic: params.topic,
        max: '5',
      })
    );

    if (data?.articles) {
      news[key] = data.articles.map((article, i) => ({
        id: `${key}-${i}`,
        title: article.title,
        source: article.source?.name || 'Desconhecido',
        time: formatTimeAgo(article.publishedAt),
        summary: article.description || '',
        url: article.url,
        image: article.image,
      }));
    } else {
      // Mantém dados anteriores para essa categoria
      const existing = loadExisting('news.json');
      news[key] = existing?.data?.[key] || [];
    }

    // Respeitar rate limit
    await sleep(1000);
  }

  return { data: news, updated_at: new Date().toISOString() };
}

function formatTimeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}min atrás`;
  if (diffHours < 24) return `${diffHours}h atrás`;
  return `${diffDays}d atrás`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Main ───

async function main() {
  console.log('🚀 NEXUS.hub Data Fetcher');
  console.log(`📅 ${new Date().toISOString()}\n`);

  // Garantir que o diretório existe
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Buscar tudo em paralelo (exceto notícias que tem rate limit)
  const [crypto, metals, exchanges, currencies] = await Promise.all([
    fetchCrypto(),
    fetchMetals(),
    fetchExchanges(),
    fetchCurrencies(),
  ]);

  // Notícias por último (rate limited)
  const news = await fetchNews();

  // Salvar JSONs
  if (crypto) saveJSON('crypto.json', crypto);
  if (metals) saveJSON('metals.json', metals);
  if (exchanges) saveJSON('exchanges.json', exchanges);
  if (currencies) saveJSON('currencies.json', currencies);
  if (news) saveJSON('news.json', news);

  // Salvar metadata
  saveJSON('meta.json', {
    last_update: new Date().toISOString(),
    sources: {
      crypto: 'CoinGecko',
      metals: 'Metal Price API / GoldAPI',
      exchanges: 'Yahoo Finance',
      currencies: 'Frankfurter.app',
      news: 'GNews',
    },
  });

  console.log('\n✅ Todos os dados atualizados!');
}

main().catch(console.error);

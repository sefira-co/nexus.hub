# NEXUS.hub

Dashboard financeiro com notícias, cotações de mercado, relatórios e conversor de moedas.

## 🚀 Stack

- **Vite** + **React 18** + **TypeScript**
- CSS Modules (sem dependências externas de UI)
- Mobile-first responsive design

## 📁 Estrutura

```
src/
├── components/
│   ├── Converter/        # Conversor de moedas
│   ├── Layout/           # Header, Ticker
│   ├── News/             # Seção de notícias
│   ├── Quotes/           # Cotações (crypto, metais, bolsas)
│   ├── Reports/          # Upload de relatórios
│   └── Icons.tsx         # Ícones SVG
├── data/                 # Dados mock (substituir por APIs)
├── styles/               # Variáveis e estilos globais
├── types/                # TypeScript types
├── utils/                # Funções utilitárias
├── App.tsx
└── main.tsx
```

## 🛠️ Desenvolvimento

```bash
npm install
npm run dev
```

## 📦 Deploy na Vercel

```bash
npm run build
```

1. Conecte o repositório no vercel.com
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy automático a cada push!

Ou via CLI: `npm i -g vercel && vercel`

## 🔌 APIs reais (substituir mocks)

- **Notícias**: NewsAPI ou GNews
- **Criptomoedas**: CoinGecko API (gratuita)
- **Cotações/Bolsas**: Alpha Vantage ou Twelve Data
- **Câmbio**: ExchangeRate API ou Open Exchange Rates

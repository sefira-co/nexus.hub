import { useState } from 'react';
import { useStaticData } from '../../hooks/useStaticData';
import { MOCK_NEWS } from '../../data';
import type { NewsItem, NewsCategory } from '../../types';
import styles from './News.module.css';

const tabs: { id: NewsCategory; label: string }[] = [
  { id: 'tecnologia', label: 'Tecnologia' },
  { id: 'economia', label: 'Economia' },
  { id: 'politica', label: 'Política' },
];

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState<NewsCategory>('tecnologia');
  const { data, loading, updatedAt } = useStaticData<Record<NewsCategory, NewsItem[]>>(
    'news.json',
    MOCK_NEWS
  );

  const articles = data?.[activeTab] ?? [];

  return (
    <section>
      <div className="section-header animate-in">
        <h2 className="section-title">Notícias</h2>
        <p className="section-subtitle">
          {updatedAt
            ? `Atualizado em ${new Date(updatedAt).toLocaleString('pt-BR')}`
            : 'Últimas atualizações do mercado e do mundo'}
        </p>
      </div>

      <div className={`${styles.tabs} animate-in`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.loading}>Carregando notícias...</div>
      ) : (
        <div className={styles.list}>
          {articles.map((item, i) => {
            const url = (item as any).url;
            const hasUrl = url && url !== '#';
            const image = (item as any).image;

            const content = (
              <>
                {image && (
                  <div className={styles.imageWrapper}>
                    <img src={image} alt="" className={styles.image} loading="lazy" />
                  </div>
                )}
                <div className={styles.cardContent}>
                  <div className={styles.meta}>
                    <span className={styles.source}>{item.source}</span>
                    <span className={styles.time}>• {item.time}</span>
                  </div>
                  <h3 className={styles.title}>
                    {item.title}
                    {hasUrl && (
                      <span className={styles.linkIcon}>
                        <ExternalLinkIcon />
                      </span>
                    )}
                  </h3>
                  <p className={styles.summary}>{item.summary}</p>
                  {hasUrl && (
                    <span className={styles.readMore}>Ler matéria completa →</span>
                  )}
                </div>
              </>
            );

            if (hasUrl) {
              return (
                <a
                  key={item.id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`card ${styles.newsCard} ${styles.hasImage} animate-in animate-delay-${Math.min(i + 1, 4)}`}
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={item.id}
                className={`card ${styles.newsCard} ${styles.noLink} animate-in animate-delay-${Math.min(i + 1, 4)}`}
              >
                {content}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

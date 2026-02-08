import { useState } from 'react';
import Header from './components/Layout/Header';
import Ticker from './components/Layout/Ticker';
import NewsSection from './components/News/NewsSection';
import QuotesSection from './components/Quotes/QuotesSection';
import ReportsSection from './components/Reports/ReportsSection';
import ConverterSection from './components/Converter/ConverterSection';
import type { SectionId } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('news');

  const renderSection = () => {
    switch (activeSection) {
      case 'news':
        return <NewsSection />;
      case 'quotes':
        return <QuotesSection />;
      case 'reports':
        return <ReportsSection />;
      case 'converter':
        return <ConverterSection />;
      default:
        return <NewsSection />;
    }
  };

  return (
    <div className="app">
      <Header activeSection={activeSection} onNavigate={setActiveSection} />
      <Ticker />
      <main className="main" key={activeSection}>
        {renderSection()}
      </main>
    </div>
  );
}

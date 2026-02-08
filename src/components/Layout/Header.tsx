import { useState } from 'react';
import { NewsIcon, ChartIcon, ReportIcon, ConverterIcon, MenuIcon, CloseIcon } from '../Icons';
import type { SectionId, NavItem } from '../../types';
import styles from './Header.module.css';

interface HeaderProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

const navItems: NavItem[] = [
  { id: 'news', label: 'Notícias', icon: <NewsIcon /> },
  { id: 'quotes', label: 'Cotações', icon: <ChartIcon /> },
  { id: 'reports', label: 'Relatórios', icon: <ReportIcon /> },
  { id: 'converter', label: 'Conversor', icon: <ConverterIcon /> },
];

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = (id: SectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          NEXUS<span className={styles.logoDot}>.</span>hub
        </div>

        <nav className={styles.desktopNav}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => navigate(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <button className={styles.menuBtn} onClick={() => setMobileMenuOpen(true)}>
          <MenuIcon />
        </button>
      </header>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${mobileMenuOpen ? styles.visible : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        <button className={`${styles.menuBtn} ${styles.closeBtn}`} onClick={() => setMobileMenuOpen(false)}>
          <CloseIcon />
        </button>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${styles.mobileNavItem} ${activeSection === item.id ? styles.active : ''}`}
            onClick={() => navigate(item.id)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}

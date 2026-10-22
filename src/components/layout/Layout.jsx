import { Sidebar } from './Sidebar';
import { Header } from './Header';

/**
 * Layout — головна обгортка додатку.
 * Поєднує Sidebar + Header + основний вміст.
 *
 * Props:
 * - activeSection: string
 * - onNavigate: function
 * - idleStatus: string
 * - accentColor: string
 * - children: ReactNode — вміст поточної секції
 */
export function Layout({ activeSection, onNavigate, idleStatus, accentColor, children }) {
  return (
    <div className="app-layout">
      {/* Бічна навігація */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={onNavigate}
        accentColor={accentColor}
      />

      {/* Основний контент */}
      <div className="main-content">
        <Header
          activeSection={activeSection}
          idleStatus={idleStatus}
          accentColor={accentColor}
        />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}

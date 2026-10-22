import { NAV_ITEMS } from '../../constants/navigation';

const STATUS_CFG = {
  active:  { label: 'Активний',         color: '#10b981', dot: 'status-active'  },
  idle:    { label: 'Бездіяльність',     color: '#f59e0b', dot: 'status-idle'    },
  timeout: { label: 'Сесія завершена',   color: '#ef4444', dot: 'status-offline' },
};

export function Header({ activeSection, idleStatus, accentColor = '#7c3aed' }) {
  const current = NAV_ITEMS.find(i => i.id === activeSection);
  const st = STATUS_CFG[idleStatus] || STATUS_CFG.active;

  return (
    <header style={{
      height: 68,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(14,14,28,0.85)',
      backdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      {/* Ліво — назва секції */}
      <div>
        <h2 style={{
          fontSize: 20, fontWeight: 800,
          color: '#f1f5f9', letterSpacing: '-0.3px', lineHeight: 1.2,
        }}>
          {current?.label || 'React Library Showcase'}
        </h2>
        <p style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>
          {current?.description || 'Навчальний інтерактивний дашборд'}
        </p>
      </div>

      {/* Право — статуси */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Idle status */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '7px 16px', borderRadius: 999,
          background: `${st.color}12`,
          border: `1px solid ${st.color}35`,
        }}>
          <span className={`status-dot ${st.dot}`} />
          <span style={{ fontSize: 12, color: st.color, fontWeight: 700 }}>
            {st.label}
          </span>
        </div>

        {/* Separator */}
        <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.08)' }} />

        {/* Tech tags */}
        <div style={{ display: 'flex', gap: 6 }}>
          {['React 19', 'Vite 6', 'TW v4'].map(tag => (
            <span key={tag} style={{
              fontSize: 11, fontWeight: 700,
              padding: '4px 10px', borderRadius: 8,
              background: `${accentColor}18`,
              color: accentColor,
              border: `1px solid ${accentColor}35`,
              transition: 'all 0.4s ease',
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </header>
  );
}

import {
  MdDashboard, MdEmojiEmotions, MdNotifications,
  MdTimer, MdColorLens, MdCode, MdStar,
  MdArrowUpward,
} from 'react-icons/md';
import { NAV_ITEMS } from '../../constants/navigation';

const ICON_MAP = {
  MdDashboard:    <MdDashboard />,
  MdEmojiEmotions:<MdEmojiEmotions />,
  MdNotifications:<MdNotifications />,
  MdTimer:        <MdTimer />,
  MdColorLens:    <MdColorLens />,
};

export function Sidebar({ activeSection, onNavigate, accentColor = '#7c3aed' }) {
  return (
    <aside style={{
      width: 260,
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      background: 'linear-gradient(180deg, #0b0b1a 0%, #0e0e1c 100%)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
    }}>

      {/* ── Логотип ── */}
      <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 14,
            background: `linear-gradient(135deg, ${accentColor}, #4f46e5)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 24px ${accentColor}55`,
            transition: 'box-shadow 0.4s ease',
            flexShrink: 0,
          }}>
            <MdCode size={24} style={{ color: 'white' }} />
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: '#f1f5f9', letterSpacing: '-0.3px' }}>
              React
            </div>
            <div style={{ fontWeight: 900, fontSize: 18, color: accentColor, transition: 'color 0.4s ease', letterSpacing: '-0.3px', lineHeight: 1 }}>
              Showcase
            </div>
          </div>
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 10px', borderRadius: 999,
          background: `${accentColor}18`,
          border: `1px solid ${accentColor}33`,
          fontSize: 11, color: accentColor, fontWeight: 700,
          transition: 'all 0.4s ease',
        }}>
          <MdStar size={11} /> 5 бібліотек · HW #51
        </div>
      </div>

      {/* ── Навігація ── */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        <p style={{
          fontSize: 10, fontWeight: 800, color: '#334155',
          textTransform: 'uppercase', letterSpacing: '0.1em',
          padding: '0 10px', marginBottom: 10,
        }}>Секції</p>

        {NAV_ITEMS.map((item, i) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '11px 12px',
                borderRadius: 14,
                border: 'none',
                cursor: 'pointer',
                marginBottom: 4,
                transition: 'all 0.2s ease',
                background: isActive
                  ? `linear-gradient(135deg, ${item.color}22, ${item.color}0a)`
                  : 'transparent',
                borderLeft: `3px solid ${isActive ? item.color : 'transparent'}`,
                color: isActive ? '#f1f5f9' : '#64748b',
                textAlign: 'left',
                fontFamily: 'var(--font-sans)',
                animation: `fadeInUp 0.4s ease forwards ${i * 0.07}s`,
                opacity: 0,
              }}
            >
              <span style={{
                fontSize: 22, color: isActive ? item.color : '#334155',
                transition: 'color 0.2s ease', flexShrink: 0,
                display: 'flex', alignItems: 'center',
              }}>
                {ICON_MAP[item.icon]}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: isActive ? 700 : 500, fontSize: 14, lineHeight: 1.3 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 11, color: '#334155', marginTop: 1, lineHeight: 1 }}>
                  {item.description}
                </div>
              </div>
              {isActive && (
                <div style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: item.color,
                  boxShadow: `0 0 10px ${item.color}`,
                  flexShrink: 0,
                }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Нижня плашка ── */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['React 19', 'Vite 6', 'TW v4'].map(t => (
            <span key={t} style={{
              fontSize: 10, fontWeight: 700,
              padding: '3px 8px', borderRadius: 6,
              background: `${accentColor}15`,
              color: accentColor,
              border: `1px solid ${accentColor}30`,
              transition: 'all 0.4s ease',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </aside>
  );
}

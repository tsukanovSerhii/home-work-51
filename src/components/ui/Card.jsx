/**
 * Card — universальна картка секції
 */
export function Card({ title, subtitle, badge, badgeVariant = 'accent', icon, children, className = '', style = {} }) {
  return (
    <div className={`glass-card ${className}`} style={{ padding: 28, ...style }}>
      {(title || badge) && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {icon && (
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'rgba(124,58,237,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#a855f7', fontSize: 20, flexShrink: 0,
              }}>
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#f1f5f9', lineHeight: 1.2 }}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p style={{ fontSize: 12, color: '#64748b', marginTop: 3 }}>{subtitle}</p>
              )}
            </div>
          </div>
          {badge && <span className={`badge badge-${badgeVariant}`}>{badge}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * StatCard — картка статистики (використовується в Dashboard)
 */
export function StatCard({ label, value, delta, positive = true, icon, color = '#7c3aed' }) {
  return (
    <div className="stat-card" style={{ borderLeft: `3px solid ${color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {label}
        </span>
        {icon && (
          <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
            {icon}
          </div>
        )}
      </div>
      <div style={{ fontSize: 40, fontWeight: 900, color: '#f1f5f9', lineHeight: 1, marginBottom: 10, letterSpacing: '-1.5px' }}>
        {value}
      </div>
      {delta && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          fontSize: 12, fontWeight: 600,
          color: positive ? '#10b981' : '#ef4444',
          background: positive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
          padding: '3px 10px', borderRadius: 999,
        }}>
          {positive ? '↑' : '↓'} {delta} цього тижня
        </div>
      )}
    </div>
  );
}

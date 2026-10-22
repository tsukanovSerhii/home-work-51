import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Area, AreaChart,
} from 'recharts';
import { MdCode, MdLibraryBooks, MdTrendingUp, MdBugReport } from 'react-icons/md';
import { FaReact } from 'react-icons/fa';
import { ACTIVITY_DATA, TOAST_PIE_DATA, LIBRARIES_DATA, STATS_DATA } from '../../constants/navigation';

// ─── Custom Recharts Tooltip ──────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#1a1a32',
      border: '1px solid rgba(124,58,237,0.4)',
      borderRadius: 12, padding: '12px 16px', fontSize: 13,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    }}>
      {label && <p style={{ color: '#94a3b8', marginBottom: 8, fontWeight: 700, fontSize: 12 }}>{label}</p>}
      {payload.map((e, i) => (
        <p key={i} style={{ color: e.color || '#a855f7', marginBottom: 3 }}>
          <span style={{ opacity: 0.7 }}>{e.name}: </span>
          <strong>{e.value}</strong>
        </p>
      ))}
    </div>
  );
};

// ─── Stat Cards config ───────────────────────────────────────────────
const STAT_CONFIG = [
  { icon: <MdCode size={22} />,        color: '#7c3aed', bg: 'rgba(124,58,237,0.12)'  },
  { icon: <MdLibraryBooks size={22} />, color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  { icon: <MdTrendingUp size={22} />,   color: '#10b981', bg: 'rgba(16,185,129,0.12)'  },
  { icon: <MdBugReport size={22} />,    color: '#f59e0b', bg: 'rgba(245,158,11,0.12)'  },
];

export function Dashboard() {
  return (
    <div>
      {/* ── Hero Header ─────────────────────────────────────────────── */}
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{
            padding: '8px 10px', borderRadius: 12,
            background: 'rgba(124,58,237,0.15)',
            border: '1px solid rgba(124,58,237,0.25)',
            display: 'flex',
          }}>
            <FaReact size={22} style={{ color: '#a855f7' }} className="animate-float" />
          </div>
          <span className="badge badge-accent">recharts</span>
          <span className="badge badge-info">react-icons</span>
        </div>
        <h1>
          <span className="gradient-text">Dashboard</span>
          <span style={{ color: '#f1f5f9' }}> — Огляд проекту</span>
        </h1>
        <p>Статистика розробки та аналітика використання бібліотек. Графіки побудовані за допомогою <strong style={{ color: '#a855f7' }}>Recharts</strong>.</p>
      </div>

      {/* ── Stat Cards ──────────────────────────────────────────────── */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        {STATS_DATA.map((stat, i) => {
          const cfg = STAT_CONFIG[i];
          return (
            <div
              key={stat.label}
              className="stat-card animate-fade-in-up"
              style={{
                animationDelay: `${i * 0.08}s`,
                borderLeft: `3px solid ${cfg.color}`,
              }}
            >
              {/* Декоративне коло */}
              <div style={{
                position: 'absolute', top: -20, right: -20,
                width: 110, height: 110, borderRadius: '50%',
                background: cfg.color, opacity: 0.08,
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, position: 'relative' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {stat.label}
                </span>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: cfg.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: cfg.color, flexShrink: 0,
                }}>
                  {cfg.icon}
                </div>
              </div>

              <div style={{
                fontSize: 42, fontWeight: 900, color: '#f1f5f9',
                lineHeight: 1, marginBottom: 10, letterSpacing: '-2px',
                position: 'relative',
              }}>
                {stat.value}
              </div>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 12, fontWeight: 600,
                color: stat.positive ? '#10b981' : '#ef4444',
                background: stat.positive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                padding: '3px 10px', borderRadius: 999,
              }}>
                <span>{stat.positive ? '↑' : '↓'}</span>
                <span>{stat.delta} цього тижня</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Area Chart — Активність ─────────────────────────────────── */}
      <div
        className="glass-card animate-fade-in-up delay-200"
        style={{ padding: 32, marginBottom: 24 }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
              Активність розробки за тиждень
            </h3>
            <p style={{ fontSize: 13, color: '#64748b' }}>
              <code style={{ fontFamily: 'var(--font-mono)', color: '#a855f7' }}>{'<AreaChart>'}</code> з recharts — commits та компоненти
            </p>
          </div>
          <span className="badge badge-accent">recharts</span>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={ACTIVITY_DATA}>
            <defs>
              <linearGradient id="commitGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 13, color: '#94a3b8', paddingTop: 12 }} />
            <Area type="monotone" dataKey="commits" name="Commits" stroke="#a855f7" strokeWidth={2.5} fill="url(#commitGrad)" dot={{ fill: '#a855f7', strokeWidth: 0, r: 4 }} activeDot={{ r: 7, fill: '#a855f7' }} />
            <Area type="monotone" dataKey="components" name="Компоненти" stroke="#10b981" strokeWidth={2.5} fill="url(#compGrad)" dot={{ fill: '#10b981', strokeWidth: 0, r: 4 }} activeDot={{ r: 7 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Pie + Bar ───────────────────────────────────────────────── */}
      <div className="grid-2">
        {/* PieChart */}
        <div className="glass-card animate-fade-in-up delay-300" style={{ padding: 32 }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
              Розподіл Toast-сповіщень
            </h3>
            <p style={{ fontSize: 13, color: '#64748b' }}>
              <code style={{ fontFamily: 'var(--font-mono)', color: '#a855f7' }}>{'<PieChart>'}</code> — відсотки за типами
            </p>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={TOAST_PIE_DATA} cx="50%" cy="50%" innerRadius={65} outerRadius={105} paddingAngle={4} dataKey="value" strokeWidth={0}>
                {TOAST_PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={v => <span style={{ color: '#94a3b8', fontSize: 13 }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BarChart */}
        <div className="glass-card animate-fade-in-up delay-400" style={{ padding: 32 }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
              Популярність бібліотек
            </h3>
            <p style={{ fontSize: 13, color: '#64748b' }}>
              <code style={{ fontFamily: 'var(--font-mono)', color: '#a855f7' }}>{'<BarChart>'}</code> — npm завантажень/тиждень (млн)
            </p>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={LIBRARIES_DATA} layout="vertical" barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} width={115} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="downloads" name="млн/тиждень" radius={[0, 8, 8, 0]} maxBarSize={28}>
                {LIBRARIES_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Info pill ───────────────────────────────────────────────── */}
      <div style={{
        marginTop: 28, padding: '18px 24px', borderRadius: 16,
        background: 'rgba(124,58,237,0.08)',
        border: '1px solid rgba(124,58,237,0.2)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ fontSize: 22 }}>📦</span>
        <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.7 }}>
          <strong style={{ color: '#f1f5f9' }}>Recharts</strong> — побудований на SVG + D3.js.
          Декларативний API: графіки — це JSX-компоненти.
          {' '}<code style={{ fontFamily: 'var(--font-mono)', color: '#86efac', fontSize: 13 }}>npm install recharts</code>
        </p>
      </div>
    </div>
  );
}

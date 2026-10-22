import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  MdTimer, MdPlayArrow, MdPause, MdRefresh,
  MdMouse, MdKeyboard, MdTouchApp, MdHistory,
} from 'react-icons/md';
import { useIdleSession } from '../../hooks/useIdleSession';
import { IdleWarningModal } from '../ui/IdleWarningModal';
import { Card } from '../ui/Card';
import { CodeBlock } from '../ui/CodeBlock';

// ─── Блоки коду ───────────────────────────────────────────────────────
const INSTALL_CODE = `// Встановлення
npm install react-idle-timer

// Базове використання
import { useIdleTimer } from 'react-idle-timer';

function App() {
  const { isIdle, getRemainingTime } = useIdleTimer({
    timeout: 30_000,   // 30 секунд бездіяльності
    throttle: 500,     // throttle для onAction (мс)
    onIdle: () => console.log('Користувач неактивний!'),
    onActive: () => console.log('Користувач повернувся!'),
    onAction: () => console.log('Дія виявлена'),
  });

  return <div>{isIdle() ? 'Idle' : 'Active'}</div>;
}`;

const HOOK_CODE = `// Всі параметри useIdleTimer
const {
  isIdle,           // function() → boolean
  isActive,         // function() → boolean
  getRemainingTime, // function() → number (мс до idle)
  getElapsedTime,   // function() → number (мс з останньої дії)
  getLastActiveTime,// function() → Date
  reset,            // function() → скидає таймер
  pause,            // function() → зупиняє таймер
  resume,           // function() → відновлює таймер
  message,          // function(data) → надсилає повідомлення між вкладками
} = useIdleTimer({
  timeout: 60_000,
  throttle: 500,
  crossTab: true,    // синхронізація між вкладками
  syncTimers: 200,   // інтервал синхронізації (мс)
  onIdle,
  onActive,
  onAction,
  onMessage,         // callback для крос-вкладкових повідомлень
});`;

// Іконки типів подій у логу
const EVENT_ICONS = {
  active: <MdPlayArrow size={14} />,
  idle: <MdPause size={14} />,
  action: <MdMouse size={14} />,
  config: <MdTimer size={14} />,
  timeout: <MdRefresh size={14} />,
};

const EVENT_COLORS = {
  active: '#10b981',
  idle: '#f59e0b',
  action: '#a855f7',
  config: '#3b82f6',
  timeout: '#ef4444',
};

const TIMEOUT_OPTIONS = [
  { label: '15 сек', value: 15000 },
  { label: '30 сек', value: 30000 },
  { label: '60 сек', value: 60000 },
];

/**
 * IdleTimerShowcase — секція демонстрації react-idle-timer.
 * Показує: таймер, прогрес-бар, статус, лог подій та модалку.
 */
export function IdleTimerShowcase() {
  const {
    status,
    eventLog,
    remainingMs,
    timeout,
    showModal,
    setShowModal,
    idleCount,
    updateRemaining,
    continueSession,
    changeTimeout,
    simulateActivity,
  } = useIdleSession(30000);

  const [displaySeconds, setDisplaySeconds] = useState(30);

  // Оновлення таймера кожну секунду
  useEffect(() => {
    const interval = setInterval(() => {
      const rem = updateRemaining();
      setDisplaySeconds(Math.ceil(rem / 1000));

      // Коли залишається 5 секунд — показуємо модалку
      if (rem < 5000 && rem > 0 && status === 'idle') {
        setShowModal(true);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [updateRemaining, status, setShowModal]);

  // Toast при зміні статусу
  useEffect(() => {
    if (status === 'idle') {
      toast.warning('⏱ Виявлено бездіяльність!', {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'dark',
      });
    }
  }, [status]);

  // Відсоток залишку (для прогрес-бару)
  const progressPercent = Math.min(100, Math.max(0, (remainingMs / timeout) * 100));

  // Конфігурація кольорів статусу
  const statusConfig = {
    active: { color: '#10b981', label: '🟢 Активний', glow: 'rgba(16,185,129,0.4)' },
    idle: { color: '#f59e0b', label: '🟡 Бездіяльність', glow: 'rgba(245,158,11,0.4)' },
    timeout: { color: '#ef4444', label: '🔴 Timeout', glow: 'rgba(239,68,68,0.4)' },
  };
  const currentStatus = statusConfig[status] || statusConfig.active;

  return (
    <div>
      {/* Модальне вікно бездіяльності */}
      {showModal && (
        <IdleWarningModal
          onContinue={continueSession}
          onDismiss={() => setShowModal(false)}
          remainingSeconds={displaySeconds}
        />
      )}

      <div className="section-header">
        <h1>
          <span className="gradient-text">React Idle Timer</span> — Відстеження бездіяльності
        </h1>
        <p>
          Відстежує активність користувача (миша, клавіатура, тач).
          <strong style={{ color: '#f59e0b' }}> Перестаньте рухати мишею</strong> — спостерігайте за таймером.
        </p>
      </div>

      {/* ─── Головний блок візуалізації ────────────────────────────────── */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Великий таймер */}
        <Card title="Статус сесії" badge="live" badgeVariant="success" icon={<MdTimer />}>
          {/* Статус-індикатор */}
          <div
            style={{
              textAlign: 'center',
              padding: '24px 0',
            }}
          >
            {/* Кругловий індикатор */}
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: '50%',
                border: `4px solid ${currentStatus.color}`,
                boxShadow: `0 0 30px ${currentStatus.glow}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                transition: 'all 0.5s ease',
                background: `${currentStatus.color}10`,
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 900, color: currentStatus.color, lineHeight: 1 }}>
                {displaySeconds}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>секунд</div>
            </div>

            {/* Статус */}
            <div style={{ fontSize: 18, fontWeight: 700, color: currentStatus.color, marginBottom: 8 }}>
              {currentStatus.label}
            </div>

            {/* Прогрес-бар */}
            <div className="progress-track" style={{ marginBottom: 20 }}>
              <div
                className="progress-fill"
                style={{
                  width: `${progressPercent}%`,
                  background: `linear-gradient(90deg, ${currentStatus.color}, ${currentStatus.color}aa)`,
                  transition: 'width 0.5s ease, background 0.5s ease',
                }}
              />
            </div>

            {/* Статистика */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 32,
                marginBottom: 20,
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#f59e0b' }}>{idleCount}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Idle-подій</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#a855f7' }}>{timeout / 1000}с</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Таймаут</div>
              </div>
            </div>

            {/* Кнопки керування */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button id="idle-simulate-btn" onClick={simulateActivity} className="btn btn-primary btn-sm">
                <MdTouchApp size={16} /> Симулювати активність
              </button>
            </div>
          </div>

          {/* Вибір таймауту */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 16, marginTop: 8 }}>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 10 }}>
              Змінити таймаут:
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {TIMEOUT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`btn btn-sm ${timeout === opt.value ? 'btn-warning' : 'btn-ghost'}`}
                  onClick={() => changeTimeout(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Лог подій */}
        <Card
          title="Лог подій"
          subtitle="Останні 20 подій у реальному часі"
          badge={`${eventLog.length} подій`}
          badgeVariant="info"
          icon={<MdHistory />}
        >
          {eventLog.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-muted)' }}>
              <MdMouse size={32} style={{ marginBottom: 8, display: 'block', margin: '0 auto 8px' }} />
              <p>Рухайте мишею, натискайте клавіші...</p>
              <p style={{ fontSize: 12, marginTop: 4 }}>Події з'являться тут</p>
            </div>
          ) : (
            <div className="log-list">
              {eventLog.map((entry, i) => (
                <div key={i} className="log-item">
                  <span style={{ color: EVENT_COLORS[entry.type] || '#a855f7' }}>
                    {EVENT_ICONS[entry.type]}
                  </span>
                  <span className="log-time">{entry.time}</span>
                  <span style={{ color: 'var(--color-text-secondary)', fontSize: 13, flex: 1 }}>
                    {entry.label}
                  </span>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: EVENT_COLORS[entry.type] || '#a855f7',
                      flexShrink: 0,
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Підказка */}
          <div
            style={{
              marginTop: 16,
              padding: '10px 14px',
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: 10,
              fontSize: 13,
              color: 'var(--color-text-secondary)',
            }}
          >
            <MdKeyboard size={14} style={{ marginRight: 6, color: '#f59e0b' }} />
            Відстежуються: рух миші, кліки, натискання клавіш, скрол, торкання екрану
          </div>
        </Card>
      </div>

      {/* Код */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <Card title="Базове підключення" badge="setup">
          <CodeBlock code={INSTALL_CODE} language="jsx" title="App.jsx" />
        </Card>
        <Card title="Всі параметри та методи" badge="API">
          <CodeBlock code={HOOK_CODE} language="jsx" title="useIdleTimer API" />
        </Card>
      </div>

      {/* Поради */}
      <Card title="Кращі практики" badge="поради" badgeVariant="warning">
        <div className="grid-2" style={{ gap: 16 }}>
          {[
            {
              icon: '⚡',
              title: 'throttle замість debounce',
              text: 'Використовуйте throttle: 500 для onAction, щоб не перевантажувати рендер при кожному русі миші.',
            },
            {
              icon: '🔄',
              title: 'crossTab синхронізація',
              text: 'crossTab: true синхронізує таймер між вкладками браузера — корисно для SaaS-додатків.',
            },
            {
              icon: '⏸️',
              title: 'pause() при overlay',
              text: 'Зупиняйте таймер (pause()) коли відкрито модальне вікно або форму — не вважайте це бездіяльністю.',
            },
            {
              icon: '🔒',
              title: 'Безпека сесій',
              text: 'Показуйте попередження за 30с до timeout, а не одразу розлогінюйте — покращує UX.',
            },
          ].map(tip => (
            <div
              key={tip.title}
              style={{
                padding: '16px',
                background: 'var(--color-bg-surface)',
                borderRadius: 12,
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{tip.icon}</div>
              <h4 style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{tip.title}</h4>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{tip.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

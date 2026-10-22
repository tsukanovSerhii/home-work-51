import { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MdCheckCircle, MdError, MdWarning, MdInfo, MdSend,
  MdNotifications, MdSync, MdSettings,
} from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { Card } from '../ui/Card';
import { CodeBlock } from '../ui/CodeBlock';

// ─── Блоки коду для навчальних прикладів ───────────────────────────────
const INSTALL_CODE = `// Встановлення
npm install react-toastify

// В App.jsx — підключення контейнера (один раз на весь додаток)
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <YourAppContent />
      <ToastContainer position="top-right" theme="dark" />
    </>
  );
}`;

const TYPES_CODE = `import { toast } from 'react-toastify';

// ✅ Успіх
toast.success('Дані збережено успішно!');

// ❌ Помилка
toast.error('Помилка! Перевірте підключення.');

// ⚠️ Попередження
toast.warning('Сесія закінчується через 5 хвилин.');

// ℹ️ Інформація
toast.info('Нова версія 2.0 вже доступна!');

// 🔄 Promise toast (loading → success/error)
const promise = fetch('/api/data');
toast.promise(promise, {
  pending: 'Завантаження...',
  success: 'Дані отримано! 🎉',
  error: 'Не вдалося отримати дані',
});`;

const OPTIONS_CODE = `// Розширені опції
toast.success('З кастомним JSX!', {
  position: 'bottom-center',  // позиція
  autoClose: 5000,            // мс до закриття (false = не закривати)
  hideProgressBar: false,     // приховати прогрес-бар
  closeOnClick: true,         // закрити при кліку
  pauseOnHover: true,         // пауза при наведенні
  draggable: true,            // можна перетягувати
  theme: 'dark',              // 'light' | 'dark' | 'colored'
  icon: <FaHeart />,          // кастомна іконка (React-компонент)
});

// Оновлення існуючого toast (loading → result)
const id = toast.loading('Надсилання форми...');
// ... async operation ...
toast.update(id, {
  render: 'Форма відправлена!',
  type: 'success',
  isLoading: false,
  autoClose: 3000,
});`;

const POSITIONS = [
  'top-left', 'top-center', 'top-right',
  'bottom-left', 'bottom-center', 'bottom-right',
];

/**
 * ToastShowcase — секція демонстрації react-toastify.
 * Показує всі типи сповіщень, налаштування в реальному часі
 * та форму зворотного зв'язку з toast-ланцюжком.
 */
export function ToastShowcase() {
  // Налаштування сповіщень (контрольовані через UI)
  const [position, setPosition] = useState('top-right');
  const [autoClose, setAutoClose] = useState(4000);
  const [theme, setTheme] = useState('dark');
  const [hideProgressBar, setHideProgressBar] = useState(false);

  // Стан форми зворотного зв'язку
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toastIdRef = useRef(null);

  // Спільні опції для всіх toast у демо-блоці
  const toastOptions = { position, autoClose, theme, hideProgressBar };

  // ─── Обробники кнопок ───────────────────────────────────────────────
  const showSuccess = () => {
    toast.success('✅ Дані збережено успішно!', {
      ...toastOptions,
      icon: <MdCheckCircle size={22} />,
    });
  };

  const showError = () => {
    toast.error('❌ Помилка з\'єднання! Перевірте мережу.', {
      ...toastOptions,
      icon: <MdError size={22} />,
    });
  };

  const showWarning = () => {
    toast.warning('⚠️ Сесія закінчується через 5 хвилин.', {
      ...toastOptions,
      icon: <MdWarning size={22} />,
    });
  };

  const showInfo = () => {
    toast.info('ℹ️ Нова версія 2.0 вже доступна!', {
      ...toastOptions,
      icon: <MdInfo size={22} />,
    });
  };

  const showCustom = () => {
    toast(
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <FaHeart size={20} style={{ color: '#ec4899' }} />
        <div>
          <strong>Кастомний Toast!</strong>
          <div style={{ fontSize: 12, opacity: 0.8 }}>З власним JSX-контентом та іконкою</div>
        </div>
      </div>,
      { ...toastOptions, style: { background: 'linear-gradient(135deg, #1a1a2e, #2d1b69)' } }
    );
  };

  // Loading → update pattern
  const showLoadingUpdate = async () => {
    const id = toast.loading('🔄 Завантаження даних...', { position, theme });
    await new Promise(r => setTimeout(r, 2000)); // симуляція запиту
    const success = Math.random() > 0.3; // 70% шанс успіху
    toast.update(id, {
      render: success ? '🎉 Дані отримано!' : '💥 Сервер не відповідає',
      type: success ? 'success' : 'error',
      isLoading: false,
      autoClose: 3000,
      theme,
    });
  };

  // Форма зворотного зв'язку
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Заповніть усі поля форми!', { position, theme });
      return;
    }

    setIsSubmitting(true);
    toastIdRef.current = toast.loading('📨 Надсилаємо повідомлення...', { position, theme });

    // Симуляція відправки
    await new Promise(r => setTimeout(r, 2000));
    const success = true; // у реальному проекті — await fetch(...)

    toast.update(toastIdRef.current, {
      render: success
        ? `🎉 Дякуємо, ${form.name}! Повідомлення надіслано.`
        : '❌ Не вдалося надіслати. Спробуйте пізніше.',
      type: success ? 'success' : 'error',
      isLoading: false,
      autoClose: 4000,
      theme,
    });

    if (success) setForm({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div>
      <div className="section-header">
        <h1>
          <span className="gradient-text">React Toastify</span> — Toast-сповіщення
        </h1>
        <p>Елегантні сповіщення для React. Налаштуйте параметри та натисніть кнопки нижче.</p>
      </div>

      {/* Встановлення */}
      <Card title="Підключення" badge="react-toastify" className="mb-6">
        <CodeBlock code={INSTALL_CODE} language="jsx" title="App.jsx — setup" />
      </Card>

      {/* ─── Live-налаштування ──────────────────────────────────────────── */}
      <Card
        title="Live-налаштування"
        subtitle="Змінюйте параметри — вони застосовуються до всіх кнопок нижче"
        badge="інтерактивно"
        badgeVariant="success"
        className="mb-6"
        icon={<MdSettings />}
      >
        <div className="grid-2" style={{ gap: 16, marginBottom: 20 }}>
          {/* Позиція */}
          <div>
            <label style={{ fontSize: 13, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
              Позиція
            </label>
            <select
              id="toast-position"
              className="input"
              value={position}
              onChange={e => setPosition(e.target.value)}
            >
              {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {/* Час відображення */}
          <div>
            <label style={{ fontSize: 13, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
              Час відображення: <strong style={{ color: '#a855f7' }}>{autoClose / 1000}с</strong>
            </label>
            <input
              id="toast-autoclose"
              type="range"
              min={1000}
              max={8000}
              step={500}
              value={autoClose}
              onChange={e => setAutoClose(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#7c3aed' }}
            />
          </div>

          {/* Тема */}
          <div>
            <label style={{ fontSize: 13, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
              Тема
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['light', 'dark', 'colored'].map(t => (
                <button
                  key={t}
                  className={`btn btn-sm ${theme === t ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setTheme(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Прогрес-бар */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <label style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
              Прогрес-бар
            </label>
            <button
              id="toast-progressbar-toggle"
              className={`btn btn-sm ${!hideProgressBar ? 'btn-success' : 'btn-ghost'}`}
              onClick={() => setHideProgressBar(v => !v)}
            >
              {hideProgressBar ? 'Прихований' : 'Показаний'}
            </button>
          </div>
        </div>

        {/* Кнопки типів */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button id="toast-success-btn" onClick={showSuccess} className="btn btn-success">
            <MdCheckCircle size={18} /> Success
          </button>
          <button id="toast-error-btn" onClick={showError} className="btn btn-error">
            <MdError size={18} /> Error
          </button>
          <button id="toast-warning-btn" onClick={showWarning} className="btn btn-warning">
            <MdWarning size={18} /> Warning
          </button>
          <button id="toast-info-btn" onClick={showInfo} className="btn btn-info">
            <MdInfo size={18} /> Info
          </button>
          <button id="toast-custom-btn" onClick={showCustom} className="btn btn-primary">
            <FaHeart size={14} /> Кастомний
          </button>
          <button id="toast-loading-btn" onClick={showLoadingUpdate} className="btn btn-ghost">
            <MdSync size={18} /> Loading → Update
          </button>
        </div>
      </Card>

      {/* Типи toast з кодом */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <Card title="Типи сповіщень" badge="API">
          <CodeBlock code={TYPES_CODE} language="jsx" title="toast-types.js" />
        </Card>
        <Card title="Розширені опції" badge="options">
          <CodeBlock code={OPTIONS_CODE} language="jsx" title="toast-options.js" />
        </Card>
      </div>

      {/* Форма зворотного зв'язку */}
      <Card
        title="Форма з Toast-ланцюжком"
        subtitle="Loading → Success/Error при відправці"
        badge="приклад"
        badgeVariant="warning"
        icon={<MdSend />}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="grid-2" style={{ gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                Ім'я *
              </label>
              <input
                id="feedback-name"
                className="input"
                placeholder="Ваше ім'я"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                Email *
              </label>
              <input
                id="feedback-email"
                type="email"
                className="input"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 13, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
              Повідомлення *
            </label>
            <textarea
              id="feedback-message"
              className="input"
              placeholder="Напишіть ваше повідомлення..."
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            />
          </div>
          <button
            id="feedback-submit"
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            style={{ width: 'fit-content' }}
          >
            <MdSend size={18} />
            {isSubmitting ? 'Надсилання...' : 'Надіслати'}
          </button>
        </form>
      </Card>
    </div>
  );
}

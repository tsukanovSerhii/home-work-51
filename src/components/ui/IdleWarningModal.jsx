import { MdWarning, MdPlayArrow, MdClose } from 'react-icons/md';

/**
 * IdleWarningModal — модальне вікно, що з'являється коли користувач
 * стає неактивним (idle). Попереджає про завершення сесії та пропонує
 * продовжити або вийти.
 *
 * Props:
 * - onContinue: function — callback при натисканні "Продовжити"
 * - onDismiss: function — callback при натисканні "Закрити"
 * - remainingSeconds: number — скільки секунд до auto-logout
 */
export function IdleWarningModal({ onContinue, onDismiss, remainingSeconds = 30 }) {
  return (
    <div className="modal-overlay animate-fade-in" role="dialog" aria-modal="true" aria-label="Попередження про бездіяльність">
      <div className="modal-box">
        {/* Іконка попередження */}
        <div className="flex items-center justify-center mb-6">
          <div
            className="animate-idle-pulse"
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '2px solid rgba(245, 158, 11, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MdWarning size={36} style={{ color: '#f59e0b' }} />
          </div>
        </div>

        {/* Заголовок */}
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            textAlign: 'center',
            color: 'var(--color-text-primary)',
            marginBottom: 10,
          }}
        >
          Ви ще тут?
        </h2>

        {/* Опис */}
        <p
          style={{
            textAlign: 'center',
            color: 'var(--color-text-secondary)',
            fontSize: 15,
            marginBottom: 24,
            lineHeight: 1.6,
          }}
        >
          Ми виявили бездіяльність протягом деякого часу.
          <br />
          <strong style={{ color: '#f59e0b' }}>
            Сесія завершиться через {remainingSeconds} секунд.
          </strong>
        </p>

        {/* Прогрес-бар очікування */}
        <div className="progress-track" style={{ marginBottom: 28 }}>
          <div
            className="progress-fill"
            style={{
              width: `${Math.min(100, (remainingSeconds / 30) * 100)}%`,
              background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
              transition: 'width 1s linear',
            }}
          />
        </div>

        {/* Кнопки */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            id="idle-modal-continue"
            onClick={onContinue}
            className="btn btn-primary"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <MdPlayArrow size={18} />
            Продовжити сесію
          </button>
          <button
            id="idle-modal-dismiss"
            onClick={onDismiss}
            className="btn btn-ghost"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <MdClose size={18} />
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
}

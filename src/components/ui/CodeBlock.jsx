import { useState } from 'react';
import { MdContentCopy, MdCheck } from 'react-icons/md';

/**
 * CodeBlock — компонент для відображення коду з підсвіткою синтаксису
 * та кнопкою копіювання.
 *
 * Props:
 * - code: string — вміст блоку коду
 * - language: string — мова (для відображення, підсвітка ручна через CSS)
 * - title: string — необов'язковий заголовок блоку
 */
export function CodeBlock({ code, language = 'jsx', title }) {
  const [copied, setCopied] = useState(false);

  // Копіювання у буфер обміну
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      // Через 2 секунди повертаємо іконку копіювання
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback для старих браузерів
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Проста підсвітка синтаксису через CSS кольори
  const highlight = (rawCode) => {
    // Замінюємо ключові слова на кольорові span
    return rawCode
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Рядки (одинарні і подвійні лапки)
      .replace(/('.*?'|".*?")/g, '<span style="color:#a8d8a8">$1</span>')
      // Ключові слова JS/JSX
      .replace(/\b(import|from|export|default|const|let|var|function|return|if|else|true|false|null|undefined|async|await|new|class|extends|this)\b/g,
        '<span style="color:#c792ea">$1</span>')
      // React hooks
      .replace(/\b(useState|useEffect|useCallback|useRef|useMemo|useIdleTimer)\b/g,
        '<span style="color:#82aaff">$1</span>')
      // Коментарі (//)
      .replace(/(\/\/.*)/g, '<span style="color:#546e7a;font-style:italic">$1</span>')
      // JSX теги
      .replace(/(&lt;\/?[A-Z][a-zA-Z]*)/g, '<span style="color:#f78c6c">$1</span>')
      // Числа
      .replace(/\b(\d+)\b/g, '<span style="color:#f78c6c">$1</span>');
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Заголовок блоку */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: '#08080f',
          borderRadius: '12px 12px 0 0',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Декоративні крапки à la macOS */}
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
        </div>
        <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
          {title || language}
        </span>
        <button
          onClick={handleCopy}
          className="btn btn-ghost btn-sm"
          style={{ padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}
          title="Скопіювати код"
        >
          {copied
            ? <><MdCheck size={14} style={{ color: 'var(--color-success)' }} /> Скопійовано</>
            : <><MdContentCopy size={14} /> Копіювати</>
          }
        </button>
      </div>

      {/* Блок з кодом */}
      <div
        className="code-block"
        style={{ borderRadius: '0 0 12px 12px', borderTop: 'none', marginTop: 0 }}
      >
        <pre
          dangerouslySetInnerHTML={{ __html: highlight(code) }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.7 }}
        />
      </div>
    </div>
  );
}

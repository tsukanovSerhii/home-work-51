import { useState, useCallback } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { toast } from 'react-toastify';
import { MdContentCopy, MdRefresh, MdColorLens, MdPalette } from 'react-icons/md';
import { Card } from '../ui/Card';
import { CodeBlock } from '../ui/CodeBlock';

// ─── Блоки коду ───────────────────────────────────────────────────────
const INSTALL_CODE = `// Встановлення (найлегший color picker для React — 2.8 kB gzip)
npm install react-colorful

// Доступні пікери:
// HexColorPicker, RgbColorPicker, HslColorPicker, HsvColorPicker
// HexColorInput — текстовий інпут для hex-значення
import { HexColorPicker, HexColorInput } from 'react-colorful';

function ColorSelector() {
  const [color, setColor] = useState('#7c3aed');

  return (
    <div>
      <HexColorPicker color={color} onChange={setColor} />
      <HexColorInput color={color} onChange={setColor} prefixed />
      <p>Обраний колір: {color}</p>
    </div>
  );
}`;

const DYNAMIC_THEME_CODE = `// Динамічна зміна теми через CSS Custom Properties
function App() {
  const [accent, setAccent] = useState('#7c3aed');

  // Застосовуємо колір до :root — всі CSS-змінні оновляться
  const applyTheme = (color) => {
    setAccent(color);
    document.documentElement.style.setProperty('--color-accent', color);
    // Похідні значення (з прозорістю)
    document.documentElement.style.setProperty(
      '--color-accent-glow',
      color + '66'  // 40% прозорість
    );
  };

  return (
    <HexColorPicker color={accent} onChange={applyTheme} />
  );
}`;

// Пресети кольорів
const PRESETS = [
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Amber', value: '#d97706' },
  { name: 'Cyan', value: '#0891b2' },
  { name: 'Fuchsia', value: '#a21caf' },
  { name: 'Orange', value: '#ea580c' },
];

/**
 * Генерує просту палітру з 5 варіацій кольору (світліший/темніший).
 * Використовуємо CSS-фільтри як наближення.
 */
function generatePalette(hex) {
  // Парсимо hex → rgb
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [
    // Найсвітліший
    `rgb(${Math.min(255, r + 120)}, ${Math.min(255, g + 120)}, ${Math.min(255, b + 120)})`,
    `rgb(${Math.min(255, r + 60)}, ${Math.min(255, g + 60)}, ${Math.min(255, b + 60)})`,
    hex, // оригінал
    `rgb(${Math.max(0, r - 50)}, ${Math.max(0, g - 50)}, ${Math.max(0, b - 50)})`,
    `rgb(${Math.max(0, r - 100)}, ${Math.max(0, g - 100)}, ${Math.max(0, b - 100)})`,
  ];
}

/**
 * ColorPickerShowcase — секція демонстрації react-colorful.
 * Включає: пікер, HexInput, пресети, генератор палітри,
 * та зміну теми всього додатку.
 *
 * Props:
 * - onAccentChange: function(color) — callback для зміни теми App
 */
export function ColorPickerShowcase({ onAccentChange }) {
  const [color, setColor] = useState('#7c3aed');
  const [activePreset, setActivePreset] = useState('Violet');

  const palette = generatePalette(color);

  // Оновлення кольору + повідомлення батьківського компонента
  const handleColorChange = useCallback((newColor) => {
    setColor(newColor);
    setActivePreset(null);
  }, []);

  // Вибір пресету
  const selectPreset = (preset) => {
    setColor(preset.value);
    setActivePreset(preset.name);
  };

  // Застосування теми до всього додатку
  const applyToTheme = () => {
    if (onAccentChange) onAccentChange(color);
    // Також оновлюємо CSS-змінну глобально
    document.documentElement.style.setProperty('--color-accent', color);
    document.documentElement.style.setProperty('--color-accent-light', color);
    document.documentElement.style.setProperty('--color-accent-glow', color + '66');
    document.documentElement.style.setProperty('--color-border-accent', color + '80');
    toast.success(
      <div>
        <strong>Тему застосовано!</strong>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <div style={{ width: 16, height: 16, borderRadius: 4, background: color }} />
          <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{color}</span>
        </div>
      </div>,
      { theme: 'dark', autoClose: 3000 }
    );
  };

  // Копіювання кольору в буфер
  const copyColor = (value) => {
    navigator.clipboard.writeText(value).catch(() => {});
    toast.info(`Скопійовано: ${value}`, { theme: 'dark', autoClose: 2000 });
  };

  // Конвертація hex → rgb рядок
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Конвертація hex → hsl (наближення)
  const hexToHsl = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
        default: h = 0;
      }
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  return (
    <div>
      <div className="section-header">
        <h1>
          <span className="gradient-text">React Colorful</span> — Color Picker
        </h1>
        <p>
          Найлегший color picker для React (2.8 kB). Оберіть колір та натисніть
          <strong style={{ color: '#ec4899' }}> "Застосувати тему"</strong> — зміниться весь дашборд!
        </p>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* ─── Пікер + налаштування ─────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card title="Вибір кольору" badge="HexColorPicker" icon={<MdColorLens />}>
            {/* Сам пікер */}
            <HexColorPicker
              color={color}
              onChange={handleColorChange}
              style={{ width: '100%', height: 200, borderRadius: 12 }}
            />

            {/* Hex input */}
            <div style={{ marginTop: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: color,
                  border: '2px solid rgba(255,255,255,0.15)',
                  flexShrink: 0,
                  boxShadow: `0 0 16px ${color}66`,
                  transition: 'all 0.3s ease',
                }}
              />
              <HexColorInput
                id="hex-color-input"
                color={color}
                onChange={handleColorChange}
                prefixed
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 10,
                  color: 'var(--color-text-primary)',
                  fontSize: 16,
                  fontFamily: 'var(--font-mono)',
                  outline: 'none',
                  fontWeight: 700,
                }}
              />
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => copyColor(color)}
                title="Копіювати HEX"
              >
                <MdContentCopy size={16} />
              </button>
            </div>

            {/* Конвертації */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
              {[
                { label: 'HEX', value: color },
                { label: 'RGB', value: hexToRgb(color) },
                { label: 'HSL', value: hexToHsl(color) },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 12px',
                    background: 'var(--color-bg-surface)',
                    borderRadius: 8,
                    cursor: 'pointer',
                  }}
                  onClick={() => copyColor(value)}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#a855f7',
                      fontFamily: 'var(--font-mono)',
                      minWidth: 30,
                    }}
                  >
                    {label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, flex: 1 }}>{value}</span>
                  <MdContentCopy size={13} style={{ color: 'var(--color-text-muted)' }} />
                </div>
              ))}
            </div>
          </Card>

          {/* Пресети */}
          <Card title="Кольорові пресети" badge={`${PRESETS.length} кольорів`} icon={<MdPalette />}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {PRESETS.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => selectPreset(preset)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    padding: '12px 8px',
                    borderRadius: 12,
                    border: `2px solid ${activePreset === preset.name ? preset.value : 'transparent'}`,
                    background: activePreset === preset.name
                      ? `${preset.value}22`
                      : 'var(--color-bg-surface)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: preset.value,
                      boxShadow: activePreset === preset.name ? `0 0 14px ${preset.value}88` : 'none',
                      transition: 'box-shadow 0.2s ease',
                    }}
                  />
                  <span style={{ fontSize: 11, color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* ─── Права колонка ─────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Прев'ю UI-елементів */}
          <Card title="Прев'ю елементів" subtitle="Як буде виглядати обраний колір в UI" badge="live">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Кнопка */}
              <div>
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>Кнопка</p>
                <button
                  style={{
                    padding: '10px 20px',
                    borderRadius: 10,
                    border: 'none',
                    background: `linear-gradient(135deg, ${color}, ${color}bb)`,
                    color: 'white',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: `0 4px 16px ${color}55`,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  <MdColorLens size={18} /> Кнопка з кольором
                </button>
              </div>

              {/* Бейдж */}
              <div>
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>Бейдж</p>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 14px',
                    borderRadius: 999,
                    background: `${color}22`,
                    color: color,
                    border: `1px solid ${color}55`,
                    fontSize: 13,
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                  }}
                >
                  ● Статус активний
                </span>
              </div>

              {/* Картка */}
              <div>
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>Картка</p>
                <div
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    border: `1px solid ${color}55`,
                    background: `${color}11`,
                    borderLeft: `3px solid ${color}`,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>Заголовок картки</div>
                  <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                    Опис з акцентним кольором {color}
                  </div>
                </div>
              </div>

              {/* Прогрес */}
              <div>
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>Прогрес-бар</p>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: '75%',
                      background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                      transition: 'background 0.3s ease',
                    }}
                  />
                </div>
              </div>

              {/* Кнопка застосування теми */}
              <button
                id="apply-theme-btn"
                onClick={applyToTheme}
                className="btn btn-lg"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}bb)`,
                  color: 'white',
                  border: 'none',
                  boxShadow: `0 6px 20px ${color}55`,
                  justifyContent: 'center',
                  width: '100%',
                  transition: 'all 0.3s ease',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                <MdRefresh size={20} />
                Застосувати тему до дашборду
              </button>
            </div>
          </Card>

          {/* Генератор палітри */}
          <Card title="Генератор палітри" subtitle="5 відтінків обраного кольору" badge="auto-gen">
            <div style={{ display: 'flex', gap: 8 }}>
              {palette.map((shade, i) => (
                <div
                  key={i}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, cursor: 'pointer' }}
                  onClick={() => copyColor(shade)}
                  title={`Копіювати ${shade}`}
                >
                  <div
                    style={{
                      height: 60,
                      borderRadius: 10,
                      background: shade,
                      transition: 'all 0.3s ease',
                      border: i === 2 ? `2px solid white` : '2px solid transparent',
                    }}
                  />
                  <span style={{ fontSize: 10, color: 'var(--color-text-muted)', textAlign: 'center' }}>
                    {i === 2 ? 'Base' : i < 2 ? `+${(2 - i) * 60}` : `-${(i - 2) * 50}`}
                  </span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 10 }}>
              Клікніть на відтінок — скопіюється значення RGB
            </p>
          </Card>
        </div>
      </div>

      {/* Код */}
      <div className="grid-2">
        <Card title="Підключення" badge="setup">
          <CodeBlock code={INSTALL_CODE} language="jsx" title="ColorSelector.jsx" />
        </Card>
        <Card title="Динамічна тема через CSS vars" badge="advanced">
          <CodeBlock code={DYNAMIC_THEME_CODE} language="jsx" title="dynamic-theme.jsx" />
        </Card>
      </div>
    </div>
  );
}

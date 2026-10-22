import { useState } from 'react';
import { toast } from 'react-toastify';

// ── Перевірені іконки з react-icons ────────────────────────────────────
// Font Awesome 5
import { FaReact, FaGithub, FaStar, FaHeart, FaRocket, FaCode, FaCoffee, FaFire,
         FaBolt, FaGlobe, FaLock, FaUser } from 'react-icons/fa';

// Material Design
import { MdHome, MdSettings, MdSearch, MdFavorite, MdShare, MdDownload, MdEdit, MdDelete,
         MdNotifications, MdEmail, MdPhone, MdPerson, MdCamera, MdMic, MdWifi, MdBluetooth } from 'react-icons/md';

// Bootstrap Icons (bi)
import { BiGame, BiMusic, BiMovie, BiWorld, BiSun, BiMoon, BiCloud, BiWifi,
         BiHome, BiSearch, BiUser, BiLock } from 'react-icons/bi';

// Ant Design (ai) — без суфіксів Outline/Fill, лише ті що є
import { AiOutlineThunderbolt, AiOutlineCrown, AiOutlineSmile, AiOutlineEye,
         AiFillApple, AiOutlineAndroid, AiOutlineStar, AiOutlineHeart } from 'react-icons/ai';

// HeroIcons v1 (hi)
import { HiBeaker, HiLightBulb, HiShieldCheck, HiChip, HiGlobe, HiSparkles, HiColorSwatch, HiTerminal } from 'react-icons/hi';

import { Card } from '../ui/Card';
import { CodeBlock } from '../ui/CodeBlock';

// ── Масив наборів іконок ────────────────────────────────────────────────
const ICON_SETS = {
  'Font Awesome (fa)': [
    { name: 'FaReact',    component: <FaReact /> },
    { name: 'FaGithub',   component: <FaGithub /> },
    { name: 'FaStar',     component: <FaStar /> },
    { name: 'FaHeart',    component: <FaHeart /> },
    { name: 'FaRocket',   component: <FaRocket /> },
    { name: 'FaCode',     component: <FaCode /> },
    { name: 'FaCoffee',   component: <FaCoffee /> },
    { name: 'FaFire',     component: <FaFire /> },
    { name: 'FaBolt',     component: <FaBolt /> },
    { name: 'FaGlobe',    component: <FaGlobe /> },
    { name: 'FaLock',     component: <FaLock /> },
    { name: 'FaUser',     component: <FaUser /> },
  ],
  'Material Design (md)': [
    { name: 'MdHome',          component: <MdHome /> },
    { name: 'MdSettings',      component: <MdSettings /> },
    { name: 'MdSearch',        component: <MdSearch /> },
    { name: 'MdFavorite',      component: <MdFavorite /> },
    { name: 'MdShare',         component: <MdShare /> },
    { name: 'MdDownload',      component: <MdDownload /> },
    { name: 'MdEdit',          component: <MdEdit /> },
    { name: 'MdDelete',        component: <MdDelete /> },
    { name: 'MdNotifications', component: <MdNotifications /> },
    { name: 'MdEmail',         component: <MdEmail /> },
    { name: 'MdPhone',         component: <MdPhone /> },
    { name: 'MdPerson',        component: <MdPerson /> },
    { name: 'MdCamera',        component: <MdCamera /> },
    { name: 'MdMic',           component: <MdMic /> },
    { name: 'MdWifi',          component: <MdWifi /> },
    { name: 'MdBluetooth',     component: <MdBluetooth /> },
  ],
  'BoxIcons (bi)': [
    { name: 'BiGame',   component: <BiGame /> },
    { name: 'BiMusic',  component: <BiMusic /> },
    { name: 'BiMovie',  component: <BiMovie /> },
    { name: 'BiWorld',  component: <BiWorld /> },
    { name: 'BiSun',    component: <BiSun /> },
    { name: 'BiMoon',   component: <BiMoon /> },
    { name: 'BiCloud',  component: <BiCloud /> },
    { name: 'BiWifi',   component: <BiWifi /> },
    { name: 'BiHome',   component: <BiHome /> },
    { name: 'BiSearch', component: <BiSearch /> },
    { name: 'BiUser',   component: <BiUser /> },
    { name: 'BiLock',   component: <BiLock /> },
  ],
  'Ant Design (ai)': [
    { name: 'AiOutlineThunderbolt', component: <AiOutlineThunderbolt /> },
    { name: 'AiOutlineCrown',       component: <AiOutlineCrown /> },
    { name: 'AiOutlineSmile',       component: <AiOutlineSmile /> },
    { name: 'AiOutlineEye',         component: <AiOutlineEye /> },
    { name: 'AiFillApple',          component: <AiFillApple /> },
    { name: 'AiOutlineAndroid',     component: <AiOutlineAndroid /> },
    { name: 'AiOutlineStar',        component: <AiOutlineStar /> },
    { name: 'AiOutlineHeart',       component: <AiOutlineHeart /> },
  ],
  'HeroIcons (hi)': [
    { name: 'HiBeaker',      component: <HiBeaker /> },
    { name: 'HiLightBulb',   component: <HiLightBulb /> },
    { name: 'HiShieldCheck', component: <HiShieldCheck /> },
    { name: 'HiChip',        component: <HiChip /> },
    { name: 'HiGlobe',       component: <HiGlobe /> },
    { name: 'HiSparkles',    component: <HiSparkles /> },
    { name: 'HiColorSwatch', component: <HiColorSwatch /> },
    { name: 'HiTerminal',    component: <HiTerminal /> },
  ],
};

// ── PKG map для формування рядка import ────────────────────────────────
const PKG_MAP = {
  'Font Awesome (fa)':   'react-icons/fa',
  'Material Design (md)': 'react-icons/md',
  'BoxIcons (bi)':        'react-icons/bi',
  'Ant Design (ai)':      'react-icons/ai',
  'HeroIcons (hi)':       'react-icons/hi',
};

// ── Блоки коду ────────────────────────────────────────────────────────
const INSTALL_CODE = `// 1. Встановлення — один пакет, тисячі іконок
npm install react-icons

// 2. Імпорт — вибираємо потрібний набір
import { FaReact, FaGithub }     from 'react-icons/fa';  // Font Awesome
import { MdHome, MdSettings }    from 'react-icons/md';  // Material Design
import { BiMusic }               from 'react-icons/bi';  // BoxIcons
import { AiOutlineThunderbolt }  from 'react-icons/ai';  // Ant Design
import { HiSparkles }            from 'react-icons/hi';  // HeroIcons`;

const USAGE_CODE = `// 3. Використання — іконки як React-компоненти
function MyButton() {
  return (
    <button style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* Розмір через size або fontSize */}
      <FaReact size={20} color="#61dafb" />
      Відкрити GitHub

      {/* Інлайн стилі */}
      <MdSettings style={{ fontSize: 24, color: '#7c3aed' }} />
    </button>
  );
}`;

// ── Компонент ─────────────────────────────────────────────────────────
export function IconsShowcase() {
  const [search, setSearch] = useState('');
  const [activeSet, setActiveSet] = useState('Всі');
  const [selectedSize, setSelectedSize] = useState(28);

  const allSets = ['Всі', ...Object.keys(ICON_SETS)];
  const totalIcons = Object.values(ICON_SETS).reduce((a, arr) => a + arr.length, 0);

  // Фільтрація
  const getGroups = () => {
    const pairs = activeSet === 'Всі'
      ? Object.entries(ICON_SETS)
      : [[activeSet, ICON_SETS[activeSet]]];

    return pairs
      .map(([setName, icons]) => ({
        setName,
        icons: icons.filter(ic => ic.name.toLowerCase().includes(search.toLowerCase())),
      }))
      .filter(g => g.icons.length > 0);
  };

  // Клік — копіювання рядка import
  const handleIconClick = (iconName) => {
    const setName = Object.keys(ICON_SETS).find(s =>
      ICON_SETS[s].some(i => i.name === iconName)
    );
    const pkg = PKG_MAP[setName] || 'react-icons/fa';
    const importStr = `import { ${iconName} } from '${pkg}';`;
    navigator.clipboard.writeText(importStr).catch(() => {});
    toast.success(
      <div>
        <strong>📋 Скопійовано!</strong>
        <div style={{ fontFamily: 'monospace', fontSize: 11, marginTop: 4, opacity: 0.75 }}>
          {importStr}
        </div>
      </div>,
      { autoClose: 2500 }
    );
  };

  const groups = getGroups();
  const filteredCount = groups.reduce((a, g) => a + g.icons.length, 0);

  return (
    <div>
      <div className="section-header">
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <span className="badge badge-accent">react-icons</span>
          <span className="badge badge-info">5 наборів</span>
          <span className="badge badge-success">{totalIcons}+ іконок</span>
        </div>
        <h1>
          <span className="gradient-text">React Icons</span>
          <span style={{ color: '#f1f5f9' }}> — Бібліотека іконок</span>
        </h1>
        <p>
          5000+ іконок з 30+ наборів в одному пакеті.
          <strong style={{ color: '#c084fc' }}> Клікніть на іконку</strong> — скопіюється рядок імпорту.
        </p>
      </div>

      {/* Встановлення */}
      <Card title="Встановлення та імпорт" badge="setup" className="animate-fade-in-up" style={{ marginBottom: 20 }}>
        <CodeBlock code={INSTALL_CODE} title="install + import" />
      </Card>

      {/* Інтерактивна галерея */}
      <Card
        title="Інтерактивна галерея"
        badge={`${filteredCount} іконок`}
        badgeVariant="info"
        className="animate-fade-in-up delay-100"
        style={{ marginBottom: 20 }}
      >
        {/* Пошук + розмір */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
          <input
            id="icon-search"
            type="text"
            className="input"
            placeholder="🔍 Пошук іконок..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1 }}
          />
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            {[20, 28, 36].map(s => (
              <button
                key={s}
                className={`btn btn-sm ${selectedSize === s ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSelectedSize(s)}
              >{s}px</button>
            ))}
          </div>
        </div>

        {/* Фільтр по набору */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {allSets.map(s => (
            <button
              key={s}
              className={`btn btn-sm ${activeSet === s ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setActiveSet(s)}
            >{s}</button>
          ))}
        </div>

        {/* Галерея */}
        {groups.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#475569' }}>
            <span style={{ fontSize: 36 }}>🔍</span>
            <p style={{ marginTop: 12 }}>Іконки не знайдено</p>
          </div>
        ) : (
          groups.map(({ setName, icons }) => (
            <div key={setName} style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 3, height: 16, borderRadius: 2, background: '#7c3aed' }} />
                <p style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {setName}
                </p>
                <span className="badge badge-accent">{icons.length}</span>
              </div>
              <div className="icon-grid">
                {icons.map(icon => (
                  <div
                    key={icon.name}
                    className="icon-item tooltip-wrapper"
                    onClick={() => handleIconClick(icon.name)}
                  >
                    <span style={{ fontSize: selectedSize, color: '#a855f7', transition: 'all 0.2s ease', display: 'flex' }}>
                      {icon.component}
                    </span>
                    <span>{icon.name}</span>
                    <span className="tooltip">Копіювати import</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </Card>

      {/* Приклад використання */}
      <Card title="Приклад у компоненті" badge="jsx" className="animate-fade-in-up delay-200" style={{ marginBottom: 20 }}>
        <CodeBlock code={USAGE_CODE} title="MyButton.jsx" />
      </Card>

      {/* Таблиця */}
      <Card title="Порівняння наборів" badge="довідка" className="animate-fade-in-up delay-300">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                {['Префікс', 'Набір', 'Опис', 'Кількість'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '10px 16px',
                    color: '#475569', fontWeight: 700, fontSize: 11,
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['fa', 'Font Awesome 5', 'Класичний, найпопулярніший набір', '1600+'],
                ['md', 'Material Design', 'Від Google, офіційний MD-стиль', '1000+'],
                ['bi', 'Bootstrap Icons', 'Bootstrap 5 icon set', '1800+'],
                ['ai', 'Ant Design', 'Від Alibaba, мінімалістичний', '900+'],
                ['hi', 'HeroIcons', 'Від Tailwind team, SVG outline/solid', '300+'],
                ['io', 'Ionicons 5', 'Від Ionic team, для мобільних', '1300+'],
                ['ri', 'Remix Icon', 'Нейтральний дизайн', '2400+'],
              ].map(([prefix, name, desc, count]) => (
                <tr key={prefix} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <code style={{ fontFamily: 'var(--font-mono)', color: '#a855f7', fontSize: 13, background: 'rgba(168,85,247,0.1)', padding: '2px 8px', borderRadius: 6 }}>{prefix}</code>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#f1f5f9' }}>{name}</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>{desc}</td>
                  <td style={{ padding: '12px 16px' }}><span className="badge badge-accent">{count}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

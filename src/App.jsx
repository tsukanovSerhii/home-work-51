import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/sections/Dashboard';
import { IconsShowcase } from './components/sections/IconsShowcase';
import { ToastShowcase } from './components/sections/ToastShowcase';
import { IdleTimerShowcase } from './components/sections/IdleTimerShowcase';
import { ColorPickerShowcase } from './components/sections/ColorPickerShowcase';

// Маппінг id секцій → компоненти
const SECTIONS = {
  dashboard: Dashboard,
  icons: IconsShowcase,
  toastify: ToastShowcase,
  idle: IdleTimerShowcase,
  colorpicker: ColorPickerShowcase,
};

/**
 * App — кореневий компонент.
 *
 * Управляє:
 * - Навігацією між секціями (activeSection)
 * - Idle-статусом для Header (idleStatus)
 * - Акцентним кольором теми (accentColor)
 */
function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [idleStatus, setIdleStatus] = useState('active');
  const [accentColor, setAccentColor] = useState('#7c3aed');

  // Компонент поточної секції
  const ActiveSection = SECTIONS[activeSection] || Dashboard;

  // Обробник зміни акцентного кольору (з ColorPickerShowcase)
  const handleAccentChange = (color) => {
    setAccentColor(color);
  };

  return (
    <>
      <Layout
        activeSection={activeSection}
        onNavigate={setActiveSection}
        idleStatus={idleStatus}
        accentColor={accentColor}
      >
        {/* Рендеримо поточну секцію, передаємо потрібні props */}
        {activeSection === 'colorpicker' ? (
          <ColorPickerShowcase onAccentChange={handleAccentChange} />
        ) : (
          <ActiveSection />
        )}
      </Layout>

      {/*
        ToastContainer — підключається один раз на рівні App.
        Всі виклики toast() з будь-якого компонента потраплять сюди.
        theme="dark" — базова тема (може перевизначатися в кожному toast окремо).
      */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;

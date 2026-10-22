# 🎓 React Library Showcase

> Інтерактивний навчальний дашборд, що демонструє можливості 5 спеціалізованих React-бібліотек з живими прикладами та блоками коду.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.3-38bdf8?logo=tailwindcss)

---

## 📦 Використані бібліотеки

| Бібліотека | Версія | Призначення |
|---|---|---|
| `react-icons` | ^5 | 5000+ іконок з 30+ наборів |
| `react-toastify` | ^11 | Toast-сповіщення |
| `react-idle-timer` | ^5 | Відстеження бездіяльності |
| `react-colorful` | ^5 | Легковажний color picker |
| `recharts` | ^2 | Декларативні графіки |

---

## 🚀 Запуск проекту

```bash
# 1. Встановлення залежностей
npm install

# 2. Запуск dev-сервера
npm run dev

# 3. Збірка для продакшн
npm run build
```

Відкрийте: http://localhost:5173

---

## 🏗️ Структура проекту

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx          # Бічна навігація з react-icons
│   │   ├── Header.jsx           # Верхня панель + idle-статус
│   │   └── Layout.jsx           # Обгортка сторінок
│   ├── sections/
│   │   ├── Dashboard.jsx        # Графіки (recharts)
│   │   ├── IconsShowcase.jsx    # Демо react-icons
│   │   ├── ToastShowcase.jsx    # Демо react-toastify
│   │   ├── IdleTimerShowcase.jsx # Демо react-idle-timer
│   │   └── ColorPickerShowcase.jsx # Демо react-colorful
│   └── ui/
│       ├── Card.jsx             # Картки (Card + StatCard)
│       ├── CodeBlock.jsx        # Блок коду з копіюванням
│       └── IdleWarningModal.jsx # Модалка бездіяльності
├── hooks/
│   └── useIdleSession.js        # Кастомний хук для idle-логіки
├── constants/
│   └── navigation.js            # Навігація та mock-дані
├── App.jsx
├── main.jsx
└── index.css                    # Глобальні стилі + TailwindCSS v4
```

---

## 📄 Секції дашборду

### Dashboard
Головна сторінка з оглядом проекту:
- 4 картки StatCard зі статистикою
- LineChart — активність розробки за тиждень
- PieChart — розподіл типів сповіщень
- BarChart — популярність бібліотек (npm downloads)

### React Icons
- Галерея іконок із 5 наборів (Font Awesome, Material Design, BoxIcons, Ant Design, HeroIcons)
- Пошук по назві іконки та зміна розміру
- Клік по іконці → копіювання рядка import + toast-сповіщення
- Таблиця порівняння наборів

### React Toastify
- 6 типів toast: success, error, warning, info, custom JSX, loading→update
- Live-налаштування: позиція, час показу, тема, прогрес-бар
- Форма зворотного зв'язку з toast-ланцюжком (loading → success/error)

### React Idle Timer
- Кастомний хук useIdleSession що обгортає useIdleTimer
- Візуальний круговий таймер з відліком секунд
- Прогрес-бар, статус-індикатор, лог подій у реальному часі
- Модальне вікно попередження при бездіяльності
- Вибір таймауту: 15с / 30с / 60с

### React Colorful
- HexColorPicker + HexColorInput
- 8 пресетів кольорів
- Конвертація: HEX / RGB / HSL
- Генератор палітри (5 відтінків)
- Прев'ю UI-елементів з обраним кольором
- "Застосувати тему" — динамічна зміна CSS-змінних всього дашборду

---

## 🎨 Дизайн

- Стиль: Dark mode + Glassmorphism
- Кольори: Deep dark navy #0a0a14 + Violet accent #7c3aed
- Шрифти: Inter (основний) + Fira Code (код)
- Анімації: fadeInUp, pulse-glow, idle-pulse

---

## ⚙️ TailwindCSS v4 — ключові відмінності

Замість tailwind.config.js використовується @theme в CSS:

```css
@import "tailwindcss";

@theme {
  --color-accent: #7c3aed;
  --font-sans: 'Inter', sans-serif;
}
```

В vite.config.js — плагін замість PostCSS:

```js
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

---

## 📝 Автор

Домашня робота #51 - Hillel IT School - React Advanced

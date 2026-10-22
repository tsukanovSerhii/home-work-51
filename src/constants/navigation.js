// Конфігурація навігаційного меню
// Кожен елемент — це об'єкт із id (ключ секції), label, та icon (назва іконки)

export const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'MdDashboard',
    description: 'Огляд та графіки',
    color: '#7c3aed',
  },
  {
    id: 'icons',
    label: 'React Icons',
    icon: 'MdEmojiEmotions',
    description: 'Бібліотека іконок',
    color: '#3b82f6',
  },
  {
    id: 'toastify',
    label: 'React Toastify',
    icon: 'MdNotifications',
    description: 'Toast-сповіщення',
    color: '#10b981',
  },
  {
    id: 'idle',
    label: 'Idle Timer',
    icon: 'MdTimer',
    description: 'Відстеження бездіяльності',
    color: '#f59e0b',
  },
  {
    id: 'colorpicker',
    label: 'Color Picker',
    icon: 'MdColorLens',
    description: 'Вибір кольорів',
    color: '#ec4899',
  },
];

// Дані для mock-статистики на Dashboard
export const STATS_DATA = [
  { label: 'Компонентів', value: '24', delta: '+3', positive: true },
  { label: 'Бібліотек', value: '5', delta: '+2', positive: true },
  { label: 'Рядків коду', value: '1.2k', delta: '+120', positive: true },
  { label: 'Помилок', value: '0', delta: '-5', positive: true },
];

// Дані лінійного графіка — активність розробки за 7 днів
export const ACTIVITY_DATA = [
  { day: 'Пн', commits: 4, lines: 120, components: 2 },
  { day: 'Вт', commits: 7, lines: 240, components: 4 },
  { day: 'Ср', commits: 3, lines: 80, components: 1 },
  { day: 'Чт', commits: 9, lines: 320, components: 6 },
  { day: 'Пт', commits: 6, lines: 180, components: 3 },
  { day: 'Сб', commits: 11, lines: 420, components: 8 },
  { day: 'Нд', commits: 5, lines: 160, components: 2 },
];

// Дані кругової діаграми — розподіл типів сповіщень
export const TOAST_PIE_DATA = [
  { name: 'Success', value: 40, color: '#10b981' },
  { name: 'Error', value: 20, color: '#ef4444' },
  { name: 'Warning', value: 25, color: '#f59e0b' },
  { name: 'Info', value: 15, color: '#3b82f6' },
];

// Дані стовпчастої діаграми — популярність бібліотек (npm downloads/тиждень, умовні млн)
export const LIBRARIES_DATA = [
  { name: 'react-icons', downloads: 8.2, color: '#3b82f6' },
  { name: 'react-toastify', downloads: 3.5, color: '#10b981' },
  { name: 'recharts', downloads: 2.8, color: '#7c3aed' },
  { name: 'react-colorful', downloads: 1.4, color: '#ec4899' },
  { name: 'react-idle-timer', downloads: 0.9, color: '#f59e0b' },
];

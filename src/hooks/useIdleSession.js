import { useIdleTimer } from 'react-idle-timer';
import { useState, useCallback } from 'react';

/**
 * useIdleSession — кастомний хук для відстеження бездіяльності користувача.
 *
 * Огортає react-idle-timer і надає зручний інтерфейс:
 * - стан активності (active / idle / timeout)
 * - лог подій із часовими мітками
 * - відсоток залишку часу до idle
 * - можливість змінити timeout на льоту
 *
 * @param {number} initialTimeout - початковий таймаут у мілісекундах
 * @returns {object} - стан та методи управління
 */
export function useIdleSession(initialTimeout = 30000) {
  const [status, setStatus] = useState('active');       // 'active' | 'idle' | 'timeout'
  const [eventLog, setEventLog] = useState([]);         // масив подій {time, type, label}
  const [remainingMs, setRemainingMs] = useState(initialTimeout);
  const [timeout, setTimeout_] = useState(initialTimeout);
  const [showModal, setShowModal] = useState(false);
  const [totalActiveTime, setTotalActiveTime] = useState(0);
  const [idleCount, setIdleCount] = useState(0);

  // Додаємо запис у лог подій
  const addLog = useCallback((type, label, color) => {
    const time = new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setEventLog(prev => [{ time, type, label, color }, ...prev].slice(0, 20)); // зберігаємо лише 20 останніх
  }, []);

  // Обробник події "користувач став активним"
  const onActive = useCallback(() => {
    setStatus('active');
    addLog('active', 'Користувач повернувся до сторінки', '#10b981');
  }, [addLog]);

  // Обробник події "користувач став неактивним"
  const onIdle = useCallback(() => {
    setStatus('idle');
    setIdleCount(prev => prev + 1);
    addLog('idle', 'Бездіяльність виявлена!', '#f59e0b');
  }, [addLog]);

  // Обробник дії (щоразу, коли user щось робить)
  const onAction = useCallback(() => {
    if (status === 'idle') {
      setStatus('active');
    }
  }, [status]);

  // Ініціалізація useIdleTimer
  const idleTimer = useIdleTimer({
    timeout,           // таймаут у мс
    throttle: 500,     // мінімальний інтервал між спрацюваннями onAction
    onActive,
    onIdle,
    onAction,
    // Оновлюємо залишок часу кожну секунду
    onPresenceChange: () => {},
  });

  // Метод для ручного оновлення залишку часу (викликається в компоненті через setInterval)
  const updateRemaining = useCallback(() => {
    const remaining = idleTimer.getRemainingTime();
    setRemainingMs(remaining);
    return remaining;
  }, [idleTimer]);

  // Метод для продовження сесії (закриття модалки + reset)
  const continueSession = useCallback(() => {
    idleTimer.reset();
    setStatus('active');
    setShowModal(false);
    addLog('active', 'Сесію продовжено вручну', '#7c3aed');
  }, [idleTimer, addLog]);

  // Метод для зміни таймауту
  const changeTimeout = useCallback((newTimeout) => {
    setTimeout_(newTimeout);
    idleTimer.reset();
    setRemainingMs(newTimeout);
    addLog('config', `Таймаут змінено на ${newTimeout / 1000}с`, '#3b82f6');
  }, [idleTimer, addLog]);

  // Симуляція активності вручну (для демо)
  const simulateActivity = useCallback(() => {
    idleTimer.reset();
    setStatus('active');
    addLog('action', 'Активність симульована вручну', '#a855f7');
  }, [idleTimer, addLog]);

  return {
    status,
    eventLog,
    remainingMs,
    timeout,
    showModal,
    setShowModal,
    totalActiveTime,
    idleCount,
    updateRemaining,
    continueSession,
    changeTimeout,
    simulateActivity,
    isIdle: idleTimer.isIdle,
    reset: idleTimer.reset,
  };
}

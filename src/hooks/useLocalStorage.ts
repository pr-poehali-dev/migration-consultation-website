import { useState, useEffect, useCallback } from 'react';

/**
 * Хук для работы с localStorage
 * Автоматически синхронизирует состояние с localStorage
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options?: {
    serializer?: {
      parse: (value: string) => T;
      stringify: (value: T) => string;
    };
    syncAcrossTabs?: boolean;
  }
) => {
  const serializer = options?.serializer || {
    parse: JSON.parse,
    stringify: JSON.stringify
  };

  // Получение значения из localStorage
  const getStorageValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return initialValue;
      return serializer.parse(item);
    } catch (error) {
      console.warn(`Ошибка при чтении из localStorage для ключа "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, serializer]);

  const [storedValue, setStoredValue] = useState<T>(getStorageValue);

  // Функция для обновления значения
  const setValue = useCallback((value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, serializer.stringify(valueToStore));
    } catch (error) {
      console.error(`Ошибка при записи в localStorage для ключа "${key}":`, error);
    }
  }, [key, storedValue, serializer]);

  // Функция для удаления значения
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Ошибка при удалении из localStorage для ключа "${key}":`, error);
    }
  }, [key, initialValue]);

  // Слушатель изменений в других вкладках
  useEffect(() => {
    if (!options?.syncAcrossTabs) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(serializer.parse(e.newValue));
        } catch (error) {
          console.warn(`Ошибка при синхронизации localStorage для ключа "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, serializer, options?.syncAcrossTabs]);

  return [storedValue, setValue, removeValue] as const;
};

/**
 * Хук для работы с sessionStorage
 * Аналогично useLocalStorage, но использует sessionStorage
 */
export const useSessionStorage = <T>(
  key: string,
  initialValue: T,
  serializer?: {
    parse: (value: string) => T;
    stringify: (value: T) => string;
  }
) => {
  const defaultSerializer = serializer || {
    parse: JSON.parse,
    stringify: JSON.stringify
  };

  const getStorageValue = useCallback((): T => {
    try {
      const item = window.sessionStorage.getItem(key);
      if (item === null) return initialValue;
      return defaultSerializer.parse(item);
    } catch (error) {
      console.warn(`Ошибка при чтении из sessionStorage для ключа "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, defaultSerializer]);

  const [storedValue, setStoredValue] = useState<T>(getStorageValue);

  const setValue = useCallback((value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, defaultSerializer.stringify(valueToStore));
    } catch (error) {
      console.error(`Ошибка при записи в sessionStorage для ключа "${key}":`, error);
    }
  }, [key, storedValue, defaultSerializer]);

  const removeValue = useCallback(() => {
    try {
      window.sessionStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Ошибка при удалении из sessionStorage для ключа "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
};

/**
 * Хук для сохранения состояния формы в localStorage
 * Автоматически сохраняет и восстанавливает состояние формы
 */
export const useFormPersistence = <T extends Record<string, any>>(
  formId: string,
  initialData: T,
  options?: {
    saveOnChange?: boolean;
    clearOnSubmit?: boolean;
    debounceMs?: number;
  }
) => {
  const { saveOnChange = true, clearOnSubmit = true, debounceMs = 500 } = options || {};
  const storageKey = `form_${formId}`;

  const [data, setData, clearData] = useLocalStorage<T>(storageKey, initialData, {
    syncAcrossTabs: true
  });

  // Дебаунс для автосохранения
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const updateData = useCallback((newData: Partial<T>) => {
    const updatedData = { ...data, ...newData };
    setData(updatedData);

    if (saveOnChange && debounceMs > 0) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      
      const timer = setTimeout(() => {
        console.log(`Форма "${formId}" автоматически сохранена`);
      }, debounceMs);
      
      setDebounceTimer(timer);
    }
  }, [data, setData, saveOnChange, debounceMs, debounceTimer, formId]);

  const handleSubmit = useCallback(() => {
    if (clearOnSubmit) {
      clearData();
      console.log(`Данные формы "${formId}" очищены после отправки`);
    }
  }, [clearOnSubmit, clearData, formId]);

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return {
    data,
    updateData,
    clearData,
    handleSubmit,
    setData
  };
};

/**
 * Хук для управления пользовательскими настройками
 */
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useLocalStorage('user_preferences', {
    theme: 'light' as 'light' | 'dark',
    language: 'ru' as string,
    notifications: true,
    autoSave: true,
    animations: true
  }, {
    syncAcrossTabs: true
  });

  const updatePreference = useCallback(<K extends keyof typeof preferences>(
    key: K,
    value: typeof preferences[K]
  ) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  }, [setPreferences]);

  const resetPreferences = useCallback(() => {
    setPreferences({
      theme: 'light',
      language: 'ru',
      notifications: true,
      autoSave: true,
      animations: true
    });
  }, [setPreferences]);

  return {
    preferences,
    updatePreference,
    resetPreferences,
    setPreferences
  };
};
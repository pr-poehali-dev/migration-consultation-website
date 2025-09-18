# Хуки системы

Этот файл содержит описание всех кастомных хуков в проекте и примеры их использования.

## 📊 Аналитика и трекинг

### `useAnalytics`
Централизованное управление аналитикой с поддержкой LPTracker, Google Analytics и Яндекс.Метрики.

```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

const MyComponent = () => {
  const { trackServiceSelection, trackFormSubmit, trackPhoneClick } = useAnalytics();

  const handleServiceSelect = (serviceName: string, price: number) => {
    trackServiceSelection(serviceName, price);
  };

  return <div>...</div>;
};
```

### `useLPTracker`
Базовый хук для работы с LPTracker (отслеживание поведения пользователей).

```tsx
import { useLPTracker } from '@/hooks/useLPTracker';

const MyComponent = () => {
  const { trackEvent } = useLPTracker();

  const handleClick = () => {
    trackEvent('button_click', { button: 'cta' });
  };

  return <button onClick={handleClick}>Заказать</button>;
};
```

## 📋 Формы и валидация

### `useFormValidation`
Универсальная система валидации форм с поддержкой различных правил.

```tsx
import { useFormValidation, validationRules } from '@/hooks/useFormValidation';

const MyForm = () => {
  const { data, errors, setValue, validate } = useFormValidation({
    email: '',
    phone: '',
    name: ''
  });

  const rules = {
    email: validationRules.email(),
    phone: validationRules.phone(),
    name: validationRules.required()
  };

  const handleSubmit = () => {
    if (validate(rules)) {
      // Отправка формы
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={data.email}
        onChange={(e) => setValue('email', e.target.value)}
      />
      {errors.email && <span>{errors.email}</span>}
    </form>
  );
};
```

### `useFormLogic`
Специализированный хук для форм консультации (объединяет валидацию, API и аналитику).

```tsx
import { useFormLogic } from '@/hooks/useFormLogic';

const ConsultationForm = () => {
  const {
    formData,
    formErrors,
    isSubmitting,
    handleInputChange,
    handleSubmit
  } = useFormLogic();

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
      <button disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  );
};
```

## 🌐 API и сеть

### `useApiClient`
Универсальный клиент для HTTP запросов с обработкой ошибок и состояния загрузки.

```tsx
import { useApiClient } from '@/hooks/useApiClient';

const MyComponent = () => {
  const { post, get, isLoading, getError } = useApiClient();

  const submitData = async (data: any) => {
    const response = await post('/api/submit', data, {}, 'submit-request');
    
    if (response.success) {
      console.log('Успех!', response.data);
    } else {
      console.error('Ошибка:', response.error);
    }
  };

  return (
    <div>
      {isLoading('submit-request') && <div>Загрузка...</div>}
      {getError('submit-request') && <div>Ошибка: {getError('submit-request')?.message}</div>}
    </div>
  );
};
```

## 💾 Локальное хранение

### `useLocalStorage`
Синхронизация состояния с localStorage с поддержкой кроссвкладочной синхронизации.

```tsx
import { useLocalStorage } from '@/hooks/useLocalStorage';

const MyComponent = () => {
  const [user, setUser, removeUser] = useLocalStorage('user', null, {
    syncAcrossTabs: true
  });

  return (
    <div>
      {user ? `Привет, ${user.name}!` : 'Войдите в систему'}
      <button onClick={() => setUser({ name: 'Иван' })}>Войти</button>
      <button onClick={removeUser}>Выйти</button>
    </div>
  );
};
```

### `useFormPersistence`
Автоматическое сохранение состояния форм в localStorage.

```tsx
import { useFormPersistence } from '@/hooks/useLocalStorage';

const PersistentForm = () => {
  const { data, updateData, handleSubmit } = useFormPersistence('contact-form', {
    name: '',
    email: '',
    message: ''
  }, {
    saveOnChange: true,
    clearOnSubmit: true
  });

  return (
    <form onSubmit={() => {
      // логика отправки
      handleSubmit(); // очистит форму после успешной отправки
    }}>
      <input 
        value={data.name}
        onChange={(e) => updateData({ name: e.target.value })}
        placeholder="Имя"
      />
      <input 
        value={data.email}
        onChange={(e) => updateData({ email: e.target.value })}
        placeholder="Email"
      />
    </form>
  );
};
```

### `useUserPreferences`
Управление пользовательскими настройками (тема, язык, уведомления).

```tsx
import { useUserPreferences } from '@/hooks/useLocalStorage';

const Settings = () => {
  const { preferences, updatePreference, resetPreferences } = useUserPreferences();

  return (
    <div>
      <label>
        Тема:
        <select 
          value={preferences.theme}
          onChange={(e) => updatePreference('theme', e.target.value)}
        >
          <option value="light">Светлая</option>
          <option value="dark">Темная</option>
        </select>
      </label>
      
      <label>
        <input 
          type="checkbox"
          checked={preferences.notifications}
          onChange={(e) => updatePreference('notifications', e.target.checked)}
        />
        Уведомления
      </label>
      
      <button onClick={resetPreferences}>Сбросить настройки</button>
    </div>
  );
};
```

## ⏱️ Производительность

### `useDebounce`
Задержка обновления значения для оптимизации производительности.

```tsx
import { useDebounce } from '@/hooks/useDebounce';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Выполнить поиск только после 500мс паузы в наборе
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Поиск..."
    />
  );
};
```

### `useDebouncedCallback`
Задержка выполнения функций.

```tsx
import { useDebouncedCallback } from '@/hooks/useDebounce';

const AutoSaveForm = () => {
  const [data, setData] = useState({});
  
  const debouncedSave = useDebouncedCallback((formData) => {
    saveToServer(formData);
  }, 1000);

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    debouncedSave(newData); // Сохранится только через 1сек после последнего изменения
  };

  return <form>...</form>;
};
```

### `useThrottle`
Ограничение частоты выполнения функций.

```tsx
import { useThrottle } from '@/hooks/useDebounce';

const ScrollHandler = () => {
  const throttledScrollHandler = useThrottle(() => {
    console.log('Скролл обработан');
    // Будет выполняться максимум раз в 100мс
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', throttledScrollHandler);
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [throttledScrollHandler]);

  return <div>...</div>;
};
```

## 📱 Адаптивность

### `useMobile`
Определение мобильных устройств и адаптация интерфейса.

```tsx
import { useMobile } from '@/hooks/use-mobile';

const ResponsiveComponent = () => {
  const isMobile = useMobile();

  return (
    <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
      {isMobile ? <MobileMenu /> : <DesktopMenu />}
    </div>
  );
};
```

## 🔔 Уведомления

### `useToast`
Система уведомлений пользователя.

```tsx
import { useToast } from '@/hooks/use-toast';

const MyComponent = () => {
  const { toast } = useToast();

  const showSuccess = () => {
    toast({
      title: "Успех!",
      description: "Операция выполнена успешно",
    });
  };

  const showError = () => {
    toast({
      title: "Ошибка",
      description: "Что-то пошло не так",
      variant: "destructive"
    });
  };

  return (
    <div>
      <button onClick={showSuccess}>Показать успех</button>
      <button onClick={showError}>Показать ошибку</button>
    </div>
  );
};
```

## 🔗 Импорт

Все хуки можно импортировать из одного файла:

```tsx
import { 
  useFormLogic,
  useAnalytics, 
  useApiClient,
  useFormValidation,
  validationRules,
  useLocalStorage,
  useDebounce,
  useMobile,
  useToast
} from '@/hooks';
```

## 🎯 Лучшие практики

1. **Разделяйте логику**: Используйте специализированные хуки вместо одного большого
2. **Переиспользуйте**: Создавайте общие хуки для повторяющейся логики
3. **Типизируйте**: Всегда используйте TypeScript для лучшей разработки
4. **Тестируйте**: Покрывайте критичные хуки unit-тестами
5. **Документируйте**: Добавляйте JSDoc комментарии для сложной логики

## 🔄 Архитектурные принципы

- **Единая ответственность**: Каждый хук решает одну задачу
- **Композиция**: Хуки легко комбинируются друг с другом  
- **Производительность**: Оптимизированы с помощью useMemo и useCallback
- **Надежность**: Обработка ошибок и граничных случаев
- **Расширяемость**: Легко добавлять новую функциональность
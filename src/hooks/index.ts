// Основные хуки
export { useFormLogic } from './useFormLogic';
export { useLPTracker } from './useLPTracker';
export { useMobile } from './use-mobile';
export { useToast } from './use-toast';

// Новые специализированные хуки
export { useAnalytics } from './useAnalytics';
export { useApiClient, apiConfigs } from './useApiClient';
export { 
  useFormValidation, 
  validationRules,
  type ValidationRule,
  type ValidationRules,
  type FormData,
  type FormErrors 
} from './useFormValidation';
export { 
  useLocalStorage, 
  useSessionStorage, 
  useFormPersistence,
  useUserPreferences 
} from './useLocalStorage';
export { 
  useDebounce, 
  useDebouncedCallback, 
  useThrottle 
} from './useDebounce';

// Типы для удобства
export type {
  ApiRequest,
  ApiResponse,
  ApiError
} from './useApiClient';
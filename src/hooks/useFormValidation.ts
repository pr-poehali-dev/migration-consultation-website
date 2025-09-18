import { useState, useCallback } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
  message?: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface FormData {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}

/**
 * Хук для валидации форм
 * Предоставляет гибкую систему валидации с поддержкой различных правил
 */
export const useFormValidation = (initialData: FormData = {}) => {
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Валидация отдельного поля
  const validateField = useCallback((
    fieldName: string, 
    value: any, 
    rule: ValidationRule
  ): string | null => {
    // Проверка на обязательность
    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return rule.message || `Поле "${fieldName}" обязательно для заполнения`;
    }

    // Если поле не обязательное и пустое, пропускаем остальные проверки
    if (!value && !rule.required) return null;

    const stringValue = String(value);

    // Минимальная длина
    if (rule.minLength && stringValue.length < rule.minLength) {
      return rule.message || `Минимальная длина: ${rule.minLength} символов`;
    }

    // Максимальная длина
    if (rule.maxLength && stringValue.length > rule.maxLength) {
      return rule.message || `Максимальная длина: ${rule.maxLength} символов`;
    }

    // Проверка по регулярному выражению
    if (rule.pattern && !rule.pattern.test(stringValue)) {
      return rule.message || 'Неверный формат';
    }

    // Кастомная валидация
    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) return customError;
    }

    return null;
  }, []);

  // Валидация всей формы
  const validateForm = useCallback((
    formData: FormData, 
    rules: ValidationRules
  ): FormErrors => {
    const newErrors: FormErrors = {};

    Object.keys(rules).forEach(fieldName => {
      const rule = rules[fieldName];
      const value = formData[fieldName];
      const error = validateField(fieldName, value, rule);
      
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    return newErrors;
  }, [validateField]);

  // Обновление значения поля
  const setValue = useCallback((fieldName: string, value: any) => {
    setData(prev => ({ ...prev, [fieldName]: value }));
    
    // Очищаем ошибку для этого поля при изменении значения
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  }, [errors]);

  // Обновление нескольких полей
  const setValues = useCallback((newData: Partial<FormData>) => {
    setData(prev => ({ ...prev, ...newData }));
    
    // Очищаем ошибки для обновленных полей
    const updatedFields = Object.keys(newData);
    if (updatedFields.some(field => errors[field])) {
      setErrors(prev => {
        const newErrors = { ...prev };
        updatedFields.forEach(field => {
          if (newErrors[field]) {
            newErrors[field] = '';
          }
        });
        return newErrors;
      });
    }
  }, [errors]);

  // Отметка поля как тронутого
  const setTouched = useCallback((fieldName: string, isTouched = true) => {
    setTouched(prev => ({ ...prev, [fieldName]: isTouched }));
  }, []);

  // Валидация и установка ошибок
  const validate = useCallback((rules: ValidationRules) => {
    const newErrors = validateForm(data, rules);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [data, validateForm]);

  // Валидация конкретного поля
  const validateSingleField = useCallback((
    fieldName: string, 
    rule: ValidationRule
  ) => {
    const value = data[fieldName];
    const error = validateField(fieldName, value, rule);
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error || ''
    }));

    return !error;
  }, [data, validateField]);

  // Сброс формы
  const reset = useCallback((newInitialData?: FormData) => {
    const resetData = newInitialData || initialData;
    setData(resetData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  // Проверка наличия ошибок
  const hasErrors = Object.values(errors).some(error => error);
  
  // Проверка валидности формы
  const isValid = !hasErrors && Object.keys(touched).length > 0;

  return {
    data,
    errors,
    touched,
    hasErrors,
    isValid,
    setValue,
    setValues,
    setTouched,
    validate,
    validateSingleField,
    reset,
    validateField,
    validateForm
  };
};

// Предустановленные правила валидации
export const validationRules = {
  required: (message?: string): ValidationRule => ({
    required: true,
    message
  }),

  minLength: (length: number, message?: string): ValidationRule => ({
    minLength: length,
    message: message || `Минимальная длина: ${length} символов`
  }),

  maxLength: (length: number, message?: string): ValidationRule => ({
    maxLength: length,
    message: message || `Максимальная длина: ${length} символов`
  }),

  email: (message?: string): ValidationRule => ({
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: message || 'Введите корректный email'
  }),

  phone: (message?: string): ValidationRule => ({
    pattern: /^[\d\s\-\+\(\)]+$/,
    message: message || 'Введите корректный номер телефона'
  }),

  url: (message?: string): ValidationRule => ({
    pattern: /^https?:\/\/.+/,
    message: message || 'Введите корректный URL'
  }),

  number: (message?: string): ValidationRule => ({
    pattern: /^\d+$/,
    message: message || 'Введите число'
  }),

  custom: (validator: (value: any) => string | null): ValidationRule => ({
    custom: validator
  })
};
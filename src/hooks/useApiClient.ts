import { useState, useCallback } from 'react';

export interface ApiRequest {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  error?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

/**
 * Хук для работы с API запросами
 * Предоставляет унифицированный интерфейс для всех HTTP запросов
 */
export const useApiClient = () => {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: ApiError | null }>({});

  // Базовая функция для выполнения запросов
  const makeRequest = useCallback(async <T = any>(
    request: ApiRequest,
    requestKey?: string
  ): Promise<ApiResponse<T>> => {
    const key = requestKey || request.url;
    
    setLoading(prev => ({ ...prev, [key]: true }));
    setErrors(prev => ({ ...prev, [key]: null }));

    try {
      const controller = new AbortController();
      const timeoutId = request.timeout 
        ? setTimeout(() => controller.abort(), request.timeout)
        : null;

      const response = await fetch(request.url, {
        method: request.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...request.headers
        },
        body: request.data ? JSON.stringify(request.data) : undefined,
        signal: controller.signal
      });

      if (timeoutId) clearTimeout(timeoutId);

      let responseData: T;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = (await response.text()) as unknown as T;
      }

      if (!response.ok) {
        throw new Error(
          typeof responseData === 'object' && responseData !== null && 'error' in responseData
            ? (responseData as any).error
            : `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return {
        data: responseData,
        success: true,
        status: response.status
      };

    } catch (error: any) {
      const apiError: ApiError = {
        message: error.message || 'Произошла ошибка при выполнении запроса',
        status: error.status,
        code: error.code
      };

      setErrors(prev => ({ ...prev, [key]: apiError }));
      
      return {
        data: null as unknown as T,
        success: false,
        error: apiError.message,
        status: error.status || 0
      };
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  }, []);

  // GET запрос
  const get = useCallback(<T = any>(
    url: string, 
    headers?: Record<string, string>,
    requestKey?: string
  ) => {
    return makeRequest<T>({ url, method: 'GET', headers }, requestKey);
  }, [makeRequest]);

  // POST запрос
  const post = useCallback(<T = any>(
    url: string, 
    data?: any, 
    headers?: Record<string, string>,
    requestKey?: string
  ) => {
    return makeRequest<T>({ url, method: 'POST', data, headers }, requestKey);
  }, [makeRequest]);

  // PUT запрос
  const put = useCallback(<T = any>(
    url: string, 
    data?: any, 
    headers?: Record<string, string>,
    requestKey?: string
  ) => {
    return makeRequest<T>({ url, method: 'PUT', data, headers }, requestKey);
  }, [makeRequest]);

  // DELETE запрос
  const del = useCallback(<T = any>(
    url: string, 
    headers?: Record<string, string>,
    requestKey?: string
  ) => {
    return makeRequest<T>({ url, method: 'DELETE', headers }, requestKey);
  }, [makeRequest]);

  // PATCH запрос
  const patch = useCallback(<T = any>(
    url: string, 
    data?: any, 
    headers?: Record<string, string>,
    requestKey?: string
  ) => {
    return makeRequest<T>({ url, method: 'PATCH', data, headers }, requestKey);
  }, [makeRequest]);

  // Очистка состояния для конкретного запроса
  const clearRequestState = useCallback((requestKey: string) => {
    setLoading(prev => ({ ...prev, [requestKey]: false }));
    setErrors(prev => ({ ...prev, [requestKey]: null }));
  }, []);

  // Очистка всего состояния
  const clearAllState = useCallback(() => {
    setLoading({});
    setErrors({});
  }, []);

  // Проверка состояния загрузки
  const isLoading = useCallback((requestKey?: string) => {
    if (requestKey) {
      return loading[requestKey] || false;
    }
    return Object.values(loading).some(Boolean);
  }, [loading]);

  // Получение ошибки для конкретного запроса
  const getError = useCallback((requestKey: string) => {
    return errors[requestKey] || null;
  }, [errors]);

  // Проверка наличия ошибок
  const hasError = useCallback((requestKey?: string) => {
    if (requestKey) {
      return errors[requestKey] !== null;
    }
    return Object.values(errors).some(error => error !== null);
  }, [errors]);

  return {
    // Основные методы
    makeRequest,
    get,
    post,
    put,
    delete: del,
    patch,

    // Состояние
    loading,
    errors,
    isLoading,
    hasError,
    getError,

    // Утилиты
    clearRequestState,
    clearAllState
  };
};

// Предустановленные конфигурации для различных API
export const apiConfigs = {
  // Конфигурация для backend функций
  backend: (functionId: string) => ({
    baseUrl: `https://functions.poehali.dev/${functionId}`,
    defaultHeaders: {
      'Content-Type': 'application/json'
    },
    timeout: 30000
  }),

  // Конфигурация для внешних API
  external: (baseUrl: string, apiKey?: string) => ({
    baseUrl,
    defaultHeaders: {
      'Content-Type': 'application/json',
      ...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
    },
    timeout: 15000
  })
};
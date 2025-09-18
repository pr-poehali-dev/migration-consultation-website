import { useCallback } from 'react';
import { useLPTracker } from './useLPTracker';

interface AnalyticsEvent {
  event: string;
  category?: string;
  label?: string;
  value?: number;
  customData?: Record<string, any>;
}

/**
 * Хук для работы с аналитикой и трекингом событий
 * Централизует всю логику отправки событий в различные системы аналитики
 */
export const useAnalytics = () => {
  const { trackEvent } = useLPTracker();

  // Отправка события в LPTracker
  const trackLPEvent = useCallback((eventName: string, data?: any) => {
    trackEvent(eventName, data);
  }, [trackEvent]);

  // Отправка события в Google Analytics (если подключен)
  const trackGAEvent = useCallback((event: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.event, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.customData
      });
    }
  }, []);

  // Отправка события в Яндекс.Метрику (если подключена)
  const trackYMEvent = useCallback((eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(process.env.VITE_YM_ID, 'reachGoal', eventName, params);
    }
  }, []);

  // Универсальная функция для отправки во все системы
  const trackUniversalEvent = useCallback((
    eventName: string, 
    data?: Record<string, any>,
    options?: {
      lpTracker?: boolean;
      googleAnalytics?: boolean;
      yandexMetrika?: boolean;
    }
  ) => {
    const { lpTracker = true, googleAnalytics = true, yandexMetrika = true } = options || {};

    if (lpTracker) {
      trackLPEvent(eventName, data);
    }

    if (googleAnalytics) {
      trackGAEvent({
        event: eventName,
        category: data?.category || 'user_interaction',
        label: data?.label,
        value: data?.value,
        customData: data
      });
    }

    if (yandexMetrika) {
      trackYMEvent(eventName, data);
    }
  }, [trackLPEvent, trackGAEvent, trackYMEvent]);

  // Специальные события для бизнес-логики
  const trackServiceSelection = useCallback((serviceName: string, price: number) => {
    trackUniversalEvent('service_selected', {
      service: serviceName,
      price,
      category: 'service_interaction'
    });
  }, [trackUniversalEvent]);

  const trackFormStart = useCallback((formType: string = 'consultation') => {
    trackUniversalEvent('form_start', {
      form_type: formType,
      category: 'form_interaction'
    });
  }, [trackUniversalEvent]);

  const trackFormSubmit = useCallback((formData: Record<string, any>) => {
    trackUniversalEvent('form_submit_success', {
      ...formData,
      category: 'conversion'
    });
  }, [trackUniversalEvent]);

  const trackFormError = useCallback((errorType: string, formType: string = 'consultation') => {
    trackUniversalEvent('form_submit_error', {
      error_type: errorType,
      form_type: formType,
      category: 'form_interaction'
    });
  }, [trackUniversalEvent]);

  const trackPhoneClick = useCallback((phoneNumber: string) => {
    trackUniversalEvent('phone_click', {
      phone: phoneNumber,
      category: 'contact_interaction'
    });
  }, [trackUniversalEvent]);

  const trackEmailClick = useCallback((email: string) => {
    trackUniversalEvent('email_click', {
      email,
      category: 'contact_interaction'
    });
  }, [trackUniversalEvent]);

  const trackSocialClick = useCallback((platform: string, url: string) => {
    trackUniversalEvent('social_click', {
      platform,
      url,
      category: 'social_interaction'
    });
  }, [trackUniversalEvent]);

  const trackDownload = useCallback((fileName: string, fileType: string) => {
    trackUniversalEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
      category: 'download'
    });
  }, [trackUniversalEvent]);

  const trackVideoPlay = useCallback((videoTitle: string, videoUrl?: string) => {
    trackUniversalEvent('video_play', {
      video_title: videoTitle,
      video_url: videoUrl,
      category: 'media_interaction'
    });
  }, [trackUniversalEvent]);

  return {
    // Базовые функции
    trackLPEvent,
    trackGAEvent,
    trackYMEvent,
    trackUniversalEvent,
    
    // Специальные события
    trackServiceSelection,
    trackFormStart,
    trackFormSubmit,
    trackFormError,
    trackPhoneClick,
    trackEmailClick,
    trackSocialClick,
    trackDownload,
    trackVideoPlay
  };
};

// Типы для глобальных объектов аналитики
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    ym?: (id: string | number, method: string, ...args: any[]) => void;
  }
}
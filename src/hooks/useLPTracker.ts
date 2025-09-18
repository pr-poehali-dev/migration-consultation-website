import { useEffect } from 'react';

declare global {
  interface Window {
    lptWg: {
      push: (event: [string, string, any?]) => void;
    };
  }
}

export const useLPTracker = () => {
  useEffect(() => {
    let scrollDepth = 0;
    let timeOnPage = 0;
    const startTime = Date.now();

    // Отслеживание глубины скролла
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > scrollDepth && scrollPercent % 25 === 0) {
        scrollDepth = scrollPercent;
        if (window.lptWg && window.lptWg.push) {
          window.lptWg.push(['event', 'scroll_depth', {
            depth: scrollPercent
          }]);
        }
      }
    };

    // Отслеживание времени на странице
    const trackTimeOnPage = () => {
      timeOnPage = Math.round((Date.now() - startTime) / 1000);
      
      if (timeOnPage % 30 === 0 && timeOnPage > 0) { // каждые 30 секунд
        if (window.lptWg && window.lptWg.push) {
          window.lptWg.push(['event', 'time_on_page', {
            seconds: timeOnPage
          }]);
        }
      }
    };

    // Отслеживание ухода со страницы
    const handleBeforeUnload = () => {
      const finalTime = Math.round((Date.now() - startTime) / 1000);
      if (window.lptWg && window.lptWg.push) {
        window.lptWg.push(['event', 'page_exit', {
          total_time: finalTime,
          max_scroll_depth: scrollDepth
        }]);
      }
    };

    // Добавляем слушатели событий
    window.addEventListener('scroll', handleScroll, { passive: true });
    const timeInterval = setInterval(trackTimeOnPage, 1000);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Событие загрузки страницы
    if (window.lptWg && window.lptWg.push) {
      window.lptWg.push(['event', 'page_view', {
        page: window.location.pathname,
        referrer: document.referrer
      }]);
    }

    // Очистка при размонтировании
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Функция для отправки кастомных событий
  const trackEvent = (eventName: string, data?: any) => {
    if (window.lptWg && window.lptWg.push) {
      window.lptWg.push(['event', eventName, data]);
    }
  };

  return { trackEvent };
};
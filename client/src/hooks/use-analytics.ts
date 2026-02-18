import { useEffect } from 'react';
import { siteContent } from '@/data/site-content';

interface Analytics {
  pageview: (pagePath: string, pageTitle?: string) => void;
  event: (eventName: string, eventCategory?: string, eventLabel?: string, eventValue?: number) => void;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function useAnalytics(): Analytics {
  // Initialize analytics on mount
  useEffect(() => {
    if (!siteContent.analytics.enableTracking || !siteContent.analytics.googleAnalyticsId) {
      return;
    }

    // Inject Google Analytics script if not already present
    if (!document.querySelector(`script[src*="googletagmanager"]`)) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${siteContent.analytics.googleAnalyticsId}`;
      document.head.appendChild(script1);

      window.gtag = window.gtag || function() { (window.dataLayer = window.dataLayer || []).push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', siteContent.analytics.googleAnalyticsId);
    }
  }, []);

  const pageview = (pagePath: string, pageTitle?: string) => {
    if (!siteContent.analytics.enableTracking || !window.gtag) {
      return;
    }

    window.gtag('config', siteContent.analytics.googleAnalyticsId, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  };

  const event = (eventName: string, eventCategory?: string, eventLabel?: string, eventValue?: number) => {
    if (!siteContent.analytics.enableTracking || !window.gtag) {
      return;
    }

    window.gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: eventValue,
    });
  };

  return { pageview, event };
}

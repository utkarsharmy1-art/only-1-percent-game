import { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
}

export function SEO({
  title,
  description = SITE_CONFIG.description,
  path = '',
  type = 'website',
}: SEOProps) {
  useEffect(() => {
    // Format full title
    const fullTitle = title 
      ? `${title} | ${SITE_CONFIG.name}` 
      : `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;
    document.title = fullTitle;

    // Build absolute canonical URL using production domain
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${SITE_CONFIG.productionUrl}${cleanPath === '/' ? '/' : cleanPath}`;

    // Helper to safely set or create meta tag
    const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta
    setMetaTag('meta[name="description"]', 'name', 'description', description);

    // Canonical link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Open Graph
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', type);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_CONFIG.name);

    // Twitter
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', canonicalUrl);

    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [title, description, path, type]);

  return null;
}

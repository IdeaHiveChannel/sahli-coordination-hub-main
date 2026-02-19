import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function CanonicalTag() {
  const location = useLocation();

  useEffect(() => {
    // base URL for the site (no trailing slash)
    const baseUrl = 'https://sahliservice.com';
    
    // clean path: ensure root has slash, others don't
    const path = location.pathname === '/' 
      ? '/' 
      : location.pathname.endsWith('/') && location.pathname !== '/'
        ? location.pathname.slice(0, -1) 
        : location.pathname;

    const url = `${baseUrl}${path}`;

    // Find existing canonical tag or create new one
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    link.setAttribute('href', url);

  }, [location.pathname]);

  return null;
}

import React, { useEffect } from 'react';
import { useSite } from '../../hooks/useSite';

export const SEO = ({ title, description, ogImage }) => {
  const { settings } = useSite();

  useEffect(() => {
    const siteTitle = settings?.brandName || 'BuildForge Studio';
    document.title = title ? `${title} | ${siteTitle}` : (settings?.metaTitle || siteTitle);

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || settings?.metaDescription || '');
    }
  }, [title, description, settings]);

  return null;
};

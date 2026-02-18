import { useState, useEffect } from 'react';

interface UseImageLoadProps {
  src?: string;
  alt: string;
}

interface UseImageLoadResult {
  isLoading: boolean;
  isError: boolean;
  isLoaded: boolean;
}

export function useImageLoad({ src, alt }: UseImageLoadProps): UseImageLoadResult {
  const [isLoading, setIsLoading] = useState(!!src);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setIsError(true);
      return;
    }

    const img = new Image();
    
    const handleLoad = () => {
      setIsLoading(false);
      setIsLoaded(true);
      setIsError(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setIsError(true);
      setIsLoaded(false);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    img.src = src;

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);

  return { isLoading, isError, isLoaded };
}

export function getImageSrcSet(src: string): string {
  // Generate responsive image srcset
  // This assumes images are served with query params for sizing
  return `${src}?w=400 400w, ${src}?w=800 800w, ${src}?w=1200 1200w`;
}

export function getWebPAlternative(src: string): string {
  // Convert image to WebP format
  // This is a placeholder - actual conversion would happen on CDN
  return src.replace(/\.(jpg|png)$/i, '.webp');
}

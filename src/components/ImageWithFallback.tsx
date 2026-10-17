import React, { useState, useEffect, useRef } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackSubtitle,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset states and check if the image is already cached/complete when src changes
  useEffect(() => {
    setHasError(false);
    if (!src) {
      setIsLoaded(false);
      return;
    }

    if (imgRef.current) {
      if (imgRef.current.complete && imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      }
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  if (hasError || !src) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center bg-[#EAE3D8] text-[#5A524A] p-4 text-center select-none ${className}`}>
        <div className="w-10 h-10 rounded-full border border-[#BFAFA0] flex items-center justify-center font-serif text-lg text-[#7A5C43] mb-2 bg-[#F5EFE6]">
          ❦
        </div>
        <span className="font-serif text-sm text-[#1E1B18] font-normal tracking-wide">
          {fallbackTitle || alt || 'Silk Botanical Composition'}
        </span>
        {fallbackSubtitle && (
          <span className="text-[10px] text-[#8C7A6B] uppercase tracking-widest mt-0.5">
            {fallbackSubtitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#EAE3D8]">
      {/* Subtle loader shimmer only if still not loaded */}
      {!isLoaded && (
        <div 
          aria-hidden="true"
          className="absolute inset-0 bg-[#EAE3D8] flex items-center justify-center text-[#8C7A6B] animate-pulse z-0 pointer-events-none"
        >
          <span className="font-serif text-xs tracking-wider">Loading botanical...</span>
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt || fallbackTitle || 'Everlasting floral arrangement'}
        className={`${className} relative z-10 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-90'}`}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

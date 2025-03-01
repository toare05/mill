'use client';

import { useEffect, useRef } from 'react';

// AdSense의 전역 객체를 위한 타입 선언
declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

interface GoogleAdsenseProps {
  slot: string;
  style?: React.CSSProperties;
  format?: 'auto' | 'fluid';
  responsive?: boolean;
  layout?: string;
}

export default function GoogleAdsense({
  slot,
  style = { display: 'block' },
  format = 'auto',
  responsive = true,
  layout,
}: GoogleAdsenseProps) {
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadAd = () => {
      try {
        if (window.adsbygoogle && adRef.current) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    };
    
    // Load ad when component mounts
    loadAd();
    
    // Handle case where AdSense script loads after component mounts
    if (document.querySelector('script[src*="adsbygoogle"]')) {
      loadAd();
    }
    
    return () => {
      // Cleanup if needed
    };
  }, [slot]);

  return (
    <div className="ad-container" ref={adRef}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-6559398788369653" // 실제 애드센스 퍼블리셔 ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        data-ad-layout={layout}
      />
    </div>
  );
} 
'use client';

import { useEffect, useRef, useState } from 'react';

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
  const [adLoaded, setAdLoaded] = useState(false);
  
  useEffect(() => {
    // 이미 광고가 로드되었으면 중복 실행 방지
    if (adLoaded) return;

    const loadAd = () => {
      try {
        if (window.adsbygoogle && adRef.current && !adLoaded) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setAdLoaded(true);
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    };
    
    // 스크립트가 이미 로드되었는지 확인
    if (document.querySelector('script[src*="adsbygoogle"]')) {
      // 약간의 지연 후 광고 로드 (스크립트 로드 완료 확인)
      const timer = setTimeout(() => {
        loadAd();
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      // 스크립트가 아직 로드되지 않은 경우, window.adsbygoogle가 정의될 때까지 대기
      const checkAndLoad = setInterval(() => {
        if (window.adsbygoogle) {
          loadAd();
          clearInterval(checkAndLoad);
        }
      }, 200);
      
      return () => clearInterval(checkAndLoad);
    }
  }, [slot, adLoaded]);

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
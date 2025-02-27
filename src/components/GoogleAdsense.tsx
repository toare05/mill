'use client';

import { useEffect } from 'react';

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
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Adsense error:', err);
    }
  }, []);

  return (
    <div className="ad-container">
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
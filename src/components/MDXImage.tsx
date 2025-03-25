"use client";

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface MDXImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function MDXImage({ 
  src, 
  alt, 
  width = 800, 
  height = 400, 
  className 
}: MDXImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="relative w-full">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'duration-700 ease-in-out rounded-lg',
          isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100',
          className
        )}
        onLoadingComplete={() => setLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
} 
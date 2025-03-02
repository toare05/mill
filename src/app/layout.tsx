import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#3B82F6",
};

export const metadata: Metadata = {
  title: "공군 점수 | 계산기밀",
  description: "대한민국 공군 지원을 위한 합격 점수 계산기입니다. 병과, 전공, 자격증 등의 정보를 입력하여 예상 점수를 확인하세요.",
  keywords: ["공군", "공군 점수 계산", "헌급방", "점수", "1차 점수", "병과", "전공", "자격증", "군복무"],
  authors: [{ name: "toare", url: "" }],
  creator: "toare",
  publisher: "toare",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png" }
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  },
  openGraph: {
    title: "군대 정보 계산기 | 계산기밀",
    description: "대한민국 군대 정보 계산기입니다. 공군 지원 점수 계산, 장병내일준비적금(군적금) 수령액 계산 등 다양한 계산기를 제공합니다.",
    url: "https://allformilitary.site",
    siteName: "계산기밀",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon.png?v=2" />
        <link rel="mask-icon" href="/favicon-32x32_new.png" color="#3B82F6" />
        <link rel="manifest" href="/site.webmanifest?v=2" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="계산기밀" />
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6559398788369653"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <meta name="google-adsense-account" content="ca-pub-6559398788369653" />
        <Script id="structured-data" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "공군 점수",
              "description": "대한민국 공군 지원을 위한 합격 점수 계산기입니다. 병과, 전공, 자격증 등의 정보를 입력하여 예상 점수를 확인하세요.",
              "applicationCategory": "UtilityApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "KRW"
              },
              "author": {
                "@type": "Person",
                "name": "toare"
              }
            }
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
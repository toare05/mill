import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
};

export const metadata: Metadata = {
  title: "군간부 합격 점수 계산기 | 계산기밀",
  description: "군간부 지원을 위한 합격 점수 계산기입니다. 병과, 전공, 자격증 등의 정보를 입력하여 예상 점수를 확인하세요.",
  keywords: ["군간부", "합격 점수", "계산기", "병과", "전공", "자격증", "군복무"],
  authors: [{ name: "toare", url: "" }],
  creator: "toare",
  publisher: "toare",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "군간부 합격 점수 계산기 | 계산기밀",
    description: "군간부 지원을 위한 합격 점수 계산기입니다. 병과, 전공, 자격증 등의 정보를 입력하여 예상 점수를 확인하세요.",
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
  icons: {
    icon: ["/favicon.ico"],
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
              "name": "군간부 합격 점수 계산기 | 계산기밀",
              "description": "군간부 지원을 위한 합격 점수 계산기입니다. 병과, 전공, 자격증 등의 정보를 입력하여 예상 점수를 확인하세요.",
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
      </body>
    </html>
  );
}
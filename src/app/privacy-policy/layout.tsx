import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "개인정보 처리방침 | 계산기밀",
  description: "계산기밀의 개인정보 처리방침입니다. 개인정보 수집 및 이용, 보관 기간, 이용자의 권리 등에 대해 안내합니다.",
  keywords: ["개인정보처리방침", "개인정보", "privacy policy", "계산기밀"],
  openGraph: {
    title: "개인정보 처리방침 | 계산기밀",
    description: "계산기밀의 개인정보 처리방침입니다. 개인정보 수집 및 이용, 보관 기간, 이용자의 권리 등에 대해 안내합니다.",
    url: "https://www.allformillitary.site/privacy-policy",
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
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 
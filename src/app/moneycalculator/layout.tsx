import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "장병내일준비적금 계산기 | 계산기밀",
  description: "장병내일준비적금(군적금) 예상 수령액을 계산해보세요.",
  keywords: ["장병내일준비적금", "군적금", "군 적금", "장병내일준비적금 계산기", "군적금 계산", "장병내일준비적금 수령액", "군적금 수령액", "장병내일준비적금 만기", "군적금 만기"],
  openGraph: {
    title: "장병내일준비적금 계산기 | 계산기밀",
    description: "장병내일준비적금(군적금) 예상 수령액을 계산해보세요. ",
    url: "https://allformilitary.site/moneycalculator",
    siteName: "계산기밀",
    locale: "ko_KR",
    type: "website",
  },
};

export default function MoneyCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
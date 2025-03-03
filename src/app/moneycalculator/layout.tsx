import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "장병내일준비적금 계산기 | 계산기밀",
  description: "장병내일준비적금(군적금) 만기 시 예상 수령액을 계산해보세요. 월 납입액, 복무 기간, 이자율, 정부 매칭을 고려한 최종 수령액을 확인할 수 있습니다.",
  keywords: ["장병내일준비적금", "군적금", "군 적금", "장병내일준비적금 계산기", "군적금 계산", "군적금 이자", "군적금 수령액", "장병내일준비적금 이자"],
  openGraph: {
    title: "장병내일준비적금 계산기 | 계산기밀",
    description: "장병내일준비적금(군적금) 만기 시 예상 수령액을 계산해보세요. 은행별 이자율 비교와 정부지원금을 포함한 최종 수령액을 확인할 수 있습니다.",
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
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "공군 지원 점수 계산기 | 계산기밀",
  description: "대한민국 공군 지원을 위한 1차 점수 계산기입니다. 병과, 전공, 자격증, 출결, 가산점 등을 입력하여 예상 점수를 시뮬레이션해보세요.",
  keywords: ["공군", "공군 지원", "공군 점수계산", "헌급방", "공군 합격점수", "공군 자격증", "공군 가산점"],
  openGraph: {
    title: "공군 지원 점수 계산기 | 계산기밀",
    description: "대한민국 공군 지원을 위한 1차 점수 계산기입니다. 병과, 전공, 자격증, 출결, 가산점 등을 입력하여 선발 커트라인과 비교해보세요.",
    url: "https://allformilitary.site/scorecalculator",
    siteName: "계산기밀",
    locale: "ko_KR",
    type: "website",
  },
};

export default function ScoreCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
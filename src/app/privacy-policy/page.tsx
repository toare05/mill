"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold mb-6">개인정보 처리방침</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. 개인정보의 처리 목적</h2>
            <p className="text-gray-700">
              본 웹사이트는 개인정보를 수집하지 않습니다. 다만, 서비스 이용 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-700">
              <li>IP 주소, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. 개인정보의 처리 및 보유 기간</h2>
            <p className="text-gray-700">
              자동 수집된 정보는 서비스 제공을 위해 필요한 기간 동안만 보유하며, 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. 정보주체와 법정대리인의 권리·의무 및 그 행사방법</h2>
            <p className="text-gray-700">
              정보주체는 개인정보에 대한 열람, 정정, 삭제, 처리정지를 요구할 수 있습니다. 이를 위해서는 웹사이트 관리자에게 이메일로 연락하시기 바랍니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. 쿠키 사용에 관한 사항</h2>
            <p className="text-gray-700">
              본 웹사이트는 이용자의 편의를 위해 쿠키를 사용할 수 있습니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에 보내는 작은 텍스트 파일로, 이용자의 컴퓨터 하드디스크에 저장됩니다.
            </p>
            <p className="text-gray-700 mt-2">
              이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. 광고 서비스에 관한 사항</h2>
            <p className="text-gray-700">
              본 웹사이트는 Google AdSense 광고 서비스를 사용합니다. Google AdSense는 쿠키를 사용하여 이용자의 웹사이트 방문 기록을 바탕으로 관심사에 맞는 광고를 표시합니다.
            </p>
            <p className="text-gray-700 mt-2">
              Google의 광고 쿠키 사용에 대한 자세한 정보는 <a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google 광고 및 개인정보 보호 정책</a>에서 확인하실 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. 개인정보 보호책임자</h2>
            <p className="text-gray-700">
              본 웹사이트는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="mt-2 text-gray-700">
              <p>• 개인정보 보호책임자: 웹사이트 관리자</p>
              <p>• 이메일: admin@allformilitary.site</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. 개인정보 처리방침 변경</h2>
            <p className="text-gray-700">
              이 개인정보 처리방침은 2024년 2월 27일부터 적용됩니다. 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
} 
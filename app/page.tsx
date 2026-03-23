'use client';

import Link from 'next/link';
import { Calendar, ClipboardList } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🏖️ 스테이하롱</h1>
        <p className="text-gray-500 text-sm">예약 관리 모바일</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <Link href="/schedule" className="block">
          <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">신/구 구분</h2>
              <p className="text-xs text-gray-500">날짜별 예약 조회 (신규/기존)</p>
            </div>
          </div>
        </Link>

        <Link href="/reservations" className="block">
          <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100">
              <ClipboardList className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">예약 처리</h2>
              <p className="text-xs text-gray-500">예약 변경 및 일괄 처리</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

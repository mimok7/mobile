'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, ClipboardList, FilePenLine } from 'lucide-react';
import supabase from '@/lib/supabase';

export default function HomePage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm mb-4 flex justify-end">
        <button
          type="button"
          onClick={handleLogout}
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          로그아웃
        </button>
      </div>

      <div className="text-center mb-10">
        <Image
          src="/logo.png"
          alt="스테이하롱 로고"
          width={220}
          height={72}
          className="mx-auto h-auto w-auto max-w-[220px]"
          priority
        />
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

        <Link href="/reservation-edit" className="block">
          <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-100">
              <FilePenLine className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">예약 수정</h2>
              <p className="text-xs text-gray-500">서비스별 상태 수정</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

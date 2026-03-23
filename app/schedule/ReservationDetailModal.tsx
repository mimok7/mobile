import React from 'react';
import { X, Ship, Plane, Building, MapPin, Car, FileText } from 'lucide-react';

const formatKoreanDateTime = (dateStr: string | null | undefined): string => {
  if (!dateStr) return '미정';
  try {
    const str = String(dateStr).replace(' ', 'T').replace(/Z$/, '').replace(/[+-]\d{2}:\d{2}$/, '');
    const m = str.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (!m) return String(dateStr);
    const [, yyyy, mm, dd, hh, min] = m;
    const h = parseInt(hh, 10);
    const ampm = h < 12 ? '오전' : '오후';
    const h12 = h % 12 || 12;
    return `${yyyy}. ${mm}. ${dd}. ${ampm} ${h12}:${min}`;
  } catch {
    return String(dateStr);
  }
};

const formatKoreanDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return '미정';
  try {
    const m = String(dateStr).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return String(dateStr);
    const [, yyyy, mm, dd] = m;
    return `${yyyy}. ${mm}. ${dd}.`;
  } catch {
    return String(dateStr);
  }
};

const getServiceType = (item: any) => {
  if (item.cruise && item.checkin) return 'cruise';
  if (item.boardingDate && item.vehicleNumber) return 'vehicle';
  if (item.airportName && item.flightNumber) return 'airport';
  if (item.hotelName && item.checkinDate) return 'hotel';
  if (item.tourName && item.startDate) return 'tour';
  if (item.pickupDate && item.usagePeriod) return 'rentcar';
  if (item.pickupDatetime && !item.boardingDate && !item.pickupDate) return 'car';
  return 'unknown';
};

const icons: Record<string, any> = {
  cruise: Ship,
  airport: Plane,
  hotel: Building,
  tour: MapPin,
  rentcar: Car,
  car: Car,
  vehicle: Car,
};

export default function ReservationDetailModal({ isOpen, onClose, item }: { isOpen: boolean; onClose: () => void; item: any; }) {
  if (!isOpen || !item) return null;

  const type = getServiceType(item);
  const Icon = icons[type] || FileText;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-[95%] max-w-3xl p-4">
        <button onClick={onClose} className="absolute right-3 top-3 p-1 rounded hover:bg-gray-100">
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-3 pb-3 border-b mb-3">
          <div className="w-9 h-9 flex items-center justify-center rounded bg-gray-100">
            <Icon className="w-5 h-5 text-gray-700" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-lg">{type === 'unknown' ? '서비스 상세' : `${type} 상세`}</div>
            <div className="text-sm text-gray-500">{item.customerName || item.name || '고객 정보 없음'}</div>
          </div>
          {item.source === 'sh' && <div className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">Old</div>}
        </div>

        <div className="space-y-3 text-sm text-gray-700">
          {/* 공통 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div><strong>주문번호:</strong> <span className="ml-2">{item.orderId || '-'}</span></div>
            <div><strong>이메일:</strong> <span className="ml-2">{item.email || '-'}</span></div>
          </div>

          {/* 서비스별 최소 필드 (매니저 모달의 핵심 항목만 포함) */}
          {type === 'cruise' && (
            <div className="bg-gray-50 p-3 rounded">
              <div><strong>크루즈:</strong> <span className="ml-2">{item.cruise || '-'}</span></div>
              <div><strong>객실:</strong> <span className="ml-2">{item.roomType || '-'} {item.category ? `(${item.category})` : ''}</span></div>
              <div><strong>체크인:</strong> <span className="ml-2">{formatKoreanDate(item.checkin)}</span></div>
              <div><strong>인원:</strong> <span className="ml-2">{(item.adult||0) + (item.child||0)}명</span></div>
            </div>
          )}

          {type === 'airport' && (
            <div className="bg-gray-50 p-3 rounded">
              <div><strong>구분:</strong> <span className="ml-2">{item.tripType || item.category || '-'}</span></div>
              <div><strong>경로:</strong> <span className="ml-2">{item.route || '-'}</span></div>
              <div><strong>일시:</strong> <span className="ml-2">{formatKoreanDateTime(item.date || item.time || item.ra_datetime || item.ra_datetime)}</span></div>
              <div><strong>항공편:</strong> <span className="ml-2">{item.flightNumber || item.ra_flight_number || '-'}</span></div>
            </div>
          )}

          {type === 'hotel' && (
            <div className="bg-gray-50 p-3 rounded">
              <div><strong>호텔:</strong> <span className="ml-2">{item.hotelName || '-'}</span></div>
              <div><strong>체크인:</strong> <span className="ml-2">{formatKoreanDate(item.checkinDate || item.checkin)}</span></div>
              <div><strong>객실수:</strong> <span className="ml-2">{item.roomCount || 0}개</span></div>
            </div>
          )}

          {type === 'car' && (
            <div className="bg-gray-50 p-3 rounded">
              <div><strong>차종:</strong> <span className="ml-2">{item.carType || '-'}</span></div>
              <div><strong>픽업:</strong> <span className="ml-2">{item.pickupLocation || '-'}</span></div>
              <div><strong>일시:</strong> <span className="ml-2">{formatKoreanDateTime(item.pickupDatetime || item.pickupDatetime)}</span></div>
            </div>
          )}

          {type === 'tour' && (
            <div className="bg-gray-50 p-3 rounded">
              <div><strong>투어명:</strong> <span className="ml-2">{item.tourName || '-'}</span></div>
              <div><strong>사용일:</strong> <span className="ml-2">{formatKoreanDate(item.startDate || item.date)}</span></div>
              <div><strong>인원:</strong> <span className="ml-2">{item.participants || 0}명</span></div>
            </div>
          )}

          {/* 요청사항 */}
          {item.requestNote && (
            <div>
              <strong>요청사항</strong>
              <div className="mt-2 p-2 bg-gray-50 rounded text-sm">{item.requestNote}</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "스테이하롱 모바일",
  description: "스테이하롱 예약 관리 모바일",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}

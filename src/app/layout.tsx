import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '나의 여행 성향 테스트 | CULTURE',
  description: '당신의 여행 본능이 알고 싶다',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      </head>
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '나의 여행 성향 테스트',
  description: '당신의 감성으로 찾는 맞춤형 국내 여행',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

'use client'
import { useRouter } from 'next/navigation'
import { VideoBackground } from '@/shared/ui/VideoBackground'

const LANDING_VIDEO = 'https://videos.pexels.com/video-files/1093662/1093662-hd_1280_720_25fps.mp4'
const LANDING_POSTER = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'

export function LandingPage() {
  const router = useRouter()

  return (
    <div className="relative flex flex-col items-center justify-between min-h-dvh px-6 py-6 overflow-hidden">
      <VideoBackground src={LANDING_VIDEO} fallbackImageUrl={LANDING_POSTER} overlayOpacity={0.6} />

      {/* Top bar */}
      <div className="relative z-10 w-full flex justify-end">
        <button
          type="button"
          className="text-xs text-white/60 font-sans border border-white/20 rounded-full px-3 py-1.5 hover:border-white/50 transition-colors"
        >
          KO/EN
        </button>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center flex-1 justify-center gap-6 max-w-sm w-full">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs text-white/50 font-sans tracking-[0.3em] uppercase">Travel DNA</p>
          <h1
            className="font-serif text-5xl font-bold text-white leading-none tracking-tight"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
          >
            CULTURE
          </h1>
          <p className="text-sm text-white/70 font-sans tracking-[0.15em]">
            당신의 여행 본능이 알고 싶다
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full max-w-[200px]">
          <div className="flex-1 h-px bg-white/30" />
          <span className="text-white/40 text-xs">✦</span>
          <div className="flex-1 h-px bg-white/30" />
        </div>

        {/* Testimonial */}
        <div className="text-center px-2">
          <p className="text-white/90 font-serif text-base italic leading-relaxed">
            &ldquo;처음으로 여행이 진짜 설레기 시작했어요.&rdquo;
          </p>
          <p className="text-white/50 font-sans text-xs mt-2">— 27 · 직장인</p>
        </div>

        {/* Badge */}
        <p className="text-accent font-sans text-xs tracking-wider">
          ✦ 무료 여행 성향 분석 — 지금 한정 ✦
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={() => router.push('/quiz')}
          className="w-full bg-accent text-black font-sans font-semibold text-base rounded-full py-4 px-6 hover:brightness-110 active:scale-95 transition-all duration-200"
        >
          나의 여행 성향 알아보기 →
        </button>

        <div className="flex gap-4 text-white/30 text-xs font-sans">
          <a href="#" className="hover:text-white/60 transition-colors">이용약관</a>
          <span>·</span>
          <a href="#" className="hover:text-white/60 transition-colors">개인정보처리방침</a>
        </div>
      </div>
    </div>
  )
}

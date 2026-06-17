'use client'
import { useRouter } from 'next/navigation'

export function LandingPage() {
  const router = useRouter()

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '100dvh',
        padding: '1.25rem 1.5rem',
        overflow: 'hidden',
        background: '#07060e',
      }}
    >
      {/* sajuboyz 실제 배경 영상 */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.85,
        }}
      >
        <source src="/assets/members.mp4" type="video/mp4" />
      </video>

      {/* 어두운 오버레이 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#07060ed1',
        }}
      />

      {/* 상단: KO/EN 토글 */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 12px',
            borderRadius: '9999px',
            border: '1px solid #d4a8534d',
            fontSize: '0.875rem',
            letterSpacing: '0.04em',
            fontWeight: 700,
            background: 'rgba(7, 6, 14, 0.7)',
            color: '#ede9f7',
            transition: 'background 0.15s, box-shadow 0.15s',
            cursor: 'pointer',
          }}
        >
          <span style={{ color: '#f0d48a' }}>KO</span>
          <span style={{ color: '#635c78', opacity: 0.4 }}>/</span>
          <span style={{ color: '#635c78' }}>EN</span>
        </button>
      </div>

      {/* 중앙 콘텐츠 */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          flex: 1,
          justifyContent: 'center',
          gap: '1.5rem',
          maxWidth: '320px',
          width: '100%',
        }}
      >
        {/* sajuboyz 로고 이미지 */}
        <img
          src="/assets/logo.png"
          alt="CULTURE"
          style={{ width: '220px', height: 'auto', filter: 'brightness(1.05)' }}
        />

        {/* 슬로건 */}
        <p
          style={{
            fontFamily: '"Pretendard Variable", "Pretendard", sans-serif',
            fontSize: '1.0625rem',
            color: '#a8a0be',
            letterSpacing: '0.04em',
            lineHeight: 1.6,
          }}
        >
          당신의 여행 본능이 알고 싶다
        </p>

        {/* 구분선 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '200px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
          <span style={{ color: '#d4a853', fontSize: '0.75rem' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
        </div>

        {/* 후기 인용구 */}
        <div style={{ maxWidth: '280px' }}>
          <p
            style={{
              fontFamily: '"Noto Serif KR", serif',
              fontSize: '1.0625rem',
              color: '#a8a0be',
              fontStyle: 'italic',
              lineHeight: 1.8,
              textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            }}
          >
            &ldquo;처음으로 여행이 진짜 설레기 시작했어요.&rdquo;
          </p>
          <p
            style={{
              fontFamily: '"Pretendard Variable", "Pretendard", sans-serif',
              fontSize: '0.875rem',
              color: '#635c78',
              marginTop: '8px',
            }}
          >
            — 27 · 직장인
          </p>
        </div>

        {/* 뱃지 */}
        <p
          style={{
            fontFamily: '"Noto Serif KR", serif',
            fontSize: '0.875rem',
            color: '#f0d48a',
            letterSpacing: '0.06em',
          }}
        >
          ✦ 무료 여행 성향 분석 — 지금 한정 ✦
        </p>
      </div>

      {/* 하단 CTA */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '320px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <button
          type="button"
          onClick={() => router.push('/quiz')}
          style={{
            width: '100%',
            background: '#d4a853',
            color: '#07060e',
            fontFamily: '"Noto Serif KR", serif',
            fontSize: '1.0625rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            borderRadius: '9999px',
            padding: '1rem 1.5rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 30px #d4a85340',
            transition: 'filter 0.15s, transform 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          나의 여행 성향 알아보기 →
        </button>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            fontSize: '0.875rem',
            color: '#635c78',
            fontFamily: '"Pretendard Variable", "Pretendard", sans-serif',
          }}
        >
          <a href="#" style={{ transition: 'color 0.15s' }}>이용약관</a>
          <span>·</span>
          <a href="#" style={{ transition: 'color 0.15s' }}>개인정보처리방침</a>
        </div>
      </div>
    </div>
  )
}

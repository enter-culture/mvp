'use client'
import { useRouter } from 'next/navigation'
import type { Destination } from '@/entities/destination/model/types'

type Props = { destination: Destination }

export function DestinationPage({ destination }: Props) {
  const router = useRouter()

  return (
    <div style={{ background: '#07060e', minHeight: '100dvh', maxWidth: '430px', margin: '0 auto' }}>

      {/* ── 히어로 영상/이미지 ── */}
      <div style={{ position: 'relative', height: '52dvh', overflow: 'hidden' }}>
        <video
          autoPlay muted loop playsInline
          poster={destination.images[0]}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src={destination.videoUrl} type="video/mp4" />
        </video>
        {/* 그라디언트 오버레이 */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,6,14,0.2) 0%, rgba(7,6,14,0.5) 50%, rgba(7,6,14,1) 100%)' }} />

        {/* 뒤로가기 버튼 */}
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            position: 'absolute', top: '1rem', left: '1rem', zIndex: 10,
            background: 'rgba(7,6,14,0.6)', backdropFilter: 'blur(8px)',
            border: '1px solid #d4a8534d', color: '#a8a0be',
            borderRadius: '9999px', padding: '8px 16px',
            fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          ← 돌아가기
        </button>

        {/* 히어로 텍스트 */}
        <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.25rem', right: '1.25rem', zIndex: 5 }}>
          <span style={{
            display: 'inline-block',
            background: '#d4a8531f', border: '1px solid #d4a8534d',
            borderRadius: '9999px', padding: '3px 12px',
            fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.7rem',
            color: '#d4a853', letterSpacing: '0.1em', marginBottom: '8px',
          }}>
            {destination.region}
          </span>
          <h1 style={{
            fontFamily: '"Noto Serif KR", serif', fontWeight: 900,
            fontSize: '1.375rem', color: '#ede9f7',
            lineHeight: 1.35, letterSpacing: '-0.01em',
            textShadow: '0 2px 12px rgba(0,0,0,0.8)',
            marginBottom: '6px',
          }}>
            {destination.title}
          </h1>
          <p style={{ fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.8rem', color: '#a8a0be', letterSpacing: '0.04em' }}>
            {destination.mood}
          </p>
        </div>
      </div>

      {/* ── 콘텐츠 영역 ── */}
      <div style={{ padding: '0 0 4rem' }}>

        {/* 설명 */}
        <div style={{ padding: '1.5rem 1.25rem 0' }}>
          <p style={{
            fontFamily: '"Pretendard Variable", sans-serif',
            fontSize: '0.9rem', color: '#a8a0be',
            lineHeight: 1.85,
          }}>
            {destination.description}
          </p>
        </div>

        {/* 구분선 */}
        <div style={{ margin: '1.5rem 1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ flex: 1, height: '1px', background: '#ffffff0a' }} />
          <span style={{ color: '#d4a853', fontSize: '0.7rem' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: '#ffffff0a' }} />
        </div>

        {/* 이미지 갤러리 */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ padding: '0 1.25rem', fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.7rem', color: '#d4a853', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
            여행지 사진
          </p>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '0 1.25rem 6px', scrollbarWidth: 'none' }}>
            {destination.images.map((img, i) => (
              <img
                key={i} src={img}
                alt={`${destination.title} ${i + 1}`}
                style={{ flexShrink: 0, width: '160px', height: '110px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #ffffff0a', display: 'block' }}
              />
            ))}
          </div>
        </div>

        {/* 추천 스팟 */}
        <div style={{ padding: '0 1.25rem', marginBottom: '2rem' }}>
          <p style={{ fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.7rem', color: '#d4a853', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            추천 스팟
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {destination.spots.map((spot, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', padding: '14px', background: '#0f0e1a', border: '1px solid #ffffff0a', borderRadius: '12px' }}>
                <span style={{
                  flexShrink: 0, width: '28px', height: '28px',
                  background: '#d4a8531f', border: '1px solid #d4a8534d',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: '"Noto Serif KR", serif', fontSize: '0.75rem', color: '#d4a853', fontWeight: 700,
                }}>
                  {i + 1}
                </span>
                <div>
                  <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '0.875rem', color: '#ede9f7', fontWeight: 700, marginBottom: '4px' }}>
                    {spot.name}
                  </p>
                  <p style={{ fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.78rem', color: '#635c78', lineHeight: 1.6 }}>
                    {spot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 태그 */}
        <div style={{ padding: '0 1.25rem', marginBottom: '2rem' }}>
          <p style={{ fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.7rem', color: '#d4a853', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
            이런 분께 추천
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {destination.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.78rem',
                color: '#a8a0be', background: '#0f0e1a',
                border: '1px solid #ffffff0f', borderRadius: '9999px',
                padding: '5px 14px',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 버튼 */}
        <div style={{ padding: '0 1.25rem' }}>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              width: '100%',
              background: 'transparent',
              color: '#a8a0be',
              fontFamily: '"Pretendard Variable", sans-serif',
              fontSize: '0.9rem',
              border: '1px solid #d4a8534d',
              borderRadius: '9999px',
              padding: '0.875rem',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4a853'; e.currentTarget.style.color = '#d4a853' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#d4a8534d'; e.currentTarget.style.color = '#a8a0be' }}
          >
            ← 다른 여행지도 보기
          </button>
        </div>
      </div>
    </div>
  )
}

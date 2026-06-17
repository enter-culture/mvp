'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { getPersonaById, personas } from '@/entities/persona/data/personas'
import { getDestinationsByPersona } from '@/entities/destination/data/destinations'
import { travelCards } from '@/entities/travel-card/data/travel-cards'

function ResultContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const personaId = searchParams.get('persona') ?? 'nopo'
  const persona = getPersonaById(personaId) ?? personas[0]
  const destinations = getDestinationsByPersona(persona.id)

  // 페르소나에 맞는 캐릭터 찾기
  const matchedCard = travelCards.find(c => c.personaId === persona.id)
  const characterBg  = matchedCard?.characterBg  ?? '/assets/wood-bg.png'
  const characterImg = matchedCard?.character     ?? '/assets/wood-warmth.png'

  return (
    <div style={{ background: '#07060e', minHeight: '100dvh', maxWidth: '430px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>

      {/* ── 캐릭터 일러스트 (상단 38%) ── */}
      <div style={{ position: 'relative', height: '38dvh', flexShrink: 0, overflow: 'hidden' }}>
        <img src={characterBg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,6,14,0.3) 0%, rgba(7,6,14,0.95) 100%)' }} />
        <img src={characterImg} alt="" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', height: '100%', objectFit: 'contain', opacity: 0.6 }} />

        {/* 로고 */}
        <div style={{ position: 'absolute', top: '1rem', left: '1.25rem', zIndex: 10 }}>
          <img src="/assets/logo.png" alt="CULTURE" style={{ height: '24px', opacity: 0.8, cursor: 'pointer' }} onClick={() => router.push('/')} />
        </div>

        {/* 페르소나 타입 뱃지 */}
        <div style={{
          position: 'absolute', bottom: '1.25rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(7,6,14,0.7)', border: '1px solid #d4a8534d',
          backdropFilter: 'blur(8px)', borderRadius: '9999px',
          padding: '5px 16px', whiteSpace: 'nowrap',
          fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.75rem',
          color: '#d4a853', letterSpacing: '0.12em',
        }}>
          당신의 여행 페르소나
        </div>
      </div>

      {/* ── 스크롤 콘텐츠 영역 ── */}
      <div style={{ flex: 1, overflowY: 'auto', background: '#07060e' }}>

        {/* 페르소나 제목 섹션 */}
        <div style={{ padding: '1.5rem 1.5rem 0' }}>
          <h1 style={{
            fontFamily: '"Noto Serif KR", serif',
            fontSize: '1.625rem',
            fontWeight: 900,
            color: '#ede9f7',
            lineHeight: 1.3,
            marginBottom: '0.75rem',
            letterSpacing: '-0.01em',
          }}>
            [{persona.title}]
          </h1>
          <p style={{
            fontFamily: '"Noto Serif KR", serif',
            fontSize: '0.9375rem',
            color: '#a8a0be',
            lineHeight: 1.75,
            marginBottom: '1.25rem',
            fontStyle: 'italic',
          }}>
            {persona.subtitle}
          </p>

          {/* 구분선 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: '#ffffff0f' }} />
            <span style={{ color: '#d4a853', fontSize: '0.75rem' }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: '#ffffff0f' }} />
          </div>

          <p style={{
            fontFamily: '"Pretendard Variable", sans-serif',
            fontSize: '0.875rem',
            color: '#635c78',
            lineHeight: 1.85,
            marginBottom: '2rem',
          }}>
            {persona.description}
          </p>
        </div>

        {/* ── 추천 여행지 ── */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ padding: '0 1.5rem', marginBottom: '1rem' }}>
            <p style={{ fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.7rem', color: '#d4a853', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              당신을 위한 여행지
            </p>
          </div>

          {/* 여행지 카드 (세로 스택) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 1.25rem' }}>
            {destinations.map((dest, idx) => (
              <button
                key={dest.id}
                type="button"
                onClick={() => router.push(`/destination/${dest.id}`)}
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  gap: '0',
                  background: '#0f0e1a',
                  border: '1px solid #ffffff0a',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  animation: `slideIn 0.4s cubic-bezier(.16,1,.3,1) ${idx * 80}ms both`,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4a8534d'; e.currentTarget.style.boxShadow = '0 0 20px #d4a85318' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#ffffff0a'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* 썸네일 */}
                <div style={{ width: '100px', flexShrink: 0, position: 'relative' }}>
                  <img
                    src={dest.images[0]}
                    alt={dest.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, #0f0e1a)' }} />
                </div>
                {/* 텍스트 */}
                <div style={{ flex: 1, padding: '14px 14px 14px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px' }}>
                  <span style={{ fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.7rem', color: '#d4a853', letterSpacing: '0.08em' }}>
                    {dest.region}
                  </span>
                  <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '0.875rem', color: '#ede9f7', lineHeight: 1.4, fontWeight: 700 }}>
                    {dest.title}
                  </p>
                  <p style={{ fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.72rem', color: '#635c78', lineHeight: 1.4 }}>
                    {dest.mood}
                  </p>
                  <span style={{ fontSize: '0.7rem', color: '#d4a85380', marginTop: '2px' }}>자세히 보기 →</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── 하단 버튼 ── */}
        <div style={{ padding: '0 1.25rem 3rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            onClick={() => router.push('/')}
            style={{
              width: '100%',
              background: '#d4a853',
              color: '#07060e',
              fontFamily: '"Noto Serif KR", serif',
              fontSize: '1rem',
              fontWeight: 700,
              borderRadius: '9999px',
              padding: '1rem',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              boxShadow: '0 0 28px #d4a85340',
            }}
          >
            다시 테스트하기
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export function ResultPage() {
  return (
    <Suspense fallback={
      <div style={{ background: '#07060e', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #d4a853', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}

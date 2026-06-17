'use client'
import { useRouter } from 'next/navigation'
import { VideoBackground } from '@/shared/ui/VideoBackground'
import { Button } from '@/shared/ui/Button'
import type { Destination } from '@/entities/destination/model/types'

type DestinationPageProps = {
  destination: Destination
}

export function DestinationPage({ destination }: DestinationPageProps) {
  const router = useRouter()

  return (
    <div className="min-h-dvh bg-[#0a0015] text-white">
      {/* Hero video */}
      <div className="relative h-[55dvh] overflow-hidden">
        <VideoBackground
          src={destination.videoUrl}
          fallbackImageUrl={destination.images[0]}
          overlayOpacity={0.4}
        />
        {/* Back button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute top-6 left-6 z-10 text-white/70 font-sans text-sm bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 hover:text-white transition-colors"
        >
          ← 돌아가기
        </button>
        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-8 bg-gradient-to-t from-[#0a0015] to-transparent pt-16">
          <span className="text-xs text-accent font-sans tracking-wider uppercase">
            {destination.region}
          </span>
          <h1 className="font-serif text-2xl text-white mt-2 leading-snug">
            {destination.title}
          </h1>
          <p className="text-white/50 text-xs font-sans mt-2 tracking-wide">
            {destination.mood}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-12 flex flex-col gap-8">
        {/* Description */}
        <p className="text-white/70 font-sans text-sm leading-relaxed">
          {destination.description}
        </p>

        {/* Image gallery */}
        <div>
          <p className="text-xs text-accent font-sans tracking-[0.15em] uppercase mb-4">
            여행지 사진
          </p>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {destination.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${destination.title} ${i + 1}`}
                className="flex-shrink-0 w-48 h-32 object-cover rounded-xl"
              />
            ))}
          </div>
        </div>

        {/* Spots */}
        <div>
          <p className="text-xs text-accent font-sans tracking-[0.15em] uppercase mb-4">
            추천 스팟
          </p>
          <div className="flex flex-col gap-4">
            {destination.spots.map((spot, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-accent font-sans text-sm font-medium mt-0.5 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-white font-sans text-sm font-medium">{spot.name}</p>
                  <p className="text-white/50 font-sans text-xs leading-relaxed mt-1">
                    {spot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <p className="text-xs text-accent font-sans tracking-[0.15em] uppercase mb-4">
            이런 분께 추천
          </p>
          <div className="flex flex-wrap gap-2">
            {destination.tags.map(tag => (
              <span
                key={tag}
                className="text-xs font-sans text-white/70 border border-white/20 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Button variant="ghost" onClick={() => router.back()} className="w-full">
          ← 다른 여행지도 보기
        </Button>
      </div>
    </div>
  )
}

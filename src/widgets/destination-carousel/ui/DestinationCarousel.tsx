'use client'
import { useRouter } from 'next/navigation'
import { Card } from '@/shared/ui/Card'
import type { Destination } from '@/entities/destination/model/types'

type DestinationCarouselProps = {
  destinations: Destination[]
}

export function DestinationCarousel({ destinations }: DestinationCarouselProps) {
  const router = useRouter()
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide px-6 pb-2">
      {destinations.map(dest => (
        <button
          key={dest.id}
          type="button"
          onClick={() => router.push(`/destination/${dest.id}`)}
          className="flex-shrink-0 text-left focus:outline-none"
        >
          <Card
            imageUrl={dest.images[0]}
            imageAlt={dest.title}
            badge={dest.region}
            title={dest.title}
          />
        </button>
      ))}
    </div>
  )
}

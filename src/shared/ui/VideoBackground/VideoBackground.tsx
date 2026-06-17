import { cn } from '@/shared/lib/cn'

type VideoBackgroundProps = {
  src: string
  fallbackImageUrl?: string
  overlay?: boolean
  overlayOpacity?: number
  className?: string
}

export function VideoBackground({
  src,
  fallbackImageUrl,
  overlay = true,
  overlayOpacity = 0.55,
  className,
}: VideoBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={fallbackImageUrl}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      {overlay && (
        <div
          className="absolute inset-0"
          style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
        />
      )}
    </div>
  )
}

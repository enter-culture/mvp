import { cn } from '@/shared/lib/cn'

type CardProps = {
  imageUrl: string
  imageAlt: string
  badge: string
  title: string
  className?: string
}

export function Card({ imageUrl, imageAlt, badge, title, className }: CardProps) {
  return (
    <div
      className={cn(
        'relative flex-shrink-0 w-60 h-80 rounded-2xl overflow-hidden group',
        className,
      )}
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-xs text-accent font-sans font-medium bg-accent/10 border border-accent/30 rounded-full px-2 py-0.5">
          {badge}
        </span>
        <p className="mt-2 text-white text-sm font-sans font-medium leading-snug">
          {title}
        </p>
      </div>
    </div>
  )
}

'use client'
import { cn } from '@/shared/lib/cn'
import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'floating'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  glow?: boolean
}

export function Button({
  variant = 'primary',
  glow = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'rounded-full font-sans font-medium transition-all duration-300 cursor-pointer',
        variant === 'primary' && 'bg-accent text-[#07060e] px-8 py-4 text-base font-serif font-bold tracking-wide',
        variant === 'ghost' &&
          'border border-[#d4a8534d] text-accent-light px-8 py-4 text-base hover:bg-[#d4a8531f] font-serif',
        variant === 'floating' && 'bg-accent text-[#07060e] px-10 py-4 text-base w-full font-serif font-bold tracking-wide shadow-[0_0_30px_#d4a85340]',
        glow && 'glow-pulse',
        disabled && 'opacity-40 cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

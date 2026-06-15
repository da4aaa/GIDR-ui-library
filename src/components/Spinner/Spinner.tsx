import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl'
export type SpinnerTone = 'brand' | 'muted' | 'foreground' | 'inverse'

/** Diameter + ring thickness per size. Thickness is the spinner stroke, not a spacing token. */
const SIZES: Record<SpinnerSize, { box: string; thickness: number }> = {
  sm: { box: 'size-4', thickness: 2 },
  md: { box: 'size-6', thickness: 2.5 },
  lg: { box: 'size-9', thickness: 3 },
  xl: { box: 'size-12', thickness: 4 },
}

/** Maps tone → the semantic CSS variable that colors the arc. */
const TONE_VAR: Record<SpinnerTone, string> = {
  brand: 'var(--color-brand)',
  muted: 'var(--color-muted)',
  foreground: 'var(--color-foreground)',
  inverse: 'var(--color-brand-foreground)',
}

const labelVariants = cva('font-sans text-center', {
  variants: {
    size: {
      sm: 'text-[12px] leading-[16px]',
      md: 'text-[12px] leading-[16px]',
      lg: 'text-[13px] leading-[18px]',
      xl: 'text-[14px] leading-[18px]',
    },
    tone: {
      brand: 'text-muted',
      muted: 'text-muted',
      foreground: 'text-foreground',
      inverse: 'text-brand-foreground',
    },
  },
  defaultVariants: { size: 'md', tone: 'brand' },
})

export interface SpinnerProps
  extends Omit<VariantProps<typeof labelVariants>, 'size' | 'tone'> {
  /** Diameter of the ring. Default 'md'. */
  size?: SpinnerSize
  /** Arc color. Default 'brand'. */
  tone?: SpinnerTone
  /** Optional text shown under the spinner (e.g. "Loading GIDRs…"). */
  label?: string
  /**
   * Covers its nearest positioned ancestor (or the viewport) with a blurred
   * scrim and centers the spinner. Use for full-page / full-section loads.
   */
  fullScreen?: boolean
  className?: string
}

/**
 * Spinner — the single loading indicator for any page or section.
 * A conic-gradient ring with a fading tail; pairs with an optional label and
 * an optional full-screen scrim for page-level loads.
 */
export function Spinner({
  size = 'md',
  tone = 'brand',
  label,
  fullScreen = false,
  className,
}: SpinnerProps) {
  const { box, thickness } = SIZES[size]

  const ring = (
    <span
      role="status"
      aria-live="polite"
      aria-label={label ?? 'Loading'}
      className={cn('inline-block animate-spin rounded-full', box)}
      style={{
        background: `conic-gradient(from 90deg, transparent 0%, ${TONE_VAR[tone]} 320deg, ${TONE_VAR[tone]} 360deg)`,
        WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${thickness}px), #000 calc(100% - ${thickness}px))`,
        mask: `radial-gradient(farthest-side, transparent calc(100% - ${thickness}px), #000 calc(100% - ${thickness}px))`,
        animationDuration: '0.7s',
      }}
    />
  )

  const content = label ? (
    <div className="flex flex-col items-center gap-component-md">
      {ring}
      <span className={labelVariants({ size, tone })}>{label}</span>
    </div>
  ) : (
    ring
  )

  if (fullScreen) {
    return (
      <div
        className={cn(
          'absolute inset-0 z-50 flex items-center justify-center',
          'bg-surface-page/70 backdrop-blur-sm',
          className,
        )}
      >
        {content}
      </div>
    )
  }

  return label ? (
    <div className={cn('inline-flex', className)}>{content}</div>
  ) : (
    <span className={cn('inline-flex', className)}>{ring}</span>
  )
}

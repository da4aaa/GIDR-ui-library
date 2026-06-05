import { cva, type VariantProps } from 'class-variance-authority'
import { X, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/Avatar'

export type BadgeColor = 'brand' | 'success' | 'slate' | 'info' | 'indigo' | 'purple' | 'blue' | 'warning' | 'error' | 'neutral'
export type BadgeSize  = 'sm' | 'md' | 'lg'

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-sans font-semibold whitespace-nowrap select-none',
  {
    variants: {
      color: {
        brand:   'bg-badge-brand-bg   text-badge-brand-fg',
        success: 'bg-badge-success-bg text-badge-success-fg',
        slate:   'bg-badge-slate-bg   text-badge-slate-fg',
        info:    'bg-badge-info-bg    text-badge-info-fg',
        indigo:  'bg-badge-indigo-bg  text-badge-indigo-fg',
        purple:  'bg-badge-purple-bg  text-badge-purple-fg',
        blue:    'bg-badge-blue-bg    text-badge-blue-fg',
        warning: 'bg-badge-warning-bg text-badge-warning-fg',
        error:   'bg-badge-error-bg   text-badge-error-fg',
        neutral: 'bg-badge-neutral-bg text-badge-neutral-fg',
      },
      size: {
        sm: 'text-[12px] leading-[16px]',
        md: 'text-[13px] leading-[18px]',
        lg: 'text-[14px] leading-[20px]',
      },
    },
    defaultVariants: { color: 'neutral', size: 'sm' },
  }
)

// Padding: changes when icon-only (no label)
const paddingWithLabel: Record<BadgeSize, string> = {
  sm: 'px-2    py-0.5  gap-1',
  md: 'px-2.5  py-0.5  gap-1',
  lg: 'px-3    py-1    gap-1.5',
}
const paddingIconOnly: Record<BadgeSize, string> = {
  sm: 'p-1   gap-0',
  md: 'p-1.5 gap-0',
  lg: 'p-2   gap-0',
}

// Figma: icons/dot are fixed sizes regardless of badge size
const ICON_SIZE = 12       // all icon variants
const DOT_SIZE  = 'size-2' // 8px dot

export interface BadgeProps extends Omit<VariantProps<typeof badgeVariants>, 'color' | 'size'> {
  label?:          string
  color?:          BadgeColor
  size?:           BadgeSize
  /** Colored dot indicator before the label */
  dot?:            boolean
  /** Shows the Avatar component (xxsmall) before the label */
  avatar?:         boolean
  avatarSrc?:      string
  avatarInitials?: string
  avatarColor?:    '1' | '2' | '3' | '4' | '5'
  /** Custom icon rendered before the label */
  iconLeft?:       LucideIcon
  /** Custom icon rendered after the label */
  iconRight?:      LucideIcon
  /** Renders a × dismiss button after the label (overrides iconRight) */
  onRemove?:       () => void
  className?:      string
}

export function Badge({
  label,
  color = 'neutral',
  size  = 'sm',
  dot,
  avatar,
  avatarSrc,
  avatarInitials,
  avatarColor = '2',
  iconLeft:  IconLeft,
  iconRight: IconRight,
  onRemove,
  className,
}: BadgeProps) {
  const s        = size  ?? 'sm'
  const c        = color ?? 'neutral'
  const hasLabel = Boolean(label)
  const iconOnly = !hasLabel

  return (
    <span
      className={cn(
        badgeVariants({ color: c, size: s }),
        iconOnly ? paddingIconOnly[s] : paddingWithLabel[s],
        className,
      )}
    >
      {/* Dot */}
      {dot && !avatar && !IconLeft && (
        <span
          aria-hidden
          className={cn('rounded-full bg-current shrink-0', DOT_SIZE)}
        />
      )}

      {/* Avatar — uses real Avatar component at xxsmall */}
      {avatar && !IconLeft && (
        <Avatar
          size="xxsmall"
          type={avatarSrc ? 'image' : avatarInitials ? 'letter' : 'empty'}
          src={avatarSrc}
          initials={avatarInitials}
          color={avatarColor}
          className="shrink-0"
        />
      )}

      {/* Icon left */}
      {IconLeft && (
        <IconLeft size={ICON_SIZE} strokeWidth={1.5} className="shrink-0" aria-hidden />
      )}

      {/* Label */}
      {hasLabel && label}

      {/* Dismiss button — overrides iconRight */}
      {onRemove ? (
        <button
          type="button"
          onClick={e => { e.stopPropagation(); onRemove(); }}
          aria-label="Remove"
          className={cn(
            'shrink-0 -mr-0.5 rounded-full cursor-pointer',
            'hover:opacity-70 active:opacity-50',
            'transition-opacity duration-100',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current',
          )}
        >
          <X size={ICON_SIZE} strokeWidth={2} />
        </button>
      ) : IconRight ? (
        <IconRight size={ICON_SIZE} strokeWidth={1.5} className="shrink-0" aria-hidden />
      ) : null}
    </span>
  )
}

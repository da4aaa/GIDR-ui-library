// src/components/Avatar/Avatar.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { User, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const sizeClass: Record<string, string> = {
  xxsmall: 'size-6',
  xsmall:  'size-8',
  small:   'size-12',
  medium:  'size-[72px]',
  large:   'size-24',
  xlarge:  'size-40',
}

const colorClass: Record<string, string> = {
  '1': 'bg-avatar-1',
  '2': 'bg-avatar-2',
  '3': 'bg-avatar-3',
  '4': 'bg-avatar-4',
  '5': 'bg-avatar-5',
}

const iconSize: Record<string, number> = {
  xxsmall: 12, xsmall: 16, small: 24, medium: 32, large: 40, xlarge: 64,
}

const textSize: Record<string, string> = {
  xxsmall: 'text-[9px]',
  xsmall:  'text-[11px]',
  small:   'text-[16px]',
  medium:  'text-[24px]',
  large:   'text-[32px]',
  xlarge:  'text-[52px]',
}

// Badge sizing: container size, icon size, ring width, offset from corner
const badgeConfig: Record<string, { cls: string; icon: number; ring: string; offset: string }> = {
  xxsmall: { cls: 'size-[14px]', icon: 7,  ring: 'ring-[1.5px]', offset: '-bottom-0.5 -right-0.5' },
  xsmall:  { cls: 'size-4',      icon: 8,  ring: 'ring-2',       offset: '-bottom-0.5 -right-0.5' },
  small:   { cls: 'size-5',      icon: 10, ring: 'ring-2',       offset: '-bottom-0.5 -right-0.5' },
  medium:  { cls: 'size-6',      icon: 12, ring: 'ring-2',       offset: '-bottom-0.5 -right-0.5' },
  large:   { cls: 'size-7',      icon: 14, ring: 'ring-2',       offset: '-bottom-1 -right-1'     },
  xlarge:  { cls: 'size-9',      icon: 18, ring: 'ring-[3px]',   offset: '-bottom-1 -right-1'     },
}

// Keep cva for consumers who import the variant type
const avatarVariants = cva(
  'relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xxsmall: 'size-6',
        xsmall:  'size-8',
        small:   'size-12',
        medium:  'size-[72px]',
        large:   'size-24',
        xlarge:  'size-40',
      },
      color: {
        '1': 'bg-avatar-1',
        '2': 'bg-avatar-2',
        '3': 'bg-avatar-3',
        '4': 'bg-avatar-4',
        '5': 'bg-avatar-5',
      },
    },
    defaultVariants: { size: 'small', color: '2' },
  }
)

type AvatarSize  = NonNullable<VariantProps<typeof avatarVariants>['size']>
type AvatarColor = NonNullable<VariantProps<typeof avatarVariants>['color']>
type AvatarType  = 'image' | 'letter' | 'empty'

interface AvatarProps {
  type?:         AvatarType
  size?:         AvatarSize
  color?:        AvatarColor
  src?:          string
  initials?:     string
  alt?:          string
  overlayIcon?:  LucideIcon
  onOverlayClick?: () => void
  overlayLabel?: string
  className?:    string
}

export function Avatar({
  type = 'empty',
  src,
  initials,
  alt,
  size = 'small',
  color = '2',
  overlayIcon: OverlayIcon,
  onOverlayClick,
  overlayLabel = 'Edit',
  className,
}: AvatarProps) {
  const s = size ?? 'small'
  const c = color ?? '2'
  const badge = badgeConfig[s]

  // When there's an overlay we need the outer wrapper to NOT clip,
  // so the badge can peek outside the circle.
  if (OverlayIcon) {
    return (
      <div className={cn('relative inline-flex shrink-0', sizeClass[s], className)}>
        {/* Avatar circle — overflow-hidden lives here */}
        <div
          className={cn(
            'size-full rounded-full overflow-hidden flex items-center justify-center',
            colorClass[c]
          )}
        >
          <AvatarContent type={type} src={src} initials={initials} alt={alt} s={s} />
        </div>

        {/* Overlay badge */}
        <button
          type="button"
          aria-label={overlayLabel}
          onClick={onOverlayClick}
          className={cn(
            'absolute flex items-center justify-center rounded-full',
            'bg-accent-1-800 text-white',
            badge.cls,
            badge.ring,
            'ring-white',
            badge.offset,
            // hover — darken + lift
            'hover:bg-accent-1-700 hover:scale-110',
            // active / touch press — scale down for tactile feedback
            'active:scale-90 active:bg-accent-1-900',
            'transition-all duration-150 ease-out',
            'cursor-pointer',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1-800 focus-visible:ring-offset-1',
          )}
        >
          <OverlayIcon size={badge.icon} strokeWidth={2} />
        </button>
      </div>
    )
  }

  // Original layout — no structural change for existing consumers
  return (
    <div className={cn(avatarVariants({ size: s, color: c }), className)}>
      <AvatarContent type={type} src={src} initials={initials} alt={alt} s={s} />
    </div>
  )
}

function AvatarContent({
  type, src, initials, alt, s,
}: { type: AvatarType; src?: string; initials?: string; alt?: string; s: string }) {
  if (type === 'image' && src)
    return <img src={src} alt={alt ?? ''} className="size-full object-cover" />
  if (type === 'letter')
    return (
      <span className={cn('font-sans font-semibold text-white leading-none', textSize[s])}>
        {initials?.slice(0, 2).toUpperCase()}
      </span>
    )
  return <User size={iconSize[s]} className="text-white" strokeWidth={1.5} />
}

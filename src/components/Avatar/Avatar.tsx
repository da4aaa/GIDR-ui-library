// src/components/Avatar/Avatar.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { User } from 'lucide-react'
import { cn } from '@/lib/utils'

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

const iconSize: Record<NonNullable<VariantProps<typeof avatarVariants>['size']>, number> = {
  xxsmall: 12, xsmall: 16, small: 24, medium: 32, large: 40, xlarge: 64,
}

const textSize: Record<NonNullable<VariantProps<typeof avatarVariants>['size']>, string> = {
  xxsmall: 'text-[9px]',
  xsmall:  'text-[11px]',
  small:   'text-[16px]',
  medium:  'text-[24px]',
  large:   'text-[32px]',
  xlarge:  'text-[52px]',
}

type AvatarType = 'image' | 'letter' | 'empty'

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  type?: AvatarType
  src?: string
  initials?: string
  alt?: string
  className?: string
}

export function Avatar({ type = 'empty', src, initials, alt, size = 'small', color = '2', className }: AvatarProps) {
  return (
    <div className={cn(avatarVariants({ size, color }), className)}>
      {type === 'image' && src && (
        <img src={src} alt={alt ?? ''} className="size-full object-cover" />
      )}
      {type === 'letter' && (
        <span className={cn('font-sans font-semibold text-white leading-none', textSize[size ?? 'small'])}>
          {initials?.slice(0, 2).toUpperCase()}
        </span>
      )}
      {type === 'empty' && (
        <User size={iconSize[size ?? 'small']} className="text-white" strokeWidth={1.5} />
      )}
    </div>
  )
}

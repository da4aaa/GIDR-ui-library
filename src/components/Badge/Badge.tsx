import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-body font-medium whitespace-nowrap',
  {
    variants: {
      color: {
        neutral: 'bg-neutral-300 text-neutral-800',
        green:   'bg-service-success-300 text-neutral-900',
        blue:    'bg-accent-2-200 text-neutral-900',
        purple:  'bg-accent-3-200 text-accent-3-900',
        error:   'bg-service-error-300 text-neutral-900',
      },
      size: {
        sm: 'px-[7px] py-[2px] text-[11px] leading-[14px]',
        md: 'px-[9px] py-[3px] text-[12px] leading-[16px]',
      },
    },
    defaultVariants: { color: 'neutral', size: 'sm' },
  }
)

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  label: string
  icon?: LucideIcon
  className?: string
}

export function Badge({ label, icon: Icon, color = 'neutral', size = 'sm', className }: BadgeProps) {
  const iconSize = size === 'sm' ? 10 : 12
  return (
    <span className={cn(badgeVariants({ color, size }), className)}>
      {Icon && <Icon size={iconSize} strokeWidth={1.5} />}
      {label}
    </span>
  )
}

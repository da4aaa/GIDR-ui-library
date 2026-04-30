import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

const tagVariants = cva(
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
        sm: 'pl-[7px] pr-[5px] py-[2px] text-[11px] leading-[14px]',
        md: 'pl-[9px] pr-[7px] py-[3px] text-[12px] leading-[16px]',
      },
    },
    defaultVariants: { color: 'neutral', size: 'sm' },
  }
)

interface TagProps extends VariantProps<typeof tagVariants> {
  label: string
  icon?: LucideIcon
  onRemove?: () => void
  className?: string
}

export function Tag({ label, icon: Icon, onRemove, color = 'neutral', size = 'sm', className }: TagProps) {
  const iconSize = size === 'sm' ? 10 : 12
  return (
    <span className={cn(tagVariants({ color, size }), className)}>
      {Icon && <Icon size={iconSize} strokeWidth={1.5} />}
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center justify-center rounded-full hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
          aria-label={`Remove ${label}`}
        >
          <X size={iconSize} strokeWidth={1.5} />
        </button>
      )}
    </span>
  )
}

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

const chipVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border-[1.5px] font-body font-medium text-[13px] leading-[18px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1-800 whitespace-nowrap cursor-pointer px-3 py-1.5',
  {
    variants: {
      state: {
        default:  'border-accent-1-900 text-accent-1-900 bg-transparent hover:bg-accent-1-100',
        selected: 'border-accent-1-900 text-accent-1-900 bg-accent-1-300',
        disabled: 'border-neutral-300 text-neutral-600 bg-transparent opacity-45 pointer-events-none',
      },
    },
    defaultVariants: { state: 'default' },
  }
)

interface QuickReplyChipProps extends VariantProps<typeof chipVariants> {
  label: string
  icon?: LucideIcon
  onClick?: () => void
  className?: string
}

export function QuickReplyChip({ label, icon: Icon, state = 'default', onClick, className }: QuickReplyChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={state === 'disabled'}
      className={cn(chipVariants({ state }), className)}
    >
      {Icon && <Icon size={14} strokeWidth={1.5} />}
      {label}
    </button>
  )
}

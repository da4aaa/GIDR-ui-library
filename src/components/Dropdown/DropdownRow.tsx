import { cva, type VariantProps } from 'class-variance-authority'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/Avatar'
import type { LucideIcon } from 'lucide-react'

const rowVariants = cva(
  'flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors text-[14px] leading-[18px] font-body font-normal select-none',
  {
    variants: {
      state: {
        default:  'text-neutral-900 hover:bg-neutral-100',
        hover:    'bg-neutral-100 text-neutral-900',
        selected: 'bg-accent-1-300 text-neutral-900',
        disabled: 'text-neutral-600 opacity-50 pointer-events-none',
      },
    },
    defaultVariants: { state: 'default' },
  }
)

interface DropdownRowProps extends VariantProps<typeof rowVariants> {
  label: string
  type?: 'default' | 'with-avatar' | 'with-icon' | 'with-checkbox'
  icon?: LucideIcon
  avatarSrc?: string
  avatarInitials?: string
  checked?: boolean
  className?: string
  onClick?: () => void
}

export function DropdownRow({ label, type = 'default', icon: Icon, avatarSrc, avatarInitials, state = 'default', className, onClick }: DropdownRowProps) {
  const isSelected = state === 'selected'

  return (
    <div role="option" aria-selected={isSelected} className={cn(rowVariants({ state }), className)} onClick={onClick}>
      {type === 'with-avatar' && (
        <Avatar
          type={avatarSrc ? 'image' : 'letter'}
          src={avatarSrc}
          initials={avatarInitials}
          size="xxsmall"
          color="2"
        />
      )}
      {type === 'with-icon' && Icon && <Icon size={16} strokeWidth={1.5} className="shrink-0 text-neutral-600" />}
      {type === 'with-checkbox' && (
        <div className={cn('size-4 rounded border flex items-center justify-center shrink-0', isSelected ? 'bg-accent-1-800 border-accent-1-800' : 'border-neutral-500')}>
          {isSelected && <Check size={10} strokeWidth={2.5} className="text-white" />}
        </div>
      )}

      <span className="flex-1 min-w-0 truncate">{label}</span>

      {isSelected && type !== 'with-checkbox' && (
        <Check size={16} strokeWidth={2} className="shrink-0 text-accent-1-800" />
      )}
    </div>
  )
}

import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/Avatar'

interface SelectProps {
  placeholder?: string
  value?: string
  isOpen?: boolean
  disabled?: boolean
  hasAvatar?: boolean
  avatarInitials?: string
  className?: string
  onClick?: () => void
}

export function Select({
  placeholder = 'Select...',
  value,
  isOpen = false,
  disabled = false,
  hasAvatar = false,
  avatarInitials,
  className,
  onClick,
}: SelectProps) {
  const hasValue = !!value

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      className={cn(
        'inline-flex items-center gap-2 h-[38px] px-3 w-full rounded-md border font-body text-[14px] transition-colors bg-white',
        isOpen
          ? 'border-accent-1-800 ring-2 ring-accent-1-300'
          : 'border-neutral-500 hover:border-neutral-700',
        disabled && 'opacity-50 cursor-not-allowed border-neutral-300 bg-neutral-100',
        className
      )}
    >
      {hasAvatar && (
        <Avatar
          type={hasValue ? 'letter' : 'empty'}
          initials={avatarInitials ?? value?.slice(0, 2)}
          size="xxsmall"
          color="2"
        />
      )}
      <span className={cn('flex-1 text-left truncate', hasValue ? 'text-neutral-900' : 'text-neutral-500')}>
        {value ?? placeholder}
      </span>
      <ChevronDown
        size={16}
        strokeWidth={1.5}
        className={cn('shrink-0 text-neutral-500 transition-transform', isOpen && 'rotate-180')}
      />
    </button>
  )
}

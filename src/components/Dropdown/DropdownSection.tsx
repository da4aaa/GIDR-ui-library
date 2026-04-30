import { cn } from '@/lib/utils'

interface DropdownSectionProps {
  label: string
  className?: string
}

export function DropdownSection({ label, className }: DropdownSectionProps) {
  return (
    <div className={cn('px-2 py-1.5 text-[12px] font-body font-semibold text-neutral-600 leading-[16px]', className)}>
      {label}
    </div>
  )
}

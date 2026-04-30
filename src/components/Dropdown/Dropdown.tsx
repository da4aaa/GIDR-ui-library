import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DropdownProps {
  hasSearch?: boolean
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

export function Dropdown({ hasSearch = false, searchPlaceholder = 'Search...', searchValue, onSearchChange, children, className }: DropdownProps) {
  return (
    <div className={cn('bg-white border border-neutral-300 rounded-xl shadow-elevation-2 py-3 px-1 flex flex-col w-[260px]', className)}>
      {hasSearch && (
        <>
          <div className="px-1.5 pb-3">
            <div className="flex items-center gap-2 border border-neutral-500 rounded-sm px-3 py-1.5 text-[14px] text-neutral-700">
              <input
                type="text"
                value={searchValue}
                onChange={e => onSearchChange?.(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="flex-1 outline-none text-[14px] font-body placeholder:text-neutral-500 bg-transparent"
              />
              <Search size={16} className="text-neutral-500 shrink-0" strokeWidth={1.5} />
            </div>
          </div>
          <div className="h-px bg-neutral-300 mb-2" />
        </>
      )}
      <div role="listbox" className="flex flex-col gap-0.5 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

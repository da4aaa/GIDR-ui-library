import { cn } from '@/lib/utils'

interface TabItem {
  label: string
  value: string
  disabled?: boolean
}

interface TabsProps {
  tabs: TabItem[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function Tabs({ tabs, value, onChange, className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn('inline-flex items-center gap-1 p-1 bg-neutral-200 rounded-lg', className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.value)}
            className={cn(
              'px-3 py-1.5 rounded-md font-sans font-semibold text-[13px] leading-[18px] transition-colors whitespace-nowrap',
              isActive
                ? 'bg-white text-neutral-900 shadow-elevation-1'
                : 'text-neutral-600 hover:text-neutral-900',
              tab.disabled && 'opacity-40 pointer-events-none'
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

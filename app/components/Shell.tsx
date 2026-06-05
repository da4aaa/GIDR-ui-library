import { ChevronLeft } from 'lucide-react'

interface ShellProps {
  children: React.ReactNode
  title?: string
  onBack?: () => void
  bg?: string
}

export function Shell({ children, title, onBack, bg = 'bg-bg-page-light' }: ShellProps) {
  return (
    <div className="h-screen bg-neutral-200 flex items-center justify-center">
      <div className="w-[375px] h-[calc(100vh-2rem)] max-h-[812px] bg-bg-page-light rounded-[44px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.25)] flex flex-col relative border border-neutral-300">
        {/* status bar */}
        <div className="flex justify-between items-center px-6 pt-3 pb-1 shrink-0">
          <span className="text-[12px] font-body font-semibold text-neutral-900">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2.5 border border-neutral-900 rounded-[2px] relative">
              <div className="absolute inset-[1px] left-[1px] right-[3px] bg-neutral-900 rounded-[1px]" />
              <div className="absolute right-[-3px] top-[3px] w-[2px] h-[4px] bg-neutral-900 rounded-r-[1px]" />
            </div>
          </div>
        </div>

        {/* nav bar */}
        {(onBack || title) && (
          <div className="flex items-center px-4 py-2 shrink-0 gap-2">
            {onBack && (
              <button onClick={onBack} className="p-1 -ml-1 rounded-lg active:bg-neutral-200">
                <ChevronLeft size={22} className="text-neutral-900" />
              </button>
            )}
            {title && <span className="font-sans font-bold text-[17px] text-neutral-900">{title}</span>}
          </div>
        )}

        {/* content */}
        <div className={`flex-1 flex flex-col overflow-y-auto ${bg}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

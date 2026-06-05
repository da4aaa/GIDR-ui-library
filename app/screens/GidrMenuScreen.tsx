import { MoreVertical, ChevronDown, FolderPlus } from 'lucide-react'
import { HeaderLogo } from '../components/HeaderLogo'

const SESSIONS = [
  { title: 'ProcedureName', date: 'Yesterday' },
  { title: 'ProcedureName', date: 'Apr 12, 2026' },
  { title: 'ProcedureName', date: 'Aug 7, 2026' },
]

interface GidrMenuScreenProps {
  onClose: () => void
}

export function GidrMenuScreen({ onClose: _ }: GidrMenuScreenProps) {
  return (
    <div className="absolute inset-y-0 left-0 w-[300px] bg-surface-sunken flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="px-5 pt-3 pb-1.5 shrink-0">
        <HeaderLogo />
      </div>

      {/* GIDR selector */}
      <div className="px-5 mt-[22px] shrink-0">
        <button className="w-full flex items-center h-[38px] bg-white border border-white rounded-xl shadow-[0px_2px_2px_rgba(0,0,0,0.10)] px-4 gap-[6px]">
          <span className="flex-1 font-sans text-[14px] leading-[18px] text-foreground text-left">GIDRName</span>
          <ChevronDown size={18} strokeWidth={1.5} className="text-foreground shrink-0" />
        </button>
      </div>

      {/* Scrollable session list */}
      <div className="flex-1 relative overflow-hidden mt-6">
        <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-5">
          <div className="flex flex-col gap-[12px]">
            {SESSIONS.flatMap((s, i) => [
              <div key={`item-${i}`} className="flex items-center justify-between">
                <div className="flex flex-col gap-[3px]">
                  <p className="font-sans font-semibold text-[14px] leading-[20px] text-foreground">{s.title}</p>
                  <p className="font-sans text-[12.8px] text-muted">{s.date}</p>
                </div>
                <button className="w-[18px] h-[18px] flex items-center justify-center text-muted shrink-0">
                  <MoreVertical size={14} strokeWidth={1.5} />
                </button>
              </div>,
              ...(i < SESSIONS.length - 1 ? [<div key={`div-${i}`} className="h-px bg-[#c9d0d9]" />] : []),
            ])}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-[48px] bg-gradient-to-t from-[#e4ebec] to-transparent pointer-events-none z-10" />
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 pt-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 h-[38px] bg-white border border-white rounded-xl shadow-[0px_2px_2px_rgba(0,0,0,0.10)] px-4">
          <div className="w-6 h-6 rounded-full bg-[#7048c6] flex items-center justify-center shrink-0">
            <span className="font-sans font-bold text-[10px] text-white leading-none">A</span>
          </div>
          <span className="font-sans text-[14px] leading-[18px] text-foreground whitespace-nowrap">Alex Tarasevich</span>
        </div>
        <button className="w-[38px] h-[38px] rounded-full bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.10)] flex items-center justify-center shrink-0">
          <FolderPlus size={18} strokeWidth={1.5} className="text-brand" />
        </button>
      </div>
    </div>
  )
}

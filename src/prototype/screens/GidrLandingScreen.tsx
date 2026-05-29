import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { GuidedProcedureCardNew } from '@/components/Cards/GuidedProcedureCardNew'
import { GidrMenuScreen } from './GidrMenuScreen'

const easeOut = [0.16, 1, 0.3, 1] as const

const PROCEDURES = [
  {
    illustrationType: 'Network' as const,
    title: 'Moving parts and machinery guided procedures',
    description: 'Verify protective equipment before starting field work',
    badges: [{ label: 'Mandatory', color: 'blue' as const }],
    stepCount: 12,
    estimatedMinutes: 15,
  },
  {
    illustrationType: 'Safety' as const,
    title: 'Safe Operation of Machinery and Moving Parts',
    description: 'Verify protective equipment before starting field work',
    badges: [{ label: 'Mandatory', color: 'blue' as const }],
    stepCount: 12,
  },
  {
    illustrationType: 'Network' as const,
    title: 'Moving parts and machinery guided procedures',
    description: 'Verify protective equipment before starting field work',
    badges: [{ label: 'Mandatory', color: 'blue' as const }],
    stepCount: 12,
    estimatedMinutes: 15,
  },
]

export function GidrLandingScreen() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="absolute inset-0 z-10 bg-surface-sunken">
      {/* Menu panel: static, revealed by content sliding right */}
      {showMenu && <GidrMenuScreen onClose={() => setShowMenu(false)} />}

      {/* Landing content: initial push from right + slides right when menu opens */}
      <motion.div
        className="absolute inset-0 bg-surface-sunken flex flex-col overflow-hidden shadow-[-12px_0_24px_rgba(0,0,0,0.18)]"
        initial={{ x: '100%' }}
        animate={{ x: showMenu ? 300 : 0, opacity: showMenu ? 0.5 : 1 }}
        transition={{ duration: 0.4, ease: easeOut }}
        onClick={showMenu ? () => setShowMenu(false) : undefined}
      >
        {/* Header */}
        <div className="flex items-center px-5 pt-3 pb-1.5 shrink-0">
          <button
            className="w-[42px] h-[42px] rounded-full bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.10)] flex items-center justify-center shrink-0"
            onClick={() => setShowMenu(v => !v)}
          >
            <Menu size={18} className="text-neutral-900" />
          </button>
          <div className="flex-1 flex justify-center">
            <span className="font-sans font-bold text-[13px] tracking-widest text-neutral-400 uppercase">Company-Logo</span>
          </div>
          <div className="w-[42px] shrink-0" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-hidden relative">
          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex flex-col gap-6 px-5 pt-3 pb-20">
              <div className="flex flex-col gap-3">
                <p className="font-sans font-bold text-[18px] leading-[24px] text-foreground">
                  Alex, these are your guided procedures
                </p>
                <p className="font-body text-[14px] leading-[18px] text-foreground opacity-80">
                  You have 1 mandatory procedure to take and several optional that may help you troubleshoot your work task.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {PROCEDURES.map((item, i) => (
                  <GuidedProcedureCardNew key={i} {...item} />
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-[77px] bg-gradient-to-t from-[#e4ebec] to-transparent pointer-events-none z-10" />
        </div>
      </motion.div>
    </div>
  )
}

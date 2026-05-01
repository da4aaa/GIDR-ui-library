import { Search } from 'lucide-react'
import { Shell } from '../components/Shell'
import { GidrCard } from '@/components/Cards/GidrCard'
import { Badge } from '@/components/Badge/Badge'

interface Props { onSelect: () => void }

const GIDRS = [
  { category: 'Copier / Printer', title: 'Apollo Office Systems', description: 'AI assistant for Konica Minolta, Canon & Ricoh field service', procedureCount: 12, lastAccessed: '2h ago' },
  { category: 'HVAC', title: 'HVAC Maintenance Suite', description: 'Step-by-step procedures for inspecting and servicing AHUs', procedureCount: 8, lastAccessed: '2 days ago' },
  { category: 'Networking', title: 'Network Infrastructure', description: 'Structured cabling, switches, and wireless access points', procedureCount: 6, lastAccessed: '1 week ago' },
]

export function GidrSelect({ onSelect }: Props) {
  return (
    <Shell bg="bg-bg-page-light">
      <div className="flex flex-col gap-4 px-5 pt-4 pb-8">
        {/* greeting */}
        <div className="flex flex-col gap-1 pt-2">
          <span className="font-sans font-bold text-[22px] text-neutral-900">Good morning, Ricardo</span>
          <span className="font-body text-[14px] text-neutral-700">Which GIDR are you working with today?</span>
        </div>

        {/* search */}
        <div className="flex items-center gap-2 bg-white border border-neutral-300 rounded-lg px-3 py-2.5">
          <Search size={16} className="text-neutral-500 shrink-0" />
          <span className="font-body text-[14px] text-neutral-500">Search GIDRs...</span>
        </div>

        {/* section label */}
        <div className="flex items-center justify-between">
          <span className="font-sans font-bold text-[13px] text-neutral-700 uppercase tracking-wide">Recent</span>
          <Badge label="3 active" color="green" size="sm" />
        </div>

        {/* cards */}
        <div className="flex flex-col gap-3">
          {GIDRS.map((g, i) => (
            <GidrCard
              key={i}
              {...g}
              onClick={i === 0 ? onSelect : undefined}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </Shell>
  )
}

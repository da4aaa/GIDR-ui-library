import { X } from 'lucide-react'
import { Shell } from '../components/Shell'
import { SourceCard } from '@/components/Cards/SourceCard'
import { Badge } from '@/components/Badge/Badge'

interface Props { onBack: () => void }

const SOURCES = [
  { domain: 'apollo-kb.internal', title: 'E-3203 Error Code — Konica C554e Series', url: 'apollo-kb.internal/km/e32xx', favicon: undefined },
  { domain: 'apollo-kb.internal', title: 'Visit #C10392 — Jan 12 Service Report', url: 'apollo-kb.internal/visits/c10392', favicon: undefined },
  { domain: 'konica-minolta.com', title: 'C554e Field Service Manual p.47', url: 'my.konicaminolta.com/manuals/c554e', favicon: undefined },
]

export function Sources({ onBack }: Props) {
  return (
    <Shell onBack={onBack} title="Sources" bg="bg-bg-page-light">
      <div className="flex flex-col gap-4 px-4 pt-3 pb-8">
        {/* context */}
        <div className="flex items-center gap-2">
          <span className="font-body text-[13px] text-neutral-600">Referenced in last response</span>
          <Badge label="3 sources" color="blue" size="sm" />
        </div>

        {/* source cards */}
        <div className="flex flex-col gap-3">
          {SOURCES.map((s, i) => (
            <SourceCard
              key={i}
              {...s}
              state={i === 0 ? 'active' : 'default'}
              className="w-full"
            />
          ))}
        </div>

        {/* source detail — first one expanded */}
        <div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <span className="font-sans font-bold text-[14px] text-neutral-900">E-3203 Error Code — Konica C554e Series</span>
            <button className="shrink-0 p-1 rounded hover:bg-neutral-100">
              <X size={14} className="text-neutral-500" />
            </button>
          </div>
          <p className="font-body text-[13px] text-neutral-700 leading-[18px]">
            Error E-3203 indicates a fault in the secondary transfer belt unit. The belt may be worn, misaligned, or contaminated. Recommended action: inspect the transfer belt for wear marks, clean with dry cloth, and replace if surface is cracked or showing toner buildup past the wear indicator line.
          </p>
          <div className="flex items-center gap-1">
            <Badge label="Knowledge Base" color="neutral" size="sm" />
            <Badge label="Verified" color="green" size="sm" />
          </div>
        </div>
      </div>
    </Shell>
  )
}

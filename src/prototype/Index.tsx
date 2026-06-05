import { useNavigate } from 'react-router-dom'
import { GitBranch, AlertCircle, ArrowRight, Layers } from 'lucide-react'
import { PROTOTYPES, type Proto, type ProtoStatus } from './registry'

const STATUS_CONFIG: Record<ProtoStatus, { label: string; color: string; dot: string }> = {
  'in-progress': { label: 'In progress',  color: 'bg-amber-50 text-amber-700 border-amber-200',  dot: 'bg-amber-400' },
  'handed-off':  { label: 'Handed off',   color: 'bg-green-50 text-green-700 border-green-200',  dot: 'bg-green-500' },
  'retired':     { label: 'Retired',       color: 'bg-neutral-100 text-neutral-500 border-neutral-200', dot: 'bg-neutral-400' },
}

const GROUPS: ProtoStatus[] = ['in-progress', 'handed-off', 'retired']

function ProtoCard({ proto }: { proto: Proto }) {
  const navigate = useNavigate()
  const cfg = STATUS_CONFIG[proto.status]
  const isRetired = proto.status === 'retired'

  return (
    <div
      onClick={() => !isRetired && navigate(`/${proto.id}`)}
      className={`group bg-white border border-neutral-200 rounded-xl p-5 flex flex-col gap-3 transition-all ${
        isRetired ? 'opacity-50 cursor-default' : 'cursor-pointer hover:border-neutral-300 hover:shadow-elevation-1'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <span className={`font-sans font-bold text-[15px] ${isRetired ? 'text-neutral-500' : 'text-neutral-900'}`}>
            {proto.name}
          </span>
          <span className="font-body text-[13px] text-neutral-600 leading-[18px]">{proto.description}</span>
        </div>
        {!isRetired && (
          <ArrowRight size={16} className="text-neutral-300 group-hover:text-neutral-600 shrink-0 mt-1 transition-colors" />
        )}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-body font-medium px-2 py-1 rounded-full border ${cfg.color}`}>
          <span className={`size-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>

        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-500">
          <GitBranch size={11} />
          {proto.branch}
        </span>

        {proto.missingComponents && proto.missingComponents.length > 0 && (
          <span className="inline-flex items-center gap-1 text-[11px] font-body text-orange-500">
            <AlertCircle size={11} />
            {proto.missingComponents.length} missing {proto.missingComponents.length === 1 ? 'component' : 'components'}: {proto.missingComponents.join(', ')}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 text-[11px] font-body text-neutral-400">
        <span>Created {proto.createdAt}</span>
        {proto.handedOffAt && <span>· Handed off {proto.handedOffAt}</span>}
        {proto.retiredAt && <span>· Retired {proto.retiredAt}</span>}
      </div>
    </div>
  )
}

export function Index() {
  const grouped = GROUPS.map(status => ({
    status,
    protos: PROTOTYPES.filter(p => p.status === status),
  })).filter(g => g.protos.length > 0)

  const total = PROTOTYPES.length
  const active = PROTOTYPES.filter(p => p.status !== 'retired').length

  return (
    <div className="min-h-screen bg-neutral-100 py-12 px-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">

        {/* header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-[26px] text-neutral-900">GIDR Prototypes</span>
          </div>
          <span className="font-body text-[14px] text-neutral-600">
            {active} active · {total} total — click to open, tell Claude to hand off or retire
          </span>
        </div>

        {/* design system */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-[12px] uppercase tracking-wider text-neutral-500">Design System</span>
          </div>
          <div
            onClick={() => window.open('http://localhost:6006', '_blank')}
            className="group bg-white border border-neutral-200 rounded-xl p-5 flex items-center justify-between gap-3 cursor-pointer hover:border-brand hover:shadow-elevation-1 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-brand-subtle flex items-center justify-center shrink-0">
                <Layers size={18} className="text-brand" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans font-bold text-[15px] text-neutral-900">Component Library</span>
                <span className="font-body text-[13px] text-neutral-500">Storybook — localhost:6006</span>
              </div>
            </div>
            <ArrowRight size={16} className="text-neutral-300 group-hover:text-brand shrink-0 transition-colors" />
          </div>
        </div>

        {/* groups */}
        {grouped.map(({ status, protos }) => (
          <div key={status} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold text-[12px] uppercase tracking-wider text-neutral-500">
                {STATUS_CONFIG[status].label}
              </span>
              <span className="font-body text-[11px] text-neutral-400">{protos.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {protos.map(p => <ProtoCard key={p.id} proto={p} />)}
            </div>
          </div>
        ))}

        {/* legend */}
        <div className="border-t border-neutral-200 pt-6 flex flex-col gap-1">
          <p className="font-body text-[12px] text-neutral-400 leading-[18px]">
            <span className="text-orange-500 font-medium">Orange flag</span> = missing Figma component — design it, then ask Claude to build it into the library.
          </p>
          <p className="font-body text-[12px] text-neutral-400">
            To retire a prototype say <span className="font-mono bg-neutral-200 px-1 rounded">retire [name]</span> — removes the route, keeps it visible here as archived.
          </p>
        </div>

      </div>
    </div>
  )
}

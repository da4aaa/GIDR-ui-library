import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutGrid, X, GitBranch, AlertCircle, ArrowRight } from 'lucide-react'
import { PROTOTYPES, type Proto, type ProtoStatus } from '../registry'

const STATUS_CONFIG: Record<ProtoStatus, { label: string; color: string; dot: string }> = {
  'in-progress': { label: 'In progress', color: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-400' },
  'handed-off':  { label: 'Handed off',  color: 'bg-green-50 text-green-700 border-green-200',  dot: 'bg-green-500' },
  'retired':     { label: 'Retired',     color: 'bg-neutral-100 text-neutral-500 border-neutral-200', dot: 'bg-neutral-400' },
}

const GROUPS: ProtoStatus[] = ['in-progress', 'handed-off', 'retired']

function DrawerProtoCard({ proto, onClose }: { proto: Proto; onClose: () => void }) {
  const navigate = useNavigate()
  const cfg = STATUS_CONFIG[proto.status]
  const isRetired = proto.status === 'retired'

  return (
    <div
      onClick={() => { if (!isRetired) { navigate(`/${proto.id}`); onClose() } }}
      className={`group bg-white border border-neutral-200 rounded-xl p-4 flex flex-col gap-2.5 transition-all ${
        isRetired ? 'opacity-50 cursor-default' : 'cursor-pointer hover:border-neutral-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className={`font-sans font-bold text-[14px] leading-snug ${isRetired ? 'text-neutral-500' : 'text-neutral-900'}`}>
            {proto.name}
          </span>
          <span className="font-body text-[12px] text-neutral-500 leading-[17px]">{proto.description}</span>
        </div>
        {!isRetired && (
          <ArrowRight size={14} className="text-neutral-300 group-hover:text-neutral-500 shrink-0 mt-0.5 transition-colors" />
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className={`inline-flex items-center gap-1 text-[10px] font-body font-medium px-1.5 py-0.5 rounded-full border ${cfg.color}`}>
          <span className={`size-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-neutral-400">
          <GitBranch size={10} />
          {proto.branch}
        </span>
        {proto.missingComponents && proto.missingComponents.length > 0 && (
          <span className="inline-flex items-center gap-1 text-[10px] font-body text-orange-500">
            <AlertCircle size={10} />
            {proto.missingComponents.length} missing
          </span>
        )}
      </div>
    </div>
  )
}

export function ProtoDrawer() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  if (location.pathname === '/') return null

  const grouped = GROUPS.map(status => ({
    status,
    protos: PROTOTYPES.filter(p => p.status === status),
  })).filter(g => g.protos.length > 0)

  const active = PROTOTYPES.filter(p => p.status !== 'retired').length

  return (
    <>
      {/* floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-neutral-200 shadow-sm rounded-lg px-2.5 py-1.5 text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 transition-all text-[11px] font-body font-medium"
      >
        <LayoutGrid size={13} />
        <span>Prototypes</span>
      </button>

      {/* backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] transition-opacity duration-200 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-neutral-50 border-r border-neutral-200 shadow-xl z-50 flex flex-col transition-transform duration-250 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-4 pt-5 pb-3 border-b border-neutral-200">
          <div>
            <span className="font-sans font-bold text-[15px] text-neutral-900">GIDR Prototypes</span>
            <p className="font-body text-[11px] text-neutral-400 mt-0.5">{active} active · {PROTOTYPES.length} total</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* list */}
        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-4">
          {grouped.map(({ status, protos }) => (
            <div key={status} className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 px-1">
                <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-neutral-400">
                  {STATUS_CONFIG[status].label}
                </span>
                <span className="font-body text-[10px] text-neutral-300">{protos.length}</span>
              </div>
              {protos.map(p => (
                <DrawerProtoCard key={p.id} proto={p} onClose={() => setOpen(false)} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

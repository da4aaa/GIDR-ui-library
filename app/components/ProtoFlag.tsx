interface ProtoFlagProps {
  label: string
  children: React.ReactNode
}

export function ProtoFlag({ label, children }: ProtoFlagProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-[2px] rounded-xl border-2 border-dashed border-orange-400 pointer-events-none z-10" />
      <span className="absolute -top-5 left-0 text-[10px] font-mono font-bold text-orange-500 leading-none z-20">
        PROTO: {label}
      </span>
      {children}
    </div>
  )
}

import { useState } from 'react'
import { Paperclip, Send, BookOpen, History } from 'lucide-react'
import { Shell } from '../components/Shell'
import { ProtoFlag } from '../components/ProtoFlag'
import { AIMessage } from '@/components/Chat/AIMessage'
import { UserMessage } from '@/components/Chat/UserMessage'
import { SystemMessage } from '@/components/Chat/SystemMessage'
import { AIThinkingState } from '@/components/Chat/AIThinkingState'
import { ProceduresAccordion } from '@/components/ProceduresAccordion/ProceduresAccordion'
import { QuickReplyChip } from '@/components/QuickReplyChip/QuickReplyChip'

interface Props {
  onBack: () => void
  onSources: () => void
}

type Step = 'brief' | 'question' | 'thinking' | 'answer' | 'procedures'

export function Chat({ onBack, onSources }: Props) {
  const [step, setStep] = useState<Step>('brief')
  const [proceduresOpen, setProceduresOpen] = useState(false)

  const advance = () => {
    if (step === 'brief') setStep('question')
    else if (step === 'question') setStep('thinking')
    else if (step === 'thinking') setStep('answer')
    else if (step === 'answer') setStep('procedures')
  }

  return (
    <Shell onBack={onBack} bg="bg-bg-page-light">
      {/* machine context bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-neutral-200 shrink-0">
        <div className="flex flex-col">
          <span className="font-sans font-bold text-[13px] text-neutral-900">Konica Minolta C554e</span>
          <span className="font-body text-[11px] text-neutral-600">Canon Industrial Park · #KC221045</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onSources} className="p-1.5 rounded-lg hover:bg-neutral-100">
            <BookOpen size={18} className="text-neutral-600" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-neutral-100">
            <History size={18} className="text-neutral-600" />
          </button>
        </div>
      </div>

      {/* messages */}
      <div className="flex-1 flex flex-col gap-4 px-4 pt-4 pb-2 overflow-y-auto">
        {/* session marker */}
        <SystemMessage title="Morning triage loaded · 4 jobs today" />

        {/* AI brief */}
        <AIMessage
          sourcesCount={3}
          onSourcesClick={onSources}
        >
          Pre-job brief for this visit: The C554e at Canon Industrial has a history of Tray 2 feed issues. Last visit Jan 12 replaced the separation roller — check if recurred. Client reports E-3203 error code intermittently.
        </AIMessage>

        {/* quick replies — only before user sends */}
        {step === 'brief' && (
          <div className="flex flex-wrap gap-2 mt-1">
            <QuickReplyChip label="What is E-3203?" state="default" onClick={advance} />
            <QuickReplyChip label="Show parts checklist" state="default" onClick={() => {}} />
            <QuickReplyChip label="Fleet history" state="default" onClick={() => {}} />
          </div>
        )}

        {/* user question */}
        {(step === 'question' || step === 'thinking' || step === 'answer' || step === 'procedures') && (
          <UserMessage message="What does E-3203 mean and what parts should I have ready?" />
        )}

        {/* AI thinking */}
        {step === 'thinking' && (
          <div className="flex flex-col gap-2">
            <AIThinkingState />
            <button
              onClick={advance}
              className="self-start text-[11px] font-body text-neutral-500 underline"
            >
              (tap to see response)
            </button>
          </div>
        )}

        {/* AI answer */}
        {(step === 'answer' || step === 'procedures') && (
          <AIMessage sourcesCount={2} onSourcesClick={onSources}>
            E-3203 is a secondary transfer belt error. Bring: Transfer Belt Unit (A0EDR70000) and Fixing Unit (A0EDR73300). Based on 3 prior visits, both are likely culprits.
          </AIMessage>
        )}

        {/* procedures accordion */}
        {step === 'procedures' && (
          <div className="mt-1">
            <ProceduresAccordion
              count={4}
              isExpanded={proceduresOpen}
              onToggle={() => setProceduresOpen(p => !p)}
            >
              <div className="flex flex-col gap-2 pt-2">
                {['Transfer Belt Replacement', 'Fixing Unit Replacement', 'E-32xx Error Diagnostic', 'Paper Feed Inspection'].map((p, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2.5 bg-white rounded-lg border border-neutral-200">
                    <span className="font-body text-[13px] text-neutral-900">{p}</span>
                    <span className="font-body text-[11px] text-neutral-500">{[7, 5, 4, 9][i]} steps</span>
                  </div>
                ))}
              </div>
            </ProceduresAccordion>
          </div>
        )}

        {/* advance hint when at end */}
        {step === 'answer' && (
          <button onClick={advance} className="self-start text-[11px] font-body text-neutral-500 underline">
            (tap to show procedures)
          </button>
        )}
      </div>

      {/* input bar — flagged as missing component */}
      <div className="px-4 pt-2 pb-6 bg-white border-t border-neutral-200 shrink-0">
        <ProtoFlag label="ChatInputBar">
          <div className="flex items-center gap-2 bg-neutral-100 border border-neutral-300 rounded-xl px-3 py-2.5">
            <button className="shrink-0 p-1 rounded-lg hover:bg-neutral-200">
              <Paperclip size={16} className="text-neutral-500" />
            </button>
            <span className="flex-1 font-body text-[14px] text-neutral-500">Ask GIDR anything…</span>
            <button
              onClick={advance}
              className="shrink-0 size-8 rounded-lg bg-accent-1-800 flex items-center justify-center"
            >
              <Send size={15} className="text-white" />
            </button>
          </div>
        </ProtoFlag>
      </div>
    </Shell>
  )
}

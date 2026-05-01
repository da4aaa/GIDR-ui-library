import { useState } from 'react'
import { MoreHorizontal, ChevronLeft, Paperclip, ArrowUp, Mic } from 'lucide-react'
import { AIMessage } from '@/components/Chat/AIMessage'
import { UserMessage } from '@/components/Chat/UserMessage'
import { AIThinkingState } from '@/components/Chat/AIThinkingState'
import { ProtoFlag } from '../components/ProtoFlag'

interface Message {
  role: 'ai' | 'user'
  text: string
}

const INITIAL: Message[] = [
  { role: 'ai',   text: 'Good morning, Ricardo. You have 4 jobs today. The highest priority is the Konica Minolta C554e at Canon Industrial Park — machine is down and the SLA clock is running. Want a pre-job brief?' },
  { role: 'user', text: 'Yes, brief me on the Canon job.' },
  { role: 'ai',   text: 'The C554e at Canon Industrial has a history of Tray 2 feed issues. Last visit on Jan 12, Ricardo replaced the separation roller — check if it has recurred. Client is reporting error code E-3203 intermittently. Bring the Transfer Belt Unit (A0EDR70000) and Fixing Unit (A0EDR73300) — both flagged based on 3 prior visits.' },
]

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL)
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMessages(m => [...m, { role: 'user', text }])
    setInput('')
    setThinking(true)
    setTimeout(() => {
      setThinking(false)
      setMessages(m => [...m, {
        role: 'ai',
        text: 'Got it. Based on the service history for this machine, the most likely cause is the secondary transfer belt. I\'ve found 4 procedures that may help — want me to pull up the step-by-step guide?'
      }])
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-neutral-200 flex items-start justify-center py-10">
      <div className="w-[375px] h-[812px] bg-white rounded-[44px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.25)] flex flex-col border border-neutral-300">

        {/* status bar */}
        <div className="flex justify-between items-center px-7 pt-4 pb-1 shrink-0 bg-white">
          <span className="text-[13px] font-semibold font-body text-neutral-900">9:41</span>
          <div className="flex items-center gap-[5px]">
            <div className="flex gap-[2px] items-end h-3">
              {[3,5,7,9,11].map((h,i) => (
                <div key={i} className="w-[3px] bg-neutral-900 rounded-[1px]" style={{ height: h, opacity: i < 3 ? 1 : 0.3 }} />
              ))}
            </div>
            <div className="w-[15px] h-[11px] border-[1.5px] border-neutral-900 rounded-[2px] relative">
              <div className="absolute inset-[1px] bg-neutral-900 rounded-[1px]" style={{ right: 4 }} />
              <div className="absolute right-[-4px] top-[2px] w-[2px] h-[5px] bg-neutral-900 rounded-r" />
            </div>
          </div>
        </div>

        {/* header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-neutral-200 shrink-0">
          <button className="p-1 -ml-1 rounded-xl active:bg-neutral-100">
            <ChevronLeft size={22} className="text-neutral-900" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-sans font-bold text-[15px] text-neutral-900 truncate">Apollo Office Systems</p>
            <p className="font-body text-[12px] text-neutral-500 truncate">Konica Minolta C554e · Canon Industrial</p>
          </div>
          <button className="p-1.5 rounded-xl active:bg-neutral-100">
            <MoreHorizontal size={20} className="text-neutral-600" />
          </button>
        </div>

        {/* messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 bg-bg-page-light">
          {messages.map((m, i) =>
            m.role === 'ai'
              ? <AIMessage key={i} sourcesCount={i === 2 ? 3 : undefined}>{m.text}</AIMessage>
              : <UserMessage key={i} message={m.text} />
          )}
          {thinking && <AIThinkingState />}
          <div className="h-1" />
        </div>

        {/* input bar */}
        <div className="shrink-0 bg-white border-t border-neutral-200 px-3 pt-3 pb-7">
          <ProtoFlag label="ChatInputBar">
            <div className="flex items-end gap-2 bg-neutral-100 border border-neutral-300 rounded-2xl px-3 py-2.5">
              <button className="shrink-0 mb-0.5">
                <Paperclip size={18} className="text-neutral-500" />
              </button>
              <textarea
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                placeholder="Ask GIDR anything…"
                className="flex-1 bg-transparent resize-none font-body text-[14px] text-neutral-900 placeholder:text-neutral-500 outline-none max-h-24 leading-5"
              />
              <div className="flex items-center gap-1.5 shrink-0 mb-0.5">
                <button className="p-1.5 rounded-full hover:bg-neutral-200">
                  <Mic size={16} className="text-neutral-500" />
                </button>
                <button
                  onClick={send}
                  className="size-8 rounded-full bg-accent-1-800 flex items-center justify-center disabled:opacity-40 active:scale-95 transition-transform"
                  disabled={!input.trim()}
                >
                  <ArrowUp size={16} className="text-white" />
                </button>
              </div>
            </div>
          </ProtoFlag>
        </div>

      </div>
    </div>
  )
}

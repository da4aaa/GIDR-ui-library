import { useState } from 'react'
import { GidrSelect } from './screens/GidrSelect'
import { Chat } from './screens/Chat'
import { Sources } from './screens/Sources'

type Screen = 'select' | 'chat' | 'sources'

export function App() {
  const [screen, setScreen] = useState<Screen>('select')
  const [history, setHistory] = useState<Screen[]>([])

  const go = (s: Screen) => {
    setHistory(h => [...h, screen])
    setScreen(s)
  }

  const back = () => {
    const prev = history[history.length - 1]
    if (prev) {
      setHistory(h => h.slice(0, -1))
      setScreen(prev)
    }
  }

  return (
    <>
      {/* screen label */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white text-[11px] font-mono px-3 py-1 rounded-full opacity-60 pointer-events-none">
        {screen}
      </div>

      {screen === 'select' && (
        <GidrSelect onSelect={() => go('chat')} />
      )}
      {screen === 'chat' && (
        <Chat onBack={back} onSources={() => go('sources')} />
      )}
      {screen === 'sources' && (
        <Sources onBack={back} />
      )}
    </>
  )
}

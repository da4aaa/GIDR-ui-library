import { HashRouter, Routes, Route } from 'react-router-dom'
import { Index } from './Index'
import { ChatScreen } from './screens/ChatScreen'

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/chat-screen" element={<ChatScreen />} />
      </Routes>
    </HashRouter>
  )
}

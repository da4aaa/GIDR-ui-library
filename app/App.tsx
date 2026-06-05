import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Index } from './Index'
import { PrototypeScreen, PrototypeScreenMobile } from './screens/Prototype'
import { ProtoDrawer } from './components/ProtoDrawer'

function AppInner() {
  const { pathname } = useLocation()
  const isMobile = pathname === '/mobile-live'
  return (
    <>
      {!isMobile && <ProtoDrawer />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/mobile-v0-anthropic" element={<PrototypeScreen />} />
        <Route path="/mobile-live" element={<PrototypeScreenMobile />} />
      </Routes>
    </>
  )
}

export function App() {
  return (
    <HashRouter>
      <AppInner />
    </HashRouter>
  )
}

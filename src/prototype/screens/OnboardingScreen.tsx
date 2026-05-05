import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import { Avatar } from '@/components/Avatar/Avatar'
import { GidrCard } from '@/components/Cards/GidrCard'
import svgPaths from '../components/svg-logo-paths'

// ─── Timing ──────────────────────────────────────────────────────────────────
// 0–3.15s  logo animation plays
// 3.15–5.15s  dwell (2s hold)
// 5.15s  logo moves up + scales down
// 5.85s  form fades in

// ─── Geometry ────────────────────────────────────────────────────────────────
const PHONE_H = 812
const LOGO_W = 238
const LOGO_H = 107
const LOGO_SCALE = 100 / LOGO_W                           // → renders at 100×45
const LOGO_VIS_H = Math.round(LOGO_H * LOGO_SCALE)        // 45px

const CONTENT_H = LOGO_VIS_H + 24 + 442 + 24 + 32        // ≈ 567px
const CONTENT_TOP = (PHONE_H - CONTENT_H) / 2            // vertically centered

// Logo element top: align visual top of scaled logo to CONTENT_TOP
const LOGO_LOGIN_TOP = CONTENT_TOP - (LOGO_H - LOGO_VIS_H) / 2
const LOGO_SPLASH_TOP = (PHONE_H - LOGO_H) / 2

// Form starts below the logo's visual bottom + gap
const FORM_TOP = CONTENT_TOP + LOGO_VIS_H + 24

// ─── Easing ──────────────────────────────────────────────────────────────────
const easeOut = [0.16, 1, 0.3, 1] as const
const easeSpring = [0.34, 1.56, 0.64, 1] as const

// ─── Logo SVG ─────────────────────────────────────────────────────────────────

function LogoIconPart() {
  return (
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={`0 0 ${LOGO_W} ${LOGO_H}`}>
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="ob_g0" x1="26.9898" x2="84.097" y1="27.9815" y2="27.9815">
          <stop stopColor="#513685" /><stop offset="1" stopColor="#6367BA" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="ob_g1" x1="0" x2="90.3767" y1="69.3173" y2="69.3173">
          <stop stopColor="#513685" /><stop offset="1" stopColor="#6367BA" />
        </linearGradient>
        <radialGradient cx="0" cy="0" gradientTransform="matrix(6.94624 -1.22144 -1.22481 -6.92712 35.2668 6.16565)" gradientUnits="userSpaceOnUse" id="ob_r0" r="1">
          <stop stopColor="#6180C9" /><stop offset="0.70303" stopColor="#513685" /><stop offset="1" stopColor="#513685" />
        </radialGradient>
      </defs>

      <mask id="ob_m0" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }} height="36" width="68" x="22" y="10">
        <path d={svgPaths.topArc} fill="white" />
      </mask>
      <g mask="url(#ob_m0)">
        <motion.path d={svgPaths.topArc} stroke="url(#ob_g0)" strokeWidth="10" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 1.0 }} />
      </g>

      <mask id="ob_m1" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }} height="84" width="95" x="0" y="28">
        <path d={svgPaths.mainArc} fill="white" />
      </mask>
      <g mask="url(#ob_m1)">
        <motion.path d={svgPaths.mainArc} stroke="url(#ob_g1)" strokeWidth="15" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: easeOut, delay: 1.15 }} />
      </g>

      <motion.g
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: [0, 20, 0] }}
        transition={{ opacity: { duration: 0.055, delay: 2.3 }, scale: { type: 'spring', stiffness: 400, damping: 20, delay: 2.3 }, rotate: { duration: 0.22, delay: 2.3, ease: easeSpring } }}
        style={{ transformOrigin: '22.2px 28.14px' }}
      >
        <mask id="ob_m2" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }} height="30" width="30" x="7" y="13">
          <path d={svgPaths.largeStar} fill="white" />
        </mask>
        <g mask="url(#ob_m2)"><path d={svgPaths.largeStar} fill="#6367B9" /></g>
      </motion.g>

      <motion.g
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: [0, 20, 0] }}
        transition={{ opacity: { duration: 0.055, delay: 2.3 }, scale: { type: 'spring', stiffness: 400, damping: 20, delay: 2.3 }, rotate: { duration: 0.22, delay: 2.3, ease: easeSpring } }}
        style={{ transformOrigin: '33.96px 7.03px' }}
      >
        <mask id="ob_m3" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }} height="15" width="15" x="26" y="0">
          <path d={svgPaths.smallStar} fill="white" />
        </mask>
        <g mask="url(#ob_m3)">
          <path d={svgPaths.smallStar} fill="url(#ob_r0)" />
          <path d={svgPaths.smallStar} fill="#533C8C" />
        </g>
      </motion.g>

      <motion.path d={svgPaths.arrow} fill="#1A1A1A"
        style={{ transformOrigin: '60px 61px' }}
        initial={{ opacity: 0, x: -8, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ opacity: { duration: 0.2, delay: 2.5 }, x: { duration: 0.33, delay: 2.5, ease: easeSpring }, scale: { type: 'spring', stiffness: 400, damping: 20, delay: 2.5 } }}
      />
    </svg>
  )
}

function LogoTextPart() {
  return (
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={`0 0 ${LOGO_W} ${LOGO_H}`}>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.33, delay: 2.7 }}>
        <motion.g initial={{ scaleX: 0.98 }} animate={{ scaleX: 1 }} transition={{ duration: 0.33, delay: 2.7, ease: easeOut }} style={{ transformOrigin: '105px 53px' }}>
          <path d={svgPaths.gidrG} fill="#1A1A1A" /><path d={svgPaths.gidrI1} fill="#1A1A1A" />
          <path d={svgPaths.gidrD} fill="#1A1A1A" /><path d={svgPaths.gidrR} fill="#1A1A1A" />
          <path d={svgPaths.gidrDot} fill="#1A1A1A" /><path d={svgPaths.gidrA} fill="#1A1A1A" />
          <path d={svgPaths.gidrI2} fill="#1A1A1A" />
        </motion.g>
      </motion.g>
      <motion.g initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 2.85, ease: easeOut }}>
        <path d={svgPaths.subG} fill="#1A1A1A" /><path d={svgPaths.subU} fill="#1A1A1A" />
        <path d={svgPaths.subI1} fill="#1A1A1A" /><path d={svgPaths.subD1} fill="#1A1A1A" />
        <path d={svgPaths.subE1} fill="#1A1A1A" /><path d={svgPaths.subD2} fill="#1A1A1A" />
        <path d={svgPaths.subI2} fill="#1A1A1A" /><path d={svgPaths.subN1} fill="#1A1A1A" />
        <path d={svgPaths.subT} fill="#1A1A1A" /><path d={svgPaths.subE2} fill="#1A1A1A" />
        <path d={svgPaths.subL1} fill="#1A1A1A" /><path d={svgPaths.subL2} fill="#1A1A1A" />
        <path d={svgPaths.subI3} fill="#1A1A1A" /><path d={svgPaths.subG2} fill="#1A1A1A" />
        <path d={svgPaths.subE3} fill="#1A1A1A" /><path d={svgPaths.subN2} fill="#1A1A1A" />
        <path d={svgPaths.subC} fill="#1A1A1A" /><path d={svgPaths.subE4} fill="#1A1A1A" />
      </motion.g>
    </svg>
  )
}

function LogoContent() {
  return (
    <div className="relative" style={{ width: LOGO_W, height: LOGO_H }}>
      <motion.div className="absolute inset-0"
        initial={{ x: 0, scale: 1 }} animate={{ x: -12, scale: 0.95 }}
        transition={{ x: { duration: 0.35, delay: 2.7, ease: easeOut }, scale: { duration: 0.35, delay: 2.7, ease: easeOut } }}
        style={{ transformOrigin: 'center' }}
      >
        <LogoIconPart />
      </motion.div>
      <motion.div className="absolute inset-0 overflow-hidden"
        initial={{ clipPath: 'inset(0 100% 0 0)', x: -6 }}
        animate={{ clipPath: 'inset(0 0% 0 0)', x: -16 }}
        transition={{ clipPath: { duration: 0.4, delay: 2.7, ease: easeOut }, x: { duration: 0.4, delay: 2.7, ease: easeOut } }}
      >
        <LogoTextPart />
      </motion.div>
    </div>
  )
}

// ─── Social Logos ─────────────────────────────────────────────────────────────

function MicrosoftLogo() {
  return (
    <div className="flex flex-col gap-[1.568px]">
      <div className="flex gap-[1.568px]">
        <div className="size-[9.216px] bg-[#f26522]" /><div className="size-[9.216px] bg-[#8dc540]" />
      </div>
      <div className="flex gap-[1.568px]">
        <div className="size-[9.216px] bg-[#06adee]" /><div className="size-[9.216px] bg-[#ffc10c]" />
      </div>
    </div>
  )
}

function GoogleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

// ─── Login screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setIsLogin(true), 5150)
    const t2 = setTimeout(() => setShowForm(true), 5850)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <motion.div
      className="absolute inset-0 bg-surface-sunken"
    >
      {/* Logo — position + scale animate on transition */}
      <motion.div
        className="absolute"
        style={{ left: '50%', x: '-50%' }}
        animate={{
          top: isLogin ? LOGO_LOGIN_TOP : LOGO_SPLASH_TOP,
          scale: isLogin ? LOGO_SCALE : 1,
        }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <LogoContent />
      </motion.div>

      {/* Form — fades in after logo settles */}
      {showForm && (
        <motion.div
          className="absolute flex flex-col gap-layout-lg"
          style={{ left: 20, right: 20, top: FORM_TOP }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <div className="bg-surface-base rounded-lg shadow-elevation-1 border border-sm border-neutral-000 py-layout-lg w-full">
            <div className="flex flex-col gap-layout-lg">
              <div className="px-layout-lg text-center">
                <p className="text-heading-lg font-sans text-neutral-900">Welcome back</p>
              </div>
              <div className="px-layout-lg flex flex-col gap-layout-lg">
                <Input label="Email" type="email" placeholder="Your email" />

                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between">
                    <label className="font-body font-medium text-[13px] text-neutral-800 leading-[18px]">Password</label>
                    <button className="text-caption-md text-accent-1-900 font-sans font-semibold">Forgot password?</button>
                  </div>
                  <div className="flex items-center gap-2 w-full rounded-md border border-neutral-500 bg-white h-[38px] px-3 focus-within:border-accent-1-800 focus-within:ring-2 focus-within:ring-accent-1-300 transition-colors">
                    <input type="password" className="flex-1 min-w-0 bg-transparent outline-none placeholder:text-neutral-500 font-body text-[14px]" />
                  </div>
                </div>

                <div className="flex items-center gap-component-sm">
                  <div className="flex-1 h-px bg-neutral-400" />
                  <span className="text-caption-md text-neutral-600 whitespace-nowrap font-sans">OR CONTINUE WITH</span>
                  <div className="flex-1 h-px bg-neutral-400" />
                </div>

                <div className="flex gap-layout-sm">
                  <button className="flex-1 flex items-center justify-center py-[18px] border border-sm border-neutral-400 rounded-lg bg-surface-base hover:bg-neutral-000 transition-colors">
                    <MicrosoftLogo />
                  </button>
                  <button className="flex-1 flex items-center justify-center py-[18px] border border-sm border-neutral-400 rounded-lg bg-surface-base hover:bg-neutral-000 transition-colors">
                    <GoogleLogo />
                  </button>
                </div>

                <Button variant="primary" size="l" className="w-full" onClick={onLogin}>
                  Login
                </Button>
              </div>
            </div>
          </div>

          <p className="text-caption text-neutral-600 text-center font-body">
            By clicking continue, you agree to our{' '}
            <a href="#" className="underline decoration-solid">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="underline decoration-solid">Privacy Policy</a>.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

// ─── Static logo (header) ─────────────────────────────────────────────────────

function HeaderLogo() {
  return (
    <svg width="100" height="45" viewBox="0 0 238 107" fill="none">
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="hl_g0" x1="26.9898" x2="84.097" y1="27.9815" y2="27.9815">
          <stop stopColor="#513685" /><stop offset="1" stopColor="#6367BA" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="hl_g1" x1="0" x2="90.3767" y1="69.3173" y2="69.3173">
          <stop stopColor="#513685" /><stop offset="1" stopColor="#6367BA" />
        </linearGradient>
        <radialGradient cx="0" cy="0" gradientTransform="matrix(6.94624 -1.22144 -1.22481 -6.92712 35.2668 6.16565)" gradientUnits="userSpaceOnUse" id="hl_r0" r="1">
          <stop stopColor="#6180C9" /><stop offset="0.70303" stopColor="#513685" /><stop offset="1" stopColor="#513685" />
        </radialGradient>
        <mask id="hl_m0" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }}><path d={svgPaths.topArc} fill="white" /></mask>
        <mask id="hl_m1" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }}><path d={svgPaths.mainArc} fill="white" /></mask>
        <mask id="hl_m2" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }}><path d={svgPaths.largeStar} fill="white" /></mask>
        <mask id="hl_m3" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }}><path d={svgPaths.smallStar} fill="white" /></mask>
      </defs>
      <g mask="url(#hl_m0)"><path d={svgPaths.topArc} stroke="url(#hl_g0)" strokeWidth="10" fill="none" /></g>
      <g mask="url(#hl_m1)"><path d={svgPaths.mainArc} stroke="url(#hl_g1)" strokeWidth="15" fill="none" /></g>
      <g mask="url(#hl_m2)"><path d={svgPaths.largeStar} fill="#6367B9" /></g>
      <g mask="url(#hl_m3)"><path d={svgPaths.smallStar} fill="url(#hl_r0)" /><path d={svgPaths.smallStar} fill="#533C8C" /></g>
      <path d={svgPaths.arrow} fill="#1A1A1A" />
      <path d={svgPaths.gidrG} fill="#1A1A1A" /><path d={svgPaths.gidrI1} fill="#1A1A1A" />
      <path d={svgPaths.gidrD} fill="#1A1A1A" /><path d={svgPaths.gidrR} fill="#1A1A1A" />
      <path d={svgPaths.gidrDot} fill="#1A1A1A" /><path d={svgPaths.gidrA} fill="#1A1A1A" />
      <path d={svgPaths.gidrI2} fill="#1A1A1A" />
      <path d={svgPaths.subG} fill="#1A1A1A" /><path d={svgPaths.subU} fill="#1A1A1A" />
      <path d={svgPaths.subI1} fill="#1A1A1A" /><path d={svgPaths.subD1} fill="#1A1A1A" />
      <path d={svgPaths.subE1} fill="#1A1A1A" /><path d={svgPaths.subD2} fill="#1A1A1A" />
      <path d={svgPaths.subI2} fill="#1A1A1A" /><path d={svgPaths.subN1} fill="#1A1A1A" />
      <path d={svgPaths.subT} fill="#1A1A1A" /><path d={svgPaths.subE2} fill="#1A1A1A" />
      <path d={svgPaths.subL1} fill="#1A1A1A" /><path d={svgPaths.subL2} fill="#1A1A1A" />
      <path d={svgPaths.subI3} fill="#1A1A1A" /><path d={svgPaths.subG2} fill="#1A1A1A" />
      <path d={svgPaths.subE3} fill="#1A1A1A" /><path d={svgPaths.subN2} fill="#1A1A1A" />
      <path d={svgPaths.subC} fill="#1A1A1A" /><path d={svgPaths.subE4} fill="#1A1A1A" />
    </svg>
  )
}

// ─── GIDR list data ───────────────────────────────────────────────────────────

const GIDR_ITEMS = [
  { category: 'Climate Control Systems', title: 'Climate Control Maintenance Hub', description: 'AI-driven processes for climate control setup and upkeep', procedureCount: 8, lastAccessed: 'Nov 12' },
  { category: 'HVAC Systems', title: 'HVAC Diagnostics & Repair', description: 'Step-by-step fault diagnosis and repair procedures for HVAC units', procedureCount: 12, lastAccessed: 'Nov 10' },
  { category: 'Electrical Systems', title: 'Electrical Wiring & Safety', description: 'Compliance-ready procedures for electrical installations and inspections', procedureCount: 6, lastAccessed: 'Nov 8' },
  { category: 'Plumbing', title: 'Plumbing Maintenance Hub', description: 'Guided procedures for pipe repairs, leak detection and pressure testing', procedureCount: 5, lastAccessed: 'Nov 5' },
  { category: 'Fire Safety', title: 'Fire Suppression Systems', description: 'Inspection, testing and servicing procedures for fire suppression equipment', procedureCount: 9, lastAccessed: 'Oct 30' },
]

// ─── Choose a GIDR screen ─────────────────────────────────────────────────────

function ChooseGidrScreen() {
  return (
    <motion.div
      className="absolute inset-0 bg-surface-sunken flex flex-col overflow-hidden z-10"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: easeOut }}
    >
      {/* Safe area + header */}
      <div className="pt-[44px] px-[20px] pb-[8px] shrink-0">
        <HeaderLogo />
        <p className="text-heading-lg font-sans text-neutral-900 mt-[6px]">
          Hi, Alex! Choose a GIDR
        </p>
      </div>

      {/* Scroll area with matching top + bottom gradients */}
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[32px] bg-gradient-to-b from-surface-sunken to-transparent pointer-events-none z-10" />

        <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col gap-component-md px-[20px] pt-[8px] pb-[20px]">
            {GIDR_ITEMS.map((item, i) => (
              <GidrCard key={i} {...item} className="w-full" />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-[32px] bg-gradient-to-t from-surface-sunken to-transparent pointer-events-none z-10" />
      </div>

      {/* Footer chip */}
      <div className="shrink-0 px-[20px] py-[16px]">
        <div className="inline-flex items-center gap-component-sm bg-surface-base rounded-lg shadow-elevation-1 h-[38px] px-layout-md">
          <Avatar size="xxsmall" color="2" initials="AT" />
          <span className="text-body font-sans text-neutral-900">Alex Tarasevich</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function OnboardingScreen() {
  const [screen, setScreen] = useState<'login' | 'gidr-select'>('login')

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="relative w-[375px] h-[812px] rounded-[50px] shadow-2xl overflow-hidden border-[14px] border-black bg-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-3xl z-10" />
        <div className="size-full overflow-hidden rounded-[36px] relative">
          <AnimatePresence>
            {screen === 'login' ? (
              <LoginScreen key="login" onLogin={() => setScreen('gidr-select')} />
            ) : (
              <ChooseGidrScreen key="gidr" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

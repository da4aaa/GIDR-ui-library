import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, ChevronDown, MoreVertical, FolderPlus, List, Clock, X, ArrowRight, Mic, Plus, Copy, ThumbsUp, ThumbsDown, Folder, Send, Camera, Image, FileText, Wrench, AlertTriangle } from 'lucide-react'
import svgPaths from '../components/svg-logo-paths'
import { HeaderLogo } from '../components/HeaderLogo'
import { ProcedureIcon, type ProcedureIconType } from '@/components/Cards/ProcedureIcon'

// ─── Anthropic design tokens ──────────────────────────────────────────────────
const AN = {
  bg: '#E9E9F8',
  bgLight: '#F5F9FA',
  surface: '#FFFFFE',
  surfaceAlt: '#F5F3ED',
  coral: '#9355D1',
  terracotta: '#7B40B8',
  coralLight: '#F3ECFD',
  coralHover: '#AA74DB',
  secondary: '#0AADA0',
  secondaryDark: '#08918A',
  secondaryLight: '#E0F5F4',
  ink: '#1F1915',
  textSecondary: '#6B6359',
  muted: '#8A8279',
  placeholder: '#B5AFA5',
  border: '#EBE8E2',
  borderStrong: '#DDD9D1',
  font: "'Styrene A', 'Styrene B', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
}

// ─── Geometry (same as original) ─────────────────────────────────────────────
const LOGO_W = 238
const LOGO_H = 107
const LOGO_SCALE = 100 / LOGO_W
const LOGO_VIS_H = Math.round(LOGO_H * LOGO_SCALE)
const CONTENT_H = LOGO_VIS_H + 24 + 442 + 24 + 32

function computePositions(phoneH: number) {
  const contentTop = (phoneH - CONTENT_H) / 2
  return {
    logoLoginTop: contentTop - (LOGO_H - LOGO_VIS_H) / 2,
    logoSplashTop: (phoneH - LOGO_H) / 2,
    formTop: contentTop + LOGO_VIS_H + 24,
  }
}

const easeOut = [0.16, 1, 0.3, 1] as const
const easeSpring = [0.34, 1.56, 0.64, 1] as const

// ─── Logo SVG (warm-adapted) ──────────────────────────────────────────────────

function LogoIconPart() {
  return (
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={`0 0 ${LOGO_W} ${LOGO_H}`}>
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="an_g0" x1="26.9898" x2="84.097" y1="27.9815" y2="27.9815">
          <stop stopColor="#513685" /><stop offset="1" stopColor="#6367BA" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="an_g1" x1="0" x2="90.3767" y1="69.3173" y2="69.3173">
          <stop stopColor="#513685" /><stop offset="1" stopColor="#6367BA" />
        </linearGradient>
        <radialGradient cx="0" cy="0" gradientTransform="matrix(6.94624 -1.22144 -1.22481 -6.92712 35.2668 6.16565)" gradientUnits="userSpaceOnUse" id="an_r0" r="1">
          <stop stopColor="#6180C9" /><stop offset="0.70303" stopColor="#513685" /><stop offset="1" stopColor="#513685" />
        </radialGradient>
      </defs>
      <mask id="an_m0" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }} height="36" width="68" x="22" y="10">
        <path d={svgPaths.topArc} fill="white" />
      </mask>
      <g mask="url(#an_m0)">
        <motion.path d={svgPaths.topArc} stroke="url(#an_g0)" strokeWidth="10" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 1.0 }} />
      </g>
      <mask id="an_m1" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }} height="84" width="95" x="0" y="28">
        <path d={svgPaths.mainArc} fill="white" />
      </mask>
      <g mask="url(#an_m1)">
        <motion.path d={svgPaths.mainArc} stroke="url(#an_g1)" strokeWidth="15" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: easeOut, delay: 1.15 }} />
      </g>
      <motion.g
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: [0, 20, 0] }}
        transition={{ opacity: { duration: 0.055, delay: 2.3 }, scale: { type: 'spring', stiffness: 400, damping: 20, delay: 2.3 }, rotate: { duration: 0.22, delay: 2.3, ease: easeSpring } }}
        style={{ transformOrigin: '22.2px 28.14px' }}
      >
        <mask id="an_m2" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }} height="30" width="30" x="7" y="13">
          <path d={svgPaths.largeStar} fill="white" />
        </mask>
        <g mask="url(#an_m2)"><path d={svgPaths.largeStar} fill="#6367B9" /></g>
      </motion.g>
      <motion.g
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: [0, 20, 0] }}
        transition={{ opacity: { duration: 0.055, delay: 2.3 }, scale: { type: 'spring', stiffness: 400, damping: 20, delay: 2.3 }, rotate: { duration: 0.22, delay: 2.3, ease: easeSpring } }}
        style={{ transformOrigin: '33.96px 7.03px' }}
      >
        <mask id="an_m3" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }} height="15" width="15" x="26" y="0">
          <path d={svgPaths.smallStar} fill="white" />
        </mask>
        <g mask="url(#an_m3)">
          <path d={svgPaths.smallStar} fill="url(#an_r0)" />
          <path d={svgPaths.smallStar} fill="#533C8C" />
        </g>
      </motion.g>
      <motion.path d={svgPaths.arrow} fill={AN.ink}
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
          <path d={svgPaths.gidrG} fill={AN.ink} /><path d={svgPaths.gidrI1} fill={AN.ink} />
          <path d={svgPaths.gidrD} fill={AN.ink} /><path d={svgPaths.gidrR} fill={AN.ink} />
          <path d={svgPaths.gidrDot} fill={AN.coral} /><path d={svgPaths.gidrA} fill={AN.ink} />
          <path d={svgPaths.gidrI2} fill={AN.ink} />
        </motion.g>
      </motion.g>
      <motion.g initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 2.85, ease: easeOut }}>
        <path d={svgPaths.subG} fill={AN.muted} /><path d={svgPaths.subU} fill={AN.muted} />
        <path d={svgPaths.subI1} fill={AN.muted} /><path d={svgPaths.subD1} fill={AN.muted} />
        <path d={svgPaths.subE1} fill={AN.muted} /><path d={svgPaths.subD2} fill={AN.muted} />
        <path d={svgPaths.subI2} fill={AN.muted} /><path d={svgPaths.subN1} fill={AN.muted} />
        <path d={svgPaths.subT} fill={AN.muted} /><path d={svgPaths.subE2} fill={AN.muted} />
        <path d={svgPaths.subL1} fill={AN.muted} /><path d={svgPaths.subL2} fill={AN.muted} />
        <path d={svgPaths.subI3} fill={AN.muted} /><path d={svgPaths.subG2} fill={AN.muted} />
        <path d={svgPaths.subE3} fill={AN.muted} /><path d={svgPaths.subN2} fill={AN.muted} />
        <path d={svgPaths.subC} fill={AN.muted} /><path d={svgPaths.subE4} fill={AN.muted} />
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

// ─── Social logos ─────────────────────────────────────────────────────────────

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
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

// ─── Anthropic: GIDR card (research card style) ───────────────────────────────

interface AnthropicGidrCardProps {
  category: string
  title: string
  description: string
  procedureCount: number
  jobsInProgress: number
  lastAccessed: string
  onClick?: () => void
}

function AnthropicGidrCard({ category, title, description, procedureCount, jobsInProgress, lastAccessed, onClick }: AnthropicGidrCardProps) {
  return (
    <div
      onClick={onClick}
      className="w-full flex flex-col gap-2.5 px-5 py-4 cursor-pointer transition-all"
      style={{
        background: AN.surface,
        border: `1px solid ${AN.border}`,
        borderLeft: `3px solid ${AN.coral}`,
        borderRadius: 8,
        boxShadow: '0 1px 2px rgba(31,25,21,0.04)',
      }}
    >
      <span style={{
        fontSize: 11, fontWeight: 500,
        letterSpacing: '0.08em', textTransform: 'uppercase' as const,
        color: AN.coral, fontFamily: AN.font,
      }}>
        {category}
      </span>
      <p style={{ fontFamily: AN.font, fontSize: 15, fontWeight: 500, color: AN.ink, lineHeight: 1.35, letterSpacing: '-0.005em' }}>
        {title}
      </p>
      <p style={{ fontFamily: AN.font, fontSize: 13, color: AN.textSecondary, lineHeight: 1.55, letterSpacing: '0.005em' }}>
        {description}
      </p>
      <div className="flex items-center gap-4 pt-2" style={{ borderTop: `1px solid ${AN.border}` }}>
        <span className="flex items-center gap-1.5" style={{ fontFamily: AN.font, fontSize: 12, color: AN.muted }}>
          <List size={12} strokeWidth={1.5} />
          {procedureCount} procedures
        </span>
        <span className="flex items-center gap-1.5" style={{ fontFamily: AN.font, fontSize: 12, color: AN.muted }}>
          <Wrench size={12} strokeWidth={1.5} />
          {jobsInProgress} jobs in progress
        </span>
        <span className="flex items-center gap-1.5" style={{ fontFamily: AN.font, fontSize: 12, color: AN.muted }}>
          <Clock size={12} strokeWidth={1.5} />
          {lastAccessed}
        </span>
      </div>
    </div>
  )
}

function CountIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.33301 2.83301C7.90707 2.83301 8.45856 2.92614 8.98633 3.11133C9.514 3.29651 10.0098 3.5652 10.4727 3.91699L11.25 3.13867L12.0273 3.91699L11.25 4.69434C11.6018 5.1573 11.8705 5.65289 12.0557 6.18066C12.2408 6.7083 12.333 7.25911 12.333 7.83301C12.333 8.51808 12.2013 9.16411 11.9375 9.77051C11.6736 10.377 11.315 10.9076 10.8613 11.3613C10.4076 11.815 9.87698 12.1736 9.27051 12.4375C8.66411 12.7013 8.01809 12.833 7.33301 12.833C6.64796 12.833 6.00188 12.7013 5.39551 12.4375C4.78922 12.1736 4.25926 11.8149 3.80566 11.3613C3.35197 10.9076 2.99338 10.377 2.72949 9.77051C2.46566 9.16408 2.33301 8.51812 2.33301 7.83301C2.33305 7.14794 2.46565 6.50189 2.72949 5.89551C2.99336 5.28919 3.35207 4.75927 3.80566 4.30566C4.25926 3.85207 4.78921 3.49336 5.39551 3.22949C6.00188 2.96565 6.64796 2.83305 7.33301 2.83301ZM7.33301 3.94434C6.25909 3.94441 5.34218 4.32383 4.58301 5.08301C3.82385 5.84219 3.44441 6.75909 3.44434 7.83301C3.44434 8.90692 3.82399 9.82382 4.58301 10.583C5.34218 11.3422 6.25909 11.7226 7.33301 11.7227C8.40707 11.7227 9.32376 11.3423 10.083 10.583C10.8422 9.82375 11.2227 8.90707 11.2227 7.83301C11.2226 6.75907 10.8422 5.84219 10.083 5.08301C9.32382 4.32395 8.40692 3.94434 7.33301 3.94434ZM7.33301 6.72266C7.94654 6.72266 8.44416 7.21951 8.44434 7.83301C8.44434 8.44666 7.94665 8.94434 7.33301 8.94434C6.71955 8.94412 6.22266 8.44653 6.22266 7.83301C6.22283 7.21964 6.71966 6.72287 7.33301 6.72266ZM9 2.27734H5.66699V1.16699H9V2.27734Z" fill="currentColor"/>
    </svg>
  )
}

// ─── Anthropic: Procedure card ────────────────────────────────────────────────

interface AnthropicProcedureCardProps {
  illustrationType: ProcedureIconType
  title: string
  description: string
  badges?: { label: string }[]
  stepCount: number
  estimatedMinutes?: number
  stepProgress?: string
  onClick?: () => void
}

function AnthropicProcedureCard({ illustrationType, title, description, badges = [], stepCount, estimatedMinutes, stepProgress, onClick }: AnthropicProcedureCardProps) {
  return (
    <div
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default',
        background: AN.surface,
        border: `1px solid ${AN.border}`,
        borderRadius: 16,
        boxShadow: '0 2px 8px rgba(31,25,21,0.06)',
        padding: '16px 16px 12px 16px',
      }}
    >
      {/* Icon + title row */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex-none overflow-hidden"
          style={{ width: 56, height: 56, borderRadius: 12 }}
        >
          <ProcedureIcon type={illustrationType} className="w-full h-full" />
        </div>
        <div className="flex flex-col gap-1 pt-0.5">
          <p style={{ fontFamily: AN.font, fontSize: 15, fontWeight: 700, color: AN.ink, lineHeight: 1.35 }}>
            {title}
          </p>
          <p style={{ fontFamily: AN.font, fontSize: 13, color: AN.muted, lineHeight: 1.5 }}>
            {description}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: AN.border, marginBottom: 10 }} />

      {/* Footer: stats left, badge right */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1" style={{ fontFamily: AN.font, fontSize: 12, color: AN.muted }}>
            <List size={12} strokeWidth={1.5} />
            {stepCount} steps
          </span>
          {stepProgress != null ? (
            <span className="flex items-center gap-1" style={{ fontFamily: AN.font, fontSize: 11, color: AN.muted }}>
              <CountIcon />
              {stepProgress} complete
            </span>
          ) : estimatedMinutes != null && (
            <span className="flex items-center gap-1" style={{ fontFamily: AN.font, fontSize: 11, color: AN.muted }}>
              <Clock size={12} strokeWidth={1.5} />
              ~{estimatedMinutes} min
            </span>
          )}
        </div>
        {badges.length > 0 && (
          <span style={{
            fontFamily: AN.font, fontSize: 12, fontWeight: 500,
            color: badges[0].label === 'In progress' ? AN.coral : badges[0].label === 'Complete' ? '#2D7A5E' : AN.muted,
            background: badges[0].label === 'In progress' ? AN.coralLight : badges[0].label === 'Complete' ? '#E8F5ED' : AN.border,
            borderRadius: 9999, padding: '4px 10px',
          }}>
            {badges[0].label}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const GIDR_ITEMS = [
  { category: 'Climate Control Systems', title: 'Climate Control Maintenance Hub', description: 'AI-driven processes for climate control setup and upkeep', procedureCount: 8, jobsInProgress: 3, lastAccessed: 'Nov 12' },
  { category: 'HVAC Systems', title: 'HVAC Diagnostics & Repair', description: 'Step-by-step fault diagnosis and repair procedures for HVAC units', procedureCount: 12, jobsInProgress: 5, lastAccessed: 'Nov 10' },
  { category: 'Electrical Systems', title: 'Electrical Wiring & Safety', description: 'Compliance-ready procedures for electrical installations and inspections', procedureCount: 6, jobsInProgress: 1, lastAccessed: 'Nov 8' },
  { category: 'Plumbing', title: 'Plumbing Maintenance Hub', description: 'Guided procedures for pipe repairs, leak detection and pressure testing', procedureCount: 5, jobsInProgress: 2, lastAccessed: 'Nov 5' },
  { category: 'Fire Safety', title: 'Fire Suppression Systems', description: 'Inspection, testing and servicing procedures for fire suppression equipment', procedureCount: 9, jobsInProgress: 4, lastAccessed: 'Oct 30' },
]

const PROCEDURES = [
  { illustrationType: 'Network' as const, title: 'Moving parts and machinery guided procedures', description: 'Verify protective equipment before starting field work', badges: [{ label: 'In progress' }], stepCount: 12, stepProgress: '7/10' },
  { illustrationType: 'Safety' as const, title: 'Safe Operation of Machinery and Moving Parts', description: 'Verify protective equipment before starting field work', badges: [], stepCount: 12 },
  { illustrationType: 'Electrical' as const, title: 'Moving parts and machinery guided procedures', description: 'Verify protective equipment before starting field work', badges: [{ label: 'Complete' }], stepCount: 12 },
]


const PROCEDURE_INSTANCE_INFO: Record<string, { current: number; total: number }> = {
  'Moving parts and machinery guided procedures': { current: 8, total: 10 },
}

const PAST_RUNS = [
  { runNumber: 1, date: 'Apr 10, 2026' },
  { runNumber: 2, date: 'Apr 17, 2026' },
  { runNumber: 3, date: 'Apr 24, 2026' },
  { runNumber: 4, date: 'May 1, 2026' },
  { runNumber: 5, date: 'May 8, 2026' },
  { runNumber: 6, date: 'May 15, 2026' },
  { runNumber: 7, date: 'May 22, 2026' },
]

// ─── Login screen ─────────────────────────────────────────────────────────────

function AnthropicLoginScreen({ onLogin, phoneHeight }: { onLogin: () => void; phoneHeight: number }) {
  const [isLogin, setIsLogin] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const { logoLoginTop, logoSplashTop, formTop } = computePositions(phoneHeight)

  useEffect(() => {
    const t1 = setTimeout(() => setIsLogin(true), 5150)
    const t2 = setTimeout(() => setShowForm(true), 5850)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <motion.div className="absolute inset-0" style={{ background: AN.bg }}>
      <motion.div
        className="absolute"
        style={{ left: '50%', x: '-50%' }}
        animate={{ top: isLogin ? logoLoginTop : logoSplashTop, scale: isLogin ? LOGO_SCALE : 1 }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <LogoContent />
      </motion.div>

      {showForm && (
        <motion.div
          className="absolute flex flex-col gap-4"
          style={{ left: 20, right: 20, top: formTop }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <div
            className="w-full flex flex-col gap-5 py-6"
            style={{
              background: AN.surface, border: `1px solid ${AN.border}`,
              borderRadius: 12, boxShadow: '0 4px 12px rgba(31,25,21,0.08)',
            }}
          >
            <div className="px-6">
              <p style={{ fontFamily: AN.font, fontSize: 24, fontWeight: 500, color: AN.ink, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                Welcome back
              </p>
            </div>

            <div className="px-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label style={{ fontFamily: AN.font, fontSize: 12, fontWeight: 500, color: AN.muted, letterSpacing: '0.02em' }}>Email</label>
                <input type="email" placeholder="your@email.com"
                  className="w-full outline-none transition-all"
                  style={{ background: AN.surface, color: AN.ink, border: `1px solid ${AN.borderStrong}`, borderRadius: 8, fontFamily: AN.font, fontSize: 15, height: 44, padding: '10px 14px', letterSpacing: '0.005em' }}
                  onFocus={e => { e.currentTarget.style.borderColor = AN.coral; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(147,85,209,0.12)` }}
                  onBlur={e => { e.currentTarget.style.borderColor = AN.borderStrong; e.currentTarget.style.boxShadow = 'none' }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label style={{ fontFamily: AN.font, fontSize: 12, fontWeight: 500, color: AN.muted, letterSpacing: '0.02em' }}>Password</label>
                  <button style={{ fontFamily: AN.font, fontSize: 13, color: AN.coral, fontWeight: 500 }}>Forgot password?</button>
                </div>
                <input type="password"
                  className="w-full outline-none transition-all"
                  style={{ background: AN.surface, color: AN.ink, border: `1px solid ${AN.borderStrong}`, borderRadius: 8, fontFamily: AN.font, fontSize: 15, height: 44, padding: '10px 14px' }}
                  onFocus={e => { e.currentTarget.style.borderColor = AN.coral; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(147,85,209,0.12)` }}
                  onBlur={e => { e.currentTarget.style.borderColor = AN.borderStrong; e.currentTarget.style.boxShadow = 'none' }}
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: AN.border }} />
                <span style={{ fontFamily: AN.font, fontSize: 12, color: AN.muted, letterSpacing: '0.02em' }}>or continue with</span>
                <div className="flex-1 h-px" style={{ background: AN.border }} />
              </div>

              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center h-[44px] transition-colors"
                  style={{ background: AN.surface, border: `1px solid ${AN.borderStrong}`, borderRadius: 9999 }}>
                  <MicrosoftLogo />
                </button>
                <button className="flex-1 flex items-center justify-center h-[44px] transition-colors"
                  style={{ background: AN.surface, border: `1px solid ${AN.borderStrong}`, borderRadius: 9999 }}>
                  <GoogleLogo />
                </button>
              </div>

              <button onClick={onLogin}
                className="w-full h-[44px] transition-all active:scale-[0.98]"
                style={{ background: 'linear-gradient(107deg, #533C8B -20.3%, #6366B8 102.76%)', color: '#FFFFFE', borderRadius: 24, border: 'none', fontFamily: AN.font, fontSize: 14, fontWeight: 500, height: 44, padding: '0 18px', letterSpacing: '0.005em' }}>
                Continue
              </button>
            </div>
          </div>

          <p className="text-center" style={{ fontFamily: AN.font, fontSize: 12, color: AN.muted, lineHeight: 1.55, letterSpacing: '0.01em' }}>
            By continuing you agree to our{' '}
            <a href="#" style={{ color: AN.terracotta, textDecoration: 'underline' }}>Terms of Service</a>
            {' '}and{' '}
            <a href="#" style={{ color: AN.terracotta, textDecoration: 'underline' }}>Privacy Policy</a>.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

// ─── Jobs sheet ───────────────────────────────────────────────────────────────

const JOBS = [
  { id: 1, name: 'Climate Control Unit 5B', status: 'In Progress' as const, date: 'Yesterday' },
  { id: 2, name: 'HVAC System — Floor 3', status: 'Complete' as const, date: 'May 26, 2026' },
  { id: 3, name: 'Electrical Panel Check', status: 'Complete' as const, date: 'May 22, 2026' },
  { id: 4, name: 'Plumbing Inspection B2', status: 'In Progress' as const, date: 'May 18, 2026' },
]

function JobsSheet({ onSelect, onClose }: { onSelect: (name: string) => void; onClose: () => void }) {
  const [jobName, setJobName] = useState('')

  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 flex flex-col overflow-hidden"
      style={{
        top: 72,
        background: AN.bg,
        borderRadius: '24px 24px 0 0',
        boxShadow: '0 -8px 32px rgba(31,25,21,0.12)',
        zIndex: 20,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
    >
      {/* Header */}
      <div className="flex items-center px-5 pt-5 pb-3 shrink-0">
        <button
          className="w-[36px] h-[36px] flex items-center justify-center shrink-0"
          style={{ background: AN.surface, border: `1px solid ${AN.border}`, borderRadius: 9999, boxShadow: '0 1px 2px rgba(31,25,21,0.04)' }}
          onClick={onClose}
        >
          <X size={16} style={{ color: AN.textSecondary }} />
        </button>
        <p style={{ flex: 1, textAlign: 'center', fontFamily: AN.font, fontSize: 17, fontWeight: 600, color: AN.ink }}>
          Jobs
        </p>
        <div className="w-[36px] shrink-0" />
      </div>

      <div className="overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden px-5 pb-6">
        {/* Subtitle */}
        <p style={{ fontFamily: AN.font, fontSize: 14, color: AN.textSecondary, lineHeight: 1.55, marginBottom: 20 }}>
          You can start a new job or continue working on one of previously created
        </p>

        {/* Create new job card */}
        <div
          className="flex flex-col gap-3 mb-6"
          style={{ padding: 20, background: AN.surface, borderRadius: 16, boxShadow: '0 2px 8px rgba(31,25,21,0.06)', border: `1px solid ${AN.border}` }}
        >
          <p style={{ fontFamily: AN.font, fontSize: 15, fontWeight: 600, color: AN.ink }}>New job name</p>
          <input
            value={jobName}
            onChange={e => setJobName(e.target.value)}
            placeholder="Job name"
            className="w-full outline-none"
            style={{
              background: AN.surface,
              border: `1px solid ${AN.borderStrong}`,
              borderRadius: 8,
              fontFamily: AN.font,
              fontSize: 15,
              color: AN.ink,
              height: 44,
              padding: '10px 14px',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = AN.coral; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(147,85,209,0.12)` }}
            onBlur={e => { e.currentTarget.style.borderColor = AN.borderStrong; e.currentTarget.style.boxShadow = 'none' }}
          />
          <button
            onClick={() => onSelect(jobName.trim() || 'New Job')}
            className="w-full flex items-center justify-center"
            style={{ background: 'linear-gradient(107deg, #533C8B -20.3%, #6366B8 102.76%)', borderRadius: 24, border: 'none', fontFamily: AN.font, fontSize: 14, fontWeight: 500, color: '#FFFFFE', height: 44, padding: '0 18px' }}
          >
            Create new job
          </button>
        </div>

        {/* Recent jobs */}
        <p style={{ fontFamily: AN.font, fontSize: 13, fontWeight: 500, color: AN.muted, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>
          Recent jobs
        </p>
        <div className="flex flex-col">
          {JOBS.map((job, i) => (
            <div key={job.id}>
              {i > 0 && <div style={{ height: 1, background: 'rgba(191,202,204,0.5)' }} />}
              <div
                className="flex items-center justify-between py-3 cursor-pointer"
                onClick={() => onSelect(job.name)}
              >
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <p style={{ fontFamily: AN.font, fontSize: 15, fontWeight: 600, color: AN.ink }}>{job.name}</p>
                  <div className="flex items-center gap-1.5">
                    <span style={{
                      fontFamily: AN.font, fontSize: 11, fontWeight: 500,
                      color: job.status === 'In Progress' ? '#B87320' : '#2D7A5E',
                      background: job.status === 'In Progress' ? '#FDF3E4' : '#E8F5ED',
                      borderRadius: 9999, padding: '2px 8px', whiteSpace: 'nowrap' as const,
                    }}>
                      {job.status}
                    </span>
                    <p style={{ fontFamily: AN.font, fontSize: 13, color: AN.muted }}>{job.date}</p>
                  </div>
                </div>
                <button style={{ color: AN.muted, padding: '4px' }}>
                  <MoreVertical size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Choose GIDR screen ───────────────────────────────────────────────────────

function AnthropicChooseGidrScreen({ onSelect }: { onSelect: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col overflow-hidden z-10"
      style={{ background: AN.bg }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: easeOut }}
    >
      <div className="px-5 pb-3 shrink-0" style={{ paddingTop: 'max(44px, env(safe-area-inset-top))' }}>
        <HeaderLogo />
        <p className="mt-2" style={{ fontFamily: AN.font, fontSize: 22, fontWeight: 500, color: AN.ink, lineHeight: 1.25, letterSpacing: '-0.01em' }}>
          Hi, Alex! Choose a GIDR
        </p>
        <p style={{ fontFamily: AN.font, fontSize: 13, color: AN.muted, marginTop: 2, letterSpacing: '0.005em' }}>
          {GIDR_ITEMS.length} available
        </p>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-6 pointer-events-none z-10"
          style={{ background: `linear-gradient(to bottom, ${AN.bg}, transparent)` }} />
        <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col gap-3 px-5 pt-1 pb-5">
            {GIDR_ITEMS.map((item, i) => (
              <AnthropicGidrCard key={i} {...item} onClick={onSelect} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-8 pointer-events-none z-10"
          style={{ background: `linear-gradient(to top, ${AN.bg}, transparent)` }} />
      </div>

      <div className="shrink-0 px-5 py-4" style={{ borderTop: `1px solid ${AN.border}` }}>
        <div className="inline-flex items-center gap-2 h-[36px] px-3"
          style={{ background: AN.surface, border: `1px solid ${AN.border}`, borderRadius: 9999, boxShadow: '0 1px 2px rgba(31,25,21,0.04)' }}>
          <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: AN.coral }}>
            <span style={{ fontFamily: AN.font, fontSize: 11, fontWeight: 500, color: '#FFFFFE', lineHeight: 1 }}>A</span>
          </div>
          <span style={{ fontFamily: AN.font, fontSize: 13, color: AN.textSecondary }}>Alex Tarasevich</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Menu screen ─────────────────────────────────────────────────────────────

function AnthropicMenuScreen({ onClose: _, currentJob, onJobSelect }: { onClose: () => void; currentJob: string; onJobSelect: (name: string) => void }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedGidr, setSelectedGidr] = useState(GIDR_ITEMS[0].title)

  return (
    <div className="absolute inset-y-0 left-0 w-[300px] flex flex-col overflow-hidden"
      style={{ background: AN.surface, borderRight: `1px solid ${AN.border}` }}>
      <div className="px-5 pt-3 pb-1.5 shrink-0"><HeaderLogo /></div>

      {/* GIDR selector */}
      <div className="px-5 mt-5 shrink-0 relative">
        <button
          className="w-full flex items-center h-[40px] px-3 gap-2"
          style={{
            background: AN.bgLight,
            border: `1px solid ${dropdownOpen ? AN.coral : AN.borderStrong}`,
            borderRadius: dropdownOpen ? '8px 8px 0 0' : 8,
            boxShadow: dropdownOpen ? `0 0 0 3px rgba(147,85,209,0.12)` : 'none',
          }}
          onClick={() => setDropdownOpen(v => !v)}
        >
          <span style={{ flex: 1, fontFamily: AN.font, fontSize: 14, color: AN.ink, textAlign: 'left', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', minWidth: 0 }}>{selectedGidr}</span>
          <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={14} strokeWidth={1.5} style={{ color: AN.muted }} />
          </motion.span>
        </button>

        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute left-5 right-5 z-20 overflow-hidden"
            style={{ background: AN.surface, border: `1px solid ${AN.coral}`, borderTop: 'none', borderRadius: '0 0 8px 8px', boxShadow: '0 8px 24px rgba(31,25,21,0.10)' }}
          >
            {GIDR_ITEMS.map((item, i) => (
              <button key={i} className="w-full text-left flex flex-col gap-0.5 px-3 py-2.5 transition-colors"
                style={{ background: selectedGidr === item.title ? AN.coralLight : 'transparent', borderTop: i > 0 ? `1px solid ${AN.border}` : 'none' }}
                onClick={() => { setSelectedGidr(item.title); setDropdownOpen(false) }}
              >
                <span style={{ fontFamily: AN.font, fontSize: 13, fontWeight: 500, color: AN.ink }}>{item.title}</span>
                <span style={{ fontFamily: AN.font, fontSize: 11, color: AN.muted, lineHeight: 1.4 }}>{item.description}</span>
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Recent Jobs */}
      <div className="px-5 mt-5 mb-2 shrink-0">
        <span style={{ fontFamily: AN.font, fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: AN.muted }}>
          Recent Jobs
        </span>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden px-5">
          <div className="flex flex-col">
            {JOBS.map((job, i) => {
              const isCurrent = job.name === currentJob
              return (
                <div key={job.id}>
                  {i > 0 && <div style={{ height: 1, background: 'rgba(191,202,204,0.5)' }} />}
                  <div
                    className="flex items-center justify-between py-2.5 cursor-pointer active:opacity-70 transition-opacity"
                    style={{ padding: '10px 0' }}
                    onClick={() => { if (!isCurrent) onJobSelect(job.name) }}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="flex flex-col gap-1.5 min-w-0">
                        <div className="flex items-center gap-2 min-w-0">
                          {isCurrent && (
                            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: AN.coral }} />
                          )}
                          <p style={{ fontFamily: AN.font, fontSize: 14, fontWeight: isCurrent ? 600 : 500, color: isCurrent ? AN.terracotta : AN.ink, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{job.name}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span style={{
                            fontFamily: AN.font, fontSize: 10, fontWeight: 500, whiteSpace: 'nowrap',
                            color: job.status === 'In Progress' ? '#B87320' : '#2D7A5E',
                            background: job.status === 'In Progress' ? '#FDF3E4' : '#E8F5ED',
                            borderRadius: 9999, padding: '2px 8px',
                          }}>{job.status}</span>
                          <p style={{ fontFamily: AN.font, fontSize: 12, color: AN.muted }}>{job.date}</p>
                        </div>
                      </div>
                    </div>
                    <button style={{ color: AN.muted, flexShrink: 0 }}><MoreVertical size={14} strokeWidth={1.5} /></button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 pt-3 flex items-center justify-between shrink-0"
        style={{ borderTop: `1px solid ${AN.border}` }}>
        <div className="flex items-center gap-2 h-[36px] px-3"
          style={{ background: AN.bgLight, border: `1px solid ${AN.border}`, borderRadius: 9999 }}>
          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: AN.coral }}>
            <span style={{ fontFamily: AN.font, fontSize: 11, fontWeight: 500, color: '#FFFFFE' }}>A</span>
          </div>
          <span style={{ fontFamily: AN.font, fontSize: 13, color: AN.textSecondary }}>Alex Tarasevich</span>
        </div>
        <button className="w-[36px] h-[36px] flex items-center justify-center"
          style={{ background: AN.bgLight, border: `1px solid ${AN.border}`, borderRadius: 9999 }}>
          <FolderPlus size={16} strokeWidth={1.5} style={{ color: AN.coral }} />
        </button>
      </div>
    </div>
  )
}

// ─── Landing screen ───────────────────────────────────────────────────────────

function AnthropicLandingScreen({ onProcedureSelect, jobName }: { onProcedureSelect: (title: string, instanceInfo?: { current: number; total: number }) => void; jobName: string }) {
  const [showMenu, setShowMenu] = useState(false)
  const [currentJob, setCurrentJob] = useState(jobName)
  const openMenu = () => setShowMenu(true)
  const [chipVisible, setChipVisible] = useState(true)
  const lastScrollY = useRef(0)
  const [summaryTitle, setSummaryTitle] = useState<string | null>(null)

  return (
    <div className="absolute inset-0 z-10" style={{ background: AN.bg }}>
      <AnimatePresence>
        {summaryTitle && (
          <ProcedureSummaryScreen key="landing-summary" title={summaryTitle} startedAt={new Date(Date.now() - 28 * 60 * 1000)} onClose={() => setSummaryTitle(null)} />
        )}
      </AnimatePresence>
      {showMenu && <AnthropicMenuScreen onClose={() => setShowMenu(false)} currentJob={currentJob} onJobSelect={(name) => { setCurrentJob(name); setShowMenu(false) }} />}

      <motion.div
        className="absolute inset-0 flex flex-col overflow-hidden"
        style={{ background: AN.bg }}
        initial={{ x: '100%' }}
        animate={{ x: showMenu ? 300 : 0, opacity: showMenu ? 0.5 : 1 }}
        transition={{ duration: 0.4, ease: easeOut }}
        onClick={undefined}
      >
        <div className="flex items-center px-5 pt-3 pb-2 shrink-0" style={{ borderBottom: `1px solid ${AN.border}` }}>
          <button
            className="w-[38px] h-[38px] flex items-center justify-center shrink-0"
            style={{ background: AN.surface, border: `1px solid ${AN.border}`, borderRadius: 9999, boxShadow: '0 1px 2px rgba(31,25,21,0.04)' }}
            onClick={() => setShowMenu(v => !v)}
          >
            <Menu size={16} style={{ color: AN.textSecondary }} />
          </button>
          <div className="flex-1 flex justify-center">
            <img src="/icons/company-logo.png" alt="Luxoft" style={{ height: 24, width: 'auto' }} />
          </div>
          <div className="w-[38px] shrink-0" />
        </div>

        <div className="flex-1 overflow-hidden relative">
          <div
            className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onScroll={e => {
              const y = (e.currentTarget as HTMLDivElement).scrollTop
              if (y > lastScrollY.current + 8) setChipVisible(false)
              else if (y < lastScrollY.current - 8) setChipVisible(true)
              lastScrollY.current = y
            }}
          >
            <div className="flex flex-col gap-5 px-5 pt-5 pb-20">
              {/* Single job chip — in flow, animates height+opacity on scroll */}
              <AnimatePresence initial={false}>
                {chipVisible && currentJob && (
                  <motion.div
                    key="job-chip"
                    className="flex justify-center overflow-hidden"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 44 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: easeOut }}
                    style={{ marginBottom: -10 }}
                  >
                    <button
                      onClick={openMenu}
                      className="inline-flex items-center gap-2 px-4 h-[36px]"
                      style={{ background: AN.surface, borderRadius: 12, boxShadow: '0 2px 8px rgba(31,25,21,0.10)', border: `1px solid ${AN.border}`, cursor: 'pointer' }}
                    >
                      <Folder size={14} strokeWidth={1.5} style={{ color: AN.muted }} />
                      <span style={{ fontFamily: AN.font, fontSize: 14, fontWeight: 500, color: AN.ink }}>{currentJob}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex flex-col gap-2">
                <p style={{ fontFamily: AN.font, fontSize: 20, fontWeight: 500, color: AN.ink, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                  Alex, these are your guided procedures
                </p>
                <p style={{ fontFamily: AN.font, fontSize: 14, color: AN.textSecondary, lineHeight: 1.65, letterSpacing: '0.005em' }}>
                  You have 1 mandatory procedure to take and several optional that may help you troubleshoot your work task.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {PROCEDURES.map((item, i) => (
                  <AnthropicProcedureCard
                    key={i}
                    {...item}
                    onClick={item.badges?.[0]?.label === 'Complete'
                      ? () => setSummaryTitle(item.title)
                      : () => onProcedureSelect(item.title, PROCEDURE_INSTANCE_INFO[item.title])
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-[60px] pointer-events-none z-10"
            style={{ background: `linear-gradient(to top, ${AN.bg}, transparent)` }} />
        </div>
        {/* Overlay absorbs taps when menu is open — sits above content so cards don't fire */}
        {showMenu && (
          <div className="absolute inset-0 z-20" onClick={() => setShowMenu(false)} />
        )}
      </motion.div>
    </div>
  )
}

// ─── Guided procedure data ────────────────────────────────────────────────────

const PROCEDURE_STEPS: { title: string; description: string; image?: string; options?: string[]; inputPlaceholder?: string; photoPrompt?: boolean; warning?: string; acknowledgement?: string; mandatory?: boolean; measurements?: { label: string; unit: string }[]; passFail?: boolean; checklist?: string[]; reviewStep?: boolean }[] = [
  { title: 'Verify safety equipment', description: 'Before beginning any work, confirm all personal protective equipment is in place. Check gloves, safety glasses, and any required hearing protection. Ensure all team members on-site are briefed on the procedure scope.' },
  {
    title: 'Power down the unit',
    description: 'Locate the main power switch — typically a red or black toggle mounted on the right side panel or near the base of the unit. Move the switch firmly to the OFF position and hold for 2 seconds.\n\nWait a full 30 seconds for residual electrical charge to fully dissipate through the internal capacitors. Do not skip this wait time even if the unit appears fully off.\n\nBefore proceeding, confirm the unit displays no active indicators — all LEDs should be dark, cooling fans silent, and the control panel unresponsive.',
    image: 'https://picsum.photos/seed/powerunit/400/200',
  },
  {
    title: 'Assess visible condition',
    description: 'Which of the following did you observe when opening the unit?',
    options: [
      'Signs of corrosion or rust on internal parts',
      'Debris or foreign objects inside the unit',
      'Damaged or frayed wiring',
      'Worn or cracked drive belt',
      'None of the above',
    ],
  },
  {
    title: 'Record machine serial number',
    description: 'Enter the serial number found on the identification plate inside the access panel.',
    inputPlaceholder: 'e.g. SN-2024-XXXX-001',
  },
  {
    title: 'Document component condition',
    description: 'Take a photo of the internal components before cleaning. This image will be attached to the service report.',
    photoPrompt: true,
  },
  {
    title: 'High voltage — safety check',
    description: 'The capacitor bank in this unit retains charge for up to 5 minutes after power-off. Do not touch any component marked with a high voltage symbol until the capacitor discharge indicator turns green.',
    warning: 'Failure to verify discharge before contact may result in serious injury or death.',
    acknowledgement: 'I confirm the discharge indicator is green and it is safe to proceed.',
    mandatory: true,
  },
  {
    title: 'Record operational readings',
    description: 'Take and record the following measurements from the diagnostic panel.',
    measurements: [
      { label: 'Operating temperature', unit: '°C' },
      { label: 'Supply voltage', unit: 'V' },
      { label: 'Current draw', unit: 'A' },
    ],
  },
  {
    title: 'Run print quality test',
    description: 'Print the diagnostic test page and assess the output quality.',
    passFail: true,
  },
  {
    title: 'Final checks before close-up',
    description: 'Confirm each item before reassembling the unit.',
    checklist: [
      'All cleaning tools removed from inside the unit',
      'No loose screws or components left inside',
      'Cable connectors fully seated',
      'Access panel mounting points clear of debris',
    ],
    mandatory: true,
  },
  {
    title: 'Review your entries',
    description: 'Summary of what was recorded in this procedure run.',
    reviewStep: true,
  },
]

// ─── Message types ────────────────────────────────────────────────────────────

type MsgType = 'system' | 'log' | 'skip' | 'user' | 'ai'
interface Msg { id: number; type: MsgType; text: string }

function getAIResponse(query: string, step: number): string {
  const q = query.toLowerCase()
  const s = PROCEDURE_STEPS[step]
  if (q.includes('how') || q.includes('what')) return `For ${s.title.toLowerCase()}: ${s.description.split('.')[0]}.`
  if (q.includes('skip') || q.includes('next')) return `I recommend completing each step in order for safety. You're on step ${step + 1} of ${PROCEDURE_STEPS.length}.`
  if (q.includes('help') || q.includes('stuck')) return `No worries — ${s.title.toLowerCase()} is straightforward. ${s.description.split('.')[0]}.`
  return `At step ${step + 1}, your focus should be: ${s.title.toLowerCase()}. Let me know if you need more detail.`
}

function MsgBubble({ msg }: { msg: Msg }) {
  if (msg.type === 'system') return (
    <div className="flex justify-center">
      <span style={{ fontFamily: AN.font, fontSize: 12, color: '#50506E', background: '#DDDDF8', borderRadius: 9999, padding: '4px 12px' }}>
        {msg.text}
      </span>
    </div>
  )
  if (msg.type === 'log') return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: '#FFFFFF', border: '1px solid #D1DDDF' }}>
        <span style={{ fontSize: 10, color: '#3D8B6E', lineHeight: 1 }}>✓</span>
      </div>
      <span style={{ fontFamily: AN.font, fontSize: 13, color: AN.textSecondary, lineHeight: 1.5 }}>{msg.text}</span>
    </div>
  )
  if (msg.type === 'skip') return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: '#FFFFFF', border: '1px solid #D1DDDF' }}>
        <span style={{ fontSize: 11, color: AN.muted, lineHeight: 1 }}>—</span>
      </div>
      <span style={{ fontFamily: AN.font, fontSize: 13, color: AN.muted, lineHeight: 1.5 }}>{msg.text}</span>
    </div>
  )
  if (msg.type === 'user') return (
    <div className="flex justify-end">
      <div style={{
        background: AN.surface,
        borderRadius: 14,
        padding: '10px 16px',
        maxWidth: '72%',
        boxShadow: '0 1px 3px rgba(31,25,21,0.08)',
      }}>
        <p style={{ fontFamily: AN.font, fontSize: 15, color: AN.ink, lineHeight: 1.45 }}>{msg.text}</p>
      </div>
    </div>
  )
  // AI message — no bubble, full-width text + action row
  return (
    <div className="flex flex-col gap-2.5">
      <p style={{ fontFamily: AN.font, fontSize: 16, color: AN.ink, lineHeight: 1.65 }}>{msg.text}</p>
      <div className="flex items-center gap-3">
        <button style={{ color: AN.muted, display: 'flex', padding: '4px' }}>
          <Copy size={15} strokeWidth={1.5} />
        </button>
        <button style={{ color: AN.muted, display: 'flex', padding: '4px' }}>
          <ThumbsUp size={15} strokeWidth={1.5} />
        </button>
        <button style={{ color: AN.muted, display: 'flex', padding: '4px' }}>
          <ThumbsDown size={15} strokeWidth={1.5} />
        </button>
        <span style={{ fontFamily: AN.font, fontSize: 13, fontWeight: 500, color: AN.coral }}>
          12 sources
        </span>
      </div>
    </div>
  )
}

// ─── Procedure summary screen ─────────────────────────────────────────────────

const SUMMARY_PARAGRAPHS = [
  'Technician confirmed all safety equipment was in place and the work area was prepared for the procedure.',
  'Unit was powered down and internal components inspected — no signs of damage or unusual wear were found.',
  'Access panel removed, print heads cleaned, and paper feed mechanism verified for smooth operation.',
  'Toner levels tested and confirmed above service threshold. No replacement was required at this visit.',
  'Unit reassembled, powered on, and self-test completed successfully with no error codes.',
  'All observations, service notes, and completion confirmation recorded in the field log.',
]

function fmt(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) +
    ' at ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function ProcedureSummaryScreen({ title, startedAt, onClose }: { title: string; startedAt: Date; onClose: () => void }) {
  const endedAt = new Date(startedAt.getTime() + 28 * 60 * 1000) // mock: +28 min
  const [rating, setRating] = useState<'up' | 'down' | null>(null)

  return (
    <motion.div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{ background: AN.bg, zIndex: 20 }}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 shrink-0"
        style={{ paddingTop: 'max(20px, env(safe-area-inset-top))', paddingBottom: 16, borderBottom: '1px solid #BFCACC' }}
      >
        <p style={{ fontFamily: AN.font, fontSize: 16, fontWeight: 500, color: AN.ink, flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {title}
        </p>
        <button
          className="w-[34px] h-[34px] flex items-center justify-center shrink-0"
          style={{ background: AN.surface, border: `1px solid ${AN.border}`, borderRadius: 9999, boxShadow: '0 1px 2px rgba(31,25,21,0.04)' }}
          onClick={onClose}
        >
          <X size={16} style={{ color: AN.textSecondary }} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
        <div className="px-5 pt-6 flex flex-col gap-6">

          {/* Title + copy buttons */}
          <div className="flex flex-col gap-3">
            <p style={{ fontFamily: AN.font, fontSize: 22, fontWeight: 600, color: AN.ink }}>Procedure summary</p>
            <div className="flex gap-3">
              {['Copy transcript', 'Copy summary'].map(label => (
                <button
                  key={label}
                  className="flex-1 flex items-center justify-center gap-2 h-[40px]"
                  style={{ border: `1.5px solid ${AN.coral}`, borderRadius: 8, background: 'transparent', fontFamily: AN.font, fontSize: 13, fontWeight: 500, color: AN.coral }}
                >
                  <Copy size={14} strokeWidth={1.5} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-col gap-4">
            {[
              { label: 'Procedure started:', value: fmt(startedAt) },
              { label: 'Procedure ended:', value: fmt(endedAt) },
              { label: 'Geolocation:', value: 'San Francisco, CA' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <p style={{ fontFamily: AN.font, fontSize: 14, color: AN.textSecondary }}>{label}</p>
                <p style={{ fontFamily: AN.font, fontSize: 16, fontWeight: 600, color: AN.ink }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Summary paragraphs */}
          <div className="flex flex-col gap-4">
            {SUMMARY_PARAGRAPHS.map((p, i) => (
              <p key={i} style={{ fontFamily: AN.font, fontSize: 15, color: AN.ink, lineHeight: 1.65 }}>{p}</p>
            ))}
          </div>

          {/* Feedback card */}
          <div
            className="flex flex-col items-center gap-3 px-5 py-6"
            style={{ background: AN.surface, borderRadius: 16, boxShadow: '0 2px 8px rgba(31,25,21,0.06)', border: `1px solid ${AN.border}` }}
          >
            <p style={{ fontFamily: AN.font, fontSize: 16, fontWeight: 600, color: AN.ink, textAlign: 'center' }}>
              How was your experience?
            </p>
            <p style={{ fontFamily: AN.font, fontSize: 13, color: AN.muted, textAlign: 'center', lineHeight: 1.55 }}>
              By telling us how it went you'll help train AI to perform better next time
            </p>
            <div className="flex gap-5 mt-1">
              <button
                onClick={() => setRating('up')}
                className="w-[56px] h-[56px] flex items-center justify-center"
                style={{ borderRadius: 9999, background: rating === 'up' ? AN.coralLight : '#E8F5ED', border: rating === 'up' ? `2px solid ${AN.coral}` : '2px solid transparent' }}
              >
                <ThumbsUp size={22} strokeWidth={1.5} style={{ color: rating === 'up' ? AN.coral : '#3D8B6E' }} />
              </button>
              <button
                onClick={() => setRating('down')}
                className="w-[56px] h-[56px] flex items-center justify-center"
                style={{ borderRadius: 9999, background: rating === 'down' ? '#FCEAEA' : '#FDE8E8', border: rating === 'down' ? '2px solid #D84C4C' : '2px solid transparent' }}
              >
                <ThumbsDown size={22} strokeWidth={1.5} style={{ color: '#D84C4C' }} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

// ─── Past run entry ───────────────────────────────────────────────────────────

function PastRunEntry({ runNumber, date, onOpenSummary }: { runNumber: number; date: string; onOpenSummary: () => void }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{ borderRadius: 10, border: '1px solid #C2C2E9', overflow: 'hidden' }}>
      <button
        className="w-full flex items-center justify-between px-4 py-3"
        onClick={() => setExpanded(v => !v)}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#2D7A5E' }} />
          <span style={{ fontFamily: AN.font, fontSize: 13, fontWeight: 500, color: AN.textSecondary }}>
            Run {runNumber} — Completed
          </span>
          <span style={{ fontFamily: AN.font, fontSize: 12, color: AN.muted }}>{date}</span>
        </div>
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} strokeWidth={1.5} style={{ color: AN.muted }} />
        </motion.span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 pb-4 flex flex-col gap-2.5" style={{ borderTop: '1px solid #C2C2E9', paddingTop: 12 }}>
              {SUMMARY_PARAGRAPHS.map((p, i) => (
                <p key={i} style={{ fontFamily: AN.font, fontSize: 13, color: AN.textSecondary, lineHeight: 1.6 }}>{p}</p>
              ))}
              <button
                onClick={e => { e.stopPropagation(); onOpenSummary() }}
                className="flex items-center justify-center w-full h-[38px] mt-1"
                style={{ border: `1.5px solid ${AN.coral}`, borderRadius: 9999, background: 'transparent', fontFamily: AN.font, fontSize: 13, fontWeight: 500, color: AN.coral }}
              >
                Summary
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Guided procedure screen ──────────────────────────────────────────────────

// collapsed height = handle (20px) + step label row (36px) = 56px
const PANEL_COLLAPSED = 56
const PANEL_DEFAULT = 240

function GuidedProcedureScreen({ title, onClose, instanceInfo }: { title: string; onClose: () => void; instanceInfo?: { current: number; total: number } }) {
  const [step, setStep] = useState(0)
  const [messages, setMessages] = useState<Msg[]>([
    { id: 0, type: 'system', text: `Procedure started — follow the steps below` },
  ])
  const [input, setInput] = useState('')
  const [panelHeight, setPanelHeight] = useState(PANEL_DEFAULT)
  const [collapsed, setCollapsed] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [pastSummaryRun, setPastSummaryRun] = useState<{ runNumber: number; date: string } | null>(null)
  const [startedAt] = useState(() => new Date())
  const [stepSelections, setStepSelections] = useState<Record<number, number[]>>({})
  const [stepInputs, setStepInputs] = useState<Record<number, string>>({})
  const [stepPhotos, setStepPhotos] = useState<Record<number, boolean>>({})
  const [stepMeasurements, setStepMeasurements] = useState<Record<number, string[]>>({})
  const [stepPassFail, setStepPassFail] = useState<Record<number, 'pass' | 'fail'>>({})
  const [stepFailNotes, setStepFailNotes] = useState<Record<number, string>>({})

  const currentSelections = stepSelections[step] ?? []
  const hasSelection = currentSelections.length > 0
  const currentOptions = PROCEDURE_STEPS[step].options
  const currentInputPlaceholder = PROCEDURE_STEPS[step].inputPlaceholder
  const currentInput = stepInputs[step] ?? ''
  const hasPhoto = stepPhotos[step] ?? false
  const currentMeasurements = PROCEDURE_STEPS[step].measurements
  const measurementValues = stepMeasurements[step] ?? []
  const allMeasurementsFilled = currentMeasurements ? currentMeasurements.every((_, i) => (measurementValues[i] ?? '').trim() !== '') : true
  const currentChecklist = PROCEDURE_STEPS[step].checklist
  const allChecked = currentChecklist ? currentSelections.length === currentChecklist.length : true

  const toggleOption = (optionIdx: number) => {
    setStepSelections(prev => {
      const current = prev[step] ?? []
      const updated = current.includes(optionIdx) ? current.filter(i => i !== optionIdx) : [...current, optionIdx]
      return { ...prev, [step]: updated }
    })
  }
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const [muted, setMuted] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dragRef = useRef<{ startY: number; startH: number } | null>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const chatInputRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(window.innerHeight)
  const [chatInputHeight, setChatInputHeight] = useState(200)

  useEffect(() => {
    const observers: ResizeObserver[] = []
    if (containerRef.current) {
      const ro = new ResizeObserver(entries => setContainerHeight(entries[0].contentRect.height))
      ro.observe(containerRef.current)
      observers.push(ro)
    }
    if (chatInputRef.current) {
      const el = chatInputRef.current
      const ro = new ResizeObserver(() => setChatInputHeight(el.offsetHeight))
      ro.observe(el)
      observers.push(ro)
    }
    return () => observers.forEach(ro => ro.disconnect())
  }, [])


  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const handleNext = () => {
    if (step >= PROCEDURE_STEPS.length - 1) {
      setShowSummary(true)
      return
    }
    const done = step
    const skipped = isSkip
    setStep(s => s + 1)
    setMessages(m => [...m, {
      id: Date.now(),
      type: skipped ? 'skip' : 'log',
      text: skipped
        ? `Step ${done + 1} skipped: ${PROCEDURE_STEPS[done].title}`
        : `Step ${done + 1} completed: ${PROCEDURE_STEPS[done].title}`,
    }])
  }

  const handleBack = () => { if (step > 0) setStep(s => s - 1) }

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages(m => [...m, { id: Date.now(), type: 'user', text }])
    setTimeout(() => {
      setMessages(m => [...m, { id: Date.now() + 1, type: 'ai', text: getAIResponse(text, step) }])
    }, 800)
  }

  const headerH = instanceInfo ? 64 : 56
  const panelMaxH = Math.max(containerHeight - headerH - chatInputHeight, PANEL_COLLAPSED + 20)

  const onHandleDown = (e: React.PointerEvent) => {
    if (collapsed) { setCollapsed(false); return }
    dragRef.current = { startY: e.clientY, startH: panelHeight }
    const onMove = (ev: PointerEvent) => {
      if (!dragRef.current) return
      const delta = dragRef.current.startY - ev.clientY
      const next = Math.max(PANEL_COLLAPSED + 20, Math.min(panelMaxH, dragRef.current.startH + delta))
      setPanelHeight(next)
    }
    const onUp = (ev: PointerEvent) => {
      if (dragRef.current) {
        const delta = dragRef.current.startY - ev.clientY
        const finalH = Math.max(PANEL_COLLAPSED + 20, Math.min(panelMaxH, dragRef.current.startH + delta))
        if (delta < -60) {
          setCollapsed(true)
        } else if (finalH > panelMaxH * 0.85) {
          setPanelHeight(panelMaxH)
        }
      }
      dragRef.current = null
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const isLast = step >= PROCEDURE_STEPS.length - 1
  const isSkip = (!!currentOptions && !hasSelection)
    || (!!currentInputPlaceholder && !currentInput.trim())
    || (!!PROCEDURE_STEPS[step].photoPrompt && !hasPhoto)
    || (!!PROCEDURE_STEPS[step].acknowledgement && !hasSelection)
    || (!!currentMeasurements && !allMeasurementsFilled)
    || (!!PROCEDURE_STEPS[step].passFail && !stepPassFail[step])
    || (!!currentChecklist && !allChecked)
  const isBlocked = isSkip && !!PROCEDURE_STEPS[step].mandatory
  const currentPanelH = voiceMode ? 0 : (collapsed ? PANEL_COLLAPSED : Math.min(panelHeight, panelMaxH))

  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      style={{ background: AN.bg }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      {/* Summary overlay — slides up on complete */}
      <AnimatePresence>
        {showSummary && (
          <ProcedureSummaryScreen
            key="summary"
            title={title}
            startedAt={startedAt}
            onClose={onClose}
          />
        )}
        {pastSummaryRun && (
          <ProcedureSummaryScreen
            key={`past-summary-${pastSummaryRun.runNumber}`}
            title={`${title} — Run ${pastSummaryRun.runNumber}`}
            startedAt={new Date(`${pastSummaryRun.date} 09:00`)}
            onClose={() => setPastSummaryRun(null)}
          />
        )}
      </AnimatePresence>
      {/* Procedure screen content */}
      <div ref={containerRef} className="absolute inset-0 flex flex-col min-h-0" style={{ background: AN.bg }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 shrink-0"
        style={{ minHeight: 56, paddingTop: 10, paddingBottom: 10, borderBottom: '1px solid #BFCACC' }}>
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: AN.font, fontSize: 15, fontWeight: 500, color: AN.ink, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {title}
          </p>
          {instanceInfo && (
            <p style={{ fontFamily: AN.font, fontSize: 12, color: AN.muted, marginTop: 1 }}>
              Run {instanceInfo.current} of {instanceInfo.total}
            </p>
          )}
        </div>
        <button
          className="w-[34px] h-[34px] flex items-center justify-center shrink-0"
          style={{ background: AN.surface, border: `1px solid ${AN.border}`, borderRadius: 9999, boxShadow: '0 1px 2px rgba(31,25,21,0.04)' }}
          onClick={onClose}
        >
          <X size={16} style={{ color: AN.textSecondary }} />
        </button>
      </div>

      {/* Chat / log area — single div, content switches based on voiceMode */}
      <div
        ref={chatRef}
        className="flex flex-col gap-4 px-5 py-4 [&::-webkit-scrollbar]:hidden"
        style={{
          flex: 1, overflowY: 'auto', minHeight: 0, WebkitOverflowScrolling: 'touch',
          ...(voiceMode ? {
            backgroundColor: AN.bg,
            backgroundImage: 'radial-gradient(circle, rgba(130,120,200,0.28) 1.2px, transparent 1.2px)',
            backgroundSize: '18px 18px',
          } : {}),
        } as React.CSSProperties}
      >
        {voiceMode ? (
          <>
            {/* AI message — directly on dotted bg */}
            <div className="flex flex-col gap-2 pt-1">
              <p style={{ fontFamily: AN.font, fontSize: 16, fontWeight: 700, color: AN.ink, lineHeight: 1.3 }}>
                {PROCEDURE_STEPS[step].title}
              </p>
              <p style={{ fontFamily: AN.font, fontSize: 14, color: AN.textSecondary, lineHeight: 1.6 }}>
                {PROCEDURE_STEPS[step].description.split('\n\n')[0]}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <button style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={AN.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </button>
                <button style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={AN.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                </button>
                <button style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={AN.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
                </button>
                <span style={{ fontFamily: AN.font, fontSize: 12, color: AN.coral, fontWeight: 500 }}>12 sources</span>
              </div>
            </div>
            {/* Listening indicator */}
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-5 h-5 flex items-center justify-center shrink-0"
                style={{ borderRadius: 9999, border: `1.5px solid ${AN.coral}` }}
              >
                <svg width="7" height="8" viewBox="0 0 7 8" fill="none"><polygon points="1,0.5 6.5,4 1,7.5" fill={AN.coral} /></svg>
              </motion.div>
              <span style={{ fontFamily: AN.font, fontSize: 14, color: AN.textSecondary }}>Listening ...</span>
            </div>
          </>
        ) : (
          <>
            {instanceInfo && (
              <>
                <div className="flex flex-col gap-2">
                  {PAST_RUNS.slice(0, instanceInfo.current - 1).map(run => (
                    <PastRunEntry key={run.runNumber} {...run} onOpenSummary={() => setPastSummaryRun(run)} />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px" style={{ background: AN.border }} />
                  <span style={{ fontFamily: AN.font, fontSize: 11, fontWeight: 500, color: AN.muted, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Run {instanceInfo.current}
                  </span>
                  <div className="flex-1 h-px" style={{ background: AN.border }} />
                </div>
              </>
            )}
            {messages.map(msg => <MsgBubble key={msg.id} msg={msg} />)}
          </>
        )}
      </div>

      {/* Bottom block — shrink-0 in flow, visually floating */}
      <div
        className="shrink-0"
        style={{ background: voiceMode ? 'transparent' : AN.surface, borderRadius: voiceMode ? 0 : '16px 16px 0 0', boxShadow: voiceMode ? 'none' : '0 -4px 20px rgba(31,25,21,0.08)' }}
      >
          {/* Step panel — animated height */}
          <motion.div
            className="overflow-hidden"
            animate={{ height: currentPanelH }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          >
            {/* Drag handle — hidden in voice mode */}
            {!voiceMode && (
              <div
                className="flex items-center justify-center shrink-0"
                style={{ height: 28, touchAction: 'none', cursor: 'ns-resize' }}
                onPointerDown={e => { e.preventDefault(); onHandleDown(e) }}
              >
                <div style={{ width: 36, height: 4, background: AN.borderStrong, borderRadius: 9999, marginTop: 8 }} />
              </div>
            )}

            {/* Step counter row — no collapse in voice mode */}
            <div
              className="flex items-center justify-between px-5 shrink-0"
              style={{ height: 44, touchAction: voiceMode ? 'auto' : 'none', cursor: voiceMode ? 'default' : 'pointer', marginTop: voiceMode ? 12 : 0 }}
              onPointerDown={voiceMode ? undefined : e => { e.preventDefault(); onHandleDown(e) }}
              onClick={voiceMode ? undefined : () => setCollapsed(v => !v)}
            >
              <p style={{ fontFamily: AN.font, fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: AN.coral }}>
                Step {step + 1} of {PROCEDURE_STEPS.length} — {PROCEDURE_STEPS[step].title}
              </p>
              {!voiceMode && (
                <span style={{ fontFamily: AN.font, fontSize: 14, color: AN.muted, lineHeight: 1 }}>
                  {collapsed ? '↑' : '↓'}
                </span>
              )}
            </div>

            {/* Listening indicator — voice mode only */}
            {voiceMode && (
              <div className="flex items-center gap-2 px-5 pb-3">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-4 h-4 flex items-center justify-center"
                  style={{ borderRadius: 9999, background: AN.coral }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <polygon points="2,1 7,4 2,7" fill="white" />
                  </svg>
                </motion.div>
                <span style={{ fontFamily: AN.font, fontSize: 13, color: AN.textSecondary }}>Listening ...</span>
              </div>
            )}

            {/* Expanded content */}
            {!collapsed && (
              <div className="flex flex-col px-5 pb-4" style={{ height: currentPanelH - 72 }}>
                <p style={{ fontFamily: AN.font, fontSize: 16, fontWeight: 600, color: AN.ink, lineHeight: 1.3, marginBottom: 8, flexShrink: 0 }}>
                  {PROCEDURE_STEPS[step].title}
                </p>
                <div className="flex-1 overflow-y-auto min-h-0 [&::-webkit-scrollbar]:hidden flex flex-col gap-3" style={{ marginBottom: 8 }}>
                  {PROCEDURE_STEPS[step].description.split('\n\n').map((para, i) => (
                    <p key={i} style={{ fontFamily: AN.font, fontSize: 13, color: AN.textSecondary, lineHeight: 1.65 }}>{para}</p>
                  ))}
                  {PROCEDURE_STEPS[step].image && (
                    <img
                      src={PROCEDURE_STEPS[step].image}
                      alt=""
                      className="w-full object-cover shrink-0"
                      style={{ borderRadius: 10, border: `1px solid ${AN.border}` }}
                    />
                  )}
                  {PROCEDURE_STEPS[step].photoPrompt && (
                    !hasPhoto ? (
                      <div
                        className="flex flex-col items-center justify-center gap-3 py-6 cursor-pointer"
                        style={{ border: `1.5px dashed ${AN.borderStrong}`, borderRadius: 12 }}
                        onClick={() => setStepPhotos(prev => ({ ...prev, [step]: true }))}
                      >
                        <Camera size={26} strokeWidth={1.5} style={{ color: AN.muted }} />
                        <p style={{ fontFamily: AN.font, fontSize: 13, color: AN.muted, textAlign: 'center', lineHeight: 1.5 }}>
                          Tap to capture or upload
                        </p>
                        <div className="flex gap-2">
                          {['Take photo', 'Upload'].map(label => (
                            <button key={label} className="px-4 h-[34px]"
                              style={{ border: `1.5px solid ${AN.borderStrong}`, borderRadius: 9999, fontFamily: AN.font, fontSize: 12, fontWeight: 500, color: AN.textSecondary, background: 'transparent' }}>
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <img src="https://picsum.photos/seed/component/400/200" alt="" className="w-full object-cover"
                          style={{ borderRadius: 10, border: `1px solid ${AN.border}` }} />
                        <button
                          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center"
                          style={{ background: 'rgba(31,25,21,0.55)', borderRadius: 9999 }}
                          onClick={() => setStepPhotos(prev => ({ ...prev, [step]: false }))}
                        >
                          <X size={13} style={{ color: '#FFFFFE' }} />
                        </button>
                      </div>
                    )
                  )}
                  {PROCEDURE_STEPS[step].warning && (
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-3 px-4 py-3" style={{ background: '#FEF3E2', border: '1px solid #F59E0B', borderRadius: 10 }}>
                        <AlertTriangle size={16} strokeWidth={1.5} style={{ color: '#B45309', flexShrink: 0, marginTop: 1 }} />
                        <p style={{ fontFamily: AN.font, fontSize: 13, color: '#92400E', lineHeight: 1.55 }}>
                          {PROCEDURE_STEPS[step].warning}
                        </p>
                      </div>
                      {PROCEDURE_STEPS[step].acknowledgement && (
                        <button
                          className="w-full flex items-center gap-3 px-4 py-3 text-left"
                          style={{
                            background: hasSelection ? AN.coralLight : AN.surface,
                            border: `1.5px solid ${hasSelection ? AN.coral : AN.borderStrong}`,
                            borderRadius: 10,
                          }}
                          onClick={() => toggleOption(0)}
                        >
                          <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, background: hasSelection ? AN.coral : 'transparent', border: `1.5px solid ${hasSelection ? AN.coral : AN.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {hasSelection && <span style={{ color: '#FFFFFE', fontSize: 11, fontWeight: 700, lineHeight: 1 }}>✓</span>}
                          </div>
                          <span style={{ fontFamily: AN.font, fontSize: 13, color: AN.ink, lineHeight: 1.45 }}>
                            {PROCEDURE_STEPS[step].acknowledgement}
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                  {currentInputPlaceholder && (
                    <input
                      value={currentInput}
                      onChange={e => setStepInputs(prev => ({ ...prev, [step]: e.target.value }))}
                      placeholder={currentInputPlaceholder}
                      className="w-full outline-none transition-all"
                      style={{
                        background: AN.surface,
                        border: `1px solid ${AN.borderStrong}`,
                        borderRadius: 8,
                        fontFamily: AN.font,
                        fontSize: 15,
                        color: AN.ink,
                        height: 44,
                        padding: '10px 14px',
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = AN.coral; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(147,85,209,0.12)` }}
                      onBlur={e => { e.currentTarget.style.borderColor = AN.borderStrong; e.currentTarget.style.boxShadow = 'none' }}
                    />
                  )}
                  {currentMeasurements && (
                    <div className="flex flex-col gap-3">
                      {currentMeasurements.map((m, i) => (
                        <div key={i} className="flex flex-col gap-1.5">
                          <label style={{ fontFamily: AN.font, fontSize: 12, fontWeight: 500, color: AN.muted }}>{m.label}</label>
                          <div className="flex items-center overflow-hidden" style={{ border: `1px solid ${AN.borderStrong}`, borderRadius: 8 }}>
                            <input
                              type="number"
                              value={measurementValues[i] ?? ''}
                              onChange={e => setStepMeasurements(prev => {
                                const arr = [...(prev[step] ?? [])]
                                arr[i] = e.target.value
                                return { ...prev, [step]: arr }
                              })}
                              placeholder="0"
                              className="flex-1 outline-none"
                              style={{ background: AN.surface, fontFamily: AN.font, fontSize: 15, color: AN.ink, height: 44, padding: '10px 14px' }}
                              onFocus={e => { e.currentTarget.parentElement!.style.borderColor = AN.coral; e.currentTarget.parentElement!.style.boxShadow = `0 0 0 3px rgba(147,85,209,0.12)` }}
                              onBlur={e => { e.currentTarget.parentElement!.style.borderColor = AN.borderStrong; e.currentTarget.parentElement!.style.boxShadow = 'none' }}
                            />
                            <div className="flex items-center justify-center px-4 shrink-0" style={{ height: 44, background: AN.bgLight, borderLeft: `1px solid ${AN.borderStrong}` }}>
                              <span style={{ fontFamily: AN.font, fontSize: 13, fontWeight: 500, color: AN.textSecondary }}>{m.unit}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {PROCEDURE_STEPS[step].passFail && (
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        {(['pass', 'fail'] as const).map(val => {
                          const selected = stepPassFail[step] === val
                          const isPass = val === 'pass'
                          return (
                            <button
                              key={val}
                              className="flex-1 flex items-center justify-center gap-2 h-[60px]"
                              style={{
                                background: selected ? (isPass ? '#E8F5ED' : '#FCEAEA') : AN.surface,
                                border: `1.5px solid ${selected ? (isPass ? '#2D7A5E' : '#D84C4C') : AN.borderStrong}`,
                                borderRadius: 10,
                              }}
                              onClick={() => setStepPassFail(prev => ({ ...prev, [step]: val }))}
                            >
                              <span style={{ fontSize: 16 }}>{isPass ? '✓' : '✕'}</span>
                              <span style={{ fontFamily: AN.font, fontSize: 14, fontWeight: 600, color: selected ? (isPass ? '#2D7A5E' : '#D84C4C') : AN.textSecondary }}>
                                {isPass ? 'Pass' : 'Fail'}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                      {stepPassFail[step] === 'fail' && (
                        <textarea
                          value={stepFailNotes[step] ?? ''}
                          onChange={e => setStepFailNotes(prev => ({ ...prev, [step]: e.target.value }))}
                          placeholder="Describe the issue..."
                          rows={3}
                          className="w-full outline-none resize-none"
                          style={{ background: AN.surface, border: `1px solid ${AN.borderStrong}`, borderRadius: 8, fontFamily: AN.font, fontSize: 13, color: AN.ink, padding: '10px 14px', lineHeight: 1.55 }}
                          onFocus={e => { e.currentTarget.style.borderColor = AN.coral; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(147,85,209,0.12)` }}
                          onBlur={e => { e.currentTarget.style.borderColor = AN.borderStrong; e.currentTarget.style.boxShadow = 'none' }}
                        />
                      )}
                    </div>
                  )}
                  {currentChecklist && (
                    <div className="flex flex-col gap-2">
                      {currentChecklist.map((item, i) => {
                        const checked = currentSelections.includes(i)
                        return (
                          <button
                            key={i}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left"
                            style={{
                              background: checked ? '#E8F5ED' : AN.surface,
                              border: `1.5px solid ${checked ? '#2D7A5E' : AN.borderStrong}`,
                              borderRadius: 10,
                            }}
                            onClick={() => toggleOption(i)}
                          >
                            <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, background: checked ? '#2D7A5E' : 'transparent', border: `1.5px solid ${checked ? '#2D7A5E' : AN.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {checked && <span style={{ color: '#FFFFFE', fontSize: 11, fontWeight: 700, lineHeight: 1 }}>✓</span>}
                            </div>
                            <span style={{ fontFamily: AN.font, fontSize: 13, color: AN.ink, lineHeight: 1.45 }}>{item}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                  {PROCEDURE_STEPS[step].reviewStep && (
                    <div className="flex flex-col gap-2">
                      {[
                        { label: 'Serial number', value: stepInputs[3] || '—' },
                        { label: 'Photo', value: stepPhotos[4] ? 'Captured' : 'Skipped' },
                        ...(PROCEDURE_STEPS[6].measurements ?? []).map((m, i) => ({
                          label: m.label,
                          value: (stepMeasurements[6]?.[i] ?? '') ? `${stepMeasurements[6][i]} ${m.unit}` : '—',
                        })),
                        {
                          label: 'Quality test',
                          value: stepPassFail[7]
                            ? stepPassFail[7] === 'pass' ? 'Pass' : `Fail${stepFailNotes[7] ? ` — ${stepFailNotes[7]}` : ''}`
                            : 'Skipped',
                        },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ background: AN.surface, border: `1px solid ${AN.border}`, borderRadius: 8, padding: '10px 14px' }}>
                          <p style={{ fontFamily: AN.font, fontSize: 11, fontWeight: 500, color: AN.muted, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</p>
                          <p style={{ fontFamily: AN.font, fontSize: 14, color: AN.ink }}>{value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {currentOptions && (
                    <div className="flex flex-col gap-2">
                      {currentOptions.map((option, i) => {
                        const selected = currentSelections.includes(i)
                        return (
                          <button
                            key={i}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left"
                            style={{
                              background: selected ? AN.coralLight : AN.surface,
                              border: `1.5px solid ${selected ? AN.coral : AN.borderStrong}`,
                              borderRadius: 10,
                            }}
                            onClick={() => toggleOption(i)}
                          >
                            <div style={{
                              width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                              background: selected ? AN.coral : 'transparent',
                              border: `1.5px solid ${selected ? AN.coral : AN.borderStrong}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              {selected && <span style={{ color: '#FFFFFE', fontSize: 11, lineHeight: 1, fontWeight: 700 }}>✓</span>}
                            </div>
                            <span style={{ fontFamily: AN.font, fontSize: 13, color: AN.ink, lineHeight: 1.45 }}>{option}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
                {!voiceMode && (
                  <div className="flex items-center justify-between shrink-0">
                    <button
                      onClick={handleBack}
                      disabled={step === 0}
                      style={{ fontFamily: AN.font, fontSize: 13, fontWeight: 500, color: step === 0 ? AN.borderStrong : AN.ink, background: 'none', border: `1.5px solid ${step === 0 ? AN.borderStrong : AN.muted}`, borderRadius: 9999, padding: '11px 20px', cursor: step === 0 ? 'default' : 'pointer' }}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={isBlocked ? undefined : handleNext}
                      className="flex items-center gap-1.5"
                      style={{ fontFamily: AN.font, fontSize: 13, fontWeight: 600, color: '#FFFFFE', background: isBlocked ? AN.borderStrong : isSkip ? AN.muted : AN.secondary, borderRadius: 9999, border: 'none', padding: '12px 20px', cursor: isBlocked ? 'default' : 'pointer', opacity: isBlocked ? 0.7 : 1 }}
                    >
                      {isLast ? 'Complete' : (isSkip && !isBlocked) ? 'Skip' : 'Next'}
                      {!isLast && (!isSkip || isBlocked) && <ArrowRight size={14} />}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Attachment menu — slides up above input */}
          <AnimatePresence>
            {showAttachMenu && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.2, ease: easeOut }}
                className="px-4 pb-2"
              >
                <div
                  className="grid grid-cols-3 gap-3 p-4"
                  style={{ background: AN.surface, borderRadius: 16, boxShadow: '0 4px 16px rgba(31,25,21,0.10)', border: `1px solid ${AN.border}` }}
                >
                  {[
                    { icon: Camera, label: 'Camera' },
                    { icon: Image, label: 'Photos' },
                    { icon: FileText, label: 'Files' },
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      className="flex flex-col items-center gap-2 py-3"
                      style={{ background: AN.coralLight, borderRadius: 12 }}
                      onClick={() => setShowAttachMenu(false)}
                    >
                      <Icon size={24} strokeWidth={1.5} style={{ color: AN.coral }} />
                      <span style={{ fontFamily: AN.font, fontSize: 13, fontWeight: 500, color: AN.ink }}>{label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat input — swaps between text and voice bar */}
          <div
            ref={chatInputRef}
            className="px-4"
            style={{ paddingTop: 10, paddingBottom: 'max(16px, env(safe-area-inset-bottom))', pointerEvents: 'auto' }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {!voiceMode ? (
                <motion.div
                  key="text-input"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                  className="flex flex-col px-3 pt-3 pb-2"
                  style={{
                    background: AN.surface, borderRadius: 24,
                    border: `1.5px solid ${AN.coral}`,
                    boxShadow: `0 0 0 3px rgba(147,85,209,0.10)`,
                    maxHeight: 400,
                  }}
                >
                  <textarea
                    ref={textareaRef}
                    value={input}
                    rows={1}
                    onChange={e => {
                      setInput(e.target.value)
                      const el = e.target
                      el.style.height = 'auto'
                      el.style.height = Math.min(el.scrollHeight, 320) + 'px'
                    }}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); if (textareaRef.current) textareaRef.current.style.height = '36px' } }}
                    placeholder="Chat with GIDR"
                    className="w-full bg-transparent outline-none resize-none overflow-y-auto"
                    style={{ fontFamily: AN.font, fontSize: 14, color: AN.ink, lineHeight: 1.55, minHeight: 36, maxHeight: 320, paddingBottom: 8 }}
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      className="w-[36px] h-[36px] flex items-center justify-center shrink-0"
                      style={{ background: AN.coralLight, borderRadius: 9999 }}
                      onClick={() => setShowAttachMenu(v => !v)}
                    >
                      <Plus size={16} style={{ color: AN.coral }} />
                    </button>
                    <div className="flex-1" />
                    <button className="w-[36px] h-[36px] flex items-center justify-center shrink-0" style={{ background: AN.coralLight, borderRadius: 9999 }}>
                      <Mic size={16} style={{ color: AN.coral }} />
                    </button>
                    <button
                      onClick={() => {
                        if (!input.trim()) { setVoiceMode(true); setCollapsed(false) }
                        else { handleSend(); if (textareaRef.current) textareaRef.current.style.height = '36px' }
                      }}
                      className="w-[38px] h-[38px] flex items-center justify-center shrink-0"
                      style={{ background: 'linear-gradient(107deg, #533C8B -20.3%, #6366B8 102.76%)', borderRadius: 24 }}
                    >
                      {input.trim() ? (
                        <Send size={16} style={{ color: '#FFFFFE' }} />
                      ) : (
                        <svg width="18" height="14" viewBox="0 0 20 14" fill="none">
                          <rect x="0" y="4" width="3" height="6" rx="1.5" fill="white" />
                          <rect x="4.5" y="1" width="3" height="12" rx="1.5" fill="white" />
                          <rect x="9" y="3" width="3" height="8" rx="1.5" fill="white" />
                          <rect x="13.5" y="0" width="3" height="14" rx="1.5" fill="white" />
                          <rect x="18" y="4" width="3" height="6" rx="1.5" fill="white" />
                        </svg>
                      )}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="voice-bar"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                  className="flex items-center gap-3"
                  style={{ height: 56 }}
                >
                  {/* Attach */}
                  <button
                    className="w-[48px] h-[48px] flex items-center justify-center shrink-0"
                    style={{ background: AN.surface, borderRadius: 9999, boxShadow: '0 2px 8px rgba(31,25,21,0.10)' }}
                  >
                    <Plus size={20} style={{ color: AN.ink }} />
                  </button>
                  <div className="flex-1" />
                  {/* Mute/unmute */}
                  <button
                    className="w-[48px] h-[48px] flex items-center justify-center shrink-0"
                    style={{ background: AN.surface, borderRadius: 9999, boxShadow: '0 2px 8px rgba(31,25,21,0.10)', opacity: muted ? 0.45 : 1 }}
                    onClick={() => setMuted(v => !v)}
                  >
                    <Mic size={20} style={{ color: AN.ink }} />
                  </button>
                  {/* Stop */}
                  <button
                    className="flex items-center justify-center gap-2 h-[48px] px-5 shrink-0"
                    style={{ background: 'linear-gradient(107deg, #533C8B -20.3%, #6366B8 102.76%)', borderRadius: 9999, minWidth: 120 }}
                    onClick={() => { setVoiceMode(false); setMuted(false) }}
                  >
                    <span style={{ fontFamily: AN.font, fontSize: 15, fontWeight: 600, color: '#FFFFFE' }}>Stop</span>
                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                      <rect x="0" y="4" width="3" height="6" rx="1.5" fill="white" />
                      <rect x="4.5" y="1" width="3" height="12" rx="1.5" fill="white" />
                      <rect x="9" y="3" width="3" height="8" rx="1.5" fill="white" />
                      <rect x="13.5" y="0" width="3" height="14" rx="1.5" fill="white" />
                      <rect x="18" y="4" width="3" height="6" rx="1.5" fill="white" />
                    </svg>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Voice mode glow border */}
      <AnimatePresence>
        {voiceMode && (
          <>
            <style>{`@keyframes voice-glow{0%,100%{opacity:.7}50%{opacity:1}}`}</style>
            <motion.div
              key="voice-glow"
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                borderRadius: 'inherit',
                border: '2.5px solid #A855C8',
                boxShadow: '0 0 20px rgba(168,85,200,0.5), inset 0 0 20px rgba(99,102,184,0.08)',
                animation: 'voice-glow 2.2s ease-in-out infinite',
                zIndex: 50,
                pointerEvents: 'none',
              }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}


// ─── Mobile export (no phone frame — for testing on real device) ─────────────

export function OnboardingScreenAnthropicMobile() {
  const [screen, setScreen] = useState<'login' | 'gidr-select' | 'jobs' | 'gidr-landing' | 'procedure'>('login')
  const [procedureTitle, setProcedureTitle] = useState('')
  const [procedureInstanceInfo, setProcedureInstanceInfo] = useState<{ current: number; total: number } | undefined>()
  const [jobName, setJobName] = useState('')
  const innerRef = useRef<HTMLDivElement>(null)

  const getUsableHeight = () => {
    const vv = window.visualViewport
    if (vv) {
      // bottom chrome height = layout viewport bottom minus visual viewport bottom
      const bottomChrome = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop))
      return window.innerHeight - bottomChrome
    }
    return window.innerHeight
  }

  const [phoneHeight, setPhoneHeight] = useState(getUsableHeight)

  useEffect(() => {
    const update = () => setPhoneHeight(getUsableHeight())
    window.visualViewport?.addEventListener('resize', update)
    window.visualViewport?.addEventListener('scroll', update)
    window.addEventListener('resize', update)
    return () => {
      window.visualViewport?.removeEventListener('resize', update)
      window.visualViewport?.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      ref={innerRef}
      className="overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: phoneHeight,
        background: AN.bg,
      }}
    >
      <AnimatePresence>
        {screen === 'login' && (
          <AnthropicLoginScreen key="login" onLogin={() => setScreen('gidr-select')} phoneHeight={phoneHeight} />
        )}
        {(screen === 'gidr-select' || screen === 'jobs') && (
          <AnthropicChooseGidrScreen key="gidr" onSelect={() => setScreen('jobs')} />
        )}
        {screen === 'gidr-landing' && (
          <AnthropicLandingScreen key="landing" jobName={jobName} onProcedureSelect={(title, info) => { setProcedureTitle(title); setProcedureInstanceInfo(info); setScreen('procedure') }} />
        )}
        {screen === 'procedure' && (
          <GuidedProcedureScreen key="procedure" title={procedureTitle} instanceInfo={procedureInstanceInfo} onClose={() => setScreen('gidr-landing')} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {screen === 'jobs' && (
          <>
            <motion.div
              key="jobs-overlay"
              className="absolute inset-0"
              style={{ background: 'rgba(31,25,21,0.4)', zIndex: 19 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setScreen('gidr-select')}
            />
            <JobsSheet
              key="jobs"
              onSelect={(name) => { setJobName(name); setScreen('gidr-landing') }}
              onClose={() => setScreen('gidr-select')}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function OnboardingScreenAnthropic() {
  const [screen, setScreen] = useState<'login' | 'gidr-select' | 'jobs' | 'gidr-landing' | 'procedure'>('login')
  const [procedureTitle, setProcedureTitle] = useState('')
  const innerRef = useRef<HTMLDivElement>(null)
  const [phoneHeight, setPhoneHeight] = useState(812)

  useEffect(() => {
    if (!innerRef.current) return
    const ro = new ResizeObserver(entries => setPhoneHeight(entries[0].contentRect.height))
    ro.observe(innerRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="flex items-center justify-center h-screen" style={{ background: '#EDE8DF' }}>
      <div
        className="relative w-[375px] h-[calc(100vh-2rem)] max-h-[812px] rounded-[50px] overflow-hidden"
        style={{ border: '14px solid #2D2825', background: '#2D2825', boxShadow: '0 40px 80px rgba(31,25,21,0.3)' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[30px] rounded-b-3xl z-10" style={{ background: '#2D2825' }} />
        <div ref={innerRef} className="size-full overflow-hidden rounded-[36px] relative">
          <AnimatePresence>
            {screen === 'login' && (
              <AnthropicLoginScreen key="login" onLogin={() => setScreen('gidr-select')} phoneHeight={phoneHeight} />
            )}
            {screen === 'gidr-select' && (
              <AnthropicChooseGidrScreen key="gidr" onSelect={() => setScreen('gidr-landing')} />
            )}
            {screen === 'gidr-landing' && (
              <AnthropicLandingScreen key="landing" jobName="" onProcedureSelect={(title) => { setProcedureTitle(title); setScreen('procedure') }} />
            )}
            {screen === 'procedure' && (
              <GuidedProcedureScreen key="procedure" title={procedureTitle} onClose={() => setScreen('gidr-landing')} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

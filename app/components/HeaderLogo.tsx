import svgPaths from './svg-logo-paths'

export function HeaderLogo() {
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

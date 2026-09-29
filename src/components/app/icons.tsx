type IconProps = { size?: number; className?: string }

function Svg({ size = 20, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {children}
    </svg>
  )
}

export const BackIcon = (p: IconProps) => <Svg {...p}><path d="M15 18l-6-6 6-6" /></Svg>
export const ChevronIcon = (p: IconProps) => <Svg {...p}><path d="M9 18l6-6-6-6" /></Svg>
export const CloseIcon = (p: IconProps) => <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>
export const LockIcon = (p: IconProps) => <Svg {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></Svg>
export const CheckIcon = (p: IconProps) => <Svg {...p}><path d="M5 12l5 5 9-10" /></Svg>
export const SettingsIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
    <circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" />
  </Svg>
)
export const PlayIcon = (p: IconProps) => <Svg {...p}><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none" /></Svg>
export const PauseIcon = (p: IconProps) => <Svg {...p}><path d="M8 5v14M16 5v14" strokeWidth="2.5" /></Svg>
export const SoundOnIcon = (p: IconProps) => (
  <Svg {...p}><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16.5 8.5a5 5 0 0 1 0 7" /></Svg>
)
export const SoundOffIcon = (p: IconProps) => (
  <Svg {...p}><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M17 9.5l4 5M21 9.5l-4 5" /></Svg>
)

'use client'

import { useEffect, useState } from 'react'

interface FootAnimationProps {
  /** Which phase to highlight: 'lifting' | 'moving' | 'placing' | 'auto' (cycles) */
  phase?: 'lifting' | 'moving' | 'placing' | 'auto'
  /** Size variant */
  size?: 'large' | 'small'
  /** Show phase labels */
  showLabels?: boolean
  /** Label language */
  locale?: 'ja' | 'en'
  /** Additional CSS class */
  className?: string
}

const LABELS = {
  ja: { lifting: '上げる', moving: '運ぶ', placing: '下ろす' },
  en: { lifting: 'Lifting', moving: 'Moving', placing: 'Placing' },
}

export default function FootAnimation({
  phase = 'auto',
  size = 'large',
  showLabels = true,
  locale = 'ja',
  className = '',
}: FootAnimationProps) {
  const [currentPhase, setCurrentPhase] = useState<'lifting' | 'moving' | 'placing'>('lifting')

  useEffect(() => {
    if (phase !== 'auto') return
    const phases: ('lifting' | 'moving' | 'placing')[] = ['lifting', 'moving', 'placing']
    let idx = 0
    const interval = setInterval(() => {
      idx = (idx + 1) % 3
      setCurrentPhase(phases[idx])
    }, 2000)
    return () => clearInterval(interval)
  }, [phase])

  const active = phase === 'auto' ? currentPhase : phase
  const isLarge = size === 'large'
  const w = isLarge ? 320 : 120
  const h = isLarge ? 160 : 64

  // Foot position transforms based on phase
  const footTransform = {
    lifting: 'translate(80, 50) rotate(-25)',
    moving: 'translate(150, 40) rotate(-10)',
    placing: 'translate(220, 70) rotate(0)',
  }

  // Ground line y position
  const groundY = isLarge ? 130 : 52

  // Shadow scale based on phase (smaller when foot is lifted)
  const shadowScale = {
    lifting: 0.5,
    moving: 0.3,
    placing: 1.0,
  }

  const shadowX = {
    lifting: 90,
    moving: 160,
    placing: 230,
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <svg
        width={w}
        height={h}
        viewBox="0 0 320 160"
        className="overflow-visible"
      >
        {/* Ground line */}
        <line
          x1="40" y1={groundY} x2="280" y2={groundY}
          stroke="currentColor" strokeWidth="2" opacity="0.2"
          strokeDasharray="4 4"
        />

        {/* Shadow (ellipse on ground) */}
        <ellipse
          cx={shadowX[active]}
          cy={groundY}
          rx={30 * shadowScale[active]}
          ry={6 * shadowScale[active]}
          fill="currentColor"
          opacity={0.1}
          className="transition-all duration-700 ease-in-out"
        />

        {/* Foot shape */}
        <g
          transform={footTransform[active]}
          className="transition-all duration-700 ease-in-out"
        >
          {/* Foot sole (side view) */}
          <path
            d="M0,30 Q0,10 15,5 Q30,0 50,0 Q65,0 75,8 Q80,12 80,20 Q80,28 75,32 Q60,38 40,38 Q20,38 10,36 Q0,34 0,30 Z"
            fill="currentColor"
            opacity={0.7}
            className="transition-opacity duration-500"
          />
          {/* Toes */}
          <circle cx="72" cy="10" r="5" fill="currentColor" opacity="0.5" />
          <circle cx="65" cy="4" r="4.5" fill="currentColor" opacity="0.5" />
          <circle cx="56" cy="2" r="4" fill="currentColor" opacity="0.5" />
          <circle cx="47" cy="2" r="3.5" fill="currentColor" opacity="0.5" />
          <circle cx="39" cy="4" r="3" fill="currentColor" opacity="0.5" />
          {/* Heel highlight */}
          <ellipse cx="12" cy="25" rx="8" ry="6" fill="currentColor" opacity="0.3" />
        </g>

        {/* Phase indicators (3 dots below ground) */}
        {isLarge && (
          <g>
            {(['lifting', 'moving', 'placing'] as const).map((p, i) => (
              <circle
                key={p}
                cx={100 + i * 60}
                cy={150}
                r={active === p ? 5 : 3}
                fill="currentColor"
                opacity={active === p ? 0.8 : 0.2}
                className="transition-all duration-500"
              />
            ))}
          </g>
        )}

        {/* Trajectory arc (dotted) */}
        <path
          d="M100,100 Q160,20 240,100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 6"
          opacity="0.15"
        />
      </svg>

      {/* Labels */}
      {showLabels && isLarge && (
        <div className="flex gap-8 text-sm">
          {(['lifting', 'moving', 'placing'] as const).map((p) => (
            <span
              key={p}
              className={`transition-all duration-500 font-medium ${
                active === p ? 'text-hozen-gold scale-110' : 'text-hozen-dark/30'
              }`}
            >
              {LABELS[locale][p]}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Mini version for the playing screen - just shows current phase
 */
export function FootAnimationMini({
  phase,
  locale = 'ja',
}: {
  phase: 'lifting' | 'moving' | 'placing' | null
  locale?: 'ja' | 'en'
}) {
  if (!phase) return null

  return (
    <div className="flex items-center gap-2 text-white/60 text-xs">
      <svg width="24" height="16" viewBox="0 0 80 40" className="text-white/50">
        <g
          transform={
            phase === 'lifting' ? 'translate(10, 8) rotate(-20) scale(0.4)' :
            phase === 'moving' ? 'translate(20, 4) rotate(-8) scale(0.4)' :
            'translate(30, 14) rotate(0) scale(0.4)'
          }
          className="transition-all duration-500"
        >
          <path
            d="M0,30 Q0,10 15,5 Q30,0 50,0 Q65,0 75,8 Q80,12 80,20 Q80,28 75,32 Q60,38 40,38 Q20,38 10,36 Q0,34 0,30 Z"
            fill="currentColor"
          />
        </g>
      </svg>
      <span className="text-hozen-gold/80 font-medium">
        {LABELS[locale][phase]}
      </span>
    </div>
  )
}

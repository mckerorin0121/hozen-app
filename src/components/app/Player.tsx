'use client'

import type { GuideStep, MeditationProgram } from '@/lib/audio-guides'
import { useI18n } from '@/lib/i18n'
import { PauseIcon, PlayIcon, SoundOffIcon, SoundOnIcon } from './icons'

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function PrepareScreen({ countdown }: { countdown: number }) {
  const { t } = useI18n()
  return (
    <div className="min-h-[100dvh] bg-hozen-night text-hozen-paper flex flex-col items-center justify-center px-8 text-center">
      <p className="text-sm text-hozen-paper/50 mb-10">{t('playing_prepare')}</p>
      <span className="font-serif text-6xl font-light text-hozen-paper/90 tabular-nums" aria-live="polite">
        {countdown > 0 ? countdown : ''}
      </span>
      <p className="text-xs text-hozen-paper/30 mt-10">{t('playing_earphone')}</p>
    </div>
  )
}

interface Props {
  program: MeditationProgram
  guide: GuideStep | null
  elapsed: number
  isPlaying: boolean
  voiceMuted: boolean
  onTogglePlay: () => void
  onToggleVoice: () => void
  onStop: () => void
}

export default function Player({ program, guide, elapsed, isPlaying, voiceMuted, onTogglePlay, onToggleVoice, onStop }: Props) {
  const { t } = useI18n()
  const total = program.duration * 60
  const progress = Math.min(elapsed / total, 1)

  return (
    <div className="min-h-[100dvh] bg-hozen-night text-hozen-paper flex flex-col">
      <header className="safe-top px-6 pb-2 flex items-center justify-between max-w-md w-full mx-auto">
        <span className="text-xs text-hozen-paper/35 truncate pr-4">{program.title}</span>
        <button onClick={onStop} className="text-sm text-hozen-paper/50 hover:text-hozen-paper/80 py-2">
          {t('playing_end')}
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-8 max-w-md w-full mx-auto">
        {guide?.text ? (
          <p key={guide.time} className="fade-in text-center text-xl leading-loose font-light text-hozen-paper/85 whitespace-pre-line" aria-live="polite">
            {guide.text.replace(/\.\.\./g, '…')}
          </p>
        ) : null}
      </main>

      <footer className="safe-bottom px-6 max-w-md w-full mx-auto">
        <div className="h-px bg-hozen-paper/10 rounded-full overflow-hidden" role="progressbar"
          aria-valuemin={0} aria-valuemax={total} aria-valuenow={elapsed}>
          <div className="h-full bg-hozen-paper/50 transition-[width] duration-1000 ease-linear" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="flex justify-between text-xs text-hozen-paper/35 mt-2 tabular-nums">
          <span>{formatTime(elapsed)}</span>
          <span>{formatTime(total)}</span>
        </div>

        <div className="flex items-center justify-between mt-6 mb-2">
          <button onClick={onToggleVoice} aria-label={voiceMuted ? t('playing_unmute') : t('playing_mute')}
            className={`w-12 h-12 flex items-center justify-center rounded-full ${voiceMuted ? 'text-hozen-paper/30' : 'text-hozen-paper/60'}`}>
            {voiceMuted ? <SoundOffIcon size={22} /> : <SoundOnIcon size={22} />}
          </button>
          <button onClick={onTogglePlay} aria-label={isPlaying ? t('playing_pause') : t('playing_resume')}
            className="w-16 h-16 flex items-center justify-center rounded-full border border-hozen-paper/25 text-hozen-paper/80 active:scale-95 transition-transform">
            {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
          </button>
          <span className="w-12" aria-hidden="true" />
        </div>
      </footer>
    </div>
  )
}

'use client'

import type { MeditationProgram } from '@/lib/audio-guides'
import { useI18n } from '@/lib/i18n'
import { BackIcon, CheckIcon, LockIcon } from './icons'

interface Props {
  programs: MeditationProgram[]
  course: MeditationProgram[]
  completedDays: Set<string>
  isDayUnlocked: (index: number) => boolean
  onSelect: (program: MeditationProgram) => void
  onBack: () => void
}

function Row({ program, onSelect, locked, done, lockedLabel, minutes }: {
  program: MeditationProgram
  onSelect: (p: MeditationProgram) => void
  locked?: boolean
  done?: boolean
  lockedLabel?: string
  minutes: string
}) {
  return (
    <li>
      <button onClick={() => onSelect(program)} disabled={locked}
        className="w-full text-left py-4 flex items-center gap-4 border-b border-hozen-line disabled:cursor-not-allowed group">
        <div className="flex-1 min-w-0">
          <p className={`text-[15px] ${locked ? 'text-hozen-ink/35' : 'text-hozen-ink'}`}>{program.title}</p>
          <p className="text-xs text-hozen-ink/45 mt-1 truncate">{locked ? lockedLabel : program.subtitle}</p>
        </div>
        <span className="text-xs text-hozen-ink/40 tabular-nums">{program.duration}{minutes}</span>
        <span className="w-5 flex justify-center text-hozen-ink/40">
          {locked ? <LockIcon size={16} /> : done ? <CheckIcon size={16} className="text-hozen-moss" /> : null}
        </span>
      </button>
    </li>
  )
}

export default function ProgramList({ programs, course, completedDays, isDayUnlocked, onSelect, onBack }: Props) {
  const { locale, t } = useI18n()
  const minutes = `${locale === 'en' ? ' ' : ''}${t('select_minutes')}`

  return (
    <div className="min-h-[100dvh] bg-hozen-paper text-hozen-ink">
      <div className="max-w-md mx-auto px-6 pb-16">
        <header className="safe-top pb-4 flex items-center gap-2">
          <button onClick={onBack} aria-label={t('back')} className="-ml-2 p-2 text-hozen-ink/60 hover:text-hozen-ink">
            <BackIcon size={22} />
          </button>
          <h1 className="font-serif text-lg">{t('app_programs')}</h1>
        </header>

        <section className="mt-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xs tracking-[0.2em] text-hozen-ink/45">{t('course_title')}</h2>
            <span className="text-xs text-hozen-ink/40 tabular-nums">{completedDays.size} / {course.length}</span>
          </div>
          <div className="flex gap-1 mt-3 mb-1" aria-hidden="true">
            {course.map(p => (
              <div key={p.id} className={`flex-1 h-0.5 rounded-full ${completedDays.has(p.id) ? 'bg-hozen-moss' : 'bg-hozen-line'}`} />
            ))}
          </div>
          <ul>
            {course.map((p, i) => {
              const done = completedDays.has(p.id)
              return (
                <Row key={p.id} program={p} onSelect={onSelect} minutes={minutes}
                  done={done} locked={!done && !isDayUnlocked(i)} lockedLabel={t('course_locked')} />
              )
            })}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xs tracking-[0.2em] text-hozen-ink/45">{t('app_programs')}</h2>
          <ul>
            {programs.map(p => <Row key={p.id} program={p} onSelect={onSelect} minutes={minutes} />)}
          </ul>
        </section>
      </div>
    </div>
  )
}

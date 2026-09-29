'use client'

import { useI18n } from '@/lib/i18n'
import { formatTotalTime } from '@/lib/session-history'

interface Props {
  elapsed: number
  steps: number
  streakDays: number
  onAgain: () => void
  onHome: () => void
}

export default function CompleteScreen({ elapsed, steps, streakDays, onAgain, onHome }: Props) {
  const { locale, t } = useI18n()
  const items = [
    { label: t('complete_time'), value: formatTotalTime(elapsed, locale) },
    { label: t('complete_steps'), value: steps.toLocaleString() },
    { label: t('select_stats_streak'), value: locale === 'en' ? `${streakDays} ${streakDays === 1 ? 'day' : 'days'}` : `${streakDays}${t('select_stats_streak_days')}` },
  ]

  return (
    <div className="min-h-[100dvh] bg-hozen-paper text-hozen-ink flex flex-col px-6">
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-md w-full mx-auto fade-in">
        <h1 className="font-serif text-3xl mb-3">{t('complete_title')}</h1>
        <p className="text-sm text-hozen-ink/50">{t('complete_subtitle')}</p>

        <dl className="grid grid-cols-3 w-full mt-14 border-y border-hozen-line py-6">
          {items.map(it => (
            <div key={it.label}>
              <dd className="text-xl tabular-nums">{it.value}</dd>
              <dt className="text-xs text-hozen-ink/45 mt-1">{it.label}</dt>
            </div>
          ))}
        </dl>
      </main>

      <footer className="safe-bottom max-w-md w-full mx-auto flex flex-col gap-3 pb-4">
        <button onClick={onHome}
          className="w-full py-4 rounded-full bg-hozen-moss text-hozen-paper tracking-widest active:scale-[0.98] transition-transform">
          {t('complete_home')}
        </button>
        <button onClick={onAgain} className="w-full py-3 text-sm text-hozen-ink/60 hover:text-hozen-ink">
          {t('complete_again')}
        </button>
      </footer>
    </div>
  )
}

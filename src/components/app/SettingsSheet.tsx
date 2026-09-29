'use client'

import Link from 'next/link'
import type { VoiceGender } from '@/lib/tts'
import { useI18n, Locale } from '@/lib/i18n'
import { CloseIcon } from './icons'

interface Props {
  open: boolean
  gender: VoiceGender
  onGenderChange: (g: VoiceGender) => void
  onClose: () => void
}

function Segmented<T extends string>({ value, options, onChange, label }: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
  label: string
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-full bg-hozen-line/60 p-1">
      {options.map(o => (
        <button key={o.value} role="radio" aria-checked={value === o.value} onClick={() => onChange(o.value)}
          className={`flex-1 py-2.5 rounded-full text-sm transition-colors ${value === o.value ? 'bg-hozen-paper text-hozen-ink shadow-sm' : 'text-hozen-ink/55'}`}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

export default function SettingsSheet({ open, gender, onGenderChange, onClose }: Props) {
  const { locale, setLocale, t } = useI18n()
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center" role="dialog" aria-modal="true" aria-label={t('app_settings')}>
      <button aria-label={t('close')} onClick={onClose} className="absolute inset-0 bg-hozen-ink/30" />
      <div className="relative w-full max-w-md bg-hozen-paper rounded-t-3xl px-6 pt-5 safe-bottom animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-lg text-hozen-ink">{t('app_settings')}</h2>
          <button onClick={onClose} aria-label={t('close')} className="-mr-2 p-2 text-hozen-ink/50 hover:text-hozen-ink">
            <CloseIcon size={20} />
          </button>
        </div>

        <p className="text-xs tracking-[0.2em] text-hozen-ink/45 mb-2">{t('select_language')}</p>
        <Segmented<Locale> label={t('select_language')} value={locale} onChange={setLocale}
          options={[{ value: 'ja', label: '日本語' }, { value: 'en', label: 'English' }]} />

        <p className="text-xs tracking-[0.2em] text-hozen-ink/45 mt-6 mb-2">{t('select_voice')}</p>
        <Segmented<VoiceGender> label={t('select_voice')} value={gender} onChange={onGenderChange}
          options={[
            { value: 'female', label: `${t('select_voice_female')}${locale === 'ja' ? '（Shiori）' : ' (Aria)'}` },
            { value: 'male', label: `${t('select_voice_male')}${locale === 'ja' ? '（Daichi）' : ' (Guy)'}` },
          ]} />

        <div className="mt-8 mb-4 flex flex-col gap-1 text-sm">
          <Link href="/about" className="py-3 border-t border-hozen-line text-hozen-ink/70">{t('app_about')}</Link>
          <Link href="/pricing" className="py-3 border-t border-hozen-line text-hozen-ink/70">{t('donate_footer')}</Link>
        </div>
      </div>
    </div>
  )
}

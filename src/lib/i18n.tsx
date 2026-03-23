'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type Locale = 'ja' | 'en'

type Translations = typeof ja

const ja = {
  // Common
  back: '戻る',
  start: 'スタート',
  close: '閉じる',

  // Onboarding
  onboarding_title_1: '歩く瞑想って？',
  onboarding_body_1: '歩行瞑想（ウォーキングメディテーション）は、2500年以上の歴史を持つ瞑想法です。\n\n座る瞑想と違い、日常の「歩く」動作そのものを瞑想の対象にします。仏教の僧侶たちは食後の歩行瞑想を日課としており、現代の研究でもストレス軽減・集中力向上の効果が実証されています。',
  onboarding_title_2: 'なぜ効くの？',
  onboarding_body_2: '歩くとき、私たちの脳は無意識にたくさんのことを処理しています。足裏の感覚、バランス、周囲の音...\n\nこれらに「意識的に」注意を向けることで、過去の後悔や未来の不安から離れ、「今ここ」に意識が集中します。\n\nたった5分間の歩行瞑想で、脳のストレスホルモン（コルチゾール）が平均23%低下するという研究結果もあります。',
  onboarding_title_3: '歩禅の使い方',
  onboarding_body_3: '① プログラムを選ぶ\n② 環境音とナレーション声を設定\n③ スタートして、歩き始める\n\n音声ガイドが一歩ずつ導いてくれます。特別な準備は不要。今いる場所で、今すぐ始められます。',
  onboarding_skip: 'スキップ',
  onboarding_next: '次へ',
  onboarding_start: 'さっそく始める',

  // Select screen
  select_title: 'プログラムを選択',
  select_free: '無料',
  select_premium: 'プレミアム',
  select_premium_badge: 'PRO',
  select_minutes: '分',
  select_ambient: '環境音',
  select_voice: 'ナレーション',
  select_voice_female: '女性',
  select_voice_male: '男性',
  select_language: '言語',
  select_stats_title: '統計',
  select_stats_sessions: '回',
  select_stats_total_time: '合計',
  select_stats_streak: '連続',
  select_stats_streak_days: '日',

  // Programs
  program_beginner_title: 'はじめての歩禅',
  program_beginner_subtitle: 'Day 1 - 5分間の基本体験',
  program_timer_title: 'サイレント歩禅',
  program_timer_subtitle: '5分間のタイマーモード',
  program_stress_title: 'ストレス解放',
  program_stress_subtitle: '10分間の深いリラクゼーション',
  program_morning_title: '朝のエナジー',
  program_morning_subtitle: '7分間の活力チャージ',
  program_evening_title: '夕方のクールダウン',
  program_evening_subtitle: '10分間の心身リセット',
  program_focus_title: '集中力ブースト',
  program_focus_subtitle: '5分間のフォーカス瞑想',

  // Playing screen
  playing_steps: '歩',
  playing_pause: '一時停止',
  playing_resume: '再開',
  playing_end: '終了',

  // Complete screen
  complete_title: 'お疲れさまでした',
  complete_time: '瞑想時間',
  complete_steps: '歩数',
  complete_message: '今日も素晴らしい歩禅でした。\nこの穏やかな気持ちを大切に。',
  complete_done: '完了',

  // Ambient
  ambient_forest: '森',
  ambient_stream: '小川',
  ambient_rain: '雨',
  ambient_wind: '風',
  ambient_none: 'なし',

  // Install banner
  install_title: '歩禅をホーム画面に追加',
  install_desc: 'アプリのようにすぐ起動できます',
  install_add: '追加',
  install_ios_desc: '画面下の共有ボタンをタップ →「ホーム画面に追加」',
}

const en: Translations = {
  back: 'Back',
  start: 'Start',
  close: 'Close',

  onboarding_title_1: 'What is Walking Meditation?',
  onboarding_body_1: 'Walking meditation has over 2,500 years of history.\n\nUnlike seated meditation, it turns your everyday walking into a meditative practice. Buddhist monks have practiced walking meditation after meals as a daily ritual, and modern research confirms its benefits for stress reduction and improved focus.',
  onboarding_title_2: 'Why Does It Work?',
  onboarding_body_2: 'When we walk, our brain unconsciously processes many things — the sensation in our feet, balance, surrounding sounds...\n\nBy consciously directing attention to these, we move away from past regrets and future anxieties, focusing on the "here and now."\n\nResearch shows that just 5 minutes of walking meditation can reduce cortisol (stress hormone) levels by an average of 23%.',
  onboarding_title_3: 'How to Use HoZen',
  onboarding_body_3: '① Choose a program\n② Set ambient sound and narrator voice\n③ Tap start and begin walking\n\nThe voice guide will lead you step by step. No special preparation needed. Start right where you are, right now.',
  onboarding_skip: 'Skip',
  onboarding_next: 'Next',
  onboarding_start: "Let's Begin",

  select_title: 'Choose a Program',
  select_free: 'Free',
  select_premium: 'Premium',
  select_premium_badge: 'PRO',
  select_minutes: 'min',
  select_ambient: 'Ambient',
  select_voice: 'Narrator',
  select_voice_female: 'Female',
  select_voice_male: 'Male',
  select_language: 'Language',
  select_stats_title: 'Statistics',
  select_stats_sessions: 'sessions',
  select_stats_total_time: 'Total',
  select_stats_streak: 'Streak',
  select_stats_streak_days: 'days',

  program_beginner_title: 'First Steps',
  program_beginner_subtitle: 'Day 1 — 5 min basics',
  program_timer_title: 'Silent Walk',
  program_timer_subtitle: '5 min timer mode',
  program_stress_title: 'Stress Relief',
  program_stress_subtitle: '10 min deep relaxation',
  program_morning_title: 'Morning Energy',
  program_morning_subtitle: '7 min vitality boost',
  program_evening_title: 'Evening Calm',
  program_evening_subtitle: '10 min mind & body reset',
  program_focus_title: 'Focus Boost',
  program_focus_subtitle: '5 min focus meditation',

  playing_steps: 'steps',
  playing_pause: 'Pause',
  playing_resume: 'Resume',
  playing_end: 'End',

  complete_title: 'Well Done',
  complete_time: 'Duration',
  complete_steps: 'Steps',
  complete_message: "Another wonderful walking meditation.\nCarry this calm with you.",
  complete_done: 'Done',

  ambient_forest: 'Forest',
  ambient_stream: 'Stream',
  ambient_rain: 'Rain',
  ambient_wind: 'Wind',
  ambient_none: 'None',

  install_title: 'Add HoZen to Home Screen',
  install_desc: 'Launch instantly like a native app',
  install_add: 'Add',
  install_ios_desc: 'Tap the share button below → "Add to Home Screen"',
}

const translations = { ja, en } as const

// Context
interface I18nContextType {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: keyof Translations) => string
}

const I18nContext = createContext<I18nContextType>({
  locale: 'ja',
  setLocale: () => {},
  t: (key) => key,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'ja'
    return (localStorage.getItem('hozen-locale') as Locale) || 'ja'
  })

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('hozen-locale', l)
    document.documentElement.lang = l
  }, [])

  const t = useCallback((key: keyof Translations) => {
    return translations[locale][key] || translations.ja[key] || key
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}

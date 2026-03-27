'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type Locale = 'ja' | 'en'

type Translations = typeof ja

const ja = {
  // Common
  back: '戻る',
  home: 'ホーム',
  back_home: '← ホームに戻る',
  start: 'スタート',
  close: '閉じる',

  // ─── Home page ───
  hero_tagline: '歩くだけで、心が整う。',
  hero_sub: '毎日の歩きを、瞑想の時間に。',
  hero_cta: '無料で体験する',
  hero_pricing: 'プランを見る',

  // ─── What is Walking Meditation ───
  what_title: '歩く瞑想とは？',
  what_lead: 'テーラワーダ仏教に伝わる、2,500年以上の歴史を持つ瞑想法。',
  what_block1_title: '足の裏に集中する瞑想',
  what_block1_body: '歩行瞑想（チャンカマナ）は、テーラワーダ仏教の僧侶たちが2,500年以上続けてきた伝統的な修行法です。足を「上げる・運ぶ・下ろす」——この一歩一歩の動きに意識を向け、足の裏の感覚だけに集中します。シンプルだからこそ深い。それが歩行瞑想の本質です。',
  what_block2_title: '「今ここ」に戻る力',
  what_block2_body: '私たちの心は常に過去の後悔や未来の不安にさまよっています。歩行瞑想では、足の裏の感覚という「今ここ」の体験に繰り返し注意を戻す練習をします。考えが浮かんだら「考え」と気づき、足の裏に戻る。この単純な繰り返しが、心を驚くほど静かにします。',
  what_block3_title: '誰でも、今すぐ、どこでも',
  what_block3_body: '特別な場所も道具も不要。通勤中、昼休み、夕方の散歩——いつもの歩きが瞑想に変わります。歩禅は音声ガイドで「上げる・運ぶ・下ろす」の気づきを一歩ずつ導くので、初めての方でも5分で足の裏への集中を体験できます。',

  features_title: '歩禅の特長',
  features_sub: 'テクノロジーとマインドフルネスの融合で、\nあなたの歩きが変わります。',
  feature1_title: '歩行連動ガイド',
  feature1_desc: 'あなたの歩くペースに合わせて音声ガイドが自動調整。自然な歩きのまま瞑想に入れます。',
  feature2_title: 'プロの音声誘導',
  feature2_desc: '禅僧監修のガイド音声。初心者でも5分で深い瞑想状態へ導きます。',
  feature3_title: '成長の可視化',
  feature3_desc: '瞑想時間・歩数・継続日数を記録。マインドフルネスの習慣化をサポート。',

  howto_title: '使い方はシンプル',
  howto1_title: 'アプリを開く',
  howto1_desc: 'ホーム画面からワンタップで起動。ブラウザでもスマホアプリのようにサクサク動きます。',
  howto2_title: '歩き始める',
  howto2_desc: 'イヤホンをつけて、いつものルートを歩くだけ。通勤中でも散歩でもOK。',
  howto3_title: '音声に従う',
  howto3_desc: '優しい音声が呼吸と歩行のリズムを導きます。歩くペースに自動で合わせます。',
  howto4_title: '心が整う',
  howto4_desc: '5分間の歩行瞑想で、集中力アップ・ストレス軽減を実感。毎日の習慣に。',

  testimonial_title: '体験者の声',
  testimonial1_quote: '通勤の15分が、一日で一番好きな時間になりました。',
  testimonial1_name: 'Yuki S.',
  testimonial1_role: '会社員 / 28歳',
  testimonial2_quote: '座る瞑想は続かなかったけど、歩禅は自然に続いています。',
  testimonial2_name: 'Takeshi M.',
  testimonial2_role: 'マネージャー / 45歳',

  cta_title: '今日から、歩禅を始めよう',
  cta_desc: '7日間の無料体験で、歩行瞑想の効果を実感してください。\nクレジットカード不要で、今すぐ始められます。',
  cta_button: '無料で体験する →',

  footer_legal: '特定商取引法に基づく表記',

  // ─── Donation page ───
  donate_title: '歩禅を応援する',
  donate_sub: '歩禅は完全無料のアプリです。\nタイのお寺で無料で教えてもらった瞑想の智慧を、そのまま皆さんにお届けしています。',
  donate_why_title: 'ご支援のお願い',
  donate_why_body: 'サーバー費用、音声ガイドの制作、新機能の開発——アプリの維持・改善にはコストがかかります。\nもし歩禅が役に立ったと感じていただけたら、ご支援いただけると嬉しいです。',
  donate_stripe_button: 'カードで応援する',
  donate_stripe_desc: 'クレジットカード・デビットカードでお好きな金額をご支援いただけます。',
  donate_bank_title: '銀行振込で応援する',
  donate_bank_name: '銀行名',
  donate_bank_branch: '支店名',
  donate_bank_type: '口座種別',
  donate_bank_type_value: '普通',
  donate_bank_number: '口座番号',
  donate_bank_holder: '口座名義',
  donate_bank_note: '※ 振込手数料はご負担ください',
  donate_thanks: 'いただいたご支援は、歩禅の開発・運営に大切に使わせていただきます。',
  donate_back: '← 歩禅に戻る',

  // ─── Tokusho page ───
  tokusho_title: '特定商取引法に基づく表記',
  tokusho_sub: '特定商取引法第11条に基づき、以下の通り表示いたします。',
  tokusho_contact: 'ご不明な点はメール（aimiya121@gmail.com）よりお問い合わせください。',

  // ─── Onboarding ───
  onboarding_title_1: '歩く瞑想って？',
  onboarding_body_1: '歩行瞑想（チャンカマナ）は、テーラワーダ仏教に伝わる2,500年以上の歴史を持つ瞑想法です。\n\n足を「上げる・運ぶ・下ろす」——この一歩一歩の動きに意識を向け、足の裏の感覚だけに集中します。座る瞑想と並ぶ、伝統的な修行法です。',
  onboarding_title_2: 'なぜ効くの？',
  onboarding_body_2: '私たちの心は常に過去や未来にさまよっています。\n\n歩行瞑想では、足の裏の感覚という「今ここ」の体験に繰り返し注意を戻します。考えが浮かんだら「考え」と気づき、足の裏に戻る。\n\nこの単純な繰り返しが、心を驚くほど静かにし、集中力を高めます。',
  onboarding_title_3: '歩禅の使い方',
  onboarding_body_3: '① プログラムを選ぶ\n② 環境音とナレーション声を設定\n③ スタートして、歩き始める\n\n音声ガイドが一歩ずつ導いてくれます。特別な準備は不要。今いる場所で、今すぐ始められます。',
  onboarding_skip: 'スキップ',
  onboarding_next: '次へ',
  onboarding_start: 'さっそく始める',

  // ─── Select screen ───
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
  select_unlock_premium: 'プレミアムで全プログラム解放 →',

  // ─── Programs ───
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

  // ─── 7-Day Course ───
  course_title: '7日間コース',
  course_sub: 'テーラワーダの伝統に沿った段階的プログラム',
  course_day: 'Day',
  course_locked: '前日を完了すると解放',
  course_completed: '完了済み',
  program_cd1_title: 'Day 1：左右の気づき',
  program_cd1_subtitle: '5分 — 最もシンプルな気づき',
  program_cd2_title: 'Day 2：上げる・下ろす',
  program_cd2_subtitle: '5分 — 2段階のノーティング',
  program_cd3_title: 'Day 3：上げる・運ぶ・下ろす',
  program_cd3_subtitle: '5分 — 3段階のノーティング',
  program_cd4_title: 'Day 4：意図の観察',
  program_cd4_subtitle: '7分 — 動く前の意図に気づく',
  program_cd5_title: 'Day 5：細密な観察',
  program_cd5_subtitle: '7分 — 最も細かいノーティング',
  program_cd6_title: 'Day 6：自立練習',
  program_cd6_subtitle: '10分 — 最小限のガイド',
  program_cd7_title: 'Day 7：サイレント歩禅',
  program_cd7_subtitle: '10分 — ベルのみ、完全な静寂',

  // ─── Immersive mode ───
  immersive_on: '没入モード',
  immersive_off: '通常モード',

  // ─── Playing screen ───
  playing_steps: '歩',
  playing_pause: '一時停止',
  playing_resume: '再開',
  playing_end: '終了する',
  playing_breathe_in: '🫁 吸って...',
  playing_breathe_out: '🫁 吐いて...',
  playing_breathe_hold: '⏸️ 止めて...',
  playing_prepare: '深呼吸して、準備しましょう',
  playing_earphone: 'イヤホンの装着を確認してください',

  // ─── Complete screen ───
  complete_title: 'お疲れさまでした',
  complete_subtitle: '今日も一歩、心が整いました',
  complete_time: '瞑想時間',
  complete_steps: '歩数',
  complete_message: '今日も素晴らしい歩禅でした。\nこの穏やかな気持ちを大切に。',
  complete_done: '完了',
  complete_again: 'もう一度',
  complete_premium_cta: 'プレミアムで更に深く →',
  complete_cumulative: '累計記録',
  complete_quote_ja: '「足の裏の感覚に気づくこと。上げる、運ぶ、下ろす。それだけで、心は自然と静まります。」',

  // ─── Ambient ───
  ambient_forest: '森',
  ambient_stream: '小川',
  ambient_rain: '雨',
  ambient_wind: '風',
  ambient_none: 'なし',

  // ─── Install banner ───
  install_title: '歩禅をホーム画面に追加',
  install_desc: 'アプリのようにすぐ起動できます',
  install_add: '追加',
  install_ios_desc: '画面下の共有ボタンをタップ →「ホーム画面に追加」',
}

const en: Translations = {
  back: 'Back',
  home: 'Home',
  back_home: '← Back to Home',
  start: 'Start',
  close: 'Close',

  // ─── Home page ───
  hero_tagline: 'Walk your way to inner peace.',
  hero_sub: 'Turn your daily walk into meditation.',
  hero_cta: 'Try for Free',
  hero_pricing: 'View Plans',

  // ─── What is Walking Meditation ───
  what_title: 'What is Walking Meditation?',
  what_lead: 'A 2,500-year-old meditation practice from Theravada Buddhism.',
  what_block1_title: 'Meditation Through Your Feet',
  what_block1_body: 'Walking meditation (Cankamana) is a traditional practice maintained by Theravada Buddhist monks for over 2,500 years. "Lifting... moving... placing..." — you bring full awareness to each step, focusing solely on the sensations in the soles of your feet. Simple, yet profoundly deep. That is the essence of walking meditation.',
  what_block2_title: 'Returning to the Here and Now',
  what_block2_body: 'Our minds constantly wander to past regrets and future worries. In walking meditation, you practice returning attention again and again to the present-moment experience of your foot soles. When thoughts arise, you simply note "thinking" and return to your feet. This simple repetition quiets the mind remarkably.',
  what_block3_title: 'Anyone, Anytime, Anywhere',
  what_block3_body: 'No special place or equipment needed. During your commute, lunch break, or evening stroll — your everyday walk becomes meditation. HoZen guides you step by step through "lifting, moving, placing" awareness, so even complete beginners can experience focused attention in just 5 minutes.',

  features_title: 'Why HoZen',
  features_sub: 'Where technology meets mindfulness —\ntransform every step.',
  feature1_title: 'Step-Synced Guidance',
  feature1_desc: 'Voice guidance adapts to your walking pace in real time, so you slip into meditation naturally.',
  feature2_title: 'Expert Narration',
  feature2_desc: 'Guided sessions crafted with Zen principles. Even beginners reach deep calm in just 5 minutes.',
  feature3_title: 'Track Your Growth',
  feature3_desc: 'Meditation time, steps, and streaks — all recorded to help you build a lasting mindfulness habit.',

  howto_title: 'How It Works',
  howto1_title: 'Open the App',
  howto1_desc: 'One tap from your home screen. Works beautifully in the browser — no download needed.',
  howto2_title: 'Start Walking',
  howto2_desc: 'Put in your earphones and walk your usual route. Commute, lunch break, or evening stroll — any time works.',
  howto3_title: 'Follow the Voice',
  howto3_desc: 'A gentle voice guides your breathing and pace. It adapts to how you walk.',
  howto4_title: 'Find Your Calm',
  howto4_desc: 'Just 5 minutes of walking meditation reduces stress and sharpens focus. Make it a daily habit.',

  testimonial_title: 'What Users Say',
  testimonial1_quote: 'My 15-minute commute became my favorite part of the day.',
  testimonial1_name: 'Yuki S.',
  testimonial1_role: 'Office worker / 28',
  testimonial2_quote: "Seated meditation never stuck, but HoZen just feels natural.",
  testimonial2_name: 'Takeshi M.',
  testimonial2_role: 'Manager / 45',

  cta_title: 'Start Your HoZen Journey Today',
  cta_desc: 'Experience the power of walking meditation with a 7-day free trial.\nNo credit card required.',
  cta_button: 'Try for Free →',

  footer_legal: 'Legal Notice (Tokusho)',

  // ─── Donation page ───
  donate_title: 'Support HoZen',
  donate_sub: 'HoZen is a completely free app.\nWe share the wisdom of meditation, freely taught at Thai temples, with everyone.',
  donate_why_title: 'Why We Need Your Support',
  donate_why_body: 'Server costs, voice guide production, and new feature development — maintaining and improving the app requires funding.\nIf HoZen has helped you, we would be grateful for your support.',
  donate_stripe_button: 'Support with Card',
  donate_stripe_desc: 'Support with any amount using your credit or debit card.',
  donate_bank_title: 'Support via Bank Transfer',
  donate_bank_name: 'Bank',
  donate_bank_branch: 'Branch',
  donate_bank_type: 'Account Type',
  donate_bank_type_value: 'Savings (普通)',
  donate_bank_number: 'Account Number',
  donate_bank_holder: 'Account Holder',
  donate_bank_note: '* Transfer fees are borne by the sender',
  donate_thanks: 'Your support will be used to develop and maintain HoZen.',
  donate_back: '← Back to HoZen',

  // ─── Tokusho page ───
  tokusho_title: 'Legal Notice',
  tokusho_sub: 'Disclosure pursuant to the Act on Specified Commercial Transactions (Japan).',
  tokusho_contact: 'For inquiries, please contact us at aimiya121@gmail.com.',

  // ─── Onboarding ───
  onboarding_title_1: 'What is Walking Meditation?',
  onboarding_body_1: 'Walking meditation (Cankamana) is a practice from Theravada Buddhism with over 2,500 years of history.\n\n"Lifting... moving... placing..." — you bring awareness to each step, focusing solely on the sensations in the soles of your feet. It is one of the core meditation practices alongside seated meditation.',
  onboarding_title_2: 'Why Does It Work?',
  onboarding_body_2: 'Our minds constantly wander to the past and the future.\n\nIn walking meditation, you practice returning attention again and again to the present-moment experience of your foot soles. When thoughts arise, note "thinking" and return to your feet.\n\nThis simple repetition remarkably quiets the mind and sharpens focus.',
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
  select_unlock_premium: 'Unlock all programs with Premium →',

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

  // ─── 7-Day Course ───
  course_title: '7-Day Course',
  course_sub: 'A progressive program following Theravada tradition',
  course_day: 'Day',
  course_locked: 'Complete previous day to unlock',
  course_completed: 'Completed',
  program_cd1_title: 'Day 1: Left & Right',
  program_cd1_subtitle: '5 min — simplest awareness',
  program_cd2_title: 'Day 2: Lifting & Placing',
  program_cd2_subtitle: '5 min — two-part noting',
  program_cd3_title: 'Day 3: Lifting, Moving, Placing',
  program_cd3_subtitle: '5 min — three-part noting',
  program_cd4_title: 'Day 4: Intention',
  program_cd4_subtitle: '7 min — noticing intention before movement',
  program_cd5_title: 'Day 5: Fine Observation',
  program_cd5_subtitle: '7 min — the finest level of noting',
  program_cd6_title: 'Day 6: Self-Guided',
  program_cd6_subtitle: '10 min — minimal guidance',
  program_cd7_title: 'Day 7: Silent Walk',
  program_cd7_subtitle: '10 min — bell only, complete silence',

  // ─── Immersive mode ───
  immersive_on: 'Immersive',
  immersive_off: 'Normal',

  playing_steps: 'steps',
  playing_pause: 'Pause',
  playing_resume: 'Resume',
  playing_end: 'End',
  playing_breathe_in: '🫁 Breathe in...',
  playing_breathe_out: '🫁 Breathe out...',
  playing_breathe_hold: '⏸️ Hold...',
  playing_prepare: 'Take a deep breath and get ready',
  playing_earphone: 'Make sure your earphones are connected',

  complete_title: 'Well Done',
  complete_subtitle: 'Another step toward inner peace',
  complete_time: 'Duration',
  complete_steps: 'Steps',
  complete_message: "Another wonderful walking meditation.\nCarry this calm with you.",
  complete_done: 'Done',
  complete_again: 'Again',
  complete_premium_cta: 'Go deeper with Premium →',
  complete_cumulative: 'Total Record',
  complete_quote_ja: '"Notice the soles of your feet. Lifting, moving, placing. That alone quiets the mind."',

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

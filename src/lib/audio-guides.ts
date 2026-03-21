export interface GuideStep {
  time: number      // seconds from start
  text: string      // displayed text
  speech: string    // for TTS
  breathe?: 'in' | 'out' | 'hold'
}

export interface MeditationProgram {
  id: string
  title: string
  subtitle: string
  duration: number  // total minutes
  isPremium: boolean
  steps: GuideStep[]
}

export const FREE_PROGRAMS: MeditationProgram[] = [
  {
    id: 'beginner-day1',
    title: 'はじめての歩禅',
    subtitle: 'Day 1 - 5分間の基本体験',
    duration: 5,
    isPremium: false,
    steps: [
      { time: 0, text: '目を軽く閉じて、3回深呼吸しましょう', speech: '目を軽く閉じて、3回深呼吸しましょう', breathe: 'in' },
      { time: 8, text: 'ゆっくり吐いて...', speech: 'ゆっくり吐いて', breathe: 'out' },
      { time: 15, text: 'もう一度、吸って...', speech: 'もう一度、吸って', breathe: 'in' },
      { time: 22, text: '吐いて...', speech: '吐いて', breathe: 'out' },
      { time: 30, text: 'では、ゆっくり歩き始めてください', speech: 'では、ゆっくり歩き始めてください' },
      { time: 40, text: '右足が地面に触れる感覚に\n意識を向けましょう', speech: '右足が地面に触れる感覚に意識を向けましょう' },
      { time: 55, text: '次は左足。\n足の裏全体で地面を感じてください', speech: '次は左足。足の裏全体で地面を感じてください' },
      { time: 75, text: 'そのまま歩き続けてください\n一歩一歩に集中して', speech: 'そのまま歩き続けてください。一歩一歩に集中して' },
      { time: 100, text: '周りの音に耳を傾けてみましょう\n風の音、鳥の声...', speech: '周りの音に耳を傾けてみましょう。風の音、鳥の声' },
      { time: 130, text: '呼吸のリズムに合わせて\n歩いてみましょう', speech: '呼吸のリズムに合わせて歩いてみましょう', breathe: 'in' },
      { time: 150, text: '吸って、2歩\n吐いて、3歩', speech: '吸って、2歩。吐いて、3歩', breathe: 'out' },
      { time: 180, text: '素晴らしいです\nそのまま歩き続けてください', speech: '素晴らしいです。そのまま歩き続けてください' },
      { time: 210, text: '頭に浮かぶ考えは\n雲のように流しましょう', speech: '頭に浮かぶ考えは、雲のように流しましょう' },
      { time: 240, text: 'あと1分です\n最後の一歩一歩を味わって', speech: 'あと1分です。最後の一歩一歩を味わって' },
      { time: 270, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください' },
      { time: 280, text: '深く息を吸って...', speech: '深く息を吸って', breathe: 'in' },
      { time: 287, text: 'ゆっくり吐いて...', speech: 'ゆっくり吐いて', breathe: 'out' },
      { time: 295, text: 'お疲れさまでした\n素晴らしい歩禅でした', speech: 'お疲れさまでした。素晴らしい歩禅でした' },
    ],
  },
  {
    id: 'timer-5',
    title: 'サイレント歩禅',
    subtitle: '5分間のタイマーモード',
    duration: 5,
    isPremium: false,
    steps: [
      { time: 0, text: '歩禅を始めます\nご自身のペースで歩いてください', speech: '歩禅を始めます。ご自身のペースで歩いてください' },
      { time: 150, text: '半分が過ぎました', speech: '半分が過ぎました' },
      { time: 290, text: 'まもなく終了です', speech: 'まもなく終了です' },
    ],
  },
]

export const PREMIUM_PROGRAMS: MeditationProgram[] = [
  {
    id: 'stress-relief',
    title: 'ストレス解放',
    subtitle: '10分間の深いリラクゼーション',
    duration: 10,
    isPremium: true,
    steps: [],
  },
  {
    id: 'morning-energy',
    title: '朝のエナジー',
    subtitle: '7分間の活力チャージ',
    duration: 7,
    isPremium: true,
    steps: [],
  },
  {
    id: 'evening-calm',
    title: '夕方のクールダウン',
    subtitle: '10分間の心身リセット',
    duration: 10,
    isPremium: true,
    steps: [],
  },
  {
    id: 'focus-boost',
    title: '集中力ブースト',
    subtitle: '5分間のフォーカス瞑想',
    duration: 5,
    isPremium: true,
    steps: [],
  },
]

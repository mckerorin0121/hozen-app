import type { Locale } from './i18n'

export interface GuideStep {
  time: number      // seconds from start
  text: string      // displayed text
  speech: string    // for TTS fallback
  fileKey?: string  // pre-recorded audio file key (e.g. "day1_01")
  breathe?: 'in' | 'out' | 'hold'
}

export interface MeditationProgram {
  id: string
  title: string
  subtitle: string
  duration: number  // total minutes
  steps: GuideStep[]
}

/* ─── Japanese Steps ─── */

const JA_BEGINNER_STEPS: GuideStep[] = [
  { time: 0, text: '目を軽く閉じて、3回深呼吸しましょう', speech: '目を軽く閉じて、3回深呼吸しましょう', fileKey: 'day1_01', breathe: 'in' },
  { time: 8, text: 'ゆっくり吐いて...', speech: 'ゆっくり吐いて', fileKey: 'day1_02', breathe: 'out' },
  { time: 15, text: 'もう一度、吸って...', speech: 'もう一度、吸って', fileKey: 'day1_03', breathe: 'in' },
  { time: 22, text: '吐いて...', speech: '吐いて', fileKey: 'day1_04', breathe: 'out' },
  { time: 30, text: 'では、ゆっくり歩き始めてください\n普段よりずっとゆっくりと', speech: 'では、ゆっくり歩き始めてください。普段よりずっとゆっくりと', fileKey: 'day1_05' },
  { time: 40, text: '右足の裏に意識を向けましょう\n地面から離れる瞬間を感じて', speech: '右足の裏に意識を向けましょう。地面から離れる瞬間を感じて', fileKey: 'day1_06' },
  { time: 55, text: '次は左足の裏\nかかとが地面に触れる感覚を味わって', speech: '次は左足の裏。かかとが地面に触れる感覚を味わって', fileKey: 'day1_07' },
  { time: 75, text: '「上げる...運ぶ...下ろす」\n心の中で唱えながら歩きましょう', speech: '上げる、運ぶ、下ろす。心の中で唱えながら歩きましょう', fileKey: 'day1_08' },
  { time: 100, text: '足の裏だけに意識を集中します\nかかとからつま先へ、重さが移る感覚', speech: '足の裏だけに意識を集中します。かかとからつま先へ、重さが移る感覚', fileKey: 'day1_09' },
  { time: 130, text: '足が地面から離れる軽さ\n着地する重さ、その変化を観察して', speech: '足が地面から離れる軽さ。着地する重さ。その変化を観察して', fileKey: 'day1_10' },
  { time: 150, text: '考えが浮かんだら「考え」と気づいて\nそっと足の裏に意識を戻しましょう', speech: '考えが浮かんだら、考えと気づいて。そっと足の裏に意識を戻しましょう', fileKey: 'day1_11' },
  { time: 180, text: 'いいですね、そのまま\n一歩一歩の感覚を観察し続けて', speech: 'いいですね、そのまま。一歩一歩の感覚を観察し続けて', fileKey: 'day1_12' },
  { time: 210, text: '足の裏の温かさ、圧力\nその変化をただ感じてください', speech: '足の裏の温かさ、圧力。その変化をただ感じてください', fileKey: 'day1_13' },
  { time: 240, text: 'あと1分です\n最後まで足の裏の感覚に集中して', speech: 'あと1分です。最後まで足の裏の感覚に集中して', fileKey: 'day1_14' },
  { time: 270, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'day1_15' },
  { time: 280, text: '立ち止まったまま\n両足の裏が地面に触れる感覚を感じて', speech: '立ち止まったまま、両足の裏が地面に触れる感覚を感じて', fileKey: 'day1_16', breathe: 'in' },
  { time: 287, text: 'ゆっくり吐いて...', speech: 'ゆっくり吐いて', fileKey: 'day1_17', breathe: 'out' },
  { time: 295, text: 'お疲れさまでした\n素晴らしい歩禅でした', speech: 'お疲れさまでした。素晴らしい歩禅でした', fileKey: 'day1_18' },
]

const JA_TIMER_STEPS: GuideStep[] = [
  { time: 0, text: '歩禅を始めます\nご自身のペースで歩いてください', speech: '歩禅を始めます。ご自身のペースで歩いてください', fileKey: 'silent_start' },
  { time: 150, text: '半分が過ぎました', speech: '半分が過ぎました', fileKey: 'silent_half' },
  { time: 290, text: 'まもなく終了です', speech: 'まもなく終了です', fileKey: 'silent_end' },
]

const JA_STRESS_STEPS: GuideStep[] = [
  { time: 0, text: '立ち止まって\n目を軽く閉じてください', speech: '立ち止まって、目を軽く閉じてください', fileKey: 'stress_01', breathe: 'in' },
  { time: 8, text: '鼻から深く吸って...', speech: '鼻から深く吸って', fileKey: 'stress_02', breathe: 'in' },
  { time: 16, text: '口からゆっくり吐いて...', speech: '口からゆっくり吐いて', fileKey: 'stress_03', breathe: 'out' },
  { time: 25, text: 'もう一度、深く吸って', speech: 'もう一度、深く吸って', fileKey: 'stress_04', breathe: 'in' },
  { time: 33, text: 'ふーっと、全部吐き出して', speech: 'ふーっと、全部吐き出して', fileKey: 'stress_05', breathe: 'out' },
  { time: 45, text: 'では、ゆっくり歩き始めましょう\nいつもより少しだけゆっくり', speech: 'では、ゆっくり歩き始めましょう。いつもより少しだけゆっくり', fileKey: 'stress_06' },
  { time: 70, text: '足の裏に全ての意識を集めます\nかかとが地面に触れる瞬間を感じて', speech: '足の裏に全ての意識を集めます。かかとが地面に触れる瞬間を感じて', fileKey: 'stress_07' },
  { time: 100, text: '「上げる...運ぶ...下ろす」\n一歩ずつ丁寧に観察して', speech: '上げる、運ぶ、下ろす。一歩ずつ丁寧に観察して', fileKey: 'stress_08' },
  { time: 135, text: '心配事が浮かんでも構いません\n「考え」と気づいて、足の裏に戻る', speech: '心配事が浮かんでも構いません。考えと気づいて、足の裏に戻る', fileKey: 'stress_09' },
  { time: 170, text: '気づいて、戻る\nこの繰り返しが瞑想です', speech: '気づいて、戻る。この繰り返しが瞑想です', fileKey: 'stress_10' },
  { time: 210, text: 'つま先が地面を離れる瞬間\n足が空中を移動する感覚を味わって', speech: 'つま先が地面を離れる瞬間。足が空中を移動する感覚を味わって', fileKey: 'stress_11' },
  { time: 260, text: '足の裏が地面に着く\nその重さと温かさを感じてください', speech: '足の裏が地面に着く。その重さと温かさを感じてください', fileKey: 'stress_12' },
  { time: 310, text: '歩くスピードをさらに落として\nもっと細かく足の感覚を観察して', speech: '歩くスピードをさらに落として。もっと細かく足の感覚を観察して', fileKey: 'stress_13' },
  { time: 350, text: '「触れる...圧...離れる...軽さ」\n足の裏の感覚の変化を追って', speech: '触れる、圧、離れる、軽さ。足の裏の感覚の変化を追って', fileKey: 'stress_14' },
  { time: 390, text: 'いいですね、そのまま\n足の裏だけに意識を置き続けて', speech: 'いいですね、そのまま。足の裏だけに意識を置き続けて', fileKey: 'stress_15' },
  { time: 440, text: '今この瞬間、足の裏の感覚\nそれだけが確かなものです', speech: '今この瞬間、足の裏の感覚。それだけが確かなものです', fileKey: 'stress_16' },
  { time: 490, text: '一歩の中にある豊かな感覚に\n気づき続けてください', speech: '一歩の中にある豊かな感覚に、気づき続けてください', fileKey: 'stress_17' },
  { time: 530, text: 'あと1分です\nゆっくりと歩みを緩めて', speech: 'あと1分です。ゆっくりと歩みを緩めて', fileKey: 'stress_18' },
  { time: 560, text: '立ち止まって\n両足の裏が地面に触れる感覚を感じて', speech: '立ち止まって。両足の裏が地面に触れる感覚を感じて', fileKey: 'stress_19', breathe: 'in' },
  { time: 575, text: 'ゆっくり吐いて...\n心が静まっています', speech: 'ゆっくり吐いて。心が静まっています', fileKey: 'stress_20', breathe: 'out' },
  { time: 590, text: 'お疲れさまでした\n足の裏への気づきが、心を穏やかにします', speech: 'お疲れさまでした。足の裏への気づきが、心を穏やかにします', fileKey: 'stress_21' },
]

const JA_MORNING_STEPS: GuideStep[] = [
  { time: 0, text: 'おはようございます\n深く息を吸い込みましょう', speech: 'おはようございます。深く息を吸い込みましょう', fileKey: 'morning_01', breathe: 'in' },
  { time: 10, text: '大きく吐いて...', speech: '大きく吐いて', fileKey: 'morning_02', breathe: 'out' },
  { time: 20, text: 'もう一度、深く吸って', speech: 'もう一度、深く吸って', fileKey: 'morning_03', breathe: 'in' },
  { time: 28, text: 'ふーっと吐いて...', speech: 'ふーっと吐いて', fileKey: 'morning_04', breathe: 'out' },
  { time: 40, text: 'では、歩き始めましょう\n足の裏に意識を集中させて', speech: 'では、歩き始めましょう。足の裏に意識を集中させて', fileKey: 'morning_05' },
  { time: 65, text: '一歩目から丁寧に\nかかとが地面に触れる感覚を感じて', speech: '一歩目から丁寧に。かかとが地面に触れる感覚を感じて', fileKey: 'morning_06' },
  { time: 95, text: '「上げる...運ぶ...下ろす」\n足を動かす意図にも気づいてみましょう', speech: '上げる、運ぶ、下ろす。足を動かす意図にも気づいてみましょう', fileKey: 'morning_07' },
  { time: 130, text: '足を上げようとする前の\nその「動かそう」という意図を観察して', speech: '足を上げようとする前の、その動かそうという意図を観察して', fileKey: 'morning_08' },
  { time: 165, text: '意図...上げる...運ぶ...下ろす\nこの四つの動きを追ってみましょう', speech: '意図、上げる、運ぶ、下ろす。この四つの動きを追ってみましょう', fileKey: 'morning_09' },
  { time: 210, text: '考えが浮かんでも大丈夫\n気づいたら、足の裏に戻るだけ', speech: '考えが浮かんでも大丈夫。気づいたら、足の裏に戻るだけ', fileKey: 'morning_10' },
  { time: 260, text: '足の裏の感覚がより鮮明に\n感じられるようになっています', speech: '足の裏の感覚がより鮮明に感じられるようになっています', fileKey: 'morning_11' },
  { time: 310, text: '一歩一歩が新鮮な体験です\nその感覚を味わい続けて', speech: '一歩一歩が新鮮な体験です。その感覚を味わい続けて', fileKey: 'morning_12' },
  { time: 360, text: 'あと1分です\n最後まで足の裏に集中して', speech: 'あと1分です。最後まで足の裏に集中して', fileKey: 'morning_13' },
  { time: 390, text: 'ゆっくりと歩みを止めて\n両足の裏の感覚を感じてください', speech: 'ゆっくりと歩みを止めて。両足の裏の感覚を感じてください', fileKey: 'morning_14', breathe: 'in' },
  { time: 405, text: 'お疲れさまでした\n気づきのある一日をお過ごしください', speech: 'お疲れさまでした。気づきのある一日をお過ごしください', fileKey: 'morning_15' },
]

const JA_EVENING_STEPS: GuideStep[] = [
  { time: 0, text: 'お疲れさまです\n今から歩く瞑想を始めます', speech: 'お疲れさまです。今から歩く瞑想を始めます', fileKey: 'evening_01' },
  { time: 10, text: 'まず、深く息を吸って', speech: 'まず、深く息を吸って', fileKey: 'evening_02', breathe: 'in' },
  { time: 22, text: 'ゆっくり吐いて...', speech: 'ゆっくり吐いて', fileKey: 'evening_03', breathe: 'out' },
  { time: 35, text: 'とてもゆっくり\n歩き始めてください', speech: 'とてもゆっくり、歩き始めてください', fileKey: 'evening_04' },
  { time: 60, text: '足の裏全体で\n地面を感じてください', speech: '足の裏全体で、地面を感じてください', fileKey: 'evening_05' },
  { time: 90, text: '「上げる...運ぶ...下ろす」\n心の中で静かに唱えて', speech: '上げる、運ぶ、下ろす。心の中で静かに唱えて', fileKey: 'evening_06' },
  { time: 130, text: 'かかとが地面に触れる瞬間\nその圧力の変化を感じて', speech: 'かかとが地面に触れる瞬間。その圧力の変化を感じて', fileKey: 'evening_07' },
  { time: 170, text: '足の裏を通して\n重さが地面に伝わっていく感覚', speech: '足の裏を通して、重さが地面に伝わっていく感覚', fileKey: 'evening_08' },
  { time: 215, text: '考えが浮かんだら\n「考え」と気づいて、足の裏に戻る', speech: '考えが浮かんだら、考えと気づいて、足の裏に戻る', fileKey: 'evening_09' },
  { time: 260, text: '歩くスピードを\nさらにゆっくりにしてみましょう', speech: '歩くスピードを、さらにゆっくりにしてみましょう', fileKey: 'evening_10' },
  { time: 300, text: 'つま先が地面を離れる瞬間\nその軽さを感じて', speech: 'つま先が地面を離れる瞬間。その軽さを感じて', fileKey: 'evening_11' },
  { time: 345, text: '足が空中を移動する感覚\nそして再び地面に触れる感覚', speech: '足が空中を移動する感覚。そして再び地面に触れる感覚', fileKey: 'evening_12' },
  { time: 390, text: '「触れる...圧...離れる...動く...下ろす」\nより細かく観察してみましょう', speech: '触れる、圧、離れる、動く、下ろす。より細かく観察してみましょう', fileKey: 'evening_13' },
  { time: 435, text: '足の裏の感覚だけが\n今ここにある確かなもの', speech: '足の裏の感覚だけが、今ここにある確かなもの', fileKey: 'evening_14' },
  { time: 475, text: '一歩一歩に\n完全な注意を注ぎ続けて', speech: '一歩一歩に、完全な注意を注ぎ続けて', fileKey: 'evening_15' },
  { time: 520, text: 'あと1分です\nゆっくりと歩みを止めてください', speech: 'あと1分です。ゆっくりと歩みを止めてください', fileKey: 'evening_16' },
  { time: 550, text: '立ち止まって\n両足の裏が地面に触れる感覚', speech: '立ち止まって。両足の裏が地面に触れる感覚', fileKey: 'evening_17', breathe: 'in' },
  { time: 565, text: '全部、吐き切って...', speech: '全部、吐き切って', fileKey: 'evening_18', breathe: 'out' },
  { time: 580, text: 'お疲れさまでした\n穏やかな夜をお過ごしください', speech: 'お疲れさまでした。穏やかな夜をお過ごしください', fileKey: 'evening_19' },
]

const JA_FOCUS_STEPS: GuideStep[] = [
  { time: 0, text: '集中力を高める歩禅です\nまず3回、深呼吸しましょう', speech: '集中力を高める歩禅です。まず3回、深呼吸しましょう', fileKey: 'focus_01', breathe: 'in' },
  { time: 10, text: '吐いて...', speech: '吐いて', fileKey: 'focus_02', breathe: 'out' },
  { time: 17, text: '吸って...', speech: '吸って', fileKey: 'focus_03', breathe: 'in' },
  { time: 24, text: '吐いて...', speech: '吐いて', fileKey: 'focus_04', breathe: 'out' },
  { time: 35, text: '歩き始めてください\n足の裏に全意識を集中させます', speech: '歩き始めてください。足の裏に全意識を集中させます', fileKey: 'focus_05' },
  { time: 50, text: '「上げる...運ぶ...下ろす」\n一歩ずつ、明確に観察して', speech: '上げる、運ぶ、下ろす。一歩ずつ、明確に観察して', fileKey: 'focus_06' },
  { time: 85, text: '気が逸れても大丈夫\n気づいたら足の裏に戻るだけ', speech: '気が逸れても大丈夫。気づいたら足の裏に戻るだけ', fileKey: 'focus_07' },
  { time: 120, text: '余計な考えが浮かんだら\n「考え」と気づいて、足に戻して', speech: '余計な考えが浮かんだら、考えと気づいて、足に戻して', fileKey: 'focus_08' },
  { time: 155, text: 'いいリズムです\n足の裏の感覚だけに集中', speech: 'いいリズムです。足の裏の感覚だけに集中', fileKey: 'focus_09' },
  { time: 195, text: 'さらに細かく観察してみましょう\nかかと...土踏まず...つま先', speech: 'さらに細かく観察してみましょう。かかと、土踏まず、つま先', fileKey: 'focus_10' },
  { time: 230, text: '足の裏への集中が\n研ぎ澄まされていきます', speech: '足の裏への集中が、研ぎ澄まされていきます', fileKey: 'focus_11' },
  { time: 260, text: 'あと30秒です\n最後まで足の裏に集中を保って', speech: 'あと30秒です。最後まで足の裏に集中を保って', fileKey: 'focus_12' },
  { time: 280, text: '深く息を吸って...', speech: '深く息を吸って', fileKey: 'focus_13', breathe: 'in' },
  { time: 290, text: 'お疲れさまでした\n集中力がリセットされました', speech: 'お疲れさまでした。集中力がリセットされました', fileKey: 'focus_14' },
]

/* ─── English Steps ─── */

const EN_BEGINNER_STEPS: GuideStep[] = [
  { time: 0, text: 'Gently close your eyes\nand take three deep breaths.', speech: 'Gently close your eyes, and take three deep breaths.', fileKey: 'day1_01', breathe: 'in' },
  { time: 8, text: 'Slowly breathe out...', speech: 'Slowly breathe out.', fileKey: 'day1_02', breathe: 'out' },
  { time: 15, text: 'Once more, breathe in...', speech: 'Once more, breathe in.', fileKey: 'day1_03', breathe: 'in' },
  { time: 22, text: 'And breathe out...', speech: 'And breathe out.', fileKey: 'day1_04', breathe: 'out' },
  { time: 30, text: 'Now, slowly begin walking.\nMuch slower than usual.', speech: 'Now, slowly begin walking. Much slower than usual.', fileKey: 'day1_05' },
  { time: 40, text: 'Bring your attention\nto the sole of your right foot.', speech: 'Bring your attention to the sole of your right foot as it leaves the ground.', fileKey: 'day1_06' },
  { time: 55, text: 'Now your left foot.\nFeel your heel touch the ground.', speech: 'Now your left foot. Feel your heel as it touches the ground.', fileKey: 'day1_07' },
  { time: 75, text: '"Lifting... moving... placing."\nNote each movement silently.', speech: 'Lifting, moving, placing. Note each movement silently in your mind.', fileKey: 'day1_08' },
  { time: 100, text: 'Focus only on the soles of your feet.\nFeel the weight shift from heel to toe.', speech: 'Focus only on the soles of your feet. Feel the weight shifting from heel to toe.', fileKey: 'day1_09' },
  { time: 130, text: 'The lightness as your foot lifts.\nThe weight as it lands.', speech: 'Notice the lightness as your foot lifts. The weight as it lands. Observe these changes.', fileKey: 'day1_10' },
  { time: 150, text: 'When thoughts arise, note "thinking."\nThen gently return to your feet.', speech: 'When thoughts arise, simply note thinking. Then gently return your attention to your feet.', fileKey: 'day1_11' },
  { time: 180, text: 'Very good. Continue.\nObserving each step closely.', speech: 'Very good. Continue observing each step closely.', fileKey: 'day1_12' },
  { time: 210, text: 'Feel the warmth, the pressure\non the soles of your feet.', speech: 'Feel the warmth and the pressure on the soles of your feet. Simply notice the changes.', fileKey: 'day1_13' },
  { time: 240, text: 'One minute left.\nStay focused on your soles.', speech: 'One minute left. Stay focused on the sensations in your soles.', fileKey: 'day1_14' },
  { time: 270, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'day1_15' },
  { time: 280, text: 'Standing still, feel both feet\nresting on the ground.', speech: 'Standing still, feel both feet resting fully on the ground.', fileKey: 'day1_16', breathe: 'in' },
  { time: 287, text: 'Slowly breathe out...', speech: 'Slowly breathe out.', fileKey: 'day1_17', breathe: 'out' },
  { time: 295, text: 'Well done.\nA beautiful walking meditation.', speech: 'Well done. That was a beautiful walking meditation.', fileKey: 'day1_18' },
]

const EN_TIMER_STEPS: GuideStep[] = [
  { time: 0, text: 'Your walking meditation begins.\nWalk at your own pace.', speech: 'Your walking meditation begins now. Walk at your own pace.', fileKey: 'silent_start' },
  { time: 150, text: "You're halfway through.", speech: "You're halfway through.", fileKey: 'silent_half' },
  { time: 290, text: 'Almost finished.', speech: 'Almost finished.', fileKey: 'silent_end' },
]

const EN_STRESS_STEPS: GuideStep[] = [
  { time: 0, text: 'Stand still, and\ngently close your eyes.', speech: 'Stand still, and gently close your eyes.', fileKey: 'stress_01', breathe: 'in' },
  { time: 8, text: 'Breathe in deeply\nthrough your nose.', speech: 'Breathe in deeply through your nose.', fileKey: 'stress_02', breathe: 'in' },
  { time: 16, text: 'Slowly breathe out.\nRelease all tension.', speech: 'Slowly breathe out. Release all tension.', fileKey: 'stress_03', breathe: 'out' },
  { time: 25, text: 'Once more, breathe in deeply.', speech: 'Once more, breathe in deeply.', fileKey: 'stress_04', breathe: 'in' },
  { time: 33, text: 'And let it all go.', speech: 'And let it all go with a long exhale.', fileKey: 'stress_05', breathe: 'out' },
  { time: 45, text: 'Begin walking slowly.\nA little slower than usual.', speech: 'Now, begin walking slowly. A little slower than usual.', fileKey: 'stress_06' },
  { time: 70, text: 'Bring all your attention\nto the soles of your feet.', speech: 'Bring all your attention to the soles of your feet. Feel your heel touching the ground.', fileKey: 'stress_07' },
  { time: 100, text: '"Lifting... moving... placing."\nObserve each step carefully.', speech: 'Lifting, moving, placing. Observe each step carefully.', fileKey: 'stress_08' },
  { time: 135, text: 'Worries may arise. That\'s okay.\nNote "thinking," return to your feet.', speech: "Worries may arise. That's okay. Note thinking, and return to your feet.", fileKey: 'stress_09' },
  { time: 170, text: 'Notice, return.\nThis is the practice.', speech: 'Notice, and return. This repetition is the essence of meditation.', fileKey: 'stress_10' },
  { time: 210, text: 'Feel the moment your toes\nleave the ground.', speech: 'Feel the moment your toes leave the ground. Notice your foot moving through the air.', fileKey: 'stress_11' },
  { time: 260, text: 'Feel the weight and warmth\nas your foot meets the ground.', speech: 'Feel the weight and warmth as your foot meets the ground again.', fileKey: 'stress_12' },
  { time: 310, text: 'Slow your pace even more.\nObserve the finer sensations.', speech: 'Slow your pace even more. Observe the finer sensations in your feet.', fileKey: 'stress_13' },
  { time: 350, text: '"Touch... pressure...\nlifting... lightness."', speech: 'Touch, pressure, lifting, lightness. Follow the changing sensations in your soles.', fileKey: 'stress_14' },
  { time: 390, text: 'Wonderful. Continue.\nKeep your awareness on your feet.', speech: 'Wonderful. Continue keeping your awareness on your feet.', fileKey: 'stress_15' },
  { time: 440, text: 'In this moment, the sensation\nin your feet is all there is.', speech: 'In this moment, the sensation in your feet is all there is.', fileKey: 'stress_16' },
  { time: 490, text: 'Keep noticing the richness\nwithin each single step.', speech: 'Keep noticing the richness of sensation within each single step.', fileKey: 'stress_17' },
  { time: 530, text: 'One minute left.\nSlowly ease your pace.', speech: 'One minute left. Slowly ease your pace.', fileKey: 'stress_18' },
  { time: 560, text: 'Come to a stop.\nFeel both feet on the ground.', speech: 'Come to a stop. Feel both feet fully resting on the ground.', fileKey: 'stress_19', breathe: 'in' },
  { time: 575, text: 'Slowly breathe out.\nYour mind has found its calm.', speech: 'Slowly breathe out. Your mind has found its calm.', fileKey: 'stress_20', breathe: 'out' },
  { time: 590, text: 'Well done.\nAwareness of your feet brings peace.', speech: 'Well done. Awareness of your feet brings peace to the mind.', fileKey: 'stress_21' },
]

const EN_MORNING_STEPS: GuideStep[] = [
  { time: 0, text: 'Good morning.\nTake a deep breath in.', speech: 'Good morning. Take a deep breath in.', fileKey: 'morning_01', breathe: 'in' },
  { time: 10, text: 'Breathe out fully.', speech: 'Breathe out fully.', fileKey: 'morning_02', breathe: 'out' },
  { time: 20, text: 'Once more, breathe in deeply.', speech: 'Once more, breathe in deeply.', fileKey: 'morning_03', breathe: 'in' },
  { time: 28, text: 'And breathe out.', speech: 'And breathe out.', fileKey: 'morning_04', breathe: 'out' },
  { time: 40, text: 'Begin walking.\nFocus on the soles of your feet.', speech: 'Begin walking. Focus your attention on the soles of your feet.', fileKey: 'morning_05' },
  { time: 65, text: 'From the very first step,\nfeel your heel touch the ground.', speech: 'From the very first step, feel your heel as it touches the ground.', fileKey: 'morning_06' },
  { time: 95, text: '"Lifting... moving... placing."\nNotice the intention before each step.', speech: 'Lifting, moving, placing. Notice the intention that arises before each step.', fileKey: 'morning_07' },
  { time: 130, text: 'Before lifting your foot,\nobserve the intention to move.', speech: 'Before lifting your foot, observe that subtle intention to move.', fileKey: 'morning_08' },
  { time: 165, text: '"Intending... lifting...\nmoving... placing."', speech: 'Intending, lifting, moving, placing. Follow these four movements.', fileKey: 'morning_09' },
  { time: 210, text: 'Thoughts will come. No problem.\nNotice, then return to your feet.', speech: "Thoughts will come. That's no problem. Simply notice, then return to your feet.", fileKey: 'morning_10' },
  { time: 260, text: 'The sensations in your soles\nare becoming clearer.', speech: 'The sensations in your soles are becoming clearer now.', fileKey: 'morning_11' },
  { time: 310, text: 'Each step is a fresh experience.\nKeep savoring those sensations.', speech: 'Each step is a fresh experience. Keep savoring those sensations.', fileKey: 'morning_12' },
  { time: 360, text: 'One minute left.\nStay focused on your soles.', speech: 'One minute left. Stay focused on your soles until the end.', fileKey: 'morning_13' },
  { time: 390, text: 'Slowly stop walking.\nFeel both feet on the ground.', speech: 'Slowly stop walking. Feel both feet resting on the ground.', fileKey: 'morning_14', breathe: 'in' },
  { time: 405, text: 'Well done.\nCarry this awareness through your day.', speech: 'Well done. Carry this awareness with you through your day.', fileKey: 'morning_15' },
]

const EN_EVENING_STEPS: GuideStep[] = [
  { time: 0, text: 'Good evening.\nLet us begin walking meditation.', speech: 'Good evening. Let us begin walking meditation.', fileKey: 'evening_01' },
  { time: 10, text: 'Take a deep breath in.', speech: 'Take a deep breath in.', fileKey: 'evening_02', breathe: 'in' },
  { time: 22, text: 'Slowly breathe out.', speech: 'Slowly breathe out.', fileKey: 'evening_03', breathe: 'out' },
  { time: 35, text: 'Begin walking.\nVery, very slowly.', speech: 'Begin walking, very, very slowly.', fileKey: 'evening_04' },
  { time: 60, text: 'Feel the entire sole\nof each foot on the ground.', speech: 'Feel the entire sole of each foot as it touches the ground.', fileKey: 'evening_05' },
  { time: 90, text: '"Lifting... moving... placing."\nNote each movement quietly.', speech: 'Lifting, moving, placing. Note each movement quietly in your mind.', fileKey: 'evening_06' },
  { time: 130, text: 'Feel the moment your heel\ntouches down. The pressure changes.', speech: 'Feel the moment your heel touches down. Notice how the pressure changes.', fileKey: 'evening_07' },
  { time: 170, text: 'Through the soles of your feet,\nfeel your weight meeting the earth.', speech: 'Through the soles of your feet, feel your weight meeting the earth.', fileKey: 'evening_08' },
  { time: 215, text: 'When thoughts arise,\nnote "thinking," return to your feet.', speech: 'When thoughts arise, note thinking, and gently return to your feet.', fileKey: 'evening_09' },
  { time: 260, text: 'Slow your pace even more.', speech: 'Slow your pace even more.', fileKey: 'evening_10' },
  { time: 300, text: 'Feel the moment your toes\nleave the ground. The lightness.', speech: 'Feel the moment your toes leave the ground. Notice the lightness.', fileKey: 'evening_11' },
  { time: 345, text: 'Your foot moves through the air.\nThen it meets the ground again.', speech: 'Your foot moves through the air. Then it meets the ground once more.', fileKey: 'evening_12' },
  { time: 390, text: '"Touching... pressure...\nlifting... moving... placing."', speech: 'Touching, pressure, lifting, moving, placing. Observe more closely now.', fileKey: 'evening_13' },
  { time: 435, text: 'The sensation in your feet\nis the only certain thing right now.', speech: 'The sensation in your feet is the only certain thing right now.', fileKey: 'evening_14' },
  { time: 475, text: 'Give each step\nyour complete attention.', speech: 'Give each step your complete and undivided attention.', fileKey: 'evening_15' },
  { time: 520, text: 'One minute left.\nGently come to a stop.', speech: 'One minute left. Gently come to a stop.', fileKey: 'evening_16' },
  { time: 550, text: 'Stand still.\nFeel both feet on the ground.', speech: 'Stand still. Feel both feet resting on the ground.', fileKey: 'evening_17', breathe: 'in' },
  { time: 565, text: 'Let it all out...', speech: 'Let it all out.', fileKey: 'evening_18', breathe: 'out' },
  { time: 580, text: 'Well done.\nHave a peaceful evening.', speech: 'Well done. Have a peaceful evening.', fileKey: 'evening_19' },
]

const EN_FOCUS_STEPS: GuideStep[] = [
  { time: 0, text: 'A focus-boosting meditation.\nThree deep breaths to start.', speech: "This is a focus-boosting meditation. Let's start with three deep breaths.", fileKey: 'focus_01', breathe: 'in' },
  { time: 10, text: 'Breathe out...', speech: 'Breathe out.', fileKey: 'focus_02', breathe: 'out' },
  { time: 17, text: 'Breathe in...', speech: 'Breathe in.', fileKey: 'focus_03', breathe: 'in' },
  { time: 24, text: 'Breathe out...', speech: 'Breathe out.', fileKey: 'focus_04', breathe: 'out' },
  { time: 35, text: 'Start walking.\nBring all focus to your soles.', speech: 'Start walking. Bring all your focus to the soles of your feet.', fileKey: 'focus_05' },
  { time: 50, text: '"Lifting... moving... placing."\nObserve each movement clearly.', speech: 'Lifting, moving, placing. Observe each movement clearly.', fileKey: 'focus_06' },
  { time: 85, text: 'Lost focus? No problem.\nReturn to the soles of your feet.', speech: "If you lose focus, that's fine. Simply return to the soles of your feet.", fileKey: 'focus_07' },
  { time: 120, text: 'Stray thoughts?\nNote "thinking," return to your feet.', speech: 'When stray thoughts arise, note thinking, and return to your feet.', fileKey: 'focus_08' },
  { time: 155, text: 'Great rhythm.\nFeel only the soles of your feet.', speech: 'Great rhythm. Feel only the sensations in the soles of your feet.', fileKey: 'focus_09' },
  { time: 195, text: 'Now observe more closely.\nHeel... arch... toes.', speech: 'Now observe more closely. Heel, arch, toes.', fileKey: 'focus_10' },
  { time: 230, text: 'Your focus on your soles\nis sharpening.', speech: 'Your focus on the soles of your feet is sharpening.', fileKey: 'focus_11' },
  { time: 260, text: 'Thirty seconds left.\nStay focused on your feet.', speech: 'Thirty seconds left. Stay focused on your feet until the end.', fileKey: 'focus_12' },
  { time: 280, text: 'Take a deep breath in...', speech: 'Take a deep breath in.', fileKey: 'focus_13', breathe: 'in' },
  { time: 290, text: 'Well done.\nYour focus has been reset.', speech: 'Well done. Your focus has been reset.', fileKey: 'focus_14' },
]

/* ─── 7-Day Course: Japanese ─── */

const JA_COURSE_DAY1_STEPS: GuideStep[] = [
  { time: 0, text: '目を軽く閉じて、深呼吸しましょう', speech: '目を軽く閉じて、深呼吸しましょう', fileKey: 'cd1_01', breathe: 'in' },
  { time: 8, text: 'ゆっくり吐いて...', speech: 'ゆっくり吐いて', fileKey: 'cd1_02', breathe: 'out' },
  { time: 15, text: 'もう一度、吸って...', speech: 'もう一度、吸って', fileKey: 'cd1_03', breathe: 'in' },
  { time: 22, text: '吐いて...', speech: '吐いて', fileKey: 'cd1_04', breathe: 'out' },
  { time: 30, text: 'では、ゆっくり歩き始めてください\n視線は1.5メートルほど先の地面に', speech: 'では、ゆっくり歩き始めてください。視線は1.5メートルほど先の地面に', fileKey: 'cd1_05' },
  { time: 50, text: '右足が動くとき「右」\n左足が動くとき「左」\n心の中で唱えてください', speech: '右足が動くとき、右。左足が動くとき、左。心の中で唱えてください', fileKey: 'cd1_06' },
  { time: 80, text: '右...左...右...左...\nただそれだけに意識を向けて', speech: '右、左、右、左。ただそれだけに意識を向けて', fileKey: 'cd1_07' },
  { time: 120, text: '考えが浮かんでも大丈夫\n気づいたら「右」「左」に戻るだけ', speech: '考えが浮かんでも大丈夫。気づいたら、右、左に戻るだけ', fileKey: 'cd1_08' },
  { time: 170, text: 'シンプルに\n右...左...右...左...', speech: 'シンプルに。右、左、右、左', fileKey: 'cd1_09' },
  { time: 210, text: 'いいですね、そのまま\n足の交替だけに集中して', speech: 'いいですね、そのまま。足の交替だけに集中して', fileKey: 'cd1_10' },
  { time: 240, text: 'あと1分です\n最後まで「右」「左」の気づきを続けて', speech: 'あと1分です。最後まで、右、左の気づきを続けて', fileKey: 'cd1_11' },
  { time: 270, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'cd1_12' },
  { time: 280, text: '立ち止まったまま\n両足の裏を感じて', speech: '立ち止まったまま、両足の裏を感じて', fileKey: 'cd1_13' },
  { time: 295, text: 'お疲れさまでした\n素晴らしい歩禅でした', speech: 'お疲れさまでした。素晴らしい歩禅でした', fileKey: 'cd1_14' },
]

const JA_COURSE_DAY2_STEPS: GuideStep[] = [
  { time: 0, text: '目を軽く閉じて、深呼吸しましょう', speech: '目を軽く閉じて、深呼吸しましょう', fileKey: 'cd2_01', breathe: 'in' },
  { time: 8, text: 'ゆっくり吐いて...', speech: 'ゆっくり吐いて', fileKey: 'cd2_02', breathe: 'out' },
  { time: 15, text: 'もう一度、吸って...', speech: 'もう一度、吸って', fileKey: 'cd2_03', breathe: 'in' },
  { time: 22, text: '吐いて...', speech: '吐いて', fileKey: 'cd2_04', breathe: 'out' },
  { time: 30, text: 'ゆっくり歩き始めてください\n昨日より少しだけゆっくりと', speech: 'ゆっくり歩き始めてください。昨日より少しだけゆっくりと', fileKey: 'cd2_05' },
  { time: 50, text: '今日は「上げる」と「下ろす」\nこの二つの動きを観察します', speech: '今日は、上げると下ろす。この二つの動きを観察します', fileKey: 'cd2_06' },
  { time: 75, text: '足が地面から離れる瞬間「上げる」\n地面に触れる瞬間「下ろす」', speech: '足が地面から離れる瞬間、上げる。地面に触れる瞬間、下ろす', fileKey: 'cd2_07' },
  { time: 105, text: '上げる...下ろす...上げる...下ろす...\n心の中で唱えながら', speech: '上げる、下ろす、上げる、下ろす。心の中で唱えながら', fileKey: 'cd2_08' },
  { time: 140, text: '足の裏が地面から離れる感覚\n触れる感覚。その違いを味わって', speech: '足の裏が地面から離れる感覚。触れる感覚。その違いを味わって', fileKey: 'cd2_09' },
  { time: 175, text: '考えが浮かんだら「考え」と気づいて\n足に戻るだけ', speech: '考えが浮かんだら、考えと気づいて。足に戻るだけ', fileKey: 'cd2_10' },
  { time: 210, text: '上げる...下ろす...\nシンプルに、丁寧に', speech: '上げる、下ろす。シンプルに、丁寧に', fileKey: 'cd2_11' },
  { time: 240, text: 'いいですね\n足の裏の感覚がより鮮明になっています', speech: 'いいですね。足の裏の感覚がより鮮明になっています', fileKey: 'cd2_12' },
  { time: 260, text: 'あと1分です\n「上げる」「下ろす」に集中し続けて', speech: 'あと1分です。上げる、下ろすに集中し続けて', fileKey: 'cd2_13' },
  { time: 280, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'cd2_14' },
  { time: 288, text: '両足の裏の感覚を感じて', speech: '両足の裏の感覚を感じて', fileKey: 'cd2_15' },
  { time: 295, text: 'お疲れさまでした\n明日はさらに細かく観察しましょう', speech: 'お疲れさまでした。明日はさらに細かく観察しましょう', fileKey: 'cd2_16' },
]

// Day 3 = existing JA_BEGINNER_STEPS (lifting/moving/placing)

const JA_COURSE_DAY4_STEPS: GuideStep[] = [
  { time: 0, text: '目を軽く閉じて、深呼吸しましょう', speech: '目を軽く閉じて、深呼吸しましょう', fileKey: 'cd4_01', breathe: 'in' },
  { time: 8, text: 'ゆっくり吐いて...', speech: 'ゆっくり吐いて', fileKey: 'cd4_02', breathe: 'out' },
  { time: 15, text: 'もう一度、吸って...', speech: 'もう一度、吸って', fileKey: 'cd4_03', breathe: 'in' },
  { time: 22, text: '吐いて...', speech: '吐いて', fileKey: 'cd4_04', breathe: 'out' },
  { time: 32, text: '今日はさらに深く\n普段よりずっとゆっくり歩いてください', speech: '今日はさらに深く。普段よりずっとゆっくり歩いてください', fileKey: 'cd4_05' },
  { time: 55, text: '「上げる...運ぶ...下ろす」に加えて\n今日は「意図」を観察します', speech: '上げる、運ぶ、下ろすに加えて、今日は意図を観察します', fileKey: 'cd4_06' },
  { time: 85, text: '足を上げる前に\n「動かそう」という微かな意図が生まれます', speech: '足を上げる前に、動かそうという微かな意図が生まれます', fileKey: 'cd4_07' },
  { time: 115, text: '意図...上げる...運ぶ...下ろす\nこの四つを追ってみましょう', speech: '意図、上げる、運ぶ、下ろす。この四つを追ってみましょう', fileKey: 'cd4_08' },
  { time: 155, text: '意図が先、動きが後\nこの順番に気づくことが大切です', speech: '意図が先、動きが後。この順番に気づくことが大切です', fileKey: 'cd4_09' },
  { time: 195, text: '考えが浮かんだら「考え」と気づいて\n意図の観察に戻る', speech: '考えが浮かんだら、考えと気づいて。意図の観察に戻る', fileKey: 'cd4_10' },
  { time: 235, text: '意図...上げる...運ぶ...下ろす...\nそのまま続けて', speech: '意図、上げる、運ぶ、下ろす。そのまま続けて', fileKey: 'cd4_11' },
  { time: 275, text: '意図の瞬間はとても微かです\n気づけなくても焦らないで', speech: '意図の瞬間はとても微かです。気づけなくても焦らないで', fileKey: 'cd4_12' },
  { time: 315, text: 'そのまま続けて\n意図への気づきが深まっていきます', speech: 'そのまま続けて。意図への気づきが深まっていきます', fileKey: 'cd4_13' },
  { time: 350, text: '足の裏の感覚と、動く前の意図\nこの二つに注意を向けて', speech: '足の裏の感覚と、動く前の意図。この二つに注意を向けて', fileKey: 'cd4_14' },
  { time: 385, text: 'あと1分です\n最後まで四つの動きを追い続けて', speech: 'あと1分です。最後まで四つの動きを追い続けて', fileKey: 'cd4_15' },
  { time: 405, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'cd4_16' },
  { time: 413, text: '立ち止まって\n両足の裏の感覚を感じて', speech: '立ち止まって、両足の裏の感覚を感じて', fileKey: 'cd4_17' },
  { time: 420, text: 'お疲れさまでした\n意図への気づきが深まりました', speech: 'お疲れさまでした。意図への気づきが深まりました', fileKey: 'cd4_18' },
]

const JA_COURSE_DAY5_STEPS: GuideStep[] = [
  { time: 0, text: '目を軽く閉じて、深呼吸しましょう', speech: '目を軽く閉じて、深呼吸しましょう', fileKey: 'cd5_01', breathe: 'in' },
  { time: 8, text: 'ゆっくり吐いて...', speech: 'ゆっくり吐いて', fileKey: 'cd5_02', breathe: 'out' },
  { time: 15, text: 'もう一度、吸って...', speech: 'もう一度、吸って', fileKey: 'cd5_03', breathe: 'in' },
  { time: 22, text: '吐いて...', speech: '吐いて', fileKey: 'cd5_04', breathe: 'out' },
  { time: 32, text: '今日は最も細かい観察です\nとてもゆっくり歩いてください', speech: '今日は最も細かい観察です。とてもゆっくり歩いてください', fileKey: 'cd5_05' },
  { time: 55, text: 'まず「上げる...運ぶ...下ろす」\nから始めましょう', speech: 'まず、上げる、運ぶ、下ろすから始めましょう', fileKey: 'cd5_06' },
  { time: 85, text: '慣れてきたら\nさらに細かく分けていきます', speech: '慣れてきたら、さらに細かく分けていきます', fileKey: 'cd5_07' },
  { time: 115, text: '足が地面に触れる瞬間「触れる」\n体重がかかる「圧」', speech: '足が地面に触れる瞬間、触れる。体重がかかる、圧', fileKey: 'cd5_08' },
  { time: 150, text: '足が離れる「離れる」\n空中を動く「動く」\n下ろす「下ろす」', speech: '足が離れる、離れる。空中を動く、動く。下ろす、下ろす', fileKey: 'cd5_09' },
  { time: 190, text: '触れる...圧...離れる...動く...下ろす...', speech: '触れる、圧、離れる、動く、下ろす', fileKey: 'cd5_10' },
  { time: 230, text: '考えが浮かんでも「考え」と気づいて\n足の感覚に戻る', speech: '考えが浮かんでも、考えと気づいて。足の感覚に戻る', fileKey: 'cd5_11' },
  { time: 270, text: '一歩の中にこれほど豊かな\n感覚があります', speech: '一歩の中にこれほど豊かな感覚があります', fileKey: 'cd5_12' },
  { time: 310, text: '触れる...圧...離れる...動く...下ろす...\nそのまま続けて', speech: '触れる、圧、離れる、動く、下ろす。そのまま続けて', fileKey: 'cd5_13' },
  { time: 345, text: 'かかとの温度、つま先の圧力\n土踏まずの軽さ。細部を味わって', speech: 'かかとの温度、つま先の圧力、土踏まずの軽さ。細部を味わって', fileKey: 'cd5_14' },
  { time: 380, text: 'そのまま続けて\n観察がどんどん鮮明になっていきます', speech: 'そのまま続けて。観察がどんどん鮮明になっていきます', fileKey: 'cd5_15' },
  { time: 400, text: 'あと1分です\n最後まで細密な観察を続けて', speech: 'あと1分です。最後まで細密な観察を続けて', fileKey: 'cd5_16' },
  { time: 415, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'cd5_17' },
  { time: 420, text: '両足の裏の感覚を感じて', speech: '両足の裏の感覚を感じて', fileKey: 'cd5_18' },
  { time: 425, text: 'お疲れさまでした\n観察力が深まっています', speech: 'お疲れさまでした。観察力が深まっています', fileKey: 'cd5_19' },
]

const JA_COURSE_DAY6_STEPS: GuideStep[] = [
  { time: 0, text: '深呼吸しましょう', speech: '深呼吸しましょう', fileKey: 'cd6_01', breathe: 'in' },
  { time: 8, text: 'ゆっくり吐いて...', speech: 'ゆっくり吐いて', fileKey: 'cd6_02', breathe: 'out' },
  { time: 18, text: '今日はガイドを最小限にします\nご自身のペースで歩いてください', speech: '今日はガイドを最小限にします。ご自身のペースで歩いてください', fileKey: 'cd6_03' },
  { time: 40, text: 'これまで学んだノーティングを\n自分のやりやすい方法で続けて', speech: 'これまで学んだノーティングを、自分のやりやすい方法で続けて', fileKey: 'cd6_04' },
  { time: 180, text: '足の裏に意識を戻してください', speech: '足の裏に意識を戻してください', fileKey: 'cd6_05' },
  { time: 330, text: '考えに気づいたら\n足に戻るだけ', speech: '考えに気づいたら、足に戻るだけ', fileKey: 'cd6_06' },
  { time: 470, text: 'そのまま\n足の裏の感覚に集中して', speech: 'そのまま、足の裏の感覚に集中して', fileKey: 'cd6_07' },
  { time: 550, text: 'あと1分です\nゆっくりと歩みを止めてください', speech: 'あと1分です。ゆっくりと歩みを止めてください', fileKey: 'cd6_08' },
  { time: 585, text: '両足の裏を感じて', speech: '両足の裏を感じて', fileKey: 'cd6_09' },
  { time: 595, text: 'お疲れさまでした\n自分自身の力で瞑想できました', speech: 'お疲れさまでした。自分自身の力で瞑想できました', fileKey: 'cd6_10' },
]

// Day 7 = bell-only silent meditation (no voice steps, handled in UI)
const JA_COURSE_DAY7_STEPS: GuideStep[] = [
  { time: 0, text: '', speech: '', fileKey: 'bell_start' },
  { time: 300, text: '', speech: '', fileKey: 'bell_half' },
  { time: 595, text: '', speech: '', fileKey: 'bell_end' },
]

/* ─── 7-Day Course: English ─── */

const EN_COURSE_DAY1_STEPS: GuideStep[] = [
  { time: 0, text: 'Gently close your eyes\nand take a deep breath.', speech: 'Gently close your eyes, and take a deep breath.', fileKey: 'cd1_01', breathe: 'in' },
  { time: 8, text: 'Slowly breathe out...', speech: 'Slowly breathe out.', fileKey: 'cd1_02', breathe: 'out' },
  { time: 15, text: 'Once more, breathe in...', speech: 'Once more, breathe in.', fileKey: 'cd1_03', breathe: 'in' },
  { time: 22, text: 'And breathe out...', speech: 'And breathe out.', fileKey: 'cd1_04', breathe: 'out' },
  { time: 30, text: 'Begin walking slowly.\nCast your gaze about 1.5 meters ahead.', speech: 'Begin walking slowly. Cast your gaze about one and a half meters ahead on the ground.', fileKey: 'cd1_05' },
  { time: 50, text: 'When your right foot moves, note "right."\nWhen your left foot moves, "left."', speech: 'When your right foot moves, silently note right. When your left foot moves, left.', fileKey: 'cd1_06' },
  { time: 80, text: 'Right... left... right... left...\nJust this. Nothing else.', speech: 'Right, left, right, left. Just this. Nothing else.', fileKey: 'cd1_07' },
  { time: 120, text: 'Thoughts will arise. No problem.\nJust return to "right" and "left."', speech: 'Thoughts will arise. No problem. Just return to right and left.', fileKey: 'cd1_08' },
  { time: 170, text: 'Keep it simple.\nRight... left... right... left...', speech: 'Keep it simple. Right, left, right, left.', fileKey: 'cd1_09' },
  { time: 210, text: 'Very good. Continue.\nFocus only on the alternation.', speech: 'Very good. Continue. Focus only on the alternation of your feet.', fileKey: 'cd1_10' },
  { time: 240, text: 'One minute left.\nKeep noting "right" and "left."', speech: 'One minute left. Keep noting right and left until the end.', fileKey: 'cd1_11' },
  { time: 270, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'cd1_12' },
  { time: 280, text: 'Standing still,\nfeel both feet on the ground.', speech: 'Standing still, feel both feet on the ground.', fileKey: 'cd1_13' },
  { time: 295, text: 'Well done.\nA beautiful walking meditation.', speech: 'Well done. That was a beautiful walking meditation.', fileKey: 'cd1_14' },
]

const EN_COURSE_DAY2_STEPS: GuideStep[] = [
  { time: 0, text: 'Gently close your eyes\nand take a deep breath.', speech: 'Gently close your eyes, and take a deep breath.', fileKey: 'cd2_01', breathe: 'in' },
  { time: 8, text: 'Slowly breathe out...', speech: 'Slowly breathe out.', fileKey: 'cd2_02', breathe: 'out' },
  { time: 15, text: 'Once more, breathe in...', speech: 'Once more, breathe in.', fileKey: 'cd2_03', breathe: 'in' },
  { time: 22, text: 'And breathe out...', speech: 'And breathe out.', fileKey: 'cd2_04', breathe: 'out' },
  { time: 30, text: 'Begin walking slowly.\nA bit slower than yesterday.', speech: 'Begin walking slowly. A bit slower than yesterday.', fileKey: 'cd2_05' },
  { time: 50, text: 'Today we observe two movements:\n"lifting" and "placing."', speech: 'Today we observe two movements. Lifting, and placing.', fileKey: 'cd2_06' },
  { time: 75, text: 'As your foot leaves the ground: "lifting."\nAs it touches down: "placing."', speech: 'As your foot leaves the ground, note lifting. As it touches down, placing.', fileKey: 'cd2_07' },
  { time: 105, text: 'Lifting... placing...\nlifting... placing...', speech: 'Lifting, placing, lifting, placing. Note each one silently.', fileKey: 'cd2_08' },
  { time: 140, text: 'Feel the difference:\nleaving the ground, touching the ground.', speech: 'Feel the difference. The sensation of leaving the ground, and touching the ground.', fileKey: 'cd2_09' },
  { time: 175, text: 'When thoughts arise, note "thinking."\nReturn to your feet.', speech: 'When thoughts arise, note thinking. Then return to your feet.', fileKey: 'cd2_10' },
  { time: 210, text: 'Lifting... placing...\nSimple and careful.', speech: 'Lifting, placing. Simple and careful.', fileKey: 'cd2_11' },
  { time: 240, text: 'Good. The sensations in your soles\nare becoming clearer.', speech: 'Good. The sensations in your soles are becoming clearer.', fileKey: 'cd2_12' },
  { time: 260, text: 'One minute left.\nStay with "lifting" and "placing."', speech: 'One minute left. Stay with lifting and placing.', fileKey: 'cd2_13' },
  { time: 280, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'cd2_14' },
  { time: 288, text: 'Feel both feet on the ground.', speech: 'Feel both feet on the ground.', fileKey: 'cd2_15' },
  { time: 295, text: 'Well done.\nTomorrow we go even deeper.', speech: 'Well done. Tomorrow we go even deeper.', fileKey: 'cd2_16' },
]

// Day 3 = existing EN_BEGINNER_STEPS

const EN_COURSE_DAY4_STEPS: GuideStep[] = [
  { time: 0, text: 'Gently close your eyes\nand take a deep breath.', speech: 'Gently close your eyes, and take a deep breath.', fileKey: 'cd4_01', breathe: 'in' },
  { time: 8, text: 'Slowly breathe out...', speech: 'Slowly breathe out.', fileKey: 'cd4_02', breathe: 'out' },
  { time: 15, text: 'Once more, breathe in...', speech: 'Once more, breathe in.', fileKey: 'cd4_03', breathe: 'in' },
  { time: 22, text: 'And breathe out...', speech: 'And breathe out.', fileKey: 'cd4_04', breathe: 'out' },
  { time: 32, text: 'Today we go deeper.\nWalk much slower than usual.', speech: 'Today we go deeper. Walk much slower than usual.', fileKey: 'cd4_05' },
  { time: 55, text: 'We add "intending" before\nlifting, moving, and placing.', speech: 'We add intending before lifting, moving, and placing.', fileKey: 'cd4_06' },
  { time: 85, text: 'Before lifting your foot,\na subtle intention to move arises.', speech: 'Before lifting your foot, a subtle intention to move arises. Notice it.', fileKey: 'cd4_07' },
  { time: 115, text: 'Intending... lifting...\nmoving... placing.', speech: 'Intending, lifting, moving, placing. Follow these four movements.', fileKey: 'cd4_08' },
  { time: 155, text: 'Intention comes first, then movement.\nNoticing this order is key.', speech: 'Intention comes first, then movement. Noticing this order is the key.', fileKey: 'cd4_09' },
  { time: 195, text: 'When thoughts arise, note "thinking."\nReturn to observing intention.', speech: 'When thoughts arise, note thinking. Return to observing intention.', fileKey: 'cd4_10' },
  { time: 235, text: 'Intending... lifting...\nmoving... placing...', speech: 'Intending, lifting, moving, placing. Continue.', fileKey: 'cd4_11' },
  { time: 275, text: 'The moment of intention is very subtle.\nDon\'t worry if you miss it.', speech: "The moment of intention is very subtle. Don't worry if you miss it.", fileKey: 'cd4_12' },
  { time: 315, text: 'Keep going.\nYour awareness of intention will deepen.', speech: 'Keep going. Your awareness of intention will deepen with practice.', fileKey: 'cd4_13' },
  { time: 350, text: 'Foot sensations and intention.\nHold both in your awareness.', speech: 'Foot sensations and intention. Hold both in your awareness.', fileKey: 'cd4_14' },
  { time: 385, text: 'One minute left.\nStay with the four movements.', speech: 'One minute left. Stay with the four movements until the end.', fileKey: 'cd4_15' },
  { time: 405, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'cd4_16' },
  { time: 413, text: 'Stand still.\nFeel both feet on the ground.', speech: 'Stand still. Feel both feet on the ground.', fileKey: 'cd4_17' },
  { time: 420, text: 'Well done.\nYour awareness of intention has deepened.', speech: 'Well done. Your awareness of intention has deepened.', fileKey: 'cd4_18' },
]

const EN_COURSE_DAY5_STEPS: GuideStep[] = [
  { time: 0, text: 'Gently close your eyes\nand take a deep breath.', speech: 'Gently close your eyes, and take a deep breath.', fileKey: 'cd5_01', breathe: 'in' },
  { time: 8, text: 'Slowly breathe out...', speech: 'Slowly breathe out.', fileKey: 'cd5_02', breathe: 'out' },
  { time: 15, text: 'Once more, breathe in...', speech: 'Once more, breathe in.', fileKey: 'cd5_03', breathe: 'in' },
  { time: 22, text: 'And breathe out...', speech: 'And breathe out.', fileKey: 'cd5_04', breathe: 'out' },
  { time: 32, text: 'Today is the finest observation.\nWalk very, very slowly.', speech: 'Today is the finest level of observation. Walk very, very slowly.', fileKey: 'cd5_05' },
  { time: 55, text: 'Start with "lifting... moving...\nplacing..." to settle in.', speech: 'Start with lifting, moving, placing to settle in.', fileKey: 'cd5_06' },
  { time: 85, text: 'When ready,\nbreak it down even further.', speech: 'When you are ready, break it down even further.', fileKey: 'cd5_07' },
  { time: 115, text: 'Foot touches ground: "touching."\nWeight bears down: "pressure."', speech: 'When your foot touches the ground, note touching. As weight bears down, pressure.', fileKey: 'cd5_08' },
  { time: 150, text: 'Foot leaves: "lifting."\nMoves through air: "moving."\nComes down: "placing."', speech: 'Foot leaves the ground, lifting. Moves through the air, moving. Comes down, placing.', fileKey: 'cd5_09' },
  { time: 190, text: 'Touching... pressure...\nlifting... moving... placing...', speech: 'Touching, pressure, lifting, moving, placing.', fileKey: 'cd5_10' },
  { time: 230, text: 'When thoughts arise, note "thinking."\nReturn to the sensations.', speech: 'When thoughts arise, note thinking. Return to the sensations in your feet.', fileKey: 'cd5_11' },
  { time: 270, text: 'So much richness\nwithin a single step.', speech: 'There is so much richness of sensation within a single step.', fileKey: 'cd5_12' },
  { time: 310, text: 'Touching... pressure...\nlifting... moving... placing...', speech: 'Touching, pressure, lifting, moving, placing. Continue.', fileKey: 'cd5_13' },
  { time: 345, text: 'The warmth of your heel.\nThe pressure on your toes.\nThe lightness of your arch.', speech: 'The warmth of your heel. The pressure on your toes. The lightness of your arch.', fileKey: 'cd5_14' },
  { time: 380, text: 'Keep going.\nYour observation grows clearer.', speech: 'Keep going. Your observation grows clearer and clearer.', fileKey: 'cd5_15' },
  { time: 400, text: 'One minute left.\nStay with the fine details.', speech: 'One minute left. Stay with the fine details until the end.', fileKey: 'cd5_16' },
  { time: 415, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'cd5_17' },
  { time: 420, text: 'Feel both feet on the ground.', speech: 'Feel both feet on the ground.', fileKey: 'cd5_18' },
  { time: 425, text: 'Well done.\nYour powers of observation have deepened.', speech: 'Well done. Your powers of observation have deepened.', fileKey: 'cd5_19' },
]

const EN_COURSE_DAY6_STEPS: GuideStep[] = [
  { time: 0, text: 'Take a deep breath.', speech: 'Take a deep breath.', fileKey: 'cd6_01', breathe: 'in' },
  { time: 8, text: 'Slowly breathe out...', speech: 'Slowly breathe out.', fileKey: 'cd6_02', breathe: 'out' },
  { time: 18, text: 'Today, minimal guidance.\nWalk at your own pace.', speech: 'Today, minimal guidance. Walk at your own pace.', fileKey: 'cd6_03' },
  { time: 40, text: 'Use whatever noting method\nfeels most natural to you.', speech: 'Use whatever noting method feels most natural to you.', fileKey: 'cd6_04' },
  { time: 180, text: 'Bring your attention\nback to your feet.', speech: 'Bring your attention back to the soles of your feet.', fileKey: 'cd6_05' },
  { time: 330, text: 'When you notice thoughts,\nreturn to your feet.', speech: 'When you notice thoughts, simply return to your feet.', fileKey: 'cd6_06' },
  { time: 470, text: 'Continue.\nStay with the sensations.', speech: 'Continue. Stay with the sensations in your feet.', fileKey: 'cd6_07' },
  { time: 550, text: 'One minute left.\nSlowly come to a stop.', speech: 'One minute left. Slowly come to a stop.', fileKey: 'cd6_08' },
  { time: 585, text: 'Feel both feet on the ground.', speech: 'Feel both feet on the ground.', fileKey: 'cd6_09' },
  { time: 595, text: 'Well done.\nYou meditated on your own.', speech: 'Well done. You meditated on your own today.', fileKey: 'cd6_10' },
]

const EN_COURSE_DAY7_STEPS: GuideStep[] = [
  { time: 0, text: '', speech: '', fileKey: 'bell_start' },
  { time: 300, text: '', speech: '', fileKey: 'bell_half' },
  { time: 595, text: '', speech: '', fileKey: 'bell_end' },
]

/* ─── Program definitions by locale ─── */

const PROGRAMS_JA = {
  free: [
    { id: 'beginner-day1', steps: JA_BEGINNER_STEPS },
    { id: 'timer-5', steps: JA_TIMER_STEPS },
    { id: 'stress-relief', steps: JA_STRESS_STEPS },
    { id: 'morning-energy', steps: JA_MORNING_STEPS },
    { id: 'evening-calm', steps: JA_EVENING_STEPS },
    { id: 'focus-boost', steps: JA_FOCUS_STEPS },
  ],
  premium: [],
  course: [
    { id: 'course-day1', steps: JA_COURSE_DAY1_STEPS },
    { id: 'course-day2', steps: JA_COURSE_DAY2_STEPS },
    { id: 'course-day3', steps: JA_BEGINNER_STEPS },
    { id: 'course-day4', steps: JA_COURSE_DAY4_STEPS },
    { id: 'course-day5', steps: JA_COURSE_DAY5_STEPS },
    { id: 'course-day6', steps: JA_COURSE_DAY6_STEPS },
    { id: 'course-day7', steps: JA_COURSE_DAY7_STEPS },
  ],
}

const PROGRAMS_EN = {
  free: [
    { id: 'beginner-day1', steps: EN_BEGINNER_STEPS },
    { id: 'timer-5', steps: EN_TIMER_STEPS },
    { id: 'stress-relief', steps: EN_STRESS_STEPS },
    { id: 'morning-energy', steps: EN_MORNING_STEPS },
    { id: 'evening-calm', steps: EN_EVENING_STEPS },
    { id: 'focus-boost', steps: EN_FOCUS_STEPS },
  ],
  premium: [],
  course: [
    { id: 'course-day1', steps: EN_COURSE_DAY1_STEPS },
    { id: 'course-day2', steps: EN_COURSE_DAY2_STEPS },
    { id: 'course-day3', steps: EN_BEGINNER_STEPS },
    { id: 'course-day4', steps: EN_COURSE_DAY4_STEPS },
    { id: 'course-day5', steps: EN_COURSE_DAY5_STEPS },
    { id: 'course-day6', steps: EN_COURSE_DAY6_STEPS },
    { id: 'course-day7', steps: EN_COURSE_DAY7_STEPS },
  ],
}

/* ─── Metadata (shared structure, titles resolved via i18n) ─── */

interface ProgramMeta {
  id: string
  duration: number
}

const PROGRAM_META: ProgramMeta[] = [
  { id: 'beginner-day1', duration: 5 },
  { id: 'timer-5', duration: 5 },
  { id: 'stress-relief', duration: 10 },
  { id: 'morning-energy', duration: 7 },
  { id: 'evening-calm', duration: 10 },
  { id: 'focus-boost', duration: 5 },
  { id: 'course-day1', duration: 5 },
  { id: 'course-day2', duration: 5 },
  { id: 'course-day3', duration: 5 },
  { id: 'course-day4', duration: 7 },
  { id: 'course-day5', duration: 7 },
  { id: 'course-day6', duration: 10 },
  { id: 'course-day7', duration: 10 },
]

/**
 * Get programs for a given locale
 */
export function getPrograms(locale: Locale, titleFn: (key: string) => string): { free: MeditationProgram[], premium: MeditationProgram[], course: MeditationProgram[] } {
  const data = locale === 'en' ? PROGRAMS_EN : PROGRAMS_JA

  const TITLE_KEYS: Record<string, [string, string]> = {
    'beginner-day1': ['program_beginner_title', 'program_beginner_subtitle'],
    'timer-5': ['program_timer_title', 'program_timer_subtitle'],
    'stress-relief': ['program_stress_title', 'program_stress_subtitle'],
    'morning-energy': ['program_morning_title', 'program_morning_subtitle'],
    'evening-calm': ['program_evening_title', 'program_evening_subtitle'],
    'focus-boost': ['program_focus_title', 'program_focus_subtitle'],
    'course-day1': ['program_cd1_title', 'program_cd1_subtitle'],
    'course-day2': ['program_cd2_title', 'program_cd2_subtitle'],
    'course-day3': ['program_cd3_title', 'program_cd3_subtitle'],
    'course-day4': ['program_cd4_title', 'program_cd4_subtitle'],
    'course-day5': ['program_cd5_title', 'program_cd5_subtitle'],
    'course-day6': ['program_cd6_title', 'program_cd6_subtitle'],
    'course-day7': ['program_cd7_title', 'program_cd7_subtitle'],
  }

  function build(list: { id: string; steps: GuideStep[] }[]): MeditationProgram[] {
    return list.map(({ id, steps }) => {
      const meta = PROGRAM_META.find(m => m.id === id)!
      const [titleKey, subtitleKey] = TITLE_KEYS[id] || [id, '']
      return {
        id,
        title: titleFn(titleKey) || id,
        subtitle: titleFn(subtitleKey) || '',
        duration: meta.duration,
        steps,
      }
    })
  }

  return {
    free: build(data.free),
    premium: build(data.premium),
    course: build(data.course),
  }
}

/** Get audio path prefix for locale + gender */
export function getAudioPrefix(locale: Locale, gender: 'female' | 'male'): string {
  if (locale === 'en') return `/audio/guide/en_${gender}`
  return `/audio/guide/${gender}`
}


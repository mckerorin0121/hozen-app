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
/* テーラワーダ仏教（マハーシ式）歩行瞑想に忠実なナレーション
   基本プロトコル:
   1. 立っている、立っている、立っている（立つ瞑想）
   2. 歩こうとしている、歩こうとしている、歩こうとしている（意図の確認）
   3. 上げる・運ぶ・下ろす（ノーティングしながら歩行）
   4. 考え → 気づいて足に戻る
   5. 止まろうとしている（終了の意図）
   6. 立っている、立っている、立っている
*/

const JA_BEGINNER_STEPS: GuideStep[] = [
  // 立つ瞑想
  { time: 0, text: 'まっすぐ立ってください\n目は半眼、視線は1メートルほど先の地面に', speech: 'まっすぐ立ってください。目は半眼、視線は1メートルほど先の地面に', fileKey: 'day1_01' },
  { time: 12, text: '両足の裏が地面に触れている感覚に\n意識を向けてください', speech: '両足の裏が地面に触れている感覚に、意識を向けてください', fileKey: 'day1_02' },
  { time: 24, text: '心の中で唱えます\n「立っている...立っている...立っている」', speech: '心の中で唱えます。立っている、立っている、立っている', fileKey: 'day1_03' },
  // 歩く意図
  { time: 40, text: '次に、これから歩くことを確認します\n「歩こうとしている...歩こうとしている\n歩こうとしている」', speech: '次に、これから歩くことを確認します。歩こうとしている、歩こうとしている、歩こうとしている', fileKey: 'day1_04' },
  // 歩行開始
  { time: 58, text: 'では、ゆっくり歩き始めてください\n普段の半分以下のスピードで', speech: 'では、ゆっくり歩き始めてください。普段の半分以下のスピードで', fileKey: 'day1_05' },
  { time: 72, text: '足を上げるとき「上げる」\n前に運ぶとき「運ぶ」\n地面に下ろすとき「下ろす」', speech: '足を上げるとき、上げる。前に運ぶとき、運ぶ。地面に下ろすとき、下ろす', fileKey: 'day1_06' },
  { time: 92, text: '上げる...運ぶ...下ろす...\n上げる...運ぶ...下ろす...\n心の中で唱え続けてください', speech: '上げる、運ぶ、下ろす。上げる、運ぶ、下ろす。心の中で唱え続けてください', fileKey: 'day1_07' },
  { time: 120, text: '足の裏の動きだけに集中します\nそれ以外のことは気にしなくて大丈夫です', speech: '足の裏の動きだけに集中します。それ以外のことは気にしなくて大丈夫です', fileKey: 'day1_08' },
  { time: 150, text: '考えが浮かんだら\n「考え」と心の中で気づいて\nまた足に戻ります', speech: '考えが浮かんだら、考えと心の中で気づいて、また足に戻ります', fileKey: 'day1_09' },
  { time: 175, text: '上げる...運ぶ...下ろす...\nそのまま続けてください', speech: '上げる、運ぶ、下ろす。そのまま続けてください', fileKey: 'day1_10' },
  { time: 210, text: '何度気が逸れても構いません\n気づいたら足に戻る\nこの繰り返しが瞑想です', speech: '何度気が逸れても構いません。気づいたら足に戻る。この繰り返しが瞑想です', fileKey: 'day1_11' },
  { time: 240, text: '上げる...運ぶ...下ろす...\nあと1分です', speech: '上げる、運ぶ、下ろす。あと1分です', fileKey: 'day1_12' },
  // 終了プロトコル
  { time: 265, text: '「止まろうとしている\n止まろうとしている\n止まろうとしている」', speech: '止まろうとしている、止まろうとしている、止まろうとしている', fileKey: 'day1_13' },
  { time: 278, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'day1_14' },
  { time: 285, text: '「立っている...立っている...立っている」\n両足の裏の感覚を感じてください', speech: '立っている、立っている、立っている。両足の裏の感覚を感じてください', fileKey: 'day1_15' },
  { time: 295, text: 'お疲れさまでした', speech: 'お疲れさまでした', fileKey: 'day1_16' },
]

const JA_TIMER_STEPS: GuideStep[] = [
  { time: 0, text: '歩禅を始めます\nご自身のペースでノーティングを続けてください', speech: '歩禅を始めます。ご自身のペースでノーティングを続けてください', fileKey: 'silent_start' },
  { time: 150, text: '半分が過ぎました', speech: '半分が過ぎました', fileKey: 'silent_half' },
  { time: 290, text: 'まもなく終了です', speech: 'まもなく終了です', fileKey: 'silent_end' },
]

const JA_STRESS_STEPS: GuideStep[] = [
  // 立つ瞑想
  { time: 0, text: 'まっすぐ立ってください\n視線は1メートルほど先の地面に', speech: 'まっすぐ立ってください。視線は1メートルほど先の地面に', fileKey: 'stress_01' },
  { time: 12, text: '「立っている...立っている...立っている」\n両足の裏の感覚に気づいてください', speech: '立っている、立っている、立っている。両足の裏の感覚に気づいてください', fileKey: 'stress_02' },
  // 歩く意図
  { time: 28, text: '「歩こうとしている...歩こうとしている\n歩こうとしている」', speech: '歩こうとしている、歩こうとしている、歩こうとしている', fileKey: 'stress_03' },
  // 歩行開始
  { time: 42, text: 'ゆっくり歩き始めてください\n普段よりずっとゆっくりと', speech: 'ゆっくり歩き始めてください。普段よりずっとゆっくりと', fileKey: 'stress_04' },
  { time: 58, text: '「上げる...運ぶ...下ろす」\n心の中で唱えながら歩きます', speech: '上げる、運ぶ、下ろす。心の中で唱えながら歩きます', fileKey: 'stress_05' },
  { time: 85, text: '上げる...運ぶ...下ろす...\n足の裏の動きだけに集中してください', speech: '上げる、運ぶ、下ろす。足の裏の動きだけに集中してください', fileKey: 'stress_06' },
  { time: 120, text: '心配事や不安が浮かんでも大丈夫です\n「考え」と気づいて、足に戻るだけ', speech: '心配事や不安が浮かんでも大丈夫です。考えと気づいて、足に戻るだけ', fileKey: 'stress_07' },
  { time: 155, text: '上げる...運ぶ...下ろす...\n気づいて、足に戻る\nこの繰り返しです', speech: '上げる、運ぶ、下ろす。気づいて、足に戻る。この繰り返しです', fileKey: 'stress_08' },
  { time: 195, text: '体の感覚が浮かんだら「感覚」\n音が気になったら「聞こえた」\nそう気づいて、また足に戻ります', speech: '体の感覚が浮かんだら、感覚。音が気になったら、聞こえた。そう気づいて、また足に戻ります', fileKey: 'stress_09' },
  { time: 235, text: '上げる...運ぶ...下ろす...\nそのまま続けてください', speech: '上げる、運ぶ、下ろす。そのまま続けてください', fileKey: 'stress_10' },
  { time: 280, text: '少しスピードを落としてみましょう\nより丁寧に一歩一歩を観察します', speech: '少しスピードを落としてみましょう。より丁寧に一歩一歩を観察します', fileKey: 'stress_11' },
  { time: 315, text: '上げる...運ぶ...下ろす...\n足の裏の動きだけが今の対象です', speech: '上げる、運ぶ、下ろす。足の裏の動きだけが今の対象です', fileKey: 'stress_12' },
  { time: 360, text: '何度気が逸れても問題ありません\n気づくこと自体が瞑想の力です', speech: '何度気が逸れても問題ありません。気づくこと自体が瞑想の力です', fileKey: 'stress_13' },
  { time: 400, text: '上げる...運ぶ...下ろす...\nそのまま続けてください', speech: '上げる、運ぶ、下ろす。そのまま続けてください', fileKey: 'stress_14' },
  { time: 450, text: '足の裏の動きに戻ってください\n上げる...運ぶ...下ろす...', speech: '足の裏の動きに戻ってください。上げる、運ぶ、下ろす', fileKey: 'stress_15' },
  { time: 500, text: 'そのまま\n上げる...運ぶ...下ろす...', speech: 'そのまま。上げる、運ぶ、下ろす', fileKey: 'stress_16' },
  { time: 535, text: 'あと1分です', speech: 'あと1分です', fileKey: 'stress_17' },
  // 終了プロトコル
  { time: 560, text: '「止まろうとしている\n止まろうとしている\n止まろうとしている」', speech: '止まろうとしている、止まろうとしている、止まろうとしている', fileKey: 'stress_18' },
  { time: 573, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'stress_19' },
  { time: 580, text: '「立っている...立っている...立っている」', speech: '立っている、立っている、立っている', fileKey: 'stress_20' },
  { time: 590, text: 'お疲れさまでした', speech: 'お疲れさまでした', fileKey: 'stress_21' },
]

const JA_MORNING_STEPS: GuideStep[] = [
  // 立つ瞑想
  { time: 0, text: 'まっすぐ立ってください\n視線は1メートルほど先の地面に', speech: 'まっすぐ立ってください。視線は1メートルほど先の地面に', fileKey: 'morning_01' },
  { time: 12, text: '「立っている...立っている...立っている」\n足の裏が地面に触れている感覚を確認します', speech: '立っている、立っている、立っている。足の裏が地面に触れている感覚を確認します', fileKey: 'morning_02' },
  // 歩く意図
  { time: 28, text: '「歩こうとしている...歩こうとしている\n歩こうとしている」', speech: '歩こうとしている、歩こうとしている、歩こうとしている', fileKey: 'morning_03' },
  // 歩行開始
  { time: 42, text: 'ゆっくり歩き始めてください', speech: 'ゆっくり歩き始めてください', fileKey: 'morning_04' },
  { time: 52, text: '「上げる...運ぶ...下ろす」\n心の中で唱えながら歩きます', speech: '上げる、運ぶ、下ろす。心の中で唱えながら歩きます', fileKey: 'morning_05' },
  { time: 80, text: '上げる...運ぶ...下ろす...\n足の裏の動きだけに意識を向けます', speech: '上げる、運ぶ、下ろす。足の裏の動きだけに意識を向けます', fileKey: 'morning_06' },
  { time: 115, text: '考えが浮かんだら「考え」と気づいて\n足の裏に戻ります', speech: '考えが浮かんだら、考えと気づいて、足の裏に戻ります', fileKey: 'morning_07' },
  { time: 150, text: '上げる...運ぶ...下ろす...\nそのまま続けてください', speech: '上げる、運ぶ、下ろす。そのまま続けてください', fileKey: 'morning_08' },
  { time: 195, text: '足を上げる前の微かな意図にも\n気づいてみてください\n「意図...上げる...運ぶ...下ろす」', speech: '足を上げる前の微かな意図にも気づいてみてください。意図、上げる、運ぶ、下ろす', fileKey: 'morning_09' },
  { time: 235, text: '意図...上げる...運ぶ...下ろす...\nそのまま続けてください', speech: '意図、上げる、運ぶ、下ろす。そのまま続けてください', fileKey: 'morning_10' },
  { time: 280, text: '気が逸れたら、気づいて足に戻る\nこの繰り返しです', speech: '気が逸れたら、気づいて足に戻る。この繰り返しです', fileKey: 'morning_11' },
  { time: 320, text: '上げる...運ぶ...下ろす...\nあと1分半です', speech: '上げる、運ぶ、下ろす。あと1分半です', fileKey: 'morning_12' },
  { time: 365, text: 'あと1分です', speech: 'あと1分です', fileKey: 'morning_13' },
  // 終了プロトコル
  { time: 388, text: '「止まろうとしている\n止まろうとしている\n止まろうとしている」', speech: '止まろうとしている、止まろうとしている、止まろうとしている', fileKey: 'morning_14' },
  { time: 400, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'morning_15' },
  { time: 410, text: '「立っている...立っている...立っている」', speech: '立っている、立っている、立っている', fileKey: 'morning_16' },
  { time: 418, text: 'お疲れさまでした', speech: 'お疲れさまでした', fileKey: 'morning_17' },
]

const JA_EVENING_STEPS: GuideStep[] = [
  // 立つ瞑想
  { time: 0, text: 'まっすぐ立ってください\n視線は1メートルほど先の地面に', speech: 'まっすぐ立ってください。視線は1メートルほど先の地面に', fileKey: 'evening_01' },
  { time: 12, text: '「立っている...立っている...立っている」\n足の裏が地面に触れている感覚', speech: '立っている、立っている、立っている。足の裏が地面に触れている感覚', fileKey: 'evening_02' },
  { time: 28, text: 'しばらくこのまま\n「立っている...立っている...立っている」', speech: 'しばらくこのまま。立っている、立っている、立っている', fileKey: 'evening_03' },
  // 歩く意図
  { time: 45, text: '「歩こうとしている...歩こうとしている\n歩こうとしている」', speech: '歩こうとしている、歩こうとしている、歩こうとしている', fileKey: 'evening_04' },
  // 歩行開始
  { time: 60, text: 'とてもゆっくり歩き始めてください\n普段の3分の1くらいのスピードで', speech: 'とてもゆっくり歩き始めてください。普段の3分の1くらいのスピードで', fileKey: 'evening_05' },
  { time: 78, text: '「上げる...運ぶ...下ろす」\n心の中で唱えながら歩きます', speech: '上げる、運ぶ、下ろす。心の中で唱えながら歩きます', fileKey: 'evening_06' },
  { time: 110, text: '上げる...運ぶ...下ろす...\n足の裏の動きだけに集中します', speech: '上げる、運ぶ、下ろす。足の裏の動きだけに集中します', fileKey: 'evening_07' },
  { time: 150, text: '考えが浮かんだら「考え」\nそう気づいて、足に戻ります', speech: '考えが浮かんだら、考え。そう気づいて、足に戻ります', fileKey: 'evening_08' },
  { time: 190, text: '上げる...運ぶ...下ろす...\nそのまま続けてください', speech: '上げる、運ぶ、下ろす。そのまま続けてください', fileKey: 'evening_09' },
  { time: 240, text: 'さらにスピードを落としてみましょう\nより細かく一歩を観察します', speech: 'さらにスピードを落としてみましょう。より細かく一歩を観察します', fileKey: 'evening_10' },
  { time: 275, text: '足を上げる前の意図にも気づいてみます\n「意図...上げる...運ぶ...下ろす」', speech: '足を上げる前の意図にも気づいてみます。意図、上げる、運ぶ、下ろす', fileKey: 'evening_11' },
  { time: 315, text: '意図...上げる...運ぶ...下ろす...\nそのまま続けてください', speech: '意図、上げる、運ぶ、下ろす。そのまま続けてください', fileKey: 'evening_12' },
  { time: 365, text: '気が逸れても大丈夫です\n気づいたら足に戻るだけ', speech: '気が逸れても大丈夫です。気づいたら足に戻るだけ', fileKey: 'evening_13' },
  { time: 405, text: '上げる...運ぶ...下ろす...\nそのまま続けてください', speech: '上げる、運ぶ、下ろす。そのまま続けてください', fileKey: 'evening_14' },
  { time: 460, text: '足の裏の動きに戻ってください\n上げる...運ぶ...下ろす...', speech: '足の裏の動きに戻ってください。上げる、運ぶ、下ろす', fileKey: 'evening_15' },
  { time: 510, text: 'そのまま\n上げる...運ぶ...下ろす...', speech: 'そのまま。上げる、運ぶ、下ろす', fileKey: 'evening_16' },
  { time: 540, text: 'あと1分です', speech: 'あと1分です', fileKey: 'evening_17' },
  // 終了プロトコル
  { time: 560, text: '「止まろうとしている\n止まろうとしている\n止まろうとしている」', speech: '止まろうとしている、止まろうとしている、止まろうとしている', fileKey: 'evening_18' },
  { time: 573, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'evening_19' },
  { time: 580, text: '「立っている...立っている...立っている」', speech: '立っている、立っている、立っている', fileKey: 'evening_20' },
  { time: 592, text: 'お疲れさまでした', speech: 'お疲れさまでした', fileKey: 'evening_21' },
]

const JA_FOCUS_STEPS: GuideStep[] = [
  // 立つ瞑想
  { time: 0, text: 'まっすぐ立ってください\n視線は1メートルほど先の地面に', speech: 'まっすぐ立ってください。視線は1メートルほど先の地面に', fileKey: 'focus_01' },
  { time: 10, text: '「立っている...立っている...立っている」', speech: '立っている、立っている、立っている', fileKey: 'focus_02' },
  // 歩く意図
  { time: 22, text: '「歩こうとしている...歩こうとしている\n歩こうとしている」', speech: '歩こうとしている、歩こうとしている、歩こうとしている', fileKey: 'focus_03' },
  // 歩行開始
  { time: 35, text: 'ゆっくり歩き始めてください', speech: 'ゆっくり歩き始めてください', fileKey: 'focus_04' },
  { time: 45, text: '「上げる...運ぶ...下ろす」\n一歩ずつ明確にノーティングします', speech: '上げる、運ぶ、下ろす。一歩ずつ明確にノーティングします', fileKey: 'focus_05' },
  { time: 75, text: '上げる...運ぶ...下ろす...\n足の裏の動きだけに集中してください', speech: '上げる、運ぶ、下ろす。足の裏の動きだけに集中してください', fileKey: 'focus_06' },
  { time: 110, text: '気が逸れたら「考え」と気づいて\nすぐ足に戻ります', speech: '気が逸れたら、考えと気づいて、すぐ足に戻ります', fileKey: 'focus_07' },
  { time: 145, text: '上げる...運ぶ...下ろす...\nそのまま続けてください', speech: '上げる、運ぶ、下ろす。そのまま続けてください', fileKey: 'focus_08' },
  { time: 185, text: '何度逸れても構いません\n気づいて戻る、その繰り返しです', speech: '何度逸れても構いません。気づいて戻る、その繰り返しです', fileKey: 'focus_09' },
  { time: 220, text: '上げる...運ぶ...下ろす...\nあと1分です', speech: '上げる、運ぶ、下ろす。あと1分です', fileKey: 'focus_10' },
  // 終了プロトコル
  { time: 260, text: '「止まろうとしている\n止まろうとしている\n止まろうとしている」', speech: '止まろうとしている、止まろうとしている、止まろうとしている', fileKey: 'focus_11' },
  { time: 273, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'focus_12' },
  { time: 280, text: '「立っている...立っている...立っている」', speech: '立っている、立っている、立っている', fileKey: 'focus_13' },
  { time: 290, text: 'お疲れさまでした', speech: 'お疲れさまでした', fileKey: 'focus_14' },
]

/* ─── English Steps ─── */
/* Theravada (Mahasi-style) walking meditation — faithful protocol:
   1. Standing, standing, standing
   2. Intending to walk, intending to walk, intending to walk
   3. Lifting, moving, placing (noting while walking)
   4. Thinking → notice and return to feet
   5. Intending to stop (ending protocol)
   6. Standing, standing, standing
*/

const EN_BEGINNER_STEPS: GuideStep[] = [
  // Standing meditation
  { time: 0, text: 'Stand upright.\nCast your gaze about 1.5 meters\nahead on the ground.', speech: 'Stand upright. Cast your gaze about one and a half meters ahead on the ground.', fileKey: 'day1_01' },
  { time: 12, text: 'Bring your attention to the soles\nof both feet touching the ground.', speech: 'Bring your attention to the soles of both feet touching the ground.', fileKey: 'day1_02' },
  { time: 24, text: 'Silently note in your mind:\n"Standing... standing... standing."', speech: 'Silently note in your mind. Standing, standing, standing.', fileKey: 'day1_03' },
  // Intending to walk
  { time: 40, text: 'Now, acknowledge your intention to walk.\n"Intending to walk...\nintending to walk...\nintending to walk."', speech: 'Now, acknowledge your intention to walk. Intending to walk, intending to walk, intending to walk.', fileKey: 'day1_04' },
  // Begin walking
  { time: 58, text: 'Slowly begin walking.\nMuch slower than usual —\nhalf your normal speed or less.', speech: 'Slowly begin walking. Much slower than usual. Half your normal speed or less.', fileKey: 'day1_05' },
  { time: 72, text: 'As you lift your foot, note "lifting."\nAs it moves forward, "moving."\nAs it touches down, "placing."', speech: 'As you lift your foot, note lifting. As it moves forward, moving. As it touches down, placing.', fileKey: 'day1_06' },
  { time: 92, text: 'Lifting... moving... placing...\nLifting... moving... placing...\nKeep noting silently.', speech: 'Lifting, moving, placing. Lifting, moving, placing. Keep noting silently in your mind.', fileKey: 'day1_07' },
  { time: 120, text: 'Focus only on the movement\nof the soles of your feet.\nNothing else matters right now.', speech: 'Focus only on the movement of the soles of your feet. Nothing else matters right now.', fileKey: 'day1_08' },
  { time: 150, text: 'When thoughts arise,\nsilently note "thinking."\nThen return to your feet.', speech: 'When thoughts arise, silently note thinking. Then return your attention to your feet.', fileKey: 'day1_09' },
  { time: 175, text: 'Lifting... moving... placing...\nContinue.', speech: 'Lifting, moving, placing. Continue.', fileKey: 'day1_10' },
  { time: 210, text: 'No matter how many times\nyour mind wanders, just notice\nand return to your feet.', speech: 'No matter how many times your mind wanders, just notice, and return to your feet. This repetition is the practice.', fileKey: 'day1_11' },
  { time: 240, text: 'Lifting... moving... placing...\nOne minute left.', speech: 'Lifting, moving, placing. One minute left.', fileKey: 'day1_12' },
  // Ending protocol
  { time: 265, text: '"Intending to stop...\nintending to stop...\nintending to stop."', speech: 'Intending to stop, intending to stop, intending to stop.', fileKey: 'day1_13' },
  { time: 278, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'day1_14' },
  { time: 285, text: '"Standing... standing... standing."\nFeel both feet on the ground.', speech: 'Standing, standing, standing. Feel both feet on the ground.', fileKey: 'day1_15' },
  { time: 295, text: 'Well done.', speech: 'Well done.', fileKey: 'day1_16' },
]

const EN_TIMER_STEPS: GuideStep[] = [
  { time: 0, text: 'Your walking meditation begins.\nContinue noting at your own pace.', speech: 'Your walking meditation begins. Continue noting at your own pace.', fileKey: 'silent_start' },
  { time: 150, text: "You're halfway through.", speech: "You're halfway through.", fileKey: 'silent_half' },
  { time: 290, text: 'Almost finished.', speech: 'Almost finished.', fileKey: 'silent_end' },
]

const EN_STRESS_STEPS: GuideStep[] = [
  // Standing meditation
  { time: 0, text: 'Stand upright.\nCast your gaze about 1.5 meters\nahead on the ground.', speech: 'Stand upright. Cast your gaze about one and a half meters ahead on the ground.', fileKey: 'stress_01' },
  { time: 12, text: '"Standing... standing... standing."\nNotice the soles of both feet\ntouching the ground.', speech: 'Standing, standing, standing. Notice the soles of both feet touching the ground.', fileKey: 'stress_02' },
  // Intending to walk
  { time: 28, text: '"Intending to walk...\nintending to walk...\nintending to walk."', speech: 'Intending to walk, intending to walk, intending to walk.', fileKey: 'stress_03' },
  // Begin walking
  { time: 42, text: 'Slowly begin walking.\nMuch slower than usual.', speech: 'Slowly begin walking. Much slower than usual.', fileKey: 'stress_04' },
  { time: 58, text: '"Lifting... moving... placing."\nNote each movement silently.', speech: 'Lifting, moving, placing. Note each movement silently in your mind.', fileKey: 'stress_05' },
  { time: 85, text: 'Lifting... moving... placing...\nFocus only on the movement\nof your feet.', speech: 'Lifting, moving, placing. Focus only on the movement of your feet.', fileKey: 'stress_06' },
  { time: 120, text: 'Worries or anxious thoughts may arise.\nSimply note "thinking"\nand return to your feet.', speech: 'Worries or anxious thoughts may arise. Simply note thinking, and return to your feet.', fileKey: 'stress_07' },
  { time: 155, text: 'Lifting... moving... placing...\nNotice, and return to the feet.\nThis is the practice.', speech: 'Lifting, moving, placing. Notice, and return to the feet. This is the practice.', fileKey: 'stress_08' },
  { time: 195, text: 'If a body sensation arises,\nnote "sensation."\nIf a sound, note "hearing."\nThen return to your feet.', speech: 'If a body sensation arises, note sensation. If a sound, note hearing. Then return to your feet.', fileKey: 'stress_09' },
  { time: 235, text: 'Lifting... moving... placing...\nContinue.', speech: 'Lifting, moving, placing. Continue.', fileKey: 'stress_10' },
  { time: 280, text: 'Slow your pace a little more.\nObserve each step more carefully.', speech: 'Slow your pace a little more. Observe each step more carefully.', fileKey: 'stress_11' },
  { time: 315, text: 'Lifting... moving... placing...\nThe movement of your feet\nis your only object right now.', speech: 'Lifting, moving, placing. The movement of your feet is your only object right now.', fileKey: 'stress_12' },
  { time: 360, text: 'No matter how many times\nyour mind wanders,\nnoticing itself is the practice.', speech: 'No matter how many times your mind wanders, noticing itself is the practice.', fileKey: 'stress_13' },
  { time: 400, text: 'Lifting... moving... placing...\nContinue.', speech: 'Lifting, moving, placing. Continue.', fileKey: 'stress_14' },
  { time: 450, text: 'Return to the movement of your feet.\nLifting... moving... placing...', speech: 'Return to the movement of your feet. Lifting, moving, placing.', fileKey: 'stress_15' },
  { time: 500, text: 'Continue.\nLifting... moving... placing...', speech: 'Continue. Lifting, moving, placing.', fileKey: 'stress_16' },
  { time: 535, text: 'One minute left.', speech: 'One minute left.', fileKey: 'stress_17' },
  // Ending protocol
  { time: 560, text: '"Intending to stop...\nintending to stop...\nintending to stop."', speech: 'Intending to stop, intending to stop, intending to stop.', fileKey: 'stress_18' },
  { time: 573, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'stress_19' },
  { time: 580, text: '"Standing... standing... standing."', speech: 'Standing, standing, standing.', fileKey: 'stress_20' },
  { time: 590, text: 'Well done.', speech: 'Well done.', fileKey: 'stress_21' },
]

const EN_MORNING_STEPS: GuideStep[] = [
  // Standing meditation
  { time: 0, text: 'Stand upright.\nCast your gaze about 1.5 meters\nahead on the ground.', speech: 'Stand upright. Cast your gaze about one and a half meters ahead on the ground.', fileKey: 'morning_01' },
  { time: 12, text: '"Standing... standing... standing."\nFeel the soles of both feet\ntouching the ground.', speech: 'Standing, standing, standing. Feel the soles of both feet touching the ground.', fileKey: 'morning_02' },
  // Intending to walk
  { time: 28, text: '"Intending to walk...\nintending to walk...\nintending to walk."', speech: 'Intending to walk, intending to walk, intending to walk.', fileKey: 'morning_03' },
  // Begin walking
  { time: 42, text: 'Slowly begin walking.', speech: 'Slowly begin walking.', fileKey: 'morning_04' },
  { time: 52, text: '"Lifting... moving... placing."\nNote each movement silently.', speech: 'Lifting, moving, placing. Note each movement silently in your mind.', fileKey: 'morning_05' },
  { time: 80, text: 'Lifting... moving... placing...\nFocus only on the movement\nof the soles of your feet.', speech: 'Lifting, moving, placing. Focus only on the movement of the soles of your feet.', fileKey: 'morning_06' },
  { time: 115, text: 'When thoughts arise,\nnote "thinking"\nand return to your feet.', speech: 'When thoughts arise, note thinking, and return to your feet.', fileKey: 'morning_07' },
  { time: 150, text: 'Lifting... moving... placing...\nContinue.', speech: 'Lifting, moving, placing. Continue.', fileKey: 'morning_08' },
  { time: 195, text: 'Try noticing the subtle intention\nbefore lifting your foot.\n"Intending... lifting...\nmoving... placing."', speech: 'Try noticing the subtle intention before lifting your foot. Intending, lifting, moving, placing.', fileKey: 'morning_09' },
  { time: 235, text: 'Intending... lifting...\nmoving... placing...\nContinue.', speech: 'Intending, lifting, moving, placing. Continue.', fileKey: 'morning_10' },
  { time: 280, text: 'When your mind wanders,\nnotice, and return to your feet.', speech: 'When your mind wanders, notice, and return to your feet.', fileKey: 'morning_11' },
  { time: 320, text: 'Lifting... moving... placing...\nNinety seconds left.', speech: 'Lifting, moving, placing. Ninety seconds left.', fileKey: 'morning_12' },
  { time: 365, text: 'One minute left.', speech: 'One minute left.', fileKey: 'morning_13' },
  // Ending protocol
  { time: 388, text: '"Intending to stop...\nintending to stop...\nintending to stop."', speech: 'Intending to stop, intending to stop, intending to stop.', fileKey: 'morning_14' },
  { time: 400, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'morning_15' },
  { time: 410, text: '"Standing... standing... standing."', speech: 'Standing, standing, standing.', fileKey: 'morning_16' },
  { time: 418, text: 'Well done.', speech: 'Well done.', fileKey: 'morning_17' },
]

const EN_EVENING_STEPS: GuideStep[] = [
  // Standing meditation
  { time: 0, text: 'Stand upright.\nCast your gaze about 1.5 meters\nahead on the ground.', speech: 'Stand upright. Cast your gaze about one and a half meters ahead on the ground.', fileKey: 'evening_01' },
  { time: 12, text: '"Standing... standing... standing."\nFeel the soles of both feet\non the ground.', speech: 'Standing, standing, standing. Feel the soles of both feet on the ground.', fileKey: 'evening_02' },
  { time: 28, text: 'Stay with this for a moment.\n"Standing... standing... standing."', speech: 'Stay with this for a moment. Standing, standing, standing.', fileKey: 'evening_03' },
  // Intending to walk
  { time: 45, text: '"Intending to walk...\nintending to walk...\nintending to walk."', speech: 'Intending to walk, intending to walk, intending to walk.', fileKey: 'evening_04' },
  // Begin walking
  { time: 60, text: 'Begin walking very slowly.\nAbout one-third of your normal speed.', speech: 'Begin walking very slowly. About one-third of your normal speed.', fileKey: 'evening_05' },
  { time: 78, text: '"Lifting... moving... placing."\nNote each movement silently.', speech: 'Lifting, moving, placing. Note each movement silently in your mind.', fileKey: 'evening_06' },
  { time: 110, text: 'Lifting... moving... placing...\nFocus only on the movement\nof your feet.', speech: 'Lifting, moving, placing. Focus only on the movement of your feet.', fileKey: 'evening_07' },
  { time: 150, text: 'When thoughts arise,\nnote "thinking"\nand return to your feet.', speech: 'When thoughts arise, note thinking, and return to your feet.', fileKey: 'evening_08' },
  { time: 190, text: 'Lifting... moving... placing...\nContinue.', speech: 'Lifting, moving, placing. Continue.', fileKey: 'evening_09' },
  { time: 240, text: 'Slow your pace even further.\nObserve each step more closely.', speech: 'Slow your pace even further. Observe each step more closely.', fileKey: 'evening_10' },
  { time: 275, text: 'Try noticing the intention\nbefore each step.\n"Intending... lifting...\nmoving... placing."', speech: 'Try noticing the intention before each step. Intending, lifting, moving, placing.', fileKey: 'evening_11' },
  { time: 315, text: 'Intending... lifting...\nmoving... placing...\nContinue.', speech: 'Intending, lifting, moving, placing. Continue.', fileKey: 'evening_12' },
  { time: 365, text: 'When your mind wanders,\nsimply notice and return.', speech: 'When your mind wanders, simply notice and return to your feet.', fileKey: 'evening_13' },
  { time: 405, text: 'Lifting... moving... placing...\nContinue.', speech: 'Lifting, moving, placing. Continue.', fileKey: 'evening_14' },
  { time: 460, text: 'Return to the movement of your feet.\nLifting... moving... placing...', speech: 'Return to the movement of your feet. Lifting, moving, placing.', fileKey: 'evening_15' },
  { time: 510, text: 'Continue.\nLifting... moving... placing...', speech: 'Continue. Lifting, moving, placing.', fileKey: 'evening_16' },
  { time: 540, text: 'One minute left.', speech: 'One minute left.', fileKey: 'evening_17' },
  // Ending protocol
  { time: 560, text: '"Intending to stop...\nintending to stop...\nintending to stop."', speech: 'Intending to stop, intending to stop, intending to stop.', fileKey: 'evening_18' },
  { time: 573, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'evening_19' },
  { time: 580, text: '"Standing... standing... standing."', speech: 'Standing, standing, standing.', fileKey: 'evening_20' },
  { time: 592, text: 'Well done.', speech: 'Well done.', fileKey: 'evening_21' },
]

const EN_FOCUS_STEPS: GuideStep[] = [
  // Standing meditation
  { time: 0, text: 'Stand upright.\nCast your gaze about 1.5 meters\nahead on the ground.', speech: 'Stand upright. Cast your gaze about one and a half meters ahead on the ground.', fileKey: 'focus_01' },
  { time: 10, text: '"Standing... standing... standing."', speech: 'Standing, standing, standing.', fileKey: 'focus_02' },
  // Intending to walk
  { time: 22, text: '"Intending to walk...\nintending to walk...\nintending to walk."', speech: 'Intending to walk, intending to walk, intending to walk.', fileKey: 'focus_03' },
  // Begin walking
  { time: 35, text: 'Slowly begin walking.', speech: 'Slowly begin walking.', fileKey: 'focus_04' },
  { time: 45, text: '"Lifting... moving... placing."\nNote each movement clearly.', speech: 'Lifting, moving, placing. Note each movement clearly.', fileKey: 'focus_05' },
  { time: 75, text: 'Lifting... moving... placing...\nFocus only on the movement\nof your feet.', speech: 'Lifting, moving, placing. Focus only on the movement of your feet.', fileKey: 'focus_06' },
  { time: 110, text: 'When your mind wanders,\nnote "thinking"\nand return immediately.', speech: 'When your mind wanders, note thinking, and return immediately to your feet.', fileKey: 'focus_07' },
  { time: 145, text: 'Lifting... moving... placing...\nContinue.', speech: 'Lifting, moving, placing. Continue.', fileKey: 'focus_08' },
  { time: 185, text: 'No matter how many times\nyou drift, just notice and return.\nThat is the practice.', speech: 'No matter how many times you drift, just notice and return. That is the practice.', fileKey: 'focus_09' },
  { time: 220, text: 'Lifting... moving... placing...\nOne minute left.', speech: 'Lifting, moving, placing. One minute left.', fileKey: 'focus_10' },
  // Ending protocol
  { time: 260, text: '"Intending to stop...\nintending to stop...\nintending to stop."', speech: 'Intending to stop, intending to stop, intending to stop.', fileKey: 'focus_11' },
  { time: 273, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'focus_12' },
  { time: 280, text: '"Standing... standing... standing."', speech: 'Standing, standing, standing.', fileKey: 'focus_13' },
  { time: 290, text: 'Well done.', speech: 'Well done.', fileKey: 'focus_14' },
]

/* ─── 7-Day Course: Japanese ─── */
/* Day 1: 右・左（最もシンプルなノーティング）
   Day 2: 上げる・下ろす（2段階）
   Day 3: 上げる・運ぶ・下ろす（3段階）
   Day 4: 意図・上げる・運ぶ・下ろす（4段階）
   Day 5: 触れる・圧・離れる・動く・下ろす（5段階・最も細かい）
   Day 6: 自主練習（最小限のガイド）
   Day 7: 完全サイレント（ベルのみ）
*/

const JA_COURSE_DAY1_STEPS: GuideStep[] = [
  // 立つ瞑想
  { time: 0, text: 'まっすぐ立ってください\n視線は1メートルほど先の地面に', speech: 'まっすぐ立ってください。視線は1メートルほど先の地面に', fileKey: 'cd1_01' },
  { time: 12, text: '「立っている...立っている...立っている」\n足の裏が地面に触れている感覚を確認します', speech: '立っている、立っている、立っている。足の裏が地面に触れている感覚を確認します', fileKey: 'cd1_02' },
  // 歩く意図
  { time: 28, text: '「歩こうとしている...歩こうとしている\n歩こうとしている」', speech: '歩こうとしている、歩こうとしている、歩こうとしている', fileKey: 'cd1_03' },
  // 歩行開始 — 右・左
  { time: 42, text: 'ゆっくり歩き始めてください', speech: 'ゆっくり歩き始めてください', fileKey: 'cd1_04' },
  { time: 52, text: '右足が動くとき「右」\n左足が動くとき「左」\n心の中で唱えてください', speech: '右足が動くとき、右。左足が動くとき、左。心の中で唱えてください', fileKey: 'cd1_05' },
  { time: 80, text: '右...左...右...左...\nただそれだけに意識を向けて', speech: '右、左、右、左。ただそれだけに意識を向けて', fileKey: 'cd1_06' },
  { time: 120, text: '考えが浮かんでも大丈夫\n「考え」と気づいたら\n「右」「左」に戻るだけ', speech: '考えが浮かんでも大丈夫。考えと気づいたら、右、左に戻るだけ', fileKey: 'cd1_07' },
  { time: 165, text: '右...左...右...左...\nそのまま続けてください', speech: '右、左、右、左。そのまま続けてください', fileKey: 'cd1_08' },
  { time: 210, text: '右...左...\nあと1分半です', speech: '右、左。あと1分半です', fileKey: 'cd1_09' },
  { time: 250, text: 'あと1分です', speech: 'あと1分です', fileKey: 'cd1_10' },
  // 終了プロトコル
  { time: 270, text: '「止まろうとしている\n止まろうとしている\n止まろうとしている」', speech: '止まろうとしている、止まろうとしている、止まろうとしている', fileKey: 'cd1_11' },
  { time: 280, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'cd1_12' },
  { time: 290, text: '「立っている...立っている...立っている」', speech: '立っている、立っている、立っている', fileKey: 'cd1_13' },
  { time: 295, text: 'お疲れさまでした', speech: 'お疲れさまでした', fileKey: 'cd1_14' },
]

const JA_COURSE_DAY2_STEPS: GuideStep[] = [
  // 立つ瞑想
  { time: 0, text: 'まっすぐ立ってください\n視線は1メートルほど先の地面に', speech: 'まっすぐ立ってください。視線は1メートルほど先の地面に', fileKey: 'cd2_01' },
  { time: 12, text: '「立っている...立っている...立っている」', speech: '立っている、立っている、立っている', fileKey: 'cd2_02' },
  // 歩く意図
  { time: 25, text: '「歩こうとしている...歩こうとしている\n歩こうとしている」', speech: '歩こうとしている、歩こうとしている、歩こうとしている', fileKey: 'cd2_03' },
  // 歩行開始 — 上げる・下ろす
  { time: 38, text: 'ゆっくり歩き始めてください\n昨日より少しだけゆっくりと', speech: 'ゆっくり歩き始めてください。昨日より少しだけゆっくりと', fileKey: 'cd2_04' },
  { time: 52, text: '今日は「上げる」と「下ろす」\nこの二つの動きを観察します', speech: '今日は、上げると下ろす。この二つの動きを観察します', fileKey: 'cd2_05' },
  { time: 70, text: '足が地面から離れる瞬間「上げる」\n地面に触れる瞬間「下ろす」', speech: '足が地面から離れる瞬間、上げる。地面に触れる瞬間、下ろす', fileKey: 'cd2_06' },
  { time: 95, text: '上げる...下ろす...上げる...下ろす...\n心の中で唱えながら', speech: '上げる、下ろす、上げる、下ろす。心の中で唱えながら', fileKey: 'cd2_07' },
  { time: 130, text: '考えが浮かんだら「考え」と気づいて\n足に戻るだけ', speech: '考えが浮かんだら、考えと気づいて。足に戻るだけ', fileKey: 'cd2_08' },
  { time: 170, text: '上げる...下ろす...\nそのまま続けてください', speech: '上げる、下ろす。そのまま続けてください', fileKey: 'cd2_09' },
  { time: 215, text: '上げる...下ろす...\nあと1分半です', speech: '上げる、下ろす。あと1分半です', fileKey: 'cd2_10' },
  { time: 255, text: 'あと1分です', speech: 'あと1分です', fileKey: 'cd2_11' },
  // 終了プロトコル
  { time: 270, text: '「止まろうとしている\n止まろうとしている\n止まろうとしている」', speech: '止まろうとしている、止まろうとしている、止まろうとしている', fileKey: 'cd2_12' },
  { time: 280, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'cd2_13' },
  { time: 290, text: '「立っている...立っている...立っている」', speech: '立っている、立っている、立っている', fileKey: 'cd2_14' },
  { time: 295, text: 'お疲れさまでした\n明日はさらに細かく観察します', speech: 'お疲れさまでした。明日はさらに細かく観察します', fileKey: 'cd2_15' },
]

// Day 3 = JA_BEGINNER_STEPS (上げる・運ぶ・下ろす — 3段階ノーティング)

const JA_COURSE_DAY4_STEPS: GuideStep[] = [
  // 立つ瞑想
  { time: 0, text: 'まっすぐ立ってください\n視線は1メートルほど先の地面に', speech: 'まっすぐ立ってください。視線は1メートルほど先の地面に', fileKey: 'cd4_01' },
  { time: 12, text: '「立っている...立っている...立っている」', speech: '立っている、立っている、立っている', fileKey: 'cd4_02' },
  // 歩く意図
  { time: 25, text: '「歩こうとしている...歩こうとしている\n歩こうとしている」', speech: '歩こうとしている、歩こうとしている、歩こうとしている', fileKey: 'cd4_03' },
  // 歩行開始 — 意図・上げる・運ぶ・下ろす
  { time: 38, text: '今日はさらにゆっくり歩いてください\n普段の3分の1以下のスピードで', speech: '今日はさらにゆっくり歩いてください。普段の3分の1以下のスピードで', fileKey: 'cd4_04' },
  { time: 55, text: '「上げる・運ぶ・下ろす」に加えて\n今日は「意図」を観察します', speech: '上げる、運ぶ、下ろすに加えて、今日は意図を観察します', fileKey: 'cd4_05' },
  { time: 78, text: '足を上げる前に\n「動かそう」という微かな意図が生まれます\nそこに気づいてください', speech: '足を上げる前に、動かそうという微かな意図が生まれます。そこに気づいてください', fileKey: 'cd4_06' },
  { time: 105, text: '「意図...上げる...運ぶ...下ろす」\nこの四つを心の中で唱えます', speech: '意図、上げる、運ぶ、下ろす。この四つを心の中で唱えます', fileKey: 'cd4_07' },
  { time: 140, text: '意図が先、動きが後\nこの順番に気づくことが大切です', speech: '意図が先、動きが後。この順番に気づくことが大切です', fileKey: 'cd4_08' },
  { time: 180, text: '考えが浮かんだら「考え」と気づいて\n意図の観察に戻ります', speech: '考えが浮かんだら、考えと気づいて。意図の観察に戻ります', fileKey: 'cd4_09' },
  { time: 220, text: '意図...上げる...運ぶ...下ろす...\nそのまま続けてください', speech: '意図、上げる、運ぶ、下ろす。そのまま続けてください', fileKey: 'cd4_10' },
  { time: 265, text: '意図の瞬間はとても微かです\n気づけなくても焦らないでください', speech: '意図の瞬間はとても微かです。気づけなくても焦らないでください', fileKey: 'cd4_11' },
  { time: 310, text: '意図...上げる...運ぶ...下ろす...\nそのまま続けてください', speech: '意図、上げる、運ぶ、下ろす。そのまま続けてください', fileKey: 'cd4_12' },
  { time: 355, text: 'あと1分です', speech: 'あと1分です', fileKey: 'cd4_13' },
  // 終了プロトコル
  { time: 385, text: '「止まろうとしている\n止まろうとしている\n止まろうとしている」', speech: '止まろうとしている、止まろうとしている、止まろうとしている', fileKey: 'cd4_14' },
  { time: 398, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'cd4_15' },
  { time: 405, text: '「立っている...立っている...立っている」', speech: '立っている、立っている、立っている', fileKey: 'cd4_16' },
  { time: 418, text: 'お疲れさまでした', speech: 'お疲れさまでした', fileKey: 'cd4_17' },
]

const JA_COURSE_DAY5_STEPS: GuideStep[] = [
  // 立つ瞑想
  { time: 0, text: 'まっすぐ立ってください\n視線は1メートルほど先の地面に', speech: 'まっすぐ立ってください。視線は1メートルほど先の地面に', fileKey: 'cd5_01' },
  { time: 12, text: '「立っている...立っている...立っている」', speech: '立っている、立っている、立っている', fileKey: 'cd5_02' },
  // 歩く意図
  { time: 25, text: '「歩こうとしている...歩こうとしている\n歩こうとしている」', speech: '歩こうとしている、歩こうとしている、歩こうとしている', fileKey: 'cd5_03' },
  // 歩行開始 — 5段階の最も細かい観察
  { time: 38, text: '今日は最も細かい観察です\nとてもゆっくり歩いてください', speech: '今日は最も細かい観察です。とてもゆっくり歩いてください', fileKey: 'cd5_04' },
  { time: 55, text: 'まず「上げる・運ぶ・下ろす」で\n始めましょう', speech: 'まず、上げる、運ぶ、下ろすで始めましょう', fileKey: 'cd5_05' },
  { time: 80, text: '上げる...運ぶ...下ろす...\nそのまま続けてください', speech: '上げる、運ぶ、下ろす。そのまま続けてください', fileKey: 'cd5_06' },
  { time: 115, text: 'では、さらに細かく分けていきます\n足が地面に触れる瞬間「触れる」\n体重がかかる瞬間「圧」', speech: 'では、さらに細かく分けていきます。足が地面に触れる瞬間、触れる。体重がかかる瞬間、圧', fileKey: 'cd5_07' },
  { time: 148, text: '足が離れる「離れる」\n空中を動く「動く」\n地面に下ろす「下ろす」', speech: '足が離れる、離れる。空中を動く、動く。地面に下ろす、下ろす', fileKey: 'cd5_08' },
  { time: 180, text: '触れる...圧...離れる...動く...下ろす...\n心の中で唱えながら歩きます', speech: '触れる、圧、離れる、動く、下ろす。心の中で唱えながら歩きます', fileKey: 'cd5_09' },
  { time: 220, text: '考えが浮かんだら「考え」と気づいて\n足の観察に戻ります', speech: '考えが浮かんだら、考えと気づいて。足の観察に戻ります', fileKey: 'cd5_10' },
  { time: 265, text: '触れる...圧...離れる...動く...下ろす...\nそのまま続けてください', speech: '触れる、圧、離れる、動く、下ろす。そのまま続けてください', fileKey: 'cd5_11' },
  { time: 315, text: '難しければ「上げる・運ぶ・下ろす」に\n戻しても構いません', speech: '難しければ、上げる、運ぶ、下ろすに戻しても構いません', fileKey: 'cd5_12' },
  { time: 355, text: 'そのまま続けてください\nあと1分です', speech: 'そのまま続けてください。あと1分です', fileKey: 'cd5_13' },
  // 終了プロトコル
  { time: 390, text: '「止まろうとしている\n止まろうとしている\n止まろうとしている」', speech: '止まろうとしている、止まろうとしている、止まろうとしている', fileKey: 'cd5_14' },
  { time: 403, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'cd5_15' },
  { time: 410, text: '「立っている...立っている...立っている」', speech: '立っている、立っている、立っている', fileKey: 'cd5_16' },
  { time: 420, text: 'お疲れさまでした', speech: 'お疲れさまでした', fileKey: 'cd5_17' },
]

const JA_COURSE_DAY6_STEPS: GuideStep[] = [
  // 立つ瞑想
  { time: 0, text: 'まっすぐ立ってください\n「立っている...立っている...立っている」', speech: 'まっすぐ立ってください。立っている、立っている、立っている', fileKey: 'cd6_01' },
  // 歩く意図
  { time: 15, text: '「歩こうとしている...歩こうとしている\n歩こうとしている」', speech: '歩こうとしている、歩こうとしている、歩こうとしている', fileKey: 'cd6_02' },
  // 自主練習
  { time: 28, text: '今日はガイドを最小限にします\nこれまで学んだノーティングを\nご自身のペースで続けてください', speech: '今日はガイドを最小限にします。これまで学んだノーティングを、ご自身のペースで続けてください', fileKey: 'cd6_03' },
  { time: 180, text: '足の裏の動きに意識を戻してください', speech: '足の裏の動きに意識を戻してください', fileKey: 'cd6_04' },
  { time: 330, text: '考えに気づいたら\n足に戻るだけ', speech: '考えに気づいたら、足に戻るだけ', fileKey: 'cd6_05' },
  { time: 470, text: 'そのまま続けてください', speech: 'そのまま続けてください', fileKey: 'cd6_06' },
  { time: 540, text: 'あと1分です', speech: 'あと1分です', fileKey: 'cd6_07' },
  // 終了プロトコル
  { time: 570, text: '「止まろうとしている\n止まろうとしている\n止まろうとしている」', speech: '止まろうとしている、止まろうとしている、止まろうとしている', fileKey: 'cd6_08' },
  { time: 580, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'cd6_09' },
  { time: 590, text: '「立っている...立っている...立っている」', speech: '立っている、立っている、立っている', fileKey: 'cd6_10' },
  { time: 595, text: 'お疲れさまでした', speech: 'お疲れさまでした', fileKey: 'cd6_11' },
]

// Day 7 = bell-only silent meditation (no voice steps, handled in UI)
const JA_COURSE_DAY7_STEPS: GuideStep[] = [
  { time: 0, text: '', speech: '', fileKey: 'bell_start' },
  { time: 300, text: '', speech: '', fileKey: 'bell_half' },
  { time: 595, text: '', speech: '', fileKey: 'bell_end' },
]

/* ─── 7-Day Course: English ─── */
/* Day 1: Right/Left (simplest noting)
   Day 2: Lifting/Placing (2 stages)
   Day 3: Lifting/Moving/Placing (3 stages)
   Day 4: Intending/Lifting/Moving/Placing (4 stages)
   Day 5: Touching/Pressure/Lifting/Moving/Placing (5 stages — finest)
   Day 6: Self-practice (minimal guidance)
   Day 7: Complete silence (bells only)
*/

const EN_COURSE_DAY1_STEPS: GuideStep[] = [
  // Standing meditation
  { time: 0, text: 'Stand upright.\nCast your gaze about 1.5 meters\nahead on the ground.', speech: 'Stand upright. Cast your gaze about one and a half meters ahead on the ground.', fileKey: 'cd1_01' },
  { time: 12, text: '"Standing... standing... standing."\nFeel the soles of both feet\ntouching the ground.', speech: 'Standing, standing, standing. Feel the soles of both feet touching the ground.', fileKey: 'cd1_02' },
  // Intending to walk
  { time: 28, text: '"Intending to walk...\nintending to walk...\nintending to walk."', speech: 'Intending to walk, intending to walk, intending to walk.', fileKey: 'cd1_03' },
  // Begin walking — right/left
  { time: 42, text: 'Slowly begin walking.', speech: 'Slowly begin walking.', fileKey: 'cd1_04' },
  { time: 52, text: 'When your right foot moves,\nsilently note "right."\nWhen your left foot moves, "left."', speech: 'When your right foot moves, silently note right. When your left foot moves, left.', fileKey: 'cd1_05' },
  { time: 80, text: 'Right... left... right... left...\nJust this. Nothing else.', speech: 'Right, left, right, left. Just this. Nothing else.', fileKey: 'cd1_06' },
  { time: 120, text: 'When thoughts arise,\nnote "thinking"\nand return to "right" and "left."', speech: 'When thoughts arise, note thinking, and return to right and left.', fileKey: 'cd1_07' },
  { time: 165, text: 'Right... left... right... left...\nContinue.', speech: 'Right, left, right, left. Continue.', fileKey: 'cd1_08' },
  { time: 210, text: 'Right... left...\nNinety seconds left.', speech: 'Right, left. Ninety seconds left.', fileKey: 'cd1_09' },
  { time: 250, text: 'One minute left.', speech: 'One minute left.', fileKey: 'cd1_10' },
  // Ending protocol
  { time: 270, text: '"Intending to stop...\nintending to stop...\nintending to stop."', speech: 'Intending to stop, intending to stop, intending to stop.', fileKey: 'cd1_11' },
  { time: 280, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'cd1_12' },
  { time: 290, text: '"Standing... standing... standing."', speech: 'Standing, standing, standing.', fileKey: 'cd1_13' },
  { time: 295, text: 'Well done.', speech: 'Well done.', fileKey: 'cd1_14' },
]

const EN_COURSE_DAY2_STEPS: GuideStep[] = [
  // Standing meditation
  { time: 0, text: 'Stand upright.\nCast your gaze about 1.5 meters\nahead on the ground.', speech: 'Stand upright. Cast your gaze about one and a half meters ahead on the ground.', fileKey: 'cd2_01' },
  { time: 12, text: '"Standing... standing... standing."', speech: 'Standing, standing, standing.', fileKey: 'cd2_02' },
  // Intending to walk
  { time: 25, text: '"Intending to walk...\nintending to walk...\nintending to walk."', speech: 'Intending to walk, intending to walk, intending to walk.', fileKey: 'cd2_03' },
  // Begin walking — lifting/placing
  { time: 38, text: 'Begin walking slowly.\nA bit slower than yesterday.', speech: 'Begin walking slowly. A bit slower than yesterday.', fileKey: 'cd2_04' },
  { time: 52, text: 'Today we observe two movements:\n"lifting" and "placing."', speech: 'Today we observe two movements. Lifting, and placing.', fileKey: 'cd2_05' },
  { time: 70, text: 'As your foot leaves the ground: "lifting."\nAs it touches down: "placing."', speech: 'As your foot leaves the ground, note lifting. As it touches down, placing.', fileKey: 'cd2_06' },
  { time: 95, text: 'Lifting... placing...\nlifting... placing...\nNote each one silently.', speech: 'Lifting, placing, lifting, placing. Note each one silently.', fileKey: 'cd2_07' },
  { time: 130, text: 'When thoughts arise,\nnote "thinking"\nand return to your feet.', speech: 'When thoughts arise, note thinking, and return to your feet.', fileKey: 'cd2_08' },
  { time: 170, text: 'Lifting... placing...\nContinue.', speech: 'Lifting, placing. Continue.', fileKey: 'cd2_09' },
  { time: 215, text: 'Lifting... placing...\nNinety seconds left.', speech: 'Lifting, placing. Ninety seconds left.', fileKey: 'cd2_10' },
  { time: 255, text: 'One minute left.', speech: 'One minute left.', fileKey: 'cd2_11' },
  // Ending protocol
  { time: 270, text: '"Intending to stop...\nintending to stop...\nintending to stop."', speech: 'Intending to stop, intending to stop, intending to stop.', fileKey: 'cd2_12' },
  { time: 280, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'cd2_13' },
  { time: 290, text: '"Standing... standing... standing."', speech: 'Standing, standing, standing.', fileKey: 'cd2_14' },
  { time: 295, text: 'Well done.\nTomorrow we observe even more closely.', speech: 'Well done. Tomorrow we observe even more closely.', fileKey: 'cd2_15' },
]

// Day 3 = EN_BEGINNER_STEPS (lifting/moving/placing — 3-stage noting)

const EN_COURSE_DAY4_STEPS: GuideStep[] = [
  // Standing meditation
  { time: 0, text: 'Stand upright.\nCast your gaze about 1.5 meters\nahead on the ground.', speech: 'Stand upright. Cast your gaze about one and a half meters ahead on the ground.', fileKey: 'cd4_01' },
  { time: 12, text: '"Standing... standing... standing."', speech: 'Standing, standing, standing.', fileKey: 'cd4_02' },
  // Intending to walk
  { time: 25, text: '"Intending to walk...\nintending to walk...\nintending to walk."', speech: 'Intending to walk, intending to walk, intending to walk.', fileKey: 'cd4_03' },
  // Begin walking — intending/lifting/moving/placing
  { time: 38, text: 'Today, walk even more slowly.\nAbout one-third of your normal speed.', speech: 'Today, walk even more slowly. About one-third of your normal speed.', fileKey: 'cd4_04' },
  { time: 55, text: 'We add "intending" before\nlifting, moving, and placing.', speech: 'We add intending before lifting, moving, and placing.', fileKey: 'cd4_05' },
  { time: 78, text: 'Before lifting your foot,\na subtle intention to move arises.\nNotice it.', speech: 'Before lifting your foot, a subtle intention to move arises. Notice it.', fileKey: 'cd4_06' },
  { time: 105, text: '"Intending... lifting...\nmoving... placing."\nNote these four silently.', speech: 'Intending, lifting, moving, placing. Note these four silently in your mind.', fileKey: 'cd4_07' },
  { time: 140, text: 'Intention comes first,\nthen movement.\nNoticing this order is key.', speech: 'Intention comes first, then movement. Noticing this order is the key.', fileKey: 'cd4_08' },
  { time: 180, text: 'When thoughts arise,\nnote "thinking"\nand return to observing intention.', speech: 'When thoughts arise, note thinking, and return to observing intention.', fileKey: 'cd4_09' },
  { time: 220, text: 'Intending... lifting...\nmoving... placing...\nContinue.', speech: 'Intending, lifting, moving, placing. Continue.', fileKey: 'cd4_10' },
  { time: 265, text: 'The moment of intention\nis very subtle.\nDon\'t worry if you miss it.', speech: "The moment of intention is very subtle. Don't worry if you miss it.", fileKey: 'cd4_11' },
  { time: 310, text: 'Intending... lifting...\nmoving... placing...\nContinue.', speech: 'Intending, lifting, moving, placing. Continue.', fileKey: 'cd4_12' },
  { time: 355, text: 'One minute left.', speech: 'One minute left.', fileKey: 'cd4_13' },
  // Ending protocol
  { time: 385, text: '"Intending to stop...\nintending to stop...\nintending to stop."', speech: 'Intending to stop, intending to stop, intending to stop.', fileKey: 'cd4_14' },
  { time: 398, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'cd4_15' },
  { time: 405, text: '"Standing... standing... standing."', speech: 'Standing, standing, standing.', fileKey: 'cd4_16' },
  { time: 418, text: 'Well done.', speech: 'Well done.', fileKey: 'cd4_17' },
]

const EN_COURSE_DAY5_STEPS: GuideStep[] = [
  // Standing meditation
  { time: 0, text: 'Stand upright.\nCast your gaze about 1.5 meters\nahead on the ground.', speech: 'Stand upright. Cast your gaze about one and a half meters ahead on the ground.', fileKey: 'cd5_01' },
  { time: 12, text: '"Standing... standing... standing."', speech: 'Standing, standing, standing.', fileKey: 'cd5_02' },
  // Intending to walk
  { time: 25, text: '"Intending to walk...\nintending to walk...\nintending to walk."', speech: 'Intending to walk, intending to walk, intending to walk.', fileKey: 'cd5_03' },
  // Begin walking — 5-stage finest observation
  { time: 38, text: 'Today is the finest observation.\nWalk very, very slowly.', speech: 'Today is the finest level of observation. Walk very, very slowly.', fileKey: 'cd5_04' },
  { time: 55, text: 'Start with "lifting... moving...\nplacing..." to settle in.', speech: 'Start with lifting, moving, placing to settle in.', fileKey: 'cd5_05' },
  { time: 80, text: 'Lifting... moving... placing...\nContinue.', speech: 'Lifting, moving, placing. Continue.', fileKey: 'cd5_06' },
  { time: 115, text: 'Now break it down further.\nFoot touches ground: "touching."\nWeight bears down: "pressure."', speech: 'Now break it down further. When your foot touches the ground, note touching. As weight bears down, pressure.', fileKey: 'cd5_07' },
  { time: 148, text: 'Foot leaves: "lifting."\nMoves through air: "moving."\nComes down: "placing."', speech: 'Foot leaves the ground, lifting. Moves through the air, moving. Comes down, placing.', fileKey: 'cd5_08' },
  { time: 180, text: 'Touching... pressure...\nlifting... moving... placing...\nNote each one silently.', speech: 'Touching, pressure, lifting, moving, placing. Note each one silently.', fileKey: 'cd5_09' },
  { time: 220, text: 'When thoughts arise,\nnote "thinking"\nand return to the observation.', speech: 'When thoughts arise, note thinking, and return to the observation.', fileKey: 'cd5_10' },
  { time: 265, text: 'Touching... pressure...\nlifting... moving... placing...\nContinue.', speech: 'Touching, pressure, lifting, moving, placing. Continue.', fileKey: 'cd5_11' },
  { time: 315, text: 'If it feels too detailed,\nyou can return to\n"lifting... moving... placing."', speech: 'If it feels too detailed, you can return to lifting, moving, placing.', fileKey: 'cd5_12' },
  { time: 355, text: 'Continue.\nOne minute left.', speech: 'Continue. One minute left.', fileKey: 'cd5_13' },
  // Ending protocol
  { time: 390, text: '"Intending to stop...\nintending to stop...\nintending to stop."', speech: 'Intending to stop, intending to stop, intending to stop.', fileKey: 'cd5_14' },
  { time: 403, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'cd5_15' },
  { time: 410, text: '"Standing... standing... standing."', speech: 'Standing, standing, standing.', fileKey: 'cd5_16' },
  { time: 420, text: 'Well done.', speech: 'Well done.', fileKey: 'cd5_17' },
]

const EN_COURSE_DAY6_STEPS: GuideStep[] = [
  // Standing meditation
  { time: 0, text: 'Stand upright.\n"Standing... standing... standing."', speech: 'Stand upright. Standing, standing, standing.', fileKey: 'cd6_01' },
  // Intending to walk
  { time: 15, text: '"Intending to walk...\nintending to walk...\nintending to walk."', speech: 'Intending to walk, intending to walk, intending to walk.', fileKey: 'cd6_02' },
  // Self-practice
  { time: 28, text: 'Today, minimal guidance.\nContinue noting at your own pace\nusing whatever method you prefer.', speech: 'Today, minimal guidance. Continue noting at your own pace, using whatever method you prefer.', fileKey: 'cd6_03' },
  { time: 180, text: 'Return your attention\nto the movement of your feet.', speech: 'Return your attention to the movement of your feet.', fileKey: 'cd6_04' },
  { time: 330, text: 'When you notice thoughts,\nreturn to your feet.', speech: 'When you notice thoughts, return to your feet.', fileKey: 'cd6_05' },
  { time: 470, text: 'Continue.', speech: 'Continue.', fileKey: 'cd6_06' },
  { time: 540, text: 'One minute left.', speech: 'One minute left.', fileKey: 'cd6_07' },
  // Ending protocol
  { time: 570, text: '"Intending to stop...\nintending to stop...\nintending to stop."', speech: 'Intending to stop, intending to stop, intending to stop.', fileKey: 'cd6_08' },
  { time: 580, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'cd6_09' },
  { time: 590, text: '"Standing... standing... standing."', speech: 'Standing, standing, standing.', fileKey: 'cd6_10' },
  { time: 595, text: 'Well done.', speech: 'Well done.', fileKey: 'cd6_11' },
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


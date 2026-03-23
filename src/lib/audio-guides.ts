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
  isPremium: boolean
  steps: GuideStep[]
}

/* ─── Japanese Steps ─── */

const JA_BEGINNER_STEPS: GuideStep[] = [
  { time: 0, text: '目を軽く閉じて、3回深呼吸しましょう', speech: '目を軽く閉じて、3回深呼吸しましょう', fileKey: 'day1_01', breathe: 'in' },
  { time: 8, text: 'ゆっくり吐いて...', speech: 'ゆっくり吐いて', fileKey: 'day1_02', breathe: 'out' },
  { time: 15, text: 'もう一度、吸って...', speech: 'もう一度、吸って', fileKey: 'day1_03', breathe: 'in' },
  { time: 22, text: '吐いて...', speech: '吐いて', fileKey: 'day1_04', breathe: 'out' },
  { time: 30, text: 'では、ゆっくり歩き始めてください', speech: 'では、ゆっくり歩き始めてください', fileKey: 'day1_05' },
  { time: 40, text: '右足が地面に触れる感覚に\n意識を向けましょう', speech: '右足が地面に触れる感覚に意識を向けましょう', fileKey: 'day1_06' },
  { time: 55, text: '次は左足。\n足の裏全体で地面を感じてください', speech: '次は左足。足の裏全体で地面を感じてください', fileKey: 'day1_07' },
  { time: 75, text: 'そのまま歩き続けてください\n一歩一歩に集中して', speech: 'そのまま歩き続けてください。一歩一歩に集中して', fileKey: 'day1_08' },
  { time: 100, text: '周りの音に耳を傾けてみましょう\n風の音、鳥の声...', speech: '周りの音に耳を傾けてみましょう。風の音、鳥の声', fileKey: 'day1_09' },
  { time: 130, text: '呼吸のリズムに合わせて\n歩いてみましょう', speech: '呼吸のリズムに合わせて歩いてみましょう', fileKey: 'day1_10', breathe: 'in' },
  { time: 150, text: '吸って、2歩\n吐いて、3歩', speech: '吸って、2歩。吐いて、3歩', fileKey: 'day1_11', breathe: 'out' },
  { time: 180, text: '素晴らしいです\nそのまま歩き続けてください', speech: '素晴らしいです。そのまま歩き続けてください', fileKey: 'day1_12' },
  { time: 210, text: '頭に浮かぶ考えは\n雲のように流しましょう', speech: '頭に浮かぶ考えは、雲のように流しましょう', fileKey: 'day1_13' },
  { time: 240, text: 'あと1分です\n最後の一歩一歩を味わって', speech: 'あと1分です。最後の一歩一歩を味わって', fileKey: 'day1_14' },
  { time: 270, text: 'ゆっくりと歩みを止めてください', speech: 'ゆっくりと歩みを止めてください', fileKey: 'day1_15' },
  { time: 280, text: '深く息を吸って...', speech: '深く息を吸って', fileKey: 'day1_16', breathe: 'in' },
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
  { time: 8, text: '鼻から深く吸って...\nお腹をふくらませて', speech: '鼻から深く吸って。お腹をふくらませて', fileKey: 'stress_02', breathe: 'in' },
  { time: 16, text: '口からゆっくり吐いて...\n体の力を抜いて', speech: '口からゆっくり吐いて。体の力を抜いて', fileKey: 'stress_03', breathe: 'out' },
  { time: 25, text: 'もう一度、深く吸って', speech: 'もう一度、深く吸って', fileKey: 'stress_04', breathe: 'in' },
  { time: 33, text: 'ふーっと、全部吐き出して', speech: 'ふーっと、全部吐き出して', fileKey: 'stress_05', breathe: 'out' },
  { time: 45, text: 'では、ゆっくり歩き始めましょう\nいつもより少しだけゆっくり', speech: 'では、ゆっくり歩き始めましょう。いつもより少しだけゆっくり', fileKey: 'stress_06' },
  { time: 70, text: '肩に力が入っていませんか？\nストンと落としてみましょう', speech: '肩に力が入っていませんか？ストンと落としてみましょう', fileKey: 'stress_07' },
  { time: 100, text: '歩きながら、足の裏に意識を集中\nかかとから、つま先へ', speech: '歩きながら、足の裏に意識を集中。かかとから、つま先へ', fileKey: 'stress_08' },
  { time: 135, text: '今日あったストレスを思い浮かべて\nそれを息と一緒に吐き出します', speech: '今日あったストレスを思い浮かべて。それを息と一緒に吐き出します', fileKey: 'stress_09', breathe: 'out' },
  { time: 170, text: '吐くたびに\n体が軽くなっていきます', speech: '吐くたびに、体が軽くなっていきます', fileKey: 'stress_10', breathe: 'out' },
  { time: 210, text: '歩くリズムに身を委ねて\n何も考えなくて大丈夫', speech: '歩くリズムに身を委ねて。何も考えなくて大丈夫', fileKey: 'stress_11' },
  { time: 260, text: '頭のてっぺんから\nつま先まで意識を通してみましょう', speech: '頭のてっぺんから、つま先まで意識を通してみましょう', fileKey: 'stress_12' },
  { time: 310, text: '体のどこかに\n緊張が残っていませんか？', speech: '体のどこかに、緊張が残っていませんか？', fileKey: 'stress_13' },
  { time: 350, text: '見つけたら、そこに\n温かい息を送り込みましょう', speech: '見つけたら、そこに温かい息を送り込みましょう', fileKey: 'stress_14', breathe: 'in' },
  { time: 390, text: '素晴らしいです\nそのまま歩き続けてください', speech: '素晴らしいです。そのまま歩き続けてください', fileKey: 'stress_15' },
  { time: 440, text: '今この瞬間、あなたは大丈夫です\nここにいるだけで十分です', speech: '今この瞬間、あなたは大丈夫です。ここにいるだけで十分です', fileKey: 'stress_16' },
  { time: 490, text: '感謝できることを\nひとつ思い浮かべてみましょう', speech: '感謝できることを、ひとつ思い浮かべてみましょう', fileKey: 'stress_17' },
  { time: 530, text: 'あと1分です\nゆっくりと歩みを緩めて', speech: 'あと1分です。ゆっくりと歩みを緩めて', fileKey: 'stress_18' },
  { time: 560, text: '立ち止まって\n最後に深く息を吸って', speech: '立ち止まって。最後に深く息を吸って', fileKey: 'stress_19', breathe: 'in' },
  { time: 575, text: 'ゆっくり吐いて...\n心が穏やかになりました', speech: 'ゆっくり吐いて。心が穏やかになりました', fileKey: 'stress_20', breathe: 'out' },
  { time: 590, text: 'お疲れさまでした\nストレスが軽くなっていますように', speech: 'お疲れさまでした。ストレスが軽くなっていますように', fileKey: 'stress_21' },
]

const JA_MORNING_STEPS: GuideStep[] = [
  { time: 0, text: 'おはようございます\n朝の新鮮な空気を吸い込みましょう', speech: 'おはようございます。朝の新鮮な空気を吸い込みましょう', fileKey: 'morning_01', breathe: 'in' },
  { time: 10, text: '大きく吐いて\n眠気を外に出しましょう', speech: '大きく吐いて。眠気を外に出しましょう', fileKey: 'morning_02', breathe: 'out' },
  { time: 20, text: 'もう一度、胸いっぱいに吸って', speech: 'もう一度、胸いっぱいに吸って', fileKey: 'morning_03', breathe: 'in' },
  { time: 28, text: 'ふーっと吐いて\n体が目覚めていきます', speech: 'ふーっと吐いて。体が目覚めていきます', fileKey: 'morning_04', breathe: 'out' },
  { time: 40, text: 'さあ、元気よく歩き始めましょう\nリズミカルに、テンポよく', speech: 'さあ、元気よく歩き始めましょう。リズミカルに、テンポよく', fileKey: 'morning_05' },
  { time: 65, text: '太陽の光を感じてみましょう\n顔に、肩に、体全体に', speech: '太陽の光を感じてみましょう。顔に、肩に、体全体に', fileKey: 'morning_06' },
  { time: 95, text: '一歩ごとにエネルギーが\n足元から湧き上がるイメージ', speech: '一歩ごとにエネルギーが、足元から湧き上がるイメージ', fileKey: 'morning_07' },
  { time: 130, text: '背筋を伸ばして\n胸を開いて歩きましょう', speech: '背筋を伸ばして。胸を開いて歩きましょう', fileKey: 'morning_08' },
  { time: 165, text: '今日一日の目標を\nひとつ心に決めましょう', speech: '今日一日の目標を、ひとつ心に決めましょう', fileKey: 'morning_09' },
  { time: 210, text: 'その目標を胸に\n力強く歩き続けてください', speech: 'その目標を胸に、力強く歩き続けてください', fileKey: 'morning_10' },
  { time: 260, text: '深く吸って、エネルギーを充電\n吐いて、不安を手放す', speech: '深く吸って、エネルギーを充電。吐いて、不安を手放す', fileKey: 'morning_11', breathe: 'in' },
  { time: 310, text: '今日は素晴らしい一日になります\nそう、自分に伝えてあげましょう', speech: '今日は素晴らしい一日になります。そう、自分に伝えてあげましょう', fileKey: 'morning_12' },
  { time: 360, text: 'あと1分です\n最後のエネルギーチャージ', speech: 'あと1分です。最後のエネルギーチャージ', fileKey: 'morning_13' },
  { time: 390, text: '深く息を吸って\nパワーを満タンに', speech: '深く息を吸って。パワーを満タンに', fileKey: 'morning_14', breathe: 'in' },
  { time: 405, text: 'お疲れさまでした\n今日も最高の一日を！', speech: 'お疲れさまでした。今日も最高の一日を！', fileKey: 'morning_15' },
]

const JA_EVENING_STEPS: GuideStep[] = [
  { time: 0, text: 'お疲れさまです\n今日一日、よく頑張りました', speech: 'お疲れさまです。今日一日、よく頑張りました', fileKey: 'evening_01' },
  { time: 10, text: 'まず、深く息を吸って\n今日の疲れを認めてあげましょう', speech: 'まず、深く息を吸って。今日の疲れを認めてあげましょう', fileKey: 'evening_02', breathe: 'in' },
  { time: 22, text: 'ゆっくり吐いて\n少しずつ力を抜いていきます', speech: 'ゆっくり吐いて。少しずつ力を抜いていきます', fileKey: 'evening_03', breathe: 'out' },
  { time: 35, text: 'ゆっくり、ゆっくり\n歩き始めてください', speech: 'ゆっくり、ゆっくり、歩き始めてください', fileKey: 'evening_04' },
  { time: 60, text: '一歩一歩を\nとても丁寧に踏みしめて', speech: '一歩一歩を、とても丁寧に踏みしめて', fileKey: 'evening_05' },
  { time: 90, text: '今日あった出来事を\n頭の中で振り返ってみましょう', speech: '今日あった出来事を、頭の中で振り返ってみましょう', fileKey: 'evening_06' },
  { time: 130, text: '良いことも、大変だったことも\nどちらも今日の大切な経験です', speech: '良いことも、大変だったことも。どちらも今日の大切な経験です', fileKey: 'evening_07' },
  { time: 170, text: 'それらを一つずつ\n感謝とともに手放していきましょう', speech: 'それらを一つずつ、感謝とともに手放していきましょう', fileKey: 'evening_08' },
  { time: 215, text: '息を吐くたびに\n一日の荷物を下ろしていきます', speech: '息を吐くたびに、一日の荷物を下ろしていきます', fileKey: 'evening_09', breathe: 'out' },
  { time: 260, text: '歩くスピードを\nさらにゆっくりにしてみましょう', speech: '歩くスピードを、さらにゆっくりにしてみましょう', fileKey: 'evening_10' },
  { time: 300, text: '夕暮れの空気を感じて\n風が頬を撫でるのを味わって', speech: '夕暮れの空気を感じて。風が頬を撫でるのを味わって', fileKey: 'evening_11' },
  { time: 345, text: '心の中に\n静かな湖をイメージしてください', speech: '心の中に、静かな湖をイメージしてください', fileKey: 'evening_12' },
  { time: 390, text: '波ひとつない、穏やかな水面\nあなたの心も同じように静まっていきます', speech: '波ひとつない、穏やかな水面。あなたの心も同じように静まっていきます', fileKey: 'evening_13' },
  { time: 435, text: '今日の自分に\n「よくやったね」と伝えましょう', speech: '今日の自分に、よくやったねと伝えましょう', fileKey: 'evening_14' },
  { time: 475, text: '明日のことは明日の自分に任せて\n今はただ、この瞬間を味わって', speech: '明日のことは明日の自分に任せて。今はただ、この瞬間を味わって', fileKey: 'evening_15' },
  { time: 520, text: 'あと1分です\nゆっくりと歩みを止めてください', speech: 'あと1分です。ゆっくりと歩みを止めてください', fileKey: 'evening_16' },
  { time: 550, text: '立ち止まって\n最後の深呼吸をしましょう', speech: '立ち止まって。最後の深呼吸をしましょう', fileKey: 'evening_17', breathe: 'in' },
  { time: 565, text: '全部、吐き切って...', speech: '全部、吐き切って', fileKey: 'evening_18', breathe: 'out' },
  { time: 580, text: 'お疲れさまでした\n穏やかな夜をお過ごしください', speech: 'お疲れさまでした。穏やかな夜をお過ごしください', fileKey: 'evening_19' },
]

const JA_FOCUS_STEPS: GuideStep[] = [
  { time: 0, text: '集中力を高める歩禅です\nまず3回、深呼吸しましょう', speech: '集中力を高める歩禅です。まず3回、深呼吸しましょう', fileKey: 'focus_01', breathe: 'in' },
  { time: 10, text: '吐いて...', speech: '吐いて', fileKey: 'focus_02', breathe: 'out' },
  { time: 17, text: '吸って...', speech: '吸って', fileKey: 'focus_03', breathe: 'in' },
  { time: 24, text: '吐いて...', speech: '吐いて', fileKey: 'focus_04', breathe: 'out' },
  { time: 35, text: '歩き始めてください\n一歩ずつ、数えていきましょう', speech: '歩き始めてください。一歩ずつ、数えていきましょう', fileKey: 'focus_05' },
  { time: 50, text: 'いち、に、さん、し...\n10まで数えたら、また1から', speech: 'いち、に、さん、し。10まで数えたら、また1から', fileKey: 'focus_06' },
  { time: 85, text: '数がわからなくなっても大丈夫\nまた1から始めましょう', speech: '数がわからなくなっても大丈夫。また1から始めましょう', fileKey: 'focus_07' },
  { time: 120, text: '余計な考えが浮かんだら\nそっと数に意識を戻して', speech: '余計な考えが浮かんだら、そっと数に意識を戻して', fileKey: 'focus_08' },
  { time: 155, text: 'いいリズムです\n足の裏の感覚と、数だけに集中', speech: 'いいリズムです。足の裏の感覚と、数だけに集中', fileKey: 'focus_09' },
  { time: 195, text: '今度は数えるのをやめて\n歩くリズムだけに意識を向けて', speech: '今度は数えるのをやめて。歩くリズムだけに意識を向けて', fileKey: 'focus_10' },
  { time: 230, text: '一点に集中する力が\n研ぎ澄まされていきます', speech: '一点に集中する力が、研ぎ澄まされていきます', fileKey: 'focus_11' },
  { time: 260, text: 'あと30秒です\n最後まで集中を保って', speech: 'あと30秒です。最後まで集中を保って', fileKey: 'focus_12' },
  { time: 280, text: '深く息を吸って...', speech: '深く息を吸って', fileKey: 'focus_13', breathe: 'in' },
  { time: 290, text: 'お疲れさまでした\n集中力がリセットされました', speech: 'お疲れさまでした。集中力がリセットされました', fileKey: 'focus_14' },
]

/* ─── English Steps ─── */

const EN_BEGINNER_STEPS: GuideStep[] = [
  { time: 0, text: 'Gently close your eyes\nand take three deep breaths.', speech: 'Gently close your eyes, and take three deep breaths.', fileKey: 'day1_01', breathe: 'in' },
  { time: 8, text: 'Slowly breathe out...', speech: 'Slowly breathe out.', fileKey: 'day1_02', breathe: 'out' },
  { time: 15, text: 'Once more, breathe in...', speech: 'Once more, breathe in.', fileKey: 'day1_03', breathe: 'in' },
  { time: 22, text: 'And breathe out...', speech: 'And breathe out.', fileKey: 'day1_04', breathe: 'out' },
  { time: 30, text: 'Now, slowly begin walking.', speech: 'Now, slowly begin walking.', fileKey: 'day1_05' },
  { time: 40, text: 'Bring your attention to your\nright foot touching the ground.', speech: 'Bring your attention to the sensation of your right foot touching the ground.', fileKey: 'day1_06' },
  { time: 55, text: 'Now your left foot.\nFeel the entire sole on the earth.', speech: 'Now your left foot. Feel the entire sole as it meets the earth.', fileKey: 'day1_07' },
  { time: 75, text: 'Keep walking.\nFocus on each and every step.', speech: 'Keep walking, focusing on each and every step.', fileKey: 'day1_08' },
  { time: 100, text: 'Listen to the sounds around you.\nThe wind, the birds...', speech: 'Listen to the sounds around you. The wind, the birds.', fileKey: 'day1_09' },
  { time: 130, text: 'Try matching your steps\nto your breath.', speech: 'Try matching your steps to your breath.', fileKey: 'day1_10', breathe: 'in' },
  { time: 150, text: 'Breathe in for two steps.\nBreathe out for three.', speech: 'Breathe in for two steps. Breathe out for three.', fileKey: 'day1_11', breathe: 'out' },
  { time: 180, text: 'Wonderful.\nKeep walking just like that.', speech: 'Wonderful. Keep walking just like that.', fileKey: 'day1_12' },
  { time: 210, text: 'Let any thoughts drift by,\nlike clouds in the sky.', speech: 'Let any thoughts drift by, like clouds passing through the sky.', fileKey: 'day1_13' },
  { time: 240, text: 'One minute left.\nSavor each of these final steps.', speech: 'One minute left. Savor each of these final steps.', fileKey: 'day1_14' },
  { time: 270, text: 'Slowly come to a stop.', speech: 'Slowly come to a stop.', fileKey: 'day1_15' },
  { time: 280, text: 'Take a deep breath in...', speech: 'Take a deep breath in.', fileKey: 'day1_16', breathe: 'in' },
  { time: 287, text: 'And slowly breathe out...', speech: 'And slowly breathe out.', fileKey: 'day1_17', breathe: 'out' },
  { time: 295, text: 'Well done.\nA beautiful walking meditation.', speech: 'Well done. That was a beautiful walking meditation.', fileKey: 'day1_18' },
]

const EN_TIMER_STEPS: GuideStep[] = [
  { time: 0, text: 'Your walking meditation begins.\nWalk at your own pace.', speech: 'Your walking meditation begins now. Walk at your own pace.', fileKey: 'silent_start' },
  { time: 150, text: "You're halfway through.", speech: "You're halfway through.", fileKey: 'silent_half' },
  { time: 290, text: 'Almost finished.', speech: 'Almost finished.', fileKey: 'silent_end' },
]

const EN_STRESS_STEPS: GuideStep[] = [
  { time: 0, text: 'Stand still, and\ngently close your eyes.', speech: 'Stand still, and gently close your eyes.', fileKey: 'stress_01', breathe: 'in' },
  { time: 8, text: 'Breathe in deeply through your nose.\nLet your belly expand.', speech: 'Breathe in deeply through your nose. Let your belly expand.', fileKey: 'stress_02', breathe: 'in' },
  { time: 16, text: 'Slowly breathe out.\nRelease all tension.', speech: 'Slowly breathe out through your mouth. Release all tension.', fileKey: 'stress_03', breathe: 'out' },
  { time: 25, text: 'Once more, breathe in deeply.', speech: 'Once more, breathe in deeply.', fileKey: 'stress_04', breathe: 'in' },
  { time: 33, text: 'And let it all go.', speech: 'And let it all go with a long exhale.', fileKey: 'stress_05', breathe: 'out' },
  { time: 45, text: 'Begin walking slowly.\nA little slower than usual.', speech: 'Now, begin walking slowly. A little slower than usual.', fileKey: 'stress_06' },
  { time: 70, text: 'Are your shoulders tense?\nLet them drop and relax.', speech: 'Are your shoulders tense? Let them drop and relax.', fileKey: 'stress_07' },
  { time: 100, text: 'Focus on the soles of your feet.\nFrom heel to toe.', speech: 'As you walk, focus on the soles of your feet. From heel to toe.', fileKey: 'stress_08' },
  { time: 135, text: 'Think of today\'s stress.\nBreathe it out, let it go.', speech: 'Think of any stress you felt today. Now breathe it out, let it go.', fileKey: 'stress_09', breathe: 'out' },
  { time: 170, text: 'With each exhale,\nyour body grows lighter.', speech: 'With each exhale, your body grows lighter.', fileKey: 'stress_10', breathe: 'out' },
  { time: 210, text: 'Surrender to the rhythm.\nIt\'s okay to think of nothing.', speech: "Surrender to the rhythm of your steps. It's okay to think of nothing.", fileKey: 'stress_11' },
  { time: 260, text: 'Scan from head to toe.', speech: 'Scan from the top of your head down to your toes.', fileKey: 'stress_12' },
  { time: 310, text: 'Any remaining tension\nin your body?', speech: 'Is there any remaining tension in your body?', fileKey: 'stress_13' },
  { time: 350, text: 'Send a warm breath\nto that spot.', speech: 'If you find some, send a warm breath to that spot.', fileKey: 'stress_14', breathe: 'in' },
  { time: 390, text: 'Wonderful.\nKeep walking just like that.', speech: 'Wonderful. Keep walking just like that.', fileKey: 'stress_15' },
  { time: 440, text: 'In this moment, you are okay.\nJust being here is enough.', speech: 'In this moment, you are okay. Just being here is enough.', fileKey: 'stress_16' },
  { time: 490, text: 'Think of one thing\nyou\'re grateful for.', speech: "Think of one thing you're grateful for.", fileKey: 'stress_17' },
  { time: 530, text: 'One minute left.\nSlowly ease your pace.', speech: 'One minute left. Slowly ease your pace.', fileKey: 'stress_18' },
  { time: 560, text: 'Come to a stop.\nTake one last deep breath.', speech: 'Come to a stop. Take one last deep breath in.', fileKey: 'stress_19', breathe: 'in' },
  { time: 575, text: 'Slowly breathe out.\nYour mind has found its calm.', speech: 'Slowly breathe out. Your mind has found its calm.', fileKey: 'stress_20', breathe: 'out' },
  { time: 590, text: 'Well done.\nMay your stress feel lighter.', speech: 'Well done. May your stress feel a little lighter now.', fileKey: 'stress_21' },
]

const EN_MORNING_STEPS: GuideStep[] = [
  { time: 0, text: 'Good morning.\nTake in the fresh morning air.', speech: 'Good morning. Take in the fresh morning air.', fileKey: 'morning_01', breathe: 'in' },
  { time: 10, text: 'Breathe out fully.\nPush out any sleepiness.', speech: 'Breathe out fully. Push out any sleepiness.', fileKey: 'morning_02', breathe: 'out' },
  { time: 20, text: 'Once more, fill your lungs.', speech: 'Once more, fill your lungs completely.', fileKey: 'morning_03', breathe: 'in' },
  { time: 28, text: 'And breathe out.\nYour body is waking up.', speech: 'And breathe out. Your body is waking up.', fileKey: 'morning_04', breathe: 'out' },
  { time: 40, text: 'Start walking with energy.\nKeep a lively rhythm.', speech: 'Now, start walking with energy. Keep a lively rhythm.', fileKey: 'morning_05' },
  { time: 65, text: 'Feel the sunlight.\nOn your face, shoulders, whole body.', speech: 'Feel the sunlight. On your face, your shoulders, your whole body.', fileKey: 'morning_06' },
  { time: 95, text: 'With each step, energy\nrises from the ground.', speech: 'With each step, imagine energy rising up from the ground.', fileKey: 'morning_07' },
  { time: 130, text: 'Straighten your back.\nOpen your chest as you walk.', speech: 'Straighten your back. Open your chest as you walk.', fileKey: 'morning_08' },
  { time: 165, text: 'Set one intention for today.\nHold it in your heart.', speech: 'Set one intention for today. Hold it in your heart.', fileKey: 'morning_09' },
  { time: 210, text: 'Carry that intention forward\nwith each powerful step.', speech: 'Carry that intention forward with each powerful step.', fileKey: 'morning_10' },
  { time: 260, text: 'Breathe in to recharge.\nBreathe out to release worry.', speech: 'Breathe in to recharge. Breathe out to release any worry.', fileKey: 'morning_11', breathe: 'in' },
  { time: 310, text: 'Today will be wonderful.\nTell yourself that.', speech: 'Today is going to be a wonderful day. Tell yourself that.', fileKey: 'morning_12' },
  { time: 360, text: 'One minute left.\nFinal energy boost.', speech: 'One minute left. Time for a final energy boost.', fileKey: 'morning_13' },
  { time: 390, text: 'Deep breath in.\nFill yourself with power.', speech: 'Take a deep breath in. Fill yourself with power.', fileKey: 'morning_14', breathe: 'in' },
  { time: 405, text: 'Well done.\nHave an amazing day!', speech: 'Well done. Have an amazing day!', fileKey: 'morning_15' },
]

const EN_EVENING_STEPS: GuideStep[] = [
  { time: 0, text: 'Good evening.\nYou\'ve worked hard today.', speech: "Good evening. You've worked hard today.", fileKey: 'evening_01' },
  { time: 10, text: 'Take a deep breath in.\nAcknowledge today\'s fatigue.', speech: "Take a deep breath in. Acknowledge today's fatigue.", fileKey: 'evening_02', breathe: 'in' },
  { time: 22, text: 'Slowly breathe out.\nRelease all tension.', speech: 'Slowly breathe out. Gradually release all tension.', fileKey: 'evening_03', breathe: 'out' },
  { time: 35, text: 'Begin walking.\nSlowly, very slowly.', speech: 'Begin walking, slowly, very slowly.', fileKey: 'evening_04' },
  { time: 60, text: 'Place each step\nwith great care.', speech: 'Place each step with great care and intention.', fileKey: 'evening_05' },
  { time: 90, text: 'Let your mind review\nthe events of today.', speech: 'Let your mind review the events of today.', fileKey: 'evening_06' },
  { time: 130, text: 'The good and the hard.\nBoth are valuable experiences.', speech: 'The good moments and the hard ones. Both are valuable experiences.', fileKey: 'evening_07' },
  { time: 170, text: 'One by one,\nrelease them with gratitude.', speech: 'One by one, release them with gratitude.', fileKey: 'evening_08' },
  { time: 215, text: 'With each exhale,\nset down the weight of the day.', speech: 'With each exhale, set down the weight of the day.', fileKey: 'evening_09', breathe: 'out' },
  { time: 260, text: 'Slow your pace even more.', speech: 'Slow your pace even more.', fileKey: 'evening_10' },
  { time: 300, text: 'Feel the evening air.\nThe gentle breeze on your cheeks.', speech: 'Feel the evening air. The gentle breeze on your cheeks.', fileKey: 'evening_11' },
  { time: 345, text: 'Picture a still lake\nin your mind.', speech: 'Picture a still lake in your mind.', fileKey: 'evening_12' },
  { time: 390, text: 'Not a single ripple.\nYour mind grows just as calm.', speech: 'Not a single ripple. Your mind grows just as calm.', fileKey: 'evening_13' },
  { time: 435, text: 'Tell yourself:\nwell done today.', speech: 'Tell yourself, well done today.', fileKey: 'evening_14' },
  { time: 475, text: 'Tomorrow can wait.\nJust savor this moment.', speech: 'Tomorrow can wait. For now, just savor this moment.', fileKey: 'evening_15' },
  { time: 520, text: 'One minute left.\nGently come to a stop.', speech: 'One minute left. Gently come to a stop.', fileKey: 'evening_16' },
  { time: 550, text: 'Stand still.\nOne final deep breath.', speech: 'Stand still. Take one final deep breath.', fileKey: 'evening_17', breathe: 'in' },
  { time: 565, text: 'Let it all out...', speech: 'Let it all out.', fileKey: 'evening_18', breathe: 'out' },
  { time: 580, text: 'Well done.\nHave a peaceful evening.', speech: 'Well done. Have a peaceful evening.', fileKey: 'evening_19' },
]

const EN_FOCUS_STEPS: GuideStep[] = [
  { time: 0, text: 'A focus-boosting meditation.\nThree deep breaths to start.', speech: "This is a focus-boosting meditation. Let's start with three deep breaths.", fileKey: 'focus_01', breathe: 'in' },
  { time: 10, text: 'Breathe out...', speech: 'Breathe out.', fileKey: 'focus_02', breathe: 'out' },
  { time: 17, text: 'Breathe in...', speech: 'Breathe in.', fileKey: 'focus_03', breathe: 'in' },
  { time: 24, text: 'Breathe out...', speech: 'Breathe out.', fileKey: 'focus_04', breathe: 'out' },
  { time: 35, text: 'Start walking.\nCount each step as you go.', speech: 'Start walking. Count each step as you go.', fileKey: 'focus_05' },
  { time: 50, text: 'One, two, three, four...\nAt ten, start over from one.', speech: 'One, two, three, four. When you reach ten, start over from one.', fileKey: 'focus_06' },
  { time: 85, text: 'Lost count? No problem.\nJust start from one again.', speech: "If you lose count, that's fine. Just start from one again.", fileKey: 'focus_07' },
  { time: 120, text: 'Stray thoughts?\nGently return to counting.', speech: 'When stray thoughts arise, gently return your focus to counting.', fileKey: 'focus_08' },
  { time: 155, text: 'Great rhythm.\nFeet and counting only.', speech: 'Great rhythm. Focus only on the feeling in your feet and the count.', fileKey: 'focus_09' },
  { time: 195, text: 'Stop counting now.\nFocus only on your rhythm.', speech: 'Now stop counting. Focus only on the rhythm of your steps.', fileKey: 'focus_10' },
  { time: 230, text: 'Your concentration\nis sharpening.', speech: 'Your power of concentration is sharpening.', fileKey: 'focus_11' },
  { time: 260, text: 'Thirty seconds left.\nStay focused.', speech: 'Thirty seconds left. Stay focused until the end.', fileKey: 'focus_12' },
  { time: 280, text: 'Take a deep breath in...', speech: 'Take a deep breath in.', fileKey: 'focus_13', breathe: 'in' },
  { time: 290, text: 'Well done.\nYour focus has been reset.', speech: 'Well done. Your focus has been reset.', fileKey: 'focus_14' },
]

/* ─── Program definitions by locale ─── */

const PROGRAMS_JA = {
  free: [
    { id: 'beginner-day1', steps: JA_BEGINNER_STEPS },
    { id: 'timer-5', steps: JA_TIMER_STEPS },
  ],
  premium: [
    { id: 'stress-relief', steps: JA_STRESS_STEPS },
    { id: 'morning-energy', steps: JA_MORNING_STEPS },
    { id: 'evening-calm', steps: JA_EVENING_STEPS },
    { id: 'focus-boost', steps: JA_FOCUS_STEPS },
  ],
}

const PROGRAMS_EN = {
  free: [
    { id: 'beginner-day1', steps: EN_BEGINNER_STEPS },
    { id: 'timer-5', steps: EN_TIMER_STEPS },
  ],
  premium: [
    { id: 'stress-relief', steps: EN_STRESS_STEPS },
    { id: 'morning-energy', steps: EN_MORNING_STEPS },
    { id: 'evening-calm', steps: EN_EVENING_STEPS },
    { id: 'focus-boost', steps: EN_FOCUS_STEPS },
  ],
}

/* ─── Metadata (shared structure, titles resolved via i18n) ─── */

interface ProgramMeta {
  id: string
  duration: number
  isPremium: boolean
}

const PROGRAM_META: ProgramMeta[] = [
  { id: 'beginner-day1', duration: 5, isPremium: false },
  { id: 'timer-5', duration: 5, isPremium: false },
  { id: 'stress-relief', duration: 10, isPremium: true },
  { id: 'morning-energy', duration: 7, isPremium: true },
  { id: 'evening-calm', duration: 10, isPremium: true },
  { id: 'focus-boost', duration: 5, isPremium: true },
]

/**
 * Get programs for a given locale
 */
export function getPrograms(locale: Locale, titleFn: (key: string) => string): { free: MeditationProgram[], premium: MeditationProgram[] } {
  const data = locale === 'en' ? PROGRAMS_EN : PROGRAMS_JA

  const TITLE_KEYS: Record<string, [string, string]> = {
    'beginner-day1': ['program_beginner_title', 'program_beginner_subtitle'],
    'timer-5': ['program_timer_title', 'program_timer_subtitle'],
    'stress-relief': ['program_stress_title', 'program_stress_subtitle'],
    'morning-energy': ['program_morning_title', 'program_morning_subtitle'],
    'evening-calm': ['program_evening_title', 'program_evening_subtitle'],
    'focus-boost': ['program_focus_title', 'program_focus_subtitle'],
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
        isPremium: meta.isPremium,
        steps,
      }
    })
  }

  return {
    free: build(data.free),
    premium: build(data.premium),
  }
}

/** Get audio path prefix for locale + gender */
export function getAudioPrefix(locale: Locale, gender: 'female' | 'male'): string {
  if (locale === 'en') return `/audio/guide/en_${gender}`
  return `/audio/guide/${gender}`
}

// Legacy exports for backward compat during transition
export const FREE_PROGRAMS: MeditationProgram[] = PROGRAMS_JA.free.map(({ id, steps }) => {
  const meta = PROGRAM_META.find(m => m.id === id)!
  const titles: Record<string, [string, string]> = {
    'beginner-day1': ['はじめての歩禅', 'Day 1 - 5分間の基本体験'],
    'timer-5': ['サイレント歩禅', '5分間のタイマーモード'],
  }
  const [title, subtitle] = titles[id] || [id, '']
  return { id, title, subtitle, duration: meta.duration, isPremium: meta.isPremium, steps }
})

export const PREMIUM_PROGRAMS: MeditationProgram[] = PROGRAMS_JA.premium.map(({ id, steps }) => {
  const meta = PROGRAM_META.find(m => m.id === id)!
  const titles: Record<string, [string, string]> = {
    'stress-relief': ['ストレス解放', '10分間の深いリラクゼーション'],
    'morning-energy': ['朝のエナジー', '7分間の活力チャージ'],
    'evening-calm': ['夕方のクールダウン', '10分間の心身リセット'],
    'focus-boost': ['集中力ブースト', '5分間のフォーカス瞑想'],
  }
  const [title, subtitle] = titles[id] || [id, '']
  return { id, title, subtitle, duration: meta.duration, isPremium: meta.isPremium, steps }
})

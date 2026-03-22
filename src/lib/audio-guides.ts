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

export const FREE_PROGRAMS: MeditationProgram[] = [
  {
    id: 'beginner-day1',
    title: 'はじめての歩禅',
    subtitle: 'Day 1 - 5分間の基本体験',
    duration: 5,
    isPremium: false,
    steps: [
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
    ],
  },
  {
    id: 'timer-5',
    title: 'サイレント歩禅',
    subtitle: '5分間のタイマーモード',
    duration: 5,
    isPremium: false,
    steps: [
      { time: 0, text: '歩禅を始めます\nご自身のペースで歩いてください', speech: '歩禅を始めます。ご自身のペースで歩いてください', fileKey: 'silent_start' },
      { time: 150, text: '半分が過ぎました', speech: '半分が過ぎました', fileKey: 'silent_half' },
      { time: 290, text: 'まもなく終了です', speech: 'まもなく終了です', fileKey: 'silent_end' },
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
    steps: [
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
    ],
  },
  {
    id: 'morning-energy',
    title: '朝のエナジー',
    subtitle: '7分間の活力チャージ',
    duration: 7,
    isPremium: true,
    steps: [
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
    ],
  },
  {
    id: 'evening-calm',
    title: '夕方のクールダウン',
    subtitle: '10分間の心身リセット',
    duration: 10,
    isPremium: true,
    steps: [
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
    ],
  },
  {
    id: 'focus-boost',
    title: '集中力ブースト',
    subtitle: '5分間のフォーカス瞑想',
    duration: 5,
    isPremium: true,
    steps: [
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
    ],
  },
]

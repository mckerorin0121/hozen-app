"""
歩禅 HoZen - OpenAI TTS で全音声ガイドを生成
使い方:
  1. pip install openai
  2. export OPENAI_API_KEY="sk-..."
  3. python scripts/generate-voice-openai.py

費用目安: 全ガイド音声（4声×全プログラム）で約 ¥300〜500（1回きり）
"""
import os
import sys
from pathlib import Path

try:
    from openai import OpenAI
except ImportError:
    print("❌ openai パッケージが必要です")
    print("   pip install openai")
    sys.exit(1)

if not os.environ.get("OPENAI_API_KEY"):
    print("❌ OpenAI API キーが設定されていません")
    print("   export OPENAI_API_KEY='sk-...'")
    sys.exit(1)

client = OpenAI()

BASE_DIR = Path("public/audio/guide")
MODEL = "tts-1-hd"

# ─── 音声設定（4パターン）───
VOICE_CONFIGS = [
    {"dir": "female",    "voice": "nova",  "label": "JA女性"},
    {"dir": "male",      "voice": "onyx",  "label": "JA男性"},
    {"dir": "en_female", "voice": "nova",  "label": "EN女性"},
    {"dir": "en_male",   "voice": "onyx",  "label": "EN男性"},
]

# ─── 日本語ナレーション ───
JA_TEXTS = [
    # Beginner (day1_*)
    ("day1_01", "まっすぐ立ってください。目は半眼、視線は1.5メートルほど先の地面に"),
    ("day1_02", "両足の裏が地面に触れている感覚に、意識を向けてください"),
    ("day1_03", "心の中で唱えます。立っている、立っている、立っている"),
    ("day1_04", "次に、これから歩くことを確認します。歩こうとしている、歩こうとしている、歩こうとしている"),
    ("day1_05", "では、ゆっくり歩き始めてください。普段の半分以下のスピードで"),
    ("day1_06", "足を上げるとき、上げる。前に運ぶとき、運ぶ。地面に下ろすとき、下ろす"),
    ("day1_07", "上げる、運ぶ、下ろす。上げる、運ぶ、下ろす。心の中で唱え続けてください"),
    ("day1_08", "足の裏の動きだけに集中します。それ以外のことは気にしなくて大丈夫です"),
    ("day1_09", "考えが浮かんだら、考えと心の中で気づいて、また足に戻ります"),
    ("day1_10", "上げる、運ぶ、下ろす。そのまま続けてください"),
    ("day1_11", "何度気が逸れても構いません。気づいたら足に戻る。この繰り返しが瞑想です"),
    ("day1_12", "上げる、運ぶ、下ろす。あと1分です"),
    ("day1_13", "止まろうとしている、止まろうとしている、止まろうとしている"),
    ("day1_14", "ゆっくりと歩みを止めてください"),
    ("day1_15", "立っている、立っている、立っている。両足の裏の感覚を感じてください"),
    ("day1_16", "お疲れさまでした"),
    # Timer (silent_*)
    ("silent_start", "歩禅を始めます。ご自身のペースでノーティングを続けてください"),
    ("silent_half", "半分が過ぎました"),
    ("silent_end", "まもなく終了です"),
    # Stress (stress_*)
    ("stress_01", "まっすぐ立ってください。視線は1.5メートルほど先の地面に"),
    ("stress_02", "立っている、立っている、立っている。両足の裏の感覚に気づいてください"),
    ("stress_03", "歩こうとしている、歩こうとしている、歩こうとしている"),
    ("stress_04", "ゆっくり歩き始めてください。普段よりずっとゆっくりと"),
    ("stress_05", "上げる、運ぶ、下ろす。心の中で唱えながら歩きます"),
    ("stress_06", "上げる、運ぶ、下ろす。足の裏の動きだけに集中してください"),
    ("stress_07", "心配事や不安が浮かんでも大丈夫です。考えと気づいて、足に戻るだけ"),
    ("stress_08", "上げる、運ぶ、下ろす。気づいて、足に戻る。この繰り返しです"),
    ("stress_09", "体の感覚が浮かんだら、感覚。音が気になったら、聞こえた。そう気づいて、また足に戻ります"),
    ("stress_10", "上げる、運ぶ、下ろす。そのまま続けてください"),
    ("stress_11", "少しスピードを落としてみましょう。より丁寧に一歩一歩を観察します"),
    ("stress_12", "上げる、運ぶ、下ろす。足の裏の動きだけが今の対象です"),
    ("stress_13", "何度気が逸れても問題ありません。気づくこと自体が瞑想の力です"),
    ("stress_14", "上げる、運ぶ、下ろす。そのまま続けてください"),
    ("stress_15", "足の裏の動きに戻ってください。上げる、運ぶ、下ろす"),
    ("stress_16", "そのまま。上げる、運ぶ、下ろす"),
    ("stress_17", "あと1分です"),
    ("stress_18", "止まろうとしている、止まろうとしている、止まろうとしている"),
    ("stress_19", "ゆっくりと歩みを止めてください"),
    ("stress_20", "立っている、立っている、立っている"),
    ("stress_21", "お疲れさまでした"),
    # Morning (morning_*)
    ("morning_01", "まっすぐ立ってください。視線は1.5メートルほど先の地面に"),
    ("morning_02", "立っている、立っている、立っている。足の裏が地面に触れている感覚を確認します"),
    ("morning_03", "歩こうとしている、歩こうとしている、歩こうとしている"),
    ("morning_04", "ゆっくり歩き始めてください"),
    ("morning_05", "上げる、運ぶ、下ろす。心の中で唱えながら歩きます"),
    ("morning_06", "上げる、運ぶ、下ろす。足の裏の動きだけに意識を向けます"),
    ("morning_07", "考えが浮かんだら、考えと気づいて、足の裏に戻ります"),
    ("morning_08", "上げる、運ぶ、下ろす。そのまま続けてください"),
    ("morning_09", "足を上げる前の微かな意図にも気づいてみてください。意図、上げる、運ぶ、下ろす"),
    ("morning_10", "意図、上げる、運ぶ、下ろす。そのまま続けてください"),
    ("morning_11", "気が逸れたら、気づいて足に戻る。この繰り返しです"),
    ("morning_12", "上げる、運ぶ、下ろす。あと1分半です"),
    ("morning_13", "あと1分です"),
    ("morning_14", "止まろうとしている、止まろうとしている、止まろうとしている"),
    ("morning_15", "ゆっくりと歩みを止めてください"),
    ("morning_16", "立っている、立っている、立っている"),
    ("morning_17", "お疲れさまでした"),
    # Evening (evening_*)
    ("evening_01", "まっすぐ立ってください。視線は1.5メートルほど先の地面に"),
    ("evening_02", "立っている、立っている、立っている。足の裏が地面に触れている感覚"),
    ("evening_03", "しばらくこのまま。立っている、立っている、立っている"),
    ("evening_04", "歩こうとしている、歩こうとしている、歩こうとしている"),
    ("evening_05", "とてもゆっくり歩き始めてください。普段の3分の1くらいのスピードで"),
    ("evening_06", "上げる、運ぶ、下ろす。心の中で唱えながら歩きます"),
    ("evening_07", "上げる、運ぶ、下ろす。足の裏の動きだけに集中します"),
    ("evening_08", "考えが浮かんだら、考え。そう気づいて、足に戻ります"),
    ("evening_09", "上げる、運ぶ、下ろす。そのまま続けてください"),
    ("evening_10", "さらにスピードを落としてみましょう。より細かく一歩を観察します"),
    ("evening_11", "足を上げる前の意図にも気づいてみます。意図、上げる、運ぶ、下ろす"),
    ("evening_12", "意図、上げる、運ぶ、下ろす。そのまま続けてください"),
    ("evening_13", "気が逸れても大丈夫です。気づいたら足に戻るだけ"),
    ("evening_14", "上げる、運ぶ、下ろす。そのまま続けてください"),
    ("evening_15", "足の裏の動きに戻ってください。上げる、運ぶ、下ろす"),
    ("evening_16", "そのまま。上げる、運ぶ、下ろす"),
    ("evening_17", "あと1分です"),
    ("evening_18", "止まろうとしている、止まろうとしている、止まろうとしている"),
    ("evening_19", "ゆっくりと歩みを止めてください"),
    ("evening_20", "立っている、立っている、立っている"),
    ("evening_21", "お疲れさまでした"),
    # Focus (focus_*)
    ("focus_01", "まっすぐ立ってください。視線は1.5メートルほど先の地面に"),
    ("focus_02", "立っている、立っている、立っている"),
    ("focus_03", "歩こうとしている、歩こうとしている、歩こうとしている"),
    ("focus_04", "ゆっくり歩き始めてください"),
    ("focus_05", "上げる、運ぶ、下ろす。一歩ずつ明確にノーティングします"),
    ("focus_06", "上げる、運ぶ、下ろす。足の裏の動きだけに集中してください"),
    ("focus_07", "気が逸れたら、考えと気づいて、すぐ足に戻ります"),
    ("focus_08", "上げる、運ぶ、下ろす。そのまま続けてください"),
    ("focus_09", "何度逸れても構いません。気づいて戻る、その繰り返しです"),
    ("focus_10", "上げる、運ぶ、下ろす。あと1分です"),
    ("focus_11", "止まろうとしている、止まろうとしている、止まろうとしている"),
    ("focus_12", "ゆっくりと歩みを止めてください"),
    ("focus_13", "立っている、立っている、立っている"),
    ("focus_14", "お疲れさまでした"),
    # Course Day 1 (cd1_*)
    ("cd1_01", "まっすぐ立ってください。視線は1.5メートルほど先の地面に"),
    ("cd1_02", "立っている、立っている、立っている。足の裏が地面に触れている感覚を確認します"),
    ("cd1_03", "歩こうとしている、歩こうとしている、歩こうとしている"),
    ("cd1_04", "ゆっくり歩き始めてください"),
    ("cd1_05", "右足が動くとき、右。左足が動くとき、左。心の中で唱えてください"),
    ("cd1_06", "右、左、右、左。ただそれだけに意識を向けて"),
    ("cd1_07", "考えが浮かんでも大丈夫。考えと気づいたら、右、左に戻るだけ"),
    ("cd1_08", "右、左、右、左。そのまま続けてください"),
    ("cd1_09", "右、左。あと1分半です"),
    ("cd1_10", "あと1分です"),
    ("cd1_11", "止まろうとしている、止まろうとしている、止まろうとしている"),
    ("cd1_12", "ゆっくりと歩みを止めてください"),
    ("cd1_13", "立っている、立っている、立っている"),
    ("cd1_14", "お疲れさまでした"),
    # Course Day 2 (cd2_*)
    ("cd2_01", "まっすぐ立ってください。視線は1.5メートルほど先の地面に"),
    ("cd2_02", "立っている、立っている、立っている"),
    ("cd2_03", "歩こうとしている、歩こうとしている、歩こうとしている"),
    ("cd2_04", "ゆっくり歩き始めてください。昨日より少しだけゆっくりと"),
    ("cd2_05", "今日は、上げると下ろす。この二つの動きを観察します"),
    ("cd2_06", "足が地面から離れる瞬間、上げる。地面に触れる瞬間、下ろす"),
    ("cd2_07", "上げる、下ろす、上げる、下ろす。心の中で唱えながら"),
    ("cd2_08", "考えが浮かんだら、考えと気づいて。足に戻るだけ"),
    ("cd2_09", "上げる、下ろす。そのまま続けてください"),
    ("cd2_10", "上げる、下ろす。あと1分半です"),
    ("cd2_11", "あと1分です"),
    ("cd2_12", "止まろうとしている、止まろうとしている、止まろうとしている"),
    ("cd2_13", "ゆっくりと歩みを止めてください"),
    ("cd2_14", "立っている、立っている、立っている"),
    ("cd2_15", "お疲れさまでした。明日はさらに細かく観察します"),
    # Course Day 4 (cd4_*)
    ("cd4_01", "まっすぐ立ってください。視線は1.5メートルほど先の地面に"),
    ("cd4_02", "立っている、立っている、立っている"),
    ("cd4_03", "歩こうとしている、歩こうとしている、歩こうとしている"),
    ("cd4_04", "今日はさらにゆっくり歩いてください。普段の3分の1以下のスピードで"),
    ("cd4_05", "上げる、運ぶ、下ろすに加えて、今日は意図を観察します"),
    ("cd4_06", "足を上げる前に、動かそうという微かな意図が生まれます。そこに気づいてください"),
    ("cd4_07", "意図、上げる、運ぶ、下ろす。この四つを心の中で唱えます"),
    ("cd4_08", "意図が先、動きが後。この順番に気づくことが大切です"),
    ("cd4_09", "考えが浮かんだら、考えと気づいて。意図の観察に戻ります"),
    ("cd4_10", "意図、上げる、運ぶ、下ろす。そのまま続けてください"),
    ("cd4_11", "意図の瞬間はとても微かです。気づけなくても焦らないでください"),
    ("cd4_12", "意図、上げる、運ぶ、下ろす。そのまま続けてください"),
    ("cd4_13", "あと1分です"),
    ("cd4_14", "止まろうとしている、止まろうとしている、止まろうとしている"),
    ("cd4_15", "ゆっくりと歩みを止めてください"),
    ("cd4_16", "立っている、立っている、立っている"),
    ("cd4_17", "お疲れさまでした"),
    # Course Day 5 (cd5_*)
    ("cd5_01", "まっすぐ立ってください。視線は1.5メートルほど先の地面に"),
    ("cd5_02", "立っている、立っている、立っている"),
    ("cd5_03", "歩こうとしている、歩こうとしている、歩こうとしている"),
    ("cd5_04", "今日は最も細かい観察です。とてもゆっくり歩いてください"),
    ("cd5_05", "まず、上げる、運ぶ、下ろすで始めましょう"),
    ("cd5_06", "上げる、運ぶ、下ろす。そのまま続けてください"),
    ("cd5_07", "では、さらに細かく分けていきます。足が地面に触れる瞬間、触れる。体重がかかる瞬間、圧"),
    ("cd5_08", "足が離れる、離れる。空中を動く、動く。地面に下ろす、下ろす"),
    ("cd5_09", "触れる、圧、離れる、動く、下ろす。心の中で唱えながら歩きます"),
    ("cd5_10", "考えが浮かんだら、考えと気づいて。足の観察に戻ります"),
    ("cd5_11", "触れる、圧、離れる、動く、下ろす。そのまま続けてください"),
    ("cd5_12", "難しければ、上げる、運ぶ、下ろすに戻しても構いません"),
    ("cd5_13", "そのまま続けてください。あと1分です"),
    ("cd5_14", "止まろうとしている、止まろうとしている、止まろうとしている"),
    ("cd5_15", "ゆっくりと歩みを止めてください"),
    ("cd5_16", "立っている、立っている、立っている"),
    ("cd5_17", "お疲れさまでした"),
    # Course Day 6 (cd6_*)
    ("cd6_01", "まっすぐ立ってください。立っている、立っている、立っている"),
    ("cd6_02", "歩こうとしている、歩こうとしている、歩こうとしている"),
    ("cd6_03", "今日はガイドを最小限にします。これまで学んだノーティングを、ご自身のペースで続けてください"),
    ("cd6_04", "足の裏の動きに意識を戻してください"),
    ("cd6_05", "考えに気づいたら、足に戻るだけ"),
    ("cd6_06", "そのまま続けてください"),
    ("cd6_07", "あと1分です"),
    ("cd6_08", "止まろうとしている、止まろうとしている、止まろうとしている"),
    ("cd6_09", "ゆっくりと歩みを止めてください"),
    ("cd6_10", "立っている、立っている、立っている"),
    ("cd6_11", "お疲れさまでした"),
]

# ─── 英語ナレーション ───
EN_TEXTS = [
    # Beginner (day1_*)
    ("day1_01", "Stand upright. Cast your gaze about one and a half meters ahead on the ground."),
    ("day1_02", "Bring your attention to the soles of both feet touching the ground."),
    ("day1_03", "Silently note in your mind. Standing, standing, standing."),
    ("day1_04", "Now, acknowledge your intention to walk. Intending to walk, intending to walk, intending to walk."),
    ("day1_05", "Slowly begin walking. Much slower than usual. Half your normal speed or less."),
    ("day1_06", "As you lift your foot, note lifting. As it moves forward, moving. As it touches down, placing."),
    ("day1_07", "Lifting, moving, placing. Lifting, moving, placing. Keep noting silently in your mind."),
    ("day1_08", "Focus only on the movement of the soles of your feet. Nothing else matters right now."),
    ("day1_09", "When thoughts arise, silently note thinking. Then return your attention to your feet."),
    ("day1_10", "Lifting, moving, placing. Continue."),
    ("day1_11", "No matter how many times your mind wanders, just notice, and return to your feet. This repetition is the practice."),
    ("day1_12", "Lifting, moving, placing. One minute left."),
    ("day1_13", "Intending to stop, intending to stop, intending to stop."),
    ("day1_14", "Slowly come to a stop."),
    ("day1_15", "Standing, standing, standing. Feel both feet on the ground."),
    ("day1_16", "Well done."),
    # Timer (silent_*)
    ("silent_start", "Your walking meditation begins. Continue noting at your own pace."),
    ("silent_half", "You're halfway through."),
    ("silent_end", "Almost finished."),
    # Stress (stress_*)
    ("stress_01", "Stand upright. Cast your gaze about one and a half meters ahead on the ground."),
    ("stress_02", "Standing, standing, standing. Notice the soles of both feet touching the ground."),
    ("stress_03", "Intending to walk, intending to walk, intending to walk."),
    ("stress_04", "Slowly begin walking. Much slower than usual."),
    ("stress_05", "Lifting, moving, placing. Note each movement silently in your mind."),
    ("stress_06", "Lifting, moving, placing. Focus only on the movement of your feet."),
    ("stress_07", "Worries or anxious thoughts may arise. Simply note thinking, and return to your feet."),
    ("stress_08", "Lifting, moving, placing. Notice, and return to the feet. This is the practice."),
    ("stress_09", "If a body sensation arises, note sensation. If a sound, note hearing. Then return to your feet."),
    ("stress_10", "Lifting, moving, placing. Continue."),
    ("stress_11", "Slow your pace a little more. Observe each step more carefully."),
    ("stress_12", "Lifting, moving, placing. The movement of your feet is your only object right now."),
    ("stress_13", "No matter how many times your mind wanders, noticing itself is the practice."),
    ("stress_14", "Lifting, moving, placing. Continue."),
    ("stress_15", "Return to the movement of your feet. Lifting, moving, placing."),
    ("stress_16", "Continue. Lifting, moving, placing."),
    ("stress_17", "One minute left."),
    ("stress_18", "Intending to stop, intending to stop, intending to stop."),
    ("stress_19", "Slowly come to a stop."),
    ("stress_20", "Standing, standing, standing."),
    ("stress_21", "Well done."),
    # Morning (morning_*)
    ("morning_01", "Stand upright. Cast your gaze about one and a half meters ahead on the ground."),
    ("morning_02", "Standing, standing, standing. Feel the soles of both feet touching the ground."),
    ("morning_03", "Intending to walk, intending to walk, intending to walk."),
    ("morning_04", "Slowly begin walking."),
    ("morning_05", "Lifting, moving, placing. Note each movement silently in your mind."),
    ("morning_06", "Lifting, moving, placing. Focus only on the movement of the soles of your feet."),
    ("morning_07", "When thoughts arise, note thinking, and return to your feet."),
    ("morning_08", "Lifting, moving, placing. Continue."),
    ("morning_09", "Try noticing the subtle intention before lifting your foot. Intending, lifting, moving, placing."),
    ("morning_10", "Intending, lifting, moving, placing. Continue."),
    ("morning_11", "When your mind wanders, notice, and return to your feet."),
    ("morning_12", "Lifting, moving, placing. Ninety seconds left."),
    ("morning_13", "One minute left."),
    ("morning_14", "Intending to stop, intending to stop, intending to stop."),
    ("morning_15", "Slowly come to a stop."),
    ("morning_16", "Standing, standing, standing."),
    ("morning_17", "Well done."),
    # Evening (evening_*)
    ("evening_01", "Stand upright. Cast your gaze about one and a half meters ahead on the ground."),
    ("evening_02", "Standing, standing, standing. Feel the soles of both feet on the ground."),
    ("evening_03", "Stay with this for a moment. Standing, standing, standing."),
    ("evening_04", "Intending to walk, intending to walk, intending to walk."),
    ("evening_05", "Begin walking very slowly. About one-third of your normal speed."),
    ("evening_06", "Lifting, moving, placing. Note each movement silently in your mind."),
    ("evening_07", "Lifting, moving, placing. Focus only on the movement of your feet."),
    ("evening_08", "When thoughts arise, note thinking, and return to your feet."),
    ("evening_09", "Lifting, moving, placing. Continue."),
    ("evening_10", "Slow your pace even further. Observe each step more closely."),
    ("evening_11", "Try noticing the intention before each step. Intending, lifting, moving, placing."),
    ("evening_12", "Intending, lifting, moving, placing. Continue."),
    ("evening_13", "When your mind wanders, simply notice and return to your feet."),
    ("evening_14", "Lifting, moving, placing. Continue."),
    ("evening_15", "Return to the movement of your feet. Lifting, moving, placing."),
    ("evening_16", "Continue. Lifting, moving, placing."),
    ("evening_17", "One minute left."),
    ("evening_18", "Intending to stop, intending to stop, intending to stop."),
    ("evening_19", "Slowly come to a stop."),
    ("evening_20", "Standing, standing, standing."),
    ("evening_21", "Well done."),
    # Focus (focus_*)
    ("focus_01", "Stand upright. Cast your gaze about one and a half meters ahead on the ground."),
    ("focus_02", "Standing, standing, standing."),
    ("focus_03", "Intending to walk, intending to walk, intending to walk."),
    ("focus_04", "Slowly begin walking."),
    ("focus_05", "Lifting, moving, placing. Note each movement clearly."),
    ("focus_06", "Lifting, moving, placing. Focus only on the movement of your feet."),
    ("focus_07", "When your mind wanders, note thinking, and return immediately to your feet."),
    ("focus_08", "Lifting, moving, placing. Continue."),
    ("focus_09", "No matter how many times you drift, just notice and return. That is the practice."),
    ("focus_10", "Lifting, moving, placing. One minute left."),
    ("focus_11", "Intending to stop, intending to stop, intending to stop."),
    ("focus_12", "Slowly come to a stop."),
    ("focus_13", "Standing, standing, standing."),
    ("focus_14", "Well done."),
    # Course Day 1 (cd1_*)
    ("cd1_01", "Stand upright. Cast your gaze about one and a half meters ahead on the ground."),
    ("cd1_02", "Standing, standing, standing. Feel the soles of both feet touching the ground."),
    ("cd1_03", "Intending to walk, intending to walk, intending to walk."),
    ("cd1_04", "Slowly begin walking."),
    ("cd1_05", "When your right foot moves, silently note right. When your left foot moves, left."),
    ("cd1_06", "Right, left, right, left. Just this. Nothing else."),
    ("cd1_07", "When thoughts arise, note thinking, and return to right and left."),
    ("cd1_08", "Right, left, right, left. Continue."),
    ("cd1_09", "Right, left. Ninety seconds left."),
    ("cd1_10", "One minute left."),
    ("cd1_11", "Intending to stop, intending to stop, intending to stop."),
    ("cd1_12", "Slowly come to a stop."),
    ("cd1_13", "Standing, standing, standing."),
    ("cd1_14", "Well done."),
    # Course Day 2 (cd2_*)
    ("cd2_01", "Stand upright. Cast your gaze about one and a half meters ahead on the ground."),
    ("cd2_02", "Standing, standing, standing."),
    ("cd2_03", "Intending to walk, intending to walk, intending to walk."),
    ("cd2_04", "Begin walking slowly. A bit slower than yesterday."),
    ("cd2_05", "Today we observe two movements. Lifting, and placing."),
    ("cd2_06", "As your foot leaves the ground, note lifting. As it touches down, placing."),
    ("cd2_07", "Lifting, placing, lifting, placing. Note each one silently."),
    ("cd2_08", "When thoughts arise, note thinking, and return to your feet."),
    ("cd2_09", "Lifting, placing. Continue."),
    ("cd2_10", "Lifting, placing. Ninety seconds left."),
    ("cd2_11", "One minute left."),
    ("cd2_12", "Intending to stop, intending to stop, intending to stop."),
    ("cd2_13", "Slowly come to a stop."),
    ("cd2_14", "Standing, standing, standing."),
    ("cd2_15", "Well done. Tomorrow we observe even more closely."),
    # Course Day 4 (cd4_*)
    ("cd4_01", "Stand upright. Cast your gaze about one and a half meters ahead on the ground."),
    ("cd4_02", "Standing, standing, standing."),
    ("cd4_03", "Intending to walk, intending to walk, intending to walk."),
    ("cd4_04", "Today, walk even more slowly. About one-third of your normal speed."),
    ("cd4_05", "We add intending before lifting, moving, and placing."),
    ("cd4_06", "Before lifting your foot, a subtle intention to move arises. Notice it."),
    ("cd4_07", "Intending, lifting, moving, placing. Note these four silently in your mind."),
    ("cd4_08", "Intention comes first, then movement. Noticing this order is the key."),
    ("cd4_09", "When thoughts arise, note thinking, and return to observing intention."),
    ("cd4_10", "Intending, lifting, moving, placing. Continue."),
    ("cd4_11", "The moment of intention is very subtle. Don't worry if you miss it."),
    ("cd4_12", "Intending, lifting, moving, placing. Continue."),
    ("cd4_13", "One minute left."),
    ("cd4_14", "Intending to stop, intending to stop, intending to stop."),
    ("cd4_15", "Slowly come to a stop."),
    ("cd4_16", "Standing, standing, standing."),
    ("cd4_17", "Well done."),
    # Course Day 5 (cd5_*)
    ("cd5_01", "Stand upright. Cast your gaze about one and a half meters ahead on the ground."),
    ("cd5_02", "Standing, standing, standing."),
    ("cd5_03", "Intending to walk, intending to walk, intending to walk."),
    ("cd5_04", "Today is the finest level of observation. Walk very, very slowly."),
    ("cd5_05", "Start with lifting, moving, placing to settle in."),
    ("cd5_06", "Lifting, moving, placing. Continue."),
    ("cd5_07", "Now break it down further. When your foot touches the ground, note touching. As weight bears down, pressure."),
    ("cd5_08", "Foot leaves the ground, lifting. Moves through the air, moving. Comes down, placing."),
    ("cd5_09", "Touching, pressure, lifting, moving, placing. Note each one silently."),
    ("cd5_10", "When thoughts arise, note thinking, and return to the observation."),
    ("cd5_11", "Touching, pressure, lifting, moving, placing. Continue."),
    ("cd5_12", "If it feels too detailed, you can return to lifting, moving, placing."),
    ("cd5_13", "Continue. One minute left."),
    ("cd5_14", "Intending to stop, intending to stop, intending to stop."),
    ("cd5_15", "Slowly come to a stop."),
    ("cd5_16", "Standing, standing, standing."),
    ("cd5_17", "Well done."),
    # Course Day 6 (cd6_*)
    ("cd6_01", "Stand upright. Standing, standing, standing."),
    ("cd6_02", "Intending to walk, intending to walk, intending to walk."),
    ("cd6_03", "Today, minimal guidance. Continue noting at your own pace, using whatever method you prefer."),
    ("cd6_04", "Return your attention to the movement of your feet."),
    ("cd6_05", "When you notice thoughts, return to your feet."),
    ("cd6_06", "Continue."),
    ("cd6_07", "One minute left."),
    ("cd6_08", "Intending to stop, intending to stop, intending to stop."),
    ("cd6_09", "Slowly come to a stop."),
    ("cd6_10", "Standing, standing, standing."),
    ("cd6_11", "Well done."),
]

def generate_voice(voice_config, texts, lang_label):
    """指定の音声設定でテキスト群を生成"""
    out_dir = BASE_DIR / voice_config["dir"]
    out_dir.mkdir(parents=True, exist_ok=True)
    voice = voice_config["voice"]
    label = voice_config["label"]

    total_chars = sum(len(t) for _, t in texts)
    est_cost = total_chars / 1000 * 0.03
    print(f"\n🎙️ {label} ({voice}) — {len(texts)}ファイル, {total_chars}文字, 推定${est_cost:.3f}")

    for i, (filekey, text) in enumerate(texts):
        filepath = out_dir / f"{filekey}.mp3"
        short = text[:30].replace("\n", " ")
        print(f"  [{i+1}/{len(texts)}] {short}...", end=" ", flush=True)

        response = client.audio.speech.create(
            model=MODEL,
            voice=voice,
            input=text,
            speed=0.9,
            response_format="mp3",
        )
        response.stream_to_file(str(filepath))
        size_kb = filepath.stat().st_size / 1024
        print(f"✅ ({size_kb:.0f}KB)")

    print(f"  → {out_dir}/ に{len(texts)}ファイル生成完了")


def main():
    print("=" * 60)
    print("歩禅 HoZen — OpenAI TTS 全音声ガイド生成")
    print(f"モデル: {MODEL}")
    print("=" * 60)

    total_all = (len(JA_TEXTS) + len(EN_TEXTS)) * 2  # female + male
    total_chars = (sum(len(t) for _, t in JA_TEXTS) + sum(len(t) for _, t in EN_TEXTS)) * 2
    est_total = total_chars / 1000 * 0.03
    print(f"\n合計: {total_all}ファイル, 推定費用: ${est_total:.2f} (約 ¥{int(est_total * 150)})")

    for vc in VOICE_CONFIGS:
        if vc["dir"].startswith("en"):
            generate_voice(vc, EN_TEXTS, "EN")
        else:
            generate_voice(vc, JA_TEXTS, "JA")

    print("\n" + "=" * 60)
    print(f"🎉 全{total_all}ファイルの生成が完了しました！")
    print("=" * 60)
    print("\n次のステップ:")
    print("  git add public/audio/guide/")
    print("  git commit -m '新ナレーション対応の音声ガイドを生成'")
    print("  git push")


if __name__ == "__main__":
    main()

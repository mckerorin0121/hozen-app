"""
歩禅 HoZen - OpenAI TTS で高品質音声ガイドを生成
使い方:
  1. pip install openai
  2. export OPENAI_API_KEY="sk-..."
  3. python scripts/generate-voice-openai.py

費用: 全ガイド音声で約 ¥50（1回きり）
"""
import os
from pathlib import Path

try:
    from openai import OpenAI
except ImportError:
    print("❌ openai パッケージが必要です")
    print("   pip install openai")
    exit(1)

if not os.environ.get("OPENAI_API_KEY"):
    print("❌ OpenAI API キーが設定されていません")
    print("   export OPENAI_API_KEY='sk-...'")
    print("")
    print("APIキーの取得方法:")
    print("  1. https://platform.openai.com/api-keys を開く")
    print("  2. 「Create new secret key」をクリック")
    print("  3. キーをコピー")
    exit(1)

client = OpenAI()

OUTPUT_DIR = Path("public/audio/guide")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# 音声設定
VOICE = "nova"      # nova: 温かい女性音声。他: alloy, echo, fable, onyx, shimmer
MODEL = "tts-1-hd"  # hd = 高品質

# Day 1 ガイド音声
GUIDE_TEXTS = [
    ("day1_01", "目を軽く閉じて、3回、深呼吸しましょう"),
    ("day1_02", "ゆっくり、吐いて"),
    ("day1_03", "もう一度、吸って"),
    ("day1_04", "吐いて"),
    ("day1_05", "では、ゆっくり歩き始めてください"),
    ("day1_06", "右足が地面に触れる感覚に、意識を向けましょう"),
    ("day1_07", "次は左足。足の裏全体で、地面を感じてください"),
    ("day1_08", "そのまま歩き続けてください。一歩一歩に集中して"),
    ("day1_09", "周りの音に、耳を傾けてみましょう。風の音、鳥の声"),
    ("day1_10", "呼吸のリズムに合わせて、歩いてみましょう"),
    ("day1_11", "吸って、2歩。吐いて、3歩"),
    ("day1_12", "素晴らしいです。そのまま歩き続けてください"),
    ("day1_13", "頭に浮かぶ考えは、雲のように流しましょう"),
    ("day1_14", "あと1分です。最後の一歩一歩を味わって"),
    ("day1_15", "ゆっくりと、歩みを止めてください"),
    ("day1_16", "深く、息を吸って"),
    ("day1_17", "ゆっくり、吐いて"),
    ("day1_18", "お疲れさまでした。素晴らしい歩禅でした"),
    # サイレントモード
    ("silent_start", "歩禅を始めます。ご自身のペースで歩いてください"),
    ("silent_half", "半分が過ぎました"),
    ("silent_end", "まもなく終了です"),
    ("complete", "お疲れさまでした。素晴らしい歩禅でした"),
]

print(f"🎙️ OpenAI TTS で音声ガイドを生成します")
print(f"   音声: {VOICE} / モデル: {MODEL}")
print(f"   出力先: {OUTPUT_DIR}/")
print()

total_chars = sum(len(t) for _, t in GUIDE_TEXTS)
est_cost = total_chars / 1000 * 0.03  # tts-1-hd: $0.030 per 1K chars
print(f"   合計文字数: {total_chars}文字")
print(f"   推定費用: ${est_cost:.3f} (約 ¥{int(est_cost * 150)})")
print()

for i, (filename, text) in enumerate(GUIDE_TEXTS):
    filepath = OUTPUT_DIR / f"{filename}.mp3"
    print(f"  [{i+1}/{len(GUIDE_TEXTS)}] {text[:25]}...", end=" ", flush=True)

    response = client.audio.speech.create(
        model=MODEL,
        voice=VOICE,
        input=text,
        speed=0.9,  # 少しゆっくり（瞑想向け）
        response_format="mp3",
    )

    response.stream_to_file(str(filepath))
    size_kb = filepath.stat().st_size / 1024
    print(f"✅ ({size_kb:.0f}KB)")

print()
print(f"🎉 全{len(GUIDE_TEXTS)}ファイルの生成が完了しました！")
print()
print("次のステップ:")
print("  git add . && git commit -m '高品質音声ガイドを追加' && git push")

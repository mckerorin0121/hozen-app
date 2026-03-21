#!/bin/bash
# 歩禅 HoZen - 音声ガイド生成スクリプト
# macOS の高品質 Neural TTS で音声ファイルを生成します
# 使い方: cd hozen-app && bash scripts/generate-audio.sh

set -e

AUDIO_DIR="public/audio/guide"
mkdir -p "$AUDIO_DIR"

# macOS の日本語音声を確認（Neural 音声を優先）
VOICE="Kyoko"
if say -v '?' | grep -q "O-Ren"; then
  VOICE="O-Ren"
  echo "✅ Neural 音声 O-Ren を使用します（最高品質）"
elif say -v '?' | grep -q "Kyoko (Enhanced)"; then
  VOICE="Kyoko (Enhanced)"
  echo "✅ Enhanced 音声 Kyoko を使用します"
else
  echo "⚠️ 標準 Kyoko を使用。より良い音質には:"
  echo "   システム設定 → アクセシビリティ → 読み上げ → 日本語 → O-Ren をダウンロード"
fi

echo ""
echo "🎙️ 歩禅 音声ガイドを生成中..."
echo ""

# Day1 ガイド音声
declare -a TEXTS=(
  "01|目を軽く閉じて、3回、深呼吸しましょう"
  "02|ゆっくり、吐いて"
  "03|もう一度、吸って"
  "04|吐いて"
  "05|では、ゆっくり歩き始めてください"
  "06|右足が地面に触れる感覚に、意識を向けましょう"
  "07|次は左足。足の裏全体で、地面を感じてください"
  "08|そのまま歩き続けてください。一歩一歩に集中して"
  "09|周りの音に、耳を傾けてみましょう。風の音、鳥の声"
  "10|呼吸のリズムに合わせて、歩いてみましょう"
  "11|吸って、2歩。吐いて、3歩"
  "12|素晴らしいです。そのまま歩き続けてください"
  "13|頭に浮かぶ考えは、雲のように流しましょう"
  "14|あと1分です。最後の一歩一歩を味わって"
  "15|ゆっくりと、歩みを止めてください"
  "16|深く、息を吸って"
  "17|ゆっくり、吐いて"
  "18|お疲れさまでした。素晴らしい歩禅でした"
)

for item in "${TEXTS[@]}"; do
  IFS='|' read -r num text <<< "$item"
  FILE="$AUDIO_DIR/day1_${num}.m4a"
  echo "  生成中: $num - ${text:0:20}..."
  say -v "$VOICE" -r 140 -o "$FILE" "$text"
done

# サイレントモード音声
say -v "$VOICE" -r 140 -o "$AUDIO_DIR/silent_start.m4a" "歩禅を始めます。ご自身のペースで歩いてください"
say -v "$VOICE" -r 140 -o "$AUDIO_DIR/silent_half.m4a" "半分が過ぎました"
say -v "$VOICE" -r 140 -o "$AUDIO_DIR/silent_end.m4a" "まもなく終了です"
say -v "$VOICE" -r 140 -o "$AUDIO_DIR/complete.m4a" "お疲れさまでした。素晴らしい歩禅でした"

# m4a → mp3 変換（ffmpeg があれば）
if command -v ffmpeg &> /dev/null; then
  echo ""
  echo "🔄 MP3 に変換中..."
  for f in "$AUDIO_DIR"/*.m4a; do
    mp3="${f%.m4a}.mp3"
    ffmpeg -y -i "$f" -codec:a libmp3lame -qscale:a 2 "$mp3" 2>/dev/null
    rm "$f"
  done
  echo "✅ MP3 変換完了"
else
  echo ""
  echo "⚠️ ffmpeg が見つかりません。m4a 形式で保存しました。"
  echo "   MP3 変換するには: brew install ffmpeg"
fi

echo ""
echo "🎉 音声生成完了！ $AUDIO_DIR/ に保存されました"
echo ""
echo "次のステップ:"
echo "  git add . && git commit -m '音声ガイドを追加' && git push"

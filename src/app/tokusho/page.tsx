import Link from 'next/link'

const items = [
  { label: '販売業者', value: '相宮 康人' },
  { label: '所在地', value: '〒502-0850 岐阜県岐阜市鷲山東2-12-45' },
  { label: '電話番号', value: '070-9164-2732' },
  { label: 'メールアドレス', value: 'aimiya121@gmail.com' },
  { label: 'サービス名', value: '歩禅 HoZen プレミアムプラン' },
  {
    label: '販売価格',
    value: '月額プラン：¥480（税込）/ 年額プラン：¥3,980（税込）',
  },
  {
    label: '支払方法',
    value: 'クレジットカード（Visa / Mastercard / American Express / JCB）',
  },
  { label: '支払時期', value: '申込時にお支払いが確定します。以降は自動更新となります。' },
  { label: 'サービス提供時期', value: '決済完了後、即時ご利用いただけます。' },
  {
    label: '無料トライアル',
    value: '初回申込時に7日間の無料トライアルをご利用いただけます。トライアル期間中にキャンセルされた場合、料金は発生しません。',
  },
  {
    label: 'キャンセル・解約について',
    value:
      'いつでもマイページよりキャンセル可能です。キャンセル後は次回更新日まで引き続きご利用いただけます。日割り返金は行っておりません。',
  },
  {
    label: '動作環境',
    value:
      'インターネット接続環境が必要です。対応ブラウザ：Chrome / Safari / Firefox 最新版。スマートフォン（iOS / Android）でもご利用いただけます。',
  },
]

export default function TokushoPage() {
  return (
    <div className="min-h-screen bg-hozen-cream">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-hozen-green/60 hover:text-hozen-green mb-10 text-sm"
        >
          ← ホームに戻る
        </Link>

        <h1 className="text-2xl font-bold text-hozen-green mb-2 font-jp">
          特定商取引法に基づく表記
        </h1>
        <p className="text-hozen-dark/50 text-sm mb-10">
          特定商取引法第11条に基づき、以下の通り表示いたします。
        </p>

        <div className="bg-white rounded-2xl overflow-hidden border border-hozen-green/10">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col sm:flex-row ${
                i !== items.length - 1 ? 'border-b border-hozen-green/10' : ''
              }`}
            >
              <div className="sm:w-48 flex-shrink-0 px-6 py-4 bg-hozen-green/5 font-medium text-hozen-green text-sm">
                {item.label}
              </div>
              <div className="flex-1 px-6 py-4 text-hozen-dark/80 text-sm leading-relaxed">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <p className="text-hozen-dark/40 text-xs mt-8 text-center">
          ご不明な点はメール（aimiya121@gmail.com）よりお問い合わせください。
        </p>
      </div>
    </div>
  )
}

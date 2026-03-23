'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

const ITEMS_JA = [
  { label: '販売業者', value: '相宮 康人' },
  { label: '所在地', value: '〒502-0850 岐阜県岐阜市鷲山東2-12-45' },
  { label: '電話番号', value: '070-9164-2732' },
  { label: 'メールアドレス', value: 'aimiya121@gmail.com' },
  { label: 'サービス名', value: '歩禅 HoZen プレミアムプラン' },
  { label: '販売価格', value: '月額プラン：¥480（税込）/ 年額プラン：¥3,980（税込）' },
  { label: '支払方法', value: 'クレジットカード（Visa / Mastercard / American Express / JCB）' },
  { label: '支払時期', value: '申込時にお支払いが確定します。以降は自動更新となります。' },
  { label: 'サービス提供時期', value: '決済完了後、即時ご利用いただけます。' },
  { label: '無料トライアル', value: '初回申込時に7日間の無料トライアルをご利用いただけます。トライアル期間中にキャンセルされた場合、料金は発生しません。' },
  { label: 'キャンセル・解約について', value: 'いつでもマイページよりキャンセル可能です。キャンセル後は次回更新日まで引き続きご利用いただけます。日割り返金は行っておりません。' },
  { label: '動作環境', value: 'インターネット接続環境が必要です。対応ブラウザ：Chrome / Safari / Firefox 最新版。スマートフォン（iOS / Android）でもご利用いただけます。' },
]

const ITEMS_EN = [
  { label: 'Seller', value: 'Yasuhito Aimiya' },
  { label: 'Address', value: '2-12-45 Washiyama-Higashi, Gifu-shi, Gifu 502-0850, Japan' },
  { label: 'Phone', value: '+81-70-9164-2732' },
  { label: 'Email', value: 'aimiya121@gmail.com' },
  { label: 'Service', value: 'HoZen Premium Plan' },
  { label: 'Price', value: 'Monthly: ¥480 (tax incl.) / Yearly: ¥3,980 (tax incl.)' },
  { label: 'Payment', value: 'Credit card (Visa / Mastercard / American Express / JCB)' },
  { label: 'Billing', value: 'Payment is charged at the time of subscription. Auto-renewed thereafter.' },
  { label: 'Delivery', value: 'Available immediately after payment is confirmed.' },
  { label: 'Free Trial', value: '7-day free trial available for first-time subscribers. No charges if cancelled during the trial period.' },
  { label: 'Cancellation', value: 'Cancel anytime from your account page. After cancellation, you can continue using the service until the next renewal date. No prorated refunds.' },
  { label: 'Requirements', value: 'Internet connection required. Supported browsers: Chrome / Safari / Firefox (latest). Also available on smartphones (iOS / Android).' },
]

export default function TokushoPage() {
  const { locale, t } = useI18n()
  const items = locale === 'en' ? ITEMS_EN : ITEMS_JA

  return (
    <div className="min-h-screen bg-hozen-cream">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-hozen-green/60 hover:text-hozen-green mb-10 text-sm">
          {t('back_home')}
        </Link>

        <h1 className="text-2xl font-bold text-hozen-green mb-2 font-jp">{t('tokusho_title')}</h1>
        <p className="text-hozen-dark/50 text-sm mb-10">{t('tokusho_sub')}</p>

        <div className="bg-white rounded-2xl overflow-hidden border border-hozen-green/10">
          {items.map((item, i) => (
            <div key={i} className={`flex flex-col sm:flex-row ${i !== items.length - 1 ? 'border-b border-hozen-green/10' : ''}`}>
              <div className="sm:w-48 flex-shrink-0 px-6 py-4 bg-hozen-green/5 font-medium text-hozen-green text-sm">{item.label}</div>
              <div className="flex-1 px-6 py-4 text-hozen-dark/80 text-sm leading-relaxed">{item.value}</div>
            </div>
          ))}
        </div>

        <p className="text-hozen-dark/40 text-xs mt-8 text-center">{t('tokusho_contact')}</p>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D5016" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const [loading, setLoading] = useState(false)

  const prices = {
    monthly: { amount: 480, label: '¥480/月' },
    yearly: { amount: 3980, label: '¥3,980/年', monthly: '¥332/月', save: '31%' },
  }

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: billing }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('決済ページの準備ができていません。もうしばらくお待ちください。')
      }
    } catch (err) {
      alert('エラーが発生しました。もう一度お試しください。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-hozen-cream">
      <div className="max-w-lg mx-auto px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-hozen-green/60 hover:text-hozen-green mb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>ホーム</span>
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-hozen-green mb-3 font-jp">プレミアムプラン</h1>
          <p className="text-hozen-dark/60">7日間の無料トライアル付き</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-sm inline-flex border border-hozen-green/10">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billing === 'monthly'
                  ? 'bg-hozen-green text-white'
                  : 'text-hozen-dark/60 hover:text-hozen-dark'
              }`}
            >
              月額
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billing === 'yearly'
                  ? 'bg-hozen-green text-white'
                  : 'text-hozen-dark/60 hover:text-hozen-dark'
              }`}
            >
              年額
              <span className="ml-1 text-xs text-hozen-gold font-bold">-31%</span>
            </button>
          </div>
        </div>

        {/* Price Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-hozen-green/10 mb-8">
          <div className="text-center mb-8">
            {billing === 'monthly' ? (
              <>
                <div className="text-5xl font-bold text-hozen-green">¥480</div>
                <div className="text-hozen-dark/40 mt-1">/ 月</div>
              </>
            ) : (
              <>
                <div className="text-5xl font-bold text-hozen-green">¥3,980</div>
                <div className="text-hozen-dark/40 mt-1">/ 年（月あたり ¥332）</div>
                <div className="inline-block mt-2 px-3 py-1 bg-hozen-gold/10 text-hozen-gold text-sm font-semibold rounded-full">
                  31% おトク
                </div>
              </>
            )}
          </div>

          <div className="space-y-4 mb-8">
            {[
              '全10+の瞑想プログラム',
              'ストレス解放・集中力ブースト',
              '朝・夕の専用プログラム',
              '詳細な統計・成長レポート',
              'オフライン対応',
              '新プログラム毎月追加',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckIcon />
                <span className="text-hozen-dark/70">{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full py-4 bg-hozen-gold text-hozen-dark font-bold rounded-full text-lg hover:bg-hozen-gold-light transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? '処理中...' : '7日間無料で試す'}
          </button>
          <p className="text-center text-hozen-dark/40 text-xs mt-4">
            7日間の無料トライアル後、自動的に課金されます。<br />
            いつでもキャンセル可能です。
          </p>
        </div>

        {/* Free Plan Comparison */}
        <div className="bg-white/50 rounded-2xl p-6 border border-hozen-green/5">
          <h3 className="font-bold text-hozen-dark/80 mb-4 font-jp">無料プラン（現在のプラン）</h3>
          <div className="space-y-3">
            {[
              '基本の歩行瞑想ガイド（2つ）',
              '歩数カウント',
              '基本タイマー',
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckIcon />
                <span className="text-hozen-dark/60 text-sm">{f}</span>
              </div>
            ))}
          </div>
          <Link
            href="/meditation"
            className="block mt-4 text-center text-hozen-green font-medium hover:underline"
          >
            無料プランで続ける
          </Link>
        </div>
      </div>
    </div>
  )
}

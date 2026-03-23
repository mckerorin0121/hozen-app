'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D5016" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function PricingPage() {
  const { locale, t } = useI18n()
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const [loading, setLoading] = useState(false)

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
        alert(t('pricing_error'))
      }
    } catch {
      alert(t('pricing_generic_error'))
    } finally {
      setLoading(false)
    }
  }

  const premiumFeats = [
    t('pricing_feat1'), t('pricing_feat2'), t('pricing_feat3'),
    t('pricing_feat4'), t('pricing_feat5'), t('pricing_feat6'),
  ]
  const freeFeats = [t('pricing_free1'), t('pricing_free2'), t('pricing_free3')]

  return (
    <div className="min-h-screen bg-hozen-cream">
      <div className="max-w-lg mx-auto px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-hozen-green/60 hover:text-hozen-green mb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          <span>{t('home')}</span>
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-hozen-green mb-3 font-jp">{t('pricing_title')}</h1>
          <p className="text-hozen-dark/60">{t('pricing_trial')}</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-sm inline-flex border border-hozen-green/10">
            <button onClick={() => setBilling('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billing === 'monthly' ? 'bg-hozen-green text-white' : 'text-hozen-dark/60 hover:text-hozen-dark'}`}>
              {t('pricing_monthly')}
            </button>
            <button onClick={() => setBilling('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billing === 'yearly' ? 'bg-hozen-green text-white' : 'text-hozen-dark/60 hover:text-hozen-dark'}`}>
              {t('pricing_yearly')}
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
                <div className="text-hozen-dark/40 mt-1">{t('pricing_per_month')}</div>
              </>
            ) : (
              <>
                <div className="text-5xl font-bold text-hozen-green">¥3,980</div>
                <div className="text-hozen-dark/40 mt-1">{t('pricing_per_year_detail')}</div>
                <div className="inline-block mt-2 px-3 py-1 bg-hozen-gold/10 text-hozen-gold text-sm font-semibold rounded-full">
                  {t('pricing_save')}
                </div>
              </>
            )}
          </div>

          <div className="space-y-4 mb-8">
            {premiumFeats.map((f, i) => (
              <div key={i} className="flex items-center gap-3"><CheckIcon /><span className="text-hozen-dark/70">{f}</span></div>
            ))}
          </div>

          <button onClick={handleSubscribe} disabled={loading}
            className="w-full py-4 bg-hozen-gold text-hozen-dark font-bold rounded-full text-lg hover:bg-hozen-gold-light transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
            {loading ? t('pricing_loading') : t('pricing_cta')}
          </button>
          <p className="text-center text-hozen-dark/40 text-xs mt-4 whitespace-pre-line">{t('pricing_note')}</p>
        </div>

        {/* Free Plan */}
        <div className="bg-white/50 rounded-2xl p-6 border border-hozen-green/5">
          <h3 className="font-bold text-hozen-dark/80 mb-4 font-jp">{t('pricing_free_title')}</h3>
          <div className="space-y-3">
            {freeFeats.map((f, i) => (
              <div key={i} className="flex items-center gap-3"><CheckIcon /><span className="text-hozen-dark/60 text-sm">{f}</span></div>
            ))}
          </div>
          <Link href="/meditation" className="block mt-4 text-center text-hozen-green font-medium hover:underline">
            {t('pricing_free_continue')}
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

const STRIPE_DONATION_URL = 'https://donate.stripe.com/8x228t8cYdtm1FJ14zb3q02'

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function BankIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
    </svg>
  )
}

export default function DonatePage() {
  const { t } = useI18n()
  const [showBankCopied, setShowBankCopied] = useState('')

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).catch(() => {})
    setShowBankCopied(field)
    setTimeout(() => setShowBankCopied(''), 2000)
  }

  const bankInfo = {
    bankName: '三菱UFJ銀行',
    branchName: '五反田駅前支店',
    accountType: t('donate_bank_type_value'),
    accountNumber: '3082413',
    accountHolder: 'アイミヤ ヤスヒト',
  }

  return (
    <div className="min-h-screen bg-hozen-cream">
      <div className="max-w-lg mx-auto px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-hozen-green/60 hover:text-hozen-green mb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          <span>{t('donate_back')}</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-hozen-gold/10 rounded-full mb-4 text-hozen-gold">
            <HeartIcon />
          </div>
          <h1 className="text-3xl font-bold text-hozen-green mb-3 font-jp">{t('donate_title')}</h1>
          <p className="text-hozen-dark/60 whitespace-pre-line">{t('donate_sub')}</p>
        </div>

        {/* Why support */}
        <div className="bg-hozen-green/5 rounded-2xl p-6 mb-8 border border-hozen-green/10">
          <h2 className="font-bold text-hozen-green mb-2 font-jp">{t('donate_why_title')}</h2>
          <p className="text-hozen-dark/60 text-sm leading-relaxed whitespace-pre-line">{t('donate_why_body')}</p>
        </div>

        {/* Stripe Donation Link */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-hozen-green/10 mb-6">
          <h2 className="font-bold text-hozen-green mb-4 font-jp flex items-center gap-2">
            <span className="text-hozen-gold">💳</span> {t('donate_stripe_button')}
          </h2>
          <p className="text-hozen-dark/50 text-sm mb-6">{t('donate_stripe_desc')}</p>
          <a
            href={STRIPE_DONATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 bg-hozen-gold text-hozen-dark font-bold rounded-full text-lg hover:bg-hozen-gold-light transition-all transform hover:scale-[1.02] shadow-lg text-center"
          >
            {t('donate_stripe_button')}
          </a>
        </div>

        {/* Bank Transfer */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-hozen-green/10 mb-8">
          <h2 className="font-bold text-hozen-green mb-6 font-jp flex items-center gap-2">
            <span className="text-hozen-gold"><BankIcon /></span> {t('donate_bank_title')}
          </h2>

          <div className="space-y-4">
            {[
              { label: t('donate_bank_name'), value: bankInfo.bankName, key: 'bank' },
              { label: t('donate_bank_branch'), value: bankInfo.branchName, key: 'branch' },
              { label: t('donate_bank_type'), value: bankInfo.accountType, key: 'type' },
              { label: t('donate_bank_number'), value: bankInfo.accountNumber, key: 'number' },
              { label: t('donate_bank_holder'), value: bankInfo.accountHolder, key: 'holder' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-2 border-b border-hozen-dark/5 last:border-0">
                <div>
                  <div className="text-xs text-hozen-dark/40">{item.label}</div>
                  <div className="font-bold text-hozen-dark/80">{item.value}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(item.value, item.key)}
                  className="text-xs text-hozen-green/60 hover:text-hozen-green px-3 py-1 rounded-full border border-hozen-green/20 hover:border-hozen-green/40 transition-all"
                >
                  {showBankCopied === item.key ? '✓' : 'Copy'}
                </button>
              </div>
            ))}
          </div>

          <p className="text-xs text-hozen-dark/40 mt-4">{t('donate_bank_note')}</p>
        </div>

        {/* Thanks */}
        <p className="text-center text-hozen-dark/50 text-sm mb-8">{t('donate_thanks')}</p>

        <div className="text-center">
          <Link href="/meditation" className="text-hozen-green font-semibold hover:underline">
            {t('donate_back')}
          </Link>
        </div>
      </div>
    </div>
  )
}

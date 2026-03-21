'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C6.5 2 2 6.5 2 12c5 0 9-3 10-8 1 5 5 8 10 8-4.5 0-10-4.5-10-10z" />
      <path d="M12 2v20" />
    </svg>
  )
}

function WaveIcon() {
  return (
    <svg className="w-full h-16 text-hozen-green/10" viewBox="0 0 1200 80" preserveAspectRatio="none">
      <path d="M0,40 C300,80 600,0 900,40 C1050,60 1150,20 1200,40 L1200,80 L0,80 Z" fill="currentColor" />
    </svg>
  )
}

export default function Home() {
  const [stepCount, setStepCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStepCount(prev => (prev < 3 ? prev + 1 : 0))
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-hozen-green via-hozen-green-light to-hozen-green">
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full breathing-animation" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-hozen-gold/10 rounded-full breathing-animation" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-hozen-sky/10 rounded-full breathing-animation" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          {/* Logo / Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                <LeafIcon className="w-12 h-12 text-hozen-gold" />
              </div>
              <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-hozen-gold/30 pulse-ring" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 font-jp tracking-tight">
            歩禅
          </h1>
          <p className="text-xl md:text-2xl text-hozen-gold-light font-light tracking-wider mb-2">
            HoZen
          </p>
          <p className="text-lg md:text-xl text-white/80 font-light mt-6 mb-12 leading-relaxed">
            歩くだけで、心が整う。<br />
            <span className="text-white/60">毎日の歩きを、瞑想の時間に。</span>
          </p>

          {/* Step visualization */}
          <div className="flex justify-center gap-3 mb-12">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  stepCount > i ? 'bg-hozen-gold scale-125' : 'bg-white/30 scale-100'
                }`}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/meditation"
              className="px-8 py-4 bg-hozen-gold text-hozen-dark font-semibold rounded-full text-lg hover:bg-hozen-gold-light transition-all transform hover:scale-105 shadow-lg"
            >
              無料で体験する
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full text-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              プランを見る
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm">scroll</span>
            <div className="w-px h-8 bg-white/20" />
          </div>
        </div>
      </section>

      <WaveIcon />

      {/* Features Section */}
      <section className="py-24 px-6 bg-hozen-cream">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-hozen-green mb-4 font-jp">
            歩禅の特長
          </h2>
          <p className="text-center text-hozen-dark/60 mb-16 max-w-2xl mx-auto">
            テクノロジーとマインドフルネスの融合で、<br />あなたの歩きが変わります。
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚶',
                title: '歩行連動ガイド',
                desc: 'あなたの歩くペースに合わせて音声ガイドが自動調整。自然な歩きのまま瞑想に入れます。',
              },
              {
                icon: '🎧',
                title: 'プロの音声誘導',
                desc: '禅僧監修のガイド音声。初心者でも5分で深い瞑想状態へ導きます。',
              },
              {
                icon: '📊',
                title: '成長の可視化',
                desc: '瞑想時間・歩数・継続日数を記録。マインドフルネスの習慣化をサポート。',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-hozen-green/5"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-hozen-green mb-3 font-jp">
                  {feature.title}
                </h3>
                <p className="text-hozen-dark/70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-hozen-green mb-16 font-jp">
            使い方はシンプル
          </h2>

          <div className="space-y-12">
            {[
              { step: '01', title: 'アプリを開く', desc: 'ホーム画面からワンタップで起動。ブラウザでもスマホアプリのようにサクサク動きます。' },
              { step: '02', title: '歩き始める', desc: 'イヤホンをつけて、いつものルートを歩くだけ。通勤中でも散歩でもOK。' },
              { step: '03', title: '音声に従う', desc: '優しい音声が呼吸と歩行のリズムを導きます。歩くペースに自動で合わせます。' },
              { step: '04', title: '心が整う', desc: '5分間の歩行瞑想で、集中力アップ・ストレス軽減を実感。毎日の習慣に。' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-hozen-green/5 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-hozen-gold">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-hozen-green mb-2 font-jp">{item.title}</h3>
                  <p className="text-hozen-dark/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="py-24 px-6 bg-hozen-green/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-hozen-green mb-12 font-jp">
            体験者の声
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: '通勤の15分が、一日で一番好きな時間になりました。',
                name: 'Yuki S.',
                role: '会社員 / 28歳',
              },
              {
                quote: '座る瞑想は続かなかったけど、歩禅は自然に続いています。',
                name: 'Takeshi M.',
                role: 'マネージャー / 45歳',
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm text-left">
                <p className="text-lg text-hozen-dark/80 mb-6 leading-relaxed italic">
                  「{t.quote}」
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-hozen-gold/20 rounded-full flex items-center justify-center text-hozen-gold font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-hozen-dark">{t.name}</p>
                    <p className="text-sm text-hozen-dark/50">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-b from-hozen-green to-hozen-dark text-center">
        <div className="max-w-3xl mx-auto">
          <LeafIcon className="w-16 h-16 text-hozen-gold mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-jp">
            今日から、歩禅を始めよう
          </h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            7日間の無料体験で、歩行瞑想の効果を実感してください。<br />
            クレジットカード不要で、今すぐ始められます。
          </p>
          <Link
            href="/meditation"
            className="inline-block px-10 py-4 bg-hozen-gold text-hozen-dark font-bold rounded-full text-lg hover:bg-hozen-gold-light transition-all transform hover:scale-105 shadow-xl"
          >
            無料で体験する →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-hozen-dark text-white/40 text-sm text-center">
        <p>&copy; 2026 歩禅 HoZen. All rights reserved.</p>
        <div className="mt-3 flex justify-center gap-6">
          <Link href="/tokusho" className="hover:text-white/60 transition-colors">
            特定商取引法に基づく表記
          </Link>
        </div>
      </footer>
    </main>
  )
}

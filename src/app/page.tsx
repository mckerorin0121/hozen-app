'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import FootAnimation from '@/components/FootAnimation'

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
  const { locale, setLocale, t } = useI18n()
  const [stepCount, setStepCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStepCount(prev => (prev < 3 ? prev + 1 : 0))
    }, 800)
    return () => clearInterval(interval)
  }, [])

  const features = [
    { icon: '🚶', title: t('feature1_title'), desc: t('feature1_desc') },
    { icon: '🎧', title: t('feature2_title'), desc: t('feature2_desc') },
    { icon: '📊', title: t('feature3_title'), desc: t('feature3_desc') },
  ]

  const howtos = [
    { step: '01', title: t('howto1_title'), desc: t('howto1_desc') },
    { step: '02', title: t('howto2_title'), desc: t('howto2_desc') },
    { step: '03', title: t('howto3_title'), desc: t('howto3_desc') },
    { step: '04', title: t('howto4_title'), desc: t('howto4_desc') },
  ]

  const testimonials = [
    { quote: t('testimonial1_quote'), name: t('testimonial1_name'), role: t('testimonial1_role') },
    { quote: t('testimonial2_quote'), name: t('testimonial2_name'), role: t('testimonial2_role') },
  ]

  return (
    <main className="min-h-screen">
      {/* Language switcher */}
      <div className="absolute top-4 right-4 z-20 flex gap-1">
        <button onClick={() => setLocale('ja')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${locale === 'ja' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/60'}`}>
          🇯🇵
        </button>
        <button onClick={() => setLocale('en')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${locale === 'en' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/60'}`}>
          🇺🇸
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-hozen-green via-hozen-green-light to-hozen-green">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full breathing-animation" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-hozen-gold/10 rounded-full breathing-animation" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-hozen-sky/10 rounded-full breathing-animation" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                <LeafIcon className="w-12 h-12 text-hozen-gold" />
              </div>
              <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-hozen-gold/30 pulse-ring" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 font-jp tracking-tight">歩禅</h1>
          <p className="text-xl md:text-2xl text-hozen-gold-light font-light tracking-wider mb-2">HoZen</p>
          <p className="text-lg md:text-xl text-white/80 font-light mt-6 mb-12 leading-relaxed">
            {t('hero_tagline')}<br />
            <span className="text-white/60">{t('hero_sub')}</span>
          </p>

          <div className="flex justify-center gap-3 mb-12">
            {[0, 1, 2].map(i => (
              <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${stepCount > i ? 'bg-hozen-gold scale-125' : 'bg-white/30 scale-100'}`} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/meditation" className="px-8 py-4 bg-hozen-gold text-hozen-dark font-semibold rounded-full text-lg hover:bg-hozen-gold-light transition-all transform hover:scale-105 shadow-lg">
              {t('hero_cta')}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm">scroll</span>
            <div className="w-px h-8 bg-white/20" />
          </div>
        </div>
      </section>

      <WaveIcon />

      {/* What is Walking Meditation? */}
      <section className="py-24 px-6 bg-hozen-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-hozen-green mb-4 font-jp">{t('what_title')}</h2>
          <p className="text-center text-hozen-dark/60 mb-12 max-w-2xl mx-auto">{t('what_lead')}</p>

          {/* Foot Animation Demo */}
          <div className="flex justify-center mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-hozen-green/10 text-hozen-green">
              <FootAnimation phase="auto" size="large" showLabels locale={locale} />
            </div>
          </div>

          <div className="space-y-12">
            {[
              { icon: '🧘', titleKey: 'what_block1_title' as const, bodyKey: 'what_block1_body' as const },
              { icon: '🔬', titleKey: 'what_block2_title' as const, bodyKey: 'what_block2_body' as const },
              { icon: '🌍', titleKey: 'what_block3_title' as const, bodyKey: 'what_block3_body' as const },
            ].map((block, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-hozen-green/5 rounded-2xl flex items-center justify-center text-3xl">
                  {block.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-hozen-green mb-3 font-jp">{t(block.titleKey)}</h3>
                  <p className="text-hozen-dark/70 leading-relaxed">{t(block.bodyKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-hozen-cream">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-hozen-green mb-4 font-jp">{t('features_title')}</h2>
          <p className="text-center text-hozen-dark/60 mb-16 max-w-2xl mx-auto whitespace-pre-line">{t('features_sub')}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-hozen-green/5">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-hozen-green mb-3 font-jp">{f.title}</h3>
                <p className="text-hozen-dark/70 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-hozen-green mb-16 font-jp">{t('howto_title')}</h2>
          <div className="space-y-12">
            {howtos.map((item, i) => (
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

      {/* Testimonials */}
      <section className="py-24 px-6 bg-hozen-green/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-hozen-green mb-12 font-jp">{t('testimonial_title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm text-left">
                <p className="text-lg text-hozen-dark/80 mb-6 leading-relaxed italic">
                  {locale === 'ja' ? `「${item.quote}」` : `"${item.quote}"`}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-hozen-gold/20 rounded-full flex items-center justify-center text-hozen-gold font-bold">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-hozen-dark">{item.name}</p>
                    <p className="text-sm text-hozen-dark/50">{item.role}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-jp">{t('cta_title')}</h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed whitespace-pre-line">{t('cta_desc')}</p>
          <Link href="/meditation" className="inline-block px-10 py-4 bg-hozen-gold text-hozen-dark font-bold rounded-full text-lg hover:bg-hozen-gold-light transition-all transform hover:scale-105 shadow-xl">
            {t('cta_button')}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-hozen-dark text-white/40 text-sm text-center">
        <p>&copy; 2026 歩禅 HoZen. All rights reserved.</p>
        <div className="mt-3 flex justify-center gap-6">
          <Link href="/pricing" className="hover:text-white/60 transition-colors">{t('donate_title')}</Link>
          <Link href="/tokusho" className="hover:text-white/60 transition-colors">{t('footer_legal')}</Link>
        </div>
      </footer>
    </main>
  )
}

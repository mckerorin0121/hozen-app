import type { Metadata, Viewport } from 'next'
import './globals.css'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'
import { I18nWrapper } from '@/components/I18nWrapper'

export const metadata: Metadata = {
  title: '歩禅 HoZen - Walking Meditation',
  description: 'Walking meditation app. Transform your daily walk into mindfulness. 歩くだけで心が整う歩行瞑想アプリ。',
  manifest: '/manifest.json',
  icons: {
    apple: [{ url: '/icons/icon-192.png', sizes: '192x192' }],
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: '歩禅 HoZen',
  },
  metadataBase: new URL('https://hozen-app.vercel.app'),
  openGraph: {
    title: '歩禅 HoZen - Walking Meditation',
    description: '歩くだけで、心が整う。Walk your way to inner peace.',
    url: 'https://hozen-app.vercel.app',
    siteName: '歩禅 HoZen',
    images: [
      {
        url: 'https://hozen-app.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: '歩禅 HoZen - Walking Meditation App',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '歩禅 HoZen - Walking Meditation',
    description: '歩くだけで、心が整う。Walk your way to inner peace.',
    images: ['https://hozen-app.vercel.app/og-image.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#2D5016',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-hozen-cream text-hozen-dark antialiased">
        <ServiceWorkerRegister />
        <I18nWrapper>{children}</I18nWrapper>
      </body>
    </html>
  )
}

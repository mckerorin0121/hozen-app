import type { Metadata, Viewport } from 'next'
import './globals.css'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'

export const metadata: Metadata = {
  title: '歩禅 HoZen - 歩くだけで、心が整う',
  description: '歩くだけで心が整う、新しいマインドフルネス体験。歩行瞑想アプリ「歩禅」で、毎日の歩きを瞑想の時間に。',
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/icon-192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2D5016',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-hozen-cream text-hozen-dark antialiased">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  )
}

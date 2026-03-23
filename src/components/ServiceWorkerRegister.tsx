'use client'

import { useEffect, useState } from 'react'

export default function ServiceWorkerRegister() {
  const [showInstall, setShowInstall] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('SW registered:', reg.scope)

          // Listen for SW updates
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing
            if (!newWorker) return
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'activated') {
                console.log('SW updated — new content available')
              }
            })
          })
        })
        .catch((err) => console.warn('SW registration failed:', err))

      // Listen for SW messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'SW_UPDATED') {
          console.log('SW updated notification received')
        }
      })
    }

    // Capture "Add to Home Screen" prompt (Android Chrome)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // Show install banner if not already installed and not dismissed
      const dismissed = localStorage.getItem('hozen-install-dismissed')
      if (!dismissed) {
        setShowInstall(true)
      }
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstall)

    // Check if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstall(false)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const result = await deferredPrompt.userChoice
    if (result.outcome === 'accepted') {
      console.log('PWA installed')
    }
    setDeferredPrompt(null)
    setShowInstall(false)
  }

  const handleDismiss = () => {
    setShowInstall(false)
    localStorage.setItem('hozen-install-dismissed', Date.now().toString())
  }

  // iOS Safari detection for manual install instructions
  const [showIOSGuide, setShowIOSGuide] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const dismissed = localStorage.getItem('hozen-install-dismissed')
    if (isIOS && !isStandalone && !dismissed) {
      // Show after 30 seconds of use
      const timer = setTimeout(() => setShowIOSGuide(true), 30000)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!showInstall && !showIOSGuide) return null

  return (
    <>
      {/* Android: native install prompt */}
      {showInstall && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur border-t border-hozen-green/20 shadow-lg safe-bottom animate-slide-up">
          <div className="max-w-md mx-auto flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-hozen-green flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🚶</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-hozen-dark">歩禅をホーム画面に追加</p>
              <p className="text-xs text-gray-500">アプリのようにすぐ起動できます</p>
            </div>
            <button
              onClick={handleInstall}
              className="px-4 py-2 bg-hozen-green text-white rounded-lg text-sm font-bold flex-shrink-0"
            >
              追加
            </button>
            <button
              onClick={handleDismiss}
              className="text-gray-400 text-xl leading-none flex-shrink-0"
              aria-label="閉じる"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* iOS: manual install guide */}
      {showIOSGuide && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur border-t border-hozen-green/20 shadow-lg safe-bottom">
          <div className="max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-hozen-green flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🚶</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-hozen-dark">歩禅をホーム画面に追加</p>
                <p className="text-xs text-gray-500 mt-1">
                  画面下の
                  <svg className="inline w-4 h-4 mx-0.5 -mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
                  をタップ →「ホーム画面に追加」
                </p>
              </div>
              <button
                onClick={() => {
                  setShowIOSGuide(false)
                  localStorage.setItem('hozen-install-dismissed', Date.now().toString())
                }}
                className="text-gray-400 text-xl leading-none flex-shrink-0"
                aria-label="閉じる"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

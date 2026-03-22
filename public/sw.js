const CACHE_NAME = 'hozen-v2'

// Only cache known static assets
const STATIC_ASSETS = [
  '/',
  '/meditation',
  '/pricing',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
]

// Audio files to cache for offline playback
const AUDIO_ASSETS = [
  '/audio/forest.ogg',
  '/audio/rain.ogg',
  '/audio/stream.ogg',
  '/audio/wind.ogg',
]

// Never cache these paths
const NO_CACHE_PATTERNS = [
  '/api/',
  'stripe.com',
  'googleapis.com',
]

function shouldCache(url) {
  return !NO_CACHE_PATTERNS.some(pattern => url.includes(pattern))
}

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([...STATIC_ASSETS, ...AUDIO_ASSETS])
    })
  )
  self.skipWaiting()
})

// Activate - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    })
  )
  self.clients.claim()
})

// Fetch - Network first, selective caching
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return

  const url = event.request.url

  // Never intercept sensitive requests
  if (!shouldCache(url)) return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Only cache successful responses from same origin or known assets
        if (response.ok && (response.type === 'basic' || url.includes('/audio/'))) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone)
          })
        }
        return response
      })
      .catch(() => {
        // Fallback to cache for offline support
        return caches.match(event.request).then((cached) => {
          return cached || caches.match('/')
        })
      })
  )
})

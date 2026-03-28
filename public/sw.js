const CACHE_NAME = 'hozen-v4'

// Static assets cached on install
const STATIC_ASSETS = [
  '/',
  '/meditation',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
]

// Guide audio file keys (cached lazily on first play)
const GUIDE_FILE_KEYS = [
  'day1_01','day1_02','day1_03','day1_04','day1_05','day1_06','day1_07','day1_08',
  'day1_09','day1_10','day1_11','day1_12','day1_13','day1_14','day1_15','day1_16',
  'stress_01','stress_02','stress_03','stress_04','stress_05','stress_06','stress_07',
  'stress_08','stress_09','stress_10','stress_11','stress_12','stress_13','stress_14',
  'stress_15','stress_16','stress_17','stress_18','stress_19','stress_20','stress_21',
  'morning_01','morning_02','morning_03','morning_04','morning_05','morning_06','morning_07',
  'morning_08','morning_09','morning_10','morning_11','morning_12','morning_13','morning_14',
  'morning_15','morning_16','morning_17',
  'evening_01','evening_02','evening_03','evening_04','evening_05','evening_06','evening_07',
  'evening_08','evening_09','evening_10','evening_11','evening_12','evening_13','evening_14',
  'evening_15','evening_16','evening_17','evening_18','evening_19','evening_20','evening_21',
  'focus_01','focus_02','focus_03','focus_04','focus_05','focus_06','focus_07',
  'focus_08','focus_09','focus_10','focus_11','focus_12','focus_13','focus_14',
  'cd1_01','cd1_02','cd1_03','cd1_04','cd1_05','cd1_06','cd1_07','cd1_08',
  'cd1_09','cd1_10','cd1_11','cd1_12','cd1_13','cd1_14',
  'cd2_01','cd2_02','cd2_03','cd2_04','cd2_05','cd2_06','cd2_07','cd2_08',
  'cd2_09','cd2_10','cd2_11','cd2_12','cd2_13','cd2_14','cd2_15',
  'cd4_01','cd4_02','cd4_03','cd4_04','cd4_05','cd4_06','cd4_07','cd4_08',
  'cd4_09','cd4_10','cd4_11','cd4_12','cd4_13','cd4_14','cd4_15','cd4_16','cd4_17',
  'cd5_01','cd5_02','cd5_03','cd5_04','cd5_05','cd5_06','cd5_07','cd5_08',
  'cd5_09','cd5_10','cd5_11','cd5_12','cd5_13','cd5_14','cd5_15','cd5_16','cd5_17',
  'cd6_01','cd6_02','cd6_03','cd6_04','cd6_05','cd6_06','cd6_07','cd6_08',
  'cd6_09','cd6_10','cd6_11',
]

// Never cache these paths
const NO_CACHE_PATTERNS = [
  '/api/',
  'stripe.com',
]

function shouldCache(url) {
  return !NO_CACHE_PATTERNS.some(pattern => url.includes(pattern))
}

function isGuideAudio(url) {
  return url.includes('/audio/guide/')
}

// Install - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// Activate - clean up old caches and notify clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    }).then(() => {
      // Notify all clients that SW has been updated
      self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage({ type: 'SW_UPDATED' }))
      })
    })
  )
  self.clients.claim()
})

// Message handler - pre-cache guide audio on demand
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_GUIDES') {
    const gender = event.data.gender || 'female'
    const urls = GUIDE_FILE_KEYS.map(key => `/audio/guide/${gender}/${key}.mp3`)
    caches.open(CACHE_NAME).then(cache => {
      // Cache in batches to avoid overwhelming the network
      const batchSize = 5
      let i = 0
      function cacheBatch() {
        const batch = urls.slice(i, i + batchSize)
        if (batch.length === 0) {
          event.source && event.source.postMessage({ type: 'GUIDES_CACHED', gender })
          return
        }
        Promise.all(
          batch.map(url =>
            cache.match(url).then(cached => {
              if (!cached) return cache.add(url).catch(() => {})
            })
          )
        ).then(() => {
          i += batchSize
          cacheBatch()
        })
      }
      cacheBatch()
    })
  }
})

// Fetch strategy:
// - Guide audio: Cache-first (for smooth offline playback)
// - Everything else: Network-first with cache fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const url = event.request.url
  if (!shouldCache(url)) return

  // Guide audio: cache-first for instant playback
  if (isGuideAudio(url)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
          }
          return response
        })
      })
    )
    return
  }

  // Everything else: network-first
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && response.type === 'basic') {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
        }
        return response
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          return cached || caches.match('/')
        })
      })
  )
})

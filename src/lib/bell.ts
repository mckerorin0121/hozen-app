/**
 * Meditation bell sound generator using Web Audio API.
 * Creates a singing bowl / temple bell tone with harmonics and natural decay.
 */

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  return audioCtx
}

export async function playBell(volume = 0.4): Promise<void> {
  const ctx = getAudioContext()
  if (ctx.state === 'suspended') {
    await ctx.resume()
  }

  const duration = 4.5
  const now = ctx.currentTime

  // Master gain with exponential decay
  const master = ctx.createGain()
  master.gain.setValueAtTime(volume, now)
  master.gain.exponentialRampToValueAtTime(0.001, now + duration)
  master.connect(ctx.destination)

  // Singing bowl harmonics (fundamental ~528 Hz = C5)
  const harmonics: [number, number][] = [
    [528, 1.0],
    [1056, 0.45],
    [1584, 0.25],
    [2112, 0.12],
    [2640, 0.06],
  ]

  harmonics.forEach(([freq, amp]) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.value = freq
    // Slight frequency drift for natural feel
    osc.frequency.exponentialRampToValueAtTime(freq * 0.998, now + duration)

    gain.gain.setValueAtTime(amp, now)
    // Higher harmonics decay faster
    const decayRate = 1 + (freq / 528) * 0.5
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration / decayRate)

    osc.connect(gain)
    gain.connect(master)
    osc.start(now)
    osc.stop(now + duration)
  })

  return new Promise((resolve) => {
    setTimeout(resolve, duration * 1000)
  })
}

/**
 * Play a short, soft bell (for halfway notifications etc.)
 */
export async function playBellShort(volume = 0.25): Promise<void> {
  const ctx = getAudioContext()
  if (ctx.state === 'suspended') {
    await ctx.resume()
  }

  const duration = 2.5
  const now = ctx.currentTime

  const master = ctx.createGain()
  master.gain.setValueAtTime(volume, now)
  master.gain.exponentialRampToValueAtTime(0.001, now + duration)
  master.connect(ctx.destination)

  const harmonics: [number, number][] = [
    [660, 1.0],
    [1320, 0.35],
    [1980, 0.15],
  ]

  harmonics.forEach(([freq, amp]) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(amp, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration)
    osc.connect(gain)
    gain.connect(master)
    osc.start(now)
    osc.stop(now + duration)
  })

  return new Promise((resolve) => {
    setTimeout(resolve, duration * 1000)
  })
}

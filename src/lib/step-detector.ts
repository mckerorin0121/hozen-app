'use client'

export class StepDetector {
  private stepCount = 0
  private lastAcceleration = 0
  private threshold = 1.2
  private lastStepTime = 0
  private minStepInterval = 300 // ms
  private onStep: (count: number) => void
  private permissionGranted = false

  constructor(onStep: (count: number) => void) {
    this.onStep = onStep
  }

  async start(): Promise<boolean> {
    // Check for DeviceMotion support
    if (!('DeviceMotionEvent' in window)) {
      console.warn('DeviceMotion not supported')
      return false
    }

    // iOS 13+ requires permission
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceMotionEvent as any).requestPermission()
        if (permission !== 'granted') {
          return false
        }
      } catch {
        return false
      }
    }

    this.permissionGranted = true
    this.stepCount = 0
    window.addEventListener('devicemotion', this.handleMotion)
    return true
  }

  stop() {
    window.removeEventListener('devicemotion', this.handleMotion)
  }

  getCount() {
    return this.stepCount
  }

  private handleMotion = (event: DeviceMotionEvent) => {
    const acc = event.accelerationIncludingGravity
    if (!acc || acc.x === null || acc.y === null || acc.z === null) return

    const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2)
    const delta = Math.abs(magnitude - this.lastAcceleration)
    const now = Date.now()

    if (delta > this.threshold && now - this.lastStepTime > this.minStepInterval) {
      this.stepCount++
      this.lastStepTime = now
      this.onStep(this.stepCount)
    }

    this.lastAcceleration = magnitude
  }
}

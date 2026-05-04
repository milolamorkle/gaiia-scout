const DURATION_MS = 2500

let startTime: number | null = null

export function startOutageCheck() {
  startTime = Date.now()
}

export function getOutageCheckRemainingMs(): number {
  if (startTime === null) return DURATION_MS
  return Math.max(0, DURATION_MS - (Date.now() - startTime))
}

export function isOutageCheckComplete(): boolean {
  return getOutageCheckRemainingMs() === 0
}

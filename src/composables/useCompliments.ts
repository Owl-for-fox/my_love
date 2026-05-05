import { ref } from 'vue'
import { compliments } from '../data/compliments'

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

export function useCompliments() {
  let queue: string[] = shuffle(compliments)
  let last: string | null = null
  const current = ref<string>(queue.shift() ?? '')
  last = current.value

  function next(): void {
    if (queue.length === 0) {
      let reshuffled = shuffle(compliments)
      if (reshuffled[0] === last && reshuffled.length > 1) {
        ;[reshuffled[0], reshuffled[1]] = [reshuffled[1]!, reshuffled[0]!]
      }
      queue = reshuffled
    }
    const value = queue.shift()!
    last = value
    current.value = value
  }

  return { current, next }
}
import {ref, computed, watch} from 'vue'

const STORAGE_KEY = 'compliments_favorites'

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((v): v is string => typeof v === 'string')
  } catch {
    return []
  }
}

const favorites = ref<string[]>(load())

watch(
  favorites,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  {deep: true},
)

export function useFavorites() {
  const isFavorite = (text: string) => computed(() => favorites.value.includes(text))
  
  function toggle(text: string): void {
    const idx = favorites.value.indexOf(text)
    if (idx === -1) favorites.value.push(text)
    else favorites.value.splice(idx, 1)
  }
  
  function remove(text: string): void {
    const idx = favorites.value.indexOf(text)
    if (idx !== -1) favorites.value.splice(idx, 1)
  }
  
  return {favorites, isFavorite, toggle, remove}
}
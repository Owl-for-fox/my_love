<script setup lang="ts">
import { computed, ref } from 'vue'
import ComplimentCard from './components/ComplimentCard.vue'
import FavoritesPanel from './components/FavoritesPanel.vue'
import { useCompliments } from './composables/useCompliments'
import { useFavorites } from './composables/useFavorites'

const { current, next } = useCompliments()
const { favorites } = useFavorites()

const showFavorites = ref(false)
const favCount = computed(() => favorites.value.length)
</script>

<template>
  <div class="page">
    <header class="header">
      <h1>Капля тепла</h1>
      <button
        class="fav-trigger"
        :aria-label="`Открыть избранное (${favCount})`"
        @click="showFavorites = true"
      >
        <span class="fav-icon" aria-hidden="true">♥</span>
        <span class="fav-count" v-if="favCount > 0">{{ favCount }}</span>
      </button>
    </header>

    <main class="main">
      <ComplimentCard :text="current" />

      <button class="next-btn" @click="next">Следующий комплимент</button>
    </main>

    <FavoritesPanel :open="showFavorites" @close="showFavorites = false" />
  </div>
</template>

<style scoped>
.page {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 1.25rem 1rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.fav-trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius);
  background: var(--card-bg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  font-size: 0.95rem;
  transition: transform 140ms ease, background-color 160ms ease;
}

.fav-trigger:hover {
  background: #fff;
}

.fav-trigger:active {
  transform: scale(0.97);
}

.fav-icon {
  color: var(--accent-hover);
  font-size: 1rem;
}

.fav-count {
  min-width: 1.25rem;
  text-align: center;
  font-variant-numeric: tabular-nums;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: stretch;
}

.next-btn {
  align-self: center;
  padding: 0.95rem 2rem;
  border-radius: var(--radius);
  background: var(--accent);
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  box-shadow: var(--shadow);
  transition: background-color 160ms ease, transform 120ms ease;
  width: 100%;
  max-width: 360px;
}

.next-btn:hover {
  background: var(--accent-hover);
}

.next-btn:active {
  transform: scale(0.97);
}

@media (min-width: 720px) {
  .page {
    padding: 2.5rem 1.5rem 3rem;
    gap: 2.5rem;
  }

  h1 {
    font-size: 1.25rem;
  }

  .next-btn {
    padding: 1rem 2.25rem;
    font-size: 1.05rem;
  }
}
</style>
<script lang="ts"
        setup>
import {computed, ref} from 'vue'
import ComplimentCard from './components/ComplimentCard.vue'
import FavoritesPanel from './components/FavoritesPanel.vue'
import WelcomeScreen from './components/WelcomeScreen.vue'
import {useCompliments} from './composables/useCompliments'
import {useFavorites} from './composables/useFavorites'

const {current, next} = useCompliments()
const {favorites} = useFavorites()

const started = ref(false)
const showFavorites = ref(false)
const favCount = computed(() => favorites.value.length)
</script>

<template>
  <WelcomeScreen v-if="!started"
                 @start="started = true" />

  <div v-else
       class="page">
    <header class="header">
      <h1>©Специально для Лисенка</h1>
      <button
          :aria-label="`Открыть избранное (${favCount})`"
          class="fav-trigger"
          @click="showFavorites = true">
        <span aria-hidden="true"
              class="fav-icon">
          <svg class="lucide lucide-heart-icon lucide-heart"
               fill="none"
               height="24"
               stroke="currentColor"
               stroke-linecap="round"
               stroke-linejoin="round"
               stroke-width="2"
               viewBox="0 0 24 24"
               width="24"
               xmlns="http://www.w3.org/2000/svg"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /></svg></span>
        <span v-if="favCount > 0"
              class="fav-count">{{ favCount }}</span>
      </button>
    </header>

    <main class="main">
      <ComplimentCard :text="current" />
      <button class="next-btn"
              @click="next">Следующий комплимент
      </button>
    </main>
    <FavoritesPanel :open="showFavorites"
                    @close="showFavorites = false" />
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
  gap: 0.2rem;
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius);
  background: var(--card-bg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  transition: transform 140ms ease, background-color 160ms ease;
}

.fav-trigger:hover {
  background: #fff;
}

.fav-trigger:active {
  transform: scale(0.97);
}

.fav-icon {
  color: var(--decor-hover);
  font-size: 1rem;
  display: flex;
  align-items: center;
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
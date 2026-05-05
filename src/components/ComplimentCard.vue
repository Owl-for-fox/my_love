<script lang="ts"
        setup>
import {computed} from 'vue'
import {useFavorites} from '../composables/useFavorites'

const props = defineProps<{ text: string }>()

const {toggle, favorites} = useFavorites()
const liked = computed(() => favorites.value.includes(props.text))

function onToggle() {
  if (!props.text) return
  toggle(props.text)
}
</script>

<template>
  <div class="card">
    <button
        :aria-label="liked ? 'Убрать из избранного' : 'Добавить в избранное'"
        :aria-pressed="liked"
        :class="{ active: liked }"
        class="heart"
        @click="onToggle"
    >
      <svg :fill="liked ? 'currentColor' : 'none'"
           class="lucide lucide-heart-icon lucide-heart"
           height="30"
           stroke="currentColor"
           stroke-linecap="round"
           stroke-linejoin="round"
           stroke-width="2"
           viewBox="0 0 24 24"
           width="30"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
      </svg>
    </button>

    <Transition mode="out-in"
                name="fade-up">
      <p :key="text"
         class="text">{{ text }}
      </p>
    </Transition>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 3rem 1.75rem 2.25rem;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text {
  font-size: 1.35rem;
  font-weight: 500;
  text-align: center;
  color: var(--text-primary);
  line-height: 1.45;
  max-width: 32ch;
}

.heart {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: color 160ms ease, background-color 160ms ease, transform 160ms ease;
}

.heart:hover {
  background: rgba(248, 210, 217, 0.25);
  color: var(--decor-hover);
}

.heart.active {
  color: var(--decor-hover);
}

.heart:active {
  transform: scale(0.92);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 320ms ease, transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

@media (min-width: 640px) {
  .card {
    padding: 3.25rem 2.5rem 2.5rem;
    min-height: 240px;
  }

  .text {
    font-size: 1.55rem;
  }
}
</style>
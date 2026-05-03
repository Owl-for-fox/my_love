<script setup lang="ts">
import { computed } from 'vue'
import { useFavorites } from '../composables/useFavorites'

const props = defineProps<{ text: string }>()

const { toggle, favorites } = useFavorites()
const liked = computed(() => favorites.value.includes(props.text))

function onToggle() {
  if (!props.text) return
  toggle(props.text)
}
</script>

<template>
  <div class="card">
    <button
      class="heart"
      :class="{ active: liked }"
      :aria-label="liked ? 'Убрать из избранного' : 'Добавить в избранное'"
      :aria-pressed="liked"
      @click="onToggle"
    >
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        aria-hidden="true"
        :fill="liked ? 'currentColor' : 'none'"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        />
      </svg>
    </button>

    <Transition name="fade-up" mode="out-in">
      <p :key="text" class="text">{{ text }}</p>
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
  background: rgba(255, 183, 197, 0.15);
  color: var(--accent-hover);
}

.heart.active {
  color: var(--accent-hover);
}

.heart:active {
  transform: scale(0.92);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 280ms ease, transform 280ms ease;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-8px);
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
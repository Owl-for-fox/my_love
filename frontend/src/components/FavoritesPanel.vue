<script setup lang="ts">
import { watch } from 'vue'
import { useFavorites } from '../composables/useFavorites'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const { favorites, remove } = useFavorites()

watch(
  () => props.open,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  },
)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="open"
      class="overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Избранные комплименты"
      tabindex="-1"
      @click.self="emit('close')"
      @keydown="onKeydown"
    >
      <div class="panel">
        <div class="handle" aria-hidden="true"></div>

        <header class="head">
          <h2>Избранное</h2>
          <button class="close" aria-label="Закрыть" @click="emit('close')">×</button>
        </header>

        <div class="list" :class="{ empty: favorites.length === 0 }">
          <p v-if="favorites.length === 0" class="empty-text">
            Здесь пока пусто. Нажми ♥ рядом с понравившимся комплиментом — и он появится тут.
          </p>

          <ul v-else>
            <li v-for="item in favorites" :key="item" class="item">
              <span class="item-text">{{ item }}</span>
              <button
                class="remove"
                aria-label="Удалить из избранного"
                @click="remove(item)"
              >
                ×
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(26, 26, 26, 0.32);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 50;
}

.panel {
  width: 100%;
  max-width: 560px;
  background: var(--card-bg);
  border-radius: 24px 24px 0 0;
  box-shadow: var(--shadow);
  padding: 0.75rem 1.25rem 1.5rem;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
}

.handle {
  width: 44px;
  height: 4px;
  border-radius: 2px;
  background: var(--border);
  margin: 0.25rem auto 0.75rem;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.25rem 0.75rem;
  border-bottom: 1px solid var(--border);
}

.head h2 {
  font-size: 1.15rem;
  font-weight: 600;
}

.close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.5rem;
  line-height: 1;
  color: var(--text-muted);
  transition: background-color 160ms ease, color 160ms ease;
}

.close:hover {
  background: rgba(0, 0, 0, 0.04);
  color: var(--text-primary);
}

.list {
  overflow-y: auto;
  padding: 0.75rem 0.25rem 0;
  flex: 1 1 auto;
}

.list.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 140px;
}

.empty-text {
  color: var(--text-muted);
  text-align: center;
  max-width: 28ch;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-page);
}

.item-text {
  flex: 1 1 auto;
  font-size: 0.98rem;
  color: var(--text-primary);
}

.remove {
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 1.1rem;
  color: var(--text-muted);
  transition: background-color 160ms ease, color 160ms ease;
}

.remove:hover {
  background: rgba(255, 183, 197, 0.25);
  color: var(--accent-hover);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity 260ms ease;
}

.slide-up-enter-active .panel,
.slide-up-leave-active .panel {
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
}

.slide-up-enter-from .panel,
.slide-up-leave-to .panel {
  transform: translateY(100%);
}
</style>
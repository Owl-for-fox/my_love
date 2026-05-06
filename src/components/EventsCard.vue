<script lang="ts"
        setup>
import {computed} from 'vue'
import {events} from '../data/events'

function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const today = new Date().toLocaleDateString('ru-RU', {
  day: 'numeric',
  month: 'long',
})

const todayEvents = computed(() => events.filter((e) => e.date === todayKey()))
</script>

<template>
  <div v-if="todayEvents.length"
       class="events-card">
    <div class="events-head">
      <svg
          fill="none"
          height="24"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect height="18"
              rx="2"
              width="18"
              x="3"
              y="4" />
        <path d="M3 10h18" />
      </svg>
      <span class="events-title">События на {{ today }}</span>
    </div>

    <ul class="events-list">
      <li v-for="(ev, i) in todayEvents"
          :key="i"
          class="event-item">{{ ev.text }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.events-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.5rem 1.75rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.events-head {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
}

.events-title {
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--text-muted);
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.event-item {
  position: relative;
  padding: 0.1rem 0 0.1rem 1.1rem;
  font-size: 1.05rem;
  line-height: 1.45;
  color: var(--text-primary);
}

.event-item::before {
  content: '';
  position: absolute;
  left: 0.15rem;
  top: 0.85rem;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--decor-hover);
  opacity: 0.7;
}

@media (min-width: 640px) {
  .events-card {
    padding: 1.75rem 2.25rem 1.85rem;
  }

  .event-item {
    font-size: 1.15rem;
  }
}
</style>
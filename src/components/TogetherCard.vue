<script lang="ts"
        setup>
import {computed} from 'vue'

const START = new Date(2026, 3, 27)

function pluralDays(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'день'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'дня'
  return 'дней'
}

const now = new Date()
const startMidnight = new Date(START.getFullYear(), START.getMonth(), START.getDate())
const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())
const diff = Math.round((todayMidnight.getTime() - startMidnight.getTime()) / 86400000)
const days = Math.max(1, diff + 1)

const milestone = computed<'year' | 'month' | 'hundred' | null>(() => {
  if (days <= 0) return null
  const isYear = todayMidnight.getMonth() === startMidnight.getMonth()
      && todayMidnight.getDate() === startMidnight.getDate()
  if (isYear) return 'year'
  if (days % 10 === 0) return 'hundred'
  if (todayMidnight.getDate() === startMidnight.getDate()) return 'month'
  return null
})

const milestoneLabel = computed(() => {
  switch (milestone.value) {
    case 'year':
      return 'С годовщиной!'
    case 'hundred':
      return `Круглая дата: ${days} ${pluralDays(days)}!`
    case 'month':
      return 'Месячная годовщина!'
    default:
      return null
  }
})
</script>

<template>
  <div :class="['together-card', milestone ? `is-${milestone}` : '']">
    <div class="together-head">
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
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
      </svg>
      <span class="together-title">Мы вместе</span>
    </div>

    <div class="together-count">
      <span class="num">{{ days }}</span>
      <span class="unit">{{ pluralDays(days) }}</span>
    </div>

    <div v-if="milestoneLabel"
         class="together-milestone">{{ milestoneLabel }}
    </div>
  </div>
</template>

<style scoped>
.together-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.5rem 1.75rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: background 320ms ease, border-color 320ms ease, box-shadow 320ms ease;
}

.together-head {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--decor-hover);
}

.together-title {
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--text-muted);
}

.together-count {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  color: var(--text-primary);
}

.num {
  font-size: 1.4rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

.unit {
  font-size: 1.05rem;
  color: var(--text-muted);
}

.together-milestone {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.together-card.is-month {
  background: linear-gradient(135deg, #FFF1F4 0%, #FDE6EC 100%);
  border-color: #F5C7D1;
  box-shadow: 0 6px 24px rgba(240, 184, 194, 0.25);
}

.together-card.is-hundred {
  background: linear-gradient(135deg, #EFE6FB 0%, #E1D2F7 100%);
  border-color: #C9B5EE;
  box-shadow: 0 6px 24px rgba(189, 168, 230, 0.30);
}

.together-card.is-year {
  background: linear-gradient(135deg, #FFF5D9 0%, #FFE0A8 60%, #F8D2D9 100%);
  border-color: #F0C97A;
  box-shadow: 0 8px 28px rgba(232, 184, 90, 0.32);
}

.together-card.is-year .together-head,
.together-card.is-month .together-head {
  color: #C7536B;
}

@media (min-width: 640px) {
  .together-card {
    padding: 1.25rem 2.25rem 1rem;
  }

  .num {
    font-size: 1.6rem;
  }
}
</style>
<script lang="ts"
        setup>
defineEmits<{ start: [] }>()
</script>

<template>
  <div class="welcome">
    <div class="welcome-card">
      <div aria-hidden="true"
           class="welcome-heart">
        <svg class="lucide lucide-heart-icon lucide-heart"
             fill="none"
             height="52"
             stroke="currentColor"
             stroke-linecap="round"
             stroke-linejoin="round"
             stroke-width="2"
             viewBox="0 0 24 24"
             width="52"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        </svg>
      </div>

      <h1 class="welcome-title">Привет, Лисёнок</h1>
      <p class="welcome-subtitle">
        Этот сайт создан специально для тебя чтобы точно никогда не забывала какая ты)
      </p>

      <button class="welcome-btn"
              type="button"
              @click="$emit('start')">
        Начать
      </button>
    </div>
  </div>
</template>

<style scoped>
.welcome {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.welcome-card {
  width: 100%;
  max-width: 420px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 2.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.welcome-heart {
  color: var(--decor-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 4px solid var(--decor-hover);
  margin-bottom: 0.25rem;
}

.welcome-title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.welcome-subtitle {
  color: var(--text-muted);
  font-size: 0.98rem;
  line-height: 1.55;
}

.welcome-btn {
  margin-top: 0.75rem;
  width: 100%;
  max-width: 320px;
  padding: 0.95rem 2rem;
  border-radius: var(--radius);
  background: var(--accent);
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  box-shadow: var(--shadow);
  transition: background-color 160ms ease, transform 120ms ease;
}

.welcome-btn:hover {
  background: var(--accent-hover);
}

.welcome-btn:active {
  transform: scale(0.97);
}

@media (min-width: 720px) {
  .welcome-card {
    padding: 3rem 2.25rem;
  }

  .welcome-title {
    font-size: 1.85rem;
  }
}
</style>
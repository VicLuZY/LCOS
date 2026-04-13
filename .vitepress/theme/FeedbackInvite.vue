<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const expanded = ref(false)
const dismissed = ref(false)
const tabRef = ref<HTMLButtonElement | null>(null)

const storageKey = 'lcos-feedback-hidden'

function onDocKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && expanded.value) {
    expanded.value = false
    tabRef.value?.focus()
  }
}

function toggle() {
  expanded.value = !expanded.value
}

function hideForSession() {
  try {
    sessionStorage.setItem(storageKey, '1')
  } catch {
    /* ignore */
  }
  dismissed.value = true
}

onMounted(() => {
  try {
    if (sessionStorage.getItem(storageKey) === '1') dismissed.value = true
  } catch {
    /* ignore */
  }
  document.addEventListener('keydown', onDocKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onDocKey)
})
</script>

<template>
  <div
    v-if="!dismissed"
    class="lcos-feedback-root"
    :data-expanded="expanded ? 'true' : 'false'"
    role="complementary"
    aria-label="Reader feedback"
  >
    <button
      ref="tabRef"
      type="button"
      class="lcos-feedback-tab"
      :aria-expanded="expanded"
      aria-controls="lcos-feedback-panel"
      @click="toggle"
      @touchstart.passive="() => {}"
    >
      <span aria-hidden="true">💬</span>
      <span>Feedback</span>
      <span class="lcos-chevron" aria-hidden="true">▼</span>
    </button>
    <div id="lcos-feedback-panel" class="lcos-feedback-panel" role="region" aria-labelledby="lcos-feedback-title">
      <p id="lcos-feedback-title" class="lcos-feedback-title">Comments welcome</p>
      <p class="lcos-feedback-body">
        Share questions, corrections, or ideas in the LCOS GitHub Discussions thread. Reading is public; posting uses
        your GitHub account.
      </p>
      <div class="lcos-feedback-actions">
        <a
          href="https://github.com/VicLuZY/LCOS/discussions"
          target="_blank"
          rel="noopener noreferrer"
        >Open discussions</a>
        <button type="button" class="lcos-feedback-dismiss" @click.stop="hideForSession" @touchstart.passive="() => {}">
          Hide for this session
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lcos-feedback-root {
  --lcos-fg: #24292f;
  --lcos-bg: rgba(255, 255, 255, 0.94);
  --lcos-border: rgba(27, 31, 36, 0.15);
  --lcos-accent: #0969da;
  --lcos-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  position: fixed;
  right: max(12px, env(safe-area-inset-right));
  bottom: max(12px, env(safe-area-inset-bottom));
  z-index: 9998;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  line-height: 1.45;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: 8px;
}

.lcos-feedback-root * {
  box-sizing: border-box;
}

.lcos-feedback-panel {
  position: absolute;
  right: 0;
  bottom: calc(100% + 8px);
  width: min(320px, calc(100vw - 24px));
  max-height: min(70vh, 420px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: var(--lcos-bg);
  border: 1px solid var(--lcos-border);
  border-radius: 12px;
  box-shadow: var(--lcos-shadow);
  padding: 14px 14px 12px;
  opacity: 0;
  transform: translateY(6px);
  pointer-events: none;
  visibility: hidden;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0.2s;
}

.lcos-feedback-root[data-expanded='true'] .lcos-feedback-panel {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
  pointer-events: auto;
}

.lcos-feedback-tab {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid var(--lcos-border);
  border-radius: 999px;
  background: var(--lcos-bg);
  box-shadow: var(--lcos-shadow);
  color: var(--lcos-fg);
  cursor: pointer;
  font: inherit;
  touch-action: manipulation;
  -webkit-tap-highlight-color: rgba(9, 105, 218, 0.18);
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    transform 0.12s ease,
    box-shadow 0.12s ease;
}

.lcos-feedback-tab:active {
  transform: scale(0.97);
  border-color: rgba(9, 105, 218, 0.45);
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

@media (hover: hover) and (pointer: fine) {
  .lcos-feedback-tab:hover {
    border-color: rgba(9, 105, 218, 0.35);
    background: #fff;
  }
}

.lcos-feedback-tab:focus-visible {
  outline: 2px solid var(--lcos-accent);
  outline-offset: 2px;
}

@media (pointer: coarse) {
  .lcos-feedback-tab {
    padding: 12px 16px;
    min-height: 44px;
    font-size: 15px;
  }
}

.lcos-feedback-tab .lcos-chevron {
  display: inline-block;
  transition: transform 0.2s ease;
  font-size: 0.65em;
  opacity: 0.65;
}

.lcos-feedback-root[data-expanded='true'] .lcos-feedback-tab .lcos-chevron {
  transform: rotate(180deg);
}

.lcos-feedback-title {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--lcos-fg);
}

.lcos-feedback-body {
  margin: 0 0 12px;
  color: #57606a;
  font-size: 13px;
}

.lcos-feedback-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.lcos-feedback-actions a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--lcos-accent);
  color: #fff !important;
  text-decoration: none !important;
  font-weight: 600;
  font-size: 13px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0.25);
  transition:
    filter 0.12s ease,
    transform 0.12s ease;
}

.lcos-feedback-actions a:active {
  transform: scale(0.98);
  filter: brightness(1.08);
}

@media (hover: hover) and (pointer: fine) {
  .lcos-feedback-actions a:hover {
    filter: brightness(1.05);
  }
}

.lcos-feedback-actions a:focus-visible {
  outline: 2px solid var(--lcos-accent);
  outline-offset: 2px;
}

.lcos-feedback-dismiss {
  border: none;
  background: transparent;
  color: #57606a;
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  padding: 8px 4px;
  margin: -4px;
  font-family: inherit;
  touch-action: manipulation;
  -webkit-tap-highlight-color: rgba(9, 105, 218, 0.12);
  border-radius: 6px;
  transition:
    color 0.12s ease,
    background 0.12s ease,
    transform 0.12s ease;
}

.lcos-feedback-dismiss:active {
  color: var(--lcos-fg);
  background: rgba(9, 105, 218, 0.06);
  transform: scale(0.98);
}

@media (hover: hover) and (pointer: fine) {
  .lcos-feedback-dismiss:hover {
    color: var(--lcos-fg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .lcos-feedback-panel,
  .lcos-feedback-tab .lcos-chevron {
    transition: none;
  }

  .lcos-feedback-tab,
  .lcos-feedback-actions a,
  .lcos-feedback-dismiss {
    transition: none;
  }

  .lcos-feedback-tab:active,
  .lcos-feedback-actions a:active,
  .lcos-feedback-dismiss:active {
    transform: none;
  }
}
</style>

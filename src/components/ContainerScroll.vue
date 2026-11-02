<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Terjemahan Vue dari container-scroll-animation (React/aceternity).
// Tanpa framer-motion: scroll progress dihitung manual via rAF.
const containerRef = ref(null)
const isMobile = ref(false)
const progress = ref(0)

const clamp = (n, a, b) => Math.min(b, Math.max(a, n))
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

let raf = null
function update() {
  const el = containerRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  const total = rect.height + vh
  progress.value = clamp((vh - rect.top) / total, 0, 1)
}
function requestTick() {
  if (!raf) raf = requestAnimationFrame(() => { raf = null; update() })
}

const rotate = computed(() =>
  prefersReducedMotion() ? 0 : 20 * (1 - progress.value))
const scale = computed(() => {
  const s = isMobile.value ? 0.7 : 1.05
  const e = isMobile.value ? 0.9 : 1
  return s + (e - s) * progress.value
})
const translateY = computed(() =>
  prefersReducedMotion() ? 0 : -100 * progress.value)

const cardStyle = computed(() => ({
  transform: `rotateX(${rotate.value}deg) scale(${scale.value})`,
  boxShadow:
    '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
}))

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  window.addEventListener('scroll', requestTick, { passive: true })
  window.addEventListener('resize', requestTick)
  update()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
  window.removeEventListener('scroll', requestTick)
  window.removeEventListener('resize', requestTick)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <div ref="containerRef" class="cs-wrap">
    <div class="cs-inner" :style="{ perspective: '1000px' }">
      <header class="cs-header">
        <div class="cs-title" :style="{ transform: `translateY(${translateY}px)` }">
          <slot name="title" />
        </div>
      </header>

      <div class="cs-card" :style="cardStyle">
        <div class="cs-card-inner">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cs-wrap {
  height: 60rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0.5rem;
}

.cs-inner {
  padding: 2.5rem 0;
  width: 100%;
  position: relative;
}

.cs-header {
  max-width: 64rem;
  margin: 0 auto;
  text-align: center;
}

.cs-title {
  will-change: transform;
}

.cs-card {
  max-width: 64rem;
  margin: -3rem auto 0;
  height: 30rem;
  width: 100%;
  border: 4px solid #6c6c6c;
  padding: 0.5rem;
  background: #222222;
  border-radius: 30px;
  transform-style: preserve-3d;
  will-change: transform;
}

.cs-card-inner {
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 2px;
  background: #f3f4f6;
}

@media (min-width: 768px) {
  .cs-wrap { height: 80rem; padding: 5rem; }
  .cs-inner { padding: 10rem 0; }
  .cs-card { height: 40rem; padding: 1.5rem; }
  .cs-card-inner { border-radius: 16px; padding: 1rem; }
}
</style>

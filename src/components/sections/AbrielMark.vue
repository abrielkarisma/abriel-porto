<template>
  <section ref="root" class="mark" data-ui aria-label="Signature Abriel">
    <div class="mark-reveal" ref="reveal" aria-hidden="true">ABRIEL</div>
    <p class="mark-hint" aria-hidden="true">terus gulir untuk membuka</p>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const root = ref(null)
const reveal = ref(null)

let reduced = false

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

// p = seberapa jauh section "dimakan" scroll dari bawah (0 → 1)
const computeP = () => {
  const sec = root.value
  const r = sec.getBoundingClientRect()
  const h = r.height
  if (h <= 0) return 0
  return clamp((innerHeight - r.top) / h, 0, 1)
}

const apply = () => {
  const el = reveal.value
  if (!el) return
  const p = computeP()
  el.style.opacity = String(0.1 + p * 0.9)
  const y = (1 - p) * 55
  const s = 0.55 + p * 0.45
  el.style.transform = `translate3d(-50%, calc(-50% + ${y}vh), 0) scale(${s})`
  el.style.setProperty('--p', p)
}

const onScroll = () => apply()

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    reveal.value.style.opacity = '1'
    reveal.value.style.transform = 'translate3d(-50%,-50%,0) scale(1)'
    return
  }
  apply()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<style scoped>
.mark {
  position: relative;
  height: 240lvh;   /* tinggi: butuh banyak scroll buat buka penuh → terasa berat */
  min-height: 1200px;
  background: var(--blk);
  color: var(--cream);
}

.mark-reveal {
  position: absolute;
  left: 50%;
  top: 55%;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(5rem, 20vw, 17rem);
  letter-spacing: -0.04em;
  line-height: 0.9;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  color: var(--gray);
  opacity: 0.1;
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;
  z-index: 0;
}

.mark-hint {
  position: absolute;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  color: var(--cream-dim);
  opacity: 0.8;
  animation: hintPulse 2.2s ease-in-out infinite;
  z-index: 2;
}

@keyframes hintPulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .mark-hint { display: none; }
}
</style>

<template>
  <section ref="root" class="mark" data-ui aria-label="Signature Abriel">
    <div class="mark-reveal" ref="reveal" aria-hidden="true">ABRIEL</div>
    <p class="mark-hint" aria-hidden="true">terus gulir untuk membuka</p>
    <div class="mark-scrollspacer" aria-hidden="true"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const root = ref(null)
const reveal = ref(null)

let reduced = false

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

// p = jarak ke dasar dokumen: 0 saat jauh, 1 tepat di dasar
const computeP = () => {
  const maxP = document.documentElement.scrollHeight - innerHeight
  if (maxP <= 0) return 1
  const start = Math.max(0, maxP - 1600) // mulai reveal 1600px sebelum dasar
  return clamp((window.scrollY - start) / (maxP - start), 0, 1)
}

const apply = () => {
  const el = reveal.value
  if (!el) return
  const p = computeP()
  // opacity: samar di 0.08 → penuh di 1
  el.style.opacity = String(0.08 + p * 0.92)
  // posisi & scale: turun + kecil saat samar, naik ke tengah saat penuh
  const y = (1 - p) * 30 // 30% turun dari baseline
  const s = 0.72 + p * 0.28
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
  height: 100lvh;
  min-height: 540px;
  background: var(--blk);
  color: var(--cream);
}

.mark-reveal {
  position: fixed;
  left: 50%;
  top: 52%;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(6rem, 24vw, 20rem);
  letter-spacing: -0.04em;
  line-height: 0.9;
  white-space: nowrap;
  color: var(--blk-2);
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

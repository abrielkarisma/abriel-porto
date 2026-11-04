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

let p = 0          // progress 0 → 1
let open = false    // sudah kebuka penuh (stay)
let idleTimer = null
let frameTimer = null
let lastY = 0
let touching = false

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

const easeOutElastic = (t) => {
  const c4 = (2 * Math.PI) / 3
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
}
const easeOutPower2 = (t) => 1 - Math.pow(1 - t, 2)

const apply = () => {
  const el = reveal.value
  if (!el) return
  el.style.opacity = String(0.08 + p * 0.92)
  const y = (1 - p) * 30
  const s = 0.72 + p * 0.28
  el.style.transform = `translate3d(-50%, calc(-50% + ${y}vh), 0) scale(${s})`
  el.style.setProperty('--p', p)
}

const clearTimers = () => {
  if (idleTimer) { clearTimeout(idleTimer); idleTimer = null }
  if (frameTimer) { clearTimeout(frameTimer); frameTimer = null }
}

const animateTo = (target, dur, ease) => {
  clearTimers()
  const from = p
  const t0 = performance.now()
  const step = () => {
    const t = clamp((performance.now() - t0) / dur, 0, 1)
    p = from + (target - from) * ease(t)
    apply()
    if (t < 1) {
      frameTimer = setTimeout(step, 16)
    } else {
      p = target
      apply()
      frameTimer = null
    }
  }
  frameTimer = setTimeout(step, 16)
}

const snapBack = () => {
  if (open) return
  animateTo(0, 900, easeOutElastic)
}

const isAtBottom = () =>
  window.scrollY >= document.documentElement.scrollHeight - innerHeight - 2

const onWheel = (e) => {
  if (open || !isAtBottom()) return
  e.preventDefault()

  if (e.deltaY > 0) {
    p = clamp(p + Math.abs(e.deltaY) / 2600, 0, 1)
    clearTimers()
    apply()
    if (p >= 1) {
      open = true
    } else {
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = setTimeout(snapBack, 250)
    }
  } else {
    if (!open) {
      animateTo(0, 350, easeOutPower2)
    }
  }
}

const onTouchStart = (e) => {
  if (open) return
  lastY = e.touches[0].clientY
  touching = true
}

const onTouchMove = (e) => {
  if (open || !touching) return
  if (!isAtBottom()) return
  const d = lastY - e.touches[0].clientY
  lastY = e.touches[0].clientY
  if (d > 0) {
    e.preventDefault()
    p = clamp(p + d / 1400, 0, 1)
    clearTimers()
    apply()
    if (p >= 1) {
      open = true
      touching = false
    } else {
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = setTimeout(snapBack, 250)
    }
  }
}

const onTouchEnd = () => {
  touching = false
  if (!open) snapBack()
}

const onScroll = () => {
  // keluar dari dasar (scroll balik ke atas) → reset, buka lagi nanti
  if (!isAtBottom()) {
    if (open) open = false
    if (p > 0) animateTo(0, 350, easeOutPower2)
  }
}

onMounted(() => {
  apply()
  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('touchstart', onTouchStart, { passive: false })
  window.addEventListener('touchmove', onTouchMove, { passive: false })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
})

onUnmounted(() => {
  clearTimers()
  window.removeEventListener('wheel', onWheel)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', onTouchEnd)
})
</script>

<style scoped>
.mark {
  position: relative;
  height: 100lvh;
  min-height: 540px;
  background: var(--blk);
  color: var(--cream);
  overscroll-behavior: contain;
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
  color: var(--gray);
  opacity: 0.5;
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

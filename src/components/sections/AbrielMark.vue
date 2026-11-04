<template>
  <section ref="root" class="mark" data-ui aria-label="Signature Abriel">
    <div class="mark-reveal">
      <span class="mark-glyph" aria-hidden="true">ABRIEL</span>
    </div>
    <p class="mark-hint" aria-hidden="true">terus gulir untuk membuka</p>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const root = ref(null)
const progress = ref(0)

let open = false
let idleTimer = null
let timer = null
let lastY = 0
let capturingTouch = false
let reduced = false

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

const apply = () => {
  const el = root.value
  if (!el) return
  const p = progress.value
  const reveal = el.querySelector('.mark-reveal')
  if (reveal) {
    reveal.style.transform = `translateY(${(1 - p) * 52}%) scale(${0.92 + p * 0.08})`
    reveal.style.opacity = String(0.5 + p * 0.5)
  }
  el.style.setProperty('--p', p)
}

const easeOutPower2 = (t) => 1 - Math.pow(1 - t, 2)
// elastic yang "ngebanting": overshoot lalu settle
const easeOutElastic = (t) => {
  const c4 = (2 * Math.PI) / 3
  if (t === 0 || t === 1) return t
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
}

let animFrom = 0
let animTarget = 0
let animStart = 0
let animDur = 0
let animEase = easeOutPower2

const frame = (now) => {
  const t = Math.min(1, (now - animStart) / animDur)
  progress.value = animFrom + (animTarget - animFrom) * animEase(t)
  apply()
  if (t < 1) {
    timer = setTimeout(() => frame(performance.now()), 16)
  } else {
    progress.value = animTarget
    apply()
    timer = null
  }
}

const animateTo = (target, dur = 350, ease = easeOutPower2) => {
  if (timer) clearTimeout(timer)
  animFrom = progress.value
  animTarget = target
  animStart = performance.now()
  animDur = dur
  animEase = ease
  timer = setTimeout(() => frame(performance.now()), 16)
}

const snapClosed = () => {
  if (open) return
  animateTo(0, 950, easeOutElastic)
}

const scheduleIdle = () => {
  clearTimeout(idleTimer)
  idleTimer = setTimeout(() => { if (!open) snapClosed() }, 550)
}

const activeRect = () => {
  const r = root.value.getBoundingClientRect()
  return r.top < innerHeight && r.bottom > 0
}

const onWheel = (e) => {
  if (reduced) return
  if (!activeRect()) return
  if (open) return // biarkan scroll native lanjut ke footer
  e.preventDefault()
  const dir = e.deltaY > 0 ? 1 : -1
  let step = e.deltaMode === 1 ? 0.03 : Math.abs(e.deltaY) / 900
  if (dir < 0) step = Math.min(step, progress.value + 0.0001)
  const next = clamp(progress.value + dir * step, 0, 1)
  if (timer) clearTimeout(timer)
  progress.value = next
  apply()
  if (next >= 0.999) {
    open = true
    clearTimeout(idleTimer)
    return
  }
  scheduleIdle()
}

const onScroll = () => {
  // reset saat mark keluar viewport (scroll balik ke atas)
  if (!activeRect() && !open) {
    if (progress.value > 0) animateTo(0, 250)
  }
}

const onTouchStart = (e) => {
  if (open) return
  if (!activeRect()) return
  capturingTouch = true
  lastY = e.touches[0].clientY
}

const onTouchMove = (e) => {
  if (!capturingTouch || open || reduced) return
  if (!activeRect()) return
  const y = e.touches[0].clientY
  const dy = lastY - y
  lastY = y
  e.preventDefault()
  if (timer) clearTimeout(timer)
  progress.value = clamp(progress.value + dy / 220, 0, 1)
  apply()
  if (progress.value >= 0.999) {
    open = true
    clearTimeout(idleTimer)
  } else {
    scheduleIdle()
  }
}

const onTouchEnd = () => {
  capturingTouch = false
  if (!open) scheduleIdle()
}

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    open = true
    progress.value = 1
    apply()
    return
  }
  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: false })
  window.addEventListener('touchend', onTouchEnd)
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('wheel', onWheel)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', onTouchEnd)
  window.removeEventListener('scroll', onScroll)
  clearTimeout(idleTimer)
  if (timer) clearTimeout(timer)
})
</script>

<style scoped>
.mark {
  position: relative;
  height: 100lvh;
  min-height: 520px;
  overflow: hidden;
  background: var(--blk);
  color: var(--cream);
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.mark-reveal {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1.5rem;
  will-change: transform, opacity;
}

.mark-glyph {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(6rem, 26vw, 22rem);
  letter-spacing: -0.04em;
  line-height: 0.9;
  color: var(--blk-2);
  user-select: none;
  pointer-events: none;
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
}

@keyframes hintPulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .mark-reveal { transform: none !important; opacity: 1 !important; }
  .mark-hint { display: none; }
}
</style>

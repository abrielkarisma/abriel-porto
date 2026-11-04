<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// PRNG ber-seed → bentuk blob stabil tiap load, tapi acak & organik
function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(20261104)
const BLOBS = Array.from({ length: 18 }, () => ({
  x: 8 + rand() * 84,
  y: 8 + rand() * 84,
  r: 14 + rand() * 22, // radius maks dalam %
}))

const active = ref(false)
let progress = 0
let timer = 0

const fgStyle = ref({ maskImage: 'none', WebkitMaskImage: 'none' })

const DURATION = 650

function buildMask(p) {
  return BLOBS.map((b) => {
    const rr = Math.max(0.5, b.r * p)
    return `radial-gradient(circle at ${b.x.toFixed(1)}% ${b.y.toFixed(1)}%, #000 0 ${rr.toFixed(1)}%, rgba(0,0,0,0) calc(${rr.toFixed(1)}% + 5%))`
  }).join(',')
}

function apply(p) {
  fgStyle.value = { maskImage: buildMask(p), WebkitMaskImage: buildMask(p) }
}

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

function step(now) {
  const t = Math.min(1, (now - start) / DURATION)
  progress = from + (to - from) * easeOutCubic(t)
  apply(progress)
  if (t < 1) {
    timer = setTimeout(() => step(performance.now()), 16)
  }
}

let from = 0
let to = 0
let start = 0

function setActive(v) {
  active.value = v
  from = progress
  to = v ? 1 : 0
  start = performance.now()
  clearTimeout(timer)
  step(start)
}

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  progress = 0
  apply(0)
})

onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <div
    class="reveal-wrap"
    @mouseenter="setActive(true)"
    @mouseleave="setActive(false)"
    @click.stop.prevent
    @touchstart.stop.prevent="active ? setActive(false) : setActive(true)"
  >
    <img src="/images/char_rg.png" alt="Abriel karakter" class="rl-base" />
    <img
      src="/images/human_rg.png"
      alt="Abriel"
      class="rl-fg"
      :style="fgStyle"
    />
    <span class="rl-label">{{ active ? 'foto asli' : 'hover' }}</span>
  </div>
</template>

<style scoped>
.reveal-wrap {
  position: absolute;
  right: clamp(1rem, 6vw, 5rem);
  top: 50%;
  transform: translateY(-50%);
  width: clamp(210px, 30vw, 420px);
  aspect-ratio: 1 / 1;
  z-index: 20;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}

.rl-base,
.rl-fg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.rl-fg {
  will-change: mask-image;
}

.rl-label {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold);
  background: rgba(10, 10, 10, 0.45);
  border: 1px solid var(--line);
  padding: 0.3rem 0.7rem;
  backdrop-filter: blur(4px);
  pointer-events: none;
  white-space: nowrap;
}

@media (max-width: 700px) {
  .reveal-wrap {
    top: auto;
    bottom: 4.2rem;
    right: 50%;
    transform: translateX(50%);
    width: min(68vw, 340px);
  }
}
</style>

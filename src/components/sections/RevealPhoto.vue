<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const stamps = ref([])
const wrapEl = ref(null)

const fgStyle = ref({ maskImage: 'none', WebkitMaskImage: 'none' })

const MAX_STAMPS = 60
const BRUSH = 0.14 // ukuran kuas relatif ke sisi terkecil

function apply() {
  const list = stamps.value
  if (!list.length) {
    fgStyle.value = { maskImage: 'none', WebkitMaskImage: 'none' }
    return
  }
  const parts = list.map((s) => {
    const rr = s.r
    return `radial-gradient(circle at ${s.x.toFixed(1)}% ${s.y.toFixed(1)}%, #000 0 ${rr.toFixed(1)}px, rgba(0,0,0,0) calc(${rr.toFixed(1)}px + 9px))`
  })
  const mask = parts.join(',')
  fgStyle.value = { maskImage: mask, WebkitMaskImage: mask }
}

function addStamp(e) {
  const el = wrapEl.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  const r = Math.min(rect.width, rect.height) * BRUSH
  stamps.value.push({ x, y, r })
  if (stamps.value.length > MAX_STAMPS) stamps.value.shift()
  apply()
}

function clear() {
  stamps.value = []
  apply()
}

onMounted(() => apply())

onUnmounted(clear)
</script>

<template>
  <div
    ref="wrapEl"
    class="reveal-wrap"
    @pointermove="addStamp"
    @pointerleave="clear"
    @click.stop.prevent
  >
    <img src="/images/char_rg.png" alt="Abriel karakter" class="rl-base" />
    <img
      src="/images/human_rg.png"
      alt="Abriel"
      class="rl-fg"
      :style="fgStyle"
    />
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
  touch-action: none;
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

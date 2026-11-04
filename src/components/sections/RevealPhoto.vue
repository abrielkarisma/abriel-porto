<script setup>
import { ref, onUnmounted } from 'vue'

const stamps = ref([])
const wrapEl = ref(null)

const MAX_STAMPS = 80
const BRUSH = 0.10 // radius kuas relatif ke sisi terkecil

function addStamp(e) {
  const el = wrapEl.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  const r = Math.min(rect.width, rect.height) * BRUSH
  stamps.value.push({ x, y, r })
  if (stamps.value.length > MAX_STAMPS) stamps.value.shift()
}

function clear() {
  stamps.value = []
}

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
    <!-- foto asli: selalu di belakang -->
    <img src="/images/human_rg.png" alt="Abriel" class="rl-base" />

    <!-- karakter: di atas, dikikis lubang bulat pas di-sapu -->
    <img
      src="/images/char_rg.png"
      alt="Abriel karakter"
      class="rl-fg"
      style="mask: url(#brushMask); -webkit-mask: url(#brushMask)"
    />
    <svg class="rl-mask" aria-hidden="true" focusable="false">
      <defs>
        <mask id="brushMask" maskUnits="userSpaceOnUse">
          <rect width="100%" height="100%" fill="#fff" />
          <circle
            v-for="(s, i) in stamps"
            :key="i"
            :cx="s.x + '%'"
            :cy="s.y + '%'"
            :r="s.r + 'px'"
            fill="#000"
          />
        </mask>
      </defs>
    </svg>
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
  will-change: mask;
}

.rl-mask {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
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

<script setup>
import { ref, onUnmounted } from 'vue'

const stamps = ref([])
const wrapEl = ref(null)

const MAX_STAMPS = 120
const BRUSH = 0.12 // radius kuas (fraksi sisi, 0..1)

function addStamp(e) {
  const el = wrapEl.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height
  stamps.value.push({ x, y })
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

    <!-- karakter: di atas, lubang bulat bersih via mask (hitam = transparan) -->
    <img
      src="/images/char_rg.png"
      alt="Abriel karakter"
      class="rl-fg"
      style="-webkit-mask-image: url(#scratchMask); mask-image: url(#scratchMask)"
    />
    <svg class="rl-clip" aria-hidden="true" focusable="false">
      <defs>
        <mask id="scratchMask" maskContentUnits="objectBoundingBox">
          <rect x="0" y="0" width="1" height="1" fill="white" />
          <circle
            v-for="s in stamps"
            :key="s.x + '-' + s.y"
            :cx="s.x"
            :cy="s.y"
            :r="BRUSH"
            fill="black"
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
  will-change: mask-image;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

.rl-clip {
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

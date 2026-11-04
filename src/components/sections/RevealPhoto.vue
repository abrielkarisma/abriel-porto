<script setup>
import { ref, onUnmounted } from 'vue'

const stamps = ref([])
const wrapEl = ref(null)

const MAX_STAMPS = 80
const BRUSH = 0.10 // radius kuas (fraksi sisi, 0..1)

const clipPath = ref('M0 0 L1 0 L1 1 L0 1 Z')

function rebuildClip() {
  const list = stamps.value
  if (!list.length) {
    clipPath.value = 'M0 0 L1 0 L1 1 L0 1 Z'
    return
  }
  const parts = ['M0 0 L1 0 L1 1 L0 1 Z']
  for (const s of list) {
    const cx = s.x
    const cy = s.y
    const r = BRUSH
    parts.push(
      `M${(cx - r).toFixed(4)} ${cy.toFixed(4)} a${r.toFixed(4)} ${r.toFixed(4)} 0 1 0 ${(2 * r).toFixed(4)} 0 a${r.toFixed(4)} ${r.toFixed(4)} 0 1 0 ${(-2 * r).toFixed(4)} 0 Z`
    )
  }
  clipPath.value = parts.join('')
}

function addStamp(e) {
  const el = wrapEl.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height
  stamps.value.push({ x, y })
  if (stamps.value.length > MAX_STAMPS) stamps.value.shift()
  rebuildClip()
}

function clear() {
  stamps.value = []
  rebuildClip()
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
      style="clip-path: url(#scratchClip)"
    />
    <svg class="rl-clip" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="scratchClip" clipPathUnits="objectBoundingBox">
          <path
            :d="clipPath"
            clip-rule="evenodd"
            fill-rule="evenodd"
          />
        </clipPath>
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
  will-change: clip-path;
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

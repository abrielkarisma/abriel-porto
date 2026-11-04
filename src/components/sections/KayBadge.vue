<template>
  <div class="kay-badge" ref="badge" :style="style" @pointerdown="onDown" @click.stop.prevent role="img" aria-label="KAY">
    KAY
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue"

const badge = ref(null)

const pos = reactive({
  x: typeof window !== "undefined" ? window.innerWidth - 120 : 0,
  y: typeof window !== "undefined" ? 24 : 0,
  dragging: false,
})

const style = computed(() => ({
  left: pos.x + "px",
  top: pos.y + "px",
  cursor: pos.dragging ? "grabbing" : "grab",
}))

let dragging = false
let moved = false
let startX = 0
let startY = 0

const onDown = (e) => {
  e.preventDefault()
  e.stopPropagation()
  dragging = true
  moved = false
  startX = e.clientX - pos.x
  startY = e.clientY - pos.y
  pos.dragging = true
  window.addEventListener("pointermove", onMove)
  window.addEventListener("pointerup", onUp)
}

const onMove = (e) => {
  if (!dragging) return
  moved = true
  const nx = e.clientX - startX
  const ny = e.clientY - startY
  pos.x = Math.max(0, Math.min(window.innerWidth - badge.value.offsetWidth, nx))
  pos.y = Math.max(0, Math.min(window.innerHeight - badge.value.offsetHeight, ny))
}

const onUp = () => {
  dragging = false
  pos.dragging = false
  window.removeEventListener("pointermove", onMove)
  window.removeEventListener("pointerup", onUp)
}

onMounted(() => {
  pos.x = window.innerWidth - badge.value.offsetWidth - 24
  pos.y = 24
})

onUnmounted(() => {
  window.removeEventListener("pointermove", onMove)
  window.removeEventListener("pointerup", onUp)
})
</script>

<style scoped>
.kay-badge {
  position: fixed;
  z-index: 9999;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.4rem, 6vw, 4.5rem);
  letter-spacing: 0.02em;
  line-height: 1;
  color: #fff;
  mix-blend-mode: difference; /* warnanya otomatis ng-invert warna di belakangnya */
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
  padding: 4px 6px;
  will-change: left, top;
  pointer-events: auto;
}
</style>

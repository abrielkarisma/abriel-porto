<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useTheme } from './composables/useTheme'

const { init } = useTheme()

let raf = 0
let enabled = false
let dot, ring, glow

let mx = 0, my = 0
let rx = 0, ry = 0
let gx = 0, gy = 0

const setPos = (e) => {
  mx = e.clientX
  my = e.clientY
  if (dot) {
    // update dot langsung di event, jadi selalu ikut mouse walau rAF telat
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
  }
}

const loop = () => {
  rx += (mx - rx) * 0.16
  ry += (my - ry) * 0.16
  gx += (mx - gx) * 0.10
  gy += (my - gy) * 0.10
  dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
  ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
  glow.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`
  raf = requestAnimationFrame(loop)
}

const onOver = (e) => {
  const t = e.target
  if (t.closest && t.closest('a, button, .nav-menu li, .logo, input, textarea, .card, .portfolio-card, .service-card, .snapshot, .drag')) {
    ring.classList.add('is-hover')
    glow.classList.add('is-hover')
  } else {
    ring.classList.remove('is-hover')
    glow.classList.remove('is-hover')
  }
}

onMounted(() => {
  init()
  const finePointer = window.matchMedia('(pointer: fine)').matches
  const noTouch = navigator.maxTouchPoints === 0
  if (!finePointer && !noTouch) return
  enabled = true

  dot = document.createElement('div')
  dot.className = 'cursor-dot'
  ring = document.createElement('div')
  ring.className = 'cursor-ring'
  glow = document.createElement('div')
  glow.className = 'cursor-glow'
  document.body.appendChild(glow)
  document.body.appendChild(ring)
  document.body.appendChild(dot)

  document.documentElement.classList.add('has-cursor')

  mx = rx = gx = window.innerWidth / 2
  my = ry = gy = window.innerHeight / 2

  window.addEventListener('mousemove', setPos)
  document.addEventListener('mouseover', onOver)
  raf = requestAnimationFrame(loop)
})

onUnmounted(() => {
  if (!enabled) return
  cancelAnimationFrame(raf)
  window.removeEventListener('mousemove', setPos)
  document.removeEventListener('mouseover', onOver)
  if (dot) dot.remove()
  if (ring) ring.remove()
  if (glow) glow.remove()
  document.documentElement.classList.remove('has-cursor')
})
</script>

<template>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-family: 'Raleway', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

#app {
  min-height: 100vh;
  width: 100%;
  overflow: visible;
}

/* Custom cursor: kubangi native cursor cuma di perangkat pointer halus */
html.has-cursor,
html.has-cursor * {
  cursor: none !important;
}

.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 7px;
  height: 7px;
  margin: -1px;
  border-radius: 50%;
  background: #fff;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 2147483000;
  opacity: 0.95;
}

.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 38px;
  height: 38px;
  border: 1.5px solid rgba(255, 255, 255, 0.75);
  border-radius: 50%;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 2147482999;
  transition: width 0.25s ease, height 0.25s ease, border-color 0.25s ease, opacity 0.25s ease;
}

.cursor-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200, 162, 75, 0.30) 0%, rgba(200, 162, 75, 0.08) 45%, transparent 70%);
  filter: blur(2px);
  pointer-events: none;
  z-index: 2147482998;
  opacity: 0.55;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.cursor-ring.is-hover {
  width: 62px;
  height: 62px;
  border-color: rgba(200, 162, 75, 0.9);
}

.cursor-glow.is-hover {
  opacity: 0.9;
}

@media (prefers-reduced-motion: reduce) {
  .cursor-glow,
  .cursor-ring {
    display: none;
  }
}
</style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;800&display=swap');

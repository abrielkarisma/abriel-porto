<template>
  <section id="snapshots" ref="snapshotsSection" class="snapshots-section">
    <div class="wrap">
      <div class="section-head" :class="{ revealed: inView }">
        <span class="section-label">06 — Snapshots</span>
        <h2 class="section-title-sw">Snapshots</h2>
        <p class="section-sub-sw">A collection of captured moments that showcase my journey, experiences, and achievements throughout my academic and professional path.</p>
      </div>

      <div class="carousel-container" :class="{ revealed: inView }">
        <div class="tube3d-layout">
          <div class="tube3d-stage" ref="stage"
            @pointerdown.prevent="onPointerDown" @pointermove.prevent="onPointerMove"
            @pointerup.prevent="onPointerUp" @pointercancel.prevent="onPointerUp" @pointerleave.prevent="onPointerUp">
            <div v-for="(photo, index) in photos" :key="index" class="tube3d-card"
              :style="cardStyle(index)" :data-index="index" @click="openLightbox(index)">
              <div class="slide-image-container">
                <img :src="photo.src" :alt="photo.alt" class="slide-image" loading="lazy" />
              </div>
            </div>
          </div>
          <aside class="tube3d-panel">
            <div class="panel-head">
              <h3 ref="panelTitle" class="panel-title">{{ photos[current].title }}</h3>
              <div class="panel-rules" aria-hidden="true">
                <span class="rule rule-a"></span>
                <span class="rule rule-b"></span>
                <span class="rule rule-c"></span>
              </div>
            </div>
            <div class="panel-nav">
              <button class="nav-btn nav-up" @click="prev" aria-label="Previous photo">↑</button>
              <button class="nav-btn nav-down" @click="next" aria-label="Next photo">↓</button>
            </div>
          </aside>
        </div>
        <div class="carousel-indicators">
          <button v-for="(photo, index) in photos" :key="index" class="indicator"
            :class="{ active: index === current }" :aria-label="`Go to slide ${index + 1}`" @click="goTo(index)"></button>
        </div>
      </div>

      <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
        <div class="lightbox-content" @click.stop>
          <button class="lightbox-close" aria-label="Close" @click="closeLightbox">&times;</button>
          <img :src="photos[currentPhotoIndex].src" :alt="photos[currentPhotoIndex].alt" class="lightbox-image" />
          <div class="lightbox-info">
            <span class="lightbox-info-index">0{{ currentPhotoIndex + 1 }} / 0{{ photos.length }}</span>
            <h3>{{ photos[currentPhotoIndex].title }}</h3>
            <p>{{ photos[currentPhotoIndex].description }}</p>
          </div>
          <button class="lightbox-nav lightbox-prev" aria-label="Previous photo" @click="prevPhoto">‹</button>
          <button class="lightbox-nav lightbox-next" aria-label="Next photo" @click="nextPhoto">›</button>
        </div>
      </div>

      <div class="contact-section" :class="{ revealed: inView }">
        <div class="contact-head">
          <span class="section-label">Let's Connect</span>
          <h3 class="contact-title">Let's Connect</h3>
        </div>
        <div class="contact-cards">
          <a href="mailto:abrielcha.ac@gmail.com" class="contact-card email-card">
            <span class="contact-bullet"></span>
            <div class="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-10 5L2 7" />
              </svg>
            </div>
            <div class="contact-info">
              <span class="contact-type">Email</span>
              <span class="contact-value">abrielcha.ac@gmail.com</span>
            </div>
          </a>
          <a href="https://wa.me/6282266095743" target="_blank" rel="noopener noreferrer" class="contact-card whatsapp-card">
            <span class="contact-bullet"></span>
            <div class="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <div class="contact-info">
              <span class="contact-type">WhatsApp</span>
              <span class="contact-value">+62 822-6609-5743</span>
            </div>
          </a>
          <a href="https://instagram.com/abrielkarisma" target="_blank" rel="noopener noreferrer" class="contact-card instagram-card">
            <span class="contact-bullet"></span>
            <div class="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
            <div class="contact-info">
              <span class="contact-type">Instagram</span>
              <span class="contact-value">@abrielkarisma</span>
            </div>
          </a>
          <a href="https://github.com/abrielkarisma" target="_blank" rel="noopener noreferrer" class="contact-card github-card">
            <span class="contact-bullet"></span>
            <div class="contact-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div class="contact-info">
              <span class="contact-type">GitHub</span>
              <span class="contact-value">@abrielkarisma</span>
            </div>
          </a>
          <a href="https://linkedin.com/in/abrielkarisma25" target="_blank" rel="noopener noreferrer"
            class="contact-card linkedin-card">
            <span class="contact-bullet"></span>
            <div class="contact-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div class="contact-info">
              <span class="contact-type">LinkedIn</span>
              <span class="contact-value">in/abrielkarisma25</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
const inView = ref(false)
const snapshotsSection = ref(null)
import asprakImg from '@/assets/snapshots/asprak.jpg'
import dmlogistikImg from '@/assets/snapshots/dmlogistik.jpg'
import dmtimImg from '@/assets/snapshots/DMtim.jpg'
import talentImg from '@/assets/snapshots/talent.jpg'
import himseImg from '@/assets/snapshots/himse.jpg'
import ieeeImg from '@/assets/snapshots/ieee.jpg'
import ieeemeetImg from '@/assets/snapshots/ieeemeet.jpg'
import itmsibImg from '@/assets/snapshots/itmsib.jpg'
import meetIeeeImg from '@/assets/snapshots/meet ieee.jpg'
import msibalfathImg from '@/assets/snapshots/msibalfath.jpg'
import pameranprodiImg from '@/assets/snapshots/pameranprodi.jpg'
import pameranrfcImg from '@/assets/snapshots/pameranrfc.jpg'
import panitiadmImg from '@/assets/snapshots/panitiadm.jpg'
import wisewiresImg from '@/assets/snapshots/wisewiresteam.jpg'
const photos = ref([
  {
    src: wisewiresImg,
    alt: 'Wisewires Team',
    title: 'Wisewires Team',
    description: 'Member of the Wisewires Indonesia'
  },{
    src: asprakImg,
    alt: 'Laboratory Assistant',
    title: 'Laboratory Assistant',
    description: 'Mobile Programming Lab Assistant at Telkom University Surabaya'
  },
  {
    src: dmlogistikImg,
    alt: 'Logistic Team',
    title: 'Logistic Team Campus Orientation Committee',
    description: 'Add your description here'
  },
  {
    src: dmtimImg,
    alt: 'Campus Orientation Committee',
    title: 'Campus Orientation Committee',
    description: 'Add your description here'
  },
  {
    src: talentImg,
    alt: 'Various Content of Me as a Talent',
    title: 'Various Content of Me as a Talent',
    description: 'Add your description here'
  },
  {
    src: himseImg,
    alt: 'HIMSE',
    title: 'Software Engineering Student Association',
    description: 'Add your description here'
  },
  {
    src: ieeeImg,
    alt: 'IEEE Visit',
    title: 'IEEE Visit',
    description: 'Add your description here'
  },
  {
    src: ieeemeetImg,
    alt: 'IEEE Team Meeting',
    title: 'IEEE Team Meeting',
    description: 'Add your description here'
  },
  {
    src: itmsibImg,
    alt: 'Alfath Intern IT Division',
    title: 'Alfath Intern IT Division',
    description: 'Add your description here'
  },
  {
    src: meetIeeeImg,
    alt: 'IEEE Team Discussion',
    title: 'IEEE Team Discussion',
    description: 'Add your description here'
  },
  {
    src: msibalfathImg,
    alt: 'MSIB Batch 6 at Alfath Corporation',
    title: 'MSIB Batch 6 at Alfath Corporation',
    description: 'Add your description here'
  },
  {
    src: pameranprodiImg,
    alt: 'Representing Software Engineering at Campus Expo',
    title: 'Representing Software Engineering at Campus Expo',
    description: 'Add your description here'
  },
  {
    src: pameranrfcImg,
    alt: 'RFC Showcase',
    title: 'RFC Showcase',
    description: 'Add your description here'
  },
  {
    src: panitiadmImg,
    alt: 'Campus Orientation Committee',
    title: 'Campus Orientation Committee',
    description: 'Add your description here'
  },
])
const current = ref(0)
const dragging = ref(false)
const startY = ref(0)
const deltaY = ref(0)
const autoPlay = ref(true)
let autoPlayInterval = null

const normOffset = (i) => {
  const n = photos.value.length
  const half = Math.floor(n / 2)
  let rel = i - current.value
  if (rel > half) rel -= n
  if (rel < -half) rel += n
  return rel
}

const cardStyle = (i) => {
  const rel = normOffset(i)
  const dist = Math.abs(rel)
  let y = rel * 72
  if (dragging.value) y += deltaY.value * 0.06
  const scale = Math.max(0.35, 1 - dist * 0.16)
  const rotX = -rel * 3
  const z = -dist * 80
  // hanya 5 kartu terlihat: aktif + 2 atas + 2 bawah
  const visible = dist <= 2
  const opacity = visible ? (dist === 0 ? 1 : 0.92 - dist * 0.12) : 0
  const filter = rel === 0 ? 'brightness(1.12) contrast(1.06)' : 'grayscale(1) brightness(1.25) contrast(0.9)'
  return {
    transform: `translate(-50%, calc(-50% + ${y}px)) scale(${scale}) rotateX(${rotX}deg) translateZ(${z}px)`,
    opacity,
    filter,
    zIndex: 100 - dist,
  }
}

const animatePanel = () => {
  const t = panelTitle.value
  if (!t) return
  gsap.fromTo(t, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
}

const next = () => {
  current.value = (current.value + 1) % photos.value.length
  animatePanel()
}
const prev = () => {
  current.value = (current.value - 1 + photos.value.length) % photos.value.length
  animatePanel()
}
const goTo = (index) => {
  current.value = index
  animatePanel()
}

const onPointerDown = (e) => {
  dragging.value = true
  startY.value = e.clientY
  deltaY.value = 0
}
const onPointerMove = (e) => {
  if (!dragging.value) return
  deltaY.value = e.clientY - startY.value
}
const onPointerUp = () => {
  if (!dragging.value) return
  dragging.value = false
  if (deltaY.value < -60) next()
  else if (deltaY.value > 60) prev()
  deltaY.value = 0
}
const startAutoPlay = () => {
  if (autoPlay.value) autoPlayInterval = setInterval(() => { next() }, 4000)
}
const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}
const lightboxOpen = ref(false)
const currentPhotoIndex = ref(0)
const panelTitle = ref(null)
const openLightbox = (index) => {
  currentPhotoIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}
const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = 'auto'
}
const nextPhoto = () => {
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % photos.value.length
}
const prevPhoto = () => {
  currentPhotoIndex.value = currentPhotoIndex.value === 0
    ? photos.value.length - 1
    : currentPhotoIndex.value - 1
}
const handleKeydown = (event) => {
  if (!lightboxOpen.value) return
  if (event.key === 'Escape') {
    closeLightbox()
  } else if (event.key === 'ArrowRight') {
    nextPhoto()
  } else if (event.key === 'ArrowLeft') {
    prevPhoto()
  }
}
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  startAutoPlay()
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        inView.value = true
      }
    })
  }, { threshold: 0.12 })
  if (snapshotsSection.value) {
    io.observe(snapshotsSection.value)
  }
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  stopAutoPlay()
})
</script>
<style scoped>
.snapshots-section {
  background: var(--blk);
  padding: 5.5rem 0;
  border-top: 1px solid var(--line);
}

.section-head,
.carousel-container,
.contact-section {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.section-head.revealed,
.carousel-container.revealed,
.contact-section.revealed {
  opacity: 1;
  transform: translateY(0);
}

.carousel-container {
  margin-top: 3.5rem;
}

.tube3d-layout {
  display: grid;
  grid-template-columns: 1fr minmax(220px, 300px);
  gap: 2.5rem;
  align-items: center;
}

.tube3d-stage {
  position: relative;
  height: clamp(360px, 52vw, 520px);
  perspective: 1400px;
  cursor: grab;
  touch-action: pan-y;
}

.tube3d-stage:active {
  cursor: grabbing;
}

.tube3d-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(500px, 100%);
  aspect-ratio: 4 / 3;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--line);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
  will-change: transform, opacity, filter;
  transition: transform 0.6s cubic-bezier(0.22, 0.9, 0.33, 1), opacity 0.45s ease, filter 0.45s ease;
  cursor: pointer;
}

.slide-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--blk-3);
  border-radius: 6px;
  border: 1px solid var(--line);
  transition: border-color 0.3s;
}

.slide-image-container:hover {
  border-color: var(--gold);
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-image-container:hover .slide-image {
  transform: scale(1.06);
}

.tube3d-panel {
  border-left: 1px solid var(--line);
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.panel-head {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.panel-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2.4vw, 1.8rem);
  text-transform: uppercase;
  line-height: 1.05;
  color: var(--gold);
}

.panel-rules {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.panel-rules .rule {
  display: block;
  height: 2px;
  border-radius: 2px;
}

.panel-rules .rule-a {
  width: 100%;
  background: var(--gold);
  opacity: 0.9;
}

.panel-rules .rule-b {
  width: 72%;
  background: var(--gold);
  opacity: 0.45;
}

.panel-rules .rule-c {
  width: 44%;
  background: var(--gold);
  opacity: 0.25;
}

.panel-nav {
  display: flex;
  gap: 0.6rem;
}

.nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--cream-dim);
  font-family: var(--font-mono);
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.25s, color 0.25s, background 0.25s, transform 0.25s;
}

.nav-btn:hover {
  border-color: var(--gold);
  color: var(--gold);
  background: var(--blk-3);
  transform: translateY(-2px);
}

.nav-btn:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

.carousel-btn {
  background: transparent;
  border: 1px solid var(--line);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 1.6rem;
  color: var(--cream-dim);
  transition: border-color 0.25s, color 0.25s, background 0.25s;
  flex-shrink: 0;
}

.carousel-btn:hover:not(:disabled) {
  border-color: var(--gold);
  color: var(--gold);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.arrow-left,
.arrow-right {
  font-style: normal;
  line-height: 1;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.75rem;
}

.indicator {
  width: 24px;
  height: 3px;
  border: none;
  background: var(--blk-4);
  cursor: pointer;
  transition: background 0.3s, width 0.3s;
}

.indicator.active {
  background: var(--gold);
  width: 36px;
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.97);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1.5rem;
  animation: fadeIn 0.25s ease;
}

.lightbox-content {
  position: relative;
  max-width: min(90vw, 1000px);
  max-height: 90vh;
  background: var(--blk-3);
  border: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  animation: zoomIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.lightbox-image {
  width: 100%;
  max-height: 68vh;
  object-fit: contain;
  display: block;
  background: var(--blk);
}

.lightbox-info {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--line);
}

.lightbox-info-index {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  color: var(--gold);
  display: block;
  margin-bottom: 0.4rem;
}

.lightbox-info h3 {
  margin: 0 0 0.25rem;
  font-family: var(--font-display);
  font-size: 1.4rem;
  text-transform: uppercase;
  color: var(--cream);
}

.lightbox-info p {
  margin: 0;
  color: var(--gray);
  font-size: 0.9rem;
  line-height: 1.5;
}

.lightbox-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--blk-4);
  border: 1px solid var(--line);
  width: 40px;
  height: 40px;
  color: var(--cream-dim);
  font-family: var(--font-mono);
  font-size: 1.4rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.25s, color 0.25s;
}

.lightbox-close:hover {
  border-color: var(--gold);
  color: var(--gold);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: var(--blk-4);
  border: 1px solid var(--line);
  width: 48px;
  height: 48px;
  color: var(--cream-dim);
  font-family: var(--font-mono);
  font-size: 1.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.25s, color 0.25s;
}

.lightbox-prev {
  left: 12px;
}

.lightbox-next {
  right: 12px;
}

.lightbox-nav:hover {
  border-color: var(--gold);
  color: var(--gold);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes zoomIn {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}

.contact-section {
  margin-top: 6rem;
  padding-top: 4rem;
  border-top: 1px solid var(--line);
}

.contact-head {
  margin-bottom: 2.5rem;
}

.contact-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  text-transform: uppercase;
  line-height: 0.95;
  color: var(--cream);
  margin: 0;
}

.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 920px;
  margin: 0 auto;
}

.contact-card {
  background: var(--blk-3);
  border: 1px solid var(--line);
  padding: 1.4rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: border-color 0.25s, transform 0.25s;
}

.contact-card:hover {
  border-color: var(--gold);
  transform: translateY(-3px);
}

.contact-bullet {
  width: 8px;
  height: 8px;
  background: var(--gold);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.contact-icon {
  color: var(--gray-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.25s;
}

.contact-card:hover .contact-icon {
  color: var(--gold);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.contact-type {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
}

.contact-value {
  color: var(--cream-dim);
  font-size: 0.88rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1024px) {
  .tube3d-layout {
    grid-template-columns: 1fr minmax(190px, 240px);
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .snapshots-section {
    padding: 3.5rem 0;
  }
  .tube3d-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .tube3d-stage {
    height: clamp(260px, 70vw, 360px);
  }
  .tube3d-panel {
    border-left: none;
    border-top: 1px solid var(--line);
    padding-left: 0;
    padding-top: 1.25rem;
  }
  .panel-nav {
    justify-content: flex-start;
  }
  .nav-btn {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
  .contact-section {
    margin-top: 4rem;
    padding-top: 3rem;
  }
  .contact-cards {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
}

@media (max-width: 480px) {
  .nav-btn {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
  .lightbox-nav {
    width: 40px;
    height: 40px;
    font-size: 1.3rem;
  }
  .lightbox-prev {
    left: 8px;
  }
  .lightbox-next {
    right: 8px;
  }
  .contact-card {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  .contact-info {
    align-items: center;
  }
}
</style>

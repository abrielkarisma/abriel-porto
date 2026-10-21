<template>
  <section id="about" class="section about-section" ref="aboutSection">
    <div class="section-content">
      <div class="about-content" :class="{ revealed: inView }">
        <div class="about-text">
          <p class="intro-text font-inter">
            Teguh Sambada Abriel Karisma
          </p>
          <p class="intro-text2 font-raleway">
            Known as abriel
          </p>
          <p class="description font-raleway">
            A Software Engineering fresh graduate from Telkom University Surabaya with cum laude honors (GPA 3.70/4.00), I have a strong passion for web and mobile development while also holding a keen interest in Quality Assurance (QA) and software testing. I continuously embrace cutting-edge technologies and apply them across my projects, alongside hands-on experience in identifying bugs, creating test cases, and ensuring application quality through systematic testing. I thrive in challenging environments that push me to grow, and I am always eager to learn, adapt, and contribute to building reliable, user-friendly applications that create meaningful positive impact.
          </p>
          <div class="about-social">
            <h4 class="social-title">Follow Me</h4>
            <div class="social-links">
              <a href="https://github.com/abrielkarisma" target="_blank" rel="noopener noreferrer" class="social-link github">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/abrielkarisma25" target="_blank" rel="noopener noreferrer" class="social-link linkedin">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a href="https://instagram.com/abrielkarisma" target="_blank" rel="noopener noreferrer" class="social-link instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>Instagram</span>
              </a>
            </div>
            <div class="cv-download-wrapper">
              <a href="https://drive.google.com/drive/folders/1iKdnievYZQ2OiFVdILjhxlD-W_LVVIlH?usp=sharing"
                target="_blank" rel="noopener noreferrer" class="cv-download-btn">
                <svg class="dl-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
                <span>Grab Resume!</span>
                <svg class="download-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="photo-stack-wrapper">
          <div :class="['photo-stack', { 'stack-init': !inView }]" @pointerdown.prevent="onPointerDown"
            @pointermove.prevent="onPointerMove" @pointerup.prevent="onPointerUp" @pointercancel.prevent="onPointerUp"
            @pointerleave.prevent="onPointerUp" ref="stack">
            <div v-for="(img, idx) in images" :key="idx" class="card" :data-index="idx" :style="cardStyle(idx)"
              role="img" :aria-label="`photocard ${idx + 1}`">
              <img :src="img" alt="photocard" draggable="false" />
            </div>
          </div>
          <div class="stack-controls">
            <button class="ctrl" @click="prev" aria-label="previous">‹</button>
            <button class="ctrl" @click="next" aria-label="next">›</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import frame1 from '../../assets/images/Frame 1.webp'
import frame2 from '../../assets/images/Frame 2.webp'
import frame3 from '../../assets/images/Frame 3.webp'
import frame4 from '../../assets/images/Frame 4.webp'
import frame5 from '../../assets/images/Frame 5.webp'
export default {
  data() {
    return {
      images: [frame1, frame2, frame3, frame4, frame5],
      current: 0,
      dragTarget: null,
      dragging: false,
      startX: 0,
      deltaX: 0,
      inView: false,
    }
  },
  mounted() {
    this._io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.inView = entry.isIntersecting
      })
    }, { threshold: 0.15 })
    if (this.$refs.aboutSection) this._io.observe(this.$refs.aboutSection)
  },
  beforeUnmount() {
    if (this._io) this._io.disconnect()
  },
  methods: {
    normOffset(i) {
      const n = this.images.length
      const half = Math.floor(n / 2)
      let rel = i - this.current
      if (rel > half) rel -= n
      if (rel < -half) rel += n
      return rel
    },
    cardStyle(i) {
      if (!this.inView) {
        return {
          transform: `translateX(0) scale(0.64) rotate(0deg)`,
          zIndex: 100,
          opacity: 0,
        }
      }
      const rel = this.normOffset(i)
      const absr = Math.abs(rel)
      const x = rel * 36 + (rel < 0 ? -8 : 8)
      const scale = 1 - absr * 0.06
      const z = 100 - absr
      const rotate = rel * 3
      const opacity = rel === 0 ? 1 : 0.95
      let translateDrag = ''
      if (this.dragging && this.dragTarget !== null) {
        const n = this.images.length
        let relToTarget = i - this.dragTarget
        const half = Math.floor(n / 2)
        if (relToTarget > half) relToTarget -= n
        if (relToTarget < -half) relToTarget += n
        const absToTarget = Math.abs(relToTarget)
        let damp = 0
        if (absToTarget === 0) damp = 1
        else if (absToTarget === 1) damp = 0.35
        else if (absToTarget === 2) damp = 0.12
        else damp = 0
        if (damp > 0) translateDrag = `translateX(${Math.round(this.deltaX * damp)}px)`
      }
      return {
        transform: `${translateDrag} translateX(${x}px) scale(${scale}) rotate(${rotate}deg)`,
        zIndex: z,
        opacity,
      }
    },
    onPointerDown(e) {
      const stackEl = this.$refs.stack
      const cardEl = e.target.closest && e.target.closest('.card')
      const clickedIdx = cardEl && cardEl.dataset ? Number(cardEl.dataset.index) : null
      const targetIdx = clickedIdx !== null ? clickedIdx : this.current
      this.dragging = true
      this.dragTarget = targetIdx
      this.startX = e.clientX
      this.deltaX = 0
      const captureEl = cardEl || stackEl
      captureEl && captureEl.setPointerCapture && captureEl.setPointerCapture(e.pointerId)
    },
    onPointerMove(e) {
      if (!this.dragging) return
      this.deltaX = e.clientX - this.startX
    },
    onPointerUp(e) {
      if (!this.dragging) return
      this.dragging = false
      const dx = this.deltaX
      this.deltaX = 0
      this.dragTarget = null
      const threshold = 60
      if (dx < -threshold) this.next()
      else if (dx > threshold) this.prev()
    },
    next() {
      this.current = (this.current + 1) % this.images.length
    },
    prev() {
      this.current = (this.current - 1 + this.images.length) % this.images.length
    },
  }
}
</script>
<style scoped>
.about-section {
  padding: 6rem 2rem 4rem;
  background: #000;
}

.section-content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.section-title {
  font-size: 3rem;
  font-weight: bold;
  color: #f3f4f6;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #f3f4f6, #9ca3af);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.about-text {
  color: #d1d5db;
}

.intro-text {
  font-size: 3rem;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.intro-text2 {
  font-size: 2rem;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.description {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #d1d5db;
}

.about-text .intro-text,
.about-text .intro-text2,
.about-text .description {
  transform: translateX(-36px);
  opacity: 0;
  transition: transform 600ms cubic-bezier(.22, .9, .33, 1), opacity 500ms ease;
}

.about-content.revealed .about-text .intro-text {
  transform: translateX(0);
  opacity: 1;
  transition-delay: 0.08s;
}

.about-content.revealed .about-text .intro-text2 {
  transform: translateX(0);
  opacity: 1;
  transition-delay: 0.18s;
}

.about-content.revealed .about-text .description {
  transform: translateX(0);
  opacity: 1;
  transition-delay: 0.32s;
}

.photo-stack.stack-init .card {
  transform: translateX(0) translateY(0) scale(0.64) rotate(0deg) !important;
  opacity: 0;
}

.photo-stack:not(.stack-init) .card:nth-child(1) {
  transition-delay: 0s
}

.photo-stack:not(.stack-init) .card:nth-child(2) {
  transition-delay: 60ms
}

.photo-stack:not(.stack-init) .card:nth-child(3) {
  transition-delay: 120ms
}

.photo-stack:not(.stack-init) .card:nth-child(4) {
  transition-delay: 180ms
}

.photo-stack:not(.stack-init) .card:nth-child(5) {
  transition-delay: 240ms
}

.about-social {
  margin-top: 1.25rem;
}

.about-social .social-title {
  color: #f3f4f6;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  transform: translateY(-8px);
  opacity: 0;
  transition: transform 420ms cubic-bezier(.22, .9, .33, 1), opacity 300ms ease;
}

.about-social .social-links {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.about-social .social-links .social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.9rem;
  border-radius: 18px;
  text-decoration: none;
  color: #f3f4f6;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.03);
  transform: translateY(12px) scale(0.98);
  opacity: 0;
  transition: transform 420ms cubic-bezier(.22, .9, .33, 1), opacity 320ms ease, box-shadow 180ms ease;
  font-size: 0.95rem;
}

.about-social .social-link:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35), 0 0 20px #123458;
  outline: 2px solid #123458;
  outline-offset: 2px;
}

.about-content.revealed .about-social .social-title {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.22s;
}

.about-content.revealed .about-social .social-links .social-link:nth-child(1) {
  transform: translateY(0) scale(1);
  opacity: 1;
  transition-delay: 0.28s;
}

.about-content.revealed .about-social .social-links .social-link:nth-child(2) {
  transform: translateY(0) scale(1);
  opacity: 1;
  transition-delay: 0.36s;
}

.about-content.revealed .about-social .social-links .social-link:nth-child(3) {
  transform: translateY(0) scale(1);
  opacity: 1;
  transition-delay: 0.44s;
}

.about-social .social-link.github {
  color: #f3f4f6
}

.about-social .social-link.linkedin {
  color: #0ea5e9
}

.about-social .social-link.instagram {
  color: #e1306c
}

.cv-download-wrapper {
  margin-top: 1.2rem;
  display: flex;
  justify-content: flex-start;
}

.cv-download-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #123458, #1e4a7a);
  border: 2px solid #123458;
  border-radius: 25px;
  text-decoration: none;
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(18, 52, 88, 0.3);
  transform: translateY(12px);
  opacity: 0;
}

.cv-download-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s;
}

.cv-download-btn:hover::before {
  left: 100%;
}

.cv-download-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(18, 52, 88, 0.5), 0 0 20px rgba(18, 52, 88, 0.4);
  border-color: #2a5a8a;
  background: linear-gradient(135deg, #1e4a7a, #2a5a8a);
}

.cv-download-btn:active {
  transform: translateY(0) scale(1.02);
}

.cv-download-btn .dl-icon {
  transition: transform 0.3s ease;
}

.cv-download-btn:hover .dl-icon {
  transform: scale(1.1);
}

.cv-download-btn .download-icon {
  margin-left: 0.2rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-4px);
  }

  60% {
    transform: translateY(-2px);
  }
}

.about-content.revealed .cv-download-btn {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.52s;
  transition: transform 420ms cubic-bezier(.22, .9, .33, 1), opacity 320ms ease,
    box-shadow 180ms ease, border-color 180ms ease, background 180ms ease;
}

.skills-highlight {
  background: rgba(55, 65, 81, 0.8);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(156, 163, 175, 0.2);
}

.skills-highlight h3 {
  color: #f3f4f6;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.skill-tag {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.8));
  color: #f3f4f6;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.about-stats {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-item {
  background: rgba(31, 41, 55, 0.8);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(156, 163, 175, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.stat-item h3 {
  font-size: 2rem;
  color: #f3f4f6;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.stat-item p {
  color: #9ca3af;
  margin: 0;
  font-size: 0.9rem;
}

.profile-image {
  display: flex;
  justify-content: center;
}

.image-placeholder {
  width: 200px;
  height: 200px;
  background: rgba(31, 41, 55, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(156, 163, 175, 0.3);
  color: #9ca3af;
  transition: all 0.3s ease;
}

.image-placeholder:hover {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.2);
}

.photo-stack-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.photo-stack {
  position: relative;
  width: 327px;
  height: 498px;
  touch-action: pan-y;
  user-select: none;
}

.photo-stack .card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: center center;
  width: 327px;
  height: 498px;
  margin: -249px 0 0 -163.5px;
  border-radius: 14px;
  overflow: hidden;
  background: #0b0b0b;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6);
  transition: transform 260ms cubic-bezier(.22, .9, .33, 1), opacity 200ms ease;
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-stack .card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: linear-gradient(180deg, #000, #111);
  display: block;
  pointer-events: none;
}

.stack-controls {
  margin-top: 0.75rem;
  display: flex;
  gap: 0.5rem;
}

.ctrl {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  border: none;
  padding: 0.35rem 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
}

.ctrl:hover {
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 1024px) {
  .photo-stack-wrapper {
    margin: 0 auto;
  }

  .photo-stack {
    width: 260px;
    height: 396px
  }

  .photo-stack .card {
    width: 260px;
    height: 396px;
    margin: -198px 0 0 -130px
  }

  .photo-stack .card img {
    object-fit: cover
  }
}

@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }

  .intro-text {
    font-size: 1.3rem;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .skills-list {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .about-section {
    padding: 2rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .intro-text {
    font-size: 1.2rem;
  }

  .skills-highlight {
    padding: 1.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>

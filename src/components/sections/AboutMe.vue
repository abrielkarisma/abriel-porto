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
            A Software Engineering fresh graduate from Telkom University Surabaya with cum laude honors
            (GPA 3.70/4.00). With a passion for web and mobile development, I continuously embrace cutting-edge
            technologies and implement them across my projects. I thrive in environments that challenge me to
            expand my skills and knowledge. Always eager to learn, adapt, and grow, I believe that the best
            technology creates meaningful positive impact on people's lives. Ready to take on new challenges
            and push the boundaries of what's possible.
          </p>
          <div class="about-social">
            <h4 class="social-title">Follow Me</h4>
            <div class="social-links">
              <a href="https://github.com/abrielkarisma" target="_blank" class="social-link github">
                <i class="fab fa-github" aria-hidden="true"></i>
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/abrielkarisma25" target="_blank" class="social-link linkedin">
                <i class="fab fa-linkedin" aria-hidden="true"></i>
                <span>LinkedIn</span>
              </a>
              <a href="https://instagram.com/abrielkarisma" target="_blank" class="social-link instagram">
                <i class="fab fa-instagram" aria-hidden="true"></i>
                <span>Instagram</span>
              </a>
            </div>
            <div class="cv-download-wrapper">
              <a href="https://drive.google.com/drive/folders/1iKdnievYZQ2OiFVdILjhxlD-W_LVVIlH?usp=sharing"
                target="_blank" class="cv-download-btn">
                <i class="fas fa-rocket" aria-hidden="true"></i>
                <span>Grab Resume!</span>
                <i class="fas fa-download download-icon" aria-hidden="true"></i>
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
import frame1 from '../../assets/images/Frame 1.png'
import frame2 from '../../assets/images/Frame 2.png'
import frame3 from '../../assets/images/Frame 3.png'
import frame4 from '../../assets/images/Frame 4.png'
import frame5 from '../../assets/images/Frame 5.png'
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

.cv-download-btn .fas {
  transition: transform 0.3s ease;
}

.cv-download-btn:hover .fas {
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

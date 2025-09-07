<template>
  <section id="projects" class="section projects-section" ref="projectsSection">
    <div class="section-content" :class="{ revealed: inView }">
      <h2 class="section-title">My Projects</h2>
      <p class="section-subtitle">Some projects I've worked on with various technologies and interesting challenges</p>
      <div class="projects-grid" ref="grid">
        <div class="project-card" v-for="(p, idx) in projects" :key="idx">
          <div class="project-image">
            <div class="image-placeholder">
              <img :src="imageUrl(p.image)" :alt="p.title" />
            </div>
            <div class="project-overlay">
              <router-link :to="`/project/${p.slug}`" class="view-project">View Project</router-link>
            </div>
          </div>
          <div class="project-info">
            <h3>{{ p.title }}</h3>
            <p>{{ p.desc }}</p>
            <div class="project-tags">
              <span class="tag" v-for="(t, i) in p.tags" :key="i">{{ t }}</span>
            </div>
            <div class="project-links">
              <a :href="p.github || '#'" class="project-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import rfcImg from '../../assets/images/rfcstore.svg'
export default {
  data() {
    return {
      inView: false,
      _stackTransforms: [],
      rfcImg,
      // list of projects; change image filenames in this array when you add images to assets/images
      projects: [
        { title: 'RFC Store', slug: 'rfc-store', desc: 'RFC Store is a mobile application designed to simplify the sales process, streamline stock management, and provide comprehensive sales reports for harvested products.', tags: ['Flutter', 'Node.js', 'Payment Gateway'], image: 'rfcstore.svg', github: '#' },
        { title: 'Sharfin App', slug: 'sharfin-app', desc: 'It is a mobile application designed to provide comprehensive Islamic knowledge and Sharia finance insights through various formats such as videos, eBooks, and blogs.', tags: ['Flutter', 'Golang'], image: 'sharfin.svg', github: '#' },
        { title: 'Refoodbish.', slug: 'refoodbish', desc: 'Refoodbish is a mobile application that connects users to share surplus edible food with others.', tags: ['Kotlin'], image: 'refoodbish.svg', github: '#' },
        { title: 'Portofolio Website', slug: 'portfolio-website', desc: 'A personal portfolio website showcasing my introduction, featured projects, technical stack, and professional experiences.', tags: ['Vue.js', 'Javascript', 'Tailwind CSS'], image: 'porto.svg', github: '#' },
      ],
    }
  },
  mounted() {
    // Prepare observer
    this._io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // play stack -> grid
          this.playStackToGrid()
          this.inView = true
        } else {
          // reset back to stack for replay later
          this.resetToStack()
          this.inView = false
        }
      })
    }, { threshold: 0.12 })
    if (this.$refs.projectsSection) this._io.observe(this.$refs.projectsSection)
    // compute stack offsets on mount and resize
    this.computeStackTransforms()
    this._onResize = () => this.computeStackTransforms()
    window.addEventListener('resize', this._onResize)
    // also watch visualViewport (handles browser zoom on many platforms)
    if (window.visualViewport) {
      this._vv = window.visualViewport
      this._onVVResize = () => this.computeStackTransforms()
      this._vv.addEventListener('resize', this._onVVResize)
      this._vv.addEventListener('scroll', this._onVVResize)
    }
  },
  beforeUnmount() {
    if (this._io) this._io.disconnect()
    window.removeEventListener('resize', this._onResize)
    if (this._vv && this._onVVResize) {
      this._vv.removeEventListener('resize', this._onVVResize)
      this._vv.removeEventListener('scroll', this._onVVResize)
    }
  },
  methods: {
    imageUrl(name) {
      // resolve asset path under src/assets/images
      try {
        return new URL(`../../assets/images/${name}`, import.meta.url).href
      } catch (e) {
        return rfcImg
      }
    },
    computeStackTransforms() {
      // compute offsets needed to move each card to the center of the grid (stack position)
      const grid = this.$refs.grid
      if (!grid) return
      const gridRect = grid.getBoundingClientRect()
      const centerX = gridRect.left + gridRect.width / 2
      const centerY = gridRect.top + gridRect.height / 2
      const cards = Array.from(grid.querySelectorAll('.project-card'))
      this._stackTransforms = cards.map((card, i) => {
        const r = card.getBoundingClientRect()
        const cardCenterX = r.left + r.width / 2
        const cardCenterY = r.top + r.height / 2
        const dx = centerX - cardCenterX
        const dy = centerY - cardCenterY
        // give each card a small rotate so stack looks organic
        const rot = (i - cards.length / 2) * 6
        return { dx, dy, rot }
      })
      // apply stacked state initially so page load shows stack
      this.applyStackTransformsImmediate()
    },
    applyStackTransformsImmediate() {
      const grid = this.$refs.grid
      if (!grid) return
      const cards = Array.from(grid.querySelectorAll('.project-card'))
      cards.forEach((card, i) => {
        const t = this._stackTransforms[i] || { dx: 0, dy: 0, rot: 0 }
        card.style.transition = 'none'
        card.style.transform = `translate(${t.dx}px, ${t.dy}px) scale(0.78) rotate(${t.rot}deg)`
        card.style.zIndex = 100 + i
        card.style.opacity = '0.98'
      })
      // force reflow
      void grid.offsetWidth
    },
    playStackToGrid() {
      const grid = this.$refs.grid
      if (!grid) return
      // Use FLIP: measure stacked -> measure grid -> invert -> animate to natural position
      const cards = Array.from(grid.querySelectorAll('.project-card'))
      if (!cards.length) return
      // recompute transforms in case layout/zoom changed, then ensure stacked state before measuring
      this.computeStackTransforms()
      this.applyStackTransformsImmediate()
      // measure first (stacked) positions
      const firstRects = cards.map((c) => c.getBoundingClientRect())
      // clear transforms so elements move to their natural grid positions
      cards.forEach((c) => {
        c.style.transition = 'none'
        c.style.transform = ''
        c.style.zIndex = ''
      })
      // force reflow so final positions are computed
      void grid.offsetWidth
      // measure last (grid) positions
      const lastRects = cards.map((c) => c.getBoundingClientRect())
      // apply inverted transforms and animate to identity with stagger
      cards.forEach((card, i) => {
        const first = firstRects[i]
        const last = lastRects[i]
        const dx = first.left - last.left
        const dy = first.top - last.top
        const rot = (i - cards.length / 2) * 6
        // start from the inverted position (so it appears stacked)
        card.style.transform = `translate(${dx}px, ${dy}px) scale(0.78) rotate(${rot}deg)`
        card.style.zIndex = 100 + i
        card.style.opacity = '0.98'
        // force layout per-card then animate to natural position
        void card.offsetWidth
        card.style.transition = `transform 560ms cubic-bezier(.22,.9,.33,1), opacity 360ms ease`
        card.style.transitionDelay = `${i * 70}ms`
        requestAnimationFrame(() => {
          card.style.transform = ''
          card.style.zIndex = ''
          card.style.opacity = ''
        })
      })
    },
    resetToStack() {
      const grid = this.$refs.grid
      if (!grid) return
      const cards = Array.from(grid.querySelectorAll('.project-card'))
      this.computeStackTransforms()
      cards.forEach((card, i) => {
        const t = this._stackTransforms[i] || { dx: 0, dy: 0, rot: 0 }
        card.style.transition = `transform 480ms cubic-bezier(.22,.9,.33,1), opacity 240ms ease`
        card.style.transitionDelay = `${(cards.length - i) * 40}ms`
        requestAnimationFrame(() => {
          card.style.transform = `translate(${t.dx}px, ${t.dy}px) scale(0.78) rotate(${t.rot}deg)`
          card.style.zIndex = 100 + i
        })
      })
    }
  }
}
</script>
<style scoped>
.projects-section {
  padding: 4rem 2rem;
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

.section-content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 2;
}

.section-title {
  font-size: 3rem;
  font-weight: bold;
  color: #f3f4f6;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #f3f4f6, #9ca3af);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  text-align: center;
  color: #9ca3af;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.section-title,
.section-subtitle {
  transform: translateY(-12px);
  opacity: 0;
  transition: transform 420ms cubic-bezier(.22, .9, .33, 1), opacity 360ms ease;
}

.projects-grid .project-card {
  transform: translateY(18px) scale(0.99);
  opacity: 0;
  transition: transform 420ms cubic-bezier(.22, .9, .33, 1), opacity 360ms ease, box-shadow 200ms ease;
}

.section-content.revealed .section-title {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.12s;
}

.section-content.revealed .section-subtitle {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.22s;
}

.section-content.revealed .projects-grid .project-card:nth-child(1) {
  transition-delay: 0.26s
}

.section-content.revealed .projects-grid .project-card:nth-child(2) {
  transition-delay: 0.34s
}

.section-content.revealed .projects-grid .project-card:nth-child(3) {
  transition-delay: 0.42s
}

.section-content.revealed .projects-grid .project-card:nth-child(4) {
  transition-delay: 0.50s
}

.section-content.revealed .projects-grid .project-card {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(31, 41, 55, 0.8);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(156, 163, 175, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.project-card:hover {
  transform: translateY(-10px);
  border-color: rgba(18, 52, 88, 0.4);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.project-image {
  position: relative;
  height: 220px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.projects-section .video-background {
  display: none;
}

.image-placeholder {
  color: #9ca3af;
  opacity: 0.7;
  transition: all 0.3s ease;
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden;
}

.image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.view-project {
  background: linear-gradient(135deg, #123458, #123458);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.view-project:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(18, 52, 88, 0.3);
}

.project-info {
  padding: 2rem;
}

.project-info h3 {
  font-size: 1.4rem;
  font-weight: bold;
  color: #f3f4f6;
  margin-bottom: 1rem;
}

.project-info p {
  color: #d1d5db;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.tag {
  background: rgba(18, 52, 88, 0.2);
  color: #123458;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  border: 1px solid rgba(18, 52, 88, 0.3);
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.project-link:hover {
  color: #123458;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .project-info {
    padding: 1.5rem;
  }

  .project-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .projects-section {
    padding: 2rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .project-info {
    padding: 1rem;
  }
}
</style>

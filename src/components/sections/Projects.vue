<template>
  <section id="projects" class="projects-section section" ref="projectsSection">
    <div class="wrap">
      <div class="section-content" :class="{ revealed: inView }">
        <div class="section-head">
          <p class="section-label">02 — Projects</p>
          <h2 class="section-title-sw">Selected Work</h2>
          <p class="section-sub-sw">Projects built with various technologies, tackling real-world challenges</p>
        </div>
        <div class="projects-grid" ref="grid">
          <article class="project-card" v-for="(p, idx) in projects" :key="idx">
            <div class="project-image">
              <div class="image-placeholder">
                <img :src="imageUrl(p.image)" :alt="p.title" />
              </div>
              <div class="project-overlay">
                <router-link :to="`/project/${p.slug}`" class="view-project">View Project</router-link>
              </div>
            </div>
            <div class="project-info">
              <span class="project-index" v-text="String(idx + 1).padStart(2, '0')"></span>
              <h3>{{ p.title }}</h3>
              <p>{{ p.desc }}</p>
              <div class="project-tags">
                <span class="tag font-mono" v-for="(t, i) in p.tags" :key="i">{{ t }}</span>
              </div>
              <div class="project-links" v-if="p.github">
                <a :href="p.github" class="project-link font-mono" target="_blank" rel="noopener noreferrer"
                  :aria-label="`Source code ${p.title} di GitHub`">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </article>
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
      isMobile: false,
      rfcImg,
      projects: [
        { title: 'RFC Store', slug: 'rfc-store', desc: 'RFC Store is a mobile application designed to simplify the sales process, streamline stock management, and provide comprehensive sales reports for harvested products.', tags: ['Flutter', 'Node.js', 'Payment Gateway'], image: 'rfcstore.svg', github: 'https://github.com/abrielkarisma/rfc_apps' },
        { title: 'Sharfin App', slug: 'sharfin-app', desc: 'It is a mobile application designed to provide comprehensive Islamic knowledge and Sharia finance insights through various formats such as videos, eBooks, and blogs.', tags: ['Flutter', 'Golang'], image: 'sharfin.svg', github: 'https://github.com/abrielkarisma/sharfin_app' },
        // Isi dengan URL repo GitHub kalau publik. Kosong = tombol GitHub disembunyikan.
        { title: 'Refoodbish.', slug: 'refoodbish', desc: 'Refoodbish is a mobile application that connects users to share surplus edible food with others.', tags: ['Kotlin'], image: 'refoodbish.svg', github: '' },
        { title: 'Portofolio Website', slug: 'portfolio-website', desc: 'A personal portfolio website showcasing my introduction, featured projects, technical stack, and professional experiences.', tags: ['Vue.js', 'Javascript', 'Tailwind CSS'], image: 'porto.svg', github: 'https://github.com/abrielkarisma/abriel-porto' },
        { title: 'Fundy', slug: 'fundy', desc: 'Personal finance web app to manage accounts, categories, transactions, reminders, and income/expense charts.', tags: ['React', 'FastAPI', 'SQLite'], image: 'fundy.png', github: '' },
      ],
    }
  },
  mounted() {
    // Detect mobile device
    this.isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // Hitung posisi "stack" sebagai titik awal animasi.
    // Kartu default tetap di posisi grid (lihat CSS), jadi sekalipun animasi batal
    // kartu tidak pernah tertinggal di posisi yang salah.
    this._onMounted = () => this.applyStackOffsets()
    this.$nextTick(this._onMounted)
    if (document.readyState === 'complete') {
      setTimeout(this._onMounted, 120)
    } else {
      window.addEventListener('load', this._onMounted, { once: true })
    }

    this._onResize = this.debounce(() => this.applyStackOffsets(), 150)
    window.addEventListener('resize', this._onResize)

    this._io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.inView = true
          this.playEntrance()
        } else {
          this.inView = false
        }
      })
    }, { threshold: 0.12 })

    if (this.$refs.projectsSection) this._io.observe(this.$refs.projectsSection)
  },
  beforeUnmount() {
    if (this._io) this._io.disconnect()
    window.removeEventListener('resize', this._onResize)
    window.removeEventListener('load', this._onMounted)
  },
  methods: {
    imageUrl(name) {
      try {
        return new URL(`../../assets/images/${name}`, import.meta.url).href
      } catch (e) {
        return rfcImg
      }
    },
    // Animasi entrance: pasang state awal (is-pre), commit satu frame,
    // lalu lepas supaya CSS transition menggerakkan kartu ke posisi grid.
    // Kalau fungsi ini tak pernah dipanggil, kartu tetap terlihat normal.
    playEntrance() {
      const grid = this.$refs.grid
      if (!grid || this.isMobile) return
      if (grid.classList.contains('is-pre')) return
      grid.classList.add('is-pre')
      void grid.offsetWidth
      requestAnimationFrame(() => grid.classList.remove('is-pre'))
    },
    // Posisi stack dihitung dari layout (offsetLeft/offsetTop), bukan
    // getBoundingClientRect, supaya tidak terpengaruh transform yang sedang aktif.
    applyStackOffsets() {
      if (this.isMobile) return
      const grid = this.$refs.grid
      if (!grid) return
      const cards = Array.from(grid.querySelectorAll('.project-card'))
      if (!cards.length) return
      const cx = grid.clientWidth / 2
      const cy = grid.clientHeight / 2
      cards.forEach((card, i) => {
        const px = card.offsetLeft + card.offsetWidth / 2
        const py = card.offsetTop + card.offsetHeight / 2
        card.style.setProperty('--sx', `${Math.round(cx - px)}px`)
        card.style.setProperty('--sy', `${Math.round(cy - py)}px`)
        card.style.setProperty('--sr', `${(i - (cards.length - 1) / 2) * 6}deg`)
        card.style.setProperty('--sd', `${i * 70}ms`)
      })
    },
    debounce(func, wait) {
      let timeout
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout)
          func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }
    }
  }
}
</script>
<style scoped>
.projects-section {
  background: var(--blk-2);
  position: relative;
  overflow: hidden;
  padding: 6rem 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  contain: layout style paint;
}

.projects-section::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(200, 162, 75, 0.06), transparent 70%);
  pointer-events: none;
  z-index: 1;
}

.section-content {
  position: relative;
  z-index: 2;
}

.section-label,
.section-title-sw,
.section-sub-sw {
  transform: translateY(-12px);
  opacity: 0;
  transition: transform 420ms cubic-bezier(.22, .9, .33, 1), opacity 360ms ease;
}

/* Default: kartu terlihat rapi di grid. Kalau JS/observer gagal sekalipun,
   bagian ini tetap tampil benar (progressive enhancement). */
.projects-grid .project-card {
  opacity: 1;
  transform: none;
}

/* Titik awal animasi entrance. Dipasang sesaat oleh JS tepat sebelum reveal,
   lalu langsung dilepas supaya transisi berjalan ke state default di atas. */
.projects-grid.is-pre .project-card {
  opacity: 0;
  transform: translate(var(--sx, 0px), var(--sy, 0px)) scale(0.78) rotate(var(--sr, 0deg));
  transition: transform 560ms cubic-bezier(.22, .9, .33, 1), opacity 360ms ease;
  transition-delay: var(--sd, 0ms);
}

.section-content.revealed .section-label {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.08s;
}

.section-content.revealed .section-title-sw {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.16s;
}

.section-content.revealed .section-sub-sw {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.24s;
}

.projects-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  contain: layout;
}

.project-card {
  background: var(--blk-3);
  border: 1px solid var(--line);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 200ms ease, box-shadow 200ms ease, background 200ms ease;
  transform: translateZ(0);
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.project-card:hover {
  border-color: var(--gold);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.project-image {
  position: relative;
  height: 220px;
  background: var(--blk-4);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image-placeholder {
  color: var(--gray);
  opacity: 0.85;
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
  inset: 0;
  background: rgba(10, 10, 10, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.view-project {
  border: 1px solid var(--gold);
  color: var(--cream);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.8rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.view-project:hover {
  transform: translateY(-2px);
  background: var(--gold);
  color: var(--blk);
  box-shadow: 0 10px 20px rgba(200, 162, 75, 0.2);
}

.project-info {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
}

.project-index {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--gray-dim);
}

.project-info h3 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  line-height: 1;
  text-transform: uppercase;
  color: var(--cream);
  margin: 0 0 1rem;
  letter-spacing: 0.02em;
}

.project-info p {
  color: var(--gray);
  margin: 0 0 1.5rem;
  line-height: 1.6;
  font-size: 0.95rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.75rem;
}

.tag {
  color: var(--cream-dim);
  padding: 0.3rem 0.75rem;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid var(--line);
}

.project-links {
  display: flex;
  margin-top: auto;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--gray);
  text-decoration: none;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: color 0.2s ease;
}

.project-link:hover {
  color: var(--gold);
}

@media (max-width: 768px) {
  .projects-section {
    padding: 3.5rem 0;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .project-info {
    padding: 1.5rem;
  }

  .project-links {
    flex-direction: column;
    gap: 0.5rem;
  }

  .project-card {
    transform: none !important;
    transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
    will-change: auto;
  }

  .project-card:hover {
    transform: none !important;
  }

  .projects-grid.is-pre .project-card {
    opacity: 0;
    transform: translateY(20px);
    transition: transform 0.4s ease, opacity 0.4s ease;
  }
}

@media (max-width: 480px) {
  .projects-section {
    padding: 2.5rem 0;
  }

  .project-image {
    height: 180px;
  }

  .project-info {
    padding: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .projects-grid .project-card,
  .projects-grid.is-pre .project-card,
  .section-label,
  .section-title-sw,
  .section-sub-sw {
    transition: none !important;
    transform: none !important;
    animation: none !important;
  }

  .projects-grid.is-pre .project-card,
  .section-content.revealed .section-label,
  .section-content.revealed .section-title-sw,
  .section-content.revealed .section-sub-sw {
    transform: none !important;
    opacity: 1;
  }
}
</style>

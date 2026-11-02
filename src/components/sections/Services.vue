<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const services = [
  {
    num: '01',
    title: 'Software QA & Testing',
    desc: 'Manual + automated testing (Katalon, Playwright, Selenium) for web & mobile. Functional, regression, API, and release testing with clean bug reports.',
  },
  {
    num: '02',
    title: 'Mobile App Development',
    desc: 'Build cross-platform mobile apps with Flutter & Kotlin — from UI to integration with backend & payment gateways.',
  },
  {
    num: '03',
    title: 'Web Development',
    desc: 'Modern frontend using Vue.js, JavaScript & Tailwind CSS. Fast, responsive, and accessible interfaces.',
  },
  {
    num: '04',
    title: 'API & Flow Validation',
    desc: 'Verify REST API contracts, data flow, and edge cases. Postman collections, scenario mapping, and traceability.',
  },
]

const isInView = ref(false)
let observer = null
const sectionEl = ref(null)

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isInView.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.15 }
  )
  if (sectionEl.value) observer.observe(sectionEl.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <section id="services" ref="sectionEl" class="services-section">
    <div class="wrap">
      <div class="section-head" :class="{ revealed: isInView }">
        <span class="section-label">07 — Services</span>
        <h2 class="section-title-sw">How I can help</h2>
        <p class="section-sub-sw">
          QA testing, mobile/web development, and API validation — clear, reliable, and ready to ship.
        </p>
      </div>

      <div class="services-grid" :class="{ revealed: isInView }">
        <div v-for="s in services" :key="s.num" class="service-card">
          <div class="service-top">
            <span class="service-num">{{ s.num }}</span>
            <span class="service-plus">+</span>
          </div>
          <h3 class="service-title">{{ s.title }}</h3>
          <p class="service-desc">{{ s.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  background: var(--blk-2);
  padding: 5.5rem 0;
  border-top: 1px solid var(--line);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
}

.service-card {
  border: 1px solid var(--line);
  background: var(--blk-3);
  padding: 1.75rem;
  transition: border-color 0.25s, transform 0.25s;
}

.service-card:hover {
  border-color: var(--gold);
  transform: translateY(-4px);
}

.service-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.service-num {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--gold);
  letter-spacing: 0.14em;
}

.service-plus {
  font-size: 1.5rem;
  color: var(--gray-dim);
  line-height: 1;
  transition: color 0.25s, transform 0.25s;
}

.service-card:hover .service-plus {
  color: var(--gold);
  transform: rotate(90deg);
}

.service-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  text-transform: uppercase;
  color: var(--cream);
  margin: 0 0 0.75rem;
}

.service-desc {
  color: var(--gray);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.section-head,
.services-grid {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.section-head.revealed,
.services-grid.revealed {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 640px) {
  .services-section { padding: 3.5rem 0; }
  .service-card { padding: 1.4rem; }
}
</style>

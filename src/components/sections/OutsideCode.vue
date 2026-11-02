<template>
  <section id="outside" class="outside-section wrap" :class="{ 'is-mounted': mounted }" ref="sectionRef">
    <div class="section-content">
      <div class="section-head">
        <span class="section-label">04 — Experiences</span>
        <h2 class="section-title-sw">Outside Code</h2>
        <p class="section-sub-sw">Involvement in organizations or personal skill-building programs I participated in</p>
      </div>

      <div class="tab-menu">
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
          :class="['tab', { active: activeTab === tab }]">{{ tab }}</button>
      </div>

      <div class="tabs-content">
        <transition name="fade">
          <div v-if="activeTab === 'Organization'" class="timeline">
            <div class="line"></div>
            <div class="top-circle"></div>
            <div class="bottom-circle"></div>
            <div v-for="(item, index) in organizationTimeline" :key="index" class="timeline-item"
              :class="index % 2 === 0 ? 'left' : 'right'" :style="{ transitionDelay: (index * 80) + 'ms' }">
              <span class="year">{{ item.year }}</span>
              <div class="timeline-box">
                <h3>{{ item.title }}</h3>
                <h4>{{ item.subtitle }}</h4>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="activeTab === 'Work'" class="timeline">
            <div class="line"></div>
            <div class="top-circle"></div>
            <div class="bottom-circle"></div>
            <div v-for="(item, index) in workTimeline" :key="index" class="timeline-item"
              :class="index % 2 === 0 ? 'left' : 'right'" :style="{ transitionDelay: (index * 80) + 'ms' }">
              <span class="year">{{ item.year }}</span>
              <div class="timeline-box">
                <h3>{{ item.title }}</h3>
                <h4>{{ item.subtitle }}</h4>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      tabs: ['Work', 'Organization'],
      activeTab: 'Work',
      organizationTimeline: [
        { title: 'Student Marketing Staff', subtitle: 'Telkom University Surabaya', description: 'Promoted the university to prospective students through events and campus tours while strengthening public speaking, communication, and interpersonal skills.', year: '2021-2022' },
        { title: 'Software Engineering Student Association', subtitle: 'Vice head of Research & Technology', description: 'Coordinated research and technology initiatives, supported entrepreneurial activities, and organized skill-enhancing workshops to foster innovation and knowledge-sharing within the organization.', year: '2022-2024' },
        { title: 'Software Engineering Media and Communication', subtitle: 'Brand Ambassador', description: 'Represented the Software Engineering major at events, created social media content to boost online presence, and collaborated with media teams to strengthen communication and event promotion.', year: '2023-2024' },
        { title: 'Software Engineering Festival', subtitle: 'Program Division', description: 'Planned and developed event agendas, collaborated across divisions for successful execution, and applied problem-solving skills to address challenges effectively.', year: '2023' },
        { title: 'Campus Orientation Committee', subtitle: 'Logistic', description: 'Supported the new student orientation at Telkom University Surabaya by managing logistics and collaborating with the team to ensure smooth execution of the large-scale event.', year: '2023' }
      ],
      workTimeline: [
        { title: 'PT. Alfath Teknologi Kreatif', subtitle: 'Front End Mobile Developer', description: "Developed the front-end of 'SharfinApp' with Flutter, integrated RESTful APIs, and led a 4-member team to ensure efficient collaboration, timely delivery, and streamlined project management.", year: '2024' },
        { title: 'Alfath Streetwear', subtitle: 'Talent', description: "Served as a brand talent model, contributing to visual representation and brand awareness, while also conceptualizing video content to enhance engagement and deliver creative storytelling aligned with the brand's identity.", year: '2024' },
        { title: 'Mobile Programming Course', subtitle: 'Laboratory Assistant', description: 'Served as a teaching assistant for the Mobile Programming course, supporting students in understanding concepts, guiding practical sessions, and assisting in troubleshooting technical issues.', year: '2024' },
        { title: 'Wisewires Indonesia', subtitle: 'IT QA Tester', description: 'Ensured the quality and reliability of web and mobile applications by performing thorough functional, regression, and release testing. Identified, documented, and tracked defects to help developers deliver stable and user-friendly software.', year: 'Present' }
      ],
      mounted: false,
      _observer: null,
      sectionRef: null
    }
  },
  mounted() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this._observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => setTimeout(() => (this.mounted = true), 20))
          } else {
            this.mounted = false
          }
        })
      }, { threshold: 0.12 })
      this._observer.observe(this.$el)
    } else {
      requestAnimationFrame(() => setTimeout(() => (this.mounted = true), 20))
    }
  },
  watch: {
    activeTab() {
      this.replay()
    },
    '$route'() {
      this.replay()
    }
  },
  methods: {
    isInViewport() {
      if (!this.$el) return false
      const rect = this.$el.getBoundingClientRect()
      return rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
    },
    replay() {
      if (!this.$el) return
      this.mounted = false
      this.$nextTick(() => {
        requestAnimationFrame(() => setTimeout(() => (this.mounted = true), 80))
      })
    }
  },
  beforeUnmount() {
    if (this._observer) {
      this._observer.disconnect()
      this._observer = null
    }
  }
}
</script>
<style scoped>
.outside-section {
  background: var(--blk-2);
  padding: 6rem 0;
}

.section-content {
  position: relative;
  z-index: 2;
}

/* ---------- Reveal on .is-mounted ---------- */
.section-label,
.section-title-sw,
.section-sub-sw,
.tab-menu,
.timeline-item {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 420ms cubic-bezier(.22, .9, .33, 1), transform 420ms cubic-bezier(.22, .9, .33, 1);
}

.outside-section.is-mounted .section-label,
.outside-section.is-mounted .section-title-sw,
.outside-section.is-mounted .section-sub-sw,
.outside-section.is-mounted .tab-menu,
.outside-section.is-mounted .timeline-item {
  opacity: 1;
  transform: translateY(0);
}

.outside-section.is-mounted .section-label { transition-delay: 0.05s; }
.outside-section.is-mounted .section-title-sw { transition-delay: 0.12s; }
.outside-section.is-mounted .section-sub-sw { transition-delay: 0.2s; }
.outside-section.is-mounted .tab-menu { transition-delay: 0.28s; }

/* ---------- Tabs ---------- */
.tab-menu {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 3rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--line);
}

.tab {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gray);
  background: transparent;
  border: 1px solid var(--line);
  padding: 0.65rem 1.5rem;
  cursor: pointer;
  transition: border-color 0.25s, color 0.25s, background 0.25s;
}

.tab:hover {
  border-color: var(--cream-dim);
  color: var(--cream);
}

.tab.active {
  border-color: var(--gold);
  color: var(--gold);
}

/* ---------- Tab transition ---------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ---------- Timeline ---------- */
.timeline {
  position: relative;
  margin: 2.5rem auto;
  padding: 20px 0;
  width: 100%;
  max-width: 1000px;
}

.line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  background: var(--line);
}

.top-circle,
.bottom-circle {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--blk-2);
  border: 1px solid var(--gold);
}

.top-circle { top: 0; }

.bottom-circle { bottom: 0; }

.timeline-item {
  position: relative;
  width: 50%;
  padding: 20px 40px;
  box-sizing: border-box;
}

.timeline-item.left {
  left: 0;
  text-align: right;
}

.timeline-item.right {
  left: 50%;
  text-align: left;
}

.timeline-box {
  border: 1px solid var(--line);
  background: var(--blk-3);
  padding: 1.5rem;
  transition: border-color 0.25s;
}

.timeline-box:hover {
  border-color: var(--gold);
}

.timeline-box h3 {
  margin: 0;
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--cream);
  letter-spacing: 0.01em;
}

.timeline-box h4 {
  margin: 0.35rem 0 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
}

.timeline-box p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--gray);
}

.year {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  color: var(--gold);
  white-space: nowrap;
}

.timeline-item.left .year {
  left: calc(100% + 12px);
}

.timeline-item.right .year {
  right: calc(100% + 12px);
}

@media (max-width: 768px) {
  .outside-section {
    padding: 4rem 0;
  }

  .tab-menu {
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .tab {
    padding: 0.5rem 1.1rem;
    font-size: 0.72rem;
  }

  .timeline {
    margin: 2rem auto;
    padding: 15px 0;
    max-width: 600px;
  }

  .timeline-item {
    padding: 15px 24px;
  }

  .timeline-box {
    padding: 1.1rem;
  }

  .timeline-box h3 {
    font-size: 0.95rem;
  }

  .timeline-box h4 {
    font-size: 0.65rem;
  }

  .timeline-box p {
    font-size: 0.82rem;
  }

  .year {
    font-size: 0.75rem;
  }

  .timeline-item.left .year {
    left: calc(100% + 8px);
  }

  .timeline-item.right .year {
    right: calc(100% + 8px);
  }
}

@media (max-width: 480px) {
  .outside-section {
    padding: 3rem 0;
  }

  .timeline-item {
    padding: 12px 18px;
  }

  .timeline-box {
    padding: 0.9rem;
  }

  .timeline-box h3 {
    font-size: 0.88rem;
  }

  .timeline-box p {
    font-size: 0.78rem;
  }

  .year {
    font-size: 0.68rem;
    letter-spacing: 0.06em;
  }

  .timeline-item.left .year {
    left: calc(100% + 6px);
  }

  .timeline-item.right .year {
    right: calc(100% + 6px);
  }
}
</style>

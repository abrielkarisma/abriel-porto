<template>
  <section id="outside" class="section outside-section" :class="{ 'is-mounted': mounted }" ref="sectionRef">
    <div class="section-content">
      <h2 class="section-title">Experiences</h2>
      <p class="section-subtitle">Involvement in organizations or personal skill-building programs I participated in</p>
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
      tabs: ['Organization', 'Work'],
      activeTab: 'Organization',
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
        { title: 'Mobile Programming Course', subtitle: 'Laboratory Assistant', description: 'Served as a teaching assistant for the Mobile Programming course, supporting students in understanding concepts, guiding practical sessions, and assisting in troubleshooting technical issues.', year: '2024' }
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

.outside-section.is-mounted .section-title {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.12s;
}

.outside-section.is-mounted .section-subtitle {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.22s;
}

.tab-menu {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: flex-start;
}

.tab {
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  border: 1px solid #333;
  background: transparent;
  color: #aaa;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.tab.active {
  background: #1a1a1a;
  border-color: #123458;
  color: #fff;
}

.tab:hover {
  border-color: #123458;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.timeline {
  position: relative;
  margin: 40px auto;
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
  width: 4px;
  background: #123458;
}

.top-circle,
.bottom-circle {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 4px solid #123458;
}

.top-circle {
  top: 0;
}

.bottom-circle {
  bottom: 0;
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 20px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  opacity: 0;
  transform: translateY(14px) scale(0.98);
  transition: opacity 420ms cubic-bezier(.2, .9, .3, 1), transform 420ms cubic-bezier(.2, .9, .3, 1);
}

.timeline-item.left {
  left: 0;
  justify-content: flex-end;
  text-align: right;
}

.timeline-item.right {
  left: 50%;
  justify-content: flex-start;
}

.timeline-box {
  padding: 10px;
  color: #f3f4f6;
  max-width: calc(100% - 140px);
}

.timeline-box h3 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.timeline-box h4 {
  margin: 4px 0;
  font-size: 14px;
  color: #9ca3af;
}

.timeline-box p {
  font-size: 14px;
  margin: 0;
}

.year {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-weight: bold;
  color: #f3f4f6;
  width: 110px;
  line-height: 1;
  white-space: nowrap;
  overflow: visible;
  text-align: center;
}

.timeline-item.left .year {
  left: calc(100% + 12px);
  text-align: left;
}

.timeline-item.right .year {
  left: calc(-110px - 12px);
  text-align: right;
}

.connector {
  display: none;
}

.outside-section.is-mounted .timeline-item {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@media (max-width: 768px) {
  .outside-section {
    padding: 1.5rem 1rem;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }

  .section-subtitle {
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }

  .tab-menu {
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .tab {
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
  }

  .timeline {
    margin: 20px auto;
    padding: 15px 0;
    max-width: 600px;
  }

  /* Garis tetap di tengah */
  .line {
    left: 50%;
    width: 2px;
  }

  .top-circle,
  .bottom-circle {
    left: 50%;
    width: 12px;
    height: 12px;
    border-width: 2px;
  }

  /* Timeline items tetap kiri-kanan tapi lebih kecil */
  .timeline-item {
    width: 50%;
    padding: 15px 8px;
  }

  .timeline-item.left {
    left: 0;
    justify-content: flex-end;
    text-align: right;
  }

  .timeline-item.right {
    left: 50%;
    justify-content: flex-start;
    text-align: left;
  }

  .timeline-box {
    max-width: calc(100% - 80px);
    padding: 8px;
  }

  .timeline-box h3 {
    font-size: 0.9rem;
    margin: 0;
  }

  .timeline-box h4 {
    font-size: 0.8rem;
    margin: 2px 0;
  }

  .timeline-box p {
    font-size: 0.7rem;
    line-height: 1.3;
    margin: 0;
  }

  /* Year tetap di posisi center timeline */
  .year {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.7rem;
    background: #123458;
    color: white;
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
    width: 70px;
    text-align: center;
  }

  .timeline-item.left .year {
    left: calc(100% + 8px);
  }

  .timeline-item.right .year {
    left: calc(-70px - 8px);
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }

  .timeline {
    max-width: 400px;
  }

  .timeline-item {
    padding: 12px 6px;
  }

  .timeline-box {
    max-width: calc(100% - 60px);
    padding: 6px;
  }

  .timeline-box h3 {
    font-size: 0.85rem;
  }

  .timeline-box h4 {
    font-size: 0.75rem;
  }

  .timeline-box p {
    font-size: 0.65rem;
    line-height: 1.2;
  }

  .year {
    font-size: 0.6rem;
    padding: 0.1rem 0.3rem;
    width: 60px;
  }

  .timeline-item.left .year {
    left: calc(100% + 6px);
  }

  .timeline-item.right .year {
    left: calc(-60px - 6px);
  }
}

/* Extra small devices - sangat compact */
@media (max-width: 360px) {
  .timeline {
    max-width: 320px;
  }

  .timeline-item {
    padding: 10px 4px;
  }

  .timeline-box {
    max-width: calc(100% - 50px);
    padding: 4px;
  }

  .timeline-box h3 {
    font-size: 0.8rem;
  }

  .timeline-box h4 {
    font-size: 0.7rem;
  }

  .timeline-box p {
    font-size: 0.6rem;
    line-height: 1.1;
  }

  .year {
    font-size: 0.55rem;
    padding: 0.08rem 0.25rem;
    width: 50px;
  }

  .timeline-item.left .year {
    left: calc(100% + 4px);
  }

  .timeline-item.right .year {
    left: calc(-50px - 4px);
  }
}
</style>

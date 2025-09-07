<template>
  <section id="techstack" class="skills-section" :class="{ 'is-mounted': mounted }" ref="sectionRef">
    <div class="section-content">
      <h2 class="section-title">My Skills</h2>
      <p class="section-subtitle">
        Here are some of the technologies and tools I work with.
      </p>
      <div class="tab-menu">
        <button :class="['tab', { active: activeTab === 'tech' }]" @click="activeTab = 'tech'">Tech Stack</button>
        <button :class="['tab', { active: activeTab === 'tools' }]" @click="activeTab = 'tools'">Tools</button>
      </div>
      <div class="skills-grid">
        <div class="skill-card" v-for="(skill, i) in displayedSkills" :key="skill.name"
          :style="{ transitionDelay: (i * 70) + 'ms' }">
          <div class="skill-icon">
            <img :src="getIcon(skill.icon)" :alt="skill.name" />
          </div>
          <p class="skill-name">{{ skill.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
const activeTab = ref('tech')
const techSkills = [
  { icon: 'html.png', name: 'HTML' },
  { icon: 'css.png', name: 'CSS' },
  { icon: 'php.png', name: 'PHP' },
  { icon: 'js.png', name: 'JavaScript' },
  { icon: 'laravel.png', name: 'Laravel' },
  { icon: 'python.png', name: 'Python' },
  { icon: 'nodejs.png', name: 'Node.js' },
  { icon: 'mysql.png', name: 'MySQL' },
  { icon: 'bootstrap.png', name: 'Bootstrap' },
  { icon: 'dart.png', name: 'Dart' },
  { icon: 'flutter.png', name: 'Flutter' },
  { icon: 'kotlin.png', name: 'Kotlin' },
  { icon: 'cplus.png', name: 'C++' },
  { icon: 'csharp.png', name: 'C#' },
]
const tools = [
  { icon: 'git.png', name: 'Git' },
  { icon: 'github.png', name: 'GitHub' },
  { icon: 'postman.png', name: 'Postman' },
  { icon: 'figma.png', name: 'Figma' },
  { icon: 'vscode.png', name: 'VSCode' },
  { icon: 'swagger.png', name: 'Swagger' },
  { icon: 'trello.png', name: 'Trello' },
  { icon: 'androidstudio.png', name: 'Android Studio' },
]
const getIcon = (filename) => {
  if (!filename) return ''
  try {
    return new URL(`../../assets/icon/${filename}`, import.meta.url).href
  } catch (e) {
    return ''
  }
}
const mounted = ref(false)
const sectionRef = ref(null)
let _observer = null
onMounted(async () => {
  await nextTick()
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    _observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            nextTick().then(() => {
              requestAnimationFrame(() => setTimeout(() => (mounted.value = true), 10))
            })
          } else {
            mounted.value = false
          }
        })
      },
      { threshold: 0.12 }
    )
    if (sectionRef.value) _observer.observe(sectionRef.value)
    else {
      setTimeout(() => { if (sectionRef.value) _observer.observe(sectionRef.value) }, 50)
    }
  } else {
    nextTick().then(() => requestAnimationFrame(() => setTimeout(() => (mounted.value = true), 10)))
  }
})
onBeforeUnmount(() => {
  if (_observer) {
    _observer.disconnect()
    _observer = null
  }
})
const displayedSkills = computed(() => (activeTab.value === 'tech' ? techSkills : tools))
watch(activeTab, async () => {
  if (!sectionRef.value) return
  if (mounted.value) {
    mounted.value = false
    await nextTick()
    requestAnimationFrame(() => setTimeout(() => (mounted.value = true), 20))
  }
})
</script>
<style scoped>
.skills-section {
  padding: 4rem 2rem;
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

.tab-menu {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tab {
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  border: 1px solid #333;
  background: transparent;
  color: #aaa;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.skill-card {
  background: #111;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 1.5rem 1rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.skill-card:hover {
  border-color: #123458;
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(18, 52, 88, 0.2);
}

.skills-section {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 420ms ease, transform 420ms ease;
}

.skills-section.is-mounted {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  transform: translateY(8px);
  opacity: 0;
  transition: transform 420ms cubic-bezier(.2, .9, .3, 1), opacity 420ms ease;
}

.skills-section.is-mounted .section-title {
  transform: translateY(0);
  opacity: 1;
}

.skill-card {
  transform: translateY(22px) scale(0.98);
  opacity: 0;
  transition: transform 420ms cubic-bezier(.2, .9, .3, 1), opacity 420ms ease, box-shadow 220ms ease, border-color 220ms ease;
}

.skills-section.is-mounted .skill-card {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.skill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  margin-bottom: 0.5rem;
}

.skill-icon img {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
  display: block;
}

.skill-name {
  color: #ddd;
  font-weight: 600;
  font-size: 1rem;
}

/* Mobile Responsiveness - Maintain horizontal layout, just scale down */
@media (max-width: 768px) {
  .skills-section {
    padding: 2rem 1rem;
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

  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
  }

  .skill-card {
    padding: 1rem 0.5rem;
  }

  .skill-icon {
    height: 2rem;
    margin-bottom: 0.4rem;
  }

  .skill-icon img {
    width: 1.5rem;
    height: 1.5rem;
  }

  .skill-name {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.5rem;
  }

  .skill-card {
    padding: 0.8rem 0.4rem;
  }

  .skill-icon {
    height: 1.8rem;
    margin-bottom: 0.3rem;
  }

  .skill-icon img {
    width: 1.3rem;
    height: 1.3rem;
  }

  .skill-name {
    font-size: 0.75rem;
  }
}
</style>

<template>
  <section id="techstack" class="skills-section" :class="{ 'is-mounted': mounted }" ref="sectionRef">
    <div class="wrap">
      <header class="section-head">
        <span class="section-label">03 — SKILLS</span>
        <h2 class="section-title-sw">Arsenal</h2>
        <p class="section-sub-sw">The stack I run — code, tools &amp; QA.</p>
      </header>

      <div class="tab-menu">
        <button :class="['tab', { active: activeTab === 'tech' }]" @click="activeTab = 'tech'">Tech Stack</button>
        <button :class="['tab', { active: activeTab === 'tools' }]" @click="activeTab = 'tools'">Tools</button>
        <button :class="['tab', { active: activeTab === 'qa' }]" @click="activeTab = 'qa'">QA &amp; Testing</button>
      </div>

      <div class="skills-grid">
        <div class="skill-card" v-for="(skill, i) in displayedSkills" :key="skill.name"
          :style="{ transitionDelay: (i * 70) + 'ms' }">
          <div class="skill-icon">
            <img v-if="skill.icon" :src="getIcon(skill.icon)" :alt="skill.name" />
            <span v-else class="skill-mono" aria-hidden="true">{{ monogram(skill.name) }}</span>
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
const qaSkills = [
  { icon: 'katalon.png', name: 'Katalon Studio' },
  { icon: 'playwright.png', name: 'Playwright' },
  { icon: 'testrail.png', name: 'TestRail' },
  { icon: 'jira.png', name: 'Jira' },
  { icon: 'postman.png', name: 'Postman' },
  { icon: 'swagger.png', name: 'Swagger' },
  { icon: 'git.png', name: 'Git & GitHub Actions' },
]
const getIcon = (filename) => {
  if (!filename) return ''
  try {
    return new URL(`../../assets/icon/${filename}`, import.meta.url).href
  } catch (e) {
    return ''
  }
}
const monogram = (name) => name
  .split(/\s+/)
  .slice(0, 2)
  .map((w) => w[0])
  .join('')
  .toUpperCase()
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
const displayedSkills = computed(() => {
  if (activeTab.value === 'tech') return techSkills
  if (activeTab.value === 'qa') return qaSkills
  return tools
})
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
  padding: 5rem 0;
  background: var(--blk-2);
  border-top: 1px solid var(--line);
}

.skills-section {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 480ms ease, transform 480ms cubic-bezier(.2, .9, .3, 1);
}

.skills-section.is-mounted {
  opacity: 1;
  transform: translateY(0);
}

.tab-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid var(--line);
  padding-bottom: 1.5rem;
}

.tab {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.55rem 1.25rem;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--gray);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, color 0.2s, transform 0.2s;
}

.tab:hover {
  border-color: var(--gray-dim);
  color: var(--cream);
}

.tab.active {
  background: var(--blk-3);
  border-color: var(--gold);
  color: var(--gold);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.skill-card {
  background: var(--blk-3);
  border: 1px solid var(--line);
  padding: 1.75rem 1rem;
  text-align: center;
  cursor: pointer;
  transform: translateY(22px) scale(0.98);
  opacity: 0;
  transition: transform 480ms cubic-bezier(.2, .9, .3, 1), opacity 480ms ease, border-color 220ms ease, box-shadow 220ms ease;
}

.skill-card:hover {
  border-color: var(--gold);
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
}

.skills-section.is-mounted .skill-card {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.skill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.75rem;
  margin-bottom: 0.75rem;
}

.skill-icon img {
  width: 2.25rem;
  height: 2.25rem;
  object-fit: contain;
  display: block;
}

.skill-mono {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--line);
  background: var(--blk);
  color: var(--gold);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.05em;
}

.skill-name {
  color: var(--cream);
  font-family: var(--font-body);
  font-size: 0.95rem;
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .skills-section {
    padding: 3rem 0;
  }

  .tab-menu {
    gap: 0.4rem;
    margin-bottom: 2rem;
  }

  .tab {
    font-size: 0.7rem;
    padding: 0.45rem 0.9rem;
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 0.75rem;
  }

  .skill-card {
    padding: 1.25rem 0.75rem;
  }

  .skill-icon {
    height: 2.25rem;
  }

  .skill-icon img {
    width: 1.75rem;
    height: 1.75rem;
  }

  .skill-name {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(105px, 1fr));
    gap: 0.5rem;
  }

  .skill-card {
    padding: 1rem 0.5rem;
  }

  .skill-icon {
    height: 2rem;
  }

  .skill-icon img {
    width: 1.5rem;
    height: 1.5rem;
  }

  .skill-name {
    font-size: 0.78rem;
  }
}
</style>

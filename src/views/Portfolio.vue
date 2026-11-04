<template>
  <div class="portfolio-container">
    <nav class="topnav">
      <div class="topnav-inner">
        <router-link class="logo" to="/">
          <span class="logo-mark">AK</span>
          <span class="logo-name">Abriel Karisma</span>
        </router-link>
        <ul class="nav-menu">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#techstack">Skills</a></li>
          <li><a href="#outside">Experience</a></li>
          <li><a href="#achievement">Achievement</a></li>
          <li><a href="#snapshots">Snapshots</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#connect">Contact</a></li>
        </ul>
        <button
          class="theme-toggle"
          type="button"
          :aria-label="isLight ? 'Aktifkan mode gelap' : 'Aktifkan mode terang'"
          @click="toggleTheme"
        >
          <Sun v-if="isLight" :size="18" stroke-width="1.8" />
          <Moon v-else :size="18" stroke-width="1.8" />
        </button>
      </div>
    </nav>

    <div class="portfolio-content">
      <AboutMe />
      <Projects />
      <TechStack />
      <OutsideCode />
      <Achievement />
      <Snapshots />
      <Services />
    </div>
    <KayBadge />
  </div>
</template>

<script setup>
import { Sun, Moon } from "lucide-vue-next"
import { useTheme } from "../composables/useTheme"
import AboutMe from "../components/sections/AboutMe.vue"
import Projects from "../components/sections/Projects.vue"
import TechStack from "../components/sections/TechStack.vue"
import OutsideCode from "../components/sections/OutsideCode.vue"
import Achievement from "../components/sections/Achievement.vue"
import Snapshots from "../components/sections/Snapshots.vue"
import Services from "../components/sections/Services.vue"
import KayBadge from "../components/sections/KayBadge.vue"

const { isLight, toggle } = useTheme()
const toggleTheme = () => toggle()
</script>

<style scoped>
.portfolio-container {
  min-height: 100vh;
  background: var(--blk);
  width: 100%;
}

/* Nav */
.topnav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: var(--nav-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}

.topnav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.85rem 1.5rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--gold);
  color: var(--gold);
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.05em;
}

.logo-name {
  font-family: var(--font-display);
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--cream);
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.35rem;
}

.nav-menu a {
  color: var(--gray);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.5rem 0.7rem;
  border: 1px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

.nav-menu a:hover {
  color: var(--cream);
  border-color: var(--line);
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--gray);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, transform 0.2s;
  flex-shrink: 0;
}

.theme-toggle:hover {
  color: var(--gold);
  border-color: var(--gold);
  transform: translateY(-1px);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

@media (max-width: 900px) {
  .theme-toggle {
    position: absolute;
    top: 0.6rem;
    right: 1rem;
  }
}

.portfolio-content {
  padding-top: 68px;
}

@media (max-width: 900px) {
  .topnav-inner {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
  }
  .nav-menu {
    max-width: 100%;
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: none;
  }
  .nav-menu::-webkit-scrollbar { display: none; }
  .nav-menu a {
    white-space: nowrap;
    padding: 0.4rem 0.55rem;
    font-size: 0.66rem;
  }
  .portfolio-content { padding-top: 108px; }
}

@media (max-width: 480px) {
  .portfolio-content { padding-top: 118px; }
  .logo-name { font-size: 0.95rem; }
}
</style>

<template>
  <div class="portfolio-container">
    <div class="nav-video-wrapper">
      <video autoplay loop muted playsinline class="nav-video">
        <source :src="backgroundVideo" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="nav-video-overlay"></div>
      <nav class="taskbar">
        <div class="taskbar-content">
          <div class="logo name-highlight">
            <h2>Abriel Karisma</h2>
          </div>
          <ul class="nav-menu">
            <li><a href="#about">About Me</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#techstack">Skills</a></li>
            <li><a href="#outside">Experiences</a></li>
            <li><a href="#snapshots">Snapshots</a></li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="portfolio-content">
      <AboutMe />
      <Projects />
      <TechStack />
      <OutsideCode />
      <Snapshots />
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router"
import AboutMe from "../components/sections/AboutMe.vue"
import Projects from "../components/sections/Projects.vue"
import TechStack from "../components/sections/TechStack.vue"
import OutsideCode from "../components/sections/OutsideCode.vue"
import Snapshots from "../components/sections/Snapshots.vue"
import backgroundVideo from '@/assets/video/background.mp4'

const router = useRouter()
const goBack = () => {
  router.push("/")
}
</script>
<style scoped>
.portfolio-container {
  min-height: 100vh;
  background: #000;
  width: 100%;
}

.taskbar {
  position: relative;
  z-index: 10;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.taskbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Raleway', system-ui, -apple-system, 'Segoe UI', Roboto, 'Inter', sans-serif;
}

.logo h2 {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.06), 0 0 18px rgba(0, 0, 0, 0.6);
}

.name-highlight {
  background: linear-gradient(135deg, #c9c9c9ff, #555555ff, #323232ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-menu a {
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: transform 0.18s cubic-bezier(.2, .9, .2, 1), text-shadow 0.18s ease, color 0.18s ease, background 0.18s ease;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.04);
  display: inline-block;
  transform-origin: center;
}

.nav-menu a:hover {
  color: #ffffff;
  transform: translateY(-3px) scale(1.12);
  background: rgba(255, 255, 255, 0.03);
  text-shadow: 0 0 10px rgba(99, 102, 241, 0.9), 0 0 22px rgba(255, 255, 255, 0.18);
  box-shadow: none;
}

.nav-menu a:active {
  transform: translateY(0) scale(0.995);
  animation: none;
}

.nav-video-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  height: 72px;
  overflow: visible;
}

.nav-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.nav-video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  z-index: 0;
}

.portfolio-content {
  padding-top: 88px;
}

.back-button {
  color: #d1d5db;
  background: rgba(156, 163, 175, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  color: #f3f4f6;
  background: rgba(156, 163, 175, 0.3);
}

.portfolio-content {
  padding-top: 0;
}

.section {
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
}

.section:nth-child(even) {
  background: rgba(0, 0, 0, 0.1);
}

.section-content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
}

.section-title {
  font-size: 3rem;
  font-weight: bold;
  color: #f3f4f6;
  margin-bottom: 2rem;
}

.placeholder-text {
  font-size: 1.2rem;
  color: #d1d5db;
  line-height: 1.6;
  background: rgba(31, 41, 55, 0.8);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(156, 163, 175, 0.2);
}

@media (max-width: 768px) {
  .taskbar-content {
    padding: 0.8rem 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  .logo h2 {
    font-size: 1.2rem;
  }

  .nav-menu {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-menu a {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .portfolio-content {
    padding-top: 120px;
  }

  .section {
    padding: 2rem 1rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .placeholder-text {
    font-size: 1rem;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .taskbar-content {
    padding: 0.6rem 0.8rem;
  }

  .logo h2 {
    font-size: 1.1rem;
  }

  .nav-menu {
    gap: 0.5rem;
  }

  .nav-menu a {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }

  .portfolio-content {
    padding-top: 140px;
  }

  .section {
    padding: 1.5rem 0.8rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .placeholder-text {
    font-size: 0.9rem;
    padding: 1.2rem;
  }
}
</style>
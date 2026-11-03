<script setup>
import { useRouter } from 'vue-router'
import backgroundVideo from '@/assets/video/background.mp4'

const router = useRouter()
const navigateToPortfolio = () => {
  router.push('/portfolio')
}
</script>

<template>
  <div class="app-container" @click="navigateToPortfolio">
    <video autoplay loop muted playsinline class="video-background">
      <source :src="backgroundVideo" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="video-overlay"></div>

    <div class="main-wrapper">
      <div class="top-row">
        <span class="mono-label">Portfolio — 2026</span>
        <span class="mono-label mono-label-right">abrielkarisma.github.io/porto-redesign</span>
      </div>

      <div class="hero">
        <h1 class="hero-line hero-line-1">Abriel</h1>
        <h1 class="hero-line hero-line-2">Karisma</h1>
        <div class="hero-rule"></div>
        <p class="hero-sub">
          QA Engineer &amp; Mobile Developer
        </p>
      </div>

      <div class="bottom-row">
        <span class="mono-label">Click anywhere to enter</span>
        <span class="scroll-bounce">▼</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  cursor: pointer;
  background: var(--blk);
  /* Landing cinematic selalu gelap, apa pun tema global */
  --blk: #0a0a0a;
  --cream: #f2efe9;
  --cream-dim: #d6d2c8;
  --gray: #a8a49b;
  --line: #2a2a2a;
  --gold: #c8a24b;
}

.video-background {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -2;
}

.video-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.62);
  backdrop-filter: blur(6px);
  z-index: -1;
}

.main-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 2.5rem clamp(1.5rem, 5vw, 4rem);
  z-index: 10;
}

.top-row,
.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.mono-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gray);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 0.4rem 0;
}

.hero {
  text-align: left;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
}

.hero-line {
  font-family: var(--font-display);
  font-size: clamp(4.5rem, 17vw, 13rem);
  line-height: 0.88;
  text-transform: uppercase;
  color: var(--cream);
  margin: 0;
  letter-spacing: 0.01em;
}

.hero-line-1 {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--cream);
}

.hero-line-2 {
  color: var(--gold);
}

.hero-rule {
  width: 100%;
  height: 1px;
  background: var(--line);
  margin: 1.75rem 0;
}

.hero-sub {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2.2vw, 1.5rem);
  color: var(--cream-dim);
  letter-spacing: 0.04em;
  margin: 0;
}

.scroll-bounce {
  color: var(--gold);
  font-size: 1rem;
  animation: bounce 1.8s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(6px); opacity: 1; }
}

@media (max-width: 700px) {
  .top-row, .bottom-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
  .mono-label-right { display: none; }
}
</style>

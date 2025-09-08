<script setup>
import { Code, Github, User } from "lucide-vue-next";
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
      <div class="icons-container">
        <div class="icon-circle animate-drop1">
          <Code class="w-8 h-8 text-gray-400" />
        </div>
        <div class="icon-circle animate-drop2">
          <Github class="w-8 h-8 text-gray-400" />
        </div>
        <div class="icon-circle animate-drop3">
          <User class="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <div class="text-container">
        <h2 class="main-title font-raleway animate-typing font-semibold">
          Welcome to
        </h2>
        <h2 class="sub-title font-raleway animate-typing2 font-semibold">
          <span class="name-highlight font-bold">Abriel's</span> Portofolio Website
        </h2>
      </div>
      <div class="website-badge">
        <span class="badge-text">www.abrielwebsoon.com</span>
      </div>
      <div class="click-indicator">
        <div class="click-text">Klik di mana saja untuk masuk</div>
        <div class="click-animation">
        </div>
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
}

.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -2;
}

.video-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  z-index: -1;
}

.main-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  z-index: 10;
  padding: 2rem;
  gap: 2rem;
}

.icons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}

.icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(31, 41, 55, 0.8);
  border: 2px solid rgba(156, 163, 175, 0.4);
  border-radius: 50%;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow:
    0 0 20px rgba(156, 163, 175, 0.3),
    inset 0 0 10px rgba(156, 163, 175, 0.1);
  opacity: 0;
}

.text-container {
  text-align: center;
  color: white;
  max-width: 800px;
}

.main-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #f3f4f6;
  opacity: 1;
}

.sub-title {
  font-size: 2.5rem;
  color: #d1d5db;
  opacity: 1;
}

.name-highlight {
  background: linear-gradient(135deg, #c9c9c9ff, #555555ff, #323232ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
}

.website-badge {
  background: rgba(31, 41, 55, 0.9);
  border: 1px solid rgba(156, 163, 175, 0.4);
  border-radius: 50px;
  padding: 0.75rem 2rem;
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 1s ease-out forwards;
  animation-delay: 3.5s;
  opacity: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.website-badge:hover {
  transform: scale(1.05);
  box-shadow:
    0 0 30px rgba(156, 163, 175, 0.6),
    0 0 60px rgba(156, 163, 175, 0.3),
    inset 0 0 15px rgba(156, 163, 175, 0.2);
  border-color: rgba(156, 163, 175, 0.6);
}

.badge-text {
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.website-badge:hover .badge-text {
  color: #f3f4f6;
}

.click-indicator {
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: fadeInUp 1s ease-out forwards;
  animation-delay: 4s;
  opacity: 0;
}

.click-text {
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
}

.click-animation {
  color: #60a5fa;
  animation: pulse 2s infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

.icon-circle svg {
  transition: transform 0.3s ease;
}

.icon-circle:hover {
  transform: scale(1.15);
  box-shadow:
    0 0 30px rgba(156, 163, 175, 0.6),
    0 0 60px rgba(156, 163, 175, 0.3),
    inset 0 0 15px rgba(156, 163, 175, 0.2);
}

.icon-circle:hover svg {
  transform: scale(1.2);
}

@keyframes drop {
  0% {
    transform: translateY(-200px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes typing {
  from {
    width: 0
  }

  to {
    width: 100%
  }
}

@keyframes blink {
  50% {
    border-color: transparent
  }
}

.animate-drop1 {
  animation: drop 1s ease-out forwards;
}

.animate-drop2 {
  animation: drop 1s ease-out forwards;
  animation-delay: 0.3s;
}

.animate-drop3 {
  animation: drop 1s ease-out forwards;
  animation-delay: 0.6s;
}

.animate-typing {
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid transparent;
  animation: typing 2s steps(11, end) forwards;
  opacity: 1;
}

.animate-typing2 {
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #d1d5db;
  animation: typing 4s steps(32, end) forwards, blink 0.75s step-end infinite;
  animation-delay: 2.5s;
  opacity: 1;
}

@media (min-width: 768px) {

  .main-title,
  .sub-title {
    font-size: 3rem;
  }

  .icons-container {
    gap: 5rem;
  }

  .main-wrapper {
    gap: 3rem;
  }
}

@media (max-width: 640px) {
  .icons-container {
    gap: 2rem;
  }

  .main-title,
  .sub-title {
    font-size: 1.875rem;
  }

  .main-wrapper {
    padding: 1rem;
    gap: 1.5rem;
  }

  .click-indicator {
    bottom: 1rem;
  }

  .icon-circle {
    width: 60px;
    height: 60px;
  }

  .icon-circle svg {
    width: 24px;
    height: 24px;
  }

  .website-badge {
    padding: 0.5rem 1.5rem;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {

  .main-title,
  .sub-title {
    font-size: 1.5rem;
  }

  .icons-container {
    gap: 1.5rem;
  }

  .icon-circle {
    width: 50px;
    height: 50px;
  }

  .icon-circle svg {
    width: 20px;
    height: 20px;
  }

  .main-wrapper {
    padding: 0.5rem;
    gap: 1rem;
  }

  .website-badge {
    padding: 0.4rem 1rem;
    font-size: 0.7rem;
  }

  .click-text {
    font-size: 0.75rem;
  }

  .animate-typing {
    animation: typing 1.5s steps(11, end) forwards;
  }

  .animate-typing2 {
    animation: typing 3s steps(25, end) forwards, blink 0.75s step-end infinite;
    animation-delay: 2s;
  }

  .text-container {
    max-width: 90vw;
  }
}
</style>

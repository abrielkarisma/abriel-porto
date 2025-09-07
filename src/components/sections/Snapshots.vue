<template>
  <section id="snapshots" class="section snapshots-section" ref="snapshotsSection">
    <div class="section-content" :class="{ revealed: inView }">
      <h2 class="section-title">Snapshots</h2>
      <p class="section-subtitle">A collection of captured moments that showcase my journey, experiences, and
        achievements throughout my academic and professional path.</p>

      <div class="carousel-container">
        <div class="carousel-wrapper">
          <button class="carousel-btn carousel-prev" @click="prevSlide" :disabled="currentSlide === 0">
            <i class="arrow-left">‹</i>
          </button>

          <div class="carousel-viewport">
            <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * slideWidth}%)` }">
              <div v-for="(photo, index) in photos" :key="index" class="carousel-slide" @click="openLightbox(index)">
                <div class="slide-image-container">
                  <img :src="photo.src" :alt="photo.alt" class="slide-image" loading="lazy" />
                  <div class="slide-overlay">
                    <div class="slide-overlay-content">
                      <h3 class="slide-overlay-title">{{ photo.title }}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button class="carousel-btn carousel-next" @click="nextSlide" :disabled="currentSlide >= maxSlide">
            <i class="arrow-right">›</i>
          </button>
        </div>

        <!-- Carousel Indicators -->
        <div class="carousel-indicators">
          <button v-for="(photo, index) in photos" :key="index" class="indicator"
            :class="{ active: isSlideVisible(index) }" @click="goToSlide(index)"></button>
        </div>
      </div>

      <!-- Lightbox Modal -->
      <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
        <div class="lightbox-content" @click.stop>
          <button class="lightbox-close" @click="closeLightbox">&times;</button>
          <img :src="photos[currentPhotoIndex].src" :alt="photos[currentPhotoIndex].alt" class="lightbox-image" />
          <div class="lightbox-info">
            <h3>{{ photos[currentPhotoIndex].title }}</h3>
          </div>
          <button class="lightbox-nav lightbox-prev" @click="prevPhoto">‹</button>
          <button class="lightbox-nav lightbox-next" @click="nextPhoto">›</button>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="contact-section" :class="{ revealed: inView }">
        <h3 class="contact-title">Let's Connect</h3>
        <div class="contact-cards">
          <a href="mailto:abrielcha.ac@gmail.com" class="contact-card email-card">
            <div class="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-10 5L2 7" />
              </svg>
            </div>
            <div class="contact-info">
              <span class="contact-type">Email</span>
              <span class="contact-value">abrielcha.ac@gmail.com</span>
            </div>
          </a>

          <a href="https://wa.me/6282266095743" target="_blank" class="contact-card whatsapp-card">
            <div class="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <div class="contact-info">
              <span class="contact-type">WhatsApp</span>
              <span class="contact-value">+62 822-6609-5743</span>
            </div>
          </a>

          <a href="https://instagram.com/abrielkarisma" target="_blank" class="contact-card instagram-card">
            <div class="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
            <div class="contact-info">
              <span class="contact-type">Instagram</span>
              <span class="contact-value">@abrielkarisma</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Intersection observer for animations
const inView = ref(false)
const snapshotsSection = ref(null)

// Gallery photos data - you can customize titles and descriptions for each photo
const photos = ref([
  {
    src: '/src/assets/snapshots/asprak.jpg',
    alt: 'Laboratory Assistant',
    title: 'Laboratory Assistant',
    description: 'Mobile Programming Lab Assistant at Telkom University Surabaya'
  },
  {
    src: '/src/assets/snapshots/dmlogistik.jpg',
    alt: 'Logistic Team',
    title: 'Logistic Team Campus Orientation Committee',
    description: 'Add your description here'
  },
  {
    src: '/src/assets/snapshots/DMtim.jpg',
    alt: 'Campus Orientation Committee',
    title: 'Campus Orientation Committee',
    description: 'Add your description here'
  },
    {
    src: '/src/assets/snapshots/talent.jpg',
    alt: 'Various Content of Me as a Talent',
    title: 'Various Content of Me as a Talent',
    description: 'Add your description here'
  },
  {
    src: '/src/assets/snapshots/himse.jpg',
    alt: 'HIMSE',
    title: 'Software Engineering Student Association',
    description: 'Add your description here'
  },
  {
    src: '/src/assets/snapshots/ieee.jpg',
    alt: 'IEEE Visit',
    title: 'IEEE Visit',
    description: 'Add your description here'
  },
  {
    src: '/src/assets/snapshots/ieeemeet.jpg',
    alt: 'IEEE Team Meeting',
    title: 'IEEE Team Meeting',
    description: 'Add your description here'
  },
  {
    src: '/src/assets/snapshots/itmsib.jpg',
    alt: 'Alfath Intern IT Division',
    title: 'Alfath Intern IT Division',
    description: 'Add your description here'
  },
  {
    src: '/src/assets/snapshots/meet ieee.jpg',
    alt: 'IEEE Team Discussion',
    title: 'IEEE Team Discussion',
    description: 'Add your description here'
  },
  {
    src: '/src/assets/snapshots/msibalfath.jpg',
    alt: 'MSIB Batch 6 at Alfath Corporation',
    title: 'MSIB Batch 6 at Alfath Corporation',
    description: 'Add your description here'
  },
  {
    src: '/src/assets/snapshots/pameranprodi.jpg',
    alt: 'Representing Software Engineering at Campus Expo',
    title: 'Representing Software Engineering at Campus Expo',
    description: 'Add your description here'
  },
  {
    src: '/src/assets/snapshots/pameranrfc.jpg',
    alt: 'RFC Showcase',
    title: 'RFC Showcase',
    description: 'Add your description here'
  },
  {
    src: '/src/assets/snapshots/panitiadm.jpg',
    alt: 'Campus Orientation Committee',
    title: 'Campus Orientation Committee',
    description: 'Add your description here'
  },

])

// Carousel functionality
const currentSlide = ref(0)
const slidesPerView = ref(4) // Number of slides visible at once
const slideWidth = ref(25) // Width percentage per slide (100 / slidesPerView)

// Responsive slides per view
const updateSlidesPerView = () => {
  const width = window.innerWidth
  if (width < 480) {
    slidesPerView.value = 1
    slideWidth.value = 100
  } else if (width < 768) {
    slidesPerView.value = 2
    slideWidth.value = 50
  } else if (width < 1024) {
    slidesPerView.value = 3
    slideWidth.value = 33.333
  } else {
    slidesPerView.value = 4
    slideWidth.value = 25
  }
}

// Computed properties
const maxSlide = computed(() => {
  return Math.max(0, photos.value.length - slidesPerView.value)
})

// Carousel navigation
const nextSlide = () => {
  if (currentSlide.value < maxSlide.value) {
    currentSlide.value++
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const goToSlide = (index) => {
  const targetSlide = Math.min(index, maxSlide.value)
  currentSlide.value = targetSlide
}

const isSlideVisible = (index) => {
  return index >= currentSlide.value && index < currentSlide.value + slidesPerView.value
}

// Auto-play functionality (optional)
const autoPlay = ref(true)
const autoPlayInterval = ref(null)

const startAutoPlay = () => {
  if (autoPlay.value) {
    autoPlayInterval.value = setInterval(() => {
      if (currentSlide.value >= maxSlide.value) {
        currentSlide.value = 0
      } else {
        nextSlide()
      }
    }, 4000) // Change slide every 4 seconds
  }
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

// Lightbox functionality
const lightboxOpen = ref(false)
const currentPhotoIndex = ref(0)

const openLightbox = (index) => {
  currentPhotoIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = 'auto'
}

const nextPhoto = () => {
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % photos.value.length
}

const prevPhoto = () => {
  currentPhotoIndex.value = currentPhotoIndex.value === 0
    ? photos.value.length - 1
    : currentPhotoIndex.value - 1
}

// Keyboard navigation
const handleKeydown = (event) => {
  if (!lightboxOpen.value) return

  if (event.key === 'Escape') {
    closeLightbox()
  } else if (event.key === 'ArrowRight') {
    nextPhoto()
  } else if (event.key === 'ArrowLeft') {
    prevPhoto()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  updateSlidesPerView()
  window.addEventListener('resize', updateSlidesPerView)
  startAutoPlay()

  // Intersection observer for animations
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        inView.value = true
      }
    })
  }, { threshold: 0.12 })

  if (snapshotsSection.value) {
    io.observe(snapshotsSection.value)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', updateSlidesPerView)
  stopAutoPlay()
})
</script>

<style scoped>
.snapshots-section {
  padding: 2rem 2rem;
  background: rgba(0, 0, 0, 0.02);
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

.section-title,
.section-subtitle {
  transform: translateY(-12px);
  opacity: 0;
  transition: transform 420ms cubic-bezier(.22, .9, .33, 1), opacity 360ms ease;
}

.section-content.revealed .section-title {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.12s;
}

.section-content.revealed .section-subtitle {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.22s;
}

.gallery-container {
  margin-top: 2rem;
}

/* Carousel Styles */
.carousel-container {
  margin-top: 2rem;
  max-width: 100%;
  overflow: hidden;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.carousel-viewport {
  flex: 1;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.carousel-slide {
  flex: 0 0 25%;
  /* Default: 4 slides visible */
  min-width: 0;
  cursor: pointer;
  position: relative;
}

.slide-image-container {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  margin: 0 0.5rem;
  border-radius: 15px;
  background: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-image-container:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-image-container:hover .slide-image {
  transform: scale(1.05);
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(128, 128, 128, 0.6), rgba(255, 255, 255, 0.3));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
}

.slide-image-container:hover .slide-overlay {
  opacity: 1;
}

.slide-overlay-content {
  text-align: center;
  color: white;
  padding: 1.5rem;
  transform: translateY(20px);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-image-container:hover .slide-overlay-content {
  transform: translateY(0);
}

.slide-overlay-title {
  font-size: 1.3rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Carousel Navigation Buttons */
.carousel-btn {
  background: transparent;
  border: none;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 32px;
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.carousel-btn:hover:not(:disabled) {
  transform: scale(1.2);
  color: white;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  transform: none;
}

.arrow-left,
.arrow-right {
  font-style: normal;
  line-height: 1;
}

/* Carousel Indicators */
.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: white;
  transform: scale(1.2);
}

/* Lightbox Styles */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.lightbox-image {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  display: block;
}

.lightbox-info {
  padding: 1.5rem;
  text-align: center;
  background: white;
}

.lightbox-info h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.lightbox-info p {
  color: #666;
  line-height: 1.4;
}

.lightbox-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.lightbox-close:hover {
  background: white;
  transform: scale(1.1);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.lightbox-prev {
  left: 20px;
}

.lightbox-next {
  right: 20px;
}

.lightbox-nav:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .carousel-slide {
    flex: 0 0 33.333%;
    /* 3 slides visible */
  }
}

@media (max-width: 768px) {
  .snapshots-section {
    padding: 2rem 1rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .carousel-slide {
    flex: 0 0 50%;
    /* 2 slides visible */
  }

  .slide-image-container {
    height: 220px;
    margin: 0 0.25rem;
  }

  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .slide-overlay-title {
    font-size: 1.1rem;
  }

  .lightbox-nav {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }

  .lightbox-prev {
    left: 10px;
  }

  .lightbox-next {
    right: 10px;
  }
}

@media (max-width: 480px) {
  .carousel-slide {
    flex: 0 0 100%;
    /* 1 slide visible */
  }

  .slide-image-container {
    height: 200px;
    margin: 0 0.125rem;
  }

  .carousel-wrapper {
    gap: 0.5rem;
  }

  .carousel-btn {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }

  .slide-overlay-content {
    padding: 1rem;
  }

  .lightbox-content {
    max-width: 95vw;
    max-height: 95vh;
  }

  .lightbox-info {
    padding: 1rem;
  }

  .carousel-indicators {
    margin-top: 1.5rem;
  }

  .indicator {
    width: 8px;
    height: 8px;
  }
}

/* Contact Section */
.contact-section {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(156, 163, 175, 0.2);
}

.contact-title {
  font-size: 2rem;
  font-weight: bold;
  color: #f3f4f6;
  text-align: center;
  margin-bottom: 2rem;
  transform: translateY(-12px);
  opacity: 0;
  transition: transform 420ms cubic-bezier(.22, .9, .33, 1), opacity 360ms ease;
}

.section-content.revealed .contact-title {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.8s;
}

.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.contact-card {
  background: rgba(31, 41, 55, 0.6);
  border: 1px solid rgba(156, 163, 175, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  transform: translateY(20px);
  opacity: 0;
}

.section-content.revealed .contact-card {
  transform: translateY(0);
  opacity: 1;
}

.section-content.revealed .contact-card:nth-child(1) {
  transition-delay: 0.9s;
}

.section-content.revealed .contact-card:nth-child(2) {
  transition-delay: 1s;
}

.section-content.revealed .contact-card:nth-child(3) {
  transition-delay: 1.1s;
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border-color: rgba(59, 130, 246, 0.3);
}

.contact-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.email-card .contact-icon {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.whatsapp-card .contact-icon {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.instagram-card .contact-icon {
  background: linear-gradient(135deg, #f59e0b, #dc2626);
  color: white;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.contact-type {
  color: #f3f4f6;
  font-weight: 600;
  font-size: 0.9rem;
}

.contact-value {
  color: #9ca3af;
  font-size: 0.85rem;
}

/* Contact Responsive */
@media (max-width: 768px) {
  .contact-section {
    margin-top: 2rem;
  }

  .contact-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .contact-cards {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .contact-card {
    padding: 1.2rem;
  }
}

@media (max-width: 480px) {
  .contact-title {
    font-size: 1.3rem;
  }

  .contact-card {
    padding: 1rem;
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
  }

  .contact-info {
    align-items: center;
  }
}
</style>
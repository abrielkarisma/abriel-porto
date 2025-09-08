<template>
    <div class="project-detail-page">
        <div class="back-button-top">
            <router-link to="/portfolio" class="back-btn-top">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                Back to Portfolio
            </router-link>
        </div>

        <section class="hero-section">
            <div class="hero-content">
                <div class="breadcrumb">
                    <router-link to="/portfolio" class="breadcrumb-link">Portfolio</router-link>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-current">{{ project.title }}</span>
                </div>
                <h1 class="project-title">{{ project.title }}</h1>

                <div class="hero-mockup">
                    <img :src="imageUrl(project.image)" :alt="project.title + ' Mockup'" />
                </div>

                <p class="project-subtitle">{{ project.desc }}</p>
            </div>
        </section>

        <div class="content-separator">
            <div class="separator-line"></div>
            <div class="separator-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
            </div>
            <div class="separator-line"></div>
        </div>

        <section class="content-section">
            <div class="content-container">
                <div v-if="project.previewImage" class="preview-section">
                    <h2 class="section-heading">Application Preview</h2>
                    <div class="full-preview-container">
                        <img :src="imageUrl(project.previewImage)" :alt="project.title + ' Preview'" />
                    </div>
                </div>

                <div v-if="project.previewImage" class="content-separator">
                    <div class="separator-line"></div>
                    <div class="separator-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                            <path d="M12 1l3 6l6 1l-4 5l1 6l-6-3l-6 3l1-6l-4-5l6-1z" />
                        </svg>
                    </div>
                    <div class="separator-line"></div>
                </div>

                <div v-if="project.slug === 'rfc-store'" class="video-section">
                    <h2 class="section-heading">Demo Video</h2>
                    <div class="video-container-clean">
                        <iframe :src="project.youtubeUrl" title="RFC Store Demo" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                        </iframe>
                    </div>
                </div>

                <div v-if="project.slug === 'rfc-store'" class="content-separator">
                    <div class="separator-line"></div>
                    <div class="separator-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                    <div class="separator-line"></div>
                </div>

                <div class="description-section">
                    <h2 class="section-heading">About This Project</h2>
                    <div class="description-content">
                        <p v-for="(paragraph, i) in project.fullDescription" :key="i">{{ paragraph }}</p>
                    </div>
                </div>

                <div class="content-separator">
                    <div class="separator-line"></div>
                    <div class="separator-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                        </svg>
                    </div>
                    <div class="separator-line"></div>
                </div>

                <div class="tech-stack-section">
                    <h2 class="section-heading">Technology Stack</h2>
                    <div class="tech-grid">
                        <div class="tech-item" v-for="(tech, i) in project.techStack" :key="i">
                            <div class="tech-icon">
                                <img :src="techIconUrl(tech.icon)" :alt="tech.name" />
                            </div>
                            <div class="tech-info">
                                <h4>{{ tech.name }}</h4>
                                <p>{{ tech.purpose }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="project.features" class="content-separator">
                    <div class="separator-line"></div>
                    <div class="separator-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div class="separator-line"></div>
                </div>

                <div class="features-section" v-if="project.features">
                    <h2 class="section-heading">Key Features</h2>
                    <div class="features-grid">
                        <div class="feature-item" v-for="(feature, i) in project.features" :key="i">
                            <div class="feature-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                            </div>
                            <div class="feature-content">
                                <h4>{{ feature.title }}</h4>
                                <p>{{ feature.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="project.slug === 'refoodbish'" class="documentation-section">
                    <h2 class="section-heading">Project Documentation</h2>
                    <div class="doc-content">
                        <p>Documentation for the Refoodbish application is available
                            to provide complete details about system requirements and specifications.</p>
                        <a :href="project.documentationUrl" class="doc-link" target="_blank">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                            </svg>
                            Download Documentation
                        </a>
                    </div>
                </div>

                <div v-if="project.slug === 'refoodbish'" class="content-separator">
                    <div class="separator-line"></div>
                    <div class="separator-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1L9 9L1 9L7 14L5 22L12 18L19 22L17 14L23 9L15 9L12 1Z" />
                        </svg>
                    </div>
                    <div class="separator-line"></div>
                </div>

                <div v-if="project.hkiInfo" class="hki-section">
                    <h2 class="section-heading">{{ project.hkiInfo.title }}</h2>
                    <div class="hki-content">
                        <div class="hki-badge">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                            <span class="hki-label">HKI Registered</span>
                        </div>
                        <p class="hki-description">{{ project.hkiInfo.description }}</p>
                        <div class="hki-details">
                            <span class="hki-reg-number">Registration Number: {{ project.hkiInfo.registrationNumber
                            }}</span>
                        </div>
                        <a :href="project.hkiInfo.downloadUrl" class="hki-download-link" target="_blank">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                            </svg>
                            Download HKI Certificate
                        </a>
                    </div>
                </div>

                <div v-if="project.hkiInfo" class="content-separator">
                    <div class="separator-line"></div>
                    <div class="separator-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 19H5V5H19V19Z" />
                        </svg>
                    </div>
                    <div class="separator-line"></div>
                </div>

                <div class="links-section">
                    <h2 class="section-heading">Project Links</h2>
                    <div class="project-links">
                        <template v-if="project.githubUrls">
                            <a v-for="(github, index) in project.githubUrls" :key="index" :href="github.url"
                                class="project-link github-link" target="_blank">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                {{ github.name }}
                            </a>
                        </template>
                        <a v-else-if="project.githubUrl" :href="project.githubUrl" class="project-link github-link"
                            target="_blank">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            View on GitHub
                        </a>
                        <a v-if="project.figmaUrl" :href="project.figmaUrl" class="project-link figma-link"
                            target="_blank">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M15.5 2C13.57 2 12 3.57 12 5.5V8H8.5C6.57 8 5 9.57 5 11.5S6.57 15 8.5 15H12V18.5C12 20.43 13.57 22 15.5 22S19 20.43 19 18.5S17.43 15 15.5 15H12V11.5C12 9.57 13.57 8 15.5 8S19 9.57 19 11.5S17.43 15 15.5 15" />
                            </svg>
                            View in Figma
                        </a>
                        <a v-if="project.demoUrl" :href="project.demoUrl" class="project-link demo-link"
                            target="_blank">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                            </svg>
                            Live Demo
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <div class="back-button-container">
            <router-link to="/portfolio" class="back-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                Back to Portfolio
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            projects: {
                'rfc-store': {
                    slug: 'rfc-store',
                    title: 'RFC Store',
                    desc: 'RFC Store is a mobile application designed to simplify the sales process, streamline stock management, and provide comprehensive sales reports for harvested products.',
                    fullDescription: [
                        'RFC Store is a smart farming Android application developed for the Rooftop Farming Center (RFC) at Telkom University Surabaya. The app was designed to digitalize product sales, inventory management, and streamline transactions, replacing the manual, word-of-mouth selling process and cash-only payments previously used. RFC Store empowers RFC with a modern sales platform, enabling broader market reach and more efficient farming operations.',
                        'Role & Contributions: Collaborated in a 3-person development team to design and implement the application. Focused on building the Android mobile app with Flutter, integrated with a Node.js backend for product management, transactions, and reporting. Implemented secure payment processing using the Midtrans payment gateway to enable digital transactions. Conducted usability tests and iterations to ensure the solution met RFCs operational and user requirements.',
                        'Methodology: Adopted DT@Scrum, a hybrid framework combining Design Thinking and Scrum. Design Thinking guided problem identification, ideation, prototyping, and user validation. Scrum ensured iterative sprints, adaptability to change, and fast feedback loops.',
                        'Outcomes & Impact: Successfully deployed and tested with RFC staff, buyers, and admins at Telkom University Surabaya. Digitized farm sales operations, covering product management, cart system, order processing, and digital payments through Midtrans integration. Improved efficiency, transparency, and user experience with a System Usability Scale (SUS) score of 73, reflecting good usability and positive user acceptance.',
                    ],
                    tags: ['Flutter', 'Node.js', 'Payment Gateway'],
                    image: 'rfcstore.svg',
                    previewImage: 'previewrfc.svg',
                    youtubeUrl: 'https://www.youtube.com/embed/DUO-C-oxLmA',
                    githubUrls: [
                        { name: 'Frontend (Flutter)', url: 'https://github.com/abrielkarisma/rfc_apps' },
                        { name: 'Backend (Node.js)', url: 'https://github.com/abrielkarisma/smart-farming-api-fork/tree/main' }
                    ],
                    figmaUrl: 'https://www.figma.com/design/pM0gUS4lzYuRKexhnSU6F2/Smart-Farming-App---Backup?node-id=5210-4069&t=FSYtZOHvMaUHM6Pi-1',
                    techStack: [
                        { name: 'Flutter', icon: 'flutter.png', purpose: 'Cross-platform mobile development framework' },
                        { name: 'Node.js', icon: 'nodejs.png', purpose: 'Backend server and API development' },
                        { name: 'MySQL', icon: 'mysql.png', purpose: 'Database management system' },
                        { name: 'Midtrans', icon: 'midtrans.png', purpose: 'Secure payment processing integration' }
                    ],
                    features: [
                        { title: 'Inventory Management', description: 'Real-time stock tracking and low-stock alerts' },
                        { title: 'Sales Reports', description: 'Comprehensive analytics and reporting dashboard' },
                        { title: 'Payment Integration', description: 'Secure payment processing with multiple payment methods' },
                        { title: 'User Management', description: 'Multi-role user system with different access levels' }
                    ],
                    hkiInfo: {
                        title: 'Intellectual Property Rights (HKI)',
                        description: 'This project has been officially registered for Intellectual Property Rights protection.',
                        downloadUrl: 'https://drive.google.com/file/d/1dY-BFvMfB5treK8TemOOdKAXwQI9XpTi/view?usp=sharing',
                        registrationNumber: '000944284'
                    }
                },
                'sharfin-app': {
                    slug: 'sharfin-app',
                    title: 'Sharfin App',
                    desc: 'It is a mobile application designed to provide comprehensive Islamic knowledge and Sharia finance insights through various formats such as videos, eBooks, and blogs.',
                    fullDescription: [
                        'Sharfin App is a comprehensive mobile platform designed to provide in-depth knowledge about Islamic principles and Sharia finance through multiple accessible formats including videos, eBooks, and blog posts. The application serves as an educational hub for users seeking to understand Islamic concepts and financial practices aligned with Islamic law.',
                        'Beyond educational content, Sharfin integrates practical Islamic features to support users in their daily religious practices. These include prayer time schedules that provide accurate notifications for daily prayers, a qibla direction finder to help users determine the correct direction for prayer, a digital Quran with translations and audio recitations for spiritual study, and a nearby mosque locator to find places of worship based on the user\'s location.',
                        'Developed with the goal of making Islamic knowledge and Sharia-compliant finance accessible to everyone, the app creates a seamless bridge between traditional Islamic teachings and modern financial concepts. Each section is carefully curated to provide reliable, authentic information that helps users make informed decisions aligned with Islamic principles in their financial and spiritual lives.'
                    ],
                    githubUrls: [
                        { name: 'Frontend (Flutter)', url: 'https://github.com/abrielkarisma/sharfin-app' },
                    ],
                    tags: ['Flutter'],
                    image: 'sharfin.svg',
                    githubUrl: 'https://github.com/abrielkarisma/sharfin_app',
                    previewImage: 'previewsharfin.svg',
                    techStack: [
                        { name: 'Flutter', icon: 'flutter.png', purpose: 'Cross-platform mobile development' },
                        { name: 'Golang', icon: 'golang.png', purpose: 'High-performance backend API development' },
                        { name: 'MySQL', icon: 'mysql.png', purpose: 'Content and user data management' }
                    ],
                    features: [
                        { title: 'Video Library', description: 'Curated educational videos on Islamic finance topics' },
                        { title: 'eBook Collection', description: 'Downloadable books and guides on Sharia finance' },
                        { title: 'Expert Blogs', description: 'Regular insights and articles from industry experts' },
                        { title: 'Progress Tracking', description: 'Track learning progress and bookmarked content' }
                    ]
                },
                'refoodbish': {
                    slug: 'refoodbish',
                    title: 'Refoodbish.',
                    desc: 'Refoodbish is a mobile application that connects users to share surplus edible food with others.',
                    previewImage: 'previewrefood.svg',
                    fullDescription: [
                        'Refoodbish addresses the critical issue of food waste by creating a platform where individuals and businesses can share surplus edible food with those who need it. The application facilitates a community-driven approach to reducing food waste while helping people access quality meals.',
                        'The platform enables users to post available food items with details about quantity, pickup location, and expiration time. Other users can browse available food and request pickup, creating an efficient food redistribution network within local communities.',
                        'Developed as a social impact project, Refoodbish demonstrates how technology can be leveraged to address environmental and social challenges while building stronger community connections through food sharing initiatives.'
                    ],
                    tags: ['Kotlin'],
                    image: 'refoodbish.svg',
                    githubUrl: 'https://github.com/abrielkarisma/SDK-app',
                    figmaUrl: 'https://www.figma.com/proto/OPlEoMDEvKcVXsIUvLfIrz/Platform-Berbagi-Makanan---Refoodbish?type=design&node-id=1807-5605&t=Rp1VXf635FwKcnnr-1&scaling=scale-down&page-id=154%3A809&starting-point-node-id=1807%3A5605&show-proto-sidebar=1',
                    documentationUrl: 'https://drive.google.com/file/d/1gand7djZplYM4nBAqABu5p4NC6Q1Vnm6/view?usp=sharing',
                    techStack: [
                        { name: 'Kotlin', icon: 'kotlin.png', purpose: 'Native Android app development' },
                        { name: 'Android Studio', icon: 'androidstudio.png', purpose: 'Integrated development environment' },
                        { name: 'MySQL', icon: 'mysql.png', purpose: 'User and food listing data storage' }
                    ],
                    features: [
                        { title: 'Food Sharing', description: 'Post and discover available surplus food in your area' },
                        { title: 'Location-based Search', description: 'Find food opportunities near your location' },
                        { title: 'User Verification', description: 'Verified user system for safe food sharing' },
                        { title: 'Waste Tracking', description: 'Track environmental impact and food saved' }
                    ],
                    hkiInfo: {
                        title: 'Intellectual Property Rights (HKI)',
                        description: 'This project has been officially registered for Intellectual Property Rights protection.',
                        downloadUrl: 'https://drive.google.com/file/d/19sa-8sLYghPaM13osBElyWgnH-PL5D-I/view?usp=sharing',
                        registrationNumber: '000449643'
                    }
                },
                'portfolio-website': {
                    slug: 'portfolio-website',
                    title: 'Portfolio Website',
                    desc: 'A personal portfolio website showcasing my introduction, featured projects, technical stack, and professional experiences.',
                    fullDescription: [
                        'This portfolio website serves as a comprehensive showcase of my professional journey, technical skills, and project accomplishments. Built with modern web technologies, it demonstrates my capabilities in front-end development and user experience design.',
                        'The website features an interactive design with smooth animations, responsive layouts, and optimized performance across all devices. Each section is carefully crafted to provide visitors with clear insights into my background, skills, and work experience.',
                        'Beyond just displaying information, the portfolio demonstrates practical implementation of advanced web development concepts including component-based architecture, state management, and modern CSS techniques for creating engaging user interfaces.'
                    ],
                    tags: ['Vue.js', 'Javascript', 'Tailwind CSS'],
                    image: 'porto.svg',
                    githubUrl: 'https://github.com/abrielkarisma/portofolio_abriel',
                    techStack: [
                        { name: 'Vue.js', icon: 'vue.png', purpose: 'Progressive JavaScript framework for UI development' },
                        { name: 'JavaScript', icon: 'js.png', purpose: 'Core programming language for interactivity' },
                        { name: 'Tailwind CSS', icon: 'tailwind.png', purpose: 'Utility-first CSS framework for styling' },
                        { name: 'Vite', icon: 'vite.png', purpose: 'Fast build tool and development server' }
                    ],
                    features: [
                        { title: 'Responsive Design', description: 'Optimized experience across all device sizes' },
                        { title: 'Interactive Animations', description: 'Smooth transitions and engaging user interactions' },
                        { title: 'Project Showcase', description: 'Detailed presentation of development projects' },
                        { title: 'Contact Integration', description: 'Multiple ways for visitors to get in touch' }
                    ]
                }
            }
        }
    },
    computed: {
        project() {
            const slug = this.$route.params.slug
            return this.projects[slug] || {}
        }
    },
    methods: {
        imageUrl(name) {
            try {
                return new URL(`../assets/images/${name}`, import.meta.url).href
            } catch (e) {
                return '/placeholder-image.png'
            }
        },
        techIconUrl(name) {
            try {
                return new URL(`../assets/icon/${name}`, import.meta.url).href
            } catch (e) {
                return '/placeholder-icon.png'
            }
        }
    },
    mounted() {
        if (!this.project.title) {
            this.$router.push('/portfolio')
        }
    }
}
</script>

<style scoped>
.project-detail-page {
    min-height: 100vh;
    background: #0f0f0f;
    color: #f3f4f6;
    position: relative;
}

.back-button-top {
    position: fixed;
    top: 2rem;
    left: 2rem;
    z-index: 1000;
}

.back-btn-top {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(31, 41, 55, 0.9);
    color: #f3f4f6;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(156, 163, 175, 0.2);
    backdrop-filter: blur(10px);
}

.back-btn-top:hover {
    background: rgba(31, 41, 55, 1);
    border-color: #123458;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.hero-section {
    padding: 8rem 2rem 4rem;
    background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
    text-align: center;
}

.hero-content {
    max-width: 800px;
    margin: 0 auto;
}

.breadcrumb {
    margin-bottom: 2rem;
    font-size: 0.9rem;
}

.breadcrumb-link {
    color: #9ca3af;
    text-decoration: none;
    transition: color 0.3s ease;
}

.breadcrumb-link:hover {
    color: #123458;
}

.breadcrumb-separator {
    margin: 0 0.5rem;
    color: #6b7280;
}

.breadcrumb-current {
    color: #123458;
    font-weight: 600;
}

.project-title {
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #f3f4f6, #9ca3af);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.project-subtitle {
    font-size: 1.25rem;
    color: #d1d5db;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.project-tags {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 3rem;
}

.tag {
    background: rgba(18, 52, 88, 0.2);
    color: #123458;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    border: 1px solid rgba(18, 52, 88, 0.3);
    font-weight: 500;
}

.hero-mockup {
    margin: 3rem auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero-mockup img {
    max-width: 500px;
    width: 100%;
    height: auto;
    border-radius: 0;
    box-shadow: none;
    transition: transform 0.3s ease;
    display: block;
}

.hero-mockup img:hover {
    transform: scale(1.02);
}

.content-separator {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4rem 0;
    padding: 0 2rem;
}

.separator-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(156, 163, 175, 0.3), transparent);
}

.separator-icon {
    margin: 0 2rem;
    padding: 1rem;
    background: rgba(31, 41, 55, 0.5);
    border-radius: 50%;
    color: #123458;
    border: 1px solid rgba(156, 163, 175, 0.2);
}

.content-section {
    padding: 4rem 2rem;
}

.content-container {
    max-width: 1200px;
    margin: 0 auto;
}

.section-heading {
    font-size: 2rem;
    font-weight: bold;
    color: #f3f4f6;
    margin-bottom: 3rem;
    text-align: center;
}

.preview-section {
    margin-bottom: 6rem;
}

.full-preview-container {
    width: 100%;
    text-align: center;
    background: rgba(31, 41, 55, 0.3);
    padding: 3rem;
    border-radius: 16px;
    border: 1px solid rgba(156, 163, 175, 0.2);
}

.full-preview-container img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.video-section {
    margin-bottom: 6rem;
}

.video-container-clean {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    background: transparent;
}

.video-container-clean iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
}

.full-video-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    background: rgba(31, 41, 55, 0.3);
    border: 1px solid rgba(156, 163, 175, 0.2);
}

.full-video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 16px;
}

.description-section {
    margin-bottom: 6rem;
}

.description-section {
    margin-bottom: 6rem;
}

.description-content p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #d1d5db;
    margin-bottom: 1.5rem;
    text-align: justify;
}

.tech-stack-section {
    margin-bottom: 6rem;
}

.tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.tech-item {
    background: rgba(31, 41, 55, 0.5);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid rgba(156, 163, 175, 0.2);
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: all 0.3s ease;
}

.tech-item:hover {
    transform: translateY(-5px);
    border-color: #123458;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 30px rgba(18, 52, 88, 0.6), 0 0 60px rgba(18, 52, 88, 0.2);
    background: rgba(31, 41, 55, 0.7);
}

.tech-icon img {
    width: 48px;
    height: 48px;
    object-fit: contain;
}

.tech-info h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #f3f4f6;
    margin-bottom: 0.5rem;
}

.tech-info p {
    color: #9ca3af;
    line-height: 1.5;
}

.features-section {
    margin-bottom: 6rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.feature-item {
    background: rgba(31, 41, 55, 0.3);
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid rgba(156, 163, 175, 0.2);
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: all 0.3s ease;
}

.feature-item:hover {
    transform: translateY(-3px);
    border-color: #123458;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2), 0 0 25px rgba(18, 52, 88, 0.5), 0 0 50px rgba(18, 52, 88, 0.2);
    background: rgba(31, 41, 55, 0.5);
}

.feature-icon {
    background: rgba(18, 52, 88, 0.2);
    padding: 0.75rem;
    border-radius: 8px;
    color: #123458;
    flex-shrink: 0;
}

.feature-content h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #f3f4f6;
    margin-bottom: 0.5rem;
}

.feature-content p {
    color: #9ca3af;
    line-height: 1.5;
}

.documentation-section {
    margin-bottom: 6rem;
}

.doc-content {
    text-align: center;
    background: rgba(31, 41, 55, 0.3);
    padding: 3rem;
    border-radius: 12px;
    border: 1px solid rgba(156, 163, 175, 0.2);
}

.doc-content p {
    font-size: 1.1rem;
    color: #d1d5db;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.doc-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #123458, #1e40af);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.doc-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(18, 52, 88, 0.3);
}

.hki-section {
    margin-bottom: 6rem;
}

.hki-content {
    background: rgba(31, 41, 55, 0.3);
    padding: 3rem;
    border-radius: 12px;
    border: 1px solid rgba(156, 163, 175, 0.2);
    text-align: center;
}

.hki-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #059669, #10b981);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 2rem;
}

.hki-content p {
    font-size: 1.1rem;
    color: #d1d5db;
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.hki-registration {
    background: rgba(18, 52, 88, 0.2);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(18, 52, 88, 0.3);
    margin-bottom: 2rem;
}

.hki-registration strong {
    color: #60a5fa;
    font-weight: 600;
}

.hki-download {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #123458, #1e40af);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.hki-download:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(18, 52, 88, 0.3);
    background: linear-gradient(135deg, #1e40af, #2563eb);
}

.links-section {
    margin-bottom: 4rem;
}

.project-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.project-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.github-link {
    background: rgba(36, 41, 46, 0.8);
    color: #f3f4f6;
    border-color: rgba(108, 117, 125, 0.3);
}

.github-link:hover {
    background: #24292e;
    border-color: #6c757d;
    transform: translateY(-2px);
}

.figma-link {
    background: rgba(242, 78, 30, 0.1);
    color: #f24e1e;
    border-color: rgba(242, 78, 30, 0.3);
}

.figma-link:hover {
    background: rgba(242, 78, 30, 0.2);
    border-color: #f24e1e;
    transform: translateY(-2px);
}

.demo-link {
    background: rgba(18, 52, 88, 0.2);
    color: #123458;
    border-color: rgba(18, 52, 88, 0.3);
}

.demo-link:hover {
    background: rgba(18, 52, 88, 0.3);
    border-color: #123458;
    transform: translateY(-2px);
}

.back-button-container {
    text-align: center;
    padding: 2rem;
}

.back-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(31, 41, 55, 0.8);
    color: #f3f4f6;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 1px solid rgba(156, 163, 175, 0.2);
}

.back-button:hover {
    background: rgba(31, 41, 55, 1);
    border-color: rgba(18, 52, 88, 0.4);
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .back-button-top {
        top: 1rem;
        left: 1rem;
    }

    .back-btn-top {
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
    }

    .hero-section {
        padding: 6rem 1rem 3rem;
    }

    .project-title {
        font-size: 2.5rem;
    }

    .hero-mockup img {
        max-width: 400px;
    }

    .content-section {
        padding: 3rem 1rem;
    }

    .content-separator {
        margin: 3rem 0;
    }

    .separator-icon {
        margin: 0 1rem;
        padding: 0.75rem;
    }

    .full-preview-container,
    .full-video-container {
        margin: 0 1rem;
    }

    .tech-grid,
    .features-grid {
        grid-template-columns: 1fr;
    }

    .project-links {
        flex-direction: column;
        align-items: center;
    }

    .project-link {
        width: 100%;
        max-width: 300px;
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .project-title {
        font-size: 2rem;
    }

    .hero-mockup img {
        max-width: 300px;
    }

    .tech-item,
    .feature-item {
        padding: 1rem;
    }

    .doc-content {
        padding: 2rem 1rem;
    }

    .full-preview-container {
        padding: 2rem 1rem;
    }
}
</style>

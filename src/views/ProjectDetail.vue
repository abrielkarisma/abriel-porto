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
            <div class="hero-content wrap">
                <div class="breadcrumb">
                    <router-link to="/portfolio" class="breadcrumb-link">Portfolio</router-link>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-current">{{ project.title }}</span>
                </div>
                <div class="hero-label font-mono">[ CASE STUDY ]</div>
                <h1 class="project-title font-display">{{ project.title }}</h1>

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
            <div class="content-container wrap">
                <div v-if="project.previewImage" class="preview-section">
                    <div class="section-block">
                        <h2 class="section-heading font-mono">Application Preview</h2>
                    </div>
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
                    <div class="section-block">
                        <h2 class="section-heading font-mono">Demo Video</h2>
                    </div>
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
                    <div class="section-block">
                        <h2 class="section-heading font-mono">About This Project</h2>
                    </div>
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
                    <div class="section-block">
                        <h2 class="section-heading font-mono">Technology Stack</h2>
                    </div>
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
                    <div class="section-block">
                        <h2 class="section-heading font-mono">Key Features</h2>
                    </div>
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

                <div v-if="project.screenshots" class="screenshots-section">
                    <div class="content-separator">
                        <div class="separator-line"></div>
                        <div class="separator-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 19H5V5H19V19M7 9H9V7H7V9M11 9H13V7H11V9M15 9H17V7H15V9M7 13H9V11H7V13M11 13H13V11H11V13M15 13H17V11H15V13M7 17H9V15H7V17M11 17H13V15H11V17M15 17H17V15H15V17Z" />
                            </svg>
                        </div>
                        <div class="separator-line"></div>
                    </div>
                    <div class="section-block">
                        <h2 class="section-heading font-mono">Screenshots</h2>
                    </div>
                    <div class="shots-grid">
                        <div class="shot-item" v-for="(s, i) in project.screenshots" :key="i"
                            :class="s.kind === 'mobile' ? 'shot-mobile' : 'shot-pc'">
                            <div class="shot-frame">
                                <img :src="imageUrl(s.src)" :alt="s.label" loading="lazy" />
                            </div>
                            <span class="shot-label font-mono">{{ s.label }}</span>
                        </div>
                    </div>
                </div>

                <div v-if="project.slug === 'refoodbish'" class="documentation-section">
                    <div class="section-block">
                        <h2 class="section-heading font-mono">Project Documentation</h2>
                    </div>
                    <div class="doc-content">
                        <p>Documentation for the Refoodbish application is available
                            to provide complete details about system requirements and specifications.</p>
                        <a :href="project.documentationUrl" class="doc-link btn-outline" target="_blank">
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
                    <div class="section-block">
                        <h2 class="section-heading font-mono">{{ project.hkiInfo.title }}</h2>
                    </div>
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
                        <a :href="project.hkiInfo.downloadUrl" class="hki-download-link btn-outline" target="_blank">
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
                    <div class="section-block">
                        <h2 class="section-heading font-mono">Project Links</h2>
                    </div>
                    <div class="project-links">
                        <template v-if="project.githubUrls">
                            <a v-for="(github, index) in project.githubUrls" :key="index" :href="github.url"
                                class="project-link github-link btn-outline" target="_blank">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                {{ github.name }}
                            </a>
                        </template>
                        <a v-else-if="project.githubUrl" :href="project.githubUrl" class="project-link github-link btn-outline"
                            target="_blank">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                View on GitHub
                            </a>
                        <a v-if="project.figmaUrl" :href="project.figmaUrl" class="project-link figma-link btn-outline"
                            target="_blank">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M15.5 2C13.57 2 12 3.57 12 5.5V8H8.5C6.57 8 5 9.57 5 11.5S6.57 15 8.5 15H12V18.5C12 20.43 13.57 22 15.5 22S19 20.43 19 18.5S17.43 15 15.5 15H12V11.5C12 9.57 13.57 8 15.5 8S19 9.57 19 11.5S17.43 15 15.5 15" />
                                </svg>
                                View in Figma
                            </a>
                        <a v-if="project.demoUrl" :href="project.demoUrl" class="project-link demo-link btn-outline"
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
            <router-link to="/portfolio" class="back-button btn-outline">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                Back to Portfolio
            </router-link>
        </div>
    </div>
</template>

<script>
import reactIcon from '../assets/icon/react.png'
import sqliteIcon from '../assets/icon/sqlite.png'
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
                },
                'fundy': {
                    slug: 'fundy',
                    title: 'Fundy',
                    desc: 'Personal finance web app to manage accounts, categories, transactions, reminders, and income/expense charts.',
                    fullDescription: [
                        'Fundy is a personal finance web application built to help people take control of their money. It replaces scattered notes and spreadsheets with a single, clean platform for managing accounts, categories, transactions, and recurring reminders in one place.',
                        'The app was designed around real daily budgeting habits: it supports multiple profiles secured by a 4-digit PIN, tracks income and expenses, moves money between accounts, and visualizes monthly and 6-month trends with dynamic charts. A reminder system handles both weekly recurring reminders and one-time dates.',
                        'Built as a full-stack project, Fundy pairs a FastAPI + SQLAlchemy + SQLite backend with a React + Vite + Tailwind frontend. It is deployed on a VPS behind a Cloudflare Tunnel and live at https://abrielfinance.my.id/. The production database is kept out of the repository.'
                    ],
                    tags: ['React', 'FastAPI', 'SQLite'],
                    image: 'fundy.png',
                    previewImage: 'previewfundy.png',
                    demoUrl: 'https://abrielfinance.my.id/',
                    techStack: [
                        { name: 'React', icon: 'react.png', purpose: 'UI library for the single-page frontend' },
                        { name: 'Vite', icon: 'vite.png', purpose: 'Fast build tool and dev server' },
                        { name: 'Tailwind CSS', icon: 'tailwind.png', purpose: 'Utility-first CSS framework for styling' },
                        { name: 'FastAPI', icon: 'python.png', purpose: 'Backend API framework' },
                        { name: 'SQLAlchemy', icon: 'python.png', purpose: 'ORM for SQLite database access' },
                        { name: 'SQLite', icon: 'sqlite.png', purpose: 'Lightweight embedded database' }
                    ],
                    features: [
                        { title: 'Multi-Profile Login', description: 'Profiles secured by a 4-digit PIN' },
                        { title: 'Transactions & Transfers', description: 'Record income, expense, and transfers between accounts' },
                        { title: 'Accounts', description: 'Bank, e-wallet, and cash accounts with opening balance and auto-balance' },
                        { title: 'Charts', description: 'Daily and 6-month income/expense trends with dynamic Y-axis' },
                        { title: 'Reminders', description: 'Weekly-recurring or one-time reminders with in-app/browser notifications' },
                        { title: 'Dark Mode & Privacy', description: 'Light/dark theme and global hide/show balance toggle' }
                    ],
                    screenshots: [
                        { src: 'fundy-pc-dashboard.png', label: 'Dashboard · Desktop', kind: 'pc' },
                        { src: 'fundy-pc-transaksi.png', label: 'Transaksi · Desktop', kind: 'pc' },
                        { src: 'fundy-pc-grafik.png', label: 'Grafik · Desktop', kind: 'pc' },
                        { src: 'fundy-pc-rekening.png', label: 'Rekening · Desktop', kind: 'pc' },
                        { src: 'fundy-mob-dashboard.png', label: 'Dashboard · Mobile', kind: 'mobile' },
                        { src: 'fundy-mob-transaksi.png', label: 'Transaksi · Mobile', kind: 'mobile' },
                        { src: 'fundy-mob-grafik.png', label: 'Grafik · Mobile', kind: 'mobile' },
                        { src: 'fundy-mob-rekening.png', label: 'Rekening · Mobile', kind: 'mobile' }
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
            if (name === 'react.png') return reactIcon
            if (name === 'sqlite.png') return sqliteIcon
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
    background: var(--blk);
    color: var(--cream);
    position: relative;
    font-family: var(--font-body);
}

/* ---------- Back button (top, fixed) ---------- */
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
    background: var(--blk-3);
    color: var(--cream);
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--line);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s, transform 0.2s;
}

.back-btn-top:hover {
    border-color: var(--gold);
    color: var(--gold);
    transform: translateY(-2px);
}

/* ---------- Hero ---------- */
.hero-section {
    padding: 8rem 0 4rem;
    background: linear-gradient(180deg, var(--blk) 0%, var(--blk-2) 100%);
    text-align: center;
    border-bottom: 1px solid var(--line);
}

.hero-content {
    max-width: 800px;
    margin: 0 auto;
}

.breadcrumb {
    margin-bottom: 1.5rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.breadcrumb-link {
    color: var(--gray);
    text-decoration: none;
    transition: color 0.2s;
}

.breadcrumb-link:hover {
    color: var(--gold);
}

.breadcrumb-separator {
    margin: 0 0.5rem;
    color: var(--gray-dim);
}

.breadcrumb-current {
    color: var(--cream-dim);
}

.hero-label {
    color: var(--gold);
    font-size: 0.8rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    margin-bottom: 1rem;
}

.project-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 6rem);
    text-transform: uppercase;
    line-height: 0.95;
    color: var(--cream);
    margin: 0 0 0.5rem;
}

.project-subtitle {
    font-size: 1.1rem;
    color: var(--gray);
    line-height: 1.7;
    max-width: 560px;
    margin: 0 auto;
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
    display: block;
    transition: transform 0.3s ease;
}

.hero-mockup img:hover {
    transform: scale(1.02);
}

/* ---------- Separator ---------- */
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
    background: linear-gradient(90deg, transparent, var(--line), transparent);
}

.separator-icon {
    margin: 0 2rem;
    padding: 1rem;
    background: var(--blk-2);
    border-radius: 50%;
    color: var(--gold);
    border: 1px solid var(--line);
}

/* ---------- Layout & section scaffold ---------- */
.content-section {
    padding: 4rem 0;
}

.section-block {
    border-top: 1px solid var(--line);
    padding-top: 2.5rem;
    margin-bottom: 2.5rem;
}

.section-heading {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0;
}

/* ---------- Preview ---------- */
.preview-section {
    margin-bottom: 4rem;
}

.full-preview-container {
    width: 100%;
    text-align: center;
    background: var(--blk-2);
    padding: 3rem;
    border: 1px solid var(--line);
}

.full-preview-container img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
}

/* ---------- Video ---------- */
.video-section {
    margin-bottom: 4rem;
}

.video-container-clean {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    background: var(--blk-2);
    border: 1px solid var(--line);
}

.video-container-clean iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

/* ---------- Description ---------- */
.description-section {
    margin-bottom: 4rem;
}

.description-content p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--cream-dim);
    margin-bottom: 1.5rem;
}

/* ---------- Tech stack ---------- */
.tech-stack-section {
    margin-bottom: 4rem;
}

.tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.tech-item {
    background: var(--blk-3);
    padding: 1.75rem;
    border: 1px solid var(--line);
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: border-color 0.2s, transform 0.2s;
}

.tech-item:hover {
    border-color: var(--gold);
    transform: translateY(-3px);
}

.tech-icon img {
    width: 48px;
    height: 48px;
    object-fit: contain;
}

.tech-info h4 {
    font-family: var(--font-display);
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--cream);
    margin: 0 0 0.4rem;
}

.tech-info p {
    color: var(--gray);
    line-height: 1.5;
    font-size: 0.95rem;
    margin: 0;
}

/* ---------- Features ---------- */
.features-section {
    margin-bottom: 4rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.25rem;
}

.feature-item {
    background: var(--blk-3);
    padding: 1.5rem;
    border: 1px solid var(--line);
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: border-color 0.2s, transform 0.2s;
}

.feature-item:hover {
    border-color: var(--gold);
    transform: translateY(-3px);
}

.feature-icon {
    background: var(--blk-4);
    padding: 0.75rem;
    color: var(--gold);
    flex-shrink: 0;
    border: 1px solid var(--line);
}

.feature-content h4 {
    font-family: var(--font-display);
    font-size: 1.05rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--cream);
    margin: 0 0 0.4rem;
}

.feature-content p {
    color: var(--gray);
    line-height: 1.5;
    font-size: 0.95rem;
    margin: 0;
}

/* ---------- Documentation ---------- */
.documentation-section {
    margin-bottom: 4rem;
}

.doc-content {
    text-align: center;
    background: var(--blk-2);
    padding: 3rem;
    border: 1px solid var(--line);
}

.doc-content p {
    font-size: 1.05rem;
    color: var(--cream-dim);
    margin-bottom: 2rem;
    line-height: 1.7;
}

.doc-link {
    color: var(--cream);
}

.doc-link:hover {
    color: var(--gold);
}

/* ---------- HKI ---------- */
.hki-section {
    margin-bottom: 4rem;
}

.hki-content {
    background: var(--blk-2);
    padding: 3rem;
    border: 1px solid var(--line);
    text-align: center;
}

.hki-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--blk-3);
    color: var(--gold);
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--line);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 2rem;
}

.hki-description {
    font-size: 1.05rem;
    color: var(--cream-dim);
    margin-bottom: 1.5rem;
    line-height: 1.7;
}

.hki-reg-number {
    display: inline-block;
    background: var(--blk-3);
    padding: 1rem 1.5rem;
    border: 1px solid var(--line);
    color: var(--cream-dim);
    font-family: var(--font-mono);
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    margin-bottom: 2rem;
}

.hki-download-link {
    color: var(--cream);
}

.hki-download-link:hover {
    color: var(--gold);
}

/* ---------- Links ---------- */
.links-section {
    margin-bottom: 4rem;
}

.project-links {
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
}

.project-link {
    color: var(--cream);
}

.project-link:hover {
    color: var(--gold);
}

.github-link {
    border-color: var(--line);
}

.figma-link {
    border-color: var(--line);
}

.demo-link {
    border-color: var(--line);
}

/* ---------- Back button (bottom) ---------- */
.back-button-container {
    text-align: center;
    padding: 3rem 1.5rem 4rem;
    border-top: 1px solid var(--line);
}

.back-button {
    color: var(--cream);
}

.back-button:hover {
    color: var(--gold);
}

/* ---------- Responsive ---------- */
@media (max-width: 768px) {
    .back-button-top {
        top: 1rem;
        left: 1rem;
    }

    .back-btn-top {
        padding: 0.5rem 1rem;
        font-size: 0.7rem;
    }

    .hero-section {
        padding: 6rem 1rem 3rem;
    }

    .hero-mockup img {
        max-width: 400px;
    }

    .content-section {
        padding: 3rem 0;
    }

    .content-separator {
        margin: 3rem 0;
    }

    .separator-icon {
        margin: 0 1rem;
        padding: 0.75rem;
    }

    .tech-grid,
    .features-grid {
        grid-template-columns: 1fr;
    }

    .project-links {
        flex-direction: column;
        align-items: stretch;
    }

    .project-link {
        justify-content: center;
        width: 100%;
    }
}

@media (max-width: 480px) {
    .project-title {
        font-size: 2.5rem;
    }

    .hero-mockup img {
        max-width: 300px;
    }

    .tech-item,
    .feature-item {
        padding: 1rem;
    }

    .doc-content,
    .hki-content {
        padding: 2rem 1rem;
    }

    .full-preview-container {
        padding: 2rem 1rem;
    }
}

.screenshots-section {
    width: 100%;
}

.shots-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    margin-top: 3rem;
}

.shot-item {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
}

.shot-frame {
    border: 1px solid var(--line);
    border-radius: 6px;
    overflow: hidden;
    background: var(--blk-2);
}

.shot-frame img {
    display: block;
    width: 100%;
    height: auto;
}

.shot-pc .shot-frame {
    aspect-ratio: 16 / 9;
}

.shot-mobile .shot-frame {
    max-width: 340px;
    margin: 0 auto;
    aspect-ratio: 9 / 19;
}

.shot-label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--gray-dim);
    text-align: center;
}

@media (min-width: 640px) {
    .shots-grid {
        grid-template-columns: 1fr 1fr;
    }

    .shot-item:first-child:nth-last-child(1) {
        grid-column: 1 / -1;
    }
}
</style>

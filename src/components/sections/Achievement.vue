<template>
	<section id="achievement" class="section achievement-section" :class="{ 'is-mounted': mounted }" ref="sectionRef">
		<div class="section-content">
			<h2 class="section-title">Achievements</h2>
			<p class="section-subtitle">
				Milestones that reflect my growth in software engineering, project delivery, and quality-driven development.
			</p>

			<div class="board-frame">
				<div class="board-grid">
					<article
						v-for="(item, index) in achievements"
						:key="item.title"
						class="achievement-note"
						:style="{ transitionDelay: `${index * 90}ms` }"
					>
						<div class="pin" aria-hidden="true"></div>
						<p class="achievement-year">{{ item.year }}</p>
						<h3 class="achievement-title">{{ item.title }}</h3>
						<p class="achievement-org">{{ item.org }}</p>
						<p class="achievement-desc">{{ item.description }}</p>
						<a
							class="cert-btn"
							:class="{ disabled: !item.certificateUrl }"
							:href="item.certificateUrl || '#'"
							target="_blank"
							rel="noopener noreferrer"
						>
							View Certificate
						</a>
					</article>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const sectionRef = ref(null)
const mounted = ref(false)

const achievements = [
	{
		year: '2026',
		title: 'Community Service Volunteer – Farm4Orphanage Program ',
		org: 'IEEE ComSoc & Telkom University (Farm4Orphanage Initiative)',
		description: 'Designed and developed a farm monitoring and sales system to digitize agricultural operations. Implemented features such as real-time crop monitoring, inventory management, and product sales tracking. Leveraged modern development practices to build a scalable solution that integrates operational data into a centralized dashboard, enabling better decision-making and improving farm productivity.',
		certificateUrl: 'https://drive.google.com/file/d/1dNnI29L62HRKtOV8RxOHBy7deLwn9kbD/view?usp=drive_link'
	},
]

let observer = null

onMounted(async () => {
	await nextTick()
	if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					mounted.value = entry.isIntersecting
				})
			},
			{ threshold: 0.15 }
		)
		if (sectionRef.value) observer.observe(sectionRef.value)
	} else {
		mounted.value = true
	}
})

onBeforeUnmount(() => {
	if (observer) {
		observer.disconnect()
		observer = null
	}
})
</script>

<style scoped>
.achievement-section {
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
	margin-bottom: 2.5rem;
	max-width: 680px;
	margin-left: auto;
	margin-right: auto;
}

.section-title,
.section-subtitle {
	transform: translateY(-12px);
	opacity: 0;
	transition: transform 420ms cubic-bezier(.22, .9, .33, 1), opacity 360ms ease;
}

.achievement-section.is-mounted .section-title,
.achievement-section.is-mounted .section-subtitle {
	transform: translateY(0);
	opacity: 1;
}

.achievement-section.is-mounted .section-subtitle {
	transition-delay: 0.14s;
}

.board-frame {
	border: 1px solid rgba(156, 163, 175, 0.2);
	border-radius: 16px;
	padding: 1.25rem;
	background:
		radial-gradient(circle at 15% 20%, rgba(18, 52, 88, 0.22), transparent 40%),
		radial-gradient(circle at 88% 10%, rgba(18, 52, 88, 0.16), transparent 35%),
		rgba(17, 17, 17, 0.92);
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
}

.board-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 1rem;
}

.achievement-note {
	position: relative;
	padding: 1.2rem 1.1rem 1rem;
	border-radius: 12px;
	background: linear-gradient(180deg, rgba(26, 26, 26, 0.95), rgba(20, 20, 20, 0.95));
	border: 1px solid rgba(156, 163, 175, 0.16);
	color: #d1d5db;
	transform: translateY(18px) scale(0.98);
	opacity: 0;
	transition: transform 420ms cubic-bezier(.22, .9, .33, 1), opacity 360ms ease, box-shadow 220ms ease, border-color 220ms ease;
}

.achievement-section.is-mounted .achievement-note {
	transform: translateY(0) scale(1);
	opacity: 1;
}

.achievement-note:hover {
	border-color: rgba(18, 52, 88, 0.55);
	box-shadow: 0 12px 26px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(18, 52, 88, 0.15) inset;
}

.pin {
	position: absolute;
	top: 0.55rem;
	right: 0.65rem;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: #123458;
	box-shadow: 0 0 0 2px rgba(18, 52, 88, 0.25), 0 2px 6px rgba(0, 0, 0, 0.55);
}

.achievement-year {
	display: inline-block;
	padding: 0.2rem 0.6rem;
	font-size: 0.76rem;
	font-weight: 700;
	border-radius: 999px;
	letter-spacing: 0.04em;
	color: #e5e7eb;
	background: rgba(18, 52, 88, 0.42);
	border: 1px solid rgba(18, 52, 88, 0.6);
	margin-bottom: 0.8rem;
}

.achievement-title {
	color: #f3f4f6;
	margin: 0 0 0.35rem;
	font-size: 1.05rem;
	line-height: 1.3;
}

.achievement-org {
	color: #9ca3af;
	margin: 0 0 0.65rem;
	font-size: 0.9rem;
	font-weight: 600;
}

.achievement-desc {
	color: #d1d5db;
	margin: 0;
	font-size: 0.92rem;
	line-height: 1.55;
}

.cert-btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin-top: 1rem;
	padding: 0.5rem 0.9rem;
	border-radius: 8px;
	text-decoration: none;
	font-size: 0.85rem;
	font-weight: 600;
	color: #f3f4f6;
	border: 1px solid rgba(18, 52, 88, 0.7);
	background: linear-gradient(135deg, rgba(18, 52, 88, 0.9), rgba(30, 74, 122, 0.9));
	transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
}

.cert-btn:hover {
	transform: translateY(-2px);
	box-shadow: 0 8px 18px rgba(18, 52, 88, 0.35);
	border-color: rgba(42, 90, 138, 0.9);
}

.cert-btn.disabled {
	opacity: 0.45;
	pointer-events: none;
	filter: grayscale(0.2);
}

@media (max-width: 900px) {
	.board-grid {
		grid-template-columns: 1fr;
	}
}

@media (max-width: 768px) {
	.achievement-section {
		padding: 2rem 1rem;
	}

	.section-title {
		font-size: 2rem;
	}

	.section-subtitle {
		font-size: 0.9rem;
		margin-bottom: 1.8rem;
	}

	.board-frame {
		padding: 0.85rem;
	}

	.achievement-note {
		padding: 1rem 0.9rem 0.9rem;
	}
}
</style>

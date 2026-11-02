<template>
	<section id="achievement" class="achievement-section" :class="{ 'is-mounted': mounted }" ref="sectionRef">
		<div class="wrap">
			<header class="section-head">
				<p class="section-label">05 — Achievements</p>
				<h2 class="section-title-sw">Achievements</h2>
				<p class="section-sub-sw">
					Milestones that reflect my growth in software engineering, project delivery, and quality-driven development.
				</p>
			</header>

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
						class="btn-outline cert-btn"
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
	padding: 5.5rem 0 6rem;
}

.section-head {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.section-title-sw,
.section-sub-sw {
	transform: translateY(-14px);
	opacity: 0;
	transition: transform 460ms cubic-bezier(.22, .9, .33, 1), opacity 380ms ease;
}

.section-sub-sw {
	transition-delay: 0.12s;
}

.achievement-section.is-mounted .section-title-sw,
.achievement-section.is-mounted .section-sub-sw {
	transform: translateY(0);
	opacity: 1;
}

.board-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	gap: 1.25rem;
	margin-top: 3rem;
}

.achievement-note {
	position: relative;
	padding: 1.75rem 1.5rem 1.5rem;
	border: 1px solid var(--line);
	background: var(--blk-3);
	transform: translateY(20px);
	opacity: 0;
	transition: transform 460ms cubic-bezier(.22, .9, .33, 1), opacity 400ms ease, border-color 240ms ease, box-shadow 240ms ease;
}

.achievement-section.is-mounted .achievement-note {
	transform: translateY(0);
	opacity: 1;
}

.achievement-note:hover {
	border-color: var(--gold);
	box-shadow: 0 14px 30px rgba(0, 0, 0, 0.4);
}

.pin {
	position: absolute;
	top: 1rem;
	right: 1.1rem;
	width: 9px;
	height: 9px;
	border-radius: 50%;
	background: var(--gold);
	box-shadow: 0 0 0 2px var(--blk-3), 0 0 0 3px var(--gold), 0 2px 6px rgba(0, 0, 0, 0.6);
}

.achievement-year {
	font-family: var(--font-mono);
	font-size: 0.75rem;
	letter-spacing: 0.22em;
	text-transform: uppercase;
	color: var(--gold);
	margin: 0 0 0.9rem;
}

.achievement-title {
	font-family: var(--font-display);
	font-weight: 400;
	font-size: 1.25rem;
	line-height: 1.25;
	text-transform: uppercase;
	letter-spacing: 0.02em;
	color: var(--cream);
	margin: 0 0 0.4rem;
}

.achievement-org {
	color: var(--cream-dim);
	margin: 0 0 0.85rem;
	font-size: 0.85rem;
	font-weight: 600;
	letter-spacing: 0.02em;
}

.achievement-desc {
	color: var(--gray);
	margin: 0;
	font-size: 0.92rem;
	line-height: 1.6;
}

.cert-btn {
	margin-top: 1.25rem;
}

.cert-btn.disabled {
	opacity: 0.4;
	pointer-events: none;
	filter: grayscale(0.4);
}

@media (max-width: 768px) {
	.achievement-section {
		padding: 3rem 0 3.5rem;
	}

	.board-grid {
		gap: 1rem;
		margin-top: 2rem;
	}

	.achievement-note {
		padding: 1.4rem 1.2rem 1.25rem;
	}
}
</style>

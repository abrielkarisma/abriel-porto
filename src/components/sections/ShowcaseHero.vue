<script setup>
import ContainerScroll from "../ContainerScroll.vue"
import fundyDash from "@/assets/images/fundy-pc-dashboard.png"
</script>

<template>
  <section class="showcase">
    <ContainerScroll>
      <template #title>
        <p class="cs-label">Featured Project — 01</p>
        <h1 class="cs-h1">Fundy</h1>
        <p class="cs-sub">Personal finance web app — rebuilt for clarity.</p>
      </template>

      <img
        :src="fundyDash"
        alt="Fundy dashboard screenshot"
        class="card-img"
        draggable="false"
      />
    </ContainerScroll>
  </section>
</template>

<style scoped>
.showcase {
  position: relative;
  overflow: hidden;
  background: var(--blk);
}

.cs-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 1.25rem;
}

.cs-h1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 4.5rem;
  line-height: 0.95;
  color: var(--cream);
  letter-spacing: -0.02em;
  margin: 0;
}

.cs-sub {
  margin-top: 1.5rem;
  font-size: 1.05rem;
  color: var(--gray);
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top;
}

@media (max-width: 768px) {
  .cs-h1 { font-size: 3.25rem; }
}
</style>

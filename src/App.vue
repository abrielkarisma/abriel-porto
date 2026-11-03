<script setup>
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'

const { init } = useTheme()
onMounted(init)
</script>
<template>
  <router-view />
</template>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-family: 'Raleway', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

#app {
  min-height: 100vh;
  width: 100%;
  overflow: visible;
}
</style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;800&display=swap');

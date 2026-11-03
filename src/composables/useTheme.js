import { ref } from 'vue'

const STORAGE_KEY = 'abriel-porto-theme'
const META_THEME = 'meta[name="theme-color"]'

const isLight = ref(false)

function apply() {
  const root = document.documentElement
  root.dataset.theme = isLight.value ? 'light' : 'dark'
  const meta = document.querySelector(META_THEME)
  if (meta) meta.setAttribute('content', isLight.value ? '#efede7' : '#0a0a0a')
}

function init() {
  let saved = null
  try {
    saved = localStorage.getItem(STORAGE_KEY)
  } catch (e) {
    /* private mode / blocked storage: fallback to default */
  }
  isLight.value = saved === 'light'
  apply()
}

function toggle() {
  isLight.value = !isLight.value
  try {
    localStorage.setItem(STORAGE_KEY, isLight.value ? 'light' : 'dark')
  } catch (e) {
    /* storage blocked: theme still applies for this session */
  }
  apply()
}

export function useTheme() {
  return { isLight, toggle, init }
}

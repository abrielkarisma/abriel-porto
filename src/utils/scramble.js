// Global text-scramble: any hovered button/link/heading cycles through
// glyphs before settling into its real text. Delegated, so it works for
// elements added later by the router too.

const GLYPHS =
  "!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

const SELECTOR =
  "a, button, label, .nav-menu li, .logo, .portfolio-btn, .card-cta"

// section yang dikecualikan dari scramble
const EXCLUDED = ".services-section"

const DURATION = 620

let reduced = false

function startScramble(el) {
  if (reduced) return
  if (el.__scrambling) return
  el.__scrambling = true
  el.__abort = false

  const original = el.dataset.orig !== undefined ? el.dataset.orig : el.textContent
  el.dataset.orig = original
  const len = original.length
  const start = performance.now()

  // tiap karakter "resolve" di waktu berbeda → efek gelombang
  const resolveAt = Array.from({ length: len }, (_, i) => {
    if (/[\s]/.test(original[i])) return 0
    return Math.random() * 0.55 + (i / len) * 0.45
  })

  function frame(now) {
    if (el.__abort) {
      el.textContent = original
      el.__scrambling = false
      return
    }
    const t = Math.min(1, (now - start) / DURATION)
    let out = ""
    for (let i = 0; i < len; i++) {
      const ch = original[i]
      if (/[\s]/.test(ch)) {
        out += ch
        continue
      }
      out += t >= resolveAt[i] ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
    }
    el.textContent = out
    if (t < 1) {
      requestAnimationFrame(frame)
    } else {
      el.textContent = original
      el.__scrambling = false
    }
  }
  requestAnimationFrame(frame)
  frame(start) // frame pertama sinkron → efek langsung keburu muncul, nggak nunggu rAF
}

function stopScramble(el) {
  if (!el.__scrambling && !el.__abort) return
  el.__abort = true
  el.textContent = el.dataset.orig !== undefined ? el.dataset.orig : el.textContent
  el.__scrambling = false
}

function init() {
  if (typeof window === "undefined") return
  reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) return // aksesibilitas: jangan scramble kalau user minta reduce motion

  document.addEventListener("mouseover", (e) => {
    const t = e.target instanceof Element ? e.target.closest(SELECTOR) : null
    if (!t) return
    if (EXCLUDED && t.closest(EXCLUDED)) return // section yang dikecualikan
    if (t.__currentHover) return
    t.__currentHover = true
    startScramble(t)
  })

  document.addEventListener("mouseout", (e) => {
    const t = e.target instanceof Element ? e.target.closest(SELECTOR) : null
    if (!t) return
    if (e.relatedTarget && t.contains(e.relatedTarget)) return
    t.__currentHover = false
    stopScramble(t)
  })
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
  } else {
    init()
  }
}

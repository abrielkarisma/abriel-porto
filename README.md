# abriel-porto

Portfolio website — Vue 3 + Vite + Tailwind CSS, hosted on GitHub Pages.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # base path otomatis '/abriel-porto/' untuk GitHub Pages project site
```

```bash
VITE_BASE=/ npm run build
```


## Deploy

```bash
npm run deploy     # build + push dist ke branch gh-pages
```

## Struktur

| Path | Isi |
|---|---|
| `src/views/Home.vue` | Landing splash |
| `src/views/Portfolio.vue` | Navigasi + layout halaman portfolio |
| `src/views/ProjectDetail.vue` | Halaman detail per project (`/project/:slug`) |
| `src/components/sections/` | AboutMe, Projects, TechStack, OutsideCode, Achievement, Snapshots |
| `src/assets/images/` | Mockup project (SVG berisi gambar WebP) |
| `src/assets/snapshots/` | Foto-foto |
| `src/assets/video/` | Background video |
| `public/404.html` | SPA fallback GitHub Pages — ubah `BASE_PATH` kalau pindah domain |
| `public/og-image.jpg` | OG/Twitter share image (1200x630) |

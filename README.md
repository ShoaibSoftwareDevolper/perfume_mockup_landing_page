# perfume_mockup_landing_page

Landing page mockup for **MAISON SÉLUNE**, a fictional independent French fragrance house. It is built with Next.js 16 (App Router), React 19 and Tailwind CSS v4.

## Features

- Editorial layout with a hero, featured products, collection splits, an Objects of Scent grid, a journal and a footer
- Desktop hero with a crossfading image slideshow and a CSS entrance animation
- GSAP and ScrollTrigger scroll reveals, plus image swaps in the editorial splits
- Smooth scrolling with Lenis, loaded only on desktop pointer devices
- Demo bag, search, menu and account panels (client-side only, no backend)
- Respects `prefers-reduced-motion`, with focus management and accessible labels
- Every image goes through `next/image`, with blur placeholders and responsive `sizes`

## Tech stack

| Area      | Tool                              |
| --------- | --------------------------------- |
| Framework | Next.js 16, React 19, TypeScript  |
| Styling   | Tailwind CSS v4                   |
| Motion    | GSAP, @gsap/react, Lenis          |
| Icons     | lucide-react                      |
| Fonts     | DM Sans, Bodoni Moda (next/font)  |

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command         | Description                 |
| --------------- | --------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build   |
| `npm run start` | Serve the production build  |
| `npm run lint`  | Run ESLint                  |

## Project structure

```
app/          Root layout, page, global styles and the app icon
components/   UI sections and client interactivity (header, hero, grids, overlays, motion)
data/         Static content: products, journal entries and image imports
public/       Image assets
```

## Notes

This is a design mockup. The bag, checkout and newsletter are not connected to a backend, and the brand and products are fictional.

## Author

**Shoaib Hassan**, [@ShoaibSoftwareDevolper](https://github.com/ShoaibSoftwareDevolper)

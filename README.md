# 孙维五 — Personal Blog

Dark solarpunk night aesthetic. Built from scratch with vanilla HTML, CSS, and JS — no frameworks, no build step.

## Stack

```
blog/
├── index.html          ← homepage
├── about.html          ← about
├── archive.html        ← post list
├── css/style.css       ← everything visual
├── js/main.js          ← all interactivity
└── posts/
    └── post-template.html  ← duplicate this per post
```

## Features

- Floating sun particles in the hero — interactive, repelled by cursor, slowly rotate and flicker
- Black hole mode — cursor attracts suns instead of repelling, click to supernova
- Background star field — separate white dot layer, shimmers independently
- CRT scanline overlay with slow flicker animation
- Purple vignette around screen edges
- Glassy frosted panels for post cards and archive items
- Live GitHub commit log pulled from the API, displayed bottom-right of hero
- Vertical side label running up the left edge
- Respawn stars button regenerates the particle field
- Nav logo pulses purple on hover with CRT-style animation
- Bracket expand animation `[ ]` on all buttons and links on hover

## Writing a post

1. Copy `posts/post-template.html` → rename it
2. Fill in the `<h1>`, date, and body content in `.post-body`
3. Add it to `archive.html` as an `.archive-item`
4. Add a `.post-card` to the grid in `index.html`

## Hosting

Hosted on GitHub Pages at `Fifthsol.github.io/blog` (or custom domain via Settings → Pages).

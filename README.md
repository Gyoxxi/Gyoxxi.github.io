# Yuxuan Xiong — Personal Portfolio

A personal portfolio website for a full-stack software engineer. Built with Jekyll for static site generation, Gulp for asset pipeline automation, and TypeScript for type-safe frontend scripting.

**Live site**: [gyoxxi.github.io](https://gyoxxi.github.io)

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Static site generator | [Jekyll](https://jekyllrb.com/) | Templates, data-driven content, pages |
| Stylesheet preprocessor | [Sass/SCSS](https://sass-lang.com/) | Component-based styling |
| Frontend scripting | [TypeScript](https://www.typescriptlang.org/) | Type-safe DOM logic |
| Build orchestration | [Gulp 5](https://gulpjs.com/) + [ts-node](https://typestrong.org/ts-node/) | SCSS → CSS, TypeScript → JS, image optimization |
| Dev server | [BrowserSync](https://browsersync.io/) | Live reload during development |
| Scroll animations | [ScrollReveal](https://scrollrevealjs.org/) | Section entrance animations (loaded via CDN) |
| Linting | [ESLint 9](https://eslint.org/) + [@typescript-eslint](https://typescript-eslint.io/) | Code quality |
| CSS processing | [Autoprefixer](https://autoprefixer.github.io/) + [clean-css](https://github.com/clean-css/clean-css) | Vendor prefixes + minification |
| Image optimization | [imagemin](https://github.com/imagemin/imagemin) | Lossless image compression |
| Deployment | GitHub Pages | Static hosting from `main` branch |

---

## Project Structure

```
├── _config.yml                   # Jekyll site settings (name, URL, social links, plugins)
├── _config_dev.yml               # Override config for local development
├── gulpfile.js                   # Gulp entry point: bootstraps ts-node, loads gulpfile.ts
├── gulpfile.ts                   # Gulp task orchestration (TypeScript)
├── tsconfig.json                 # TypeScript config for browser code (_scripts/)
├── tsconfig.node.json            # TypeScript config for Node.js/Gulp build code
├── eslint.config.mjs             # ESLint flat config (TypeScript-aware)
├── package.json                  # NPM dependencies and scripts
├── index.html                    # Main page (Jekyll front matter + include directives)
├── 404.html                      # Custom 404 error page
├── robots.txt                    # Search engine crawl directives
├── resume.pdf                    # Downloadable resume (linked from the site)
│
├── _layouts/                     # Jekyll page wrappers
│   ├── default.html              # Primary layout: includes head, page content, scripts
│   └── compress.html             # HTML compression layout used in production
│
├── _includes/                    # Reusable HTML components (referenced by layouts and index)
│   ├── head.html                 # <head>: meta tags, Open Graph, SEO, favicon, CSS link
│   ├── scripts.html              # JS includes: ScrollReveal CDN + compiled main.js
│   ├── switch.html               # Dark/light mode toggle UI
│   ├── top-button.html           # Scroll-to-top floating button
│   ├── intro.html                # Hero section: name, tagline, employment status
│   ├── background.html           # Bio/about section
│   ├── skills.html               # Skills grid — data-driven from _data/skills.yml
│   ├── experience.html           # Employment timeline — data-driven from _data/experience.yml
│   ├── featured-projects.html    # Showcased project cards with screenshots and tech stacks
│   ├── other-projects.html       # Secondary projects list (currently inactive)
│   ├── employment-status.html    # "Open to work" / employed status badge
│   └── footer.html               # Footer with social icon links
│
├── _data/                        # YAML content files consumed by Jekyll templates
│   ├── skills.yml                # Skill categories: Languages, Frameworks, Tools, Design
│   ├── experience.yml            # Job history: company, role, dates, description, tech
│   └── other-projects.yml        # Additional project entries (inactive)
│
├── _scripts/                     # TypeScript source (compiled by Gulp to js/)
│   └── main.ts                   # All frontend logic: dark mode, scroll button, wave emoji, ScrollReveal
│
├── _scss/                        # SCSS source (compiled by Gulp to css/)
│   ├── main.scss                 # Entry point: imports all partials in order
│   └── partials/
│       ├── _globals.scss         # Color palette, font variables, responsive breakpoint mixins
│       ├── _fonts.scss           # @font-face declarations
│       ├── _base.scss            # HTML reset, section layout, dark mode classes, top-button
│       ├── _switch.scss          # Dark/light toggle button styling
│       ├── _intro.scss           # Hero section layout and wave-hand animation
│       ├── _background.scss      # Bio section styles
│       ├── _skills.scss          # Skills grid layout
│       ├── _experience.scss      # Job history timeline styles
│       ├── _employment-status.scss # Status badge styles
│       ├── _featured-projects.scss # Project card grid with hover effects
│       ├── _other-projects.scss  # Secondary projects list styles
│       ├── _footer.scss          # Footer layout and social icons
│       └── _404.scss             # 404 page styles
│
├── build/                        # Gulp task modules — each .ts file exports a fn receiving `gulp`
│   ├── sass.ts                   # SCSS → CSS: compile, autoprefixer, minify
│   ├── scripts.ts                # TypeScript → JS: runs tsc, copies output to _site/js
│   ├── images.ts                 # Image optimization via imagemin
│   ├── browsersync.ts            # Dev server setup, Jekyll build tasks, file watchers
│   └── *.js                      # Minimal forwarding shims (Node resolves .js before .ts)
│
├── css/                          # Compiled CSS (git-tracked for Jekyll passthrough)
│   └── main.css
│
├── js/                           # Compiled JavaScript (git-tracked for Jekyll passthrough)
│   └── main.js
│
├── img/                          # Static image assets
│   ├── emojis/                   # Emoji PNGs used as decorative elements
│   ├── featured/                 # Project screenshots organized by project slug
│   ├── social/                   # Social media icon SVGs
│   └── switch/                   # Dark mode toggle icons (sun.svg, moon.svg)
│
├── fonts/                        # Custom web font files
└── _site/                        # Jekyll build output — gitignored, auto-generated
```

---

## Architecture

### Asset pipeline

```
Source                       Gulp task        Output           Served by Jekyll
──────────────────────────────────────────────────────────────────────────────
_scss/main.scss + partials → sass         → css/main.css   → _site/css/
_scripts/main.ts           → scripts(tsc) → js/main.js    → _site/js/
img/**                     → images       → _site/img/
_layouts/ + _includes/     → jekyll-build → _site/*.html
```

Jekyll reads `css/` and `js/` as regular passthrough directories (no front matter) and copies them into `_site/`. Compiled assets are committed to the repo so GitHub Pages can serve them without running the Gulp pipeline.

### TypeScript split configuration

The project has two TypeScript compilation contexts:

| Config | Covers | Target | Module system |
|--------|--------|--------|---------------|
| `tsconfig.json` | `_scripts/*.ts` (browser code) | ES2020 | ESNext (for browsers) |
| `tsconfig.node.json` | `gulpfile.ts`, `build/*.ts` (build tooling) | ES2022 | CommonJS (for Node.js) |

Gulp is invoked via the `.js` entry point (`gulpfile.js`), which registers `ts-node` with `tsconfig.node.json` before loading `gulpfile.ts`. Node's module resolution prefers `.js` over `.ts`, so the `build/*.js` files are minimal shims that forward to their `.ts` counterparts once ts-node is active.

### Data-driven sections

Three page sections are entirely content-driven through YAML — no HTML changes required to update them:

| Section | Data file | Template |
|---------|-----------|----------|
| Skills grid | `_data/skills.yml` | `_includes/skills.html` |
| Experience timeline | `_data/experience.yml` | `_includes/experience.html` |
| Other projects | `_data/other-projects.yml` | `_includes/other-projects.html` |

Jekyll's `{% for item in site.data.skills %}` loops render these automatically.

### Dark / light mode

The site detects local time on page load: 7pm–7am defaults to dark mode, otherwise light. The toggle button (`_includes/switch.html`) lets users override it at any time. State lives entirely in the CSS class `body.night` — no localStorage, so it re-detects on each page load. Night-mode color overrides cascade from `body.night` selectors in `_base.scss`.

### TypeScript → compiled JS

`_scripts/main.ts` is the single frontend entry point. It is compiled by `npx tsc` (per `tsconfig.json`) to `js/main.js`. The TypeScript file:

- Declares a minimal ambient type for the ScrollReveal CDN global
- Replaces the former jQuery dependency with vanilla DOM APIs
- Uses `window.scrollTo({ behavior: 'smooth' })` for scroll-to-top
- Uses `opacity` + `pointer-events` CSS properties for the top-button fade (the existing `transition: all 0.2s ease-in-out` in `_base.scss` handles the animation)

### Responsive breakpoints

All breakpoints are defined as SCSS mixins in `_globals.scss` and used as `@include <name> { ... }` throughout the partials:

| Mixin | Max width |
|-------|-----------|
| `thirteen` | 1280px |
| `desktop` | 1024px |
| `little-desktop` | 850px |
| `tablet` | 768px |
| `weird-medium` | 630px |
| `phablet` | 550px |
| `mobile` | 480px |
| `small-mobile` | 360px |
| `tiny-mobile` | 330px |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Ruby** with Bundler (for Jekyll)

### 1. Install Ruby dependencies

```bash
gem install jekyll bundler jekyll-minifier jekyll-sitemap
```

### 2. Install Node dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

This runs `gulp serve --watch`, which:
1. Compiles SCSS → `css/main.css`
2. Compiles TypeScript → `js/main.js` via `tsc`
3. Runs Jekyll (with `_config_dev.yml` overrides) → `_site/`
4. Starts BrowserSync at `http://localhost:3000`
5. Watches `_scss/**`, `_scripts/*.ts`, and template files — recompiles and reloads on change

### 4. Production build

```bash
npm run build
```

Runs the full pipeline in sequence: `sass` → `scripts` → `images` → `jekyll-build`.

---

## Development

### Updating content

| What to change | Where |
|----------------|-------|
| Skills | `_data/skills.yml` |
| Job experience | `_data/experience.yml` |
| Featured projects | `_includes/featured-projects.html` |
| Bio text | `_includes/background.html` |
| Site metadata (name, email, social links) | `_config.yml` |
| Employment status badge | `_includes/employment-status.html` |

### Adding a new page section

1. Create `_includes/<section>.html`
2. Create `_scss/partials/_<section>.scss` and add `@import 'partials/<section>';` to `_scss/main.scss`
3. Add `{% include <section>.html %}` to `index.html`

### TypeScript

Type-check without building:

```bash
npm run type-check
```

Lint TypeScript source:

```bash
npm run lint
```

### SCSS conventions

- Colors and breakpoints are defined as variables/mixins in `_globals.scss` — use these rather than hardcoded values
- Each section has its own partial under `_scss/partials/`
- Night-mode overrides go inside the `body.night` selector block in the relevant partial or `_base.scss`

---

## Deployment

The site is deployed via **GitHub Pages** from the `main` branch. Committed `css/` and `js/` files are served directly — GitHub Pages runs Jekyll but does not run the Gulp pipeline.

**Workflow**: run `npm run build` locally → commit compiled assets alongside source → push to `main`.

---

## License

ISC © Yuxuan Xiong

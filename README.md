# Winter Arc 2026 — 90-Day Development OS

A personal 90-day operating system for disciplined growth, career transition, and project building by **Hussnain Ansari** (*Accounting & Finance → Business Analytics → Building*).

## Project Setup & Local Development

### 1. Install Dependencies
```bash
npm install
```
Or for clean CI installations with verified lockfile:
```bash
npm ci
```

### 2. Run Local Development Server
```bash
npm run dev
```
Starts the Vite dev server at `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```
Generates production-optimized static assets in `dist/`, including:
- `dist/index.html`: Production HTML entry point
- `dist/404.html`: Single-page application fallback for GitHub Pages
- `dist/.nojekyll`: Disables Jekyll processing on GitHub Pages
- `dist/favicon.svg`: Vector icon asset
- `dist/assets/`: Minified CSS, JS bundles, and optimized media

### 4. Production Preview
```bash
npm run preview
```
Previews the production `dist/` bundle locally.

---

## GitHub Pages Deployment

The repository is pre-configured with a modern GitHub Actions workflow:
`.github/workflows/deploy.yml`

### Deployment Flow
```text
Push to main/master branch
        ↓
GitHub Actions Workflow (.github/workflows/deploy.yml)
        ↓
Install dependencies (npm ci)
        ↓
Build production bundle (npm run build)
        ↓
Upload dist/ as GitHub Pages artifact
        ↓
Deploy to GitHub Pages
        ↓
LIVE WEBSITE
```

### Base Path Resolution
In `vite.config.ts`, the base path is configured deterministically:
- **Local Dev Server (`npm run dev`)**: Serves from `/` for clean local development.
- **Production Build (`npm run build`)**: Resolves to `/Winter-Arc/` (or dynamic repository from `GITHUB_REPOSITORY` / `BASE_URL`).

### GitHub Pages Setup Instructions
1. Push your latest code to the repository: `https://github.com/hussnainansari-dev/Winter-Arc`.
2. In your GitHub repository, open **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, ensure **GitHub Actions** is selected.
4. The workflow (`.github/workflows/deploy.yml`) builds and deploys `dist/`.
5. Your live site is available at:
   **`https://hussnainansari-dev.github.io/Winter-Arc/`**
   *(Note: URL is case-sensitive and must be `Winter-Arc/`)*

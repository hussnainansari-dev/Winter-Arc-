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

### Dynamic Vite Base Path
In `vite.config.ts`, the base path resolves automatically:
- **GitHub Pages Project Site** (`https://<username>.github.io/<repo>/`): Automatically detects `GITHUB_REPOSITORY` from GitHub Actions and configures `/<repo>/`.
- **GitHub Pages User/Org Site** (`https://<username>.github.io/`): Automatically configures `/`.
- **Local Dev / Standalone Builds**: Falls back to `./`.
- **Manual Override**: Can be specified via `VITE_BASE` environment variable.

### GitHub Pages Setup Instructions
1. Push your repository to GitHub.
2. In your GitHub repository, open **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. Push a commit or trigger the workflow manually under **Actions** → **Deploy Winter Arc 2026 to GitHub Pages**.
5. Your site will be live at `https://<username>.github.io/<repository-name>/`.

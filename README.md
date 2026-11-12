# ASILI Engineering Solutions website

Company website for ASILI Engineering Solutions Limited: Home, About & Services, and an Enquiry form. Built with Astro and React, hosted on Netlify.

Read [AGENTS.md](AGENTS.md) before contributing. It has the scope, design rules and working rules. The product spec is [asili-website-spec.md](asili-website-spec.md).

## Requirements

- Node.js 22.23.4 or newer (the project uses 26, see `.nvmrc`)
- npm

## Run it locally

```sh
npm install
npm run dev        # http://localhost:4321
```

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | Type and template check (`astro check`) |
| `npm run icons` | Rebuild the icon set after adding a name to `scripts/icons.mjs` |
| `npm test` | Playwright tests on a phone and a desktop browser (builds first) |

While `npm run dev` is running, http://localhost:4321/styleguide shows every design system component. It is not built or deployed.

The first time you run tests on a machine, install the browser: `npx playwright install chromium`.

## Adding projects (Decap CMS at `/admin`)

The owner adds completed projects at `https://<site>/admin`, signing in with a GitHub account that can write to this repository. Each project is saved as a Markdown file in `src/content/projects/` (photo in `src/assets/projects/`) and committed to `main`. Netlify then rebuilds the site. About & Services shows the six newest.

Only real, finished ASILI jobs, with our own daylight photos. A project with no photo shows "No photos uploaded yet".

**One-time setup** (after the site is on Netlify):

1. On GitHub: Settings → Developer settings → OAuth Apps → **New OAuth App**.
   - Homepage URL: the Netlify site address (e.g. `https://<name>.netlify.app`)
   - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Create it, then **Generate a new client secret**. Keep the Client ID and secret for step 2.
2. In Netlify: Site configuration → Access & security → **OAuth** → Install provider → **GitHub**. Paste the Client ID and secret.
3. Open `/admin`, choose **Login with GitHub**, and add a project.

To try the editor on your own computer without signing in: run `npx decap-server` in one terminal and `npm run dev` in another, then open http://localhost:4321/admin/. Changes are written straight to your local files.

## Deploying on Netlify

The site deploys from GitHub. `netlify.toml` already sets the build command, Node version and security headers.

**First deploy (no custom domain yet):**

1. In Netlify: **Add new site → Import an existing project → GitHub** and choose `KevinThio/Asili-Engineering-Solutions-Website`. Netlify reads the build settings from `netlify.toml`.
2. Site configuration → Build & deploy → Branches and deploy contexts:
   - **Production branch:** `prod` (the live site)
   - **Branch deploys:** add `main`, the staging copy at `main--<name>.netlify.app`
   - **Deploy previews:** on, for pull requests
3. Site configuration → Site details → **Change site name**, e.g. `asili-engineering`, so the address is `https://asili-engineering.netlify.app`.
4. **Forms:** after the first deploy, Netlify finds the `enquiry` form. Go to Forms → enable form detection if asked, then Forms → **Form notifications → Add notification → Email notification** with the address that should receive enquiries. Every enquiry is also kept under Forms → enquiry.
5. **CMS sign-in:** see "Adding projects" above.
6. Send a real test enquiry from your phone and check that the email arrives.

Netlify sets the `URL` variable on every build, so canonical links, the sitemap and link previews use the live address automatically. When a domain is bought, add it under Domain management; the next deploy uses it.

## Branches and releases

- Work on a feature branch from `main` (`feat/...`, `fix/...`, `chore/...`) and open a pull request into `main`.
- `main` is staging: every merge deploys to the Netlify staging site.
- `prod` is the live site. Releases are a pull request from `main` into `prod`, tagged `vX.Y.Z`.
- CI runs the check, build and tests on every pull request into `main` or `prod`.

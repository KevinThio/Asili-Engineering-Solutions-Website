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

## Branches and releases

- Work on a feature branch from `main` (`feat/...`, `fix/...`, `chore/...`) and open a pull request into `main`.
- `main` is staging: every merge deploys to the Netlify staging site.
- `prod` is the live site. Releases are a pull request from `main` into `prod`, tagged `vX.Y.Z`.
- CI runs the check, build and tests on every pull request into `main` or `prod`.

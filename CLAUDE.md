# CLAUDE.md

@AGENTS.md

Everything in AGENTS.md applies. The notes below are only for Claude Code.

## Claude artifacts for this project

| Artifact | Link | Use it for |
|---|---|---|
| ASILI Design System | https://claude.ai/artifact/W58deHpF3KokhsJhc51oJv | Tokens, component sources, guides and previews. The source of truth for anything visual. |
| ASILI Website Mockup | https://claude.ai/artifact/1xwqfSAtYKpY3snR1gPkWz | The agreed look of Home, About & Services, the Enquiry form and the phone view. Match it when building pages. |

- Read these with the Artifact tool (`action: "read"`, with a `path` for one file), never with WebFetch or curl.
- When porting a component, read its source (`project/components/<group>/<Name>.jsx`), its guide (`project/components/<Name>/README.md`) and its types before writing code.
- Copy `project/tokens.css` into `src/styles/tokens.css` unchanged. If a token needs to change, change it in the design system first, then copy it again. Never edit the local copy by hand.
- Do not publish to, or change, either artifact unless the user asks.

## Environment

- Windows 10. Use the Bash tool (Git Bash) or PowerShell; prefer the dedicated Read, Edit, Write, Glob and Grep tools for files.
- **Python is not installed.** Use Node.js for any scripting.
- Paths contain spaces (`f:\ALL MY DEVELOPED PROGRAMS\ASILI`); always quote them in shell commands.
- Git identity for this repository is set locally (user `KevinThio`). Do not change global git config.

## How to work here

- Before building a page, re-read the matching section of [asili-website-spec.md](asili-website-spec.md) and look at that screen in the mockup.
- Before calling a page done, run `npm run check` and `npm run build`, then run the site and check it at phone width (390 px). Say plainly what was and wasn't checked.
- Keep the user's voice rules (AGENTS.md §7) in every bit of on-page copy, including alt text, button labels and error messages.
- Commit or push only when the user asks, on a branch other than `main` for feature work.

# Covered repo

Facts read from GitHub on 2026-10-05. Re-check with the commands in `SKILL.md` before relying on a row; a fact with a stale date is a bug in this file.

| Repo | Visibility | Default | CI seen | PR preview |
|---|---|---|---|---|
| `pantheon-systems/documentation` | public | `main` | `pr-e2e.yml` (Playwright and `backstop_vrt`), `validate-release-notes.yml`, `codeql.yml`, `vale.yml` | Yes: multidev `https://pr-<N>-pandocs.pantheonsite.io<permalink>`; live `https://docs.pantheon.io<permalink>` |

## documentation

The only repo with the full flow: the changed-pages packet, permalink and release-note checks, and preview and live links. It has a `CODEOWNERS` and a `CONTRIBUTING.md`; read `CONTRIBUTING.md` for style and cite it.

## Other repos

The queue script accepts `--repo <name>` for another repo in the `pantheon-systems` org. The skill has no repo-specific rules, preview, or style guide for it. Say so instead of guessing, read the repo's own `CONTRIBUTING.md`, `CLAUDE.md`, `AGENTS.md`, and `CODEOWNERS`, and cite what you find.

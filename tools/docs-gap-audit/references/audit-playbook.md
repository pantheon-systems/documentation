# Audit playbook

Lessons from running this tool end to end on a real product. Each one prevented or caused a wrong finding.

## Before you start

1. **Name the two sources of truth.** The published site is what readers see. The source (a Drive folder, a repo, a CMS) is what writers edit. Map each published page to its source by title and number prefix, and confirm the match by opening both. A finding that links only one side is half a finding.
2. **Test access first.** Fetch the sitemap with the tool's default user agent. A "Just a moment..." page or a 403 means bot protection. Don't change your user agent to get past it. Ask the site owner to allow `docs-gap-audit`, or save the pages with an ordinary tool and run `site-audit.cjs --from-dir <dir> --base-url <url>`.
3. **Check what you already have.** Earlier notes, a gap table, or a Jira epic may already list part of the gap. Read them before you generate a competing list.

## Gather sources

- **Repo:** shallow clone (`gh repo clone <repo> -- --depth 1`) into a private scratch folder, not into any repo you publish.
- **Planning docs:** save each Google Doc as a text file in a private folder, verbatim. List the folder and follow pagination; a folder listing can hide a second page. If you delegate the saving to a subagent, compare the saved file count and sizes with your ID list afterward. One run stopped partway on an API error and left half the docs unsaved, with no sign in the output.
- **Leave out material that isn't documentation:** sales talk tracks, internal FAQs, meeting notes. They add candidates that never need docs.
- **Changelogs:** entries tagged Feature, Added, or Breaking Change carry the best signal. Dependency bumps, bare package versions, commit-hash prefixes, and Fix entries are noise; the tool filters them.

## Read the results

- **A rating is a lead.** Two of the strongest-looking gaps in the first P1 run were wrong: localization was documented under "locale", and the changelog's word for the feature was "market". Search the published text for the reader's words, not the changelog's, before you call anything missing.
- **Check availability before you call a gap.** A feature behind a flag, in alpha or beta, or on the roadmap isn't a gap yet. The tool marks changelog text that mentions a flag, alpha, beta, preview, or opt-in as `limited`. Confirm against the roadmap and the flag.
- **Stub docs are findings.** A planning doc with a title and almost no body (`planning-stub`) means someone planned a page and nobody wrote it. A stub needs a heading to be detected; a doc that holds only a placeholder sentence won't be.
- **Read the roadmap's text boundaries.** On a roadmap rendered as cards, the target date often follows the description. Reading across two cards paired the wrong date with a feature (Oct instead of Nov 30). Confirm by reading the text on both sides of the date.
- **Code patterns differ by project.** Tool names may come from a constant (`getThingTool`), not a string. Routes may be chained calls. Check a sample against the real code before trusting a count, and add a rule to `CODE_RULES` when one is missing.

## Write it up

- **Link both sides of every finding:** the published page and the source doc. Link every ticket, doc, and page you mention.
- **Mark evidence:** observed (read in a page, doc, or run output), inferred, or unverified. Say which source docs you actually read and which rows rest on the published text only.
- **Put features that aren't live on the to-create list as "create after it ships"**, with the roadmap target date and ticket, so they aren't forgotten and aren't written early.
- **Size the work in pages and pace.** Count only net new pages and flag overlaps between rows. Treat pace as the writer's number. When a count is unknown (for example, pages for 12 roadmap features), leave it out and say so.
- **Keep raw output private.** Publish counts and conclusions, not the candidate dump. Run `scripts/check-private-info.cjs` on anything you share.
- **Use the template** in `references/gap-table-template.md` so the next audit starts from the same sections.

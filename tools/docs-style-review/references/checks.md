# Style checks

What the review looks for, how to verify each item, and where the rule comes from. Cite the guide by section heading. The guide is `src/source/content/style-guide.md`; read the current version before you cite it.

**Mechanical** means `scripts/style-check.cjs` finds it. **Judgment** means you read the page.

## Mechanical

| Check (script id) | Level | What it flags | Source |
|---|---|---|---|
| `trailing-space` | error | A space or tab at the end of a line | Line Breaks and Spaces |
| `whitespace-only-lines` | error | Lines that contain only spaces or tabs (counted, first lines listed) | Line Breaks and Spaces |
| `table-empty-header` | warn | A table whose header row has no text, so the column names sit in the first body row | Tables (the guide's example puts the column names in the header row) |
| `tab` | error | A tab character outside a code fence | Line Breaks and Spaces |
| `final-newline` | error | The file doesn't end with a newline | Line Breaks and Spaces |
| `link-target` | error | `target="_blank"` or another link target | Hyperlinks |
| `absolute-internal-link` | warn | A link to `https://docs.pantheon.io/...` instead of a relative path | Hyperlinks (Internal Links) |
| `will` | warn | The word "will" | Google style (Vale `Google.Will`); Voice, Style, and Flow |
| `first-person-plural` | warn | we, our, us, let's | Google style (Vale `Google.We`); Voice, Style, and Flow |
| `h1-in-body` | warn | A level-1 heading when the title is in the front matter | Frontmatter; Headings |
| `heading-level-skip` | warn | A heading that skips a level | Headings |
| `heading-case` | info | Two or more capitalized words after the first, outside a short allow list | Voice, Style, and Flow (sentence case) |
| `be-verbs` | info | is, are, was, were, be, been, being, am (counts and lines) | Voice, Style, and Flow |
| `bold-labels` | info | Two or more lines that start with a bold label ending in a colon, such as `**Collect:**` | Bold |
| `link-broken` | warn | A relative internal link whose page returns 404 or 410 on docs.pantheon.io (PR mode). Pages the PR itself adds are skipped, because they aren't live yet. | Hyperlinks |
| `link-anchor-missing` | warn | The link's `#anchor` isn't an id on the target page (PR mode) | Hyperlinks |
| `link-unchecked` | info | The check couldn't reach the page: a timeout, a 5xx, or more than 40 distinct pages | Hyperlinks |
| `quote-mix` | info | Straight and curly apostrophes in the same file | none: consistency only |
| `frontmatter-missing`, `frontmatter-key` | error | No front matter, or no `title` or `description` | Frontmatter |

Release notes (`src/source/releasenotes/`) add:

| Check | Level | What it flags | Source |
|---|---|---|---|
| `frontmatter-key` | error | Missing `title`, `published_date`, `published_at`, `categories`, or `description` | Frontmatter; `validate-release-notes.yml` |
| `published-at-midnight` | error | `published_at` ends in `T00:00:00Z` | `validate-release-notes.yml` |
| `published-at-format` | warn | `published_at` isn't an ISO UTC time | RSS feed (`rss.xml/route.tsx`) |
| `published-date-mismatch` | warn | `published_at` is on a different day than `published_date` | Release notes |
| `filename-date-mismatch` | warn | The file name's date differs from `published_date` | Release notes |
| `description-not-plain` | warn | The description contains Markdown | RSS feed: feed readers show plain text |
| `published-at-confirm` | info | Always shown: the value, and that a person confirms the release time | RSS feed |

The script skips fenced code blocks and, in the front matter, checks only `description` for prose rules.

### Known limits of the script

- `heading-case` is a heuristic. It misses a title-case heading with one capital and flags product names it doesn't know. Vale's `Pantheon.Headings` is the authority; confirm against the line.
- `be-verbs` counts words, so "is" in a quoted UI label counts. It's a prompt to read, not a finding.
- The link check runs only with `--pr`, only on the lines the PR adds or changes, and uses the network. It fetches each distinct internal page once from docs.pantheon.io, so a page that exists in the repo but isn't published yet looks broken unless this PR adds it. Pass `--no-links` to skip it.
- `bold-labels` can't tell a run-in label from other bold text that happens to start a line and end in a colon. It's a prompt to read.
- Nothing checks that a screenshot has alt text or that a callout is used correctly.

## Judgment

| Check | How to verify | Source |
|---|---|---|
| Be verbs | Read the flagged lines. Rewrite only where the sentence gets shorter or clearer. | Voice, Style, and Flow |
| Opinion, anecdote, feeling | Read for first-person views, praise, and promises. | Voice, Style, and Flow |
| Hyperbole and marketing claims | Look for "production-ready", "seamless", superlatives, and promises with no mechanism. Ask the author for the source. | Voice, Style, and Flow |
| Who is this sentence for? | Read for sentences addressed to a writer or reviewer instead of the reader, such as "Do not describe X as Y unless...", "Avoid saying...", or "Make sure to mention...". Ask who the sentence is for. If it's the reader, rewrite it as what's true. If it's a note to a writer, remove it. | Voice, Style, and Flow |
| Colloquialisms and inclusive language | Read. Check against the Inclusive Language page the guide links. | Voice, Style, and Flow |
| Where's the user? | Does each procedure start by placing the reader (dashboard, workspace, tab)? | Where's the User? |
| Terminology | Compare product terms with the Terminology section, then with the product's own labels. | Terminology |
| Bold and italics | Bold marks UI navigation. Emphasis is italic, never bold. | Bold; Italics |
| Placeholder text and variables | Placeholders and variables follow the guide's format. | Placeholder Text; Variables |
| Code samples | Inline code for file names, variables, commands, and output. Blocks are fenced with a language. | Code Samples |
| Before You Begin | Prerequisites are listed, and Terminus pages link the Terminus guide. | Before You Begin |
| Link text | Descriptive, not "click here" or a whole sentence. | Hyperlinks |
| Release-note description | Reads on its own as plain text. | RSS feed |
| Product claims | Capabilities, versions, and limits. Mark `unverified` and name who confirms. | none: evidence |

## Order of authority

1. The product's own UI text.
2. The Pantheon style guide.
3. The Google developer documentation style guide.
4. Vale: it enforces a subset of 2 and 3, and it can be wrong.

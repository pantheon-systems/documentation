# Pantheon vocabulary sources

`accept.txt` holds correctly spelled proper nouns and technical terms. Vale treats each entry as
an exception for capitalization rules (so `Pantheon.Headings` doesn't flag it mid-heading) and
for spelling, if a spelling rule is ever enabled. It doesn't police spelling on its own.

Rules for adding an entry:

- Add a term only after confirming its canonical spelling at the source (the vendor's own site,
  or the Pantheon product page) and that the docs already use that spelling.
- Never add a word only to silence an alert.
- Add a misspelling to `Pantheon/TermsStrict.yml` (error) instead, if it's always wrong.
- Record each new entry in the table below with its evidence.

Comments aren't used inside `accept.txt`: each line is read as a pattern.

## Entries added 2026-10-06

Selection test: the term appears mid-heading in a `Pantheon.Headings` alert on `main` @ `e966487`,
and body prose capitalizes it mid-sentence at least 95% of the time (code and headings excluded).

| Term           | Mid-heading alerts                                | Prose capitalized / lowercase | Canonical spelling source                                                                                                                                          |
| -------------- | ------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Apache         | 7                                                 | 79 / 0                        | apache.org page title: "Welcome to The Apache Software Foundation"                                                                                                 |
| Autopilot      | 28                                                | 296 / 6                       | docs.pantheon.io/guides/autopilot (Pantheon product)                                                                                                               |
| Cloudflare     | 22                                                | 138 / 1                       | cloudflare.com page title: "Cloudflare: …"                                                                                                                         |
| Drupal Steward | n/a (Google.GenderBias flagged "Steward" 6 times) | —                             | drupal.org security program name, linked from `guides/platform-considerations/02-platform-site-info.md`. The phrase is accepted; a bare "steward" is still flagged |
| ElasticPress   | 5                                                 | 30 / 0                        | elasticpress.io page title: "ElasticPress.io - WordPress search, solved"                                                                                           |
| Lando          | 3                                                 | 58 / 3                        | lando.dev page title: "Home \| Lando"                                                                                                                              |
| Linux          | 5                                                 | 37 / 1                        | kernel.org page title: "The Linux Kernel Archives"                                                                                                                 |
| PhpStorm       | 4                                                 | 35 / 0                        | jetbrains.com/phpstorm page title: "PhpStorm: The PHP IDE by JetBrains"                                                                                            |
| SendGrid       | 4                                                 | 41 / 0                        | sendgrid.com page title: "SendGrid Email API … \| Twilio"                                                                                                          |
| Solr           | 52                                                | 419 / 3                       | solr.apache.org page title: "Welcome to Apache Solr - Apache Solr"                                                                                                 |

Effect on `main` @ `e966487` with the rest of this config: `Pantheon.Headings` −43 alerts in
`src/source/content`, −4 in `src/source/releasenotes`; `Google.GenderBias` −6; 0 new alerts.

Considered and not added:

- `MacOS`: the canonical spelling is macOS, which `Headings.yml` already lists.
- `Pro`, `IdP`: generic or ambiguous.
- `Multizone`: a Pantheon product name. It waits for a named product-names owner.
- `TL;DR`: `Google.Slang` flags it 6 times on `tldr.md`. Accepting it would allow it everywhere.

## Earlier entries

The 27 entries before 2026-10-06 came with PR #10305 and have no recorded sources.

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

## Web-development proper nouns (2026-10-06)

Proposed inventory of 394 names, checked against this repo's own prose (code, inline code, URLs,
link targets, HTML/JSX tags, and frontmatter stripped). No network lookups were made, so a
name counts as verified only when the docs already use it. That's weaker than the vendor-site
check this file asks for above: these entries are pending vendor confirmation.

- canonical (added): exact form appears at least twice, is the most frequent casing, and is
  longer than two characters; added to `accept.txt` with dots escaped and a trailing `\b`.
  Vale matches vocabulary entries as substrings inside headings, so without `\b` an entry like
  `Opera` also accepted "Operations" and `Bun` accepted "Bundling".
- canonical (already covered): already in `accept.txt` or the `Headings.yml` exceptions.
- review required: not added. Reasons: not in the docs (unverified), one occurrence, the docs
  prefer another casing, too short to accept safely, the docs use the name for something else,
  or the entry caused a false positive.

Counts are the exact form, then the most common variants, in prose.

### Languages, formats, and standards

| Term           | Prose count | Variants seen                | Classification                                                                                                                               |
| -------------- | ----------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| AssemblyScript | 0           | —                            | review required: not in corpus                                                                                                               |
| Bash           | 14          | bash 16, Bash 14, BASH 1     | review required: corpus prefers 'bash'                                                                                                       |
| C              | 1           | c 4, C 1                     | review required: too short                                                                                                                   |
| C#             | 0           | —                            | review required: too short                                                                                                                   |
| C++            | 0           | —                            | review required: not in corpus                                                                                                               |
| CSS            | 107         | CSS 107, css 2               | canonical (already covered)                                                                                                                  |
| Dart           | 0           | —                            | review required: not in corpus                                                                                                               |
| ECMAScript     | 0           | —                            | review required: not in corpus                                                                                                               |
| Elixir         | 0           | —                            | review required: not in corpus                                                                                                               |
| Erlang         | 0           | —                            | review required: not in corpus                                                                                                               |
| Go             | 256         | Go 256, go 150               | review required: too short                                                                                                                   |
| GraphQL        | 27          | GraphQL 27, Graphql 1        | canonical (added)                                                                                                                            |
| Haskell        | 0           | —                            | review required: not in corpus                                                                                                               |
| HTML           | 71          | HTML 71, html 2              | canonical (added)                                                                                                                            |
| Java           | 3           | Java 3, java 1               | canonical (added)                                                                                                                            |
| JavaScript     | 69          | JavaScript 69, Javascript 15 | canonical (added)                                                                                                                            |
| JSON           | 35          | JSON 35, json 1              | canonical (added)                                                                                                                            |
| JSX            | 1           | JSX 1                        | review required: 1 occurrence                                                                                                                |
| Kotlin         | 0           | —                            | review required: not in corpus                                                                                                               |
| Lua            | 0           | —                            | review required: not in corpus                                                                                                               |
| Markdown       | 15          | Markdown 15, markdown 6      | canonical (added)                                                                                                                            |
| MDX            | 1           | MDX 1                        | review required: 1 occurrence                                                                                                                |
| Move           | 19          | move 93, Move 19             | review required: corpus prefers 'move'                                                                                                       |
| Objective-C    | 0           | —                            | review required: not in corpus                                                                                                               |
| Perl           | 1           | perl 2, Perl 1               | review required: 1 occurrence                                                                                                                |
| PHP            | 1387        | PHP 1387, php 10, PhP 1      | canonical (already covered)                                                                                                                  |
| PowerShell     | 0           | Powershell 1                 | review required: not in corpus                                                                                                               |
| Python         | 2           | Python 2                     | canonical (added)                                                                                                                            |
| R              | 0           | —                            | review required: too short                                                                                                                   |
| Ruby           | 0           | ruby 1                       | review required: not in corpus                                                                                                               |
| Rust           | 0           | —                            | review required: not in corpus                                                                                                               |
| Scala          | 0           | —                            | review required: not in corpus                                                                                                               |
| Shell          | 5           | shell 18, Shell 5            | review required: corpus prefers 'shell'                                                                                                      |
| Solidity       | 0           | —                            | review required: not in corpus                                                                                                               |
| SQL            | 42          | SQL 42, Sql 2                | review required: vocab entry caused a heading false positive on a verbatim error-message heading (guides/drush/09-troubleshoot-drush.md:161) |
| SVG            | 2           | SVG 2                        | canonical (added)                                                                                                                            |
| Swift          | 0           | —                            | review required: not in corpus                                                                                                               |
| TOML           | 0           | —                            | review required: not in corpus                                                                                                               |
| TSX            | 0           | —                            | review required: not in corpus                                                                                                               |
| TypeScript     | 1           | TypeScript 1                 | review required: 1 occurrence                                                                                                                |
| WebAssembly    | 0           | —                            | review required: not in corpus                                                                                                               |
| WebGPU         | 0           | —                            | review required: not in corpus                                                                                                               |
| WebGL          | 0           | —                            | review required: not in corpus                                                                                                               |
| WebRTC         | 0           | —                            | review required: not in corpus                                                                                                               |
| WebSocket      | 0           | —                            | review required: not in corpus                                                                                                               |
| XML            | 9           | XML 9                        | canonical (added)                                                                                                                            |
| YAML           | 38          | YAML 38, yaml 1              | canonical (already covered)                                                                                                                  |

### Web standards, APIs, and protocols

| Term            | Prose count | Variants seen              | Classification                 |
| --------------- | ----------- | -------------------------- | ------------------------------ |
| ARIA            | 4           | ARIA 4                     | canonical (added)              |
| CORS            | 16          | CORS 16                    | canonical (added)              |
| CSP             | 0           | —                          | review required: not in corpus |
| DOM             | 8           | DOM 8                      | canonical (added)              |
| Fetch API       | 0           | —                          | review required: not in corpus |
| HTTP            | 168         | HTTP 168, http 4           | canonical (already covered)    |
| HTTP/2          | 8           | HTTP/2 8                   | canonical (added)              |
| HTTP/3          | 0           | —                          | review required: not in corpus |
| HTTPS           | 335         | HTTPS 335, https 6         | canonical (already covered)    |
| IndexedDB       | 0           | —                          | review required: not in corpus |
| JSON-LD         | 0           | —                          | review required: not in corpus |
| JSON Schema     | 0           | JSON schema 1              | review required: not in corpus |
| JWT             | 7           | JWT 7                      | canonical (added)              |
| OAuth           | 16          | OAuth 16, Oauth 2, oauth 1 | canonical (added)              |
| OAuth 2.0       | 1           | OAuth 2.0 1                | review required: 1 occurrence  |
| OpenAPI         | 1           | OpenAPI 1                  | review required: 1 occurrence  |
| OpenID Connect  | 0           | —                          | review required: not in corpus |
| QUIC            | 0           | —                          | review required: not in corpus |
| Service Worker  | 1           | Service Worker 1           | review required: 1 occurrence  |
| TLS             | 107         | TLS 107                    | canonical (already covered)    |
| URL             | 368         | URL 368, url 10            | canonical (already covered)    |
| URI             | 19          | URI 19                     | canonical (added)              |
| UTF-8           | 0           | utf-8 1                    | review required: not in corpus |
| WAI             | 0           | —                          | review required: not in corpus |
| WAI-ARIA        | 2           | WAI-ARIA 2                 | canonical (added)              |
| WCAG            | 17          | WCAG 17                    | canonical (added)              |
| Web API         | 0           | —                          | review required: not in corpus |
| Web Components  | 0           | —                          | review required: not in corpus |
| Web Crypto API  | 0           | —                          | review required: not in corpus |
| Web Workers     | 0           | —                          | review required: not in corpus |
| Web Storage API | 0           | —                          | review required: not in corpus |
| WebTransport    | 0           | —                          | review required: not in corpus |
| WebSockets      | 0           | —                          | review required: not in corpus |
| WHATWG          | 0           | —                          | review required: not in corpus |
| W3C             | 1           | W3C 1                      | review required: 1 occurrence  |
| XMLHttpRequest  | 0           | —                          | review required: not in corpus |

### Frameworks and libraries

| Term          | Prose count | Variants seen          | Classification                                                                 |
| ------------- | ----------- | ---------------------- | ------------------------------------------------------------------------------ |
| Alpine.js     | 0           | —                      | review required: not in corpus                                                 |
| Angular       | 1           | Angular 1              | review required: 1 occurrence                                                  |
| AngularJS     | 0           | —                      | review required: not in corpus                                                 |
| Astro         | 1           | Astro 1                | review required: 1 occurrence                                                  |
| Backbone.js   | 0           | —                      | review required: not in corpus                                                 |
| Bootstrap     | 0           | bootstrap 22           | review required: not in corpus                                                 |
| Chakra UI     | 0           | —                      | review required: not in corpus                                                 |
| D3.js         | 0           | —                      | review required: not in corpus                                                 |
| Ember.js      | 0           | —                      | review required: not in corpus                                                 |
| Express       | 3           | Express 3, express 3   | review required: corpus referent differs (WebP Express plugin, not Express.js) |
| Fastify       | 0           | —                      | review required: not in corpus                                                 |
| Flask         | 0           | —                      | review required: not in corpus                                                 |
| Gatsby        | 63          | Gatsby 63, gatsby 1    | canonical (added)                                                              |
| Hono          | 0           | —                      | review required: not in corpus                                                 |
| jQuery        | 0           | —                      | review required: not in corpus                                                 |
| Laravel       | 0           | —                      | review required: not in corpus                                                 |
| Lit           | 0           | —                      | review required: not in corpus                                                 |
| Lodash        | 0           | —                      | review required: not in corpus                                                 |
| Material UI   | 0           | —                      | review required: not in corpus                                                 |
| NestJS        | 0           | —                      | review required: not in corpus                                                 |
| Next.js       | 341         | Next.js 341, next.js 3 | canonical (already covered)                                                    |
| Nuxt          | 0           | —                      | review required: not in corpus                                                 |
| Nuxt UI       | 0           | —                      | review required: not in corpus                                                 |
| Preact        | 0           | —                      | review required: not in corpus                                                 |
| React         | 12          | React 12               | canonical (added)                                                              |
| React Native  | 0           | —                      | review required: not in corpus                                                 |
| Remix         | 1           | Remix 1                | review required: 1 occurrence                                                  |
| Ruby on Rails | 0           | —                      | review required: not in corpus                                                 |
| Sass          | 3           | Sass 3                 | canonical (added)                                                              |
| SolidJS       | 0           | —                      | review required: not in corpus                                                 |
| Spring Boot   | 0           | —                      | review required: not in corpus                                                 |
| Svelte        | 0           | —                      | review required: not in corpus                                                 |
| SvelteKit     | 0           | —                      | review required: not in corpus                                                 |
| Tailwind CSS  | 1           | Tailwind CSS 1         | review required: 1 occurrence                                                  |
| Three.js      | 0           | —                      | review required: not in corpus                                                 |
| Vue.js        | 0           | —                      | review required: not in corpus                                                 |

### Build tools and package managers

| Term           | Prose count | Variants seen             | Classification                         |
| -------------- | ----------- | ------------------------- | -------------------------------------- |
| Babel          | 0           | —                         | review required: not in corpus         |
| Bower          | 0           | —                         | review required: not in corpus         |
| Bun            | 8           | Bun 8, bun 1              | canonical (added)                      |
| Cargo          | 0           | —                         | review required: not in corpus         |
| Composer       | 857         | Composer 857, composer 61 | canonical (already covered)            |
| Corepack       | 0           | —                         | review required: not in corpus         |
| Deno           | 3           | Deno 3                    | canonical (added)                      |
| ESLint         | 0           | —                         | review required: not in corpus         |
| esbuild        | 0           | —                         | review required: not in corpus         |
| Gradle         | 0           | —                         | review required: not in corpus         |
| Grunt          | 5           | Grunt 5                   | canonical (added)                      |
| Gulp           | 2           | Gulp 2, gulp 2            | canonical (added)                      |
| JavaScriptCore | 0           | —                         | review required: not in corpus         |
| Jest           | 0           | —                         | review required: not in corpus         |
| Lerna          | 0           | —                         | review required: not in corpus         |
| Maven          | 0           | —                         | review required: not in corpus         |
| npm            | 13          | npm 13, NPM 3             | canonical (added)                      |
| npx            | 0           | —                         | review required: not in corpus         |
| Parcel         | 0           | —                         | review required: not in corpus         |
| pnpm           | 2           | pnpm 2                    | canonical (added)                      |
| PostCSS        | 0           | —                         | review required: not in corpus         |
| Prettier       | 0           | —                         | review required: not in corpus         |
| Rollup         | 0           | —                         | review required: not in corpus         |
| Stylelint      | 0           | —                         | review required: not in corpus         |
| SWC            | 0           | —                         | review required: not in corpus         |
| Turborepo      | 0           | —                         | review required: not in corpus         |
| Vite           | 0           | —                         | review required: not in corpus         |
| Webpack        | 2           | Webpack 2, webpack 1      | canonical (added)                      |
| Yarn           | 2           | yarn 4, Yarn 2            | review required: corpus prefers 'yarn' |

### Documentation and publishing tools

| Term       | Prose count | Variants seen | Classification                 |
| ---------- | ----------- | ------------- | ------------------------------ |
| Docusaurus | 9           | Docusaurus 9  | canonical (added)              |
| Eleventy   | 0           | —             | review required: not in corpus |
| GitBook    | 0           | —             | review required: not in corpus |
| Hugo       | 0           | —             | review required: not in corpus |
| Jekyll     | 0           | —             | review required: not in corpus |
| MkDocs     | 0           | —             | review required: not in corpus |
| Nextra     | 0           | —             | review required: not in corpus |
| Sphinx     | 0           | —             | review required: not in corpus |
| VitePress  | 0           | —             | review required: not in corpus |
| VuePress   | 0           | —             | review required: not in corpus |
| Vale       | 0           | —             | review required: not in corpus |

### Source control, collaboration, and CI/CD

| Term           | Prose count | Variants seen                                         | Classification                 |
| -------------- | ----------- | ----------------------------------------------------- | ------------------------------ |
| Bitbucket      | 53          | Bitbucket 53, BitBucket 5                             | canonical (added)              |
| Buildkite      | 0           | —                                                     | review required: not in corpus |
| CircleCI       | 38          | CircleCI 38                                           | canonical (added)              |
| Drone          | 0           | —                                                     | review required: not in corpus |
| Git            | 724         | Git 724, git 48, GIT 1                                | canonical (already covered)    |
| GitHub         | 575         | GitHub 575, Github 15, github 2                       | canonical (already covered)    |
| GitHub Actions | 29          | GitHub Actions 29, Github Actions 4, GitHub actions 1 | canonical (added)              |
| GitLab         | 96          | GitLab 96, Gitlab 5                                   | canonical (already covered)    |
| GitLab CI/CD   | 0           | —                                                     | review required: not in corpus |
| Jenkins        | 77          | Jenkins 77                                            | canonical (already covered)    |
| Phabricator    | 0           | —                                                     | review required: not in corpus |
| SourceHut      | 0           | —                                                     | review required: not in corpus |
| Subversion     | 0           | —                                                     | review required: not in corpus |
| TeamCity       | 0           | —                                                     | review required: not in corpus |
| Travis CI      | 2           | Travis CI 2                                           | canonical (added)              |
| Azure DevOps   | 2           | Azure DevOps 2                                        | canonical (added)              |

### Containers, orchestration, and infrastructure

| Term           | Prose count | Variants seen | Classification                 |
| -------------- | ----------- | ------------- | ------------------------------ |
| Ansible        | 0           | —             | review required: not in corpus |
| Argo CD        | 0           | —             | review required: not in corpus |
| Bazel          | 0           | —             | review required: not in corpus |
| Buildah        | 0           | —             | review required: not in corpus |
| Cloud Foundry  | 0           | —             | review required: not in corpus |
| Docker         | 17          | Docker 17     | canonical (added)              |
| Docker Compose | 0           | —             | review required: not in corpus |
| Flux           | 0           | —             | review required: not in corpus |
| Helm           | 0           | —             | review required: not in corpus |
| Kubernetes     | 1           | Kubernetes 1  | review required: 1 occurrence  |
| Kustomize      | 0           | —             | review required: not in corpus |
| Mesos          | 0           | —             | review required: not in corpus |
| Nix            | 0           | —             | review required: not in corpus |
| NixOS          | 0           | —             | review required: not in corpus |
| OpenShift      | 0           | —             | review required: not in corpus |
| OpenTofu       | 0           | —             | review required: not in corpus |
| Packer         | 0           | —             | review required: not in corpus |
| Podman         | 0           | —             | review required: not in corpus |
| Pulumi         | 0           | —             | review required: not in corpus |
| Rancher        | 0           | —             | review required: not in corpus |
| Terraform      | 1           | Terraform 1   | review required: 1 occurrence  |
| Vagrant        | 0           | —             | review required: not in corpus |

### Cloud and hosting platforms

| Term                     | Prose count | Variants seen                | Classification                           |
| ------------------------ | ----------- | ---------------------------- | ---------------------------------------- |
| Akamai                   | 1           | Akamai 1                     | review required: 1 occurrence            |
| Amazon Web Services      | 10          | Amazon Web Services 10       | canonical (added)                        |
| AWS                      | 56          | AWS 56                       | canonical (added)                        |
| AWS CDK                  | 0           | —                            | review required: not in corpus           |
| AWS Lambda               | 0           | —                            | review required: not in corpus           |
| Amazon CloudFront        | 0           | —                            | review required: not in corpus           |
| Amazon CloudWatch        | 0           | —                            | review required: not in corpus           |
| Amazon DynamoDB          | 0           | —                            | review required: not in corpus           |
| Amazon EC2               | 0           | —                            | review required: not in corpus           |
| Amazon ECS               | 0           | —                            | review required: not in corpus           |
| Amazon EKS               | 0           | —                            | review required: not in corpus           |
| Amazon RDS               | 0           | —                            | review required: not in corpus           |
| Amazon S3                | 23          | Amazon S3 23                 | canonical (added)                        |
| Amazon Route 53          | 4           | Amazon Route 53 4            | canonical (added)                        |
| Azure                    | 11          | Azure 11                     | canonical (added)                        |
| Azure App Service        | 0           | —                            | review required: not in corpus           |
| Azure Blob Storage       | 0           | —                            | review required: not in corpus           |
| Azure Functions          | 0           | —                            | review required: not in corpus           |
| Azure Kubernetes Service | 0           | —                            | review required: not in corpus           |
| Cloudflare               | 188         | Cloudflare 188, CloudFlare 2 | canonical (already covered)              |
| Cloudflare Pages         | 0           | —                            | review required: not in corpus           |
| Cloudflare R2            | 0           | —                            | review required: not in corpus           |
| Cloudflare Workers       | 0           | —                            | review required: not in corpus           |
| Fastly                   | 119         | Fastly 119                   | canonical (already covered)              |
| Firebase                 | 0           | —                            | review required: not in corpus           |
| Fly.io                   | 0           | —                            | review required: not in corpus           |
| Google Cloud             | 28          | Google Cloud 28              | canonical (added)                        |
| Google Cloud Run         | 0           | —                            | review required: not in corpus           |
| Google Cloud Storage     | 15          | Google Cloud Storage 15      | canonical (added)                        |
| Google Kubernetes Engine | 0           | —                            | review required: not in corpus           |
| Heroku                   | 0           | —                            | review required: not in corpus           |
| Netlify                  | 0           | —                            | review required: not in corpus           |
| Pantheon                 | 5834        | Pantheon 5834, pantheon 10   | canonical (already covered)              |
| Render                   | 2           | render 27, Render 2          | review required: corpus prefers 'render' |
| Supabase                 | 0           | —                            | review required: not in corpus           |
| Vercel                   | 0           | —                            | review required: not in corpus           |

### Databases and data tools

| Term          | Prose count | Variants seen                     | Classification                 |
| ------------- | ----------- | --------------------------------- | ------------------------------ |
| Amazon Aurora | 0           | —                                 | review required: not in corpus |
| BigQuery      | 0           | —                                 | review required: not in corpus |
| Cassandra     | 0           | —                                 | review required: not in corpus |
| ClickHouse    | 0           | —                                 | review required: not in corpus |
| CockroachDB   | 0           | —                                 | review required: not in corpus |
| CouchDB       | 0           | —                                 | review required: not in corpus |
| DBeaver       | 0           | —                                 | review required: not in corpus |
| DynamoDB      | 0           | —                                 | review required: not in corpus |
| Elasticsearch | 76          | Elasticsearch 76, elasticsearch 1 | canonical (added)              |
| Firestore     | 0           | —                                 | review required: not in corpus |
| InfluxDB      | 0           | —                                 | review required: not in corpus |
| MariaDB       | 74          | MariaDB 74                        | canonical (already covered)    |
| Memcached     | 0           | —                                 | review required: not in corpus |
| MongoDB       | 0           | mongodb 1                         | review required: not in corpus |
| MySQL         | 300         | MySQL 300, mysql 3, mySQL 3       | canonical (already covered)    |
| Neo4j         | 0           | —                                 | review required: not in corpus |
| OpenSearch    | 0           | —                                 | review required: not in corpus |
| PostgreSQL    | 7           | PostgreSQL 7                      | canonical (added)              |
| Redis         | 220         | Redis 220, redis 2                | canonical (already covered)    |
| SQLite        | 1           | SQLite 1                          | review required: 1 occurrence  |
| Snowflake     | 0           | snowflake 1                       | review required: not in corpus |
| Solr          | 561         | Solr 561, solr 1                  | canonical (already covered)    |

### CMSs and content platforms

| Term           | Prose count | Variants seen                            | Classification                 |
| -------------- | ----------- | ---------------------------------------- | ------------------------------ |
| Adobe Commerce | 0           | —                                        | review required: not in corpus |
| Contentful     | 3           | Contentful 3                             | canonical (added)              |
| Craft CMS      | 0           | —                                        | review required: not in corpus |
| Drupal         | 2521        | Drupal 2521, drupal 9                    | canonical (already covered)    |
| Ghost          | 0           | GHOST 1                                  | review required: not in corpus |
| Joomla!        | 0           | —                                        | review required: not in corpus |
| Magento        | 0           | —                                        | review required: not in corpus |
| Payload CMS    | 0           | —                                        | review required: not in corpus |
| Prismic        | 0           | —                                        | review required: not in corpus |
| Sanity         | 0           | sanity 2                                 | review required: not in corpus |
| Shopify        | 0           | —                                        | review required: not in corpus |
| Squarespace    | 0           | —                                        | review required: not in corpus |
| Strapi         | 0           | —                                        | review required: not in corpus |
| TYPO3          | 0           | —                                        | review required: not in corpus |
| Webflow        | 0           | —                                        | review required: not in corpus |
| Wix            | 0           | —                                        | review required: not in corpus |
| WordPress      | 2507        | WordPress 2507, Wordpress 2, wordpress 1 | canonical (already covered)    |
| WordPress.com  | 8           | WordPress.com 8                          | canonical (added)              |
| WordPress.org  | 29          | WordPress.org 29, wordpress.org 4        | canonical (added)              |
| WooCommerce    | 54          | WooCommerce 54                           | canonical (added)              |

### Browsers and operating systems

| Term             | Prose count | Variants seen         | Classification                                                                    |
| ---------------- | ----------- | --------------------- | --------------------------------------------------------------------------------- |
| Android          | 1           | Android 1             | review required: 1 occurrence                                                     |
| Alpine Linux     | 0           | —                     | review required: not in corpus                                                    |
| Apple            | 0           | —                     | review required: not in corpus                                                    |
| Arc              | 0           | —                     | review required: not in corpus                                                    |
| Brave            | 1           | Brave 1               | review required: 1 occurrence                                                     |
| Chrome           | 33          | Chrome 33, chrome 1   | canonical (added)                                                                 |
| ChromeOS         | 0           | —                     | review required: not in corpus                                                    |
| Chromium         | 0           | —                     | review required: not in corpus                                                    |
| Debian           | 0           | —                     | review required: not in corpus                                                    |
| Edge             | 181         | Edge 181, edge 132    | review required: corpus referent differs (Pantheon Edge product, not the browser) |
| Firefox          | 15          | Firefox 15            | canonical (added)                                                                 |
| FreeBSD          | 0           | —                     | review required: not in corpus                                                    |
| Gecko            | 0           | —                     | review required: not in corpus                                                    |
| iOS              | 2           | iOS 2                 | canonical (already covered)                                                       |
| iPadOS           | 0           | —                     | review required: not in corpus                                                    |
| Linux            | 47          | Linux 47, linux 1     | canonical (already covered)                                                       |
| macOS            | 17          | MacOS 21, macOS 17    | canonical (already covered)                                                       |
| Microsoft Edge   | 6           | Microsoft Edge 6      | canonical (added)                                                                 |
| Opera            | 2           | Opera 2               | canonical (added)                                                                 |
| Safari           | 8           | Safari 8              | canonical (added)                                                                 |
| Samsung Internet | 0           | —                     | review required: not in corpus                                                    |
| Ubuntu           | 9           | Ubuntu 9              | canonical (added)                                                                 |
| WebKit           | 0           | —                     | review required: not in corpus                                                    |
| Windows          | 58          | Windows 58, windows 7 | canonical (added)                                                                 |

### Editors, design, and developer tools

| Term                    | Prose count | Variants seen           | Classification                 |
| ----------------------- | ----------- | ----------------------- | ------------------------------ |
| Android Studio          | 0           | —                       | review required: not in corpus |
| Chrome DevTools         | 0           | —                       | review required: not in corpus |
| Cursor                  | 1           | Cursor 1                | review required: 1 occurrence  |
| Figma                   | 0           | —                       | review required: not in corpus |
| FigJam                  | 0           | —                       | review required: not in corpus |
| Firefox Developer Tools | 0           | —                       | review required: not in corpus |
| IntelliJ IDEA           | 0           | —                       | review required: not in corpus |
| JetBrains               | 9           | JetBrains 9             | canonical (added)              |
| Neovim                  | 0           | —                       | review required: not in corpus |
| PhpStorm                | 37          | PhpStorm 37, PHPStorm 2 | canonical (already covered)    |
| Postman                 | 0           | —                       | review required: not in corpus |
| PyCharm                 | 0           | —                       | review required: not in corpus |
| RubyMine                | 0           | —                       | review required: not in corpus |
| Sublime Text            | 1           | Sublime Text 1          | review required: 1 occurrence  |
| Visual Studio           | 16          | Visual Studio 16        | canonical (added)              |
| Visual Studio Code      | 15          | Visual Studio Code 15   | canonical (added)              |
| Vim                     | 0           | —                       | review required: not in corpus |
| WebStorm                | 0           | —                       | review required: not in corpus |
| Windsurf                | 0           | —                       | review required: not in corpus |
| Zed                     | 0           | —                       | review required: not in corpus |

### Testing, accessibility, and performance

| Term               | Prose count | Variants seen        | Classification                 |
| ------------------ | ----------- | -------------------- | ------------------------------ |
| Axe                | 0           | AXE 1                | review required: not in corpus |
| axe-core           | 1           | axe-core 1           | review required: 1 occurrence  |
| Cypress            | 0           | —                    | review required: not in corpus |
| Jasmine            | 0           | —                    | review required: not in corpus |
| k6                 | 0           | —                    | review required: too short     |
| Lighthouse         | 10          | Lighthouse 10        | canonical (added)              |
| Mocha              | 0           | —                    | review required: not in corpus |
| NVDA               | 0           | —                    | review required: not in corpus |
| PageSpeed Insights | 1           | PageSpeed Insights 1 | review required: 1 occurrence  |
| Percy              | 0           | —                    | review required: not in corpus |
| Playwright         | 1           | Playwright 1         | review required: 1 occurrence  |
| Puppeteer          | 0           | —                    | review required: not in corpus |
| RSpec              | 0           | —                    | review required: not in corpus |
| Selenium           | 2           | Selenium 2           | canonical (added)              |
| Testing Library    | 0           | —                    | review required: not in corpus |
| TestCafe           | 0           | —                    | review required: not in corpus |
| WebPageTest        | 0           | —                    | review required: not in corpus |
| WebdriverIO        | 0           | —                    | review required: not in corpus |
| VoiceOver          | 0           | —                    | review required: not in corpus |

### Observability and operations

| Term          | Prose count | Variants seen | Classification                 |
| ------------- | ----------- | ------------- | ------------------------------ |
| Datadog       | 8           | Datadog 8     | canonical (added)              |
| Grafana       | 0           | —             | review required: not in corpus |
| Honeycomb     | 0           | —             | review required: not in corpus |
| Jaeger        | 0           | —             | review required: not in corpus |
| Kibana        | 0           | —             | review required: not in corpus |
| Logstash      | 0           | —             | review required: not in corpus |
| New Relic     | 416         | New Relic 416 | canonical (already covered)    |
| OpenTelemetry | 0           | —             | review required: not in corpus |
| Prometheus    | 0           | —             | review required: not in corpus |
| Sentry        | 0           | —             | review required: not in corpus |
| Splunk        | 26          | Splunk 26     | canonical (added)              |
| Zipkin        | 0           | —             | review required: not in corpus |

### Authentication, payments, messaging, and integrations

| Term                 | Prose count | Variants seen            | Classification                 |
| -------------------- | ----------- | ------------------------ | ------------------------------ |
| Adyen                | 0           | —                        | review required: not in corpus |
| Auth0                | 9           | Auth0 9                  | canonical (added)              |
| Braintree            | 1           | Braintree 1              | review required: 1 occurrence  |
| Clerk                | 0           | —                        | review required: not in corpus |
| Google Maps Platform | 0           | —                        | review required: not in corpus |
| hCaptcha             | 0           | —                        | review required: not in corpus |
| Okta                 | 3           | Okta 3                   | canonical (added)              |
| PayPal               | 1           | PayPal 1                 | review required: 1 occurrence  |
| Plaid                | 0           | —                        | review required: not in corpus |
| reCAPTCHA            | 7           | reCAPTCHA 7              | canonical (added)              |
| SendGrid             | 72          | SendGrid 72, Sendgrid 15 | canonical (already covered)    |
| Stripe               | 2           | Stripe 2                 | canonical (added)              |
| Twilio               | 0           | —                        | review required: not in corpus |

### Search, SEO, and metadata

| Term                  | Prose count | Variants seen | Classification                 |
| --------------------- | ----------- | ------------- | ------------------------------ |
| Bing Webmaster Tools  | 0           | —             | review required: not in corpus |
| Google Search         | 0           | —             | review required: not in corpus |
| Google Search Console | 0           | —             | review required: not in corpus |
| Open Graph            | 0           | —             | review required: not in corpus |
| Schema.org            | 0           | —             | review required: not in corpus |
| Twitter Cards         | 0           | —             | review required: not in corpus |
| X Cards               | 0           | —             | review required: not in corpus |

### AI and developer-assistance products

| Term                   | Prose count | Variants seen            | Classification                 |
| ---------------------- | ----------- | ------------------------ | ------------------------------ |
| Anthropic              | 1           | Anthropic 1              | review required: 1 occurrence  |
| ChatGPT                | 0           | —                        | review required: not in corpus |
| Claude                 | 7           | Claude 7                 | canonical (added)              |
| Gemini                 | 11          | Gemini 11                | canonical (added)              |
| Google AI Studio       | 2           | Google AI Studio 2       | canonical (added)              |
| Hugging Face           | 0           | —                        | review required: not in corpus |
| LangChain              | 0           | —                        | review required: not in corpus |
| LlamaIndex             | 0           | —                        | review required: not in corpus |
| Model Context Protocol | 1           | Model Context Protocol 1 | review required: 1 occurrence  |
| Ollama                 | 0           | —                        | review required: not in corpus |
| OpenAI                 | 8           | OpenAI 8                 | canonical (added)              |
| TensorFlow             | 0           | —                        | review required: not in corpus |
| Vertex AI              | 6           | Vertex AI 6              | canonical (added)              |
| Vercel AI SDK          | 0           | —                        | review required: not in corpus |

### Pantheon-specific terms

| Term                   | Prose count | Variants seen                                                                 | Classification              |
| ---------------------- | ----------- | ----------------------------------------------------------------------------- | --------------------------- |
| Content Publisher      | 95          | Content Publisher 95, content publisher 1                                     | canonical (added)           |
| Decoupled Kit          | 16          | Decoupled Kit 16                                                              | canonical (added)           |
| Front-End Sites        | 150         | Front-End Sites 150                                                           | canonical (added)           |
| Global CDN             | 360         | Global CDN 360, global CDN 1, global cdn 1                                    | canonical (added)           |
| Multidev               | 731         | Multidev 731, multidev 34, MultiDev 1                                         | canonical (already covered) |
| My Dashboard           | 67          | My Dashboard 67                                                               | canonical (added)           |
| Pantheon               | 5834        | Pantheon 5834, pantheon 10                                                    | canonical (already covered) |
| Professional Workspace | 56          | Professional Workspace 56, professional workspace 9, professional Workspace 1 | canonical (added)           |
| Site Dashboard         | 464         | Site Dashboard 464, site dashboard 67, site Dashboard 13, Site dashboard 3    | canonical (added)           |
| Terminus               | 1296        | Terminus 1296, terminus 22                                                    | canonical (already covered) |

## Strict terminology (`Pantheon/TermsStrict.yml`, error)

`vocab: false` is set on this rule. Before it, `accept.txt` entries suppressed overlapping
misspellings: `Java` hid `Java Script`, `Amazon Web Services` hid
`Amazon web services`, and the older `[Dd]ev` entry hid `Multi-dev`. (A trial `SQL` entry also hid
`Postgre SQL`; `SQL` was not added.)

| Variant             | Corrected to        | Prose hits on main | Canonical form in prose | Status                                                   |
| ------------------- | ------------------- | ------------------ | ----------------------- | -------------------------------------------------------- |
| Wordpress           | WordPress           | 2                  | 2507                    | already strict (approved 2026-10-06)                     |
| Word Press          | WordPress           | 0                  | 2507                    | already strict (approved 2026-10-06)                     |
| Wordpress.org       | WordPress.org       | 0                  | 29                      | already strict (approved 2026-10-06)                     |
| Github              | GitHub              | 15                 | 575                     | already strict (approved 2026-10-06)                     |
| Git Hub             | GitHub              | 0                  | 575                     | added 2026-10-06                                         |
| Gitlab              | GitLab              | 5                  | 96                      | added 2026-10-06                                         |
| Git Lab             | GitLab              | 0                  | 96                      | added 2026-10-06                                         |
| BitBucket           | Bitbucket           | 5                  | 53                      | added 2026-10-06                                         |
| Javascript          | JavaScript          | 15                 | 69                      | added 2026-10-06                                         |
| Java Script         | JavaScript          | 0                  | 69                      | added 2026-10-06                                         |
| Typescript          | TypeScript          | 0                  | 1                       | added 2026-10-06                                         |
| Type Script         | TypeScript          | 0                  | 1                       | added 2026-10-06                                         |
| Nextjs              | Next.js             | 0                  | 341                     | already strict (approved 2026-10-06)                     |
| NextJS              | Next.js             | 0                  | 341                     | already strict (approved 2026-10-06)                     |
| Next JS             | Next.js             | 0                  | 341                     | added 2026-10-06                                         |
| Nodejs              | Node.js             | 0                  | 58                      | already strict (approved 2026-10-06)                     |
| NodeJS              | Node.js             | 0                  | 58                      | already strict (approved 2026-10-06)                     |
| Node JS             | Node.js             | 0                  | 58                      | added 2026-10-06                                         |
| Reactjs             | React               | 0                  | 12                      | added 2026-10-06                                         |
| ReactJS             | React               | 0                  | 12                      | not added: ambiguous alias                               |
| Vuejs               | Vue.js              | 0                  | 0                       | added 2026-10-06                                         |
| VueJS               | Vue.js              | 0                  | 0                       | added 2026-10-06                                         |
| Vue JS              | Vue.js              | 0                  | 0                       | added 2026-10-06                                         |
| Tailwindcss         | Tailwind CSS        | 0                  | 1                       | added 2026-10-06                                         |
| Docker-compose      | Docker Compose      | 0                  | 0                       | not added: also the legacy `docker-compose` command name |
| Web Pack            | Webpack             | 0                  | 2                       | added 2026-10-06                                         |
| Story Book          | Storybook           | 0                  | 0                       | added 2026-10-06                                         |
| Postgres            | PostgreSQL          | 0                  | 7                       | not added: ambiguous alias                               |
| Postgre SQL         | PostgreSQL          | 0                  | 7                       | added 2026-10-06                                         |
| Mongo DB            | MongoDB             | 0                  | 0                       | added 2026-10-06                                         |
| Maria DB            | MariaDB             | 0                  | 74                      | added 2026-10-06                                         |
| Elastic Search      | Elasticsearch       | 0                  | 76                      | added 2026-10-06                                         |
| Cloud Flare         | Cloudflare          | 0                  | 188                     | added 2026-10-06                                         |
| Data Dog            | Datadog             | 0                  | 8                       | added 2026-10-06                                         |
| NewRelic            | New Relic           | 0                  | 416                     | added 2026-10-06                                         |
| Open AI             | OpenAI              | 0                  | 8                       | added 2026-10-06                                         |
| Chat GPT            | ChatGPT             | 0                  | 0                       | added 2026-10-06                                         |
| Google cloud        | Google Cloud        | 0                  | 28                      | not added: reads as a generic phrase                     |
| Amazon web services | Amazon Web Services | 0                  | 10                      | added 2026-10-06                                         |
| MultiDev            | Multidev            | 1                  | 731                     | already strict (approved 2026-10-06)                     |
| Multi-dev           | Multidev            | 0                  | 731                     | already strict (approved 2026-10-06)                     |

`Web Pack` corrects to `Webpack` because the docs write `Webpack`. The upstream project styles
itself `webpack`, so that target needs product review.

## Accepted aliases and ambiguous names

No rule flags these: `Postgres`, `ReactJS`, `GCP`, `K8s`, `AWS`, `npm`, `AngularJS` (the legacy
framework), `Magento` (the historical product name), package names, command names, URLs, and code
identifiers. Put quoted UI or error-message text in code formatting, or wrap it in a
`vale-exception` block: Vale can't tell quoted external text from prose.

## Effect on main (2026-10-06, Vale 3.24.0)

- `src/source/content`: 4,091 -> 4,068. New: 24 `Pantheon.TermsStrict` (Javascript 15, Gitlab 5,
  BitBucket 4). Removed: 47 `Pantheon.Headings`.
- `src/source/releasenotes`: 253 -> 253 (+1 BitBucket, -1 heading).
- Of the 47 removed heading alerts, about 40 were false positives on product names. Seven were
  real sentence-case errors that now pass because each extra accepted word lowers the share of
  wrong words below the rule's tolerance:
  - `guides/frontend-performance/06-code-css.md:33` "Deliver Efficient CSS and JavaScript"
  - `guides/global-cdn/04-test-global-cdn-caching.md:57` "View HTTPS Headers with Chrome"
  - `guides/global-cdn/04-test-global-cdn-caching.md:67` "View HTTPS Headers with Firefox"
  - `core-updates.md:46` "Apply Upstream Updates via the Site Dashboard"
  - `guides/account-mgmt/workspace-sites-teams/05-sites.md:150` "Delete a Site from the Site Dashboard"
  - `guides/wordpress-developer/08-wordpress-gcs.md:43` "... within the AWS Console"
  - `certification/study-guide-cms/08-extend.md:90` "... Ubuntu Installation"
- Strict targets with fewer than two prose uses aren't corpus-verified: Vue.js 0, Storybook 0,
  MongoDB 0, ChatGPT 0, TypeScript 1, Tailwind CSS 1.

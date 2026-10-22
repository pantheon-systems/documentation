'use strict';

// Extractor registry tests. Every fixture is synthetic: example.test hosts, "acme" names, no real data.
// Tests whose names start with "BUG:" are regression tests for bugs found and fixed; they pass.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { EXTRACTORS } = require('../scripts/lib/extractors/index.cjs');
const { extractSource, DEFAULT_STATUS } = require('../scripts/lib/extract.cjs');
const { loadVocab } = require('../scripts/lib/vocab.cjs');

const EXAMPLES = path.join(__dirname, '..', 'examples', 'synthetic');
const VOCAB = loadVocab();
const DOC_KIND = { repo: null, changelog: 'changelog', releases: 'release', planning: 'planning' };

// Every id in the registry must appear here, and each must have run one positive and two negative tests.
const TESTED_IDS = [
  'repo-package-bin', 'repo-block-json',
  'code-tool-definition', 'code-cli-command', 'code-annotated-command', 'code-env-var', 'code-http-route', 'code-route-mount',
  'wp-rest-route', 'wp-block-type', 'wp-hook', 'wp-cli-command', 'wp-readme-changelog',
  'doc-readme-heading', 'doc-heading', 'doc-item', 'doc-changeset', 'doc-planning-stub',
];

const POS = new Set();
const NEG = new Map();

const find = (id) => {
  const ex = EXTRACTORS.find((e) => e.id === id);
  assert.ok(ex, `extractor ${id} is not in the registry`);
  return ex;
};

function ctxFor({ file, text, sourceKind = 'repo', options = {}, defaultStatus, vocab = VOCAB }) {
  return {
    file, rel: file, base: path.basename(file), ext: path.extname(file).toLowerCase(), text, lines: text.split(/\r?\n/),
    sourceKind, docKind: DOC_KIND[sourceKind], defaultStatus: defaultStatus || DEFAULT_STATUS[sourceKind], options, vocab, memo: {},
  };
}

// Run an extractor that must apply; record the positive.
function positive(id, spec) {
  const ex = find(id);
  const ctx = ctxFor(spec);
  assert.equal(ex.appliesTo(ctx), true, `${id} should apply to ${spec.file}`);
  POS.add(id);
  return ex.extract(ctx);
}

// Run an extractor and return [] when it does not apply. For quiet-by-design cases; no recording.
function run(id, spec) {
  const ex = find(id);
  const ctx = ctxFor(spec);
  return ex.appliesTo(ctx) ? ex.extract(ctx) : [];
}

// Negative: the rule may apply but must emit nothing.
function silent(id, spec) {
  NEG.set(id, (NEG.get(id) || 0) + 1);
  assert.deepEqual(run(id, spec), []);
}

// Negative: the rule must not even apply (wrong file type, test file, wrong source kind).
function inapplicable(id, spec) {
  NEG.set(id, (NEG.get(id) || 0) + 1);
  assert.equal(find(id).appliesTo(ctxFor(spec)), false, `${id} should not apply to ${spec.file} (${spec.sourceKind || 'repo'})`);
}

const pick = (items) => items.map(({ name, kind, status, line, confidence, posture }) => ({ name, kind, status, line, confidence, posture }));
const item = (name, kind, status, line, confidence, posture) => ({ name, kind, status, line, confidence, posture });

const dirs = [];
function tmp() {
  const d = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'extractors-')));
  dirs.push(d);
  return d;
}
test.after(() => {
  for (const d of dirs) fs.rmSync(d, { recursive: true, force: true });
});

function copyExample(name) {
  const dest = path.join(tmp(), name);
  fs.cpSync(path.join(EXAMPLES, name), dest, { recursive: true });
  // PHP fixtures are stored as .php.txt so the docs site build doesn't detect PHP; restore the real name in the copy.
  for (const f of fs.readdirSync(dest, { recursive: true })) {
    if (f.endsWith('.php.txt')) fs.renameSync(path.join(dest, f), path.join(dest, f.slice(0, -4)));
  }
  return dest;
}

function addNoise(root) {
  fs.mkdirSync(path.join(root, 'node_modules', 'dep'), { recursive: true });
  fs.writeFileSync(path.join(root, 'node_modules', 'dep', 'index.js'), "export const depTool = defineTool({ name: 'dep_tool' });\nprocess.env.DEP_SECRET_VALUE;\n");
  fs.mkdirSync(path.join(root, 'src'), { recursive: true });
  fs.writeFileSync(path.join(root, 'src', 'x.test.js'), "server.tool('x_test_tool', {});\nprocess.env.X_TEST_ONLY_VAR;\n");
}

const names = (res) => res.candidates.map((c) => c.name).sort();
const byName = (res, name) => res.candidates.find((c) => c.name === name);

// ---------------------------------------------------------------- registry

test('registry: ids are unique and every extractor has the required shape', () => {
  const ids = EXTRACTORS.map((e) => e.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const ex of EXTRACTORS) {
    assert.equal(typeof ex.id, 'string');
    assert.equal(Number.isInteger(ex.version), true, `${ex.id} version`);
    assert.ok(Array.isArray(ex.sourceKinds) && ex.sourceKinds.length > 0, `${ex.id} sourceKinds`);
    assert.equal(typeof ex.appliesTo, 'function');
    assert.equal(typeof ex.extract, 'function');
  }
});

// ---------------------------------------------------------------- manifest

test('repo-package-bin: positive, object form reports each binary on the bin line', () => {
  const text = '{\n  "name": "acme-widgets",\n  "bin": { "acme-widgets": "cli.js", "acme-admin": "admin.js" }\n}\n';
  assert.deepEqual(pick(positive('repo-package-bin', { file: 'package.json', text })), [
    item('acme-widgets', 'cli-binary', 'shipped', 3, 'high', 'observed'),
    item('acme-admin', 'cli-binary', 'shipped', 3, 'high', 'observed'),
  ]);
});

test('repo-package-bin: positive, string form takes the package name', () => {
  const text = '{\n  "name": "acme-tool",\n  "bin": "bin/run.js"\n}\n';
  assert.deepEqual(pick(positive('repo-package-bin', { file: 'package.json', text })), [item('acme-tool', 'cli-binary', 'shipped', 3, 'high', 'observed')]);
});

test('repo-package-bin: negative, invalid JSON is reported as a failure, not a silent empty result', () => {
  for (const text of ['// "bin": { "x": "y.js" }\n{ "name": "a" }', '{ "bin": ', '']) {
    assert.throws(() => run('repo-package-bin', { file: 'package.json', text }), /not valid JSON/);
  }
});

test('repo-package-bin: an array bin is one program named for the package, not programs called "0" and "1"', () => {
  assert.deepEqual(pick(run('repo-package-bin', { file: 'package.json', text: '{ "name": "acme-tool", "bin": ["a.js", "b.js"] }' })).map((i) => i.name), ['acme-tool']);
});

test('repo-package-bin: negative, other file names and manifests without bin', () => {
  inapplicable('repo-package-bin', { file: 'package-lock.json', text: '{ "bin": { "x": "y.js" } }' });
  inapplicable('repo-package-bin', { file: 'src/index.test.js', text: 'bin' });
  silent('repo-package-bin', { file: 'package.json', text: '{ "name": "acme", "version": "1.0.0" }' });
  silent('repo-package-bin', { file: 'package.json', text: '{ "bin": "cli.js" }' }); // string bin with no package name
  silent('repo-package-bin', { file: 'package.json', text: 'null' });
});

test('repo-block-json: positive, block name on the name line', () => {
  const text = '{\n  "name": "acme/widget-card",\n  "title": "Widget card"\n}\n';
  assert.deepEqual(pick(positive('repo-block-json', { file: 'blocks/card/block.json', text })), [item('acme/widget-card', 'block', 'shipped', 2, 'high', 'observed')]);
});

test('repo-block-json: negative, invalid JSON, comment-led JSON, and missing or non-string name', () => {
  for (const text of ['// {"name":"acme/x"}\n{ "name": ', '']) assert.throws(() => run('repo-block-json', { file: 'block.json', text }), /not valid JSON/);
  silent('repo-block-json', { file: 'block.json', text: '{ "title": "No name" }' });
  silent('repo-block-json', { file: 'block.json', text: '{ "name": 42 }' });
  silent('repo-block-json', { file: 'block.json', text: '{ "name": "" }' });
});

test('repo-block-json: negative, other file names', () => {
  inapplicable('repo-block-json', { file: 'blocks.json', text: '{ "name": "acme/x" }' });
  inapplicable('repo-block-json', { file: 'block.test.js', text: '{ "name": "acme/x" }' });
});

// ---------------------------------------------------------------- code

test('code-tool-definition: positive, literal name, first-argument name, and bound-constant name', () => {
  const text = [
    '// header comment',
    'export const createTool = defineTool({',
    "  name: 'widget_create',",
    "  title: 'Create a widget',",
    '});',
    "server.tool('widget_list', {});",
    'const archiveWidgetTool = defineTool({ run });',
  ].join('\n');
  const got = positive('code-tool-definition', { file: 'src/server.js', text });
  assert.deepEqual(pick(got), [
    item('widget_create', 'tool', 'shipped', 2, 'high', 'observed'),
    item('widget_list', 'tool', 'shipped', 6, 'high', 'observed'),
    item('archive_widget', 'tool', 'shipped', 7, 'medium', 'observed'),
  ]);
  assert.deepEqual(got[0].terms, ['widget_create', 'widget create', 'widget-create', 'Create a widget']);
});

test('code-tool-definition: negative, comment lines are ignored', () => {
  silent('code-tool-definition', { file: 'src/server.js', text: "// server.tool('commented_tool', {});\n * defineTool({ name: 'doc_tool' })\n# registerTool('hash_tool')" });
});

test('code-tool-definition: negative, test files and inapplicable file types', () => {
  inapplicable('code-tool-definition', { file: 'src/server.test.js', text: "server.tool('test_only_tool', {});" });
  inapplicable('code-tool-definition', { file: 'src/server.spec.ts', text: "server.tool('spec_only_tool', {});" });
  inapplicable('code-tool-definition', { file: 'docs/guide.md', text: "server.tool('doc_only_tool', {});" });
});

test('code-tool-definition: negative, call with no name and no binding yields nothing', () => {
  silent('code-tool-definition', { file: 'src/server.js', text: 'export default defineTool({});\n' });
  silent('code-tool-definition', { file: 'src/server.js', text: '' });
});

test('code-cli-command: positive, single and double quotes, subcommand with a colon', () => {
  const text = "const program = new Command();\nprogram.command('deploy <site>');\nprogram\n  .command(\"db:migrate\")\n";
  assert.deepEqual(pick(positive('code-cli-command', { file: 'src/cli.js', text })), [
    item('deploy', 'cli-command', 'shipped', 2, 'high', 'observed'),
    item('db:migrate', 'cli-command', 'shipped', 4, 'high', 'observed'),
  ]);
});

test('code-annotated-command: positive, docblock @command annotations in a PHP class', () => {
  const text = "<?php\nclass DeployCommand {\n    /**\n     * Deploys code.\n     *\n     * @command env:deploy\n     * @aliases deploy\n     */\n    public function deploy() {}\n}\n";
  assert.deepEqual(pick(positive('code-annotated-command', { file: 'src/Commands/Env/DeployCommand.php', text })), [
    item('env:deploy', 'cli-command', 'shipped', 6, 'high', 'observed'),
  ]);
});

test('code-annotated-command: negative, prose that mentions @command and a non-annotation line', () => {
  silent('code-annotated-command', { file: 'src/A.php', text: "<?php\n/**\n * Use the @command tag to name a command.\n */\n$x = '@command nope';\n" });
  silent('code-annotated-command', { file: 'src/A.php', text: '<?php\n// @command env:deploy\n' });
});

test('code-annotated-command: negative, test file and non-PHP file', () => {
  inapplicable('code-annotated-command', { file: 'tests/DeployCommandTest.php', text: '<?php\n/**\n * @command env:deploy\n */\n' });
  inapplicable('code-annotated-command', { file: 'src/cli.js', text: '/**\n * @command env:deploy\n */\n' });
});

test('code-cli-command: negative, comment line and non-literal argument', () => {
  silent('code-cli-command', { file: 'src/cli.js', text: "// program.command('old-cmd');\n * .command('doc-cmd')\n" });
  silent('code-cli-command', { file: 'src/cli.js', text: 'program.command(name);\n' });
});

test('code-cli-command: negative, test file and inapplicable type', () => {
  inapplicable('code-cli-command', { file: 'src/cli.test.js', text: "program.command('test-cmd');" });
  inapplicable('code-cli-command', { file: 'README.md', text: "program.command('md-cmd');" });
});

test('code-env-var: positive, JS, Python, PHP and Ruby read forms', () => {
  const js = positive('code-env-var', { file: 'src/a.js', text: 'const a = 1;\nconst t = process.env.WIDGET_API_TOKEN;\n' });
  assert.deepEqual(pick(js), [item('WIDGET_API_TOKEN', 'env-var', 'shipped', 2, 'medium', 'observed')]);
  assert.deepEqual(pick(positive('code-env-var', { file: 'a.py', text: 'import os\nx = os.environ.get("WIDGET_REGION")\n' })), [item('WIDGET_REGION', 'env-var', 'shipped', 2, 'medium', 'observed')]);
  assert.deepEqual(pick(positive('code-env-var', { file: 'a.php', text: "<?php\n$h = getenv('WIDGET_HOST_NAME');\n" })), [item('WIDGET_HOST_NAME', 'env-var', 'shipped', 2, 'medium', 'observed')]);
  assert.deepEqual(pick(positive('code-env-var', { file: 'a.rb', text: "x = ENV['WIDGET_CACHE_DIR']\n" })), [item('WIDGET_CACHE_DIR', 'env-var', 'shipped', 1, 'medium', 'observed')]);
});

test('code-env-var: negative, common variables (NODE_ENV, CI, PORT) are dropped', () => {
  silent('code-env-var', { file: 'src/a.js', text: 'const m = process.env.NODE_ENV;\nconst p = process.env.PORT;\nconst c = process.env.CI;\n' });
});

test('code-env-var: negative, a profile can add to the common list', () => {
  const vocab = loadVocab({ commonEnv: ['WIDGET_DEBUG_LEVEL'] });
  silent('code-env-var', { file: 'src/a.js', text: 'process.env.WIDGET_DEBUG_LEVEL;', vocab });
  assert.equal(run('code-env-var', { file: 'src/a.js', text: 'process.env.WIDGET_DEBUG_LEVEL;' }).length, 1);
});

test('code-env-var: negative, comment lines, test files, markdown, lowercase and short names', () => {
  silent('code-env-var', { file: 'src/a.js', text: '// process.env.COMMENTED_VAR\n * process.env.DOC_BLOCK_VAR\n# os.environ.get("HASH_COMMENT_VAR")' });
  silent('code-env-var', { file: 'src/a.js', text: 'process.env.token; process.env.AB;' });
  inapplicable('code-env-var', { file: 'src/a.test.js', text: 'process.env.TEST_ONLY_VAR' });
  inapplicable('code-env-var', { file: 'docs/setup.md', text: 'process.env.DOC_ONLY_VAR' });
});

test('code-http-route: positive, name carries method, path and file; terms are the static words', () => {
  const text = "const app = express();\napp.post('/widgets/:id/share', handler);\napp.get(\"/health-check\", h);\n";
  const got = positive('code-http-route', { file: 'src/server.js', text });
  assert.deepEqual(pick(got), [
    item('POST /widgets/:id/share (server.js)', 'http-route', 'shipped', 2, 'medium', 'observed'),
    item('GET /health-check (server.js)', 'http-route', 'shipped', 3, 'medium', 'observed'),
  ]);
  assert.deepEqual(got[0].terms, ['widgets', 'share']);
  assert.deepEqual(got[1].terms, ['health check']);
});

test('code-http-route: negative, routes with no static path word', () => {
  silent('code-http-route', { file: 'src/server.js', text: "app.get('/', h);\napp.delete('/:id', h);\napp.get('/v1/:id', h);\napp.get('/api', h);\n" });
});

test('code-http-route: negative, comment line, test file, inapplicable type', () => {
  silent('code-http-route', { file: 'src/server.js', text: "// app.get('/commented-out-route', h);\n * app.post('/doc-block-route', h)\n" });
  inapplicable('code-http-route', { file: 'src/server.test.js', text: "app.get('/test-only-route', h);" });
  inapplicable('code-http-route', { file: 'README.md', text: "app.get('/md-only-route', h);" });
});

test('code-route-mount: positive, mount name and static terms', () => {
  const text = "const r = Router();\nr.route('/widgets/:id');\n";
  const got = positive('code-route-mount', { file: 'src/router.js', text });
  assert.deepEqual(pick(got), [item('mount /widgets/:id (router.js)', 'route-mount', 'shipped', 2, 'medium', 'observed')]);
  assert.deepEqual(got[0].terms, ['widgets']);
});

test('code-route-mount: negative, mounts with no static path word', () => {
  silent('code-route-mount', { file: 'src/router.js', text: "r.route('/');\nr.route('/:id');\nr.route('/v2');\n" });
});

test('code-route-mount: negative, comment line, test file, inapplicable type', () => {
  silent('code-route-mount', { file: 'src/router.js', text: "// r.route('/commented-mount');\n" });
  inapplicable('code-route-mount', { file: 'src/router.spec.js', text: "r.route('/spec-only-mount');" });
  inapplicable('code-route-mount', { file: 'notes.txt', text: "r.route('/txt-only-mount');" });
});

// ---------------------------------------------------------------- wordpress

test('wp-rest-route: positive, namespace and route are joined', () => {
  const text = "<?php\nregister_rest_route( 'acme/v1', '/widgets', array() );\n";
  assert.deepEqual(pick(positive('wp-rest-route', { file: 'acme-widgets.php', text })), [item('acme/v1/widgets', 'rest-route', 'shipped', 2, 'high', 'observed')]);
});

test('wp-rest-route: negative, comment lines and non-literal arguments', () => {
  silent('wp-rest-route', { file: 'a.php', text: "// register_rest_route( 'acme/v1', '/old', array() );\n# register_rest_route( 'acme/v1', '/hash', [] );\n * register_rest_route( 'acme/v1', '/doc', [] )" });
  silent('wp-rest-route', { file: 'a.php', text: 'register_rest_route( $namespace, $route, $args );' });
});

test('wp-rest-route: negative, test file and inapplicable type', () => {
  inapplicable('wp-rest-route', { file: 'tests/rest.test.js', text: "register_rest_route( 'acme/v1', '/t', [] );" });
  inapplicable('wp-rest-route', { file: 'readme.txt', text: "register_rest_route( 'acme/v1', '/t', [] );" });
});

test('wp-block-type: positive, single and double quotes', () => {
  const text = "<?php\nregister_block_type( 'acme/widget-card' );\nregister_block_type(\"acme/widget-list\", $args);\n";
  assert.deepEqual(pick(positive('wp-block-type', { file: 'acme-widgets.php', text })), [
    item('acme/widget-card', 'block', 'shipped', 2, 'high', 'observed'),
    item('acme/widget-list', 'block', 'shipped', 3, 'high', 'observed'),
  ]);
});

test('wp-block-type: negative, comment lines and a path argument instead of a name', () => {
  silent('wp-block-type', { file: 'a.php', text: "// register_block_type( 'acme/commented-out' );\n# register_block_type( 'acme/hash' );\n" });
  silent('wp-block-type', { file: 'a.php', text: 'register_block_type( __DIR__ . "/build" );' });
});

test('wp-block-type: negative, test file and inapplicable type', () => {
  inapplicable('wp-block-type', { file: 'a.test.js', text: "register_block_type( 'acme/t' );" });
  inapplicable('wp-block-type', { file: 'a.html', text: "register_block_type( 'acme/t' );" });
});

test('wp-hook: positive, do_action and apply_filters are both reported', () => {
  const text = "<?php\ndo_action( 'acme_widget_saved', $id );\n$x = apply_filters( \"acme_widget_title\", $t );\n";
  assert.deepEqual(pick(positive('wp-hook', { file: 'a.php', text })), [
    item('acme_widget_saved', 'hook', 'shipped', 2, 'high', 'observed'),
    item('acme_widget_title', 'hook', 'shipped', 3, 'high', 'observed'),
  ]);
});

test('wp-hook: negative, hooks the code only listens to are not reported', () => {
  silent('wp-hook', { file: 'a.php', text: "add_action( 'init', 'acme_init' );\nadd_filter( 'the_title', 'acme_title' );\n" });
});

test('wp-hook: negative, comment line, dynamic name, test file', () => {
  silent('wp-hook', { file: 'a.php', text: "// do_action( 'acme_commented' );\n" });
  silent('wp-hook', { file: 'a.php', text: 'do_action( $name );' });
  inapplicable('wp-hook', { file: 'a.test.js', text: "do_action( 'acme_test_only' );" });
});

test('wp-cli-command: positive, name is prefixed with wp', () => {
  const text = "<?php\nWP_CLI::add_command( 'acme purge', 'Acme_Purge' );\n";
  assert.deepEqual(pick(positive('wp-cli-command', { file: 'a.php', text })), [item('wp acme purge', 'wp-cli-command', 'shipped', 2, 'high', 'observed')]);
});

test('wp-cli-command: negative, comment line and other WP_CLI calls', () => {
  silent('wp-cli-command', { file: 'a.php', text: "// WP_CLI::add_command( 'acme old', 'X' );\n" });
  silent('wp-cli-command', { file: 'a.php', text: "WP_CLI::line( 'hello' );\nWP_CLI::success( 'done' );\n" });
});

test('wp-cli-command: negative, test file and inapplicable type', () => {
  inapplicable('wp-cli-command', { file: 'a.test.js', text: "WP_CLI::add_command( 'acme t', 'X' );" });
  inapplicable('wp-cli-command', { file: 'docs.md', text: "WP_CLI::add_command( 'acme t', 'X' );" });
});

const README_TXT = [
  '=== Acme Widgets ===', //                                                1
  '== Description ==', //                                                   2
  '* Bullet in the description section that must not count', //             3
  '== Changelog ==', //                                                     4
  '= 1.4.0 =', //                                                           5
  '* New: Widget scheduling, so a widget publishes at a set time', //       6
  '* Fix: Corrected a typo in the settings screen', //                      7
  '= Unreleased =', //                                                      8
  '* New: Bulk export of widgets to CSV', //                                9
  '= 1.3.0 =', //                                                           10
  '* New: Widget archive (beta) for editors', //                            11
].join('\n');

test('wp-readme-changelog: positive, label stripped, status from the version heading, reported posture', () => {
  const got = positive('wp-readme-changelog', { file: 'readme.txt', text: README_TXT, sourceKind: 'changelog' });
  assert.deepEqual(pick(got), [
    item('Widget scheduling, so a widget publishes at a set time', 'changelog-item', 'shipped', 6, 'low', 'reported'),
    item('Bulk export of widgets to CSV', 'changelog-item', 'planned', 9, 'low', 'reported'),
    item('Widget archive (beta) for editors', 'changelog-item', 'limited', 11, 'low', 'reported'),
  ]);
});

test('wp-readme-changelog: negative, Fix, chore, dev and dependency bullets, and bullets outside the changelog', () => {
  const text = [
    '== Changelog ==', '= 2.0.0 =',
    '* Fix: Corrected a typo in the settings screen',
    '* Fixed an issue with the widget list ordering',
    '* Chore: Tidy up the build scripts for release',
    '* Dev: Add a lint step to the pipeline setup',
    '* Updated dependencies to the latest versions',
    '* Bump the bundled library to the next minor',
    '* short',
    '== Upgrade Notice ==',
    '* Bullet in another section that must not count',
  ].join('\n');
  silent('wp-readme-changelog', { file: 'readme.txt', text, sourceKind: 'changelog' });
  silent('wp-readme-changelog', { file: 'readme.txt', text: '== Description ==\n* A description bullet that is long enough\n', sourceKind: 'changelog' });
});

test('wp-readme-changelog: negative, non-readme.txt files and empty input', () => {
  inapplicable('wp-readme-changelog', { file: 'readme.md', text: README_TXT, sourceKind: 'changelog' });
  inapplicable('wp-readme-changelog', { file: 'src/readme.test.js', text: README_TXT, sourceKind: 'changelog' });
  silent('wp-readme-changelog', { file: 'readme.txt', text: '', sourceKind: 'changelog' });
});

// ---------------------------------------------------------------- docs

test('doc-readme-heading: positive, level 2 and 3 headings only', () => {
  const text = '# Acme Widgets\n\n## Widget sharing\n\nShare with a link.\n\n### Share with a link\n\n#### Too deep to count\n';
  assert.deepEqual(pick(positive('doc-readme-heading', { file: 'README.md', text })), [
    item('Widget sharing', 'repo-doc-heading', 'shipped', 3, 'low', 'observed'),
    item('Share with a link', 'repo-doc-heading', 'shipped', 7, 'low', 'observed'),
  ]);
});

test('doc-readme-heading: positive, other Markdown files apply only with the repoDocs option', () => {
  const spec = { file: 'docs/guide.md', text: '## Widget sharing\n' };
  inapplicable('doc-readme-heading', spec);
  assert.deepEqual(pick(positive('doc-readme-heading', { ...spec, options: { repoDocs: true } })), [item('Widget sharing', 'repo-doc-heading', 'shipped', 1, 'low', 'observed')]);
});

test('doc-readme-heading: negative, a heading-only generic title such as Installation', () => {
  silent('doc-readme-heading', { file: 'README.md', text: '## Installation\n\n## Usage\n\n## License\n\n### FAQ\n' });
});

test('doc-readme-heading: negative, commented-out heading and short heading', () => {
  silent('doc-readme-heading', { file: 'README.md', text: '<!-- ## Hidden heading -->\n## API\n' });
});

test('doc-readme-heading: negative, changelog files, internal docs, other source kinds', () => {
  inapplicable('doc-readme-heading', { file: 'CHANGELOG.md', text: '## Widget sharing\n', options: { repoDocs: true } });
  inapplicable('doc-readme-heading', { file: 'docs/PLANS/widgets.md', text: '## Widget sharing\n', options: { repoDocs: true } });
  inapplicable('doc-readme-heading', { file: 'docs/2026-01-02-notes.md', text: '## Widget sharing\n', options: { repoDocs: true } });
  inapplicable('doc-readme-heading', { file: 'README.md', text: '## Widget sharing\n', sourceKind: 'changelog' });
  inapplicable('doc-readme-heading', { file: 'README.txt', text: '## Widget sharing\n' });
});

const CHANGELOG_MD = [
  '# Changelog', //                      1
  '', //                                 2
  '## Unreleased', //                    3
  '### Widget templates', //             4
  '', //                                 5
  '## 2.3.0', //                         6
  '### Widget sharing', //               7
  '### Added', //                        8
  '### Installation', //                 9
].join('\n');

test('doc-heading: positive, status comes from the nearest Unreleased or version heading', () => {
  const got = positive('doc-heading', { file: 'CHANGELOG.md', text: CHANGELOG_MD, sourceKind: 'changelog' });
  assert.deepEqual(pick(got), [
    item('Widget templates', 'changelog-heading', 'planned', 4, 'low', 'reported'),
    item('Widget sharing', 'changelog-heading', 'shipped', 7, 'low', 'reported'),
  ]);
});

test('doc-heading: positive, kind follows the source kind', () => {
  const text = '## Widget exports\n';
  assert.equal(positive('doc-heading', { file: 'notes.md', text, sourceKind: 'releases' })[0].kind, 'release-heading');
  assert.equal(positive('doc-heading', { file: 'notes.md', text: `${text}\n${'Some body text that is long enough. '.repeat(6)}`, sourceKind: 'planning' })[0].kind, 'planning-heading');
});

test('doc-heading: negative, generic titles, section labels, short titles and level 1', () => {
  silent('doc-heading', { file: 'CHANGELOG.md', text: '# Widget platform\n## Installation\n## Overview\n### Added\n### Fixed\n### API\n', sourceKind: 'changelog' });
});

test('doc-heading: negative, commented-out heading', () => {
  silent('doc-heading', { file: 'CHANGELOG.md', text: '<!-- ## Hidden heading -->\n', sourceKind: 'changelog' });
});

test('doc-heading: negative, repo source, non-doc types, changesets, and planning stubs', () => {
  inapplicable('doc-heading', { file: 'README.md', text: '## Widget sharing\n' });
  inapplicable('doc-heading', { file: 'src/changes.json', text: '## Widget sharing', sourceKind: 'changelog' });
  inapplicable('doc-heading', { file: '.changeset/quiet-owls.md', text: '## Widget sharing\n', sourceKind: 'changelog' });
  inapplicable('doc-heading', { file: 'plans/stub.md', text: '# Stub\n\n## Widget sharing\n', sourceKind: 'planning' });
});

const CHANGELOG_ITEMS = [
  '# Changelog', //                                                                   1
  '## Unreleased', //                                                                 2
  '- Added widget templates so teams can save settings', //                           3
  '## 2.3.0', //                                                                      4
  '- Added widget sharing links, so a widget can be opened without an account', //    5
  '- Added `widget_restore` to bring back a deleted widget', //                       6
].join('\n');

test('doc-item: positive, names, kinds, lines, status, terms', () => {
  const got = positive('doc-item', { file: 'CHANGELOG.md', text: CHANGELOG_ITEMS, sourceKind: 'changelog' });
  assert.deepEqual(pick(got), [
    item('Added widget templates so teams can save settings', 'changelog-item', 'planned', 3, 'low', 'reported'),
    item('Added widget sharing links, so a widget can be opened without an account', 'changelog-item', 'shipped', 5, 'low', 'reported'),
    item('Added widget_restore to bring back a deleted widget', 'changelog-item', 'shipped', 6, 'low', 'reported'),
  ]);
  assert.deepEqual(got[2].terms, ['widget_restore', 'widget_restore to bring back a']);
});

test('doc-item: positive, release post in HTML reduces to list items', () => {
  const html = '<h2>Exports</h2><ul><li>Added bulk export of widgets</li></ul>';
  const got = positive('doc-item', { file: 'posts/release.html', text: html, sourceKind: 'releases' });
  assert.equal(got.length, 1);
  assert.equal(got[0].name, 'Added bulk export of widgets');
  assert.equal(got[0].kind, 'release-item');
  assert.equal(got[0].status, 'shipped');
});

test('doc-item: negative, Fix, chore, dependency and bump entries', () => {
  const text = [
    '## 2.3.0',
    '- Fix typo in an error message',
    '- Fixed the widget list ordering bug',
    '- chore: tidy the build scripts up',
    '- Updated dependencies across the workspace',
    '- Bump the bundled library to the next minor',
    '- [fix] correct the widget label spacing',
    '- deps: refresh the lockfile for release',
    '- @acme/widgets@2.3.0',
    '- tiny',
  ].join('\n');
  silent('doc-item', { file: 'CHANGELOG.md', text, sourceKind: 'changelog' });
});

test('doc-item: negative, commented-out bullet', () => {
  silent('doc-item', { file: 'CHANGELOG.md', text: '## 2.3.0\n<!-- - Added a hidden widget feature here -->\n', sourceKind: 'changelog' });
});

test('doc-item: negative, repo source, non-doc types, changesets, planning stubs', () => {
  inapplicable('doc-item', { file: 'README.md', text: '- Added widget sharing links for readers' });
  inapplicable('doc-item', { file: 'data/changes.json', text: '- Added widget sharing links', sourceKind: 'changelog' });
  inapplicable('doc-item', { file: '.changeset/quiet-owls.md', text: '- Added widget sharing links', sourceKind: 'changelog' });
  inapplicable('doc-item', { file: 'plans/stub.md', text: '# Stub\n\n- Added widget sharing links\n', sourceKind: 'planning' });
});

test('doc-changeset: positive, first body line after front matter, status limited on opt-in wording', () => {
  const text = '---\n"acme-widgets": minor\n---\n\nWebhook delivery is available to accounts that opt in to the preview.\n';
  assert.deepEqual(pick(positive('doc-changeset', { file: '.changeset/quiet-owls-sing.md', text, sourceKind: 'changelog' })), [
    item('Webhook delivery is available to accounts that opt in to the preview.', 'changeset-item', 'limited', 1, 'low', 'reported'),
  ]);
});

test('doc-changeset: positive, plain entry is shipped', () => {
  const text = '---\n"acme-widgets": patch\n---\n\nAdded widget export for admins.\n\nMore detail on a second line.\n';
  assert.deepEqual(pick(positive('doc-changeset', { file: '.changeset/calm-cats.md', text, sourceKind: 'releases' })), [
    item('Added widget export for admins.', 'changeset-item', 'shipped', 1, 'low', 'reported'),
  ]);
});

test('doc-changeset: negative, Fix, dependency and too-short bodies', () => {
  const fm = '---\n"acme-widgets": patch\n---\n\n';
  silent('doc-changeset', { file: '.changeset/a.md', text: `${fm}Fix typo in docs page\n`, sourceKind: 'changelog' });
  silent('doc-changeset', { file: '.changeset/b.md', text: `${fm}Updated dependencies\n`, sourceKind: 'changelog' });
  silent('doc-changeset', { file: '.changeset/c.md', text: `${fm}tiny\n`, sourceKind: 'changelog' });
  silent('doc-changeset', { file: '.changeset/d.md', text: fm, sourceKind: 'changelog' });
});

test('doc-changeset: negative, changeset README, config.json, markdown outside .changeset, repo source', () => {
  inapplicable('doc-changeset', { file: '.changeset/README.md', text: 'Added widget export for admins.', sourceKind: 'changelog' });
  inapplicable('doc-changeset', { file: '.changeset/config.json', text: '{ "changelog": "x" }', sourceKind: 'changelog' });
  inapplicable('doc-changeset', { file: 'docs/guide.md', text: 'Added widget export for admins.', sourceKind: 'changelog' });
  assert.equal(find('doc-changeset').sourceKinds.includes('repo'), false, 'changesets are not read from a repo source');
  NEG.set('doc-changeset', (NEG.get('doc-changeset') || 0) + 1);
});

const BODY_80 = 'word '.repeat(20); //   80 non-space characters
const BODY_200 = 'word '.repeat(50); // 200 non-space characters

test('doc-planning-stub: positive, heading with under 120 characters of body is a stub', () => {
  const text = `# Schedule a widget\n\n${BODY_80}\n`;
  const got = positive('doc-planning-stub', { file: 'planning/schedule.md', text, sourceKind: 'planning' });
  assert.deepEqual(pick(got), [item('Schedule a widget', 'planning-stub', 'planned', 1, 'high', 'observed')]);
  assert.match(got[0].excerpt, /schedule\.md has a title and almost no body \(80 characters\)/);
});

test('doc-planning-stub: positive, heading-only doc and the 119/120 boundary', () => {
  assert.equal(positive('doc-planning-stub', { file: 'p.md', text: '# Only a title\n', sourceKind: 'planning' }).length, 1);
  assert.equal(positive('doc-planning-stub', { file: 'p.md', text: `# Edge\n\n${'a'.repeat(119)}\n`, sourceKind: 'planning' }).length, 1);
  inapplicable('doc-planning-stub', { file: 'p.md', text: `# Edge\n\n${'a'.repeat(120)}\n`, sourceKind: 'planning' });
});

test('doc-planning-stub: negative, 200 characters of body is not a stub and is read by the normal rules', () => {
  const spec = { file: 'planning/restore.md', text: `# Restore a widget\n\n${BODY_200}\n\n## Widget exports\n`, sourceKind: 'planning' };
  inapplicable('doc-planning-stub', spec);
  assert.equal(find('doc-heading').appliesTo(ctxFor(spec)), true);
  assert.equal(find('doc-item').appliesTo(ctxFor(spec)), true);
});

test('doc-planning-stub: negative, a doc with no heading is not a stub', () => {
  inapplicable('doc-planning-stub', { file: 'planning/loose.md', text: 'just a short note\n', sourceKind: 'planning' });
  inapplicable('doc-planning-stub', { file: 'planning/empty.md', text: '', sourceKind: 'planning' });
});

test('doc-planning-stub: negative, only planning sources and doc file types qualify', () => {
  inapplicable('doc-planning-stub', { file: 'CHANGELOG.md', text: '# Title\n', sourceKind: 'changelog' });
  inapplicable('doc-planning-stub', { file: 'README.md', text: '# Title\n', sourceKind: 'repo' });
  inapplicable('doc-planning-stub', { file: 'planning/data.json', text: '# Title\n', sourceKind: 'planning' });
});

test('doc-planning-stub: a stub is claimed only by the stub rule, not also by doc-heading or doc-item', () => {
  const spec = { file: 'planning/stub.md', text: `# Schedule a widget\n\n## Widget exports\n- Added bulk export of widgets\n`, sourceKind: 'planning' };
  assert.equal(find('doc-planning-stub').appliesTo(ctxFor(spec)), true);
  assert.equal(find('doc-heading').appliesTo(ctxFor(spec)), false);
  assert.equal(find('doc-item').appliesTo(ctxFor(spec)), false);
});

// ---------------------------------------------------------------- status

test('status: items under Unreleased and Upcoming are planned', () => {
  const text = '## Unreleased\n- Added widget templates for teams\n## 2.0.0\n- Added widget locking for teams\n## Upcoming\n- Added widget comments for teams\n';
  const got = positive('doc-item', { file: 'CHANGELOG.md', text, sourceKind: 'changelog' });
  assert.deepEqual(got.map((g) => g.status), ['planned', 'shipped', 'planned']);
});

test('status: feature flag, beta and opt in wording make a released item limited', () => {
  const text = [
    '## 2.3.0',
    '- Added widget archive behind a feature flag for admins',
    '- Added widget comments in beta for all accounts',
    '- Added widget export that teams opt in to per site',
    '- Added widget sharing links for every account',
  ].join('\n');
  const got = positive('doc-item', { file: 'CHANGELOG.md', text, sourceKind: 'changelog' });
  assert.deepEqual(got.map((g) => g.status), ['limited', 'limited', 'limited', 'shipped']);
});

test('status: a limited hint under Unreleased stays planned', () => {
  const got = positive('doc-item', { file: 'CHANGELOG.md', text: '## Unreleased\n- Added widget archive in beta for admins\n', sourceKind: 'changelog' });
  assert.equal(got[0].status, 'planned');
});

test('status: items under a version heading are shipped, including bracketed and v-prefixed versions', () => {
  const text = '## [2.3.0] - 2026-01-05\n- Added widget sharing links for readers\n## v2.2\n- Added widget locking for editors\n';
  const got = positive('doc-item', { file: 'CHANGELOG.md', text, sourceKind: 'changelog' });
  assert.deepEqual(got.map((g) => g.status), ['shipped', 'shipped']);
});

test('status: a planning source defaults to planned', () => {
  assert.equal(DEFAULT_STATUS.planning, 'planned');
  const text = `# Widget roadmap\n\n${BODY_200}\n\n- Added widget sharing links for readers\n`;
  const got = positive('doc-item', { file: 'planning/roadmap.md', text, sourceKind: 'planning' });
  assert.equal(got[0].status, 'planned');
  assert.equal(got[0].kind, 'planning-item');
});

test('status: a changeset with flag or preview wording is limited, otherwise shipped', () => {
  const fm = '---\n"acme-widgets": minor\n---\n\n';
  assert.equal(positive('doc-changeset', { file: '.changeset/a.md', text: `${fm}Widget archive ships behind a feature flag.\n`, sourceKind: 'changelog' })[0].status, 'limited');
  assert.equal(positive('doc-changeset', { file: '.changeset/b.md', text: `${fm}Added widget locking for editors.\n`, sourceKind: 'changelog' })[0].status, 'shipped');
});

test('status: the options.defaultStatus override applies to version-heading items', () => {
  const got = positive('doc-item', { file: 'CHANGELOG.md', text: '## 2.3.0\n- Added widget sharing links for readers\n', sourceKind: 'changelog', defaultStatus: 'planned' });
  assert.equal(got[0].status, 'planned');
});

// ---------------------------------------------------------------- end to end

test('e2e node repo: source tree yields the exact repo candidates, nothing from node_modules or test files', () => {
  const root = copyExample('node-repo');
  addNoise(root);
  const res = extractSource({ id: 'node-repo', kind: 'repo', root });
  assert.deepEqual(res.failures, []);
  assert.deepEqual(res.limitations.map((l) => l.reason), ['excluded directory (vocabulary skipDirs)'], 'excluded directories are reported, not skipped silently');
  assert.deepEqual(res.limitations[0].examples.sort(), ['.changeset', 'node_modules']);
  assert.deepEqual(names(res), [
    'POST /widgets/:id/share (server.js)', 'WIDGET_API_TOKEN', 'Widget sharing', 'acme-widgets', 'widget_create', 'widget_restore', 'widget_share',
  ]);
  const kinds = Object.fromEntries(res.candidates.map((c) => [c.name, c.kind]));
  assert.deepEqual(kinds, {
    'acme-widgets': 'cli-binary', 'Widget sharing': 'repo-doc-heading', widget_create: 'tool', widget_share: 'tool', widget_restore: 'tool',
    WIDGET_API_TOKEN: 'env-var', 'POST /widgets/:id/share (server.js)': 'http-route',
  });
  const joined = JSON.stringify(res.candidates);
  for (const forbidden of ['dep_tool', 'DEP_SECRET_VALUE', 'x_test_tool', 'X_TEST_ONLY_VAR', 'test_only_tool', 'NODE_ENV', 'commented-out-route', 'Installation']) {
    assert.equal(joined.includes(forbidden), false, `${forbidden} must not be extracted`);
  }
  for (const c of res.candidates) {
    assert.equal(c.source.includes('node_modules'), false);
    assert.equal(/\.test\./.test(c.source), false);
  }
  assert.equal(byName(res, 'widget_create').source, 'src/server.js:1');
  assert.equal(byName(res, 'WIDGET_API_TOKEN').source, 'src/server.js:11');
  assert.equal(byName(res, 'acme-widgets').source, 'package.json:1');
  assert.deepEqual(byName(res, 'widget_restore').provenance.extractor, { id: 'code-tool-definition', version: 1 });
  assert.equal(res.stats.byExtractor['code-tool-definition'], 3);
  assert.equal(res.stats.byExtractor['code-route-mount'], undefined);
});

test('e2e node repo: CHANGELOG.md as a changelog source', () => {
  const root = copyExample('node-repo');
  const res = extractSource({ id: 'changelog', kind: 'changelog', root: path.join(root, 'CHANGELOG.md') });
  assert.deepEqual(res.failures, []);
  assert.deepEqual(res.candidates.map((c) => [c.name, c.kind, c.status, c.source, c.provenance.posture]), [
    ['Added widget templates so teams can save settings (planned for 2.4)', 'changelog-item', 'planned', 'CHANGELOG.md:5', 'reported'],
    ['Added widget sharing links, so a widget can be opened without an account', 'changelog-item', 'shipped', 'CHANGELOG.md:11', 'reported'],
    ['Added widget_restore to bring back a deleted widget within 30 days', 'changelog-item', 'shipped', 'CHANGELOG.md:12', 'reported'],
    ['Added widget archive (beta, behind a feature flag)', 'changelog-item', 'limited', 'CHANGELOG.md:13', 'reported'],
  ]);
  assert.equal(names(res).some((n) => /typo/i.test(n)), false, 'Fix bullet must be skipped');
});

test('e2e node repo: .changeset folder as a changelog source', () => {
  const root = copyExample('node-repo');
  const res = extractSource({ id: 'changesets', kind: 'changelog', root: path.join(root, '.changeset') });
  assert.deepEqual(res.failures, []);
  assert.deepEqual(res.candidates.map((c) => [c.name, c.kind, c.status, c.source]), [
    ['Webhook delivery is available to accounts that opt in to the preview.', 'changeset-item', 'limited', '.changeset/quiet-owls-sing.md:1'],
  ]);
});

test('e2e node repo: a repo walk does not read the .changeset folder or the changelog twice', () => {
  const root = copyExample('node-repo');
  const res = extractSource({ id: 'node-repo', kind: 'repo', root });
  assert.equal(res.candidates.some((c) => c.kind === 'changeset-item' || c.kind === 'changelog-item'), false);
});

test('e2e wp plugin: PHP registrations plus readme.txt changelog, Fix bullets skipped', () => {
  const root = copyExample('wp-plugin');
  addNoise(root);
  const res = extractSource({ id: 'wp-plugin', kind: 'repo', root });
  assert.deepEqual(res.failures, []);
  assert.deepEqual(res.limitations.map((l) => l.reason), ['excluded directory (vocabulary skipDirs)'], 'excluded directories are reported, not skipped silently');
  const got = res.candidates.map((c) => [c.name, c.kind, c.status, c.source]);
  assert.deepEqual(got, [
    ['acme/v1/widgets', 'rest-route', 'shipped', 'acme-widgets.php:2'],
    ['acme/widget-card', 'block', 'shipped', 'acme-widgets.php:3'],
    ['acme_widget_saved', 'hook', 'shipped', 'acme-widgets.php:4'],
    ['wp acme purge', 'wp-cli-command', 'shipped', 'acme-widgets.php:5'],
    ['Widget scheduling, so a widget publishes at a set time', 'changelog-item', 'shipped', 'readme.txt:11'],
    ['Bulk export of widgets to CSV', 'changelog-item', 'shipped', 'readme.txt:15'],
  ]);
  const joined = JSON.stringify(res.candidates);
  for (const forbidden of ['Corrected a typo', 'acme/commented-out', 'dep_tool', 'x_test_tool', 'DEP_SECRET_VALUE']) {
    assert.equal(joined.includes(forbidden), false, `${forbidden} must not be extracted`);
  }
});

test('e2e wp plugin: readme.txt as a changelog source gives the same two entries with reported posture', () => {
  const root = copyExample('wp-plugin');
  const res = extractSource({ id: 'readme', kind: 'changelog', root: path.join(root, 'readme.txt') });
  assert.deepEqual(res.failures, []);
  assert.deepEqual(res.candidates.map((c) => [c.name, c.status, c.source, c.provenance.extractor.id, c.provenance.confidence, c.provenance.posture]), [
    ['Widget scheduling, so a widget publishes at a set time', 'shipped', 'readme.txt:11', 'wp-readme-changelog', 'low', 'reported'],
    ['Bulk export of widgets to CSV', 'shipped', 'readme.txt:15', 'wp-readme-changelog', 'low', 'reported'],
  ]);
});

test('e2e wp plugin: an Unreleased heading in readme.txt makes its entries planned', () => {
  const root = copyExample('wp-plugin');
  fs.appendFileSync(path.join(root, 'readme.txt'), '\n= Unreleased =\n* New: Widget locking for editors during review\n');
  const res = extractSource({ id: 'readme', kind: 'changelog', root: path.join(root, 'readme.txt') });
  assert.equal(byName(res, 'Widget locking for editors during review').status, 'planned');
});

test('e2e planning docs: stub detected, full doc is not', () => {
  const res = extractSource({ id: 'planning', kind: 'planning', root: path.join(EXAMPLES, 'planning') });
  assert.deepEqual(res.failures, []);
  const stubs = res.candidates.filter((c) => c.kind === 'planning-stub');
  assert.deepEqual(stubs.map((c) => [c.name, c.status, c.source]), [['Schedule a widget', 'planned', 'planning/stub-schedule-a-widget.md:1']]);
  assert.equal(res.candidates.some((c) => c.name === 'Restore a deleted widget' && c.kind === 'planning-stub'), false);
});

test('e2e: a single file as the source root', () => {
  const root = copyExample('node-repo');
  const res = extractSource({ id: 'one', kind: 'repo', root: path.join(root, 'src', 'server.js') });
  assert.deepEqual(names(res), ['POST /widgets/:id/share (server.js)', 'WIDGET_API_TOKEN', 'widget_create', 'widget_restore', 'widget_share']);
  assert.equal(byName(res, 'widget_share').source, 'server.js:5');
});

test('e2e: an extractor that throws is reported in failures, not a crash', () => {
  const root = copyExample('node-repo');
  const boom = { id: 'boom', version: 1, sourceKinds: ['repo'], appliesTo: () => true, extract: () => { throw new Error('kaput'); } };
  const res = extractSource({ id: 'x', kind: 'repo', root, extractors: [boom] });
  assert.equal(res.candidates.length, 0);
  assert.ok(res.failures.length > 0);
  assert.deepEqual({ extractor: res.failures[0].extractor, error: res.failures[0].error }, { extractor: 'boom', error: 'kaput' });
});

test('e2e: an unknown source kind throws a clear error', () => {
  assert.throws(() => extractSource({ id: 'x', kind: 'wiki', root: tmp() }), /unknown source kind "wiki"/);
});

// ---------------------------------------------------------------- safety

test('safety: a symlink pointing outside the source dir is not followed and is reported', () => {
  const base = tmp();
  const source = path.join(base, 'source');
  const outside = path.join(base, 'outside');
  fs.mkdirSync(path.join(source, 'src'), { recursive: true });
  fs.mkdirSync(path.join(outside, 'dir'), { recursive: true });
  fs.writeFileSync(path.join(source, 'src', 'inside.js'), "export const a = defineTool({ name: 'inside_tool' });\n");
  fs.writeFileSync(path.join(outside, 'secret.js'), "export const b = defineTool({ name: 'outside_file_tool' });\n");
  fs.writeFileSync(path.join(outside, 'dir', 'more.js'), "export const c = defineTool({ name: 'outside_dir_tool' });\n");
  fs.symlinkSync(path.join(outside, 'secret.js'), path.join(source, 'src', 'link.js'));
  fs.symlinkSync(path.join(outside, 'dir'), path.join(source, 'linkdir'));
  const res = extractSource({ id: 's', kind: 'repo', root: source });
  assert.deepEqual(names(res), ['inside_tool']);
  const skip = res.limitations.find((l) => l.reason === 'symlink leaves permitted roots');
  assert.ok(skip, 'symlink escape must be reported in limitations');
  assert.equal(skip.count, 2);
  assert.deepEqual([...skip.examples].sort(), [path.join('linkdir'), path.join('src', 'link.js')].sort());
});

test('safety: a broken symlink is reported, not a crash', () => {
  const root = tmp();
  fs.symlinkSync(path.join(root, 'missing-target.js'), path.join(root, 'dangling.js'));
  const res = extractSource({ id: 's', kind: 'repo', root });
  assert.deepEqual(res.candidates, []);
  assert.deepEqual(res.limitations.map((l) => l.reason), ['broken symlink']);
});

test('safety: an unsupported file type is reported in limitations, not dropped silently', () => {
  const root = tmp();
  fs.writeFileSync(path.join(root, 'logo.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  fs.writeFileSync(path.join(root, 'tool.js'), "defineTool({ name: 'real_tool' });\n");
  const res = extractSource({ id: 's', kind: 'repo', root });
  assert.deepEqual(names(res), ['real_tool']);
  assert.deepEqual(res.limitations, [{ reason: 'unsupported format .png', count: 1, examples: ['logo.png'] }]);
});

test('safety: a missing source path returns a limitation, not a crash', () => {
  const root = path.join(tmp(), 'does-not-exist');
  const res = extractSource({ id: 's', kind: 'repo', root });
  assert.deepEqual(res.candidates, []);
  assert.deepEqual(res.failures, []);
  assert.deepEqual(res.limitations, [{ reason: 'source not found', count: 1, examples: [root] }]);
  assert.equal(res.stats.files, 0);
});

test('safety: an oversize file is reported in limitations', () => {
  const root = tmp();
  fs.writeFileSync(path.join(root, 'big.js'), `// ${'x'.repeat(1_000_100)}\n`);
  const res = extractSource({ id: 's', kind: 'repo', root });
  assert.deepEqual(res.candidates, []);
  assert.equal(res.limitations.length, 1);
  assert.match(res.limitations[0].reason, /^larger than 1000000 bytes$/);
});

test('BUG: candidate source paths stay relative when the source root is reached through a symlink', () => {
  // extract.cjs computes rel = path.relative(root, file) while walkSafe returns files under realpath(root),
  // so a root such as /var/... on macOS (symlink to /private/var/...) gives "../../private/var/..." paths.
  const base = tmp();
  const real = path.join(base, 'real');
  const alias = path.join(base, 'alias');
  fs.mkdirSync(path.join(real, 'src'), { recursive: true });
  fs.writeFileSync(path.join(real, 'src', 'a.js'), "server.tool('alias_tool', {});\n");
  fs.symlinkSync(real, alias);
  const res = extractSource({ id: 's', kind: 'repo', root: alias });
  assert.deepEqual(res.candidates.map((c) => c.source), ['src/a.js:1']);
  assert.equal(res.candidates[0].provenance.file, 'src/a.js');
});

// ---------------------------------------------------------------- known gaps

test('BUG: a one-line block comment (/* ... */) is treated as a comment', () => {
  // common.cjs isCommentLine matches only lines starting with *, // or #, so "/* ... */" lines still fire.
  silent('wp-block-type', { file: 'a.php', text: "/* register_block_type( 'acme/block-commented' ); */\n" });
  silent('wp-hook', { file: 'a.php', text: "/* do_action( 'acme_block_commented' ); */\n" });
  silent('code-env-var', { file: 'a.js', text: '/* process.env.BLOCK_COMMENTED_VAR */\n' });
});

test('BUG: Python os.environ["NAME"] subscript reads are detected like os.environ.get("NAME")', () => {
  // code.cjs env regex requires "(" after os.environ, so the subscript form (the common one) is missed.
  const got = run('code-env-var', { file: 'a.py', text: 'region = os.environ["WIDGET_REGION"]\n' });
  assert.deepEqual(got.map((g) => g.name), ['WIDGET_REGION']);
});

// ---------------------------------------------------------------- guard

test('guard: every registry id is in the tested-ids list, and every listed id is in the registry', () => {
  const registry = EXTRACTORS.map((e) => e.id).sort();
  assert.deepEqual([...TESTED_IDS].sort(), registry, 'add tests and a TESTED_IDS entry for each new extractor id');
});

test('guard: every registry id ran at least one positive and two negative tests in this file', () => {
  for (const ex of EXTRACTORS) {
    assert.equal(POS.has(ex.id), true, `${ex.id} has no positive test`);
    assert.ok((NEG.get(ex.id) || 0) >= 2, `${ex.id} has ${NEG.get(ex.id) || 0} negative tests, need 2`);
  }
});

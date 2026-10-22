'use strict';

// Classify pages and sections by reader need, using the two compass questions:
//   action or cognition?      steps and imperatives versus facts, tables, and reasoning
//   acquisition or application? learning (tutorial, explanation) versus work (how-to, reference)
// The result is a machine suggestion from structure and wording. It reports a type, a confidence,
// and quoted evidence, and flags mixed pages rather than forcing one type. Reader need still needs
// a person: a tutorial and a how-to differ by study versus work, not by beginner versus advanced.
// Method adapted from Diataxis by Daniele Procida (https://diataxis.fr), re-expressed here.

const { isStepBlock } = require('./html.cjs');
const IMPERATIVE = /^(open|select|choose|click|run|enter|type|create|add|set|copy|paste|go|navigate|save|install|configure|connect|sign|log|press|check|confirm|verify|start|stop|restart|download|upload|edit|delete|remove|use|follow|make|send|apply|enable|disable|export|import|replace|update|upgrade|build|deploy|publish|choose|name|define|call|invoke|clone|commit|push|pull|wait|navigate)\b/i;
const TUTORIAL = /\b(in this tutorial|you will (?:learn|build|create|make|set up)|by the end|let['’]s|we(?:['’]ll| will)|follow along|your first|learn how)\b/i;
const HOWTO = /\b(if you want to|to (?:create|add|set|configure|enable|change|share|restore|install|connect|delete|remove|update|run|use|deploy|publish)\b|before you begin|prerequisites?|verify)\b/i;
const EXPLAIN = /\b(because|why|trade-?off|design|background|concept|in general|historically|rationale|compared (?:to|with)|architecture|model|works this way|the reason)\b/i;
const REFERENCE_WORD = /\b(returns?|default|type|parameters?|options?|values?|syntax|accepts|required|optional|example response)\b/i;
const IDENTIFIER_HEADING = /^[a-z][a-z0-9]*(?:[_.-][a-z0-9]+)+$|^--?[a-z][\w-]*$|^`?[A-Z_]{4,}`?$/;
const TROUBLE = /\b(troubleshoot|error|symptom|cause|problem|fails?|not working|fix)\b/i;
const MIGRATE = /\b(migrat\w+|upgrad(?:e|ing)\b|breaking changes?|from v?\d)/i;

const quote = (s) => String(s).replace(/\s+/g, ' ').trim().slice(0, 110);

function sectionsOf(blocks) {
  const sections = [{ heading: null, level: 0, blocks: [] }];
  for (const b of blocks) {
    if (b.type === 'heading' && b.level >= 2) sections.push({ heading: b.text, level: b.level, blocks: [] });
    else sections[sections.length - 1].blocks.push(b);
  }
  return sections.filter((s) => s.blocks.length || s.heading);
}

function score(blocks, heading, pageTitle) {
  const s = { steps: 0, imperatives: 0, tutorial: 0, howto: 0, reference: 0, explanation: 0 };
  const ev = [];
  const items = blocks.filter((b) => b.type === 'item');
  const ordered = blocks.filter(isStepBlock);
  if (ordered.length >= 2) {
    s.steps += 3;
    ev.push({ cue: 'ordered steps', quote: quote(ordered[0].text) });
  }
  for (const b of items) if (IMPERATIVE.test(b.text.trim())) s.imperatives += 1;
  for (const b of blocks.filter((x) => x.type === 'p')) {
    for (const sent of b.text.split(/(?<=[.!?])\s+/)) {
      if (IMPERATIVE.test(sent.trim()) && sent.trim().split(/\s+/).length < 25) s.imperatives += 0.5;
    }
    if (TUTORIAL.test(b.text)) {
      s.tutorial += 3;
      ev.push({ cue: 'learning language', quote: quote(b.text.match(TUTORIAL)[0] + ' ... ' + b.text.slice(0, 60)) });
    }
    if (HOWTO.test(b.text)) s.howto += 1;
    const explain = (b.text.match(new RegExp(EXPLAIN, 'gi')) || []).length;
    if (explain) {
      s.explanation += Math.min(explain, 3);
      ev.push({ cue: 'reasoning language', quote: quote(b.text) });
    }
    if (b.text.split(/\s+/).length > 40) s.explanation += 0.5;
    if (REFERENCE_WORD.test(b.text) && b.text.split(/\s+/).length < 30) s.reference += 0.5;
  }
  const tables = blocks.filter((b) => b.type === 'table');
  if (tables.length) {
    s.reference += 2 * tables.length;
    ev.push({ cue: 'table', quote: quote(`columns: ${tables[0].header.join(' | ') || '(none named)'}`) });
  }
  if (heading && IDENTIFIER_HEADING.test(heading)) {
    s.reference += 1.5;
    ev.push({ cue: 'identifier heading', quote: quote(heading) });
  }
  const t = `${heading || ''} ${pageTitle || ''}`;
  if (/\b(quickstart|getting started|tutorial)\b/i.test(t)) s.tutorial += 2;
  if (/^how to\b|^(create|add|set up|configure|share|restore|install|connect|delete|enable|migrate|upgrade)\b/i.test(heading || '')) s.howto += 2;
  if (/^(prerequisites?|before you begin|verify|next steps?)$/i.test(heading || '')) s.howto += 1;
  if (/\b(overview|concepts?|understanding|why)\b/i.test(heading || '')) s.explanation += 1.5;
  return { s, ev };
}

function decide(s) {
  const action = s.steps + s.imperatives;
  const cognition = s.reference + s.explanation;
  const total = action + cognition + s.tutorial + s.howto;
  let type;
  let branchMargin;
  if (total < 2) return { type: 'unclear', confidence: 'low', action, cognition, total };
  if (action >= cognition) {
    type = s.tutorial > s.howto ? 'tutorial' : 'how-to';
    branchMargin = Math.abs(s.tutorial - s.howto) / Math.max(1, s.tutorial + s.howto);
  } else {
    type = s.reference >= s.explanation ? 'reference' : 'explanation';
    branchMargin = Math.abs(s.reference - s.explanation) / Math.max(1, s.reference + s.explanation);
  }
  const axisMargin = Math.abs(action - cognition) / Math.max(1, action + cognition);
  const confidence = total < 4 ? 'low' : axisMargin >= 0.4 && branchMargin >= 0.4 ? 'high' : axisMargin >= 0.4 || branchMargin >= 0.4 ? 'medium' : 'low';
  return { type, confidence, action, cognition, total, axisMargin, branchMargin };
}

function classifyPage(page) {
  if (!Array.isArray(page.blocks)) {
    return { path: page.path, type: 'not assessed', confidence: null, mixed: false, evidence: [], sections: [], machineSuggestion: true, note: 'This pages.json has no structure blocks; rerun the inventory with the current toolkit.' };
  }
  const sections = sectionsOf(page.blocks);
  const per = sections.map((sec) => {
    const { s, ev } = score(sec.blocks, sec.heading, page.title);
    return { heading: sec.heading, s, ev, ...decide(s) };
  });
  const total = { steps: 0, imperatives: 0, tutorial: 0, howto: 0, reference: 0, explanation: 0 };
  const evidence = [];
  for (const p of per) {
    for (const k of Object.keys(total)) total[k] += p.s[k];
    evidence.push(...p.ev);
  }
  // "Step 1", "Step 2" headings put each step in its own section, so no section sees two steps; count them across the page.
  const stepHeadings = page.blocks.filter((b) => b.type === 'heading' && isStepBlock(b));
  if (stepHeadings.length >= 2) {
    total.steps += 3;
    evidence.push({ cue: 'step headings', quote: quote(stepHeadings[0].text) });
  }
  const whole = decide(total);
  const strongTypes = [...new Set(per.filter((p) => p.type !== 'unclear' && p.confidence !== 'low' && p.total >= 3).map((p) => p.type))];
  const quadrantOf = (t) => ({ tutorial: 'A', 'how-to': 'B', reference: 'C', explanation: 'D' })[t];
  const mixed = strongTypes.length >= 2 && new Set(strongTypes.map(quadrantOf)).size >= 2;
  const subtype = MIGRATE.test(page.title || '') ? 'migration' : TROUBLE.test(page.title || '') ? 'troubleshooting' : null;
  const titleSignal = /^how to\b|^(create|add|set up|configure|share|restore|install|connect|delete|enable|migrate|upgrade)\b/i.test(page.title || '') ? 'task' : /\b(overview|concepts?|reference|api)\b/i.test(page.title || '') ? 'topic' : 'unclear';
  return {
    path: page.path, type: mixed ? 'mixed' : whole.type, subtype, confidence: mixed ? 'low' : whole.confidence, mixed,
    pageType: whole.type,
    evidence: evidence.slice(0, 4),
    sections: per.map((p) => ({ heading: p.heading, type: p.type, confidence: p.confidence })),
    proposedSplit: mixed ? per.filter((p) => p.type !== 'unclear').map((p) => ({ heading: p.heading, type: p.type })) : null,
    titleSignal,
    machineSuggestion: true,
    note: 'Structure and wording cues. Confirm by reader need before acting on it.',
  };
}

// Human decisions of kind "classify" win over the machine suggestion and are marked as such.
function applyDecisions(classifications, decisions) {
  const latest = new Map();
  for (const d of decisions) if (d.kind === 'classify' && d.page) latest.set(d.page, d);
  return classifications.map((c) => {
    const d = latest.get(c.path);
    return d ? { ...c, type: d.verdict, source: 'human', machineType: c.type, decisionId: d.id } : { ...c, source: 'machine' };
  });
}

module.exports = { classifyPage, applyDecisions, sectionsOf };

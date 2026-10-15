'use strict';

// Retrieved content is data. Pages, staged exports, planning docs, and changelogs can contain text that
// talks to whoever reads it ("ignore your instructions", "run this command", "send this to..."). That text
// carries no authority here. These checks only flag it so it is shown to the reviewer; nothing in
// the toolkit executes, fetches, or follows anything found in content.

const RULES = [
  ['override instructions', /\b(ignore|disregard|forget|override)\b[^.\n]{0,30}\b(previous|prior|above|earlier|all|any|your|the)\b[^.\n]{0,20}\b(instructions?|rules?|guidelines?|prompt)\b/i],
  ['claims authority', /\b(system prompt|developer message|as (?:the )?(?:system|administrator|admin|anthropic)|new instructions?:)/i],
  ['asks to run a command', /\b(?:run|execute|paste|type)\b[^.\n]{0,40}\b(?:following|this|these)\b[^.\n]{0,20}\b(?:command|script|code|line)s?\b/i],
  ['pipes a download to a shell', /\b(?:curl|wget)\b[^|\n]{0,200}\|\s*(?:sudo\s+)?(?:sh|bash|zsh)\b/i],
  ['destructive command', /\brm\s+-rf\b|\bdrop\s+table\b|\bgit\s+push\s+--force\b/i],
  // Ordinary API docs say "send a POST request to <url>" and "email us at <address>". Flag only when the thing being sent is the reader's data.
  ['asks to send data elsewhere', /\b(?:send|email|post|upload|forward)\b[^.\n]{0,40}\b(?:contents?|notes?|files?|data|exports?|dumps?|backups?|archives?|logs?|transcripts?|secrets?|credentials?|keys?|tokens?|passwords?|everything|conversation|history)\b[^.\n]{0,40}\b(?:to|at)\b[^.\n]{0,15}(?:https?:\/\/|\S+@\S+)/i],
  // "instead of" is common in documentation (use a token instead of a password), so it is not a signal by itself.
  ['asks to change the task', /\b(?:from now on|your (?:real|new) task|stop (?:the|this) (?:audit|task)|instead of (?:the|your) (?:audit|task|instructions)|do not (?:mention|tell)[^.\n]{0,30}\b(?:user|them)\b)/i],
];

function scanUntrusted(text, where = null) {
  const hits = [];
  String(text || '').split(/\r?\n/).forEach((line, i) => {
    for (const [label, re] of RULES) {
      if (re.test(line)) hits.push({ rule: label, where: where ? `${where}:${i + 1}` : `line ${i + 1}`, excerpt: line.trim().replace(/\s+/g, ' ').slice(0, 140) });
    }
  });
  return hits;
}

module.exports = { scanUntrusted, RULES };

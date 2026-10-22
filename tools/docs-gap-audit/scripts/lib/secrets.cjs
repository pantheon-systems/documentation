'use strict';

// Detect credentials in structured data so profiles and receipts can refuse them.
// Reports the JSON path of each hit and never echoes the value.

// camelCase keys (apiToken, clientSecret) are split into words before matching.
const splitCamel = (k) => String(k).replace(/([a-z0-9])([A-Z])/g, '$1_$2');
const KEY_RE = /(^|[_-])(token|secret|password|passwd|apikey|api[_-]?key|authorization|bearer|credential|cookie|private[_-]?key)s?($|[_-])/i;
const VALUE_PATTERNS = [
  /\bghp_[A-Za-z0-9]{20,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
  /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bsk-[A-Za-z0-9]{20,}\b/,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\b[a-z][a-z0-9+.-]*:\/\/[^\s/@:]+:[^\s/@]+@/i,
  /[?&](?:access_token|api_key|apikey|token|key|secret|password)=[^&\s]{6,}/i,
];

function findSecrets(value, trail = '$', out = []) {
  if (Array.isArray(value)) {
    value.forEach((v, i) => findSecrets(v, `${trail}[${i}]`, out));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      const here = `${trail}.${k}`;
      if (KEY_RE.test(splitCamel(k)) && typeof v === 'string' && v.trim() !== '') out.push({ path: here, reason: 'credential-like key with a value' });
      else if (KEY_RE.test(splitCamel(k)) && v && typeof v === 'object') out.push({ path: here, reason: 'credential-like key' });
      else findSecrets(v, here, out);
    }
  } else if (typeof value === 'string') {
    if (VALUE_PATTERNS.some((re) => re.test(value))) out.push({ path: trail, reason: 'credential-like value' });
  }
  return out;
}

module.exports = { findSecrets };

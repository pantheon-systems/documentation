const MAX_RETRIES = 3;

export async function request(url, config) {
  let attempt = 0;
  for (;;) {
    try {
      return await fetch(url, { signal: AbortSignal.timeout(config.timeout_ms) });
    } catch (error) {
      attempt += 1;
      if (attempt >= MAX_RETRIES) throw error;
    }
  }
}

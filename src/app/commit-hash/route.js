import { execSync } from 'child_process';
import { NextResponse } from 'next/server';
// This file returns the current git commit hash as plain text
// so that CI systems can poll the URL to determine the current deployed version
// and wait to run tests until a new version is deployed.

/**
 * This tells Next.js to run this route handler only at build time
 * and cache the result indefinitely.
 */
export const dynamic = 'force-static';

/**
 * Gets the current git commit hash.
 * @returns {string} The git hash or 'unknown' if an error occurs.
 */
function getGitHash() {
  try {
    // Execute the git command to get the short hash
    const hash = execSync('git rev-parse HEAD').toString().trim();
    return hash;
  } catch (error) {
    console.error('Error getting git hash:', error);
    // Fallback value if git isn't installed or not in a repo
    return 'unknown';
  }
}

export async function GET() {
  const hash = getGitHash();

  // Return the hash as plain text
  return new NextResponse(hash, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      // Set cache headers to ensure it's cached by browsers/CDNs
      'Cache-Control': 'public, s-maxage=31536000',
    },
  });
}

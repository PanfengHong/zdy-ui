import gitCommitsData from 'virtual:git-log';

export interface GitCommit {
  hash: string;
  date: string;
  message: string;
  author: string;
}

/**
 * Get recent git commits.
 *
 * In dev mode the data comes from the vite plugin's virtual module (which runs
 * `git log` at server start). In production builds the same virtual module is
 * resolved at build time, so the commit history is baked into the bundle.
 */
export async function getGitCommits(count: number = 20): Promise<GitCommit[]> {
  return gitCommitsData.slice(0, count);
}

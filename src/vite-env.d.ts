/// <reference types="vite/client" />

declare module 'virtual:git-log' {
  export interface GitCommit {
    hash: string;
    date: string;
    message: string;
    author: string;
  }
  const commits: GitCommit[];
  export default commits;
}

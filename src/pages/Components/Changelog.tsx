import { useState, useEffect } from 'react';
import { getGitCommits } from '../../utils/git';
import type { GitCommit } from '../../utils/git';

const ChangelogPage = () => {
  const [gitCommits, setGitCommits] = useState<GitCommit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCommits = async () => {
      setIsLoading(true);
      const commits = await getGitCommits(20);
      setGitCommits(commits);
      setIsLoading(false);
    };
    fetchCommits();
  }, []);

  if (isLoading) {
    return (
      <section className="component-section">
        <h2>更新日志</h2>
        <div className="loading-container">
          <span className="loading-spinner"></span>
          <span>正在加载 commit 记录...</span>
        </div>
      </section>
    );
  }

  const commitsByDate = gitCommits.reduce((acc, commit) => {
    if (!acc[commit.date]) {
      acc[commit.date] = [];
    }
    acc[commit.date].push(commit);
    return acc;
  }, {} as Record<string, GitCommit[]>);

  return (
    <section className="component-section">
      <h2>更新日志</h2>
      <p className="changelog-hint">基于 git commit 记录自动生成</p>
      <div className="changelog-list">
        {Object.entries(commitsByDate).map(([date, commits]) => (
          <div key={date} className="changelog-group">
            <div className="changelog-date-header">{date}</div>
            <div className="changelog-items">
              {commits.map((commit) => (
                <div key={commit.hash} className="changelog-item">
                  <div className="changelog-hash">{commit.hash}</div>
                  <div className="changelog-message">{commit.message}</div>
                  <div className="changelog-author">{commit.author}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChangelogPage;

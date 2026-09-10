export type GithubStats = {
  publicRepos: number;
  followers: number;
  starsByRepo: Record<string, number>;
};

const FEATURED_REPOS = [
  "cine-vault-web",
  "cine-vault-api",
  "lingdojo",
  "subscription-management-system",
];

export async function getGithubStats(username: string): Promise<GithubStats | null> {
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(4000),
    });
    if (!userRes.ok) return null;
    const user = await userRes.json();

    const starsByRepo: Record<string, number> = {};
    await Promise.all(
      FEATURED_REPOS.map(async (repo) => {
        try {
          const res = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
            next: { revalidate: 3600 },
            headers: { Accept: "application/vnd.github+json" },
            signal: AbortSignal.timeout(4000),
          });
          if (res.ok) {
            const data = await res.json();
            starsByRepo[repo] = data.stargazers_count ?? 0;
          }
        } catch {
          // Skip individual repo failures silently — not critical to render the page.
        }
      })
    );

    return {
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      starsByRepo,
    };
  } catch {
    return null;
  }
}

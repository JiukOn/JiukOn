import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export interface VoidStats {
    stats: {
        totalStars: number;
        totalCommits: number;
        totalPRs: number;
        totalIssues: number;
    };
    languages: {
        name: string;
        color: string;
        size: number;
        percentage: number;
    }[];
    repositories: {
        name: string;
        stars: number;
        description: string;
        url: string;
    }[];
    activity: {
        date: string;
        count: number;
    }[];
}

export async function fetchGitHubData(username: string): Promise<VoidStats> {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        throw new Error('GITHUB_TOKEN is missing in environment variables');
    }

    const query = `
    query($login: String!) {
        user(login: $login) {
            contributionsCollection {
                totalCommitContributions
                restrictedContributionsCount
                totalPullRequestContributions
                totalIssueContributions
                contributionCalendar {
                    weeks {
                        contributionDays {
                            contributionCount
                            date
                        }
                    }
                }
            }
            repositories(first: 20, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}, isFork: false) {
                nodes {
                    name
                    description
                    url
                    stargazerCount
                    languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                        edges {
                            size
                            node {
                                name
                                color
                            }
                        }
                    }
                }
            }
        }
    }
    `;

    try {
        const response = await axios.post(
            'https://api.github.com/graphql',
            { query, variables: { login: username } },
            {
                headers: {
                    Authorization: `bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data.errors) {
            throw new Error(JSON.stringify(response.data.errors));
        }

        const user = response.data.data.user;
        const repoNodes = user.repositories.nodes;
        const contrib = user.contributionsCollection;

        const totalStars = repoNodes.reduce((acc: number, repo: any) => acc + repo.stargazerCount, 0);
        const totalCommits = contrib.totalCommitContributions + contrib.restrictedContributionsCount;
        const totalPRs = contrib.totalPullRequestContributions;
        const totalIssues = contrib.totalIssueContributions;

        const languageMap = new Map<string, { size: number; color: string }>();
        let totalBytes = 0;

        repoNodes.forEach((repo: any) => {
            repo.languages.edges.forEach((edge: any) => {
                const { name, color } = edge.node;
                const size = edge.size;
                totalBytes += size;

                if (languageMap.has(name)) {
                    const current = languageMap.get(name)!;
                    languageMap.set(name, { size: current.size + size, color });
                } else {
                    languageMap.set(name, { size, color });
                }
            });
        });

        const languages = Array.from(languageMap.entries())
            .map(([name, data]) => ({
                name,
                color: data.color,
                size: data.size,
                percentage: (data.size / totalBytes) * 100
            }))
            .sort((a, b) => b.size - a.size)
            .slice(0, 8);

        const activity: { date: string; count: number }[] = [];
        contrib.contributionCalendar.weeks.forEach((week: any) => {
            week.contributionDays.forEach((day: any) => {
                if (day.contributionCount > 0) {
                    activity.push({ date: day.date, count: day.contributionCount });
                }
            });
        });

        const repositories = repoNodes.map((repo: any) => ({
            name: repo.name,
            stars: repo.stargazerCount,
            description: repo.description || '',
            url: repo.url
        })).slice(0, 10);

        return {
            stats: {
                totalStars,
                totalCommits,
                totalPRs,
                totalIssues
            },
            languages,
            repositories,
            activity: activity.slice(-50)
        };

    } catch (error) {
        throw error;
    }
}
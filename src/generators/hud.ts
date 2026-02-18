import { theme } from '../theme';

export function generateHUD(stats: { totalStars: number; totalCommits: number; totalPRs: number; totalIssues: number }): string {
    const width = 800;
    const height = 100;
    const itemWidth = width / 4;

    const items = [
        {
            label: 'Stars',
            value: stats.totalStars,
            icon: 'M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z',
            color: theme.colors.secondary
        },
        {
            label: 'Commits',
            value: stats.totalCommits,
            icon: 'M10.5 7.75a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm1.43.75a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 1 1 0-1.5h3.32a4.001 4.001 0 0 1 7.86 0h3.32a.75.75 0 1 1 0 1.5h-3.32z',
            color: theme.colors.primary
        },
        {
            label: 'PRs',
            value: stats.totalPRs,
            icon: 'M7.177 3.073L9.573.677A.25.25 0 0 1 10 .854v4.792a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354zM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm-2.25.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0zm2.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM1.5 10.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0zm11.25-5.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM10.5 6.25a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0z',
            color: theme.colors.primaryDark
        },
        {
            label: 'Issues',
            value: stats.totalIssues,
            icon: 'M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z',
            color: theme.colors.accent
        }
    ];

    const generateItem = (item: any, index: number) => {
        const x = index * itemWidth;
        const cx = x + itemWidth / 2;
        
        return `
            <g transform="translate(${x}, 0)">
                <rect x="10" y="10" width="${itemWidth - 20}" height="80" rx="8" fill="${theme.colors.surface.panel}" stroke="${theme.colors.surface.border}" stroke-width="1" opacity="0.6" />
                
                <g transform="translate(${itemWidth / 2 - 50}, 50)">
                    <path d="${item.icon}" fill="${item.color}" transform="scale(1.5) translate(-8, -8)" />
                </g>
                
                <text x="${cx + 10}" y="45" text-anchor="start" fill="${theme.colors.text.main}" font-size="24" font-weight="bold" font-family="${theme.fonts.sans}">
                    ${item.value}
                </text>
                
                <text x="${cx + 10}" y="65" text-anchor="start" fill="${theme.colors.text.dim}" font-size="12" font-family="${theme.fonts.sans}" letter-spacing="1">
                    ${item.label.toUpperCase()}
                </text>
            </g>
        `;
    };

    return `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="none" />
            ${items.map((item, i) => generateItem(item, i)).join('')}
        </svg>
    `;
}
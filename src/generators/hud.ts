import { theme } from '../theme';

export function generateHUD(stats: { totalStars: number; totalCommits: number; totalPRs: number; totalIssues: number }): string {
    const width = 800;
    const height = 120;
    const itemWidth = width / 4;

    const items = [
        {
            label: 'Commits',
            value: stats.totalCommits,
            icon: 'M10.5 7.75a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm1.43.75a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 1 1 0-1.5h3.32a4.001 4.001 0 0 1 7.86 0h3.32a.75.75 0 1 1 0 1.5h-3.32z',
            color: theme.colors.primary,
            anim: 'pulse'
        },
        {
            label: 'PRs',
            value: stats.totalPRs,
            icon: 'M7.177 3.073L9.573.677A.25.25 0 0 1 10 .854v4.792a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354zM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm-2.25.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0zm2.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM1.5 10.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0zm11.25-5.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5z',
            color: theme.colors.primaryDark,
            anim: 'float'
        },
        {
            label: 'Issues',
            value: stats.totalIssues,
            icon: 'M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z',
            color: theme.colors.accent,
            anim: 'spin'
        },
        {
            label: 'Stars',
            value: stats.totalStars,
            icon: 'M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z',
            color: theme.colors.secondary,
            anim: 'glow'
        }
    ];

    const generateItem = (item: any, index: number) => {
        const x = index * itemWidth;
        const centerX = (itemWidth - 15) / 2;
        
        return `
            <g transform="translate(${x + 7.5}, 10)">
                <rect width="${itemWidth - 15}" height="100" rx="15" fill="${theme.colors.surface.panel}" stroke="${item.color}" stroke-width="1" stroke-opacity="0.2" />
                <rect width="${itemWidth - 15}" height="100" rx="15" fill="url(#grad-${index})" opacity="0.1" />
                
                <g class="icon-${item.anim}" style="transform-origin: ${centerX}px 35px;">
                    <path d="${item.icon}" fill="${item.color}" transform="translate(${centerX - 14.4}, 20.6) scale(1.8)" filter="url(#glow-${index})" />
                </g>
                
                <text x="${centerX}" y="75" text-anchor="middle" fill="${theme.colors.text.main}" font-size="22" font-weight="bold" font-family="${theme.fonts.mono}">
                    ${item.value.toLocaleString()}
                </text>
                
                <text x="${centerX}" y="92" text-anchor="middle" fill="${theme.colors.text.dim}" font-size="10" font-family="${theme.fonts.mono}" letter-spacing="2" font-weight="bold">
                    ${item.label.toUpperCase()}
                </text>

                <defs>
                    <linearGradient id="grad-${index}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="${item.color}" stop-opacity="0.5" />
                        <stop offset="100%" stop-color="${theme.colors.bg}" stop-opacity="0" />
                    </linearGradient>
                    <filter id="glow-${index}">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </g>
        `;
    };

    return `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <style>
                .icon-pulse { animation: pulse 2s ease-in-out infinite; }
                .icon-float { animation: float 3s ease-in-out infinite; }
                .icon-spin { animation: spin 4s linear infinite; }
                .icon-glow { animation: glow 2s ease-in-out infinite; }

                @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes glow { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.6) drop-shadow(0 0 3px white); } }
                
                svg { font-family: ${theme.fonts.sans}; }
            </style>
            ${items.map((item, i) => generateItem(item, i)).join('')}
        </svg>
    `;
}
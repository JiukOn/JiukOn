import { theme } from '../theme';

interface RepoNode {
    name: string;
    stars: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
}

export function generateConstellation(repos: any[]): string {
    const width = 800;
    const height = 300;
    const cx = width / 2;
    const cy = height / 2;

    const nodes: RepoNode[] = repos.map((repo, i) => {
        const angle = (i / repos.length) * Math.PI * 2;
        const radius = 80 + Math.random() * 50; 
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        const size = Math.max(3, Math.log(repo.stars + 1) * 2);
        
        return {
            name: repo.name,
            stars: repo.stars,
            x,
            y,
            size,
            opacity: 0.7 + Math.random() * 0.3
        };
    });

    const lines = nodes.map((node, i) => {
        const nextNode = nodes[(i + 1) % nodes.length];
        return `<line x1="${node.x}" y1="${node.y}" x2="${nextNode.x}" y2="${nextNode.y}" 
                stroke="${theme.colors.primary}" stroke-opacity="0.3" stroke-width="1" />`;
    }).join('');

    const stars = nodes.map(node => `
        <g transform="translate(${node.x}, ${node.y})">
            <circle r="${node.size}" fill="${theme.colors.secondary}" filter="url(#glow)">
                <animate attributeName="opacity" values="${node.opacity};1;${node.opacity}" dur="${3 + Math.random()}s" repeatCount="indefinite" />
            </circle>
            <text y="${node.size + 15}" text-anchor="middle" fill="${theme.colors.text.main}" font-size="12" font-family="${theme.fonts.mono}" opacity="0.8">
                ${node.name}
            </text>
        </g>
    `).join('');

    return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            <style>
                .orbit-container {
                    animation: rotate 60s linear infinite;
                    transform-origin: ${cx}px ${cy}px;
                }
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            </style>
        </defs>
        
        <rect width="100%" height="100%" fill="${theme.colors.bg}" rx="12" />
        
        <g class="orbit-container">
            ${lines}
            ${stars}
        </g>
        
        <circle cx="${cx}" cy="${cy}" r="40" fill="url(#centerGradient)" opacity="0.2" filter="url(#glow)" />
        <defs>
            <radialGradient id="centerGradient">
                <stop offset="0%" stop-color="${theme.colors.primary}" />
                <stop offset="100%" stop-color="${theme.colors.bg}" stop-opacity="0" />
            </radialGradient>
        </defs>
    </svg>
    `;
}
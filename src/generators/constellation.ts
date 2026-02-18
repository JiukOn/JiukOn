import { theme } from '../theme';

interface RepoNode {
    name: string;
    stars: number;
    x: number;
    y: number;
    z: number;
    size: number;
    opacity: number;
    color: string;
}

export function generateConstellation(repos: any[]): string {
    const width = 800;
    const height = 300;
    const cx = width / 2;
    const cy = height / 2;
    const limitedRepos = repos.slice(0, 12);

    const nodes: RepoNode[] = limitedRepos.map((repo, i) => {
        const angle = (i / limitedRepos.length) * Math.PI * 2;
        const radius = 110 + Math.random() * 40;
        const z = Math.random() * 2; 
        
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        const size = Math.max(3, Math.log(repo.stars + 1) * 2.5) * (z > 1 ? 1.2 : 0.8);
        
        return {
            name: repo.name,
            stars: repo.stars,
            x,
            y,
            z,
            size,
            opacity: z > 1 ? 1 : 0.5,
            color: i % 2 === 0 ? theme.colors.primary : theme.colors.secondary
        };
    });

    const lines = nodes.map((node, i) => {
        const nextNode = nodes[(i + 1) % nodes.length];
        return `
            <line x1="${node.x}" y1="${node.y}" x2="${nextNode.x}" y2="${nextNode.y}" 
                stroke="url(#lineGrad)" stroke-width="${node.z}" opacity="0.15">
                <animate attributeName="stroke-dasharray" from="0, 500" to="500, 0" dur="${10 + i}s" repeatCount="indefinite" />
            </line>
        `;
    }).join('');

    const stars = nodes.map((node, i) => {
        const delay = i * 1.5;
        return `
            <g class="star-group" style="animation-delay: ${delay}s">
                <circle cx="${node.x}" cy="${node.y}" r="${node.size}" fill="${node.color}" filter="url(#glow)">
                    <animate attributeName="r" values="${node.size};${node.size * 1.5};${node.size}" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="${node.opacity};1;${node.opacity}" dur="3s" repeatCount="indefinite" />
                </circle>
                <text x="${node.x}" y="${node.y + node.size + 15}" text-anchor="middle" fill="${theme.colors.text.main}" font-size="${10 + node.z * 2}" font-family="${theme.fonts.mono}" class="star-label">
                    ${node.name.toUpperCase()}
                </text>
            </g>
        `;
    }).join('');

    return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            
            <radialGradient id="blackHoleGrad">
                <stop offset="0%" stop-color="${theme.colors.void}" />
                <stop offset="70%" stop-color="${theme.colors.void}" />
                <stop offset="85%" stop-color="${theme.colors.primary}" />
                <stop offset="95%" stop-color="${theme.colors.secondary}" />
                <stop offset="100%" stop-color="transparent" />
            </radialGradient>

            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="${theme.colors.primary}" />
                <stop offset="100%" stop-color="${theme.colors.secondary}" />
            </linearGradient>

            <style>
                @keyframes orbit {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes focus-zoom {
                    0%, 100% { transform: scale(1); opacity: 0.4; }
                    50% { transform: scale(1.1); opacity: 1; }
                }
                .main-container { transform-origin: center; animation: orbit 120s linear infinite; }
                .star-group { transform-origin: center; animation: focus-zoom 18s ease-in-out infinite; }
                .star-label { font-weight: bold; pointer-events: none; text-shadow: 0 0 5px ${theme.colors.void}; }
                .event-horizon { animation: orbit 20s linear infinite reverse; transform-origin: center; }
            </style>
        </defs>

        <rect width="100%" height="100%" fill="${theme.colors.bg}" rx="15" />
        
        <g class="event-horizon">
            <circle cx="${cx}" cy="${cy}" r="60" fill="url(#blackHoleGrad)" opacity="0.6" filter="url(#glow)" />
            <ellipse cx="${cx}" cy="${cy}" rx="120" ry="30" fill="none" stroke="${theme.colors.primary}" stroke-width="0.5" opacity="0.3" transform="rotate(45 ${cx} ${cy})" />
            <ellipse cx="${cx}" cy="${cy}" rx="100" ry="20" fill="none" stroke="${theme.colors.secondary}" stroke-width="0.5" opacity="0.2" transform="rotate(-30 ${cx} ${cy})" />
        </g>

        <g class="main-container">
            ${lines}
            ${stars}
        </g>

        <circle cx="${cx}" cy="${cy}" r="35" fill="${theme.colors.void}" stroke="${theme.colors.primary}" stroke-width="2" filter="url(#glow)" />
    </svg>
    `;
}
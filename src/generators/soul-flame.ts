import { theme } from '../theme';

export function generateSoulFlame(languages: any[]): string {
    const width = 500;
    const height = 400;
    
    const topLangs = languages.slice(0, 9);
    const otherLangs = languages.slice(9);
    const otherPercentage = otherLangs.reduce((acc, curr) => acc + curr.percentage, 0);

    const finalLangs = [...topLangs];
    if (otherPercentage > 0) {
        finalLangs.push({ name: 'Others', percentage: otherPercentage, color: theme.colors.text.dim });
    }

    const flames = finalLangs.map((lang, i) => {
        const row = Math.floor(i / 5);
        const col = i % 5;
        
        const x = 60 + (col * 95);
        const yBase = row === 0 ? 160 : 340;
        
        const maxHeight = 80;
        const flameHeight = Math.max(30, (lang.percentage / 100) * maxHeight * 3);
        const duration = 1.5 + Math.random();
        const delay = Math.random() * -2;

        return `
            <g transform="translate(${x}, ${yBase})">
                <defs>
                    <linearGradient id="flameGrad-${i}" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="${lang.color}" />
                        <stop offset="60%" stop-color="${theme.colors.primary}" />
                        <stop offset="100%" stop-color="${theme.colors.secondary}" stop-opacity="0" />
                    </linearGradient>
                </defs>
                
                <path fill="url(#flameGrad-${i})" filter="url(#flameBlur)">
                    <animate attributeName="d" dur="${duration}s" repeatCount="indefinite" begin="${delay}s"
                        values="
                            M0,0 Q-12,-${flameHeight/2} 0,-${flameHeight} Q12,-${flameHeight/2} 0,0;
                            M0,0 Q-18,-${flameHeight/2} -3,-${flameHeight * 1.1} Q12,-${flameHeight/2} 0,0;
                            M0,0 Q-12,-${flameHeight/2} 3,-${flameHeight * 0.9} Q18,-${flameHeight/2} 0,0;
                            M0,0 Q-12,-${flameHeight/2} 0,-${flameHeight} Q12,-${flameHeight/2} 0,0
                        "
                    />
                </path>

                <text y="20" text-anchor="middle" fill="${theme.colors.text.main}" font-size="13" font-weight="bold" font-family="${theme.fonts.mono}" style="text-transform: uppercase">
                    ${lang.name}
                </text>
                <text y="35" text-anchor="middle" fill="${theme.colors.text.dim}" font-size="11" font-family="${theme.fonts.mono}" font-weight="bold">
                    ${lang.percentage.toFixed(1)}%
                </text>
            </g>
        `;
    }).join('');

    return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="flameBlur" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="2.5" />
            </filter>
        </defs>
        <rect width="100%" height="100%" fill="${theme.colors.bg}" rx="15" />
        
        <text x="25" y="35" fill="${theme.colors.primary}" font-family="${theme.fonts.mono}" font-size="14" letter-spacing="2" font-weight="bold">
            VOID_ENERGY // KERNEL_CORE
        </text>

        <line x1="25" y1="45" x2="${width - 25}" y2="45" stroke="${theme.colors.surface.border}" stroke-width="1" stroke-dasharray="4 4" />

        ${flames}
    </svg>
    `;
}
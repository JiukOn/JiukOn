import { theme } from '../theme';

export function generateSoulFlame(languages: any[]): string {
    const width = 800;
    const height = 300;
    
    const topLangs = languages.slice(0, 9);
    const otherLangs = languages.slice(9);
    const otherPercentage = otherLangs.reduce((acc, curr) => acc + curr.percentage, 0);

    const finalLangs = [...topLangs];
    if (otherPercentage > 0) {
        finalLangs.push({ name: 'Others', percentage: otherPercentage, color: theme.colors.text.dim });
    }

    const count = finalLangs.length;
    const spacing = (width - 100) / (count - 1);

    const flames = finalLangs.map((lang, i) => {
        const x = 50 + (i * spacing);
        const maxHeight = 180;
        const flameHeight = Math.max(40, (lang.percentage / 100) * maxHeight * 2.5);
        const duration = 1.5 + Math.random();
        const delay = Math.random() * -2;

        return `
            <g transform="translate(${x}, ${height - 60})">
                <defs>
                    <linearGradient id="flameGrad-${i}" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="${lang.color}" />
                        <stop offset="50%" stop-color="${theme.colors.primary}" />
                        <stop offset="100%" stop-color="${theme.colors.secondary}" stop-opacity="0" />
                    </linearGradient>
                </defs>
                
                <path fill="url(#flameGrad-${i})" filter="url(#flameBlur)">
                    <animate attributeName="d" dur="${duration}s" repeatCount="indefinite" begin="${delay}s"
                        values="
                            M0,0 Q-15,-${flameHeight/2} 0,-${flameHeight} Q15,-${flameHeight/2} 0,0;
                            M0,0 Q-25,-${flameHeight/2} -5,-${flameHeight * 1.1} Q15,-${flameHeight/2} 0,0;
                            M0,0 Q-15,-${flameHeight/2} 5,-${flameHeight * 0.9} Q25,-${flameHeight/2} 0,0;
                            M0,0 Q-15,-${flameHeight/2} 0,-${flameHeight} Q15,-${flameHeight/2} 0,0
                        "
                    />
                </path>

                <circle r="4" fill="${lang.color}" opacity="0.5">
                    <animate attributeName="cy" values="0;-100" dur="${duration * 2}s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="0;${(Math.random() - 0.5) * 40}" dur="${duration * 2}s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0" dur="${duration * 2}s" repeatCount="indefinite" />
                </circle>

                <text y="25" text-anchor="middle" fill="${theme.colors.text.main}" font-size="10" font-weight="bold" font-family="${theme.fonts.mono}" style="text-transform: uppercase">
                    ${lang.name}
                </text>
                <text y="38" text-anchor="middle" fill="${theme.colors.text.dim}" font-size="8" font-family="${theme.fonts.mono}" opacity="0.6">
                    ${lang.percentage.toFixed(1)}%
                </text>
            </g>
        `;
    }).join('');

    return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="flameBlur" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" />
            </filter>
        </defs>
        <rect width="100%" height="100%" fill="${theme.colors.bg}" rx="15" />
        
        <text x="30" y="35" fill="${theme.colors.primary}" font-family="${theme.fonts.mono}" font-size="12" letter-spacing="3" font-weight="bold">
            VOID_ENERGY // KERNEL_CORE
        </text>

        <line x1="30" y1="45" x2="${width - 30}" y2="45" stroke="${theme.colors.surface.border}" stroke-width="1" stroke-dasharray="4 4" />

        ${flames}
    </svg>
    `;
}
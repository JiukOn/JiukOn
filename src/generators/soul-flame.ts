import { theme } from '../theme';

export function generateSoulFlame(languages: any[]): string {
    const width = 400;
    const height = 300;
    const padding = 50;
    const availableWidth = width - (padding * 2);
    const count = Math.min(languages.length, 5); 
    const spacing = availableWidth / Math.max(count, 1);

    const flames = languages.slice(0, count).map((lang, i) => {
        const x = padding + (i * spacing) + (spacing / 2);
        const maxHeight = 160;
        
        let flameHeight = (lang.percentage / 30) * maxHeight;
        if (flameHeight < 40) flameHeight = 40;
        if (flameHeight > maxHeight) flameHeight = maxHeight;

        const yBase = height - 60;
        const duration = 2 + Math.random();
        
        return `
            <g transform="translate(${x}, ${yBase})">
                <path fill="${lang.color}" opacity="0.8">
                    <animate 
                        attributeName="d" 
                        dur="${duration}s" 
                        repeatCount="indefinite"
                        values="
                            M0,0 Q-15,-${flameHeight/2} 0,-${flameHeight} Q15,-${flameHeight/2} 0,0;
                            M0,0 Q-20,-${flameHeight/2} -5,-${flameHeight * 1.05} Q10,-${flameHeight/2} 0,0;
                            M0,0 Q-10,-${flameHeight/2} 5,-${flameHeight * 0.95} Q20,-${flameHeight/2} 0,0;
                            M0,0 Q-15,-${flameHeight/2} 0,-${flameHeight} Q15,-${flameHeight/2} 0,0
                        "
                    />
                </path>
                
                <path fill="#ffffff" opacity="0.3">
                    <animate 
                        attributeName="d" 
                        dur="${duration}s" 
                        repeatCount="indefinite"
                        values="
                            M0,0 Q-5,-${flameHeight/3} 0,-${flameHeight/1.5} Q5,-${flameHeight/3} 0,0;
                            M0,0 Q-7,-${flameHeight/3} -2,-${flameHeight/1.5} Q3,-${flameHeight/3} 0,0;
                            M0,0 Q-3,-${flameHeight/3} 2,-${flameHeight/1.5} Q7,-${flameHeight/3} 0,0;
                            M0,0 Q-5,-${flameHeight/3} 0,-${flameHeight/1.5} Q5,-${flameHeight/3} 0,0
                        "
                    />
                </path>

                <text x="0" y="25" text-anchor="middle" fill="${theme.colors.text.main}" font-size="12" font-weight="bold" font-family="${theme.fonts.sans}">${lang.name}</text>
                <text x="0" y="40" text-anchor="middle" fill="${theme.colors.text.dim}" font-size="10" font-family="${theme.fonts.mono}">${lang.percentage.toFixed(1)}%</text>
            </g>
        `;
    }).join('');

    return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${theme.colors.bg}" />
        <text x="${width/2}" y="30" text-anchor="middle" fill="${theme.colors.primary}" font-size="12" font-family="${theme.fonts.mono}" letter-spacing="2" opacity="0.8">
            SOUL_FLAME // TECH_STACK
        </text>
        ${flames}
    </svg>
    `;
}
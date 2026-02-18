import { theme } from '../theme';

export function generateMatrixRain(activity: { date: string; count: number }[]): string {
    const width = 400;
    const height = 300;
    const fontSize = 10;
    const columns = Math.floor(width / fontSize);
    
    const drops = Array.from({ length: columns }).map((_, i) => {
        const activityItem = activity[i % activity.length] || { date: '0x00', count: 0 };
        const text = activityItem.count > 0 
            ? `${activityItem.date} [${activityItem.count}]` 
            : `${Math.random().toString(16).substring(2, 8).toUpperCase()}`;
        
        const x = i * fontSize;
        const delay = Math.random() * -5;
        const duration = 3 + Math.random() * 5;
        const color = activityItem.count > 5 ? theme.colors.secondary : theme.colors.primary;
        const opacity = 0.3 + Math.random() * 0.7;

        const chars = text.split('').map((char, j) => {
            return `<text x="${x}" y="${j * fontSize}" fill="${color}" opacity="${opacity - (j * 0.05)}">${char}</text>`;
        }).join('');

        return `
            <g font-family="${theme.fonts.mono}" font-size="${fontSize}" style="animation: fall ${duration}s linear infinite; animation-delay: ${delay}s">
                ${chars}
            </g>
        `;
    }).join('');

    return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="fade" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="${theme.colors.bg}" stop-opacity="0"/>
                <stop offset="80%" stop-color="${theme.colors.bg}" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="${theme.colors.bg}" stop-opacity="1"/>
            </linearGradient>
            <style>
                @keyframes fall {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(100%); }
                }
            </style>
        </defs>
        
        <rect width="100%" height="100%" fill="${theme.colors.bg}" />
        
        <g>
            ${drops}
        </g>
        
        <rect width="100%" height="100%" fill="url(#fade)" />
        
        <text x="10" y="20" fill="${theme.colors.text.dim}" font-family="${theme.fonts.mono}" font-size="10">
            SYSTEM_ACTIVITY_LOG // MONITORING
        </text>
    </svg>
    `;
}
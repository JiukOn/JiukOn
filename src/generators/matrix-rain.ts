import { theme } from '../theme';

export function generateMatrixRain(activity: { date: string; count: number }[]): string {
    const width = 300; 
    const height = 400;
    const fontSize = 11;
    const columns = Math.floor(width / (fontSize + 4));
    
    const drops = Array.from({ length: columns }).map((_, i) => {
        const activityIndex = i % activity.length;
        const activityItem = activity[activityIndex] || { date: 'VOID', count: 0 };
        
        const rawText = activityItem.count > 0 
            ? `${activityItem.date.replace(/-/g, '')}:${activityItem.count.toString().padStart(2, '0')}` 
            : `0x${Math.random().toString(16).substring(2, 6).toUpperCase()}`;
        
        const x = i * (fontSize + 4);
        const delay = Math.random() * -20;
        const duration = 8 + Math.random() * 12;
        const color = activityItem.count > 0 ? theme.colors.primary : theme.colors.void;
        const glowColor = activityItem.count > 5 ? theme.colors.secondary : theme.colors.primary;

        const chars = rawText.split('').map((char, j) => {
            const charOpacity = Math.max(0.1, 1 - (j * 0.1));
            return `<text x="${x}" y="${j * fontSize}" fill="${color}" fill-opacity="${charOpacity}" filter="url(#matrixGlow)">${char}</text>`;
        }).join('');

        return `
            <g font-family="${theme.fonts.mono}" font-size="${fontSize}" font-weight="bold" style="animation: fall ${duration}s linear infinite; animation-delay: ${delay}s">
                ${chars}
            </g>
        `;
    }).join('');

    return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="matrixGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1" result="blur"/>
                <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            <linearGradient id="rainFade" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="${theme.colors.bg}" stop-opacity="0.9"/>
                <stop offset="20%" stop-color="${theme.colors.bg}" stop-opacity="0"/>
                <stop offset="80%" stop-color="${theme.colors.bg}" stop-opacity="0"/>
                <stop offset="100%" stop-color="${theme.colors.bg}" stop-opacity="0.9"/>
            </linearGradient>
            <style>
                @keyframes fall {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(100%); }
                }
            </style>
        </defs>
        
        <rect width="100%" height="100%" fill="${theme.colors.bg}" rx="15" />
        
        <g opacity="0.6">
            ${drops}
        </g>
        
        <rect width="100%" height="100%" fill="url(#rainFade)" />
        
    </svg>
    `;
}
import { theme } from '../theme';

export function generatePortals(): string {
    const width = 800;
    const height = 100;
    const iconSize = 40;
    const gap = 30;

    const portals = [
        {
            name: 'GitHub',
            url: 'https://github.com/JiukOn',
            color: '#ffffff',
            path: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'
        },
        {
            name: 'Steam',
            url: 'https://store.steampowered.com/dev/BadJoke',
            color: '#00d4ff',
            path: 'M8.005.006C3.59.006 0 3.58 0 7.99c0 3.63 2.45 6.7 5.76 7.66l1.24-1.84a2.82 2.82 0 01-.19-.99c0-1.56 1.27-2.83 2.83-2.83 1.56 0 2.83 1.27 2.83 2.83s-1.27 2.83-2.83 2.83c-.85 0-1.61-.38-2.12-.97l-2.03 3.03C6.39 17.88 7.18 18 8.005 18c4.42 0 8-3.58 8-8s-3.58-8-8-7.994z'
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/joaolagemann-jiukon',
            color: '#0077b5',
            path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
        },
        {
            name: 'YouTube',
            url: 'https://www.youtube.com/c/JiukOn',
            color: '#ff0000',
            path: 'M19.615 3.184c-2.304-.25-14.926-.25-17.23 0-2.385.25-2.385 10.134 0 10.384 2.304.25 14.926.25 17.23 0 2.385-.25 2.385-10.134 0-10.384zm-10.615 8.316v-6l5 3-5 3z'
        },
        {
            name: 'CurseForge',
            url: 'https://www.curseforge.com/members/evjiukon/projects',
            color: '#f16436',
            path: 'M9.5 0C4.25 0 0 4.25 0 9.5S4.25 19 9.5 19 19 14.75 19 9.5 14.75 0 9.5 0zm1.75 14.25c-1.5 1.5-3.5.75-3.5-1.25 0-1.25 1-2 2-2.5.75-.35 1.5-.75 1.5-1.5s-1-1.5-2-1.5c-1 0-1.75.75-1.75 1.75H6c0-2 1.5-3.25 3.5-3.25s3.5 1.25 3.5 3.25c0 1.25-1 2-2 2.5-.75.35-1.5.75-1.5 1.5s1 1.5 2 1.5c1 0 1.75-.75 1.75-1.75h1.5c0 2-1.5 3.25-3.5 3.25z'
        },
        {
            name: 'LinkTree',
            url: 'https://linktr.ee/jiukon',
            color: '#43e5a0',
            path: 'M10.88 7.37v-2.8H12.9V2.8h-2.02V.8h-1.77v2H7.1V4.57h2v2.8H5.27l-2.06-2.6-1.4.92 2.74 3.46H1.54v1.8h3.33l-3.2 3.86 1.34 1.13 3.65-4.43v5.68h1.76v-5.68l3.65 4.43 1.34-1.13-3.2-3.86h3.33v-1.8H9.4l2.74-3.46-1.4-.92-2.06 2.6H10.88z'
        }
    ];

    const totalWidth = portals.length * (iconSize + gap);
    const startX = (width - totalWidth) / 2;

    const generateIcon = (item: any, index: number) => {
        const x = startX + index * (iconSize + gap);
        const y = (height - iconSize) / 2;
        
        return `
            <a xlink:href="${item.url}" target="_blank" style="cursor: pointer;">
                <g transform="translate(${x}, ${y})">
                    <circle cx="${iconSize/2}" cy="${iconSize/2}" r="${iconSize/2 + 4}" 
                            fill="${theme.colors.surface.panel}" 
                            stroke="${item.color}" 
                            stroke-width="2" 
                            filter="url(#glow-${index})">
                        <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    
                    <path d="${item.path}" fill="${item.color}" transform="scale(1.2) translate(4, 4)" />
                    
                    <defs>
                        <filter id="glow-${index}">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feFlood flood-color="${item.color}" flood-opacity="0.5" result="glowColor"/>
                            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow"/>
                            <feMerge>
                                <feMergeNode in="softGlow"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                </g>
            </a>
        `;
    };

    return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="100%" height="100%" fill="none" />
        ${portals.map((item, i) => generateIcon(item, i)).join('')}
    </svg>
    `;
}
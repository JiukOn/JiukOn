import * as fs from 'fs';
import * as path from 'path';
import { fetchGitHubData } from './api/github';
import { generateConstellation } from './generators/constellation';
import { generateHUD } from './generators/hud';
import { generateSoulFlame } from './generators/soul-flame';
import { generateMatrixRain } from './generators/matrix-rain';
import { generatePortals } from './generators/portals';

async function main() {
    const assetsDir = path.join(__dirname, '../assets');

    if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
    }

    try {
        const data = await fetchGitHubData('JiukOn');

        const constellationSVG = generateConstellation(data.repositories);
        fs.writeFileSync(path.join(assetsDir, 'constellation.svg'), constellationSVG);

        const hudSVG = generateHUD(data.stats);
        fs.writeFileSync(path.join(assetsDir, 'hud.svg'), hudSVG);

        const soulFlameSVG = generateSoulFlame(data.languages);
        fs.writeFileSync(path.join(assetsDir, 'soul-flame.svg'), soulFlameSVG);

        const matrixRainSVG = generateMatrixRain(data.activity);
        fs.writeFileSync(path.join(assetsDir, 'matrix-rain.svg'), matrixRainSVG);

        const portalsSVG = generatePortals();
        fs.writeFileSync(path.join(assetsDir, 'socials.svg'), portalsSVG);

    } catch (error) {
        process.exit(1);
    }
}

main();
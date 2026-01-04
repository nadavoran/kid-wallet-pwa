#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(process.cwd(), 'public');
const iconsDir = path.join(root, 'icons');
const shotsDir = path.join(root, 'screenshots');
const walletDir = path.join(root, 'wallet');

async function ensureDirs() {
  await fs.mkdir(iconsDir, { recursive: true });
  await fs.mkdir(shotsDir, { recursive: true });
  await fs.mkdir(path.join(iconsDir, 'android'), { recursive: true });
  await fs.mkdir(path.join(iconsDir, 'ios'), { recursive: true });
  await fs.mkdir(path.join(iconsDir, 'windows11'), { recursive: true });
}

async function createGradientBackground(width, height) {
  // Create SVG gradient matching the wallet component
  // from-sky-500 via-sky-400 to-emerald-500 diagonal gradient
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#38bdf8;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;
  return Buffer.from(svg);
}

async function generateIcons() {
  // Use pig-with-coin.png as source
  const pigSrc = path.join(walletDir, 'pig-with-coin.png');
  
  try {
    // Main PWA icons with gradient background
    const bg192 = await createGradientBackground(192, 192);
    await sharp(bg192)
      .composite([{
        input: await sharp(pigSrc).resize(140, 140).toBuffer(),
        gravity: 'center'
      }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(iconsDir, 'icon-192.png'));

    const bg512 = await createGradientBackground(512, 512);
    await sharp(bg512)
      .composite([{
        input: await sharp(pigSrc).resize(380, 380).toBuffer(),
        gravity: 'center'
      }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(iconsDir, 'icon-512.png'));
    
    console.log('Generated main PWA icons (192, 512) with gradient background');
  } catch (error) {
    console.error('Error generating main icons:', error.message);
  }
}

async function generateAndroidIcons() {
  const pigSrc = path.join(walletDir, 'pig-with-coin.png');
  const androidSizes = [48, 72, 96, 144, 192, 512];
  
  for (const size of androidSizes) {
    const bg = await createGradientBackground(size, size);
    const pigSize = Math.floor(size * 0.73); // 73% of icon size
    await sharp(bg)
      .composite([{
        input: await sharp(pigSrc).resize(pigSize, pigSize).toBuffer(),
        gravity: 'center'
      }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(iconsDir, 'android', `android-launchericon-${size}-${size}.png`));
  }
  console.log('Generated Android icons with gradient background');
}

async function generateIOSIcons() {
  const pigSrc = path.join(walletDir, 'pig-with-coin.png');
  const iosSizes = [16, 20, 29, 32, 40, 50, 57, 58, 60, 64, 72, 76, 80, 87, 100, 114, 120, 128, 144, 152, 167, 180, 192, 256, 512, 1024];
  
  for (const size of iosSizes) {
    const bg = await createGradientBackground(size, size);
    const pigSize = Math.floor(size * 0.73); // 73% of icon size
    await sharp(bg)
      .composite([{
        input: await sharp(pigSrc).resize(pigSize, pigSize).toBuffer(),
        gravity: 'center'
      }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(iconsDir, 'ios', `${size}.png`));
  }
  console.log('Generated iOS icons with gradient background');
}

async function generateWindows11Icons() {
  const pigSrc = path.join(walletDir, 'pig-with-coin.png');
  const windows11Dir = path.join(iconsDir, 'windows11');
  
  // Small Tile
  const smallTileSizes = [71, 89, 107, 142, 284];
  const scales = [100, 125, 150, 200, 400];
  for (let i = 0; i < scales.length; i++) {
    const size = smallTileSizes[i];
    const bg = await createGradientBackground(size, size);
    const pigSize = Math.floor(size * 0.73);
    await sharp(bg)
      .composite([{ input: await sharp(pigSrc).resize(pigSize, pigSize).toBuffer(), gravity: 'center' }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(windows11Dir, `SmallTile.scale-${scales[i]}.png`));
  }
  
  // Square 150x150
  const square150Sizes = [150, 188, 225, 300, 600];
  for (let i = 0; i < scales.length; i++) {
    const size = square150Sizes[i];
    const bg = await createGradientBackground(size, size);
    const pigSize = Math.floor(size * 0.73);
    await sharp(bg)
      .composite([{ input: await sharp(pigSrc).resize(pigSize, pigSize).toBuffer(), gravity: 'center' }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(windows11Dir, `Square150x150Logo.scale-${scales[i]}.png`));
  }
  
  // Wide 310x150
  const wideSizes = [[310, 150], [388, 188], [465, 225], [620, 300], [1240, 600]];
  for (let i = 0; i < scales.length; i++) {
    const [w, h] = wideSizes[i];
    const bg = await createGradientBackground(w, h);
    const pigSize = Math.floor(Math.min(w, h) * 0.85);
    await sharp(bg)
      .composite([{ input: await sharp(pigSrc).resize(pigSize, pigSize).toBuffer(), gravity: 'center' }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(windows11Dir, `Wide310x150Logo.scale-${scales[i]}.png`));
  }
  
  // Large Tile
  const largeTileSizes = [310, 388, 465, 620, 1240];
  for (let i = 0; i < scales.length; i++) {
    const size = largeTileSizes[i];
    const bg = await createGradientBackground(size, size);
    const pigSize = Math.floor(size * 0.73);
    await sharp(bg)
      .composite([{ input: await sharp(pigSrc).resize(pigSize, pigSize).toBuffer(), gravity: 'center' }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(windows11Dir, `LargeTile.scale-${scales[i]}.png`));
  }
  
  // Square 44x44
  const square44Sizes = [44, 55, 66, 88, 176];
  for (let i = 0; i < scales.length; i++) {
    const size = square44Sizes[i];
    const bg = await createGradientBackground(size, size);
    const pigSize = Math.floor(size * 0.73);
    await sharp(bg)
      .composite([{ input: await sharp(pigSrc).resize(pigSize, pigSize).toBuffer(), gravity: 'center' }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(windows11Dir, `Square44x44Logo.scale-${scales[i]}.png`));
  }
  
  // Target sizes
  const targetSizes = [16, 20, 24, 30, 32, 36, 40, 44, 48, 60, 64, 72, 80, 96, 256];
  for (const size of targetSizes) {
    const bg = await createGradientBackground(size, size);
    const pigSize = Math.floor(size * 0.73);
    const icon = await sharp(bg)
      .composite([{ input: await sharp(pigSrc).resize(pigSize, pigSize).toBuffer(), gravity: 'center' }])
      .png({ compressionLevel: 9 })
      .toBuffer();
    
    await sharp(icon).toFile(path.join(windows11Dir, `Square44x44Logo.targetsize-${size}.png`));
    await sharp(icon).toFile(path.join(windows11Dir, `Square44x44Logo.altform-unplated_targetsize-${size}.png`));
    await sharp(icon).toFile(path.join(windows11Dir, `Square44x44Logo.altform-lightunplated_targetsize-${size}.png`));
  }
  
  // Store Logo
  const storeLogoSizes = [50, 63, 75, 100, 200];
  for (let i = 0; i < scales.length; i++) {
    const size = storeLogoSizes[i];
    const bg = await createGradientBackground(size, size);
    const pigSize = Math.floor(size * 0.73);
    await sharp(bg)
      .composite([{ input: await sharp(pigSrc).resize(pigSize, pigSize).toBuffer(), gravity: 'center' }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(windows11Dir, `StoreLogo.scale-${scales[i]}.png`));
  }
  
  // Splash Screen
  const splashSizes = [[620, 300], [775, 375], [930, 450], [1240, 600], [2480, 1200]];
  for (let i = 0; i < scales.length; i++) {
    const [w, h] = splashSizes[i];
    const bg = await createGradientBackground(w, h);
    const pigSize = Math.floor(Math.min(w, h) * 0.85);
    await sharp(bg)
      .composite([{ input: await sharp(pigSrc).resize(pigSize, pigSize).toBuffer(), gravity: 'center' }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(windows11Dir, `SplashScreen.scale-${scales[i]}.png`));
  }
  
  console.log('Generated Windows 11 icons and splash screens');
}

async function generateScreens() {
  const pigSrc = path.join(walletDir, 'pig-with-coin.png');
  
  // Create a background with pig centered
  const createScreenshot = async (width, height, filename) => {
    await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 14, g: 165, b: 233, alpha: 1 } // Sky blue
      }
    })
    .composite([
      {
        input: await sharp(pigSrc)
          .resize(Math.min(width * 0.6, height * 0.6))
          .toBuffer(),
        gravity: 'center'
      }
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(shotsDir, filename));
  };
  
  await createScreenshot(1200, 630, 'wide-1200x630.png');
  await createScreenshot(540, 720, 'narrow-540x720.png');
  
  console.log('Generated screenshots');
}

(async () => {
  try {
    console.log('Starting icon generation with pig-with-coin.png...');
    await ensureDirs();
    await generateIcons();
    await generateAndroidIcons();
    await generateIOSIcons();
    await generateWindows11Icons();
    await generateScreens();
    console.log('✅ Successfully generated all icons and screenshots!');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
})();

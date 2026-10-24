import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

export interface OgImageOptions {
  nameFirst?: string;
  nameLast?: string;
  role?: string;
  description?: string;
  eyebrow?: string;
  url?: string;
  location?: string;
  tags?: string[];
  avatarPath?: string;
  outputPath?: string;
  width?: number;
  height?: number;
  keepHtmlPreview?: boolean;
}

/**
 * Discovers a local Chromium-based browser executable (Edge or Chrome)
 */
export function getBrowserExecutablePath(): string {
  const possiblePaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];

  for (const executablePath of possiblePaths) {
    if (fs.existsSync(executablePath)) {
      return executablePath;
    }
  }

  throw new Error('No compatible Chromium-based browser (Edge or Chrome) was found on this system.');
}

/**
 * Builds the HTML template for the 1200x630 OpenGraph card
 */
export function buildOgHtmlTemplate(options: OgImageOptions = {}): string {
  const {
    nameFirst = 'ANOOP',
    nameLast = 'RAJU',
    role = 'Frontend Developer & Web Creator',
    description = 'Building high-performance, fluid interactive applications with modern React, Next.js, and immersive visual design.',
    eyebrow = 'Available for Worldwide Opportunities',
    url = 'www.anoopraju.xyz',
    location = 'Kerala, India • Interactive Portfolio',
    tags = ['Next.js 15', 'React', 'TypeScript', 'Tailwind CSS', 'Sanity CMS', 'Framer Motion'],
    avatarPath,
  } = options;

  let avatarBase64 = '';
  const resolvedAvatar = avatarPath || path.join(process.cwd(), 'public', 'anoop-raju.jpg');
  if (fs.existsSync(resolvedAvatar)) {
    avatarBase64 = fs.readFileSync(resolvedAvatar).toString('base64');
  }

  const tagsHtml = tags
    .map((tag, idx) => {
      const isHighlight = idx < 2 ? 'highlight' : '';
      return `<div class="tag-pill ${isHighlight}">${tag}</div>`;
    })
    .join('\n        ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Gantari:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    background-color: #090e16;
    color: #ffffff;
    font-family: 'Gantari', sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ambient-glow-green {
    position: absolute;
    width: 500px;
    height: 500px;
    right: -100px;
    top: -100px;
    background: radial-gradient(circle, rgba(76, 252, 15, 0.16) 0%, rgba(76, 252, 15, 0) 70%);
    filter: blur(80px);
    pointer-events: none;
  }

  .ambient-glow-blue {
    position: absolute;
    width: 600px;
    height: 600px;
    left: -150px;
    bottom: -150px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(14, 165, 233, 0) 70%);
    filter: blur(90px);
    pointer-events: none;
  }

  .ambient-glow-center {
    position: absolute;
    width: 400px;
    height: 400px;
    left: 45%;
    top: 30%;
    background: radial-gradient(circle, rgba(76, 252, 15, 0.06) 0%, rgba(0, 0, 0, 0) 70%);
    filter: blur(100px);
    pointer-events: none;
  }

  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(circle at 50% 50%, black 50%, transparent 95%);
    -webkit-mask-image: radial-gradient(circle at 50% 50%, black 50%, transparent 95%);
  }

  #particles-canvas {
    position: absolute;
    inset: 0;
    width: 1200px;
    height: 630px;
    pointer-events: none;
  }

  .card-container {
    position: relative;
    width: 1140px;
    height: 570px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 28px;
    backdrop-filter: blur(20px);
    padding: 50px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    z-index: 10;
  }

  .corner-accent {
    position: absolute;
    width: 24px;
    height: 24px;
    border-color: #4cfc0f;
    border-style: solid;
    pointer-events: none;
  }
  .corner-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; border-top-left-radius: 28px; }
  .corner-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; border-bottom-right-radius: 28px; }

  .content-left {
    display: flex;
    flex-direction: column;
    max-width: 650px;
    height: 100%;
    justify-content: space-between;
  }

  .eyebrow-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    align-self: flex-start;
    padding: 7px 18px;
    border-radius: 9999px;
    background: rgba(76, 252, 15, 0.08);
    border: 1px solid rgba(76, 252, 15, 0.35);
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #4cfc0f;
    box-shadow: 0 0 20px rgba(76, 252, 15, 0.15);
  }

  .eyebrow-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #4cfc0f;
    box-shadow: 0 0 10px #4cfc0f;
  }

  .main-info {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .hero-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 88px;
    line-height: 0.95;
    letter-spacing: 2px;
    margin-bottom: 12px;
    display: flex;
    align-items: baseline;
    gap: 18px;
  }

  .hero-name .white-text {
    color: #ffffff;
  }

  .hero-name .green-text {
    color: #4cfc0f;
    text-shadow: 0 0 35px rgba(76, 252, 15, 0.45);
  }

  .hero-role {
    font-size: 27px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .role-bar {
    width: 32px;
    height: 3px;
    background: #4cfc0f;
    border-radius: 2px;
  }

  .hero-desc {
    font-size: 16px;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.65);
    max-width: 580px;
  }

  .tags-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 8px;
  }

  .tag-pill {
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
  }

  .tag-pill.highlight {
    border-color: rgba(76, 252, 15, 0.35);
    background: rgba(76, 252, 15, 0.06);
    color: #4cfc0f;
  }

  .footer-row {
    display: flex;
    align-items: center;
    gap: 24px;
    padding-top: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .url-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    font-weight: 600;
    color: #4cfc0f;
  }

  .url-dot {
    width: 6px;
    height: 6px;
    background: #4cfc0f;
    border-radius: 50%;
  }

  .footer-sub {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: 0.02em;
  }

  .content-right {
    position: relative;
    width: 360px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar-card-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .avatar-glow {
    position: absolute;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(76, 252, 15, 0.35) 0%, rgba(76, 252, 15, 0) 70%);
    filter: blur(35px);
  }

  .avatar-circle {
    position: relative;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    padding: 6px;
    background: linear-gradient(135deg, rgba(76, 252, 15, 0.8), rgba(255, 255, 255, 0.2), rgba(76, 252, 15, 0.3));
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(76, 252, 15, 0.3);
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    border: 3px solid #090e16;
  }

  .floating-badge {
    position: absolute;
    padding: 10px 16px;
    background: rgba(9, 14, 22, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(16px);
    border-radius: 14px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 20;
  }

  .badge-1 {
    top: -15px;
    right: -25px;
    border-color: rgba(76, 252, 15, 0.4);
  }

  .badge-2 {
    bottom: -20px;
    left: -35px;
    border-color: rgba(255, 255, 255, 0.2);
  }

  .badge-icon {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: rgba(76, 252, 15, 0.15);
    color: #4cfc0f;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: bold;
  }

  .badge-text-title {
    font-size: 12px;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .badge-text-sub {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.55);
  }
</style>
</head>
<body>
  <div class="ambient-glow-green"></div>
  <div class="ambient-glow-blue"></div>
  <div class="ambient-glow-center"></div>
  <div class="grid-pattern"></div>
  
  <canvas id="particles-canvas" width="1200" height="630"></canvas>

  <div class="card-container">
    <div class="corner-accent corner-tl"></div>
    <div class="corner-accent corner-br"></div>

    <div class="content-left">
      <div class="eyebrow-badge">
        <div class="eyebrow-dot"></div>
        <span>${eyebrow}</span>
      </div>

      <div class="main-info">
        <div class="hero-name">
          <span class="white-text">${nameFirst}</span>
          <span class="green-text">${nameLast}</span>
        </div>

        <div class="hero-role">
          <div class="role-bar"></div>
          <span>${role}</span>
        </div>

        <p class="hero-desc">${description}</p>
      </div>

      <div class="tags-row">
        ${tagsHtml}
      </div>

      <div class="footer-row">
        <div class="url-badge">
          <div class="url-dot"></div>
          <span>${url}</span>
        </div>
        <div class="footer-sub">${location}</div>
      </div>
    </div>

    <div class="content-right">
      <div class="avatar-card-wrapper">
        <div class="avatar-glow"></div>
        <div class="avatar-circle">
          ${avatarBase64 ? `<img src="data:image/jpeg;base64,${avatarBase64}" class="avatar-img" alt="${nameFirst} ${nameLast}" />` : ''}
        </div>

        <div class="floating-badge badge-1">
          <div class="badge-icon">✦</div>
          <div>
            <div class="badge-text-title">Interactive UI</div>
            <div class="badge-text-sub">Animations & 3D</div>
          </div>
        </div>

        <div class="floating-badge badge-2">
          <div class="badge-icon" style="background: rgba(255,255,255,0.08); color: #fff;">&lt;/&gt;</div>
          <div>
            <div class="badge-text-title">Full Stack Ready</div>
            <div class="badge-text-sub">Clean Architecture</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    const particleCount = 75;
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * 1200;
      const y = Math.random() * 630;
      const radius = Math.random() * 2 + 0.8;
      const alpha = Math.random() * 0.4 + 0.15;
      const isGreen = Math.random() > 0.75;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = isGreen ? \`rgba(76, 252, 15, \${alpha * 1.5})\` : \`rgba(255, 255, 255, \${alpha})\`;
      ctx.fill();

      if (isGreen && Math.random() > 0.5) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(76, 252, 15, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  </script>
</body>
</html>`;
}

/**
 * Main function to generate the OpenGraph image
 */
export function generateOgImage(options: OgImageOptions = {}): string {
  const projectRoot = process.cwd();
  const outputPath = options.outputPath || path.join(projectRoot, 'public', 'og-image.png');
  const tempHtmlPath = path.join(os.tmpdir(), `og_preview_${Date.now()}.html`);

  const html = buildOgHtmlTemplate(options);
  fs.writeFileSync(tempHtmlPath, html, 'utf-8');

  try {
    const browserPath = getBrowserExecutablePath();
    const args = [
      '--headless',
      '--disable-gpu',
      `--screenshot=${outputPath}`,
      `--window-size=${options.width || 1200},${options.height || 630}`,
      '--hide-scrollbars',
      '--virtual-time-budget=3000',
      `file:///${tempHtmlPath.replace(/\\/g, '/')}`,
    ];

    execFileSync(browserPath, args, { stdio: 'inherit' });
    return outputPath;
  } finally {
    if (!options.keepHtmlPreview && fs.existsSync(tempHtmlPath)) {
      try {
        fs.unlinkSync(tempHtmlPath);
      } catch {
        // ignore cleanup error
      }
    }
  }
}

// Self-executing when run directly (e.g., node / ts-node / tsx)
if (require.main === module) {
  try {
    const output = generateOgImage();
    console.log('OG image successfully generated at:', output);
  } catch (error) {
    console.error('Failed to generate OG image:', error);
    process.exit(1);
  }
}

export default generateOgImage;

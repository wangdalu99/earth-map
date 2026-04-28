import { readFile, writeFile } from 'node:fs/promises';

const target = '/Users/lydia/Documents/Codex/2026-04-26/https-github-com-francoyeoh7-figma-pixel/repo/generated/dapeng-dashboard/index.html';
let html = await readFile(target, 'utf8');

function replaceOnce(from, to) {
  if (!html.includes(from)) {
    throw new Error(`Expected block not found:\n${from.slice(0, 220)}`);
  }
  html = html.replace(from, to);
}

replaceOnce(
`    .eco-title {
      left: 49px;
      top: 185px;
      z-index: 8;
      width: 426px;
      color: #e0e4e9;
      font-size: 44px;
      line-height: 54px;
      font-weight: 800;
      letter-spacing: 0.07px;
      text-transform: capitalize;
      text-shadow: 0 14px 48px rgba(0, 0, 0, 0.72);
    }`,
`    .eco-title {
      left: 49px;
      top: 185px;
      z-index: 8;
      width: 455px;
      color: #e0e4e9;
      font-size: 44px;
      line-height: 54px;
      font-weight: 800;
      letter-spacing: 0.07px;
      text-transform: capitalize;
      text-shadow: 0 14px 48px rgba(0, 0, 0, 0.72);
    }`
);

replaceOnce(
`    .eco-card {
      position: absolute;
      z-index: 8;
      border: 1px solid rgba(229, 235, 238, 0.22);
      border-radius: 37px;
      background:
        radial-gradient(circle at 74% 22%, rgba(232, 196, 142, 0.17), transparent 38%),
        radial-gradient(circle at 18% 96%, rgba(207, 80, 45, 0.16), transparent 42%),
        radial-gradient(circle at 46% 50%, rgba(255, 255, 255, 0.068), transparent 43%),
        linear-gradient(135deg, rgba(74, 73, 68, 0.58), rgba(47, 49, 48, 0.54) 47%, rgba(29, 35, 37, 0.52)),
        rgba(25, 30, 38, 0.56);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.25),
        inset 0 -1px 0 rgba(255, 255, 255, 0.09),
        0 30px 80px rgba(0, 0, 0, 0.54);
      backdrop-filter: blur(32px) saturate(1.18);
      -webkit-backdrop-filter: blur(32px) saturate(1.18);
      overflow: hidden;
    }`,
`    .eco-card {
      position: absolute;
      z-index: 8;
      border: 1px solid rgba(229, 235, 238, 0.18);
      border-radius: 37px;
      background:
        radial-gradient(circle at 72% 16%, rgba(255, 255, 255, 0.1), transparent 36%),
        radial-gradient(circle at 20% 94%, rgba(255, 255, 255, 0.035), transparent 42%),
        linear-gradient(135deg, rgba(62, 66, 67, 0.56), rgba(31, 35, 39, 0.58) 48%, rgba(13, 18, 23, 0.62)),
        rgba(8, 13, 18, 0.58);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(255, 255, 255, 0.07),
        0 30px 80px rgba(0, 0, 0, 0.54);
      backdrop-filter: blur(30px) saturate(1.08);
      -webkit-backdrop-filter: blur(30px) saturate(1.08);
      overflow: hidden;
    }`
);

replaceOnce(
`    .eco-card::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      background: var(--eco-glass-gradient);
      opacity: 0.28;
      pointer-events: none;
    }`,
`    .eco-card::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      background:
        linear-gradient(128deg, rgba(255, 255, 255, 0.09), transparent 46%),
        radial-gradient(circle at 18% 0%, rgba(255, 255, 255, 0.08), transparent 42%);
      opacity: 0.22;
      pointer-events: none;
    }`
);

replaceOnce(
`    .eco-metric-row {
      width: 100%;
      height: 50px;
      display: grid;
      grid-template-columns: 1fr 70px 54px;
      align-items: center;
      gap: 14px;
      margin-top: 10px;
      padding: 0 14px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 17px;
      color: rgba(238, 242, 240, 0.9);
      background:
        linear-gradient(90deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.055)),
        rgba(98, 89, 77, 0.24);
      font-size: 15px;
      transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
      cursor: pointer;
    }`,
`    .eco-metric-row {
      width: 100%;
      height: 50px;
      display: grid;
      grid-template-columns: 1fr 70px 54px;
      align-items: center;
      gap: 14px;
      margin-top: 10px;
      padding: 0 14px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 17px;
      color: rgba(238, 242, 240, 0.9);
      background:
        linear-gradient(90deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.035)),
        rgba(12, 16, 21, 0.34);
      font-size: 15px;
      transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
      cursor: pointer;
    }`
);

replaceOnce(
`    .eco-metric-row:hover,
    .eco-metric-row.active {
      transform: translateY(-2px);
      border-color: rgba(232, 196, 142, 0.32);
      background: rgba(232, 196, 142, 0.105);
    }`,
`    .eco-metric-row:hover,
    .eco-metric-row.active {
      transform: translateY(-2px);
      border-color: rgba(232, 196, 142, 0.28);
      background:
        linear-gradient(90deg, rgba(232, 196, 142, 0.11), rgba(255, 255, 255, 0.045)),
        rgba(13, 18, 23, 0.38);
    }`
);

replaceOnce(
`    .eco-fish-visual {
      position: absolute;
      right: 34px;
      bottom: 40px;
      width: 205px;
      height: 170px;
      background: url("./assets/ecosystem/fish-or-image.png") center / contain no-repeat;
      opacity: 0.62;
      filter: saturate(0.8) hue-rotate(160deg) drop-shadow(0 0 24px rgba(103, 232, 255, 0.28));
      mix-blend-mode: screen;
    }`,
`    .eco-fish-visual {
      position: absolute;
      right: 34px;
      bottom: 40px;
      width: 205px;
      height: 170px;
      background: url("./assets/ecosystem/fish-or-image.png") center / contain no-repeat;
      opacity: 0.72;
      filter: saturate(1.06) drop-shadow(0 0 24px rgba(103, 232, 255, 0.34));
      mix-blend-mode: screen;
    }`
);

replaceOnce(
`    .eco-bio-card {
      right: 60px;
      top: 451px;
      width: 426px;
      height: 258px;
      padding: 31px 31px;
      background:
        radial-gradient(circle at 18% 88%, rgba(207, 80, 45, 0.24), transparent 44%),
        radial-gradient(circle at 70% 53%, rgba(232, 196, 142, 0.18), transparent 41%),
        radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.08), transparent 58%),
        linear-gradient(135deg, rgba(83, 81, 75, 0.7), rgba(52, 52, 49, 0.64) 48%, rgba(35, 38, 39, 0.6)),
        rgba(25, 30, 38, 0.64);
    }`,
`    .eco-bio-card {
      right: 60px;
      top: 451px;
      width: 426px;
      height: 258px;
      padding: 31px 31px;
      background:
        radial-gradient(circle at 20% 88%, rgba(207, 80, 45, 0.28), transparent 43%),
        radial-gradient(circle at 70% 52%, rgba(232, 196, 142, 0.2), transparent 40%),
        radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.08), transparent 58%),
        linear-gradient(135deg, rgba(82, 78, 72, 0.68), rgba(52, 50, 48, 0.62) 48%, rgba(35, 38, 39, 0.6)),
        rgba(25, 30, 38, 0.64);
    }`
);

replaceOnce(
`    .eco-bio-card::before {
      opacity: 0.39;
    }`,
`    .eco-bio-card::before {
      background: var(--eco-glass-gradient);
      opacity: 0.38;
    }`
);

replaceOnce(
`          <h2 class="eco-title layer">Current Emergency Information<br />In Mirs Bay</h2>`,
`          <h2 class="eco-title layer">Current Emergency Information<br />In Mills Bay</h2>`
);

await writeFile(target, html, 'utf8');

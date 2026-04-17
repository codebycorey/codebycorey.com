import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

const SOURCE_TTF = path.join(root, 'src', 'assets', 'fonts', 'Inter-Regular.ttf');
const OUT_WOFF2 = path.join(root, 'public', 'fonts', 'Inter-Regular.woff2');
const OUT_TTF = SOURCE_TTF;

// Basic Latin (U+0020–U+007E) + Latin-1 Supplement (U+00A0–U+00FF)
// + Latin Extended-A (U+0100–U+017F) + common typographic punctuation.
const codepoints = [
  ...range(0x0020, 0x007e),
  ...range(0x00a0, 0x00ff),
  ...range(0x0100, 0x017f),
  ...[0x2010, 0x2013, 0x2014, 0x2018, 0x2019, 0x201c, 0x201d, 0x2022, 0x2026, 0x2122, 0x00a9, 0x00ae],
];
const characters = codepoints.map((cp) => String.fromCodePoint(cp)).join('');

const sourceTtf = await fs.readFile(SOURCE_TTF);
console.log(`source TTF: ${(sourceTtf.length / 1024).toFixed(1)} kB`);

const subsetWoff2 = await subsetFont(sourceTtf, characters, { targetFormat: 'woff2' });
await fs.writeFile(OUT_WOFF2, subsetWoff2);
console.log(`wrote ${path.relative(root, OUT_WOFF2)}: ${(subsetWoff2.length / 1024).toFixed(1)} kB`);

const subsetTtf = await subsetFont(sourceTtf, characters, { targetFormat: 'truetype' });
await fs.writeFile(OUT_TTF, subsetTtf);
console.log(`wrote ${path.relative(root, OUT_TTF)}: ${(subsetTtf.length / 1024).toFixed(1)} kB`);

function range(from, to) {
  const out = [];
  for (let i = from; i <= to; i++) out.push(i);
  return out;
}

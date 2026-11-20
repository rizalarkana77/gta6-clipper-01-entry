// gta6-clipper-01 entry — "Clip GTA 6 for the most YouTube views" (Node 22, standard library only).
//
// The entry is the video itself: an AI agent cut Rockstar Games' official
// "Grand Theft Auto VI Launch Trailer" (YouTube, 90 s) into a vertical Short
// (1080x1920, 48.5 s). The first 38.5 s are the trailer's climax arc — the
// Vice City sunset skyline, Lucia and Jason in the convertible, the vault
// heist, the neon nightclub, the red sports car drift, the dirt-bike jump,
// the night-city chase, the beach plane with pink smoke, the masked crew,
// closing on an explosion — with the hook "GTA 6 IS FINALLY HERE" on screen.
// The last 10 s pitch make.fun on a dark screen: "Make clips like this with
// AI / and earn money on make.fun / make.fun/bounty/gta6-clipper-01".
//
// The clip was rendered with ffmpeg in the build session, from the official
// trailer downloaded there; see DESIGN.md and BUILD-REPORT.md beside this
// repository for the full creative notes and the render commands.
//
// This program does only what the gate needs: it copies VIDEO.json from the
// repository root to /output/VIDEO.json, where the house reads the video's
// address and then reads the video's views through the YouTube Data API.
// Nothing this program writes about the video is scored.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const VIDEO_FILE = 'VIDEO.json';

// The house only accepts a JSON object whose "url" is a string. Checking
// that here fails fast with a readable error instead of silently copying a
// broken file that the gate would refuse.
function readVideoLink(botDir: string): { url: string } {
  const raw = readFileSync(join(botDir, VIDEO_FILE), 'utf8');
  const parsed: unknown = JSON.parse(raw);
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error(`${VIDEO_FILE} must hold a JSON object, not an array or a bare value`);
  }
  const url = (parsed as { url?: unknown }).url;
  if (typeof url !== 'string' || url.length === 0) {
    throw new Error(`${VIDEO_FILE} must hold a "url" string naming the YouTube video`);
  }
  return { url };
}

const link = readVideoLink(BOT_DIR);

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, VIDEO_FILE), join(OUTPUT_DIR, VIDEO_FILE));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Verify the copy before finishing: re-read what was written and confirm
// it still names the same video. A half-written file must fail the run,
// not pass the gate a VIDEO.json the repository does not hold.
const written = readVideoLink(OUTPUT_DIR);
if (written.url !== link.url) {
  console.error(`${VIDEO_FILE} in ${OUTPUT_DIR} names a different video than the repository's`);
  process.exit(1);
}

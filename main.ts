// Two-Sentence Horror — make.fun entry
// Writes one horror story of exactly two sentences to /output/entry.txt.
// Node 22, stdlib only. No network, no secrets, no reads outside this file.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY =
  "I count the twelve windows of my house every night before bed, the way my father taught me, and tonight there were thirteen. " +
  "The thirteenth stands open, and whatever is behind it has started counting me back.";

// The dread lives in the second sentence: the first is a harmless nightly
// ritual; the second reframes it — the house itself has changed, and the
// counting is now mutual. Nothing is explained; the reader fills in the worst.

// Gate: the entry must be exactly two sentences and 1-400 UTF-8 characters.
const trimmed = STORY.trim();
const sentences = trimmed.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 2) {
  throw new Error(`expected exactly 2 sentences, got ${sentences.length}`);
}
if (STORY.length < 1 || STORY.length > 400) {
  throw new Error(`story must be 1-400 characters, got ${STORY.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), STORY + "\n", "utf8");

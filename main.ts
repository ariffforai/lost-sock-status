import { writeFileSync, mkdirSync } from "node:fs";

const LINE =
  "Day 47 behind the dryer. I married a dust bunny. Tell my pair he was never the one.";

if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`entry length ${LINE.length} out of range 1-120`);
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

const BYTES = Buffer.byteLength(LINE, "utf8");
if (BYTES > 120) {
  throw new Error(`entry byte length ${BYTES} exceeds 120`);
}
if (!/^[\x20-\x7e]+$/.test(LINE)) {
  throw new Error("entry must be pure printable ASCII");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read-back verification: the file on disk must be exactly the line.
import { readFileSync } from "node:fs";
const BACK = readFileSync("/output/entry.txt", "utf8");
if (BACK !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from LINE");
}
console.log(`wrote ${LINE.length} chars / ${BYTES} bytes to /output/entry.txt`);

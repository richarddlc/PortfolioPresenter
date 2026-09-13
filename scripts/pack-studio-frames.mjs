import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

// SFP1: magic + frame count, followed by (frame index, byte length, WebP bytes).
// Keep the original compressed images byte-for-byte; only reduce HTTP requests.
const root = fileURLToPath(new URL("../public/media/learning-studio/", import.meta.url));
for (const variant of ["desktop", "mobile"]) {
  const directory = path.join(root, "packs-v1", variant);
  await mkdir(directory, { recursive: true });
  for (let start = 0; start < 240; start += 12) {
    const header = Buffer.alloc(8);
    header.write("SFP1");
    header.writeUInt32LE(12, 4);
    const parts = [header];
    for (let frame = start; frame < start + 12; frame++) {
      const bytes = await readFile(path.join(root, variant, `${String(frame).padStart(4, "0")}.webp`));
      const entry = Buffer.alloc(8);
      entry.writeUInt32LE(frame);
      entry.writeUInt32LE(bytes.length, 4);
      parts.push(entry, bytes);
    }
    await writeFile(path.join(directory, `${String(start / 12).padStart(2, "0")}.bin`), Buffer.concat(parts));
  }
  console.log(`${variant}: 240 unchanged frames in 20 batches`);
}

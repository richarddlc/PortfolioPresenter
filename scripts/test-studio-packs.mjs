import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../client/src/lib/studio-frame-pack.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } });
const { unpackStudioFrames } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
const media = new URL("../public/media/learning-studio/", import.meta.url);
let valid;
for (const variant of ["desktop", "mobile"]) {
  for (let pack = 0; pack < 20; pack++) {
    const bytes = await readFile(new URL(`packs-v1/${variant}/${String(pack).padStart(2, "0")}.bin`, media));
    const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    for (const [frame, blob] of unpackStudioFrames(buffer, pack)) {
      const original = await readFile(new URL(`${variant}/${String(frame).padStart(4, "0")}.webp`, media));
      assert.deepEqual(Buffer.from(await blob.arrayBuffer()), original);
    }
    if (pack === 0) valid = buffer;
  }
}
assert.throws(() => unpackStudioFrames(new ArrayBuffer(0), 0));
assert.throws(() => unpackStudioFrames(valid.slice(0, 20), 0));
assert.throws(() => unpackStudioFrames(valid, 1));
const badMagic = valid.slice(0);
new DataView(badMagic).setUint32(0, 0);
assert.throws(() => unpackStudioFrames(badMagic, 0));
const badLength = valid.slice(0);
new DataView(badLength).setUint32(12, 0xffffffff, true);
assert.throws(() => unpackStudioFrames(badLength, 0));
assert.throws(() => unpackStudioFrames(new Uint8Array([...new Uint8Array(valid), 0]).buffer, 0));
console.log("480 frames preserved byte-for-byte; malformed batches rejected.");

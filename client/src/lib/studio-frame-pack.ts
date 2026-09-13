export const FRAMES_PER_PACK = 12;
export const PACK_COUNT = 20;

/** Validate a complete batch before exposing any frames to the renderer. */
export function unpackStudioFrames(buffer: ArrayBuffer, pack: number): Map<number, Blob> {
  const view = new DataView(buffer);
  if (buffer.byteLength < 8 || view.getUint32(0) !== 0x53465031 || view.getUint32(4, true) !== FRAMES_PER_PACK) {
    throw new Error("Invalid studio frame batch");
  }
  const frames = new Map<number, Blob>();
  let offset = 8;
  for (let index = 0; index < FRAMES_PER_PACK; index++) {
    if (offset + 8 > buffer.byteLength) throw new Error("Truncated studio frame batch");
    const frame = view.getUint32(offset, true);
    const length = view.getUint32(offset + 4, true);
    offset += 8;
    if (frame !== pack * FRAMES_PER_PACK + index || !length || length > buffer.byteLength - offset) {
      throw new Error("Invalid studio frame entry");
    }
    frames.set(frame, new Blob([buffer.slice(offset, offset + length)], { type: "image/webp" }));
    offset += length;
  }
  if (offset !== buffer.byteLength) throw new Error("Unexpected studio frame data");
  return frames;
}

import { useEffect, useRef, useState } from "react";
import HeroSection from "./hero-section";
import { FRAMES_PER_PACK, PACK_COUNT, unpackStudioFrames } from "@/lib/studio-frame-pack";

const media = `${import.meta.env.BASE_URL}media/learning-studio`;
const LAST_FRAME = 239;
const MAX_CACHE = 12;
const chapters = [
  { title: "It starts with an idea.", detail: "Every learning experience begins with a possibility.", label: "Imagine" },
  { title: "Give ideas a structure.", detail: "Storyboards, scenarios, and purposeful interactions.", label: "Design" },
  { title: "Make room for discovery.", detail: "AI-supported practice. Connected choices. Meaningful feedback.", label: "Connect" },
  { title: "Bring learning to life.", detail: "A complete experience, designed around the learner.", label: "Create" },
];

/** Native scrolling with batched downloads and a twelve-frame decoded cache. */
export default function LearningStudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const toplineRef = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [saveData] = useState(() => Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData));
  const isStatic = reduced || saveData || failed;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isStatic) {
      heroRef.current?.removeAttribute("inert");
      heroRef.current?.setAttribute("aria-hidden", "false");
      return;
    }
    setReady(false);
    const section = sectionRef.current!;
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context || typeof createImageBitmap !== "function") { setFailed(true); return; }
    const variant = window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
    const cache = new Map<number, ImageBitmap>();
    const blobs = new Map<number, Blob>();
    const decoding = new Set<number>();
    const pending = new Map<number, AbortController>();
    const loadedPacks = new Set<number>();
    const attempts = new Map<number, number>();
    let target = 0;
    let disposed = false;
    let near = false;
    let raf = 0;
    let lastDrawn = -1;
    let width = 0;
    let height = 0;
    let intro = 0;
    let lastIntro = -1;

    const nearest = (keys: Iterable<number>) => {
      let closest: number | undefined;
      for (const key of Array.from(keys)) {
        if (closest === undefined || Math.abs(key - target) < Math.abs(closest - target)) closest = key;
      }
      return closest;
    };

    const paint = () => {
      // Use the closest decoded frame while the exact requested frame catches up.
      const frame = cache.has(target) ? target : nearest(cache.keys());
      if (frame === undefined || (frame === lastDrawn && intro === lastIntro)) return;
      const bitmap = cache.get(frame);
      if (!bitmap || !width || !height || disposed) return;
      const cover = Math.max(width / bitmap.width, height / bitmap.height);
      const compact = canvas.clientWidth < 768;
      const pixelRatio = width / canvas.clientWidth;
      const topline = toplineRef.current;
      const caption = captionRef.current;
      // Fit the compact story frame between its label and caption. The hero
      // still starts as a full background and moves into this space as it fades.
      const mediaTop = ((topline ? topline.offsetTop + topline.offsetHeight : 100) + 24) * pixelRatio;
      const mediaBottom = (caption ? caption.offsetTop - 24 : canvas.clientHeight - 280) * pixelRatio;
      const mediaHeight = Math.max(1, mediaBottom - mediaTop);
      const contain = Math.min(width / bitmap.width, mediaHeight / bitmap.height);
      const scale = compact ? cover + (contain - cover) * intro : cover;
      const drawWidth = bitmap.width * scale;
      const drawHeight = bitmap.height * scale;
      const centerY = compact ? height / 2 + ((mediaTop + mediaBottom) / 2 - height / 2) * intro : height / 2;
      context.fillStyle = "#202123";
      context.fillRect(0, 0, width, height);
      context.drawImage(bitmap, (width - drawWidth) / 2, centerY - drawHeight / 2, drawWidth, drawHeight);
      if (compact && intro > 0) {
        // Feather the fitted frame into the surrounding stage, avoiding a
        // visible letterbox edge beside the caption or at the image sides.
        const x = (width - drawWidth) / 2, y = centerY - drawHeight / 2;
        const feather = Math.min(32 * pixelRatio, drawWidth / 4, drawHeight / 4);
        context.save();
        context.globalAlpha = intro;
        for (const [x1, y1, x2, y2, rx, ry, rw, rh] of [
          [x, y, x + feather, y, x, y, feather, drawHeight],
          [x + drawWidth, y, x + drawWidth - feather, y, x + drawWidth - feather, y, feather, drawHeight],
          [x, y, x, y + feather, x, y, drawWidth, feather],
          [x, y + drawHeight, x, y + drawHeight - feather, x, y + drawHeight - feather, drawWidth, feather],
        ]) {
          const fade = context.createLinearGradient(x1, y1, x2, y2);
          fade.addColorStop(0, "#202123");
          fade.addColorStop(1, "#20212300");
          context.fillStyle = fade;
          context.fillRect(rx, ry, rw, rh);
        }
        context.restore();
      }
      lastDrawn = frame;
      lastIntro = intro;
      canvas.dataset.frame = String(frame);
      setReady(true);
    };

    const trimCache = () => {
      const farthest = Array.from(cache.keys()).filter(key => key !== 0)
        .sort((a, b) => Math.abs(b - target) - Math.abs(a - target));
      while (cache.size > MAX_CACHE) {
        const key = farthest.shift()!;
        cache.get(key)?.close();
        cache.delete(key);
      }
    };

    const pump = () => {
      if (disposed || !near) return;
      const wanted = [0, 1, -1, 2, -2, 3, -3, 4, -4].map(offset => target + offset)
        .filter(index => index >= 0 && index <= LAST_FRAME);
      const available = nearest(blobs.keys());
      if (!blobs.has(target) && available !== undefined) wanted.unshift(available);
      for (const index of wanted) {
        const blob = blobs.get(index);
        if (!blob || cache.has(index) || decoding.has(index) || decoding.size >= 4) continue;
        decoding.add(index);
        createImageBitmap(blob).then(bitmap => {
          if (disposed) { bitmap.close(); return; }
          cache.set(index, bitmap);
          trimCache();
          paint();
        }).catch(() => { if (!disposed) setFailed(true); }).finally(() => {
          decoding.delete(index);
          if (!disposed) pump();
        });
      }
      // Twenty batches replace 240 requests. Reserve a fourth connection for
      // the current scroll position so background loading cannot fill every slot.
      const currentPack = Math.floor(target / FRAMES_PER_PACK);
      const queue = Array.from({ length: PACK_COUNT }, (_, index) => index)
        .sort((a, b) => Math.abs(a - currentPack) - Math.abs(b - currentPack));
      for (const pack of queue) {
        if (pending.size >= (pack === currentPack ? 4 : 3)) continue;
        if (loadedPacks.has(pack) || pending.has(pack) || (attempts.get(pack) || 0) >= 2) continue;
        const controller = new AbortController();
        pending.set(pack, controller);
        const timeout = window.setTimeout(() => controller.abort(), 15000);
        fetch(`${media}/packs-v1/${variant}/${String(pack).padStart(2, "0")}.bin`, { signal: controller.signal })
          .then(response => {
            if (!response.ok) throw new Error(`Frame batch request failed: ${response.status}`);
            return response.arrayBuffer();
          })
          .then(buffer => {
            if (disposed) return;
            unpackStudioFrames(buffer, pack).forEach((blob, index) => blobs.set(index, blob));
            loadedPacks.add(pack);
          })
          .catch(() => {
            if (disposed) return;
            const failures = (attempts.get(pack) || 0) + 1;
            attempts.set(pack, failures);
            if (failures >= 2) setFailed(true);
          })
          .finally(() => {
            clearTimeout(timeout);
            pending.delete(pack);
            if (!disposed) pump();
          });
      }
    };

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const viewport = canvas.clientHeight;
      const scrolled = Math.max(0, -rect.top);
      const introDistance = viewport * 0.8;
      const clamp = (value: number) => Math.max(0, Math.min(1, value));
      const smooth = (value: number) => value * value * (3 - 2 * value);
      intro = smooth(clamp(scrolled / introDistance));
      const heroOpacity = 1 - smooth(clamp(scrolled / (introDistance * 0.7)));
      // Finish hiding the name and hero before revealing text in the same area.
      const storyOpacity = smooth(clamp((scrolled / introDistance - 0.7) / 0.3));
      section.style.setProperty("--intro", String(intro));
      section.style.setProperty("--hero-opacity", String(heroOpacity));
      section.style.setProperty("--story-opacity", String(storyOpacity));
      heroRef.current?.toggleAttribute("inert", heroOpacity < 0.05);
      heroRef.current?.setAttribute("aria-hidden", String(heroOpacity < 0.05));
      storyRef.current?.setAttribute("aria-hidden", String(storyOpacity < 0.05));
      // Hold the last frame for a quarter-screen before releasing the pin.
      const distance = Math.max(1, section.offsetHeight - viewport - viewport * 0.25 - introDistance);
      const progress = clamp((scrolled - introDistance) / distance);
      target = Math.round(progress * LAST_FRAME);
      section.dataset.progress = progress.toFixed(4);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      setChapter(Math.min(3, Math.floor(progress * 4)));
      if (target !== lastDrawn || intro !== lastIntro) paint();
      pump();
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.width = Math.round(rect.width * dpr);
      height = canvas.height = Math.round(rect.height * dpr);
      lastDrawn = -1;
      schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      if (near) schedule();
    }, { rootMargin: "100% 0px" });
    observer.observe(section);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    if (captionRef.current) resizeObserver.observe(captionRef.current);
    if (toplineRef.current) resizeObserver.observe(toplineRef.current);
    window.addEventListener("scroll", schedule, { passive: true });
    // The preloaded poster is exactly frame zero. Reuse it immediately instead
    // of waiting for the first batch before the canvas can follow the hero fade.
    const poster = section.querySelector<HTMLImageElement>(".studio-poster")!;
    const seedFirstFrame = () => {
      if (disposed || cache.has(0)) return;
      createImageBitmap(poster).then(bitmap => {
        if (disposed || cache.has(0)) { bitmap.close(); return; }
        cache.set(0, bitmap);
        trimCache();
        paint();
      }).catch(() => { /* Frame zero is also present in the first batch. */ });
    };
    if (poster.complete && poster.naturalWidth) seedFirstFrame();
    else poster.addEventListener("load", seedFirstFrame, { once: true });
    resize();

    return () => {
      disposed = true;
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      poster.removeEventListener("load", seedFirstFrame);
      cancelAnimationFrame(raf);
      pending.forEach(controller => controller.abort());
      cache.forEach(bitmap => bitmap.close());
      blobs.clear();
    };
  }, [isStatic]);

  return (
    <section id="home" ref={sectionRef} className={`learning-studio integrated-studio${isStatic ? " is-static" : ""}`} aria-labelledby="hero-title">
      <span id="studio" className="studio-anchor" aria-hidden="true" />
      <div className="studio-stage">
        <div className="studio-media">
          <img className="studio-poster" src={`${media}/poster.webp`} alt="A graphite portfolio case containing the components of an interactive learning experience" fetchPriority="high" />
          {!isStatic && <canvas ref={canvasRef} className={`studio-canvas${ready ? " is-ready" : ""}`} aria-hidden="true" />}
        </div>
        <div className="studio-shade" />
        <div className="studio-intro-shade" />
        <div ref={heroRef} className="studio-hero-layer"><HeroSection /></div>
        {!isStatic && <div ref={storyRef} className="studio-story-layer" aria-hidden="true">
        <div ref={toplineRef} className="studio-topline">
          <p className="studio-eyebrow"><span /> Inside the learning studio</p>
        </div>
        <div ref={captionRef} className="studio-caption">
          <p className="studio-chapter">0{isStatic ? 1 : chapter + 1} / 04 — {isStatic ? "The process" : chapters[chapter].label}</p>
          <h2 id="studio-title">{isStatic ? "Bring learning to life." : chapters[chapter].title}</h2>
          <p>{isStatic ? "From storyboards and scenarios to AI-supported practice and meaningful feedback." : chapters[chapter].detail}</p>
        </div>
        <div className="studio-bottomline">
          <div className="studio-chapters" aria-label="Learning design stages">
            {chapters.map((item, index) => <span key={item.label} className={!isStatic && index === chapter ? "is-active" : ""}>{item.label}</span>)}
          </div>
          <div className="studio-track"><div ref={progressRef} /></div>
        </div>
        </div>}
      </div>
    </section>
  );
}

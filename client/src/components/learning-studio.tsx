import { useEffect, useRef, useState } from "react";
import HeroSection from "./hero-section";

const media = `${import.meta.env.BASE_URL}media/learning-studio`;
const LAST_FRAME = 239;
const MAX_CACHE = 12;
const chapters = [
  { title: "It starts with an idea.", detail: "Every learning experience begins with a possibility.", label: "Imagine" },
  { title: "Give ideas a structure.", detail: "Storyboards, scenarios, and purposeful interactions.", label: "Design" },
  { title: "Make room for discovery.", detail: "AI-supported practice. Connected choices. Meaningful feedback.", label: "Connect" },
  { title: "Bring learning to life.", detail: "A complete experience, designed around the learner.", label: "Create" },
];

/** CSS sticky preserves native scrolling. Compressed frames preload nearby;
 * twelve decoded frames and four concurrent requests bound memory use. */
export default function LearningStudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
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
    let target = 0;
    let disposed = false;
    let near = false;
    let raf = 0;
    let lastDrawn = -1;
    let width = 0;
    let height = 0;
    let intro = 0;
    let lastIntro = -1;

    const paint = () => {
      const bitmap = cache.get(target);
      if (!bitmap || !width || !height || disposed) return;
      const cover = Math.max(width / bitmap.width, height / bitmap.height);
      const contain = Math.min(width / bitmap.width, height / bitmap.height);
      const scale = canvas.clientWidth < 768 ? cover + (contain - cover) * intro : cover;
      const drawWidth = bitmap.width * scale;
      const drawHeight = bitmap.height * scale;
      context.fillStyle = "#202123";
      context.fillRect(0, 0, width, height);
      context.drawImage(bitmap, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
      lastDrawn = target;
      lastIntro = intro;
      canvas.dataset.frame = String(target);
      setReady(true);
    };

    const trimCache = () => {
      const farthest = Array.from(cache.keys()).sort((a, b) => Math.abs(b - target) - Math.abs(a - target));
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
      for (const index of wanted) {
        const blob = blobs.get(index);
        if (!blob || cache.has(index) || decoding.has(index) || decoding.size >= 4) continue;
        decoding.add(index);
        createImageBitmap(blob).then(bitmap => {
          if (disposed) { bitmap.close(); return; }
          cache.set(index, bitmap);
          trimCache();
          if (index === target) paint();
        }).catch(() => { if (!disposed) setFailed(true); }).finally(() => {
          decoding.delete(index);
          if (!disposed) pump();
        });
      }
      // Keep compressed data (about 4 MB desktop / 2 MB mobile) ready for a
      // continuous scrub. Always fetch the current neighbourhood first.
      const queue = wanted.concat(Array.from({ length: LAST_FRAME + 1 }, (_, index) => index));
      for (const index of queue) {
        if (pending.size >= 4) break;
        if (blobs.has(index) || pending.has(index)) continue;
        const controller = new AbortController();
        pending.set(index, controller);
        const timeout = window.setTimeout(() => controller.abort(), 15000);
        fetch(`${media}/${variant}/${String(index).padStart(4, "0")}.webp`, { signal: controller.signal })
          .then(response => {
            if (!response.ok) throw new Error(`Frame request failed: ${response.status}`);
            return response.blob();
          })
          .then(blob => { if (!disposed) blobs.set(index, blob); })
          .catch(() => { if (!disposed) setFailed(true); })
          .finally(() => {
            clearTimeout(timeout);
            pending.delete(index);
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
    window.addEventListener("scroll", schedule, { passive: true });
    resize();

    return () => {
      disposed = true;
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
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
        <div className="studio-topline">
          <p className="studio-eyebrow"><span /> Inside the learning studio</p>
        </div>
        <div className="studio-caption">
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

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, LoaderCircle, RotateCcw } from "lucide-react";

interface ProjectPreviewProps {
  title: string;
  src: string;
  onClose: () => void;
  onNavigate: (url: string) => boolean;
}

export default function ProjectPreview({ title, src, onClose, onNavigate }: ProjectPreviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const reducedMotion = useReducedMotion();
  const [closing, setClosing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  useEffect(() => {
    if (loaded) return;
    const timer = window.setTimeout(() => setSlow(true), 15000);
    return () => window.clearTimeout(timer);
  }, [loaded, attempt]);

  const retry = () => {
    setLoaded(false);
    setSlow(false);
    setAttempt(value => value + 1);
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className="project-preview-dialog"
      aria-labelledby="project-preview-title"
      onCancel={event => { event.preventDefault(); setClosing(true); }}
    >
      <motion.div
        className="project-preview-shell"
        initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.97 }}
        animate={closing ? { opacity: 0, y: reducedMotion ? 0 : 16, scale: reducedMotion ? 1 : 0.98 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => { if (closing) onClose(); }}
      >
        <header className="project-preview-toolbar">
          <button autoFocus className="project-preview-back" onClick={() => setClosing(true)}>
            <ArrowLeft size={18} aria-hidden="true" /> Back to portfolio
          </button>
          <h2 id="project-preview-title">{title}</h2>
          <button className="project-preview-reload" onClick={retry} aria-label="Reload project" title="Reload project">
            <RotateCcw size={18} aria-hidden="true" />
          </button>
        </header>
        <div className="project-preview-stage" aria-busy={!loaded}>
          {!loaded && (
            <div className="project-preview-loading" role="status">
              <LoaderCircle className="animate-spin" size={28} aria-hidden="true" />
              <p>{slow ? "This project is taking a little longer to load." : "Opening project…"}</p>
              {slow && <button className="project-preview-back" onClick={retry}>Try again</button>}
            </div>
          )}
          <iframe
            key={attempt}
            ref={frameRef}
            src={src}
            title={title}
            allow="autoplay; fullscreen"
            allowFullScreen
            onLoad={() => {
              setLoaded(true);
              // Keep the local storyboard's portfolio link inside this preview flow.
              // Remote courses remain independent browsing contexts.
              try {
                const document = frameRef.current?.contentDocument;
                const portfolioLink = document?.querySelector<HTMLAnchorElement>('.portfolio-bar a[href="../../#projects"]');
                portfolioLink?.addEventListener("click", event => { event.preventDefault(); setClosing(true); });
                document?.querySelectorAll<HTMLAnchorElement>('.portfolio-bar a[target="_blank"]').forEach(link => {
                  link.addEventListener("click", event => {
                    if (onNavigate(link.href)) event.preventDefault();
                  });
                });
              } catch { /* Cross-origin course content is not accessible. */ }
            }}
          />
        </div>
      </motion.div>
    </dialog>,
    document.body,
  );
}

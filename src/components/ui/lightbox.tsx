"use client";

import { useCallback, useEffect, useMemo } from "react";
import {
  AnimatePresence,
  motion,
  animate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { ZoomIn, ZoomOut, X, RotateCcw } from "lucide-react";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const clamp = (n: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, n));

/**
 * Fullscreen image viewer with zoom (buttons, scroll-wheel, double-click) and
 * drag-to-pan once zoomed. Animates open/close, locks body scroll while open,
 * closes on backdrop click or Escape, and respects reduced-motion.
 */
export function Lightbox({
  src,
  alt,
  open,
  onClose,
}: {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  // scale lives in a motion value so buttons and wheel can animate it smoothly
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = useMemo(
    () =>
      reduce
        ? { duration: 0 }
        : ({ type: "spring", stiffness: 260, damping: 30 } as const),
    [reduce]
  );

  const zoomTo = useCallback(
    (next: number) => {
      const target = clamp(next);
      animate(scale, target, spring);
      if (target <= MIN_SCALE) {
        // snap back to center when fully zoomed out
        animate(x, 0, spring);
        animate(y, 0, spring);
      }
    },
    [scale, x, y, spring]
  );

  const reset = useCallback(() => {
    scale.set(1);
    x.set(0);
    y.set(0);
  }, [scale, x, y]);

  // Reset transform whenever a new image opens.
  useEffect(() => {
    if (open) reset();
  }, [open, src, reset]);

  // Lock scroll + wire Escape / +/- keys while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "+" || e.key === "=") zoomTo(scale.get() + 0.5);
      else if (e.key === "-") zoomTo(scale.get() - 0.5);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, zoomTo, scale]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          onClick={onClose}
          onWheel={(e) => zoomTo(scale.get() - e.deltaY * 0.0025)}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 backdrop-blur-md"
        >
          {/* Entrance-pop wrapper — keeps its scale keyframes off the image so
              the zoom MotionValue is the sole driver of the image transform. */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ scale: reduce ? 1 : 0.92 }}
            animate={{ scale: 1 }}
            exit={{ scale: reduce ? 1 : 0.92 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={encodeURI(src)}
              alt={alt}
              draggable={false}
              drag
              dragMomentum={false}
              dragElastic={0.12}
              style={{ x, y, scale, willChange: "transform" }}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={() => zoomTo(scale.get() > 1 ? 1 : 2.5)}
              className="max-h-[86vh] max-w-[92vw] cursor-grab touch-none select-none rounded-xl object-contain shadow-2xl active:cursor-grabbing"
            />
          </motion.div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Zoom toolbar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1.5 backdrop-blur"
          >
            <ToolbarButton label="Zoom out" onClick={() => zoomTo(scale.get() - 0.5)}>
              <ZoomOut className="h-5 w-5" />
            </ToolbarButton>
            <ToolbarButton label="Reset zoom" onClick={() => zoomTo(1)}>
              <RotateCcw className="h-4.5 w-4.5" />
            </ToolbarButton>
            <ToolbarButton label="Zoom in" onClick={() => zoomTo(scale.get() + 0.5)}>
              <ZoomIn className="h-5 w-5" />
            </ToolbarButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ToolbarButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
    >
      {children}
    </button>
  );
}

import React, { useRef, useState, useCallback, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Player, PlayerRef } from "@remotion/player";
import { Presentation, TOTAL_DURATION } from "../src/Presentation";
import "../src/index.css";

// Must match src/design.ts
const SLIDE_DURATION = 170; // 5s stable + 20 transition @ 30fps
const SECTION_DURATION = 75;
const TRANSITION_FRAMES = 20;

type SlideKind = "section" | "content";

// Must mirror the SLIDES array order in src/Presentation.tsx
const SLIDES: { kind: SlideKind; label: string }[] = [
  { kind: "content", label: "Title" },
  { kind: "section", label: "Users" },
  { kind: "content", label: "Users Spectrum" },
  { kind: "content", label: "Different Reality" },
  { kind: "section", label: "Beauty" },
  { kind: "content", label: "Anyone Can Judge" },
  { kind: "content", label: "Slow Is a Bug" },
  { kind: "section", label: "Unpredictable" },
  { kind: "content", label: "Screen Sizes" },
  { kind: "content", label: "Touch Gestures" },
  { kind: "content", label: "Network" },
  { kind: "content", label: "Device Performance" },
  { kind: "content", label: "Caching Data" },
  { kind: "content", label: "Accessibility" },
  { kind: "section", label: "Browser Basics" },
  { kind: "content", label: "Download & Parse" },
  { kind: "content", label: "Sandbox" },
  { kind: "content", label: "DOM Tree" },
  { kind: "content", label: "Single Thread" },
  { kind: "content", label: "Fetch & Layout" },
  { kind: "content", label: "Event Bubbling" },
  { kind: "content", label: "Frameworks & Abstractions" },
  { kind: "section", label: "Browser Superpowers" },
  { kind: "content", label: "Storage" },
  { kind: "content", label: "Service Worker & PWA" },
  { kind: "content", label: "WebRTC etc." },
  { kind: "section", label: "AI & UI" },
  { kind: "content", label: "AI Code" },
  { kind: "content", label: "Build System" },
  { kind: "content", label: "AI Eyes" },
  { kind: "section", label: "Takeaways" },
  { kind: "content", label: "Takeaway 1" },
  { kind: "content", label: "Takeaway 2" },
  { kind: "content", label: "Takeaway 3" },
  { kind: "content", label: "Closing" },
];

/**
 * Compute the global timeline start frame for each slide.
 *
 * In TransitionSeries, consecutive slides overlap by TRANSITION_FRAMES:
 *   start(0) = 0
 *   start(i) = start(i-1) + duration(i-1) - TRANSITION_FRAMES
 */
const SLIDE_STARTS: number[] = (() => {
  const starts: number[] = [];
  let cursor = 0;
  for (let i = 0; i < SLIDES.length; i++) {
    starts.push(cursor);
    if (i < SLIDES.length - 1) {
      const dur =
        SLIDES[i].kind === "section" ? SECTION_DURATION : SLIDE_DURATION;
      cursor += dur - TRANSITION_FRAMES;
    }
  }
  return starts;
})();

/**
 * The frame where slide i is fully visible (transition-in complete).
 * Slide 0 has no incoming transition so its stable frame is 0.
 */
function stableFrame(i: number): number {
  return SLIDE_STARTS[i] + (i === 0 ? 0 : TRANSITION_FRAMES);
}

function App() {
  const playerRef = useRef<PlayerRef>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  // When non-null, the rAF loop will pause playback the moment this frame is reached
  const targetPauseFrame = useRef<number | null>(null);
  const transitioning = useRef(false);

  /**
   * requestAnimationFrame loop — polls getCurrentFrame() at display rate (~60fps).
   * This is the only reliable way to pause at an exact frame; setTimeout is too
   * imprecise and the Player has no supported onFrameUpdate prop.
   */
  useEffect(() => {
    let rafId: number;

    const poll = () => {
      if (targetPauseFrame.current !== null && playerRef.current) {
        const frame = playerRef.current.getCurrentFrame();
        if (frame >= targetPauseFrame.current) {
          playerRef.current.pause();
          playerRef.current.seekTo(targetPauseFrame.current);
          targetPauseFrame.current = null;
          transitioning.current = false;
        }
      }
      rafId = requestAnimationFrame(poll);
    };

    rafId = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /**
   * Go forward:
   *  1. Seek to start(nextSlide) — exactly when the outgoing transition begins
   *  2. play()
   *  3. rAF loop detects frame >= stableFrame(next) and pauses
   */
  const goNext = useCallback(() => {
    if (slideIndex >= SLIDES.length - 1 || transitioning.current) return;
    const next = slideIndex + 1;

    targetPauseFrame.current = stableFrame(next);
    transitioning.current = true;
    setSlideIndex(next);
    playerRef.current?.seekTo(SLIDE_STARTS[next]);
    playerRef.current?.play();
  }, [slideIndex]);

  /**
   * Go back: cancel any in-progress transition and jump instantly to the
   * previous slide's stable frame. No forward animation going backwards.
   */
  const goPrev = useCallback(() => {
    if (slideIndex <= 0) return;
    targetPauseFrame.current = null;
    transitioning.current = false;
    const prev = slideIndex - 1;
    setSlideIndex(prev);
    playerRef.current?.pause();
    playerRef.current?.seekTo(stableFrame(prev));
  }, [slideIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const isFirst = slideIndex === 0;
  const isLast = slideIndex === SLIDES.length - 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#0f0f0f",
        padding: "24px",
        gap: "16px",
      }}
    >
      <Player
        ref={playerRef}
        component={Presentation}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        compositionWidth={1280}
        compositionHeight={720}
        style={{
          width: "100%",
          maxWidth: "1280px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
        initiallyShowControls={false}
        clickToPlay={false}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "10px 24px",
          background: "#1a1a1a",
          borderRadius: "40px",
          border: "1px solid #2a2a2a",
        }}
      >
        <button
          onClick={goPrev}
          disabled={isFirst}
          style={{ ...btnBase, opacity: isFirst ? 0.3 : 1 }}
        >
          ← Prev
        </button>

        <span
          style={{
            fontSize: "13px",
            minWidth: "220px",
            textAlign: "center",
            color: "#888",
          }}
        >
          <span style={{ color: "#E85D26", fontWeight: 600 }}>
            {slideIndex + 1}
          </span>
          <span style={{ color: "#444" }}> / {SLIDES.length}</span>
          <span style={{ marginLeft: "10px" }}>
            — {SLIDES[slideIndex].label}
          </span>
        </span>

        <button
          onClick={goNext}
          disabled={isLast}
          style={{ ...btnBase, opacity: isLast ? 0.3 : 1 }}
        >
          Next →
        </button>
      </div>

      <p style={{ color: "#333", fontSize: "11px" }}>
        ← → navigate · Space = next · F = fullscreen
      </p>
    </div>
  );
}

const btnBase: React.CSSProperties = {
  padding: "8px 18px",
  background: "#E85D26",
  color: "#fff",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: 500,
};

createRoot(document.getElementById("root")!).render(<App />);

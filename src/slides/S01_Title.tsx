import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { SlideWrapper } from "../components/SlideWrapper";
import { colors } from "../design";

const BrowserHeartIllustration: React.FC<{ progress: number }> = ({
  progress,
}) => {
  const strokeLen = 400;
  const drawn = interpolate(progress, [0, 1], [strokeLen, 0]);
  const pulseR = interpolate(progress, [0.6, 1], [0, 28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      {/* Browser frame */}
      <rect
        x="10"
        y="10"
        width="180"
        height="140"
        rx="8"
        stroke={colors.stroke}
        strokeWidth="2.5"
        strokeDasharray={strokeLen}
        strokeDashoffset={drawn}
      />
      {/* Address bar */}
      <rect
        x="10"
        y="10"
        width="180"
        height="28"
        rx="8"
        fill={colors.sectionNum}
        style={{ opacity: progress }}
      />
      <circle cx="28" cy="24" r="5" fill={colors.bad} style={{ opacity: progress }} />
      <circle cx="44" cy="24" r="5" fill="#FBBF24" style={{ opacity: progress }} />
      <circle cx="60" cy="24" r="5" fill={colors.good} style={{ opacity: progress }} />
      {/* Heart */}
      <path
        d="M100 115 C100 115 65 90 65 72 C65 62 73 55 82 55 C88 55 95 60 100 67 C105 60 112 55 118 55 C127 55 135 62 135 72 C135 90 100 115 100 115Z"
        fill={colors.accent}
        style={{ opacity: interpolate(progress, [0.5, 1], [0, 1], { extrapolateLeft: "clamp" }) }}
      />
      {/* Pulse rings */}
      {progress > 0.6 && (
        <>
          <circle
            cx="100"
            cy="88"
            r={pulseR}
            stroke={colors.accent}
            strokeWidth="1.5"
            fill="none"
            style={{ opacity: interpolate(progress, [0.6, 1], [0, 0.4], { extrapolateLeft: "clamp" }) }}
          />
          <circle
            cx="100"
            cy="88"
            r={pulseR * 1.6}
            stroke={colors.accent}
            strokeWidth="1"
            fill="none"
            style={{ opacity: interpolate(progress, [0.7, 1], [0, 0.2], { extrapolateLeft: "clamp" }) }}
          />
        </>
      )}
    </svg>
  );
};

export const S01_Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const illustrationProgress = spring({
    frame,
    fps,
    config: { damping: 120 },
    durationInFrames: 60,
  });

  return (
    <SlideWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 24,
        }}
      >
        <BrowserHeartIllustration progress={illustrationProgress} />

        <AnimatedText delay={20} style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: colors.text,
              letterSpacing: "-2px",
              lineHeight: 1.05,
            }}
          >
            Application Engineering
          </div>
        </AnimatedText>

        <AnimatedText delay={40} style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: colors.textMuted,
              letterSpacing: "0.5px",
            }}
          >
            Building software that humans actually love
          </div>
        </AnimatedText>

        <AnimatedText delay={55}>
          <div
            style={{
              width: 48,
              height: 4,
              borderRadius: 2,
              background: colors.accent,
              margin: "0 auto",
            }}
          />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

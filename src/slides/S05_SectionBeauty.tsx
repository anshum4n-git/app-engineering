import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const MagnifierIllustration: React.FC<{ progress: number }> = ({ progress }) => {
  const moveX = interpolate(progress, [0, 1], [-20, 20]);

  return (
    <svg width="200" height="140" viewBox="0 0 200 140" fill="none">
      {/* Pixel grid */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={30 + col * 18}
            y={20 + row * 18}
            width="16"
            height="16"
            rx="1"
            fill={col === 3 && row === 2 ? colors.bad + "44" : colors.sectionNum}
            stroke={colors.sectionNum}
            strokeWidth="1"
          />
        ))
      )}
      {/* Misaligned pixel highlight */}
      <rect
        x={30 + 3 * 18 + 4}
        y={20 + 2 * 18}
        width="16"
        height="16"
        rx="1"
        fill={colors.bad + "55"}
        stroke={colors.bad}
        strokeWidth="1.5"
        style={{ opacity: interpolate(progress, [0.4, 0.7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}
      />
      {/* Magnifying glass */}
      <g transform={`translate(${moveX}, 0)`}>
        <circle cx="100" cy="70" r="30" stroke={colors.stroke} strokeWidth="2.5" fill="rgba(255,255,255,0.6)" />
        <line x1="122" y1="92" x2="140" y2="115" stroke={colors.stroke} strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export const S05_SectionBeauty: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 150 }, durationInFrames: 50 });

  return (
    <SlideWrapper bg={colors.bgSection}>
      <div style={{
        position: "absolute",
        top: -20,
        left: 60,
        fontSize: 220,
        fontWeight: 900,
        color: colors.sectionNum,
        lineHeight: 1,
        userSelect: "none",
      }}>
        02
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 20,
        position: "relative",
        zIndex: 1,
      }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.accent, letterSpacing: 3, textTransform: "uppercase" }}>
            Section 02
          </div>
        </AnimatedText>

        <AnimatedText delay={10}>
          <div style={{ fontSize: 52, fontWeight: 800, color: colors.text, textAlign: "center" }}>
            Beauty is in the Eye for Detail
          </div>
        </AnimatedText>

        <AnimatedText delay={20}>
          <div style={{ fontSize: 20, fontStyle: "italic", color: colors.textMuted, textAlign: "center" }}>
            "Users can't name what's wrong. They just know something is."
          </div>
        </AnimatedText>

        <AnimatedText delay={30}>
          <MagnifierIllustration progress={progress} />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

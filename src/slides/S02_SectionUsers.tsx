import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { SlideWrapper } from "../components/SlideWrapper";
import { colors } from "../design";

const QuestionCrowdIllustration: React.FC<{ progress: number }> = ({
  progress,
}) => {
  const silhouettes = [
    { x: 30, scale: 0.7 },
    { x: 70, scale: 0.85 },
    { x: 110, scale: 1 },
    { x: 150, scale: 0.85 },
    { x: 190, scale: 0.7 },
  ];

  return (
    <svg width="240" height="130" viewBox="0 0 240 130" fill="none">
      {/* Question mark morphing into crowd */}
      <text
        x="120"
        y="55"
        textAnchor="middle"
        fontSize="70"
        fontWeight="800"
        fill={colors.accent}
        style={{
          opacity: interpolate(progress, [0, 0.5], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        ?
      </text>

      {/* Crowd silhouettes */}
      {silhouettes.map((s, i) => {
        const delay = i * 0.08;
        const p = interpolate(progress, [0.3 + delay, 0.7 + delay], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <g key={i} transform={`translate(${s.x}, ${80 - 30 * s.scale}) scale(${s.scale})`} style={{ opacity: p }}>
            <circle cx="0" cy="0" r="9" fill={colors.textMuted} />
            <rect x="-10" y="12" width="20" height="28" rx="5" fill={colors.textMuted} />
          </g>
        );
      })}
    </svg>
  );
};

export const S02_SectionUsers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, config: { damping: 150 }, durationInFrames: 50 });

  return (
    <SlideWrapper bg={colors.bgSection}>
      <div
        style={{
          position: "absolute",
          top: -20,
          left: 60,
          fontSize: 220,
          fontWeight: 900,
          color: colors.sectionNum,
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        01
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 20,
          position: "relative",
          zIndex: 1,
        }}
      >
        <AnimatedText delay={0}>
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.accent, letterSpacing: 3, textTransform: "uppercase" }}>
            Section 01
          </div>
        </AnimatedText>

        <AnimatedText delay={10}>
          <div style={{ fontSize: 56, fontWeight: 800, color: colors.text, textAlign: "center" }}>
            Who Are Your Users?
          </div>
        </AnimatedText>

        <AnimatedText delay={20}>
          <div style={{ fontSize: 22, fontStyle: "italic", color: colors.textMuted, textAlign: "center" }}>
            "You are not the user."
          </div>
        </AnimatedText>

        <AnimatedText delay={30}>
          <QuestionCrowdIllustration progress={progress} />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

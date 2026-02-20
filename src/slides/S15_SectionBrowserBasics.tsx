import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const MatryoshkaIllustration: React.FC<{ progress: number }> = ({ progress }) => {
  const dolls = [
    { label: "React / Vue", rx: 80, ry: 100, color: colors.blue },
    { label: "HTML / CSS / JS", rx: 60, ry: 76, color: "#8B5CF6" },
    { label: "DOM APIs", rx: 42, ry: 54, color: "#F59E0B" },
    { label: "Browser Engine", rx: 26, ry: 34, color: colors.accent },
  ];

  return (
    <svg width="200" height="220" viewBox="0 0 200 220" fill="none">
      {dolls.map((doll, i) => {
        const p = interpolate(progress, [i * 0.15, i * 0.15 + 0.3], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <g key={doll.label} style={{ opacity: p }}>
            <ellipse cx="100" cy={120 - i * 8} rx={doll.rx} ry={doll.ry} stroke={doll.color} strokeWidth="2" fill={doll.color + "11"} />
            <text x="100" y={120 - i * 8 - doll.ry + 14} textAnchor="middle" fontSize="9" fill={doll.color} fontWeight="700">
              {doll.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export const S15_SectionBrowserBasics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 150 }, durationInFrames: 55 });

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
        04
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 60,
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <AnimatedText delay={0}>
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.accent, letterSpacing: 3, textTransform: "uppercase" }}>
              Section 04
            </div>
          </AnimatedText>

          <AnimatedText delay={10}>
            <div style={{ fontSize: 50, fontWeight: 800, color: colors.text, lineHeight: 1.1 }}>
              How Browsers<br />Work
            </div>
          </AnimatedText>

          <AnimatedText delay={20}>
            <div style={{ fontSize: 20, fontStyle: "italic", color: colors.textMuted }}>
              "Every framework is just this, dressed up."
            </div>
          </AnimatedText>
        </div>

        <AnimatedText delay={15}>
          <MatryoshkaIllustration progress={progress} />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

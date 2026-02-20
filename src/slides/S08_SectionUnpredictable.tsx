import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const ChaosIllustration: React.FC<{ progress: number }> = ({ progress }) => {
  const items = [
    { label: "📱", x: 60, y: 30, delay: 0.1 },
    { label: "🖥", x: 160, y: 20, delay: 0.2 },
    { label: "📡", x: 260, y: 35, delay: 0.3 },
    { label: "👆", x: 330, y: 50, delay: 0.15 },
    { label: "♿", x: 380, y: 25, delay: 0.25 },
    { label: "⚡", x: 100, y: 70, delay: 0.35 },
    { label: "🌐", x: 210, y: 65, delay: 0.05 },
  ];

  return (
    <svg width="460" height="110" viewBox="0 0 460 110" fill="none">
      {/* Central "app" box */}
      <rect x="190" y="35" width="80" height="40" rx="8" stroke={colors.accent} strokeWidth="2" fill={colors.accentLight + "44"} />
      <text x="230" y="59" textAnchor="middle" fontSize="11" fill={colors.accent} fontWeight="700">App</text>

      {items.map((item, i) => {
        const p = interpolate(progress, [item.delay, item.delay + 0.4], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        });
        return (
          <g key={i} style={{ opacity: p }}>
            <line
              x1={item.x} y1={item.y}
              x2={230} y2={55}
              stroke={colors.strokeMuted}
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            <text x={item.x} y={item.y} textAnchor="middle" fontSize="20">{item.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

export const S08_SectionUnpredictable: React.FC = () => {
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
        03
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
            Section 03
          </div>
        </AnimatedText>

        <AnimatedText delay={10}>
          <div style={{ fontSize: 48, fontWeight: 800, color: colors.text, textAlign: "center" }}>
            Unpredictability Causes Engineering Complexity
          </div>
        </AnimatedText>

        <AnimatedText delay={20}>
          <div style={{ fontSize: 20, fontStyle: "italic", color: colors.textMuted, textAlign: "center" }}>
            "Complexity hides where users live."
          </div>
        </AnimatedText>

        <AnimatedText delay={30}>
          <ChaosIllustration progress={progress} />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const aboveWater = [
  { label: "React", color: "#61DAFB" },
  { label: "Vue", color: "#42B883" },
  { label: "Next.js", color: colors.text },
];

const belowWater = [
  { label: "DOM", color: colors.accent, x: 120 },
  { label: "Events", color: "#8B5CF6", x: 210 },
  { label: "Fetch", color: colors.blue, x: 300 },
  { label: "Layout", color: "#F59E0B", x: 180 },
  { label: "Paint", color: colors.good, x: 260 },
];

const IcebergIllustration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <svg width="400" height="300" viewBox="0 0 400 300" fill="none">
      {/* Water line */}
      <rect x="0" y="130" width="400" height="170" rx="0" fill={colors.blue + "22"} />
      <line x1="0" y1="130" x2="400" y2="130" stroke={colors.blue} strokeWidth="2" strokeDasharray="8 4" />
      <text x="370" y="125" textAnchor="end" fontSize="9" fill={colors.blue} fontStyle="italic">waterline</text>

      {/* Iceberg above water */}
      <path d="M160 10 L240 10 L260 130 L140 130 Z" fill={colors.sectionNum} stroke={colors.strokeMuted} strokeWidth="1.5" />
      {/* Iceberg below water - larger */}
      <path d="M100 130 L300 130 L330 285 L70 285 Z" fill={colors.blue + "33"} stroke={colors.blue} strokeWidth="1.5" />

      {/* Above water labels */}
      {aboveWater.map((item, i) => {
        const progress = spring({ frame: frame - i * 8, fps, config: { damping: 200 } });
        return (
          <text key={item.label} x={200} y={40 + i * 26} textAnchor="middle" fontSize="13" fontWeight="700" fill={item.color}
            style={{ opacity: interpolate(progress, [0, 1], [0, 1]) }}>
            {item.label}
          </text>
        );
      })}

      {/* Below water labels */}
      {belowWater.map((item, i) => {
        const progress = spring({ frame: frame - 30 - i * 8, fps, config: { damping: 200 } });
        return (
          <text key={item.label} x={item.x} y={170 + i * 22} textAnchor="middle" fontSize="11" fontWeight="600" fill={item.color}
            style={{ opacity: interpolate(progress, [0, 1], [0, 1]) }}>
            {item.label}
          </text>
        );
      })}
    </svg>
  );
};

export const S33_Takeaway2: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", height: "100%", gap: 40, alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 28 }}>
          <AnimatedText delay={0}>
            <div style={{ fontSize: 13, fontWeight: 700, color: colors.accent, letterSpacing: 2, textTransform: "uppercase" }}>
              Takeaway 02
            </div>
          </AnimatedText>

          <AnimatedText delay={10}>
            <div style={{ fontSize: 56, fontWeight: 900, color: colors.text, lineHeight: 1.05 }}>
              Understand the browser, <span style={{ color: colors.blue }}>master any framework.</span>
            </div>
          </AnimatedText>

          <AnimatedText delay={25}>
            <div style={{ fontSize: 20, color: colors.textMuted, lineHeight: 1.5 }}>
              Every abstraction leaks. When it does, you need to know what's underneath.
            </div>
          </AnimatedText>

          <AnimatedText delay={45}>
            <div style={{
              padding: "14px 18px",
              background: colors.accentLight + "44",
              border: `2px solid ${colors.accent}`,
              borderRadius: 12,
              fontSize: 15,
              color: colors.text,
              lineHeight: 1.5,
            }}>
              <strong style={{ color: colors.accent }}>The primitives never change.</strong> HTML, CSS, JS, DOM, events — same as 25 years ago. Frameworks come and go. The browser stays.
            </div>
          </AnimatedText>
        </div>

        <AnimatedText delay={10}>
          <IcebergIllustration />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

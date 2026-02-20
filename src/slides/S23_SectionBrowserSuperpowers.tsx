import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const superPowerIcons = [
  { label: "Storage", icon: "🗄️", x: 80, y: 40, delay: 0.1 },
  { label: "Camera", icon: "📷", x: 160, y: 20, delay: 0.2 },
  { label: "Video", icon: "🎬", x: 240, y: 50, delay: 0.15 },
  { label: "3D", icon: "🧊", x: 300, y: 25, delay: 0.25 },
  { label: "Workers", icon: "⚙️", x: 350, y: 50, delay: 0.3 },
];

const SuperheroIllustration: React.FC<{ progress: number }> = ({ progress }) => (
  <svg width="420" height="160" viewBox="0 0 420 160" fill="none">
    {/* Browser window */}
    <rect x="60" y="30" width="120" height="90" rx="10" stroke={colors.stroke} strokeWidth="2.5" fill={colors.sectionNum} />
    <rect x="60" y="30" width="120" height="26" rx="10" fill={colors.accentLight + "66"} />
    <rect x="60" y="46" width="120" height="10" fill={colors.accentLight + "66"} />
    {/* Address bar dots */}
    <circle cx="76" cy="43" r="4" fill={colors.bad} />
    <circle cx="90" cy="43" r="4" fill="#FBBF24" />
    <circle cx="104" cy="43" r="4" fill={colors.good} />
    {/* Cape */}
    <path d="M120 80 C120 90 70 110 40 100 C60 90 90 85 120 80Z" fill={colors.accent + "88"} stroke={colors.accent} strokeWidth="1.5" />
    <path d="M120 80 C120 90 170 110 200 100 C180 90 150 85 120 80Z" fill={colors.accent + "88"} stroke={colors.accent} strokeWidth="1.5" />

    {/* Floating icons */}
    {superPowerIcons.map((item, i) => {
      const p = interpolate(progress, [item.delay, item.delay + 0.4], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return (
        <g key={i} style={{ opacity: p, transform: `translate(${item.x}px, ${item.y}px)` }}>
          <circle cx={0} cy={0} r={20} fill={colors.accentLight + "55"} stroke={colors.accent + "55"} strokeWidth="1" />
          <text x={0} y={7} textAnchor="middle" fontSize="18">{item.icon}</text>
          <text x={0} y={36} textAnchor="middle" fontSize="8" fill={colors.accent} fontWeight="600">{item.label}</text>
        </g>
      );
    })}
  </svg>
);

export const S23_SectionBrowserSuperpowers: React.FC = () => {
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
        05
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
            Section 05
          </div>
        </AnimatedText>

        <AnimatedText delay={10}>
          <div style={{ fontSize: 50, fontWeight: 800, color: colors.text, textAlign: "center" }}>
            Browser Superpowers
          </div>
        </AnimatedText>

        <AnimatedText delay={20}>
          <div style={{ fontSize: 20, fontStyle: "italic", color: colors.textMuted, textAlign: "center" }}>
            "The browser is more powerful than most engineers realize."
          </div>
        </AnimatedText>

        <AnimatedText delay={30}>
          <SuperheroIllustration progress={progress} />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const renderSteps = [
  { label: "Style calc", color: "#8B5CF6", icon: "🎨" },
  { label: "Layout", color: colors.blue, icon: "📐" },
  { label: "Paint", color: colors.accent, icon: "🖌️" },
  { label: "Composite", color: colors.good, icon: "🖼️" },
];

const FetchIllustration: React.FC<{ progress: number }> = ({ progress }) => (
  <svg width="260" height="160" viewBox="0 0 260 160" fill="none">
    {/* Browser handset */}
    <rect x="10" y="20" width="70" height="120" rx="8" stroke={colors.stroke} strokeWidth="2" fill={colors.sectionNum} />
    <text x="45" y="65" textAnchor="middle" fontSize="24">💻</text>
    <text x="45" y="110" textAnchor="middle" fontSize="9" fill={colors.textMuted}>browser</text>

    {/* Data flow line */}
    <line x1="82" y1="80" x2="178" y2="80" stroke={colors.strokeMuted} strokeWidth="2" strokeDasharray="6 4" />
    {/* Traveling packet */}
    <circle
      cx={interpolate(progress, [0, 0.5], [82, 178], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      cy={80}
      r={8}
      fill={colors.accent}
      style={{ opacity: interpolate(progress, [0, 0.1, 0.45, 0.5], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}
    />
    {/* Return packet */}
    <circle
      cx={interpolate(progress, [0.5, 1], [178, 82], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      cy={80}
      r={8}
      fill={colors.good}
      style={{ opacity: interpolate(progress, [0.5, 0.55, 0.95, 1], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}
    />

    {/* Server tower */}
    <rect x="180" y="40" width="70" height="80" rx="6" stroke={colors.stroke} strokeWidth="2" fill={colors.sectionNum} />
    <text x="215" y="75" textAnchor="middle" fontSize="22">🖥</text>
    <text x="215" y="110" textAnchor="middle" fontSize="9" fill={colors.textMuted}>server</text>

    {/* No full reload badge */}
    <rect x="85" y="105" width="90" height="20" rx="6" fill={colors.good + "22"} stroke={colors.good} strokeWidth="1" />
    <text x="130" y="119" textAnchor="middle" fontSize="8" fill={colors.good} fontWeight="700">No full page reload!</text>
  </svg>
);

const RenderLayersIllustration: React.FC<{ progress: number }> = ({ progress }) => (
  <div style={{ display: "flex", flexDirection: "column-reverse", gap: 6, position: "relative" }}>
    {renderSteps.map((step, i) => {
      const p = interpolate(progress, [i * 0.2, i * 0.2 + 0.25], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return (
        <div
          key={step.label}
          style={{
            opacity: p,
            transform: `translateY(${interpolate(p, [0, 1], [10, 0])}px)`,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 14px",
            background: step.color + "22",
            border: `1.5px solid ${step.color}`,
            borderRadius: 8,
            width: 220,
          }}
        >
          <span style={{ fontSize: 18 }}>{step.icon}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: step.color }}>{step.label}</span>
          <span style={{ fontSize: 10, color: colors.textMuted, marginLeft: "auto" }}>layer {i + 1}</span>
        </div>
      );
    })}
    <div style={{ fontSize: 10, color: colors.textMuted, fontStyle: "italic", paddingLeft: 4, marginBottom: 6 }}>
      → assembled into final frame
    </div>
  </div>
);

export const S20_FetchLayout: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fetchProgress = spring({ frame: frame - 15, fps, config: { damping: 120 }, durationInFrames: 60 });
  const renderProgress = spring({ frame: frame - 15, fps, config: { damping: 120 }, durationInFrames: 60 });

  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 20 }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 52, fontWeight: 800, color: colors.text }}>
            Talk to servers. Then <span style={{ color: colors.accent }}>paint the screen.</span>
          </div>
        </AnimatedText>

        <div style={{ display: "flex", gap: 40, flex: 1, alignItems: "center" }}>
          {/* Fetch column */}
          <AnimatedText delay={15} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>Fetch / XHR</div>
            <div style={{ fontSize: 14, color: colors.textMuted }}>Talk to servers without reloading the page</div>
            <FetchIllustration progress={fetchProgress} />
          </AnimatedText>

          <div style={{ width: 2, background: colors.sectionNum, alignSelf: "stretch" }} />

          {/* Render column */}
          <AnimatedText delay={30} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>Layout & Paint</div>
            <div style={{ fontSize: 14, color: colors.textMuted }}>The browser renders in layers, bottom to top</div>
            <RenderLayersIllustration progress={renderProgress} />
          </AnimatedText>
        </div>

        <AnimatedText delay={80}>
          <div style={{
            padding: "10px 16px",
            background: colors.bad + "11",
            border: `1.5px solid ${colors.bad}`,
            borderRadius: 10,
            fontSize: 14,
            color: colors.bad,
          }}>
            ⚠️ Forcing a layout recalculation inside a loop = jank. Don't.
          </div>
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

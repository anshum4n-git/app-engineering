import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const loopNodes = [
  { label: "Write test", icon: "📝", color: colors.blue, angle: -90 },
  { label: "AI generates", icon: "🤖", color: "#8B5CF6", angle: -10 },
  { label: "Tests run", icon: "⚙️", color: colors.textMuted, angle: 70 },
  { label: "AI sees failure", icon: "👁️", color: colors.bad, angle: 150 },
  { label: "AI fixes", icon: "🔧", color: colors.accent, angle: 230 },
];

const AgenticLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 150;
  const cy = 150;
  const r = 100;

  return (
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
      {/* Circular track */}
      <circle cx={cx} cy={cy} r={r} stroke={colors.sectionNum} strokeWidth="2" fill="none" strokeDasharray="8 4" />

      {/* Loop nodes */}
      {loopNodes.map((node, i) => {
        const progress = spring({ frame: frame - 15 - i * 10, fps, config: { damping: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const rad = (node.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * r;
        const y = cy + Math.sin(rad) * r;

        return (
          <g key={node.label} style={{ opacity }}>
            <circle cx={x} cy={y} r={22} fill={node.color + "22"} stroke={node.color} strokeWidth="2" />
            <text x={x} y={y + 7} textAnchor="middle" fontSize="16">{node.icon}</text>
            <text x={x} y={y + 40} textAnchor="middle" fontSize="8" fill={node.color} fontWeight="600"
              style={{ opacity: interpolate(progress, [0.5, 1], [0, 1], { extrapolateLeft: "clamp" }) }}>
              {node.label}
            </text>
          </g>
        );
      })}

      {/* Green checkmark center */}
      <AnimatedText delay={70}>
        <text x={cx} y={cy + 8} textAnchor="middle" fontSize="30" style={{ opacity: 1 }}>✅</text>
      </AnimatedText>
    </svg>
  );
};

export const S30_AIEyes: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", height: "100%", gap: 40, alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <AnimatedText delay={0}>
            <div style={{ fontSize: 56, fontWeight: 800, color: colors.text, lineHeight: 1.1 }}>
              Test it. Show it. Fix it. <span style={{ color: colors.good }}>Repeat.</span>
            </div>
          </AnimatedText>

          <AnimatedText delay={15}>
            <div style={{
              padding: "16px 20px",
              background: colors.blue + "11",
              border: `2px solid ${colors.blue}`,
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: colors.blue }}>👁️ Give AI Eyes</div>
              <div style={{ fontSize: 14, color: colors.text }}>
                Screenshot → AI reviews → flags visual regressions → fix
              </div>
              <div style={{ fontSize: 12, color: colors.textMuted, fontStyle: "italic" }}>
                Visual testing with AI as the reviewer
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={30}>
            <div style={{
              padding: "16px 20px",
              background: colors.good + "11",
              border: `2px solid ${colors.good}`,
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: colors.good }}>⚙️ Agentic Dev Loops</div>
              <div style={{ fontSize: 14, color: colors.text }}>
                Write test → AI generates → tests run → AI sees failure → AI fixes → tests pass
              </div>
              <div style={{ fontSize: 12, color: colors.textMuted, fontStyle: "italic" }}>
                Tests are the spec. AI iterates to green.
              </div>
            </div>
          </AnimatedText>
        </div>

        <AnimatedText delay={10}>
          <AgenticLoop />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

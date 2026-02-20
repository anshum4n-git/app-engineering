import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const frameworks = [
  { label: "React", color: "#61DAFB", bg: "#61DAFB22" },
  { label: "Vue", color: "#42B883", bg: "#42B88322" },
  { label: "Angular", color: "#DD0031", bg: "#DD003122" },
  { label: "Svelte", color: "#FF3E00", bg: "#FF3E0022" },
];

const primitives = [
  { label: "DOM", icon: "🌳" },
  { label: "Events", icon: "⚡" },
  { label: "Fetch", icon: "📡" },
  { label: "Layout", icon: "📐" },
];

const FunnelDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const arrowProgress = spring({ frame: frame - 30, fps, config: { damping: 150 } });

  return (
    <svg width="500" height="300" viewBox="0 0 500 300" fill="none">
      {/* Framework boxes at top */}
      {frameworks.map((fw, i) => {
        const progress = spring({ frame: frame - i * 8, fps, config: { damping: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const x = 30 + i * 115;

        return (
          <g key={fw.label} style={{ opacity }}>
            <rect x={x} y={20} width={90} height={36} rx={8} fill={fw.bg} stroke={fw.color} strokeWidth="2" />
            <text x={x + 45} y={42} textAnchor="middle" fontSize="13" fill={fw.color} fontWeight="700">{fw.label}</text>
            {/* Arrow down */}
            <line
              x1={x + 45} y1={58}
              x2={interpolate(arrowProgress, [0, 1], [x + 45, 250], { extrapolateLeft: "clamp" })}
              y2={interpolate(arrowProgress, [0, 1], [58, 155], { extrapolateLeft: "clamp" })}
              stroke={fw.color}
              strokeWidth="1.5"
              strokeDasharray="5 3"
              style={{ opacity: interpolate(arrowProgress, [0, 1], [0, 1]) }}
            />
          </g>
        );
      })}

      {/* Convergence point / primitives box */}
      {arrowProgress > 0.3 && (
        <g style={{ opacity: interpolate(arrowProgress, [0.3, 0.6], [0, 1], { extrapolateLeft: "clamp" }) }}>
          <rect x={80} y={155} width={340} height={80} rx={12}
            fill={colors.accentLight + "55"}
            stroke={colors.accent}
            strokeWidth="2.5"
          />
          <text x={250} y={180} textAnchor="middle" fontSize="12" fill={colors.accent} fontWeight="700">
            Browser Primitives
          </text>
          {/* Primitive labels */}
          {primitives.map((p, i) => (
            <g key={p.label}>
              <text x={115 + i * 80} y={213} textAnchor="middle" fontSize="16">{p.icon}</text>
              <text x={115 + i * 80} y={228} textAnchor="middle" fontSize="9" fill={colors.accent} fontWeight="600">{p.label}</text>
            </g>
          ))}
        </g>
      )}

      {/* "All roads lead to..." label */}
      {arrowProgress > 0.7 && (
        <text x={250} y={275} textAnchor="middle" fontSize="12" fill={colors.textMuted} fontStyle="italic"
          style={{ opacity: interpolate(arrowProgress, [0.7, 1], [0, 1], { extrapolateLeft: "clamp" }) }}>
          Every abstraction compiles here
        </text>
      )}
    </svg>
  );
};

export const S22_FrameworksAbstractions: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 24, alignItems: "center", justifyContent: "center" }}>
        <AnimatedText delay={0} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: colors.text, lineHeight: 1.15 }}>
            React, Vue, Angular, Svelte — they all compile down to{" "}
            <span style={{ color: colors.accent }}>these primitives.</span>
          </div>
        </AnimatedText>

        <AnimatedText delay={20}>
          <FunnelDiagram />
        </AnimatedText>

        <AnimatedText delay={90} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 18, color: colors.textMuted, fontStyle: "italic" }}>
            Every abstraction leaks. When it does, you need to know what's underneath.
          </div>
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

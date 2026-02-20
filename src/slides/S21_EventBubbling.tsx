import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const layers = [
  { label: "<body>", size: 340, color: "#9CA3AF" },
  { label: "<section>", size: 270, color: "#8B5CF6" },
  { label: "<div>", size: 200, color: colors.blue },
  { label: "<button>", size: 130, color: colors.accent },
];

const BubblingDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dotProgress = spring({ frame: frame - 40, fps, config: { damping: 100 }, durationInFrames: 55 });
  // Click dot moves from center outward
  const dotR = interpolate(dotProgress, [0, 1], [12, 155]);

  return (
    <svg width="370" height="370" viewBox="0 0 370 370" fill="none">
      {/* Concentric squares */}
      {layers.map((layer, i) => {
        const progress = spring({ frame: frame - i * 8, fps, config: { damping: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const margin = (370 - layer.size) / 2;

        return (
          <g key={layer.label} style={{ opacity }}>
            <rect
              x={margin} y={margin}
              width={layer.size} height={layer.size}
              rx={8}
              stroke={layer.color}
              strokeWidth="2"
              fill={layer.color + "0D"}
            />
            <text x={margin + 8} y={margin + 16} fontSize="10" fill={layer.color} fontWeight="700">
              {layer.label}
            </text>
          </g>
        );
      })}

      {/* Bubbling dot */}
      {dotProgress > 0 && (
        <>
          <circle
            cx={185} cy={185}
            r={dotR}
            stroke={colors.accent}
            strokeWidth="2"
            fill="none"
            strokeDasharray="6 4"
            style={{
              opacity: interpolate(dotProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0], { extrapolateLeft: "clamp" }),
            }}
          />
          {/* Click point */}
          <circle cx={185} cy={185} r={6} fill={colors.accent}
            style={{ opacity: interpolate(dotProgress, [0, 0.15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
        </>
      )}

      {/* Stop propagation badge */}
      {dotProgress > 0.5 && (
        <g style={{ opacity: interpolate(dotProgress, [0.5, 0.7], [0, 1], { extrapolateLeft: "clamp" }) }}>
          <rect x={220} y={100} width={120} height={26} rx={6} fill={colors.good + "22"} stroke={colors.good} strokeWidth="1.5" />
          <text x={280} y={117} textAnchor="middle" fontSize="9" fill={colors.good} fontWeight="700">.stopPropagation()</text>
          <line x1={220} y1={113} x2={195} y2={150} stroke={colors.good} strokeWidth="1.5" strokeDasharray="3 2" />
        </g>
      )}

      {/* Center click label */}
      <text x={185} y={210} textAnchor="middle" fontSize="9" fill={colors.textMuted}>click!</text>
    </svg>
  );
};

export const S21_EventBubbling: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", height: "100%", gap: 40, alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <AnimatedText delay={0}>
            <div style={{ fontSize: 60, fontWeight: 800, color: colors.text }}>
              Events <span style={{ color: colors.accent }}>travel up.</span>
            </div>
          </AnimatedText>

          <AnimatedText delay={15}>
            <div style={{ fontSize: 18, color: colors.textMuted, lineHeight: 1.6 }}>
              A click on a button bubbles through every parent — div, section, body, document — unless you stop it.
            </div>
          </AnimatedText>

          <AnimatedText delay={40}>
            <div style={{
              padding: "12px 16px",
              background: colors.blue + "11",
              border: `1.5px solid ${colors.blue}`,
              borderRadius: 10,
              fontSize: 14,
              color: colors.text,
              lineHeight: 1.6,
            }}>
              <div style={{ fontWeight: 700, color: colors.blue, marginBottom: 4 }}>Why it matters</div>
              Event delegation — attach one listener to a parent instead of many to children. Huge performance win for lists.
            </div>
          </AnimatedText>

          <AnimatedText delay={55}>
            <div style={{
              padding: "10px 16px",
              background: colors.good + "11",
              border: `1.5px solid ${colors.good}`,
              borderRadius: 10,
              fontSize: 13,
              fontFamily: "monospace",
              color: colors.good,
            }}>
              event.stopPropagation() // stop the bubble
            </div>
          </AnimatedText>
        </div>

        <AnimatedText delay={10}>
          <BubblingDiagram />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

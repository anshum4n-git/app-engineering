import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const steps = [
  { label: "URL entered", icon: "🌐" },
  { label: "DNS lookup", icon: "🔍" },
  { label: "TCP handshake", icon: "🤝" },
  { label: "HTTP request", icon: "📤" },
  { label: "HTML received", icon: "📄" },
  { label: "CSS + JS fetched", icon: "🎨" },
];

const FlowDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ position: "relative" }}>
      <svg width="960" height="90" viewBox="0 0 960 90" style={{ overflow: "visible" }}>
        {steps.map((step, i) => {
          const progress = spring({ frame: frame - 5 - i * 10, fps, config: { damping: 200 } });
          const opacity = interpolate(progress, [0, 1], [0, 1]);
          const x = 40 + i * 155;

          return (
            <g key={step.label} style={{ opacity }}>
              {/* Node */}
              <circle cx={x} cy={45} r={30} stroke={colors.accent} strokeWidth="2" fill={colors.accentLight + "33"} />
              <text x={x} y={49} textAnchor="middle" fontSize="18">{step.icon}</text>
              {/* Label */}
              <text x={x} y={85} textAnchor="middle" fontSize="10" fill={colors.textMuted} fontWeight="600">
                {step.label}
              </text>
              {/* Arrow to next */}
              {i < steps.length - 1 && (
                <g style={{ opacity: interpolate(spring({ frame: frame - 10 - i * 10, fps, config: { damping: 200 } }), [0, 1], [0, 1]) }}>
                  <line x1={x + 32} y1={45} x2={x + 123} y2={45} stroke={colors.strokeMuted} strokeWidth="1.5" />
                  <path d={`M${x + 118} 40 L${x + 125} 45 L${x + 118} 50`} stroke={colors.strokeMuted} strokeWidth="1.5" fill="none" />
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Cookie callout */}
      <AnimatedText delay={75}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          background: "#FEF3C7",
          border: "1.5px solid #F59E0B",
          borderRadius: 10,
          fontSize: 14,
          color: "#92400E",
          marginTop: 12,
        }}>
          🍪 Cookies & headers travel with <strong>every</strong> request — authentication, tracking, preferences
        </div>
      </AnimatedText>

      {/* Cache fork */}
      <AnimatedText delay={85}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          background: colors.blue + "11",
          border: `1.5px solid ${colors.blue}`,
          borderRadius: 10,
          fontSize: 14,
          color: colors.blue,
          marginTop: 8,
        }}>
          ⚡ Cache check first — avoid the round trip entirely
        </div>
      </AnimatedText>
    </div>
  );
};

export const S16_DownloadParse: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 28 }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 60, fontWeight: 800, color: colors.text }}>
            Step 1: <span style={{ color: colors.accent }}>Get the code.</span>
          </div>
        </AnimatedText>

        <AnimatedText delay={10}>
          <div style={{ fontSize: 20, color: colors.textMuted }}>
            Before your app does anything — this pipeline runs.
          </div>
        </AnimatedText>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <FlowDiagram />
        </div>
      </div>
    </SlideWrapper>
  );
};

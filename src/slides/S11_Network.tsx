import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const RoadIllustration: React.FC<{ progress: number }> = ({ progress }) => {
  const potholes = [
    { x: 110, label: "latency spike" },
    { x: 160, label: "packet loss" },
    { x: 205, label: "timeout" },
  ];

  return (
    <svg width="540" height="180" viewBox="0 0 540 180" fill="none">
      {/* === LEFT: Fiber highway === */}
      <g>
        <text x="130" y="20" textAnchor="middle" fontSize="12" fontWeight="700" fill={colors.good}>Fiber — 10Mbps, 10ms</text>
        {/* Road */}
        <rect x="20" y="30" width="220" height="50" rx="4" fill={colors.sectionNum} />
        {/* Dashes */}
        {[0, 1, 2, 3, 4].map(i => (
          <rect key={i} x={40 + i * 40} y={53} width={20} height={5} rx={2} fill="white" style={{ opacity: 0.7 }} />
        ))}
        {/* Packet car */}
        <g transform={`translate(${interpolate(progress, [0, 1], [20, 200])}, 30)`}>
          <rect x="0" y="8" width="28" height="18" rx="4" fill={colors.good} />
          <circle cx="7" cy="28" r="5" fill={colors.stroke} />
          <circle cx="21" cy="28" r="5" fill={colors.stroke} />
          <text x="14" y="21" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">📦</text>
        </g>
        <text x="130" y="100" textAnchor="middle" fontSize="11" fill={colors.good} fontWeight="600">everything loads instantly</text>
      </g>

      {/* Divider */}
      <line x1="270" y1="10" x2="270" y2="170" stroke={colors.sectionNum} strokeWidth="2" />

      {/* === RIGHT: Dirt road === */}
      <g>
        <text x="410" y="20" textAnchor="middle" fontSize="12" fontWeight="700" fill={colors.bad}>3G on a train — 1.5Mbps, 300ms</text>
        {/* Bumpy road */}
        <path
          d="M280 80 Q300 70 320 80 Q340 90 360 75 Q380 60 400 80 Q420 95 440 78 Q460 62 480 80 L480 110 L280 110 Z"
          fill={colors.sectionNum}
          stroke={colors.strokeMuted}
          strokeWidth="1.5"
        />
        {/* Potholes */}
        {potholes.map((p, i) => (
          <g key={i} style={{ opacity: interpolate(progress, [0.3 + i * 0.15, 0.5 + i * 0.15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            <ellipse cx={280 + p.x} cy={95} rx={12} ry={8} fill={colors.bad + "33"} stroke={colors.bad} strokeWidth="1.5" />
            <text x={280 + p.x} y={115} textAnchor="middle" fontSize="8" fill={colors.bad}>{p.label}</text>
          </g>
        ))}
        {/* Struggling car */}
        <g transform={`translate(${interpolate(progress, [0, 1], [280, 370])}, 55)`}>
          <rect x="0" y="8" width="28" height="18" rx="4" fill={colors.bad} />
          <circle cx="7" cy="28" r="5" fill={colors.stroke} />
          <circle cx="21" cy="28" r="5" fill={colors.stroke} />
          {/* Sweat drops */}
          <text x="14" y="7" textAnchor="middle" fontSize="8">😰</text>
        </g>
        <text x="410" y="140" textAnchor="middle" fontSize="11" fill={colors.bad} fontWeight="600">everything breaks</text>
      </g>
    </svg>
  );
};

export const S11_Network: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - 15, fps, config: { damping: 120 }, durationInFrames: 70 });

  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 28 }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 60, fontWeight: 800, color: colors.text }}>
            The network is not <span style={{ color: colors.bad }}>your LAN.</span>
          </div>
        </AnimatedText>

        <AnimatedText delay={15}>
          <div style={{ fontSize: 20, color: colors.textMuted }}>
            Bandwidth. Latency. Packet loss. Test for the worst case.
          </div>
        </AnimatedText>

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <AnimatedText delay={20}>
            <RoadIllustration progress={progress} />
          </AnimatedText>
        </div>
      </div>
    </SlideWrapper>
  );
};

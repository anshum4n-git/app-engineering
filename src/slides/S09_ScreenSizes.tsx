import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const devices = [
  { name: "Watch", w: 28, h: 34, label: "320px", delay: 0 },
  { name: "Phone", w: 40, h: 70, label: "390px", delay: 8 },
  { name: "Tablet", w: 70, h: 90, label: "768px", delay: 16 },
  { name: "Laptop", w: 110, h: 75, label: "1440px", delay: 24 },
  { name: "Ultrawide", w: 160, h: 90, label: "5120px", delay: 32 },
];

const ScreenSpectrum: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalW = devices.reduce((s, d) => s + d.w + 24, 0);
  const svgW = Math.min(totalW, 600);

  let cumX = 0;

  return (
    <svg width={svgW} height={160} viewBox={`0 0 ${svgW} 160`} fill="none">
      {devices.map((dev, i) => {
        const progress = spring({ frame: frame - dev.delay, fps, config: { damping: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const scaleY = interpolate(progress, [0, 1], [0.3, 1]);
        const x = cumX;
        cumX += dev.w + 24;

        const baseY = 110;
        const top = baseY - dev.h * scaleY;

        return (
          <g key={dev.name} style={{ opacity }}>
            <rect
              x={x}
              y={top}
              width={dev.w}
              height={dev.h * scaleY}
              rx={dev.name === "Watch" ? 6 : dev.name === "Phone" ? 5 : 3}
              stroke={colors.accent}
              strokeWidth="2"
              fill={colors.accentLight + "33"}
            />
            {/* Screen content lines */}
            <line x1={x + 4} y1={top + 8} x2={x + dev.w - 4} y2={top + 8} stroke={colors.strokeMuted} strokeWidth="1" style={{ opacity: 0.5 }} />
            <line x1={x + 4} y1={top + 14} x2={x + dev.w - 8} y2={top + 14} stroke={colors.strokeMuted} strokeWidth="1" style={{ opacity: 0.5 }} />
            <text x={x + dev.w / 2} y={baseY + 16} textAnchor="middle" fontSize="9" fill={colors.textMuted} fontWeight="600">
              {dev.name}
            </text>
            <text x={x + dev.w / 2} y={baseY + 28} textAnchor="middle" fontSize="9" fill={colors.accent}>
              {dev.label}
            </text>
          </g>
        );
      })}
      {/* Ground line */}
      <line x1="0" y1="110" x2={svgW} y2="110" stroke={colors.sectionNum} strokeWidth="2" />
    </svg>
  );
};

export const S09_ScreenSizes: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 28 }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 60, fontWeight: 800, color: colors.text }}>
            Every screen is <span style={{ color: colors.accent }}>different.</span>
          </div>
        </AnimatedText>

        <AnimatedText delay={12}>
          <div style={{ fontSize: 20, color: colors.textMuted }}>
            320px to 5120px. Portrait, landscape, foldable.
          </div>
        </AnimatedText>

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <ScreenSpectrum />
        </div>

        <AnimatedText delay={55}>
          <div style={{ fontSize: 15, color: colors.textMuted, fontStyle: "italic" }}>
            Your layout must adapt — or break gracefully.
          </div>
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const TimeLine: React.FC<{ progress: number }> = ({ progress }) => {
  const segments = [
    { label: "0–100ms", sublabel: "Feels instant", color: colors.good, width: 80 },
    { label: "100–300ms", sublabel: "User notices", color: "#FBBF24", width: 120 },
    { label: "300–1s", sublabel: '"Is this broken?"', color: "#F97316", width: 140 },
    { label: "1000ms+", sublabel: "User leaves", color: colors.bad, width: 160 },
  ];

  let cumX = 0;
  return (
    <div style={{ position: "relative" }}>
      <svg width="600" height="120" viewBox="0 0 600 120" fill="none">
        {/* Track */}
        <line x1="10" y1="40" x2="590" y2="40" stroke={colors.sectionNum} strokeWidth="3" strokeLinecap="round" />

        {segments.map((seg, i) => {
          const segProgress = interpolate(progress, [i * 0.2, i * 0.2 + 0.3], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const x = 10 + cumX;
          const barWidth = seg.width * segProgress;
          cumX += seg.width;
          return (
            <g key={i}>
              <rect x={x} y={25} width={barWidth} height={30} rx={4} fill={seg.color} style={{ opacity: 0.9 }} />
              <text x={x + seg.width / 2} y={17} textAnchor="middle" fontSize="11" fill={colors.textMuted} fontWeight="600"
                style={{ opacity: segProgress }}>
                {seg.label}
              </text>
              <text x={x + seg.width / 2} y={72} textAnchor="middle" fontSize="11" fill={seg.color} fontWeight="700"
                style={{ opacity: segProgress }}>
                {seg.sublabel}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Faces */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingLeft: 10, paddingRight: 10 }}>
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" style={{ opacity: interpolate(progress, [0.6, 1], [0, 1], { extrapolateLeft: "clamp" }) }}>
          <circle cx="25" cy="25" r="22" stroke={colors.good} strokeWidth="2" fill={colors.good + "11"} />
          <circle cx="18" cy="20" r="2.5" fill={colors.good} />
          <circle cx="32" cy="20" r="2.5" fill={colors.good} />
          <path d="M16 32 Q25 40 34 32" stroke={colors.good} strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" style={{ opacity: interpolate(progress, [0.8, 1], [0, 1], { extrapolateLeft: "clamp" }) }}>
          <circle cx="25" cy="25" r="22" stroke={colors.bad} strokeWidth="2" fill={colors.bad + "11"} />
          <circle cx="18" cy="20" r="2.5" fill={colors.bad} />
          <circle cx="32" cy="20" r="2.5" fill={colors.bad} />
          <path d="M16 36 Q25 28 34 36" stroke={colors.bad} strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Steam lines */}
          <line x1="10" y1="8" x2="13" y2="2" stroke={colors.bad} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="25" y1="6" x2="25" y2="0" stroke={colors.bad} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="40" y1="8" x2="37" y2="2" stroke={colors.bad} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export const S07_SlowIsABug: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - 20, fps, config: { damping: 100 }, durationInFrames: 80 });

  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 32 }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 72, fontWeight: 900, color: colors.text }}>
            Slow is a <span style={{ color: colors.bad }}>bug.</span>
          </div>
        </AnimatedText>

        <AnimatedText delay={10}>
          <div style={{ fontSize: 20, color: colors.textMuted }}>
            Users don't wait. They judge, then they leave.
          </div>
        </AnimatedText>

        <AnimatedText delay={20}>
          <TimeLine progress={progress} />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

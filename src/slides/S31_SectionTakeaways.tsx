import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const MountainIllustration: React.FC<{ progress: number }> = ({ progress }) => {
  const paths = [
    { path: "M60 200 C80 160 110 130 150 80", color: "#8B5CF6", label: "User empathy", delay: 0.1 },
    { path: "M150 200 C165 160 180 130 150 80", color: colors.blue, label: "Browser mastery", delay: 0.2 },
    { path: "M240 200 C220 160 190 130 150 80", color: colors.accent, label: "AI leverage", delay: 0.15 },
  ];

  return (
    <svg width="320" height="240" viewBox="0 0 320 240" fill="none">
      {/* Mountain outline */}
      <path d="M20 210 L150 50 L280 210 Z" stroke={colors.strokeMuted} strokeWidth="2" fill={colors.sectionNum} />
      {/* Snow cap */}
      <path d="M130 90 L150 50 L170 90 Z" fill="white" stroke={colors.strokeMuted} strokeWidth="1" />

      {/* Three paths */}
      {paths.map((p, i) => {
        const len = 200;
        const drawn = interpolate(
          progress,
          [p.delay, p.delay + 0.4],
          [len, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <g key={i}>
            <path
              d={p.path}
              stroke={p.color}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={len}
              strokeDashoffset={drawn}
            />
            <text
              style={{
                opacity: interpolate(progress, [p.delay + 0.3, p.delay + 0.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
              }}
            >
              <tspan
                x={i === 0 ? 25 : i === 1 ? 165 : 225}
                y={210 + 18}
                fontSize="8"
                fill={p.color}
                fontWeight="700"
                textAnchor="middle"
              >
                {p.label}
              </tspan>
            </text>
          </g>
        );
      })}

      {/* Summit star */}
      <circle cx={150} cy={50} r={8} fill={colors.accent}
        style={{ opacity: interpolate(progress, [0.7, 1], [0, 1], { extrapolateLeft: "clamp" }) }} />
      <text x={150} y={35} textAnchor="middle" fontSize="14"
        style={{ opacity: interpolate(progress, [0.75, 1], [0, 1], { extrapolateLeft: "clamp" }) }}>
        🌟
      </text>
    </svg>
  );
};

export const S31_SectionTakeaways: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 150 }, durationInFrames: 55 });

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
        07
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
            Section 07
          </div>
        </AnimatedText>

        <AnimatedText delay={10}>
          <div style={{ fontSize: 60, fontWeight: 800, color: colors.text, textAlign: "center" }}>
            Takeaways
          </div>
        </AnimatedText>

        <AnimatedText delay={20}>
          <div style={{ fontSize: 22, fontStyle: "italic", color: colors.textMuted, textAlign: "center" }}>
            "Great apps aren't accidents."
          </div>
        </AnimatedText>

        <AnimatedText delay={30}>
          <MountainIllustration progress={progress} />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

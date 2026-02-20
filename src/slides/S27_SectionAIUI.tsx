import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const RobotInconsistencyIllustration: React.FC<{ progress: number }> = ({ progress }) => {
  const buttonVariants = [
    { rx: 4, padding: 8, fontSize: 10, color: colors.blue },
    { rx: 14, padding: 12, fontSize: 9, color: "#8B5CF6" },
    { rx: 0, padding: 6, fontSize: 11, color: colors.accent },
    { rx: 8, padding: 10, fontSize: 8, color: "#10B981" },
    { rx: 20, padding: 14, fontSize: 12, color: "#F59E0B" },
  ];

  return (
    <svg width="400" height="180" viewBox="0 0 400 180" fill="none">
      {/* Robot */}
      <g style={{ opacity: interpolate(progress, [0, 0.3], [0, 1], { extrapolateLeft: "clamp" }) }}>
        {/* Head */}
        <rect x="30" y="10" width="60" height="50" rx="8" stroke={colors.stroke} strokeWidth="2" fill={colors.sectionNum} />
        {/* Eyes */}
        <circle cx="48" cy="35" r="7" fill={colors.blue} />
        <circle cx="72" cy="35" r="7" fill={colors.blue} />
        {/* Antenna */}
        <line x1="60" y1="10" x2="60" y2="0" stroke={colors.stroke} strokeWidth="2" />
        <circle cx="60" cy="0" r="4" fill={colors.accent} />
        {/* Body */}
        <rect x="25" y="62" width="70" height="55" rx="6" stroke={colors.stroke} strokeWidth="2" fill={colors.sectionNum} />
        {/* Keyboard */}
        <rect x="100" y="95" width="60" height="22" rx="4" fill={colors.sectionNum} stroke={colors.strokeMuted} strokeWidth="1.5" />
        {[0, 1, 2, 3, 4].map(i => (
          <rect key={i} x={104 + i * 11} y={100} width={8} height={7} rx="2" fill={colors.strokeMuted} style={{ opacity: 0.7 }} />
        ))}
        {/* Typing arm */}
        <line x1="95" y1="90" x2="115" y2="105" stroke={colors.stroke} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* 5 inconsistent buttons popping out */}
      {buttonVariants.map((btn, i) => {
        const p = interpolate(progress, [0.15 + i * 0.1, 0.35 + i * 0.1], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        });
        const x = 170 + (i % 3) * 80;
        const y = 20 + Math.floor(i / 3) * 80 + (i % 2) * 20;

        return (
          <g key={i} style={{ opacity: p, transform: `translate(${x}px, ${y}px) scale(${interpolate(p, [0, 1], [0.5, 1])})` }}>
            <rect
              x={-30} y={-btn.padding}
              width={60} height={btn.padding * 2 + 14}
              rx={btn.rx}
              fill={btn.color + "22"}
              stroke={btn.color}
              strokeWidth="1.5"
            />
            <text x={0} y={7} textAnchor="middle" fontSize={btn.fontSize} fill={btn.color} fontWeight="700">
              Submit
            </text>
            <text x={0} y={btn.padding + 20} textAnchor="middle" fontSize="8" fill={colors.textMuted}>Attempt {i + 1}</text>
          </g>
        );
      })}
    </svg>
  );
};

export const S27_SectionAIUI: React.FC = () => {
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
        06
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
            Section 06
          </div>
        </AnimatedText>

        <AnimatedText delay={10}>
          <div style={{ fontSize: 50, fontWeight: 800, color: colors.text, textAlign: "center" }}>
            AI & UI
          </div>
        </AnimatedText>

        <AnimatedText delay={20}>
          <div style={{ fontSize: 20, fontStyle: "italic", color: colors.textMuted, textAlign: "center", maxWidth: 520 }}>
            "AI writes code fast. Fast inconsistency is still inconsistency."
          </div>
        </AnimatedText>

        <AnimatedText delay={30}>
          <RobotInconsistencyIllustration progress={progress} />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

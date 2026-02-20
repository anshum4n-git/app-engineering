import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const RevolvingDoor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - 20, fps, config: { damping: 150 }, durationInFrames: 70 });

  // Door angle rotates
  const doorAngle = interpolate(progress, [0, 1], [0, 90]);

  return (
    <svg width="280" height="220" viewBox="0 0 280 220" fill="none">
      {/* Door frame */}
      <rect x="80" y="30" width="120" height="170" rx="4" stroke={colors.stroke} strokeWidth="2" fill={colors.sectionNum} />
      {/* Door panels spinning */}
      <g transform={`rotate(${doorAngle}, 140, 115)`}>
        <line x1="140" y1="40" x2="140" y2="190" stroke={colors.strokeMuted} strokeWidth="2.5" />
        <line x1="95" y1="115" x2="185" y2="115" stroke={colors.strokeMuted} strokeWidth="2.5" />
      </g>
      {/* Center pivot */}
      <circle cx="140" cy="115" r="5" fill={colors.accent} />

      {/* Happy user entering */}
      <g style={{ opacity: interpolate(progress, [0, 0.2], [0, 1], { extrapolateLeft: "clamp" }) }}>
        <circle cx="55" cy="70" r="10" stroke={colors.good} strokeWidth="2" fill={colors.good + "11"} />
        <path d="M44 90 C44 80 66 80 66 90" stroke={colors.good} strokeWidth="2" fill="none" />
        <path d="M44 78 Q55 85 66 78" stroke={colors.good} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <text x="55" y="110" textAnchor="middle" fontSize="9" fill={colors.good}>fast ✓</text>
      </g>

      {/* Disappointed user leaving */}
      <g style={{ opacity: interpolate(progress, [0.4, 0.6], [0, 1], { extrapolateLeft: "clamp" }) }}>
        <circle cx="225" cy="70" r="10" stroke={colors.bad} strokeWidth="2" fill={colors.bad + "11"} />
        <path d="M214 90 C214 80 236 80 236 90" stroke={colors.bad} strokeWidth="2" fill="none" />
        {/* Frown */}
        <path d="M216 82 Q225 77 234 82" stroke={colors.bad} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Arrow leaving */}
        <path d="M237 75 L255 68" stroke={colors.bad} strokeWidth="1.5" markerEnd="url(#arrowBad)" strokeLinecap="round" />
        <text x="225" y="110" textAnchor="middle" fontSize="9" fill={colors.bad}>gone ✗</text>
      </g>

      {/* Spinning UI glitch label */}
      <text x="140" y="210" textAnchor="middle" fontSize="9" fill={colors.textMuted} fontStyle="italic">glitchy UI = revolving door</text>
    </svg>
  );
};

export const S32_Takeaway1: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", height: "100%", gap: 40, alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 28 }}>
          <AnimatedText delay={0}>
            <div style={{ fontSize: 13, fontWeight: 700, color: colors.accent, letterSpacing: 2, textTransform: "uppercase" }}>
              Takeaway 01
            </div>
          </AnimatedText>

          <AnimatedText delay={10}>
            <div style={{ fontSize: 58, fontWeight: 900, color: colors.text, lineHeight: 1.05 }}>
              Poor quality is felt in{" "}
              <span style={{ color: colors.bad }}>milliseconds.</span>
            </div>
          </AnimatedText>

          <AnimatedText delay={25}>
            <div style={{ fontSize: 22, color: colors.textMuted, lineHeight: 1.5 }}>
              Users don't file bug reports. They just leave.
            </div>
          </AnimatedText>

          <AnimatedText delay={40}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Performance", text: "Every 100ms matters" },
                { label: "Consistency", text: "Inconsistency is noticed, even if not named" },
                { label: "Edge cases", text: "They're not edge cases to the users who hit them" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: colors.accent, width: 100, paddingTop: 1 }}>{item.label}</div>
                  <div style={{ fontSize: 15, color: colors.textMuted }}>{item.text}</div>
                </div>
              ))}
            </div>
          </AnimatedText>
        </div>

        <AnimatedText delay={15}>
          <RevolvingDoor />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

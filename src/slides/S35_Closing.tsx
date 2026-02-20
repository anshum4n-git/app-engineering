import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { SlideWrapper } from "../components/SlideWrapper";
import { colors } from "../design";

const HandsHeart: React.FC<{ progress: number }> = ({ progress }) => {
  const heartScale = interpolate(progress, [0.5, 1], [0, 1], { extrapolateLeft: "clamp" });
  const heartOpacity = interpolate(progress, [0.5, 0.8], [0, 1], { extrapolateLeft: "clamp" });
  const pulseR = interpolate(progress, [0.7, 1], [0, 22], { extrapolateLeft: "clamp" });

  return (
    <svg width="280" height="200" viewBox="0 0 280 200" fill="none">
      {/* Left hand (laptop) */}
      <g style={{ opacity: interpolate(progress, [0, 0.4], [0, 1], { extrapolateLeft: "clamp" }) }}>
        {/* Laptop */}
        <rect x="10" y="60" width="90" height="60" rx="6" stroke={colors.stroke} strokeWidth="2" fill={colors.sectionNum} />
        <rect x="10" y="60" width="90" height="16" rx="6" fill={colors.accentLight + "55"} />
        <rect x="10" y="70" width="90" height="6" fill={colors.accentLight + "55"} />
        <rect x="4" y="120" width="102" height="8" rx="4" fill={colors.strokeMuted} />
        {/* Screen glow */}
        <rect x="16" y="82" width="78" height="33" rx="3" fill={colors.blue + "22"} />
        {[0, 1, 2].map(i => (
          <rect key={i} x={20} y={87 + i * 10} width={40 + i * 15} height={5} rx={2} fill={colors.blue + "44"} />
        ))}
        {/* Hand holding it */}
        <path d="M30 130 C30 145 80 145 80 130" stroke={colors.stroke} strokeWidth="2" fill="none" />
      </g>

      {/* Right hand (phone) */}
      <g style={{ opacity: interpolate(progress, [0.1, 0.5], [0, 1], { extrapolateLeft: "clamp" }) }}>
        <rect x="180" y="50" width="60" height="100" rx="10" stroke={colors.stroke} strokeWidth="2" fill={colors.sectionNum} />
        <rect x="180" y="50" width="60" height="22" rx="10" fill={colors.accentLight + "55"} />
        <rect x="180" y="66" width="60" height="6" fill={colors.accentLight + "55"} />
        <circle cx="210" cy="61" r="4" fill={colors.strokeMuted} />
        {/* Screen content */}
        <rect x="186" y="78" width="48" height="60" rx="3" fill={colors.good + "11"} />
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x={190} y={84 + i * 13} width={28 + (i % 2) * 10} height={7} rx={2} fill={colors.good + "33"} />
        ))}
        {/* Hand holding it */}
        <path d="M185 155 C190 170 230 170 235 155" stroke={colors.stroke} strokeWidth="2" fill="none" />
      </g>

      {/* Heart between them */}
      <g style={{
        opacity: heartOpacity,
        transform: `scale(${heartScale})`,
        transformOrigin: "140px 100px",
      }}>
        <path
          d="M140 120 C140 120 115 103 115 88 C115 79 122 73 130 73 C135 73 140 77 140 82 C140 77 145 73 150 73 C158 73 165 79 165 88 C165 103 140 120 140 120Z"
          fill={colors.accent}
        />
        {/* Pulse rings */}
        <circle cx="140" cy="98" r={pulseR} stroke={colors.accent} strokeWidth="1.5" fill="none"
          style={{ opacity: interpolate(progress, [0.7, 1], [0, 0.4], { extrapolateLeft: "clamp" }) }} />
        <circle cx="140" cy="98" r={pulseR * 1.6} stroke={colors.accent} strokeWidth="1" fill="none"
          style={{ opacity: interpolate(progress, [0.75, 1], [0, 0.2], { extrapolateLeft: "clamp" }) }} />
      </g>
    </svg>
  );
};

export const S35_Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const illustrationProgress = spring({ frame, fps, config: { damping: 120 }, durationInFrames: 70 });

  return (
    <SlideWrapper>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 28,
        textAlign: "center",
      }}>
        <AnimatedText delay={0}>
          <HandsHeart progress={illustrationProgress} />
        </AnimatedText>

        <AnimatedText delay={30}>
          <div style={{
            fontSize: 80,
            fontWeight: 900,
            color: colors.text,
            letterSpacing: "-3px",
            lineHeight: 1,
          }}>
            Build things{" "}
            <span style={{ color: colors.accent }}>people love.</span>
          </div>
        </AnimatedText>

        <AnimatedText delay={50}>
          <div style={{ fontSize: 20, color: colors.textMuted, maxWidth: 540 }}>
            Application engineering is the craft of turning code into experience.
          </div>
        </AnimatedText>

        <AnimatedText delay={65}>
          <div style={{ display: "flex", gap: 32, marginTop: 8 }}>
            {[
              { icon: "👥", label: "Know your users" },
              { icon: "🔬", label: "Master the primitives" },
              { icon: "🤖", label: "Engineer for AI" },
            ].map(item => (
              <div key={item.label} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: "12px 16px",
                background: colors.accentLight + "33",
                border: `1.5px solid ${colors.accent}`,
                borderRadius: 12,
              }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: colors.accent }}>{item.label}</span>
              </div>
            ))}
          </div>
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

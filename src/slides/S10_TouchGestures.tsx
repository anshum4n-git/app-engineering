import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const gestures = [
  { label: "Tap", angle: -70, iconPath: "M0,-12 L0,12", delay: 5 },
  { label: "Swipe →", angle: -30, iconPath: "M-12,0 L12,0", delay: 10 },
  { label: "Swipe ↓", angle: 10, iconPath: "M0,-12 L0,12", delay: 15 },
  { label: "Pinch", angle: 50, iconPath: "M-8,-8 L8,8 M8,-8 L-8,8", delay: 20 },
  { label: "Long press", angle: 90, iconPath: "M0,-14 L0,14", delay: 25 },
];

const HandGestureIllustration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <svg width="380" height="280" viewBox="0 0 380 280" fill="none">
      {/* Large hand outline */}
      <g transform="translate(140, 40)">
        {/* Palm */}
        <ellipse cx="50" cy="160" rx="45" ry="55" stroke={colors.stroke} strokeWidth="2" fill={colors.accentLight + "33"} />
        {/* Fingers */}
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x={10 + i * 22} y={60} width={16} height={80} rx={8}
            stroke={colors.stroke} strokeWidth="2" fill={colors.accentLight + "33"} />
        ))}
        {/* Thumb */}
        <ellipse cx={-15} cy={140} rx={12} ry={28} stroke={colors.stroke} strokeWidth="2" fill={colors.accentLight + "33"} />
        {/* Fingertip tap point */}
        <circle cx="38" cy="55" r="6" fill={colors.accent} style={{
          opacity: interpolate(
            spring({ frame, fps, config: { damping: 200 } }),
            [0, 1], [0, 1]
          )
        }} />
      </g>

      {/* Gesture labels radiating out */}
      {gestures.map((g, i) => {
        const progress = spring({ frame: frame - g.delay, fps, config: { damping: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const rad = (g.angle * Math.PI) / 180;
        const cx = 190;
        const cy = 140;
        const r = 130;
        const ex = cx + Math.cos(rad) * r;
        const ey = cy + Math.sin(rad) * r;
        const mx = cx + Math.cos(rad) * 70;
        const my = cy + Math.sin(rad) * 70;

        return (
          <g key={i} style={{ opacity }}>
            <line x1={mx} y1={my} x2={ex} y2={ey} stroke={colors.accent} strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx={ex} cy={ey} r={18} fill={colors.accentLight + "55"} stroke={colors.accent} strokeWidth="1.5" />
            <text x={ex} y={ey + 4} textAnchor="middle" fontSize="9" fill={colors.accent} fontWeight="700">
              {g.label}
            </text>
          </g>
        );
      })}

      {/* Fat finger miss indicator */}
      <g style={{ opacity: interpolate(spring({ frame: frame - 40, fps, config: { damping: 200 } }), [0, 1], [0, 1]) }}>
        <ellipse cx="300" cy="240" rx="22" ry="15" fill={colors.bad + "22"} stroke={colors.bad} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="300" y="264" textAnchor="middle" fontSize="9" fill={colors.bad}>fat finger!</text>
      </g>
    </svg>
  );
};

export const S10_TouchGestures: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", height: "100%", gap: 40 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24, justifyContent: "center" }}>
          <AnimatedText delay={0}>
            <div style={{ fontSize: 60, fontWeight: 800, color: colors.text, lineHeight: 1.1 }}>
              Tap ≠ Click.
            </div>
          </AnimatedText>

          <AnimatedText delay={15}>
            <div style={{ fontSize: 18, color: colors.textMuted, lineHeight: 1.6 }}>
              Fat fingers, swipe directions, long press, pinch zoom — all with <strong>zero hover state.</strong>
            </div>
          </AnimatedText>

          <AnimatedText delay={30}>
            <div style={{
              padding: "12px 18px",
              background: colors.bad + "11",
              border: `1.5px solid ${colors.bad}`,
              borderRadius: 10,
              fontSize: 15,
              color: colors.text,
            }}>
              Touch targets must be <strong style={{ color: colors.bad }}>at least 44×44px</strong> to be reliably hit
            </div>
          </AnimatedText>
        </div>

        <AnimatedText delay={10} style={{ display: "flex", alignItems: "center" }}>
          <HandGestureIllustration />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

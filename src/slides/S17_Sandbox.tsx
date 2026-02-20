import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const shields = [
  {
    label: "CORS",
    question: '"Can this origin talk to that server?"',
    color: "#8B5CF6",
    delay: 20,
  },
  {
    label: "CSRF",
    question: '"Did YOU actually send this request?"',
    color: colors.blue,
    delay: 32,
  },
  {
    label: "XSS",
    question: '"Is this script trying to steal your data?"',
    color: colors.bad,
    delay: 44,
  },
];

const BouncerIllustration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - 10, fps, config: { damping: 200 } });

  return (
    <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
      {/* Velvet rope */}
      <line x1="20" y1="145" x2="100" y2="145" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="145" r="5" fill="#9CA3AF" />
      <circle cx="100" cy="145" r="5" fill="#9CA3AF" />

      {/* Bouncer body */}
      <g style={{ opacity: interpolate(progress, [0, 1], [0, 1]) }}>
        {/* Head */}
        <circle cx="120" cy="50" r="22" stroke={colors.stroke} strokeWidth="2.5" fill={colors.sectionNum} />
        {/* Sunglasses */}
        <rect x="105" y="44" width="13" height="8" rx="4" fill={colors.stroke} />
        <rect x="121" y="44" width="13" height="8" rx="4" fill={colors.stroke} />
        <line x1="118" y1="48" x2="121" y2="48" stroke={colors.stroke} strokeWidth="1.5" />
        {/* Body - large bouncer */}
        <rect x="95" y="75" width="50" height="65" rx="8" stroke={colors.stroke} strokeWidth="2.5" fill={colors.accentLight + "55"} />
        {/* Arms */}
        <path d="M95 85 L70 110 L75 125" stroke={colors.stroke} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M145 85 L165 100" stroke={colors.stroke} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* STOP hand */}
        <ellipse cx="70" cy="130" rx="12" ry="14" stroke={colors.accent} strokeWidth="2" fill={colors.accentLight} />
        <text x="70" y="134" textAnchor="middle" fontSize="9" fill={colors.accent} fontWeight="700">STOP</text>
      </g>

      {/* Rejected figures */}
      {[
        { x: 30, y: 110, label: "CORS", color: "#8B5CF6", delay: 30 },
        { x: 55, y: 120, label: "CSRF", color: colors.blue, delay: 40 },
        { x: 15, y: 125, label: "XSS", color: colors.bad, delay: 50 },
      ].map((fig) => {
        const p = interpolate(
          spring({ frame: frame - fig.delay, fps, config: { damping: 200 } }),
          [0, 1], [0, 1]
        );
        return (
          <g key={fig.label} style={{ opacity: p }}>
            <circle cx={fig.x} cy={fig.y - 10} r="8" stroke={fig.color} strokeWidth="1.5" fill={fig.color + "22"} />
            <path d={`M${fig.x - 7} ${fig.y + 5} C${fig.x - 7} ${fig.y - 3} ${fig.x + 7} ${fig.y - 3} ${fig.x + 7} ${fig.y + 5}`}
              stroke={fig.color} strokeWidth="1.5" fill="none" />
            <text x={fig.x} y={fig.y + 20} textAnchor="middle" fontSize="7" fill={fig.color} fontWeight="700">{fig.label}</text>
            {/* X mark */}
            <text x={fig.x + 14} y={fig.y - 12} fontSize="12" fill={colors.bad}>✗</text>
          </g>
        );
      })}
    </svg>
  );
};

export const S17_Sandbox: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", height: "100%", gap: 40, alignItems: "center" }}>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <AnimatedText delay={0}>
            <div style={{ fontSize: 60, fontWeight: 800, color: colors.text }}>
              The browser is a <span style={{ color: colors.accent }}>bouncer.</span>
            </div>
          </AnimatedText>

          <AnimatedText delay={15}>
            <div style={{ fontSize: 18, color: colors.textMuted, lineHeight: 1.6 }}>
              It runs untrusted code from strangers on the internet — so it locks everything down.
            </div>
          </AnimatedText>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {shields.map(shield => (
              <AnimatedText key={shield.label} delay={shield.delay}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{
                    padding: "4px 12px",
                    background: shield.color + "22",
                    border: `2px solid ${shield.color}`,
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 800,
                    color: shield.color,
                    minWidth: 52,
                    textAlign: "center",
                  }}>
                    {shield.label}
                  </div>
                  <div style={{ fontSize: 16, color: colors.text, paddingTop: 4 }}>
                    {shield.question}
                  </div>
                </div>
              </AnimatedText>
            ))}
          </div>
        </div>

        <AnimatedText delay={10}>
          <BouncerIllustration />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

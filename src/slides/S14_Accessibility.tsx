import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const accessibilityTypes = [
  {
    label: "Visual",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M4 24 C8 14 40 14 44 24 C40 34 8 34 4 24Z" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="6" y1="6" x2="42" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#8B5CF6",
    example: "Screen reader, high contrast",
  },
  {
    label: "Auditory",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M20 8 C20 8 30 8 30 24 C30 32 24 38 18 38" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M8 18 C8 18 14 18 14 24 C14 30 8 30 8 30" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="6" y1="6" x2="42" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#3B82F6",
    example: "Captions, transcripts",
  },
  {
    label: "Motor",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M16 8 L20 18 L26 12 L28 24 L34 20 L32 34" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="34" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
    color: "#10B981",
    example: "Keyboard nav, large targets",
  },
  {
    label: "Cognitive",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M12 24 C12 14 22 8 28 12 C36 16 36 28 28 32 C24 34 20 32 18 30 L18 38" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="18" cy="40" r="2" fill="currentColor" />
        <path d="M26 20 L26 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    color: "#F59E0B",
    example: "Clear language, simple flows",
  },
];

const A11yCard: React.FC<{ type: typeof accessibilityTypes[0]; delay: number }> = ({ type, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div style={{
      opacity,
      transform: `translateY(${translateY}px)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      padding: "20px 16px",
      border: `2px solid ${type.color}`,
      borderRadius: 14,
      background: type.color + "0D",
      flex: 1,
    }}>
      <div style={{ color: type.color }}>
        {type.icon}
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: type.color }}>{type.label}</div>
      <div style={{ fontSize: 12, color: colors.textMuted, textAlign: "center" }}>{type.example}</div>
    </div>
  );
};

export const S14_Accessibility: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 28 }}>
        <AnimatedText delay={0}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: colors.text }}>
              1 in 4 adults
            </div>
            <div style={{ fontSize: 28, color: colors.textMuted }}>has a disability.</div>
          </div>
        </AnimatedText>

        <AnimatedText delay={15}>
          <div style={{ fontSize: 18, color: colors.textMuted }}>
            Accessibility is not a feature — it's the baseline.
          </div>
        </AnimatedText>

        <div style={{ display: "flex", gap: 20, flex: 1, alignItems: "center" }}>
          {accessibilityTypes.map((type, i) => (
            <A11yCard key={type.label} type={type} delay={20 + i * 12} />
          ))}
        </div>

        <AnimatedText delay={70}>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {/* Button variants */}
            {[
              { label: "Default", bg: colors.accent, text: "white", border: colors.accent },
              { label: "High contrast", bg: "black", text: "yellow", border: "yellow" },
              { label: "Screen reader", bg: colors.bg, text: colors.text, border: colors.strokeMuted, extra: '▶ "Submit button"' },
            ].map(btn => (
              <div key={btn.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ fontSize: 10, color: colors.textMuted }}>{btn.label}</div>
                <div style={{
                  padding: "8px 16px",
                  background: btn.bg,
                  color: btn.text,
                  border: `2px solid ${btn.border}`,
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                }}>
                  Submit{btn.extra ? <span style={{ fontSize: 10, display: "block", color: colors.textMuted }}>{btn.extra}</span> : null}
                </div>
              </div>
            ))}
          </div>
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

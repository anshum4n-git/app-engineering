import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const buttonStyles = [
  { rx: 6, padding: "10px 20px", fontSize: 14, fontWeight: 700, border: `2px solid ${colors.blue}`, color: colors.blue, bg: colors.blue + "11" },
  { rx: 20, padding: "12px 28px", fontSize: 13, fontWeight: 600, border: `1px solid #8B5CF6`, color: "#8B5CF6", bg: "#8B5CF611" },
  { rx: 0, padding: "8px 16px", fontSize: 15, fontWeight: 800, border: `3px solid ${colors.accent}`, color: colors.accent, bg: colors.accent + "11" },
  { rx: 10, padding: "14px 22px", fontSize: 12, fontWeight: 500, border: `2px dashed ${colors.good}`, color: colors.good, bg: colors.good + "11" },
  { rx: 4, padding: "9px 18px", fontSize: 14, fontWeight: 700, border: `2px solid ${colors.text}`, color: colors.text, bg: colors.sectionNum },
];

const InconsistentButtons: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
      {buttonStyles.map((style, i) => {
        const progress = spring({ frame: frame - 20 - i * 12, fps, config: { damping: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const translateY = interpolate(progress, [0, 1], [20, 0]);

        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity, transform: `translateY(${translateY}px)` }}>
            <div style={{
              padding: style.padding,
              fontSize: style.fontSize,
              fontWeight: style.fontWeight,
              borderRadius: style.rx,
              border: style.border,
              color: style.color,
              background: style.bg,
            }}>
              Submit
            </div>
            <div style={{ fontSize: 11, color: colors.textMuted }}>Attempt {i + 1}</div>
          </div>
        );
      })}
    </div>
  );
};

export const S28_AICode: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 28 }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 52, fontWeight: 800, color: colors.text }}>
            AI sees. AI generates. <span style={{ color: colors.bad }}>AI diverges.</span>
          </div>
        </AnimatedText>

        <AnimatedText delay={15}>
          <div style={{ fontSize: 18, color: colors.textMuted }}>
            Ask AI to build a button five times. You get five buttons — great code, inconsistent system.
          </div>
        </AnimatedText>

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <InconsistentButtons />
        </div>

        <AnimatedText delay={100}>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{
              flex: 1,
              padding: "12px 16px",
              background: colors.bad + "11",
              border: `1.5px solid ${colors.bad}`,
              borderRadius: 10,
              fontSize: 15,
              color: colors.text,
            }}>
              <strong style={{ color: colors.bad }}>Inconsistency</strong> gets noticed more in UI than anywhere else in software
            </div>
            <div style={{
              flex: 1,
              padding: "12px 16px",
              background: colors.good + "11",
              border: `1.5px solid ${colors.good}`,
              borderRadius: 10,
              fontSize: 15,
              color: colors.text,
            }}>
              Achieving <strong style={{ color: colors.good }}>consistency</strong> is hard — and worth engineering for upfront
            </div>
          </div>
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

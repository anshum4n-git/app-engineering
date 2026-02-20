import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const goodSteps = [
  { label: "Design tokens", icon: "🎨" },
  { label: "Component library", icon: "🧩" },
  { label: "AI uses library", icon: "🤖" },
  { label: "Consistent output", icon: "✅" },
];

const FlowPath: React.FC<{ good: boolean }> = ({ good }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const baseDelay = good ? 15 : 60;
  const steps = good ? goodSteps : [
    { label: "No system", icon: "❓" },
    { label: "AI freestyles", icon: "🤖" },
    { label: "Random output", icon: "💥" },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {steps.map((step, i) => {
        const progress = spring({ frame: frame - baseDelay - i * 10, fps, config: { damping: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const translateX = interpolate(progress, [0, 1], [-20, 0]);

        return (
          <div key={step.label} style={{ display: "flex", alignItems: "center", opacity, transform: `translateX(${translateX}px)` }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "10px 14px",
              borderRadius: 10,
              border: `2px solid ${good ? colors.good : colors.bad}`,
              background: good ? colors.good + "0D" : colors.bad + "0D",
              minWidth: 90,
            }}>
              <span style={{ fontSize: 20 }}>{step.icon}</span>
              <span style={{ fontSize: 11, color: good ? colors.good : colors.bad, fontWeight: 600, textAlign: "center" }}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ padding: "0 6px", fontSize: 18, color: good ? colors.good : colors.bad }}>→</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const S29_BuildSystem: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 28 }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 56, fontWeight: 800, color: colors.text }}>
            Design systems + AI = <span style={{ color: colors.good }}>leverage.</span>
          </div>
        </AnimatedText>

        <AnimatedText delay={15}>
          <div style={{ fontSize: 18, color: colors.textMuted }}>
            Give AI a track to run on. Constraints produce coherence.
          </div>
        </AnimatedText>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 32 }}>
          {/* Good path */}
          <AnimatedText delay={15}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: colors.good, width: 24 }}>✅</div>
              <FlowPath good={true} />
            </div>
          </AnimatedText>

          {/* Divider */}
          <div style={{ height: 2, background: colors.sectionNum, borderRadius: 1 }} />

          {/* Bad path */}
          <AnimatedText delay={60}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: colors.bad, width: 24 }}>❌</div>
              <FlowPath good={false} />
            </div>
          </AnimatedText>
        </div>

        <AnimatedText delay={95}>
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { label: "Design tokens", detail: "Colors, spacing, typography as code" },
              { label: "Component library", detail: "Reusable, documented, tested" },
              { label: "AI as a builder", detail: "Uses your system, not its imagination" },
            ].map(item => (
              <div key={item.label} style={{
                flex: 1,
                padding: "10px 14px",
                background: colors.accentLight + "33",
                borderRadius: 10,
                borderLeft: `3px solid ${colors.accent}`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: colors.accent }}>{item.label}</div>
                <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 3 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

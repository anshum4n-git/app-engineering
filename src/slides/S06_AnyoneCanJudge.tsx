import React from "react";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

type DetailItemProps = { good: boolean; text: string };
const DetailItem: React.FC<DetailItemProps> = ({ good, text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
    <div style={{
      width: 22, height: 22, borderRadius: "50%",
      background: good ? colors.good + "22" : colors.bad + "22",
      border: `2px solid ${good ? colors.good : colors.bad}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, color: good ? colors.good : colors.bad, fontWeight: 700, flexShrink: 0,
    }}>
      {good ? "✓" : "✗"}
    </div>
    <span style={{ fontSize: 16, color: colors.text }}>{text}</span>
  </div>
);

const UIPanel: React.FC<{ title: string; border: string; items: { good: boolean; text: string }[]; note?: string }> = ({ title, border, items, note }) => (
  <div style={{
    flex: 1,
    border: `2px solid ${border}`,
    borderRadius: 16,
    padding: 28,
    background: "white",
  }}>
    <div style={{ fontSize: 14, fontWeight: 700, color: border, letterSpacing: 1, marginBottom: 16, textTransform: "uppercase" }}>{title}</div>
    {items.map((item, i) => <DetailItem key={i} good={item.good} text={item.text} />)}
    {note && (
      <div style={{ marginTop: 14, padding: "8px 12px", background: border + "11", borderRadius: 8, fontSize: 13, color: colors.textMuted, fontStyle: "italic" }}>
        {note}
      </div>
    )}
  </div>
);

// Wireframe mockup of good vs bad
const WireframePair: React.FC = () => (
  <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
    {/* Good UI */}
    <svg width="140" height="90" viewBox="0 0 140 90" fill="none">
      <rect x="2" y="2" width="136" height="86" rx="8" stroke={colors.good} strokeWidth="1.5" fill="white" />
      <rect x="12" y="12" width="60" height="12" rx="3" fill={colors.sectionNum} />
      <rect x="80" y="12" width="48" height="12" rx="3" fill={colors.sectionNum} />
      <rect x="12" y="35" width="116" height="8" rx="2" fill={colors.sectionNum} />
      <rect x="12" y="48" width="80" height="8" rx="2" fill={colors.sectionNum} />
      <rect x="36" y="66" width="68" height="18" rx="6" fill={colors.good + "33"} stroke={colors.good} strokeWidth="1.5" />
      <text x="70" y="79" textAnchor="middle" fontSize="9" fill={colors.good} fontWeight="600">Continue →</text>
    </svg>
    {/* Bad UI */}
    <svg width="140" height="90" viewBox="0 0 140 90" fill="none">
      <rect x="2" y="2" width="136" height="86" rx="8" stroke={colors.bad} strokeWidth="1.5" fill="white" />
      <rect x="12" y="12" width="60" height="12" rx="3" fill={colors.sectionNum} />
      {/* Misaligned icon */}
      <rect x="83" y="9" width="48" height="18" rx="3" fill={colors.sectionNum} />
      <rect x="12" y="35" width="116" height="8" rx="2" fill={colors.sectionNum} />
      <rect x="12" y="48" width="80" height="8" rx="2" fill={colors.sectionNum} />
      {/* Clipped button text */}
      <rect x="20" y="66" width="100" height="18" rx="6" fill={colors.bad + "22"} stroke={colors.bad} strokeWidth="1.5" />
      <text x="70" y="79" textAnchor="middle" fontSize="9" fill={colors.bad} fontWeight="600">Continue to Next Ste</text>
      {/* Wobbly arrow */}
      <path d="M115 35 C118 32 122 38 118 40" stroke={colors.bad} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

export const S06_AnyoneCanJudge: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 24 }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 48, fontWeight: 800, color: colors.text }}>
            You don't need to be a designer{" "}
            <span style={{ color: colors.accent }}>to spot this.</span>
          </div>
        </AnimatedText>

        <AnimatedText delay={15}>
          <div style={{ display: "flex", gap: 24 }}>
            <UIPanel
              title="✓ This feels right"
              border={colors.good}
              items={[
                { good: true, text: "Button padding is even" },
                { good: true, text: "Icon and label perfectly aligned" },
                { good: true, text: "Hover state responds instantly" },
              ]}
              note="Feels trustworthy — users stay"
            />
            <UIPanel
              title="✗ This feels off"
              border={colors.bad}
              items={[
                { good: false, text: "Button text clips on mobile" },
                { good: false, text: "Spinner keeps spinning after load" },
                { good: false, text: "Page jumps when image loads" },
              ]}
              note="Feels broken — users leave"
            />
          </div>
        </AnimatedText>

        <AnimatedText delay={35}>
          <WireframePair />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

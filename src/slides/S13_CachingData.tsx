import React from "react";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const CachingCard: React.FC = () => (
  <div style={{
    flex: 1,
    border: `2px solid ${colors.blue}`,
    borderRadius: 16,
    padding: 28,
    background: "white",
  }}>
    <div style={{ fontSize: 13, fontWeight: 700, color: colors.blue, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>
      Caching
    </div>
    <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, marginBottom: 14 }}>
      What the user sees ≠ what you deployed.
    </div>
    <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
      {/* User viewing stale cached page */}
      <rect x="10" y="30" width="80" height="55" rx="6" stroke={colors.strokeMuted} strokeWidth="2" fill={colors.sectionNum} />
      <text x="50" y="62" textAnchor="middle" fontSize="9" fill={colors.textMuted}>v1.0 (cached)</text>
      {/* New version floating above */}
      <rect x="10" y="5" width="80" height="20" rx="4" stroke={colors.blue} strokeWidth="1.5" fill={colors.blue + "11"} strokeDasharray="4 3" />
      <text x="50" y="18" textAnchor="middle" fontSize="8" fill={colors.blue}>v2.0 deployed ✓</text>
      {/* User icon */}
      <circle cx="150" cy="45" r="14" stroke={colors.strokeMuted} strokeWidth="2" fill={colors.sectionNum} />
      <path d="M136 75 C136 60 164 60 164 75" stroke={colors.strokeMuted} strokeWidth="2" fill="none" />
      {/* Arrow */}
      <line x1="95" y1="55" x2="134" y2="52" stroke={colors.strokeMuted} strokeWidth="1.5" markerEnd="url(#arrowBlue)" />
      <path d="M130 48 L136 52 L130 56" stroke={colors.strokeMuted} strokeWidth="1.5" fill="none" />
      {/* Confused face */}
      <text x="150" y="90" textAnchor="middle" fontSize="9" fill={colors.textMuted}>confused 🤔</text>
    </svg>
  </div>
);

const DataCard: React.FC = () => (
  <div style={{
    flex: 1,
    border: `2px solid ${colors.accent}`,
    borderRadius: 16,
    padding: 28,
    background: "white",
  }}>
    <div style={{ fontSize: 13, fontWeight: 700, color: colors.accent, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>
      Data Variability
    </div>
    <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, marginBottom: 14 }}>
      Your test data is lying to you.
    </div>

    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      {/* Dev data */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: colors.good, marginBottom: 6 }}>DEV</div>
        {["Item A", "Item B", "Item C"].map(item => (
          <div key={item} style={{
            padding: "4px 8px", marginBottom: 4,
            background: colors.good + "11", border: `1px solid ${colors.good}`,
            borderRadius: 6, fontSize: 12, color: colors.text
          }}>{item}</div>
        ))}
      </div>

      {/* Arrow */}
      <div style={{ fontSize: 20, paddingTop: 20 }}>→</div>

      {/* Prod data */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: colors.bad, marginBottom: 6 }}>PRODUCTION</div>
        {[
          { text: "(empty)", style: { color: colors.bad, fontStyle: "italic" } },
          { text: "مرحبا بالعالم", style: { color: colors.text, direction: "rtl" as const } },
          { text: "🎉🎊🎈🎁🥳", style: { color: colors.text } },
          { text: "Item with a very long title that definitely overflows the container width", style: { color: colors.text, fontSize: 9 } },
        ].map((item, i) => (
          <div key={i} style={{
            padding: "4px 8px", marginBottom: 4,
            background: colors.bad + "11", border: `1px solid ${colors.bad}`,
            borderRadius: 6, fontSize: 12, overflow: "hidden",
            maxWidth: 130, ...item.style
          }}>{item.text}</div>
        ))}
      </div>
    </div>
  </div>
);

export const S13_CachingData: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 28 }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 52, fontWeight: 800, color: colors.text }}>
            The data will surprise you.
          </div>
        </AnimatedText>

        <AnimatedText delay={15} style={{ display: "flex", gap: 28, flex: 1 }}>
          <CachingCard />
          <DataCard />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

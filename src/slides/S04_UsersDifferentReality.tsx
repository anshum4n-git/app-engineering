import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

type MockupProps = {
  label: string;
  labelColor: string;
  delay: number;
  children: React.ReactNode;
};

const PhoneMockup: React.FC<MockupProps> = ({ label, labelColor, delay, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [50, 0]);

  return (
    <div style={{ opacity, transform: `translateY(${translateY}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: labelColor, letterSpacing: 1, textTransform: "uppercase" }}>{label}</div>
      <svg width="140" height="240" viewBox="0 0 140 240" fill="none">
        <rect x="5" y="5" width="130" height="230" rx="16" stroke={colors.stroke} strokeWidth="2.5" fill="white" />
        <rect x="5" y="5" width="130" height="32" rx="16" fill={colors.sectionNum} />
        <rect x="5" y="21" width="130" height="16" fill={colors.sectionNum} />
        <circle cx="70" cy="21" r="5" fill={colors.strokeMuted} />
        {children}
      </svg>
    </div>
  );
};

export const S04_UsersDifferentReality: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 28 }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 52, fontWeight: 800, color: colors.text }}>
            Same code. <span style={{ color: colors.accent }}>Different reality.</span>
          </div>
        </AnimatedText>

        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start", flex: 1 }}>

          {/* Rose mockup */}
          <PhoneMockup label="Rose, 72" labelColor="#8B5CF6" delay={15}>
            {/* Large button, misclick indicator */}
            <rect x="20" y="60" width="100" height="50" rx="10" stroke="#8B5CF6" strokeWidth="2" fill="#8B5CF622" />
            <text x="70" y="90" textAnchor="middle" fontSize="11" fill="#8B5CF6" fontWeight="600">NEXT →</text>
            {/* Finger pressing wrong area */}
            <ellipse cx="90" cy="130" rx="18" ry="12" fill="#8B5CF633" />
            <text x="70" y="155" textAnchor="middle" fontSize="9" fill={colors.textMuted}>finger aimed here...</text>
            <text x="70" y="168" textAnchor="middle" fontSize="9" fill={colors.bad}>hit the wrong button</text>
            {/* Zoomed text */}
            <text x="70" y="200" textAnchor="middle" fontSize="14" fill={colors.textMuted} fontWeight="700">AA</text>
            <text x="70" y="218" textAnchor="middle" fontSize="9" fill={colors.textMuted}>font zoomed in</text>
          </PhoneMockup>

          {/* Jake mockup */}
          <PhoneMockup label="Jake, 8" labelColor={colors.blue} delay={30}>
            {/* Rapid tap indicators */}
            <circle cx="45" cy="100" r="8" stroke={colors.blue} strokeWidth="1.5" fill="none" />
            <circle cx="95" cy="80" r="8" stroke={colors.blue} strokeWidth="1.5" fill="none" />
            <circle cx="70" cy="120" r="8" stroke={colors.blue} strokeWidth="1.5" fill="none" />
            <text x="70" y="160" textAnchor="middle" fontSize="9" fill={colors.textMuted}>rapid taps</text>
            {/* Spinner */}
            <circle cx="70" cy="190" r="14" stroke={colors.blue} strokeWidth="2" fill="none" strokeDasharray="40 20" />
            <text x="70" y="215" textAnchor="middle" fontSize="9" fill={colors.bad}>still loading...</text>
          </PhoneMockup>

          {/* Carlos mockup */}
          <PhoneMockup label="Carlos, 19" labelColor="#F59E0B" delay={45}>
            {/* Skeleton loading */}
            <rect x="20" y="55" width="100" height="60" rx="6" fill={colors.sectionNum} />
            <text x="70" y="90" textAnchor="middle" fontSize="9" fill={colors.textMuted}>image loading...</text>
            <rect x="20" y="125" width="80" height="10" rx="3" fill={colors.sectionNum} />
            <rect x="20" y="140" width="60" height="10" rx="3" fill={colors.sectionNum} />
            {/* Slow network banner */}
            <rect x="10" y="195" width="120" height="22" rx="4" fill="#FEF3C7" />
            <text x="70" y="209" textAnchor="middle" fontSize="9" fill="#92400E" fontWeight="600">⚠ Slow connection</text>
          </PhoneMockup>

        </div>

        <AnimatedText delay={70} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 15, color: colors.textMuted }}>
            The app doesn't change. The world around it does.
          </div>
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const devices = [
  { label: "$50 Android", cpu: "Quad-core 1.4GHz", ram: "2GB", tier: 0.1, color: colors.bad },
  { label: "Mid-range Phone", cpu: "Octa-core 2.0GHz", ram: "4GB", tier: 0.4, color: "#F97316" },
  { label: "iPhone 15", cpu: "A16 Bionic", ram: "6GB", tier: 0.75, color: "#FBBF24" },
  { label: "Dev Laptop", cpu: "M3 Pro", ram: "36GB", tier: 1, color: colors.good },
];

const PerformanceBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {/* Bar track */}
      <div style={{ height: 28, background: colors.sectionNum, borderRadius: 14, overflow: "hidden", position: "relative" }}>
        {/* Gradient fill */}
        <div style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: `${interpolate(
            spring({ frame: frame - 20, fps, config: { damping: 150 } }),
            [0, 1], [0, 100]
          )}%`,
          background: `linear-gradient(to right, ${colors.bad}, #F97316, #FBBF24, ${colors.good})`,
          borderRadius: 14,
        }} />
      </div>

      {/* Device markers */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        {devices.map((dev, i) => {
          const progress = spring({ frame: frame - 10 - i * 10, fps, config: { damping: 200 } });
          const opacity = interpolate(progress, [0, 1], [0, 1]);
          const translateY = interpolate(progress, [0, 1], [20, 0]);

          return (
            <div key={dev.label} style={{ opacity, transform: `translateY(${translateY}px)`, textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: dev.color }}>{dev.label}</div>
              <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 4 }}>{dev.cpu}</div>
              <div style={{ fontSize: 11, color: colors.textMuted }}>{dev.ram} RAM</div>
            </div>
          );
        })}
      </div>

      {/* Ice and fire endpoints */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, alignItems: "center" }}>
        <div style={{ fontSize: 28 }}>🧊</div>
        <AnimatedText delay={50}>
          <div style={{ fontSize: 15, color: colors.textMuted, fontStyle: "italic" }}>
            Your MacBook Pro is not their phone
          </div>
        </AnimatedText>
        <div style={{ fontSize: 28 }}>🔥</div>
      </div>
    </div>
  );
};

export const S12_DevicePerformance: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 28 }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 56, fontWeight: 800, color: colors.text }}>
            Your MacBook Pro is not <span style={{ color: colors.bad }}>their phone.</span>
          </div>
        </AnimatedText>

        <AnimatedText delay={15}>
          <div style={{ fontSize: 20, color: colors.textMuted }}>
            CPU speed, RAM, GPU tier — wildly different across the user base.
          </div>
        </AnimatedText>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <PerformanceBar />
        </div>
      </div>
    </SlideWrapper>
  );
};

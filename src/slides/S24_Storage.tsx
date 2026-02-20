import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const LocalStorageDrawer: React.FC<{ progress: number }> = ({ progress }) => (
  <svg width="160" height="180" viewBox="0 0 160 180" fill="none">
    {/* Cabinet */}
    <rect x="20" y="10" width="120" height="160" rx="6" stroke={colors.blue} strokeWidth="2" fill={colors.blue + "0D"} />
    {/* 5 small folders */}
    {[0, 1, 2, 3, 4].map(i => {
      const p = interpolate(progress, [i * 0.12, i * 0.12 + 0.2], [0, 1], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
      });
      return (
        <g key={i} style={{ opacity: p }}>
          <rect x={32} y={25 + i * 27} width={96} height={20} rx={4} fill={colors.blue + "33"} stroke={colors.blue} strokeWidth="1.5" />
          <text x={80} y={39 + i * 27} textAnchor="middle" fontSize="9" fill={colors.blue} fontWeight="600">
            key_{i + 1}: "value"
          </text>
        </g>
      );
    })}
    {/* 5MB badge */}
    <rect x="50" y="160" width="60" height="16" rx="6" fill={colors.blue + "22"} stroke={colors.blue} strokeWidth="1" />
    <text x="80" y="172" textAnchor="middle" fontSize="8" fill={colors.blue} fontWeight="700">~5MB limit</text>
  </svg>
);

const IndexedDBDrawer: React.FC<{ progress: number }> = ({ progress }) => (
  <svg width="200" height="180" viewBox="0 0 200 180" fill="none">
    {/* Large cabinet room */}
    <rect x="10" y="10" width="180" height="160" rx="6" stroke={colors.accent} strokeWidth="2" fill={colors.accent + "0D"} />
    {/* Many folders - 3 columns */}
    {[0, 1, 2].map(col =>
      [0, 1, 2, 3, 4].map(row => {
        const i = col * 5 + row;
        const p = interpolate(progress, [i * 0.04, i * 0.04 + 0.15], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        });
        return (
          <rect key={i} style={{ opacity: p }}
            x={20 + col * 57} y={20 + row * 26}
            width={50} height={20} rx={3}
            fill={colors.accent + "33"} stroke={colors.accent} strokeWidth="1"
          />
        );
      })
    )}
    {/* Async badge */}
    <rect x="35" y="158" width="130" height="16" rx="6" fill={colors.accent + "22"} stroke={colors.accent} strokeWidth="1" />
    <text x="100" y="170" textAnchor="middle" fontSize="8" fill={colors.accent} fontWeight="700">async · large storage · offline</text>
  </svg>
);

export const S24_Storage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lsProgress = spring({ frame: frame - 25, fps, config: { damping: 120 }, durationInFrames: 60 });
  const idbProgress = spring({ frame: frame - 25, fps, config: { damping: 120 }, durationInFrames: 70 });

  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 28 }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 60, fontWeight: 800, color: colors.text }}>
            Data that lives on <span style={{ color: colors.accent }}>the device.</span>
          </div>
        </AnimatedText>

        <div style={{ display: "flex", gap: 40, flex: 1, alignItems: "flex-start" }}>
          {/* localStorage */}
          <AnimatedText delay={15} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.blue }}>localStorage</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                "✓ Simple key-value store",
                "✓ Persists across sessions",
                "✗ ~5MB limit",
                "✗ Synchronous (blocks thread)",
              ].map(item => (
                <div key={item} style={{ fontSize: 15, color: item.startsWith("✗") ? colors.bad : colors.good }}>{item}</div>
              ))}
            </div>
            <LocalStorageDrawer progress={lsProgress} />
          </AnimatedText>

          <div style={{ width: 2, background: colors.sectionNum, alignSelf: "stretch", marginTop: 8 }} />

          {/* IndexedDB */}
          <AnimatedText delay={25} style={{ flex: 1.2, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.accent }}>IndexedDB</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                "✓ Full database in the browser",
                "✓ Async — doesn't block",
                "✓ Large storage (GBs)",
                "✓ Perfect for offline-first apps",
              ].map(item => (
                <div key={item} style={{ fontSize: 15, color: colors.good }}>{item}</div>
              ))}
            </div>
            <IndexedDBDrawer progress={idbProgress} />
          </AnimatedText>
        </div>
      </div>
    </SlideWrapper>
  );
};

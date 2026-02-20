import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const featureCards = [
  {
    label: "WebRTC",
    icon: "📹",
    color: "#8B5CF6",
    description: "Peer-to-peer video/audio. No server in the middle.",
    example: "Think Google Meet, Zoom web",
  },
  {
    label: "Video & Audio",
    icon: "🎬",
    color: colors.blue,
    description: "Native media playback, recording, streaming.",
    example: "Full media pipeline in the browser",
  },
  {
    label: "WASM",
    icon: "⚡",
    color: colors.accent,
    description: "Run C, Rust, Go at near-native speed.",
    example: "Figma, AutoCAD, game engines",
  },
  {
    label: "WebGL / WebGPU",
    icon: "🧊",
    color: colors.good,
    description: "GPU-accelerated 3D graphics and shaders.",
    example: "Real-time 3D, data viz, games",
  },
];

type FeatureCardProps = { card: typeof featureCards[0]; delay: number };

const FeatureCard: React.FC<FeatureCardProps> = ({ card, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.85, 1]);

  return (
    <div style={{
      opacity,
      transform: `scale(${scale})`,
      flex: 1,
      padding: "20px 18px",
      border: `2px solid ${card.color}`,
      borderRadius: 16,
      background: card.color + "0D",
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}>
      <div style={{ fontSize: 28 }}>{card.icon}</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: card.color }}>{card.label}</div>
      <div style={{ fontSize: 13, color: colors.text, lineHeight: 1.4 }}>{card.description}</div>
      <div style={{ fontSize: 11, color: colors.textMuted, fontStyle: "italic", marginTop: 4 }}>{card.example}</div>
    </div>
  );
};

export const S26_WebRTCEtc: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 28 }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 60, fontWeight: 800, color: colors.text }}>
            The browser is a <span style={{ color: colors.accent }}>platform.</span>
          </div>
        </AnimatedText>

        <AnimatedText delay={12}>
          <div style={{ fontSize: 18, color: colors.textMuted }}>
            Far more than a document viewer. It's a full application runtime.
          </div>
        </AnimatedText>

        <div style={{ display: "flex", gap: 16, flex: 1, alignItems: "stretch" }}>
          {featureCards.map((card, i) => (
            <FeatureCard key={card.label} card={card} delay={20 + i * 12} />
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
};

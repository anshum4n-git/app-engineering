import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const SWDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const packetProgress = spring({ frame: frame - 30, fps, config: { damping: 120 }, durationInFrames: 60 });
  const cacheProgress = spring({ frame: frame - 45, fps, config: { damping: 150 } });

  // Packet goes: Browser → SW → Cache (illustrative)
  const packetX = interpolate(packetProgress, [0, 0.4, 0.7, 1], [60, 200, 200, 340]);

  return (
    <svg width="420" height="280" viewBox="0 0 420 280" fill="none">
      {/* Browser tab */}
      <rect x="10" y="100" width="90" height="70" rx="8" stroke={colors.stroke} strokeWidth="2" fill={colors.sectionNum} />
      <text x="55" y="125" textAnchor="middle" fontSize="11" fill={colors.textMuted} fontWeight="600">Browser</text>
      <text x="55" y="142" textAnchor="middle" fontSize="18">💻</text>
      <text x="55" y="162" textAnchor="middle" fontSize="9" fill={colors.textMuted}>tab</text>

      {/* Service Worker - middle */}
      <rect x="155" y="95" width="110" height="80" rx="8" stroke={colors.accent} strokeWidth="2.5" fill={colors.accentLight + "44"} />
      <text x="210" y="120" textAnchor="middle" fontSize="11" fill={colors.accent} fontWeight="700">Service</text>
      <text x="210" y="134" textAnchor="middle" fontSize="11" fill={colors.accent} fontWeight="700">Worker</text>
      <text x="210" y="155" textAnchor="middle" fontSize="20">🚦</text>
      <text x="210" y="170" textAnchor="middle" fontSize="8" fill={colors.accent}>traffic cop</text>

      {/* Network */}
      <rect x="320" y="60" width="90" height="60" rx="8" stroke={colors.blue} strokeWidth="2" fill={colors.blue + "11"} />
      <text x="365" y="85" textAnchor="middle" fontSize="11" fill={colors.blue} fontWeight="600">Network</text>
      <text x="365" y="108" textAnchor="middle" fontSize="14">🌐</text>

      {/* Cache */}
      <rect x="320" y="150" width="90" height="60" rx="8" stroke={colors.good} strokeWidth="2" fill={colors.good + "11"} />
      <text x="365" y="175" textAnchor="middle" fontSize="11" fill={colors.good} fontWeight="600">Cache</text>
      <text x="365" y="198" textAnchor="middle" fontSize="14">💾</text>

      {/* Arrows */}
      <line x1="102" y1="135" x2="153" y2="135" stroke={colors.strokeMuted} strokeWidth="1.5" markerEnd="url(#arrow)" />
      <line x1="267" y1="115" x2="318" y2="90" stroke={colors.strokeMuted} strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="267" y1="155" x2="318" y2="178" stroke={colors.good} strokeWidth="2" />
      <path d="M313 173 L320 178 L313 183" stroke={colors.good} strokeWidth="1.5" fill="none" />

      {/* Offline mode badge */}
      <g style={{ opacity: interpolate(cacheProgress, [0, 1], [0, 1]) }}>
        <rect x="310" y="220" width="100" height="24" rx="8" fill={colors.good + "22"} stroke={colors.good} strokeWidth="1.5" />
        <text x="360" y="236" textAnchor="middle" fontSize="9" fill={colors.good} fontWeight="700">✓ Offline mode</text>
      </g>

      {/* Traveling packet */}
      {packetProgress > 0 && (
        <circle cx={packetX} cy={135} r={6} fill={colors.accent}
          style={{ opacity: interpolate(packetProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]) }}
        />
      )}
    </svg>
  );
};

export const S25_ServiceWorkerPWA: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", height: "100%", gap: 40, alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 22 }}>
          <AnimatedText delay={0}>
            <div style={{ fontSize: 56, fontWeight: 800, color: colors.text, lineHeight: 1.1 }}>
              Your app can work <span style={{ color: colors.good }}>offline.</span>
            </div>
          </AnimatedText>

          <AnimatedText delay={15}>
            <div style={{ fontSize: 18, color: colors.textMuted, lineHeight: 1.6 }}>
              A Service Worker intercepts all network requests — enabling caching, background sync, and push notifications.
            </div>
          </AnimatedText>

          <AnimatedText delay={30}>
            <div style={{
              padding: "16px 20px",
              background: colors.accent + "11",
              border: `2px solid ${colors.accent}`,
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: colors.accent }}>PWA = Progressive Web App</div>
              <div style={{ fontSize: 14, color: colors.text }}>📲 Install to home screen</div>
              <div style={{ fontSize: 14, color: colors.text }}>📡 Works offline</div>
              <div style={{ fontSize: 14, color: colors.text }}>🔔 Push notifications</div>
              <div style={{ fontSize: 14, color: colors.text }}>⚡ Feels native</div>
            </div>
          </AnimatedText>
        </div>

        <AnimatedText delay={20}>
          <SWDiagram />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

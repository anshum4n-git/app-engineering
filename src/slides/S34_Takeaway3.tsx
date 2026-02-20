import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const RaceTrackIllustration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const carProgress = spring({ frame: frame - 20, fps, config: { damping: 120 }, durationInFrames: 70 });
  const chaosProgress = spring({ frame: frame - 35, fps, config: { damping: 150 } });

  const carX = interpolate(carProgress, [0, 1], [20, 260]);

  return (
    <svg width="340" height="260" viewBox="0 0 340 260" fill="none">
      {/* === TOP: Race car on track === */}
      <text x="170" y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill={colors.good}>✅ AI + Design System</text>

      {/* Track */}
      <rect x="10" y="25" width="310" height="50" rx="8" fill={colors.sectionNum} />
      {/* Lane line */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <rect key={i} x={20 + i * 48} y={48} width={28} height={4} rx={2} fill="white" style={{ opacity: 0.7 }} />
      ))}
      {/* Track borders */}
      <rect x="10" y="25" width="310" height="6" rx="4" fill={colors.good + "44"} />
      <rect x="10" y="69" width="310" height="6" rx="4" fill={colors.good + "44"} />

      {/* Race car */}
      <g transform={`translate(${carX}, 30)`}>
        <rect x="0" y="3" width="38" height="22" rx="6" fill={colors.accent} />
        <rect x="6" y="0" width="26" height="12" rx="4" fill={colors.accentLight} />
        <circle cx="8" cy="26" r="6" fill={colors.stroke} />
        <circle cx="30" cy="26" r="6" fill={colors.stroke} />
        <text x="19" y="16" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">AI</text>
      </g>

      {/* Finish flag */}
      <g style={{ opacity: interpolate(carProgress, [0.8, 1], [0, 1], { extrapolateLeft: "clamp" }) }}>
        <line x1="310" y1="20" x2="310" y2="80" stroke={colors.stroke} strokeWidth="2" />
        <rect x="310" y="20" width="20" height="14" fill={colors.stroke} />
        <rect x="314" y="20" width="5" height="7" fill="white" />
        <rect x="319" y="27" width="5" height="7" fill="white" />
        <rect x="310" y="27" width="5" height="7" fill="white" />
        <rect x="315" y="20" width="5" height="7" fill="white" />
      </g>

      {/* Divider */}
      <line x1="10" y1="120" x2="330" y2="120" stroke={colors.sectionNum} strokeWidth="2" />

      {/* === BOTTOM: AI freestyling === */}
      <text x="170" y="138" textAnchor="middle" fontSize="10" fontWeight="700" fill={colors.bad}>❌ AI with no system</text>

      {/* Open field */}
      <rect x="10" y="145" width="310" height="100" rx="8" fill={colors.bad + "0D"} stroke={colors.bad + "33"} strokeWidth="1" strokeDasharray="4 3" />

      {/* Chaotic car going in wrong direction */}
      <g style={{ opacity: interpolate(chaosProgress, [0, 1], [0, 1]) }}
        transform={`rotate(35, 100, 185) translate(${interpolate(chaosProgress, [0, 1], [0, 30])}, 0)`}>
        <rect x="80" y="175" width="38" height="22" rx="6" fill={colors.bad} />
        <circle cx="88" cy="200" r="6" fill={colors.stroke} />
        <circle cx="110" cy="200" r="6" fill={colors.stroke} />
        <text x="99" y="190" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">AI</text>
      </g>

      {/* Scattered block labels */}
      {[
        { x: 230, y: 160, label: "random padding" },
        { x: 180, y: 225, label: "wrong colors" },
        { x: 60, y: 230, label: "bad spacing" },
      ].map((item, i) => (
        <text key={i} x={item.x} y={item.y} fontSize="8" fill={colors.bad}
          style={{ opacity: interpolate(chaosProgress, [0.3 + i * 0.15, 0.6 + i * 0.15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          ✗ {item.label}
        </text>
      ))}
    </svg>
  );
};

export const S34_Takeaway3: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", height: "100%", gap: 40, alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <AnimatedText delay={0}>
            <div style={{ fontSize: 13, fontWeight: 700, color: colors.accent, letterSpacing: 2, textTransform: "uppercase" }}>
              Takeaway 03
            </div>
          </AnimatedText>

          <AnimatedText delay={10}>
            <div style={{ fontSize: 52, fontWeight: 900, color: colors.text, lineHeight: 1.05 }}>
              Upfront engineering makes AI <span style={{ color: colors.good }}>powerful,</span>{" "}
              <span style={{ color: colors.bad }}>not chaotic.</span>
            </div>
          </AnimatedText>

          <AnimatedText delay={25}>
            <div style={{ fontSize: 18, color: colors.textMuted, lineHeight: 1.5 }}>
              Design systems. Tests. Constraints. Give AI a track to run on.
            </div>
          </AnimatedText>

          <AnimatedText delay={45}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { icon: "🎨", text: "Design tokens in code" },
                { icon: "🧩", text: "Component library with rules" },
                { icon: "✅", text: "Automated tests as the spec" },
                { icon: "👁️", text: "AI reviews its own visual output" },
              ].map(item => (
                <div key={item.text} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 15, color: colors.text }}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </AnimatedText>
        </div>

        <AnimatedText delay={15}>
          <RaceTrackIllustration />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

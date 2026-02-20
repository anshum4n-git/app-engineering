import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

const cars = [
  { label: "click handler", width: 80, color: colors.good, delay: 10 },
  { label: "animation", width: 70, color: "#8B5CF6", delay: 20 },
  { label: "fetch callback", width: 90, color: colors.blue, delay: 30 },
  { label: "your loop", width: 65, color: "#F59E0B", delay: 40 },
];

const TrafficJam: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const blockerProgress = spring({ frame: frame - 5, fps, config: { damping: 200 } });

  return (
    <svg width="620" height="160" viewBox="0 0 620 160" fill="none">
      {/* Road */}
      <rect x="0" y="55" width="620" height="70" rx="4" fill={colors.sectionNum} />
      {/* Lane dashes */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <rect key={i} x={20 + i * 65} y={88} width={35} height={5} rx={2} fill="white" style={{ opacity: 0.6 }} />
      ))}

      {/* Blocker car (while true loop) */}
      <g style={{ opacity: interpolate(blockerProgress, [0, 1], [0, 1]) }}>
        <rect x={50} y={62} width={155} height={50} rx={8} fill={colors.bad} />
        <text x={127} y={82} textAnchor="middle" fontSize="10" fill="white" fontWeight="700">while(true){"{}"}</text>
        <text x={127} y={97} textAnchor="middle" fontSize="9" fill="#FCA5A5">BLOCKING EVERYTHING</text>
        <circle cx={70} cy={115} r={8} fill={colors.stroke} />
        <circle cx={185} cy={115} r={8} fill={colors.stroke} />
      </g>

      {/* Queued cars behind */}
      {cars.map((car, i) => {
        const carProgress = spring({ frame: frame - car.delay, fps, config: { damping: 200 } });
        const x = 215 + i * (car.width + 12);

        return (
          <g key={car.label} style={{ opacity: interpolate(carProgress, [0, 1], [0, 1]) }}>
            <rect x={x} y={67} width={car.width} height={40} rx={6} fill={car.color + "CC"} />
            <text x={x + car.width / 2} y={82} textAnchor="middle" fontSize="8" fill="white" fontWeight="600">
              {car.label.split(" ")[0]}
            </text>
            <text x={x + car.width / 2} y={94} textAnchor="middle" fontSize="8" fill="white">
              {car.label.split(" ")[1] || ""}
            </text>
            <circle cx={x + 12} cy={110} r={6} fill={colors.stroke} />
            <circle cx={x + car.width - 12} cy={110} r={6} fill={colors.stroke} />
          </g>
        );
      })}

      {/* Frustration cloud */}
      <AnimatedText delay={60}>
        <text x={455} y={45} fontSize="20">😤</text>
      </AnimatedText>
    </svg>
  );
};

export const S19_SingleThread: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 28 }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 60, fontWeight: 800, color: colors.text }}>
            JavaScript has <span style={{ color: colors.bad }}>one lane.</span>
          </div>
        </AnimatedText>

        <AnimatedText delay={15}>
          <div style={{ fontSize: 18, color: colors.textMuted, lineHeight: 1.6 }}>
            All DOM work — event handling, layout, your code — shares a single thread.{" "}
            <strong style={{ color: colors.bad }}>Block it, and everything freezes.</strong>
          </div>
        </AnimatedText>

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <TrafficJam />
        </div>

        <AnimatedText delay={70}>
          <div style={{
            padding: "10px 16px",
            background: colors.bad + "11",
            border: `1.5px solid ${colors.bad}`,
            borderRadius: 10,
            fontSize: 15,
            color: colors.bad,
            fontFamily: "monospace",
          }}>
            💡 Use setTimeout, requestAnimationFrame, or Web Workers to unblock the main thread
          </div>
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

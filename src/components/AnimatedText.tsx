import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type AnimatedTextProps = {
  children: React.ReactNode;
  delay?: number;
  from?: "bottom" | "left" | "top";
  style?: React.CSSProperties;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  delay = 0,
  from = "bottom",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY =
    from === "bottom"
      ? interpolate(progress, [0, 1], [30, 0])
      : from === "top"
        ? interpolate(progress, [0, 1], [-30, 0])
        : 0;
  const translateX =
    from === "left" ? interpolate(progress, [0, 1], [-30, 0]) : 0;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) translateX(${translateX}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

import React from "react";
import { AbsoluteFill } from "remotion";
import { colors } from "../design";

type SlideWrapperProps = {
  children: React.ReactNode;
  bg?: string;
  padding?: number;
};

export const SlideWrapper: React.FC<SlideWrapperProps> = ({
  children,
  bg = colors.bg,
  padding = 80,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: bg,
        padding,
        fontFamily: "Inter, system-ui, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

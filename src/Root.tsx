import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { Presentation, TOTAL_DURATION } from "./Presentation";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AppEngineering"
        component={Presentation}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};

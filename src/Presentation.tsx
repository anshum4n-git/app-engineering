import React from "react";
import { TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { springTiming, linearTiming } from "@remotion/transitions";
import { SLIDE_DURATION, SECTION_DURATION, TRANSITION_FRAMES } from "./design";

import { S01_Title } from "./slides/S01_Title";
import { S02_SectionUsers } from "./slides/S02_SectionUsers";
import { S03_UsersSpectrum } from "./slides/S03_UsersSpectrum";
import { S04_UsersDifferentReality } from "./slides/S04_UsersDifferentReality";
import { S05_SectionBeauty } from "./slides/S05_SectionBeauty";
import { S06_AnyoneCanJudge } from "./slides/S06_AnyoneCanJudge";
import { S07_SlowIsABug } from "./slides/S07_SlowIsABug";
import { S08_SectionUnpredictable } from "./slides/S08_SectionUnpredictable";
import { S09_ScreenSizes } from "./slides/S09_ScreenSizes";
import { S10_TouchGestures } from "./slides/S10_TouchGestures";
import { S11_Network } from "./slides/S11_Network";
import { S12_DevicePerformance } from "./slides/S12_DevicePerformance";
import { S13_CachingData } from "./slides/S13_CachingData";
import { S14_Accessibility } from "./slides/S14_Accessibility";
import { S15_SectionBrowserBasics } from "./slides/S15_SectionBrowserBasics";
import { S16_DownloadParse } from "./slides/S16_DownloadParse";
import { S17_Sandbox } from "./slides/S17_Sandbox";
import { S18_DomTree } from "./slides/S18_DomTree";
import { S19_SingleThread } from "./slides/S19_SingleThread";
import { S20_FetchLayout } from "./slides/S20_FetchLayout";
import { S21_EventBubbling } from "./slides/S21_EventBubbling";
import { S22_FrameworksAbstractions } from "./slides/S22_FrameworksAbstractions";
import { S23_SectionBrowserSuperpowers } from "./slides/S23_SectionBrowserSuperpowers";
import { S24_Storage } from "./slides/S24_Storage";
import { S25_ServiceWorkerPWA } from "./slides/S25_ServiceWorkerPWA";
import { S26_WebRTCEtc } from "./slides/S26_WebRTCEtc";
import { S27_SectionAIUI } from "./slides/S27_SectionAIUI";
import { S28_AICode } from "./slides/S28_AICode";
import { S29_BuildSystem } from "./slides/S29_BuildSystem";
import { S30_AIEyes } from "./slides/S30_AIEyes";
import { S31_SectionTakeaways } from "./slides/S31_SectionTakeaways";
import { S32_Takeaway1 } from "./slides/S32_Takeaway1";
import { S33_Takeaway2 } from "./slides/S33_Takeaway2";
import { S34_Takeaway3 } from "./slides/S34_Takeaway3";
import { S35_Closing } from "./slides/S35_Closing";

const contentTiming = springTiming({
  config: { damping: 200 },
  durationInFrames: TRANSITION_FRAMES,
});

const sectionTiming = linearTiming({
  durationInFrames: TRANSITION_FRAMES,
});

type SlideKind = "section" | "content";

type SlideEntry = {
  kind: SlideKind;
  component: React.FC;
};

const SLIDES: SlideEntry[] = [
  { kind: "content", component: S01_Title },
  { kind: "section", component: S02_SectionUsers },
  { kind: "content", component: S03_UsersSpectrum },
  { kind: "content", component: S04_UsersDifferentReality },
  { kind: "section", component: S05_SectionBeauty },
  { kind: "content", component: S06_AnyoneCanJudge },
  { kind: "content", component: S07_SlowIsABug },
  { kind: "section", component: S08_SectionUnpredictable },
  { kind: "content", component: S09_ScreenSizes },
  { kind: "content", component: S10_TouchGestures },
  { kind: "content", component: S11_Network },
  { kind: "content", component: S12_DevicePerformance },
  { kind: "content", component: S13_CachingData },
  { kind: "content", component: S14_Accessibility },
  { kind: "section", component: S15_SectionBrowserBasics },
  { kind: "content", component: S16_DownloadParse },
  { kind: "content", component: S17_Sandbox },
  { kind: "content", component: S18_DomTree },
  { kind: "content", component: S19_SingleThread },
  { kind: "content", component: S20_FetchLayout },
  { kind: "content", component: S21_EventBubbling },
  { kind: "content", component: S22_FrameworksAbstractions },
  { kind: "section", component: S23_SectionBrowserSuperpowers },
  { kind: "content", component: S24_Storage },
  { kind: "content", component: S25_ServiceWorkerPWA },
  { kind: "content", component: S26_WebRTCEtc },
  { kind: "section", component: S27_SectionAIUI },
  { kind: "content", component: S28_AICode },
  { kind: "content", component: S29_BuildSystem },
  { kind: "content", component: S30_AIEyes },
  { kind: "section", component: S31_SectionTakeaways },
  { kind: "content", component: S32_Takeaway1 },
  { kind: "content", component: S33_Takeaway2 },
  { kind: "content", component: S34_Takeaway3 },
  { kind: "content", component: S35_Closing },
];

export const Presentation: React.FC = () => {
  return (
    <TransitionSeries>
      {SLIDES.map((entry, i) => {
        const duration =
          entry.kind === "section" ? SECTION_DURATION : SLIDE_DURATION;
        const Component = entry.component;
        const isSection = entry.kind === "section";
        const isLast = i === SLIDES.length - 1;

        return (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={duration}>
              <Component />
            </TransitionSeries.Sequence>
            {!isLast && (
              <TransitionSeries.Transition
                timing={isSection ? sectionTiming : contentTiming}
                presentation={
                  isSection
                    ? fade()
                    : slide({ direction: "from-right" })
                }
              />
            )}
          </React.Fragment>
        );
      })}
    </TransitionSeries>
  );
};

// Total duration calculation:
// 7 section slides × 75 + 28 content slides × 120 − 34 transitions × 20
export const TOTAL_DURATION =
  SLIDES.reduce(
    (sum, s) =>
      sum + (s.kind === "section" ? SECTION_DURATION : SLIDE_DURATION),
    0
  ) -
  (SLIDES.length - 1) * TRANSITION_FRAMES;

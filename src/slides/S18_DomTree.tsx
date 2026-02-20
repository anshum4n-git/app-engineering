import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

type TreeNode = { label: string; x: number; y: number; parentX?: number; parentY?: number; delay: number; highlight?: boolean };

const nodes: TreeNode[] = [
  { label: "document", x: 260, y: 30, delay: 0 },
  { label: "html", x: 260, y: 90, parentX: 260, parentY: 30, delay: 6 },
  { label: "head", x: 150, y: 150, parentX: 260, parentY: 90, delay: 12 },
  { label: "body", x: 370, y: 150, parentX: 260, parentY: 90, delay: 12 },
  { label: "title", x: 150, y: 210, parentX: 150, parentY: 150, delay: 18 },
  { label: "header", x: 290, y: 210, parentX: 370, parentY: 150, delay: 18 },
  { label: "main", x: 450, y: 210, parentX: 370, parentY: 150, delay: 18 },
  { label: "nav", x: 290, y: 270, parentX: 290, parentY: 210, delay: 24 },
  { label: "article", x: 450, y: 270, parentX: 450, parentY: 210, delay: 24 },
  { label: "links", x: 290, y: 330, parentX: 290, parentY: 270, delay: 30, highlight: true },
];

const DomTreeDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // JS hand animation
  const handProgress = spring({ frame: frame - 55, fps, config: { damping: 150 } });
  const handX = interpolate(handProgress, [0, 1], [530, 295]);
  const handY = interpolate(handProgress, [0, 1], [380, 335]);

  return (
    <svg width="560" height="380" viewBox="0 0 560 380" fill="none">
      {nodes.map((node) => {
        const progress = spring({ frame: frame - node.delay, fps, config: { damping: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);

        return (
          <g key={node.label} style={{ opacity }}>
            {node.parentX !== undefined && (
              <line
                x1={node.parentX} y1={node.parentY! + 14}
                x2={node.x} y2={node.y - 14}
                stroke={colors.strokeMuted}
                strokeWidth="1.5"
              />
            )}
            <rect
              x={node.x - 28} y={node.y - 14}
              width={56} height={28}
              rx={6}
              fill={node.highlight ? colors.accent + "33" : colors.sectionNum}
              stroke={node.highlight ? colors.accent : colors.strokeMuted}
              strokeWidth={node.highlight ? 2 : 1.5}
            />
            <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize="10" fill={node.highlight ? colors.accent : colors.text} fontWeight="600">
              {node.label}
            </text>
          </g>
        );
      })}

      {/* JS hand reaching in */}
      {handProgress > 0.1 && (
        <g style={{ opacity: interpolate(handProgress, [0, 0.3], [0, 1], { extrapolateLeft: "clamp" }) }}>
          <text x={handX} y={handY} fontSize="28">👈</text>
          <text x={handX - 10} y={handY + 22} fontSize="9" fill={colors.blue} fontWeight="700">JS</text>
          {/* Glow on the links node */}
          <rect x={262} y={316} width={56} height={28} rx={6}
            fill={colors.blue + "44"} stroke={colors.blue} strokeWidth="2"
            style={{ opacity: interpolate(handProgress, [0.5, 1], [0, 1], { extrapolateLeft: "clamp" }) }}
          />
        </g>
      )}
    </svg>
  );
};

export const S18_DomTree: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", height: "100%", gap: 40, alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <AnimatedText delay={0}>
            <div style={{ fontSize: 56, fontWeight: 800, color: colors.text, lineHeight: 1.1 }}>
              HTML becomes a <span style={{ color: colors.accent }}>living tree.</span>
            </div>
          </AnimatedText>

          <AnimatedText delay={15}>
            <div style={{ fontSize: 18, color: colors.textMuted, lineHeight: 1.6 }}>
              The browser parses HTML into a tree of objects. JavaScript can reach in and change any branch.
            </div>
          </AnimatedText>

          <AnimatedText delay={55}>
            <div style={{
              padding: "12px 16px",
              background: colors.blue + "11",
              border: `1.5px solid ${colors.blue}`,
              borderRadius: 10,
              fontSize: 14,
              color: colors.blue,
              fontFamily: "monospace",
            }}>
              document.querySelector("nav").innerHTML = "…"
            </div>
          </AnimatedText>
        </div>

        <AnimatedText delay={5}>
          <DomTreeDiagram />
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

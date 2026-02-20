import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideWrapper } from "../components/SlideWrapper";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../design";

type UserCardProps = {
  name: string;
  age: number;
  descriptor: string;
  deviceIcon: React.ReactNode;
  delay: number;
  accentColor: string;
};

const UserCard: React.FC<UserCardProps> = ({ name, age, descriptor, deviceIcon, delay, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [40, 0]);

  return (
    <div style={{
      opacity,
      transform: `translateY(${translateY}px)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      width: 160,
    }}>
      {/* Avatar */}
      <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
        <circle cx="30" cy="18" r="14" stroke={accentColor} strokeWidth="2.5" fill={accentColor + "22"} />
        <path d="M10 65 C10 45 50 45 50 65" stroke={accentColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
      {deviceIcon}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>{name}, {age}</div>
        <div style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>{descriptor}</div>
      </div>
    </div>
  );
};

const users = [
  {
    name: "Rose", age: 72, descriptor: "First smartphone",
    color: "#8B5CF6",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="9" y="4" width="14" height="24" rx="3" stroke="#8B5CF6" strokeWidth="2" />
        <line x1="13" y1="25" x2="19" y2="25" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Jake", age: 8, descriptor: "Tap-happy gamer",
    color: "#3B82F6",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="24" height="16" rx="4" stroke="#3B82F6" strokeWidth="2" />
        <circle cx="11" cy="16" r="3" stroke="#3B82F6" strokeWidth="1.5" />
        <line x1="22" y1="13" x2="22" y2="19" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="16" x2="25" y2="16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Priya", age: 34, descriptor: "Power user, 3 monitors",
    color: colors.accent,
    icon: (
      <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
        <rect x="2" y="4" width="13" height="20" rx="2" stroke={colors.accent} strokeWidth="2" />
        <rect x="17" y="2" width="14" height="22" rx="2" stroke={colors.accent} strokeWidth="2" />
        <rect x="33" y="4" width="13" height="20" rx="2" stroke={colors.accent} strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Carlos", age: 19, descriptor: "2G in rural Mexico",
    color: "#F59E0B",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="9" y="4" width="14" height="24" rx="3" stroke="#F59E0B" strokeWidth="2" />
        <path d="M14 20 L18 12 L18 20" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <text x="16" y="30" fontSize="8" fill="#F59E0B" textAnchor="middle">2G</text>
      </svg>
    ),
  },
  {
    name: "Sam", age: 45, descriptor: "Screen reader, low vision",
    color: "#10B981",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="10" width="24" height="14" rx="3" stroke="#10B981" strokeWidth="2" />
        <line x1="8" y1="15" x2="24" y2="15" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="19" x2="20" y2="19" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2 8 C8 14 24 14 30 8" stroke="#10B981" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
];

export const S03_UsersSpectrum: React.FC = () => {
  return (
    <SlideWrapper>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 32 }}>
        <AnimatedText delay={0}>
          <div style={{ fontSize: 52, fontWeight: 800, color: colors.text }}>
            Your users are <span style={{ color: colors.accent }}>everyone.</span>
          </div>
        </AnimatedText>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flex: 1,
          paddingTop: 20,
        }}>
          {users.map((u, i) => (
            <UserCard
              key={u.name}
              name={u.name}
              age={u.age}
              descriptor={u.descriptor}
              deviceIcon={u.icon}
              delay={10 + i * 12}
              accentColor={u.color}
            />
          ))}
        </div>

        <AnimatedText delay={80} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 16, color: colors.textMuted, fontStyle: "italic" }}>
            Different backgrounds · different devices · different needs
          </div>
        </AnimatedText>
      </div>
    </SlideWrapper>
  );
};

import type { CSSProperties } from "react";

export type AvatarConfig = {
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  eyeShape: string;
  eyebrowStyle: string;
  mouthStyle: string;
  outfitColor: string;
  accessory: string;
};

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  skinTone: "medium-light",
  hairStyle: "long",
  hairColor: "black",
  eyeShape: "round",
  eyebrowStyle: "arched",
  mouthStyle: "smile",
  outfitColor: "#7c3aed",
  accessory: "none",
};

const SKIN_TONES: Record<string, string> = {
  light: "#FDDBB4",
  "medium-light": "#F5C89A",
  medium: "#E8A87C",
  "medium-dark": "#C68642",
  dark: "#8D5524",
  "very-dark": "#4A2912",
  tan: "#D4956A",
};

const HAIR_COLORS: Record<string, string> = {
  black: "#1a1a1a",
  brown: "#6B3A2A",
  blonde: "#F4C14D",
  red: "#C0392B",
  gray: "#9B9B9B",
  white: "#E8E8E8",
  blue: "#4A90D9",
  purple: "#8E44AD",
  pink: "#FF69B4",
};

const FALLBACK_SKIN = "#F5C89A";
const FALLBACK_HAIR = "#1a1a1a";

interface WhatsAppAvatarProps {
  config: AvatarConfig;
  size?: number;
  style?: CSSProperties;
  className?: string;
}

export default function WhatsAppAvatar({
  config,
  size = 200,
  style,
  className,
}: WhatsAppAvatarProps) {
  const skin = SKIN_TONES[config.skinTone] ?? FALLBACK_SKIN;
  const hair = HAIR_COLORS[config.hairColor] ?? FALLBACK_HAIR;
  const outfit = config.outfitColor ?? "#7c3aed";

  return (
    <svg
      width={size}
      height={Math.round(size * (220 / 200))}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
      role="img"
      aria-label="Avatar"
    >
      <title>Avatar</title>

      {/* Background circle */}
      <circle cx="100" cy="100" r="100" fill={`${outfit}22`} />

      {/* HAIR BACK */}
      <HairBack config={config} hair={hair} />

      {/* Neck */}
      <rect x="88" y="148" width="24" height="20" rx="4" fill={skin} />

      {/* Shoulders + top */}
      <path
        d="M30 220 Q40 175 70 165 Q85 160 100 162 Q115 160 130 165 Q160 175 170 220 Z"
        fill={outfit}
      />
      {/* Collar */}
      <path
        d="M82 165 Q100 175 118 165 L112 158 Q100 168 88 158 Z"
        fill={`${outfit}cc`}
      />

      {/* HEAD */}
      <ellipse cx="100" cy="110" rx="46" ry="52" fill={skin} />

      {/* Ears */}
      <ellipse cx="54" cy="115" rx="7" ry="9" fill={skin} />
      <ellipse cx="54" cy="115" rx="4" ry="6" fill={`${skin}99`} />
      <ellipse cx="146" cy="115" rx="7" ry="9" fill={skin} />
      <ellipse cx="146" cy="115" rx="4" ry="6" fill={`${skin}99`} />

      {/* HAIR FRONT */}
      <HairFront config={config} hair={hair} />

      {/* EYEBROWS */}
      <Eyebrows config={config} hair={hair} />

      {/* EYES */}
      <Eyes config={config} />

      {/* NOSE - subtle */}
      <ellipse cx="100" cy="128" rx="3" ry="2" fill={`${skin}66`} />
      <path
        d="M97 125 Q100 130 103 125"
        stroke={`${skin}88`}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Cheek blush */}
      <ellipse cx="72" cy="128" rx="9" ry="6" fill="#FFB5C8" opacity="0.45" />
      <ellipse cx="128" cy="128" rx="9" ry="6" fill="#FFB5C8" opacity="0.45" />

      {/* MOUTH */}
      <Mouth config={config} />

      {/* ACCESSORIES */}
      <Accessory config={config} />
    </svg>
  );
}

function HairBack({ config, hair }: { config: AvatarConfig; hair: string }) {
  switch (config.hairStyle) {
    case "long":
      return (
        <>
          <path
            d="M54 105 Q48 140 52 168 Q58 185 68 190 Q62 155 62 120 Z"
            fill={hair}
          />
          <path
            d="M146 105 Q152 140 148 168 Q142 185 132 190 Q138 155 138 120 Z"
            fill={hair}
          />
        </>
      );
    case "wavy":
      return (
        <>
          <path
            d="M56 108 Q46 135 50 155 Q56 168 63 172 Q57 148 60 118 Z"
            fill={hair}
          />
          <path
            d="M144 108 Q154 135 150 155 Q144 168 137 172 Q143 148 140 118 Z"
            fill={hair}
          />
        </>
      );
    case "curly":
      return (
        <>
          <path
            d="M56 108 Q46 130 50 152 Q56 165 63 168 Q57 145 60 118 Z"
            fill={hair}
          />
          <path
            d="M144 108 Q154 130 150 152 Q144 165 137 168 Q143 145 140 118 Z"
            fill={hair}
          />
        </>
      );
    default:
      return null;
  }
}

function HairFront({ config, hair }: { config: AvatarConfig; hair: string }) {
  switch (config.hairStyle) {
    case "short":
      return (
        <path
          d="M54 105 Q55 72 100 68 Q145 72 146 105 Q140 85 130 80 Q115 75 100 76 Q85 75 70 80 Q60 85 54 105 Z"
          fill={hair}
        />
      );
    case "curly":
      return (
        <>
          <path
            d="M54 110 Q50 78 70 68 Q85 60 100 62 Q115 60 130 68 Q150 78 146 110 Q140 82 128 76 Q115 70 100 72 Q85 70 72 76 Q60 82 54 110 Z"
            fill={hair}
          />
          <circle cx="62" cy="90" r="8" fill={hair} />
          <circle cx="75" cy="76" r="7" fill={hair} />
          <circle cx="90" cy="70" r="7" fill={hair} />
          <circle cx="100" cy="68" r="7" fill={hair} />
          <circle cx="110" cy="70" r="7" fill={hair} />
          <circle cx="125" cy="76" r="7" fill={hair} />
          <circle cx="138" cy="90" r="8" fill={hair} />
          {/* Curly puffs extras */}
          <circle cx="68" cy="82" r="5" fill={hair} />
          <circle cx="132" cy="82" r="5" fill={hair} />
        </>
      );
    case "long":
      return (
        <path
          d="M54 105 Q55 72 100 68 Q145 72 146 105 Q140 82 128 76 Q115 70 100 72 Q85 70 72 76 Q60 82 54 105 Z"
          fill={hair}
        />
      );
    case "bun":
      return (
        <>
          <path
            d="M60 108 Q62 80 100 76 Q138 80 140 108 Q134 86 122 80 Q112 76 100 77 Q88 76 78 80 Q66 86 60 108 Z"
            fill={hair}
          />
          {/* Bun on top */}
          <circle cx="100" cy="62" r="16" fill={hair} />
          <circle cx="100" cy="62" r="11" fill={hair} opacity="0.75" />
          <circle cx="100" cy="62" r="6" fill={hair} opacity="0.5" />
          {/* Bun shine */}
          <circle cx="95" cy="57" r="2.5" fill="white" opacity="0.2" />
        </>
      );
    case "buzz":
      return (
        <path
          d="M56 110 Q58 86 72 78 Q85 72 100 73 Q115 72 128 78 Q142 86 144 110 Q138 90 125 84 Q113 79 100 80 Q87 79 75 84 Q62 90 56 110 Z"
          fill={hair}
          opacity="0.9"
        />
      );
    case "wavy":
      return (
        <path
          d="M56 108 Q57 74 100 70 Q143 74 144 108 Q136 84 124 78 Q112 73 100 74 Q88 73 76 78 Q64 84 56 108 Z"
          fill={hair}
        />
      );
    case "spiky":
      return (
        <>
          <path
            d="M58 108 Q60 82 100 76 Q140 82 142 108 Q134 88 122 82 Q112 78 100 79 Q88 78 78 82 Q66 88 58 108 Z"
            fill={hair}
          />
          {/* Spiky tips */}
          <polygon points="72,82 68,62 78,80" fill={hair} />
          <polygon points="84,76 82,56 90,74" fill={hair} />
          <polygon points="100,73 98,52 104,72" fill={hair} />
          <polygon points="116,76 118,56 110,74" fill={hair} />
          <polygon points="128,82 132,62 122,80" fill={hair} />
        </>
      );
    default:
      return (
        <path
          d="M54 105 Q55 72 100 68 Q145 72 146 105 Q140 85 130 80 Q115 75 100 76 Q85 75 70 80 Q60 85 54 105 Z"
          fill={hair}
        />
      );
  }
}

function Eyebrows({ config, hair }: { config: AvatarConfig; hair: string }) {
  const color = hair === "#E8E8E8" ? "#999" : hair;
  switch (config.eyebrowStyle) {
    case "straight":
      return (
        <>
          <line
            x1="76"
            y1="100"
            x2="92"
            y2="100"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="108"
            y1="100"
            x2="124"
            y2="100"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      );
    case "arched":
      return (
        <>
          <path
            d="M76 103 Q84 97 92 101"
            stroke={color}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M108 101 Q116 97 124 103"
            stroke={color}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
    case "thick":
      return (
        <>
          <path
            d="M75 103 Q84 97 93 101"
            stroke={color}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M107 101 Q116 97 125 103"
            stroke={color}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
    default:
      return (
        <>
          <path
            d="M76 103 Q84 97 92 101"
            stroke={color}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M108 101 Q116 97 124 103"
            stroke={color}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
  }
}

function Eyes({ config }: { config: AvatarConfig }) {
  switch (config.eyeShape) {
    case "round":
      return (
        <>
          <ellipse cx="84" cy="113" rx="8" ry="8" fill="white" />
          <ellipse cx="84" cy="113" rx="5" ry="5" fill="#3B2314" />
          <circle cx="82" cy="111" r="1.5" fill="white" />
          <ellipse cx="84" cy="113" rx="2" ry="2" fill="#1a1a1a" />
          <ellipse cx="116" cy="113" rx="8" ry="8" fill="white" />
          <ellipse cx="116" cy="113" rx="5" ry="5" fill="#3B2314" />
          <circle cx="114" cy="111" r="1.5" fill="white" />
          <ellipse cx="116" cy="113" rx="2" ry="2" fill="#1a1a1a" />
        </>
      );
    case "almond":
      return (
        <>
          <path d="M76 113 Q84 107 92 113 Q84 119 76 113 Z" fill="white" />
          <ellipse cx="84" cy="113" rx="4" ry="4" fill="#3B2314" />
          <circle cx="82.5" cy="111.5" r="1.2" fill="white" />
          <ellipse cx="84" cy="113" rx="1.8" ry="1.8" fill="#1a1a1a" />
          <path
            d="M76 113 Q84 107 92 113"
            stroke="#5C3A1E"
            strokeWidth="1"
            fill="none"
          />
          <path d="M108 113 Q116 107 124 113 Q116 119 108 113 Z" fill="white" />
          <ellipse cx="116" cy="113" rx="4" ry="4" fill="#3B2314" />
          <circle cx="114.5" cy="111.5" r="1.2" fill="white" />
          <ellipse cx="116" cy="113" rx="1.8" ry="1.8" fill="#1a1a1a" />
          <path
            d="M108 113 Q116 107 124 113"
            stroke="#5C3A1E"
            strokeWidth="1"
            fill="none"
          />
        </>
      );
    case "wide":
      return (
        <>
          <ellipse cx="84" cy="113" rx="9" ry="9" fill="white" />
          <ellipse cx="84" cy="113" rx="6" ry="6" fill="#3B2314" />
          <circle cx="82" cy="111" r="2" fill="white" />
          <ellipse cx="84" cy="113" rx="2.5" ry="2.5" fill="#1a1a1a" />
          <ellipse cx="116" cy="113" rx="9" ry="9" fill="white" />
          <ellipse cx="116" cy="113" rx="6" ry="6" fill="#3B2314" />
          <circle cx="114" cy="111" r="2" fill="white" />
          <ellipse cx="116" cy="113" rx="2.5" ry="2.5" fill="#1a1a1a" />
        </>
      );
    case "sleepy":
      return (
        <>
          <path d="M76 115 Q84 120 92 115" fill="#f0e8e0" />
          <path
            d="M76 115 Q84 109 92 115"
            stroke="#3B2314"
            strokeWidth="2"
            fill="#f0e8e0"
            strokeLinecap="round"
          />
          <ellipse cx="84" cy="115" rx="4" ry="2.5" fill="#3B2314" />
          <circle cx="82.5" cy="113.5" r="1" fill="white" />
          <path d="M108 115 Q116 120 124 115" fill="#f0e8e0" />
          <path
            d="M108 115 Q116 109 124 115"
            stroke="#3B2314"
            strokeWidth="2"
            fill="#f0e8e0"
            strokeLinecap="round"
          />
          <ellipse cx="116" cy="115" rx="4" ry="2.5" fill="#3B2314" />
          <circle cx="114.5" cy="113.5" r="1" fill="white" />
        </>
      );
    case "sparkle":
      return (
        <>
          {/* Left sparkle eye */}
          <ellipse cx="84" cy="113" rx="8" ry="8" fill="white" />
          <ellipse cx="84" cy="113" rx="5" ry="5" fill="#6B3FA0" />
          {/* Star iris */}
          <polygon
            points="84,108 85.2,111.6 89,111.6 86,113.8 87.2,117.4 84,115.2 80.8,117.4 82,113.8 79,111.6 82.8,111.6"
            fill="#FFD700"
            opacity="0.9"
            transform="scale(0.55) translate(68,55)"
          />
          <circle cx="82" cy="111" r="2" fill="white" opacity="0.8" />
          <circle cx="87" cy="115" r="1" fill="white" opacity="0.6" />
          {/* Right sparkle eye */}
          <ellipse cx="116" cy="113" rx="8" ry="8" fill="white" />
          <ellipse cx="116" cy="113" rx="5" ry="5" fill="#6B3FA0" />
          <circle cx="114" cy="111" r="2" fill="white" opacity="0.8" />
          <circle cx="119" cy="115" r="1" fill="white" opacity="0.6" />
          {/* Sparkle dots */}
          <circle cx="76" cy="107" r="1" fill="#FFD700" opacity="0.7" />
          <circle cx="92" cy="106" r="1.2" fill="#FFD700" opacity="0.7" />
          <circle cx="108" cy="107" r="1" fill="#FFD700" opacity="0.7" />
          <circle cx="124" cy="106" r="1.2" fill="#FFD700" opacity="0.7" />
        </>
      );
    default:
      return (
        <>
          <ellipse cx="84" cy="113" rx="8" ry="8" fill="white" />
          <ellipse cx="84" cy="113" rx="5" ry="5" fill="#3B2314" />
          <circle cx="82" cy="111" r="1.5" fill="white" />
          <ellipse cx="116" cy="113" rx="8" ry="8" fill="white" />
          <ellipse cx="116" cy="113" rx="5" ry="5" fill="#3B2314" />
          <circle cx="114" cy="111" r="1.5" fill="white" />
        </>
      );
  }
}

function Mouth({ config }: { config: AvatarConfig }) {
  switch (config.mouthStyle) {
    case "smile":
      return (
        <>
          <path
            d="M88 138 Q100 148 112 138"
            stroke="#C0725A"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M88 138 Q100 146 112 138" fill="#E8897A" opacity="0.6" />
        </>
      );
    case "big-smile":
      return (
        <>
          <path
            d="M84 136 Q100 152 116 136"
            stroke="#C0725A"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M84 136 Q100 150 116 136" fill="#E05C5C" />
          <path
            d="M88 141 Q100 145 112 141 Q100 148 88 141 Z"
            fill="white"
            opacity="0.8"
          />
        </>
      );
    case "neutral":
      return (
        <line
          x1="90"
          y1="140"
          x2="110"
          y2="140"
          stroke="#C0725A"
          strokeWidth="2"
          strokeLinecap="round"
        />
      );
    case "smirk":
      return (
        <path
          d="M90 140 Q102 147 114 139"
          stroke="#C0725A"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      );
    default:
      return (
        <path
          d="M88 138 Q100 148 112 138"
          stroke="#C0725A"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      );
  }
}

function Accessory({ config }: { config: AvatarConfig }) {
  switch (config.accessory) {
    case "glasses":
      return (
        <>
          <ellipse
            cx="84"
            cy="113"
            rx="11"
            ry="8"
            stroke="#555"
            strokeWidth="2"
            fill="none"
          />
          <ellipse
            cx="116"
            cy="113"
            rx="11"
            ry="8"
            stroke="#555"
            strokeWidth="2"
            fill="none"
          />
          <line
            x1="95"
            y1="113"
            x2="105"
            y2="113"
            stroke="#555"
            strokeWidth="1.5"
          />
          <line
            x1="73"
            y1="113"
            x2="60"
            y2="116"
            stroke="#555"
            strokeWidth="1.5"
          />
          <line
            x1="127"
            y1="113"
            x2="140"
            y2="116"
            stroke="#555"
            strokeWidth="1.5"
          />
        </>
      );
    case "sunglasses":
      return (
        <>
          <rect
            x="73"
            y="107"
            width="22"
            height="13"
            rx="5"
            fill="#1a1a1a"
            opacity="0.85"
          />
          <rect
            x="105"
            y="107"
            width="22"
            height="13"
            rx="5"
            fill="#1a1a1a"
            opacity="0.85"
          />
          <line
            x1="95"
            y1="113"
            x2="105"
            y2="113"
            stroke="#333"
            strokeWidth="1.5"
          />
          <line
            x1="73"
            y1="113"
            x2="60"
            y2="116"
            stroke="#333"
            strokeWidth="1.5"
          />
          <line
            x1="127"
            y1="113"
            x2="140"
            y2="116"
            stroke="#333"
            strokeWidth="1.5"
          />
          <line
            x1="78"
            y1="110"
            x2="85"
            y2="110"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.4"
            strokeLinecap="round"
          />
          <line
            x1="110"
            y1="110"
            x2="117"
            y2="110"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.4"
            strokeLinecap="round"
          />
        </>
      );
    case "earrings":
      return (
        <>
          <circle
            cx="54"
            cy="120"
            r="4"
            fill="#F4C14D"
            stroke="#D4A017"
            strokeWidth="1"
          />
          <circle
            cx="146"
            cy="120"
            r="4"
            fill="#F4C14D"
            stroke="#D4A017"
            strokeWidth="1"
          />
        </>
      );
    case "headband":
      return (
        <>
          {/* Headband strap across forehead */}
          <path
            d="M58 96 Q100 88 142 96"
            stroke="#E91E8C"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M58 96 Q100 88 142 96"
            stroke="#FF69B4"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          {/* Bow in center */}
          <path d="M93 90 Q100 85 107 90 Q100 95 93 90 Z" fill="#FF1493" />
          <circle cx="100" cy="90" r="2.5" fill="#FF69B4" />
        </>
      );
    default:
      return null;
  }
}

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";
import type { AvatarConfig } from "./WhatsAppAvatar";

const SKIN_OPTIONS = [
  { id: "light", color: "#FDDBB4", label: "Light" },
  { id: "medium-light", color: "#F5C89A", label: "Med Light" },
  { id: "medium", color: "#E8A87C", label: "Medium" },
  { id: "tan", color: "#D4956A", label: "Tan" },
  { id: "medium-dark", color: "#C68642", label: "Med Dark" },
  { id: "dark", color: "#8D5524", label: "Dark" },
  { id: "very-dark", color: "#4A2912", label: "Very Dark" },
];

const HAIR_STYLES = [
  { id: "short", emoji: "💇", label: "Short" },
  { id: "long", emoji: "👩", label: "Long" },
  { id: "wavy", emoji: "〰️", label: "Wavy" },
  { id: "curly", emoji: "🌀", label: "Curly" },
  { id: "bun", emoji: "🎀", label: "Bun" },
  { id: "spiky", emoji: "⚡", label: "Spiky" },
  { id: "buzz", emoji: "✂️", label: "Buzz" },
];

const HAIR_COLORS = [
  { id: "black", color: "#1a1a1a", label: "Black" },
  { id: "brown", color: "#6B3A2A", label: "Brown" },
  { id: "blonde", color: "#F4C14D", label: "Blonde" },
  { id: "red", color: "#C0392B", label: "Red" },
  { id: "gray", color: "#9B9B9B", label: "Gray" },
  { id: "white", color: "#DDDDDD", label: "White" },
  { id: "blue", color: "#4A90D9", label: "Blue" },
  { id: "purple", color: "#8E44AD", label: "Purple" },
  { id: "pink", color: "#FF69B4", label: "Pink" },
];

const EYE_SHAPES = [
  { id: "round", label: "Round", icon: "●" },
  { id: "almond", label: "Almond", icon: "◉" },
  { id: "wide", label: "Wide", icon: "◎" },
  { id: "sleepy", label: "Sleepy", icon: "—" },
  { id: "sparkle", label: "Sparkle", icon: "✨" },
];

const EYEBROW_STYLES = [
  { id: "straight", label: "Straight", icon: "—" },
  { id: "arched", label: "Arched", icon: "∧" },
  { id: "thick", label: "Thick", icon: "▬" },
];

const MOUTH_STYLES = [
  { id: "smile", label: "Smile", icon: "🙂" },
  { id: "big-smile", label: "Big Smile", icon: "😄" },
  { id: "neutral", label: "Neutral", icon: "😐" },
  { id: "smirk", label: "Smirk", icon: "😏" },
];

const OUTFIT_COLORS = [
  { id: "#7c3aed", label: "Purple" },
  { id: "#2563eb", label: "Blue" },
  { id: "#059669", label: "Green" },
  { id: "#dc2626", label: "Red" },
  { id: "#d97706", label: "Orange" },
  { id: "#db2777", label: "Pink" },
  { id: "#374151", label: "Gray" },
  { id: "#1e293b", label: "Black" },
];

const ACCESSORIES = [
  { id: "none", label: "None", icon: "✕" },
  { id: "glasses", label: "Glasses", icon: "👓" },
  { id: "sunglasses", label: "Sunnies", icon: "🕶️" },
  { id: "earrings", label: "Earrings", icon: "💎" },
  { id: "headband", label: "Headband", icon: "🎀" },
];

interface AvatarBuilderProps {
  config: AvatarConfig;
  onChange: (patch: Partial<AvatarConfig>) => void;
  onDone: () => void;
}

type OptionItem = {
  id: string;
  color?: string;
  label: string;
  emoji?: string;
  icon?: string;
};

function Section({
  title,
  options,
  value,
  onChange,
  renderOption,
}: {
  title: string;
  options: OptionItem[];
  value: string;
  onChange: (id: string) => void;
  renderOption?: (opt: OptionItem, selected: boolean) => React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`relative rounded-xl border-2 transition-all ${
                selected
                  ? "border-primary shadow-md scale-105"
                  : "border-transparent hover:border-primary/40"
              }`}
            >
              {renderOption ? (
                renderOption(opt, selected)
              ) : (
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
                  {opt.emoji ?? opt.icon}
                </div>
              )}
              {selected && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AvatarBuilder({
  config,
  onChange,
  onDone,
}: AvatarBuilderProps) {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
        <h3 className="font-bold text-foreground text-sm">Customize Avatar</h3>
        <Button
          size="sm"
          onClick={onDone}
          className="h-7 text-xs rounded-full px-4"
          data-ocid="avatar.done.button"
        >
          Done ✓
        </Button>
      </div>

      <ScrollArea className="h-[360px]">
        <div className="p-4">
          {/* Skin Tone */}
          <Section
            title="Skin Tone"
            options={SKIN_OPTIONS}
            value={config.skinTone}
            onChange={(v) => onChange({ skinTone: v })}
            renderOption={(opt, selected) => (
              <div
                className={`w-10 h-10 rounded-xl border-2 ${
                  selected ? "border-primary" : "border-border"
                }`}
                style={{ backgroundColor: opt.color }}
              />
            )}
          />

          {/* Hair Style */}
          <Section
            title="Hair Style"
            options={HAIR_STYLES}
            value={config.hairStyle}
            onChange={(v) => onChange({ hairStyle: v })}
            renderOption={(opt, selected) => (
              <div
                className={`w-10 h-10 rounded-xl bg-muted flex flex-col items-center justify-center ${
                  selected ? "bg-primary/10" : ""
                }`}
              >
                <span className="text-lg">{opt.emoji}</span>
                <span className="text-[9px] text-muted-foreground">
                  {opt.label}
                </span>
              </div>
            )}
          />

          {/* Hair Color */}
          <Section
            title="Hair Color"
            options={HAIR_COLORS}
            value={config.hairColor}
            onChange={(v) => onChange({ hairColor: v })}
            renderOption={(opt, selected) => (
              <div
                className={`w-8 h-8 rounded-full border-2 ${
                  selected ? "border-primary" : "border-border"
                }`}
                style={{ backgroundColor: opt.color }}
              />
            )}
          />

          {/* Eye Shape */}
          <Section
            title="Eye Shape"
            options={EYE_SHAPES}
            value={config.eyeShape}
            onChange={(v) => onChange({ eyeShape: v })}
            renderOption={(opt, selected) => (
              <div
                className={`w-12 h-10 rounded-xl flex flex-col items-center justify-center ${
                  selected ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <span className="text-base">{opt.icon}</span>
                <span className="text-[9px] text-muted-foreground mt-0.5">
                  {opt.label}
                </span>
              </div>
            )}
          />

          {/* Eyebrow Style */}
          <Section
            title="Eyebrows"
            options={EYEBROW_STYLES}
            value={config.eyebrowStyle}
            onChange={(v) => onChange({ eyebrowStyle: v })}
            renderOption={(opt, selected) => (
              <div
                className={`w-14 h-10 rounded-xl flex flex-col items-center justify-center ${
                  selected ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <span className="text-base font-bold">{opt.icon}</span>
                <span className="text-[9px] text-muted-foreground mt-0.5">
                  {opt.label}
                </span>
              </div>
            )}
          />

          {/* Mouth */}
          <Section
            title="Mouth"
            options={MOUTH_STYLES}
            value={config.mouthStyle}
            onChange={(v) => onChange({ mouthStyle: v })}
            renderOption={(opt, selected) => (
              <div
                className={`w-12 h-10 rounded-xl flex flex-col items-center justify-center ${
                  selected ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <span className="text-lg">{opt.icon}</span>
                <span className="text-[9px] text-muted-foreground">
                  {opt.label}
                </span>
              </div>
            )}
          />

          {/* Outfit Color */}
          <Section
            title="Outfit Color"
            options={OUTFIT_COLORS}
            value={config.outfitColor}
            onChange={(v) => onChange({ outfitColor: v })}
            renderOption={(opt, selected) => (
              <div
                className={`w-9 h-9 rounded-full border-2 ${
                  selected ? "border-primary" : "border-border"
                }`}
                style={{ backgroundColor: opt.id }}
              />
            )}
          />

          {/* Accessory */}
          <Section
            title="Accessories"
            options={ACCESSORIES}
            value={config.accessory}
            onChange={(v) => onChange({ accessory: v })}
            renderOption={(opt, selected) => (
              <div
                className={`w-12 h-10 rounded-xl flex flex-col items-center justify-center ${
                  selected ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <span className="text-lg">{opt.icon}</span>
                <span className="text-[9px] text-muted-foreground">
                  {opt.label}
                </span>
              </div>
            )}
          />
        </div>
      </ScrollArea>
    </div>
  );
}

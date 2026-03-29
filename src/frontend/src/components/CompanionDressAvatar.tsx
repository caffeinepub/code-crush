import { CLOTHING_ITEMS, type ClothingSlot } from "../data/clothing";

interface Props {
  companionImage: string;
  companionName: string;
  equippedClothing: Record<string, string>;
}

export default function CompanionDressAvatar({
  companionImage,
  companionName,
  equippedClothing,
}: Props) {
  const getItem = (slot: ClothingSlot) => {
    const id = equippedClothing[slot];
    return CLOTHING_ITEMS.find((c) => c.id === id);
  };

  const cap = getItem("cap");
  const shirt = getItem("shirt");
  const pant = getItem("pant");
  const shoe = getItem("shoe");
  const accessory = getItem("accessory");

  const ringColor = shirt?.color ?? "#ec4899";

  const chips = [
    shirt && shirt.emoji !== "—"
      ? { emoji: shirt.emoji, label: shirt.label }
      : null,
    pant && pant.emoji !== "—"
      ? { emoji: pant.emoji, label: pant.label }
      : null,
    shoe && shoe.emoji !== "—"
      ? { emoji: shoe.emoji, label: shoe.label }
      : null,
    accessory && accessory.emoji !== "—"
      ? { emoji: accessory.emoji, label: accessory.label }
      : null,
  ].filter(Boolean) as { emoji: string; label: string }[];

  return (
    <div className="flex flex-col items-center select-none gap-2">
      {/* Outer ring + photo */}
      <div className="relative">
        {/* Story-style gradient ring */}
        <div
          className="w-32 h-32 rounded-full p-[3px] shadow-lg"
          style={{
            background: `conic-gradient(${ringColor}, #f97316, #a855f7, ${ringColor})`,
          }}
        >
          <div className="w-full h-full rounded-full bg-background p-[3px]">
            <img
              src={companionImage}
              alt={companionName}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Cap — overlapping top of circle */}
        {cap && cap.emoji !== "—" && (
          <span
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl"
            style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.35))" }}
          >
            {cap.emoji}
          </span>
        )}

        {/* Accessory badge — top right */}
        {accessory && accessory.emoji !== "—" && (
          <div className="absolute top-1 -right-1 w-8 h-8 rounded-full bg-card border-2 border-background flex items-center justify-center text-lg shadow-md">
            {accessory.emoji}
          </div>
        )}
      </div>

      {/* Name */}
      <p className="text-sm font-semibold text-foreground tracking-wide">
        {companionName}
      </p>

      {/* Outfit chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5 max-w-[180px]">
          {chips.map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[11px] font-medium"
            >
              <span>{chip.emoji}</span>
              <span className="truncate max-w-[60px]">{chip.label}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

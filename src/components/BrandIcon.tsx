import type { IconType } from "react-icons";
import { SiGoogle, SiMeta, SiMistralai, SiAlibabadotcom } from "react-icons/si";
import type { ModelBrand } from "@/lib/types";

interface BrandIconProps {
  brand: ModelBrand;
  /** Size in pixels (default 14). */
  size?: number;
}

// Brand color palette mirrored from simple-icons (https://simpleicons.org).
// These hex values change very rarely (only on a corporate rebrand);
// keeping them inline lets us drop the entire `simple-icons` dependency
// and source every glyph from `react-icons/si` instead.
const BRAND_COLORS: Partial<Record<ModelBrand, string>> = {
  Google: "#4285F4",
  Meta: "#0467DF",
  Mistral: "#FA520F",
  Alibaba: "#FF6A00",
};

const BRAND_ICONS: Partial<Record<ModelBrand, IconType>> = {
  Google: SiGoogle,
  Meta: SiMeta,
  Mistral: SiMistralai,
  Alibaba: SiAlibabadotcom,
};

// Microsoft Windows 4-square logo. Excluded from simple-icons due to
// trademark restrictions, so we ship a tiny inline replica.
function MicrosoftIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Microsoft">
      <rect x="0"  y="0"  width="11" height="11" fill="#F25022" rx="1" />
      <rect x="13" y="0"  width="11" height="11" fill="#7FBA00" rx="1" />
      <rect x="0"  y="13" width="11" height="11" fill="#00A4EF" rx="1" />
      <rect x="13" y="13" width="11" height="11" fill="#FFB900" rx="1" />
    </svg>
  );
}

// Coloured rounded-square monogram, used for brands that simple-icons
// excludes (trademark) or doesn't ship a glyph for. Keeps every brand row
// visually consistent without pulling in extra icon dependencies.
function LetterIcon({
  size,
  label,
  text,
  bg,
}: {
  size: number;
  label: string;
  text: string;
  bg: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-label={label}>
      <rect width="14" height="14" rx="3" fill={bg} />
      <text
        x="7"
        y="10.5"
        textAnchor="middle"
        fontSize={text.length > 1 ? 6 : 9}
        fontWeight="700"
        fill="white"
        fontFamily="sans-serif"
      >
        {text}
      </text>
    </svg>
  );
}

// Brands rendered as a monogram square (no simple-icons glyph or trademark
// restrictions). Colours approximate each vendor's brand palette.
const LETTER_BRANDS: Partial<
  Record<ModelBrand, { text: string; bg: string }>
> = {
  DeepSeek: { text: "D", bg: "#4D6BFE" },
  OpenAI: { text: "AI", bg: "#10A37F" },
  Moonshot: { text: "K", bg: "#16161A" },
  Zhipu: { text: "Z", bg: "#3859FF" },
  MiniMax: { text: "M", bg: "#E1341E" },
  IBM: { text: "IBM", bg: "#0F62FE" },
  Cohere: { text: "Co", bg: "#FF7759" },
};

export function BrandIcon({ brand, size = 14 }: BrandIconProps) {
  if (brand === "Microsoft") return <MicrosoftIcon size={size} />;

  const letter = LETTER_BRANDS[brand];
  if (letter) {
    return (
      <LetterIcon size={size} label={brand} text={letter.text} bg={letter.bg} />
    );
  }

  const Icon = BRAND_ICONS[brand];
  if (!Icon) return null;

  // Brand color is optional — fall back to currentColor (icon inherits text color)
  // when a brand is not registered in BRAND_COLORS.
  const color = BRAND_COLORS[brand];
  const colorProp = color !== undefined ? { color } : {};
  return <Icon width={size} height={size} {...colorProp} aria-label={brand} role="img" />;
}

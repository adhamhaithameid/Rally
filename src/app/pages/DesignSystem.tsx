import { useState } from "react";
import { Check, Copy, Palette } from "lucide-react";
import svgPaths from "../../imports/svg-gyowvurp60";
import { usePalette, ThemePalette } from "../contexts/PaletteContext";

// ── Types ────────────────────────────────────────────────────────────────────

interface ColorSwatch {
  name: string;
  value: string;
  textColor?: string;
  token?: string;
}

interface ColorGroup {
  label: string;
  swatches: ColorSwatch[];
}

// ── Color Data ───────────────────────────────────────────────────────────────

const brandColors: ColorGroup[] = [
  {
    label: "Brand / Primary",
    swatches: [
      { name: "Normal",   value: "#ff4615", textColor: "#fff", token: "--rally-brand" },
      { name: "Hover",    value: "#fe3511", textColor: "#fff", token: "--rally-brand-hover" },
      { name: "Pressed",  value: "#ef1b07", textColor: "#fff", token: "--rally-brand-pressed" },
      { name: "On Light", value: "#c60f08", textColor: "#fff", token: "--rally-brand-on-light" },
      { name: "On Dark",  value: "#ff9571", textColor: "#231d1a", token: "--rally-brand-on-dark" },
      { name: "Soft Light", value: "#fff2ed", textColor: "#231d1a", token: "--rally-brand-soft-light" },
      { name: "Soft Dark",  value: "#440608", textColor: "#fff", token: "--rally-brand-soft-dark" },
    ],
  },
];

const baseLayerColors: ColorGroup[] = [
  {
    label: "Light Mode — Base Layer",
    swatches: [
      { name: "Canvas",         value: "#ffe1d2", textColor: "#231d1a", token: "--canvas (light)" },
      { name: "Surface",        value: "#fff7f3", textColor: "#231d1a", token: "--surface (light)" },
      { name: "Elevated",       value: "#ffffff",  textColor: "#231d1a", token: "--elevated (light)" },
      { name: "Border",         value: "#d1aa99", textColor: "#231d1a", token: "--border-color (light)" },
      { name: "Text Primary",   value: "#231d1a", textColor: "#fff2ed", token: "--text-primary (light)" },
      { name: "Text Secondary", value: "#5f514b", textColor: "#fff7f3", token: "--text-secondary (light)" },
    ],
  },
  {
    label: "Dark Mode — Base Layer",
    swatches: [
      { name: "Canvas",         value: "#191919", textColor: "#fff2ed", token: "--canvas (dark)" },
      { name: "Surface",        value: "#232323", textColor: "#fff2ed", token: "--surface (dark)" },
      { name: "Elevated",       value: "#2c2c2c", textColor: "#fff2ed", token: "--elevated (dark)" },
      { name: "Border",         value: "#4a403c", textColor: "#fff2ed", token: "--border-color (dark)" },
      { name: "Text Primary",   value: "#fff2ed", textColor: "#231d1a", token: "--text-primary (dark)" },
      { name: "Text Secondary", value: "#c7b8b2", textColor: "#231d1a", token: "--text-secondary (dark)" },
    ],
  },
];

const semanticColors: ColorGroup[] = [
  {
    label: "Error",
    swatches: [
      { name: "Solid",      value: "#d90000", textColor: "#fff", token: "--error-solid" },
      { name: "Hover",      value: "#b00000", textColor: "#fff", token: "--error-hover" },
      { name: "Pressed",    value: "#8e0000", textColor: "#fff", token: "--error-pressed" },
      { name: "Soft Light", value: "#fdecec", textColor: "#231d1a", token: "--error-soft-light" },
      { name: "Soft Dark",  value: "#341111", textColor: "#fff", token: "--error-soft-dark" },
      { name: "On Light",   value: "#b00000", textColor: "#fff", token: "--error-on-light" },
      { name: "On Dark",    value: "#ff8a8a", textColor: "#231d1a", token: "--error-on-dark" },
    ],
  },
  {
    label: "Info",
    swatches: [
      { name: "Solid",      value: "#0f5fd7", textColor: "#fff", token: "--info-solid" },
      { name: "Soft Light", value: "#eef4ff", textColor: "#231d1a", token: "--info-soft-light" },
      { name: "Soft Dark",  value: "#101d36", textColor: "#fff", token: "--info-soft-dark" },
      { name: "On Light",   value: "#0f5fd7", textColor: "#fff", token: "--info-on-light" },
      { name: "On Dark",    value: "#a9cbff", textColor: "#231d1a", token: "--info-on-dark" },
    ],
  },
  {
    label: "Warning",
    swatches: [
      { name: "Solid",      value: "#8a4f00", textColor: "#fff", token: "--warning-solid" },
      { name: "Soft Light", value: "#fff4e5", textColor: "#231d1a", token: "--warning-soft-light" },
      { name: "Soft Dark",  value: "#33210a", textColor: "#fff", token: "--warning-soft-dark" },
      { name: "On Light",   value: "#8a4f00", textColor: "#fff", token: "--warning-on-light" },
      { name: "On Dark",    value: "#ffd08a", textColor: "#231d1a", token: "--warning-on-dark" },
    ],
  },
  {
    label: "Success",
    swatches: [
      { name: "Solid",      value: "#0f6a43", textColor: "#fff", token: "--success-solid" },
      { name: "Soft Light", value: "#eaf7f0", textColor: "#231d1a", token: "--success-soft-light" },
      { name: "Soft Dark",  value: "#10261c", textColor: "#fff", token: "--success-soft-dark" },
      { name: "On Light",   value: "#0f6a43", textColor: "#fff", token: "--success-on-light" },
      { name: "On Dark",    value: "#7ad6a7", textColor: "#231d1a", token: "--success-on-dark" },
    ],
  },
  {
    label: "Neutral / Read-only",
    swatches: [
      { name: "Solid",      value: "#5f514b", textColor: "#fff", token: "--neutral-solid" },
      { name: "Soft Light", value: "#f4ece8", textColor: "#231d1a", token: "--neutral-soft-light" },
      { name: "Soft Dark",  value: "#262322", textColor: "#fff", token: "--neutral-soft-dark" },
      { name: "On Light",   value: "#5f514b", textColor: "#fff", token: "--neutral-on-light" },
      { name: "On Dark",    value: "#c7b8b2", textColor: "#231d1a", token: "--neutral-on-dark" },
    ],
  },
];

const interactionColors: ColorGroup[] = [
  {
    label: "Disabled — Light",
    swatches: [
      { name: "BG",        value: "#fff2ed", textColor: "#231d1a", token: "--disabled-bg (light)" },
      { name: "Border",    value: "#ff5931", textColor: "#fff", token: "--disabled-border (light)" },
      { name: "Text/Icon", value: "#70635d", textColor: "#fff", token: "--disabled-text (light)" },
    ],
  },
  {
    label: "Disabled — Dark",
    swatches: [
      { name: "BG",        value: "#262322", textColor: "#fff", token: "--disabled-bg (dark)" },
      { name: "Border",    value: "#70635d", textColor: "#fff", token: "--disabled-border (dark)" },
      { name: "Text/Icon", value: "#8a807c", textColor: "#fff", token: "--disabled-text (dark)" },
    ],
  },
  {
    label: "Focus",
    swatches: [
      { name: "Ring Light", value: "#ff9571", textColor: "#231d1a", token: "--focus-ring" },
      { name: "Ring Dark",  value: "#ff5931", textColor: "#fff", token: "--focus-ring (dark)" },
    ],
  },
  {
    label: "Selected / Active — Light",
    swatches: [
      { name: "BG",        value: "#ffe2d4", textColor: "#231d1a", token: "--selected-bg (light)" },
      { name: "Border",    value: "#ff5931", textColor: "#fff", token: "--selected-border" },
      { name: "Text/Icon", value: "#c60f08", textColor: "#fff", token: "--selected-text (light)" },
    ],
  },
  {
    label: "Selected / Active — Dark",
    swatches: [
      { name: "BG",        value: "#440608", textColor: "#fff", token: "--selected-bg (dark)" },
      { name: "Border",    value: "#ff5931", textColor: "#fff", token: "--selected-border" },
      { name: "Text/Icon", value: "#ff9571", textColor: "#231d1a", token: "--selected-text (dark)" },
    ],
  },
];

// ── Typography Data ──────────────────────────────────────────────────────────

const typeScale = [
  { name: "Display",  size: "36px / 2.25rem", weight: "Medium 500", sample: "Rally Workspace" },
  { name: "H1",       size: "28px / 1.75rem", weight: "Medium 500", sample: "Page Heading" },
  { name: "H2",       size: "22px / 1.375rem", weight: "Medium 500", sample: "Section Heading" },
  { name: "H3",       size: "18px / 1.125rem", weight: "Medium 500", sample: "Card Heading" },
  { name: "H4",       size: "16px / 1rem",     weight: "Medium 500", sample: "Sub-heading" },
  { name: "Body",     size: "16px / 1rem",     weight: "Normal 400", sample: "Regular body text for paragraphs and descriptions." },
  { name: "Body SM",  size: "14px / 0.875rem", weight: "Normal 400", sample: "Smaller body text for secondary information." },
  { name: "Caption",  size: "12px / 0.75rem",  weight: "Normal 400", sample: "Caption text, labels, hints." },
  { name: "Overline", size: "11px / 0.6875rem", weight: "Medium 500", sample: "SECTION LABEL / CATEGORY TAG" },
];

const typeSizeMap: Record<string, string> = {
  Display:  "text-[36px]",
  H1:       "text-[28px]",
  H2:       "text-[22px]",
  H3:       "text-[18px]",
  H4:       "text-[16px]",
  Body:     "text-[16px]",
  "Body SM":"text-[14px]",
  Caption:  "text-[12px]",
  Overline: "text-[11px]",
};

// ── Spacing Data ─────────────────────────────────────────────────────────────

const spacingScale = [
  { token: "space-1",  px: "4px",   rem: "0.25rem" },
  { token: "space-2",  px: "8px",   rem: "0.5rem" },
  { token: "space-3",  px: "12px",  rem: "0.75rem" },
  { token: "space-4",  px: "16px",  rem: "1rem" },
  { token: "space-5",  px: "20px",  rem: "1.25rem" },
  { token: "space-6",  px: "24px",  rem: "1.5rem" },
  { token: "space-8",  px: "32px",  rem: "2rem" },
  { token: "space-10", px: "40px",  rem: "2.5rem" },
  { token: "space-12", px: "48px",  rem: "3rem" },
  { token: "space-16", px: "64px",  rem: "4rem" },
];

const radiusScale = [
  { token: "--radius-xs",   value: "2px",    tailwind: "rounded-[2px]",    label: "XS" },
  { token: "--radius-sm",   value: "4px",    tailwind: "rounded-[4px]",    label: "SM" },
  { token: "--radius",      value: "8px",    tailwind: "rounded-[8px]",    label: "Base" },
  { token: "--radius-md",   value: "10px",   tailwind: "rounded-[10px]",   label: "MD" },
  { token: "--radius-lg",   value: "12px",   tailwind: "rounded-[12px]",   label: "LG" },
  { token: "--radius-xl",   value: "16px",   tailwind: "rounded-[16px]",   label: "XL" },
  { token: "--radius-2xl",  value: "20px",   tailwind: "rounded-[20px]",   label: "2XL" },
  { token: "--radius-full", value: "9999px", tailwind: "rounded-full",     label: "Full" },
];

const shadowScale = [
  { token: "--shadow-sm", label: "SM",  desc: "Subtle lift — tooltips, chips" },
  { token: "--shadow",    label: "Base",desc: "Cards, dropdowns" },
  { token: "--shadow-md", label: "MD",  desc: "Modals, popovers" },
  { token: "--shadow-lg", label: "LG",  desc: "Dialogs, drawers" },
  { token: "--shadow-xl", label: "XL",  desc: "Full-page overlays" },
];

const shadowValues: Record<string, string> = {
  "--shadow-sm":  "0 1px 2px 0 rgba(35,29,26,0.06)",
  "--shadow":     "0 2px 8px 0 rgba(35,29,26,0.10)",
  "--shadow-md":  "0 4px 16px 0 rgba(35,29,26,0.13)",
  "--shadow-lg":  "0 8px 32px 0 rgba(35,29,26,0.16)",
  "--shadow-xl":  "0 16px 48px 0 rgba(35,29,26,0.20)",
};

// ── Tabs ─────────────────────────────────────────────────────────────────────

const TABS = ["Brand", "Colors", "Typography", "Spacing", "Components", "Themes"] as const;
type Tab = typeof TABS[number];

// ── CopyBadge ────────────────────────────────────────────────────────────────

function CopyBadge({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }
  return (
    <button
      onClick={copy}
      className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
      title={`Copy ${text}`}
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
    </button>
  );
}

// ── Swatch ───────────────────────────────────────────────────────────────────

function Swatch({ s }: { s: ColorSwatch }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(s.value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }
  return (
    <button
      onClick={copy}
      className="group flex flex-col rounded-[8px] overflow-hidden border border-border text-left min-w-0 transition-transform hover:scale-[1.02] active:scale-[0.98]"
      title={`Copy ${s.value}`}
    >
      <div
        className="h-14 w-full flex items-center justify-center"
        style={{ background: s.value }}
      >
        {copied && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-black/30 text-white">
            Copied!
          </span>
        )}
      </div>
      <div className="bg-card px-2 py-1.5">
        <p className="text-[11px] font-medium text-foreground truncate">{s.name}</p>
        <p className="text-[10px] text-muted-foreground truncate font-mono">{s.value}</p>
        {s.token && (
          <p className="text-[10px] text-muted-foreground/70 truncate font-mono">{s.token}</p>
        )}
      </div>
    </button>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-[11px] font-medium uppercase tracking-widest border-b border-[var(--border-subtle)] pb-2" style={{ color: "var(--text-overline)" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

// ── Logo ─────────────────────────────────────────────────────────────────────

function LogoMark({ bg, iconColor, size = 64 }: { bg: string; iconColor: string; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-[20px] flex-shrink-0"
      style={{ width: size, height: size, background: bg }}
    >
      <svg
        viewBox="27 26 133 127"
        style={{ width: size * 0.68, height: size * 0.68 }}
        fill="none"
      >
        <path d={svgPaths.p6b466c0} fill={iconColor} />
      </svg>
    </div>
  );
}

// ── Component Showcase ──────────────────────────────────���────────────────────

function ShowcaseRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-6">
      <span className="text-[11px] text-muted-foreground font-mono w-28 flex-shrink-0 pt-2">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function DemoButton({
  label, bg, border, text, disabled
}: { label: string; bg: string; border?: string; text: string; disabled?: boolean }) {
  return (
    <button
      disabled={disabled}
      className="px-4 py-2 rounded-[8px] text-[14px] font-medium transition-all"
      style={{
        background: bg,
        border: border ? `1.5px solid ${border}` : "none",
        color: text,
        opacity: disabled ? 0.55 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </button>
  );
}

function DemoBadge({ label, bg, text }: { label: string; bg: string; text: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium"
      style={{ background: bg, color: text }}
    >
      {label}
    </span>
  );
}

// ── Theme Mini Preview ────────────────────────────────────────────────────────

function ThemeMiniPreview({ palette }: { palette: ThemePalette }) {
  const p = palette.preview;
  return (
    <div style={{ background: p.canvas, borderBottom: `1px solid ${p.border}`, height: 120 }}
      className="overflow-hidden flex flex-col">
      {/* Browser bar */}
      <div style={{ background: p.surface, borderBottom: `1px solid ${p.border}`, padding: "5px 8px", flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
        <div style={{ flex: 1, height: 7, borderRadius: 4, background: p.border, marginLeft: 4, opacity: 0.5 }} />
      </div>
      {/* App shell */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: 24, background: p.surface, borderRight: `1px solid ${p.border}`, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 5, gap: 5, flexShrink: 0 }}>
          <div style={{ width: 10, height: 10, borderRadius: 3, background: p.primary }} />
          {[0, 1, 2].map(i => <div key={i} style={{ width: 10, height: 10, borderRadius: 3, background: p.border }} />)}
        </div>
        {/* Content */}
        <div style={{ flex: 1, padding: "6px 8px" }}>
          <div style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: 5, padding: "4px 6px", marginBottom: 5 }}>
            <div style={{ width: 55, height: 5, borderRadius: 2, background: p.text, marginBottom: 3 }} />
            <div style={{ width: 80, height: 4, borderRadius: 2, background: p.text, opacity: 0.4, marginBottom: 2 }} />
            <div style={{ width: 65, height: 4, borderRadius: 2, background: p.text, opacity: 0.25 }} />
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ background: p.primary, borderRadius: 3, padding: "2px 7px" }}>
              <div style={{ width: 22, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.9)" }} />
            </div>
            <div style={{ border: `1px solid ${p.border}`, borderRadius: 3, padding: "2px 7px" }}>
              <div style={{ width: 22, height: 3, borderRadius: 2, background: p.text, opacity: 0.35 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export function DesignSystem() {
  const [activeTab, setActiveTab] = useState<Tab>("Brand");
  const { activePaletteId, activePalette, palettes, setPalette } = usePalette();

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-card px-6 py-4 flex items-center gap-4">
        <LogoMark bg="#191919" iconColor="#ff4615" size={36} />
        <div>
          <h1 className="text-[20px] font-medium text-foreground leading-tight">Design System</h1>
          <p className="text-[12px] text-muted-foreground">Rally · v1.0</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground font-mono bg-muted px-2 py-1 rounded-[6px] flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "var(--rally-brand)" }} />
            {activePalette.emoji} {activePalette.name}
          </span>
          <span className="text-[11px] text-muted-foreground font-mono bg-muted px-2 py-1 rounded-[6px]">
            Font: Nunito Sans
          </span>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex-shrink-0 border-b border-border bg-card px-6 flex items-center gap-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={[
              "px-4 py-3 text-[13px] font-medium border-b-2 transition-colors flex items-center gap-1.5",
              activeTab === tab
                ? "border-[var(--rally-brand)] text-[var(--rally-brand)]"
                : "border-transparent text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {tab === "Themes" && <Palette className="size-3.5" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-10">

        {/* ── BRAND ─────────────────────────────────────────── */}
        {activeTab === "Brand" && (
          <>
            <Section title="Logo">
              <div className="flex flex-wrap gap-6">
                {/* Dark variant */}
                <div className="flex flex-col gap-2">
                  <div
                    className="flex items-center justify-center rounded-[20px]"
                    style={{ width: 120, height: 120, background: "#191919" }}
                  >
                    <svg viewBox="27 26 133 127" style={{ width: 80, height: 80 }} fill="none">
                      <path d={svgPaths.p6b466c0} fill="#ff4615" />
                    </svg>
                  </div>
                  <p className="text-[11px] text-muted-foreground text-center">Dark background</p>
                  <p className="text-[10px] font-mono text-muted-foreground/70 text-center">bg #191919</p>
                </div>

                {/* Light variant */}
                <div className="flex flex-col gap-2">
                  <div
                    className="flex items-center justify-center rounded-[20px] border border-border"
                    style={{ width: 120, height: 120, background: "#ffe1d2" }}
                  >
                    <svg viewBox="27 26 133 127" style={{ width: 80, height: 80 }} fill="none">
                      <path d={svgPaths.p6b466c0} fill="#ff4615" />
                    </svg>
                  </div>
                  <p className="text-[11px] text-muted-foreground text-center">Light background</p>
                  <p className="text-[10px] font-mono text-muted-foreground/70 text-center">bg #ffe1d2</p>
                </div>

                {/* Icon-only sizes */}
                <div className="flex flex-col gap-3 justify-center">
                  <p className="text-[11px] text-muted-foreground font-medium">Scale</p>
                  <div className="flex items-end gap-3">
                    {[16, 24, 32, 48, 64].map((s) => (
                      <div key={s} className="flex flex-col items-center gap-1">
                        <LogoMark bg="#191919" iconColor="#ff4615" size={s} />
                        <span className="text-[10px] font-mono text-muted-foreground">{s}px</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Brand Name">
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline gap-3">
                  <LogoMark bg="#191919" iconColor="#ff4615" size={40} />
                  <span className="text-[28px] font-medium text-foreground tracking-tight">Rally</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <LogoMark bg="#ffe1d2" iconColor="#ff4615" size={40} />
                  <span className="text-[28px] font-medium text-foreground tracking-tight">Rally</span>
                </div>
              </div>
            </Section>

            <Section title="Brand Colors">
              <div className="grid grid-cols-7 gap-3">
                {brandColors[0].swatches.map((s) => (
                  <Swatch key={s.name} s={s} />
                ))}
              </div>
            </Section>

            <Section title="Usage Guidelines">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Do", color: "#0f6a43", items: ["Use #ff4615 as the primary action color", "Use Rally Orange on both dark and light backgrounds with proper contrast", "Pair brand orange with neutral backgrounds from the base layer"] },
                  { title: "Don't", color: "#d90000", items: ["Don't use the brand color as background for large areas", "Don't place light text directly on #ff9571 (low contrast)", "Don't use gradients — flat brand colors only"] },
                  { title: "Tip", color: "#0f5fd7", items: ["Use --rally-brand-soft-light (#fff2ed) for tinted surfaces", "Use --rally-brand-on-light (#c60f08) for text on light surfaces", "Use --rally-brand-on-dark (#ff9571) for text on dark surfaces"] },
                ].map((box) => (
                  <div
                    key={box.title}
                    className="rounded-[12px] border border-border bg-card p-4 space-y-2"
                    style={{ borderLeftColor: box.color, borderLeftWidth: 3 }}
                  >
                    <p className="text-[13px] font-medium" style={{ color: box.color }}>{box.title}</p>
                    <ul className="space-y-1">
                      {box.items.map((item, i) => (
                        <li key={i} className="text-[12px] text-muted-foreground flex gap-2">
                          <span style={{ color: box.color }}>·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}

        {/* ── COLORS ────────────────────────────────────────── */}
        {activeTab === "Colors" && (
          <>
            {baseLayerColors.map((group) => (
              <Section key={group.label} title={group.label}>
                <div className="grid grid-cols-6 gap-3">
                  {group.swatches.map((s) => <Swatch key={s.name} s={s} />)}
                </div>
              </Section>
            ))}

            <div className="border-t border-border" />

            {semanticColors.map((group) => (
              <Section key={group.label} title={group.label}>
                <div className="flex flex-wrap gap-3">
                  {group.swatches.map((s) => (
                    <div key={s.name} className="w-[120px]">
                      <Swatch s={s} />
                    </div>
                  ))}
                </div>
              </Section>
            ))}

            <div className="border-t border-border" />

            {interactionColors.map((group) => (
              <Section key={group.label} title={group.label}>
                <div className="flex flex-wrap gap-3">
                  {group.swatches.map((s) => (
                    <div key={s.name} className="w-[120px]">
                      <Swatch s={s} />
                    </div>
                  ))}
                </div>
              </Section>
            ))}
          </>
        )}

        {/* ── TYPOGRAPHY ────────────────────────────────────── */}
        {activeTab === "Typography" && (
          <>
            <Section title="Type Scale">
              <div className="space-y-1">
                {typeScale.map((t) => (
                  <div
                    key={t.name}
                    className="group flex items-baseline gap-4 py-3 border-b border-border last:border-none"
                  >
                    <span className="text-[11px] font-mono text-muted-foreground w-16 flex-shrink-0">{t.name}</span>
                    <span
                      className={`flex-1 text-foreground ${typeSizeMap[t.name] ?? "text-[16px]"} ${
                        t.weight.includes("Medium") ? "font-medium" : "font-normal"
                      } ${t.name === "Overline" ? "uppercase tracking-widest" : ""}`}
                    >
                      {t.sample}
                    </span>
                    <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-mono text-muted-foreground">{t.size}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{t.weight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Font Family">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-[12px] p-4 space-y-2">
                  <p className="text-[11px] text-muted-foreground font-mono">--font-sans (primary)</p>
                  <p className="text-[28px] font-medium text-foreground" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                    Nunito Sans
                  </p>
                  <p className="text-[13px] text-muted-foreground">
                    Used for all UI text — labels, body, headings, buttons, and inputs.
                  </p>
                  <p className="text-[11px] font-mono text-muted-foreground">
                    'Nunito Sans', ui-sans-serif, system-ui, sans-serif
                  </p>
                  <div className="pt-2 border-t border-border space-y-1">
                    <p className="text-[11px] text-muted-foreground">Character set preview</p>
                    <p className="text-[15px] text-foreground tracking-wide" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                      Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk
                    </p>
                    <p className="text-[15px] text-foreground tracking-wide" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                      0 1 2 3 4 5 6 7 8 9 ! @ # $ % &
                    </p>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-[12px] p-4 space-y-2">
                  <p className="text-[11px] text-muted-foreground font-mono">--font-mono (code)</p>
                  <p className="text-[24px] font-medium text-foreground" style={{ fontFamily: "ui-monospace, monospace" }}>
                    Mono / Code
                  </p>
                  <p className="text-[13px] text-muted-foreground">
                    Used for code blocks, token values, hex colors, and technical labels.
                  </p>
                  <p className="text-[11px] font-mono text-muted-foreground">
                    ui-monospace, Menlo, 'Courier New', monospace
                  </p>
                  <div className="pt-2 border-t border-border space-y-1">
                    <p className="text-[11px] text-muted-foreground">Character set preview</p>
                    <p className="text-[13px] text-foreground tracking-wide font-mono">
                      --rally-brand: #ff4615;
                    </p>
                    <p className="text-[13px] text-foreground tracking-wide font-mono">
                      const size = 16px → 1rem;
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Font Weights — Nunito Sans">
              <div className="flex flex-wrap gap-4">
                {[
                  { weight: 300, label: "Light",    token: "font-light" },
                  { weight: 400, label: "Regular",  token: "--font-weight-normal" },
                  { weight: 500, label: "Medium",   token: "--font-weight-medium" },
                  { weight: 600, label: "Semibold", token: "font-semibold" },
                  { weight: 700, label: "Bold",     token: "font-bold" },
                ].map((w) => (
                  <div key={w.weight} className="bg-card border border-border rounded-[12px] px-5 py-4 space-y-1 min-w-[150px]">
                    <p className="text-[11px] font-mono text-muted-foreground">{w.token}</p>
                    <p className="text-[28px] text-foreground" style={{ fontWeight: w.weight, fontFamily: "'Nunito Sans', sans-serif" }}>Aa</p>
                    <p className="text-[13px] text-foreground" style={{ fontWeight: w.weight, fontFamily: "'Nunito Sans', sans-serif" }}>
                      Rally Workspace
                    </p>
                    <p className="text-[11px] text-muted-foreground">{w.label} · {w.weight}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Type Specimen — Nunito Sans">
              <div className="bg-card border border-border rounded-[12px] p-6 space-y-4" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                <div className="border-b border-border pb-4">
                  <p className="text-[11px] font-mono text-muted-foreground mb-1">Display · 36px · Weight 500</p>
                  <p className="text-[36px] font-medium text-foreground leading-tight">Rally — Better Together</p>
                </div>
                <div className="border-b border-border pb-4">
                  <p className="text-[11px] font-mono text-muted-foreground mb-1">H1 · 28px · Weight 500</p>
                  <p className="text-[28px] font-medium text-foreground leading-tight">Team Collaboration Workspace</p>
                </div>
                <div className="border-b border-border pb-4">
                  <p className="text-[11px] font-mono text-muted-foreground mb-1">Body · 16px · Weight 400</p>
                  <p className="text-[16px] text-foreground leading-relaxed">
                    Rally brings your team together with chat, task management, a shared calendar, and AI-powered tools — all in one place. Collaborate in real time, stay organized, and move faster.
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-mono text-muted-foreground mb-1">Caption · 12px · Weight 400</p>
                  <p className="text-[12px] text-muted-foreground">Last updated April 16, 2026 · Rally v1.0 · Design System</p>
                </div>
              </div>
            </Section>
          </>
        )}

        {/* ── SPACING ───────────────────────────────────────── */}
        {activeTab === "Spacing" && (
          <>
            <Section title="Spacing Scale">
              <div className="space-y-2">
                {spacingScale.map((s) => (
                  <div key={s.token} className="group flex items-center gap-4 py-2">
                    <span className="text-[11px] font-mono text-muted-foreground w-20 flex-shrink-0">{s.token}</span>
                    <div
                      className="rounded-sm flex-shrink-0"
                      style={{ height: 16, width: s.px, background: "var(--rally-brand)" }}
                    />
                    <span className="text-[12px] font-mono text-muted-foreground">{s.px}</span>
                    <span className="text-[11px] text-muted-foreground/60">{s.rem}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Border Radius">
              <div className="flex flex-wrap gap-4 items-end">
                {radiusScale.map((r) => (
                  <div key={r.token} className="flex flex-col items-center gap-2">
                    <div
                      className="bg-muted border border-border"
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: r.value === "9999px" ? "9999px" : r.value,
                      }}
                    />
                    <span className="text-[10px] font-mono text-muted-foreground">{r.label}</span>
                    <span className="text-[10px] font-mono text-muted-foreground/60">{r.value}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Shadows / Elevation">
              <div className="flex flex-wrap gap-6 pt-2">
                {shadowScale.map((s) => (
                  <div key={s.token} className="flex flex-col items-center gap-3">
                    <div
                      className="bg-card rounded-[12px] flex items-center justify-center"
                      style={{
                        width: 100,
                        height: 70,
                        boxShadow: shadowValues[s.token],
                      }}
                    >
                      <span className="text-[11px] font-medium text-foreground">{s.label}</span>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-mono text-muted-foreground">{s.token}</p>
                      <p className="text-[10px] text-muted-foreground/60">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}

        {/* ── COMPONENTS ────────────────────────────────────── */}
        {activeTab === "Components" && (
          <>
            <Section title="Buttons">
              <div className="space-y-4">
                <ShowcaseRow label="Primary">
                  <DemoButton label="Default" bg="#ff4615" text="#fff" />
                  <DemoButton label="Hover" bg="#fe3511" text="#fff" />
                  <DemoButton label="Pressed" bg="#ef1b07" text="#fff" />
                  <DemoButton label="Disabled" bg="#ffbda4" text="#fff" disabled />
                </ShowcaseRow>
                <ShowcaseRow label="Secondary">
                  <DemoButton label="Default" bg="transparent" border="#d1aa99" text="var(--text-primary, #231d1a)" />
                  <DemoButton label="Hover" bg="#f4ece8" border="#d1aa99" text="var(--text-primary, #231d1a)" />
                  <DemoButton label="Disabled" bg="transparent" border="#d1aa99" text="#70635d" disabled />
                </ShowcaseRow>
                <ShowcaseRow label="Destructive">
                  <DemoButton label="Default" bg="#d90000" text="#fff" />
                  <DemoButton label="Hover" bg="#b00000" text="#fff" />
                  <DemoButton label="Disabled" bg="#fdecec" text="#b00000" disabled />
                </ShowcaseRow>
                <ShowcaseRow label="Ghost">
                  <DemoButton label="Default" bg="transparent" text="var(--text-primary, #231d1a)" />
                  <DemoButton label="Hover" bg="#f4ece8" text="var(--text-primary, #231d1a)" />
                  <DemoButton label="Brand ghost" bg="#fff2ed" text="#c60f08" />
                </ShowcaseRow>
              </div>
            </Section>

            <Section title="Badges">
              <div className="flex flex-wrap gap-3">
                <DemoBadge label="Primary"  bg="#fff2ed" text="#c60f08" />
                <DemoBadge label="Success"  bg="#eaf7f0" text="#0f6a43" />
                <DemoBadge label="Warning"  bg="#fff4e5" text="#8a4f00" />
                <DemoBadge label="Error"    bg="#fdecec" text="#b00000" />
                <DemoBadge label="Info"     bg="#eef4ff" text="#0f5fd7" />
                <DemoBadge label="Neutral"  bg="#f4ece8" text="#5f514b" />
                <DemoBadge label="Solid"    bg="#ff4615" text="#fff" />
              </div>
            </Section>

            <Section title="Input Fields">
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-muted-foreground font-mono">Default</label>
                  <input
                    type="text"
                    placeholder="Type something..."
                    className="px-3 py-2 rounded-[8px] border text-[14px] bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2"
                    style={{ borderColor: "#d1aa99", width: 200 }}
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-muted-foreground font-mono">Focused</label>
                  <input
                    type="text"
                    defaultValue="Focused state"
                    className="px-3 py-2 rounded-[8px] border text-[14px] bg-card text-foreground outline-none ring-2"
                    style={{ borderColor: "#ff4615", ringColor: "#ff9571", boxShadow: "0 0 0 2px #ff957155", width: 200 }}
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-muted-foreground font-mono">Error</label>
                  <input
                    type="text"
                    defaultValue="Invalid value"
                    className="px-3 py-2 rounded-[8px] border text-[14px] bg-card text-foreground outline-none"
                    style={{ borderColor: "#d90000", boxShadow: "0 0 0 2px #fdecec", width: 200 }}
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-muted-foreground font-mono">Disabled</label>
                  <input
                    type="text"
                    defaultValue="Disabled input"
                    className="px-3 py-2 rounded-[8px] border text-[14px] bg-card outline-none cursor-not-allowed"
                    style={{ borderColor: "#d1aa99", color: "#70635d", opacity: 0.65, width: 200 }}
                    readOnly
                    disabled
                  />
                </div>
              </div>
            </Section>

            <Section title="Cards">
              <div className="flex flex-wrap gap-4">
                {/* Base card */}
                <div className="bg-card border border-border rounded-[12px] p-4 w-56 space-y-2" style={{ boxShadow: "0 2px 8px 0 rgba(35,29,26,0.10)" }}>
                  <p className="text-[13px] font-medium text-foreground">Base Card</p>
                  <p className="text-[12px] text-muted-foreground">Standard card with border and shadow. Used for content containers.</p>
                  <p className="text-[10px] font-mono text-muted-foreground/60">bg-card · border-border · --shadow</p>
                </div>
                {/* Brand tinted */}
                <div className="border rounded-[12px] p-4 w-56 space-y-2" style={{ background: "#fff2ed", borderColor: "#ff5931" }}>
                  <p className="text-[13px] font-medium" style={{ color: "#c60f08" }}>Brand Card</p>
                  <p className="text-[12px]" style={{ color: "#5f514b" }}>Tinted with brand soft light. Used for highlighted content.</p>
                  <p className="text-[10px] font-mono" style={{ color: "#d1aa99" }}>--rally-brand-soft-light · #ff5931</p>
                </div>
                {/* Success */}
                <div className="border rounded-[12px] p-4 w-56 space-y-2" style={{ background: "#eaf7f0", borderColor: "#0f6a43" }}>
                  <p className="text-[13px] font-medium" style={{ color: "#0f6a43" }}>Success Card</p>
                  <p className="text-[12px]" style={{ color: "#5f514b" }}>Used for confirmation messages and successful states.</p>
                  <p className="text-[10px] font-mono" style={{ color: "#0f6a43" }}>--success-soft-light · --success-solid</p>
                </div>
                {/* Error */}
                <div className="border rounded-[12px] p-4 w-56 space-y-2" style={{ background: "#fdecec", borderColor: "#d90000" }}>
                  <p className="text-[13px] font-medium" style={{ color: "#b00000" }}>Error Card</p>
                  <p className="text-[12px]" style={{ color: "#5f514b" }}>Used for destructive actions and error states.</p>
                  <p className="text-[10px] font-mono" style={{ color: "#b00000" }}>--error-soft-light · --error-solid</p>
                </div>
              </div>
            </Section>

            <Section title="Interaction States">
              <div className="flex flex-wrap gap-4">
                {/* Normal */}
                <div className="flex flex-col gap-1 items-center">
                  <div className="rounded-[8px] border px-4 py-2.5 text-[13px] font-medium cursor-pointer" style={{ background: "var(--rally-brand)", borderColor: "var(--rally-brand)", color: "#fff" }}>
                    Normal
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">normal</span>
                </div>
                {/* Hover */}
                <div className="flex flex-col gap-1 items-center">
                  <div className="rounded-[8px] border px-4 py-2.5 text-[13px] font-medium" style={{ background: "var(--rally-brand-hover)", borderColor: "var(--rally-brand-hover)", color: "#fff" }}>
                    Hover
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">:hover</span>
                </div>
                {/* Focus */}
                <div className="flex flex-col gap-1 items-center">
                  <div className="rounded-[8px] border px-4 py-2.5 text-[13px] font-medium" style={{ background: "var(--rally-brand)", borderColor: "var(--rally-brand)", color: "#fff", boxShadow: "0 0 0 3px var(--focus-ring)" }}>
                    Focus
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">:focus</span>
                </div>
                {/* Pressed */}
                <div className="flex flex-col gap-1 items-center">
                  <div className="rounded-[8px] border px-4 py-2.5 text-[13px] font-medium" style={{ background: "var(--rally-brand-pressed)", borderColor: "var(--rally-brand-pressed)", color: "#fff" }}>
                    Pressed
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">:active</span>
                </div>
                {/* Selected */}
                <div className="flex flex-col gap-1 items-center">
                  <div className="rounded-[8px] border px-4 py-2.5 text-[13px] font-medium" style={{ background: "var(--selected-bg)", borderColor: "var(--selected-border)", color: "var(--selected-text)" }}>
                    Selected
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">selected</span>
                </div>
                {/* Disabled */}
                <div className="flex flex-col gap-1 items-center">
                  <div className="rounded-[8px] border px-4 py-2.5 text-[13px] font-medium cursor-not-allowed" style={{ background: "var(--disabled-bg)", borderColor: "var(--disabled-border)", color: "var(--disabled-text)", opacity: 0.65 }}>
                    Disabled
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">disabled</span>
                </div>
              </div>
            </Section>

            <Section title="Avatars">
              <div className="flex flex-wrap items-end gap-4">
                {[
                  { size: 24, initials: "R", label: "24px" },
                  { size: 32, initials: "RW", label: "32px" },
                  { size: 40, initials: "RW", label: "40px" },
                  { size: 48, initials: "RW", label: "48px" },
                  { size: 64, initials: "RW", label: "64px" },
                ].map(({ size, initials, label }) => (
                  <div key={size} className="flex flex-col items-center gap-1">
                    <div
                      className="rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ width: size, height: size, background: "var(--rally-brand)" }}
                    >
                      <span className="text-white font-medium" style={{ fontSize: size * 0.35 }}>{initials}</span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Token Reference">
              <div className="bg-card border border-border rounded-[12px] overflow-hidden">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-muted-foreground font-medium">Token</th>
                      <th className="text-left px-4 py-2 text-muted-foreground font-medium">Value</th>
                      <th className="text-left px-4 py-2 text-muted-foreground font-medium">Preview</th>
                      <th className="text-left px-4 py-2 text-muted-foreground font-medium">Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { token: "--rally-brand",          value: "#ff4615", usage: "Primary buttons, links, icons" },
                      { token: "--rally-brand-hover",    value: "#fe3511", usage: "Hovered primary elements" },
                      { token: "--rally-brand-pressed",  value: "#ef1b07", usage: "Pressed / active primary" },
                      { token: "--rally-brand-soft-light", value: "#fff2ed", usage: "Tinted light backgrounds" },
                      { token: "--rally-brand-soft-dark",  value: "#440608", usage: "Tinted dark backgrounds" },
                      { token: "--focus-ring",           value: "#ff9571", usage: "Focus ring outline" },
                      { token: "--error-solid",          value: "#d90000", usage: "Destructive actions" },
                      { token: "--success-solid",        value: "#0f6a43", usage: "Confirmations, success" },
                      { token: "--warning-solid",        value: "#8a4f00", usage: "Warnings, caution" },
                      { token: "--info-solid",           value: "#0f5fd7", usage: "Informational" },
                    ].map((row) => (
                      <tr key={row.token} className="border-b border-border last:border-none hover:bg-muted/20 transition-colors group">
                        <td className="px-4 py-2 font-mono text-muted-foreground flex items-center gap-1">
                          {row.token}
                          <CopyBadge text={row.token} />
                        </td>
                        <td className="px-4 py-2 font-mono text-foreground">
                          <span className="flex items-center gap-1">
                            {row.value}
                            <CopyBadge text={row.value} />
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <div className="w-6 h-6 rounded-[4px] border border-border" style={{ background: row.value }} />
                        </td>
                        <td className="px-4 py-2 text-muted-foreground">{row.usage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          </>
        )}

        {/* ── THEMES ───────────────────────────────────────────────────────── */}
        {activeTab === "Themes" && (
          <>
            {/* Active banner */}
            <div className="flex items-center gap-4 p-4 rounded-[14px] border border-border bg-card">
              <div className="w-12 h-12 rounded-[12px] flex items-center justify-center text-[22px] flex-shrink-0 border border-border"
                style={{ background: activePalette.preview.canvas }}>
                {activePalette.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-foreground">{activePalette.name} — currently active</p>
                <p className="text-[12px] text-muted-foreground">{activePalette.description}</p>
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                {[activePalette.preview.primary, activePalette.preview.canvas, activePalette.preview.surface, activePalette.preview.border, activePalette.preview.text].map((c, i) => (
                  <div key={i} className="w-6 h-6 rounded-[6px] border border-border/60" style={{ background: c }} />
                ))}
              </div>
            </div>

            {/* Theme grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {palettes.map(palette => {
                const isActive = palette.id === activePaletteId;
                return (
                  <div key={palette.id}
                    className="rounded-[14px] bg-card overflow-hidden transition-all hover:shadow-md"
                    style={{ border: `${isActive ? 2 : 1}px solid ${isActive ? palette.preview.primary : "var(--border)"}` }}>
                    <ThemeMiniPreview palette={palette} />
                    <div className="p-4 border-t border-border">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[16px]">{palette.emoji}</span>
                        <span className="text-[13px] font-semibold text-foreground">{palette.name}</span>
                        {isActive && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full text-white font-medium flex-shrink-0"
                            style={{ background: palette.preview.primary }}>Active</span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">{palette.description}</p>
                      {/* Color strip */}
                      <div className="flex gap-1 mb-3">
                        {[
                          { label: "Primary", color: palette.preview.primary },
                          { label: "Canvas",  color: palette.preview.canvas  },
                          { label: "Surface", color: palette.preview.surface },
                          { label: "Border",  color: palette.preview.border  },
                          { label: "Text",    color: palette.preview.text    },
                        ].map(chip => (
                          <div key={chip.label} className="flex-1 flex flex-col items-center gap-0.5" title={`${chip.label}: ${chip.color}`}>
                            <div className="w-full h-5 rounded-[4px] border border-border/40" style={{ background: chip.color }} />
                            <span className="text-[8px] text-muted-foreground/60 font-mono">{chip.label}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setPalette(palette.id)}
                        disabled={isActive}
                        className="w-full py-2 rounded-[8px] text-[12px] font-medium transition-all disabled:cursor-default"
                        style={isActive
                          ? { background: palette.preview.primary, color: "#fff" }
                          : { border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }
                        }>
                        {isActive ? "✓ Applied" : "Apply theme"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dark mode previews */}
            <Section title="Dark mode palette preview">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {palettes.map(palette => (
                  <div key={palette.id} className="rounded-[10px] border border-border overflow-hidden">
                    <div style={{ background: palette.dark['--canvas'] ?? '#191919', height: 64, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "0 10px" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: palette.preview.primary, flexShrink: 0 }} />
                      <div style={{ flex: 1, height: 22, borderRadius: 5, background: palette.dark['--elevated'] ?? '#2c2c2c', border: `1px solid ${palette.dark['--border-color'] ?? '#4a403c'}`, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 6px", gap: 3 }}>
                        <div style={{ width: "70%", height: 4, borderRadius: 2, background: palette.dark['--text-primary'] ?? '#fff2ed' }} />
                        <div style={{ width: "50%", height: 3, borderRadius: 2, background: palette.dark['--text-secondary'] ?? '#c7b8b2', opacity: 0.6 }} />
                      </div>
                    </div>
                    <div className="px-2 py-1.5 bg-card border-t border-border">
                      <p className="text-[10px] font-medium text-foreground">{palette.emoji} {palette.name}</p>
                      <code className="text-[10px] font-mono text-muted-foreground">{palette.dark['--canvas'] ?? '#191919'}</code>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* How it works */}
            <Section title="How the theme system works">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { emoji: "🎨", title: "CSS Custom Properties", body: "Every color is a CSS variable. Applying a theme injects overrides on :root via inline style, which cascade to every component, Tailwind utility, and CSS rule in the app." },
                  { emoji: "🌙", title: "Dark mode aware", body: "Each palette has separate light and dark maps. When the dark/light toggle is flipped, the context re-applies the correct palette values automatically." },
                  { emoji: "🔌", title: "Fully extensible", body: "Add new themes by adding an entry to PALETTES in PaletteContext.tsx. Define brand, light, and dark CSS var maps. No CSS files need to change." },
                ].map(item => (
                  <div key={item.title} className="rounded-[12px] border border-border bg-card p-4 space-y-2">
                    <span className="text-[20px]">{item.emoji}</span>
                    <p className="text-[13px] font-medium text-foreground">{item.title}</p>
                    <p className="text-[12px] text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* CSS variable reference */}
            <Section title="CSS variable helper — cv.* (import from PaletteContext)">
              <div className="rounded-[12px] border border-border bg-card overflow-hidden">
                <div className="px-4 py-2.5 border-b border-border bg-muted/30">
                  <code className="text-[11px] font-mono text-muted-foreground">
                    import &#123; cv &#125; from '../contexts/PaletteContext'; &nbsp;// usage: style=&#123;&#123; color: cv.brand &#125;&#125;
                  </code>
                </div>
                <div className="divide-y divide-border">
                  {([
                    ["cv.brand",        "var(--rally-brand)",           "Primary action color — buttons, links, active states"],
                    ["cv.brandHover",   "var(--rally-brand-hover)",      "Hover state of the primary color"],
                    ["cv.brandPressed", "var(--rally-brand-pressed)",    "Pressed / active state of primary"],
                    ["cv.brandSoft",    "var(--rally-brand-soft-light)", "Tinted brand surface — badge bg, soft card bg"],
                    ["cv.brandOnLight", "var(--rally-brand-on-light)",   "Brand-colored text on light surfaces"],
                    ["cv.brandOnDark",  "var(--rally-brand-on-dark)",    "Brand-colored text on dark surfaces"],
                    ["cv.focusRing",    "var(--focus-ring)",             "Focus ring / outline color"],
                    ["cv.selectedBg",   "var(--selected-bg)",            "Selected item background"],
                    ["cv.selectedText", "var(--selected-text)",          "Selected item text color"],
                    ["cv.bg",           "var(--background)",             "Page background (= bg-background)"],
                    ["cv.card",         "var(--card)",                   "Card surface background (= bg-card)"],
                    ["cv.border",       "var(--border)",                 "Border color (= border-border)"],
                  ] as [string, string, string][]).map(([key, token, desc]) => (
                    <div key={key} className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/20 transition-colors">
                      <code className="text-[11px] font-mono flex-shrink-0 w-32" style={{ color: "var(--rally-brand)" }}>{key}</code>
                      <code className="text-[11px] font-mono text-muted-foreground flex-shrink-0 w-52 hidden lg:block">{token}</code>
                      <span className="text-[11px] text-muted-foreground flex-1">{desc}</span>
                      <div className="w-5 h-5 rounded-[3px] border border-border/50 flex-shrink-0" style={{ background: token }} />
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </>
        )}
      </div>
    </div>
  );
}
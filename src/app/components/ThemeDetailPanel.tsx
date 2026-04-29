/**
 * ThemeDetailPanel
 * Right-side detail drawer triggered by the ⓘ icon on a theme card.
 * Width 480px desktop / full-screen mobile. Header is sticky.
 * Sections: Identity → Light Preview → Dark Preview → Token Table → States Matrix
 */

import { useState, useRef } from "react";
import { X, Sun, Moon } from "lucide-react";
import type { ThemePalette } from "../contexts/PaletteContext";
import { PreviewFrame } from "./ThemePreviewFrame";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ThemeDetailPanelProps {
  palette: ThemePalette | null;
  isOpen:  boolean;
  onClose: () => void;
}

// ── Token table data ──────────────────────────────────────────────────────────

type TokenRow = {
  name:  string;
  light: (p: ThemePalette) => string;
  dark:  (p: ThemePalette) => string;
};
type TokenGroup = { title: string; tokens: TokenRow[] };

const F: Record<string, string> = {
  errorSolid:       "#d90000",  errorSoftL: "#fdecec",  errorSoftD: "#341111",  errorOnL: "#b00000",  errorOnD: "#ff8a8a",
  infoSolid:        "#0f5fd7",  infoSoftL:  "#eef4ff",  infoSoftD:  "#101d36",  infoOnL:  "#0f5fd7",  infoOnD:  "#a9cbff",
  warnSolid:        "#8a4f00",  warnSoftL:  "#fff4e5",  warnSoftD:  "#33210a",  warnOnL:  "#8a4f00",  warnOnD:  "#ffd08a",
  sucSolid:         "#0f6a43",  sucSoftL:   "#eaf7f0",  sucSoftD:   "#10261c",  sucOnL:   "#0f6a43",  sucOnD:   "#7ad6a7",
  focusRing:        "#ff9571",
};

function fromBrand(k: string) { return (p: ThemePalette) => p.brand[k]  ?? ""; }
function fromLight(k: string) { return (p: ThemePalette) => p.light[k]  ?? ""; }
function fromDark (k: string) { return (p: ThemePalette) => p.dark[k]   ?? ""; }
function fixed    (v: string) { return (_: ThemePalette) => v; }

const TOKEN_GROUPS: TokenGroup[] = [
  {
    title: "Brand",
    tokens: [
      { name: "--rally-brand",             light: fromBrand("--rally-brand"),             dark: fromBrand("--rally-brand") },
      { name: "--rally-brand-hover",        light: fromBrand("--rally-brand-hover"),        dark: fromBrand("--rally-brand-hover") },
      { name: "--rally-brand-pressed",      light: fromBrand("--rally-brand-pressed"),      dark: fromBrand("--rally-brand-pressed") },
      { name: "--rally-brand-soft-light",   light: fromBrand("--rally-brand-soft-light"),   dark: fromBrand("--rally-brand-soft-light") },
      { name: "--rally-brand-soft-dark",    light: fromBrand("--rally-brand-soft-dark"),    dark: fromBrand("--rally-brand-soft-dark") },
      { name: "--rally-brand-on-light",     light: fromBrand("--rally-brand-on-light"),     dark: fromBrand("--rally-brand-on-light") },
      { name: "--rally-brand-on-dark",      light: fromBrand("--rally-brand-on-dark"),      dark: fromBrand("--rally-brand-on-dark") },
      { name: "--focus-ring",               light: fromBrand("--focus-ring"),               dark: fromBrand("--focus-ring") },
      { name: "--selected-border",          light: fromBrand("--selected-border"),          dark: fromBrand("--selected-border") },
    ],
  },
  {
    title: "Surface",
    tokens: [
      { name: "--canvas",      light: fromLight("--canvas"),      dark: fromDark("--canvas") },
      { name: "--surface",     light: fromLight("--surface"),     dark: fromDark("--surface") },
      { name: "--elevated",    light: fromLight("--elevated"),    dark: fromDark("--elevated") },
      { name: "--border-color",light: fromLight("--border-color"),dark: fromDark("--border-color") },
    ],
  },
  {
    title: "Text & Neutral",
    tokens: [
      { name: "--text-primary",       light: fromLight("--text-primary"),       dark: fromDark("--text-primary") },
      { name: "--text-secondary",     light: fromLight("--text-secondary"),     dark: fromDark("--text-secondary") },
      { name: "--neutral-solid",      light: fromLight("--neutral-solid"),      dark: fromLight("--neutral-solid") },
      { name: "--neutral-soft-light", light: fromLight("--neutral-soft-light"), dark: fromLight("--neutral-soft-light") },
      { name: "--neutral-soft-dark",  light: fromDark("--neutral-soft-dark"),  dark: fromDark("--neutral-soft-dark") },
      { name: "--neutral-on-light",   light: fromLight("--neutral-on-light"),   dark: fromLight("--neutral-on-light") },
      { name: "--neutral-on-dark",    light: fromDark("--neutral-on-dark"),     dark: fromDark("--neutral-on-dark") },
    ],
  },
  {
    title: "Error",
    tokens: [
      { name: "--error-solid",      light: fixed(F.errorSolid), dark: fixed(F.errorSolid) },
      { name: "--error-soft-light", light: fixed(F.errorSoftL), dark: fixed(F.errorSoftL) },
      { name: "--error-soft-dark",  light: fixed(F.errorSoftD), dark: fixed(F.errorSoftD) },
      { name: "--error-on-light",   light: fixed(F.errorOnL),   dark: fixed(F.errorOnL) },
      { name: "--error-on-dark",    light: fixed(F.errorOnD),   dark: fixed(F.errorOnD) },
    ],
  },
  {
    title: "Info",
    tokens: [
      { name: "--info-solid",      light: fixed(F.infoSolid), dark: fixed(F.infoSolid) },
      { name: "--info-soft-light", light: fixed(F.infoSoftL), dark: fixed(F.infoSoftL) },
      { name: "--info-soft-dark",  light: fixed(F.infoSoftD), dark: fixed(F.infoSoftD) },
      { name: "--info-on-light",   light: fixed(F.infoOnL),   dark: fixed(F.infoOnL) },
      { name: "--info-on-dark",    light: fixed(F.infoOnD),   dark: fixed(F.infoOnD) },
    ],
  },
  {
    title: "Warning",
    tokens: [
      { name: "--warning-solid",      light: fixed(F.warnSolid), dark: fixed(F.warnSolid) },
      { name: "--warning-soft-light", light: fixed(F.warnSoftL), dark: fixed(F.warnSoftL) },
      { name: "--warning-soft-dark",  light: fixed(F.warnSoftD), dark: fixed(F.warnSoftD) },
      { name: "--warning-on-light",   light: fixed(F.warnOnL),   dark: fixed(F.warnOnL) },
      { name: "--warning-on-dark",    light: fixed(F.warnOnD),   dark: fixed(F.warnOnD) },
    ],
  },
  {
    title: "Success",
    tokens: [
      { name: "--success-solid",      light: fixed(F.sucSolid), dark: fixed(F.sucSolid) },
      { name: "--success-soft-light", light: fixed(F.sucSoftL), dark: fixed(F.sucSoftL) },
      { name: "--success-soft-dark",  light: fixed(F.sucSoftD), dark: fixed(F.sucSoftD) },
      { name: "--success-on-light",   light: fixed(F.sucOnL),   dark: fixed(F.sucOnL) },
      { name: "--success-on-dark",    light: fixed(F.sucOnD),   dark: fixed(F.sucOnD) },
    ],
  },
  {
    title: "Interaction States",
    tokens: [
      { name: "--disabled-bg",     light: fromLight("--disabled-bg"),     dark: fromDark("--disabled-bg") },
      { name: "--disabled-border", light: fromLight("--disabled-border"),  dark: fromDark("--disabled-border") },
      { name: "--disabled-text",   light: fromLight("--disabled-text"),    dark: fromDark("--disabled-text") },
      { name: "--selected-bg",     light: fromLight("--selected-bg"),      dark: fromDark("--selected-bg") },
      { name: "--selected-text",   light: fromLight("--selected-text"),    dark: fromDark("--selected-text") },
      { name: "--focus-ring",      light: fromBrand("--focus-ring"),       dark: fromBrand("--focus-ring") },
    ],
  },
];

// ── States matrix data ────────────────────────────────────────────────────────

type MatrixComponent = "Button Primary" | "Button Secondary" | "Input" | "Nav Item" | "Badge" | "Card";
type MatrixState     = "Default" | "Hover" | "Focus" | "Active" | "Disabled" | "Selected";

function matrixBg(comp: MatrixComponent, state: MatrixState, p: ThemePalette, mode: "light" | "dark"): string {
  const light = (k: string) => p.light[k] ?? p.brand[k] ?? "";
  const dark  = (k: string) => p.dark[k]  ?? p.brand[k] ?? "";
  const mv    = mode === "light" ? light : dark;

  if (comp === "Button Primary") {
    if (state === "Default")  return p.brand["--rally-brand"] ?? "";
    if (state === "Hover")    return p.brand["--rally-brand-hover"] ?? "";
    if (state === "Focus")    return p.brand["--rally-brand"] ?? "";
    if (state === "Active")   return p.brand["--rally-brand-pressed"] ?? "";
    if (state === "Disabled") return mv("--disabled-bg");
    if (state === "Selected") return p.brand["--rally-brand"] ?? "";
  }
  if (comp === "Button Secondary") {
    if (state === "Default")  return "transparent";
    if (state === "Hover")    return mode === "light" ? (p.light["--neutral-soft-light"] ?? "") : (p.dark["--neutral-soft-dark"] ?? "");
    if (state === "Focus")    return "transparent";
    if (state === "Active")   return mode === "light" ? (p.light["--neutral-soft-light"] ?? "") : (p.dark["--neutral-soft-dark"] ?? "");
    if (state === "Disabled") return mv("--disabled-bg");
    if (state === "Selected") return mv("--selected-bg");
  }
  if (comp === "Input") {
    if (state === "Default")  return mode === "light" ? (p.light["--elevated"] ?? "#fff") : (p.dark["--elevated"] ?? "");
    if (state === "Hover")    return mode === "light" ? (p.light["--elevated"] ?? "#fff") : (p.dark["--elevated"] ?? "");
    if (state === "Focus")    return mode === "light" ? (p.light["--elevated"] ?? "#fff") : (p.dark["--elevated"] ?? "");
    if (state === "Active")   return mode === "light" ? (p.light["--elevated"] ?? "#fff") : (p.dark["--elevated"] ?? "");
    if (state === "Disabled") return mv("--disabled-bg");
    if (state === "Selected") return mode === "light" ? (p.light["--elevated"] ?? "#fff") : (p.dark["--elevated"] ?? "");
  }
  if (comp === "Nav Item") {
    if (state === "Default")  return "transparent";
    if (state === "Hover")    return mode === "light" ? (p.light["--neutral-soft-light"] ?? "") : (p.dark["--neutral-soft-dark"] ?? "");
    if (state === "Focus")    return "transparent";
    if (state === "Active")   return mode === "light" ? (p.light["--neutral-soft-light"] ?? "") : (p.dark["--neutral-soft-dark"] ?? "");
    if (state === "Disabled") return mv("--disabled-bg");
    if (state === "Selected") return mv("--selected-bg");
  }
  if (comp === "Badge") {
    const soft = mode === "light" ? (p.light["--neutral-soft-light"] ?? "") : (p.dark["--neutral-soft-dark"] ?? "");
    if (state === "Default")  return soft;
    if (state === "Hover")    return soft;
    if (state === "Focus")    return soft;
    if (state === "Active")   return soft;
    if (state === "Disabled") return mv("--disabled-bg");
    if (state === "Selected") return mode === "light" ? (p.brand["--rally-brand-soft-light"] ?? "") : (p.brand["--rally-brand-soft-dark"] ?? "");
  }
  if (comp === "Card") {
    const elevated = mode === "light" ? (p.light["--elevated"] ?? "#fff") : (p.dark["--elevated"] ?? "");
    if (state === "Default")  return elevated;
    if (state === "Hover")    return elevated;
    if (state === "Focus")    return elevated;
    if (state === "Active")   return elevated;
    if (state === "Disabled") return mv("--disabled-bg");
    if (state === "Selected") return mv("--selected-bg");
  }
  return "";
}

function matrixVarHint(comp: MatrixComponent, state: MatrixState): string {
  const map: Partial<Record<`${MatrixComponent}|${MatrixState}`, string>> = {
    "Button Primary|Default":   "--rally-brand",
    "Button Primary|Hover":     "--rally-brand-hover",
    "Button Primary|Focus":     "--rally-brand (+ focus-ring)",
    "Button Primary|Active":    "--rally-brand-pressed",
    "Button Primary|Disabled":  "--disabled-bg",
    "Button Primary|Selected":  "--rally-brand",
    "Button Secondary|Default": "transparent",
    "Button Secondary|Hover":   "--muted",
    "Button Secondary|Active":  "--muted",
    "Button Secondary|Disabled":"--disabled-bg",
    "Button Secondary|Selected":"--selected-bg",
    "Input|Default":            "--elevated",
    "Input|Hover":              "--elevated",
    "Input|Focus":              "--elevated (+ focus-ring border)",
    "Input|Disabled":           "--disabled-bg",
    "Nav Item|Default":         "transparent",
    "Nav Item|Hover":           "--muted",
    "Nav Item|Selected":        "--selected-bg",
    "Badge|Default":            "--muted",
    "Badge|Selected":           "--rally-brand-soft",
    "Card|Default":             "--card / --elevated",
    "Card|Selected":            "--selected-bg",
  };
  return map[`${comp}|${state}`] ?? `${comp} / ${state}`;
}

const MATRIX_ROWS: MatrixComponent[] = ["Button Primary", "Button Secondary", "Input", "Nav Item", "Badge", "Card"];
const MATRIX_COLS: MatrixState[]     = ["Default", "Hover", "Focus", "Active", "Disabled", "Selected"];

// ── ColorSwatch ───────────────────────────────────────────────────────────────

function ColorSwatch({ value, size = 20 }: { value: string; size?: number }) {
  const isTransparent = !value || value === "transparent";
  return (
    <span style={{
      display:       "inline-block",
      width:         size,
      height:        size,
      borderRadius:  "4px",
      background:    isTransparent ? "repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%) 0 0 / 8px 8px" : value,
      border:        "1px solid rgba(0,0,0,0.10)",
      flexShrink:    0,
    }} />
  );
}

// ── Panel identity swatches ───────────────────────────────────────────────────

const IDENTITY_SWATCHES: { key: string; label: string; resolver: (p: ThemePalette) => string }[] = [
  { key: "brand",           label: "--rally-brand",       resolver: p => p.brand["--rally-brand"] ?? "" },
  { key: "brand-soft",      label: "--brand-soft-light",  resolver: p => p.brand["--rally-brand-soft-light"] ?? "" },
  { key: "surface",         label: "--surface",           resolver: p => p.light["--surface"] ?? "" },
  { key: "canvas",          label: "--canvas",            resolver: p => p.light["--canvas"] ?? "" },
  { key: "elevated",        label: "--elevated",          resolver: p => p.light["--elevated"] ?? "#ffffff" },
  { key: "border",          label: "--border-color",      resolver: p => p.light["--border-color"] ?? "" },
  { key: "text-primary",    label: "--text-primary",      resolver: p => p.light["--text-primary"] ?? "" },
];

// ── Main component ────────────────────────────────────────────────────────────

export function ThemeDetailPanel({ palette, isOpen, onClose }: ThemeDetailPanelProps) {
  const [previewDark, setPreviewDark] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!palette) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 49 }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position:   "fixed",
        top:        0,
        right:      0,
        bottom:     0,
        width:      "min(480px, 100vw)",
        background: "var(--surface)",
        borderLeft: "1px solid var(--border-color)",
        zIndex:     50,
        display:    "flex",
        flexDirection: "column",
        transform:  isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 240ms cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow:  "var(--shadow-xl)",
      }}>

        {/* ── Sticky header ── */}
        <div style={{
          flexShrink:    0,
          display:       "flex",
          alignItems:    "center",
          gap:           "10px",
          padding:       "14px 16px",
          borderBottom:  "1px solid var(--border-color)",
          background:    "var(--surface)",
        }}>
          <div style={{
            width:          "32px",
            height:         "32px",
            borderRadius:   "8px",
            background:     palette.preview.primary,
            flexShrink:     0,
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "10px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-overline)", marginBottom: "1px" }}>Theme Detail</div>
            <div style={{ fontSize: "16px", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.2 }}>
              {palette.emoji} {palette.name}
            </div>
          </div>

          {/* Preview mode toggle */}
          <div style={{ display: "flex", alignItems: "center", background: "var(--canvas)", border: "1px solid var(--border-color)", borderRadius: "8px", padding: "3px", gap: "2px" }}>
            <button
              onClick={() => setPreviewDark(false)}
              title="Light mode preview"
              style={{
                display:        "flex",
                alignItems:     "center",
                gap:            "4px",
                padding:        "4px 8px",
                borderRadius:   "6px",
                border:         "none",
                fontSize:       "11px",
                fontWeight:     500,
                cursor:         "pointer",
                background:     !previewDark ? "var(--elevated)" : "transparent",
                color:          !previewDark ? "var(--text-primary)" : "var(--text-secondary)",
                boxShadow:      !previewDark ? "var(--shadow-sm)" : "none",
                transition:     "all 150ms",
              }}>
              <Sun size={12} /> Light
            </button>
            <button
              onClick={() => setPreviewDark(true)}
              title="Dark mode preview"
              style={{
                display:        "flex",
                alignItems:     "center",
                gap:            "4px",
                padding:        "4px 8px",
                borderRadius:   "6px",
                border:         "none",
                fontSize:       "11px",
                fontWeight:     500,
                cursor:         "pointer",
                background:     previewDark ? "var(--elevated)" : "transparent",
                color:          previewDark ? "var(--text-primary)" : "var(--text-secondary)",
                boxShadow:      previewDark ? "var(--shadow-sm)" : "none",
                transition:     "all 150ms",
              }}>
              <Moon size={12} /> Dark
            </button>
          </div>

          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", padding: "4px", borderRadius: "6px", display: "flex" }}>
            <X size={16} />
          </button>
        </div>

        {/* ── Scrollable content ── */}
        <div ref={contentRef} style={{ flex: 1, overflowY: "auto", padding: "0" }}>

          {/* ─── Section 1: Theme Identity ─────────────────────────── */}
          <PanelSection title="Theme Identity">
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "14px", lineHeight: 1.5 }}>
              {palette.description}
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {IDENTITY_SWATCHES.map(sw => (
                <div key={sw.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                  <div style={{
                    width:        "40px",
                    height:       "40px",
                    borderRadius: "8px",
                    background:   sw.resolver(palette),
                    border:       "1px solid rgba(0,0,0,0.08)",
                    flexShrink:   0,
                  }} />
                  <span style={{ fontSize: "9px", fontFamily: "monospace", color: "var(--text-overline)", textAlign: "center", maxWidth: "50px", wordBreak: "break-all", lineHeight: 1.3 }}>
                    {sw.label}
                  </span>
                </div>
              ))}
            </div>
          </PanelSection>

          {/* ─── Section 2 or 3: Component Preview ────────────────── */}
          <PanelSection title={previewDark ? "Dark Mode Preview" : "Light Mode Preview"}
            accent={previewDark ? "var(--info-on-light)" : "var(--warning-on-light)"}>
            <PreviewFrame palette={palette} mode={previewDark ? "dark" : "light"} />
          </PanelSection>

          {/* ─── Section 4: Token Reference Table ─────────────────── */}
          <PanelSection title="Color Token Reference">
            <div style={{ border: "1px solid var(--border-color)", borderRadius: "10px", overflow: "hidden" }}>
              {/* Table header */}
              <div style={{
                display:    "grid",
                gridTemplateColumns: "1fr 110px 110px",
                padding:    "6px 12px",
                background: "var(--canvas)",
                borderBottom: "1px solid var(--border-color)",
                gap:        "8px",
              }}>
                {["Token", "Light", "Dark"].map(h => (
                  <span key={h} style={{ fontSize: "9px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-overline)" }}>{h}</span>
                ))}
              </div>

              {TOKEN_GROUPS.map((group, gi) => (
                <div key={group.title}>
                  {/* Group header */}
                  <div style={{ padding: "5px 12px", background: "var(--canvas)", borderBottom: "1px solid var(--border-color)", borderTop: gi > 0 ? "1px solid var(--border-color)" : undefined }}>
                    <span style={{ fontSize: "9px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)" }}>
                      {group.title}
                    </span>
                  </div>
                  {group.tokens.map((token, ti) => {
                    const lv = token.light(palette);
                    const dv = token.dark(palette);
                    return (
                      <div key={token.name}
                        style={{
                          display:    "grid",
                          gridTemplateColumns: "1fr 110px 110px",
                          alignItems: "center",
                          gap:        "8px",
                          padding:    "0 12px",
                          height:     "32px",
                          borderBottom: ti < group.tokens.length - 1 ? "1px solid var(--border-subtle, rgba(0,0,0,0.06))" : "none",
                        }}>
                        <code style={{ fontSize: "11px", fontFamily: "monospace", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {token.name}
                        </code>
                        <TokenCell value={lv} />
                        <TokenCell value={dv} />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </PanelSection>

          {/* ─── Section 5: Interactive States Matrix ─────────────── */}
          <PanelSection title="Interactive States">
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", minWidth: "400px" }}>
                <thead>
                  <tr style={{ background: "var(--canvas)" }}>
                    <th style={{ ...thStyle, width: "110px", textAlign: "left" }}>Component</th>
                    {MATRIX_COLS.map(c => (
                      <th key={c} style={thStyle}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MATRIX_ROWS.map((comp) => (
                    <tr key={comp} style={{ borderBottom: "1px solid var(--border-subtle, rgba(0,0,0,0.06))" }}>
                      <td style={{ padding: "6px 8px", fontSize: "11px", color: "var(--text-secondary)", fontWeight: 500, whiteSpace: "nowrap" }}>{comp}</td>
                      {MATRIX_COLS.map(state => {
                        const bg   = matrixBg(comp, state, palette, previewDark ? "dark" : "light");
                        const hint = matrixVarHint(comp, state);
                        return (
                          <td key={state} style={{ padding: "5px 6px", textAlign: "center" }}>
                            <div title={hint} style={{ position: "relative", display: "inline-block" }}>
                              <div style={{
                                width:        "36px",
                                height:       "36px",
                                borderRadius: "8px",
                                background:   bg || "repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%) 0 0 / 8px 8px",
                                border:       "1px solid rgba(0,0,0,0.10)",
                                cursor:       "default",
                                margin:       "0 auto",
                              }} />
                              {state === "Focus" && (
                                <div style={{
                                  position:     "absolute",
                                  inset:        "-3px",
                                  borderRadius: "11px",
                                  border:       `2px solid ${palette.brand["--focus-ring"] ?? "currentColor"}`,
                                  pointerEvents:"none",
                                }} />
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "10px", color: "var(--text-overline)", marginTop: "8px" }}>
              Hover any cell to see the CSS variable name. Previewing {previewDark ? "dark" : "light"} mode — toggle with the header switch.
            </p>
          </PanelSection>

          <div style={{ height: "32px" }} />
        </div>
      </div>
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function PanelSection({ title, children, accent }: { title: string; children: React.ReactNode; accent?: string }) {
  return (
    <div style={{ padding: "18px 16px", borderBottom: "1px solid var(--border-color)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
        {accent && <span style={{ width: "3px", height: "14px", borderRadius: "2px", background: accent, flexShrink: 0 }} />}
        <p style={{ fontSize: "10px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-overline)" }}>
          {title}
        </p>
      </div>
      {children}
    </div>
  );
}

function TokenCell({ value }: { value: string }) {
  const isHex = /^#[0-9a-fA-F]{3,8}$/.test(value);
  const isEmpty = !value;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      {isEmpty
        ? <span style={{ fontSize: "11px", color: "var(--text-overline)" }}>—</span>
        : (
          <>
            <ColorSwatch value={value} size={14} />
            <span style={{ fontSize: "11px", fontFamily: isHex ? "monospace" : "inherit", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {value.length > 14 ? value.slice(0, 14) + "…" : value}
            </span>
          </>
        )
      }
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding:         "6px 6px",
  fontSize:        "9px",
  fontWeight:      500,
  textTransform:   "uppercase",
  letterSpacing:   "0.08em",
  color:           "var(--text-overline)",
  textAlign:       "center",
  borderBottom:    "1px solid var(--border-color)",
  whiteSpace:      "nowrap",
};
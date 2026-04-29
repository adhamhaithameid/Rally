/**
 * ThemePreviewFrame
 * Isolated CSS-var container that renders live component previews for a given
 * palette × mode combination. Every color comes from a CSS variable set on the
 * wrapper element — nothing is hardcoded.
 */

import React from "react";
import type { ThemePalette } from "../contexts/PaletteContext";
import {
  LayoutDashboard, MessageSquare, CheckSquare,
  Search, AlertCircle, Sparkles, X,
} from "lucide-react";

// ── CSS var injection ────────────────────────────────────────────────────────

export function buildPreviewStyle(
  palette: ThemePalette,
  mode: "light" | "dark",
): React.CSSProperties {
  const modeVars = mode === "light" ? palette.light : palette.dark;
  const all: Record<string, string> = { ...palette.brand, ...modeVars };

  const get = (k: string) => all[k] ?? "";

  const surface      = get("--surface");
  const canvas       = get("--canvas");
  const elevated     = get("--elevated") || (mode === "light" ? "#ffffff" : "");
  const border       = get("--border-color");
  const textPrimary  = get("--text-primary");
  const textSecondary= get("--text-secondary");
  const neutralSoft  = mode === "light" ? get("--neutral-soft-light") : get("--neutral-soft-dark");
  const neutralOn    = mode === "light" ? get("--neutral-on-light")   : get("--neutral-on-dark");
  const brandSoft    = mode === "light" ? get("--rally-brand-soft-light") : get("--rally-brand-soft-dark");
  const brandOn      = mode === "light" ? get("--rally-brand-on-light")   : get("--rally-brand-on-dark");

  // Fixed semantic vars (same across all palettes, both modes)
  const fixed: Record<string, string> = {
    "--error-solid":       "#d90000",
    "--error-hover":       "#b00000",
    "--error-soft-light":  "#fdecec",
    "--error-soft-dark":   "#341111",
    "--error-on-light":    "#b00000",
    "--error-on-dark":     "#ff8a8a",
    "--info-solid":        "#0f5fd7",
    "--info-soft-light":   "#eef4ff",
    "--info-soft-dark":    "#101d36",
    "--info-on-light":     "#0f5fd7",
    "--info-on-dark":      "#a9cbff",
    "--warning-solid":     "#8a4f00",
    "--warning-soft-light":"#fff4e5",
    "--warning-soft-dark": "#33210a",
    "--warning-on-light":  "#8a4f00",
    "--warning-on-dark":   "#ffd08a",
    "--success-solid":     "#0f6a43",
    "--success-soft-light":"#eaf7f0",
    "--success-soft-dark": "#10261c",
    "--success-on-light":  "#0f6a43",
    "--success-on-dark":   "#7ad6a7",
  };

  // Semantic badge variants — mode-aware
  const badgeTasks    = { text: mode === "dark" ? fixed["--success-on-dark"] : fixed["--success-on-light"], bg: mode === "dark" ? fixed["--success-soft-dark"] : fixed["--success-soft-light"] };
  const badgeFiles    = { text: mode === "dark" ? fixed["--info-on-dark"]    : fixed["--info-on-light"],    bg: mode === "dark" ? fixed["--info-soft-dark"]    : fixed["--info-soft-light"] };
  const badgeCalendar = { text: brandOn, bg: brandSoft };
  const badgeChat     = { text: neutralOn, bg: neutralSoft };

  return {
    // ── All palette-bound vars
    ...(all as React.CSSProperties),
    // ── Fixed semantic vars
    ...(fixed as React.CSSProperties),
    // ── Derived Tailwind aliases
    "--background":              surface,
    "--foreground":              textPrimary,
    "--card":                    elevated,
    "--card-foreground":         textPrimary,
    "--popover":                 elevated,
    "--popover-foreground":      textPrimary,
    "--border":                  border,
    "--secondary":               canvas,
    "--secondary-foreground":    textPrimary,
    "--muted":                   neutralSoft,
    "--muted-foreground":        neutralOn,
    "--accent":                  brandSoft,
    "--accent-foreground":       textPrimary,
    "--rally-brand-soft":        brandSoft,
    "--rally-brand-on":          brandOn,
    "--text-tertiary":           mode === "dark" ? "#8a807c" : "#8c7b74",
    "--text-overline":           mode === "dark" ? textSecondary : "#8c7b74",
    "--text-placeholder":        mode === "dark" ? "#5f514b" : "#b09e98",
    "--border-subtle":           mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
    "--badge-tasks-text":        badgeTasks.text,
    "--badge-tasks-bg":          badgeTasks.bg,
    "--badge-calendar-text":     badgeCalendar.text,
    "--badge-calendar-bg":       badgeCalendar.bg,
    "--badge-files-text":        badgeFiles.text,
    "--badge-files-bg":          badgeFiles.bg,
    "--badge-chat-text":         badgeChat.text,
    "--badge-chat-bg":           badgeChat.bg,
    "--badge-team-text":         neutralOn,
    "--badge-team-bg":           neutralSoft,
    "--status-active":           mode === "dark" ? fixed["--success-on-dark"]  : fixed["--success-solid"],
    "--status-limited":          mode === "dark" ? neutralOn                   : neutralOn,
    "--status-disabled":         mode === "dark" ? fixed["--error-on-dark"]    : fixed["--error-solid"],
  } as React.CSSProperties;
}

// ── Mini component helpers ────────────────────────────────────────────────────

type BtnVariant = "primary" | "secondary" | "ghost" | "destructive" | "icon";
type BtnState   = "default" | "hover" | "disabled";

function PvBtn({ variant, state }: { variant: BtnVariant; state: BtnState }) {
  const base: React.CSSProperties = {
    display:        "inline-flex",
    alignItems:     "center",
    justifyContent: "center",
    gap:            "4px",
    borderRadius:   "8px",
    fontSize:       "11px",
    fontWeight:     500,
    padding:        variant === "icon" ? "0" : "5px 10px",
    width:          variant === "icon" ? "28px" : undefined,
    height:         variant === "icon" ? "28px" : undefined,
    border:         "1px solid transparent",
    cursor:         state === "disabled" ? "not-allowed" : "default",
    transition:     "none",
    flexShrink:     0,
  };

  const styles: Record<BtnVariant, Record<BtnState, React.CSSProperties>> = {
    primary: {
      default:  { background: "var(--rally-brand)",         color: "#fff",                    borderColor: "transparent" },
      hover:    { background: "var(--rally-brand-hover)",   color: "#fff",                    borderColor: "transparent" },
      disabled: { background: "var(--disabled-bg)",         color: "var(--disabled-text)",    borderColor: "var(--disabled-border)", opacity: 0.7 },
    },
    secondary: {
      default:  { background: "transparent",                color: "var(--foreground)",       borderColor: "var(--border)" },
      hover:    { background: "var(--muted)",               color: "var(--foreground)",       borderColor: "var(--border)" },
      disabled: { background: "transparent",                color: "var(--disabled-text)",    borderColor: "var(--disabled-border)", opacity: 0.6 },
    },
    ghost: {
      default:  { background: "transparent",                color: "var(--foreground)",       border: "none" },
      hover:    { background: "var(--muted)",               color: "var(--foreground)",       border: "none" },
      disabled: { background: "transparent",                color: "var(--disabled-text)",    border: "none", opacity: 0.6 },
    },
    destructive: {
      default:  { background: "var(--error-solid)",         color: "#fff",                    borderColor: "transparent" },
      hover:    { background: "var(--error-hover)",         color: "#fff",                    borderColor: "transparent" },
      disabled: { background: "var(--disabled-bg)",         color: "var(--disabled-text)",    borderColor: "var(--disabled-border)", opacity: 0.6 },
    },
    icon: {
      default:  { background: "transparent",                color: "var(--foreground)",       border: "none" },
      hover:    { background: "var(--muted)",               color: "var(--foreground)",       border: "none" },
      disabled: { background: "transparent",                color: "var(--disabled-text)",    border: "none", opacity: 0.5 },
    },
  };

  const label: Partial<Record<BtnVariant, string>> = {
    primary: "Primary", secondary: "Outline", ghost: "Ghost", destructive: "Delete",
  };

  return (
    <button style={{ ...base, ...styles[variant][state] }} disabled={state === "disabled"}>
      {variant === "icon" ? <X size={12} /> : label[variant]}
    </button>
  );
}

function PvInput({ inputState }: { inputState: "default" | "focused" | "error" | "disabled" }) {
  const borderColor =
    inputState === "focused"  ? "var(--rally-brand)"  :
    inputState === "error"    ? "var(--error-solid)"  :
    inputState === "disabled" ? "var(--disabled-border)" :
    "var(--border)";
  const bg = inputState === "disabled" ? "var(--disabled-bg)" : "var(--elevated)";
  const boxShadow = inputState === "focused" ? "0 0 0 2px var(--focus-ring)" : "none";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3px", flex: 1 }}>
      <div style={{ fontSize: "9px", color: "var(--muted-foreground)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{inputState}</div>
      <input
        readOnly
        placeholder={inputState === "error" ? "Invalid value" : "Input text…"}
        value={inputState === "focused" ? "Active value" : inputState === "error" ? "Bad input" : ""}
        style={{
          background:    bg,
          borderColor,
          boxShadow,
          border:        `1px solid ${borderColor}`,
          borderRadius:  "8px",
          padding:       "5px 8px",
          fontSize:      "11px",
          color:         inputState === "disabled" ? "var(--disabled-text)" : "var(--foreground)",
          outline:       "none",
          width:         "100%",
        }}
        disabled={inputState === "disabled"}
      />
    </div>
  );
}

const BADGES: { label: string; text: string; bg: string; role: string }[] = [
  { label: "Primary",   text: "var(--rally-brand-on)",      bg: "var(--rally-brand-soft)",     role: "Brand" },
  { label: "Success",   text: "var(--success-on-light)",    bg: "var(--success-soft-light)",   role: "Success" },
  { label: "Warning",   text: "var(--warning-on-light)",    bg: "var(--warning-soft-light)",   role: "Warning" },
  { label: "Error",     text: "var(--error-on-light)",      bg: "var(--error-soft-light)",     role: "Error" },
  { label: "Info",      text: "var(--info-on-light)",       bg: "var(--info-soft-light)",      role: "Info" },
  { label: "Neutral",   text: "var(--muted-foreground)",    bg: "var(--muted)",                role: "Neutral" },
  { label: "Solid",     text: "#ffffff",                    bg: "var(--rally-brand)",           role: "Solid Brand" },
];

const TYPE_SCALE: { role: string; size: string; weight: number; sample: string }[] = [
  { role: "Display",   size: "20px", weight: 500, sample: "The quick brown fox" },
  { role: "H1",        size: "18px", weight: 500, sample: "Main Page Heading" },
  { role: "H2",        size: "16px", weight: 500, sample: "Section Heading" },
  { role: "H3",        size: "14px", weight: 500, sample: "Subsection Label" },
  { role: "Body",      size: "14px", weight: 400, sample: "Standard body text for readable content" },
  { role: "Body SM",   size: "12px", weight: 400, sample: "Smaller body text, secondary content" },
  { role: "Caption",   size: "11px", weight: 400, sample: "Caption and helper text" },
  { role: "Label",     size: "11px", weight: 500, sample: "Form Labels & Tabs" },
  { role: "Overline",  size: "10px", weight: 500, sample: "SECTION OVERLINE" },
  { role: "Micro",     size: "10px", weight: 400, sample: "10px micro copy only" },
  { role: "Btn Label", size: "12px", weight: 500, sample: "Button Label" },
];

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: MessageSquare,   label: "Chat" },
  { icon: CheckSquare,     label: "Tasks" },
];

// ── Main PreviewFrame ─────────────────────────────────────────────────────────

interface PreviewFrameProps {
  palette: ThemePalette;
  mode:    "light" | "dark";
}

export function PreviewFrame({ palette, mode }: PreviewFrameProps) {
  const pvStyle = buildPreviewStyle(palette, mode);

  return (
    <div style={{ ...pvStyle, background: "var(--background)", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--border)" }}>

      {/* ── 2a / 3a — Buttons ─────────────────────────────────────── */}
      <PreviewSection label="Buttons">
        {(["default", "hover", "disabled"] as BtnState[]).map(state => (
          <div key={state} style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
            <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-overline)", width: "48px", flexShrink: 0 }}>{state}</span>
            {(["primary", "secondary", "ghost", "destructive", "icon"] as BtnVariant[]).map(v => (
              <PvBtn key={v} variant={v} state={state} />
            ))}
          </div>
        ))}
      </PreviewSection>

      {/* ── 2b / 3b — Form Inputs ──────────────────────────────────── */}
      <PreviewSection label="Form Inputs">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {(["default","focused","error","disabled"] as const).map(s => (
            <PvInput key={s} inputState={s} />
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
          {/* Select */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "9px", color: "var(--muted-foreground)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "3px" }}>select</div>
            <select style={{ width: "100%", background: "var(--elevated)", border: "1px solid var(--border)", borderRadius: "8px", padding: "5px 8px", fontSize: "11px", color: "var(--foreground)", outline: "none" }}>
              <option>Option A</option>
            </select>
          </div>
          {/* Search */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "9px", color: "var(--muted-foreground)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "3px" }}>search</div>
            <div style={{ display: "flex", alignItems: "center", background: "var(--elevated)", border: "1px solid var(--border)", borderRadius: "8px", padding: "5px 8px", gap: "6px" }}>
              <Search size={10} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
              <span style={{ fontSize: "11px", color: "var(--text-placeholder)" }}>Search…</span>
            </div>
          </div>
        </div>
        {/* Textarea */}
        <div style={{ marginTop: "8px" }}>
          <div style={{ fontSize: "9px", color: "var(--muted-foreground)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "3px" }}>textarea</div>
          <textarea
            readOnly
            rows={2}
            placeholder="Multi-line input…"
            style={{ width: "100%", background: "var(--elevated)", border: "1px solid var(--border)", borderRadius: "8px", padding: "6px 8px", fontSize: "11px", color: "var(--foreground)", outline: "none", resize: "none", boxSizing: "border-box" }}
          />
        </div>
      </PreviewSection>

      {/* ── 2c / 3c — Status Badges ────────────────────────────────── */}
      <PreviewSection label="Status Badges">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {BADGES.map(b => (
            <div key={b.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 8px", borderRadius: "9999px", fontSize: "10px", fontWeight: 500, background: b.bg, color: b.text }}>
                {b.label}
              </span>
              <span style={{ fontSize: "9px", color: "var(--text-overline)" }}>{b.role}</span>
            </div>
          ))}
        </div>
      </PreviewSection>

      {/* ── 2d / 3d — Cards ────────────────────────────────────────── */}
      <PreviewSection label="Cards">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {/* Base card */}
          <div style={{ flex: "1 1 120px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "12px" }}>
            <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--foreground)", marginBottom: "4px" }}>Base Card</p>
            <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "10px", lineHeight: 1.4 }}>Elevated surface with standard content.</p>
            <button style={{ background: "var(--rally-brand)", color: "#fff", fontSize: "10px", fontWeight: 500, padding: "4px 10px", borderRadius: "8px", border: "none", cursor: "default" }}>Action</button>
          </div>
          {/* Brand-tinted card */}
          <div style={{ flex: "1 1 120px", background: "var(--rally-brand-soft)", border: "1px solid var(--rally-brand-soft)", borderRadius: "12px", padding: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              <Sparkles size={13} style={{ color: "var(--rally-brand)" }} />
              <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--rally-brand-on)" }}>AI Assist</p>
            </div>
            <p style={{ fontSize: "11px", color: "var(--rally-brand-on)", lineHeight: 1.4, opacity: 0.8 }}>Brand-tinted surface for featured content.</p>
          </div>
          {/* Error card */}
          <div style={{ flex: "1 1 120px", background: "var(--error-soft-light)", border: "1px solid var(--error-solid)", borderRadius: "12px", padding: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              <AlertCircle size={13} style={{ color: "var(--error-on-light)" }} />
              <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--error-on-light)" }}>Error Card</p>
            </div>
            <p style={{ fontSize: "11px", color: "var(--error-on-light)", lineHeight: 1.4, opacity: 0.8 }}>Semantic error surface for destructive states.</p>
          </div>
        </div>
      </PreviewSection>

      {/* ── 2e / 3e — Navigation ────────────────────────────────────── */}
      <PreviewSection label="Navigation">
        <div style={{ display: "flex", gap: "2px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "10px", padding: "4px", width: "fit-content" }}>
          {NAV_ITEMS.map((item, i) => {
            const Icon = item.icon;
            const isActive  = i === 2;
            const isHovered = i === 1;
            return (
              <div key={item.label}
                style={{
                  display:        "flex",
                  flexDirection:  "column",
                  alignItems:     "center",
                  gap:            "4px",
                  padding:        "8px 12px",
                  borderRadius:   "8px",
                  width:          "64px",
                  background:     isActive  ? "var(--selected-bg)"  : isHovered ? "var(--muted)" : "transparent",
                  cursor:         "default",
                }}>
                <Icon size={16}
                  style={{ color: isActive ? "var(--rally-brand-on)" : "var(--muted-foreground)" }} />
                <span style={{ fontSize: "9px", fontWeight: isActive ? 600 : 400, color: isActive ? "var(--rally-brand-on)" : "var(--muted-foreground)" }}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
          {["Default", "Hovered", "Active"].map((s) => (
            <span key={s} style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-overline)", width: "64px", textAlign: "center" }}>{s}</span>
          ))}
        </div>
      </PreviewSection>

      {/* ── 2f / 3f — Typography ────────────────────────────────────── */}
      <PreviewSection label="Typography">
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {TYPE_SCALE.map(t => (
            <div key={t.role} style={{ display: "flex", alignItems: "baseline", gap: "12px", padding: "2px 0", borderBottom: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "9px", fontFamily: "monospace", color: "var(--text-overline)", width: "60px", flexShrink: 0 }}>{t.role}</span>
              <span style={{ fontSize: t.size, fontWeight: t.weight, color: "var(--foreground)", lineHeight: 1.4, letterSpacing: t.role === "Overline" ? "0.1em" : "normal" }}>
                {t.sample}
              </span>
            </div>
          ))}
        </div>
      </PreviewSection>
    </div>
  );
}

// ── PreviewSection wrapper ────────────────────────────────────────────────────

function PreviewSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-subtle)" }}>
      <p style={{ fontSize: "10px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-overline)", marginBottom: "10px" }}>
        {label}
      </p>
      {children}
    </div>
  );
}
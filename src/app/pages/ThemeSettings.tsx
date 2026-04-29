/**
 * ThemeSettings page — /app/theme-settings
 * Shows all 6 Rally palettes as selectable cards.
 * The currently-selected card shows a ⓘ button that opens ThemeDetailPanel.
 */

import { useState } from "react";
import { Check, Info, Palette } from "lucide-react";
import { usePalette, type ThemePalette } from "../contexts/PaletteContext";
import { ThemeDetailPanel } from "../components/ThemeDetailPanel";

export function ThemeSettings() {
  const { activePaletteId, palettes, setPalette } = usePalette();
  const [panelPalette, setPanelPalette] = useState<ThemePalette | null>(null);
  const [panelOpen,    setPanelOpen]    = useState(false);

  function openPanel(p: ThemePalette) {
    setPanelPalette(p);
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-1">
          <Palette className="size-5 flex-shrink-0" style={{ color: "var(--rally-brand)" }} />
          <h1 className="text-foreground" style={{ fontSize: "22px", fontWeight: 500 }}>Theme Settings</h1>
        </div>
        <p className="text-muted-foreground mb-8" style={{ fontSize: "14px", paddingLeft: "32px" }}>
          Choose a color palette for your workspace. All 6 themes support light and dark mode.
        </p>

        {/* ── Active theme callout ── */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-[10px] border mb-6"
          style={{ background: "var(--rally-brand-soft-light)", borderColor: "var(--rally-brand)", borderWidth: "1px" }}>
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--rally-brand)" }}>
            <Check size={11} color="#fff" />
          </div>
          <div>
            <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--rally-brand-on-light)" }}>
              Active theme: {palettes.find(p => p.id === activePaletteId)?.emoji} {palettes.find(p => p.id === activePaletteId)?.name}
            </span>
            <span className="ml-2" style={{ fontSize: "11px", color: "var(--rally-brand-on-light)", opacity: 0.7 }}>
              — {palettes.find(p => p.id === activePaletteId)?.description}
            </span>
          </div>
        </div>

        {/* ── Palette grid ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap:                 "12px",
          }}>
          {palettes.map(p => {
            const isActive = p.id === activePaletteId;
            return (
              <PaletteCard
                key={p.id}
                palette={p}
                isActive={isActive}
                onSelect={() => setPalette(p.id)}
                onInfo={() => openPanel(p)}
              />
            );
          })}
        </div>

        {/* ── Info ── */}
        <p
          className="text-center mt-8"
          style={{ fontSize: "12px", color: "var(--text-overline)" }}>
          Tap the <Info size={10} className="inline" /> icon on any card to inspect the full token set, component previews, and dark mode behaviour.
        </p>
      </div>

      {/* ── Detail panel ── */}
      <ThemeDetailPanel
        palette={panelPalette}
        isOpen={panelOpen}
        onClose={closePanel}
      />
    </div>
  );
}

// ── PaletteCard ───────────────────────────────────────────────────────────────

interface PaletteCardProps {
  palette:  ThemePalette;
  isActive: boolean;
  onSelect: () => void;
  onInfo:   () => void;
}

function PaletteCard({ palette, isActive, onSelect, onInfo }: PaletteCardProps) {
  const { preview } = palette;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={e => e.key === "Enter" && onSelect()}
      style={{
        position:     "relative",
        borderRadius: "12px",
        border:       `1.5px solid ${isActive ? preview.primary : "var(--border-color)"}`,
        background:   "var(--elevated)",
        padding:      "14px",
        cursor:       "pointer",
        transition:   "border-color 150ms, box-shadow 150ms",
        boxShadow:    isActive ? `0 0 0 3px ${preview.primary}22` : "none",
        outline:      "none",
      }}
      onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)"; }}
      onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>

      {/* ⓘ button — only on selected card */}
      {isActive && (
        <button
          title="Inspect theme tokens"
          onClick={e => { e.stopPropagation(); onInfo(); }}
          style={{
            position:       "absolute",
            top:            "10px",
            right:          "10px",
            width:          "24px",
            height:         "24px",
            borderRadius:   "6px",
            background:     preview.primary,
            color:          "#fff",
            border:         "none",
            cursor:         "pointer",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            zIndex:         1,
            transition:     "opacity 120ms",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
          <Info size={13} />
        </button>
      )}

      {/* Active check badge */}
      {isActive && (
        <div
          style={{
            position:       "absolute",
            top:            "10px",
            left:           "10px",
            width:          "18px",
            height:         "18px",
            borderRadius:   "50%",
            background:     preview.primary,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
          }}>
          <Check size={10} color="#fff" />
        </div>
      )}

      {/* Emoji + name */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", paddingLeft: isActive ? "24px" : "0", paddingRight: isActive ? "28px" : "0" }}>
        <span style={{ fontSize: "20px", lineHeight: 1 }}>{palette.emoji}</span>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.2 }}>{palette.name}</p>
          <p style={{ fontSize: "10px", color: "var(--text-secondary)", marginTop: "1px" }}>6 themes · light + dark</p>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "12px", lineHeight: 1.5 }}>
        {palette.description}
      </p>

      {/* Color preview strip */}
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {[
          { color: preview.primary,  size: 28, ring: true },
          { color: preview.canvas,   size: 20, ring: false },
          { color: preview.surface,  size: 20, ring: false },
          { color: preview.border,   size: 20, ring: false },
          { color: preview.text,     size: 20, ring: false },
        ].map((s, i) => (
          <div key={i} style={{
            width:        s.size,
            height:       s.size,
            borderRadius: s.ring ? "6px" : "4px",
            background:   s.color,
            border:       "1px solid rgba(0,0,0,0.10)",
            flexShrink:   0,
          }} />
        ))}
        <div style={{ flex: 1 }} />
        {isActive && (
          <span style={{ fontSize: "10px", fontWeight: 500, color: preview.primary, letterSpacing: "0.04em" }}>
            Active
          </span>
        )}
      </div>
    </div>
  );
}

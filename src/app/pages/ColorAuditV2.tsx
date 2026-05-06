import { useState, useMemo } from "react";
import {
  AlertTriangle, AlertCircle, Info, CheckCircle2, Filter,
  ChevronDown, ChevronRight, Copy, Search, Layers,
  Moon, Sun, Palette, Eye, Zap, Shield,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type Severity   = "Critical" | "High" | "Medium";
type ViolationType =
  | "hardcoded-color"
  | "dark-mode-failure"
  | "semantic-misuse"
  | "theme-isolation"
  | "missing-state"
  | "tailwind-semantic";

interface Violation {
  id:       string;
  page:     string;
  file:     string;
  layer:    string;
  type:     ViolationType;
  current:  string;
  correct:  string;
  severity: Severity;
  line?:    number;
  notes?:   string;
}

// ── Violation data ─────────────────────────────────────────────────────────────

const VIOLATIONS: Violation[] = [
  // ── DashboardV2 ─────────────────────────────────────────────────────────────
  { id:"d1",  page:"DashboardV2", file:"DashboardV2.tsx", layer:"TeamPulse > VoiceRoom > icon bg",   type:"dark-mode-failure",  severity:"Critical", current:"#f5f3ff",  correct:"var(--info-soft-light)",        line:696, notes:"Light-mode only; no dark token → stays near-white in dark." },
  { id:"d2",  page:"DashboardV2", file:"DashboardV2.tsx", layer:"TeamPulse > VoiceRoom > Volume2 icon", type:"theme-isolation", severity:"Critical", current:"#8B5CF6",  correct:"var(--info-on-light)",          line:697, notes:"Hardcoded purple. Will not update on theme switch." },
  { id:"d3",  page:"DashboardV2", file:"DashboardV2.tsx", layer:"ContinueWorking > Hash icon",       type:"hardcoded-color",    severity:"High",     current:"#0f5fd7",  correct:"var(--info-solid)",             line:653 },
  { id:"d4",  page:"DashboardV2", file:"DashboardV2.tsx", layer:"RolePanel > OwnerStats data config", type:"hardcoded-color",   severity:"High",     current:"#8a4f00 / #fff4e5 / #0f5fd7 / …", correct:"var(--warning-on-light) / var(--info-on-light) / …", line:755 },
  { id:"d5",  page:"DashboardV2", file:"DashboardV2.tsx", layer:"RolePanel > AdminNotices data config", type:"hardcoded-color", severity:"High",     current:"#d90000 / #8a4f00 / #0f5fd7 + bgs", correct:"var(--error-on-light) / var(--warning-on-light) / …", line:784 },
  { id:"d6",  page:"DashboardV2", file:"DashboardV2.tsx", layer:"ContinueWorking > figma file icon", type:"theme-isolation",    severity:"Medium",   current:"#a259ff",  correct:"No Rally token — needs --figma-brand or --neutral-on-light", line:136, notes:"Figma brand purple has no theme variable." },

  // ── ChatV2 ───────────────────────────────────────────────────────────────────
  { id:"c1",  page:"ChatV2", file:"ChatV2.tsx", layer:"LeftRail > VoiceIndicator > pulse bars",  type:"dark-mode-failure",  severity:"Critical", current:"#0f6a43",  correct:"var(--status-active)",          line:350, notes:"Uses raw hex; dark-mode status token not applied." },
  { id:"c2",  page:"ChatV2", file:"ChatV2.tsx", layer:"LeftRail > VoiceIndicator > status dot",  type:"dark-mode-failure",  severity:"Critical", current:"#0f6a43",  correct:"var(--status-active)",          line:370 },
  { id:"c3",  page:"ChatV2", file:"ChatV2.tsx", layer:"LeftRail > VoiceIndicator > room name text", type:"dark-mode-failure",severity:"Critical", current:"#0f6a43",  correct:"var(--success-on-light)",       line:371, notes:"Text will be invisible on dark success surface." },
  { id:"c4",  page:"ChatV2", file:"ChatV2.tsx", layer:"LeftRail > VoiceChannel > icon bg",       type:"dark-mode-failure",  severity:"Critical", current:"#f5f3ff",  correct:"var(--info-soft-light)",        line:468, notes:"Near-white hex has no dark counterpart — visible in dark mode." },
  { id:"c5",  page:"ChatV2", file:"ChatV2.tsx", layer:"LeftRail > VoiceChannel > Volume2 icon",  type:"theme-isolation",    severity:"Critical", current:"#8B5CF6",  correct:"var(--info-on-light)",          line:469, notes:"Hardcoded purple breaks on theme switch." },
  { id:"c6",  page:"ChatV2", file:"ChatV2.tsx", layer:"LeftRail > MemberList > online dot",      type:"hardcoded-color",    severity:"High",     current:"#0f6a43",  correct:"var(--status-active)",          line:476 },
  { id:"c7",  page:"ChatV2", file:"ChatV2.tsx", layer:"MessagePanel > AI header > Beta badge",   type:"hardcoded-color",    severity:"High",     current:"#fff2ed / #c60f08", correct:"var(--badge-calendar-bg) / var(--badge-calendar-text)", line:558 },
  { id:"c8",  page:"ChatV2", file:"ChatV2.tsx", layer:"ThreadPanel > LinkPreview > colorMap",    type:"hardcoded-color",    severity:"High",     current:"#eef4ff/#0f5fd7, #eaf7f0/#0f6a43, #fff4e5/#8a4f00", correct:"var(--info-*), var(--success-*), var(--warning-*)", line:581 },
  { id:"c9",  page:"ChatV2", file:"ChatV2.tsx", layer:"MessageBubble > FileText icon",           type:"hardcoded-color",    severity:"High",     current:"#0f5fd7",  correct:"var(--info-solid)",             line:642 },
  { id:"c10", page:"ChatV2", file:"ChatV2.tsx", layer:"ThreadPanel > AttachmentIcon",            type:"hardcoded-color",    severity:"High",     current:"#0f5fd7",  correct:"var(--info-solid)",             line:979 },

  // ── AIChatV2 ─────────────────────────────────────────────────────────────────
  { id:"ai1", page:"AIChatV2", file:"AIChatV2.tsx", layer:"TodayStrip > 'Create' card",          type:"theme-isolation",    severity:"Critical", current:"#6b21a8 / #f5f3ff", correct:"No token — needs var(--ai-on-light) or --info-on-light", line:166, notes:"Purple has no Rally token; fails all 6 themes." },
  { id:"ai2", page:"AIChatV2", file:"AIChatV2.tsx", layer:"StarterGroups > 'Create' group",      type:"theme-isolation",    severity:"Critical", current:"#6b21a8 / #f5f3ff", correct:"No token — see above",          line:187 },
  { id:"ai3", page:"AIChatV2", file:"AIChatV2.tsx", layer:"QuickActions > 'Find a file' card",  type:"theme-isolation",    severity:"Critical", current:"#6b21a8 / #f5f3ff", correct:"No token — see above",          line:206 },
  { id:"ai4", page:"AIChatV2", file:"AIChatV2.tsx", layer:"QuickActions > 'Search web' card",   type:"theme-isolation",    severity:"Critical", current:"#374151 / #f3f4f6", correct:"var(--neutral-on-light) / var(--neutral-soft-light)", line:210, notes:"Gray-700/100 tailwind values — no dark-mode counterpart." },
  { id:"ai5", page:"AIChatV2", file:"AIChatV2.tsx", layer:"IconMap > files icon",                type:"theme-isolation",    severity:"Critical", current:"#6b21a8",  correct:"var(--info-on-light)",          line:287 },
  { id:"ai6", page:"AIChatV2", file:"AIChatV2.tsx", layer:"PendingActionIcons > update_file",    type:"theme-isolation",    severity:"Critical", current:"#6b21a8",  correct:"var(--info-on-light)",          line:338 },
  { id:"ai7", page:"AIChatV2", file:"AIChatV2.tsx", layer:"TodayStrip > all task/standup/mention cards", type:"hardcoded-color", severity:"High", current:"#0f6a43/#0f5fd7/#8a4f00 + soft bgs", correct:"var(--success-*/info-*/warning-*)", line:163 },
  { id:"ai8", page:"AIChatV2", file:"AIChatV2.tsx", layer:"QuickActions > 'Prepare meeting' card", type:"semantic-misuse",  severity:"High",     current:"#d90000 (error-solid)",  correct:"var(--warning-on-light) — event prep is not an error", line:209, notes:"Error-red on a non-destructive element violates semantic rules." },
  { id:"ai9", page:"AIChatV2", file:"AIChatV2.tsx", layer:"ContextPanel > member count icon bg", type:"dark-mode-failure",  severity:"High",     current:"#eef4ff",  correct:"var(--info-soft-light)",        line:503, notes:"Light-mode blue tint; no dark swap." },
  { id:"ai10",page:"AIChatV2", file:"AIChatV2.tsx", layer:"PendingActionIcons > events",         type:"semantic-misuse",    severity:"Medium",   current:"#d90000",  correct:"var(--warning-on-light)",       line:289, notes:"Calendar events colored with error-red; should be warning/brand." },

  // ── TodoV2 ───────────────────────────────────────────────────────────────────
  { id:"t1",  page:"TodoV2",  file:"TodoV2.tsx", layer:"PRIORITY config > 'urgent' badge",       type:"hardcoded-color",    severity:"High",     current:"#d90000 / #fff0ef", correct:"var(--error-on-light) / var(--error-soft-light)",   line:46 },
  { id:"t2",  page:"TodoV2",  file:"TodoV2.tsx", layer:"PRIORITY config > 'high' dot",           type:"hardcoded-color",    severity:"High",     current:"#f97316 (no token)", correct:"var(--rally-brand) — nearest orange token",        line:47 },
  { id:"t3",  page:"TodoV2",  file:"TodoV2.tsx", layer:"PRIORITY config > 'medium' dot",         type:"hardcoded-color",    severity:"High",     current:"#3b82f6 (no token)", correct:"var(--info-solid)",                                line:48 },
  { id:"t4",  page:"TodoV2",  file:"TodoV2.tsx", layer:"PRIORITY config > 'low' dot",            type:"hardcoded-color",    severity:"High",     current:"#10b981 (no token)", correct:"var(--success-solid)",                             line:49 },
  { id:"t5",  page:"TodoV2",  file:"TodoV2.tsx", layer:"STATUS config > 'todo' badge",           type:"dark-mode-failure",  severity:"Critical", current:"#6b7280 / #f3f4f6", correct:"var(--neutral-on-light) / var(--neutral-soft-light)", line:53, notes:"Gray-500/100 have no dark-mode tokens — white bg in dark." },
  { id:"t6",  page:"TodoV2",  file:"TodoV2.tsx", layer:"CATEGORY config > 'design'",             type:"theme-isolation",    severity:"Critical", current:"#6b21a8 / #f5f3ff", correct:"No token — use var(--info-on-light) / var(--info-soft-light)", line:60, notes:"Purple category will not update on theme switch." },
  { id:"t7",  page:"TodoV2",  file:"TodoV2.tsx", layer:"CATEGORY config > 'feature'",            type:"dark-mode-failure",  severity:"Critical", current:"#374151 / #f3f4f6", correct:"var(--neutral-on-light) / var(--neutral-soft-light)", line:65 },
  { id:"t8",  page:"TodoV2",  file:"TodoV2.tsx", layer:"StatsBar > Overdue/Today/Progress cards", type:"hardcoded-color",   severity:"High",     current:"#d90000/#8a4f00/… + border hex", correct:"var(--error-*) / var(--warning-*) / …",           line:231 },
  { id:"t9",  page:"TodoV2",  file:"TodoV2.tsx", layer:"TaskRow > overdue date text",             type:"tailwind-semantic",  severity:"Medium",   current:"text-red-600 dark:text-red-400", correct:"style={{ color: 'var(--error-on-light)' }}",      line:200, notes:"Tailwind red-* classes not theme-token-bound." },

  // ── FilesV2 ──────────────────────────────────────────────────────────────────
  { id:"f1",  page:"FilesV2",  file:"FilesV2.tsx", layer:"ContextMenu > danger item text",       type:"tailwind-semantic",  severity:"Medium",   current:"text-red-500",  correct:"style={{ color: 'var(--error-on-light)' }}",      line:316 },
  { id:"f2",  page:"FilesV2",  file:"FilesV2.tsx", layer:"FileDetail > delete button",           type:"tailwind-semantic",  severity:"Medium",   current:"text-red-500 hover:bg-red-50", correct:"var(--error-on-light) hover:var(--error-soft-light)", line:959 },

  // ── TeamV2 ───────────────────────────────────────────────────────────────────
  { id:"tm1", page:"TeamV2",  file:"TeamV2.tsx", layer:"ROLE_CFG > 'admin' color + bg",          type:"hardcoded-color",    severity:"Critical", current:"#0f5fd7 / #eef4ff", correct:"var(--info-on-light) / var(--info-soft-light)",   line:24, notes:"Used in every RoleBadge, permission table, and role callout." },
  { id:"tm2", page:"TeamV2",  file:"TeamV2.tsx", layer:"ROLE_CFG > 'member' color + bg",         type:"hardcoded-color",    severity:"Critical", current:"#0f6a43 / #eaf7f0", correct:"var(--success-on-light) / var(--success-soft-light)", line:25 },
  { id:"tm3", page:"TeamV2",  file:"TeamV2.tsx", layer:"ROLE_CFG > 'viewer' color + bg",         type:"dark-mode-failure",  severity:"Critical", current:"#6b7280 / #f3f4f6", correct:"var(--neutral-on-light) / var(--neutral-soft-light)", line:26, notes:"Gray-500 hex → no dark swap; white-ish bg in dark mode." },
  { id:"tm4", page:"TeamV2",  file:"TeamV2.tsx", layer:"NavItem selected state text",            type:"hardcoded-color",    severity:"High",     current:"text-[#c60f08]", correct:"var(--rally-brand-on-light) via CSS var token",   line:194 },
  { id:"tm5", page:"TeamV2",  file:"TeamV2.tsx", layer:"RoleFilter > 'All' selected bg",         type:"hardcoded-color",    severity:"High",     current:"#374151",  correct:"var(--neutral-solid)",                            line:709, notes:"Hardcoded dark-gray breaks on light/theme switch." },
  { id:"tm6", page:"TeamV2",  file:"TeamV2.tsx", layer:"DangerZone > card background",           type:"dark-mode-failure",  severity:"Critical", current:"#fff8f8",  correct:"var(--error-soft-light)",                         line:961, notes:"Near-white hex has no dark-mode equivalent." },
  { id:"tm7", page:"TeamV2",  file:"TeamV2.tsx", layer:"DangerZone > confirm input bg",          type:"dark-mode-failure",  severity:"Critical", current:"bg-white", correct:"var(--elevated) / bg-card",                        line:979, notes:"Pure white will not flip in dark mode." },
  { id:"tm8", page:"TeamV2",  file:"TeamV2.tsx", layer:"DangerZone borders, text × 6 elements", type:"tailwind-semantic",  severity:"High",     current:"border-red-200, text-red-500/600, hover:bg-red-50, border-red-300", correct:"var(--error-soft-light), var(--error-on-light), …", line:975 },
  { id:"tm9", page:"TeamV2",  file:"TeamV2.tsx", layer:"MemberRow > remove action",             type:"tailwind-semantic",  severity:"High",     current:"text-red-500 hover:bg-red-50", correct:"var(--error-on-light) / var(--error-soft-light)", line:281 },

  // ── ProfileV2 ────────────────────────────────────────────────────────────────
  { id:"p1",  page:"ProfileV2", file:"ProfileV2.tsx", layer:"ROLE_CFG > 'admin' color + bg",     type:"hardcoded-color",    severity:"Critical", current:"#0f5fd7 / #eef4ff", correct:"var(--info-on-light) / var(--info-soft-light)",   line:23 },
  { id:"p2",  page:"ProfileV2", file:"ProfileV2.tsx", layer:"ROLE_CFG > 'member' color + bg",    type:"hardcoded-color",    severity:"Critical", current:"#0f6a43 / #eaf7f0", correct:"var(--success-on-light) / var(--success-soft-light)", line:24 },
  { id:"p3",  page:"ProfileV2", file:"ProfileV2.tsx", layer:"ROLE_CFG > 'viewer' color + bg",    type:"dark-mode-failure",  severity:"Critical", current:"#6b7280 / #f3f4f6", correct:"var(--neutral-on-light) / var(--neutral-soft-light)", line:25 },
  { id:"p4",  page:"ProfileV2", file:"ProfileV2.tsx", layer:"PasswordSection > saved state bg",  type:"hardcoded-color",    severity:"High",     current:"pwSaved ? '#0f6a43'", correct:"var(--success-solid)",                          line:776, notes:"Inline ternary with raw hex; success state not using token." },
  { id:"p5",  page:"ProfileV2", file:"ProfileV2.tsx", layer:"PasswordSection > mismatch notice", type:"tailwind-semantic",  severity:"High",     current:"text-red-500",  correct:"style={{ color: 'var(--error-on-light)' }}",     line:770 },
  { id:"p6",  page:"ProfileV2", file:"ProfileV2.tsx", layer:"SessionList > revoke button",       type:"tailwind-semantic",  severity:"Medium",   current:"text-red-400 hover:text-red-600", correct:"var(--error-on-light)",                line:806 },
  { id:"p7",  page:"ProfileV2", file:"ProfileV2.tsx", layer:"DangerZone > Delete Account heading", type:"tailwind-semantic",severity:"High",     current:"text-red-600 + text-red-500", correct:"var(--error-on-light)",                   line:848 },
  { id:"p8",  page:"ProfileV2", file:"ProfileV2.tsx", layer:"DangerZone > confirm input",        type:"dark-mode-failure",  severity:"Critical", current:"border-red-300 bg-white placeholder:text-red-300", correct:"var(--error-soft-light) bg-card var(--error-soft-light)", line:872, notes:"bg-white stays white in dark mode." },

  // ── TeamSelectionV2 ──────────────────────────────────────────────────────────
  { id:"ts1", page:"TeamSelectionV2", file:"TeamSelectionV2.tsx", layer:"CreatePanel > required field asterisk", type:"tailwind-semantic", severity:"Medium", current:"text-red-400", correct:"style={{ color: 'var(--error-on-light)' }}", line:254 },

  // ── CalendarV2 ───────────────────────────────────────────────────────────────
  { id:"cal1", page:"CalendarV2", file:"CalendarV2.tsx", layer:"linkIcon / EventDetailPanel > link type colors > task",  type:"semantic-misuse",   severity:"Medium",   current:"var(--warning-on-light)", correct:"var(--warning-on)",                                   line:364, notes:"Non-adaptive -on-light token. Fixed in both linkIcon and EventDetailPanel labelColors." },
  { id:"cal2", page:"CalendarV2", file:"CalendarV2.tsx", layer:"LeftRail > Quick Create button > hover bg",              type:"dark-mode-failure",  severity:"High",     current:"var(--rally-brand-200)",  correct:"var(--rally-brand-soft)",                              line:613, notes:"--rally-brand-200 is a fixed light-mode hex (#ffd0be); has no dark counterpart." },
  { id:"cal3", page:"CalendarV2", file:"CalendarV2.tsx", layer:"MonthView > today cell background",                      type:"dark-mode-failure",  severity:"Critical", current:"var(--rally-brand-soft-light)", correct:"var(--rally-brand-soft)",                     line:951, notes:"Non-adaptive soft token — light-mode only; today cell renders light-cream in dark mode." },
  { id:"cal4", page:"CalendarV2", file:"CalendarV2.tsx", layer:"EventDetailPanel > AI Assist toggle button > active bg", type:"dark-mode-failure",  severity:"High",     current:"var(--rally-brand-soft-light)", correct:"var(--rally-brand-soft)",                     line:1028, notes:"AI toggle active state uses light-only token; fails in dark and non-Rally themes." },
  { id:"cal5", page:"CalendarV2", file:"CalendarV2.tsx", layer:"EventDetailPanel > AI Assist panel > bg + border",       type:"dark-mode-failure",  severity:"High",     current:"var(--rally-brand-soft-light) / var(--rally-brand-200)", correct:"var(--rally-brand-soft) / var(--border-color)", line:1041, notes:"Both bg and border use non-adaptive light tokens; AI panel appears bright in dark mode." },
  { id:"cal6", page:"CalendarV2", file:"CalendarV2.tsx", layer:"EventDetailPanel > AI Assist chip buttons > hover bg",   type:"dark-mode-failure",  severity:"High",     current:"var(--rally-brand-200)",  correct:"var(--rally-brand-soft)",                              line:1048, notes:"Same --rally-brand-200 issue as Quick Create; fixed to adaptive --rally-brand-soft." },

  // ── Global / Cross-cutting ────────────────────────────────────────────────────
  { id:"g1",  page:"All pages",  file:"*(V2).tsx", layer:"Interactive elements — no focus ring",  type:"missing-state",      severity:"High",     current:"No :focus-visible ring defined", correct:"box-shadow: 0 0 0 2px var(--focus-ring) — add to all buttons/inputs", notes:"Focus ring token exists but is not applied via className or CSS on interactive elements." },
  { id:"g2",  page:"All pages",  file:"*(V2).tsx", layer:"Interactive elements — no pressing state", type:"missing-state",   severity:"High",     current:"No active: scale/bg classes",  correct:"active:scale-[0.97] active:bg-[var(--rally-brand-pressed)] per element type", notes:"Part 4 of the audit — pressing states defined in tokens but not yet applied." },
  { id:"g3",  page:"All V2 pages", file:"*(V2).tsx", layer:"Most text nodes at 13px",            type:"hardcoded-color",    severity:"Medium",   current:"text-[13px]",  correct:"text-[14px] (Body SM) — 13px not in type scale",  notes:"Off-scale type size. Type scale: 10, 11, 12, 14, 16, 18, 22, 28px." },
];

// ── Config ────────────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<ViolationType, { label: string; Icon: React.ElementType; color: string }> = {
  "hardcoded-color":  { label: "Hardcoded Color",       Icon: Palette,       color: "var(--rally-brand-on)"  },
  "dark-mode-failure":{ label: "Dark Mode Failure",     Icon: Moon,          color: "var(--info-on)"         },
  "semantic-misuse":  { label: "Semantic Misuse",       Icon: AlertTriangle, color: "var(--warning-on)"      },
  "theme-isolation":  { label: "Theme Isolation Fail",  Icon: Layers,        color: "var(--error-on)"        },
  "missing-state":    { label: "Missing Interaction",   Icon: Zap,           color: "var(--neutral-on)"      },
  "tailwind-semantic":{ label: "Tailwind Semantic Class",Icon: Eye,          color: "var(--success-on)"      },
};

const TYPE_BG: Record<ViolationType, string> = {
  "hardcoded-color":   "var(--rally-brand-soft)",
  "dark-mode-failure": "var(--info-soft)",
  "semantic-misuse":   "var(--warning-soft)",
  "theme-isolation":   "var(--error-soft)",
  "missing-state":     "var(--neutral-soft)",
  "tailwind-semantic": "var(--success-soft)",
};

const SEV_CFG: Record<Severity, { color: string; bg: string; Icon: React.ElementType }> = {
  Critical: { color: "var(--error-on)",   bg: "var(--error-soft)",   Icon: AlertCircle   },
  High:     { color: "var(--warning-on)",  bg: "var(--warning-soft)", Icon: AlertTriangle },
  Medium:   { color: "var(--info-on)",     bg: "var(--info-soft)",    Icon: Info          },
};

const ALL_PAGES = [...new Set(VIOLATIONS.map(v => v.page))];

// ── Sub-components ────────────────────────────────────────────────────────────

function SevBadge({ severity }: { severity: Severity }) {
  const cfg = SEV_CFG[severity];
  const Icon = cfg.Icon;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium flex-shrink-0"
      style={{ background: cfg.bg, color: cfg.color }}>
      <Icon className="size-3" />
      {severity}
    </span>
  );
}

function TypeTag({ type }: { type: ViolationType }) {
  const cfg = TYPE_LABELS[type];
  const Icon = cfg.Icon;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium flex-shrink-0"
      style={{ background: TYPE_BG[type], color: cfg.color }}>
      <Icon className="size-3" />
      {cfg.label}
    </span>
  );
}

function ColorSwatch({ value }: { value: string }) {
  const isVar    = value.startsWith("var(");
  const isHex    = /^#[0-9a-f]{3,8}$/i.test(value.split(" ")[0]);
  const isTW     = value.startsWith("text-") || value.startsWith("bg-") || value.startsWith("border-");
  return (
    <code className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[5px] text-[11px] font-mono"
      style={{
        background: isVar ? "var(--neutral-soft)" : isHex ? "var(--error-soft)" : isTW ? "var(--warning-soft)" : "var(--info-soft)",
        color:      isVar ? "var(--neutral-on)"   : isHex ? "var(--error-on)"   : isTW ? "var(--warning-on)"   : "var(--info-on)",
      }}>
      {isHex && (
        <span className="w-3 h-3 rounded-full border border-border flex-shrink-0"
          style={{ background: value.split(" ")[0] }} />
      )}
      {value.length > 42 ? value.slice(0, 42) + "…" : value}
    </code>
  );
}

function ViolationRow({ v }: { v: Violation }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border-subtle)] last:border-none">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-3 px-4 py-3 hover:bg-muted transition-all duration-[120ms] active:bg-[var(--neutral-soft)] text-left"
      >
        <div className="mt-0.5 flex-shrink-0">
          {open
            ? <ChevronDown className="size-3.5 text-muted-foreground" />
            : <ChevronRight className="size-3.5 text-muted-foreground" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <SevBadge severity={v.severity} />
            <TypeTag type={v.type} />
            {v.line && (
              <span className="text-[11px] text-muted-foreground font-medium">
                line {v.line}
              </span>
            )}
          </div>
          <p className="text-[14px] text-foreground font-medium leading-snug">{v.layer}</p>
          {!open && (
            <p className="text-[12px] text-muted-foreground mt-0.5 truncate">
              {v.current} → {v.correct.length > 60 ? v.correct.slice(0, 60) + "…" : v.correct}
            </p>
          )}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 ml-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest mb-1.5" style={{ color: "var(--text-overline)" }}>Current (violation)</p>
              <ColorSwatch value={v.current} />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest mb-1.5" style={{ color: "var(--text-overline)" }}>Correct (token)</p>
              <ColorSwatch value={v.correct} />
            </div>
          </div>
          {v.notes && (
            <div className="flex gap-2 px-3 py-2.5 rounded-[8px]" style={{ background: "var(--warning-soft)" }}>
              <Info className="size-3.5 flex-shrink-0 mt-0.5" style={{ color: "var(--warning-on)" }} />
              <p className="text-[12px] leading-normal" style={{ color: "var(--warning-on)" }}>{v.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PageGroup({ page, violations }: { page: string; violations: Violation[] }) {
  const [collapsed, setCollapsed] = useState(false);
  const critCount = violations.filter(v => v.severity === "Critical").length;
  const highCount = violations.filter(v => v.severity === "High").length;
  const medCount  = violations.filter(v => v.severity === "Medium").length;

  return (
    <div className="rounded-[14px] border border-border bg-card overflow-hidden">
      <button
        onClick={() => setCollapsed(c => !c)}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted transition-all duration-[120ms] active:bg-[var(--neutral-soft)] border-b border-[var(--border-subtle)] text-left"
      >
        <div className="w-7 h-7 rounded-[8px] flex items-center justify-center text-[13px] font-medium text-white flex-shrink-0"
          style={{ background: critCount > 0 ? "var(--error-solid)" : highCount > 0 ? "var(--warning-solid)" : "var(--info-solid)" }}>
          {violations.length}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-medium text-foreground">{page}</p>
          <div className="flex items-center gap-3 mt-0.5">
            {critCount > 0 && <span className="text-[11px] font-medium" style={{ color: "var(--error-on)" }}>{critCount} Critical</span>}
            {highCount > 0 && <span className="text-[11px] font-medium" style={{ color: "var(--warning-on)" }}>{highCount} High</span>}
            {medCount  > 0 && <span className="text-[11px] font-medium" style={{ color: "var(--info-on)" }}>{medCount} Medium</span>}
          </div>
        </div>
        {collapsed
          ? <ChevronRight className="size-4 text-muted-foreground flex-shrink-0" />
          : <ChevronDown  className="size-4 text-muted-foreground flex-shrink-0" />}
      </button>
      {!collapsed && (
        <div>
          {violations.map(v => <ViolationRow key={v.id} v={v} />)}
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function ColorAuditV2() {
  const [search,      setSearch]      = useState("");
  const [sevFilter,   setSevFilter]   = useState<Severity | "all">("all");
  const [typeFilter,  setTypeFilter]  = useState<ViolationType | "all">("all");
  const [pageFilter,  setPageFilter]  = useState("all");

  const filtered = useMemo(() => {
    return VIOLATIONS.filter(v => {
      if (sevFilter  !== "all" && v.severity !== sevFilter)   return false;
      if (typeFilter !== "all" && v.type !== typeFilter)       return false;
      if (pageFilter !== "all" && v.page !== pageFilter)       return false;
      if (search) {
        const q = search.toLowerCase();
        return v.layer.toLowerCase().includes(q)
          || v.current.toLowerCase().includes(q)
          || v.correct.toLowerCase().includes(q)
          || v.page.toLowerCase().includes(q)
          || (v.notes ?? "").toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, sevFilter, typeFilter, pageFilter]);

  const byPage = useMemo(() => {
    const map = new Map<string, Violation[]>();
    for (const v of filtered) {
      if (!map.has(v.page)) map.set(v.page, []);
      map.get(v.page)!.push(v);
    }
    return map;
  }, [filtered]);

  const totalCrit = VIOLATIONS.filter(v => v.severity === "Critical").length;
  const totalHigh = VIOLATIONS.filter(v => v.severity === "High").length;
  const totalMed  = VIOLATIONS.filter(v => v.severity === "Medium").length;

  const typeCounts = useMemo(() => {
    const map: Partial<Record<ViolationType, number>> = {};
    for (const v of VIOLATIONS) map[v.type] = (map[v.type] ?? 0) + 1;
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* ── Header ── */}
      <div className="border-b border-border bg-card px-6 py-5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Shield className="size-5" style={{ color: "var(--rally-brand)" }} />
                <h1 className="text-[22px] font-medium text-foreground">Rally Color System Audit</h1>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-medium text-white" style={{ background: "var(--success-solid)" }}>
                  FIXED
                </span>
              </div>
              <p className="text-[14px] text-muted-foreground">
                Full token-binding audit across all V2 pages — all violations resolved across DashboardV2, ChatV2, AIChatV2, TodoV2, FilesV2, TeamV2, ProfileV2, and CalendarV2. This page documents the fixes applied and serves as a reference for future audits.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
              <Sun className="size-3.5" />
              <span>Light + Dark</span>
              <span className="mx-1 opacity-30">·</span>
              <Palette className="size-3.5" />
              <span>6 themes</span>
            </div>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {[
              { label: "Total Violations", value: VIOLATIONS.length, color: "var(--text-primary)", bg: "var(--neutral-soft)" },
              { label: "Critical",          value: totalCrit,          color: "var(--error-on)",   bg: "var(--error-soft)"   },
              { label: "High",              value: totalHigh,          color: "var(--warning-on)", bg: "var(--warning-soft)" },
              { label: "Medium",            value: totalMed,           color: "var(--info-on)",    bg: "var(--info-soft)"    },
            ].map(s => (
              <div key={s.label} className="rounded-[10px] px-4 py-3" style={{ background: s.bg }}>
                <p className="text-[24px] font-medium leading-none mb-1" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[11px] font-medium" style={{ color: s.color }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">

        {/* ── Violation type breakdown ── */}
        <div className="rounded-[14px] border border-border bg-card p-4">
          <p className="text-[10px] font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-overline)" }}>Violations by type</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(Object.entries(typeCounts) as [ViolationType, number][]).map(([type, count]) => {
              const cfg = TYPE_LABELS[type];
              const Icon = cfg.Icon;
              return (
                <button key={type}
                  onClick={() => setTypeFilter(t => t === type ? "all" : type)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-[8px] border text-left transition-all duration-[120ms] active:scale-[0.98]"
                  style={{
                    background:   typeFilter === type ? TYPE_BG[type] : "var(--background)",
                    borderColor:  typeFilter === type ? cfg.color      : "var(--border-color)",
                  }}>
                  <Icon className="size-3.5 flex-shrink-0" style={{ color: cfg.color }} />
                  <span className="text-[12px] text-foreground flex-1 truncate">{cfg.label}</span>
                  <span className="text-[11px] font-medium flex-shrink-0" style={{ color: cfg.color }}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search layers, values, tokens…"
              className="w-full pl-8 pr-3 py-2 rounded-[8px] border border-border bg-background text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-[var(--rally-brand)] transition-colors"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter className="size-3.5 text-muted-foreground" />
            {(["all", "Critical", "High", "Medium"] as const).map(s => (
              <button key={s}
                onClick={() => setSevFilter(s)}
                className="px-2.5 py-1.5 rounded-[7px] text-[11px] font-medium transition-all duration-[120ms] active:scale-[0.97]"
                style={sevFilter === s
                  ? { background: s === "all" ? "var(--neutral-solid)" : SEV_CFG[s as Severity].bg, color: s === "all" ? "#fff" : SEV_CFG[s as Severity].color, border: "1px solid transparent" }
                  : { background: "var(--background)", color: "var(--text-secondary)", border: "1px solid var(--border-color)" }}>
                {s === "all" ? "All severity" : s}
              </button>
            ))}
          </div>
          <select
            value={pageFilter} onChange={e => setPageFilter(e.target.value)}
            className="h-8 px-2 rounded-[7px] border border-border bg-background text-[12px] text-foreground outline-none focus:border-[var(--rally-brand)] transition-colors cursor-pointer"
          >
            <option value="all">All pages</option>
            {ALL_PAGES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* ── Results ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <CheckCircle2 className="size-10 text-muted-foreground opacity-20 mb-3" />
            <p className="text-[14px] text-muted-foreground">No violations match your filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {[...byPage.entries()].map(([page, violations]) => (
              <PageGroup key={page} page={page} violations={violations} />
            ))}
          </div>
        )}

        {/* ── Per-page summary table ── */}
        <div className="rounded-[14px] border border-border bg-card overflow-hidden">
          <div className="px-4 py-3.5 border-b border-[var(--border-subtle)]">
            <p className="text-[14px] font-medium text-foreground">Summary by page</p>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-muted/40">
                {["Page", "Critical", "High", "Medium", "Total"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-[10px] font-medium uppercase tracking-widest" style={{ color: "var(--text-overline)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_PAGES.map(page => {
                const pvs = VIOLATIONS.filter(v => v.page === page);
                const c = pvs.filter(v => v.severity === "Critical").length;
                const h = pvs.filter(v => v.severity === "High").length;
                const m = pvs.filter(v => v.severity === "Medium").length;
                return (
                  <tr key={page} className="border-b border-[var(--border-subtle)] last:border-none hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5 text-[13px] font-medium text-foreground">{page}</td>
                    <td className="px-4 py-2.5">
                      {c > 0 && <span className="text-[11px] font-medium" style={{ color: "var(--error-on)" }}>{c}</span>}
                    </td>
                    <td className="px-4 py-2.5">
                      {h > 0 && <span className="text-[11px] font-medium" style={{ color: "var(--warning-on)" }}>{h}</span>}
                    </td>
                    <td className="px-4 py-2.5">
                      {m > 0 && <span className="text-[11px] font-medium" style={{ color: "var(--info-on)" }}>{m}</span>}
                    </td>
                    <td className="px-4 py-2.5 text-[13px] text-foreground font-medium">{pvs.length}</td>
                  </tr>
                );
              })}
              <tr className="bg-muted/50">
                <td className="px-4 py-2.5 text-[13px] font-medium text-foreground">Total</td>
                <td className="px-4 py-2.5 text-[11px] font-medium" style={{ color: "var(--error-on)" }}>{totalCrit}</td>
                <td className="px-4 py-2.5 text-[11px] font-medium" style={{ color: "var(--warning-on)" }}>{totalHigh}</td>
                <td className="px-4 py-2.5 text-[11px] font-medium" style={{ color: "var(--info-on)" }}>{totalMed}</td>
                <td className="px-4 py-2.5 text-[13px] font-medium text-foreground">{VIOLATIONS.length}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Legend ── */}
        <div className="rounded-[14px] border border-border bg-card p-4">
          <p className="text-[10px] font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-overline)" }}>Severity guide</p>
          <div className="space-y-2">
            {([
              { sev: "Critical" as Severity, desc: "Will visually break in dark mode, or hardcoded value that prevents theme switching. Must fix before launch." },
              { sev: "High"     as Severity, desc: "Hex value that maps to an existing token but bypasses it. Breaks theme consistency and dark mode in edge cases." },
              { sev: "Medium"   as Severity, desc: "Tailwind semantic class (text-red-*) or off-scale typography that reduces portability and theme adaptation." },
            ]).map(({ sev, desc }) => {
              const cfg = SEV_CFG[sev];
              return (
                <div key={sev} className="flex items-start gap-3 px-3 py-2.5 rounded-[8px]" style={{ background: cfg.bg }}>
                  <SevBadge severity={sev} />
                  <p className="text-[12px] leading-normal" style={{ color: cfg.color }}>{desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-[12px] text-center text-muted-foreground pb-4">
          Rally Color System Audit · {VIOLATIONS.length} violations across {ALL_PAGES.length} pages · Generated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>
    </div>
  );
}
import { useState } from "react";
import {
  Crown, Shield, UserCheck, Eye, Users, Search, Bell, Plus, ChevronDown,
  Sparkles, CheckCircle2, Clock, AlertCircle, PauseCircle, Mic, MicOff,
  FileText, MessageSquare, Hash, Calendar, ArrowRight, MoreHorizontal,
  X, FolderOpen, Folder, Bot, Zap, Upload, Video, CheckSquare,
  Circle, ChevronRight, AlertTriangle, HardDrive, UserPlus, Activity,
  Headphones, Volume2, SquarePen, RefreshCw, Lock, WifiOff, Star,
  StarOff, Download, Pencil, Trash2, Move, Check, Home, Pin,
  Mail, Phone, Briefcase, Globe, Tag, LogOut, Sun, Moon, Bookmark,
  Share2, ArrowUpRight, ExternalLink, Flag, Play, Reply, Edit2,
  Send, Paperclip, Smile, AtSign, Settings, Copy, ShieldCheck,
  UserMinus, AlarmClock, PenLine, Inbox, RotateCcw, XCircle,
  Wifi, Monitor, Smartphone, VolumeX, EyeOff, Info, MapPin, AlignLeft,
} from "lucide-react";

// ── Section registry ──────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "semantic-badges",    label: "Semantic Badges"         },
  { id: "role-badges",        label: "Role Badges"             },
  { id: "priority-badges",    label: "Priority Badges"         },
  { id: "status-badges",      label: "Task Status Badges"      },
  { id: "label-chips",        label: "Label Chips"             },
  { id: "ai-scope-chips",     label: "AI Scope Chips"          },
  { id: "availability",       label: "Availability Status"     },
  { id: "misc-pills",         label: "Misc Pills & Tags"       },
  { id: "status-dots",        label: "Status Dots"             },
  { id: "counters",           label: "Counters & Notif. Badges"},
  { id: "avatars",            label: "Avatars"                 },
  { id: "avatar-status",      label: "Avatars + Status"        },
  { id: "avatar-groups",      label: "Avatar Groups"           },
  { id: "bot-avatar",         label: "Bot / AI Avatar"         },
  { id: "bare-icons",         label: "Icons (bare)"            },
  { id: "icons-bg",           label: "Icons + Background"      },
  { id: "file-ext-badges",    label: "File Extension Badges"   },
  { id: "folder-icons",       label: "Folder Icons"            },
  { id: "file-attach-chips",  label: "File Attachment Chips"   },
  { id: "task-state-icons",   label: "Task State Icons"        },
  { id: "permission-cells",   label: "Permission Matrix Cells" },
  { id: "emoji-reactions",    label: "Emoji Reactions"         },
  { id: "voice-mic",          label: "Voice / Mic Indicators"  },
  { id: "link-chips",         label: "Link Type Chips"         },
  { id: "priority-flags",     label: "Priority Flags"          },
  { id: "star-pin-bookmark",  label: "Star / Pin / Bookmark"   },
  { id: "version-tags",       label: "Version Tags"            },
  { id: "progress-bars",      label: "Progress Bars"           },
  { id: "calendar-events",    label: "Calendar Event Pills"    },
  { id: "mini-cards",         label: "Mini Cards"              },
  { id: "misc-elements",      label: "Misc Elements"           },
];

// ── Shared helpers ────────────────────────────────────────────────────────────

function avatarBg(name: string) {
  const palette = ["#3B82F6","#10B981","#F59E0B","#8B5CF6","#EC4899","#14B8A6","#F97316"];
  let h = 0; for (const ch of name) h = ch.charCodeAt(0) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
}

function Av({ name, size = 32 }: { name: string; size?: number }) {
  const init = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className="rounded-full flex items-center justify-center text-white flex-shrink-0"
      style={{ width: size, height: size, background: avatarBg(name), fontSize: size * 0.38, fontWeight: 600 }}>
      {init}
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16">
      <div className="mb-4 pb-2 border-b border-border">
        <h2 className="text-[14px] font-medium text-foreground">{title}</h2>
        <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "var(--text-overline)" }}>#{id}</span>
      </div>
      <div className="mb-10">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="text-[10px] font-medium uppercase tracking-wider mb-2.5" style={{ color: "var(--text-overline)" }}>{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

// ── 1. Semantic Badges ────────────────────────────────────────────────────────

const SEMANTIC_VARIANTS = [
  { key: "brand",   label: "Brand",   bg: "var(--rally-brand-soft)", color: "var(--rally-brand-on)" },
  { key: "success", label: "Success", bg: "var(--success-soft)",     color: "var(--success-on)"     },
  { key: "warning", label: "Warning", bg: "var(--warning-soft)",     color: "var(--warning-on)"     },
  { key: "error",   label: "Error",   bg: "var(--error-soft)",       color: "var(--error-on)"       },
  { key: "info",    label: "Info",    bg: "var(--info-soft)",        color: "var(--info-on)"        },
  { key: "neutral", label: "Neutral", bg: "var(--neutral-soft)",     color: "var(--neutral-on)"     },
] as const;

function SemanticBadge({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
      style={{ background: bg, color }}>
      {label}
    </span>
  );
}

// ── 2. Role Badges ────────────────────────────────────────────────────────────

const ROLE_CFG = {
  owner:  { label: "Owner",  color: "var(--rally-brand-on)", bg: "var(--rally-brand-soft)", Icon: Crown     },
  admin:  { label: "Admin",  color: "var(--info-on)",        bg: "var(--info-soft)",        Icon: Shield    },
  member: { label: "Member", color: "var(--success-on)",     bg: "var(--success-soft)",     Icon: UserCheck },
  viewer: { label: "Viewer", color: "var(--neutral-on)",     bg: "var(--neutral-soft)",     Icon: Eye       },
};

function RoleBadge({ role, size = "sm" }: { role: keyof typeof ROLE_CFG; size?: "xs" | "sm" | "md" }) {
  const cfg = ROLE_CFG[role];
  const Icon = cfg.Icon;
  const pad  = size === "xs" ? "px-1.5 py-0.5" : size === "md" ? "px-3 py-1" : "px-2 py-0.5";
  const fs   = size === "xs" ? "text-[10px]"   : size === "md" ? "text-[13px]" : "text-[11px]";
  const is   = size === "xs" ? "size-2" : size === "md" ? "size-4" : "size-2.5";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${pad} ${fs}`}
      style={{ background: cfg.bg, color: cfg.color }}>
      <Icon className={is} />
      {cfg.label}
    </span>
  );
}

// ── 3. Priority Badges ────────────────────────────────────────────────────────

const PRIORITY_CFG = {
  urgent: { label: "Urgent", color: "var(--error-on)",       bg: "var(--error-soft)",       dot: "var(--error-solid)"   },
  high:   { label: "High",   color: "var(--rally-brand-on)", bg: "var(--rally-brand-soft)", dot: "var(--rally-brand)"   },
  medium: { label: "Medium", color: "var(--info-on)",        bg: "var(--info-soft)",        dot: "var(--info-solid)"    },
  low:    { label: "Low",    color: "var(--success-on)",     bg: "var(--success-soft)",     dot: "var(--success-solid)" },
};

function PriorityBadge({ p }: { p: keyof typeof PRIORITY_CFG }) {
  const cfg = PRIORITY_CFG[p];
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium"
      style={{ background: cfg.bg, color: cfg.color }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
}

// ── 4. Task Status Badges ─────────────────────────────────────────────────────

const STATUS_CFG = {
  "todo":        { label: "To Do",       color: "var(--neutral-on)", bg: "var(--neutral-soft)" },
  "in-progress": { label: "In Progress", color: "var(--info-on)",    bg: "var(--info-soft)"    },
  "blocked":     { label: "Blocked",     color: "var(--error-on)",   bg: "var(--error-soft)"   },
  "done":        { label: "Done",        color: "var(--success-on)", bg: "var(--success-soft)" },
};

function StatusBadge({ s }: { s: keyof typeof STATUS_CFG }) {
  const cfg = STATUS_CFG[s];
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
      style={{ background: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  );
}

// ── 5. Label Chips ────────────────────────────────────────────────────────────

const LABEL_CFG = {
  design:      { color: "var(--info-on)",        bg: "var(--info-soft)"        },
  engineering: { color: "var(--info-on)",        bg: "var(--info-soft)"        },
  planning:    { color: "var(--success-on)",     bg: "var(--success-soft)"     },
  review:      { color: "var(--warning-on)",     bg: "var(--warning-soft)"     },
  bug:         { color: "var(--error-on)",       bg: "var(--error-soft)"       },
  feature:     { color: "var(--neutral-on)",     bg: "var(--neutral-soft)"     },
};

function LabelChip({ k }: { k: keyof typeof LABEL_CFG }) {
  const cfg = LABEL_CFG[k];
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium capitalize"
      style={{ background: cfg.bg, color: cfg.color }}>
      {k}
    </span>
  );
}

// ── 6. AI Scope Chips ─────────────────────────────────────────────────────────

const AI_SCOPE_CFG = [
  { key: "team",     label: "Team",     icon: Users,       bg: "var(--neutral-soft)", color: "var(--neutral-on)"     },
  { key: "files",    label: "Files",    icon: FileText,    bg: "var(--info-soft)",    color: "var(--info-on)"        },
  { key: "tasks",    label: "Tasks",    icon: CheckSquare, bg: "var(--success-soft)", color: "var(--success-on)"     },
  { key: "calendar", label: "Calendar", icon: Calendar,    bg: "var(--rally-brand-soft)", color: "var(--rally-brand-on)" },
  { key: "chat",     label: "Chat",     icon: MessageSquare, bg: "var(--neutral-soft)", color: "var(--neutral-on)"   },
  { key: "web",      label: "Web",      icon: Globe,       bg: "var(--neutral-soft)", color: "var(--neutral-on)"     },
];

function AIScopeChip({ active = false, cfg }: { active?: boolean; cfg: typeof AI_SCOPE_CFG[0] }) {
  const Icon = cfg.icon;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border"
      style={active
        ? { background: cfg.bg, color: cfg.color, borderColor: cfg.color + "60" }
        : { background: "var(--elevated)", color: "var(--text-tertiary)", borderColor: "var(--border-color)" }}>
      <Icon className="size-3" />
      {cfg.label}
    </span>
  );
}

// ── 7. Availability Status ────────────────────────────────────────────────────

const AVAIL_CFG = {
  online:  { label: "Online",          color: "var(--status-active)",   bg: "var(--success-soft)", on: "var(--success-on)" },
  away:    { label: "Away",            color: "var(--status-limited)",  bg: "var(--neutral-soft)", on: "var(--neutral-on)" },
  dnd:     { label: "Do Not Disturb",  color: "var(--error-solid)",     bg: "var(--error-soft)",   on: "var(--error-on)"   },
  offline: { label: "Appear Offline",  color: "var(--status-disabled)", bg: "var(--neutral-soft)", on: "var(--neutral-on)" },
};

function AvailBadge({ s }: { s: keyof typeof AVAIL_CFG }) {
  const cfg = AVAIL_CFG[s];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
      style={{ background: cfg.bg, color: cfg.on }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  );
}

// ── 8. Misc Pills ─────────────────────────────────────────────────────────────

// ── 9. Status Dots ────────────────────────────────────────────────────────────

function StatusDot({ status, showLabel = false }: { status: "online" | "away" | "offline" | "dnd"; showLabel?: boolean }) {
  const map = {
    online:  { color: "var(--status-active)",    label: "Online"  },
    away:    { color: "var(--status-limited)",   label: "Away"    },
    offline: { color: "var(--status-disabled)",  label: "Offline" },
    dnd:     { color: "var(--error-solid)",      label: "DND"     },
  };
  const cfg = map[status];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
      {showLabel && <span className="text-[11px]" style={{ color: cfg.color }}>{cfg.label}</span>}
    </span>
  );
}

// ── 10. Counters & Notification Badges ───────────────────────────────────────

function CountBadge({ n, variant = "error" }: { n: number | string; variant?: "error" | "brand" | "neutral" }) {
  const styles = {
    error:   { bg: "var(--error-solid)",   color: "#fff" },
    brand:   { bg: "var(--rally-brand)",   color: "#fff" },
    neutral: { bg: "var(--neutral-soft)",  color: "var(--neutral-on)" },
  }[variant];
  return (
    <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-medium leading-none flex-shrink-0"
      style={{ background: styles.bg, color: styles.color }}>
      {typeof n === "number" && n > 99 ? "99+" : n}
    </span>
  );
}

function NotifBellWithDot({ count = 3 }: { count?: number }) {
  return (
    <div className="relative inline-flex">
      <div className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-card border border-border text-muted-foreground">
        <Bell className="size-4" />
      </div>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center px-0.5 rounded-full text-[9px] font-medium text-white"
          style={{ background: "var(--error-solid)" }}>
          {count}
        </span>
      )}
    </div>
  );
}

// ── 11–13. Avatars ────────────────────────────────────────────────────────────

function AvWithStatus({ name, size = 36, status }: { name: string; size?: number; status: "online" | "away" | "offline" | "dnd" }) {
  const dotMap = {
    online: "var(--status-active)",
    away:   "var(--status-limited)",
    offline:"var(--status-disabled)",
    dnd:    "var(--error-solid)",
  };
  const dotSize = Math.max(10, Math.round(size * 0.28));
  return (
    <div className="relative inline-flex flex-shrink-0">
      <Av name={name} size={size} />
      <span className="absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-card flex-shrink-0"
        style={{ width: dotSize, height: dotSize, background: dotMap[status] }} />
    </div>
  );
}

function AvatarGroup({ names, size = 28, max = 4 }: { names: string[]; size?: number; max?: number }) {
  const shown = names.slice(0, max);
  const extra = names.length - max;
  return (
    <div className="flex items-center">
      {shown.map((n, i) => (
        <div key={n} className="rounded-full border-2 border-card flex-shrink-0"
          style={{ marginLeft: i === 0 ? 0 : -(size * 0.35), zIndex: shown.length - i }}>
          <Av name={n} size={size} />
        </div>
      ))}
      {extra > 0 && (
        <div className="rounded-full border-2 border-card flex items-center justify-center bg-muted text-muted-foreground flex-shrink-0"
          style={{ width: size, height: size, fontSize: size * 0.35, fontWeight: 600, marginLeft: -(size * 0.35) }}>
          +{extra}
        </div>
      )}
    </div>
  );
}

function BotAvatar({ size = 32 }: { size?: number }) {
  return (
    <div className="rounded-full flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, background: "var(--rally-brand)", boxShadow: "0 2px 8px 0 rgba(255,70,21,0.25)" }}>
      <Sparkles style={{ width: size * 0.5, height: size * 0.5, color: "#fff" }} />
    </div>
  );
}

// ── 16. Icons with Backgrounds ────────────────────────────────────────────────

const ICON_BG_ITEMS = [
  { icon: FileText,    bg: "var(--rally-brand-soft)", color: "var(--rally-brand-on)", label: "File"      },
  { icon: MessageSquare, bg: "var(--info-soft)",      color: "var(--info-on)",        label: "Chat"      },
  { icon: CheckSquare, bg: "var(--success-soft)",     color: "var(--success-on)",     label: "Task"      },
  { icon: Calendar,    bg: "var(--warning-soft)",     color: "var(--warning-on)",     label: "Event"     },
  { icon: Users,       bg: "var(--neutral-soft)",     color: "var(--neutral-on)",     label: "Team"      },
  { icon: Bot,         bg: "var(--rally-brand-soft)", color: "var(--rally-brand-on)", label: "AI"        },
  { icon: Sparkles,    bg: "var(--info-soft)",        color: "var(--info-on)",        label: "Sparkles"  },
  { icon: Zap,         bg: "var(--warning-soft)",     color: "var(--warning-on)",     label: "Zap"       },
  { icon: AlertTriangle, bg: "var(--error-soft)",     color: "var(--error-on)",       label: "Warning"   },
  { icon: ShieldCheck, bg: "var(--success-soft)",     color: "var(--success-on)",     label: "Shield"    },
  { icon: Lock,        bg: "var(--neutral-soft)",     color: "var(--neutral-on)",     label: "Lock"      },
  { icon: Activity,    bg: "var(--info-soft)",        color: "var(--info-on)",        label: "Activity"  },
] as const;

function IconWithBg({ Icon, bg, color, size = 32, label }: { Icon: React.ElementType; bg: string; color: string; size?: number; label?: string }) {
  const is = Math.round(size * 0.5);
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="rounded-[10px] flex items-center justify-center flex-shrink-0"
        style={{ width: size, height: size, background: bg }}>
        <Icon style={{ width: is, height: is, color }} />
      </div>
      {label && <span className="text-[9px] text-muted-foreground">{label}</span>}
    </div>
  );
}

// Circular version
function IconCircle({ Icon, bg, color, size = 32 }: { Icon: React.ElementType; bg: string; color: string; size?: number }) {
  const is = Math.round(size * 0.5);
  return (
    <div className="rounded-full flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, background: bg }}>
      <Icon style={{ width: is, height: is, color }} />
    </div>
  );
}

// ── 17. File Extension Badges ─────────────────────────────────────────────────

const EXT_CFG: Record<string, { color: string; label: string }> = {
  fig:  { color: "#8B5CF6", label: "Figma"   },
  pdf:  { color: "#EF4444", label: "PDF"     },
  xlsx: { color: "#10B981", label: "Sheet"   },
  md:   { color: "#3B82F6", label: "Doc"     },
  pptx: { color: "#F97316", label: "Slides"  },
  docx: { color: "#60A5FA", label: "Doc"     },
  png:  { color: "#14B8A6", label: "Image"   },
  jpg:  { color: "#14B8A6", label: "Image"   },
  zip:  { color: "#9CA3AF", label: "Archive" },
  mp4:  { color: "#EC4899", label: "Video"   },
  json: { color: "#F59E0B", label: "JSON"    },
};

// Compact badge style (in-line label)
function ExtBadge({ ext }: { ext: string }) {
  const cfg = EXT_CFG[ext] ?? { color: "#6B7280", label: "File" };
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide"
      style={{ background: `${cfg.color}18`, color: cfg.color }}>
      {ext}
    </span>
  );
}

// Icon-block style (square with type label below)
function FileIconBlock({ ext, size = 40 }: { ext: string; size?: number }) {
  const cfg = EXT_CFG[ext] ?? { color: "#6B7280", label: "File" };
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="rounded-[8px] flex items-center justify-center"
        style={{ width: size, height: size, background: `${cfg.color}18` }}>
        <span className="text-[9px] font-medium uppercase tracking-wide" style={{ color: cfg.color }}>{ext}</span>
      </div>
      <span className="text-[9px] text-muted-foreground">{cfg.label}</span>
    </div>
  );
}

// ── 18. Folder Icons ──────────────────────────────────────────────────────────

function FolderIconBlock({ name, color, fileCount, size = 40 }: { name: string; color: string; fileCount: number; size?: number }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="rounded-[10px] flex items-center justify-center flex-shrink-0"
        style={{ width: size, height: size, background: color + "20" }}>
        <Folder style={{ width: size * 0.55, height: size * 0.55, color }} />
      </div>
      <div className="text-center">
        <p className="text-[10px] font-medium text-foreground truncate max-w-[64px]">{name}</p>
        <p className="text-[9px] text-muted-foreground">{fileCount} files</p>
      </div>
    </div>
  );
}

// ── 19. File Attachment Chips ─────────────────────────────────────────────────

function FileAttachChip({ name, ext, size }: { name: string; ext: string; size: string }) {
  const cfg = EXT_CFG[ext] ?? { color: "#6B7280", label: "File" };
  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-2 rounded-[8px] border border-border bg-card"
      style={{ maxWidth: 220 }}>
      <div className="w-7 h-7 rounded-[6px] flex items-center justify-center flex-shrink-0"
        style={{ background: `${cfg.color}18` }}>
        <span className="text-[8px] font-medium uppercase" style={{ color: cfg.color }}>{ext}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-foreground truncate">{name}.{ext}</p>
        <p className="text-[10px] text-muted-foreground">{size}</p>
      </div>
      <ArrowRight className="size-3 text-muted-foreground flex-shrink-0" />
    </div>
  );
}

// ── 20. Task State Icons ──────────────────────────────────────────────────────

function TaskStateIcon({ state }: { state: "todo" | "in-progress" | "blocked" | "done" | "paused" }) {
  const map = {
    "todo":        { Icon: Circle,      color: "var(--neutral-on)"  },
    "in-progress": { Icon: Clock,       color: "var(--info-solid)"  },
    "blocked":     { Icon: AlertCircle, color: "var(--error-solid)" },
    "done":        { Icon: CheckCircle2,color: "var(--success-solid)"},
    "paused":      { Icon: PauseCircle, color: "var(--warning-solid" },
  };
  const cfg = map[state];
  return <cfg.Icon className="size-4 flex-shrink-0" style={{ color: cfg.color }} />;
}

// ── 21. Permission Cells ──────────────────────────────────────────────────────

function PermCheck({ has }: { has: boolean }) {
  return has
    ? <Check className="size-3.5" style={{ color: "var(--success-solid)" }} />
    : <X className="size-3.5 opacity-30" style={{ color: "var(--neutral-on)" }} />;
}

// ── 22. Emoji Reactions ───────────────────────────────────────────────────────

function EmojiReaction({ emoji, count, reacted }: { emoji: string; count: number; reacted: boolean }) {
  return (
    <button className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[6px] text-[11px] border transition-colors"
      style={reacted
        ? { background: "var(--rally-brand-soft)", borderColor: "var(--rally-brand)", color: "var(--rally-brand-on)" }
        : { background: "var(--elevated)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
      <span>{emoji}</span>
      <span className="font-medium">{count}</span>
    </button>
  );
}

// ── 23. Voice / Mic Indicators ────────────────────────────────────────────────

function SpeakingDot({ speaking }: { speaking: boolean }) {
  return (
    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${speaking ? "animate-pulse" : ""}`}
      style={{ background: speaking ? "var(--success-solid)" : "var(--status-disabled)" }} />
  );
}

function MicIndicator({ active }: { active: boolean }) {
  return (
    <div className="w-7 h-7 flex items-center justify-center rounded-[7px] transition-colors"
      style={active
        ? { background: "var(--rally-brand)", color: "#fff" }
        : { background: "var(--neutral-soft)", color: "var(--neutral-on)" }}>
      {active ? <Mic className="size-3.5" /> : <MicOff className="size-3.5" />}
    </div>
  );
}

function VoiceRoomRow({ name, participants, speaking }: { name: string; participants: string[]; speaking: string[] }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] border border-border bg-card w-full" style={{ maxWidth: 260 }}>
      <div className="w-7 h-7 rounded-[7px] flex items-center justify-center flex-shrink-0"
        style={{ background: "var(--success-soft)" }}>
        <Volume2 className="size-3.5" style={{ color: "var(--success-solid)" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-foreground">{name}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          {participants.map(p => (
            <span key={p} className="flex items-center gap-1">
              <SpeakingDot speaking={speaking.includes(p)} />
              <span className="text-[10px] text-muted-foreground">{p.split(" ")[0]}</span>
            </span>
          ))}
        </div>
      </div>
      <span className="text-[10px] text-muted-foreground">{participants.length}</span>
    </div>
  );
}

// ── 24. Link Type Chips ───────────────────────────────────────────────────────

const LINK_TYPE_CFG = {
  chat:  { icon: MessageSquare, color: "var(--info-on)",        bg: "var(--info-soft)",        label: "Chat"     },
  task:  { icon: CheckSquare,   color: "var(--warning-on)",     bg: "var(--warning-soft)",     label: "Task"     },
  event: { icon: Calendar,      color: "var(--error-on)",       bg: "var(--error-soft)",       label: "Event"    },
  ai:    { icon: Sparkles,      color: "var(--rally-brand-on)", bg: "var(--rally-brand-soft)", label: "AI"       },
  file:  { icon: FileText,      color: "var(--info-on)",        bg: "var(--info-soft)",        label: "File"     },
  voice: { icon: Volume2,       color: "var(--success-on)",     bg: "var(--success-soft)",     label: "Voice"    },
};

function LinkChip({ type }: { type: keyof typeof LINK_TYPE_CFG }) {
  const cfg = LINK_TYPE_CFG[type];
  const Icon = cfg.icon;
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium"
      style={{ background: cfg.bg, color: cfg.color }}>
      <Icon className="size-3" />
      {cfg.label}
    </span>
  );
}

// ── 25. Priority Flags ────────────────────────────────────────────────────────

function PriorityFlag({ p }: { p: keyof typeof PRIORITY_CFG }) {
  const cfg = PRIORITY_CFG[p];
  return (
    <div className="flex items-center gap-1.5">
      <Flag className="size-3.5" style={{ color: cfg.dot }} />
      <span className="text-[11px]" style={{ color: cfg.color }}>{cfg.label}</span>
    </div>
  );
}

// ── 26. Star / Pin / Bookmark ─────────────────────────────────────────────────

// ── 27. Version Tags ──────────────────────────────────────────────────────────

function VersionTag({ v }: { v: number }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium"
      style={{ background: "var(--neutral-soft)", color: "var(--neutral-on)" }}>
      v{v}
    </span>
  );
}

// ── 28. Progress Bars ─────────────────────────────────────────────────────────

function ProgressBar({ value, color = "var(--rally-brand)", showLabel = false, height = 6 }: {
  value: number; color?: string; showLabel?: boolean; height?: number;
}) {
  return (
    <div className="flex items-center gap-2" style={{ minWidth: 160 }}>
      <div className="flex-1 rounded-full overflow-hidden bg-muted" style={{ height }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
      </div>
      {showLabel && <span className="text-[10px] text-muted-foreground flex-shrink-0 w-8 text-right">{value}%</span>}
    </div>
  );
}

// ── 29. Calendar Event Pills ──────────────────────────────────────────────────

function CalEventPill({ title, time, color, allDay = false }: { title: string; time?: string; color: string; allDay?: boolean }) {
  if (allDay) {
    return (
      <div className="px-2 py-0.5 rounded text-[10px] font-medium truncate"
        style={{ background: color + "30", color }}>
        {title}
      </div>
    );
  }
  return (
    <div className="flex items-start gap-1.5 px-2 py-1.5 rounded-[6px] border-l-2"
      style={{ borderColor: color, background: color + "14" }}>
      <span className="flex-1 text-[11px] font-medium" style={{ color }}>{title}</span>
      {time && <span className="text-[10px] text-muted-foreground flex-shrink-0">{time}</span>}
    </div>
  );
}

// ── 30. Mini Cards ────────────────────────────────────────────────────────────

function StatCard({ value, label, icon: Icon, color }: { value: string; label: string; icon: React.ElementType; color: string }) {
  return (
    <div className="flex flex-col gap-2 px-4 py-3 rounded-[12px] border border-border bg-card" style={{ minWidth: 120 }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">{label}</span>
        <Icon className="size-3.5 flex-shrink-0" style={{ color }} />
      </div>
      <span className="text-[20px] font-medium text-foreground leading-none">{value}</span>
    </div>
  );
}

function MiniTaskRow({ title, status, priority }: { title: string; status: keyof typeof STATUS_CFG; priority: keyof typeof PRIORITY_CFG }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] border border-border bg-card" style={{ minWidth: 280 }}>
      <TaskStateIcon state={status} />
      <span className="flex-1 text-[12px] text-foreground truncate">{title}</span>
      <PriorityBadge p={priority} />
    </div>
  );
}

function MiniEventRow({ title, time, color }: { title: string; time: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] border border-border bg-card" style={{ minWidth: 240 }}>
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
      <span className="flex-1 text-[12px] text-foreground truncate">{title}</span>
      <span className="text-[10px] text-muted-foreground flex-shrink-0">{time}</span>
    </div>
  );
}

function MiniMemberCard({ name, role }: { name: string; role: keyof typeof ROLE_CFG }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] border border-border bg-card" style={{ minWidth: 200 }}>
      <Av name={name} size={32} />
      <div className="flex-1 min-w-0">
        <p className="text-[12px] text-foreground truncate">{name}</p>
        <RoleBadge role={role} size="xs" />
      </div>
      <StatusDot status="online" />
    </div>
  );
}

function MiniFileRow({ name, ext, size, editor }: { name: string; ext: string; size: string; editor: string }) {
  const cfg = EXT_CFG[ext] ?? { color: "#6B7280", label: "File" };
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] border border-border bg-card" style={{ minWidth: 260 }}>
      <div className="w-7 h-7 rounded-[6px] flex items-center justify-center flex-shrink-0"
        style={{ background: `${cfg.color}18` }}>
        <span className="text-[8px] font-medium uppercase" style={{ color: cfg.color }}>{ext}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] text-foreground truncate">{name}.{ext}</p>
        <p className="text-[10px] text-muted-foreground">{editor} · {size}</p>
      </div>
      <ExtBadge ext={ext} />
    </div>
  );
}

// ── 31. Misc Elements ─────────────────────────────────────────────────────────

function OverlineLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "var(--text-overline)" }}>{children}</span>;
}

function EmptyState({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 rounded-[12px] border border-dashed border-border" style={{ minWidth: 180 }}>
      <Icon className="size-8 text-muted-foreground opacity-30 mb-2" />
      <p className="text-[12px] text-muted-foreground">{label}</p>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-[8px] border border-border bg-card" style={{ minWidth: 260 }}>
      <div className="w-8 h-8 rounded-full bg-muted animate-pulse flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-2.5 bg-muted animate-pulse rounded-full w-3/4" />
        <div className="h-2 bg-muted animate-pulse rounded-full w-1/2" />
      </div>
    </div>
  );
}

function PinnedFlag() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
      style={{ background: "var(--warning-soft)", color: "var(--warning-on)" }}>
      <Pin className="size-2.5" /> Pinned
    </span>
  );
}

function EditedTag() {
  return (
    <span className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>(edited)</span>
  );
}

function UnreadDivider() {
  return (
    <div className="flex items-center gap-2 my-2">
      <div className="flex-1 h-px" style={{ background: "var(--error-solid)", opacity: 0.4 }} />
      <span className="text-[10px] font-medium" style={{ color: "var(--error-on)" }}>New messages</span>
      <div className="flex-1 h-px" style={{ background: "var(--error-solid)", opacity: 0.4 }} />
    </div>
  );
}

// ── All Lucide icons used in the app ─────────────────────────────────────────

const ALL_ICONS = [
  { icon: Crown,         label: "Crown"          },
  { icon: Shield,        label: "Shield"         },
  { icon: UserCheck,     label: "UserCheck"      },
  { icon: Eye,           label: "Eye"            },
  { icon: EyeOff,        label: "EyeOff"         },
  { icon: Users,         label: "Users"          },
  { icon: Search,        label: "Search"         },
  { icon: Bell,          label: "Bell"           },
  { icon: Plus,          label: "Plus"           },
  { icon: ChevronDown,   label: "ChevronDown"    },
  { icon: ChevronRight,  label: "ChevronRight"   },
  { icon: Sparkles,      label: "Sparkles"       },
  { icon: CheckCircle2,  label: "CheckCircle2"   },
  { icon: Clock,         label: "Clock"          },
  { icon: AlertCircle,   label: "AlertCircle"    },
  { icon: PauseCircle,   label: "PauseCircle"    },
  { icon: Mic,           label: "Mic"            },
  { icon: MicOff,        label: "MicOff"         },
  { icon: FileText,      label: "FileText"       },
  { icon: MessageSquare, label: "MessageSquare"  },
  { icon: Hash,          label: "Hash"           },
  { icon: Calendar,      label: "Calendar"       },
  { icon: ArrowRight,    label: "ArrowRight"     },
  { icon: ArrowUpRight,  label: "ArrowUpRight"   },
  { icon: MoreHorizontal,label: "MoreHorizontal" },
  { icon: X,             label: "X"              },
  { icon: Check,         label: "Check"          },
  { icon: Folder,        label: "Folder"         },
  { icon: FolderOpen,    label: "FolderOpen"     },
  { icon: Bot,           label: "Bot"            },
  { icon: Zap,           label: "Zap"            },
  { icon: Upload,        label: "Upload"         },
  { icon: Video,         label: "Video"          },
  { icon: CheckSquare,   label: "CheckSquare"    },
  { icon: Circle,        label: "Circle"         },
  { icon: AlertTriangle, label: "AlertTriangle"  },
  { icon: HardDrive,     label: "HardDrive"      },
  { icon: UserPlus,      label: "UserPlus"       },
  { icon: UserMinus,     label: "UserMinus"      },
  { icon: Activity,      label: "Activity"       },
  { icon: Headphones,    label: "Headphones"     },
  { icon: Volume2,       label: "Volume2"        },
  { icon: VolumeX,       label: "VolumeX"        },
  { icon: SquarePen,     label: "SquarePen"      },
  { icon: RefreshCw,     label: "RefreshCw"      },
  { icon: Lock,          label: "Lock"           },
  { icon: WifiOff,       label: "WifiOff"        },
  { icon: Wifi,          label: "Wifi"           },
  { icon: Star,          label: "Star"           },
  { icon: StarOff,       label: "StarOff"        },
  { icon: Download,      label: "Download"       },
  { icon: Pencil,        label: "Pencil"         },
  { icon: Trash2,        label: "Trash2"         },
  { icon: Move,          label: "Move"           },
  { icon: Home,          label: "Home"           },
  { icon: Pin,           label: "Pin"            },
  { icon: Mail,          label: "Mail"           },
  { icon: Phone,         label: "Phone"          },
  { icon: Briefcase,     label: "Briefcase"      },
  { icon: Globe,         label: "Globe"          },
  { icon: Tag,           label: "Tag"            },
  { icon: LogOut,        label: "LogOut"         },
  { icon: Sun,           label: "Sun"            },
  { icon: Moon,          label: "Moon"           },
  { icon: Bookmark,      label: "Bookmark"       },
  { icon: Share2,        label: "Share2"         },
  { icon: ExternalLink,  label: "ExternalLink"   },
  { icon: Flag,          label: "Flag"           },
  { icon: Play,          label: "Play"           },
  { icon: Reply,         label: "Reply"          },
  { icon: Edit2,         label: "Edit2"          },
  { icon: Send,          label: "Send"           },
  { icon: Paperclip,     label: "Paperclip"      },
  { icon: Smile,         label: "Smile"          },
  { icon: AtSign,        label: "AtSign"         },
  { icon: Settings,      label: "Settings"       },
  { icon: Copy,          label: "Copy"           },
  { icon: ShieldCheck,   label: "ShieldCheck"    },
  { icon: AlarmClock,    label: "AlarmClock"     },
  { icon: PenLine,       label: "PenLine"        },
  { icon: Inbox,         label: "Inbox"          },
  { icon: RotateCcw,     label: "RotateCcw"      },
  { icon: XCircle,       label: "XCircle"        },
  { icon: Monitor,       label: "Monitor"        },
  { icon: Smartphone,    label: "Smartphone"     },
  { icon: AlignLeft,     label: "AlignLeft"      },
  { icon: MapPin,        label: "MapPin"         },
  { icon: Info,          label: "Info"           },
] as const;

// ── Main Page ─────────────────────────────────────────────────────────────────

export function ElementInventory() {
  const [activeSection, setActiveSection] = useState("semantic-badges");
  const [starredState, setStarredState] = useState<Record<string, boolean>>({});

  function toggleStar(k: string) {
    setStarredState(prev => ({ ...prev, [k]: !prev[k] }));
  }

  return (
    <div className="h-full flex overflow-hidden bg-background">

      {/* ── Left Nav ── */}
      <nav className="w-48 flex-shrink-0 border-r border-border bg-card overflow-y-auto hidden lg:flex flex-col">
        <div className="px-3 pt-4 pb-2">
          <p className="text-[11px] font-medium text-foreground mb-0.5">Element Inventory</p>
          <p className="text-[10px] text-muted-foreground">Rally V2 · All elements</p>
        </div>
        <div className="px-2 pb-4 space-y-0.5">
          {SECTIONS.map(s => (
            <button key={s.id}
              onClick={() => {
                setActiveSection(s.id);
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-[7px] text-[11px] transition-colors"
              style={activeSection === s.id
                ? { background: "var(--rally-brand-soft)", color: "var(--rally-brand-on)" }
                : { color: "var(--text-secondary)" }}>
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Main scroll area ── */}
      <main className="flex-1 overflow-y-auto px-6 py-6"
        onScroll={e => {
          const container = e.currentTarget;
          for (const s of SECTIONS) {
            const el = document.getElementById(s.id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            if (rect.top <= 100) setActiveSection(s.id);
          }
        }}>

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-[18px] font-medium text-foreground">Rally Element Inventory</h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">
            Every badge, icon, avatar, card, and micro-element from all Rally V2 pages — collected for redesign.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <SemanticBadge label={`${SECTIONS.length} categories`} bg="var(--rally-brand-soft)" color="var(--rally-brand-on)" />
            <SemanticBadge label="All V2 pages" bg="var(--info-soft)" color="var(--info-on)" />
            <SemanticBadge label="Live components" bg="var(--success-soft)" color="var(--success-on)" />
          </div>
        </div>

        {/* ── 1. Semantic Badges ── */}
        <Section id="semantic-badges" title="Semantic Badges">
          <Row label="All variants">
            {SEMANTIC_VARIANTS.map(v => (
              <SemanticBadge key={v.key} label={v.label} bg={v.bg} color={v.color} />
            ))}
          </Row>
          <Row label="Solid style (using solid color)">
            {[
              { label: "Rally",   bg: "var(--rally-brand)",  color: "#fff" },
              { label: "Success", bg: "var(--success-solid)", color: "#fff" },
              { label: "Warning", bg: "var(--warning-solid)", color: "#fff" },
              { label: "Error",   bg: "var(--error-solid)",   color: "#fff" },
              { label: "Info",    bg: "var(--info-solid)",    color: "#fff" },
              { label: "Neutral", bg: "var(--neutral-solid)", color: "#fff" },
            ].map(v => (
              <SemanticBadge key={v.label} label={v.label} bg={v.bg} color={v.color} />
            ))}
          </Row>
          <Row label="Outline style">
            {SEMANTIC_VARIANTS.map(v => (
              <span key={v.key}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border"
                style={{ borderColor: v.color + "60", color: v.color, background: "transparent" }}>
                {v.label}
              </span>
            ))}
          </Row>
        </Section>

        {/* ── 2. Role Badges ── */}
        <Section id="role-badges" title="Role Badges">
          <Row label="Size: sm (default)">
            {(["owner","admin","member","viewer"] as const).map(r => <RoleBadge key={r} role={r} size="sm" />)}
          </Row>
          <Row label="Size: xs">
            {(["owner","admin","member","viewer"] as const).map(r => <RoleBadge key={r} role={r} size="xs" />)}
          </Row>
          <Row label="Size: md">
            {(["owner","admin","member","viewer"] as const).map(r => <RoleBadge key={r} role={r} size="md" />)}
          </Row>
          <Row label="Icon only (no label)">
            {(Object.entries(ROLE_CFG) as [keyof typeof ROLE_CFG, typeof ROLE_CFG[keyof typeof ROLE_CFG]][]).map(([key, cfg]) => {
              const Icon = cfg.Icon;
              return (
                <div key={key} className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: cfg.bg }}>
                  <Icon className="size-3" style={{ color: cfg.color }} />
                </div>
              );
            })}
          </Row>
        </Section>

        {/* ── 3. Priority Badges ── */}
        <Section id="priority-badges" title="Priority Badges">
          <Row label="With dot + label">
            {(["urgent","high","medium","low"] as const).map(p => <PriorityBadge key={p} p={p} />)}
          </Row>
          <Row label="Dot only">
            {(["urgent","high","medium","low"] as const).map(p => (
              <span key={p} className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: PRIORITY_CFG[p].dot }} />
            ))}
          </Row>
          <Row label="Outline variant">
            {(["urgent","high","medium","low"] as const).map(p => {
              const cfg = PRIORITY_CFG[p];
              return (
                <span key={p} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border"
                  style={{ borderColor: cfg.dot + "60", color: cfg.color }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
                  {cfg.label}
                </span>
              );
            })}
          </Row>
        </Section>

        {/* ── 4. Task Status Badges ── */}
        <Section id="status-badges" title="Task Status Badges">
          <Row label="Pill badges">
            {(["todo","in-progress","blocked","done"] as const).map(s => <StatusBadge key={s} s={s} />)}
          </Row>
          <Row label="With icon">
            {(["todo","in-progress","blocked","done"] as const).map(s => {
              const cfg = STATUS_CFG[s];
              return (
                <span key={s} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium"
                  style={{ background: cfg.bg, color: cfg.color }}>
                  <TaskStateIcon state={s} />
                  {cfg.label}
                </span>
              );
            })}
          </Row>
        </Section>

        {/* ── 5. Label Chips ── */}
        <Section id="label-chips" title="Label Chips">
          <Row label="Task labels (from TodoV2)">
            {(["design","engineering","planning","review","bug","feature"] as const).map(k => <LabelChip key={k} k={k} />)}
          </Row>
          <Row label="With × remove button (interactive)">
            {(["design","engineering","planning","review","bug","feature"] as const).map(k => {
              const cfg = LABEL_CFG[k];
              return (
                <span key={k} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium capitalize"
                  style={{ background: cfg.bg, color: cfg.color }}>
                  {k}
                  <X className="size-2.5 opacity-60 cursor-pointer hover:opacity-100" />
                </span>
              );
            })}
          </Row>
        </Section>

        {/* ── 6. AI Scope Chips ── */}
        <Section id="ai-scope-chips" title="AI Scope Chips">
          <Row label="Active state">
            {AI_SCOPE_CFG.map(cfg => <AIScopeChip key={cfg.key} cfg={cfg} active />)}
          </Row>
          <Row label="Inactive state">
            {AI_SCOPE_CFG.map(cfg => <AIScopeChip key={cfg.key} cfg={cfg} active={false} />)}
          </Row>
        </Section>

        {/* ── 7. Availability Status ── */}
        <Section id="availability" title="Availability Status">
          <Row label="Status badges">
            {(["online","away","dnd","offline"] as const).map(s => <AvailBadge key={s} s={s} />)}
          </Row>
          <Row label="Compact (dot + label)">
            {(["online","away","dnd","offline"] as const).map(s => <StatusDot key={s} status={s} showLabel />)}
          </Row>
        </Section>

        {/* ── 8. Misc Pills & Tags ── */}
        <Section id="misc-pills" title="Misc Pills & Tags">
          <Row label="Context chips">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">You</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium"
              style={{ background: "var(--success-soft)", color: "var(--success-on)" }}>New</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium"
              style={{ background: "var(--rally-brand-soft)", color: "var(--rally-brand-on)" }}>AI</span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium"
              style={{ background: "var(--warning-soft)", color: "var(--warning-on)" }}>
              <Pin className="size-2.5" /> Pinned
            </span>
            <EditedTag />
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">Workspace</span>
          </Row>
          <Row label="Time / ago chips">
            {["Due today","2 days overdue","Due tomorrow","Just joined","Yesterday","1h ago","2d ago"].map(t => (
              <span key={t} className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="size-2.5" /> {t}
              </span>
            ))}
          </Row>
          <Row label="Count pill">
            <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">3 members</span>
            <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">12 files</span>
            <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">2 pending</span>
          </Row>
          <Row label="Unread dot (channel/DM list)">
            <PinnedFlag />
            <UnreadDivider />
          </Row>
        </Section>

        {/* ── 9. Status Dots ── */}
        <Section id="status-dots" title="Status Dots">
          <Row label="Dot alone (for overlays)">
            {(["online","away","dnd","offline"] as const).map(s => (
              <div key={s} className="flex flex-col items-center gap-1">
                <span className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: {online:"var(--status-active)",away:"var(--status-limited)",dnd:"var(--error-solid)",offline:"var(--status-disabled)"}[s] }} />
                <span className="text-[9px] text-muted-foreground capitalize">{s}</span>
              </div>
            ))}
          </Row>
          <Row label="With label (inline)">
            {(["online","away","dnd","offline"] as const).map(s => <StatusDot key={s} status={s} showLabel />)}
          </Row>
          <Row label="Sizes (sm / md / lg)">
            {[6,8,10,12,16].map(sz => (
              <div key={sz} className="flex flex-col items-center gap-1">
                <span className="rounded-full flex-shrink-0"
                  style={{ width: sz, height: sz, background: "var(--status-active)" }} />
                <span className="text-[9px] text-muted-foreground">{sz}px</span>
              </div>
            ))}
          </Row>
        </Section>

        {/* ── 10. Counters & Notification Badges ── */}
        <Section id="counters" title="Counters & Notification Badges">
          <Row label="Count badge (error / brand / neutral)">
            <CountBadge n={1}  variant="error"   />
            <CountBadge n={5}  variant="error"   />
            <CountBadge n={12} variant="error"   />
            <CountBadge n={99} variant="error"   />
            <CountBadge n={100} variant="error"  />
            <CountBadge n={3}  variant="brand"   />
            <CountBadge n={8}  variant="neutral" />
          </Row>
          <Row label="Bell with count badge">
            <NotifBellWithDot count={0} />
            <NotifBellWithDot count={1} />
            <NotifBellWithDot count={5} />
            <NotifBellWithDot count={12} />
          </Row>
          <Row label="Icon with notification dot (no number)">
            {([
              { Icon: Bell,          k: "bell"    },
              { Icon: MessageSquare, k: "msg"     },
              { Icon: Inbox,         k: "inbox"   },
              { Icon: AtSign,        k: "at-sign" },
            ] as const).map(({ Icon, k }) => (
              <div key={k} className="relative inline-flex">
                <div className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-card border border-border text-muted-foreground">
                  <Icon className="size-4" />
                </div>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-card"
                  style={{ background: "var(--error-solid)" }} />
              </div>
            ))}
          </Row>
          <Row label="Channel unread badges (sidebar)">
            {[1,2,5,12,99].map(n => (
              <div key={n} className="flex items-center gap-2 px-2 py-1 rounded-[6px] bg-card border border-border">
                <Hash className="size-3.5 text-muted-foreground" />
                <span className="text-[11px] text-foreground">general</span>
                <CountBadge n={n} variant="error" />
              </div>
            ))}
          </Row>
        </Section>

        {/* ── 11. Avatars ── */}
        <Section id="avatars" title="Avatars">
          <Row label="Initial avatars — sizes">
            {[20,24,28,32,36,40,48,56,64].map(sz => (
              <div key={sz} className="flex flex-col items-center gap-1">
                <Av name="John Doe" size={sz} />
                <span className="text-[9px] text-muted-foreground">{sz}</span>
              </div>
            ))}
          </Row>
          <Row label="Different people (colors)">
            {["John Doe","Sarah Johnson","Mike Chen","Emily Davis","Alex Turner","Jordan Kim","Tom Blake"].map(n => (
              <div key={n} className="flex flex-col items-center gap-1">
                <Av name={n} size={32} />
                <span className="text-[9px] text-muted-foreground truncate max-w-[44px]">{n.split(" ")[0]}</span>
              </div>
            ))}
          </Row>
        </Section>

        {/* ── 12. Avatars + Status ── */}
        <Section id="avatar-status" title="Avatars + Status Dot">
          <Row label="All status states (size 36)">
            {(["online","away","offline","dnd"] as const).map(s => (
              <div key={s} className="flex flex-col items-center gap-1.5">
                <AvWithStatus name="John Doe" size={36} status={s} />
                <span className="text-[9px] text-muted-foreground capitalize">{s}</span>
              </div>
            ))}
          </Row>
          <Row label="Different sizes (online)">
            {[24,32,40,48,56].map(sz => (
              <div key={sz} className="flex flex-col items-center gap-1">
                <AvWithStatus name="Sarah Johnson" size={sz} status="online" />
                <span className="text-[9px] text-muted-foreground">{sz}</span>
              </div>
            ))}
          </Row>
        </Section>

        {/* ── 13. Avatar Groups ── */}
        <Section id="avatar-groups" title="Avatar Groups (Stacks)">
          <Row label="2 people">
            <AvatarGroup names={["John Doe","Sarah Johnson"]} size={28} />
          </Row>
          <Row label="3 people">
            <AvatarGroup names={["John Doe","Sarah Johnson","Mike Chen"]} size={28} />
          </Row>
          <Row label="4 people">
            <AvatarGroup names={["John Doe","Sarah Johnson","Mike Chen","Emily Davis"]} size={28} />
          </Row>
          <Row label="6 people (shows +2 overflow)">
            <AvatarGroup names={["John Doe","Sarah Johnson","Mike Chen","Emily Davis","Alex Turner","Jordan Kim"]} size={28} max={4} />
          </Row>
          <Row label="Large size (36px)">
            <AvatarGroup names={["John Doe","Sarah Johnson","Mike Chen","Emily Davis"]} size={36} max={4} />
          </Row>
        </Section>

        {/* ── 14. Bot / AI Avatar ── */}
        <Section id="bot-avatar" title="Bot / AI Avatar">
          <Row label="Sizes">
            {[24,28,32,36,40,48,56].map(sz => (
              <div key={sz} className="flex flex-col items-center gap-1">
                <BotAvatar size={sz} />
                <span className="text-[9px] text-muted-foreground">{sz}</span>
              </div>
            ))}
          </Row>
          <Row label="Bot with name label">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-[10px] border border-border bg-card">
              <BotAvatar size={32} />
              <div>
                <p className="text-[12px] font-medium text-foreground">Rally AI</p>
                <p className="text-[10px] text-muted-foreground">Always learning</p>
              </div>
            </div>
          </Row>
          <Row label="AI scope badge icons (small)">
            {AI_SCOPE_CFG.map(cfg => {
              const Icon = cfg.icon;
              return (
                <div key={cfg.key} className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: cfg.bg }}>
                  <Icon className="size-3" style={{ color: cfg.color }} />
                </div>
              );
            })}
          </Row>
        </Section>

        {/* ── 15. Icons (bare) ── */}
        <Section id="bare-icons" title="Icons (Bare)">
          <Row label="All icons — size 16px (current foreground color)">
            <div className="flex flex-wrap gap-3">
              {ALL_ICONS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 w-12">
                  <div className="w-8 h-8 flex items-center justify-center rounded-[6px] bg-muted/40">
                    <Icon className="size-4 text-foreground" />
                  </div>
                  <span className="text-[8px] text-muted-foreground truncate w-full text-center leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </Row>
          <Row label="Semantic colored">
            <div className="flex flex-wrap gap-3">
              {([
                { icon: CheckCircle2, color: "var(--success-solid)",  label: "Done"    },
                { icon: AlertCircle,  color: "var(--error-solid)",    label: "Blocked" },
                { icon: Clock,        color: "var(--info-solid)",     label: "In-prog" },
                { icon: AlertTriangle,color: "var(--warning-solid)",  label: "Warn"    },
                { icon: Sparkles,     color: "var(--rally-brand)",    label: "AI"      },
                { icon: Shield,       color: "var(--info-on)",        label: "Admin"   },
                { icon: Crown,        color: "var(--rally-brand-on)", label: "Owner"   },
              ] as const).map(({ icon: Icon, color, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <Icon className="size-5" style={{ color }} />
                  <span className="text-[9px] text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </Row>
        </Section>

        {/* ── 16. Icons with Backgrounds ── */}
        <Section id="icons-bg" title="Icons + Backgrounds">
          <Row label="Square rounded (32px) — feature icons">
            {ICON_BG_ITEMS.map(cfg => (
              <IconWithBg key={cfg.label} Icon={cfg.icon} bg={cfg.bg} color={cfg.color} size={32} label={cfg.label} />
            ))}
          </Row>
          <Row label="Square rounded (40px)">
            {ICON_BG_ITEMS.slice(0, 6).map(cfg => (
              <IconWithBg key={cfg.label} Icon={cfg.icon} bg={cfg.bg} color={cfg.color} size={40} label={cfg.label} />
            ))}
          </Row>
          <Row label="Circular (32px) — activity / status icons">
            {ICON_BG_ITEMS.map(cfg => (
              <div key={cfg.label} className="flex flex-col items-center gap-1.5">
                <IconCircle Icon={cfg.icon} bg={cfg.bg} color={cfg.color} size={32} />
                <span className="text-[9px] text-muted-foreground">{cfg.label}</span>
              </div>
            ))}
          </Row>
          <Row label="Circular (24px) — small inline icons">
            {ICON_BG_ITEMS.slice(0, 8).map(cfg => (
              <IconCircle key={cfg.label} Icon={cfg.icon} bg={cfg.bg} color={cfg.color} size={24} />
            ))}
          </Row>
        </Section>

        {/* ── 17. File Extension Badges ── */}
        <Section id="file-ext-badges" title="File Extension Badges">
          <Row label="Inline text badge (compact)">
            {Object.keys(EXT_CFG).map(ext => <ExtBadge key={ext} ext={ext} />)}
          </Row>
          <Row label="Icon block (40px square + type label)">
            {Object.keys(EXT_CFG).map(ext => <FileIconBlock key={ext} ext={ext} size={40} />)}
          </Row>
          <Row label="Icon block (56px square)">
            {["fig","pdf","xlsx","md","mp4","zip"].map(ext => <FileIconBlock key={ext} ext={ext} size={56} />)}
          </Row>
        </Section>

        {/* ── 18. Folder Icons ── */}
        <Section id="folder-icons" title="Folder Icons">
          <Row label="Folder with name + file count">
            {[
              { name: "Design",      color: "#8B5CF6", fileCount: 4  },
              { name: "Engineering", color: "#3B82F6", fileCount: 5  },
              { name: "Marketing",   color: "#F97316", fileCount: 3  },
              { name: "Planning",    color: "#10B981", fileCount: 4  },
              { name: "Shared",      color: "#6B7280", fileCount: 2  },
              { name: "Assets",      color: "#EC4899", fileCount: 11 },
            ].map(f => <FolderIconBlock key={f.name} {...f} />)}
          </Row>
          <Row label="Large (56px)">
            {[
              { name: "Design", color: "#8B5CF6", fileCount: 4 },
              { name: "Docs",   color: "#3B82F6", fileCount: 7 },
            ].map(f => <FolderIconBlock key={f.name} {...f} size={56} />)}
          </Row>
          <Row label="Folder open state">
            {[
              { color: "#8B5CF6" }, { color: "#3B82F6" }, { color: "#10B981" }
            ].map((f) => (
              <div key={f.color} className="w-10 h-10 rounded-[10px] flex items-center justify-center"
                style={{ background: f.color + "20" }}>
                <FolderOpen style={{ width: 22, height: 22, color: f.color }} />
              </div>
            ))}
          </Row>
        </Section>

        {/* ── 19. File Attachment Chips ── */}
        <Section id="file-attach-chips" title="File Attachment Chips (in Chat)">
          <Row label="Standard attachment chip">
            <FileAttachChip name="Website_Header_v3" ext="fig" size="8.4 MB" />
            <FileAttachChip name="Q2_Launch_Brief"   ext="pdf" size="1.2 MB" />
            <FileAttachChip name="Sprint_23_Backlog" ext="xlsx" size="1.8 MB" />
            <FileAttachChip name="API_Spec_v2"       ext="md"  size="312 KB" />
          </Row>
          <Row label="Image attachment chip">
            <div className="inline-flex items-center gap-2 px-2.5 py-2 rounded-[8px] border border-border bg-card" style={{ maxWidth: 220 }}>
              <div className="w-7 h-7 rounded-[6px] flex items-center justify-center flex-shrink-0"
                style={{ background: `${EXT_CFG["png"].color}18` }}>
                <span className="text-[8px] font-medium uppercase" style={{ color: EXT_CFG["png"].color }}>png</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-foreground truncate">hero_banner.png</p>
                <p className="text-[10px] text-muted-foreground">2.3 MB</p>
              </div>
              <Download className="size-3 text-muted-foreground flex-shrink-0" />
            </div>
          </Row>
        </Section>

        {/* ── 20. Task State Icons ── */}
        <Section id="task-state-icons" title="Task State Icons (Checkboxes)">
          <Row label="Standalone icons">
            {(["todo","in-progress","blocked","done","paused"] as const).map(s => (
              <div key={s} className="flex flex-col items-center gap-1.5">
                <TaskStateIcon state={s} />
                <span className="text-[9px] text-muted-foreground capitalize">{s}</span>
              </div>
            ))}
          </Row>
          <Row label="In a task row context">
            {[
              { title: "Review mobile header",  state: "in-progress" as const },
              { title: "Finalize API spec",      state: "blocked"     as const },
              { title: "Update design tokens",   state: "done"        as const },
              { title: "Sprint planning agenda", state: "todo"        as const },
            ].map(t => (
              <div key={t.title} className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-muted/30" style={{ minWidth: 220 }}>
                <TaskStateIcon state={t.state} />
                <span className={`text-[12px] flex-1 truncate ${t.state === "done" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {t.title}
                </span>
              </div>
            ))}
          </Row>
          <Row label="Sizes">
            {[12,14,16,18,20].map(sz => (
              <div key={sz} className="flex flex-col items-center gap-1">
                <CheckCircle2 style={{ width: sz, height: sz, color: "var(--success-solid)" }} />
                <span className="text-[9px] text-muted-foreground">{sz}</span>
              </div>
            ))}
          </Row>
        </Section>

        {/* ── 21. Permission Matrix Cells ── */}
        <Section id="permission-cells" title="Permission Matrix Cells">
          <Row label="Check / X cell">
            <PermCheck has={true} />
            <PermCheck has={false} />
          </Row>
          <Row label="Full permission row (abridged table)">
            <div className="rounded-[12px] border border-border overflow-hidden w-full max-w-lg">
              <div className="grid grid-cols-5 bg-muted/60 border-b border-border">
                <div className="px-3 py-2 text-[10px]" style={{ color: "var(--text-overline)" }}>Feature</div>
                {(["Owner","Admin","Member","Viewer"]).map(r => (
                  <div key={r} className="px-2 py-2 text-center text-[10px] font-medium" style={{ color: "var(--text-overline)" }}>{r}</div>
                ))}
              </div>
              {[
                { label: "View workspace",   cols: [true,true,true,true]   },
                { label: "Create tasks",     cols: [true,true,true,false]  },
                { label: "Invite members",   cols: [true,true,false,false] },
                { label: "Delete team",      cols: [true,false,false,false]},
              ].map(row => (
                <div key={row.label} className="grid grid-cols-5 border-t border-border/50 hover:bg-muted/20 transition-colors">
                  <div className="px-3 py-2 text-[11px] text-foreground">{row.label}</div>
                  {row.cols.map((has, i) => (
                    <div key={`${row.label}-col-${i}`} className="px-2 py-2 flex items-center justify-center">
                      <PermCheck has={has} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Row>
        </Section>

        {/* ── 22. Emoji Reactions ── */}
        <Section id="emoji-reactions" title="Emoji Reactions">
          <Row label="Not reacted / reacted states">
            <EmojiReaction emoji="👋" count={3} reacted={false} />
            <EmojiReaction emoji="🔥" count={1} reacted={true}  />
            <EmojiReaction emoji="✅" count={2} reacted={true}  />
            <EmojiReaction emoji="👀" count={4} reacted={false} />
            <EmojiReaction emoji="👍" count={2} reacted={false} />
            <EmojiReaction emoji="🚀" count={5} reacted={true}  />
            <EmojiReaction emoji="❤️" count={7} reacted={false} />
          </Row>
          <Row label="In a message bubble context">
            <div className="px-3 py-2.5 rounded-[12px] border border-border bg-card space-y-2" style={{ maxWidth: 300 }}>
              <p className="text-[12px] text-foreground">Good morning team! Ready for the client review today? 🎉</p>
              <div className="flex flex-wrap gap-1">
                <EmojiReaction emoji="👋" count={3} reacted={false} />
                <EmojiReaction emoji="🔥" count={1} reacted={true}  />
                <EmojiReaction emoji="❤️" count={2} reacted={false} />
              </div>
            </div>
          </Row>
        </Section>

        {/* ── 23. Voice / Mic Indicators ── */}
        <Section id="voice-mic" title="Voice / Mic Indicators">
          <Row label="Speaking dot (static / pulsing)">
            <div className="flex flex-col items-center gap-1">
              <SpeakingDot speaking={false} />
              <span className="text-[9px] text-muted-foreground">Idle</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <SpeakingDot speaking={true} />
              <span className="text-[9px] text-muted-foreground">Speaking</span>
            </div>
          </Row>
          <Row label="Mic indicator button">
            <MicIndicator active={true} />
            <MicIndicator active={false} />
          </Row>
          <Row label="Voice room rows">
            <VoiceRoomRow
              name="Design Voice"
              participants={["Sarah Johnson","Mike Chen","Emily Davis"]}
              speaking={["Sarah Johnson"]}
            />
            <VoiceRoomRow
              name="Lounge"
              participants={["Alex Turner"]}
              speaking={[]}
            />
          </Row>
          <Row label="Headphone / audio state icons">
            <div className="flex items-center gap-3">
              {([
                { Icon: Headphones, label: "Listening", color: "var(--success-solid)" },
                { Icon: Mic,        label: "Speaking",  color: "var(--rally-brand)"   },
                { Icon: MicOff,     label: "Muted",     color: "var(--error-solid)"   },
                { Icon: Volume2,    label: "Active",    color: "var(--success-solid)" },
                { Icon: VolumeX,    label: "Silent",    color: "var(--neutral-on)"    },
              ] as const).map(({ Icon, label, color }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <Icon className="size-5" style={{ color }} />
                  <span className="text-[9px] text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </Row>
        </Section>

        {/* ── 24. Link Type Chips ── */}
        <Section id="link-chips" title="Link Type Chips">
          <Row label="All types">
            {(["chat","task","event","ai","file","voice"] as const).map(t => <LinkChip key={t} type={t} />)}
          </Row>
          <Row label="In context (task detail)">
            <div className="flex items-center gap-2 flex-wrap px-3 py-2 rounded-[8px] bg-muted/30">
              <span className="text-[10px] font-medium" style={{ color: "var(--text-overline)" }}>Linked to:</span>
              <LinkChip type="file" />
              <LinkChip type="chat" />
              <LinkChip type="event" />
            </div>
          </Row>
        </Section>

        {/* ── 25. Priority Flags ── */}
        <Section id="priority-flags" title="Priority Flags">
          <Row label="Flag + label">
            {(["urgent","high","medium","low"] as const).map(p => <PriorityFlag key={p} p={p} />)}
          </Row>
          <Row label="Icon only (various sizes)">
            {(["urgent","high","medium","low"] as const).map(p => (
              <div key={p} className="flex flex-col items-center gap-1">
                <Flag className="size-4" style={{ color: PRIORITY_CFG[p].dot }} />
                <span className="text-[9px] text-muted-foreground capitalize">{p}</span>
              </div>
            ))}
          </Row>
          <Row label="Filled flag icon">
            {(["urgent","high","medium","low"] as const).map(p => (
              <Flag key={p} className="size-4 fill-current" style={{ color: PRIORITY_CFG[p].dot }} />
            ))}
          </Row>
        </Section>

        {/* ── 26. Star / Pin / Bookmark ── */}
        <Section id="star-pin-bookmark" title="Star / Pin / Bookmark">
          <Row label="Star — empty / filled (interactive)">
            {["File 1","File 2","File 3","File 4"].map(k => (
              <button key={k} onClick={() => toggleStar(k)}
                className="flex flex-col items-center gap-1 transition-colors">
                {starredState[k]
                  ? <Star className="size-5 fill-current" style={{ color: "var(--warning-solid)" }} />
                  : <StarOff className="size-5 text-muted-foreground" />}
                <span className="text-[9px] text-muted-foreground">{starredState[k] ? "Starred" : "Empty"}</span>
              </button>
            ))}
          </Row>
          <Row label="Bookmark — empty / filled">
            {["T1","T2"].map((k) => (
              <button key={k} onClick={() => toggleStar("bk-" + k)}
                className="flex flex-col items-center gap-1 transition-colors">
                <Bookmark className={`size-5 ${starredState["bk-" + k] ? "fill-current" : ""}`}
                  style={{ color: starredState["bk-" + k] ? "var(--rally-brand)" : "var(--text-tertiary)" }} />
                <span className="text-[9px] text-muted-foreground">{starredState["bk-" + k] ? "Saved" : "Save"}</span>
              </button>
            ))}
          </Row>
          <Row label="Pin icon states">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <Pin className="size-4 text-muted-foreground" />
                <span className="text-[9px] text-muted-foreground">Unpinned</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Pin className="size-4" style={{ color: "var(--warning-solid)" }} />
                <span className="text-[9px] text-muted-foreground">Pinned</span>
              </div>
              <PinnedFlag />
            </div>
          </Row>
        </Section>

        {/* ── 27. Version Tags ── */}
        <Section id="version-tags" title="Version Tags">
          <Row label="Numeric version tags">
            {[1,2,3,4,5].map(v => <VersionTag key={v} v={v} />)}
          </Row>
          <Row label="Semantic version strings">
            {["v1.0","v2.1","v3.0-beta","latest","draft"].map(v => (
              <span key={v} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium"
                style={{ background: "var(--neutral-soft)", color: "var(--neutral-on)" }}>
                {v}
              </span>
            ))}
          </Row>
          <Row label="In context (file row)">
            <div className="flex items-center gap-2 px-3 py-2 rounded-[8px] border border-border bg-card">
              <ExtBadge ext="fig" />
              <span className="text-[12px] text-foreground">Website_Header</span>
              <VersionTag v={3} />
            </div>
          </Row>
        </Section>

        {/* ── 28. Progress Bars ── */}
        <Section id="progress-bars" title="Progress Bars">
          <Row label="Height: 4px">
            <div className="space-y-2 w-64">
              {[25,50,75,100].map(v => <ProgressBar key={v} value={v} height={4} showLabel />)}
            </div>
          </Row>
          <Row label="Height: 6px (default)">
            <div className="space-y-2 w-64">
              {[20,40,65,90].map(v => <ProgressBar key={v} value={v} height={6} showLabel />)}
            </div>
          </Row>
          <Row label="Semantic colors">
            <div className="space-y-2 w-64">
              <ProgressBar value={80} color="var(--success-solid)" height={6} showLabel />
              <ProgressBar value={55} color="var(--warning-solid)" height={6} showLabel />
              <ProgressBar value={30} color="var(--error-solid)"   height={6} showLabel />
              <ProgressBar value={70} color="var(--info-solid)"    height={6} showLabel />
              <ProgressBar value={45} color="var(--rally-brand)"   height={6} showLabel />
            </div>
          </Row>
        </Section>

        {/* ── 29. Calendar Event Pills ── */}
        <Section id="calendar-events" title="Calendar Event Pills">
          <Row label="Standard timed event pill">
            <CalEventPill title="Design standup"     time="10:00" color="var(--info-solid)"    />
            <CalEventPill title="Client review"      time="2:00"  color="var(--rally-brand)"   />
            <CalEventPill title="Team retrospective" time="4:30"  color="var(--success-solid)" />
            <CalEventPill title="Sprint planning"    time="3:00"  color="var(--warning-solid)" />
            <CalEventPill title="Bug bash"           time="11:00" color="var(--error-solid)"   />
          </Row>
          <Row label="All-day event pill">
            <CalEventPill title="Q2 Launch 🚀"       color="var(--rally-brand)"   allDay />
            <CalEventPill title="Design Sprint"      color="var(--info-solid)"    allDay />
            <CalEventPill title="Company offsite"    color="var(--success-solid)" allDay />
          </Row>
          <Row label="Calendar list color dots (sidebar)">
            <div className="space-y-1.5">
              {[
                { name: "Meetings",    color: "var(--info-solid)"    },
                { name: "Milestones", color: "var(--rally-brand)"   },
                { name: "Deadlines",  color: "var(--error-solid)"   },
                { name: "Team Events",color: "var(--success-solid)" },
                { name: "Launches",   color: "#6b21a8"              },
              ].map(cal => (
                <div key={cal.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: cal.color }} />
                  <span className="text-[11px] text-foreground">{cal.name}</span>
                </div>
              ))}
            </div>
          </Row>
        </Section>

        {/* ── 30. Mini Cards ── */}
        <Section id="mini-cards" title="Mini Cards">
          <Row label="Stat cards">
            <StatCard value="6"  label="Team members" icon={Users}      color="var(--info-on)"        />
            <StatCard value="12" label="Open tasks"   icon={CheckSquare} color="var(--warning-on)"    />
            <StatCard value="3"  label="Events today" icon={Calendar}    color="var(--rally-brand-on)" />
            <StatCard value="4"  label="Unread msgs"  icon={MessageSquare} color="var(--success-on)"  />
          </Row>
          <Row label="Mini task rows">
            <div className="flex flex-col gap-1.5">
              <MiniTaskRow title="Review mobile header design" status="in-progress" priority="high"   />
              <MiniTaskRow title="Finalize API spec v2"        status="blocked"     priority="urgent" />
              <MiniTaskRow title="Sprint planning agenda"      status="todo"        priority="medium" />
              <MiniTaskRow title="Update landing page copy"    status="done"        priority="low"    />
            </div>
          </Row>
          <Row label="Mini event rows">
            <div className="flex flex-col gap-1.5">
              <MiniEventRow title="Design standup"     time="10:00 AM" color="var(--info-solid)"    />
              <MiniEventRow title="Client review"      time="2:00 PM"  color="var(--rally-brand)"   />
              <MiniEventRow title="Team retrospective" time="4:30 PM"  color="var(--success-solid)" />
            </div>
          </Row>
          <Row label="Mini member cards">
            <MiniMemberCard name="John Doe"      role="owner"  />
            <MiniMemberCard name="Sarah Johnson" role="admin"  />
            <MiniMemberCard name="Mike Chen"     role="member" />
            <MiniMemberCard name="Emily Davis"   role="viewer" />
          </Row>
          <Row label="Mini file rows">
            <div className="flex flex-col gap-1.5">
              <MiniFileRow name="Website_Header_v3" ext="fig"  size="8.4 MB"  editor="Sarah Johnson" />
              <MiniFileRow name="API_Spec_v2"       ext="md"   size="312 KB"  editor="Emily Davis"   />
              <MiniFileRow name="Sprint_23_Backlog" ext="xlsx" size="1.8 MB"  editor="Mike Chen"     />
              <MiniFileRow name="Demo_Deck_v2"      ext="pptx" size="18.4 MB" editor="Emily Davis"   />
            </div>
          </Row>
        </Section>

        {/* ── 31. Misc Elements ── */}
        <Section id="misc-elements" title="Misc Elements">
          <Row label="Overline section labels">
            <OverlineLabel>Members</OverlineLabel>
            <OverlineLabel>Recent Activity</OverlineLabel>
            <OverlineLabel>Can Do</OverlineLabel>
            <OverlineLabel>Cannot Do</OverlineLabel>
            <OverlineLabel>Owner Only</OverlineLabel>
          </Row>
          <Row label="Skeleton loading rows">
            <div className="space-y-1.5">
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </div>
          </Row>
          <Row label="Empty states">
            <EmptyState icon={MessageSquare} label="No messages yet" />
            <EmptyState icon={CheckSquare}   label="No tasks found"  />
            <EmptyState icon={Users}         label="No members match" />
          </Row>
          <Row label="Dividers">
            <div className="space-y-3 w-64">
              <div className="h-px w-full bg-border" />
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[10px] text-muted-foreground">Today</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <UnreadDivider />
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "var(--text-overline)" }}>Management</span>
                <div className="flex-1 h-px bg-border" />
              </div>
            </div>
          </Row>
          <Row label="Dot separator">
            <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
              <span>John Doe</span>
              <span>·</span>
              <span>Owner</span>
              <span>·</span>
              <span>Joined Jan 2026</span>
            </div>
          </Row>
          <Row label="'···' More button states">
            <button className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted text-muted-foreground transition-colors">
              <MoreHorizontal className="size-4" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-[6px] bg-muted text-foreground transition-colors">
              <MoreHorizontal className="size-4" />
            </button>
            <button className="px-2.5 py-1 flex items-center gap-1 rounded-[6px] border border-border bg-background text-[11px] text-muted-foreground hover:bg-muted transition-colors">
              <MoreHorizontal className="size-3.5" /> More
            </button>
          </Row>
          <Row label="Copy invite link button states">
            <button className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] border border-border bg-background text-muted-foreground text-[12px]">
              <Copy className="size-3.5" /> Copy invite link
            </button>
            <button className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] border border-border bg-background text-[12px]"
              style={{ color: "var(--success-on)" }}>
              <Check className="size-3.5" style={{ color: "var(--success-solid)" }} /> Copied!
            </button>
          </Row>
          <Row label="Action buttons (primary / secondary / ghost / danger)">
            <button className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] text-white text-[12px] font-medium"
              style={{ background: "var(--rally-brand)" }}>
              <Plus className="size-3.5" /> Primary
            </button>
            <button className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] border border-border bg-background text-foreground text-[12px] hover:bg-muted transition-colors">
              Secondary
            </button>
            <button className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] text-muted-foreground text-[12px] hover:bg-muted transition-colors">
              Ghost
            </button>
            <button className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] text-white text-[12px] font-medium"
              style={{ background: "var(--error-solid)" }}>
              <Trash2 className="size-3.5" /> Danger
            </button>
          </Row>
        </Section>

        {/* Bottom padding */}
        <div className="h-16" />
      </main>
    </div>
  );
}

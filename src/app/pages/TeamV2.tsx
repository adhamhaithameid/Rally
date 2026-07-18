import React, { useState } from "react";
import {
  Users, Crown, Shield, UserCheck, Eye, Plus, Search, Copy, Check,
  ChevronRight, MoreHorizontal, X, Settings, Lock, AlertTriangle,
  UserPlus, Mail, Clock, Home, UserMinus, Bell, Palette, Sparkles,
  Plug, Monitor, Moon, Sun, Volume2, VolumeX,
  ArrowRightLeft,
} from "lucide-react";
import { useAuth, type UserRole } from "../contexts/AuthContext";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type NavSection =
  | "overview" | "members"
  | "workspace" | "permissions" | "danger"
  | "notifications" | "appearance"
  | "ai" | "integrations";

type OnlineStatus = "online" | "away" | "offline";

interface MockMember {
  userId: string; name: string; email: string;
  role: UserRole; joinedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const ROLE_CFG: Record<UserRole, { label: string; color: string; bg: string; Icon: React.ElementType }> = {
  owner:  { label: "Owner",  color: "var(--rally-brand-on)", bg: "var(--rally-brand-soft)", Icon: Crown     },
  admin:  { label: "Admin",  color: "var(--info-on)",        bg: "var(--info-soft)",        Icon: Shield    },
  member: { label: "Member", color: "var(--success-on)",     bg: "var(--success-soft)",     Icon: UserCheck },
  viewer: { label: "Viewer", color: "var(--neutral-on)",     bg: "var(--neutral-soft)",     Icon: Eye       },
};

// "offline" intentionally uses a neutral gray, not error-red (--status-disabled maps to red)
const STATUS_CFG: Record<OnlineStatus, { label: string; dot: string }> = {
  online:  { label: "Online",  dot: "var(--status-active)"  },
  away:    { label: "Away",    dot: "var(--warning-solid)"  },
  offline: { label: "Offline", dot: "var(--neutral-solid)"  },
};

const ROLE_ORDER: UserRole[] = ["owner", "admin", "member", "viewer"];

// ─────────────────────────────────────────────────────────────────────────────
// Mock data
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_MEMBERS: MockMember[] = [
  { userId: "m1", name: "John Doe",      email: "john@rally.app",   role: "owner",  joinedAt: "2025-12-01" },
  { userId: "m2", name: "Sarah Johnson", email: "sarah@rally.app",  role: "admin",  joinedAt: "2026-01-15" },
  { userId: "m3", name: "Mike Chen",     email: "mike@rally.app",   role: "member", joinedAt: "2026-02-01" },
  { userId: "m4", name: "Emily Davis",   email: "emily@rally.app",  role: "member", joinedAt: "2026-04-19" },
  { userId: "m5", name: "Alex Rivera",   email: "alex@rally.app",   role: "viewer", joinedAt: "2026-03-10" },
  { userId: "m6", name: "Jordan Kim",    email: "jordan@rally.app", role: "viewer", joinedAt: "2026-03-25" },
];

const MOCK_STATUSES: Record<string, OnlineStatus> = {
  m1: "online", m2: "online", m3: "away", m4: "offline", m5: "offline", m6: "offline",
};

const RECENT_CHANGES = [
  { id: "r1", text: "Emily Davis joined the workspace",       time: "2h ago",     color: "var(--success-solid)" },
  { id: "r2", text: "Alex Rivera's role changed to Viewer",   time: "Yesterday",  color: "var(--info-solid)"    },
  { id: "r3", text: "Invite sent to david@example.com",       time: "2 days ago", color: "var(--rally-brand)"   },
  { id: "r4", text: "Sarah Johnson promoted to Admin",        time: "3 days ago", color: "var(--info-solid)"    },
  { id: "r5", text: "Team description updated",               time: "1 week ago", color: "var(--text-tertiary)" },
];

const MOCK_INVITES = [
  { id: "inv-1", email: "david@example.com", role: "member" as UserRole, sentAt: "1 day ago",  expiresIn: "6 days" },
  { id: "inv-2", email: "nina@example.com",  role: "member" as UserRole, sentAt: "3 days ago", expiresIn: "4 days" },
];

const ROLE_CAPS: Record<UserRole, { can: string[]; cannot: string[] }> = {
  owner: {
    can:    ["Manage all members & roles", "Edit workspace settings", "Delete workspace", "Manage calendars & channels", "Full create / edit / delete access"],
    cannot: [],
  },
  admin: {
    can:    ["Invite & manage members", "Manage calendars & channels", "Full create & edit access", "View workspace settings"],
    cannot: ["Edit workspace name or description", "Delete workspace", "Promote or demote other admins"],
  },
  member: {
    can:    ["Create tasks, events & messages", "Upload & manage files", "Use AI Chat", "View all team members"],
    cannot: ["Invite or remove members", "Change member roles", "Manage workspace settings"],
  },
  viewer: {
    can:    ["View all workspace content", "View team members & roles"],
    cannot: ["Create or edit tasks, events, messages", "Upload files", "Invite or manage members"],
  },
};

const PERMISSION_GROUPS = [
  { group: "Access", rows: [
    { label: "View workspace",         owner: true,  admin: true,  member: true,  viewer: true  },
    { label: "View team members",      owner: true,  admin: true,  member: true,  viewer: true  },
  ]},
  { group: "Work", rows: [
    { label: "Chat & messaging",       owner: true,  admin: true,  member: true,  viewer: false },
    { label: "AI Chat",                owner: true,  admin: true,  member: true,  viewer: false },
    { label: "Create & edit tasks",    owner: true,  admin: true,  member: true,  viewer: false },
    { label: "Create calendar events", owner: true,  admin: true,  member: true,  viewer: false },
    { label: "Upload & manage files",  owner: true,  admin: true,  member: true,  viewer: false },
  ]},
  { group: "Management", rows: [
    { label: "Invite members",         owner: true,  admin: true,  member: false, viewer: false },
    { label: "Change member roles",    owner: true,  admin: true,  member: false, viewer: false },
    { label: "Remove members",         owner: true,  admin: true,  member: false, viewer: false },
    { label: "Manage calendar lists",  owner: true,  admin: true,  member: false, viewer: false },
    { label: "Manage chat channels",   owner: true,  admin: true,  member: false, viewer: false },
  ]},
  { group: "Owner Only", rows: [
    { label: "Edit workspace settings",owner: true,  admin: false, member: false, viewer: false },
    { label: "Transfer ownership",     owner: true,  admin: false, member: false, viewer: false },
    { label: "Delete workspace",       owner: true,  admin: false, member: false, viewer: false },
  ]},
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function avatarBg(name: string) {
  const c = ["#3B82F6","#10B981","#F59E0B","#8B5CF6","#EC4899","#14B8A6","#F97316"];
  let h = 0; for (const ch of name) h = ch.charCodeAt(0) + ((h << 5) - h);
  return c[Math.abs(h) % c.length];
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

function RoleBadge({ role, size = "sm" }: { role: UserRole; size?: "xs" | "sm" }) {
  const cfg = ROLE_CFG[role];
  const Icon = cfg.Icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${
      size === "xs" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]"
    }`} style={{ background: cfg.bg, color: cfg.color }}>
      <Icon className={size === "xs" ? "size-2" : "size-2.5"} />
      {cfg.label}
    </span>
  );
}

function StatusDot({ status, showLabel = false }: { status: OnlineStatus; showLabel?: boolean }) {
  const cfg = STATUS_CFG[status];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
      {showLabel && (
        <span className="text-[11px] text-muted-foreground">{cfg.label}</span>
      )}
    </span>
  );
}

function joinedLabel(joinedAt: string): string {
  const d = new Date(joinedAt + "T00:00:00");
  const today = new Date("2026-07-18");
  const days = Math.round((today.getTime() - d.getTime()) / 86400000);
  if (days <= 3)  return "Just joined";
  if (days <= 7)  return "This week";
  if (days <= 30) return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function isRecentJoin(joinedAt: string): boolean {
  const d = new Date(joinedAt + "T00:00:00");
  const today = new Date("2026-07-18");
  return (today.getTime() - d.getTime()) / 86400000 <= 7;
}

// ─────────────────────────────────────────────────────────────────────────────
// Primitive UI components
// ─────────────────────────────────────────────────────────────────────────────

function Toggle({ checked, onChange, disabled = false }: {
  checked: boolean; onChange: (v: boolean) => void; disabled?: boolean;
}) {
  return (
    <button type="button"
      onClick={() => !disabled && onChange(!checked)}
      aria-checked={checked}
      role="switch"
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-all duration-200 ${
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
      }`}
      style={{ background: checked ? "var(--rally-brand)" : "var(--switch-background)" }}>
      <span className={`pointer-events-none block rounded-full bg-white shadow-sm transition-transform duration-200 ${
        checked ? "translate-x-[22px]" : "translate-x-[3px]"
      }`} style={{ width: 18, height: 18 }} />
    </button>
  );
}

function SelectField({ value, onChange, options, disabled }: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled}
      className="h-9 px-3 pr-8 rounded-[8px] border border-border bg-background text-[13px] text-foreground outline-none focus:border-[var(--rally-brand)] focus:ring-2 focus:ring-[var(--focus-ring)]/30 transition-all cursor-pointer appearance-none"
      style={disabled ? { opacity: 0.5, cursor: "not-allowed" } : {}}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

// Section label above a card (small-caps style)
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-1 mb-2 text-[11px] font-semibold uppercase tracking-widest"
      style={{ color: "var(--text-overline)" }}>
      {children}
    </p>
  );
}

// A card that groups setting rows
function SettingCard({ label, description, footer, children }: {
  label?: string; description?: string; footer?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      {label && <SectionLabel>{label}</SectionLabel>}
      <div className="rounded-[12px] border border-border bg-card overflow-hidden"
        style={{ boxShadow: "var(--shadow-sm)" }}>
        {description && (
          <div className="px-4 pt-3.5 pb-0">
            <p className="text-[12px] text-muted-foreground leading-relaxed">{description}</p>
          </div>
        )}
        <div className="divide-y divide-border/50 px-4">
          {children}
        </div>
        {footer && (
          <div className="px-4 py-3 border-t border-border/50 bg-muted/30">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// A labelled row inside a SettingCard
function SettingRow({ label, description, children, locked, subtle }: {
  label: string; description?: string; children: React.ReactNode;
  locked?: boolean; subtle?: boolean;
}) {
  return (
    <div className={`flex items-start justify-between gap-5 py-3.5 ${subtle ? "opacity-50" : ""}`}>
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] text-foreground leading-snug">{label}</span>
          {locked && <Lock className="size-3 text-muted-foreground flex-shrink-0" />}
        </div>
        {description && (
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
      <div className="flex-shrink-0 flex items-center">{children}</div>
    </div>
  );
}

// Full-width page header for each settings section
function PageHeader({ icon: Icon, title, description, iconColor, action }: {
  icon: React.ElementType; title: string; description: string;
  iconColor?: string; action?: React.ReactNode;
}) {
  const bg   = iconColor ? `${iconColor}18` : "var(--rally-brand-soft)";
  const fill = iconColor ?? "var(--rally-brand)";
  return (
    <div className="flex items-start justify-between gap-4 mb-7 pb-6 border-b border-border/60">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
          style={{ background: bg }}>
          <Icon className="size-[18px]" style={{ color: fill }} />
        </div>
        <div>
          <p className="text-[17px] font-semibold text-foreground leading-tight">{title}</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      {action && <div className="flex-shrink-0 pt-0.5">{action}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Left Rail
// ─────────────────────────────────────────────────────────────────────────────

type NavItem  = { id: NavSection; label: string; icon: React.ElementType; ownerOnly?: boolean; danger?: boolean };
type NavGroup = { label?: string; items: NavItem[]; divider?: boolean };

function LeftRail({
  section, onSection, teamName, userRole, isOwner,
}: {
  section: NavSection; onSection: (s: NavSection) => void;
  teamName: string; userRole: UserRole; isOwner: boolean;
}) {
  const groups: NavGroup[] = [
    { label: "Workspace", items: [
      { id: "overview",    label: "Overview",    icon: Home     },
      { id: "members",     label: "Members",     icon: Users    },
      { id: "workspace",   label: "Workspace",   icon: Settings },
      { id: "permissions", label: "Permissions", icon: Lock     },
    ]},
    { label: "Personal", items: [
      { id: "notifications", label: "Notifications", icon: Bell     },
      { id: "appearance",    label: "Appearance",    icon: Palette  },
      { id: "ai",            label: "AI Settings",   icon: Sparkles },
    ]},
    { label: "Connections", items: [
      { id: "integrations", label: "Integrations", icon: Plug },
    ]},
    { divider: true, items: [
      { id: "danger", label: "Danger Zone", icon: AlertTriangle, ownerOnly: true, danger: true },
    ]},
  ];

  return (
    <nav className="w-[216px] flex-shrink-0 border-r border-border flex flex-col overflow-hidden hidden lg:flex"
      style={{ background: "var(--canvas)" }}>

      {/* Workspace identity block */}
      <div className="flex-shrink-0 px-3.5 py-3.5 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          {/* Team logo */}
          <div className="w-8 h-8 rounded-[8px] flex items-center justify-center text-white flex-shrink-0 select-none"
            style={{ background: "var(--rally-brand)", fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {teamName.slice(0, 2).toUpperCase()}
          </div>
          {/* Name + subtitle */}
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-foreground truncate leading-tight">{teamName}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-none">Workspace settings</p>
          </div>
        </div>
        {/* Role pill below */}
        <div className="mt-2.5">
          <RoleBadge role={userRole} size="xs" />
        </div>
      </div>

      {/* Nav groups */}
      <div className="flex-1 overflow-y-auto px-2 py-2.5 space-y-0.5">
        {groups.map((group, gi) => {
          const visible = group.items.filter(i => !i.ownerOnly || isOwner);
          if (!visible.length) return null;
          return (
            <div key={gi}>
              {/* Separator before Danger Zone */}
              {group.divider && visible.length > 0 && (
                <div className="h-px bg-border/60 mx-2 my-2" />
              )}
              {/* Group label */}
              {group.label && (
                <p className="text-[9.5px] font-semibold uppercase tracking-widest px-2.5 pt-2 pb-1"
                  style={{ color: "var(--text-overline)" }}>
                  {group.label}
                </p>
              )}
              {/* Nav items */}
              {visible.map(item => {
                const Icon  = item.icon;
                const active = section === item.id;
                return (
                  <button key={item.id} onClick={() => onSection(item.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-[7px] text-left transition-all ${
                      active
                        ? ""
                        : "text-muted-foreground hover:text-foreground hover:bg-[var(--interactive-hover-bg)]"
                    }`}
                    style={active
                      ? item.danger
                        ? { background: "var(--error-soft)", color: "var(--error-on)" }
                        : { background: "var(--rally-brand)", color: "#fff" }
                      : {}}>
                    <Icon className="size-[15px] flex-shrink-0" />
                    <span className="text-[12.5px] font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Member Row
// ─────────────────────────────────────────────────────────────────────────────

function MemberRow({ member, selected, onSelect, canManage, isCurrentUser, onRoleChange }: {
  member: MockMember; selected: boolean;
  onSelect: () => void; canManage: boolean; isCurrentUser: boolean;
  onRoleChange: (userId: string, role: UserRole) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const status = MOCK_STATUSES[member.userId] ?? "offline";
  const recent = isRecentJoin(member.joinedAt);

  return (
    <div onClick={onSelect}
      className={`flex items-center gap-3 px-4 py-3 rounded-[10px] border cursor-pointer group transition-all ${
        selected
          ? "border-[var(--rally-brand)]/60 bg-[var(--rally-brand-soft)]"
          : "border-border bg-card hover:border-border hover:bg-[var(--interactive-hover-bg)]"
      }`}>

      {/* Avatar + status dot */}
      <div className="relative flex-shrink-0">
        <Av name={member.name} size={36} />
        <span className="absolute -bottom-0.5 -right-0.5 w-[11px] h-[11px] rounded-full border-2 border-card"
          style={{ background: STATUS_CFG[status].dot }} />
      </div>

      {/* Name + email */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13px] font-medium text-foreground truncate">{member.name}</span>
          {isCurrentUser && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground flex-shrink-0">You</span>
          )}
          {recent && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{ background: "var(--success-soft)", color: "var(--success-on)" }}>New</span>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground truncate mt-0.5">{member.email}</p>
      </div>

      {/* Role + status + joined */}
      <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
        <RoleBadge role={member.role} />
        <StatusDot status={status} showLabel />
        <span className="text-[11px] text-muted-foreground hidden md:block w-20 text-right">
          {joinedLabel(member.joinedAt)}
        </span>
      </div>

      {/* Overflow menu */}
      {canManage && !isCurrentUser && (
        <div className="relative flex-shrink-0">
          <button onClick={e => { e.stopPropagation(); setMenuOpen(v => !v); }}
            className="w-7 h-7 flex items-center justify-center rounded-[7px] opacity-0 group-hover:opacity-100 hover:bg-muted transition-all text-muted-foreground">
            <MoreHorizontal className="size-3.5" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={e => { e.stopPropagation(); setMenuOpen(false); }} />
              <div className="absolute right-0 top-8 z-40 bg-card border border-border rounded-[10px] shadow-lg overflow-hidden w-40 py-1">
                <button onClick={e => { e.stopPropagation(); setMenuOpen(false); onSelect(); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-foreground hover:bg-muted">
                  <Shield className="size-3.5" /> Change role
                </button>
                <div className="h-px bg-border mx-2 my-0.5" />
                <button onClick={e => { e.stopPropagation(); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[12px] hover:bg-muted"
                  style={{ color: "var(--error-on)" }}>
                  <UserMinus className="size-3.5" /> Remove
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Member Detail Panel
// ─────────────────────────────────────────────────────────────────────────────

function MemberDetailPanel({ member, onClose, canManage, onRoleChange }: {
  member: MockMember; onClose: () => void;
  canManage: boolean; onRoleChange: (userId: string, role: UserRole) => void;
}) {
  const [showRolePicker, setShowRolePicker] = useState(false);
  const [confirmRemove,  setConfirmRemove]  = useState(false);
  const status = MOCK_STATUSES[member.userId] ?? "offline";
  const caps   = ROLE_CAPS[member.role];
  const mockActivity = [
    { label: "Last active",    value: status === "online" ? "Now" : status === "away" ? "15m ago" : "2h ago" },
    { label: "Last task",      value: "Review mobile header" },
    { label: "Last message",   value: `Sent in #${member.role === "viewer" ? "general" : "design"}` },
    { label: "Files accessed", value: "3 this week" },
  ];

  return (
    <aside className="h-full flex flex-col border-l border-border bg-card" style={{ width: 272, flexShrink: 0 }}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-2 px-4 py-3 border-b border-border">
        <span className="flex-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Member details
        </span>
        <button onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground transition-colors">
          <X className="size-4" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {/* Profile */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <Av name={member.name} size={60} />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card"
              style={{ background: STATUS_CFG[status].dot }} />
          </div>
          <p className="text-[15px] font-semibold text-foreground">{member.name}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{member.email}</p>
          <div className="flex items-center gap-2 mt-2.5">
            <RoleBadge role={member.role} />
            <StatusDot status={status} showLabel />
          </div>
        </div>

        {/* Meta */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <Mail className="size-3.5 flex-shrink-0" />
            <span className="truncate">{member.email}</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <Clock className="size-3.5 flex-shrink-0" />
            <span>Joined {joinedLabel(member.joinedAt)}</span>
          </div>
        </div>

        {/* Access */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-overline)" }}>Access</p>
          <div className="space-y-1.5">
            {caps.can.map(item => (
              <div key={item} className="flex items-start gap-2">
                <Check className="size-3.5 flex-shrink-0 mt-0.5" style={{ color: "var(--success-solid)" }} />
                <span className="text-[11px] text-foreground leading-relaxed">{item}</span>
              </div>
            ))}
            {caps.cannot.map(item => (
              <div key={item} className="flex items-start gap-2">
                <X className="size-3 flex-shrink-0 mt-0.5 text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-overline)" }}>Recent Activity</p>
          <div className="rounded-[8px] border border-border overflow-hidden divide-y divide-border/50">
            {mockActivity.map(a => (
              <div key={a.label} className="flex items-center justify-between px-3 py-2">
                <span className="text-[11px] text-muted-foreground">{a.label}</span>
                <span className="text-[11px] text-foreground font-medium">{a.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Role picker */}
        {canManage && showRolePicker && (
          <div className="rounded-[10px] border border-border overflow-hidden">
            <div className="px-3 py-2.5 bg-muted/40 border-b border-border">
              <p className="text-[11px] font-semibold text-foreground">Change role</p>
            </div>
            <div className="p-2 space-y-1">
              {ROLE_ORDER.filter(r => r !== "owner").map(r => (
                <button key={r} onClick={() => { onRoleChange(member.userId, r); setShowRolePicker(false); }}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[7px] border text-left transition-all ${
                    member.role === r
                      ? "border-[var(--rally-brand)]/40"
                      : "border-transparent hover:bg-muted hover:border-border"
                  }`}
                  style={member.role === r ? { background: "var(--rally-brand-soft)" } : {}}>
                  <RoleBadge role={r} size="xs" />
                  <span className="text-[12px] text-foreground flex-1">{ROLE_CFG[r].label}</span>
                  {member.role === r && <Check className="size-3.5" style={{ color: "var(--rally-brand)" }} />}
                </button>
              ))}
            </div>
            <div className="px-3 py-2 border-t border-border bg-muted/20">
              <button onClick={() => setShowRolePicker(false)}
                className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer actions */}
      {canManage && (
        <div className="flex-shrink-0 border-t border-border px-4 py-3 flex gap-2">
          {!showRolePicker && (
            <button onClick={() => setShowRolePicker(true)}
              className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-[8px] border border-border bg-background text-foreground text-[12px] hover:bg-muted transition-colors">
              <Shield className="size-3.5" /> Change Role
            </button>
          )}
          {!confirmRemove ? (
            <button onClick={() => setConfirmRemove(true)}
              className="flex items-center justify-center gap-1.5 w-8 h-8 rounded-[8px] border border-border bg-background text-[12px] hover:bg-muted transition-colors"
              style={{ color: "var(--error-on)" }}>
              <UserMinus className="size-3.5" />
            </button>
          ) : (
            <button onClick={() => setConfirmRemove(false)}
              className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-[8px] text-white text-[12px] font-medium"
              style={{ background: "var(--error-solid)" }}>
              Confirm Remove
            </button>
          )}
        </div>
      )}
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Overview
// ─────────────────────────────────────────────────────────────────────────────

function OverviewView({ members, userRole, user, teamName, projectName, teamDescription, onNav, invites }: {
  members: MockMember[]; userRole: UserRole; user: { name: string } | null;
  teamName: string; projectName: string; teamDescription: string;
  onNav: (s: NavSection) => void; invites: typeof MOCK_INVITES;
}) {
  const canManage   = userRole === "owner" || userRole === "admin";
  const onlineCount = members.filter(m => MOCK_STATUSES[m.userId] === "online").length;
  const caps        = ROLE_CAPS[userRole];

  const navCards = [
    { label: "Members",       desc: `${members.length} people`,  icon: Users,    to: "members"       as NavSection, color: "#3B82F6" },
    { label: "Workspace",     desc: "Name, icon, description",   icon: Settings, to: "workspace"     as NavSection, color: "#8B5CF6" },
    { label: "Permissions",   desc: "Role-based access control", icon: Lock,     to: "permissions"   as NavSection, color: "#F97316" },
    { label: "AI Settings",   desc: "Model, features, memory",   icon: Sparkles, to: "ai"            as NavSection, color: "#EC4899" },
    { label: "Notifications", desc: "Email, push, quiet hours",  icon: Bell,     to: "notifications" as NavSection, color: "#10B981" },
    { label: "Integrations",  desc: "GitHub, Slack, Calendar",   icon: Plug,     to: "integrations"  as NavSection, color: "#F59E0B" },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <PageHeader icon={Home} title="Overview" description={`${teamName} workspace at a glance.`} />

        {/* Team identity card */}
        <div className="rounded-[14px] border border-border bg-card p-5 mb-8"
          style={{ boxShadow: "var(--shadow-sm)" }}>
          <div className="flex items-start gap-4">
            <div className="w-[52px] h-[52px] rounded-[13px] flex items-center justify-center flex-shrink-0 text-white select-none"
              style={{ background: "var(--rally-brand)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
              {teamName.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <p className="text-[17px] font-semibold text-foreground">{teamName}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Workspace</span>
              </div>
              <p className="text-[12px] text-muted-foreground mt-0.5">{projectName}</p>
              <p className="text-[13px] text-foreground mt-2 leading-relaxed">{teamDescription}</p>
            </div>
            <RoleBadge role={userRole} />
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-5 mt-4 pt-4 border-t border-border/50 flex-wrap">
            <div>
              <span className="text-[20px] font-bold text-foreground">{members.length}</span>
              <span className="text-[12px] text-muted-foreground ml-1.5">members</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--status-active)" }} />
              <span className="text-[12px] text-muted-foreground">{onlineCount} online</span>
            </div>
            {ROLE_ORDER.map(r => {
              const count = members.filter(m => m.role === r).length;
              if (!count) return null;
              return (
                <div key={r} className="flex items-center gap-1.5">
                  <RoleBadge role={r} size="xs" />
                  <span className="text-[11px] text-muted-foreground">× {count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick nav */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-3 px-0.5"
            style={{ color: "var(--text-overline)" }}>Quick navigation</p>
          <div className="grid grid-cols-2 gap-2">
            {navCards.map(card => {
              const Icon = card.icon;
              return (
                <button key={card.to} onClick={() => onNav(card.to)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-[10px] border border-border bg-card hover:bg-[var(--interactive-hover-bg)] transition-all text-left group"
                  style={{ boxShadow: "var(--shadow-sm)" }}>
                  <div className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
                    style={{ background: `${card.color}1a` }}>
                    <Icon className="size-4" style={{ color: card.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-foreground">{card.label}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{card.desc}</p>
                  </div>
                  <ChevronRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Members snapshot */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-overline)" }}>Team members</p>
            <button onClick={() => onNav("members")}
              className="flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
              Manage <ChevronRight className="size-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {members.map(m => {
              const status = MOCK_STATUSES[m.userId] ?? "offline";
              return (
                <div key={m.userId}
                  className="flex items-center gap-2.5 px-3 py-3 rounded-[10px] border border-border bg-card"
                  style={{ boxShadow: "var(--shadow-sm)" }}>
                  <div className="relative flex-shrink-0">
                    <Av name={m.name} size={30} />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card"
                      style={{ background: STATUS_CFG[status].dot }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-foreground truncate">
                      {m.name}
                      {m.name === user?.name && <span className="ml-1 text-[10px] text-muted-foreground font-normal">(you)</span>}
                    </p>
                    <RoleBadge role={m.role} size="xs" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* My access */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-3 px-0.5"
            style={{ color: "var(--text-overline)" }}>My access</p>
          <div className="rounded-[12px] border border-border bg-card overflow-hidden"
            style={{ boxShadow: "var(--shadow-sm)" }}>
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/50">
              <Av name={user?.name ?? "You"} size={36} />
              <div>
                <p className="text-[13px] font-medium text-foreground">{user?.name ?? "You"}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <RoleBadge role={userRole} />
                  <span className="text-[11px] text-muted-foreground">in {teamName}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border/50">
              {caps.can.length > 0 && (
                <div className="px-4 py-3.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2.5" style={{ color: "var(--text-overline)" }}>Can do</p>
                  <div className="space-y-2">
                    {caps.can.map(item => (
                      <div key={item} className="flex items-start gap-2">
                        <Check className="size-3.5 flex-shrink-0 mt-0.5" style={{ color: "var(--success-solid)" }} />
                        <span className="text-[12px] text-foreground leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {caps.cannot.length > 0 && (
                <div className="px-4 py-3.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2.5" style={{ color: "var(--text-overline)" }}>Cannot do</p>
                  <div className="space-y-2">
                    {caps.cannot.map(item => (
                      <div key={item} className="flex items-start gap-2">
                        <X className="size-3 flex-shrink-0 mt-0.5 text-muted-foreground" />
                        <span className="text-[12px] text-muted-foreground leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pending invites */}
        {canManage && invites.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-overline)" }}>Pending invites</p>
              <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{invites.length}</span>
            </div>
            <div className="space-y-2">
              {invites.map(inv => (
                <div key={inv.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-[10px] border border-border bg-card"
                  style={{ boxShadow: "var(--shadow-sm)" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--info-soft)" }}>
                    <Mail className="size-3.5" style={{ color: "var(--info-on)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-foreground truncate">{inv.email}</p>
                    <p className="text-[11px] text-muted-foreground">Sent {inv.sentAt} · expires in {inv.expiresIn}</p>
                  </div>
                  <RoleBadge role={inv.role} size="xs" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent changes */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-3 px-0.5"
            style={{ color: "var(--text-overline)" }}>Recent changes</p>
          <div className="rounded-[12px] border border-border bg-card overflow-hidden divide-y divide-border/40"
            style={{ boxShadow: "var(--shadow-sm)" }}>
            {RECENT_CHANGES.map(c => (
              <div key={c.id} className="flex items-center gap-3 px-4 py-3">
                <span className="w-[7px] h-[7px] rounded-full flex-shrink-0" style={{ background: c.color }} />
                <p className="flex-1 text-[12px] text-foreground">{c.text}</p>
                <span className="text-[11px] text-muted-foreground flex-shrink-0 ml-2">{c.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Members View
// ─────────────────────────────────────────────────────────────────────────────

function MembersView({ members, selectedId, onSelect, canManage, currentUserName, onInvite, onRoleChange }: {
  members: MockMember[]; selectedId: string | null;
  onSelect: (m: MockMember) => void; canManage: boolean;
  currentUserName: string; onInvite: () => void;
  onRoleChange: (userId: string, role: UserRole) => void;
}) {
  const [search,     setSearch]     = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [copied,     setCopied]     = useState(false);

  function copyLink() {
    navigator.clipboard.writeText("https://rally.app/invite/abc123").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const filtered = members.filter(m => {
    const matchSearch = !search
      || m.name.toLowerCase().includes(search.toLowerCase())
      || m.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || m.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex-shrink-0 px-6 py-3.5 border-b border-border bg-card flex items-center gap-2.5 flex-wrap"
        style={{ boxShadow: "0 1px 0 0 var(--border)" }}>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search members…"
            className="pl-8 pr-3 h-8 w-48 rounded-[8px] border border-border bg-background text-[12px] text-foreground placeholder:text-muted-foreground outline-none focus:border-[var(--rally-brand)] transition-colors" />
        </div>

        {/* Role filter tabs */}
        <div className="flex gap-0.5 p-0.5 rounded-[8px] bg-muted">
          {(["all", ...ROLE_ORDER] as (UserRole | "all")[]).map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-2.5 py-1 rounded-[6px] text-[11px] font-medium transition-all capitalize ${
                roleFilter === r ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}>
              {r === "all" ? "All" : ROLE_CFG[r as UserRole].label}
            </button>
          ))}
        </div>

        <div className="flex-1" />
        <span className="text-[12px] text-muted-foreground tabular-nums">{filtered.length} member{filtered.length !== 1 ? "s" : ""}</span>

        {canManage && (
          <button onClick={copyLink}
            className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-[12px]">
            {copied
              ? <><Check className="size-3.5" style={{ color: "var(--success-solid)" }} /> Copied!</>
              : <><Copy className="size-3.5" /> Copy invite link</>}
          </button>
        )}
        {canManage && (
          <button onClick={onInvite}
            className="flex items-center gap-1.5 h-8 px-3.5 rounded-[8px] text-white text-[12px] font-medium hover:opacity-90 transition-opacity"
            style={{ background: "var(--rally-brand)" }}>
            <UserPlus className="size-3.5" /> Invite member
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-4xl mx-auto space-y-1.5">
          {filtered.map(m => (
            <MemberRow key={m.userId} member={m}
              selected={selectedId === m.userId}
              onSelect={() => onSelect(m)}
              canManage={canManage}
              isCurrentUser={m.name === currentUserName}
              onRoleChange={onRoleChange}
            />
          ))}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
              <Users className="size-10 text-muted-foreground opacity-20" />
              <p className="text-[13px] text-muted-foreground">No members match your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Workspace View
// ─────────────────────────────────────────────────────────────────────────────

function WorkspaceView({ teamName, projectName, description, onSave, canEdit }: {
  teamName: string; projectName: string; description: string;
  onSave: (name: string, project: string, desc: string) => void;
  canEdit: boolean;
}) {
  const [name,       setName]       = useState(teamName);
  const [project,    setProject]    = useState(projectName);
  const [desc,       setDesc]       = useState(description);
  const [timezone,   setTimezone]   = useState("America/New_York");
  const [language,   setLanguage]   = useState("en");
  const [dateFormat, setDateFormat] = useState("MMM D, YYYY");
  const [weekStart,  setWeekStart]  = useState("monday");
  const [saved,      setSaved]      = useState(false);

  function handleSave() {
    onSave(name, project, desc);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const inp = `w-full px-3 py-2 rounded-[8px] border border-border bg-background text-[13px] text-foreground outline-none transition-colors ${
    canEdit ? "focus:border-[var(--rally-brand)] focus:ring-2 focus:ring-[var(--focus-ring)]/20" : "opacity-50 cursor-not-allowed"
  }`;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader icon={Settings} title="Workspace" description="Manage your workspace identity, locale, and format preferences." />

        {!canEdit && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-[10px] border border-border bg-muted/50 mb-6">
            <div className="w-7 h-7 rounded-[7px] flex items-center justify-center flex-shrink-0 bg-muted">
              <Lock className="size-3.5 text-muted-foreground" />
            </div>
            <p className="text-[12px] text-muted-foreground">Only the workspace owner can edit these settings.</p>
          </div>
        )}

        <SettingCard label="Identity" description="How your workspace appears to members and guests.">
          <SettingRow label="Workspace icon">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-white font-bold select-none"
                style={{ background: "var(--rally-brand)", fontSize: 16, letterSpacing: "-0.02em" }}>
                {name.slice(0, 2).toUpperCase() || "?"}
              </div>
              {canEdit && (
                <button className="px-3 py-1.5 rounded-[7px] border border-border text-[12px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  Change
                </button>
              )}
            </div>
          </SettingRow>
          <SettingRow label="Workspace name" description="Displayed to all members in the sidebar and notifications.">
            <input value={name} onChange={e => setName(e.target.value)} disabled={!canEdit}
              className={inp} style={{ width: 200 }} placeholder="e.g. Rally Labs" />
          </SettingRow>
          <SettingRow label="Project tagline" description="A short description of what your team is working on.">
            <input value={project} onChange={e => setProject(e.target.value)} disabled={!canEdit}
              className={inp} style={{ width: 220 }} placeholder="e.g. All-in-One Workspace" />
          </SettingRow>
          <SettingRow label="Description" description="Shown on the workspace overview and invite pages.">
            <textarea value={desc} onChange={e => setDesc(e.target.value)} disabled={!canEdit}
              rows={3} placeholder="What is this workspace building?"
              className={`${inp} resize-none`} style={{ width: 240 }} />
          </SettingRow>
        </SettingCard>

        <SettingCard label="Locale & Format">
          <SettingRow label="Timezone" description="Used for calendar events and notification scheduling.">
            <SelectField value={timezone} onChange={setTimezone} disabled={!canEdit} options={[
              { value: "America/New_York",    label: "Eastern — ET (UTC-5)"   },
              { value: "America/Chicago",     label: "Central — CT (UTC-6)"   },
              { value: "America/Los_Angeles", label: "Pacific — PT (UTC-8)"   },
              { value: "Europe/London",       label: "London — GMT (UTC+0)"   },
              { value: "Europe/Paris",        label: "Paris — CET (UTC+1)"    },
              { value: "Asia/Tokyo",          label: "Tokyo — JST (UTC+9)"    },
            ]} />
          </SettingRow>
          <SettingRow label="Language">
            <SelectField value={language} onChange={setLanguage} disabled={!canEdit} options={[
              { value: "en", label: "English"  },
              { value: "es", label: "Español"  },
              { value: "fr", label: "Français" },
              { value: "de", label: "Deutsch"  },
              { value: "ja", label: "日本語"    },
              { value: "ar", label: "العربية"   },
            ]} />
          </SettingRow>
          <SettingRow label="Date format" description="How dates appear across tasks, events, and files.">
            <SelectField value={dateFormat} onChange={setDateFormat} disabled={!canEdit} options={[
              { value: "MMM D, YYYY", label: "Jul 18, 2026 (recommended)" },
              { value: "DD/MM/YYYY",  label: "18/07/2026"                 },
              { value: "MM/DD/YYYY",  label: "07/18/2026"                 },
              { value: "YYYY-MM-DD",  label: "2026-07-18 (ISO 8601)"      },
            ]} />
          </SettingRow>
          <SettingRow label="Week starts on">
            <SelectField value={weekStart} onChange={setWeekStart} disabled={!canEdit} options={[
              { value: "monday",   label: "Monday"   },
              { value: "sunday",   label: "Sunday"   },
              { value: "saturday", label: "Saturday" },
            ]} />
          </SettingRow>
        </SettingCard>

        {canEdit && (
          <button onClick={handleSave}
            className="flex items-center gap-1.5 h-9 px-5 rounded-[8px] text-white text-[13px] font-medium transition-all hover:opacity-90"
            style={{ background: saved ? "var(--success-solid)" : "var(--rally-brand)" }}>
            {saved ? <><Check className="size-4" /> Saved</> : "Save changes"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Permissions View
// ─────────────────────────────────────────────────────────────────────────────

function PermissionsView({ userRole }: { userRole: UserRole }) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader icon={Lock} title="Permissions" description="Role-based access control for your workspace." />

        {/* My role callout */}
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-[10px] border mb-6"
          style={{ borderColor: "var(--border)", background: ROLE_CFG[userRole].bg }}>
          <div className="flex-shrink-0">
            <RoleBadge role={userRole} />
          </div>
          <p className="text-[12px]" style={{ color: ROLE_CFG[userRole].color }}>
            You are {userRole === "owner" || userRole === "admin" ? "an" : "a"} <strong>{ROLE_CFG[userRole].label}</strong> in this workspace.
          </p>
        </div>

        {/* Permission table */}
        <div className="rounded-[12px] border border-border overflow-hidden bg-card"
          style={{ boxShadow: "var(--shadow-sm)" }}>
          {/* Column headers */}
          <div className="grid grid-cols-5 border-b border-border" style={{ background: "var(--canvas)" }}>
            <div className="px-4 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-overline)" }}>
                Permission
              </span>
            </div>
            {ROLE_ORDER.map(r => {
              const cfg  = ROLE_CFG[r];
              const Icon = cfg.Icon;
              const isMe = userRole === r;
              return (
                <div key={r} className={`px-3 py-3 text-center border-l border-border/40 ${isMe ? "bg-card" : ""}`}>
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isMe ? "ring-2 ring-offset-1 ring-[var(--rally-brand)]/40" : ""}`}
                      style={{ background: cfg.bg }}>
                      <Icon className="size-3" style={{ color: cfg.color }} />
                    </div>
                    <span className="text-[10px] font-semibold" style={{ color: cfg.color }}>{cfg.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {PERMISSION_GROUPS.map((group, gi) => (
            <div key={group.group}>
              {/* Group header */}
              <div className="grid grid-cols-5 border-t border-border/50" style={{ background: "var(--canvas)" }}>
                <div className="col-span-5 px-4 py-1.5">
                  <span className="text-[9.5px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-overline)" }}>
                    {group.group}
                  </span>
                </div>
              </div>
              {group.rows.map((row, ri) => (
                <div key={row.label}
                  className={`grid grid-cols-5 border-t border-border/40 hover:bg-muted/20 transition-colors ${
                    ri % 2 === 1 ? "" : ""
                  }`}>
                  <div className="px-4 py-2.5 text-[12px] text-foreground">{row.label}</div>
                  {ROLE_ORDER.map(r => {
                    const has  = row[r as keyof typeof row] as boolean;
                    const isMe = userRole === r;
                    return (
                      <div key={r} className={`px-3 py-2.5 flex items-center justify-center border-l border-border/30 ${isMe ? "bg-card/80" : ""}`}>
                        {has
                          ? <div className="w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ background: "var(--success-soft)" }}>
                              <Check className="size-2.5" style={{ color: "var(--success-on)" }} />
                            </div>
                          : <X className="size-3.5 opacity-20 text-muted-foreground" />}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2.5 px-4 py-3 rounded-[10px] border border-border bg-muted/30">
          <Eye className="size-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Viewers</strong> have read-only access. They can see all workspace content but cannot create, edit, or send anything.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Notifications View
// ─────────────────────────────────────────────────────────────────────────────

function NotificationsView() {
  const [emailDigest,     setEmailDigest]     = useState(true);
  const [emailMentions,   setEmailMentions]   = useState(true);
  const [emailTasks,      setEmailTasks]      = useState(true);
  const [emailEvents,     setEmailEvents]     = useState(false);
  const [emailInvites,    setEmailInvites]    = useState(true);
  const [pushEnabled,     setPushEnabled]     = useState(true);
  const [pushMentions,    setPushMentions]    = useState(true);
  const [pushTasks,       setPushTasks]       = useState(true);
  const [pushMessages,    setPushMessages]    = useState(false);
  const [quietHours,      setQuietHours]      = useState(true);
  const [quietStart,      setQuietStart]      = useState("22:00");
  const [quietEnd,        setQuietEnd]        = useState("08:00");
  const [digestFrequency, setDigestFrequency] = useState("daily");
  const [taskReminders,   setTaskReminders]   = useState("15min");
  const [sounds,          setSounds]          = useState(true);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader icon={Bell} title="Notifications" description="Control how and when Rally notifies you." />

        <SettingCard label="Email notifications">
          <SettingRow label="Activity digest" description="A summary of activity sent to your inbox on a schedule.">
            <div className="flex items-center gap-2.5">
              {emailDigest && (
                <SelectField value={digestFrequency} onChange={setDigestFrequency} options={[
                  { value: "realtime", label: "Real-time" },
                  { value: "hourly",   label: "Hourly"    },
                  { value: "daily",    label: "Daily"     },
                  { value: "weekly",   label: "Weekly"    },
                ]} />
              )}
              <Toggle checked={emailDigest} onChange={setEmailDigest} />
            </div>
          </SettingRow>
          <SettingRow label="@Mentions & replies" description="When someone @mentions you or replies in a thread.">
            <Toggle checked={emailMentions} onChange={setEmailMentions} />
          </SettingRow>
          <SettingRow label="Task assignments" description="When tasks are assigned to you or updated.">
            <Toggle checked={emailTasks} onChange={setEmailTasks} />
          </SettingRow>
          <SettingRow label="Calendar events" description="Reminders for upcoming meetings and events.">
            <Toggle checked={emailEvents} onChange={setEmailEvents} />
          </SettingRow>
          <SettingRow label="Workspace invites" description="When you're invited to a new workspace.">
            <Toggle checked={emailInvites} onChange={setEmailInvites} />
          </SettingRow>
        </SettingCard>

        <SettingCard label="Push notifications">
          <SettingRow label="Enable push" description="Receive notifications in your browser or mobile device.">
            <Toggle checked={pushEnabled} onChange={setPushEnabled} />
          </SettingRow>
          <SettingRow label="@Mentions" description="Get pushed when someone @mentions you." subtle={!pushEnabled}>
            <Toggle checked={pushMentions} onChange={setPushMentions} disabled={!pushEnabled} />
          </SettingRow>
          <SettingRow label="Task updates" description="Assignments, due date changes, and completions." subtle={!pushEnabled}>
            <Toggle checked={pushTasks} onChange={setPushTasks} disabled={!pushEnabled} />
          </SettingRow>
          <SettingRow label="New messages" description="Notify for every message sent in watched channels." subtle={!pushEnabled}>
            <Toggle checked={pushMessages} onChange={setPushMessages} disabled={!pushEnabled} />
          </SettingRow>
        </SettingCard>

        <SettingCard label="Reminders & sounds">
          <SettingRow label="Task due-date reminder" description="How far in advance to remind you before a task is due.">
            <SelectField value={taskReminders} onChange={setTaskReminders} options={[
              { value: "none",  label: "None"           },
              { value: "5min",  label: "5 minutes"      },
              { value: "15min", label: "15 minutes"     },
              { value: "30min", label: "30 minutes"     },
              { value: "1hour", label: "1 hour before"  },
              { value: "1day",  label: "1 day before"   },
            ]} />
          </SettingRow>
          <SettingRow label="Notification sounds" description="Play a sound when you receive a notification.">
            <div className="flex items-center gap-2.5">
              {sounds
                ? <Volume2 className="size-4 text-muted-foreground" />
                : <VolumeX className="size-4 text-muted-foreground" />}
              <Toggle checked={sounds} onChange={setSounds} />
            </div>
          </SettingRow>
        </SettingCard>

        <SettingCard label="Quiet hours" description="Mute all notifications during a scheduled window each day.">
          <SettingRow label="Enable quiet hours">
            <Toggle checked={quietHours} onChange={setQuietHours} />
          </SettingRow>
          {quietHours && (
            <SettingRow label="Time window" description="No notifications will be sent during this period.">
              <div className="flex items-center gap-2">
                <input type="time" value={quietStart} onChange={e => setQuietStart(e.target.value)}
                  className="h-9 px-2.5 rounded-[8px] border border-border bg-background text-[13px] text-foreground outline-none focus:border-[var(--rally-brand)] transition-colors" />
                <span className="text-[12px] text-muted-foreground">to</span>
                <input type="time" value={quietEnd} onChange={e => setQuietEnd(e.target.value)}
                  className="h-9 px-2.5 rounded-[8px] border border-border bg-background text-[13px] text-foreground outline-none focus:border-[var(--rally-brand)] transition-colors" />
              </div>
            </SettingRow>
          )}
        </SettingCard>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Appearance View
// ─────────────────────────────────────────────────────────────────────────────

function AppearanceView() {
  const [theme,         setTheme]         = useState<"light" | "dark" | "system">("system");
  const [density,       setDensity]       = useState<"compact" | "comfortable" | "spacious">("comfortable");
  const [fontSize,      setFontSize]      = useState("medium");
  const [accent,        setAccent]        = useState("#FF4615");
  const [sidebar,       setSidebar]       = useState(false);
  const [animations,    setAnimations]    = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const themeOpts = [
    { id: "light"  as const, label: "Light",  Icon: Sun,     desc: "Always light" },
    { id: "dark"   as const, label: "Dark",   Icon: Moon,    desc: "Always dark"  },
    { id: "system" as const, label: "System", Icon: Monitor, desc: "Auto"         },
  ];

  const densityOpts = [
    { id: "compact"     as const, label: "Compact",     desc: "Dense & information-dense" },
    { id: "comfortable" as const, label: "Comfortable", desc: "Balanced (recommended)"    },
    { id: "spacious"    as const, label: "Spacious",    desc: "Airy, more whitespace"     },
  ];

  const accentPalette = [
    { color: "#FF4615", name: "Rally Orange" },
    { color: "#3B82F6", name: "Blue"         },
    { color: "#10B981", name: "Emerald"      },
    { color: "#8B5CF6", name: "Violet"       },
    { color: "#EC4899", name: "Pink"         },
    { color: "#F97316", name: "Orange"       },
    { color: "#14B8A6", name: "Teal"         },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader icon={Palette} title="Appearance" description="Customize how Rally looks and feels for you personally." />

        {/* Theme */}
        <SettingCard label="Color theme">
          <SettingRow label="Interface theme" description="Choose between light, dark, or system-synced appearance.">
            <div className="flex gap-2">
              {themeOpts.map(t => {
                const Icon = t.Icon;
                const on   = theme === t.id;
                return (
                  <button key={t.id} onClick={() => setTheme(t.id)}
                    className={`flex flex-col items-center gap-1.5 w-[72px] py-3 rounded-[9px] border text-[11px] font-medium transition-all ${
                      on ? "border-[var(--rally-brand)]" : "border-border text-muted-foreground hover:border-border hover:text-foreground hover:bg-muted/50"
                    }`}
                    style={on ? { background: "var(--rally-brand-soft)", color: "var(--rally-brand-on)" } : {}}>
                    <Icon className="size-4" />
                    <span>{t.label}</span>
                    <span className={`text-[9px] ${on ? "opacity-70" : "opacity-50"}`}>{t.desc}</span>
                  </button>
                );
              })}
            </div>
          </SettingRow>
          <SettingRow label="Accent color" description="Used for active states, highlights, and primary buttons.">
            <div className="flex items-center gap-2">
              {accentPalette.map(p => (
                <button key={p.color} title={p.name} onClick={() => setAccent(p.color)}
                  className="rounded-full transition-all hover:scale-110 focus:outline-none"
                  style={{
                    width: 22, height: 22, background: p.color, flexShrink: 0,
                    outline:       accent === p.color ? `2.5px solid ${p.color}` : "none",
                    outlineOffset: accent === p.color ? "2.5px" : "0",
                    transform:     accent === p.color ? "scale(1.18)" : undefined,
                  }} />
              ))}
            </div>
          </SettingRow>
        </SettingCard>

        {/* Density */}
        <SettingCard label="Display density" description="Controls how tightly content is packed in the interface.">
          <SettingRow label="Interface density">
            <div className="flex gap-2">
              {densityOpts.map(d => {
                const on = density === d.id;
                return (
                  <button key={d.id} onClick={() => setDensity(d.id)}
                    className={`flex flex-col items-start gap-0.5 px-3.5 py-2.5 rounded-[9px] border text-left w-[104px] transition-all ${
                      on ? "border-[var(--rally-brand)]" : "border-border hover:bg-muted/50"
                    }`}
                    style={on ? { background: "var(--rally-brand-soft)" } : {}}>
                    <span className="text-[12px] font-semibold" style={on ? { color: "var(--rally-brand-on)" } : { color: "var(--foreground)" }}>
                      {d.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground leading-relaxed">{d.desc}</span>
                  </button>
                );
              })}
            </div>
          </SettingRow>
        </SettingCard>

        {/* Typography */}
        <SettingCard label="Typography">
          <SettingRow label="Interface font size" description="The base font size used across all UI elements.">
            <SelectField value={fontSize} onChange={setFontSize} options={[
              { value: "small",  label: "Small — 12px"    },
              { value: "medium", label: "Medium — 13px"   },
              { value: "large",  label: "Large — 14px"    },
            ]} />
          </SettingRow>
        </SettingCard>

        {/* Layout */}
        <SettingCard label="Layout">
          <SettingRow label="Collapsed sidebar by default" description="Start every session with the navigation sidebar minimized.">
            <Toggle checked={sidebar} onChange={setSidebar} />
          </SettingRow>
        </SettingCard>

        {/* Motion */}
        <SettingCard label="Motion & animation">
          <SettingRow label="Enable animations" description="Smooth transitions and micro-animations throughout the UI.">
            <Toggle checked={animations} onChange={setAnimations} />
          </SettingRow>
          <SettingRow label="Reduce motion" description="Minimize all movement. Recommended for users sensitive to motion." subtle={!animations}>
            <Toggle checked={reducedMotion} onChange={setReducedMotion} disabled={!animations} />
          </SettingRow>
        </SettingCard>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AI Settings View
// ─────────────────────────────────────────────────────────────────────────────

const AI_MODELS = [
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6", desc: "Best balance of speed and capability. Recommended for most tasks.", tier: "Standard", new: true  },
  { id: "claude-opus-4-8",   label: "Claude Opus 4.8",   desc: "Most powerful model. Best for complex reasoning and analysis.",    tier: "Pro",      new: false },
  { id: "claude-haiku-4-5",  label: "Claude Haiku 4.5",  desc: "Fastest responses. Great for quick lookups and short answers.",    tier: "Standard", new: false },
];

function AISettingsView({ canEdit }: { canEdit: boolean }) {
  const [model,          setModel]          = useState("claude-sonnet-4-6");
  const [aiChat,         setAiChat]         = useState(true);
  const [aiTasks,        setAiTasks]        = useState(true);
  const [aiCalendar,     setAiCalendar]     = useState(true);
  const [aiFiles,        setAiFiles]        = useState(true);
  const [aiSearch,       setAiSearch]       = useState(true);
  const [memoryEnabled,  setMemoryEnabled]  = useState(true);
  const [memoryScope,    setMemoryScope]    = useState("workspace");
  const [responseLength, setResponseLength] = useState("balanced");
  const [responseStyle,  setResponseStyle]  = useState("professional");
  const [contextDepth,   setContextDepth]   = useState("medium");
  const [apiKey,         setApiKey]         = useState("");
  const [showKey,        setShowKey]        = useState(false);
  const [keySaved,       setKeySaved]       = useState(false);
  const [historyEnabled, setHistoryEnabled] = useState(true);
  const [historyDays,    setHistoryDays]    = useState("30");

  const mockUsage = { used: 84200, limit: 100000, pct: 84.2, resetIn: "13 days" };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader icon={Sparkles} title="AI Settings" description="Configure the Claude AI model, features, and behavior for your workspace." />

        {/* Usage summary */}
        <div className="rounded-[12px] border border-border bg-card p-5 mb-6"
          style={{ boxShadow: "var(--shadow-sm)" }}>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="text-[13px] font-semibold text-foreground">Monthly token usage</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">Resets in {mockUsage.resetIn} · Workspace plan</p>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
              style={{
                background: mockUsage.pct > 90 ? "var(--error-soft)"   : mockUsage.pct > 75 ? "var(--warning-soft)"  : "var(--success-soft)",
                color:      mockUsage.pct > 90 ? "var(--error-on)"     : mockUsage.pct > 75 ? "var(--warning-on)"    : "var(--success-on)",
              }}>
              {mockUsage.pct.toFixed(0)}% used
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full transition-all"
              style={{
                width: `${mockUsage.pct}%`,
                background: mockUsage.pct > 90 ? "var(--error-solid)" : mockUsage.pct > 75 ? "var(--warning-solid)" : "var(--rally-brand)",
              }} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[11px] text-muted-foreground">
              {mockUsage.used.toLocaleString()} / {mockUsage.limit.toLocaleString()} tokens
            </p>
            <button className="text-[11px] font-medium" style={{ color: "var(--rally-brand)" }}>
              Upgrade plan →
            </button>
          </div>
        </div>

        {/* Model selection */}
        <SettingCard label="Model" description="Select the Claude model that powers AI across your workspace.">
          <SettingRow label="Active model">
            <div className="flex flex-col gap-2 w-[290px]">
              {AI_MODELS.map(m => {
                const on = model === m.id;
                return (
                  <button key={m.id} onClick={() => canEdit && setModel(m.id)}
                    className={`flex items-start gap-3 px-3.5 py-3 rounded-[9px] border text-left transition-all ${
                      on ? "border-[var(--rally-brand)]/50" : "border-border hover:border-border hover:bg-muted/40"
                    } ${!canEdit ? "cursor-not-allowed opacity-60" : ""}`}
                    style={on ? { background: "var(--rally-brand-soft)" } : {}}>
                    {/* Radio circle */}
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                      on ? "border-[var(--rally-brand)]" : "border-border"
                    }`}>
                      {on && <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--rally-brand)" }} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[12px] font-semibold" style={on ? { color: "var(--rally-brand-on)" } : { color: "var(--foreground)" }}>
                          {m.label}
                        </span>
                        <span className="text-[9.5px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{m.tier}</span>
                        {m.new && (
                          <span className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full"
                            style={{ background: "var(--success-soft)", color: "var(--success-on)" }}>
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{m.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </SettingRow>
        </SettingCard>

        {/* Feature toggles */}
        <SettingCard label="Features" description="Enable or disable AI assistance in specific areas of Rally.">
          <SettingRow label="AI Chat" description="Full-featured AI assistant available as a dedicated panel.">
            <Toggle checked={aiChat} onChange={setAiChat} disabled={!canEdit} />
          </SettingRow>
          <SettingRow label="Task suggestions" description="Proactively suggest tasks from conversations and activity.">
            <Toggle checked={aiTasks} onChange={setAiTasks} disabled={!canEdit} />
          </SettingRow>
          <SettingRow label="Calendar assistant" description="Smart scheduling suggestions and event summaries.">
            <Toggle checked={aiCalendar} onChange={setAiCalendar} disabled={!canEdit} />
          </SettingRow>
          <SettingRow label="File summaries" description="Auto-generate summaries when documents are uploaded.">
            <Toggle checked={aiFiles} onChange={setAiFiles} disabled={!canEdit} />
          </SettingRow>
          <SettingRow label="Semantic search" description="Search by meaning and intent, not just exact keywords.">
            <Toggle checked={aiSearch} onChange={setAiSearch} disabled={!canEdit} />
          </SettingRow>
        </SettingCard>

        {/* Behavior */}
        <SettingCard label="Response behavior">
          <SettingRow label="Response length" description="How verbose or concise AI responses should be by default.">
            <SelectField value={responseLength} onChange={setResponseLength} options={[
              { value: "concise",  label: "Concise — short & direct" },
              { value: "balanced", label: "Balanced (recommended)"   },
              { value: "detailed", label: "Detailed — more context"  },
            ]} />
          </SettingRow>
          <SettingRow label="Tone & style" description="The voice and tone of AI-generated content.">
            <SelectField value={responseStyle} onChange={setResponseStyle} options={[
              { value: "casual",       label: "Casual"       },
              { value: "professional", label: "Professional" },
              { value: "technical",    label: "Technical"    },
            ]} />
          </SettingRow>
          <SettingRow label="Context window" description="How many messages back the AI considers when responding.">
            <SelectField value={contextDepth} onChange={setContextDepth} options={[
              { value: "minimal", label: "Last 5 messages"    },
              { value: "medium",  label: "Last 20 messages"   },
              { value: "full",    label: "Full conversation"  },
            ]} />
          </SettingRow>
        </SettingCard>

        {/* Memory & history */}
        <SettingCard label="Memory & history">
          <SettingRow label="AI memory" description="Persist context between sessions for personalized responses.">
            <Toggle checked={memoryEnabled} onChange={setMemoryEnabled} />
          </SettingRow>
          {memoryEnabled && (
            <SettingRow label="Memory scope" description="Which context AI remembers across sessions.">
              <SelectField value={memoryScope} onChange={setMemoryScope} options={[
                { value: "personal",  label: "Personal only"    },
                { value: "workspace", label: "Whole workspace"  },
              ]} />
            </SettingRow>
          )}
          <SettingRow label="Save conversation history" description="Store AI chat threads for later reference.">
            <Toggle checked={historyEnabled} onChange={setHistoryEnabled} />
          </SettingRow>
          {historyEnabled && (
            <SettingRow label="Auto-delete history after" description="Conversations older than this will be purged automatically.">
              <SelectField value={historyDays} onChange={setHistoryDays} options={[
                { value: "7",   label: "7 days"   },
                { value: "30",  label: "30 days"  },
                { value: "90",  label: "90 days"  },
                { value: "365", label: "1 year"   },
                { value: "0",   label: "Forever"  },
              ]} />
            </SettingRow>
          )}
        </SettingCard>

        {/* API config — owner only */}
        {canEdit && (
          <SettingCard label="API configuration" description="Supply your own Anthropic API key to use a custom account for this workspace.">
            <SettingRow label="Custom API key" description="Leave blank to use the shared Rally key. Never shared with other workspaces.">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input type={showKey ? "text" : "password"} value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    placeholder="sk-ant-api03-…"
                    className="pl-3 pr-9 h-9 rounded-[8px] border border-border bg-background text-[13px] text-foreground outline-none focus:border-[var(--rally-brand)] transition-colors"
                    style={{ width: 210 }} />
                  <button onClick={() => setShowKey(v => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    <Eye className="size-3.5" />
                  </button>
                </div>
                <button onClick={() => setKeySaved(true)}
                  className="flex items-center gap-1.5 h-9 px-3.5 rounded-[8px] text-white text-[12px] font-medium transition-all hover:opacity-90"
                  style={{ background: keySaved ? "var(--success-solid)" : "var(--rally-brand)" }}>
                  {keySaved ? <><Check className="size-3.5" /> Saved</> : "Save"}
                </button>
              </div>
            </SettingRow>
          </SettingCard>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Integrations View
// ─────────────────────────────────────────────────────────────────────────────

const INTEGRATIONS = [
  { id: "slack",   label: "Slack",           desc: "Send updates and notifications to Slack channels.",          color: "#611f69", initials: "Sl" },
  { id: "github",  label: "GitHub",          desc: "Link pull requests, issues, and commits to tasks.",          color: "#24292e", initials: "Gh" },
  { id: "figma",   label: "Figma",           desc: "Embed and preview Figma designs directly in files.",         color: "#f24e1e", initials: "Fi" },
  { id: "gcal",    label: "Google Calendar", desc: "Sync Rally events with your Google Calendar.",               color: "#4285F4", initials: "GC" },
  { id: "gdrive",  label: "Google Drive",    desc: "Attach and browse Drive files without leaving Rally.",        color: "#FBBC05", initials: "GD" },
  { id: "notion",  label: "Notion",          desc: "Import Notion pages and link docs to tasks.",                color: "#000000", initials: "No" },
  { id: "linear",  label: "Linear",          desc: "Bi-directionally sync issues and projects with Linear.",     color: "#5E6AD2", initials: "Li" },
  { id: "zapier",  label: "Zapier",          desc: "Trigger automations across 5,000+ apps via Zapier.",         color: "#FF4A00", initials: "Za" },
];
const INITIALLY_CONNECTED = new Set(["slack","github","figma"]);

function IntegrationsView() {
  const [connected, setConnected] = useState<Set<string>>(INITIALLY_CONNECTED);

  function toggle(id: string) {
    setConnected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const connectedList    = INTEGRATIONS.filter(i => connected.has(i.id));
  const notConnectedList = INTEGRATIONS.filter(i => !connected.has(i.id));

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader icon={Plug} title="Integrations" description="Connect Rally to the tools your team already uses." />

        {connectedList.length > 0 && (
          <SettingCard label={`Connected — ${connectedList.length}`}>
            {connectedList.map(intg => (
              <SettingRow key={intg.id}
                label={intg.label}
                description={`Authorized & active`}>
                <div className="flex items-center gap-2.5">
                  {/* Service badge */}
                  <div className="w-7 h-7 rounded-[7px] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                    style={{ background: intg.color }}>
                    {intg.initials}
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--success-soft)", color: "var(--success-on)" }}>
                    Connected
                  </span>
                  <button onClick={() => toggle(intg.id)}
                    className="text-[12px] px-2.5 py-1 rounded-[7px] border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    Disconnect
                  </button>
                </div>
              </SettingRow>
            ))}
          </SettingCard>
        )}

        {notConnectedList.length > 0 && (
          <SettingCard label="Available">
            {notConnectedList.map(intg => (
              <SettingRow key={intg.id} label={intg.label} description={intg.desc}>
                <div className="flex items-center gap-2.5">
                  {/* Service badge */}
                  <div className="w-7 h-7 rounded-[7px] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                    style={{ background: intg.color === "#000000" ? "#374151" : intg.color }}>
                    {intg.initials}
                  </div>
                  <button onClick={() => toggle(intg.id)}
                    className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-[12px] font-medium">
                    <Plus className="size-3.5" /> Connect
                  </button>
                </div>
              </SettingRow>
            ))}
          </SettingCard>
        )}

        <div className="flex items-start gap-3 px-4 py-3.5 rounded-[10px] border border-border bg-muted/30">
          <Lock className="size-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            All integrations authenticate via <strong className="text-foreground">OAuth 2.0</strong>. Rally never stores passwords or raw credentials — only scoped access tokens that can be revoked at any time.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Danger Zone
// ─────────────────────────────────────────────────────────────────────────────

function DangerZone({ teamName }: { teamName: string }) {
  const [confirmDelete,   setConfirmDelete]   = useState(false);
  const [confirmTransfer, setConfirmTransfer] = useState(false);
  const [deleteInput,     setDeleteInput]     = useState("");

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          icon={AlertTriangle}
          title="Danger Zone"
          description="Irreversible actions that affect the entire workspace. Proceed with extreme caution."
          iconColor="#d90000"
        />

        <div className="space-y-4">
          {/* Transfer ownership */}
          <div className="rounded-[12px] border border-border bg-card p-5"
            style={{ boxShadow: "var(--shadow-sm)" }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--warning-soft)" }}>
                  <ArrowRightLeft className="size-4" style={{ color: "var(--warning-on)" }} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground">Transfer Ownership</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed">
                    Assign owner rights to another admin. Your role will become Admin.
                  </p>
                </div>
              </div>
              <button onClick={() => setConfirmTransfer(v => !v)}
                className="flex-shrink-0 h-8 px-3.5 rounded-[8px] border border-border text-[12px] font-medium text-foreground hover:bg-muted transition-colors">
                Transfer
              </button>
            </div>

            {confirmTransfer && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-[12px] text-muted-foreground mb-2">Select a new owner from current admins:</p>
                <select className="w-full h-9 px-3 rounded-[8px] border border-border bg-background text-[13px] text-foreground outline-none mb-3">
                  <option>Sarah Johnson (Admin)</option>
                </select>
                <div className="flex gap-2">
                  <button onClick={() => setConfirmTransfer(false)}
                    className="h-8 px-3.5 rounded-[8px] border border-border text-[12px] text-muted-foreground hover:bg-muted transition-colors">
                    Cancel
                  </button>
                  <button className="h-8 px-3.5 rounded-[8px] text-white text-[12px] font-medium hover:opacity-90 transition-opacity"
                    style={{ background: "var(--rally-brand)" }}>
                    Confirm Transfer
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Delete workspace */}
          <div className="rounded-[12px] border p-5"
            style={{ borderColor: "var(--error-solid)", background: "var(--error-soft)", boxShadow: "var(--shadow-sm)" }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0"
                  style={{ background: "#d9000020" }}>
                  <AlertTriangle className="size-4" style={{ color: "var(--error-on)" }} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: "var(--error-on)" }}>Delete Workspace</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed">
                    Permanently delete <strong className="text-foreground">{teamName}</strong> and all its data, including tasks, messages, files, and events. <strong className="text-foreground">This cannot be undone.</strong>
                  </p>
                </div>
              </div>
              <button onClick={() => setConfirmDelete(v => !v)}
                className="flex-shrink-0 h-8 px-3.5 rounded-[8px] text-white text-[12px] font-medium hover:opacity-90 transition-opacity"
                style={{ background: "var(--error-solid)" }}>
                Delete
              </button>
            </div>

            {confirmDelete && (
              <div className="mt-4 pt-4 border-t border-[var(--error-solid)]/30">
                <p className="text-[12px] mb-2" style={{ color: "var(--error-on)" }}>
                  Type <span className="font-bold">{teamName}</span> to confirm:
                </p>
                <input value={deleteInput} onChange={e => setDeleteInput(e.target.value)}
                  placeholder={teamName}
                  className="w-full h-9 px-3 rounded-[8px] text-[13px] text-foreground outline-none mb-3"
                  style={{ background: "var(--elevated)", border: "1px solid var(--error-solid)" }} />
                <div className="flex gap-2">
                  <button onClick={() => { setConfirmDelete(false); setDeleteInput(""); }}
                    className="h-8 px-3.5 rounded-[8px] border border-border text-[12px] text-muted-foreground hover:bg-muted/50 transition-colors">
                    Cancel
                  </button>
                  <button disabled={deleteInput !== teamName}
                    className="h-8 px-3.5 rounded-[8px] text-white text-[12px] font-medium transition-opacity"
                    style={{
                      background: "var(--error-solid)",
                      opacity:    deleteInput === teamName ? 1 : 0.35,
                      cursor:     deleteInput === teamName ? "pointer" : "not-allowed",
                    }}>
                    Permanently delete workspace
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Invite Modal
// ─────────────────────────────────────────────────────────────────────────────

function InviteModal({ open, onClose, canInviteAdmins }: {
  open: boolean; onClose: () => void; canInviteAdmins: boolean;
}) {
  const [email,   setEmail]   = useState("");
  const [role,    setRole]    = useState<UserRole>("member");
  const [message, setMessage] = useState("");
  const [sent,    setSent]    = useState(false);

  if (!open) return null;

  function handleSend() {
    if (!email.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setEmail(""); setMessage(""); onClose(); }, 1600);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-[16px] shadow-2xl w-full max-w-[360px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <div className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--rally-brand-soft)" }}>
            <UserPlus className="size-4" style={{ color: "var(--rally-brand)" }} />
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-semibold text-foreground">Invite to workspace</p>
            <p className="text-[11px] text-muted-foreground">Send an email invitation</p>
          </div>
          <button onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground transition-colors">
            <X className="size-4" />
          </button>
        </div>

        {/* Form */}
        <div className="px-5 py-4 space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-foreground mb-1.5">Email address</label>
            <input value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="name@company.com" autoFocus
              className="w-full h-9 px-3 rounded-[8px] border border-border bg-background text-[13px] text-foreground outline-none focus:border-[var(--rally-brand)] transition-colors" />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-foreground mb-1.5">Role</label>
            <select value={role} onChange={e => setRole(e.target.value as UserRole)}
              className="w-full h-9 px-3 rounded-[8px] border border-border bg-background text-[13px] text-foreground outline-none focus:border-[var(--rally-brand)] transition-colors">
              {canInviteAdmins && <option value="admin">Admin — manage members & settings</option>}
              <option value="member">Member — full create/edit access</option>
              <option value="viewer">Viewer — read-only access</option>
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-foreground mb-1.5">
              Message <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <textarea value={message} onChange={e => setMessage(e.target.value)}
              rows={2} placeholder="Add a personal note to the invitation…"
              className="w-full px-3 py-2 rounded-[8px] border border-border bg-background text-[13px] text-foreground outline-none resize-none focus:border-[var(--rally-brand)] transition-colors" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2.5 px-5 py-4 border-t border-border bg-muted/20">
          <button onClick={onClose}
            className="flex-1 h-9 rounded-[8px] border border-border text-muted-foreground hover:bg-muted text-[13px] transition-colors">
            Cancel
          </button>
          <button onClick={handleSend}
            className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-[8px] text-white text-[13px] font-medium transition-all hover:opacity-90"
            style={{ background: sent ? "var(--success-solid)" : "var(--rally-brand)" }}>
            {sent
              ? <><Check className="size-4" /> Invite sent!</>
              : <><Mail className="size-4" /> Send invite</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export function TeamV2() {
  const { user, userRole, currentTeam } = useAuth();
  const role: UserRole = userRole ?? "viewer";

  const teamName    = currentTeam?.name        ?? "Rally Labs";
  const projectName = currentTeam?.projectName ?? "Rally — All-in-One Workspace";
  const teamDesc    = currentTeam?.description ?? "Building the ultimate team collaboration platform. We design, build, and ship together.";

  const [section,        setSection]        = useState<NavSection>("overview");
  const [members,        setMembers]        = useState<MockMember[]>(MOCK_MEMBERS);
  const [selectedMember, setSelectedMember] = useState<MockMember | null>(null);
  const [inviteOpen,     setInviteOpen]     = useState(false);
  const [teamNameState,  setTeamNameState]  = useState(teamName);
  const [projectState,   setProjectState]   = useState(projectName);
  const [teamDescState,  setTeamDescState]  = useState(teamDesc);
  const [invites]                           = useState(MOCK_INVITES);

  const isOwner   = role === "owner";
  const isAdmin   = role === "admin";
  const canManage = isOwner || isAdmin;

  function handleRoleChange(userId: string, newRole: UserRole) {
    setMembers(prev => prev.map(m => m.userId === userId ? { ...m, role: newRole } : m));
    setSelectedMember(m => m?.userId === userId ? { ...m, role: newRole } : m);
  }

  function handleSaveSettings(name: string, project: string, desc: string) {
    setTeamNameState(name);
    setProjectState(project);
    setTeamDescState(desc);
  }

  function navigate(s: NavSection) {
    setSection(s);
    setSelectedMember(null);
  }

  return (
    <div className="h-full flex flex-col overflow-hidden bg-background">
      <div className="flex-1 overflow-hidden flex">
        {/* Sidebar */}
        <LeftRail
          section={section}
          onSection={navigate}
          teamName={teamNameState}
          userRole={role}
          isOwner={isOwner}
        />

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {section === "overview" && (
            <OverviewView
              members={members} userRole={role} user={user}
              teamName={teamNameState} projectName={projectState}
              teamDescription={teamDescState}
              onNav={navigate} invites={invites}
            />
          )}
          {section === "members" && (
            <MembersView
              members={members}
              selectedId={selectedMember?.userId ?? null}
              onSelect={m => setSelectedMember(prev => prev?.userId === m.userId ? null : m)}
              canManage={canManage}
              currentUserName={user?.name ?? ""}
              onInvite={() => setInviteOpen(true)}
              onRoleChange={handleRoleChange}
            />
          )}
          {section === "workspace" && (
            <WorkspaceView
              teamName={teamNameState} projectName={projectState}
              description={teamDescState}
              onSave={handleSaveSettings}
              canEdit={isOwner}
            />
          )}
          {section === "permissions"   && <PermissionsView userRole={role} />}
          {section === "notifications" && <NotificationsView />}
          {section === "appearance"    && <AppearanceView />}
          {section === "ai"            && <AISettingsView canEdit={canManage} />}
          {section === "integrations"  && <IntegrationsView />}
          {section === "danger" && isOwner && <DangerZone teamName={teamNameState} />}
        </div>

        {/* Member detail side panel */}
        {selectedMember && (section === "overview" || section === "members") && (
          <MemberDetailPanel
            key={selectedMember.userId}
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
            canManage={canManage}
            onRoleChange={handleRoleChange}
          />
        )}
      </div>

      <InviteModal
        open={inviteOpen && canManage}
        onClose={() => setInviteOpen(false)}
        canInviteAdmins={isOwner}
      />
    </div>
  );
}

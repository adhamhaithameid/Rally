import { useState } from "react";
import {
  Users, Crown, Shield, UserCheck, Eye, Plus, Search, Copy, Check,
  ChevronRight, MoreHorizontal, X, Settings, Lock, AlertTriangle,
  UserPlus, Mail, Clock, Activity, Home, Edit2, Trash2,
  ShieldCheck, UserMinus, RefreshCw, ArrowUpRight, ChevronDown,
} from "lucide-react";
import { useAuth, type UserRole } from "../contexts/AuthContext";

// ── Types ─────────────────────────────────────────────────────────────────────

type NavSection  = "home" | "members" | "settings" | "permissions" | "danger";
type OnlineStatus = "online" | "away" | "offline";

interface MockMember {
  userId: string; name: string; email: string;
  role: UserRole; joinedAt: string;
}

// ── Config ────────────────────────────────────────────────────────────────────

const ROLE_CFG: Record<UserRole, { label: string; color: string; bg: string; Icon: React.ElementType }> = {
  owner:  { label: "Owner",  color: "var(--rally-brand-on)", bg: "var(--rally-brand-soft)", Icon: Crown     },
  admin:  { label: "Admin",  color: "var(--info-on)",        bg: "var(--info-soft)",        Icon: Shield    },
  member: { label: "Member", color: "var(--success-on)",     bg: "var(--success-soft)",     Icon: UserCheck },
  viewer: { label: "Viewer", color: "var(--neutral-on)",     bg: "var(--neutral-soft)",     Icon: Eye       },
};

const STATUS_CFG: Record<OnlineStatus, { label: string; color: string }> = {
  online:  { label: "Online",  color: "var(--status-active)"   },
  away:    { label: "Away",    color: "var(--status-limited)"  },
  offline: { label: "Offline", color: "var(--status-disabled)" },
};

const ROLE_ORDER: UserRole[] = ["owner", "admin", "member", "viewer"];

// ── Mock data ─────────────────────────────────────────────────────────────────

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
  { id: "r2", text: "Alex Rivera's role changed to Viewer",   time: "Yesterday",  color: "var(--info-solid)" },
  { id: "r3", text: "Invite sent to david@example.com",       time: "2 days ago", color: "var(--rally-brand)" },
  { id: "r4", text: "Sarah Johnson promoted to Admin",        time: "3 days ago", color: "var(--info-solid)" },
  { id: "r5", text: "Team description updated",               time: "1 week ago", color: "var(--text-tertiary)" },
];

const MOCK_INVITES = [
  { id: "inv-1", email: "david@example.com", role: "member" as UserRole, sentAt: "1 day ago",  expiresIn: "6 days" },
  { id: "inv-2", email: "nina@example.com",  role: "member" as UserRole, sentAt: "3 days ago", expiresIn: "4 days" },
];

const ROLE_CAPS: Record<UserRole, { can: string[]; cannot: string[] }> = {
  owner: {
    can:    ["Manage all members & roles", "Edit team settings & description", "Delete team", "Manage calendars & channels", "Full create / edit / delete access"],
    cannot: [],
  },
  admin: {
    can:    ["Invite & manage members", "Manage calendars & channels", "Full create & edit access", "View team settings"],
    cannot: ["Edit team name or description", "Delete team", "Promote or demote other admins"],
  },
  member: {
    can:    ["Create tasks, events & messages", "Upload & manage files", "Use AI Chat", "View all team members"],
    cannot: ["Invite or remove members", "Change member roles", "Manage team settings or channels"],
  },
  viewer: {
    can:    ["View all workspace content", "View team members & roles"],
    cannot: ["Create or edit tasks, events, messages", "Upload files", "Invite or manage members"],
  },
};

const PERMISSION_GROUPS = [
  { group: "Access", rows: [
    { label: "View workspace",        owner: true,  admin: true,  member: true,  viewer: true  },
    { label: "View team members",     owner: true,  admin: true,  member: true,  viewer: true  },
  ]},
  { group: "Work", rows: [
    { label: "Chat & messaging",      owner: true,  admin: true,  member: true,  viewer: false },
    { label: "AI Chat",               owner: true,  admin: true,  member: true,  viewer: false },
    { label: "Create & edit tasks",   owner: true,  admin: true,  member: true,  viewer: false },
    { label: "Create calendar events",owner: true,  admin: true,  member: true,  viewer: false },
    { label: "Upload & manage files", owner: true,  admin: true,  member: true,  viewer: false },
  ]},
  { group: "Management", rows: [
    { label: "Invite members",        owner: true,  admin: true,  member: false, viewer: false },
    { label: "Change member roles",   owner: true,  admin: true,  member: false, viewer: false },
    { label: "Remove members",        owner: true,  admin: true,  member: false, viewer: false },
    { label: "Manage calendar lists", owner: true,  admin: true,  member: false, viewer: false },
    { label: "Manage chat channels",  owner: true,  admin: true,  member: false, viewer: false },
  ]},
  { group: "Owner Only", rows: [
    { label: "Edit team settings",    owner: true,  admin: false, member: false, viewer: false },
    { label: "Transfer ownership",    owner: true,  admin: false, member: false, viewer: false },
    { label: "Delete team",           owner: true,  admin: false, member: false, viewer: false },
  ]},
];

// ── Helpers ───────────────────────────────────────────────────────────────────

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
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${size === "xs" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[10px]"}`}
      style={{ background: cfg.bg, color: cfg.color }}>
      <Icon className={size === "xs" ? "size-2" : "size-2.5"} />
      {cfg.label}
    </span>
  );
}

function StatusDot({ status, showLabel = false }: { status: OnlineStatus; showLabel?: boolean }) {
  const cfg = STATUS_CFG[status];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
      {showLabel && <span className="text-[11px]" style={{ color: cfg.color }}>{cfg.label}</span>}
    </span>
  );
}

function joinedLabel(joinedAt: string): string {
  const d = new Date(joinedAt + "T00:00:00");
  const today = new Date("2026-04-21");
  const days = Math.round((today.getTime() - d.getTime()) / 86400000);
  if (days <= 3) return "Just joined";
  if (days <= 7) return "Joined this week";
  if (days <= 30) return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function isRecentJoin(joinedAt: string): boolean {
  const d = new Date(joinedAt + "T00:00:00");
  const today = new Date("2026-04-21");
  return (today.getTime() - d.getTime()) / 86400000 <= 7;
}

// ── Left Rail ─────────────────────────────────────────────────────────────────

function LeftRail({
  section, onSection, isOwner, isAdmin,
}: {
  section: NavSection; onSection: (s: NavSection) => void;
  isOwner: boolean; isAdmin: boolean;
}) {
  const canManage = isOwner || isAdmin;
  const items: { id: NavSection; label: string; icon: React.ElementType; ownerOnly?: boolean; danger?: boolean }[] = [
    { id: "home",        label: "Team Home",    icon: Home          },
    { id: "members",     label: "Members",      icon: Users         },
    { id: "settings",    label: "Settings",     icon: Settings      },
    { id: "permissions", label: "Permissions",  icon: Lock          },
    { id: "danger",      label: "Danger Zone",  icon: AlertTriangle, ownerOnly: true, danger: true },
  ];

  return (
    <div className="w-44 flex-shrink-0 border-r border-border bg-card flex flex-col overflow-y-auto hidden lg:flex">
      <div className="px-2 pt-3 pb-2 space-y-0.5">
        {items.map(item => {
          if (item.ownerOnly && !isOwner) return null;
          const Icon = item.icon;
          const active = section === item.id;
          return (
            <button key={item.id} onClick={() => onSection(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-left text-[12px] transition-colors ${
                active
                  ? item.danger ? "font-medium" : "font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              style={active
                ? item.danger
                  ? { background: "var(--error-soft)", color: "var(--error-on)" }
                  : { background: "var(--rally-brand-soft)", color: "var(--rally-brand-on)" }
                : {}}>
              <Icon className="size-4 flex-shrink-0" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Member Row ────────────────────────────────────────────────────────────────

function MemberRow({
  member, index, selected, onSelect, canManage, isCurrentUser, onRoleChange,
}: {
  member: MockMember; index: number; selected: boolean;
  onSelect: () => void; canManage: boolean; isCurrentUser: boolean;
  onRoleChange: (userId: string, role: UserRole) => void;
}) {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [rolePickerOpen, setRolePickerOpen] = useState(false);
  const status = MOCK_STATUSES[member.userId] ?? "offline";
  const recent = isRecentJoin(member.joinedAt);

  return (
    <div onClick={onSelect}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] border cursor-pointer group transition-all ${
        selected ? "border-[var(--rally-brand)] bg-[var(--rally-brand-soft)]" : "border-border bg-card hover:bg-muted/30 hover:border-[var(--border)]"
      }`}>
      {/* Avatar + status */}
      <div className="relative flex-shrink-0">
        <Av name={member.name} size={34} />
        <StatusDot status={status}
          {...undefined}
          // positioned bottom-right of avatar
        />
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card"
          style={{ background: STATUS_CFG[status].color }} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-foreground truncate">{member.name}</span>
          {isCurrentUser && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground flex-shrink-0">You</span>
          )}
          {recent && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{ background: "var(--success-soft-light)", color: "var(--success-solid)" }}>New</span>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground truncate">{member.email}</p>
      </div>

      {/* Role */}
      <RoleBadge role={member.role} />

      {/* Status label */}
      <StatusDot status={status} showLabel />

      {/* Joined */}
      <span className="text-[10px] text-muted-foreground hidden md:block flex-shrink-0 w-24 text-right">
        {joinedLabel(member.joinedAt)}
      </span>

      {/* Actions */}
      {canManage && !isCurrentUser && (
        <div className="relative flex-shrink-0">
          <button onClick={e => { e.stopPropagation(); setMenuOpen(v => !v); }}
            className="w-6 h-6 flex items-center justify-center rounded-[6px] opacity-0 group-hover:opacity-100 hover:bg-muted transition-all text-muted-foreground">
            <MoreHorizontal className="size-3.5" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={e => { e.stopPropagation(); setMenuOpen(false); }} />
              <div className="absolute right-0 top-7 z-40 bg-card border border-border rounded-[10px] shadow-lg overflow-hidden w-40 py-1">
                <button onClick={e => { e.stopPropagation(); setMenuOpen(false); setRolePickerOpen(true); onSelect(); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-foreground hover:bg-muted transition-colors">
                  <Shield className="size-3.5" /> Change role
                </button>
                <div className="h-px bg-border mx-2 my-0.5" />
                <button onClick={e => { e.stopPropagation(); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[12px] transition-colors hover:bg-muted"
                  style={{ color: "var(--error-on-light)" }}>
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

// ── Member Detail Panel ───────────────────────────────────────────────────────

function MemberDetailPanel({
  member, onClose, canManage, currentUserRole, onRoleChange,
}: {
  member: MockMember; onClose: () => void;
  canManage: boolean; currentUserRole: UserRole;
  onRoleChange: (userId: string, role: UserRole) => void;
}) {
  const [showRolePicker, setShowRolePicker] = useState(false);
  const [confirmRemove,  setConfirmRemove]  = useState(false);
  const status = MOCK_STATUSES[member.userId] ?? "offline";
  const recent = isRecentJoin(member.joinedAt);
  const caps   = ROLE_CAPS[member.role];

  const mockActivity = [
    { label: "Last active",      value: status === "online" ? "Now" : status === "away" ? "15m ago" : "2h ago" },
    { label: "Last task",        value: "Review mobile header" },
    { label: "Last message",     value: `Sent in #${member.role === "viewer" ? "general" : "design"}` },
    { label: "Files accessed",   value: "3 this week" },
  ];

  return (
    <aside className="h-full flex flex-col bg-card border-l border-border" style={{ width: 288, flexShrink: 0 }}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)]">
        <span className="flex-1 text-[12px] font-medium text-muted-foreground">Member details</span>
        <button onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground transition-colors">
          <X className="size-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {/* Avatar + identity */}
        <div className="flex flex-col items-center text-center pt-2">
          <div className="relative mb-3">
            <Av name={member.name} size={64} />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card"
              style={{ background: STATUS_CFG[status].color }} />
          </div>
          <p className="text-[15px] font-medium text-foreground">{member.name}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{member.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <RoleBadge role={member.role} />
            <StatusDot status={status} showLabel />
          </div>
          {recent && (
            <span className="mt-2 text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: "var(--success-soft-light)", color: "var(--success-solid)" }}>
              Recently joined
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="space-y-2 text-[12px]">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="size-3.5 flex-shrink-0" />
            <span className="truncate">{member.email}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="size-3.5 flex-shrink-0" />
            <span>Joined {joinedLabel(member.joinedAt)}</span>
          </div>
        </div>

        {/* What they can do */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--text-overline)" }}>Access</p>
          <div className="space-y-1.5">
            {caps.can.map(item => (
              <div key={item} className="flex items-start gap-2">
                <Check className="size-3.5 flex-shrink-0 mt-0.5" style={{ color: "var(--success-solid)" }} />
                <span className="text-[11px] text-foreground">{item}</span>
              </div>
            ))}
            {caps.cannot.map(item => (
              <div key={item} className="flex items-start gap-2">
                <X className="size-3.5 flex-shrink-0 mt-0.5 text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--text-overline)" }}>Recent Activity</p>
          <div className="space-y-2">
            {mockActivity.map(a => (
              <div key={a.label} className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">{a.label}</span>
                <span className="text-[11px] text-foreground">{a.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Role picker */}
        {canManage && showRolePicker && (
          <div className="rounded-[10px] border border-border p-3">
            <p className="text-[11px] font-medium text-foreground mb-2">Change role to:</p>
            <div className="space-y-1.5">
              {ROLE_ORDER.filter(r => r !== "owner").map(r => (
                <button key={r} onClick={() => { onRoleChange(member.userId, r); setShowRolePicker(false); }}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-[7px] border text-left transition-colors ${
                    member.role === r ? "border-[var(--rally-brand)] bg-[var(--rally-brand-soft)]" : "border-border hover:bg-muted"
                  }`}>
                  <RoleBadge role={r} size="xs" />
                  <span className="text-[12px] text-foreground flex-1">{ROLE_CFG[r].label}</span>
                  {member.role === r && <Check className="size-3.5 text-[var(--rally-brand)]" />}
                </button>
              ))}
            </div>
            <button onClick={() => setShowRolePicker(false)}
              className="mt-2 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      {canManage && (
        <div className="flex-shrink-0 border-t border-[var(--border-subtle)] px-4 py-3 flex gap-2">
          {!showRolePicker && (
            <button onClick={() => setShowRolePicker(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[8px] border border-border bg-background text-foreground text-[12px] hover:bg-muted transition-colors">
              <Shield className="size-3.5" /> Change Role
            </button>
          )}
          {!confirmRemove ? (
            <button onClick={() => setConfirmRemove(true)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-[8px] border border-border bg-background text-[12px] transition-colors hover:bg-muted"
              style={{ color: "var(--error-on-light)" }}>
              <UserMinus className="size-3.5" />
            </button>
          ) : (
            <button onClick={() => setConfirmRemove(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[8px] bg-red-500 text-white text-[12px] transition-colors hover:bg-red-600">
              Confirm Remove
            </button>
          )}
        </div>
      )}
    </aside>
  );
}

// ── Team Home ─────────────────────────────────────────────────────────────────

function TeamHome({
  members, userRole, user, teamName, projectName, teamDescription,
  onInvite, onNav, invites, onCopyLink, copied,
}: {
  members: MockMember[]; userRole: UserRole; user: { name: string } | null;
  teamName: string; projectName: string; teamDescription: string;
  onInvite: () => void; onNav: (s: NavSection) => void;
  invites: typeof MOCK_INVITES; onCopyLink: () => void; copied: boolean;
}) {
  const isOwner   = userRole === "owner";
  const isAdmin   = userRole === "admin";
  const canManage = isOwner || isAdmin;

  const roleCounts = ROLE_ORDER.reduce((acc, r) => {
    acc[r] = members.filter(m => m.role === r).length;
    return acc;
  }, {} as Record<UserRole, number>);

  const onlineCount = members.filter(m => MOCK_STATUSES[m.userId] === "online").length;
  const caps = ROLE_CAPS[userRole];

  const quickActions = canManage
    ? [
        { label: "Invite Member",  icon: UserPlus,  action: onInvite,                    primary: true },
        { label: "Manage Members", icon: Users,     action: () => onNav("members"),       primary: false },
        { label: "Permissions",    icon: Lock,      action: () => onNav("permissions"),   primary: false },
        ...(isOwner ? [{ label: "Team Settings", icon: Settings, action: () => onNav("settings"), primary: false }] : []),
        { label: "Copy Invite Link", icon: copied ? Check : Copy, action: onCopyLink, primary: false },
      ]
    : userRole === "member"
    ? [
        { label: "View Members",   icon: Users,     action: () => onNav("members"),     primary: false },
        { label: "My Access",      icon: ShieldCheck, action: () => onNav("permissions"), primary: false },
        { label: "Copy Invite Link", icon: copied ? Check : Copy, action: onCopyLink, primary: false },
      ]
    : [
        { label: "View Members",   icon: Users,     action: () => onNav("members"),     primary: false },
        { label: "My Access",      icon: ShieldCheck, action: () => onNav("permissions"), primary: false },
      ];

  return (
    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
      {/* Team identity card */}
      <div className="rounded-[14px] border border-border bg-card p-5">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="w-14 h-14 rounded-[14px] flex items-center justify-center flex-shrink-0 text-white text-[22px] font-medium"
            style={{ background: "var(--rally-brand)" }}>
            {teamName.charAt(0).toUpperCase()}
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[18px] font-medium text-foreground">{teamName}</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Workspace</span>
            </div>
            <p className="text-[12px] text-muted-foreground mt-0.5">{projectName}</p>
            <p className="text-[12px] text-foreground mt-2 leading-relaxed max-w-lg">{teamDescription}</p>
          </div>
          {/* Role badge */}
          <div className="flex-shrink-0">
            <RoleBadge role={userRole} />
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-5 mt-4 pt-4 border-t border-[var(--border-subtle)] flex-wrap">
          <div>
            <span className="text-[20px] font-medium text-foreground">{members.length}</span>
            <span className="text-[11px] text-muted-foreground ml-1">members</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--success-solid)" }} />
            <span className="text-[12px] text-muted-foreground">{onlineCount} online</span>
          </div>
          {ROLE_ORDER.map(r => roleCounts[r] > 0 && (
            <div key={r} className="flex items-center gap-1.5">
              <RoleBadge role={r} size="xs" />
              <span className="text-[11px] text-muted-foreground">×{roleCounts[r]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 flex-wrap">
        {quickActions.map((a, i) => {
          const Icon = a.icon;
          return (
            <button key={i} onClick={a.action}
              className={`flex items-center gap-1.5 h-8 px-3 rounded-[8px] text-[12px] font-medium transition-colors flex-shrink-0 ${
                a.primary ? "text-white" : "border border-border bg-background text-foreground hover:bg-muted"
              }`}
              style={a.primary ? { background: "var(--rally-brand)" } : {}}>
              <Icon className="size-3.5" />
              {a.label}
            </button>
          );
        })}
      </div>

      {/* Members overview */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[12px] font-medium text-foreground">Team Members</h3>
          <button onClick={() => onNav("members")}
            className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
            View all <ChevronRight className="size-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {members.map((m, i) => {
            const status = MOCK_STATUSES[m.userId] ?? "offline";
            return (
              <div key={m.userId}
                className="flex items-center gap-2.5 px-3 py-3 rounded-[10px] border border-border bg-card hover:bg-muted/30 transition-colors cursor-default">
                <div className="relative flex-shrink-0">
                  <Av name={m.name} size={32} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card"
                    style={{ background: STATUS_CFG[status].color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-[12px] text-foreground truncate">{m.name}</p>
                    {m.name === user?.name && (
                      <span className="text-[8px] text-muted-foreground">(you)</span>
                    )}
                  </div>
                  <RoleBadge role={m.role} size="xs" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* My role & access */}
      <section>
        <h3 className="text-[12px] font-medium text-foreground mb-3">My Role & Access</h3>
        <div className="rounded-[12px] border border-border bg-card p-4">
          <div className="flex items-center gap-3 mb-4">
            <Av name={user?.name ?? "You"} size={36} />
            <div>
              <p className="text-[13px] font-medium text-foreground">{user?.name ?? "You"}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <RoleBadge role={userRole} />
                <span className="text-[10px] text-muted-foreground">in {teamName}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {caps.can.length > 0 && (
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-overline)" }}>Can do</p>
                <div className="space-y-1.5">
                  {caps.can.map(item => (
                    <div key={item} className="flex items-start gap-2">
                      <Check className="size-3.5 flex-shrink-0 mt-0.5" style={{ color: "var(--success-solid)" }} />
                      <span className="text-[11px] text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {caps.cannot.length > 0 && (
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-overline)" }}>Cannot do</p>
                <div className="space-y-1.5">
                  {caps.cannot.map(item => (
                    <div key={item} className="flex items-start gap-2">
                      <X className="size-3.5 flex-shrink-0 mt-0.5 text-muted-foreground" />
                      <span className="text-[11px] text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pending invites — admin/owner only */}
      {canManage && invites.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[12px] font-medium text-foreground">Pending Invites</h3>
            <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{invites.length}</span>
          </div>
          <div className="space-y-1.5">
            {invites.map(inv => (
              <div key={inv.id} className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] border border-border bg-card">
                <Mail className="size-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-foreground truncate">{inv.email}</p>
                  <p className="text-[10px] text-muted-foreground">Sent {inv.sentAt} · Expires in {inv.expiresIn}</p>
                </div>
                <RoleBadge role={inv.role} size="xs" />
                <button className="text-[10px] text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
                  Resend
                </button>
              </div>
            ))}
            <button onClick={onInvite}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-[10px] border border-dashed border-border text-muted-foreground hover:border-[var(--rally-brand)] hover:text-[var(--rally-brand)] hover:bg-[var(--rally-brand-200)] transition-colors text-[11px]">
              <Plus className="size-3.5" /> Send new invite
            </button>
          </div>
        </section>
      )}

      {/* Recent team changes */}
      <section>
        <h3 className="text-[12px] font-medium text-foreground mb-3">Recent Team Changes</h3>
        <div className="rounded-[12px] border border-border bg-card overflow-hidden divide-y divide-border">
          {RECENT_CHANGES.map(c => (
            <div key={c.id} className="flex items-center gap-3 px-4 py-3">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
              <p className="flex-1 text-[12px] text-foreground">{c.text}</p>
              <span className="text-[10px] text-muted-foreground flex-shrink-0">{c.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Members View ──────────────────────────────────────────────────────────────

function MembersView({
  members, selectedId, onSelect, canManage, currentUserName, onInvite,
  onRoleChange,
}: {
  members: MockMember[]; selectedId: string | null;
  onSelect: (m: MockMember) => void; canManage: boolean;
  currentUserName: string; onInvite: () => void;
  onRoleChange: (userId: string, role: UserRole) => void;
}) {
  const [search,     setSearch]     = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");

  const filtered = members.filter(m => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = roleFilter === "all" || m.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex-shrink-0 px-5 py-3 border-b border-border flex items-center gap-2 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search members…"
            className="pl-8 pr-3 h-8 w-48 rounded-[8px] border border-border bg-background text-[12px] text-foreground placeholder:text-muted-foreground outline-none focus:border-[var(--rally-brand)] transition-colors" />
        </div>

        {/* Role filters */}
        <div className="flex gap-1">
          {(["all", ...ROLE_ORDER] as (UserRole | "all")[]).map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-2.5 py-1.5 rounded-[7px] text-[11px] transition-colors capitalize ${
                roleFilter === r ? "text-white font-medium" : "text-muted-foreground hover:bg-muted"
              }`}
              style={roleFilter === r ? { background: r === "all" ? "var(--neutral-solid)" : ROLE_CFG[r as UserRole].color } : {}}>
              {r === "all" ? "All" : ROLE_CFG[r as UserRole].label}
            </button>
          ))}
        </div>

        <div className="flex-1" />
        <span className="text-[11px] text-muted-foreground">{filtered.length} members</span>
        {canManage && (
          <button onClick={onInvite}
            className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] text-white text-[12px] font-medium"
            style={{ background: "var(--rally-brand)" }}>
            <UserPlus className="size-3.5" /> Invite
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1.5">
        {filtered.map((m, i) => (
          <MemberRow key={m.userId} member={m} index={i}
            selected={selectedId === m.userId}
            onSelect={() => onSelect(m)}
            canManage={canManage}
            isCurrentUser={m.name === currentUserName}
            onRoleChange={onRoleChange}
          />
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="size-10 text-muted-foreground opacity-30 mb-3" />
            <p className="text-[13px] text-muted-foreground">No members match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Settings View ─────────────────────────────────────────────────────────────

function SettingsView({
  teamName, projectName, description,
  onSave, canEdit,
}: {
  teamName: string; projectName: string; description: string;
  onSave: (name: string, project: string, desc: string) => void;
  canEdit: boolean;
}) {
  const [name,    setName]    = useState(teamName);
  const [project, setProject] = useState(projectName);
  const [desc,    setDesc]    = useState(description);
  const [saved,   setSaved]   = useState(false);

  function handleSave() {
    onSave(name, project, desc);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const fieldClass = `w-full px-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none transition-colors placeholder:text-muted-foreground ${
    canEdit ? "focus:border-[var(--rally-brand)]" : "opacity-60 cursor-not-allowed"
  }`;

  return (
    <div className="flex-1 overflow-y-auto px-5 py-6 max-w-xl">
      <h2 className="text-[14px] font-medium text-foreground mb-5">Team Settings</h2>

      <div className="space-y-5">
        {/* Team icon preview */}
        <div>
          <p className="text-[11px] font-medium text-muted-foreground mb-2">Team Icon</p>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-[14px] flex items-center justify-center text-white text-[22px] font-medium"
              style={{ background: "var(--rally-brand)" }}>
              {name.charAt(0).toUpperCase() || "?"}
            </div>
            {canEdit && (
              <button className="px-3 py-1.5 rounded-[7px] border border-border text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                Change icon
              </button>
            )}
          </div>
        </div>

        {/* Team name */}
        <div>
          <label className="block text-[11px] font-medium text-foreground mb-1.5">Team Name</label>
          <input value={name} onChange={e => setName(e.target.value)}
            disabled={!canEdit} className={fieldClass} placeholder="e.g. Rally Labs" />
        </div>

        {/* Project name */}
        <div>
          <label className="block text-[11px] font-medium text-foreground mb-1.5">Project Name</label>
          <input value={project} onChange={e => setProject(e.target.value)}
            disabled={!canEdit} className={fieldClass} placeholder="e.g. Rally — All-in-One Workspace" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[11px] font-medium text-foreground mb-1.5">Description</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)}
            disabled={!canEdit} rows={3} placeholder="Short description of what this team is building…"
            className={`${fieldClass} resize-none`} />
        </div>

        {canEdit ? (
          <button onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-[8px] text-white text-[12px] font-medium transition-colors"
            style={{ background: saved ? "var(--success-solid)" : "var(--rally-brand)" }}>
            {saved ? <><Check className="size-3.5" /> Saved</> : "Save Changes"}
          </button>
        ) : (
          <div className="flex items-center gap-2 p-3 rounded-[8px] bg-muted/50">
            <Lock className="size-3.5 text-muted-foreground" />
            <p className="text-[11px] text-muted-foreground">Only the team owner can edit these settings.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Permissions View ──────────────────────────────────────────────────────────

function PermissionsView({ userRole }: { userRole: UserRole }) {
  return (
    <div className="flex-1 overflow-y-auto px-5 py-6">
      <div className="max-w-3xl">
        <h2 className="text-[14px] font-medium text-foreground mb-1">Permissions</h2>
        <p className="text-[12px] text-muted-foreground mb-5">Role-based access control for Rally workspaces.</p>

        {/* Your current role callout */}
        <div className="mb-5 flex items-center gap-3 px-4 py-3 rounded-[10px] border"
          style={{ borderColor: `${ROLE_CFG[userRole].color}40`, background: ROLE_CFG[userRole].bg }}>
          <RoleBadge role={userRole} />
          <p className="text-[12px]" style={{ color: ROLE_CFG[userRole].color }}>
            Your current role in this workspace.
          </p>
        </div>

        {/* Role matrix table */}
        <div className="rounded-[12px] border border-border overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-5 bg-muted/60 border-b border-[var(--border-subtle)]">
            <div className="px-4 py-2.5 text-[11px] font-medium col-span-1" style={{ color: "var(--text-overline)" }}>Feature</div>
            {ROLE_ORDER.map(r => {
              const cfg = ROLE_CFG[r];
              const Icon = cfg.Icon;
              return (
                <div key={r} className={`px-3 py-2.5 text-center ${userRole === r ? "bg-card" : ""}`}>
                  <div className="flex flex-col items-center gap-1">
                    <Icon className="size-3.5" style={{ color: cfg.color }} />
                    <span className="text-[10px] font-medium" style={{ color: cfg.color }}>{cfg.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Groups */}
          {PERMISSION_GROUPS.map((group, gi) => (
            <div key={group.group}>
              {/* Group header */}
              <div className="grid grid-cols-5 bg-muted/30 border-t border-[var(--border-subtle)]">
                <div className="col-span-5 px-4 py-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "var(--text-overline)" }}>{group.group}</span>
                </div>
              </div>
              {/* Rows */}
              {group.rows.map((row, ri) => (
                <div key={row.label} className={`grid grid-cols-5 border-t border-border/50 hover:bg-muted/20 transition-colors ${ri % 2 === 0 ? "" : "bg-muted/10"}`}>
                  <div className="px-4 py-2.5 text-[12px] text-foreground">{row.label}</div>
                  {ROLE_ORDER.map(r => {
                    const has = row[r as keyof typeof row] as boolean;
                    return (
                      <div key={r} className={`px-3 py-2.5 flex items-center justify-center ${userRole === r ? "bg-card/60" : ""}`}>
                        {has
                          ? <Check className="size-3.5" style={{ color: "var(--success-solid)" }} />
                          : <X className="size-3.5 text-muted-foreground opacity-40" />}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Viewer note */}
        <div className="mt-4 flex items-start gap-2 px-3 py-3 rounded-[8px] bg-muted/40">
          <Eye className="size-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-muted-foreground">
            <strong className="text-foreground">Viewers</strong> can see all workspace content but cannot create, edit, or send anything. Viewer access per section is controlled by the workspace owner.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Danger Zone ───────────────────────────────────────────────────────────────

function DangerZone({ teamName }: { teamName: string }) {
  const [confirmDelete,   setConfirmDelete]   = useState(false);
  const [confirmTransfer, setConfirmTransfer] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto px-5 py-6">
      <div className="max-w-xl">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="size-4" style={{ color: "var(--error-on-light)" }} />
          <h2 className="text-[14px] font-medium" style={{ color: "var(--error-on-light)" }}>Danger Zone</h2>
        </div>
        <p className="text-[12px] text-muted-foreground mb-6">These actions are irreversible. Proceed with caution.</p>

        <div className="space-y-4">
          {/* Transfer ownership */}
          <div className="rounded-[12px] border border-border p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium text-foreground">Transfer Ownership</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Transfer owner rights to another admin. You will become an admin.
                </p>
              </div>
              <button onClick={() => setConfirmTransfer(v => !v)}
                className="flex-shrink-0 px-3 py-1.5 rounded-[7px] border border-border text-[11px] text-foreground hover:bg-muted transition-colors">
                Transfer
              </button>
            </div>
            {confirmTransfer && (
              <div className="mt-3 pt-3 border-t border-[var(--border-subtle)]">
                <p className="text-[11px] text-muted-foreground mb-2">Choose a new owner from your admins:</p>
                <select className="w-full px-3 py-2 rounded-[7px] border border-border bg-background text-[12px] text-foreground outline-none mb-2">
                  <option>Sarah Johnson (Admin)</option>
                </select>
                <div className="flex gap-2">
                  <button onClick={() => setConfirmTransfer(false)}
                    className="px-3 py-1.5 rounded-[7px] border border-border text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                    Cancel
                  </button>
                  <button className="px-3 py-1.5 rounded-[7px] text-white text-[11px] font-medium hover:opacity-90 transition-opacity" style={{ background: "var(--rally-brand)" }}>
                    Confirm Transfer
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Delete team */}
          <div className="rounded-[12px] border p-4" style={{ borderColor: "var(--error-solid)", background: "var(--error-soft-light)" }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium" style={{ color: "var(--error-on-light)" }}>Delete Team</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Permanently delete <strong className="text-foreground">{teamName}</strong> and all its data. This cannot be undone.
                </p>
              </div>
              <button onClick={() => setConfirmDelete(v => !v)}
                className="flex-shrink-0 px-3 py-1.5 rounded-[7px] text-white text-[11px] font-medium transition-all duration-[120ms] active:scale-[0.97]"
                style={{ background: "var(--error-solid)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--error-hover)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--error-solid)")}>
                Delete
              </button>
            </div>
            {confirmDelete && (
              <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--error-solid)" }}>
                <p className="text-[11px] mb-2" style={{ color: "var(--error-on-light)" }}>
                  Type <strong>{teamName}</strong> to confirm deletion:
                </p>
                <input placeholder={teamName}
                  className="w-full px-3 py-2 rounded-[7px] text-[12px] text-foreground outline-none mb-2"
                  style={{ background: "var(--elevated)", border: "1px solid var(--error-solid)" }} />
                <div className="flex gap-2">
                  <button onClick={() => setConfirmDelete(false)}
                    className="px-3 py-1.5 rounded-[7px] border border-border text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-[7px] text-white text-[11px] font-medium opacity-50 cursor-not-allowed"
                    style={{ background: "var(--error-solid)" }}>
                    Permanently Delete
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

// ── Invite Modal ──────────────────────────────────────────────────────────────

function InviteModal({ open, onClose, canInviteAdmins }: { open: boolean; onClose: () => void; canInviteAdmins: boolean }) {
  const [email,    setEmail]    = useState("");
  const [role,     setRole]     = useState<UserRole>("member");
  const [message,  setMessage]  = useState("");
  const [sent,     setSent]     = useState(false);

  if (!open) return null;

  function handleSend() {
    if (!email.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setEmail(""); setMessage(""); onClose(); }, 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-[16px] shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-[14px] font-medium text-foreground flex-1">Invite to workspace</h2>
            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground">
              <X className="size-4" />
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-foreground mb-1.5">Email address</label>
              <input value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="name@company.com" autoFocus
                className="w-full px-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-foreground mb-1.5">Role</label>
              <select value={role} onChange={e => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 rounded-[8px] border border-border bg-background text-[12px] text-foreground outline-none focus:border-[var(--rally-brand)] transition-colors">
                {canInviteAdmins && <option value="admin">Admin — can manage members & settings</option>}
                <option value="member">Member — full create/edit access</option>
                <option value="viewer">Viewer — read-only access</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-foreground mb-1.5">Message (optional)</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)}
                rows={2} placeholder="Add a personal note to your invite…"
                className="w-full px-3 py-2 rounded-[8px] border border-border bg-background text-[12px] text-foreground outline-none resize-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={onClose}
              className="px-4 py-2 rounded-[8px] border border-border text-muted-foreground hover:bg-muted text-[12px] transition-colors">
              Cancel
            </button>
            <button onClick={handleSend}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[8px] text-white text-[12px] font-medium transition-colors"
              style={{ background: sent ? "var(--success-solid)" : "var(--rally-brand)" }}>
              {sent ? <><Check className="size-3.5" /> Invite Sent!</> : <><Mail className="size-3.5" /> Send Invite</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function TeamV2() {
  const { user, userRole, currentTeam } = useAuth();
  const role: UserRole = userRole ?? "viewer";

  const teamName    = currentTeam?.name        ?? "Rally Labs";
  const projectName = currentTeam?.projectName ?? "Rally — All-in-One Workspace";
  const teamDesc    = currentTeam?.description ?? "Building the ultimate team collaboration platform. We design, build, and ship together.";

  const [section,       setSection]       = useState<NavSection>("home");
  const [members,       setMembers]       = useState<MockMember[]>(MOCK_MEMBERS);
  const [selectedMember, setSelectedMember] = useState<MockMember | null>(null);
  const [inviteOpen,    setInviteOpen]    = useState(false);
  const [copied,        setCopied]        = useState(false);
  const [teamNameState,  setTeamNameState]  = useState(teamName);
  const [projectNameState, setProjectState] = useState(projectName);
  const [teamDescState,  setTeamDescState]  = useState(teamDesc);
  const [invites,       setInvites]       = useState(MOCK_INVITES);

  const isOwner   = role === "owner";
  const isAdmin   = role === "admin";
  const canManage = isOwner || isAdmin;

  function copyLink() {
    navigator.clipboard.writeText(currentTeam?.inviteLink ?? "https://rally.app/invite/abc123").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleRoleChange(userId: string, newRole: UserRole) {
    setMembers(prev => prev.map(m => m.userId === userId ? { ...m, role: newRole } : m));
    if (selectedMember?.userId === userId) setSelectedMember(m => m ? { ...m, role: newRole } : m);
  }

  function handleSaveSettings(name: string, project: string, desc: string) {
    setTeamNameState(name);
    setProjectState(project);
    setTeamDescState(desc);
  }

  // Header search placeholder (non-functional, cosmetic)
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-full flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex-shrink-0 px-5 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-[15px] font-medium text-foreground truncate">{teamNameState}</h1>
              <span className="text-[11px] text-muted-foreground hidden sm:block">·</span>
              <span className="text-[11px] text-muted-foreground hidden sm:block truncate max-w-[200px]">{projectNameState}</span>
            </div>
          </div>

          {/* Search people */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search people…"
              className="pl-8 pr-3 h-8 w-40 rounded-[8px] border border-border bg-background text-[12px] text-foreground placeholder:text-muted-foreground outline-none focus:border-[var(--rally-brand)] transition-colors" />
          </div>

          {/* Copy invite link */}
          <button onClick={copyLink}
            className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] border border-border bg-background text-muted-foreground hover:bg-muted transition-colors text-[12px]">
            {copied ? <Check className="size-3.5" style={{ color: "var(--success-solid)" }} /> : <Copy className="size-3.5" />}
            {copied ? "Copied!" : "Copy invite link"}
          </button>

          {/* Invite button */}
          {canManage && (
            <button onClick={() => setInviteOpen(true)}
              className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] text-white text-[12px] font-medium"
              style={{ background: "var(--rally-brand)" }}>
              <UserPlus className="size-3.5" /> Invite
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left rail */}
        <LeftRail section={section} onSection={s => { setSection(s); setSelectedMember(null); }}
          isOwner={isOwner} isAdmin={isAdmin} />

        {/* Main content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {section === "home" && (
            <TeamHome
              members={members} userRole={role} user={user}
              teamName={teamNameState} projectName={projectNameState}
              teamDescription={teamDescState}
              onInvite={() => setInviteOpen(true)}
              onNav={s => setSection(s)}
              invites={invites}
              onCopyLink={copyLink} copied={copied}
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
          {section === "settings" && (
            <SettingsView
              teamName={teamNameState} projectName={projectNameState}
              description={teamDescState}
              onSave={handleSaveSettings}
              canEdit={isOwner}
            />
          )}
          {section === "permissions" && (
            <PermissionsView userRole={role} />
          )}
          {section === "danger" && isOwner && (
            <DangerZone teamName={teamNameState} />
          )}
        </div>

        {/* Member detail panel */}
        {selectedMember && (section === "home" || section === "members") && (
          <MemberDetailPanel
            key={selectedMember.userId}
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
            canManage={canManage}
            currentUserRole={role}
            onRoleChange={handleRoleChange}
          />
        )}
      </div>

      {/* Invite modal */}
      <InviteModal
        open={inviteOpen && canManage}
        onClose={() => setInviteOpen(false)}
        canInviteAdmins={isOwner}
      />
    </div>
  );
}

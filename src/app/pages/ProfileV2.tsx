import { useState } from "react";
import {
  User, Mail, Phone, Briefcase, Globe, Tag, LogOut, Trash2,
  Home, Settings, Users, Lock, Check, X, ChevronRight,
  Bell, Sun, Moon, Zap, Clock, MessageSquare, Bot,
  CheckSquare, Calendar, FileText, Bookmark, Star,
  Edit2, ShieldCheck, Wifi, Monitor, Smartphone,
  Volume2, VolumeX, AlertCircle, Eye, EyeOff,
} from "lucide-react";
import { useAuth, type UserRole } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router";

// ── Types ─────────────────────────────────────────────────────────────────────

type NavSection = "overview" | "preferences" | "teams" | "security";
type AvailabilityStatus = "online" | "away" | "dnd" | "offline";

// ── Config ────────────────────────────────────────────────────────────────────

const ROLE_CFG: Record<UserRole, { label: string; color: string; bg: string }> = {
  owner:  { label: "Owner",  color: "var(--rally-brand)",          bg: "var(--rally-brand-soft-light)" },
  admin:  { label: "Admin",  color: "#0f5fd7", bg: "#eef4ff" },
  member: { label: "Member", color: "#0f6a43", bg: "#eaf7f0" },
  viewer: { label: "Viewer", color: "#6b7280", bg: "#f3f4f6" },
};

const AVAILABILITY_CFG: Record<AvailabilityStatus, { label: string; color: string; desc: string }> = {
  online:  { label: "Online",          color: "#10B981", desc: "Visible to everyone" },
  away:    { label: "Away",            color: "#F59E0B", desc: "Stepped away" },
  dnd:     { label: "Do not disturb",  color: "#EF4444", desc: "Muted notifications" },
  offline: { label: "Appear offline",  color: "#9CA3AF", desc: "Hidden presence" },
};

const ROLE_CAPS: Record<UserRole, { can: string[]; cannot: string[] }> = {
  owner: {
    can:    ["Manage all members & roles", "Edit team settings", "Delete team", "Manage calendars & channels", "Full create / edit / delete"],
    cannot: [],
  },
  admin: {
    can:    ["Invite & manage members", "Manage calendars & channels", "Full create & edit access"],
    cannot: ["Edit team name or description", "Delete team", "Promote other admins"],
  },
  member: {
    can:    ["Create tasks, events & messages", "Upload & manage files", "Use AI Chat", "View all members"],
    cannot: ["Invite or remove members", "Change member roles", "Manage team settings"],
  },
  viewer: {
    can:    ["View all workspace content", "View team members & roles"],
    cannot: ["Create or edit anything", "Upload files", "Use AI Chat", "Invite or manage members"],
  },
};

// ── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_WORK_SNAPSHOT = {
  tasks: [
    { id: "t1", title: "Review mobile header spec",     due: "Today",     priority: "high" },
    { id: "t2", title: "Write API documentation",       due: "Tomorrow",  priority: "medium" },
    { id: "t3", title: "Audit color tokens in DS page", due: "Apr 25",    priority: "low" },
  ],
  events: [
    { id: "e1", title: "Design sync",          time: "2:00 PM today"   },
    { id: "e2", title: "Sprint retrospective", time: "10:00 AM tomorrow" },
  ],
  unread: { messages: 4, mentions: 2 },
};

const RECENT_ACTIVITY = [
  { id: "a1", icon: FileText,      label: "Brand guidelines v3.pdf",         sub: "Opened 1h ago",      color: "var(--rally-brand)" },
  { id: "a2", icon: Bot,           label: "AI thread: Rally nav structure",   sub: "2h ago",             color: "#8B5CF6" },
  { id: "a3", icon: MessageSquare, label: "#design – mobile header thread",   sub: "4h ago",             color: "#0f5fd7" },
  { id: "a4", icon: CheckSquare,   label: "Review mobile header spec",        sub: "Viewed yesterday",   color: "#0f6a43" },
  { id: "a5", icon: FileText,      label: "Q1 Campaign assets",               sub: "Opened 2 days ago",  color: "#F59E0B" },
];

const SAVED_ITEMS = [
  { id: "s1", icon: MessageSquare, label: "Chat: Project kickoff",         sub: "Pinned conversation",  color: "#0f5fd7" },
  { id: "s2", icon: FileText,      label: "Brand guidelines v3.pdf",      sub: "Pinned file",           color: "var(--rally-brand)" },
  { id: "s3", icon: Bot,           label: "AI: Design system audit",      sub: "Bookmarked thread",     color: "#8B5CF6" },
  { id: "s4", icon: CheckSquare,   label: "Q1 roadmap tasks",             sub: "Important task group",  color: "#0f6a43" },
];

const MOCK_SESSIONS = [
  { id: "sess1", device: "MacBook Pro", browser: "Chrome 124", location: "New York, US",   active: true,  icon: Monitor   },
  { id: "sess2", device: "iPhone 15",   browser: "Safari 17",  location: "New York, US",   active: false, icon: Smartphone },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function avatarBg(name: string) {
  const c = ["#3B82F6","#10B981","#F59E0B","#8B5CF6","#EC4899","#14B8A6","#F97316"];
  let h = 0; for (const ch of name) h = ch.charCodeAt(0) + ((h << 5) - h);
  return c[Math.abs(h) % c.length];
}

function Av({ name, size = 40 }: { name: string; size?: number }) {
  const init = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className="rounded-full flex items-center justify-center text-white flex-shrink-0"
      style={{ width: size, height: size, background: avatarBg(name), fontSize: size * 0.36, fontWeight: 600 }}>
      {init}
    </div>
  );
}

function RoleBadge({ role }: { role: UserRole }) {
  const cfg = ROLE_CFG[role];
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
      style={{ background: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--text-overline)" }}>
      {children}
    </p>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} role="switch" aria-checked={checked}
      className="relative w-9 h-5 rounded-full transition-colors flex-shrink-0"
      style={{ background: checked ? "var(--rally-brand)" : "var(--border)" }}>
      <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
        style={{ transform: checked ? "translateX(16px)" : "translateX(0)" }} />
    </button>
  );
}

function FieldInput({ label, value, onChange, icon: Icon, type = "text", placeholder, disabled }: {
  label: string; value: string; onChange: (v: string) => void;
  icon?: React.ElementType; type?: string; placeholder?: string; disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-foreground mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />}
        <input value={value} onChange={e => onChange(e.target.value)} type={type}
          placeholder={placeholder} disabled={disabled}
          className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none transition-colors placeholder:text-muted-foreground ${disabled ? "opacity-60 cursor-not-allowed" : "focus:border-[var(--rally-brand)]"}`} />
      </div>
    </div>
  );
}

// ── Left Rail ─────────────────────────────────────────────────────────────────

function LeftRail({ section, onSection }: { section: NavSection; onSection: (s: NavSection) => void }) {
  const items: { id: NavSection; label: string; icon: React.ElementType }[] = [
    { id: "overview",     label: "Overview",       icon: Home        },
    { id: "preferences",  label: "Preferences",    icon: Settings    },
    { id: "teams",        label: "Access & Teams", icon: Users       },
    { id: "security",     label: "Security",       icon: Lock        },
  ];

  return (
    <div className="w-44 flex-shrink-0 border-r border-border bg-card hidden lg:flex flex-col overflow-y-auto">
      <div className="px-2 pt-3 pb-2 space-y-0.5">
        {items.map(item => {
          const Icon = item.icon;
          const active = section === item.id;
          return (
            <button key={item.id} onClick={() => onSection(item.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-left text-[12px] transition-colors"
              style={active ? { background: "var(--rally-brand-soft-light)", color: "var(--rally-brand-on-light)", fontWeight: 500 } : { color: "var(--muted-foreground)" }}>
              <Icon className="size-4 flex-shrink-0" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Overview ──────────────────────────────────────────────────────────────────

function OverviewSection({
  user, userRole, teamName, availability, onAvailability, customStatus, onCustomStatus, onNav,
}: {
  user: { name: string; email: string; job?: string; tags: string[] };
  userRole: UserRole; teamName: string;
  availability: AvailabilityStatus; onAvailability: (s: AvailabilityStatus) => void;
  customStatus: string; onCustomStatus: (v: string) => void;
  onNav: (s: NavSection) => void;
}) {
  const [editStatus, setEditStatus] = useState(false);
  const [statusDraft, setStatusDraft] = useState(customStatus);

  function saveStatus() { onCustomStatus(statusDraft); setEditStatus(false); }

  const avCfg = AVAILABILITY_CFG[availability];

  return (
    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">

      {/* Identity card */}
      <div className="rounded-[14px] border border-border bg-card p-5">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <Av name={user.name} size={64} />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card"
              style={{ background: avCfg.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[17px] font-medium text-foreground">{user.name}</h2>
              <RoleBadge role={userRole} />
            </div>
            <p className="text-[12px] text-muted-foreground mt-0.5">{user.email}</p>
            {user.job && <p className="text-[12px] text-foreground mt-0.5">{user.job}</p>}
            <p className="text-[11px] text-muted-foreground mt-0.5">in <span className="text-foreground">{teamName}</span></p>
            {user.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {user.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">{t}</span>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => onNav("preferences")}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-border bg-background text-foreground hover:bg-muted transition-colors text-[12px]">
            <Edit2 className="size-3.5" /> Edit profile
          </button>
        </div>
      </div>

      {/* Status / availability */}
      <section>
        <SectionLabel>Status & Availability</SectionLabel>
        <div className="rounded-[12px] border border-border bg-card p-4 space-y-4">
          {/* Status picker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(AVAILABILITY_CFG) as AvailabilityStatus[]).map(s => {
              const cfg = AVAILABILITY_CFG[s];
              const active = availability === s;
              return (
                <button key={s} onClick={() => onAvailability(s)}
                  className="flex items-center gap-2 px-3 py-2 rounded-[8px] border transition-all text-left"
                  style={active ? { borderColor: cfg.color, background: cfg.color + "12" } : { borderColor: "var(--border)" }}>
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-foreground truncate">{cfg.label}</p>
                  </div>
                  {active && <Check className="size-3 flex-shrink-0 ml-auto" style={{ color: cfg.color }} />}
                </button>
              );
            })}
          </div>

          {/* Custom status */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground flex-shrink-0">Custom status:</span>
            {editStatus ? (
              <>
                <input value={statusDraft} onChange={e => setStatusDraft(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") saveStatus(); if (e.key === "Escape") setEditStatus(false); }}
                  autoFocus
                  className="flex-1 px-2.5 py-1.5 rounded-[7px] border border-border bg-background text-foreground text-[12px] outline-none focus:border-[var(--rally-brand)] transition-colors" />
                <button onClick={saveStatus} className="w-7 h-7 flex items-center justify-center rounded-[7px] text-white flex-shrink-0" style={{ background: "var(--rally-brand)" }}>
                  <Check className="size-3.5" />
                </button>
                <button onClick={() => setEditStatus(false)} className="w-7 h-7 flex items-center justify-center rounded-[7px] border border-border text-muted-foreground hover:bg-muted flex-shrink-0">
                  <X className="size-3.5" />
                </button>
              </>
            ) : (
              <button onClick={() => { setStatusDraft(customStatus); setEditStatus(true); }}
                className="flex-1 text-left px-2.5 py-1.5 rounded-[7px] border border-dashed border-border hover:border-[var(--rally-brand)] hover:bg-[var(--rally-brand-200)] text-[12px] transition-colors"
                style={{ color: customStatus ? "var(--text-foreground)" : "var(--text-muted)" }}>
                {customStatus || "Set a custom status…"}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* My work snapshot */}
      <section>
        <SectionLabel>My Work</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Tasks */}
          <div className="rounded-[12px] border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare className="size-4" style={{ color: "#0f6a43" }} />
              <span className="text-[12px] font-medium text-foreground">Upcoming tasks</span>
            </div>
            <div className="space-y-2">
              {MOCK_WORK_SNAPSHOT.tasks.map(t => (
                <div key={t.id} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: t.priority === "high" ? "#EF4444" : t.priority === "medium" ? "#F59E0B" : "#9CA3AF" }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-foreground truncate">{t.title}</p>
                    <p className="text-[10px] text-muted-foreground">{t.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="rounded-[12px] border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="size-4" style={{ color: "#0f5fd7" }} />
              <span className="text-[12px] font-medium text-foreground">Upcoming events</span>
            </div>
            <div className="space-y-2">
              {MOCK_WORK_SNAPSHOT.events.map(e => (
                <div key={e.id} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: "#0f5fd7" }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-foreground truncate">{e.title}</p>
                    <p className="text-[10px] text-muted-foreground">{e.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unread */}
          <div className="rounded-[12px] border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="size-4" style={{ color: "var(--rally-brand)" }} />
              <span className="text-[12px] font-medium text-foreground">Unread</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="size-3.5 text-muted-foreground" />
                  <span className="text-[11px] text-muted-foreground">Messages</span>
                </div>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0"
                  style={{ background: "var(--rally-brand)" }}>
                  {MOCK_WORK_SNAPSHOT.unread.messages}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-3.5 text-muted-foreground" />
                  <span className="text-[11px] text-muted-foreground">Mentions</span>
                </div>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0"
                  style={{ background: "#0f5fd7" }}>
                  {MOCK_WORK_SNAPSHOT.unread.mentions}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent activity */}
      <section>
        <SectionLabel>Continue Working</SectionLabel>
        <div className="rounded-[12px] border border-border bg-card divide-y divide-border overflow-hidden">
          {RECENT_ACTIVITY.map(a => {
            const Icon = a.icon;
            return (
              <div key={a.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer group">
                <div className="w-7 h-7 rounded-[7px] flex items-center justify-center flex-shrink-0"
                  style={{ background: a.color + "18" }}>
                  <Icon className="size-3.5" style={{ color: a.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-foreground truncate">{a.label}</p>
                  <p className="text-[10px] text-muted-foreground">{a.sub}</p>
                </div>
                <ChevronRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Saved / pinned */}
      <section>
        <SectionLabel>Saved & Pinned</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SAVED_ITEMS.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.id}
                className="flex items-center gap-3 px-3 py-3 rounded-[10px] border border-border bg-card hover:bg-muted/30 transition-colors cursor-pointer group">
                <div className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
                  style={{ background: s.color + "18" }}>
                  <Icon className="size-4" style={{ color: s.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-foreground truncate">{s.label}</p>
                  <p className="text-[10px] text-muted-foreground">{s.sub}</p>
                </div>
                <Star className="size-3.5 flex-shrink-0" style={{ color: s.color }} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ── Preferences ───────────────────────────────────────────────────────────────

function PreferencesSection({
  user, onSave, theme, onTheme,
}: {
  user: { name: string; email: string; gender?: string; job?: string; phone?: string; timezone: string; tags: string[] };
  onSave: (updates: Partial<{ name: string; email: string; gender: string; job: string; phone: string; timezone: string; tags: string[] }>) => void;
  theme: "light" | "dark"; onTheme: (t: "light" | "dark") => void;
}) {
  const [name,     setName]     = useState(user.name);
  const [email,    setEmail]    = useState(user.email);
  const [job,      setJob]      = useState(user.job ?? "");
  const [phone,    setPhone]    = useState(user.phone ?? "");
  const [timezone, setTimezone] = useState(user.timezone);
  const [tags,     setTags]     = useState(user.tags.join(", "));
  const [saved,    setSaved]    = useState(false);

  // Notification prefs
  const [notifMentions,  setNotifMentions]  = useState(true);
  const [notifTasks,     setNotifTasks]     = useState(true);
  const [notifCalendar,  setNotifCalendar]  = useState(true);
  const [notifMessages,  setNotifMessages]  = useState(false);
  const [soundChat,      setSoundChat]      = useState(true);
  const [soundMentions,  setSoundMentions]  = useState(true);
  const [aiAutoSuggest,  setAiAutoSuggest]  = useState(true);
  const [aiContext,      setAiContext]      = useState(true);

  function handleSave() {
    onSave({
      name, email, job, phone, timezone,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const TIMEZONES = [
    ["America/New_York",     "Eastern Time (ET)"],
    ["America/Chicago",      "Central Time (CT)"],
    ["America/Denver",       "Mountain Time (MT)"],
    ["America/Los_Angeles",  "Pacific Time (PT)"],
    ["Europe/London",        "London (GMT)"],
    ["Europe/Paris",         "Paris (CET)"],
    ["Asia/Tokyo",           "Tokyo (JST)"],
    ["UTC",                  "UTC"],
  ];

  const notifRows: { label: string; sub: string; value: boolean; set: (v: boolean) => void }[] = [
    { label: "Mentions",          sub: "When someone @mentions you",         value: notifMentions, set: setNotifMentions },
    { label: "Task updates",      sub: "Due dates, assignments, completions", value: notifTasks,    set: setNotifTasks    },
    { label: "Calendar reminders",sub: "Upcoming event reminders",           value: notifCalendar, set: setNotifCalendar },
    { label: "All messages",      sub: "Every new message in your channels", value: notifMessages, set: setNotifMessages },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 max-w-2xl">

      {/* Identity */}
      <section>
        <SectionLabel>Identity</SectionLabel>
        <div className="rounded-[12px] border border-border bg-card p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldInput label="Full Name"   value={name}  onChange={setName}  placeholder="John Doe" />
            <FieldInput label="Email"       value={email} onChange={setEmail} icon={Mail} type="email" placeholder="john@example.com" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldInput label="Job Title"  value={job}   onChange={setJob}   icon={Briefcase} placeholder="Product Manager" />
            <FieldInput label="Phone"      value={phone} onChange={setPhone} icon={Phone}     type="tel" placeholder="+1 (555) 123-4567" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-foreground mb-1.5">Timezone</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground z-10" />
              <select value={timezone} onChange={e => setTimezone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[var(--rally-brand)] transition-colors">
                {TIMEZONES.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-foreground mb-1.5">Tags</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input value={tags} onChange={e => setTags(e.target.value)}
                placeholder="Product, Design, Leadership"
                className="w-full pl-9 pr-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Comma-separated — helps teammates know your expertise</p>
          </div>
          <div className="pt-2 border-t border-[var(--border-subtle)] flex justify-end">
            <button onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-[8px] text-white text-[12px] font-medium transition-colors"
              style={{ background: saved ? "#0f6a43" : "var(--rally-brand)" }}>
              {saved ? <><Check className="size-3.5" /> Saved</> : "Save Changes"}
            </button>
          </div>
        </div>
      </section>

      {/* Theme */}
      <section>
        <SectionLabel>Appearance</SectionLabel>
        <div className="rounded-[12px] border border-border bg-card p-4">
          <p className="text-[12px] font-medium text-foreground mb-3">Theme</p>
          <div className="flex gap-3">
            {(["light", "dark"] as const).map(t => (
              <button key={t} onClick={() => onTheme(t)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-[8px] border transition-all text-[12px]"
                style={theme === t ? { borderColor: "var(--rally-brand)", background: "var(--rally-brand-soft-light)", color: "var(--rally-brand)", fontWeight: 500 } : { borderColor: "var(--border)", color: "var(--foreground)" }}>
                {t === "light" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
                {t === "light" ? "Light" : "Dark"}
                {theme === t && <Check className="size-3 ml-1" />}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">You can also toggle theme from the sidebar at any time.</p>
        </div>
      </section>

      {/* Notifications */}
      <section>
        <SectionLabel>Notifications</SectionLabel>
        <div className="rounded-[12px] border border-border bg-card divide-y divide-border overflow-hidden">
          {notifRows.map(row => (
            <div key={row.label} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-[12px] text-foreground">{row.label}</p>
                <p className="text-[10px] text-muted-foreground">{row.sub}</p>
              </div>
              <Toggle checked={row.value} onChange={row.set} />
            </div>
          ))}
        </div>
      </section>

      {/* Sound */}
      <section>
        <SectionLabel>Sound</SectionLabel>
        <div className="rounded-[12px] border border-border bg-card divide-y divide-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Volume2 className="size-3.5 text-muted-foreground" />
              <div>
                <p className="text-[12px] text-foreground">Chat sounds</p>
                <p className="text-[10px] text-muted-foreground">Play sound on new messages</p>
              </div>
            </div>
            <Toggle checked={soundChat} onChange={setSoundChat} />
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Bell className="size-3.5 text-muted-foreground" />
              <div>
                <p className="text-[12px] text-foreground">Mention sounds</p>
                <p className="text-[10px] text-muted-foreground">Play sound when mentioned</p>
              </div>
            </div>
            <Toggle checked={soundMentions} onChange={setSoundMentions} />
          </div>
        </div>
      </section>

      {/* AI behavior */}
      <section>
        <SectionLabel>AI Preferences</SectionLabel>
        <div className="rounded-[12px] border border-border bg-card divide-y divide-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Zap className="size-3.5 text-muted-foreground" />
              <div>
                <p className="text-[12px] text-foreground">Auto-suggest responses</p>
                <p className="text-[10px] text-muted-foreground">AI suggests replies in chat</p>
              </div>
            </div>
            <Toggle checked={aiAutoSuggest} onChange={setAiAutoSuggest} />
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="size-3.5 text-muted-foreground" />
              <div>
                <p className="text-[12px] text-foreground">Use workspace context</p>
                <p className="text-[10px] text-muted-foreground">AI uses your tasks & files as context</p>
              </div>
            </div>
            <Toggle checked={aiContext} onChange={setAiContext} />
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Access & Teams ──────────────────────────────────────────────────────────

function TeamsSection({
  user, userRole, currentTeamId,
}: {
  user: { teams: { teamId: string; teamName: string; projectName: string; role: UserRole }[] };
  userRole: UserRole; currentTeamId: string;
}) {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(currentTeamId);
  const caps = ROLE_CAPS[userRole];

  return (
    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 max-w-2xl">

      {/* Teams list */}
      <section>
        <SectionLabel>Your Teams</SectionLabel>
        <div className="space-y-2">
          {user.teams.map(team => {
            const active   = team.teamId === currentTeamId;
            const expanded = expandedTeam === team.teamId;
            const teamCaps = ROLE_CAPS[team.role];

            return (
              <div key={team.teamId}
                className="rounded-[12px] border bg-card overflow-hidden transition-colors"
                style={{ borderColor: active ? "var(--rally-brand)" : "var(--border)" }}>
                <button
                  onClick={() => setExpandedTeam(expanded ? null : team.teamId)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors">
                  {/* Team icon */}
                  <div className="w-9 h-9 rounded-[9px] flex items-center justify-center text-white text-[14px] font-medium flex-shrink-0"
                    style={{ background: active ? "var(--rally-brand)" : avatarBg(team.teamName) }}>
                    {team.teamName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-medium text-foreground truncate">{team.teamName}</p>
                      {active && <span className="text-[10px] px-1.5 py-0.5 rounded-full text-white flex-shrink-0" style={{ background: "var(--rally-brand)" }}>Current</span>}
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">{team.projectName}</p>
                  </div>
                  <RoleBadge role={team.role} />
                  <ChevronRight className={`size-3.5 text-muted-foreground flex-shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`} />
                </button>

                {/* Expanded permission summary */}
                {expanded && (
                  <div className="border-t border-[var(--border-subtle)] px-4 py-3 bg-muted/20">
                    <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--text-overline)" }}>
                      As {ROLE_CFG[team.role].label} — what you can do:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                      {teamCaps.can.map(item => (
                        <div key={item} className="flex items-start gap-2">
                          <Check className="size-3.5 flex-shrink-0 mt-0.5" style={{ color: "#0f6a43" }} />
                          <span className="text-[11px] text-foreground">{item}</span>
                        </div>
                      ))}
                      {teamCaps.cannot.map(item => (
                        <div key={item} className="flex items-start gap-2">
                          <X className="size-3.5 flex-shrink-0 mt-0.5 text-muted-foreground" />
                          <span className="text-[11px] text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Create / join another team */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-[8px] border border-dashed border-border text-muted-foreground hover:border-[var(--rally-brand)] hover:text-[var(--rally-brand)] hover:bg-[var(--rally-brand-200)] transition-colors text-[12px]">
          <Users className="size-3.5" /> Create another team
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-[8px] border border-dashed border-border text-muted-foreground hover:border-[#0f5fd7] hover:text-[#0f5fd7] hover:bg-[#eef4ff] transition-colors text-[12px]">
          <ChevronRight className="size-3.5" /> Join with invite code
        </button>
      </div>

      {/* Current team permission detail */}
      <section>
        <SectionLabel>My Permissions in Current Team</SectionLabel>
        <div className="rounded-[12px] border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="size-4" style={{ color: "var(--rally-brand)" }} />
            <span className="text-[12px] font-medium text-foreground">
              Role: <span style={{ color: "var(--rally-brand)" }}>{ROLE_CFG[userRole].label}</span>
            </span>
          </div>
          <div className="space-y-2">
            {caps.can.map(item => (
              <div key={item} className="flex items-start gap-2">
                <Check className="size-3.5 flex-shrink-0 mt-0.5" style={{ color: "#0f6a43" }} />
                <span className="text-[12px] text-foreground">{item}</span>
              </div>
            ))}
            {caps.cannot.map(item => (
              <div key={item} className="flex items-start gap-2">
                <X className="size-3.5 flex-shrink-0 mt-0.5 text-muted-foreground" />
                <span className="text-[12px] text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Security ──────────────────────────────────────────────────────────────────

function SecuritySection({ onLogout }: { onLogout: () => void }) {
  const [currentPw,    setCurrentPw]    = useState("");
  const [newPw,        setNewPw]        = useState("");
  const [confirmPw,    setConfirmPw]    = useState("");
  const [showPw,       setShowPw]       = useState(false);
  const [pwSaved,      setPwSaved]      = useState(false);
  const [deleteInput,  setDeleteInput]  = useState("");
  const [deleteOpen,   setDeleteOpen]   = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  function handleChangePw() {
    if (!newPw || newPw !== confirmPw) return;
    setPwSaved(true);
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
    setTimeout(() => setPwSaved(false), 2000);
  }

  const pwInputClass = `w-full pl-3 pr-9 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground`;

  return (
    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 max-w-xl">

      {/* Password */}
      <section>
        <SectionLabel>Password</SectionLabel>
        <div className="rounded-[12px] border border-border bg-card p-4 space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-foreground mb-1.5">Current password</label>
            <div className="relative">
              <input value={currentPw} onChange={e => setCurrentPw(e.target.value)}
                type={showPw ? "text" : "password"} placeholder="••••••••"
                className={pwInputClass} />
              <button onClick={() => setShowPw(v => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPw ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-foreground mb-1.5">New password</label>
            <input value={newPw} onChange={e => setNewPw(e.target.value)}
              type={showPw ? "text" : "password"} placeholder="Min. 8 characters"
              className={pwInputClass} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-foreground mb-1.5">Confirm new password</label>
            <input value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
              type={showPw ? "text" : "password"} placeholder="Repeat new password"
              className={pwInputClass} />
          </div>
          {newPw && confirmPw && newPw !== confirmPw && (
            <p className="text-[11px] text-red-500 flex items-center gap-1">
              <AlertCircle className="size-3.5" /> Passwords do not match
            </p>
          )}
          <button onClick={handleChangePw}
            disabled={!currentPw || !newPw || newPw !== confirmPw}
            className="flex items-center gap-1.5 px-4 py-2 rounded-[8px] text-white text-[12px] font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: pwSaved ? "#0f6a43" : "var(--rally-brand)" }}>
            {pwSaved ? <><Check className="size-3.5" /> Password updated</> : "Update Password"}
          </button>
        </div>
      </section>

      {/* Active sessions */}
      <section>
        <SectionLabel>Active Sessions</SectionLabel>
        <div className="rounded-[12px] border border-border bg-card divide-y divide-border overflow-hidden">
          {MOCK_SESSIONS.map(sess => {
            const Icon = sess.icon;
            return (
              <div key={sess.id} className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 rounded-[8px] bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[12px] text-foreground">{sess.device}</p>
                    {sess.active && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: "#eaf7f0", color: "#0f6a43" }}>
                        Active now
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground">{sess.browser} · {sess.location}</p>
                </div>
                {!sess.active && (
                  <button className="text-[11px] text-red-400 hover:text-red-600 transition-colors flex-shrink-0">
                    Revoke
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Sign out */}
      <section>
        <SectionLabel>Account</SectionLabel>
        <div className="space-y-3">
          <div className="flex items-center justify-between px-4 py-3 rounded-[10px] border border-border bg-card">
            <div>
              <p className="text-[13px] text-foreground">Sign out</p>
              <p className="text-[10px] text-muted-foreground">You'll be redirected to the login page</p>
            </div>
            {!logoutConfirm ? (
              <button onClick={() => setLogoutConfirm(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] border border-border bg-background text-foreground hover:bg-muted transition-colors text-[12px]">
                <LogOut className="size-3.5" /> Sign out
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setLogoutConfirm(false)}
                  className="px-3 py-1.5 rounded-[7px] border border-border text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                  Cancel
                </button>
                <button onClick={onLogout}
                  className="px-3 py-1.5 rounded-[7px] text-white text-[11px] font-medium transition-colors hover:opacity-90" style={{ background: "var(--rally-brand)" }}>
                  Confirm
                </button>
              </div>
            )}
          </div>

          {/* Delete account */}
          <div className="rounded-[10px] border p-4" style={{ borderColor: "#fca5a5", background: "#fff8f8" }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium text-red-600">Delete Account</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Permanently remove your account and all data. This cannot be undone.</p>
              </div>
              <button onClick={() => setDeleteOpen(v => !v)}
                className="flex-shrink-0 px-3 py-1.5 rounded-[7px] bg-red-500 text-white text-[11px] font-medium hover:bg-red-600 transition-colors">
                <Trash2 className="size-3.5 inline mr-1" />Delete
              </button>
            </div>
            {deleteOpen && (
              <div className="mt-4 pt-4 border-t" style={{ borderColor: "#fca5a5" }}>
                <div className="rounded-[8px] p-3 mb-3" style={{ background: "#fee2e2", border: "1px solid #fca5a5" }}>
                  <p className="text-[11px] text-red-600 font-medium mb-1">This will permanently delete:</p>
                  <ul className="text-[11px] text-red-500 space-y-1 list-disc list-inside">
                    <li>Your profile and personal information</li>
                    <li>All your messages and conversations</li>
                    <li>Your tasks, files, and to-do lists</li>
                    <li>Your team memberships (where you're not owner)</li>
                  </ul>
                </div>
                <label className="block text-[11px] font-medium text-foreground mb-1.5">
                  Type <strong>DELETE</strong> to confirm:
                </label>
                <input value={deleteInput} onChange={e => setDeleteInput(e.target.value)}
                  placeholder="DELETE"
                  className="w-full px-3 py-2 rounded-[7px] border border-red-300 bg-white text-[12px] text-foreground outline-none mb-2 placeholder:text-red-300" />
                <div className="flex gap-2">
                  <button onClick={() => { setDeleteOpen(false); setDeleteInput(""); }}
                    className="px-3 py-1.5 rounded-[7px] border border-border text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                    Cancel
                  </button>
                  <button disabled={deleteInput !== "DELETE"}
                    className="px-3 py-1.5 rounded-[7px] bg-red-500 text-white text-[11px] font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-600">
                    Permanently Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function ProfileV2() {
  const { user, userRole, currentTeam, updateUser, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const [section,       setSection]       = useState<NavSection>("overview");
  const [availability,  setAvailability]  = useState<AvailabilityStatus>("online");
  const [customStatus,  setCustomStatus]  = useState("");

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground text-[13px]">Please log in to view your profile.</p>
      </div>
    );
  }

  const role: UserRole     = userRole ?? "viewer";
  const avCfg              = AVAILABILITY_CFG[availability];
  const teamName           = currentTeam?.name ?? "Rally Labs";
  const currentTeamId      = currentTeam?.id ?? user.teams[0]?.teamId ?? "";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleSaveProfile(updates: Partial<{ name: string; email: string; gender: string; job: string; phone: string; timezone: string; tags: string[] }>) {
    updateUser(updates);
  }

  return (
    <div className="h-full flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex-shrink-0 px-5 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <Av name={user.name} size={36} />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card"
              style={{ background: avCfg.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[14px] font-medium text-foreground">{user.name}</span>
              <RoleBadge role={role} />
              <span className="text-[11px] text-muted-foreground hidden sm:block">· {teamName}</span>
              {customStatus && (
                <span className="text-[11px] text-muted-foreground hidden sm:block truncate max-w-[200px]">· {customStatus}</span>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground">{user.email}</p>
          </div>

          {/* Mobile section tabs */}
          <div className="flex gap-1 lg:hidden">
            {(["overview", "preferences", "teams", "security"] as NavSection[]).map(s => (
              <button key={s} onClick={() => setSection(s)}
                className="px-2 py-1 rounded-[6px] text-[10px] capitalize transition-colors"
                style={section === s ? { background: "var(--rally-brand-soft-light)", color: "var(--rally-brand)", fontWeight: 500 } : { color: "var(--muted-foreground)" }}>
                {s === "teams" ? "Teams" : s === "preferences" ? "Prefs" : s === "security" ? "Sec" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left rail */}
        <LeftRail section={section} onSection={setSection} />

        {/* Content */}
        {section === "overview" && (
          <OverviewSection
            user={user}
            userRole={role}
            teamName={teamName}
            availability={availability}
            onAvailability={setAvailability}
            customStatus={customStatus}
            onCustomStatus={setCustomStatus}
            onNav={setSection}
          />
        )}
        {section === "preferences" && (
          <PreferencesSection
            user={user}
            onSave={handleSaveProfile}
            theme={theme}
            onTheme={setTheme}
          />
        )}
        {section === "teams" && (
          <TeamsSection
            user={user}
            userRole={role}
            currentTeamId={currentTeamId}
          />
        )}
        {section === "security" && (
          <SecuritySection onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}
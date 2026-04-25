import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  Sparkles, Plus, Search, ChevronDown, Send, Paperclip,
  Globe, FileText, CheckSquare, Calendar, MessageSquare,
  Users, Hash, Pin, X, MoreHorizontal, Trash2, Edit2,
  ArrowRight, Clock, AlarmClock, Bell, RefreshCw, Mic,
  Bookmark, Share2, RotateCcw, CheckCircle2, XCircle,
  ChevronRight, ExternalLink, Zap, PenLine, Inbox, Bot,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useSecondarySidebar } from "../contexts/SecondarySidebarContext";

// ── Types ─────────────────────────────────────────────────────────────────────

type SourceKey = "team" | "files" | "tasks" | "calendar" | "chat" | "web";

interface SourceChip {
  key: SourceKey;
  label: string;
  icon: React.ReactNode;
  available: boolean;
}

type ResultCardType = "files" | "tasks" | "events" | "summary" | "action";

interface ResultCard {
  type: ResultCardType;
  title: string;
  items?: { name: string; meta?: string; icon?: string }[];
  summary?: string;
  action?: { label: string; confirm: boolean };
}

interface FollowUp {
  label: string;
  prompt: string;
}

interface AIMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: SourceKey[];
  resultCards?: ResultCard[];
  followUps?: FollowUp[];
}

interface ActionPreview {
  id: string;
  type: "create_task" | "create_event" | "send_message" | "update_file";
  description: string;
  detail: string;
}

interface AIThread {
  id: string;
  title: string;
  scopeBadges: SourceKey[];
  lastUpdated: string;
  messages: AIMsg[];
  pinned?: boolean;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const today = new Date().toISOString();
function daysAgo(n: number) {
  const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString();
}
function hoursAgo(h: number) {
  const d = new Date(); d.setHours(d.getHours() - h); return d.toISOString();
}

const mockThreads: AIThread[] = [
  {
    id: "t-1", title: "Sprint planning prep",
    scopeBadges: ["tasks", "calendar"], pinned: true, lastUpdated: hoursAgo(1),
    messages: [
      { id: "m1", role: "user", content: "Help me prepare for tomorrow's sprint planning.", timestamp: hoursAgo(2) },
      {
        id: "m2", role: "assistant",
        content: "Here's what I found to help you prepare for tomorrow's sprint planning:",
        timestamp: hoursAgo(2),
        sources: ["tasks", "calendar"],
        resultCards: [
          {
            type: "tasks", title: "Open tasks to review",
            items: [
              { name: "Fix mobile nav drawer", meta: "High priority · Emily" },
              { name: "Finalize API docs", meta: "Medium · Emily" },
              { name: "Review header designs", meta: "Urgent · Sarah" },
            ],
          },
          {
            type: "events", title: "Sprint Planning",
            items: [{ name: "Sprint Planning — tomorrow at 10:00 AM", meta: "Sarah, Mike, Emily, Tom" }],
          },
        ],
        followUps: [
          { label: "Create agenda", prompt: "Draft an agenda for tomorrow's sprint planning" },
          { label: "Turn tasks into stories", prompt: "Convert open tasks into sprint user stories" },
          { label: "Find blockers", prompt: "Which tasks have blockers or dependencies?" },
        ],
      },
    ],
  },
  {
    id: "t-2", title: "Launch brief summary",
    scopeBadges: ["files", "chat"], lastUpdated: hoursAgo(3),
    messages: [
      { id: "m1", role: "user", content: "Summarize the Q2 launch brief document.", timestamp: hoursAgo(4) },
      {
        id: "m2", role: "assistant",
        content: "I found the Q2 Launch Brief and here's a summary:",
        timestamp: hoursAgo(4),
        sources: ["files"],
        resultCards: [
          {
            type: "summary", title: "Q2 Launch Brief — Key Points",
            summary: "Launch is scheduled for May 15th. Key deliverables: new landing page, onboarding flow, and API v2. Stakeholder sign-off needed by Friday. The design team is blocking on the mobile header; engineering is waiting on API spec finalization.",
          },
          {
            type: "files", title: "Related files",
            items: [
              { name: "Q2_Launch_Brief.pdf", meta: "Updated 8h ago · John" },
              { name: "Website_Header_v3.fig", meta: "Updated 1h ago · Sarah" },
            ],
          },
        ],
        followUps: [
          { label: "Find related tasks", prompt: "Find open tasks related to the Q2 launch" },
          { label: "Draft update", prompt: "Draft a team status update based on the launch brief" },
          { label: "What's blocking?", prompt: "What is blocking the Q2 launch right now?" },
        ],
      },
    ],
  },
  {
    id: "t-3", title: "What changed since Monday?",
    scopeBadges: ["chat", "tasks", "files"], lastUpdated: daysAgo(1),
    messages: [],
  },
  {
    id: "t-4", title: "Draft status report",
    scopeBadges: ["tasks", "files"], lastUpdated: daysAgo(1),
    messages: [],
  },
  {
    id: "t-5", title: "Onboarding flow review",
    scopeBadges: ["files", "team"], lastUpdated: daysAgo(3),
    messages: [],
  },
  {
    id: "t-6", title: "Team productivity check",
    scopeBadges: ["team", "tasks"], lastUpdated: daysAgo(5),
    messages: [],
  },
];

const todayStrip = [
  { icon: <CheckSquare className="size-4" />, color: "#0f6a43", bg: "#eaf7f0", label: "2 tasks due today", action: "Prepare me", prompt: "Summarize my tasks due today and help me prioritize" },
  { icon: <AlarmClock className="size-4" />, color: "#0f5fd7", bg: "#eef4ff", label: "Team standup in 30 min", action: "Prep notes", prompt: "Prepare short talking points for today's team standup" },
  { icon: <Bell className="size-4" />, color: "#8a4f00", bg: "#fff4e5", label: "3 unread mentions", action: "Catch me up", prompt: "Summarize the messages where I was mentioned today" },
  { icon: <FileText className="size-4" />, color: "#6b21a8", bg: "#f5f3ff", label: "1 file updated", action: "Review it", prompt: "Summarize recent changes to files updated today" },
];

const starterGroups = [
  {
    label: "Catch up", color: "#0f5fd7", bg: "#eef4ff",
    prompts: [
      "What changed since yesterday?",
      "Summarize unread chats",
      "What needs my attention today?",
    ],
  },
  {
    label: "Find", color: "#0f6a43", bg: "#eaf7f0",
    prompts: [
      "Find the latest file about the launch",
      "Show tasks related to onboarding",
      "What meeting notes mention the API?",
    ],
  },
  {
    label: "Create", color: "#6b21a8", bg: "#f5f3ff",
    prompts: [
      "Draft a team status update",
      "Turn this discussion into tasks",
      "Create an agenda for today's meeting",
    ],
  },
  {
    label: "Act", color: "#8a4f00", bg: "#fff4e5",
    prompts: [
      "Suggest what I should do next",
      "Prepare follow-ups from my last meeting",
      "Organize this work into a sprint plan",
    ],
  },
];

const quickActions = [
  { icon: <MessageSquare className="size-4" />, color: "#0f5fd7", bg: "#eef4ff", label: "Summarize recent chat activity", prompt: "Summarize what happened in chat today across all channels" },
  { icon: <FileText className="size-4" />, color: "#6b21a8", bg: "#f5f3ff", label: "Find a file fast", prompt: "Help me find a recently updated file" },
  { icon: <PenLine className="size-4" />, color: "#0f6a43", bg: "#eaf7f0", label: "Draft a status update", prompt: "Draft a concise team status update for this week" },
  { icon: <CheckSquare className="size-4" />, color: "#8a4f00", bg: "#fff4e5", label: "Turn notes into tasks", prompt: "Convert my meeting notes into actionable tasks" },
  { icon: <Calendar className="size-4" />, color: "#d90000", bg: "#fff0ef", label: "Prepare for next meeting", prompt: "Prepare talking points for my next scheduled meeting" },
  { icon: <Globe className="size-4" />, color: "#374151", bg: "#f3f4f6", label: "Search web + team knowledge", prompt: "Search both the web and team docs for best practices on remote collaboration" },
];

const sourceDefs: SourceChip[] = [
  { key: "team",     label: "Team",     icon: <Users className="size-3" />,         available: true },
  { key: "files",    label: "Files",    icon: <FileText className="size-3" />,      available: true },
  { key: "tasks",    label: "Tasks",    icon: <CheckSquare className="size-3" />,   available: true },
  { key: "calendar", label: "Calendar", icon: <Calendar className="size-3" />,      available: true },
  { key: "chat",     label: "Chat",     icon: <MessageSquare className="size-3" />, available: true },
  { key: "web",      label: "Web",      icon: <Globe className="size-3" />,         available: true },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function timeLabel(ts: string) {
  const d = new Date(ts), now = new Date();
  const diffH = (now.getTime() - d.getTime()) / 3600000;
  if (diffH < 24) return diffH < 1 ? "Just now" : `${Math.floor(diffH)}h ago`;
  if (diffH < 48) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function avatarBg(name: string) {
  const colors = ["#3B82F6","#10B981","#F59E0B","#8B5CF6","#EC4899"];
  let h = 0; for (const c of name) h = c.charCodeAt(0) + ((h << 5) - h);
  return colors[Math.abs(h) % colors.length];
}

function UserAv({ name, size = 28 }: { name: string; size?: number }) {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className="rounded-full flex items-center justify-center text-white flex-shrink-0"
      style={{ width: size, height: size, background: avatarBg(name), fontSize: size * 0.38, fontWeight: 600 }}>
      {initials}
    </div>
  );
}

function AIAvatar({ size = 28, thinking = false }: { size?: number; thinking?: boolean }) {
  return (
    <div className="rounded-[8px] flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, background: thinking ? "#f97316" : "var(--rally-brand)" }}>
      <Sparkles className="text-white" style={{ width: size * 0.5, height: size * 0.5 }} />
    </div>
  );
}

function SourceBadge({ source }: { source: SourceKey }) {
  const def = sourceDefs.find(s => s.key === source);
  if (!def) return null;
  const tokenMap: Record<SourceKey, { text: string; bg: string }> = {
    tasks:    { text: "var(--badge-tasks-text)",    bg: "var(--badge-tasks-bg)" },
    calendar: { text: "var(--badge-calendar-text)", bg: "var(--badge-calendar-bg)" },
    files:    { text: "var(--badge-files-text)",    bg: "var(--badge-files-bg)" },
    chat:     { text: "var(--badge-chat-text)",     bg: "var(--badge-chat-bg)" },
    team:     { text: "var(--badge-team-text)",     bg: "var(--badge-team-bg)" },
    web:      { text: "var(--badge-web-text)",      bg: "var(--badge-web-bg)" },
  };
  const { text, bg } = tokenMap[source];
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium border flex-shrink-0"
      style={{ color: text, background: bg, borderColor: "var(--border-subtle)" }}>
      {def.icon} {def.label}
    </span>
  );
}

// ── Result Card ───────────────────────────────────────────────────────────────

function RenderResultCard({
  card, onAction,
}: { card: ResultCard; onAction?: (prompt: string) => void }) {
  const iconMap: Record<ResultCardType, React.ReactNode> = {
    files:   <FileText className="size-4" style={{ color: "#6b21a8" }} />,
    tasks:   <CheckSquare className="size-4" style={{ color: "#0f6a43" }} />,
    events:  <Calendar className="size-4" style={{ color: "#d90000" }} />,
    summary: <Sparkles className="size-4" style={{ color: "var(--rally-brand)" }} />,
    action:  <Zap className="size-4" style={{ color: "#8a4f00" }} />,
  };
  return (
    <div className="mt-2 rounded-[10px] border border-border bg-background overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border-subtle)] bg-muted/40">
        {iconMap[card.type]}
        <span className="text-[12px] font-medium text-foreground">{card.title}</span>
      </div>
      <div className="px-3 py-2">
        {card.summary && (
          <p className="text-[12px] text-foreground leading-relaxed">{card.summary}</p>
        )}
        {card.items && (
          <div className="space-y-1.5">
            {card.items.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--rally-brand)" }} />
                <div className="min-w-0">
                  <p className="text-[12px] text-foreground">{item.name}</p>
                  {item.meta && <p className="text-[10px] text-muted-foreground">{item.meta}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
        {card.action && (
          <button
            onClick={() => card.action?.confirm && onAction?.(card.action.label)}
            className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-white text-[11px] font-medium transition-colors"
            style={{ background: "var(--rally-brand)" }}>
            {card.action.confirm ? <><CheckCircle2 className="size-3" /> Confirm</> : <>{card.action.label}</>}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Action Preview Card ───────────────────────────────────────────────────────

function ActionPreviewCard({
  action, onConfirm, onDeny,
}: { action: ActionPreview; onConfirm: () => void; onDeny: () => void }) {
  const iconMap = {
    create_task: <CheckSquare className="size-4" style={{ color: "#0f6a43" }} />,
    create_event: <Calendar className="size-4" style={{ color: "#d90000" }} />,
    send_message: <MessageSquare className="size-4" style={{ color: "#0f5fd7" }} />,
    update_file: <FileText className="size-4" style={{ color: "#6b21a8" }} />,
  };
  return (
    <div className="flex items-start gap-3 p-3 rounded-[10px] border bg-card"
      style={{ borderColor: "var(--rally-brand-200)", background: "var(--rally-brand-soft-light)" }}>
      <div className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0" style={{ background: "var(--rally-brand-soft-light)" }}>
        {iconMap[action.type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-foreground">{action.description}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">{action.detail}</p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button onClick={onConfirm}
          className="flex items-center gap-1 px-2.5 py-1 rounded-[7px] text-white text-[11px] font-medium"
          style={{ background: "var(--rally-brand)" }}>
          <CheckCircle2 className="size-3" /> Confirm
        </button>
        <button onClick={onDeny}
          className="flex items-center gap-1 px-2.5 py-1 rounded-[7px] border border-border text-muted-foreground text-[11px] hover:bg-muted transition-colors">
          <XCircle className="size-3" /> Deny
        </button>
      </div>
    </div>
  );
}

// ── AI Sidebar ────────────────────────────────────────────────────────────────

function AISidebar({
  threads, selectedId, onSelect, onNewThread,
}: {
  threads: AIThread[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onNewThread: () => void;
}) {
  const [searchVal, setSearchVal] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const pinned = threads.filter(t => t.pinned);
  const today_ = threads.filter(t => !t.pinned && new Date(t.lastUpdated) > new Date(Date.now() - 86400000));
  const older  = threads.filter(t => !t.pinned && new Date(t.lastUpdated) <= new Date(Date.now() - 86400000));

  const filtered = searchVal.trim()
    ? threads.filter(t => t.title.toLowerCase().includes(searchVal.toLowerCase()))
    : null;

  function ThreadRow({ thread }: { thread: AIThread }) {
    const active = selectedId === thread.id;
    return (
      <button onClick={() => onSelect(thread.id)}
        className={`w-full flex flex-col gap-1 px-2.5 py-2 rounded-[9px] transition-colors text-left group ${active ? "bg-[var(--rally-brand-soft)]" : "hover:bg-muted"}`}>
        <div className="flex items-center gap-2">
          <span className={`flex-1 text-[12px] truncate ${active ? "text-[var(--rally-brand-on)] font-medium" : "text-foreground"}`}>{thread.title}</span>
          {thread.pinned && <Pin className="size-3 text-muted-foreground flex-shrink-0" />}
          <span className="text-[10px] font-normal text-muted-foreground flex-shrink-0">{timeLabel(thread.lastUpdated)}</span>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {thread.scopeBadges.slice(0, 3).map(b => <SourceBadge key={b} source={b} />)}
        </div>
      </button>
    );
  }

  function Section({ label, items }: { label: string; items: AIThread[] }) {
    if (!items.length) return null;
    return (
      <div className="mb-3">
        <p className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest" style={{ color: "var(--text-overline)" }}>{label}</p>
        <div className="space-y-0.5">
          {items.map(t => <ThreadRow key={t.id} thread={t} />)}
        </div>
      </div>
    );
  }

  return (
    <aside className="h-full flex flex-col bg-card border-r border-border" style={{ width: 248, flexShrink: 0 }}>
      {/* Header */}
      <div className="flex-shrink-0 px-3 pt-3 pb-2 border-b border-border space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AIAvatar size={22} />
            <span className="text-[13px] font-medium text-foreground">Rally AI</span>
          </div>
          <button onClick={onNewThread} title="New thread"
            className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Plus className="size-4" />
          </button>
        </div>
        {/* Search */}
        <div className={`flex items-center gap-2 px-2 py-1.5 rounded-[8px] border transition-colors bg-background ${searchFocused ? "border-[var(--rally-brand)]" : "border-border"}`}>
          <Search className="size-3.5 text-muted-foreground flex-shrink-0" />
          <input value={searchVal} onChange={e => setSearchVal(e.target.value)}
            placeholder="Search threads…"
            className="flex-1 bg-transparent text-[12px] text-foreground placeholder:text-muted-foreground outline-none"
            onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} />
        </div>
      </div>

      {/* Inbox button */}
      <div className="px-2 py-2 border-b border-[var(--border-subtle)] flex-shrink-0">
        <button onClick={() => onSelect(null)}
          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[9px] transition-colors ${selectedId === null ? "bg-[var(--rally-brand-soft)] text-[var(--rally-brand-on)]" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}>
          <Bot className="size-4 flex-shrink-0" />
          <span className="text-[13px]">AI Home</span>
        </button>
      </div>

      {/* Thread list */}
      <div className="flex-1 overflow-y-auto py-2 px-1">
        {filtered ? (
          <div className="space-y-0.5">
            {filtered.map(t => <ThreadRow key={t.id} thread={t} />)}
            {filtered.length === 0 && (
              <p className="text-[12px] text-muted-foreground px-3 py-4 text-center">No threads found</p>
            )}
          </div>
        ) : (
          <>
            <Section label="Pinned" items={pinned} />
            <Section label="Today" items={today_} />
            <Section label="Earlier" items={older} />
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-[var(--border-subtle)] px-3 py-2.5 flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">{threads.length} threads</span>
        <button className="text-[11px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
          <Bookmark className="size-3.5" /> Saved
        </button>
      </div>
    </aside>
  );
}

// ── Context Panel ─────────────────────────────────────────────────────────────

function ContextPanel({
  enabledSources, pendingActions, onConfirm, onDeny,
}: {
  enabledSources: SourceKey[];
  pendingActions: ActionPreview[];
  onConfirm: (id: string) => void;
  onDeny: (id: string) => void;
}) {
  const sourceStatus: { key: SourceKey; label: string; meta: string; available: boolean }[] = [
    { key: "team",     label: "Team knowledge",  meta: "Full access",       available: true },
    { key: "files",    label: "Files",            meta: "34 files",          available: true },
    { key: "tasks",    label: "Tasks",            meta: "12 open",           available: true },
    { key: "calendar", label: "Calendar",         meta: "3 upcoming events", available: true },
    { key: "chat",     label: "Chat",             meta: "Limited by admin",  available: false },
    { key: "web",      label: "Web",              meta: "Disabled",          available: false },
  ];

  return (
    <aside className="h-full flex flex-col bg-card border-l border-border overflow-y-auto" style={{ width: 228, flexShrink: 0 }}>
      {/* Current context */}
      <div className="p-4 border-b border-[var(--border-subtle)]">
        <p className="text-[10px] font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-overline)" }}>Current Context</p>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[7px] flex items-center justify-center flex-shrink-0" style={{ background:"#eef4ff" }}>
              <Users className="size-3.5" style={{ color:"#0f5fd7" }} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-foreground">Design Team</p>
              <p className="text-[10px] text-muted-foreground">Active workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[7px] flex items-center justify-center flex-shrink-0" style={{ background:"var(--rally-brand-soft-light)" }}>
              <Sparkles className="size-3.5" style={{ color:"var(--rally-brand)" }} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-foreground">Rally AI</p>
              <p className="text-[10px] text-muted-foreground">Default model</p>
            </div>
          </div>
        </div>
      </div>

      {/* Source access */}
      <div className="p-4 border-b border-[var(--border-subtle)]">
        <p className="text-[10px] font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-overline)" }}>Source Access</p>
        <div className="space-y-2">
          {sourceStatus.map(s => {
            const isOn = enabledSources.includes(s.key);
            return (
              <div key={s.key} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[8px] text-white"
                  style={{
                    background: s.available && isOn
                      ? "var(--status-active)"
                      : s.available
                      ? "var(--status-limited)"
                      : "var(--status-disabled)",
                  }}>
                  {s.available && isOn ? "✓" : s.available ? "·" : "✕"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-foreground">{s.label}</p>
                  <p className="text-[10px] text-muted-foreground">{s.meta}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pending actions */}
      {pendingActions.length > 0 && (
        <div className="p-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "var(--text-overline)" }}>Pending Actions</p>
            <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-medium"
              style={{ background:"var(--rally-brand)" }}>{pendingActions.length}</span>
          </div>
          <div className="space-y-2">
            {pendingActions.map(a => (
              <div key={a.id} className="p-2.5 rounded-[8px] border border-border bg-background">
                <p className="text-[11px] font-medium text-foreground mb-0.5">{a.description}</p>
                <p className="text-[10px] text-muted-foreground mb-2">{a.detail}</p>
                <div className="flex gap-1.5">
                  <button onClick={() => onConfirm(a.id)}
                    className="flex-1 py-1 rounded-[6px] text-white text-[10px] font-medium" style={{ background:"var(--rally-brand)" }}>
                    Confirm
                  </button>
                  <button onClick={() => onDeny(a.id)}
                    className="flex-1 py-1 rounded-[6px] border border-border text-muted-foreground text-[10px] hover:bg-muted transition-colors">
                    Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related work */}
      <div className="p-4 mt-auto">
        <p className="text-[10px] font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-overline)" }}>Related Work</p>
        <div className="space-y-1.5">
          {[
            { to: "/app/todo",     icon: <CheckSquare className="size-3.5" />, label: "Open tasks" },
            { to: "/app/calendar", icon: <Calendar className="size-3.5" />,    label: "View calendar" },
            { to: "/app/files",    icon: <FileText className="size-3.5" />,    label: "Browse files" },
            { to: "/app/chat-v2",  icon: <MessageSquare className="size-3.5" />, label: "Go to chat" },
          ].map(item => (
            <Link key={item.to} to={item.to}
              className="flex items-center gap-2 px-2.5 py-2 rounded-[8px] hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              {item.icon}
              <span className="text-[12px]">{item.label}</span>
              <ArrowRight className="size-3 ml-auto" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ── Composer ──────────────────────────────────────────────────────────────────

function Composer({
  value, onChange, onSend, isStreaming, enabledSources, onToggleSource,
  placeholder, showSourceChips = true, compact = false,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  isStreaming: boolean;
  enabledSources: SourceKey[];
  onToggleSource: (k: SourceKey) => void;
  placeholder?: string;
  showSourceChips?: boolean;
  compact?: boolean;
}) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!taRef.current) return;
    taRef.current.style.height = "auto";
    taRef.current.style.height = `${Math.min(taRef.current.scrollHeight, 160)}px`;
  }, [value]);

  return (
    <div className={`rounded-[14px] border border-border bg-card shadow-sm focus-within:border-[var(--rally-brand)] transition-colors ${compact ? "" : "shadow-md"}`}>
      {/* Source chips */}
      {showSourceChips && (
        <div className="flex items-center gap-1.5 px-3 pt-3 pb-1 flex-wrap">
          {sourceDefs.map(s => {
            const on = enabledSources.includes(s.key);
            return (
              <button key={s.key}
                onClick={() => s.available && onToggleSource(s.key)}
                disabled={!s.available}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border transition-colors"
                style={on
                  ? { borderColor: "var(--rally-brand)", background: "var(--rally-brand-soft)", color: "var(--rally-brand-on)" }
                  : s.available
                  ? { borderColor: "var(--border-subtle)", background: "transparent", color: "var(--muted-foreground)" }
                  : { borderColor: "var(--border-subtle)", background: "var(--badge-neutral-bg)", color: "var(--badge-neutral-text)" }}>
                {s.icon} {s.label}
                {!s.available && <span className="ml-0.5 opacity-50">✕</span>}
              </button>
            );
          })}
        </div>
      )}
      {/* Input */}
      <div className="px-4 py-2">
        <textarea ref={taRef} value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); } }}
          placeholder={placeholder ?? "Ask Rally AI anything…"}
          rows={1} disabled={isStreaming}
          className="w-full resize-none bg-transparent border-0 outline-none text-[13px] text-foreground placeholder:text-muted-foreground leading-relaxed"
        />
      </div>
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 pb-2">
        <button title="Attach file" className="w-8 h-8 flex items-center justify-center rounded-[8px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <Paperclip className="size-4" />
        </button>
        <button title="Attach task" className="w-8 h-8 flex items-center justify-center rounded-[8px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <CheckSquare className="size-4" />
        </button>
        <button title="Attach event" className="w-8 h-8 flex items-center justify-center rounded-[8px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <Calendar className="size-4" />
        </button>
        <button title="Attach channel" className="w-8 h-8 flex items-center justify-center rounded-[8px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <Hash className="size-4" />
        </button>
        <div className="flex-1" />
        <button title="Voice input" className="w-8 h-8 flex items-center justify-center rounded-[8px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <Mic className="size-4" />
        </button>
        <button onClick={onSend} disabled={!value.trim() || isStreaming}
          className="w-8 h-8 flex items-center justify-center rounded-[8px] transition-colors"
          style={{
            background: value.trim() && !isStreaming ? "var(--rally-brand)" : "var(--disabled-bg)",
            color: value.trim() && !isStreaming ? "#ffffff" : "var(--disabled-text)",
          }}>
          <Send className="size-4" />
        </button>
      </div>
    </div>
  );
}

// ── AI Home ───────────────────────────────────────────────────────────────────

function AIHome({
  user, input, onInputChange, onSend, isStreaming, enabledSources, onToggleSource, onPrompt,
}: {
  user: { name: string } | null;
  input: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
  isStreaming: boolean;
  enabledSources: SourceKey[];
  onToggleSource: (k: SourceKey) => void;
  onPrompt: (p: string) => void;
}) {
  const firstName = user?.name.split(" ")[0] ?? "there";

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-5 py-8 space-y-8">

        {/* Greeting */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <AIAvatar size={36} />
          </div>
          <h1 className="text-[22px] font-medium text-foreground mb-1">Good morning, {firstName}</h1>
          <p className="text-[13px] text-muted-foreground">Rally AI is ready. What would you like to do today?</p>
        </div>

        {/* Main input */}
        <Composer
          value={input} onChange={onInputChange} onSend={onSend}
          isStreaming={isStreaming} enabledSources={enabledSources}
          onToggleSource={onToggleSource}
          placeholder="Ask anything — or pick a prompt below…"
          showSourceChips
        />

        {/* Today with AI strip */}
        <section>
          <p className="text-[11px] font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-overline)" }}>Today with AI</p>
          <div className="grid grid-cols-2 gap-2">
            {todayStrip.map((item, i) => (
              <button key={i}
                onClick={() => onPrompt(item.prompt)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] border border-[var(--border-subtle)] bg-card hover:bg-muted transition-colors text-left">
                <div className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
                  style={{ background: item.bg, color: item.color }}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-foreground truncate">{item.label}</p>
                </div>
                <span className="text-[10px] text-[var(--rally-brand)] flex-shrink-0 font-medium">{item.action}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Starter prompts */}
        <section>
          <p className="text-[11px] font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-overline)" }}>Starter Prompts</p>
          <div className="grid grid-cols-2 gap-3">
            {starterGroups.map(group => (
              <div key={group.label} className="rounded-[12px] border border-[var(--border-subtle)] bg-card overflow-hidden">
                <div className="px-3 py-2 border-b border-[var(--border-subtle)]"
                  style={{ background: group.bg }}>
                  <span className="text-[11px] font-medium" style={{ color: group.color }}>{group.label}</span>
                </div>
                <div className="py-1">
                  {group.prompts.map((prompt, i) => (
                    <button key={i} onClick={() => onPrompt(prompt)}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted transition-colors text-left group">
                      <span className="flex-1 text-[12px] text-foreground leading-snug">{prompt}</span>
                      <ChevronRight className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick action cards */}
        <section>
          <p className="text-[11px] font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-overline)" }}>Quick Actions</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, i) => (
              <button key={i} onClick={() => onPrompt(action.prompt)}
                className="flex items-center gap-3 px-3 py-3 rounded-[10px] border border-[var(--border-subtle)] bg-card hover:bg-muted transition-colors text-left group">
                <div className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
                  style={{ background: action.bg }}>
                  <div style={{ color: action.color }}>{action.icon}</div>
                </div>
                <span className="flex-1 text-[12px] text-foreground leading-snug">{action.label}</span>
                <ArrowRight className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </button>
            ))}
          </div>
        </section>

        <div className="h-4" />
      </div>
    </div>
  );
}

// ── Thread View ───────────────────────────────────────────────────────────────

function ThreadView({
  thread, user, input, onInputChange, onSend, isStreaming, enabledSources, onToggleSource, onFollowUp,
}: {
  thread: AIThread;
  user: { name: string } | null;
  input: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
  isStreaming: boolean;
  enabledSources: SourceKey[];
  onToggleSource: (k: SourceKey) => void;
  onFollowUp: (prompt: string) => void;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread.messages, isStreaming]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Thread header */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
        <AIAvatar size={24} />
        <div className="flex-1 min-w-0">
          <h2 className="text-[14px] font-medium text-foreground leading-none truncate">{thread.title}</h2>
          <div className="flex items-center gap-1 mt-1 flex-wrap">
            {thread.scopeBadges.map(b => <SourceBadge key={b} source={b} />)}
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button title="New thread from here"
            className="flex items-center gap-1 px-2.5 h-7 rounded-[7px] border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-[11px]">
            <Plus className="size-3.5" /> New from here
          </button>
          <button title="Share thread"
            className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Share2 className="size-4" />
          </button>
          <button title="Clear context"
            className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <RotateCcw className="size-4" />
          </button>
          <button title="More options"
            className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {thread.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <AIAvatar size={40} />
            <p className="text-[13px] text-muted-foreground mt-3">Start by asking anything about this thread</p>
          </div>
        ) : (
          thread.messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && <AIAvatar size={28} />}

              <div className={`${msg.role === "user" ? "max-w-xl" : "flex-1 max-w-2xl"}`}>
                {/* Message bubble */}
                <div className={`px-4 py-3 rounded-[14px] text-[13px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-foreground text-background rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>

                {/* Source badges on AI messages */}
                {msg.role === "assistant" && msg.sources && msg.sources.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <span className="text-[10px] text-muted-foreground">Sources:</span>
                    {msg.sources.map(s => <SourceBadge key={s} source={s} />)}
                  </div>
                )}

                {/* Result cards */}
                {msg.role === "assistant" && msg.resultCards && (
                  <div className="space-y-2 mt-1">
                    {msg.resultCards.map((card, i) => (
                      <RenderResultCard key={i} card={card} onAction={onFollowUp} />
                    ))}
                  </div>
                )}

                {/* Follow-up chips */}
                {msg.role === "assistant" && msg.followUps && msg.followUps.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {msg.followUps.map((fu, i) => (
                      <button key={i} onClick={() => onFollowUp(fu.prompt)}
                        className="flex items-center gap-1 px-3 py-1 rounded-full border border-border bg-card hover:border-[var(--rally-brand)] hover:bg-[var(--rally-brand-200)] text-[11px] text-foreground transition-colors">
                        {fu.label} <ChevronRight className="size-3 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-[10px] text-muted-foreground mt-1 px-1">{formatTime(msg.timestamp)}</p>
              </div>

              {msg.role === "user" && <UserAv name={user?.name ?? "User"} size={28} />}
            </div>
          ))
        )}

        {/* Streaming indicator */}
        {isStreaming && (
          <div className="flex gap-3">
            <AIAvatar size={28} thinking />
            <div className="px-4 py-3 rounded-[14px] rounded-bl-sm bg-muted">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] text-muted-foreground">Rally AI is thinking</span>
                <span className="flex gap-1">
                  {[0,1,2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                      style={{ animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite alternate` }} />
                  ))}
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <div className="flex-shrink-0 px-4 pb-4 pt-2">
        <Composer
          value={input} onChange={onInputChange} onSend={onSend}
          isStreaming={isStreaming} enabledSources={enabledSources}
          onToggleSource={onToggleSource} showSourceChips={false} compact
          placeholder={`Ask about "${thread.title}"…`}
        />
        <p className="text-[10px] text-muted-foreground mt-1.5 px-1">
          <kbd className="px-1 py-0.5 rounded border border-border text-[10px]">Enter</kbd> to send · <kbd className="px-1 py-0.5 rounded border border-border text-[10px]">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}

// ── Follow-up suggestions after prompts ───────────────────────────────────────

const FOLLOW_UPS: FollowUp[] = [
  { label: "Turn this into tasks", prompt: "Turn the above into actionable tasks" },
  { label: "Draft a reply",        prompt: "Draft a brief reply based on the above" },
  { label: "Find supporting files",prompt: "Find files related to the above topic" },
  { label: "Add to calendar",      prompt: "Suggest a calendar event based on the above" },
  { label: "Summarize shorter",    prompt: "Give me a shorter summary of the above" },
  { label: "Search the web too",   prompt: "Search the web for more information on the above" },
];

function getAIResponse(userMsg: string, sources: SourceKey[]): Omit<AIMsg, "id" | "timestamp" | "role"> {
  const lower = userMsg.toLowerCase();
  const picks = (arr: FollowUp[]) => arr.slice(0, 3);

  if (lower.includes("file") || lower.includes("doc") || lower.includes("brief") || lower.includes("figma")) {
    return {
      content: "I searched your team's files and found the most relevant results:",
      sources: ["files"],
      resultCards: [{
        type: "files", title: "Matching files",
        items: [
          { name: "Q2_Launch_Brief.pdf",    meta: "Updated 8h ago · John" },
          { name: "Website_Header_v3.fig",  meta: "Updated 1h ago · Sarah" },
          { name: "API_Spec_v2.md",         meta: "Updated 3h ago · Emily" },
        ],
      }],
      followUps: picks([
        { label: "Summarize top file",   prompt: "Summarize Q2_Launch_Brief.pdf" },
        { label: "Find related tasks",   prompt: "Find tasks related to these files" },
        { label: "Who updated these?",   prompt: "Who made the latest changes to these files?" },
      ]),
    };
  }
  if (lower.includes("task") || lower.includes("todo") || lower.includes("create task") || lower.includes("notes into")) {
    return {
      content: "Here are the tasks I found (or created) based on your request:",
      sources: ["tasks"],
      resultCards: [{
        type: "tasks", title: "Tasks",
        items: [
          { name: "Review mobile header design",    meta: "High priority · Assigned to you" },
          { name: "Finalize API spec v2",            meta: "Medium · Emily" },
          { name: "Prepare sprint planning agenda", meta: "Urgent · Due tomorrow" },
        ],
      }],
      followUps: picks([
        { label: "Add more tasks",       prompt: "Add tasks for the items I haven't covered yet" },
        { label: "Assign tasks",         prompt: "Suggest who should own each of these tasks" },
        { label: "Find related files",   prompt: "Find files related to these tasks" },
      ]),
    };
  }
  if (lower.includes("meeting") || lower.includes("calendar") || lower.includes("event") || lower.includes("agenda") || lower.includes("standup") || lower.includes("schedule")) {
    return {
      content: "Here's what I found in your calendar:",
      sources: ["calendar"],
      resultCards: [
        {
          type: "events", title: "Upcoming events",
          items: [
            { name: "Team Standup",       meta: "Today 10:00 AM · 6 attendees" },
            { name: "Sprint Planning",    meta: "Tomorrow 10:00 AM · 5 attendees" },
            { name: "Client Review",      meta: "Friday 2:00 PM · 3 attendees" },
          ],
        },
      ],
      followUps: picks([
        { label: "Draft agenda",         prompt: "Draft an agenda for the next meeting" },
        { label: "Prepare notes",        prompt: "Help me prepare talking points for the standup" },
        { label: "Find related tasks",   prompt: "Find tasks related to these events" },
      ]),
    };
  }
  if (lower.includes("chat") || lower.includes("message") || lower.includes("mention") || lower.includes("channel") || lower.includes("summarize")) {
    return {
      content: "Here's a summary of recent chat activity relevant to your query:",
      sources: ["chat"],
      resultCards: [{
        type: "summary", title: "Chat Summary",
        summary: "Active discussions: #design (Sarah posted new header v3 designs, 5 replies), #engineering (Mike deployed build #247 to staging, Emily flagged a mobile issue). You have 3 unread @mentions across #design and DMs from Emily asking about a 2 PM call.",
      }],
      followUps: picks([
        { label: "Reply to mentions",    prompt: "Help me draft replies to my unread mentions" },
        { label: "Summarize #design",    prompt: "Summarize today's conversation in #design" },
        { label: "Turn into tasks",      prompt: "Turn the action items from chat into tasks" },
      ]),
    };
  }
  if (lower.includes("draft") || lower.includes("write") || lower.includes("update") || lower.includes("report") || lower.includes("status")) {
    return {
      content: "Here's a draft based on current team activity across tasks, files, and recent chat:",
      sources: ["tasks", "files", "chat"],
      resultCards: [{
        type: "summary", title: "Draft Status Update",
        summary: "Team Status — Week of Apr 21\n\n✅ Sarah finalized header design v3 (in review)\n✅ Mike deployed build #247 to staging (all tests passing)\n⏳ Emily completing API docs (due EOD)\n⚠️ Mobile nav drawer issue discovered — tracked\n📅 Sprint planning tomorrow 10 AM\n🎯 Launch target: May 15",
      }],
      followUps: picks([
        { label: "Refine draft",         prompt: "Improve the tone and make it more concise" },
        { label: "Add action items",     prompt: "Add a list of action items to the status update" },
        { label: "Share to channel",     prompt: "Prepare this to post in #general" },
      ]),
    };
  }
  if (lower.includes("web") || lower.includes("search") || lower.includes("internet")) {
    return {
      content: sources.includes("web")
        ? `I searched the web for "${userMsg}" and found relevant results. Note: In a production environment, real results and summaries would appear here.`
        : "Web search is not enabled. Enable the Web source chip to search the internet.",
      sources: sources.includes("web") ? ["web"] : [],
      followUps: picks(FOLLOW_UPS),
    };
  }
  // Default
  return {
    content: "I can help with that! Here's what I found across your Rally workspace:",
    sources: sources.filter(s => ["team","files","tasks"].includes(s)) as SourceKey[],
    resultCards: [{
      type: "summary", title: "Workspace Overview",
      summary: "Your team has 12 open tasks, 3 upcoming meetings, 2 unread mentions, and 1 recently updated file. Based on priorities, the most urgent item is the sprint planning preparation for tomorrow at 10 AM.",
    }],
    followUps: picks(FOLLOW_UPS),
  };
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function AIChatV2() {
  const { user, userRole } = useAuth();
  const { setSecondarySidebar } = useSecondarySidebar();

  // Clear V1 secondary sidebar
  useEffect(() => {
    setSecondarySidebar(null);
    return () => setSecondarySidebar(null);
  }, []);

  const [threads, setThreads] = useState<AIThread[]>(mockThreads);
  const [selectedId, setSelectedId] = useState<string | null>(null); // null = home
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [enabledSources, setEnabledSources] = useState<SourceKey[]>(["team","files","tasks","calendar"]);
  const [pendingActions, setPendingActions] = useState<ActionPreview[]>([]);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  const isViewer = userRole === "viewer";

  const selectedThread = threads.find(t => t.id === selectedId) ?? null;

  function toggleSource(key: SourceKey) {
    setEnabledSources(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  }

  function handleNewThread() {
    const id = `t-${Date.now()}`;
    const newThread: AIThread = {
      id, title: "New thread",
      scopeBadges: enabledSources.slice(0, 2),
      lastUpdated: new Date().toISOString(),
      messages: [],
    };
    setThreads(prev => [newThread, ...prev]);
    setSelectedId(id);
  }

  async function handleSend() {
    if (!input.trim() || isStreaming) return;
    const userText = input.trim();
    setInput("");
    setIsStreaming(true);

    const userMsg: AIMsg = {
      id: `m-${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: new Date().toISOString(),
    };

    // If on home, create a new thread
    let threadId = selectedId;
    if (!threadId) {
      threadId = `t-${Date.now()}`;
      const newThread: AIThread = {
        id: threadId,
        title: userText.slice(0, 48) + (userText.length > 48 ? "…" : ""),
        scopeBadges: enabledSources.slice(0, 3),
        lastUpdated: new Date().toISOString(),
        messages: [userMsg],
      };
      setThreads(prev => [newThread, ...prev]);
      setSelectedId(threadId);
    } else {
      setThreads(prev => prev.map(t =>
        t.id === threadId ? { ...t, messages: [...t.messages, userMsg], lastUpdated: new Date().toISOString() } : t
      ));
    }

    await new Promise(r => setTimeout(r, 900));

    const resp = getAIResponse(userText, enabledSources);
    const assistantMsg: AIMsg = {
      id: `m-${Date.now() + 1}`,
      role: "assistant",
      content: resp.content,
      timestamp: new Date().toISOString(),
      sources: resp.sources,
      resultCards: resp.resultCards,
      followUps: resp.followUps,
    };

    // Maybe add a pending action
    if (userText.toLowerCase().includes("create") || userText.toLowerCase().includes("add") || userText.toLowerCase().includes("schedule")) {
      const action: ActionPreview = {
        id: `a-${Date.now()}`,
        type: userText.toLowerCase().includes("event") || userText.toLowerCase().includes("meeting") ? "create_event" : "create_task",
        description: userText.toLowerCase().includes("event") ? "Create calendar event" : "Create task",
        detail: userText.slice(0, 60) + (userText.length > 60 ? "…" : ""),
      };
      setPendingActions(prev => [...prev, action]);
    }

    setThreads(prev => prev.map(t =>
      t.id === threadId ? { ...t, messages: [...t.messages, assistantMsg] } : t
    ));

    setIsStreaming(false);
  }

  function handleFollowUp(prompt: string) {
    setInput(prompt);
  }

  if (isViewer) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center p-8 max-w-sm">
          <AIAvatar size={44} />
          <p className="text-[15px] font-medium text-foreground mt-4 mb-1">AI Assistant</p>
          <p className="text-[13px] text-muted-foreground">
            The AI page is view-only for Viewers. Upgrade your role to ask questions and use AI actions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-row overflow-hidden bg-background">
      <AISidebar
        threads={threads}
        selectedId={selectedId}
        onSelect={id => { setSelectedId(id); setInput(""); }}
        onNewThread={handleNewThread}
      />

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-hidden">
        {selectedThread ? (
          <ThreadView
            thread={selectedThread}
            user={user}
            input={input}
            onInputChange={setInput}
            onSend={handleSend}
            isStreaming={isStreaming}
            enabledSources={enabledSources}
            onToggleSource={toggleSource}
            onFollowUp={prompt => { setInput(prompt); handleSend(); }}
          />
        ) : (
          <AIHome
            user={user}
            input={input}
            onInputChange={setInput}
            onSend={handleSend}
            isStreaming={isStreaming}
            enabledSources={enabledSources}
            onToggleSource={toggleSource}
            onPrompt={p => { setInput(p); }}
          />
        )}
      </main>

      {/* Right panel */}
      {rightPanelOpen && (
        <ContextPanel
          enabledSources={enabledSources}
          pendingActions={pendingActions}
          onConfirm={id => setPendingActions(prev => prev.filter(a => a.id !== id))}
          onDeny={id => setPendingActions(prev => prev.filter(a => a.id !== id))}
        />
      )}
    </div>
  );
}
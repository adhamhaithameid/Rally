import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  Sparkles, Plus, Search, ChevronDown, Send, Paperclip,
  Globe, FileText, CheckSquare, Calendar, MessageSquare,
  Users, Hash, Pin, X, MoreHorizontal, Trash2, Edit2,
  ArrowRight, Clock, AlarmClock, Bell, RefreshCw, Mic,
  Bookmark, Share2, RotateCcw, CheckCircle2, XCircle,
  ChevronRight, ExternalLink, Zap, PenLine, Inbox, Bot,
  SquarePen, PanelLeft, Rewind, CirclePlus, HelpCircle, CalendarClock,
  Folder, Settings,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useSecondarySidebar } from "../contexts/SecondarySidebarContext";
import { getGreeting } from "../utils/greetings";

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

// Quick prompt chips shown on the home screen
const homePromptChips = [
  { icon: <FileText className="size-3.5" />,     label: "Summarize",      prompt: "Summarize the recent conversation in this channel for me." },
  { icon: <PenLine className="size-3.5" />,       label: "Draft a Reply",  prompt: "Draft a reply to the last message in this conversation." },
  { icon: <Rewind className="size-3.5" />,        label: "Catchup",        prompt: "What did I miss? Give me a quick catchup on what happened while I was away." },
  { icon: <CirclePlus className="size-3.5" />,    label: "Create a Task",  prompt: "Create a task based on the last thing discussed in this conversation." },
  { icon: <CalendarClock className="size-3.5" />, label: "What's Due",     prompt: "What tasks and calendar events are due or coming up soon for this team?" },
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
    <div className="rounded-[10px] flex items-center justify-center flex-shrink-0"
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
    files:   <FileText   className="size-4" style={{ color: "var(--info-on)"    }} />,
    tasks:   <CheckSquare className="size-4" style={{ color: "var(--success-on)" }} />,
    events:  <Calendar   className="size-4" style={{ color: "var(--warning-on)" }} />,
    summary: <Sparkles   className="size-4" style={{ color: "var(--rally-brand)" }} />,
    action:  <Zap        className="size-4" style={{ color: "var(--warning-on)" }} />,
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
    create_task:  <CheckSquare  className="size-4" style={{ color: "var(--success-on)" }} />,
    create_event: <Calendar     className="size-4" style={{ color: "var(--warning-on)" }} />,
    send_message: <MessageSquare className="size-4" style={{ color: "var(--info-on)"    }} />,
    update_file:  <FileText     className="size-4" style={{ color: "var(--info-on)"    }} />,
  };
  return (
    <div className="flex items-start gap-3 p-3 rounded-[10px] border bg-card"
      style={{ borderColor: "var(--border-color)", background: "var(--rally-brand-soft)" }}>
      <div className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0" style={{ background: "var(--rally-brand-soft)" }}>
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
  const [collapsed, setCollapsed] = useState(false);
  const [pinnedOpen, setPinnedOpen] = useState(true);
  const [recentsOpen, setRecentsOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const pinned  = threads.filter(t => t.pinned);
  const recents = threads.filter(t => !t.pinned);

  const filtered = searchVal.trim()
    ? threads.filter(t => t.title.toLowerCase().includes(searchVal.toLowerCase()))
    : null;

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  function ThreadRow({ thread }: { thread: AIThread }) {
    const active = selectedId === thread.id;
    return (
      <button
        onClick={() => onSelect(thread.id)}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-[8px] transition-colors text-left group ${
          active ? "bg-[var(--rally-brand-soft)]" : "hover:bg-muted"
        }`}
      >
        <span className={`flex-1 text-[13px] truncate ${
          active ? "text-[var(--rally-brand-on)] font-medium" : "text-foreground"
        }`}>
          {thread.title}
        </span>
      </button>
    );
  }

  // ── Collapsed pill (Figma minimized state) ─────────────────────────
  if (collapsed) {
    return (
      <aside className="relative" style={{ width: 0, flexShrink: 0, overflow: "visible" }}>
        <div
          className="absolute top-2 left-2 z-20 flex items-center gap-[2px] p-[6px] rounded-[16px] border"
          style={{ background: "#2c2c2c", borderColor: "#4a403c" }}
        >
          <button
            onClick={() => setCollapsed(false)}
            title="Expand sidebar"
            className="w-7 h-7 flex items-center justify-center rounded-[7px] transition-colors hover:bg-white/10"
          >
            <PanelLeft className="size-4" style={{ color: "#C7B8B2" }} />
          </button>
          <button
            onClick={() => { setCollapsed(false); setTimeout(() => setSearchOpen(true), 50); }}
            title="Search threads"
            className="w-7 h-7 flex items-center justify-center rounded-[7px] transition-colors hover:bg-white/10"
          >
            <Search className="size-4" style={{ color: "#C7B8B2" }} />
          </button>
          <button
            onClick={onNewThread}
            title="New thread"
            className="w-7 h-7 flex items-center justify-center rounded-[7px] transition-colors hover:bg-white/10"
          >
            <SquarePen className="size-4" style={{ color: "#C7B8B2" }} />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className="h-full flex flex-col bg-card border-r border-border transition-all duration-200"
      style={{ width: 224, flexShrink: 0 }}
    >
      {/* Header */}
      <div className="flex-shrink-0 flex items-center px-3 py-2 border-b border-border" style={{ height: 48 }}>
        <button
          onClick={() => setCollapsed(v => !v)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <PanelLeft className="size-4" />
        </button>
        {!collapsed && (
          <>
            <div className="flex-1" />
            {searchOpen ? (
              <div className="flex items-center gap-1.5 flex-1 mx-1 px-2 py-1 rounded-[7px] border border-[var(--rally-brand)] bg-background">
                <Search className="size-3 text-muted-foreground flex-shrink-0" />
                <input
                  ref={searchRef}
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  placeholder="Search…"
                  className="flex-1 bg-transparent text-[12px] text-foreground placeholder:text-muted-foreground outline-none min-w-0"
                />
                <button onClick={() => { setSearchOpen(false); setSearchVal(""); }}
                  className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="size-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                title="Search threads"
                className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <Search className="size-4" />
              </button>
            )}
            <button
              onClick={onNewThread}
              title="New thread"
              className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors ml-0.5"
            >
              <SquarePen className="size-4" />
            </button>
          </>
        )}
      </div>

      {/* Thread list — hidden when collapsed */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto py-2">
          {filtered ? (
            <div className="px-2 space-y-0.5">
              {filtered.map(t => <ThreadRow key={t.id} thread={t} />)}
              {filtered.length === 0 && (
                <p className="text-[12px] text-muted-foreground px-3 py-4 text-center">No threads found</p>
              )}
            </div>
          ) : (
            <>
              {/* Pinned section */}
              {pinned.length > 0 && (
                <div className="mb-1">
                  <button
                    onClick={() => setPinnedOpen(v => !v)}
                    className="w-full flex items-center gap-1.5 px-4 py-1.5 hover:bg-muted transition-colors group"
                  >
                    <Pin className="size-3 " style={{ color: "rgba(199,184,178,0.55)" }} />
                    <span className="flex-1 text-[12px] text-muted-foreground text-left">Pinned</span>
                    <ChevronDown
                      className="size-3.5 text-muted-foreground transition-transform"
                      style={{ transform: pinnedOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
                    />
                  </button>
                  {pinnedOpen && (
                    <div className="px-2 space-y-0.5 mt-0.5">
                      {pinned.map(t => <ThreadRow key={t.id} thread={t} />)}
                    </div>
                  )}
                </div>
              )}

              {/* Recents section */}
              {recents.length > 0 && (
                <div className="mt-2">
                  <button
                    onClick={() => setRecentsOpen(v => !v)}
                    className="w-full flex items-center gap-1.5 px-4 py-1.5 hover:bg-muted transition-colors group"
                  >
                    <Clock className="size-3 " style={{ color: "rgba(199,184,178,0.55)" }} />
                    <span className="flex-1 text-[12px] text-muted-foreground text-left">Recents</span>
                    <ChevronDown
                      className="size-3.5 text-muted-foreground transition-transform"
                      style={{ transform: recentsOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
                    />
                  </button>
                  {recentsOpen && (
                    <div className="px-2 space-y-0.5 mt-0.5">
                      {recents.map(t => <ThreadRow key={t.id} thread={t} />)}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
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
    <div className={`rounded-[14px] border border-border bg-card transition-colors focus-within:border-[var(--rally-brand)] ${compact ? "" : "shadow-sm"}`}>
      {/* Input */}
      <div className="px-4 pt-3 pb-2">
        <textarea
          ref={taRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); } }}
          placeholder={placeholder ?? "Ask Rally AI anything…"}
          rows={1}
          disabled={isStreaming}
          className="w-full resize-none bg-transparent border-0 outline-none text-[13px] text-foreground placeholder:text-muted-foreground leading-relaxed"
        />
      </div>
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 pb-2">
        <button title="Attach" className="w-8 h-8 flex items-center justify-center rounded-[8px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <Plus className="size-4" />
        </button>
        <button
          title="Commands"
          onClick={() => { onChange((value.endsWith(" ") || value === "" ? value : value + " ") + "/"); setTimeout(() => taRef.current?.focus(), 0); }}
          className="w-8 h-8 flex items-center justify-center rounded-[8px] hover:bg-muted transition-colors"
          style={{ color: "var(--muted-foreground)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--foreground)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--muted-foreground)")}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 18, height: 18, borderRadius: "50%",
            border: "1.5px solid currentColor",
            fontSize: 11, fontWeight: 600, lineHeight: 1,
            fontFamily: "monospace",
          }}>
            /
          </span>
        </button>
        <div className="flex-1" />
        <button title="Voice input" className="w-8 h-8 flex items-center justify-center rounded-[8px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <Mic className="size-4" />
        </button>
        <button
          onClick={onSend}
          disabled={!value.trim() || isStreaming}
          className="w-8 h-8 flex items-center justify-center rounded-[8px] transition-colors"
          style={{
            background: value.trim() && !isStreaming ? "var(--rally-brand)" : "var(--disabled-bg)",
            color: value.trim() && !isStreaming ? "#ffffff" : "var(--disabled-text)",
          }}
        >
          <Send className="size-4" />
        </button>
      </div>
    </div>
  );
}

// ── AI Home ──────────────────────────────────────────────────────────────────

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
  const firstName = user?.name.split(" ")[0] ?? undefined;
  const greeting  = getGreeting(firstName);

  return (
    <div className="h-full flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-xl space-y-6">
        {/* Greeting */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-3">
            <AIAvatar size={48} />
          </div>
          <h1 className="text-[22px] font-medium text-foreground">{greeting}</h1>
          <p className="text-[13px] text-muted-foreground">Rally AI is ready. What would you like to do today?</p>
        </div>

        {/* Main input */}
        <Composer
          value={input}
          onChange={onInputChange}
          onSend={onSend}
          isStreaming={isStreaming}
          enabledSources={enabledSources}
          onToggleSource={onToggleSource}
          placeholder="Ask anything — or pick a prompt below…"
          showSourceChips={false}
        />

        {/* Quick prompt chips */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {homePromptChips.map((chip, i) => (
            <button
              key={i}
              onClick={() => onPrompt(chip.prompt)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card hover:bg-muted hover:border-[var(--border)] transition-colors text-muted-foreground hover:text-foreground"
            >
              <span style={{ color: "#5f514b" }}>{chip.icon}</span>
              <span className="text-[12px]">{chip.label}</span>
            </button>
          ))}
        </div>
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [resourcesTab, setResourcesTab] = useState<"files" | "mentions" | "sources">("files");

  // Derived resources from thread messages
  const allFiles = thread.messages.flatMap(m =>
    (m.resultCards ?? []).filter(c => c.type === "files").flatMap(c => c.items ?? [])
  );
  const allSources: SourceKey[] = Array.from(
    new Set(thread.messages.flatMap(m => m.sources ?? []))
  );
  const allMentions = thread.messages
    .filter(m => m.role === "user" && m.content.includes("@"))
    .map(m => ({ text: m.content, time: m.timestamp }));

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread.messages, isStreaming]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Thread header — no background */}
      <div className="flex-shrink-0 flex items-center gap-2 px-[16px] py-[10px]">
        <div className="flex-1 min-w-0">
          <h2 className="text-[14px] font-medium text-foreground leading-none truncate text-center">{thread.title}</h2>
        </div>

        {/* Right pill: Folder + three-dots */}
        <div
          ref={menuRef}
          className="flex items-center gap-[2px] p-[5px] rounded-[16px] border flex-shrink-0 relative"
          style={{ background: "#2C2C2C", borderColor: "rgba(199,184,178,0.18)" }}
        >
          <button
            title="Resources"
            onClick={() => setResourcesOpen(v => !v)}
            className="w-7 h-7 flex items-center justify-center rounded-[7px] transition-colors hover:bg-[rgba(199,184,178,0.08)]"
            style={{
              background: resourcesOpen ? "rgba(199,184,178,0.14)" : "transparent",
              color: "#C7B8B2",
            }}
          >
            <Folder className="size-4" />
          </button>
          <button
            title="More options"
            onClick={() => setMenuOpen(v => !v)}
            className="w-7 h-7 flex items-center justify-center rounded-[7px] transition-colors hover:bg-[rgba(199,184,178,0.08)]"
            style={{
              background: menuOpen ? "rgba(199,184,178,0.14)" : "transparent",
              color: "#C7B8B2",
            }}
          >
            <MoreHorizontal className="size-4" />
          </button>

          {/* Popup menu */}
          {menuOpen && (
            <div className="absolute top-full right-0 mt-1.5 w-[160px] rounded-[10px] border border-border bg-card shadow-lg z-30 py-1 overflow-hidden">
              <button onClick={() => setMenuOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-foreground hover:bg-muted transition-colors">
                <Pin className="size-3.5 " style={{ color: "rgba(199,184,178,0.55)" }} /> Pin
              </button>
              <button onClick={() => setMenuOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-foreground hover:bg-muted transition-colors">
                <Share2 className="size-3.5 " style={{ color: "rgba(199,184,178,0.55)" }} /> Share
              </button>
              <button onClick={() => setMenuOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-foreground hover:bg-muted transition-colors">
                <Edit2 className="size-3.5 " style={{ color: "rgba(199,184,178,0.55)" }} /> Rename
              </button>
              <div className="my-1 border-t border-[var(--border-subtle)]" />
              <button onClick={() => setMenuOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] transition-colors hover:bg-muted" style={{ color: "var(--error-on)" }}>
                <Trash2 className="size-3.5" style={{ color: "var(--error-on)" }} /> Delete
              </button>
            </div>
          )}

          {/* ── Resources pill — connected popover ── */}
          {resourcesOpen && (
            <>
              {/* Connector bridging header pill and resources pill */}
              <div
                className="absolute z-30 pointer-events-none"
                style={{
                  top: "100%",
                  right: 14,
                  width: 28,
                  height: 10,
                  background: "#2C2C2C",
                  borderLeft: "1px solid rgba(199,184,178,0.18)",
                  borderRight: "1px solid rgba(199,184,178,0.18)",
                  marginTop: -1,
                }}
              />
              <div
                className="absolute z-20 flex flex-col rounded-[16px] border overflow-hidden"
                style={{
                  top: "calc(100% + 9px)",
                  right: 0,
                  width: 300,
                  background: "#2C2C2C",
                  borderColor: "rgba(199,184,178,0.18)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                {/* Header */}
                <div className="flex-shrink-0 flex items-center justify-between px-3 pt-3 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-[22px] h-[22px] rounded-[7px] flex items-center justify-center"
                      style={{ background: "rgba(199,184,178,0.10)", border: "1px solid rgba(199,184,178,0.18)" }}
                    >
                      <Folder className="size-[11px]" style={{ color: "#C7B8B2" }} />
                    </div>
                    <span style={{ color: "#C7B8B2", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      Resources
                    </span>
                  </div>
                  <button
                    onClick={() => setResourcesOpen(false)}
                    className="w-[22px] h-[22px] flex items-center justify-center rounded-[6px] transition-colors hover:bg-[rgba(199,184,178,0.08)]"
                    style={{ color: "#C7B8B2" }}
                  >
                    <X className="size-[11px]" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex-shrink-0 flex items-center gap-[3px] px-3 pb-2.5">
                  {([
                    { label: "Files",    key: "files",    Icon: FileText },
                    { label: "Mentions", key: "mentions", Icon: Hash },
                    { label: "Sources",  key: "sources",  Icon: Globe },
                  ] as const).map(({ label, key, Icon }) => {
                    const active = resourcesTab === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setResourcesTab(key)}
                        className="h-[26px] flex-1 rounded-[8px] flex items-center justify-center gap-[5px] transition-all"
                        style={{
                          background: active ? "rgba(199,184,178,0.14)" : "transparent",
                          color: active ? "#C7B8B2" : "rgba(199,184,178,0.55)",
                          fontWeight: 500,
                          fontSize: 11,
                          border: `1px solid ${active ? "rgba(199,184,178,0.30)" : "transparent"}`,
                        }}
                      >
                        <Icon className="size-[10px]" />
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="mx-3 mb-2" style={{ height: 1, background: "rgba(199,184,178,0.18)" }} />

                {/* Body */}
                <div className="overflow-y-auto px-2.5 pb-3 space-y-[2px] max-h-[260px]">
                  {resourcesTab === "files" && (
                    allFiles.length > 0 ? allFiles.map((f, i) => (
                      <div
                        key={i}
                        className="group flex items-center gap-[9px] px-2 py-[6px] rounded-[9px] cursor-pointer transition-colors border border-transparent hover:border-[rgba(199,184,178,0.18)] hover:bg-[rgba(199,184,178,0.08)]"
                      >
                        <div
                          className="rounded-[7px] flex items-center justify-center flex-shrink-0"
                          style={{ width: 26, height: 26, background: "rgba(199,184,178,0.10)", border: "1px solid rgba(199,184,178,0.18)" }}
                        >
                          <FileText className="size-3" style={{ color: "#C7B8B2" }} />
                        </div>
                        <div className="min-w-0 flex-1 flex flex-col gap-[1px]">
                          <p className="truncate" style={{ color: "#C7B8B2", fontSize: 12, lineHeight: "16px" }}>{f.name}</p>
                          {f.meta && <p style={{ color: "rgba(199,184,178,0.55)", fontSize: 10, lineHeight: "14px" }}>{f.meta}</p>}
                        </div>
                        <ExternalLink className="size-[10px] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity " style={{ color: "rgba(199,184,178,0.55)" }} />
                      </div>
                    )) : (
                      <div className="flex flex-col items-center justify-center py-6 text-center gap-2">
                        <div
                          className="w-9 h-9 rounded-[11px] flex items-center justify-center"
                          style={{ background: "rgba(199,184,178,0.10)", border: "1px solid rgba(199,184,178,0.18)" }}
                        >
                          <Folder className="size-4" style={{ color: "#C7B8B2", opacity: 0.7 }} />
                        </div>
                        <p style={{ color: "rgba(199,184,178,0.55)", fontSize: 11 }}>No files referenced yet</p>
                      </div>
                    )
                  )}

                  {resourcesTab === "mentions" && (
                    allMentions.length > 0 ? allMentions.map((m, i) => (
                      <div
                        key={i}
                        className="group flex items-start gap-[9px] px-2 py-[6px] rounded-[9px] cursor-pointer transition-colors border border-transparent hover:border-[rgba(199,184,178,0.18)] hover:bg-[rgba(199,184,178,0.08)]"
                      >
                        <div
                          className="rounded-[7px] flex items-center justify-center flex-shrink-0 mt-[1px]"
                          style={{ width: 26, height: 26, background: "rgba(199,184,178,0.10)", border: "1px solid rgba(199,184,178,0.18)" }}
                        >
                          <Hash className="size-3" style={{ color: "#C7B8B2" }} />
                        </div>
                        <div className="min-w-0 flex-1 flex flex-col gap-[1px]">
                          <p className="line-clamp-1" style={{ color: "#C7B8B2", fontSize: 12, lineHeight: "16px" }}>{m.text}</p>
                          <p style={{ color: "rgba(199,184,178,0.55)", fontSize: 10, lineHeight: "14px" }}>{timeLabel(m.time)}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="flex flex-col items-center justify-center py-6 text-center gap-2">
                        <div
                          className="w-9 h-9 rounded-[11px] flex items-center justify-center"
                          style={{ background: "rgba(199,184,178,0.10)", border: "1px solid rgba(199,184,178,0.18)" }}
                        >
                          <Hash className="size-4" style={{ color: "#C7B8B2", opacity: 0.7 }} />
                        </div>
                        <p style={{ color: "rgba(199,184,178,0.55)", fontSize: 11 }}>No @mentions in this thread</p>
                      </div>
                    )
                  )}

                  {resourcesTab === "sources" && (
                    allSources.length > 0 ? allSources.map(s => {
                      const def = sourceDefs.find(sd => sd.key === s);
                      return (
                        <div
                          key={s}
                          className="group flex items-center gap-[9px] px-2 py-[6px] rounded-[9px] cursor-pointer transition-colors border border-transparent hover:border-[rgba(199,184,178,0.18)] hover:bg-[rgba(199,184,178,0.08)]"
                        >
                          <div
                            className="rounded-[7px] flex items-center justify-center flex-shrink-0"
                            style={{ width: 26, height: 26, background: "rgba(199,184,178,0.10)", border: "1px solid rgba(199,184,178,0.18)" }}
                          >
                            <span className="flex" style={{ color: "#C7B8B2" }}>{def?.icon}</span>
                          </div>
                          <p className="capitalize flex-1" style={{ color: "#C7B8B2", fontSize: 12 }}>{s}</p>
                          <ExternalLink className="size-[10px] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity " style={{ color: "rgba(199,184,178,0.55)" }} />
                        </div>
                      );
                    }) : (
                      <div className="flex flex-col items-center justify-center py-6 text-center gap-2">
                        <div
                          className="w-9 h-9 rounded-[11px] flex items-center justify-center"
                          style={{ background: "rgba(199,184,178,0.10)", border: "1px solid rgba(199,184,178,0.18)" }}
                        >
                          <Globe className="size-4" style={{ color: "#C7B8B2", opacity: 0.7 }} />
                        </div>
                        <p style={{ color: "rgba(199,184,178,0.55)", fontSize: 11 }}>No sources used yet</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
                    ? "rounded-br-sm"
                    : "rounded-bl-sm"
                }`} style={{ backgroundColor: "#2C2C2C", color: "#FFF2ED" }}>
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
                        className="flex items-center gap-1 px-3 py-1 rounded-full border border-border bg-card hover:border-[var(--rally-brand)] hover:bg-[var(--rally-brand-soft)] text-[11px] text-foreground transition-colors">
                        {fu.label} <ChevronRight className="size-3 " style={{ color: "rgba(199,184,178,0.55)" }} />
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
          value={input}
          onChange={onInputChange}
          onSend={onSend}
          isStreaming={isStreaming}
          enabledSources={enabledSources}
          onToggleSource={onToggleSource}
          showSourceChips={false}
          compact
          placeholder={`Ask about "${thread.title}"…`}
        />
      </div>
      </div>{/* end messages+composer col */}
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

  const isViewer = userRole === "viewer";
  const selectedThread = threads.find(t => t.id === selectedId) ?? null;

  function toggleSource(key: SourceKey) {
    setEnabledSources(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  }

  function handleNewThread() {
    setSelectedId(null);
    setInput("");
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
        {selectedThread && selectedThread.messages.length > 0 ? (
          <ThreadView
            thread={selectedThread}
            user={user}
            input={input}
            onInputChange={setInput}
            onSend={handleSend}
            isStreaming={isStreaming}
            enabledSources={enabledSources}
            onToggleSource={toggleSource}
            onFollowUp={prompt => { handleFollowUp(prompt); }}
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
            onPrompt={prompt => { setInput(prompt); }}
          />
        )}
      </main>
    </div>
  );
}
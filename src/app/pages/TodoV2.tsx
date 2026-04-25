import { useState, useRef, useEffect } from "react";
import {
  Plus, Search, Filter, CheckCircle2, Circle, AlertCircle,
  Clock, Calendar, Tag, FileText, MessageSquare, Sparkles,
  ChevronDown, ChevronRight, MoreHorizontal, Trash2, Edit2,
  X, Check, Flag, ArrowUpRight, Zap, Users, Hash, Link2,
  AlignLeft, Activity, ChevronUp,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

// ── Types ─────────────────────────────────────────────────────────────────────

type Priority   = "urgent" | "high" | "medium" | "low";
type Status     = "todo" | "in-progress" | "blocked" | "done";
type LabelKey   = "design" | "engineering" | "planning" | "review" | "bug" | "feature";
type TabView    = "my-work" | "team-board" | "all-tasks" | "completed";
type TimeGroup  = "overdue" | "today" | "upcoming" | "later";

interface TaskLink { type: "file" | "chat" | "event"; label: string }

interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate?: string;       // ISO date "YYYY-MM-DD"
  labels: LabelKey[];
  assignees: string[];    // names
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  links?: TaskLink[];
  aiGenerated?: boolean;
  completedAt?: string;
}

interface ActivityEntry { id: string; text: string; time: string }

// ── Config ────────────────────────────────────────────────────────────────────

const TODAY = "2026-04-21";
const NOW   = new Date(TODAY).getTime();

const PRIORITY: Record<Priority, { label: string; color: string; bg: string; dot: string }> = {
  urgent: { label: "Urgent", color: "#d90000", bg: "#fff0ef", dot: "#d90000" },
  high:   { label: "High",   color: "#8a4f00", bg: "#fff4e5", dot: "#f97316" },
  medium: { label: "Medium", color: "#0f5fd7", bg: "#eef4ff", dot: "#3b82f6" },
  low:    { label: "Low",    color: "#0f6a43", bg: "#eaf7f0", dot: "#10b981" },
};

const STATUS: Record<Status, { label: string; color: string; bg: string }> = {
  "todo":        { label: "To Do",       color: "#6b7280", bg: "#f3f4f6" },
  "in-progress": { label: "In Progress", color: "#0f5fd7", bg: "#eef4ff" },
  "blocked":     { label: "Blocked",     color: "#d90000", bg: "#fff0ef" },
  "done":        { label: "Done",        color: "#0f6a43", bg: "#eaf7f0" },
};

const LABEL: Record<LabelKey, { color: string; bg: string }> = {
  design:      { color: "#6b21a8", bg: "#f5f3ff" },
  engineering: { color: "#0f5fd7", bg: "#eef4ff" },
  planning:    { color: "#0f6a43", bg: "#eaf7f0" },
  review:      { color: "#8a4f00", bg: "#fff4e5" },
  bug:         { color: "#d90000", bg: "#fff0ef" },
  feature:     { color: "#374151", bg: "#f3f4f6" },
};

// ── Mock data ─────────────────────────────────────────────────────────────────

const initialTasks: Task[] = [
  {
    id: "t1", title: "Review mobile header design", description: "Review the latest header designs from Sarah in Figma. Focus on the mobile nav drawer and CTA button color choices.",
    status: "in-progress", priority: "high", dueDate: "2026-04-17",
    labels: ["design", "review"], assignees: ["Sarah Johnson"],
    createdBy: "John Doe", createdAt: "2026-04-15T09:00:00", updatedAt: "2026-04-18T10:00:00",
    links: [{ type: "file", label: "Website_Header_v3.fig" }, { type: "chat", label: "#design" }],
  },
  {
    id: "t2", title: "Finalize API spec v2", description: "Complete the API specification document for the new endpoints. Emily has started — needs review and sign-off.",
    status: "blocked", priority: "urgent", dueDate: "2026-04-19",
    labels: ["engineering"], assignees: ["Emily Davis"],
    createdBy: "John Doe", createdAt: "2026-04-14T14:00:00", updatedAt: "2026-04-19T08:00:00",
    links: [{ type: "file", label: "API_Spec_v2.md" }],
  },
  {
    id: "t3", title: "Sprint planning agenda", description: "Prepare the agenda for tomorrow's sprint planning session. Include backlog items, velocity review, and capacity planning.",
    status: "in-progress", priority: "high", dueDate: TODAY,
    labels: ["planning"], assignees: ["John Doe"],
    createdBy: "John Doe", createdAt: "2026-04-20T09:00:00", updatedAt: "2026-04-21T08:30:00",
    links: [{ type: "event", label: "Sprint Planning — Apr 22" }],
  },
  {
    id: "t4", title: "Fix mobile nav drawer", description: "The mobile navigation drawer has a spacing issue reported by Emily. Needs investigation and a fix before the staging review.",
    status: "todo", priority: "high", dueDate: TODAY,
    labels: ["bug", "engineering"], assignees: ["Mike Chen"],
    createdBy: "Emily Davis", createdAt: "2026-04-21T07:00:00", updatedAt: "2026-04-21T07:00:00",
    links: [{ type: "chat", label: "#engineering" }],
  },
  {
    id: "t5", title: "Team standup notes", description: "Write up and share team standup notes from today's call for team members who couldn't attend.",
    status: "todo", priority: "low", dueDate: TODAY,
    labels: ["planning"], assignees: ["John Doe"],
    createdBy: "John Doe", createdAt: "2026-04-21T10:00:00", updatedAt: "2026-04-21T10:00:00",
    links: [{ type: "event", label: "Team Standup" }],
  },
  {
    id: "t6", title: "Prepare Q2 launch brief", description: "Consolidate all Q2 launch materials into a single brief document for stakeholder review. Include timeline, deliverables, and risk items.",
    status: "todo", priority: "medium", dueDate: "2026-04-25",
    labels: ["planning"], assignees: ["John Doe", "Sarah Johnson"],
    createdBy: "John Doe", createdAt: "2026-04-20T11:00:00", updatedAt: "2026-04-20T11:00:00",
    links: [{ type: "file", label: "Q2_Launch_Brief.pdf" }],
  },
  {
    id: "t7", title: "Code review: auth changes", description: "Review Mike's PR for the auth flow changes. Ensure security best practices and no breaking changes.",
    status: "todo", priority: "medium", dueDate: "2026-04-24",
    labels: ["engineering", "review"], assignees: ["Mike Chen"],
    createdBy: "Mike Chen", createdAt: "2026-04-20T15:00:00", updatedAt: "2026-04-20T15:00:00",
  },
  {
    id: "t8", title: "Design system component audit", description: "Audit existing design system components for inconsistencies. Document findings and create tasks for any fixes needed.",
    status: "todo", priority: "low", dueDate: "2026-04-28",
    labels: ["design"], assignees: ["Sarah Johnson"],
    createdBy: "Sarah Johnson", createdAt: "2026-04-19T09:00:00", updatedAt: "2026-04-19T09:00:00",
  },
  {
    id: "t9", title: "Research competitor features", description: "Do a competitive analysis of 3-4 top competitors. Focus on onboarding flows and AI assistant features.",
    status: "todo", priority: "low",
    labels: ["planning"], assignees: ["John Doe"],
    createdBy: "John Doe", createdAt: "2026-04-10T09:00:00", updatedAt: "2026-04-10T09:00:00",
  },
  {
    id: "t10", title: "Draft onboarding copy", description: "Write the copy for the new user onboarding flow. Tone should match the Rally brand: friendly, clear, action-oriented.",
    status: "todo", priority: "medium",
    labels: ["feature", "design"], assignees: ["Sarah Johnson"],
    createdBy: "AI", createdAt: "2026-04-18T14:00:00", updatedAt: "2026-04-18T14:00:00",
    aiGenerated: true,
  },
  {
    id: "t11", title: "Update API documentation", description: "Update the developer docs with the new v2 endpoints. Include usage examples and error codes.",
    status: "done", priority: "medium", dueDate: "2026-04-20",
    labels: ["engineering"], assignees: ["Emily Davis"],
    createdBy: "Emily Davis", createdAt: "2026-04-15T09:00:00", updatedAt: "2026-04-20T17:00:00",
    completedAt: "2026-04-20T17:00:00",
  },
  {
    id: "t12", title: "Deploy staging build #247", description: "Deploy the latest build to the staging environment and run smoke tests.",
    status: "done", priority: "high", dueDate: "2026-04-21",
    labels: ["engineering"], assignees: ["Mike Chen"],
    createdBy: "Mike Chen", createdAt: "2026-04-21T08:00:00", updatedAt: "2026-04-21T11:00:00",
    completedAt: "2026-00-21T11:00:00",
  },
];

const mockActivity: Record<string, ActivityEntry[]> = {
  t1: [
    { id: "a1", text: "Sarah Johnson updated the Figma file", time: "1h ago" },
    { id: "a2", text: "Priority changed from Medium to High", time: "3h ago" },
    { id: "a3", text: "Task created by John Doe", time: "4 days ago" },
  ],
  t2: [
    { id: "a1", text: "Status moved to Blocked", time: "2 days ago" },
    { id: "a2", text: "Emily Davis added to task", time: "3 days ago" },
    { id: "a3", text: "Task created by John Doe", time: "7 days ago" },
  ],
  t3: [
    { id: "a1", text: "Sprint Planning event linked", time: "30m ago" },
    { id: "a2", text: "Task created by John Doe", time: "Yesterday" },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseDate(d?: string) { return d ? new Date(d).getTime() : null; }

function timeGroup(t: Task): TimeGroup {
  const due = parseDate(t.dueDate);
  if (!due) return "later";
  const today = new Date(TODAY).setHours(0,0,0,0);
  if (due < today) return "overdue";
  if (due === today) return "today";
  if (due <= today + 7 * 86400000) return "upcoming";
  return "later";
}

function dueDateLabel(d?: string) {
  if (!d) return null;
  const due = new Date(d);
  const today = new Date(TODAY);
  const diff = Math.round((due.getTime() - today.getTime()) / 86400000);
  if (diff < 0) return `${Math.abs(diff)}d overdue`;
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return due.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function dueDateColor(d?: string) {
  if (!d) return "text-muted-foreground";
  const due = new Date(d).getTime();
  const today = new Date(TODAY).setHours(0,0,0,0);
  if (due < today) return "text-red-600 dark:text-red-400";
  if (due === today) return "text-orange-600 dark:text-orange-400";
  return "text-muted-foreground";
}

function avatarBg(name: string) {
  const c = ["#3B82F6","#10B981","#F59E0B","#8B5CF6","#EC4899","#14B8A6","#F97316"];
  let h = 0; for (const ch of name) h = ch.charCodeAt(0) + ((h << 5) - h);
  return c[Math.abs(h) % c.length];
}

function Av({ name, size = 22 }: { name: string; size?: number }) {
  const init = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className="rounded-full flex items-center justify-center text-white flex-shrink-0"
      style={{ width: size, height: size, background: avatarBg(name), fontSize: size * 0.38, fontWeight: 600 }}>
      {init}
    </div>
  );
}

// ── Focus Strip ───────────────────────────────────────────────────────────────

function FocusStrip({ tasks, onFilter }: { tasks: Task[]; onFilter: (g: TimeGroup | "blocked") => void }) {
  const today_ = new Date(TODAY).setHours(0,0,0,0);
  const overdue  = tasks.filter(t => t.status !== "done" && parseDate(t.dueDate)! < today_).length;
  const dueToday = tasks.filter(t => t.status !== "done" && t.dueDate === TODAY).length;
  const blocked  = tasks.filter(t => t.status === "blocked").length;
  const doneToday= tasks.filter(t => t.status === "done" && t.completedAt?.startsWith(TODAY)).length;

  const cards = [
    { label: "Overdue",    value: overdue,   color: "#d90000", bg: "#fff0ef", border: "#f5c2c2", action: () => onFilter("overdue") },
    { label: "Due Today",  value: dueToday,  color: "#8a4f00", bg: "#fff4e5", border: "#f5d6a8", action: () => onFilter("today") },
    { label: "Blocked",    value: blocked,   color: "#6b21a8", bg: "#f5f3ff", border: "#d8b4fe", action: () => onFilter("blocked") },
    { label: "Done Today", value: doneToday, color: "#0f6a43", bg: "#eaf7f0", border: "#a7f3d0", action: () => {} },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mb-4">
      {cards.map(c => (
        <button key={c.label} onClick={c.action}
          className="flex items-center gap-3 px-4 py-3 rounded-[12px] border text-left transition-all hover:shadow-sm"
          style={{ background: c.bg, borderColor: c.border }}>
          <span className="text-[26px] font-medium leading-none" style={{ color: c.color }}>{c.value}</span>
          <span className="text-[12px] leading-tight" style={{ color: c.color }}>{c.label}</span>
        </button>
      ))}
    </div>
  );
}

// ── Quick Add ─────────────────────────────────────────────────────────────────

function QuickAdd({ onAdd, disabled }: { onAdd: (t: Partial<Task>) => void; disabled: boolean }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [due, setDue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function submit() {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), priority, dueDate: due || undefined });
    setTitle(""); setPriority("medium"); setDue(""); setOpen(false);
  }

  return (
    <div className="mb-4 rounded-[12px] border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <Plus className="size-4 text-muted-foreground flex-shrink-0" />
        <input ref={inputRef} value={title} onChange={e => { setTitle(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={e => e.key === "Enter" && submit()}
          placeholder={disabled ? "Read-only — upgrade role to create tasks" : "Quick add a task… (press Enter to save)"}
          disabled={disabled}
          className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none disabled:opacity-60" />
        {title && (
          <button onClick={submit} className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-[6px] text-white"
            style={{ background: "var(--rally-brand)" }}>
            <Check className="size-3.5" />
          </button>
        )}
      </div>
      {open && !disabled && (
        <div className="flex items-center gap-2 px-3 py-2 border-t border-[var(--border-subtle)] bg-muted/30 flex-wrap">
          <span className="text-[11px] text-muted-foreground">Priority:</span>
          {(["urgent","high","medium","low"] as Priority[]).map(p => (
            <button key={p} onClick={() => setPriority(p)}
              className="px-2 py-0.5 rounded-full text-[10px] border transition-colors"
              style={priority === p
                ? { background: PRIORITY[p].bg, borderColor: PRIORITY[p].color, color: PRIORITY[p].color }
                : { borderColor: "var(--border)", color: "var(--muted-foreground)", background: "transparent" }}>
              {PRIORITY[p].label}
            </button>
          ))}
          <div className="flex items-center gap-1 ml-2">
            <Calendar className="size-3.5 text-muted-foreground" />
            <input type="date" value={due} onChange={e => setDue(e.target.value)}
              className="text-[11px] bg-transparent text-foreground outline-none" />
          </div>
          <button onClick={() => { setOpen(false); setTitle(""); }}
            className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
            <X className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

// ── Task Row ──────────────────────────────────────────────────────────────────

function TaskRow({
  task, selected, onSelect, onToggleDone, canEdit,
}: {
  task: Task; selected: boolean;
  onSelect: () => void; onToggleDone: () => void; canEdit: boolean;
}) {
  const pri = PRIORITY[task.priority];
  const isDone = task.status === "done";
  const dl = dueDateLabel(task.dueDate);

  return (
    <div onClick={onSelect}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] border transition-all cursor-pointer group ${
        selected ? "border-[var(--rally-brand)] bg-[var(--rally-brand-soft-light)]" : "border-border bg-card hover:border-[var(--border)] hover:bg-muted/30"
      }`}>
      {/* Done toggle */}
      <button onClick={e => { e.stopPropagation(); canEdit && onToggleDone(); }}
        className="flex-shrink-0 transition-colors"
        title={isDone ? "Mark incomplete" : "Mark done"}>
        {isDone
          ? <CheckCircle2 className="size-4" style={{ color: "#0f6a43" }} />
          : <Circle className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />}
      </button>

      {/* Priority dot */}
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: pri.dot }} />

      {/* Title */}
      <span className={`flex-1 text-[13px] truncate ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>
        {task.title}
      </span>

      {/* Labels */}
      {task.labels.slice(0, 2).map(l => (
        <span key={l} className="hidden sm:inline-flex px-1.5 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0"
          style={{ background: LABEL[l].bg, color: LABEL[l].color }}>
          {l}
        </span>
      ))}

      {/* Context chips */}
      {task.links?.map((lk, i) => {
        const Icon = lk.type === "file" ? FileText : lk.type === "chat" ? MessageSquare : Calendar;
        return (
          <Icon key={i} className="size-3.5 text-muted-foreground hidden md:block flex-shrink-0" title={lk.label} />
        );
      })}
      {task.aiGenerated && (
        <Sparkles className="size-3.5 flex-shrink-0" style={{ color: "var(--rally-brand)" }} title="AI generated" />
      )}

      {/* Assignees */}
      <div className="hidden sm:flex -space-x-1 flex-shrink-0">
        {task.assignees.slice(0, 2).map(a => <Av key={a} name={a} size={20} />)}
      </div>

      {/* Due date */}
      {dl && (
        <span className={`text-[11px] flex-shrink-0 whitespace-nowrap ${dueDateColor(task.dueDate)}`}>{dl}</span>
      )}

      {/* Status badge — only for non-default */}
      {(task.status === "blocked" || task.status === "in-progress") && (
        <span className="hidden lg:inline-flex px-1.5 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0"
          style={{ background: STATUS[task.status].bg, color: STATUS[task.status].color }}>
          {STATUS[task.status].label}
        </span>
      )}
    </div>
  );
}

// ── Task Group ────────────────────────────────────────────────────────────────

function TaskGroup({
  label, tasks, selectedId, onSelect, onToggleDone, canEdit, accent,
}: {
  label: string; tasks: Task[]; selectedId: string | null;
  onSelect: (t: Task) => void; onToggleDone: (id: string) => void; canEdit: boolean;
  accent?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  if (!tasks.length) return null;
  return (
    <div className="mb-4">
      <button onClick={() => setCollapsed(v => !v)}
        className="flex items-center gap-2 mb-2 group w-full text-left">
        <ChevronDown className={`size-3.5 text-muted-foreground transition-transform ${collapsed ? "-rotate-90" : ""}`} />
        <span className="text-[11px] font-medium uppercase tracking-widest" style={{ color: accent ?? "var(--text-overline)" }}>
          {label}
        </span>
        <span className="text-[10px] text-muted-foreground ml-1">({tasks.length})</span>
      </button>
      {!collapsed && (
        <div className="space-y-1.5">
          {tasks.map(t => (
            <TaskRow key={t.id} task={t} selected={selectedId === t.id}
              onSelect={() => onSelect(t)} onToggleDone={() => onToggleDone(t.id)} canEdit={canEdit} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Task Detail Panel ─────────────────────────────────────────────────────────

function DetailPanel({
  task, onClose, onUpdate, canEdit,
}: {
  task: Task; onClose: () => void;
  onUpdate: (id: string, patch: Partial<Task>) => void; canEdit: boolean;
}) {
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc,  setEditDesc]  = useState(task.description);
  const [showAI,    setShowAI]    = useState(false);
  const activity = mockActivity[task.id] ?? [];

  useEffect(() => { setEditTitle(task.title); setEditDesc(task.description); }, [task.id]);

  const aiActions = [
    "Break into steps",
    "Suggest priority",
    "Summarize related chat",
    "Plan my day",
  ];

  return (
    <aside className="h-full flex flex-col bg-card border-l border-border overflow-hidden" style={{ width: 320, flexShrink: 0 }}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)]">
        <span className="flex-1 text-[12px] font-medium text-muted-foreground">Task detail</span>
        <button onClick={() => setShowAI(v => !v)} title="AI assist"
          className={`w-7 h-7 flex items-center justify-center rounded-[7px] transition-colors ${showAI ? "bg-[var(--rally-brand-soft-light)]" : "hover:bg-muted text-muted-foreground"}`}
          style={{ color: showAI ? "var(--rally-brand)" : undefined }}>
          <Sparkles className="size-4" />
        </button>
        <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <X className="size-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {/* AI assist */}
        {showAI && (
          <div className="p-3 rounded-[10px] border" style={{ borderColor: "var(--rally-brand-200)", background: "var(--rally-brand-soft-light)" }}>
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="size-3.5" style={{ color: "var(--rally-brand)" }} />
              <span className="text-[11px] font-medium" style={{ color: "var(--rally-brand)" }}>AI Assist</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {aiActions.map(a => (
                <button key={a} className="px-2.5 py-1 rounded-full border border-border bg-card text-[11px] text-foreground hover:border-[var(--rally-brand)] hover:bg-[var(--rally-brand-200)] transition-colors">
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Title */}
        <div>
          {canEdit ? (
            <input value={editTitle} onChange={e => setEditTitle(e.target.value)}
              onBlur={() => editTitle.trim() && onUpdate(task.id, { title: editTitle.trim() })}
              className="w-full text-[15px] font-medium text-foreground bg-transparent outline-none border-b border-transparent hover:border-border focus:border-[var(--rally-brand)] pb-0.5 transition-colors"
              placeholder="Task title" />
          ) : (
            <p className="text-[15px] font-medium text-foreground">{task.title}</p>
          )}
        </div>

        {/* Status & Priority row */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-overline)" }}>Status</p>
            {canEdit ? (
              <select value={task.status}
                onChange={e => onUpdate(task.id, { status: e.target.value as Status })}
                className="w-full text-[12px] rounded-[7px] border border-border bg-background text-foreground px-2 py-1.5 outline-none">
                {(Object.keys(STATUS) as Status[]).map(s => <option key={s} value={s}>{STATUS[s].label}</option>)}
              </select>
            ) : (
              <span className="inline-flex px-2 py-1 rounded-[7px] text-[12px]"
                style={{ background: STATUS[task.status].bg, color: STATUS[task.status].color }}>
                {STATUS[task.status].label}
              </span>
            )}
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-overline)" }}>Priority</p>
            {canEdit ? (
              <select value={task.priority}
                onChange={e => onUpdate(task.id, { priority: e.target.value as Priority })}
                className="w-full text-[12px] rounded-[7px] border border-border bg-background text-foreground px-2 py-1.5 outline-none">
                {(Object.keys(PRIORITY) as Priority[]).map(p => <option key={p} value={p}>{PRIORITY[p].label}</option>)}
              </select>
            ) : (
              <span className="inline-flex px-2 py-1 rounded-[7px] text-[12px]"
                style={{ background: PRIORITY[task.priority].bg, color: PRIORITY[task.priority].color }}>
                {PRIORITY[task.priority].label}
              </span>
            )}
          </div>
        </div>

        {/* Due date */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-overline)" }}>Due Date</p>
          {canEdit ? (
            <input type="date" value={task.dueDate ?? ""}
              onChange={e => onUpdate(task.id, { dueDate: e.target.value || undefined })}
              className="text-[12px] rounded-[7px] border border-border bg-background text-foreground px-2 py-1.5 outline-none w-full" />
          ) : (
            <p className={`text-[13px] ${dueDateColor(task.dueDate)}`}>{dueDateLabel(task.dueDate) ?? "No due date"}</p>
          )}
        </div>

        {/* Assignees */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-overline)" }}>Assignees</p>
          <div className="flex items-center gap-2 flex-wrap">
            {task.assignees.map(a => (
              <div key={a} className="flex items-center gap-1.5">
                <Av name={a} size={22} />
                <span className="text-[12px] text-foreground">{a}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Labels */}
        {task.labels.length > 0 && (
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-overline)" }}>Labels</p>
            <div className="flex flex-wrap gap-1.5">
              {task.labels.map(l => (
                <span key={l} className="px-2 py-0.5 rounded-full text-[11px] font-medium"
                  style={{ background: LABEL[l].bg, color: LABEL[l].color }}>
                  {l}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-overline)" }}>Description</p>
          {canEdit ? (
            <textarea value={editDesc} onChange={e => setEditDesc(e.target.value)}
              onBlur={() => onUpdate(task.id, { description: editDesc })}
              rows={4} placeholder="Add a description…"
              className="w-full text-[12px] text-foreground bg-background border border-border rounded-[8px] px-3 py-2 outline-none resize-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground" />
          ) : (
            <p className="text-[12px] text-muted-foreground leading-relaxed">{task.description || "No description."}</p>
          )}
        </div>

        {/* Linked context */}
        {task.links && task.links.length > 0 && (
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-overline)" }}>Linked to</p>
            <div className="space-y-1.5">
              {task.links.map((lk, i) => {
                const Icon = lk.type === "file" ? FileText : lk.type === "chat" ? MessageSquare : Calendar;
                const colors: Record<string, string> = { file:"#6b21a8", chat:"#0f5fd7", event:"#d90000" };
                return (
                  <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded-[8px] border border-border bg-background hover:bg-muted transition-colors cursor-pointer">
                    <Icon className="size-3.5 flex-shrink-0" style={{ color: colors[lk.type] }} />
                    <span className="text-[12px] text-foreground flex-1 truncate">{lk.label}</span>
                    <ArrowUpRight className="size-3.5 text-muted-foreground" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Activity */}
        {activity.length > 0 && (
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-overline)" }}>Activity</p>
            <div className="space-y-2">
              {activity.map(a => (
                <div key={a.id} className="flex items-start gap-2">
                  <Activity className="size-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-muted-foreground flex-1">{a.text}</p>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI badge */}
        {task.aiGenerated && (
          <div className="flex items-center gap-2 px-2.5 py-2 rounded-[8px]" style={{ background:"var(--rally-brand-soft-light)", border:"1px solid var(--rally-brand-200)" }}>
            <Sparkles className="size-3.5 flex-shrink-0" style={{ color:"var(--rally-brand)" }} />
            <span className="text-[11px]" style={{ color:"var(--rally-brand)" }}>Created by Rally AI</span>
          </div>
        )}
      </div>

      {/* Footer actions */}
      {canEdit && (
        <div className="flex-shrink-0 border-t border-[var(--border-subtle)] px-4 py-3 flex gap-2">
          <button
            onClick={() => onUpdate(task.id, { status: task.status === "done" ? "todo" : "done", completedAt: task.status === "done" ? undefined : new Date().toISOString() })}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[8px] text-white text-[12px] font-medium transition-colors"
            style={{ background: task.status === "done" ? "#6b7280" : "#0f6a43" }}>
            <CheckCircle2 className="size-3.5" />
            {task.status === "done" ? "Reopen" : "Mark Done"}
          </button>
        </div>
      )}
    </aside>
  );
}

// ── Board Card ────────────────────────────────────────────────────────────────

function BoardCard({ task, selected, onSelect }: { task: Task; selected: boolean; onSelect: () => void }) {
  const pri = PRIORITY[task.priority];
  return (
    <div onClick={onSelect}
      className={`p-3 rounded-[10px] border bg-card cursor-pointer transition-all hover:shadow-sm ${selected ? "border-[var(--rally-brand)]" : "border-border hover:border-[var(--border)]"}`}>
      <div className="flex items-start gap-2 mb-2">
        <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: pri.dot }} />
        <p className="text-[12px] text-foreground leading-snug flex-1">{task.title}</p>
      </div>
      <div className="flex items-center gap-1.5 flex-wrap">
        {task.labels.slice(0, 2).map(l => (
          <span key={l} className="px-1.5 py-0.5 rounded-full text-[10px] font-medium"
            style={{ background: LABEL[l].bg, color: LABEL[l].color }}>{l}</span>
        ))}
        <div className="flex-1" />
        {task.dueDate && (
          <span className={`text-[10px] ${dueDateColor(task.dueDate)}`}>{dueDateLabel(task.dueDate)}</span>
        )}
        {task.assignees[0] && <Av name={task.assignees[0]} size={18} />}
      </div>
    </div>
  );
}

// ── Board View ────────────────────────────────────────────────────────────────

function BoardView({ tasks, selectedId, onSelect, onAdd, canEdit }: {
  tasks: Task[]; selectedId: string | null;
  onSelect: (t: Task) => void; onAdd: (status: Status) => void; canEdit: boolean;
}) {
  const cols: { status: Status; accentBg: string; accentColor: string }[] = [
    { status: "todo",        accentBg: "#f3f4f6", accentColor: "#374151" },
    { status: "in-progress", accentBg: "#eef4ff", accentColor: "#0f5fd7" },
    { status: "blocked",     accentBg: "#fff0ef", accentColor: "#d90000" },
    { status: "done",        accentBg: "#eaf7f0", accentColor: "#0f6a43" },
  ];

  return (
    <div className="flex gap-4 h-full overflow-x-auto pb-2">
      {cols.map(col => {
        const colTasks = tasks.filter(t => t.status === col.status);
        return (
          <div key={col.status} className="flex flex-col" style={{ minWidth: 240, width: 260 }}>
            {/* Column header */}
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-[10px] mb-3" style={{ background: col.accentBg }}>
              <span className="text-[12px] font-medium" style={{ color: col.accentColor }}>{STATUS[col.status].label}</span>
              <span className="ml-auto text-[11px]" style={{ color: col.accentColor }}>{colTasks.length}</span>
              {canEdit && (
                <button onClick={() => onAdd(col.status)}
                  className="w-5 h-5 flex items-center justify-center rounded transition-colors hover:bg-white/50">
                  <Plus className="size-3.5" style={{ color: col.accentColor }} />
                </button>
              )}
            </div>
            {/* Cards */}
            <div className="space-y-2 flex-1 overflow-y-auto">
              {colTasks.map(t => (
                <BoardCard key={t.id} task={t} selected={selectedId === t.id} onSelect={() => onSelect(t)} />
              ))}
              {colTasks.length === 0 && (
                <div className="flex items-center justify-center h-20 rounded-[10px] border border-dashed border-border text-muted-foreground text-[12px]">
                  Empty
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── All Tasks list ────────────────────────────────────────────────────────────

function AllTasksView({ tasks, selectedId, onSelect, onToggleDone, canEdit }: {
  tasks: Task[]; selectedId: string | null;
  onSelect: (t: Task) => void; onToggleDone: (id: string) => void; canEdit: boolean;
}) {
  return (
    <div className="space-y-1.5">
      {tasks.map(t => (
        <TaskRow key={t.id} task={t} selected={selectedId === t.id}
          onSelect={() => onSelect(t)} onToggleDone={() => onToggleDone(t.id)} canEdit={canEdit} />
      ))}
      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <CheckCircle2 className="size-10 text-muted-foreground opacity-30 mb-3" />
          <p className="text-[14px] text-muted-foreground">No tasks match your search</p>
        </div>
      )}
    </div>
  );
}

// ── Needs Attention ───────────────────────────────────────────────────────────

function NeedsAttention({ tasks }: { tasks: Task[] }) {
  const [open, setOpen] = useState(false);
  const changed = tasks
    .filter(t => t.status !== "done" && t.updatedAt !== t.createdAt)
    .slice(0, 4);
  if (!changed.length) return null;

  return (
    <div className="mt-2 rounded-[12px] border border-border bg-card overflow-hidden">
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-muted/30 transition-colors">
        <Activity className="size-4 text-muted-foreground" />
        <span className="text-[13px] text-foreground flex-1 text-left">Recently changed</span>
        <span className="text-[11px] text-muted-foreground mr-1">{changed.length}</span>
        {open ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="border-t border-[var(--border-subtle)] divide-y divide-[var(--border-subtle)]">
          {changed.map(t => (
            <div key={t.id} className="flex items-center gap-3 px-4 py-2.5">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: PRIORITY[t.priority].dot }} />
              <span className="flex-1 text-[12px] text-foreground truncate">{t.title}</span>
              {t.assignees[0] && <Av name={t.assignees[0]} size={20} />}
              <span className="text-[10px] text-muted-foreground flex-shrink-0">Updated recently</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function TodoV2() {
  const { userRole } = useAuth();
  const canEdit = userRole !== "viewer";

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTab, setActiveTab] = useState<TabView>("my-work");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");
  const [focusFilter, setFocusFilter] = useState<TimeGroup | "blocked" | null>(null);

  function addTask(patch: Partial<Task>) {
    const newTask: Task = {
      id: `t${Date.now()}`, title: patch.title ?? "Untitled task",
      description: "", status: "todo",
      priority: patch.priority ?? "medium",
      dueDate: patch.dueDate,
      labels: [], assignees: ["John Doe"],
      createdBy: "John Doe",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  }

  function updateTask(id: string, patch: Partial<Task>) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t));
    if (selectedTask?.id === id) setSelectedTask(prev => prev ? { ...prev, ...patch } : prev);
  }

  function toggleDone(id: string) {
    const t = tasks.find(t => t.id === id);
    if (!t) return;
    updateTask(id, {
      status: t.status === "done" ? "todo" : "done",
      completedAt: t.status === "done" ? undefined : new Date().toISOString(),
    });
  }

  // Filter & search
  const activeTasks = tasks.filter(t => t.status !== "done");
  const completedTasks = tasks.filter(t => t.status === "done");

  function applySearch(list: Task[]) {
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
  }

  function applyPriority(list: Task[]) {
    return filterPriority === "all" ? list : list.filter(t => t.priority === filterPriority);
  }

  function applyFocusFilter(list: Task[]) {
    if (!focusFilter) return list;
    if (focusFilter === "blocked") return list.filter(t => t.status === "blocked");
    return list.filter(t => timeGroup(t) === focusFilter);
  }

  const filtered = applyFocusFilter(applyPriority(applySearch(activeTasks)));

  // My Work groups
  const overdue   = filtered.filter(t => timeGroup(t) === "overdue");
  const todayT    = filtered.filter(t => timeGroup(t) === "today");
  const upcoming  = filtered.filter(t => timeGroup(t) === "upcoming");
  const later     = filtered.filter(t => timeGroup(t) === "later");

  const tabs: { id: TabView; label: string }[] = [
    { id: "my-work",    label: "My Work" },
    { id: "team-board", label: "Team Board" },
    { id: "all-tasks",  label: "All Tasks" },
    { id: "completed",  label: "Completed" },
  ];

  const showPanel = !!selectedTask;

  return (
    <div className="h-full flex flex-col overflow-hidden bg-background">
      {/* Top bar */}
      <div className="flex-shrink-0 px-5 pt-5 pb-3 border-b border-border bg-card">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-[16px] font-medium text-foreground">Tasks</h1>
          <div className="flex-1" />
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search tasks…"
              className="pl-8 pr-3 h-8 w-44 rounded-[8px] border border-border bg-background text-[12px] text-foreground placeholder:text-muted-foreground outline-none focus:border-[var(--rally-brand)] transition-colors" />
          </div>
          {/* Priority filter */}
          <select value={filterPriority} onChange={e => setFilterPriority(e.target.value as Priority | "all")}
            className="h-8 px-2 rounded-[8px] border border-border bg-background text-[12px] text-foreground outline-none hidden md:block">
            <option value="all">All priorities</option>
            {(Object.keys(PRIORITY) as Priority[]).map(p => <option key={p} value={p}>{PRIORITY[p].label}</option>)}
          </select>
          {/* Ask AI */}
          <button className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-[12px]">
            <Sparkles className="size-3.5" style={{ color: "var(--rally-brand)" }} /> Ask AI
          </button>
          {/* New Task */}
          {canEdit && (
            <button onClick={() => addTask({ title: "New task" })}
              className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] text-white text-[12px] font-medium transition-colors"
              style={{ background: "var(--rally-brand)" }}>
              <Plus className="size-3.5" /> New Task
            </button>
          )}
        </div>

        {/* Subnav */}
        <div className="flex items-center gap-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setFocusFilter(null); }}
              className={`px-3 py-1.5 rounded-[7px] text-[12px] transition-colors ${
                activeTab === tab.id
                  ? "bg-[var(--rally-brand-soft-light)] text-[var(--rally-brand)] font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}>
              {tab.label}
              {tab.id === "completed" && completedTasks.length > 0 && (
                <span className="ml-1 text-[10px] opacity-60">({completedTasks.length})</span>
              )}
            </button>
          ))}
          {focusFilter && (
            <button onClick={() => setFocusFilter(null)}
              className="ml-2 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] border"
              style={{ borderColor: "var(--rally-brand)", background: "var(--rally-brand-soft-light)", color: "var(--rally-brand)" }}>
              <X className="size-3" /> Clear filter
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden flex">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === "my-work" && (
            <>
              <FocusStrip tasks={tasks} onFilter={f => { setFocusFilter(f); setActiveTab("my-work"); }} />
              {canEdit && <QuickAdd onAdd={addTask} disabled={!canEdit} />}
              {filtered.length === 0 && !search && !focusFilter ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-3" style={{ background: "#eaf7f0" }}>
                    <CheckCircle2 className="size-6" style={{ color: "#0f6a43" }} />
                  </div>
                  <p className="text-[14px] font-medium text-foreground mb-1">You're clear for today</p>
                  <p className="text-[12px] text-muted-foreground">No active tasks. Create one or check upcoming work.</p>
                </div>
              ) : (
                <>
                  <TaskGroup label="Overdue" tasks={overdue} selectedId={selectedTask?.id ?? null}
                    onSelect={t => setSelectedTask(t)} onToggleDone={toggleDone} canEdit={canEdit}
                    accent="#d90000" />
                  <TaskGroup label="Today" tasks={todayT} selectedId={selectedTask?.id ?? null}
                    onSelect={t => setSelectedTask(t)} onToggleDone={toggleDone} canEdit={canEdit}
                    accent="#8a4f00" />
                  <TaskGroup label="Upcoming" tasks={upcoming} selectedId={selectedTask?.id ?? null}
                    onSelect={t => setSelectedTask(t)} onToggleDone={toggleDone} canEdit={canEdit}
                    accent="#0f5fd7" />
                  <TaskGroup label="Later / No Date" tasks={later} selectedId={selectedTask?.id ?? null}
                    onSelect={t => setSelectedTask(t)} onToggleDone={toggleDone} canEdit={canEdit} />
                </>
              )}
              <NeedsAttention tasks={tasks} />
            </>
          )}

          {activeTab === "team-board" && (
            <div className="h-full">
              <BoardView tasks={applySearch(tasks.filter(t => t.status !== "done"))}
                selectedId={selectedTask?.id ?? null}
                onSelect={t => setSelectedTask(t)}
                onAdd={status => addTask({ status })}
                canEdit={canEdit} />
            </div>
          )}

          {activeTab === "all-tasks" && (
            <>
              {canEdit && <QuickAdd onAdd={addTask} disabled={!canEdit} />}
              <AllTasksView tasks={applyPriority(applySearch(activeTasks))}
                selectedId={selectedTask?.id ?? null}
                onSelect={t => setSelectedTask(t)} onToggleDone={toggleDone} canEdit={canEdit} />
            </>
          )}

          {activeTab === "completed" && (
            <AllTasksView tasks={applySearch(completedTasks)}
              selectedId={selectedTask?.id ?? null}
              onSelect={t => setSelectedTask(t)} onToggleDone={toggleDone} canEdit={canEdit} />
          )}
        </div>

        {/* Detail panel */}
        {showPanel && selectedTask && (
          <DetailPanel
            key={selectedTask.id}
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onUpdate={updateTask}
            canEdit={canEdit}
          />
        )}
      </div>

      {/* Viewer badge */}
      {!canEdit && (
        <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border-t border-border bg-muted/30">
          <AlertCircle className="size-3.5 text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground">Read-only view — upgrade your role to create or edit tasks.</p>
        </div>
      )}
    </div>
  );
}
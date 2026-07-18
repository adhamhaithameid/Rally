import { useState, useMemo, useEffect, useRef } from "react";
import {
  Plus, Filter, ChevronLeft, ChevronRight,
  MoreHorizontal, Calendar as CalendarIcon, ArrowUpDown, X,
  Pencil, Trash2, LayoutList, LayoutGrid, Columns3, Tag, Check,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

// ── Types ────────────────────────────────────────────────────────────────────
type StatusKey = "in-progress" | "pending" | "complete";
type FilterKey = "all" | StatusKey;

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  assigneeName: string;
  assigneeInitials: string;
  status: StatusKey;
  taskType: string;
}

const STATUS_META: Record<StatusKey, { label: string; dot: string; bg: string; on: string }> = {
  "in-progress": { label: "In progress", dot: "var(--info-solid)",    bg: "var(--info-soft)",    on: "var(--info-on)"    },
  "pending":     { label: "Pending",     dot: "var(--warning-solid)", bg: "var(--warning-soft)", on: "var(--warning-on)" },
  "complete":    { label: "Complete",    dot: "var(--success-solid)", bg: "var(--success-soft)", on: "var(--success-on)" },
};

const STATUS_OPTIONS: StatusKey[] = ["in-progress", "pending", "complete"];
const TASK_TYPES = [
  "Documentation", "Litigation Support", "Document Review", "Evidence Mgmt",
  "Trial Preparation", "Discovery Coord", "Legal Research", "Case Analysis",
  "Depo Summaries", "Client Comms", "General",
];

// ── Mock data ────────────────────────────────────────────────────────────────
const initialTasks: Task[] = [
  { id: "1",  title: "Draft cover letter",         description: "Draft cover letter for the client",         dueDate: "01/25/2025", assigneeName: "Guy Hawkins",     assigneeInitials: "GH", status: "in-progress", taskType: "Documentation"     },
  { id: "2",  title: "Finalize merger compliance", description: "Finalize merger compliance",                dueDate: "01/28/2025", assigneeName: "Ava Thompson",    assigneeInitials: "AT", status: "complete",    taskType: "Litigation Support" },
  { id: "3",  title: "Review merger compliance",   description: "Finalize merger compliance docs",           dueDate: "02/02/2025", assigneeName: "Ethan Brown",     assigneeInitials: "EB", status: "complete",    taskType: "Document Review"    },
  { id: "4",  title: "Schedule deposition",        description: "Schedule deposition with witnesses",        dueDate: "02/05/2025", assigneeName: "Sophia Martinez", assigneeInitials: "SM", status: "in-progress", taskType: "Evidence Mgmt"      },
  { id: "5",  title: "Translate contract",         description: "Translate contract clauses",                dueDate: "02/10/2025", assigneeName: "Mason Lee",       assigneeInitials: "ML", status: "pending",     taskType: "Trial Preparation"  },
  { id: "6",  title: "Upload evidence files",      description: "Upload evidence files to client portal",    dueDate: "02/12/2025", assigneeName: "Isabella Garcia", assigneeInitials: "IG", status: "pending",     taskType: "Discovery Coord"    },
  { id: "7",  title: "Draft subpoena for hearing", description: "Draft subpoena for hearing",                dueDate: "02/15/2025", assigneeName: "Ethan Brown",     assigneeInitials: "EB", status: "pending",     taskType: "Legal Research"     },
  { id: "8",  title: "Verify billing hours",       description: "Verify billing hours for January",          dueDate: "02/18/2025", assigneeName: "Olivia Wilson",   assigneeInitials: "OW", status: "in-progress", taskType: "Case Analysis"      },
  { id: "9",  title: "File appeal motion",         description: "File appeal motion with the court",         dueDate: "02/20/2025", assigneeName: "Lucas Anderson",  assigneeInitials: "LA", status: "pending",     taskType: "Depo Summaries"     },
  { id: "10", title: "Finalize agreement draft",   description: "Finalize agreement draft for client",       dueDate: "02/22/2025", assigneeName: "Mia Taylor",      assigneeInitials: "MT", status: "pending",     taskType: "Client Comms"       },
];

// ── Utilities ────────────────────────────────────────────────────────────────
function initialsFor(name: string) {
  return name.split(" ").filter(Boolean).map((p) => p[0]).slice(0, 2).join("").toUpperCase() || "—";
}

function parseTaskDate(d: string): Date | null {
  const [m, day, y] = d.split("/");
  if (!m || !day || !y) return null;
  return new Date(`${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`);
}

// ── Atoms ────────────────────────────────────────────────────────────────────
function StatusPill({ s }: { s: StatusKey }) {
  const m = STATUS_META[s];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-full text-[12px] leading-tight"
      style={{ background: m.bg, color: m.on, fontWeight: "var(--font-weight-medium)" }}
    >
      <span className="inline-block rounded-full" style={{ width: 6, height: 6, background: m.dot }} />
      {m.label}
    </span>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full flex-shrink-0 text-[11px]"
      style={{
        width: 24, height: 24,
        background: "var(--muted)",
        color: "var(--muted-foreground)",
        fontWeight: "var(--font-weight-medium)",
      }}
    >
      {initials}
    </span>
  );
}

function FilterPill({
  label, status, active, onClick,
}: { label: string; status?: StatusKey; active: boolean; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  const dot = status ? STATUS_META[status].dot : null;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] whitespace-nowrap transition-colors flex-shrink-0"
      style={{
        fontWeight: "var(--font-weight-medium)",
        color: active ? "var(--rally-brand-on)" : "var(--text-primary)",
        background: active
          ? "var(--rally-brand-soft)"
          : hover ? "var(--interactive-hover-bg)" : "transparent",
        border: `1px solid ${active ? "transparent" : "var(--border-color)"}`,
      }}
    >
      {dot && <span className="inline-block rounded-full" style={{ width: 6, height: 6, background: dot }} />}
      {label}
    </button>
  );
}

function IconButton({
  icon: Icon, label, onClick, active = false, btnRef,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
  active?: boolean;
  btnRef?: React.RefObject<HTMLButtonElement>;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={label}
      aria-label={label}
      className="inline-flex items-center justify-center w-8 h-8 rounded-[8px] transition-colors flex-shrink-0"
      style={{
        color: active ? "var(--rally-brand-on)" : "var(--text-secondary)",
        background: active
          ? "var(--rally-brand-soft)"
          : hover ? "var(--interactive-hover-bg)" : "transparent",
        border: `1px solid ${active ? "var(--rally-brand)" : "var(--border-color)"}`,
      }}
    >
      <Icon className="size-4" />
    </button>
  );
}

function IconToggle({
  icon: Icon, label, active, onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className="inline-flex items-center justify-center w-7 h-7 rounded-[6px] transition-colors"
      style={{
        background: active ? "var(--elevated)" : "transparent",
        color: active ? "var(--rally-brand-on)" : "var(--text-secondary)",
        boxShadow: active ? "var(--shadow-sm)" : "none",
      }}
    >
      <Icon className="size-4" />
    </button>
  );
}

function ColHeader({ label }: { label: string }) {
  return (
    <th
      className="text-left px-4 py-2.5 text-[11px] uppercase tracking-[0.08em] whitespace-nowrap"
      style={{
        color: "var(--text-tertiary)",
        fontWeight: "var(--font-weight-medium)",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <ArrowUpDown className="size-[11px] opacity-60" />
      </span>
    </th>
  );
}

// ── Row Menu (Edit / Delete) ─────────────────────────────────────────────────
function RowMenu({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className="inline-flex items-center justify-center w-7 h-7 rounded-[8px] transition-colors"
        style={{
          background: open ? "var(--muted)" : "transparent",
          color: "var(--text-secondary)",
        }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.background = "var(--muted)"; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.background = "transparent"; }}
      >
        <MoreHorizontal className="size-4" />
      </button>
      {open && (
        <div
          className="absolute right-0 mt-1 z-20 min-w-[140px] py-1 rounded-[10px]"
          style={{
            background: "var(--popover)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <MenuItem icon={Pencil} onClick={() => { setOpen(false); onEdit(); }}>Edit</MenuItem>
          <MenuItem icon={Trash2} destructive onClick={() => { setOpen(false); onDelete(); }}>Delete</MenuItem>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  children, icon: Icon, onClick, destructive = false,
}: {
  children: React.ReactNode; onClick: () => void; destructive?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-[13px] transition-colors"
      style={{
        color: destructive ? "var(--error-solid)" : "var(--text-primary)",
        background: hover ? "var(--interactive-hover-bg)" : "transparent",
        fontWeight: "var(--font-weight-medium)",
      }}
    >
      <Icon className="size-3.5" />
      {children}
    </button>
  );
}

// ── Date Range Picker dropdown ────────────────────────────────────────────────
function DateRangePicker({
  dateFrom, dateTo, onChange, onClear, onClose, anchorRect,
}: {
  dateFrom: string; dateTo: string;
  onChange: (from: string, to: string) => void;
  onClear: () => void;
  onClose: () => void;
  anchorRect: DOMRect;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);

  const hasFilter = dateFrom || dateTo;

  return (
    <div
      ref={ref}
      className="w-[260px] rounded-[12px] p-4"
      style={{
        position: "fixed",
        top: anchorRect.bottom + 6,
        right: window.innerWidth - anchorRect.right,
        zIndex: 9999,
        background: "var(--popover)",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px]" style={{ color: "var(--text-primary)", fontWeight: "var(--font-weight-medium)" }}>
          Date Range
        </span>
        {hasFilter && (
          <button onClick={onClear} className="text-[12px]" style={{ color: "var(--rally-brand-on)" }}>
            Clear
          </button>
        )}
      </div>
      <div className="space-y-3">
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.08em] mb-1" style={{ color: "var(--text-tertiary)", fontWeight: "var(--font-weight-medium)" }}>
            From
          </span>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => onChange(e.target.value, dateTo)}
            className="w-full px-3 py-2 rounded-[8px] text-[13px] outline-none"
            style={{ background: "var(--input-background)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
          />
        </label>
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.08em] mb-1" style={{ color: "var(--text-tertiary)", fontWeight: "var(--font-weight-medium)" }}>
            To
          </span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => onChange(dateFrom, e.target.value)}
            min={dateFrom || undefined}
            className="w-full px-3 py-2 rounded-[8px] text-[13px] outline-none"
            style={{ background: "var(--input-background)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
          />
        </label>
      </div>
    </div>
  );
}

// ── Filter Panel dropdown ─────────────────────────────────────────────────────
function FilterPanel({
  typeFilters, onToggleType, onClear, onClose, anchorRect,
}: {
  typeFilters: string[];
  onToggleType: (t: string) => void;
  onClear: () => void;
  onClose: () => void;
  anchorRect: DOMRect;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="w-[220px] rounded-[12px] py-2"
      style={{
        position: "fixed",
        top: anchorRect.bottom + 6,
        right: window.innerWidth - anchorRect.right,
        zIndex: 9999,
        background: "var(--popover)",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <div className="flex items-center justify-between px-4 pb-2" style={{ borderBottom: "1px solid var(--border-color)" }}>
        <span className="text-[13px]" style={{ color: "var(--text-primary)", fontWeight: "var(--font-weight-medium)" }}>
          Task Type
        </span>
        {typeFilters.length > 0 && (
          <button onClick={onClear} className="text-[12px]" style={{ color: "var(--rally-brand-on)" }}>
            Clear
          </button>
        )}
      </div>
      <div className="pt-1 max-h-[240px] overflow-y-auto">
        {TASK_TYPES.map((t) => {
          const checked = typeFilters.includes(t);
          return (
            <button
              key={t}
              onClick={() => onToggleType(t)}
              className="w-full flex items-center gap-2.5 px-4 py-1.5 text-left text-[13px] transition-colors"
              style={{ color: "var(--text-primary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--interactive-hover-bg)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span
                className="inline-flex items-center justify-center w-4 h-4 rounded-[4px] flex-shrink-0 transition-colors"
                style={{
                  background: checked ? "var(--rally-brand)" : "var(--input-background)",
                  border: `1px solid ${checked ? "var(--rally-brand)" : "var(--border-color)"}`,
                }}
              >
                {checked && <Check className="size-2.5 text-white" />}
              </span>
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Event Modal (New / Edit) ─────────────────────────────────────────────────
function EventModal({
  initial, onClose, onSave,
}: {
  initial: Task | null;
  onClose: () => void;
  onSave: (t: Task) => void;
}) {
  const isEdit = !!initial;
  const [title, setTitle]       = useState(initial?.title ?? "");
  const [description, setDesc]  = useState(initial?.description ?? "");
  const [dueDate, setDueDate]   = useState(initial?.dueDate ?? "");
  const [assignee, setAssignee] = useState(initial?.assigneeName ?? "");
  const [status, setStatus]     = useState<StatusKey>(initial?.status ?? "pending");
  const [taskType, setTaskType] = useState(initial?.taskType ?? TASK_TYPES[0]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function submit() {
    if (!title.trim()) return;
    const next: Task = {
      id: initial?.id ?? `n${Date.now()}`,
      title: title.trim(),
      description: description.trim() || "—",
      dueDate: dueDate.trim() || "—",
      assigneeName: assignee.trim() || "Unassigned",
      assigneeInitials: initialsFor(assignee.trim() || "Unassigned"),
      status,
      taskType,
    };
    onSave(next);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(35,29,26,0.45)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] rounded-[16px] overflow-hidden flex flex-col"
        style={{
          background: "var(--popover)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-lg)",
          maxHeight: "calc(100vh - 32px)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--border-color)" }}>
          <h2 className="text-[16px]" style={{ color: "var(--text-primary)", fontWeight: "var(--font-weight-medium)" }}>
            {isEdit ? "Edit Event" : "New Event"}
          </h2>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center w-7 h-7 rounded-[8px] transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--interactive-hover-bg)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-3 overflow-y-auto">
          <Field label="Title">
            <TextInput value={title} onChange={setTitle} placeholder="Event title" autoFocus />
          </Field>
          <Field label="Description">
            <TextArea value={description} onChange={setDesc} placeholder="Add a description…" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Due Date">
              <TextInput value={dueDate} onChange={setDueDate} placeholder="MM/DD/YYYY" />
            </Field>
            <Field label="Assigned to">
              <TextInput value={assignee} onChange={setAssignee} placeholder="Full name" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Status">
              <SelectInput value={status} onChange={(v) => setStatus(v as StatusKey)}>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{STATUS_META[s].label}</option>
                ))}
              </SelectInput>
            </Field>
            <Field label="Task Type">
              <SelectInput value={taskType} onChange={setTaskType}>
                {TASK_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </SelectInput>
            </Field>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3" style={{ borderTop: "1px solid var(--border-color)" }}>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[8px] text-[13px] transition-colors"
            style={{
              background: "transparent",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-color)",
              fontWeight: "var(--font-weight-medium)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={!title.trim()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] text-[13px] transition-colors"
            style={{
              background: title.trim() ? "var(--rally-brand)" : "var(--disabled-bg)",
              color: title.trim() ? "#fff" : "var(--disabled-text)",
              fontWeight: "var(--font-weight-medium)",
              cursor: title.trim() ? "pointer" : "not-allowed",
            }}
            onMouseEnter={(e) => { if (title.trim()) e.currentTarget.style.background = "var(--rally-brand-hover)"; }}
            onMouseLeave={(e) => { if (title.trim()) e.currentTarget.style.background = "var(--rally-brand)"; }}
          >
            {isEdit ? "Save Changes" : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.08em] mb-1" style={{ color: "var(--text-tertiary)", fontWeight: "var(--font-weight-medium)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

function TextInput({ value, onChange, placeholder, autoFocus }: {
  value: string; onChange: (v: string) => void; placeholder?: string; autoFocus?: boolean;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className="w-full px-3 py-2 rounded-[8px] text-[13px] outline-none transition-colors"
      style={{ background: "var(--input-background)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
    />
  );
}

function TextArea({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full px-3 py-2 rounded-[8px] text-[13px] outline-none resize-y transition-colors"
      style={{ background: "var(--input-background)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
    />
  );
}

function SelectInput({ value, onChange, children }: {
  value: string; onChange: (v: string) => void; children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-[8px] text-[13px] outline-none transition-colors"
      style={{ background: "var(--input-background)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
    >
      {children}
    </select>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export function TodoV2() {
  const { userRole } = useAuth();
  const canEdit = userRole !== "viewer";

  const [tasks, setTasks]       = useState<Task[]>(initialTasks);
  const [view, setView]         = useState<"list" | "gallery" | "kanban">("list");
  const [filter, setFilter]     = useState<FilterKey>("all");
  const [page, setPage]         = useState(1);
  const pageSize = 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState<Task | null>(null);

  // Date range filter state
  const [dateFrom, setDateFrom]   = useState("");
  const [dateTo, setDateTo]       = useState("");
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [datePickerRect, setDatePickerRect] = useState<DOMRect | null>(null);

  // Task type filter state
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [filterOpen, setFilterOpen]   = useState(false);
  const [filterRect, setFilterRect]   = useState<DOMRect | null>(null);

  const datePickerBtnRef = useRef<HTMLButtonElement>(null);
  const filterBtnRef     = useRef<HTMLButtonElement>(null);

  const hasDateFilter = !!(dateFrom || dateTo);
  const hasTypeFilter = typeFilters.length > 0;

  const filtered = useMemo(() => {
    let result = tasks;
    if (filter !== "all") result = result.filter((t) => t.status === filter);
    if (dateFrom) {
      const from = new Date(dateFrom);
      result = result.filter((t) => { const d = parseTaskDate(t.dueDate); return d ? d >= from : true; });
    }
    if (dateTo) {
      const to = new Date(dateTo);
      result = result.filter((t) => { const d = parseTaskDate(t.dueDate); return d ? d <= to : true; });
    }
    if (typeFilters.length > 0) {
      result = result.filter((t) => typeFilters.includes(t.taskType));
    }
    return result;
  }, [tasks, filter, dateFrom, dateTo, typeFilters]);

  const total     = filtered.length;
  const start     = (page - 1) * pageSize;
  const visible   = filtered.slice(start, start + pageSize);
  const rangeText = total === 0
    ? "0-0 of 0"
    : `${start + 1}-${Math.min(start + pageSize, total)} of ${total}`;

  function openNew()              { setEditing(null); setModalOpen(true); }
  function openEdit(t: Task)      { setEditing(t); setModalOpen(true); }
  function closeModal()           { setModalOpen(false); setEditing(null); }
  function deleteTask(id: string) { setTasks((prev) => prev.filter((t) => t.id !== id)); }
  function saveTask(next: Task) {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === next.id);
      return exists ? prev.map((t) => (t.id === next.id ? next : t)) : [next, ...prev];
    });
    closeModal();
  }
  function changeStatus(id: string, s: StatusKey) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: s } : t)));
  }
  function toggleType(t: string) {
    setTypeFilters((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
    setPage(1);
  }

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: "var(--surface)", color: "var(--text-primary)" }}>
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 flex-shrink-0 flex-nowrap overflow-x-auto px-5 py-3"
        style={{ background: "var(--elevated)", borderBottom: "1px solid var(--border-color)" }}
      >
        {/* View toggle */}
        <div className="inline-flex items-center p-0.5 rounded-[8px] flex-shrink-0" style={{ background: "var(--muted)" }}>
          <IconToggle label="List view"    active={view === "list"}    onClick={() => setView("list")}    icon={LayoutList} />
          <IconToggle label="Gallery view" active={view === "gallery"} onClick={() => setView("gallery")} icon={LayoutGrid} />
          <IconToggle label="Kanban view"  active={view === "kanban"}  onClick={() => setView("kanban")}  icon={Columns3} />
        </div>

        <div className="h-5 w-px flex-shrink-0" style={{ background: "var(--border-color)" }} />

        {/* Status filters */}
        <div className="inline-flex items-center gap-1.5 flex-shrink-0">
          <FilterPill label="All"      active={filter === "all"}         onClick={() => { setFilter("all"); setPage(1); }} />
          <FilterPill label="Active"   status="in-progress" active={filter === "in-progress"} onClick={() => { setFilter("in-progress"); setPage(1); }} />
          <FilterPill label="Pending"  status="pending"     active={filter === "pending"}     onClick={() => { setFilter("pending"); setPage(1); }} />
          <FilterPill label="Complete" status="complete"    active={filter === "complete"}    onClick={() => { setFilter("complete"); setPage(1); }} />
        </div>

        <div className="flex-1" />

        {/* Date range picker */}
        <div className="relative flex-shrink-0">
          <IconButton
            label="Date range"
            icon={CalendarIcon}
            active={hasDateFilter || datePickerOpen}
            btnRef={datePickerBtnRef}
            onClick={() => {
              const rect = datePickerBtnRef.current?.getBoundingClientRect() ?? null;
              setDatePickerRect(rect);
              setDatePickerOpen((v) => !v);
              setFilterOpen(false);
            }}
          />
          {datePickerOpen && datePickerRect && (
            <DateRangePicker
              dateFrom={dateFrom}
              dateTo={dateTo}
              anchorRect={datePickerRect}
              onChange={(f, t) => { setDateFrom(f); setDateTo(t); setPage(1); }}
              onClear={() => { setDateFrom(""); setDateTo(""); setPage(1); }}
              onClose={() => setDatePickerOpen(false)}
            />
          )}
        </div>

        {/* Filter panel */}
        <div className="relative flex-shrink-0">
          <IconButton
            label="Filter by type"
            icon={Filter}
            active={hasTypeFilter || filterOpen}
            btnRef={filterBtnRef}
            onClick={() => {
              const rect = filterBtnRef.current?.getBoundingClientRect() ?? null;
              setFilterRect(rect);
              setFilterOpen((v) => !v);
              setDatePickerOpen(false);
            }}
          />
          {filterOpen && filterRect && (
            <FilterPanel
              typeFilters={typeFilters}
              onToggleType={toggleType}
              anchorRect={filterRect}
              onClear={() => { setTypeFilters([]); setPage(1); }}
              onClose={() => setFilterOpen(false)}
            />
          )}
        </div>

        {canEdit && (
          <button
            onClick={openNew}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[13px] text-white transition-colors flex-shrink-0"
            style={{ background: "var(--rally-brand)", fontWeight: "var(--font-weight-medium)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--rally-brand-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--rally-brand)")}
          >
            <Plus className="size-3.5" />
            New Event
          </button>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto p-5">
        {view === "list" ? (
          <div
            className="flex flex-col overflow-hidden"
            style={{
              background: "var(--elevated)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow)",
            }}
          >
            <div className="flex-1 overflow-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <ColHeader label="Name & Description" />
                    <ColHeader label="Due Date" />
                    <ColHeader label="Assigned to" />
                    <ColHeader label="Status" />
                    <ColHeader label="Task Type" />
                    <th
                      className="w-12 px-4 py-2.5"
                      style={{ background: "var(--surface)", borderBottom: "1px solid var(--border-color)" }}
                    />
                  </tr>
                </thead>
                <tbody>
                  {visible.map((t, i) => (
                    <Row
                      key={t.id}
                      task={t}
                      last={i === visible.length - 1}
                      canEdit={canEdit}
                      onEdit={() => openEdit(t)}
                      onDelete={() => deleteTask(t.id)}
                    />
                  ))}
                  {visible.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-[14px]" style={{ color: "var(--text-secondary)" }}>
                        No tasks match the current filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div
              className="flex items-center justify-between px-4 py-3 text-[12px]"
              style={{ borderTop: "1px solid var(--border-color)", background: "var(--elevated)", color: "var(--text-secondary)" }}
            >
              <span>{rangeText}</span>
              <div className="inline-flex items-center gap-1">
                <PagerButton onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                  <ChevronLeft className="size-3.5" />
                </PagerButton>
                <PagerButton onClick={() => setPage((p) => (start + pageSize < total ? p + 1 : p))} disabled={start + pageSize >= total}>
                  <ChevronRight className="size-3.5" />
                </PagerButton>
              </div>
            </div>
          </div>
        ) : view === "gallery" ? (
          <>
            <GalleryView tasks={visible} canEdit={canEdit} onEdit={openEdit} onDelete={deleteTask} />
            <div className="flex items-center justify-between px-1 pt-3 text-[12px]" style={{ color: "var(--text-secondary)" }}>
              <span>{rangeText}</span>
              <div className="inline-flex items-center gap-1">
                <PagerButton onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                  <ChevronLeft className="size-3.5" />
                </PagerButton>
                <PagerButton onClick={() => setPage((p) => (start + pageSize < total ? p + 1 : p))} disabled={start + pageSize >= total}>
                  <ChevronRight className="size-3.5" />
                </PagerButton>
              </div>
            </div>
          </>
        ) : (
          <KanbanView tasks={filtered} canEdit={canEdit} onEdit={openEdit} onDelete={deleteTask} onMove={changeStatus} />
        )}
      </div>

      {modalOpen && (
        <EventModal initial={editing} onClose={closeModal} onSave={saveTask} />
      )}
    </div>
  );
}

// ── Gallery ──────────────────────────────────────────────────────────────────
function GalleryView({ tasks, canEdit, onEdit, onDelete }: {
  tasks: Task[]; canEdit: boolean;
  onEdit: (t: Task) => void; onDelete: (id: string) => void;
}) {
  if (tasks.length === 0) {
    return (
      <div
        className="flex items-center justify-center py-20 rounded-[var(--radius-lg)] text-[14px]"
        style={{ border: "1px dashed var(--border-color)", color: "var(--text-secondary)" }}
      >
        No tasks match the current filter.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {tasks.map((t) => (
        <GalleryCard key={t.id} task={t} canEdit={canEdit} onEdit={() => onEdit(t)} onDelete={() => onDelete(t.id)} />
      ))}
    </div>
  );
}

function GalleryCard({ task, canEdit, onEdit, onDelete }: {
  task: Task; canEdit: boolean; onEdit: () => void; onDelete: () => void;
}) {
  const [hover, setHover] = useState(false);
  const meta = STATUS_META[task.status];

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex flex-col rounded-[var(--radius-lg)] transition-all overflow-hidden"
      style={{
        background: "var(--elevated)",
        border: `1px solid ${hover ? "var(--rally-brand)" : "var(--border-color)"}`,
        boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
      }}
    >
      <div className="h-1 w-full flex-shrink-0" style={{ background: meta.dot }} />
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex items-center justify-between gap-2">
          <StatusPill s={task.status} />
          {canEdit && <RowMenu onEdit={onEdit} onDelete={onDelete} />}
        </div>
        <div>
          <div className="text-[14px] leading-snug line-clamp-2" style={{ color: "var(--text-primary)", fontWeight: "var(--font-weight-medium)" }}>
            {task.title}
          </div>
          <div className="text-[12px] mt-1 line-clamp-3" style={{ color: "var(--text-secondary)" }}>
            {task.description}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Tag className="size-3 flex-shrink-0" style={{ color: "var(--text-tertiary)" }} />
          <span className="text-[11px] truncate" style={{ color: "var(--text-tertiary)" }}>{task.taskType}</span>
        </div>
        <div className="h-px" style={{ background: "var(--border-subtle)" }} />
        <div className="flex items-center gap-2 mt-auto">
          <Avatar initials={task.assigneeInitials} />
          <span className="text-[12px] truncate flex-1" style={{ color: "var(--text-secondary)" }}>{task.assigneeName}</span>
          <div className="inline-flex items-center gap-1 flex-shrink-0" style={{ color: "var(--text-tertiary)" }}>
            <CalendarIcon className="size-3" />
            <span className="text-[11px]">{task.dueDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Kanban ───────────────────────────────────────────────────────────────────
function KanbanView({ tasks, canEdit, onEdit, onDelete, onMove }: {
  tasks: Task[]; canEdit: boolean;
  onEdit: (t: Task) => void; onDelete: (id: string) => void;
  onMove: (id: string, status: StatusKey) => void;
}) {
  const [dragId, setDragId]   = useState<string | null>(null);
  const [overCol, setOverCol] = useState<StatusKey | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      {STATUS_OPTIONS.map((status) => {
        const colTasks = tasks.filter((t) => t.status === status);
        const meta = STATUS_META[status];
        const isOver = overCol === status;
        return (
          <div
            key={status}
            onDragOver={(e) => { if (canEdit && dragId) { e.preventDefault(); setOverCol(status); } }}
            onDragLeave={() => setOverCol((c) => (c === status ? null : c))}
            onDrop={() => { if (canEdit && dragId) onMove(dragId, status); setDragId(null); setOverCol(null); }}
            className="flex flex-col overflow-hidden"
            style={{
              background: "var(--elevated)",
              border: `1px solid ${isOver ? "var(--rally-brand)" : "var(--border-color)"}`,
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow)",
              minHeight: 200,
            }}
          >
            <div className="flex items-center gap-2 px-3 py-2.5" style={{ borderBottom: "1px solid var(--border-color)" }}>
              <span className="inline-block rounded-full" style={{ width: 8, height: 8, background: meta.dot }} />
              <span className="text-[13px]" style={{ color: "var(--text-primary)", fontWeight: "var(--font-weight-medium)" }}>
                {meta.label}
              </span>
              <span
                className="inline-flex items-center justify-center rounded-full text-[11px] px-1.5 min-w-[20px] h-[18px]"
                style={{ background: "var(--muted)", color: "var(--muted-foreground)", fontWeight: "var(--font-weight-medium)" }}
              >
                {colTasks.length}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {colTasks.map((t) => (
                <KanbanCard
                  key={t.id}
                  task={t}
                  canEdit={canEdit}
                  dragging={dragId === t.id}
                  onDragStart={() => setDragId(t.id)}
                  onDragEnd={() => { setDragId(null); setOverCol(null); }}
                  onEdit={() => onEdit(t)}
                  onDelete={() => onDelete(t.id)}
                />
              ))}
              {colTasks.length === 0 && (
                <div
                  className="flex items-center justify-center h-20 rounded-[10px] text-[12px]"
                  style={{ border: "1px dashed var(--border-color)", color: "var(--text-tertiary)" }}
                >
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function KanbanCard({ task, canEdit, dragging, onDragStart, onDragEnd, onEdit, onDelete }: {
  task: Task; canEdit: boolean; dragging: boolean;
  onDragStart: () => void; onDragEnd: () => void;
  onEdit: () => void; onDelete: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      draggable={canEdit}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="p-3 rounded-[10px] transition-colors"
      style={{
        background: hover ? "var(--interactive-hover-bg)" : "var(--elevated)",
        border: "1px solid var(--border-color)",
        boxShadow: dragging ? "var(--shadow-md)" : "var(--shadow-sm)",
        opacity: dragging ? 0.6 : 1,
        cursor: canEdit ? "grab" : "default",
      }}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-[13px] truncate" style={{ color: "var(--text-primary)", fontWeight: "var(--font-weight-medium)" }}>
            {task.title}
          </div>
          <div className="text-[12px] mt-0.5 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
            {task.description}
          </div>
        </div>
        {canEdit && <RowMenu onEdit={onEdit} onDelete={onDelete} />}
      </div>
      <div className="flex items-center gap-2 mt-3">
        <Avatar initials={task.assigneeInitials} />
        <span className="text-[12px] truncate flex-1" style={{ color: "var(--text-secondary)" }}>{task.assigneeName}</span>
        <span className="text-[11px] whitespace-nowrap" style={{ color: "var(--text-tertiary)" }}>{task.dueDate}</span>
      </div>
    </div>
  );
}

// ── Pager ────────────────────────────────────────────────────────────────────
function PagerButton({ children, onClick, disabled }: {
  children: React.ReactNode; onClick: () => void; disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center w-7 h-7 rounded-[8px] transition-colors"
      style={{
        border: "1px solid var(--border-color)",
        background: "var(--elevated)",
        color: "var(--text-secondary)",
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "default" : "pointer",
      }}
    >
      {children}
    </button>
  );
}

// ── Row ──────────────────────────────────────────────────────────────────────
function Row({ task, last, canEdit, onEdit, onDelete }: {
  task: Task; last: boolean; canEdit: boolean;
  onEdit: () => void; onDelete: () => void;
}) {
  const [hover, setHover] = useState(false);
  const cellStyle: React.CSSProperties = {
    padding: "12px 16px",
    borderBottom: last ? "none" : "1px solid var(--border-subtle)",
    background: hover ? "var(--interactive-hover-bg)" : "transparent",
    color: "var(--text-primary)",
    verticalAlign: "middle",
  };

  return (
    <tr onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="transition-colors text-[13px]">
      <td style={{ ...cellStyle, minWidth: 240 }}>
        <div className="text-[14px] leading-tight" style={{ color: "var(--text-primary)", fontWeight: "var(--font-weight-medium)" }}>
          {task.title}
        </div>
        <div className="text-[12px] mt-0.5" style={{ color: "var(--text-secondary)" }}>
          {task.description}
        </div>
      </td>
      <td style={cellStyle}>{task.dueDate}</td>
      <td style={cellStyle}>
        <div className="inline-flex items-center gap-2">
          <Avatar initials={task.assigneeInitials} />
          <span>{task.assigneeName}</span>
        </div>
      </td>
      <td style={cellStyle}><StatusPill s={task.status} /></td>
      <td style={cellStyle}>{task.taskType}</td>
      <td style={{ ...cellStyle, width: 48, textAlign: "right" }}>
        {canEdit && <RowMenu onEdit={onEdit} onDelete={onDelete} />}
      </td>
    </tr>
  );
}

export default TodoV2;

import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft, ChevronRight, Plus, Search, Sparkles, X,
  Calendar as CalendarIcon, Clock, MessageSquare, Mic2,
  FileText, CheckSquare, ArrowUpRight, Activity, Check,
  ChevronDown, AlertCircle, Users, MapPin, AlignLeft,
  Download, ExternalLink, ChevronUp,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

// ── Types ─────────────────────────────────────────────────────────────────────

type ViewMode = "week" | "agenda" | "month";
type LinkType = "chat" | "voice" | "file" | "task";

interface CalList {
  id: string;
  name: string;
  color: string;
  visible: boolean;
}

interface EventLink {
  type: LinkType;
  label: string;
}

interface CalEvent {
  id: string;
  calendarId: string;
  title: string;
  date: string;           // "YYYY-MM-DD"
  startTime?: string;     // "HH:mm" — undefined means all-day
  endTime?: string;
  allDay?: boolean;
  description?: string;
  location?: string;
  attendees: string[];
  links?: EventLink[];
  createdBy: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const TODAY          = "2026-04-21";
const CURRENT_TIME   = "10:45"; // fake "now" for demo
const START_HOUR     = 8;
const END_HOUR       = 19;
const HOUR_HEIGHT    = 56;
const TOTAL_GRID_H   = (END_HOUR - START_HOUR) * HOUR_HEIGHT; // 616px
const HOURS          = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);
const WEEK_DAYS_ABBR = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES    = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ── Mock data ─────────────────────────────────────────────────────────────────

const initialLists: CalList[] = [
  { id: "meetings",    name: "Meetings",    color: "var(--info-solid)", visible: true },
  { id: "milestones",  name: "Milestones",  color: "var(--rally-brand)", visible: true },
  { id: "deadlines",   name: "Deadlines",   color: "var(--error-solid)", visible: true },
  { id: "team-events", name: "Team Events", color: "var(--success-solid)", visible: true },
  { id: "launches",    name: "Launches",    color: "#6b21a8", visible: true },
];

const initialEvents: CalEvent[] = [
  // ─ Monday Apr 20 ─
  {
    id: "e0", calendarId: "meetings", title: "Weekly All-Hands",
    date: "2026-04-20", startTime: "10:00", endTime: "11:00",
    description: "Company-wide weekly sync. Updates from each team lead, blockers, and shoutouts.",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [{ type: "voice", label: "All-Hands Room" }, { type: "chat", label: "#general" }],
    createdBy: "John Doe",
  },
  {
    id: "e0b", calendarId: "meetings", title: "Team Standup",
    date: "2026-04-20", startTime: "09:00", endTime: "09:30",
    description: "Daily 30-minute standup. Share progress, blockers, and plan for the day.",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [{ type: "voice", label: "Standup Room" }],
    createdBy: "John Doe",
  },
  // ─ Tuesday Apr 21 (TODAY) ─
  {
    id: "e1", calendarId: "meetings", title: "Team Standup",
    date: "2026-04-21", startTime: "09:00", endTime: "09:30",
    description: "Daily 30-minute standup. Share progress, blockers, and plan for the day.",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [{ type: "voice", label: "Standup Room" }, { type: "chat", label: "#general" }],
    createdBy: "John Doe",
  },
  {
    id: "e2", calendarId: "meetings", title: "Design Review: Mobile Header",
    date: "2026-04-21", startTime: "10:30", endTime: "11:30",
    description: "Review the latest mobile header redesign with Sarah. Focus on navigation drawer behavior and CTA placement. Bring feedback from the last user testing session.",
    location: "Design Studio",
    attendees: ["Sarah Johnson"],
    links: [
      { type: "file",  label: "Header_v3.fig" },
      { type: "chat",  label: "#design" },
      { type: "task",  label: "Review mobile header design" },
    ],
    createdBy: "Sarah Johnson",
  },
  {
    id: "e3", calendarId: "milestones", title: "Q2 Planning Session",
    date: "2026-04-21", startTime: "14:00", endTime: "15:30",
    description: "Align on Q2 goals, launch milestones, and resource allocation. Come prepared with your team's capacity and risks.",
    location: "Conference Room B",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [
      { type: "file", label: "Q2_Launch_Brief.pdf" },
      { type: "task", label: "Prepare Q2 launch brief" },
      { type: "chat", label: "#planning" },
    ],
    createdBy: "John Doe",
  },
  {
    id: "e4", calendarId: "meetings", title: "1:1 with Sarah",
    date: "2026-04-21", startTime: "16:00", endTime: "17:00",
    description: "Weekly 1:1 with Sarah Johnson. Review design progress, career goals, and blockers.",
    attendees: ["Sarah Johnson"],
    links: [{ type: "chat", label: "Sarah Johnson" }],
    createdBy: "John Doe",
  },
  // ─ Wednesday Apr 22 ─
  {
    id: "e5", calendarId: "meetings", title: "Team Standup",
    date: "2026-04-22", startTime: "09:00", endTime: "09:30",
    description: "Daily standup.",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [{ type: "voice", label: "Standup Room" }],
    createdBy: "John Doe",
  },
  {
    id: "e6", calendarId: "milestones", title: "Sprint Planning",
    date: "2026-04-22", startTime: "10:00", endTime: "12:00",
    description: "Sprint 23 planning session. Review backlog, assign stories, set sprint goal, and confirm capacity.",
    location: "Conference Room A",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [
      { type: "task",  label: "Sprint planning agenda" },
      { type: "file",  label: "Sprint_23_Backlog.xlsx" },
      { type: "chat",  label: "#engineering" },
    ],
    createdBy: "Mike Chen",
  },
  {
    id: "e7", calendarId: "meetings", title: "Engineering Sync",
    date: "2026-04-22", startTime: "15:00", endTime: "15:30",
    description: "Quick eng sync — review current blockers, PR backlog, and staging status.",
    attendees: ["Mike Chen", "Emily Davis"],
    links: [{ type: "chat", label: "#engineering" }],
    createdBy: "Mike Chen",
  },
  // ─ Thursday Apr 23 ─
  {
    id: "e8", calendarId: "deadlines", title: "API Spec v2 Deadline",
    date: "2026-04-23", allDay: true,
    description: "Final deadline for the API spec v2 document. Must be reviewed and signed off.",
    attendees: ["Emily Davis"],
    createdBy: "John Doe",
  },
  {
    id: "e9", calendarId: "meetings", title: "Team Standup",
    date: "2026-04-23", startTime: "09:00", endTime: "09:30",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [{ type: "voice", label: "Standup Room" }],
    description: "Daily standup.",
    createdBy: "John Doe",
  },
  {
    id: "e10", calendarId: "meetings", title: "Product Review",
    date: "2026-04-23", startTime: "14:00", endTime: "15:00",
    description: "Monthly product review with stakeholders. Present current roadmap status, shipped features, and upcoming priorities.",
    location: "Boardroom",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [
      { type: "file", label: "Product_Roadmap_Q2.pdf" },
      { type: "chat", label: "#product" },
    ],
    createdBy: "John Doe",
  },
  // ─ Friday Apr 24 ─
  {
    id: "e11", calendarId: "launches", title: "v2.1 Release",
    date: "2026-04-24", allDay: true,
    description: "Rally v2.1 release day. Monitor rollout, watch error logs, and have rollback plan ready.",
    attendees: ["Mike Chen", "Emily Davis"],
    createdBy: "Mike Chen",
  },
  {
    id: "e12", calendarId: "meetings", title: "Team Standup",
    date: "2026-04-24", startTime: "09:00", endTime: "09:30",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [{ type: "voice", label: "Standup Room" }],
    description: "Daily standup.",
    createdBy: "John Doe",
  },
  {
    id: "e13", calendarId: "team-events", title: "Customer Demo",
    date: "2026-04-24", startTime: "11:00", endTime: "12:00",
    description: "Live product demo for Acme Corp. Show the new dashboard, chat, and AI features. Emily leading the call.",
    location: "Zoom / Demo Room",
    attendees: ["Emily Davis"],
    links: [
      { type: "voice", label: "Demo Room" },
      { type: "chat",  label: "#demos" },
      { type: "file",  label: "Demo_Deck_v2.pptx" },
    ],
    createdBy: "Emily Davis",
  },
  {
    id: "e14", calendarId: "team-events", title: "Sprint Retrospective",
    date: "2026-04-24", startTime: "13:00", endTime: "14:00",
    description: "Sprint 22 retrospective. What went well, what didn't, and action items for Sprint 23.",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [
      { type: "task",  label: "Retro action items" },
      { type: "chat",  label: "#engineering" },
    ],
    createdBy: "Mike Chen",
  },
  {
    id: "e15", calendarId: "meetings", title: "Dev Sync",
    date: "2026-04-24", startTime: "15:00", endTime: "16:00",
    description: "End-of-week dev sync. Review PR queue, staging tests, and any release blockers for v2.1.",
    attendees: ["Mike Chen", "Emily Davis"],
    links: [{ type: "chat", label: "#engineering" }],
    createdBy: "Mike Chen",
  },
];

const SCHEDULE_CHANGES = [
  { id: "sc1", text: "Sprint Planning moved to 10:00 AM", time: "1h ago",   dot: "var(--info-solid)" },
  { id: "sc2", text: "Customer Demo: Demo_Deck_v2 added", time: "3h ago",   dot: "var(--success-solid)" },
  { id: "sc3", text: "API Spec Deadline added by Emily",  time: "Yesterday", dot: "var(--error-solid)" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function pad2(n: number) { return n.toString().padStart(2, "0"); }

function dateToStr(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 || 12;
  return `${hr}:${pad2(m)} ${ampm}`;
}

function formatTimeRange(s: string, e: string): string {
  return `${formatTime(s)} – ${formatTime(e)}`;
}

function formatDateFull(s: string): string {
  return new Date(s + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

function shortDate(s: string): string {
  return new Date(s + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function eventTopPx(startTime: string): number {
  const [h, m] = startTime.split(":").map(Number);
  return (h - START_HOUR + m / 60) * HOUR_HEIGHT;
}

function eventHeightPx(startTime: string, endTime: string): number {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  return Math.max(((eh + em / 60) - (sh + sm / 60)) * HOUR_HEIGHT, 22);
}

function currentTimePx(): number {
  const [h, m] = CURRENT_TIME.split(":").map(Number);
  return (h - START_HOUR + m / 60) * HOUR_HEIGHT;
}

function isToday(dateStr: string): boolean {
  return dateStr === TODAY;
}

function minutesSince8(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return (h - START_HOUR) * 60 + m;
}

function currentMinutes(): number {
  const [h, m] = CURRENT_TIME.split(":").map(Number);
  return h * 60 + m;
}

function minutesUntil(startTime: string): number {
  const [h, m] = startTime.split(":").map(Number);
  return h * 60 + m - currentMinutes();
}

function formatCountdown(minutes: number): string {
  if (minutes <= 0) return "In progress";
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60), mn = minutes % 60;
  return mn > 0 ? `${h}h ${mn}m` : `${h}h`;
}

function isEventInProgress(e: CalEvent): boolean {
  if (!e.startTime || !e.endTime) return false;
  const [sh, sm] = e.startTime.split(":").map(Number);
  const [eh, em] = e.endTime.split(":").map(Number);
  const cur = currentMinutes();
  return cur >= sh * 60 + sm && cur < eh * 60 + em && e.date === TODAY;
}

function weekLabel(start: Date): string {
  const end = addDays(start, 4);
  const sm = start.toLocaleDateString("en-US", { month: "short" });
  const em = end.toLocaleDateString("en-US",   { month: "short" });
  return sm === em
    ? `${sm} ${start.getDate()} – ${end.getDate()}, ${start.getFullYear()}`
    : `${sm} ${start.getDate()} – ${em} ${end.getDate()}, ${start.getFullYear()}`;
}

function getMiniCalDays(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7; // Mon = 0
  const days: Date[] = [];
  for (let i = startDow; i > 0; i--) days.push(new Date(year, month, 1 - i));
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d));
  const remaining = 35 - days.length;
  for (let i = 1; i <= remaining; i++) days.push(new Date(year, month + 1, i));
  return days;
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

// ── Link icon helper ──────────────────────────────────────────────────────────

function linkIcon(type: LinkType) {
  const Icon = type === "chat" ? MessageSquare : type === "voice" ? Mic2 : type === "file" ? FileText : CheckSquare;
  const colors: Record<LinkType, string> = { chat: "var(--info-solid)", voice: "var(--success-solid)", file: "#6b21a8", task: "var(--warning-on)" };
  return <Icon className="size-3.5 flex-shrink-0" style={{ color: colors[type] }} />;
}

// ── Mini Calendar ─────────────────────────────────────────────────────────────

function MiniCalendar({
  year, month, selectedDate, weekStartDate, events, onDateClick, onMonthChange,
}: {
  year: number; month: number;
  selectedDate: string; weekStartDate: Date;
  events: CalEvent[];
  onDateClick: (d: Date) => void;
  onMonthChange: (y: number, m: number) => void;
}) {
  const days = getMiniCalDays(year, month);
  const evDates = new Set(events.map(e => e.date));

  function prev() {
    if (month === 0) onMonthChange(year - 1, 11);
    else onMonthChange(year, month - 1);
  }
  function next() {
    if (month === 11) onMonthChange(year + 1, 0);
    else onMonthChange(year, month + 1);
  }

  const weekDates = new Set(
    Array.from({ length: 5 }, (_, i) => dateToStr(addDays(weekStartDate, i)))
  );

  return (
    <div className="px-3 py-3">
      {/* Header */}
      <div className="flex items-center gap-1 mb-2">
        <button onClick={prev} className="w-6 h-6 flex items-center justify-center rounded-[6px] hover:bg-muted transition-colors">
          <ChevronLeft className="size-3.5 text-muted-foreground" />
        </button>
        <span className="flex-1 text-center text-[11px] font-medium text-foreground">
          {MONTH_NAMES[month]} {year}
        </span>
        <button onClick={next} className="w-6 h-6 flex items-center justify-center rounded-[6px] hover:bg-muted transition-colors">
          <ChevronRight className="size-3.5 text-muted-foreground" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {["M","T","W","T","F","S","S"].map((d, i) => (
          <div key={i} className="text-center text-[10px] text-muted-foreground py-0.5">{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((d, i) => {
          const ds = dateToStr(d);
          const isThisMonth = d.getMonth() === month;
          const isTodayD    = ds === TODAY;
          const isSelected  = ds === selectedDate;
          const inWeek      = weekDates.has(ds);
          const hasEvent    = evDates.has(ds);

          return (
            <button key={i} onClick={() => onDateClick(d)}
              className={`relative w-6 h-6 mx-auto flex items-center justify-center rounded-full text-[10px] transition-colors ${
                isTodayD
                  ? "bg-[var(--rally-brand)] text-white font-medium"
                  : inWeek && !isTodayD
                  ? "bg-muted text-foreground"
                  : isSelected && !isTodayD
                  ? "bg-[var(--rally-brand-soft)] text-[var(--rally-brand-on)]"
                  : isThisMonth
                  ? "text-foreground hover:bg-muted"
                  : "text-muted-foreground/40 hover:bg-muted"
              }`}>
              {d.getDate()}
              {hasEvent && !isTodayD && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--rally-brand)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Up Next card ──────────────────────────────────────────────────────────────

function UpNextCard({ events, lists }: { events: CalEvent[]; lists: CalList[] }) {
  const getColor = (id: string) => lists.find(l => l.id === id)?.color ?? "var(--text-tertiary)";

  const todayTimed = events
    .filter(e => e.date === TODAY && e.startTime && !e.allDay)
    .sort((a, b) => (a.startTime! > b.startTime! ? 1 : -1));

  const inProgress = todayTimed.find(e => isEventInProgress(e));
  const upcoming   = todayTimed.filter(e => minutesUntil(e.startTime!) > 0);
  const nextEvent  = upcoming[0];
  const laterToday = upcoming.slice(1, 3);

  if (!inProgress && !nextEvent) {
    return (
      <div className="mx-3 mb-3 px-3 py-3 rounded-[10px] border border-border bg-muted/30">
        <p className="text-[11px] text-muted-foreground text-center">No more events today</p>
      </div>
    );
  }

  const featured = inProgress ?? nextEvent;
  const color    = getColor(featured!.calendarId);
  const mins     = inProgress ? 0 : minutesUntil(featured!.startTime!);
  const hasVoice = featured!.links?.some(l => l.type === "voice");
  const hasChat  = featured!.links?.some(l => l.type === "chat");

  return (
    <div className="mx-3 mb-3">
      <p className="text-[10px] font-medium uppercase tracking-widest mb-1.5 px-1" style={{ color: "var(--text-overline)" }}>
        {inProgress ? "Happening Now" : "Up Next"}
      </p>
      <div className="rounded-[10px] border overflow-hidden" style={{ borderColor: `${color}40` }}>
        {/* Color strip */}
        <div className="h-1" style={{ background: color }} />
        <div className="px-3 py-2.5" style={{ background: `${color}08` }}>
          {/* In-progress dot */}
          {inProgress && (
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
              <span className="text-[10px] font-medium" style={{ color }}>In progress</span>
            </div>
          )}
          <p className="text-[12px] font-medium text-foreground leading-tight mb-1">{featured!.title}</p>
          <p className="text-[10px] text-muted-foreground mb-2">
            {featured!.startTime && formatTimeRange(featured!.startTime, featured!.endTime!)}
          </p>

          {/* Countdown */}
          {!inProgress && (
            <div className="flex items-center gap-1 mb-2">
              <Clock className="size-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">Starts in</span>
              <span className="text-[10px] font-medium" style={{ color }}>{formatCountdown(mins)}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-1.5 flex-wrap">
            {hasVoice && (
              <button className="flex items-center gap-1 px-2 py-1 rounded-[6px] text-white text-[10px] font-medium"
                style={{ background: color }}>
                <Mic2 className="size-3" /> Join Voice
              </button>
            )}
            {hasChat && (
              <button className="flex items-center gap-1 px-2 py-1 rounded-[6px] text-[10px] border border-border bg-card text-foreground hover:bg-muted transition-colors">
                <MessageSquare className="size-3" /> Chat
              </button>
            )}
          </div>

          {/* Context chips */}
          {featured!.links && featured!.links.length > 0 && (
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {featured!.links.map((lk, i) => (
                <div key={i} className="flex items-center gap-1">
                  {linkIcon(lk.type)}
                  <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">{lk.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Later today */}
      {laterToday.length > 0 && (
        <div className="mt-1.5 space-y-0.5">
          <p className="text-[10px] font-medium uppercase tracking-widest mb-1 px-1" style={{ color: "var(--text-overline)" }}>Later Today</p>
          {laterToday.map(e => (
            <div key={e.id} className="flex items-center gap-2 px-2 py-1.5 rounded-[7px] hover:bg-muted transition-colors">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: getColor(e.calendarId) }} />
              <span className="flex-1 text-[11px] text-foreground truncate">{e.title}</span>
              <span className="text-[10px] text-muted-foreground flex-shrink-0">{formatTime(e.startTime!)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Left rail ─────────────────────────────────────────────────────────────────

function LeftRail({
  lists, events, onListToggle, weekStart, selectedDate, onDateClick,
  miniCalYear, miniCalMonth, onMiniCalMonthChange, onNewEvent,
}: {
  lists: CalList[];
  events: CalEvent[];
  onListToggle: (id: string) => void;
  weekStart: Date;
  selectedDate: string;
  onDateClick: (d: Date) => void;
  miniCalYear: number;
  miniCalMonth: number;
  onMiniCalMonthChange: (y: number, m: number) => void;
  onNewEvent: () => void;
}) {
  const [changesOpen, setChangesOpen] = useState(false);

  return (
    <div className="w-48 flex-shrink-0 border-r border-border flex flex-col overflow-y-auto bg-card hidden lg:flex">
      {/* Mini calendar */}
      <MiniCalendar year={miniCalYear} month={miniCalMonth}
        selectedDate={selectedDate} weekStartDate={weekStart}
        events={events} onDateClick={onDateClick}
        onMonthChange={onMiniCalMonthChange} />

      <div className="h-px bg-border mx-3 mb-3" />

      {/* Up Next */}
      <UpNextCard events={events} lists={lists} />

      <div className="h-px bg-border mx-3 mb-3" />

      {/* Calendar lists */}
      <div className="px-3 pb-3">
        <p className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color: "var(--text-overline)" }}>
          Calendars
        </p>
        <div className="space-y-1">
          {lists.map(l => (
            <button key={l.id} onClick={() => onListToggle(l.id)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-[7px] hover:bg-muted transition-colors text-left">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-opacity"
                style={{ background: l.color, opacity: l.visible ? 1 : 0.25 }} />
              <span className={`text-[11px] flex-1 ${l.visible ? "text-foreground" : "text-muted-foreground"}`}>
                {l.name}
              </span>
              {l.visible && <Check className="size-3 text-muted-foreground flex-shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Quick create */}
      <div className="px-3 pb-3">
        <button onClick={onNewEvent}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-[8px] border border-dashed border-border text-muted-foreground hover:border-[var(--rally-brand)] hover:text-[var(--rally-brand)] hover:bg-[var(--rally-brand-soft)] transition-colors text-[11px]">
          <Plus className="size-3.5" /> Quick Create
        </button>
      </div>

      <div className="h-px bg-border mx-3 mb-2" />

      {/* Schedule changes */}
      <div className="px-3 pb-3">
        <button onClick={() => setChangesOpen(v => !v)}
          className="w-full flex items-center gap-1.5 py-1 text-left">
          <Activity className="size-3.5 text-muted-foreground flex-shrink-0" />
          <span className="text-[10px] text-muted-foreground flex-1">Schedule Changes</span>
          {changesOpen
            ? <ChevronUp className="size-3 text-muted-foreground" />
            : <ChevronDown className="size-3 text-muted-foreground" />}
        </button>
        {changesOpen && (
          <div className="mt-1.5 space-y-1.5">
            {SCHEDULE_CHANGES.map(c => (
              <div key={c.id} className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: c.dot }} />
                <p className="text-[10px] text-muted-foreground flex-1 leading-snug">{c.text}</p>
                <span className="text-[10px] text-muted-foreground flex-shrink-0">{c.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Event block (week grid) ───────────────────────────────────────────────────

function EventBlock({
  event, color, selected, onClick,
}: {
  event: CalEvent; color: string; selected: boolean; onClick: () => void;
}) {
  const top    = eventTopPx(event.startTime!);
  const height = eventHeightPx(event.startTime!, event.endTime!);
  const inProg = isEventInProgress(event);
  const showDetails = height > 40;
  const showLinks   = height > 56 && event.links && event.links.length > 0;

  return (
    <div onClick={onClick}
      className="absolute left-0.5 right-0.5 rounded-[6px] px-1.5 cursor-pointer overflow-hidden transition-all hover:shadow-sm z-[1]"
      style={{
        top, height,
        background: `${color}18`,
        borderLeft: `3px solid ${color}`,
        outline: selected ? `2px solid ${color}` : "none",
        outlineOffset: "1px",
      }}>
      <p className="text-[10px] font-medium leading-tight mt-0.5 truncate" style={{ color }}>
        {inProg && <span className="inline-block w-1.5 h-1.5 rounded-full mr-1 animate-pulse align-middle" style={{ background: color }} />}
        {event.title}
      </p>
      {showDetails && (
        <p className="text-[10px] opacity-70 leading-tight" style={{ color }}>
          {formatTime(event.startTime!)}
        </p>
      )}
      {showLinks && (
        <div className="flex gap-1 mt-0.5 flex-wrap">
          {event.links!.slice(0, 3).map((lk, i) => (
            <span key={i} className="opacity-60">{linkIcon(lk.type)}</span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Week View ─────────────────────────────────────────────────────────────────

function WeekView({
  weekStart, events, lists, selectedEventId, onEventClick, onSlotClick,
}: {
  weekStart: Date; events: CalEvent[]; lists: CalList[];
  selectedEventId: string | null;
  onEventClick: (e: CalEvent) => void;
  onSlotClick: (date: string, hour: number) => void;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const weekDays = Array.from({ length: 5 }, (_, i) => dateToStr(addDays(weekStart, i)));
  const visibleIds = new Set(lists.filter(l => l.visible).map(l => l.id));
  const getColor = (id: string) => lists.find(l => l.id === id)?.color ?? "var(--text-tertiary)";
  const curTop = currentTimePx();

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollTop = Math.max(0, curTop - 80);
    }
  }, []);

  function eventsForDay(date: string) {
    return events.filter(e => e.date === date && !e.allDay && e.startTime && visibleIds.has(e.calendarId));
  }
  function allDayForDay(date: string) {
    return events.filter(e => e.date === date && (e.allDay || !e.startTime) && visibleIds.has(e.calendarId));
  }

  function dayLabel(d: string): { dow: string; num: number } {
    const date = new Date(d + "T12:00:00");
    return {
      dow: WEEK_DAYS_ABBR[(date.getDay() + 6) % 7],
      num: date.getDate(),
    };
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Sticky header: day names + all-day row */}
      <div className="flex-shrink-0 bg-card border-b border-border z-20">
        {/* Day names */}
        <div className="flex">
          <div className="w-[52px] flex-shrink-0" />
          {weekDays.map(d => {
            const { dow, num } = dayLabel(d);
            const today = isToday(d);
            return (
              <div key={d} className="flex-1 flex flex-col items-center py-2 border-l border-border/30">
                <span className="text-[10px] text-muted-foreground uppercase">{dow}</span>
                <div className={`w-7 h-7 flex items-center justify-center rounded-full text-[14px] font-medium mt-0.5 transition-colors ${
                  today ? "text-white" : "text-foreground"}`}
                  style={today ? { background: "var(--rally-brand)" } : {}}>
                  {num}
                </div>
              </div>
            );
          })}
        </div>

        {/* All-day row */}
        <div className="flex border-t border-[var(--border-subtle)]">
          <div className="w-[52px] flex-shrink-0 flex items-center justify-end pr-2 py-1">
            <span className="text-[10px] text-muted-foreground">all-day</span>
          </div>
          {weekDays.map(d => {
            const allD = allDayForDay(d);
            return (
              <div key={d} className="flex-1 min-h-[24px] border-l border-border/30 px-0.5 py-0.5 space-y-0.5">
                {allD.map(e => {
                  const color = getColor(e.calendarId);
                  return (
                    <div key={e.id} onClick={() => onEventClick(e)}
                      className="text-[10px] px-1.5 py-0.5 rounded-[4px] truncate cursor-pointer"
                      style={{ background: `${color}20`, color }}>
                      {e.title}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrollable time grid */}
      <div ref={gridRef} className="flex-1 overflow-y-auto">
        <div className="flex" style={{ height: TOTAL_GRID_H }}>
          {/* Time gutter */}
          <div className="w-[52px] flex-shrink-0 relative" style={{ height: TOTAL_GRID_H }}>
            {HOURS.map(h => (
              <div key={h} className="absolute right-2 text-[10px] text-muted-foreground -translate-y-2"
                style={{ top: (h - START_HOUR) * HOUR_HEIGHT }}>
                {h === 12 ? "12pm" : h > 12 ? `${h-12}pm` : `${h}am`}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map(d => {
            const dayEvents = eventsForDay(d);
            const today = isToday(d);

            return (
              <div key={d} className="flex-1 relative border-l border-border/30"
                style={{ height: TOTAL_GRID_H, background: today ? "color-mix(in srgb, var(--rally-brand) 2%, transparent)" : undefined }}
                onClick={e => {
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  const y = e.clientY - rect.top + gridRef.current!.scrollTop;
                  const hour = Math.floor(y / HOUR_HEIGHT) + START_HOUR;
                  onSlotClick(d, hour);
                }}>

                {/* Hour lines */}
                {HOURS.map(h => (
                  <div key={h} className="absolute w-full border-b border-[var(--border-subtle)]"
                    style={{ top: (h - START_HOUR) * HOUR_HEIGHT }} />
                ))}
                {/* Half-hour lines */}
                {HOURS.map(h => (
                  <div key={`h${h}`} className="absolute w-full border-b border-[var(--border-subtle)]/40"
                    style={{ top: (h - START_HOUR) * HOUR_HEIGHT + HOUR_HEIGHT / 2 }} />
                ))}

                {/* Events */}
                {dayEvents.map(e => (
                  <EventBlock key={e.id} event={e} color={getColor(e.calendarId)}
                    selected={selectedEventId === e.id}
                    onClick={ev => { ev.stopPropagation(); onEventClick(e); }} />
                ))}

                {/* Current time line */}
                {today && curTop >= 0 && curTop <= TOTAL_GRID_H && (
                  <div className="absolute w-full z-10 pointer-events-none"
                    style={{ top: curTop }}>
                    <div className="absolute w-2.5 h-2.5 rounded-full -mt-1.5 -ml-1 border-2 border-card"
                      style={{ background: "var(--error-solid)" }} />
                    <div className="w-full h-0.5" style={{ background: "var(--error-solid)", opacity: 0.85 }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Agenda View ───────────────────────────────────────────────────────────────

function AgendaView({
  startDate, events, lists, selectedEventId, onEventClick,
}: {
  startDate: Date; events: CalEvent[]; lists: CalList[];
  selectedEventId: string | null;
  onEventClick: (e: CalEvent) => void;
}) {
  const visibleIds = new Set(lists.filter(l => l.visible).map(l => l.id));
  const getColor   = (id: string) => lists.find(l => l.id === id)?.color ?? "var(--text-tertiary)";

  const days = Array.from({ length: 14 }, (_, i) => dateToStr(addDays(startDate, i)));

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4">
      {days.map(d => {
        const dayEvs = events
          .filter(e => e.date === d && visibleIds.has(e.calendarId))
          .sort((a, b) => {
            if (a.allDay) return -1;
            if (b.allDay) return 1;
            return (a.startTime ?? "") > (b.startTime ?? "") ? 1 : -1;
          });

        if (!dayEvs.length) return null;

        const date     = new Date(d + "T12:00:00");
        const isDay    = isToday(d);
        const dayLabel = date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

        return (
          <div key={d} className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[12px] font-medium ${isDay ? "text-[var(--rally-brand)]" : "text-foreground"}`}>
                {isDay ? "Today · " : ""}{dayLabel}
              </span>
              {isDay && <span className="w-1.5 h-1.5 rounded-full bg-[var(--rally-brand)]" />}
            </div>
            <div className="space-y-1.5">
              {dayEvs.map(e => {
                const color = getColor(e.calendarId);
                return (
                  <div key={e.id} onClick={() => onEventClick(e)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] border cursor-pointer transition-all hover:shadow-sm ${
                      selectedEventId === e.id ? "border-[var(--rally-brand)]" : "border-border hover:border-[var(--border)]"
                    } bg-card`}>
                    <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-foreground truncate">{e.title}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {e.allDay ? "All day" : formatTimeRange(e.startTime!, e.endTime!)}
                        {e.location && ` · ${e.location}`}
                      </p>
                    </div>
                    {/* Context links */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {e.links?.slice(0, 3).map((lk, i) => (
                        <span key={i}>{linkIcon(lk.type)}</span>
                      ))}
                    </div>
                    {/* Attendees */}
                    <div className="flex -space-x-1 flex-shrink-0">
                      {e.attendees.slice(0, 3).map(a => <Av key={a} name={a} size={20} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Month View ────────────────────────────────────────────────────────────────

function MonthView({
  year, month, events, lists, selectedEventId, onEventClick, onDayClick,
}: {
  year: number; month: number; events: CalEvent[]; lists: CalList[];
  selectedEventId: string | null;
  onEventClick: (e: CalEvent) => void;
  onDayClick: (d: Date) => void;
}) {
  const visibleIds = new Set(lists.filter(l => l.visible).map(l => l.id));
  const getColor   = (id: string) => lists.find(l => l.id === id)?.color ?? "var(--text-tertiary)";
  const days       = getMiniCalDays(year, month);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {/* Day-of-week header */}
      <div className="grid grid-cols-7 mb-1">
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
          <div key={d} className="text-center text-[10px] font-medium text-muted-foreground py-1.5">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const ds         = dateToStr(d);
          const isThisMo   = d.getMonth() === month;
          const isTodayD   = ds === TODAY;
          const dayEvs     = events
            .filter(e => e.date === ds && visibleIds.has(e.calendarId))
            .slice(0, 3);
          const moreCount  = Math.max(0, events.filter(e => e.date === ds && visibleIds.has(e.calendarId)).length - 3);

          return (
            <div key={i} onClick={() => onDayClick(d)}
              className={`rounded-[8px] p-1.5 cursor-pointer border transition-colors min-h-[72px] ${
                isTodayD
                  ? "border-[var(--rally-brand)] bg-[var(--rally-brand-soft)]"
                  : "border-border bg-card hover:bg-muted/40"
              }`}>
              <div className={`w-6 h-6 flex items-center justify-center rounded-full text-[11px] font-medium mb-1 ${
                isTodayD ? "text-white" : isThisMo ? "text-foreground" : "text-muted-foreground/40"
              }`} style={isTodayD ? { background: "var(--rally-brand)" } : {}}>
                {d.getDate()}
              </div>

              {/* Event bars */}
              <div className="space-y-0.5">
                {dayEvs.map(e => {
                  const color = getColor(e.calendarId);
                  return (
                    <div key={e.id} onClick={ev => { ev.stopPropagation(); onEventClick(e); }}
                      className={`text-[10px] px-1.5 py-0.5 rounded-[3px] truncate leading-tight transition-opacity ${
                        selectedEventId === e.id ? "opacity-100" : "opacity-90 hover:opacity-100"
                      }`}
                      style={{ background: `${color}22`, color }}>
                      {e.title}
                    </div>
                  );
                })}
                {moreCount > 0 && (
                  <p className="text-[10px] text-muted-foreground pl-1">+{moreCount} more</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Event Detail Panel ────────────────────────────────────────────────────────

function EventDetailPanel({
  event, lists, onClose, canEdit,
  onUpdate, onDelete,
}: {
  event: CalEvent; lists: CalList[];
  onClose: () => void; canEdit: boolean;
  onUpdate: (id: string, p: Partial<CalEvent>) => void;
  onDelete: (id: string) => void;
}) {
  const [showAI,      setShowAI]      = useState(false);
  const [showCal,     setShowCal]     = useState(false);
  const [editTitle,   setEditTitle]   = useState(event.title);
  const [editDesc,    setEditDesc]    = useState(event.description ?? "");

  const color = lists.find(l => l.id === event.calendarId)?.color ?? "var(--text-tertiary)";
  const list  = lists.find(l => l.id === event.calendarId);

  useEffect(() => {
    setEditTitle(event.title);
    setEditDesc(event.description ?? "");
  }, [event.id]);

  const aiActions = [
    "Prepare me for this meeting",
    "Turn into agenda",
    "Suggest follow-up tasks",
    "Summarize related files",
  ];

  const calOptions = ["Google Calendar", "Apple Calendar", "Outlook", "Download .ics"];

  return (
    <aside className="h-full flex flex-col bg-card border-l border-border" style={{ width: 304, flexShrink: 0 }}>
      {/* Color strip */}
      <div className="h-1 flex-shrink-0" style={{ background: color }} />

      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)]">
        <span className="flex-1 text-[12px] font-medium text-muted-foreground">Event detail</span>
        <button onClick={() => setShowAI(v => !v)} title="AI Assist"
          className={`w-7 h-7 flex items-center justify-center rounded-[7px] transition-colors ${showAI ? "bg-[var(--rally-brand-soft)]" : "hover:bg-muted text-muted-foreground"}`}
          style={{ color: showAI ? "var(--rally-brand)" : undefined }}>
          <Sparkles className="size-4" />
        </button>
        <button onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground transition-colors">
          <X className="size-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {/* AI Assist */}
        {showAI && (
          <div className="p-3 rounded-[10px] border" style={{ borderColor: "var(--border-color)", background: "var(--rally-brand-soft)" }}>
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="size-3.5" style={{ color: "var(--rally-brand)" }} />
              <span className="text-[11px] font-medium" style={{ color: "var(--rally-brand)" }}>AI Assist</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {aiActions.map(a => (
                <button key={a} className="px-2.5 py-1 rounded-full border border-border bg-card text-[11px] text-foreground hover:border-[var(--rally-brand)] hover:bg-[var(--rally-brand-soft)] transition-colors">
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
              onBlur={() => editTitle.trim() && onUpdate(event.id, { title: editTitle.trim() })}
              className="w-full text-[15px] font-medium text-foreground bg-transparent outline-none border-b border-transparent hover:border-border focus:border-[var(--rally-brand)] pb-0.5 transition-colors" />
          ) : (
            <p className="text-[15px] font-medium text-foreground">{event.title}</p>
          )}
        </div>

        {/* Calendar list */}
        {list && (
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
            <span className="text-[12px] text-muted-foreground">{list.name}</span>
          </div>
        )}

        {/* Date & Time */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-overline)" }}>
            Date & Time
          </p>
          <div className="flex items-start gap-2">
            <CalendarIcon className="size-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] text-foreground">{formatDateFull(event.date)}</p>
              {event.allDay
                ? <p className="text-[11px] text-muted-foreground">All day</p>
                : event.startTime && <p className="text-[11px] text-muted-foreground">{formatTimeRange(event.startTime, event.endTime!)}</p>}
            </div>
          </div>
        </div>

        {/* Location */}
        {event.location && (
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-overline)" }}>Location</p>
            <div className="flex items-center gap-2">
              <MapPin className="size-3.5 text-muted-foreground flex-shrink-0" />
              <p className="text-[13px] text-foreground">{event.location}</p>
            </div>
          </div>
        )}

        {/* Attendees */}
        {event.attendees.length > 0 && (
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-overline)" }}>
              Attendees ({event.attendees.length + 1})
            </p>
            <div className="space-y-1.5">
              {/* Current user first */}
              <div className="flex items-center gap-2">
                <Av name="John Doe" size={22} />
                <span className="text-[12px] text-foreground flex-1">John Doe</span>
                <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">You · Organizer</span>
              </div>
              {event.attendees.map(a => (
                <div key={a} className="flex items-center gap-2">
                  <Av name={a} size={22} />
                  <span className="text-[12px] text-foreground">{a}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-overline)" }}>
            Description
          </p>
          {canEdit ? (
            <textarea value={editDesc} onChange={e => setEditDesc(e.target.value)}
              onBlur={() => onUpdate(event.id, { description: editDesc })}
              rows={3} placeholder="Add notes, agenda, or context…"
              className="w-full text-[12px] text-foreground bg-background border border-border rounded-[8px] px-3 py-2 outline-none resize-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground" />
          ) : (
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              {event.description || "No description."}
            </p>
          )}
        </div>

        {/* Linked context */}
        {event.links && event.links.length > 0 && (
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-overline)" }}>
              Linked to
            </p>
            <div className="space-y-1.5">
              {event.links.map((lk, i) => {
                const labelColors: Record<LinkType, string> = {
                  chat:  "var(--info-solid)", voice: "var(--success-solid)", file: "#6b21a8", task: "var(--warning-on)",
                };
                return (
                  <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded-[8px] border border-border bg-background hover:bg-muted transition-colors cursor-pointer">
                    {linkIcon(lk.type)}
                    <span className="text-[12px] text-foreground flex-1 truncate">{lk.label}</span>
                    <ArrowUpRight className="size-3.5 text-muted-foreground" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Add to personal calendar */}
        <div>
          <div className="relative">
            <button onClick={() => setShowCal(v => !v)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] border border-border bg-background hover:bg-muted transition-colors text-[12px] text-foreground">
              <div className="flex items-center gap-2">
                <Download className="size-3.5 text-muted-foreground" />
                Add to personal calendar
              </div>
              <ChevronDown className={`size-3.5 text-muted-foreground transition-transform ${showCal ? "rotate-180" : ""}`} />
            </button>
            {showCal && (
              <div className="mt-1 rounded-[8px] border border-border bg-card shadow-lg overflow-hidden z-10">
                {calOptions.map(opt => (
                  <button key={opt} onClick={() => setShowCal(false)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-[12px] text-foreground hover:bg-muted transition-colors text-left">
                    <ExternalLink className="size-3.5 text-muted-foreground" />
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      {canEdit && (
        <div className="flex-shrink-0 border-t border-[var(--border-subtle)] px-4 py-3 flex gap-2">
          <button onClick={() => { onDelete(event.id); onClose(); }}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-[8px] border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-[12px]">
            Delete
          </button>
          <button onClick={() => onClose()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[8px] text-white text-[12px] font-medium transition-colors"
            style={{ background: "var(--rally-brand)" }}>
            Done
          </button>
        </div>
      )}
    </aside>
  );
}

// ── New Event Modal ───────────────────────────────────────────────────────────

interface NewEventForm {
  title: string; date: string; startTime: string; endTime: string;
  allDay: boolean; calendarId: string; description: string; location: string;
}

function NewEventModal({
  open, onClose, lists, initial, onSubmit, canCreate,
}: {
  open: boolean; onClose: () => void;
  lists: CalList[]; initial: Partial<NewEventForm>;
  onSubmit: (f: NewEventForm) => void;
  canCreate: boolean;
}) {
  const [form, setForm] = useState<NewEventForm>({
    title: "", date: TODAY, startTime: "09:00", endTime: "10:00",
    allDay: false, calendarId: "meetings", description: "", location: "",
    ...initial,
  });

  useEffect(() => {
    if (open) setForm(f => ({ ...f, title: "", description: "", location: "", ...initial }));
  }, [open]);

  if (!open) return null;

  function set<K extends keyof NewEventForm>(k: K, v: NewEventForm[K]) {
    setForm(f => ({ ...f, [k]: v }));
  }

  function handleSubmit() {
    if (!form.title.trim()) return;
    onSubmit(form);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-[16px] shadow-2xl w-full max-w-md overflow-hidden">
        {/* Top color strip */}
        <div className="h-1" style={{ background: lists.find(l => l.id === form.calendarId)?.color ?? "var(--rally-brand)" }} />

        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-[15px] font-medium text-foreground flex-1">New Event</h2>
            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground transition-colors">
              <X className="size-4" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Title */}
            <input value={form.title} onChange={e => set("title", e.target.value)}
              placeholder="Event title"
              className="w-full px-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground" />

            {/* Date + all-day */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-[10px] text-muted-foreground block mb-1">Date</label>
                <input type="date" value={form.date} onChange={e => set("date", e.target.value)}
                  className="w-full px-3 py-2 rounded-[8px] border border-border bg-background text-foreground text-[12px] outline-none focus:border-[var(--rally-brand)] transition-colors" />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button onClick={() => set("allDay", !form.allDay)}
                  className={`w-8 h-5 rounded-full transition-colors relative ${form.allDay ? "bg-[var(--rally-brand)]" : "bg-muted"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-card rounded-full shadow transition-transform ${form.allDay ? "translate-x-3" : "translate-x-0.5"}`} />
                </button>
                <span className="text-[11px] text-muted-foreground">All day</span>
              </div>
            </div>

            {/* Times */}
            {!form.allDay && (
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-[10px] text-muted-foreground block mb-1">Start</label>
                  <input type="time" value={form.startTime} onChange={e => set("startTime", e.target.value)}
                    className="w-full px-3 py-2 rounded-[8px] border border-border bg-background text-foreground text-[12px] outline-none focus:border-[var(--rally-brand)] transition-colors" />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] text-muted-foreground block mb-1">End</label>
                  <input type="time" value={form.endTime} onChange={e => set("endTime", e.target.value)}
                    className="w-full px-3 py-2 rounded-[8px] border border-border bg-background text-foreground text-[12px] outline-none focus:border-[var(--rally-brand)] transition-colors" />
                </div>
              </div>
            )}

            {/* Calendar */}
            <div>
              <label className="text-[10px] text-muted-foreground block mb-1">Calendar</label>
              <select value={form.calendarId} onChange={e => set("calendarId", e.target.value)}
                className="w-full px-3 py-2 rounded-[8px] border border-border bg-background text-foreground text-[12px] outline-none focus:border-[var(--rally-brand)] transition-colors">
                {lists.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </div>

            {/* Location */}
            <input value={form.location} onChange={e => set("location", e.target.value)}
              placeholder="Location (optional)"
              className="w-full px-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[12px] outline-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground" />

            {/* Description */}
            <textarea value={form.description} onChange={e => set("description", e.target.value)}
              rows={2} placeholder="Notes or agenda (optional)"
              className="w-full px-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[12px] outline-none resize-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground" />
          </div>

          <div className="flex gap-2 mt-4">
            <button onClick={onClose}
              className="px-4 py-2 rounded-[8px] border border-border text-muted-foreground hover:bg-muted text-[12px] transition-colors">
              Cancel
            </button>
            <button onClick={handleSubmit}
              className="flex-1 py-2 rounded-[8px] text-white text-[12px] font-medium transition-colors"
              style={{ background: "var(--rally-brand)" }}>
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function CalendarV2() {
  const { userRole } = useAuth();
  const canEdit = userRole !== "viewer";

  const [events,    setEvents]   = useState<CalEvent[]>(initialEvents);
  const [lists,     setLists]    = useState<CalList[]>(initialLists);
  const [view,      setView]     = useState<ViewMode>("week");
  const [weekStart, setWeekStart] = useState(() => new Date(2026, 3, 20)); // Mon Apr 20
  const [selected,  setSelected] = useState<CalEvent | null>(null);
  const [newOpen,   setNewOpen]  = useState(false);
  const [newInit,   setNewInit]  = useState<Partial<NewEventForm>>({});
  const [search,    setSearch]   = useState("");
  const [miniYear,  setMiniYear] = useState(2026);
  const [miniMonth, setMiniMonth] = useState(3); // April (0-indexed)

  function toggleList(id: string) {
    setLists(prev => prev.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  }

  function updateEvent(id: string, patch: Partial<CalEvent>) {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e));
    if (selected?.id === id) setSelected(e => e ? { ...e, ...patch } : e);
  }

  function deleteEvent(id: string) {
    setEvents(prev => prev.filter(e => e.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  function addEvent(form: NewEventForm) {
    const newEv: CalEvent = {
      id: `e${Date.now()}`, calendarId: form.calendarId, title: form.title,
      date: form.date,
      startTime: form.allDay ? undefined : form.startTime,
      endTime:   form.allDay ? undefined : form.endTime,
      allDay:    form.allDay || undefined,
      description: form.description || undefined,
      location:    form.location || undefined,
      attendees: [], createdBy: "John Doe",
    };
    setEvents(prev => [...prev, newEv]);
  }

  function handleSlotClick(date: string, hour: number) {
    if (!canEdit) return;
    const h = Math.max(START_HOUR, Math.min(hour, END_HOUR - 1));
    setNewInit({
      date, startTime: `${pad2(h)}:00`, endTime: `${pad2(h + 1)}:00`, allDay: false,
    });
    setNewOpen(true);
  }

  function handleDateClick(d: Date) {
    const str = dateToStr(d);
    // Navigate week view to that week
    const dow = (d.getDay() + 6) % 7; // Mon = 0
    const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() - dow);
    setWeekStart(monday);
    setView("week");
  }

  function handleMiniCalMonth(y: number, m: number) {
    setMiniYear(y); setMiniMonth(m);
  }

  function goToPrevWeek()  { setWeekStart(d => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7)); }
  function goToNextWeek()  { setWeekStart(d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7)); }
  function goToToday()     { setWeekStart(new Date(2026, 3, 20)); setView("week"); setMiniYear(2026); setMiniMonth(3); }

  const filteredEvents = search.trim()
    ? events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()))
    : events;

  // Header title
  const headerTitle =
    view === "week"   ? weekLabel(weekStart) :
    view === "month"  ? `${MONTH_NAMES[miniMonth]} ${miniYear}` :
    "Agenda";

  const viewButtons: { id: ViewMode; label: string }[] = [
    { id: "week",   label: "Week" },
    { id: "agenda", label: "Agenda" },
    { id: "month",  label: "Month" },
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden bg-background">
      {/* Top header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Date nav */}
          <div className="flex items-center gap-1">
            <button onClick={goToPrevWeek}
              className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground transition-colors">
              <ChevronLeft className="size-4" />
            </button>
            <button onClick={goToNextWeek}
              className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground transition-colors">
              <ChevronRight className="size-4" />
            </button>
          </div>

          <span className="text-[14px] font-medium text-foreground min-w-0 mr-1">{headerTitle}</span>

          <button onClick={goToToday}
            className="h-7 px-3 rounded-[7px] border border-border bg-background text-[11px] text-foreground hover:bg-muted transition-colors">
            Today
          </button>

          <div className="flex-1" />

          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search events…"
              className="pl-8 pr-3 h-8 w-40 rounded-[8px] border border-border bg-background text-[12px] text-foreground placeholder:text-muted-foreground outline-none focus:border-[var(--rally-brand)] transition-colors" />
          </div>

          {/* View switcher */}
          <div className="flex rounded-[8px] border border-border overflow-hidden">
            {viewButtons.map(v => (
              <button key={v.id} onClick={() => setView(v.id)}
                className={`h-8 px-3 text-[11px] transition-colors ${
                  view === v.id ? "text-white" : "text-muted-foreground hover:bg-muted"
                }`}
                style={view === v.id ? { background: "var(--rally-brand)" } : {}}>
                {v.label}
              </button>
            ))}
          </div>

          {/* Ask AI */}
          <button className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] border border-border bg-background text-muted-foreground hover:bg-muted transition-colors text-[12px]">
            <Sparkles className="size-3.5" style={{ color: "var(--rally-brand)" }} /> Ask AI
          </button>

          {/* New Event */}
          {canEdit && (
            <button onClick={() => { setNewInit({}); setNewOpen(true); }}
              className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] text-white text-[12px] font-medium"
              style={{ background: "var(--rally-brand)" }}>
              <Plus className="size-3.5" /> New Event
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left rail */}
        <LeftRail
          lists={lists} events={events}
          onListToggle={toggleList}
          weekStart={weekStart}
          selectedDate={dateToStr(weekStart)}
          onDateClick={handleDateClick}
          miniCalYear={miniYear} miniCalMonth={miniMonth}
          onMiniCalMonthChange={handleMiniCalMonth}
          onNewEvent={() => { setNewInit({}); setNewOpen(true); }}
        />

        {/* Main view */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {view === "week" && (
            <WeekView
              weekStart={weekStart} events={filteredEvents} lists={lists}
              selectedEventId={selected?.id ?? null}
              onEventClick={setSelected}
              onSlotClick={handleSlotClick}
            />
          )}
          {view === "agenda" && (
            <AgendaView
              startDate={weekStart} events={filteredEvents} lists={lists}
              selectedEventId={selected?.id ?? null}
              onEventClick={setSelected}
            />
          )}
          {view === "month" && (
            <MonthView
              year={miniYear} month={miniMonth}
              events={filteredEvents} lists={lists}
              selectedEventId={selected?.id ?? null}
              onEventClick={setSelected}
              onDayClick={handleDateClick}
            />
          )}
        </div>

        {/* Event detail panel */}
        {selected && (
          <EventDetailPanel
            key={selected.id} event={selected} lists={lists}
            onClose={() => setSelected(null)}
            canEdit={canEdit}
            onUpdate={updateEvent}
            onDelete={deleteEvent}
          />
        )}
      </div>

      {/* Viewer badge */}
      {!canEdit && (
        <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border-t border-border bg-muted/30">
          <AlertCircle className="size-3.5 text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground">Read-only view — upgrade your role to create or edit events.</p>
        </div>
      )}

      {/* New event modal */}
      <NewEventModal
        open={newOpen && canEdit} onClose={() => setNewOpen(false)}
        lists={lists} initial={newInit}
        onSubmit={addEvent} canCreate={canEdit}
      />
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft, ChevronRight, Plus, Search, X,
  Calendar as CalendarIcon, Clock, MessageSquare, Mic2,
  FileText, CheckSquare, ArrowUpRight, Activity, Check,
  ChevronDown, AlertCircle, Users, MapPin, AlignLeft,
  Download, ExternalLink, ChevronUp, SlidersHorizontal,
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

type AttendanceStatus = "attended" | "missed" | "declined";

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
  attendance?: AttendanceStatus; // set on past events; absent = attended by default
}

// ── Constants ─────────────────────────────────────────────────────────────────

const TODAY          = "2026-04-21";
const CURRENT_TIME   = "10:45"; // fake "now" for demo
const START_HOUR     = 0;
const END_HOUR       = 24;
const HOUR_HEIGHT    = 56;
const TOTAL_GRID_H   = END_HOUR * HOUR_HEIGHT; // 1344px (24h)
const HOURS          = Array.from({ length: 24 }, (_, i) => i); // 0 → 23
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
  // ─ Monday Apr 20 (past) ─
  {
    id: "e0a", calendarId: "team-events", title: "Morning Workout",
    date: "2026-04-20", startTime: "06:30", endTime: "07:30",
    description: "Morning gym session before work.",
    attendees: [], createdBy: "John Doe",
    attendance: "attended",
  },
  {
    id: "e0b", calendarId: "meetings", title: "Team Standup",
    date: "2026-04-20", startTime: "09:00", endTime: "09:30",
    description: "Daily 30-minute standup. Share progress, blockers, and plan for the day.",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [{ type: "voice", label: "Standup Room" }],
    createdBy: "John Doe",
    attendance: "missed", // ran late
  },
  {
    id: "e0", calendarId: "meetings", title: "Weekly All-Hands",
    date: "2026-04-20", startTime: "10:00", endTime: "11:00",
    description: "Company-wide weekly sync. Updates from each team lead, blockers, and shoutouts.",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [{ type: "voice", label: "All-Hands Room" }, { type: "chat", label: "#general" }],
    createdBy: "John Doe",
    attendance: "attended",
  },
  {
    id: "e0c", calendarId: "milestones", title: "Investor Call",
    date: "2026-04-20", startTime: "13:00", endTime: "14:00",
    description: "Quarterly investor update call.",
    attendees: ["Sarah Johnson"],
    links: [{ type: "voice", label: "Investor Room" }],
    createdBy: "Sarah Johnson",
    attendance: "declined", // not in my scope
  },
  {
    id: "e0d", calendarId: "meetings", title: "1:1 with Mike",
    date: "2026-04-20", startTime: "15:00", endTime: "15:30",
    description: "Weekly 1:1 with Mike Chen.",
    attendees: ["Mike Chen"],
    links: [{ type: "chat", label: "Mike Chen" }],
    createdBy: "John Doe",
    attendance: "attended",
  },
  {
    id: "e0e", calendarId: "team-events", title: "Team Happy Hour",
    date: "2026-04-20", startTime: "18:00", endTime: "20:00",
    description: "Weekly team virtual happy hour. Games, chat, unwind.",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [{ type: "voice", label: "Hangout Room" }],
    createdBy: "Emily Davis",
    attendance: "attended",
  },
  // ─ Tuesday Apr 21 (TODAY — current time 10:45) ─
  {
    id: "e1", calendarId: "meetings", title: "Team Standup",
    date: "2026-04-21", startTime: "09:00", endTime: "09:30",
    description: "Daily 30-minute standup. Share progress, blockers, and plan for the day.",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [{ type: "voice", label: "Standup Room" }, { type: "chat", label: "#general" }],
    createdBy: "John Doe",
    attendance: "attended",  // already past (10:45 now)
  },
  {
    id: "e1b", calendarId: "team-events", title: "Coffee Chat: Design & Eng",
    date: "2026-04-21", startTime: "10:00", endTime: "10:30",
    description: "Informal cross-team coffee chat.",
    attendees: ["Sarah Johnson", "Emily Davis"],
    createdBy: "Sarah Johnson",
    attendance: "missed", // forgot
  },
  {
    id: "e2", calendarId: "meetings", title: "Design Review: Mobile Header",
    date: "2026-04-21", startTime: "10:30", endTime: "11:30",
    description: "Review the latest mobile header redesign with Sarah. Focus on navigation drawer behavior and CTA placement.",
    location: "Design Studio",
    attendees: ["Sarah Johnson"],
    links: [
      { type: "file",  label: "Header_v3.fig" },
      { type: "chat",  label: "#design" },
      { type: "task",  label: "Review mobile header design" },
    ],
    createdBy: "Sarah Johnson",
    // in-progress: startTime 10:30, endTime 11:30, now is 10:45
  },
  {
    id: "e3", calendarId: "milestones", title: "Q2 Planning Session",
    date: "2026-04-21", startTime: "14:00", endTime: "15:30",
    description: "Align on Q2 goals, launch milestones, and resource allocation.",
    location: "Conference Room B",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [
      { type: "file", label: "Q2_Launch_Brief.pdf" },
      { type: "task", label: "Prepare Q2 launch brief" },
      { type: "chat", label: "#planning" },
    ],
    createdBy: "John Doe",
    // upcoming
  },
  {
    id: "e4", calendarId: "meetings", title: "1:1 with Sarah",
    date: "2026-04-21", startTime: "16:00", endTime: "17:00",
    description: "Weekly 1:1 with Sarah Johnson. Review design progress, career goals, and blockers.",
    attendees: ["Sarah Johnson"],
    links: [{ type: "chat", label: "Sarah Johnson" }],
    createdBy: "John Doe",
    // upcoming
  },
  {
    id: "e4b", calendarId: "team-events", title: "Late Planning Wrap-up",
    date: "2026-04-21", startTime: "21:00", endTime: "22:00",
    description: "Late evening wrap-up and planning notes for tomorrow.",
    attendees: ["Mike Chen"],
    links: [{ type: "chat", label: "#planning" }],
    createdBy: "John Doe",
    // upcoming
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
    description: "Sprint 23 planning session. Review backlog, assign stories, set sprint goal.",
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
  {
    id: "e7b", calendarId: "team-events", title: "Board Game Night",
    date: "2026-04-22", startTime: "20:00", endTime: "22:30",
    description: "Monthly team game night. This month: Codenames.",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [{ type: "voice", label: "Game Room" }],
    createdBy: "Sarah Johnson",
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
    id: "e9b", calendarId: "meetings", title: "Early Briefing",
    date: "2026-04-23", startTime: "07:00", endTime: "07:45",
    description: "Early morning briefing call with East Coast team.",
    attendees: ["Sarah Johnson"],
    links: [{ type: "voice", label: "Early Room" }],
    createdBy: "Sarah Johnson",
  },
  {
    id: "e10", calendarId: "meetings", title: "Product Review",
    date: "2026-04-23", startTime: "14:00", endTime: "15:00",
    description: "Monthly product review with stakeholders.",
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
    description: "Live product demo for Acme Corp.",
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
    description: "End-of-week dev sync. Review PR queue, staging tests, and release blockers for v2.1.",
    attendees: ["Mike Chen", "Emily Davis"],
    links: [{ type: "chat", label: "#engineering" }],
    createdBy: "Mike Chen",
  },
  {
    id: "e15b", calendarId: "team-events", title: "Release Celebration",
    date: "2026-04-24", startTime: "17:00", endTime: "19:00",
    description: "v2.1 shipped! Celebrate with the team.",
    attendees: ["Sarah Johnson", "Mike Chen", "Emily Davis"],
    links: [{ type: "voice", label: "Party Room" }],
    createdBy: "Emily Davis",
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

// ── Event status ──────────────────────────────────────────────────────────────

type EventStatus = "upcoming" | "in-progress" | "attended" | "missed" | "declined";

function getEventStatus(e: CalEvent): EventStatus {
  if (e.allDay || !e.startTime) return "upcoming";
  if (e.date > TODAY) return "upcoming";

  const nowMin   = currentMinutes();
  const startMin = toMin(e.startTime);
  const endMin   = e.endTime ? toMin(e.endTime) : startMin + 60;

  if (e.date === TODAY) {
    if (startMin > nowMin)              return "upcoming";
    if (endMin   > nowMin)              return "in-progress";
    // Past on today
    if (e.attendance === "declined")    return "declined";
    if (e.attendance === "missed")      return "missed";
    return "attended";
  }

  // Fully past day
  if (e.attendance === "declined")      return "declined";
  if (e.attendance === "missed")        return "missed";
  return "attended";
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

// ── Calendars Popover ─────────────────────────────────────────────────────────

function CalendarPopover({
  lists, events, onListToggle, weekStart, selectedDate, onDateClick,
  miniCalYear, miniCalMonth, onMiniCalMonthChange, anchorRect, onClose,
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
  anchorRect: DOMRect;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [changesOpen, setChangesOpen] = useState(false);

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
      className="w-[220px] rounded-[12px] overflow-y-auto"
      style={{
        position: "fixed",
        top: anchorRect.bottom + 6,
        right: window.innerWidth - anchorRect.right,
        zIndex: 9999,
        maxHeight: `calc(100vh - ${anchorRect.bottom + 16}px)`,
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
      }}
    >
      {/* Mini Calendar */}
      <MiniCalendar
        year={miniCalYear} month={miniCalMonth}
        selectedDate={selectedDate} weekStartDate={weekStart}
        events={events} onDateClick={onDateClick}
        onMonthChange={onMiniCalMonthChange}
      />

      <div className="h-px bg-border mx-3" />

      {/* Calendar toggles */}
      <div className="px-3 py-2.5">
        <p className="text-[10px] font-medium uppercase tracking-widest mb-1.5" style={{ color: "var(--text-overline)" }}>
          Calendars
        </p>
        <div className="space-y-0.5">
          {lists.map(l => (
            <button key={l.id} onClick={() => onListToggle(l.id)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-[7px] hover:bg-muted transition-colors text-left">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: l.color, opacity: l.visible ? 1 : 0.3 }} />
              <span className={`text-[11px] flex-1 ${l.visible ? "text-foreground" : "text-muted-foreground"}`}>
                {l.name}
              </span>
              {l.visible && <Check className="size-3 text-muted-foreground flex-shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border mx-3" />

      {/* Up Next */}
      <div className="pt-2">
        <UpNextCard events={events} lists={lists} />
      </div>

      <div className="h-px bg-border mx-3" />

      {/* Schedule Changes */}
      <div className="px-3 py-2.5">
        <button onClick={() => setChangesOpen(v => !v)}
          className="w-full flex items-center gap-1.5 py-0.5 text-left">
          <Activity className="size-3.5 text-muted-foreground flex-shrink-0" />
          <span className="text-[10px] text-muted-foreground flex-1">Schedule Changes</span>
          {changesOpen
            ? <ChevronUp className="size-3 text-muted-foreground" />
            : <ChevronDown className="size-3 text-muted-foreground" />}
        </button>
        {changesOpen && (
          <div className="mt-2 space-y-2 pb-1">
            {SCHEDULE_CHANGES.map(c => (
              <div key={c.id} className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: c.dot }} />
                <p className="text-[10px] text-muted-foreground flex-1 leading-snug">{c.text}</p>
                <span className="text-[10px] text-muted-foreground flex-shrink-0 ml-2">{c.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Event overlap layout ──────────────────────────────────────────────────────

function toMin(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

interface PositionedEvent {
  event: CalEvent;
  col: number;
  totalCols: number;
}

function layoutDayEvents(evs: CalEvent[]): PositionedEvent[] {
  if (!evs.length) return [];
  const sorted = [...evs].sort((a, b) => toMin(a.startTime!) - toMin(b.startTime!));
  const slots: number[] = []; // tracks end-min of last event in each slot
  const placed: { event: CalEvent; col: number }[] = [];

  for (const ev of sorted) {
    const s = toMin(ev.startTime!);
    const e = toMin(ev.endTime!);
    let col = slots.findIndex(end => end <= s);
    if (col === -1) { col = slots.length; slots.push(0); }
    slots[col] = e;
    placed.push({ event: ev, col });
  }

  return placed.map(({ event, col }) => {
    const s = toMin(event.startTime!);
    const e = toMin(event.endTime!);
    const concurrent = placed.filter(p => toMin(p.event.startTime!) < e && toMin(p.event.endTime!) > s).length;
    return { event, col, totalCols: Math.max(concurrent, 1) };
  });
}

// ── Week event block ──────────────────────────────────────────────────────────

/*
  Five visual states, each with a distinct design language:
  ┌─────────────┬──────────────────────────────────────────────────────────────┐
  │ upcoming    │ Vivid color — solid left border, tinted bg, full-color text  │
  │ in-progress │ Glow + pulse dot — brighter bg, brand ring                  │
  │ attended    │ Muted — thin border at 50% opacity, de-saturated text, ✓    │
  │ missed      │ Gray — gray border, strikethrough title, very dim            │
  │ declined    │ Dashed border — ghost bg, strikethrough, slash badge         │
  └─────────────┴──────────────────────────────────────────────────────────────┘
*/
function WeekEventBlock({
  event, color, selected, onClick, col, totalCols,
}: {
  event: CalEvent; color: string; selected: boolean;
  onClick: (e: React.MouseEvent) => void;
  col: number; totalCols: number;
}) {
  const bgRef  = useRef<HTMLDivElement>(null);
  const top    = eventTopPx(event.startTime!);
  const height = eventHeightPx(event.startTime!, event.endTime!);
  const status = getEventStatus(event);

  const showTime  = height >= 40;
  const showRange = height >= 56;
  const showLinks = height >= 84 && !!event.links?.length;
  const showAvs   = height >= 100 && event.attendees.length > 0;
  const showBadge = height >= 28; // show status badge (✓ / ✗ / /)

  const colW     = 100 / totalCols;
  const leftPct  = col * colW;
  const rightPct = 100 - (col + 1) * colW;
  const EDGE = 3;
  const GAP  = 1;

  // ── Per-status visual tokens ──────────────────────────────────────────────
  // bg opacity
  const bgOpacity = {
    "upcoming":     selected ? 0.16 : 0.10,
    "in-progress":  selected ? 0.22 : 0.16,
    "attended":     selected ? 0.10 : 0.06,
    "missed":       0,
    "declined":     0,
  }[status];

  // text color
  const textColor = {
    "upcoming":    color,
    "in-progress": color,
    "attended":    "var(--muted-foreground)",
    "missed":      "var(--muted-foreground)",
    "declined":    "var(--muted-foreground)",
  }[status];

  // text opacity
  const textOpacity = {
    "upcoming":    1,
    "in-progress": 1,
    "attended":    0.7,
    "missed":      0.5,
    "declined":    0.45,
  }[status];

  // left border
  const borderLeft = {
    "upcoming":    `3px solid ${color}`,
    "in-progress": `3px solid ${color}`,
    "attended":    `2px solid ${color}`,
    "missed":      "2px solid #9ca3af",
    "declined":    `2px dashed ${color}`,
  }[status];

  // background color for the bg div
  const bgColor = {
    "upcoming":    color,
    "in-progress": color,
    "attended":    color,
    "missed":      "#9ca3af",
    "declined":    "transparent",
  }[status];

  // box shadow for whole block
  const shadow = status === "in-progress" && !selected
    ? `0 0 0 1.5px ${color}, 0 2px 12px rgba(0,0,0,0.12)`
    : selected
    ? "0 2px 8px rgba(0,0,0,0.15)"
    : "0 1px 2px rgba(0,0,0,0.06)";

  const hoverBgDelta = { "upcoming": 0.07, "in-progress": 0.05, "attended": 0.04, "missed": 0.04, "declined": 0.04 }[status];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => { if (bgRef.current) bgRef.current.style.opacity = String(bgOpacity + hoverBgDelta); }}
      onMouseLeave={() => { if (bgRef.current) bgRef.current.style.opacity = String(bgOpacity); }}
      style={{
        position: "absolute",
        top, height,
        left:  `calc(${leftPct}%  + ${col === 0             ? EDGE : GAP}px)`,
        right: `calc(${rightPct}% + ${col === totalCols - 1 ? EDGE : GAP}px)`,
        borderRadius: 5,
        borderLeft,
        overflow: "hidden",
        cursor: "pointer",
        zIndex: selected ? 3 : status === "in-progress" ? 2 : 1,
        outline: selected ? `1.5px solid ${color}` : "none",
        outlineOffset: 1,
        boxShadow: shadow,
        opacity: status === "missed" ? 0.7 : status === "declined" ? 0.6 : 1,
        transition: "box-shadow 0.12s, opacity 0.12s",
      }}
    >
      {/* Background tint layer */}
      <div
        ref={bgRef}
        style={{
          position: "absolute", inset: 0,
          background: bgColor,
          opacity: bgOpacity,
          transition: "opacity 0.12s",
          pointerEvents: "none",
        }}
      />

      {/* Status badge — top right corner */}
      {showBadge && (
        <div style={{
          position: "absolute", top: 3, right: 4,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}>
          {status === "attended" && (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5.5" stroke={color} strokeOpacity="0.5" />
              <path d="M3.5 6.5l2 2 3-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
            </svg>
          )}
          {status === "missed" && (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5.5" stroke="#9ca3af" strokeOpacity="0.6" />
              <path d="M4 4l4 4M8 4l-4 4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
            </svg>
          )}
          {status === "declined" && (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5.5" stroke={color} strokeOpacity="0.4" strokeDasharray="2 2" />
              <path d="M3 6h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
            </svg>
          )}
        </div>
      )}

      {/* Content */}
      <div style={{ position: "relative", padding: "3px 20px 3px 5px", height: "100%", overflow: "hidden" }}>
        {/* In-progress pulse dot */}
        {status === "in-progress" && (
          <span style={{
            display: "inline-block", width: 6, height: 6, borderRadius: "50%",
            background: color, marginRight: 4, verticalAlign: "middle",
            animation: "pulse 1.5s ease-in-out infinite",
          }} />
        )}

        {/* Title */}
        <span style={{
          fontSize: 11, fontWeight: status === "attended" || status === "missed" || status === "declined" ? 500 : 600,
          lineHeight: 1.35,
          color: textColor,
          opacity: textOpacity,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          display: "block",
          textDecoration: status === "missed" || status === "declined" ? "line-through" : "none",
          textDecorationColor: status === "missed" ? "#9ca3af88" : `${color}66`,
        }}>
          {event.title}
        </span>

        {/* Time */}
        {showRange ? (
          <p style={{
            margin: "1px 0 0", fontSize: 10, lineHeight: 1.3,
            color: textColor, opacity: textOpacity * 0.7,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {formatTimeRange(event.startTime!, event.endTime!)}
          </p>
        ) : showTime ? (
          <p style={{
            margin: "1px 0 0", fontSize: 10, lineHeight: 1.3,
            color: textColor, opacity: textOpacity * 0.7,
          }}>
            {formatTime(event.startTime!)}
          </p>
        ) : null}

        {/* Links */}
        {showLinks && (
          <div style={{ display: "flex", gap: 3, marginTop: 3 }}>
            {event.links!.slice(0, 3).map((lk, i) => (
              <span key={i} style={{ opacity: textOpacity * 0.7, fontSize: 11 }}>{linkIcon(lk.type)}</span>
            ))}
          </div>
        )}

        {/* Attendees */}
        {showAvs && (
          <div style={{ display: "flex", marginTop: 4 }}>
            {event.attendees.slice(0, 3).map(a => <Av key={a} name={a} size={14} />)}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Week View ─────────────────────────────────────────────────────────────────

const GUTTER_W = 60; // px — must be the same in both header and body

function WeekView({
  weekStart, events, lists, selectedEventId, onEventClick, onSlotClick, onPrev, onNext,
}: {
  weekStart: Date; events: CalEvent[]; lists: CalList[];
  selectedEventId: string | null;
  onEventClick: (e: CalEvent) => void;
  onSlotClick: (date: string, hour: number) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const gridRef    = useRef<HTMLDivElement>(null);
  const weekDays   = Array.from({ length: 5 }, (_, i) => dateToStr(addDays(weekStart, i)));
  const visibleIds = new Set(lists.filter(l => l.visible).map(l => l.id));
  const getColor   = (id: string) => lists.find(l => l.id === id)?.color ?? "#888888";
  const curTop     = currentTimePx();

  useEffect(() => {
    // Scroll to show 2 hours before the current time, or 7AM if very early
    const scrollTo = Math.max(7 * HOUR_HEIGHT, curTop - 2 * HOUR_HEIGHT);
    if (gridRef.current) gridRef.current.scrollTop = scrollTo;
  }, []);

  const eventsForDay  = (d: string) =>
    events.filter(e => e.date === d && !e.allDay && e.startTime && visibleIds.has(e.calendarId));
  const allDayForDay  = (d: string) =>
    events.filter(e => e.date === d && (e.allDay || !e.startTime) && visibleIds.has(e.calendarId));
  const dayMeta = (d: string) => {
    const dt = new Date(d + "T12:00:00");
    const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return { dow: DAYS[dt.getDay()], num: dt.getDate() };
  };

  // Shared style tokens
  const colBorder = "1px solid rgba(0,0,0,0.07)";
  const rowBorder = "1px solid rgba(0,0,0,0.07)";

  // Shared side-arrow button style
  const sideArrowStyle = (side: "left" | "right"): React.CSSProperties => ({
    position: "absolute",
    top: "50%", transform: "translateY(-50%)",
    [side]: 6,
    zIndex: 30,
    width: 28, height: 28, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "var(--card)",
    border: "1px solid var(--border)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
    cursor: "pointer",
    color: "var(--foreground)",
    transition: "box-shadow 0.15s, background 0.15s",
  });

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0, position: "relative" }}>

      {/* Side navigation arrows — overlaid on the scrollable body */}
      <button
        onClick={onPrev}
        style={{ ...sideArrowStyle("left"), top: "calc(50% + 40px)" }}
        onMouseEnter={e => { e.currentTarget.style.background = "var(--muted)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "var(--card)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.10)"; }}
        title="Previous week"
      >
        <ChevronLeft style={{ width: 14, height: 14 }} />
      </button>
      <button
        onClick={onNext}
        style={{ ...sideArrowStyle("right"), top: "calc(50% + 40px)" }}
        onMouseEnter={e => { e.currentTarget.style.background = "var(--muted)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "var(--card)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.10)"; }}
        title="Next week"
      >
        <ChevronRight style={{ width: 14, height: 14 }} />
      </button>

      {/* ── Header (sticky) ── */}
      <div style={{
        flexShrink: 0,
        background: "var(--card)",
        borderBottom: "1px solid var(--border)",
        zIndex: 20,
      }}>
        {/* Day name + number row */}
        <div style={{ display: "flex" }}>
          {/* Gutter placeholder — same width as body gutter */}
          <div style={{ width: GUTTER_W, flexShrink: 0 }} />
          {/* Day columns */}
          {weekDays.map((d, i) => {
            const { dow, num } = dayMeta(d);
            const today = isToday(d);
            return (
              <div
                key={d}
                style={{
                  flex: 1, minWidth: 0,
                  display: "flex", flexDirection: "column", alignItems: "center",
                  paddingTop: 10, paddingBottom: 10,
                  borderLeft: colBorder,
                  background: today ? "rgba(255,70,21,0.03)" : "transparent",
                }}
              >
                {/* Day-of-week label */}
                <span style={{
                  fontSize: 10, fontWeight: today ? 700 : 500,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: today ? "var(--rally-brand)" : "var(--muted-foreground)",
                  marginBottom: 6,
                }}>
                  {dow}
                </span>
                {/* Date circle */}
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: today ? 700 : 400,
                  background: today ? "var(--rally-brand)" : "transparent",
                  color: today ? "#ffffff" : "var(--foreground)",
                }}>
                  {num}
                </div>
              </div>
            );
          })}
        </div>

        {/* All-day row */}
        <div style={{ display: "flex", borderTop: rowBorder }}>
          <div style={{
            width: GUTTER_W, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "flex-end",
            paddingRight: 8, paddingTop: 4, paddingBottom: 4,
          }}>
            <span style={{
              fontSize: 9, fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--muted-foreground)", userSelect: "none",
            }}>
              all‑day
            </span>
          </div>
          {weekDays.map(d => {
            const allD  = allDayForDay(d);
            const today = isToday(d);
            return (
              <div
                key={d}
                style={{
                  flex: 1, minWidth: 0, minHeight: 28,
                  borderLeft: colBorder,
                  padding: "3px 4px",
                  background: today ? "rgba(255,70,21,0.03)" : "transparent",
                }}
              >
                {allD.map(e => {
                  const c       = getColor(e.calendarId);
                  // all-day events in the past are shown muted; future/today are vivid
                  const isPast  = e.date < TODAY;
                  const missed  = e.attendance === "missed";
                  const declined = e.attendance === "declined";
                  return (
                    <div
                      key={e.id}
                      onClick={() => onEventClick(e)}
                      style={{
                        fontSize: 10, fontWeight: isPast ? 500 : 600, lineHeight: "18px",
                        padding: "0 8px", borderRadius: 9999, marginBottom: 2,
                        cursor: "pointer", overflow: "hidden",
                        whiteSpace: "nowrap", textOverflow: "ellipsis",
                        // Past: ghost outline; present/future: solid colored bg with white text
                        color: isPast ? "var(--muted-foreground)" : "#ffffff",
                        border: declined
                          ? `1.5px dashed ${c}`
                          : isPast
                          ? "1.5px solid var(--border)"
                          : `1.5px solid ${c}`,
                        background: isPast ? "transparent" : `${c}`,
                        opacity: isPast ? 0.55 : 1,
                        textDecoration: (missed || declined) ? "line-through" : "none",
                        transition: "opacity 0.1s",
                      }}
                      onMouseEnter={ev => (ev.currentTarget.style.opacity = isPast ? "0.8" : "0.85")}
                      onMouseLeave={ev => (ev.currentTarget.style.opacity = isPast ? "0.55" : "1")}
                    >
                      {e.title}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Scrollable time grid ── */}
      <div
        ref={gridRef}
        style={{ flex: 1, overflowY: "auto", background: "var(--background)", minHeight: 0 }}
      >
        {/* Fixed-height inner container */}
        <div style={{ display: "flex", height: TOTAL_GRID_H }}>

          {/* ── Time gutter ── */}
          <div style={{ width: GUTTER_W, flexShrink: 0, position: "relative", height: TOTAL_GRID_H }}>
            {HOURS.map((h, i) => {
              const label = h === 0 ? "12 AM" : h === 12 ? "12 PM" : h > 12 ? `${h - 12} PM` : `${h} AM`;
              // Bold the label on AM/PM boundaries
              const isBoundary = h === 0 || h === 12;
              return (
                <div
                  key={h}
                  style={{
                    position: "absolute",
                    top: i * HOUR_HEIGHT - 6,
                    right: 8,
                    fontSize: 10, lineHeight: 1,
                    fontWeight: isBoundary ? 600 : 400,
                    color: isBoundary ? "var(--foreground)" : "var(--muted-foreground)",
                    userSelect: "none",
                    opacity: i === 0 ? 0 : 1,
                  }}
                >
                  {label}
                </div>
              );
            })}
          </div>

          {/* ── Columns area ── */}
          <div style={{ flex: 1, position: "relative", display: "flex", minWidth: 0 }}>

            {/* Hour-line overlay — spans all columns */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
              {/* Solid hour lines */}
              {HOURS.map((h, i) => (
                <div
                  key={h}
                  style={{
                    position: "absolute", left: 0, right: 0,
                    top: i * HOUR_HEIGHT,
                    height: 1,
                    background: "var(--border)",
                    opacity: 0.5,
                  }}
                />
              ))}
              {/* Dashed half-hour lines */}
              {HOURS.map((h, i) => (
                <div
                  key={`hh${h}`}
                  style={{
                    position: "absolute", left: 0, right: 0,
                    top: i * HOUR_HEIGHT + HOUR_HEIGHT / 2,
                    height: 1,
                    backgroundImage: "repeating-linear-gradient(to right, var(--border) 0, var(--border) 4px, transparent 4px, transparent 8px)",
                    opacity: 0.22,
                  }}
                />
              ))}
            </div>

            {/* Day columns */}
            {weekDays.map(d => {
              const today      = isToday(d);
              const positioned = layoutDayEvents(eventsForDay(d));

              return (
                <div
                  key={d}
                  style={{
                    flex: 1, minWidth: 0, position: "relative",
                    height: TOTAL_GRID_H,
                    borderLeft: colBorder,
                    background: today ? "rgba(255,70,21,0.025)" : "transparent",
                    zIndex: 1,
                  }}
                  onClick={evt => {
                    const rect = (evt.currentTarget as HTMLElement).getBoundingClientRect();
                    const y    = evt.clientY - rect.top + gridRef.current!.scrollTop;
                    onSlotClick(d, Math.floor(y / HOUR_HEIGHT) + START_HOUR);
                  }}
                >
                  {/* Events */}
                  {positioned.map(({ event: e, col, totalCols }) => (
                    <WeekEventBlock
                      key={e.id}
                      event={e}
                      color={getColor(e.calendarId)}
                      selected={selectedEventId === e.id}
                      col={col}
                      totalCols={totalCols}
                      onClick={ev => { ev.stopPropagation(); onEventClick(e); }}
                    />
                  ))}

                  {/* Current time line — only in today's column */}
                  {today && curTop >= 0 && curTop <= TOTAL_GRID_H && (
                    <div
                      style={{
                        position: "absolute", left: 0, right: 0,
                        top: curTop - 1,
                        zIndex: 10, pointerEvents: "none",
                        display: "flex", alignItems: "center",
                      }}
                    >
                      <div style={{
                        width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
                        background: "var(--rally-brand)",
                        boxShadow: "0 0 0 2px var(--card)",
                        marginLeft: -2,
                      }} />
                      <div style={{ flex: 1, height: 2, background: "var(--rally-brand)", opacity: 0.9 }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Agenda View ───────────────────────────────────────────────────────────────

const AGENDA_STATUS_OPTS: { id: EventStatus; label: string; dot: string }[] = [
  { id: "upcoming",    label: "Upcoming",    dot: "var(--rally-brand)" },
  { id: "in-progress", label: "In progress", dot: "var(--success-solid)" },
  { id: "attended",    label: "Attended",    dot: "var(--info-solid)" },
  { id: "missed",      label: "Missed",      dot: "#9ca3af" },
  { id: "declined",    label: "Declined",    dot: "var(--error-solid)" },
];

function AgendaView({
  startDate, events, lists, selectedEventId, onEventClick,
}: {
  startDate: Date; events: CalEvent[]; lists: CalList[];
  selectedEventId: string | null;
  onEventClick: (e: CalEvent) => void;
}) {
  const getColor = (id: string) => lists.find(l => l.id === id)?.color ?? "var(--text-tertiary)";

  // Local filter state — independent of global calendar visibility
  const [calFilters,    setCalFilters]    = useState<Set<string>>(() => new Set(lists.map(l => l.id)));
  const [statusFilters, setStatusFilters] = useState<Set<EventStatus>>(() => new Set(AGENDA_STATUS_OPTS.map(s => s.id)));
  const [showAllDay,    setShowAllDay]    = useState(true);
  const [showEmpty,     setShowEmpty]     = useState(false);

  function toggleCal(id: string) {
    setCalFilters(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }
  function toggleStatus(id: EventStatus) {
    setStatusFilters(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  const days = Array.from({ length: 30 }, (_, i) => dateToStr(addDays(startDate, i)));

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>

      {/* ── Left filter sidebar ── */}
      <div style={{
        width: 196, flexShrink: 0,
        borderRight: "1px solid var(--border)",
        background: "var(--card)",
        overflowY: "auto",
        padding: "16px 0",
        display: "flex", flexDirection: "column", gap: 0,
      }}>
        {/* Header */}
        <div style={{ padding: "0 14px 10px", display: "flex", alignItems: "center", gap: 6 }}>
          <SlidersHorizontal style={{ width: 13, height: 13, color: "var(--muted-foreground)" }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--foreground)", letterSpacing: "0.02em" }}>Filters</span>
        </div>

        {/* Calendars */}
        <div style={{ padding: "0 14px 12px" }}>
          <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted-foreground)", marginBottom: 6 }}>
            Calendars
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {lists.map(l => {
              const on = calFilters.has(l.id);
              return (
                <button
                  key={l.id}
                  onClick={() => toggleCal(l.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "5px 8px", borderRadius: 7,
                    cursor: "pointer", border: "none",
                    background: on ? "var(--muted)" : "transparent",
                    transition: "background 0.1s",
                    textAlign: "left", width: "100%",
                  }}
                  onMouseEnter={e => { if (!on) e.currentTarget.style.background = "var(--muted)"; }}
                  onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}
                >
                  {/* Color dot / check */}
                  <div style={{
                    width: 12, height: 12, borderRadius: 3, flexShrink: 0,
                    background: on ? l.color : "transparent",
                    border: `2px solid ${l.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.1s",
                  }}>
                    {on && <Check style={{ width: 7, height: 7, color: "#fff", strokeWidth: 3 }} />}
                  </div>
                  <span style={{
                    fontSize: 11.5, color: on ? "var(--foreground)" : "var(--muted-foreground)",
                    fontWeight: on ? 500 : 400,
                  }}>
                    {l.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", margin: "4px 0 12px" }} />

        {/* Status */}
        <div style={{ padding: "0 14px 12px" }}>
          <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted-foreground)", marginBottom: 6 }}>
            Status
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {AGENDA_STATUS_OPTS.map(s => {
              const on = statusFilters.has(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleStatus(s.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "5px 8px", borderRadius: 7,
                    cursor: "pointer", border: "none",
                    background: on ? "var(--muted)" : "transparent",
                    transition: "background 0.1s",
                    textAlign: "left", width: "100%",
                  }}
                  onMouseEnter={e => { if (!on) e.currentTarget.style.background = "var(--muted)"; }}
                  onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                    background: on ? s.dot : "transparent",
                    border: `2px solid ${s.dot}`,
                    transition: "background 0.1s",
                    ...(s.id === "declined" ? { borderStyle: "dashed" } : {}),
                  }} />
                  <span style={{
                    fontSize: 11.5, color: on ? "var(--foreground)" : "var(--muted-foreground)",
                    fontWeight: on ? 500 : 400,
                  }}>
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", margin: "4px 0 12px" }} />

        {/* Options */}
        <div style={{ padding: "0 14px" }}>
          <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted-foreground)", marginBottom: 6 }}>
            Options
          </p>
          {([
            { key: "allDay", label: "All-day events", value: showAllDay, toggle: () => setShowAllDay(v => !v) },
            { key: "empty",  label: "Empty days",     value: showEmpty,  toggle: () => setShowEmpty(v => !v) },
          ]).map(opt => (
            <button
              key={opt.key}
              onClick={opt.toggle}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "5px 8px", borderRadius: 7,
                cursor: "pointer", border: "none",
                background: opt.value ? "var(--muted)" : "transparent",
                transition: "background 0.1s",
                textAlign: "left", width: "100%",
              }}
              onMouseEnter={e => { if (!opt.value) e.currentTarget.style.background = "var(--muted)"; }}
              onMouseLeave={e => { if (!opt.value) e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{
                width: 12, height: 12, borderRadius: 3, flexShrink: 0,
                background: opt.value ? "var(--rally-brand)" : "transparent",
                border: `2px solid ${opt.value ? "var(--rally-brand)" : "var(--border)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {opt.value && <Check style={{ width: 7, height: 7, color: "#fff", strokeWidth: 3 }} />}
              </div>
              <span style={{ fontSize: 11.5, color: "var(--foreground)", fontWeight: opt.value ? 500 : 400 }}>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Event list ── */}
      <div style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 24px" }}>
          {days.map(d => {
            const date   = new Date(d + "T12:00:00");
            const isDay  = isToday(d);
            const dayNum = date.getDate();
            const dow    = date.toLocaleDateString("en-US", { weekday: "short" });
            const month  = date.toLocaleDateString("en-US", { month: "long" });

            const dayEvs = events
              .filter(e => {
                if (e.date !== d) return false;
                if (!calFilters.has(e.calendarId)) return false;
                if (!showAllDay && (e.allDay || !e.startTime)) return false;
                const st = getEventStatus(e);
                if (!statusFilters.has(st)) return false;
                return true;
              })
              .sort((a, b) => {
                if (a.allDay) return -1;
                if (b.allDay) return 1;
                return (a.startTime ?? "") > (b.startTime ?? "") ? 1 : -1;
              });

            if (!dayEvs.length && !showEmpty) return null;

            return (
              <div key={d} style={{ marginBottom: 32 }}>
                {/* Day header */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      background: isDay ? "var(--rally-brand)" : "var(--muted)",
                      color: isDay ? "#fff" : "var(--foreground)",
                    }}>
                      <span style={{ fontSize: 16, fontWeight: 700, lineHeight: 1 }}>{dayNum}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em",
                        color: isDay ? "var(--rally-brand)" : "var(--muted-foreground)", margin: 0 }}>
                        {dow}
                      </p>
                      <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>{month}</p>
                    </div>
                  </div>
                  <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                  {isDay && (
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 9999, flexShrink: 0,
                      background: "var(--rally-brand)", color: "#fff",
                    }}>Today</span>
                  )}
                </div>

                {/* Events */}
                {dayEvs.length === 0 ? (
                  <p style={{ fontSize: 12, color: "var(--muted-foreground)", paddingLeft: 52 }}>No events</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 52 }}>
                    {dayEvs.map(e => {
                      const color  = getColor(e.calendarId);
                      const inProg = isEventInProgress(e);
                      const status = getEventStatus(e);
                      const isMutedStatus = status === "attended" || status === "missed" || status === "declined";
                      return (
                        <div
                          key={e.id}
                          onClick={() => onEventClick(e)}
                          style={{
                            display: "flex", alignItems: "flex-start", gap: 12,
                            padding: "12px 14px", borderRadius: 12,
                            border: `1px solid ${selectedEventId === e.id ? color : "var(--border)"}`,
                            background: selectedEventId === e.id
                              ? "transparent" : "var(--card)",
                            boxShadow: selectedEventId === e.id
                              ? "0 2px 12px rgba(0,0,0,0.06)" : "0 1px 3px rgba(0,0,0,0.04)",
                            cursor: "pointer",
                            opacity: isMutedStatus ? 0.72 : 1,
                            transition: "border-color 0.12s, box-shadow 0.12s",
                            position: "relative",
                          }}
                          onMouseEnter={el => {
                            if (selectedEventId !== e.id) {
                              el.currentTarget.style.borderColor = `${color}55`;
                              el.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                            }
                          }}
                          onMouseLeave={el => {
                            if (selectedEventId !== e.id) {
                              el.currentTarget.style.borderColor = "var(--border)";
                              el.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                            }
                          }}
                        >
                          {/* Selected bg tint */}
                          {selectedEventId === e.id && (
                            <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: color, opacity: 0.06, pointerEvents: "none" }} />
                          )}

                          {/* Color bar */}
                          <div style={{
                            width: 3, alignSelf: "stretch", borderRadius: 9999, flexShrink: 0, marginTop: 2, minHeight: 20,
                            background: color,
                            opacity: isMutedStatus ? 0.5 : 1,
                          }} />

                          {/* Content */}
                          <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                              <p style={{
                                fontSize: 13, fontWeight: 500, color: "var(--foreground)",
                                overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
                                margin: 0,
                                textDecoration: (status === "missed" || status === "declined") ? "line-through" : "none",
                              }}>
                                {e.title}
                              </p>
                              {inProg && (
                                <span style={{
                                  display: "flex", alignItems: "center", gap: 4,
                                  fontSize: 10, fontWeight: 600,
                                  padding: "2px 6px", borderRadius: 9999, flexShrink: 0,
                                  background: color, color: "#fff",
                                }}>
                                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", display: "inline-block" }} />
                                  Now
                                </span>
                              )}
                              {status === "attended" && (
                                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                                  <circle cx="6" cy="6" r="5.5" stroke={color} strokeOpacity="0.5" />
                                  <path d="M3.5 6.5l2 2 3-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
                                </svg>
                              )}
                              {status === "missed" && (
                                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                                  <circle cx="6" cy="6" r="5.5" stroke="#9ca3af" strokeOpacity="0.6" />
                                  <path d="M4 4l4 4M8 4l-4 4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
                                </svg>
                              )}
                              {status === "declined" && (
                                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                                  <circle cx="6" cy="6" r="5.5" stroke={color} strokeOpacity="0.4" strokeDasharray="2 2" />
                                  <path d="M3 6h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
                                </svg>
                              )}
                            </div>
                            <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>
                              {e.allDay ? "All day" : formatTimeRange(e.startTime!, e.endTime!)}
                              {e.location && <span> · {e.location}</span>}
                            </p>
                            {e.links && e.links.length > 0 && (
                              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
                                {e.links.slice(0, 4).map((lk, i) => (
                                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    {linkIcon(lk.type)}
                                    <span style={{ fontSize: 10, color: "var(--muted-foreground)" }}>{lk.label}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Attendees */}
                          {e.attendees.length > 0 && (
                            <div style={{ display: "flex", flexShrink: 0, marginTop: 2 }}>
                              {e.attendees.slice(0, 4).map(a => <Av key={a} name={a} size={22} />)}
                              {e.attendees.length > 4 && (
                                <div style={{
                                  width: 22, height: 22, borderRadius: "50%",
                                  background: "var(--muted)", border: "2px solid var(--card)",
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  fontSize: 9, color: "var(--muted-foreground)",
                                }}>
                                  +{e.attendees.length - 4}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
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

// ── Month View ────────────────────────────────────────────────────────────────

function MonthView({
  year, month, events, lists, selectedEventId, onEventClick, onDayClick, onPrev, onNext,
}: {
  year: number; month: number; events: CalEvent[]; lists: CalList[];
  selectedEventId: string | null;
  onEventClick: (e: CalEvent) => void;
  onDayClick: (d: Date) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const visibleIds = new Set(lists.filter(l => l.visible).map(l => l.id));
  const getColor   = (id: string) => lists.find(l => l.id === id)?.color ?? "var(--text-tertiary)";
  const days       = getMiniCalDays(year, month);

  const sideArrow = (side: "left" | "right", onClick: () => void, label: string) => (
    <button
      onClick={onClick}
      title={label}
      style={{
        position: "absolute",
        [side]: 8,
        top: "50%", transform: "translateY(-50%)",
        zIndex: 10,
        width: 28, height: 28, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        cursor: "pointer",
        color: "var(--foreground)",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "var(--muted)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "var(--card)"; }}
    >
      {side === "left"
        ? <ChevronLeft style={{ width: 14, height: 14 }} />
        : <ChevronRight style={{ width: 14, height: 14 }} />
      }
    </button>
  );

  return (
    <div className="flex-1 overflow-y-auto flex flex-col" style={{ position: "relative" }}>
      {sideArrow("left",  onPrev, "Previous month")}
      {sideArrow("right", onNext, "Next month")}
      {/* Day-of-week header */}
      <div
        className="grid grid-cols-7 flex-shrink-0 border-b"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => (
          <div
            key={d}
            className="text-center py-2 text-[10px] uppercase tracking-wider"
            style={{
              color: "var(--muted-foreground)",
              fontWeight: 600,
              borderLeft: i > 0 ? "1px solid var(--border)" : "none",
              opacity: 0.7,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 grid grid-cols-7" style={{ gridAutoRows: "1fr", minHeight: 0 }}>
        {days.map((d, i) => {
          const ds        = dateToStr(d);
          const isThisMo  = d.getMonth() === month;
          const isTodayD  = ds === TODAY;
          const allEvs    = events.filter(e => e.date === ds && visibleIds.has(e.calendarId));
          const dayEvs    = allEvs.slice(0, 3);
          const moreCount = Math.max(0, allEvs.length - 3);
          const col       = i % 7;
          const row       = Math.floor(i / 7);
          const isWeekend = col >= 5;

          return (
            <div
              key={i}
              onClick={() => onDayClick(d)}
              className="relative flex flex-col p-1.5 cursor-pointer transition-colors group"
              style={{
                borderLeft: col > 0 ? "1px solid var(--border)" : "none",
                borderTop: row > 0 ? "1px solid var(--border)" : "none",
                background: isTodayD
                  ? "color-mix(in srgb, var(--rally-brand) 6%, var(--background))"
                  : isWeekend
                  ? "color-mix(in srgb, var(--muted) 40%, var(--background))"
                  : "var(--background)",
                minHeight: 90,
              }}
              onMouseEnter={e => { if (!isTodayD) e.currentTarget.style.background = "var(--muted)"; }}
              onMouseLeave={e => {
                if (!isTodayD) e.currentTarget.style.background = isWeekend
                  ? "color-mix(in srgb, var(--muted) 40%, var(--background))"
                  : "var(--background)";
              }}
            >
              {/* Date number */}
              <div
                className="w-6 h-6 flex items-center justify-center rounded-full text-[12px] mb-1 self-end"
                style={isTodayD
                  ? { background: "var(--rally-brand)", color: "#fff", fontWeight: 700 }
                  : { color: isThisMo ? "var(--foreground)" : "var(--muted-foreground)", fontWeight: isThisMo ? 500 : 400, opacity: isThisMo ? 1 : 0.35 }}
              >
                {d.getDate()}
              </div>

              {/* Event pills */}
              <div className="space-y-0.5 flex-1">
                {dayEvs.map(e => {
                  const color = getColor(e.calendarId);
                  return (
                    <div
                      key={e.id}
                      onClick={ev => { ev.stopPropagation(); onEventClick(e); }}
                      className="text-[10px] px-1.5 py-[2px] rounded-[4px] truncate leading-tight font-medium transition-all"
                      style={{
                        background: selectedEventId === e.id ? `${color}30` : `${color}1a`,
                        color,
                        border: `1px solid ${color}22`,
                        outline: selectedEventId === e.id ? `1.5px solid ${color}` : "none",
                      }}
                    >
                      {e.allDay ? null : (
                        <span className="opacity-70 mr-1">{formatTime(e.startTime!)}</span>
                      )}
                      {e.title}
                    </div>
                  );
                })}
                {moreCount > 0 && (
                  <p className="text-[10px] text-muted-foreground pl-1 font-medium">+{moreCount} more</p>
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
  const [showCal,     setShowCal]     = useState(false);
  const [editTitle,   setEditTitle]   = useState(event.title);
  const [editDesc,    setEditDesc]    = useState(event.description ?? "");

  const color = lists.find(l => l.id === event.calendarId)?.color ?? "var(--text-tertiary)";
  const list  = lists.find(l => l.id === event.calendarId);

  useEffect(() => {
    setEditTitle(event.title);
    setEditDesc(event.description ?? "");
  }, [event.id]);

  const calOptions = ["Google Calendar", "Apple Calendar", "Outlook", "Download .ics"];

  return (
    <aside className="h-full flex flex-col bg-card border-l border-border" style={{ width: 304, flexShrink: 0 }}>
      {/* Color strip */}
      <div className="h-1 flex-shrink-0" style={{ background: color }} />

      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)]">
        <span className="flex-1 text-[12px] font-medium text-muted-foreground">Event detail</span>
        <button onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground transition-colors">
          <X className="size-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
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

  // Calendars popover
  const [calPopoverOpen, setCalPopoverOpen] = useState(false);
  const [calPopoverRect, setCalPopoverRect] = useState<DOMRect | null>(null);
  const calBtnRef = useRef<HTMLButtonElement>(null);

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
  function goToPrevMonth() {
    setMiniMonth(m => { if (m === 0) { setMiniYear(y => y - 1); return 11; } return m - 1; });
  }
  function goToNextMonth() {
    setMiniMonth(m => { if (m === 11) { setMiniYear(y => y + 1); return 0; } return m + 1; });
  }
  function goToPrev() { if (view === "month") goToPrevMonth(); else goToPrevWeek(); }
  function goToNext() { if (view === "month") goToNextMonth(); else goToNextWeek(); }
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
        <div className="flex items-center gap-2 flex-nowrap overflow-x-auto">

          {/* Date nav */}
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <button onClick={goToPrev}
              className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground transition-colors">
              <ChevronLeft className="size-4" />
            </button>
            <button onClick={goToNext}
              className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground transition-colors">
              <ChevronRight className="size-4" />
            </button>
          </div>

          <span className="text-[14px] font-medium text-foreground flex-shrink-0">{headerTitle}</span>

          <button onClick={goToToday}
            className="h-7 px-3 rounded-[7px] border border-border bg-background text-[11px] text-foreground hover:bg-muted transition-colors flex-shrink-0">
            Today
          </button>

          <div className="flex-1 min-w-4" />

          {/* Search */}
          <div className="relative hidden sm:block flex-shrink-0">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search events…"
              className="pl-8 pr-3 h-8 w-36 rounded-[8px] border border-border bg-background text-[12px] text-foreground placeholder:text-muted-foreground outline-none focus:border-[var(--rally-brand)] transition-colors" />
          </div>

          {/* Calendars button + popover */}
          <div className="relative flex-shrink-0">
            <button
              ref={calBtnRef}
              onClick={() => {
                const rect = calBtnRef.current?.getBoundingClientRect() ?? null;
                setCalPopoverRect(rect);
                setCalPopoverOpen(v => !v);
              }}
              className={`flex items-center gap-1.5 h-8 px-3 rounded-[8px] border text-[12px] transition-colors flex-shrink-0 ${
                calPopoverOpen
                  ? "bg-[var(--rally-brand-soft)] border-[var(--rally-brand)] text-[var(--rally-brand-on)]"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              }`}>
              <CalendarIcon className="size-3.5" />
              Calendars
              <ChevronDown className={`size-3.5 transition-transform ${calPopoverOpen ? "rotate-180" : ""}`} />
            </button>
            {calPopoverOpen && calPopoverRect && (
              <CalendarPopover
                lists={lists} events={events}
                onListToggle={toggleList}
                weekStart={weekStart}
                selectedDate={dateToStr(weekStart)}
                onDateClick={d => { handleDateClick(d); setCalPopoverOpen(false); }}
                miniCalYear={miniYear} miniCalMonth={miniMonth}
                onMiniCalMonthChange={handleMiniCalMonth}
                anchorRect={calPopoverRect}
                onClose={() => setCalPopoverOpen(false)}
              />
            )}
          </div>

          {/* View switcher — segmented */}
          <div className="inline-flex items-center p-0.5 rounded-[8px] flex-shrink-0" style={{ background: "var(--muted)" }}>
            {viewButtons.map(v => (
              <button key={v.id} onClick={() => setView(v.id)}
                className="px-3 h-7 text-[12px] rounded-[6px] transition-colors whitespace-nowrap"
                style={{
                  background: view === v.id ? "var(--card)" : "transparent",
                  color: view === v.id ? "var(--foreground)" : "var(--muted-foreground)",
                  fontWeight: view === v.id ? 500 : 400,
                  boxShadow: view === v.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                }}>
                {v.label}
              </button>
            ))}
          </div>

          {/* New Event */}
          {canEdit && (
            <button onClick={() => { setNewInit({}); setNewOpen(true); }}
              className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] text-white text-[12px] font-medium flex-shrink-0"
              style={{ background: "var(--rally-brand)" }}>
              <Plus className="size-3.5" /> New Event
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden flex">

        {/* Main view */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {view === "week" && (
            <WeekView
              weekStart={weekStart} events={filteredEvents} lists={lists}
              selectedEventId={selected?.id ?? null}
              onEventClick={setSelected}
              onSlotClick={handleSlotClick}
              onPrev={goToPrevWeek}
              onNext={goToNextWeek}
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
              onPrev={goToPrevMonth}
              onNext={goToNextMonth}
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

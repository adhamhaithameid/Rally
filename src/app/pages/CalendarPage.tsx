import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { useAuth } from "../contexts/AuthContext";
import {
  Calendar as CalendarIcon,
  Plus,
  Edit2,
  Trash2,
  Clock,
  Repeat,
  ChevronLeft,
  ChevronRight,
  List,
  Grid,
  MoreVertical,
  X,
} from "lucide-react";

interface Calendar {
  id: string;
  name: string;
  color: string;
  teamId: string;
  createdBy: string;
}

interface CalendarEvent {
  id: string;
  calendarId: string;
  title: string;
  description: string;
  start: string;
  end: string;
  allDay: boolean;
  timezone: string;
  rule?: string;
  createdBy: string;
}

const CALENDAR_COLORS = [
  { name: "Blue",   value: "#3B82F6" },
  { name: "Green",  value: "#10B981" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Red",    value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Pink",   value: "#EC4899" },
  { name: "Teal",   value: "#14B8A6" },
  { name: "Yellow", value: "#F59E0B" },
];

const mockCalendars: Calendar[] = [
  { id: "cal-1", name: "General",  color: "#3B82F6", teamId: "team-1", createdBy: "user-1" },
  { id: "cal-2", name: "Meetings", color: "#8B5CF6", teamId: "team-1", createdBy: "user-1" },
  { id: "cal-3", name: "Deadlines",color: "#EF4444", teamId: "team-1", createdBy: "user-1" },
];

const mockEvents: CalendarEvent[] = [
  {
    id: "event-1",
    calendarId: "cal-1",
    title: "Team Standup",
    description: "Daily standup meeting",
    start: "2026-04-04T10:00:00",
    end: "2026-04-04T10:30:00",
    allDay: false,
    timezone: "America/New_York",
    rule: "FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR",
    createdBy: "user-1",
  },
  {
    id: "event-2",
    calendarId: "cal-2",
    title: "Client Presentation",
    description: "Q1 Review with client",
    start: "2026-04-06T14:00:00",
    end: "2026-04-06T15:30:00",
    allDay: false,
    timezone: "America/New_York",
    createdBy: "user-2",
  },
  {
    id: "event-3",
    calendarId: "cal-3",
    title: "Project Deadline",
    description: "Website redesign final delivery",
    start: "2026-04-07T00:00:00",
    end: "2026-04-07T23:59:59",
    allDay: true,
    timezone: "America/New_York",
    createdBy: "user-1",
  },
  {
    id: "event-4",
    calendarId: "cal-2",
    title: "Sprint Review",
    description: "End of sprint review and retrospective",
    start: "2026-04-09T15:00:00",
    end: "2026-04-09T16:30:00",
    allDay: false,
    timezone: "America/New_York",
    createdBy: "user-1",
  },
];

export function CalendarPage() {
  const { user, userRole, hasPermission } = useAuth();
  const [calendars, setCalendars] = useState<Calendar[]>(mockCalendars);
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>(mockCalendars.map((c) => c.id));
  const [view, setView] = useState<"list" | "month">("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  // Calendar form
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);
  const [editingCalendar, setEditingCalendar] = useState<Calendar | null>(null);
  const [calendarName, setCalendarName] = useState("");
  const [calendarColor, setCalendarColor] = useState(CALENDAR_COLORS[0].value);

  // Event form
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [eventAllDay, setEventAllDay] = useState(false);
  const [eventTimezone, setEventTimezone] = useState("America/New_York");
  const [eventRule, setEventRule] = useState("");
  const [eventCalendar, setEventCalendar] = useState(mockCalendars[0]?.id || "");

  // Day detail popover
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[]>([]);
  const [selectedDayLabel, setSelectedDayLabel] = useState("");
  const [dayPopoverOpen, setDayPopoverOpen] = useState(false);

  const canManageCalendars = hasPermission("manage_calendars") || hasPermission("*");

  // ── Calendar grid helpers ─────────────────────────────────────────────────
  const getDaysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1).getDay();

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const prevMonthDays = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrentMonth: false, date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthDays - i) });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true, date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i) });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, isCurrentMonth: false, date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i) });
    }
    return days;
  };

  const filteredEvents = events.filter((e) => selectedCalendars.includes(e.calendarId));

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return filteredEvents.filter((e) => new Date(e.start).toISOString().split("T")[0] === dateStr);
  };

  const isToday = (date: Date) => date.toDateString() === new Date().toDateString();

  const getCalendarColor = (calendarId: string) =>
    calendars.find((c) => c.id === calendarId)?.color || "#3B82F6";

  const formatTime = (ds: string) =>
    new Date(ds).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  const formatDate = (ds: string) =>
    new Date(ds).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const formatMonthDay = (date: Date) =>
    date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  // ── Calendar CRUD ─────────────────────────────────────────────────────────
  const handleCreateCalendar = () => {
    if (!canManageCalendars) return;
    const nc: Calendar = {
      id: `cal-${Date.now()}`,
      name: calendarName,
      color: calendarColor,
      teamId: "team-1",
      createdBy: user?.id || "user-1",
    };
    setCalendars([...calendars, nc]);
    setSelectedCalendars([...selectedCalendars, nc.id]);
    setCalendarDialogOpen(false);
    resetCalendarForm();
  };

  const handleUpdateCalendar = () => {
    if (!canManageCalendars || !editingCalendar) return;
    setCalendars(calendars.map((c) => c.id === editingCalendar.id ? { ...c, name: calendarName, color: calendarColor } : c));
    setCalendarDialogOpen(false);
    resetCalendarForm();
  };

  const handleDeleteCalendar = (calendarId: string) => {
    if (!canManageCalendars) return;
    if (confirm("Delete this calendar and all its events?")) {
      setCalendars(calendars.filter((c) => c.id !== calendarId));
      setEvents(events.filter((e) => e.calendarId !== calendarId));
      setSelectedCalendars(selectedCalendars.filter((id) => id !== calendarId));
    }
  };

  const openEditCalendar = (calendar: Calendar) => {
    setEditingCalendar(calendar);
    setCalendarName(calendar.name);
    setCalendarColor(calendar.color);
    setCalendarDialogOpen(true);
  };

  const resetCalendarForm = () => {
    setEditingCalendar(null);
    setCalendarName("");
    setCalendarColor(CALENDAR_COLORS[0].value);
  };

  // ── Event CRUD ────────────────────────────────────────────────────────────
  const handleCreateEvent = () => {
    if (!canManageCalendars) return;
    const ne: CalendarEvent = {
      id: `event-${Date.now()}`,
      calendarId: eventCalendar,
      title: eventTitle,
      description: eventDescription,
      start: eventStart,
      end: eventEnd,
      allDay: eventAllDay,
      timezone: eventTimezone,
      rule: eventRule || undefined,
      createdBy: user?.id || "user-1",
    };
    setEvents([...events, ne]);
    setEventDialogOpen(false);
    resetEventForm();
  };

  const handleUpdateEvent = () => {
    if (!canManageCalendars || !editingEvent) return;
    setEvents(events.map((e) =>
      e.id === editingEvent.id
        ? { ...e, calendarId: eventCalendar, title: eventTitle, description: eventDescription, start: eventStart, end: eventEnd, allDay: eventAllDay, timezone: eventTimezone, rule: eventRule || undefined }
        : e
    ));
    setEventDialogOpen(false);
    resetEventForm();
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm("Delete this event?")) {
      setEvents(events.filter((e) => e.id !== eventId));
    }
  };

  const openEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setEventTitle(event.title);
    setEventDescription(event.description);
    setEventStart(event.start);
    setEventEnd(event.end);
    setEventAllDay(event.allDay);
    setEventTimezone(event.timezone);
    setEventRule(event.rule || "");
    setEventCalendar(event.calendarId);
    setEventDialogOpen(true);
    setDayPopoverOpen(false);
  };

  const resetEventForm = () => {
    setEditingEvent(null);
    setEventTitle("");
    setEventDescription("");
    setEventStart("");
    setEventEnd("");
    setEventAllDay(false);
    setEventTimezone("America/New_York");
    setEventRule("");
    setEventCalendar(calendars[0]?.id || "");
  };

  const toggleCalendar = (id: string) =>
    setSelectedCalendars((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  const handleDayClick = (date: Date, dayEvents: CalendarEvent[]) => {
    if (dayEvents.length === 0) return;
    setSelectedDayEvents(dayEvents);
    setSelectedDayLabel(formatMonthDay(date));
    setDayPopoverOpen(true);
  };

  const handleNewEventOnDay = (date: Date) => {
    resetEventForm();
    const iso = date.toISOString().split("T")[0];
    setEventStart(`${iso}T09:00`);
    setEventEnd(`${iso}T10:00`);
    setEventDialogOpen(true);
  };

  // ── List-view render helper ───────────────────────────────────────────────
  function renderListView() {
    const sorted = [...filteredEvents].sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );

    if (sorted.length === 0) {
      return (
        <div className="text-center py-16">
          <CalendarIcon className="size-12 text-muted-foreground mx-auto mb-4 opacity-30" />
          <p className="text-muted-foreground mb-4">No events scheduled</p>
          {canManageCalendars && calendars.length > 0 && (
            <Button onClick={() => { resetEventForm(); setEventDialogOpen(true); }}>
              <Plus className="size-4 mr-2" /> Create First Event
            </Button>
          )}
        </div>
      );
    }

    // Group by date
    const groups: Record<string, CalendarEvent[]> = {};
    for (const ev of sorted) {
      const key = new Date(ev.start).toISOString().split("T")[0];
      if (!groups[key]) groups[key] = [];
      groups[key].push(ev);
    }

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const dateLabel = (key: string) => {
      const d = new Date(key + "T00:00:00");
      if (d.toDateString() === today.toDateString()) return "Today";
      if (d.toDateString() === tomorrow.toDateString()) return "Tomorrow";
      return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    };

    return (
      <div className="space-y-6">
        {Object.entries(groups).map(([dateKey, dateEvents]) => (
          <div key={dateKey}>
            {/* Date section header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-semibold text-foreground">{dateLabel(dateKey)}</span>
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">
                {new Date(dateKey + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>

            <div className="space-y-2">
              {dateEvents.map((event) => {
                const calendar = calendars.find((c) => c.id === event.calendarId);
                return (
                  <div
                    key={event.id}
                    className="flex items-stretch rounded-xl border border-border overflow-hidden hover:bg-muted/30 transition-colors group/event"
                  >
                    {/* Left color bar */}
                    <div className="w-1 flex-shrink-0" style={{ backgroundColor: calendar?.color }} />

                    <div className="flex flex-1 items-center gap-4 px-4 py-3 min-w-0">
                      {/* Time */}
                      <div className="flex-shrink-0 w-20 text-right">
                        {event.allDay ? (
                          <span className="text-xs text-muted-foreground">All day</span>
                        ) : (
                          <div>
                            <p className="text-sm font-medium text-foreground">{formatTime(event.start)}</p>
                            <p className="text-xs text-muted-foreground">{formatTime(event.end)}</p>
                          </div>
                        )}
                      </div>

                      {/* Dot */}
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: calendar?.color }} />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
                        {event.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{event.description}</p>
                        )}
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {calendar && (
                            <Badge className="text-xs text-white border-0" style={{ backgroundColor: calendar.color }}>
                              {calendar.name}
                            </Badge>
                          )}
                          {event.rule && (
                            <Badge variant="outline" className="text-xs gap-1">
                              <Repeat className="size-3" /> Recurring
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      {canManageCalendars && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground opacity-0 group-hover/event:opacity-100 transition-opacity flex-shrink-0">
                              <MoreVertical className="size-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditEvent(event)}>
                              <Edit2 className="size-3.5 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteEvent(event.id)}>
                              <Trash2 className="size-3.5 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ── Viewer mode ────────────────────────────────────────────────────────────
  if (userRole === "viewer") {
    return (
      <div className="min-h-full bg-background p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-foreground mb-1">Calendar</h1>
            <p className="text-muted-foreground">View team events and schedules (read-only)</p>
          </div>
          <Card>
            <CardHeader><CardTitle>Upcoming Events</CardTitle></CardHeader>
            <CardContent>
              {filteredEvents.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No events scheduled</p>
              ) : (
                <div className="space-y-3">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="p-3 border border-border rounded-xl">
                      <h3 className="font-medium text-foreground">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(event.start)} • {formatTime(event.start)} – {formatTime(event.end)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-foreground mb-1">Calendar</h1>
          <p className="text-muted-foreground text-sm">Manage team events and schedules</p>
        </div>

        {/* Calendar Tabs */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCalendars(calendars.map((c) => c.id))}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium flex-shrink-0 transition-colors border ${
              selectedCalendars.length === calendars.length
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-foreground border-border hover:bg-muted"
            }`}
          >
            <CalendarIcon className="size-3.5" />
            All
          </button>
          {calendars.map((calendar) => {
            const isOnlySelected = selectedCalendars.length === 1 && selectedCalendars[0] === calendar.id;
            return (
              <div key={calendar.id} className="flex items-center gap-0 flex-shrink-0 group/cal">
                <button
                  onClick={() => setSelectedCalendars([calendar.id])}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border ${
                    isOnlySelected ? "text-white border-transparent" : "bg-card text-foreground border-border hover:bg-muted"
                  } ${canManageCalendars ? "rounded-xl rounded-r-none border-r-0" : "rounded-xl"}`}
                  style={isOnlySelected ? { backgroundColor: calendar.color, borderColor: calendar.color } : {}}
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: isOnlySelected ? "currentColor" : calendar.color }} />
                  {calendar.name}
                </button>
                {canManageCalendars && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`p-2 rounded-xl rounded-l-none border border-l-0 transition-colors opacity-0 group-hover/cal:opacity-100 ${
                          isOnlySelected
                            ? "text-white/80 hover:text-white border-transparent"
                            : "text-muted-foreground hover:text-foreground border-border bg-card hover:bg-muted"
                        }`}
                        style={isOnlySelected ? { backgroundColor: calendar.color } : {}}
                      >
                        <MoreVertical className="size-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditCalendar(calendar)}>
                        <Edit2 className="size-3.5 mr-2" /> Edit Calendar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCalendar(calendar.id)}>
                        <Trash2 className="size-3.5 mr-2" /> Delete Calendar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            );
          })}
          {canManageCalendars && (
            <button
              onClick={() => { resetCalendarForm(); setCalendarDialogOpen(true); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium flex-shrink-0 transition-colors border border-dashed border-border text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Plus className="size-3.5" />New Calendar
            </button>
          )}
        </div>

        {/* Main Calendar Area */}
        <div>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    {/* View toggle */}
                    <div className="flex items-center border border-border rounded-lg p-0.5 bg-muted">
                      <button
                        onClick={() => setView("month")}
                        className={`p-1.5 rounded-md transition-colors ${
                          view === "month" ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                        title="Month view"
                      >
                        <Grid className="size-4" />
                      </button>
                      <button
                        onClick={() => setView("list")}
                        className={`p-1.5 rounded-md transition-colors ${
                          view === "list" ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                        title="List view"
                      >
                        <List className="size-4" />
                      </button>
                    </div>

                    {view === "month" && (
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
                          <ChevronLeft className="size-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                          Today
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
                          <ChevronRight className="size-4" />
                        </Button>
                        <h3 className="text-base font-semibold text-foreground ml-1">
                          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        </h3>
                      </div>
                    )}
                  </div>

                  {canManageCalendars && calendars.length > 0 && (
                    <Button
                      size="sm"
                      onClick={() => { resetEventForm(); setEventDialogOpen(true); }}
                    >
                      <Plus className="size-4 mr-1.5" />
                      Add Event
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* ── Month grid ────────────────────────────────────────── */}
                {view === "month" && (
                  <div className="overflow-hidden rounded-xl border border-border">
                    {/* Day headers */}
                    <div className="grid grid-cols-7 bg-muted/50 border-b border-border">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                        <div
                          key={day}
                          className={`py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider ${
                            i === 0 || i === 6 ? "text-muted-foreground/50" : "text-muted-foreground"
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Days grid */}
                    <div className="grid grid-cols-7">
                      {generateCalendarDays().map((dayInfo, index) => {
                        const col = index % 7;
                        const isWeekend = col === 0 || col === 6;
                        const dayEvents = getEventsForDate(dayInfo.date);
                        const isTodayDate = isToday(dayInfo.date);
                        const isLastRow = index >= 35;

                        return (
                          <div
                            key={index}
                            className={[
                              "min-h-[110px] border-b border-r border-border p-1.5 cursor-pointer transition-colors group/day relative",
                              col === 6 ? "border-r-0" : "",
                              isLastRow ? "border-b-0" : "",
                              isTodayDate
                                ? "bg-blue-50/60 dark:bg-blue-950/20"
                                : dayInfo.isCurrentMonth
                                ? isWeekend ? "bg-muted/20 hover:bg-muted/40" : "bg-card hover:bg-muted/30"
                                : "bg-muted/10 hover:bg-muted/30",
                            ].join(" ")}
                            onClick={() => {
                              if (dayEvents.length > 0) handleDayClick(dayInfo.date, dayEvents);
                              else if (canManageCalendars) handleNewEventOnDay(dayInfo.date);
                            }}
                          >
                            {/* Day number */}
                            <div className={`text-xs font-semibold w-7 h-7 flex items-center justify-center rounded-full mb-1 transition-colors ${
                              isTodayDate
                                ? "bg-blue-600 text-white"
                                : dayInfo.isCurrentMonth
                                ? "text-foreground group-hover/day:bg-muted"
                                : "text-muted-foreground/40"
                            }`}>
                              {dayInfo.day}
                            </div>

                            {/* Events */}
                            <div className="space-y-0.5">
                              {dayEvents.slice(0, 3).map((event) => (
                                <div
                                  key={event.id}
                                  onClick={(e) => { e.stopPropagation(); openEditEvent(event); }}
                                  className="w-full text-left text-[11px] px-1.5 py-0.5 rounded-md truncate cursor-pointer transition-opacity hover:opacity-80 leading-[1.6]"
                                  style={{ backgroundColor: getCalendarColor(event.calendarId) + "22", color: getCalendarColor(event.calendarId), borderLeft: `2px solid ${getCalendarColor(event.calendarId)}` }}
                                >
                                  {!event.allDay && (
                                    <span className="opacity-70 mr-1">{formatTime(event.start)}</span>
                                  )}
                                  {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 3 && (
                                <div className="text-[10px] text-muted-foreground px-1 py-0.5">
                                  +{dayEvents.length - 3} more
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── List view ─────────────────────────────────────────── */}
                {view === "list" && renderListView()}
              </CardContent>
            </Card>
          </div>
      </div>

      {/* ── Day Events Popover ─────────────────────────────────────────────── */}
      <Dialog open={dayPopoverOpen} onOpenChange={setDayPopoverOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedDayLabel}</DialogTitle>
            <DialogDescription>{selectedDayEvents.length} event{selectedDayEvents.length !== 1 ? "s" : ""}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 mt-2">
            {selectedDayEvents.map((event) => {
              const cal = calendars.find((c) => c.id === event.calendarId);
              return (
                <div key={event.id} className="flex items-start gap-3 p-3 border border-border rounded-xl">
                  <div className="w-1 self-stretch rounded-full" style={{ backgroundColor: cal?.color }} />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.allDay ? "All day" : `${formatTime(event.start)} – ${formatTime(event.end)}`}
                    </p>
                  </div>
                  {canManageCalendars && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEditEvent(event)}
                        className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Edit2 className="size-3.5" />
                      </button>
                      <button
                        onClick={() => { handleDeleteEvent(event.id); setSelectedDayEvents((p) => p.filter((e) => e.id !== event.id)); }}
                        className="p-1 rounded hover:bg-muted text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {canManageCalendars && (
            <Button className="w-full mt-2" variant="outline" onClick={() => { setDayPopoverOpen(false); setEventDialogOpen(true); }}>
              <Plus className="size-4 mr-2" /> Add Event
            </Button>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Calendar Form Dialog ───────────────────────────────────────────── */}
      <Dialog open={calendarDialogOpen} onOpenChange={setCalendarDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCalendar ? "Edit Calendar" : "Create Calendar"}</DialogTitle>
            <DialogDescription>
              {editingCalendar ? "Update calendar details" : "Add a new calendar"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="cal-name">Name</Label>
              <Input
                id="cal-name"
                value={calendarName}
                onChange={(e) => setCalendarName(e.target.value)}
                placeholder="e.g., Meetings, Personal"
              />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2">
                {CALENDAR_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setCalendarColor(color.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all flex-shrink-0 ${
                      calendarColor === color.value ? "border-foreground scale-110" : "border-transparent hover:border-muted-foreground"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            <Button onClick={editingCalendar ? handleUpdateCalendar : handleCreateCalendar} className="w-full" disabled={!calendarName}>
              {editingCalendar ? "Update Calendar" : "Create Calendar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Event Form Dialog ──────────────────────────────────────────────── */}
      <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Edit Event" : "Create Event"}</DialogTitle>
            <DialogDescription>
              {editingEvent ? "Update event details" : "Add a new event to your calendar"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="event-title">Title</Label>
              <Input id="event-title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="Event title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-desc">Description</Label>
              <Textarea id="event-desc" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="Event details…" rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-cal">Calendar</Label>
              <Select value={eventCalendar} onValueChange={setEventCalendar}>
                <SelectTrigger id="event-cal"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {calendars.map((cal) => (
                    <SelectItem key={cal.id} value={cal.id}>
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cal.color }} />
                        {cal.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="event-allday" checked={eventAllDay} onCheckedChange={setEventAllDay} />
              <Label htmlFor="event-allday">All day event</Label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-start">Start</Label>
                <Input id="event-start" type={eventAllDay ? "date" : "datetime-local"} value={eventStart} onChange={(e) => setEventStart(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-end">End</Label>
                <Input id="event-end" type={eventAllDay ? "date" : "datetime-local"} value={eventEnd} onChange={(e) => setEventEnd(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-tz">Timezone</Label>
              <Select value={eventTimezone} onValueChange={setEventTimezone}>
                <SelectTrigger id="event-tz"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-rule">Recurrence (optional)</Label>
              <Input id="event-rule" value={eventRule} onChange={(e) => setEventRule(e.target.value)} placeholder="e.g., FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR" />
              <p className="text-xs text-muted-foreground">iCalendar RRULE format</p>
            </div>
            <Button
              onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
              className="w-full"
              disabled={!eventTitle || !eventStart || !eventEnd || !eventCalendar}
            >
              {editingEvent ? "Update Event" : "Create Event"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
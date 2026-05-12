import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import {
  Search, Bell, Plus, ChevronDown, Sparkles, CheckCircle2,
  Clock, AlertCircle, PauseCircle, Users, Mic, FileText,
  MessageSquare, Hash, Play, Calendar, ArrowRight, MoreHorizontal,
  X, Shield, FolderOpen, Bot, Zap, Upload, Video, CheckSquare,
  Circle, ChevronRight, AlertTriangle, HardDrive, UserPlus,
  Activity, Headphones, Volume2, SquarePen, RefreshCw, Eye,
  ServerCrash, Lock, WifiOff, LayoutGrid, GripVertical, Trash2, Share2
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import svgPaths from "../../imports/svg-gyowvurp60";
import headerSvg from "../../imports/Header-1/svg-ozdcmjc97h";
import { getGreeting } from "../utils/greetings";

// ── Helpers ──────────────────────────────────────────────────────────────────

function Avatar({
  name, size = 32, color
}: { name: string; size?: number; color?: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const colors = ["#3B82F6","#10B981","#F59E0B","#8B5CF6","#EC4899","#14B8A6","#F97316","#0f5fd7"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const bg = color ?? colors[Math.abs(hash) % colors.length];
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0 text-white"
      style={{ width: size, height: size, background: bg, fontSize: size * 0.35, fontWeight: 600 }}
    >
      {initials}
    </div>
  );
}

function Badge({ label, variant }: { label: string; variant: "brand"|"success"|"warning"|"error"|"info"|"neutral" }) {
  const styles = {
    brand:   { bg: "var(--rally-brand-soft)", color: "var(--rally-brand-on)" },
    success: { bg: "var(--success-soft)",     color: "var(--success-on)"     },
    warning: { bg: "var(--warning-soft)",     color: "var(--warning-on)"     },
    error:   { bg: "var(--error-soft)",       color: "var(--error-on)"       },
    info:    { bg: "var(--info-soft)",        color: "var(--info-on)"        },
    neutral: { bg: "var(--neutral-soft)",     color: "var(--neutral-on)"     },
  }[variant];
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium flex-shrink-0"
      style={{ background: styles.bg, color: styles.color }}>
      {label}
    </span>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card rounded-[14px] overflow-hidden h-full ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ title, icon: Icon, action, iconColor }: {
  title: string; icon?: React.ElementType; action?: React.ReactNode; iconColor?: string;
}) {
  return (
    <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-[var(--border-subtle)]">
      {Icon && <Icon className="size-4 flex-shrink-0" style={{ color: iconColor ?? "var(--text-muted)" }} />}
      <span className="text-[14px] font-medium text-foreground flex-1">{title}</span>
      {action}
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const tasks = [
  { id: 1, title: "Update landing page copy", status: "overdue", assignee: "John Doe", priority: "high", ago: "2 days overdue" },
  { id: 2, title: "Review Figma prototype", status: "today", assignee: "John Doe", priority: "high", ago: "Due today" },
  { id: 3, title: "Send weekly report to stakeholders", status: "today", assignee: "John Doe", priority: "medium", ago: "Due today" },
  { id: 4, title: "API integration spec", status: "inprogress", assignee: "John Doe", priority: "medium", ago: "Started 2h ago" },
  { id: 5, title: "Mobile layout approval", status: "blocked", assignee: "Emily Davis", priority: "high", ago: "Waiting on Emily" },
];

const events = [
  { id: 1, title: "Design standup", time: "10:00 AM", duration: "30m", status: "done", attendees: ["Sarah J", "Mike C", "Emily D"] },
  { id: 2, title: "Client review", time: "2:00 PM", duration: "1h", status: "next", attendees: ["Sarah J", "Alex T", "John D"] },
  { id: 3, title: "Team retrospective", time: "4:30 PM", duration: "1h", status: "upcoming", attendees: ["Sarah J", "Mike C", "Emily D", "Alex T"] },
];

const mentions = [
  { id: 1, user: "Sarah Johnson", type: "mention", channel: "#design", text: "@John can you review the new header design? I added some notes.", time: "12 min ago", unread: true },
  { id: 2, user: "Mike Chen", type: "dm", channel: "DM", text: "Hey, just pushed the changes to the staging branch. Looks good!", time: "1h ago", unread: true },
  { id: 3, user: "Emily Davis", type: "mention", channel: "#general", text: "@John the API documentation is ready for your review.", time: "2h ago", unread: false },
];

const recentFiles = [
  { id: 1, name: "Website Redesign Deck.fig", type: "figma", updatedBy: "Sarah Johnson", time: "2h ago", size: "8.4 MB" },
  { id: 2, name: "Q2 Launch Brief.pdf", type: "pdf", updatedBy: "Mike Chen", time: "Yesterday", size: "1.2 MB" },
  { id: 3, name: "Brand Guidelines.pdf", type: "pdf", updatedBy: "You", time: "3h ago", size: "5.7 MB" },
  { id: 4, name: "Design Tokens.json", type: "json", updatedBy: "Emily Davis", time: "4h ago", size: "24 KB" },
];

const voiceRooms = [
  { id: 1, name: "Design Voice", members: ["Sarah Johnson", "Mike Chen", "Emily Davis"], active: true },
  { id: 2, name: "Lounge", members: ["Alex Turner"], active: true },
];

const onlineMembers = [
  { name: "Sarah Johnson", status: "active", activity: "In Design Voice" },
  { name: "Mike Chen", status: "active", activity: "Browsing files" },
  { name: "Emily Davis", status: "active", activity: "In Design Voice" },
  { name: "Alex Turner", status: "idle", activity: "In Lounge" },
  { name: "Tom Blake", status: "dnd", activity: "Do not disturb" },
];

const aiSuggestions = [
  { id: 1, label: "Summarize what changed since yesterday" },
  { id: 2, label: "Turn today's meeting into tasks" },
  { id: 3, label: "Draft my plan for today" },
  { id: 4, label: "Find the latest file from Sarah" },
];

const quickActions = [
  { id: 1, label: "Create Task",  icon: CheckSquare,   color: "var(--info-on)",        bg: "var(--info-soft)",        path: "/app/todo"      },
  { id: 2, label: "Upload File",  icon: Upload,        color: "var(--success-on)",     bg: "var(--success-soft)",     path: "/app/files"     },
  { id: 3, label: "New Event",    icon: Calendar,      color: "var(--warning-on)",     bg: "var(--warning-soft)",     path: "/app/calendar"  },
  { id: 4, label: "Open AI",      icon: Bot,           color: "var(--rally-brand-on)", bg: "var(--rally-brand-soft)", path: "/app/ai-chat"   },
  { id: 5, label: "Start Chat",   icon: MessageSquare, color: "var(--neutral-on)",     bg: "var(--neutral-soft)",     path: "/app/chat"      },
  { id: 6, label: "Join Voice",   icon: Video,         color: "var(--info-on)",        bg: "var(--info-soft)"                                },
];

const fileIconColor: Record<string, string> = {
  figma: "var(--neutral-on)",
  pdf:   "var(--error-solid)",
  json:  "var(--success-on)",
};

// ── Subcomponents ─────────────────────────────────────────────────────────────

function TaskStatusIcon({ status }: { status: string }) {
  if (status === "overdue")    return <AlertCircle className="size-4 flex-shrink-0" style={{ color: "var(--error-solid)"  }} />;
  if (status === "today")      return <Clock       className="size-4 flex-shrink-0" style={{ color: "var(--warning-on)"  }} />;
  if (status === "inprogress") return <RefreshCw   className="size-4 flex-shrink-0" style={{ color: "var(--info-on)"     }} />;
  if (status === "blocked")    return <PauseCircle className="size-4 flex-shrink-0" style={{ color: "var(--neutral-on)"  }} />;
  return <Circle className="size-4 flex-shrink-0 text-muted-foreground" />;
}

function TaskStatusBadge({ status }: { status: string }) {
  if (status === "overdue") return <Badge label="Overdue" variant="error" />;
  if (status === "today") return <Badge label="Due today" variant="warning" />;
  if (status === "inprogress") return <Badge label="In progress" variant="info" />;
  if (status === "blocked") return <Badge label="Blocked" variant="neutral" />;
  return null;
}

// ── Top Navbar (Figma-matched) ─────────────────────────────────────────────────

function TopNav({
  notifActive,
  onNotifToggle,
}: {
  notifActive:    boolean;
  onNotifToggle:  () => void;
}) {
  const { user, currentTeam } = useAuth();
  const [teamOpen,      setTeamOpen]      = useState(false);
  const [newOpen,       setNewOpen]       = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const teamRef = useRef<HTMLDivElement>(null);
  const newRef  = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (teamRef.current && !teamRef.current.contains(e.target as Node)) setTeamOpen(false);
      if (newRef.current  && !newRef.current.contains(e.target as Node))  setNewOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const teams       = user?.teams ?? [];
  const unreadCount = 3;

  return (
    /* Root — mirrors Figma's Header div:
       bg-[#2c2c2c] border-b border-l border-r border-[#4a403c]
       rounded-bl-[20px] rounded-br-[20px] relative size-full */
    <div
      className="flex-shrink-0 relative w-full"
      style={{
        height: 73,
        background: "#2c2c2c",
        borderBottom: "1px solid #4a403c",
        borderLeft:   "1px solid #4a403c",
        borderRight:  "1px solid #4a403c",
        borderBottomLeftRadius:  20,
        borderBottomRightRadius: 20,
      }}>

      {/* ── Button (workspace) ── absolute left-[19px] top-[12px] h-[49px] w-[170.18px] */}
      <div ref={teamRef} className="absolute" style={{ left: 19, top: 12 }}>
        <button
          onClick={() => setTeamOpen(o => !o)}
          className="relative flex items-center gap-[10px] transition-opacity hover:opacity-80 active:opacity-60"
          style={{
            background: "#232323",
            border: "1px solid #4a403c",
            borderRadius: 10,
            height: 49,
            width: 170,
            padding: "9px 13px",
          }}>
          {/* R icon — bg-[#ff4615] rounded-[6px] size-[24px] */}
          <div className="flex-shrink-0 flex items-center justify-center"
            style={{ width: 24, height: 24, background: "#ff4615", borderRadius: 6 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <g clipPath="url(#tnR)">
                <path d={headerSvg.pca582c0} fill="white" />
              </g>
              <defs><clipPath id="tnR"><rect width="14" height="14" fill="white" /></clipPath></defs>
            </svg>
          </div>
          {/* Team name + project */}
          <div className="flex flex-col gap-[2px] flex-1 min-w-0">
            <span style={{ color: "#fff2ed", fontSize: 14, fontWeight: 500, lineHeight: "14px", display: "block" }}
              className="whitespace-nowrap truncate">
              {currentTeam?.name ?? "Design Team"}
            </span>
            <span style={{ color: "#c7b8b2", fontSize: 10, fontWeight: 500, lineHeight: "15px", display: "block" }}
              className="whitespace-nowrap truncate">
              {currentTeam?.projectName ?? "Website Redesign"}
            </span>
          </div>
          {/* Chevron */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
            <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#c7b8b2"
              strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Team dropdown */}
        {teamOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 rounded-[12px] shadow-2xl z-50 py-1.5 overflow-hidden"
            style={{ background: "#232323", border: "1px solid #4a403c" }}>
            <p className="text-[10px] font-medium uppercase tracking-widest px-3 py-2"
              style={{ color: "#c7b8b2" }}>Your teams</p>
            {teams.map(t => (
              <button key={t.teamId}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-white/5"
                onClick={() => setTeamOpen(false)}>
                <div className="w-7 h-7 rounded-[6px] flex items-center justify-center text-white text-[11px] font-medium flex-shrink-0"
                  style={{ background: "#ff4615" }}>{t.teamName.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <p style={{ color: "#fff2ed", fontSize: 14 }} className="truncate">{t.teamName}</p>
                  <p style={{ color: "#c7b8b2", fontSize: 11 }} className="truncate">{t.projectName}</p>
                </div>
              </button>
            ))}
            <div style={{ borderTop: "1px solid #4a403c", marginTop: 4, paddingTop: 4 }}>
              <button className="w-full flex items-center gap-2 px-3 py-2 transition-colors hover:bg-white/5"
                style={{ color: "#c7b8b2", fontSize: 14, fontWeight: 500 }}>
                <Plus className="size-4" /> Create or join team
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Container2 (search) ── absolute -translate-x-1/2 left-[calc(50%+23.5px)] top-[17px] w-[512px] h-[39px] */}
      <div
        className="absolute -translate-x-1/2 flex items-center gap-[8px] px-[13px]"
        style={{
          left:   "calc(50% + 23.5px)",
          top:    17,
          width:  512,
          height: 39,
          background: "#232323",
          border: `1px solid ${searchFocused ? "#ff4615" : "#4a403c"}`,
          borderRadius: 10,
          transition:   "border-color 120ms",
        }}>
        {/* Search icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
          <path d={headerSvg.p107a080} stroke="#c7b8b2" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 14L11.1333 11.1333" stroke="#c7b8b2" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {/* Text input */}
        <input
          type="text"
          placeholder="Search people, tasks, files, channels..."
          className="flex-1 bg-transparent outline-none text-[14px] min-w-0"
          style={{ color: "#fff2ed" }}
          onFocus={() => setSearchFocused(true)}
          onBlur={()  => setSearchFocused(false)}
        />
        {/* ⌘K badge */}
        <div className="flex-shrink-0 flex items-center px-[7px] rounded-[4px]"
          style={{ background: "#262322", border: "1px solid #4a403c", height: 21 }}>
          <span style={{ color: "#c7b8b2", fontSize: 10, lineHeight: "15px" }}>⌘K</span>
        </div>
      </div>

      {/* ── Container3 (New + Bell) ── absolute right-[19px] top-[15px] */}
      <div className="absolute flex items-center gap-[8px]" style={{ right: 19, top: 15 }}>

        {/* Button1 — + New */}
        <div ref={newRef} className="relative">
          <button
            onClick={() => setNewOpen(o => !o)}
            className="flex items-center gap-[6px] font-medium text-white transition-opacity hover:opacity-90 active:opacity-70"
            style={{ background: "#ff4615", borderRadius: 10, height: 37, padding: "8px 12px", fontSize: 14 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <path d="M3.33333 8H12.6667" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 3.33333V12.6667" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>New</span>
          </button>
          {newOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 rounded-[12px] shadow-2xl z-50 py-1.5 overflow-hidden"
              style={{ background: "#232323", border: "1px solid #4a403c" }}>
              {[
                { label: "Task",        icon: CheckSquare,   path: "/app/todo"     },
                { label: "Event",       icon: Calendar,      path: "/app/calendar" },
                { label: "Message",     icon: MessageSquare, path: "/app/chat"     },
                { label: "Upload file", icon: Upload,        path: "/app/files"    },
                { label: "AI chat",     icon: Bot,           path: "/app/ai-chat"  },
              ].map(item => (
                <button key={item.label}
                  onClick={() => { setNewOpen(false); navigate(item.path); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-[14px] font-medium transition-colors hover:bg-white/5 text-left"
                  style={{ color: "#fff2ed" }}>
                  <item.icon className="size-4 flex-shrink-0" style={{ color: "#c7b8b2" }} />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Button2 — Bell: toggles the right notification sidebar */}
        <button
          onClick={onNotifToggle}
          className="relative flex items-center justify-center transition-opacity hover:opacity-80 active:opacity-60"
          style={{
            width: 38, height: 38,
            background: notifActive ? "#ff4615" : "#232323",
            border:     notifActive ? "1.028px solid #ff4615" : "1.028px solid #4a403c",
            borderRadius: 10.278,
            transition: "background 120ms, border-color 120ms",
          }}>
          {/* Bell SVG */}
          <svg
            width="16.444" height="16.444"
            viewBox="0 0 16.4444 16.4444"
            fill="none"
            style={{ position: "absolute", left: 9.25, top: 9.25 }}>
            <path d={headerSvg.p35a5e100} stroke="#FFF2ED" strokeWidth="1.37037" strokeLinecap="round" strokeLinejoin="round" />
            <path d={headerSvg.p13ce8800} stroke="#FFF2ED" strokeWidth="1.37037" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* Badge */}
          {unreadCount > 0 && !notifActive && (
            <div
              className="absolute flex items-center justify-center text-white font-medium"
              style={{
                left: 22.61, top: -4.11,
                width: 16.444, height: 16.444,
                background: "#ff4615",
                borderRadius: "50%",
                fontSize: 10.278,
                lineHeight: "15.417px",
              }}>
              {unreadCount}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Notification Sidebar ───────────────────────────────────────────────────────

const systemNotifs = [
  { id: 101, type: "system", title: "New member joined",   body: "Alex Turner joined Website Redesign", time: "5 min ago",  unread: true  },
  { id: 102, type: "system", title: "Calendar reminder",   body: "Client review starts in 30 minutes",  time: "30 min ago", unread: true  },
  { id: 103, type: "system", title: "File shared",         body: "Sarah shared Brand Guidelines.pdf",  time: "1h ago",     unread: false },
  { id: 104, type: "system", title: "Task overdue",        body: "Mobile layout approval is overdue",  time: "2h ago",     unread: false },
];

function NotifSidebar({ onClose }: { onClose: () => void }) {
  const [read, setRead] = useState<number[]>([]);

  const markAllRead = () => {
    const allIds = [...mentions.map(m => m.id), ...systemNotifs.map(n => n.id)];
    setRead(allIds);
  };

  return (
    <div
      className="flex flex-col flex-shrink-0 border-l overflow-hidden"
      style={{
        width: 300,
        borderColor: "var(--border)",
        background: "var(--card)",
      }}>

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{ height: 52, borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2">
          <Bell className="size-4" style={{ color: "var(--rally-brand)" }} />
          <span className="text-[14px] font-medium text-foreground">Notifications</span>
          {(mentions.filter(m => m.unread && !read.includes(m.id)).length +
            systemNotifs.filter(n => n.unread && !read.includes(n.id)).length) > 0 && (
            <span
              className="inline-flex items-center justify-center rounded-full text-white text-[10px] font-medium"
              style={{ width: 18, height: 18, background: "#ff4615" }}>
              {mentions.filter(m => m.unread && !read.includes(m.id)).length +
               systemNotifs.filter(n => n.unread && !read.includes(n.id)).length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={markAllRead}
            className="text-[11px] transition-colors hover:text-foreground"
            style={{ color: "var(--text-muted)" }}>
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-[8px] transition-colors hover:bg-muted ml-1"
            style={{ width: 26, height: 26, color: "var(--text-muted)" }}>
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">

        {/* Mentions */}
        <div className="px-4 pt-4 pb-1">
          <p className="text-[10px] font-medium uppercase tracking-widest"
            style={{ color: "var(--text-overline)" }}>Mentions & DMs</p>
        </div>
        {mentions.map(m => {
          const isRead = read.includes(m.id);
          return (
            <div
              key={m.id}
              className="flex gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-muted"
              style={{
                borderBottom: "1px solid var(--border-subtle)",
                background:   (!isRead && m.unread) ? "var(--rally-brand-soft)" : undefined,
              }}>
              <Avatar name={m.user} size={32} />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-foreground">{m.user}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-snug">{m.text}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{m.time}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0 pt-0.5">
                {(!isRead && m.unread) && (
                  <div className="w-2 h-2 rounded-full" style={{ background: "var(--rally-brand)" }} />
                )}
                <button
                  onClick={() => setRead(r => [...r, m.id])}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                  style={{ color: "var(--text-muted)" }}>
                  <CheckCircle2 className="size-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {/* System */}
        <div className="px-4 pt-4 pb-1">
          <p className="text-[10px] font-medium uppercase tracking-widest"
            style={{ color: "var(--text-overline)" }}>Activity</p>
        </div>
        {systemNotifs.map(n => {
          const isRead = read.includes(n.id);
          return (
            <div
              key={n.id}
              className="flex gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-muted"
              style={{
                borderBottom: "1px solid var(--border-subtle)",
                background:   (!isRead && n.unread) ? "var(--rally-brand-soft)" : undefined,
              }}>
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{ width: 32, height: 32, background: "var(--rally-brand-soft)" }}>
                <Bell className="size-3.5" style={{ color: "var(--rally-brand)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-foreground">{n.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{n.body}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
              </div>
              {(!isRead && n.unread) && (
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: "#ff4615" }} />
              )}
            </div>
          );
        })}

        <div className="h-4" />
      </div>
    </div>
  );
}

// ── Section 1: AI Daily Brief ──────────────────────────────────────────────────

function AIDailyBrief() {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const navigate = useNavigate();

  const summary = [
    { icon: Clock,         text: "2 tasks are due today",    sub: "Review prototype + weekly report",        color: "var(--warning-on)"     },
    { icon: Calendar,      text: "1 meeting in 40 minutes",  sub: "Client review at 2:00 PM",               color: "var(--info-on)"         },
    { icon: MessageSquare, text: "3 unread mentions",        sub: "Sarah, Mike, Emily",                     color: "var(--rally-brand-on)"  },
    { icon: FileText,      text: "Launch brief was updated", sub: "Q2 Launch Brief.pdf — Mike Chen, 2h ago",color: "var(--success-on)"      },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader
        title="AI Daily Brief"
        icon={Sparkles}
        iconColor="var(--rally-brand)"
        action={
          <button
            onClick={() => navigate("/app/ai-chat")}
            className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Open AI <ArrowRight className="size-3" />
          </button>
        }
      />

      <div className="p-4 space-y-3 flex-1">
        {/* Summary items */}
        <div className="grid grid-cols-2 gap-2">
          {summary.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 rounded-[10px] bg-background border border-border">
              <item.icon className="size-4 flex-shrink-0 mt-0.5" style={{ color: item.color }} />
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-foreground leading-snug">{item.text}</p>
                <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Suggested actions */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest mb-2" style={{ color: "var(--text-overline)" }}>Suggested actions</p>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.filter((s) => !dismissed.includes(s.id)).map((s) => (
              <div key={s.id} className="flex items-center gap-1 pl-3 pr-2 py-1.5 rounded-full border border-border bg-background hover:border-[var(--rally-brand)] hover:bg-[var(--rally-brand-soft)] transition-all duration-[120ms] active:bg-[var(--rally-brand-soft)] active:border-[var(--selected-border)] active:scale-[0.96] group cursor-pointer">
                <span className="text-[12px] text-foreground">{s.label}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); setDismissed((d) => [...d, s.id]); }}
                  className="text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100 ml-0.5"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground">AI suggestions require confirmation before executing. <span className="underline cursor-pointer">Manage AI settings</span></p>
      </div>
    </Card>
  );
}

// ── Section 2: Quick Actions ───────────────────────────────────────────────────

function QuickActions() {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader title="Quick Actions" icon={Zap} iconColor="var(--rally-brand)" />
      <div className="p-4 grid grid-cols-2 gap-2">
        {quickActions.map((a) => (
          <button
            key={a.id}
            onClick={() => a.path && navigate(a.path)}
            className="flex items-center gap-2.5 px-3 py-3 rounded-[10px] border border-border bg-background hover:bg-muted transition-all duration-[120ms] active:bg-[var(--neutral-soft)] active:scale-[0.99] text-left"
          >
            <div className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0" style={{ background: a.bg }}>
              <a.icon className="size-4" style={{ color: a.color }} />
            </div>
            <span className="text-[14px] font-medium text-foreground">{a.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}

// ── Section 3: My Work Now ────────────────────────────────────────────────────

function MyWorkNow() {
  const [done, setDone] = useState<number[]>([]);

  const groups = [
    { key: "overdue",    label: "Overdue",     items: tasks.filter((t) => t.status === "overdue") },
    { key: "today",      label: "Due Today",   items: tasks.filter((t) => t.status === "today") },
    { key: "inprogress", label: "In Progress", items: tasks.filter((t) => t.status === "inprogress") },
    { key: "blocked",    label: "Blocked",     items: tasks.filter((t) => t.status === "blocked") },
  ].filter((g) => g.items.length > 0);

  return (
    <Card className="flex flex-col">
      <CardHeader
        title="My Work Now"
        icon={CheckCircle2}
        iconColor="#0f5fd7"
        action={
          <Link to="/app/todo" className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
            All tasks <ArrowRight className="size-3" />
          </Link>
        }
      />
      <div className="p-4 space-y-4 flex-1 overflow-y-auto" style={{ maxHeight: 340 }}>
        {groups.map((g) => (
          <div key={g.key}>
            <p className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color: "var(--text-overline)" }}>{g.label}</p>
            <div className="space-y-1.5">
              {g.items.filter((t) => !done.includes(t.id)).map((task) => (
                <div key={task.id} className="group flex items-start gap-3 px-3 py-2.5 rounded-[10px] border border-border bg-background hover:border-[var(--border-color)] transition-all duration-[120ms] active:bg-[var(--neutral-soft)]">
                  <button
                    onClick={() => setDone((d) => [...d, task.id])}
                    className="mt-0.5 flex-shrink-0 text-muted-foreground hover:text-[var(--success-on)] transition-all duration-[120ms] active:scale-[0.94]"
                  >
                    <Circle className="size-4" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-foreground leading-snug">{task.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{task.ago}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <TaskStatusBadge status={task.status} />
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── Section 4: Next Up ────────────────────────────────────────────────────────

function NextUp() {
  const statusMeta: Record<string, { label: string; color: string; bg: string }> = {
    done:     { label: "Done",     color: "var(--success-on)",     bg: "var(--success-soft)"     },
    next:     { label: "Next",     color: "var(--rally-brand-on)", bg: "var(--rally-brand-soft)" },
    upcoming: { label: "Upcoming", color: "var(--info-on)",        bg: "var(--info-soft)"        },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader
        title="Next Up"
        icon={Calendar}
        iconColor="var(--warning-on)"
        action={
          <Link to="/app/calendar" className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors">
            Calendar <ArrowRight className="size-3" />
          </Link>
        }
      />
      <div className="p-4 space-y-3 flex-1">
        {events.map((ev) => {
          const meta = statusMeta[ev.status];
          return (
            <div key={ev.id}
              className={`flex items-start gap-3 p-3 rounded-[10px] border transition-all duration-[120ms] active:bg-[var(--neutral-soft)] ${ev.status === "next" ? "border-[var(--rally-brand)] bg-[var(--rally-brand-soft)]" : "border-border bg-background"}`}>
              <div className="text-center flex-shrink-0 w-10">
                <p className="text-[11px] font-medium" style={{ color: ev.status === "next" ? "var(--rally-brand)" : "var(--text-muted)" }}>{ev.time}</p>
                <p className="text-[10px] text-muted-foreground">{ev.duration}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-foreground leading-snug">{ev.title}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex -space-x-1">
                    {ev.attendees.slice(0, 3).map((a) => (
                      <div key={a} className="w-5 h-5 rounded-full border-2 border-card overflow-hidden flex-shrink-0" style={{ background: "var(--neutral-solid)" }}>
                        <span className="text-white text-[8px] flex items-center justify-center h-full">{a.charAt(0)}</span>
                      </div>
                    ))}
                    {ev.attendees.length > 3 && (
                      <div className="w-5 h-5 rounded-full border-2 border-card bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-[8px] text-muted-foreground">+{ev.attendees.length - 3}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{ev.attendees.length} attendees</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: meta.bg, color: meta.color }}>
                  {meta.label}
                </span>
                {ev.status === "next" && (
                  <button className="flex items-center gap-1 px-2.5 py-1 rounded-[6px] text-white text-[11px] font-medium transition-all duration-[120ms] active:bg-[var(--rally-brand-pressed)] active:scale-[0.97]"
                    style={{ background: "var(--rally-brand)" }}>
                    <Play className="size-3" /> Join
                  </button>
                )}
                {ev.status === "upcoming" && (
                  <button className="flex items-center gap-1 px-2.5 py-1 rounded-[6px] border border-border text-muted-foreground text-[11px] font-medium transition-all duration-[120ms] hover:bg-muted active:bg-[var(--neutral-soft)] active:scale-[0.97]">
                    <Sparkles className="size-3" /> Prep
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ── Section 5: Mentions / Recent Chats ───────────────────────────────────────

function MentionsChats() {
  const [read, setRead] = useState<number[]>([]);
  return (
    <Card className="flex flex-col">
      <CardHeader
        title="Mentions & Chats"
        icon={MessageSquare}
        iconColor="var(--info-on)"
        action={
          <Link to="/app/chat" className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors">
            Open Chat <ArrowRight className="size-3" />
          </Link>
        }
      />
      <div className="flex-1">
        {mentions.map((m) => {
          const isRead = read.includes(m.id);
          return (
            <div key={m.id}
              className={`flex gap-3 px-4 py-3 border-b border-[var(--border-subtle)] last:border-none hover:bg-muted transition-all duration-[120ms] active:bg-[var(--neutral-soft)] cursor-pointer ${(!isRead && m.unread) ? "bg-[var(--rally-brand-soft)]/30" : ""}`}>
              <Avatar name={m.user} size={34} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-medium text-foreground">{m.user}</span>
                  {m.type === "mention"
                    ? <span className="flex items-center gap-1 text-[11px] text-muted-foreground"><Hash className="size-3" />{m.channel.replace("#","")}</span>
                    : <span className="flex items-center gap-1 text-[11px] text-muted-foreground"><MessageSquare className="size-3" />DM</span>
                  }
                </div>
                <p className="text-[12px] text-muted-foreground leading-snug mt-0.5 truncate">{m.text}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{m.time}</p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                {(!isRead && m.unread) && (
                  <div className="w-2 h-2 rounded-full" style={{ background: "var(--rally-brand)" }} />
                )}
                <button
                  onClick={() => setRead((r) => [...r, m.id])}
                  className="text-muted-foreground hover:text-foreground transition-all duration-[120ms] active:scale-[0.94]"
                  title="Mark as read"
                >
                  <CheckCircle2 className="size-3.5" />
                </button>
              </div>
            </div>
          );
        })}
        <div className="px-4 py-3">
          <Link to="/app/chat" className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
            <SquarePen className="size-3.5" /> Reply in chat
          </Link>
        </div>
      </div>
    </Card>
  );
}

// ── Section 6: Continue Working ───────────────────────────────────────────────

function ContinueWorking() {
  return (
    <Card className="flex flex-col">
      <CardHeader
        title="Continue Working"
        icon={RefreshCw}
        iconColor="var(--success-on)"
        action={
          <Link to="/app/files" className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
            All files <ArrowRight className="size-3" />
          </Link>
        }
      />
      <div className="p-4 space-y-2 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-overline)" }}>Recent files</p>
        {recentFiles.map((f) => (
          <div key={f.id} className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] border border-border bg-background hover:bg-muted transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 border border-border bg-card">
              <FileText className="size-4" style={{ color: fileIconColor[f.type] ?? "#5f514b" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-foreground truncate">{f.name}</p>
              <p className="text-[10px] text-muted-foreground">{f.updatedBy} · {f.time}</p>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] text-muted-foreground">{f.size}</span>
              <ChevronRight className="size-3.5 text-muted-foreground" />
            </div>
          </div>
        ))}

        <div className="pt-2 border-t border-[var(--border-subtle)]">
          <p className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color: "var(--text-overline)" }}>Last active</p>
          <Link to="/app/chat" className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] border border-border bg-background hover:bg-muted transition-all duration-[120ms] active:bg-[var(--neutral-soft)] cursor-pointer">
            <div className="w-8 h-8 rounded-[8px] flex items-center justify-center bg-[var(--info-soft)] border border-border flex-shrink-0">
              <Hash className="size-4" style={{ color: "var(--info-solid)" }} />
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-medium text-foreground">#design</p>
              <p className="text-[10px] text-muted-foreground">Design Team · 3 unread</p>
            </div>
            <Badge label="3" variant="brand" />
          </Link>
        </div>
      </div>
    </Card>
  );
}

// ── Section 7: Team Pulse ─────────────────────────────────────────────────────

const statusDot: Record<string, string> = {
  active: "var(--status-active)",
  idle:   "var(--status-limited)",
  dnd:    "var(--status-disabled)",
};

function TeamPulse() {
  return (
    <Card className="flex flex-col">
      <CardHeader
        title="Team Pulse"
        icon={Activity}
        iconColor="var(--info-on)"
        action={
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Dot color="var(--status-active)" /> {onlineMembers.filter((m) => m.status === "active").length} online
          </span>
        }
      />
      <div className="p-4 space-y-4 flex-1">

        {/* Voice rooms */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color: "var(--text-overline)" }}>Voice rooms</p>
          <div className="space-y-2">
            {voiceRooms.map((room) => (
              <div key={room.id} className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] border border-border bg-background">
                <div className="w-7 h-7 rounded-[7px] flex items-center justify-center" style={{ background: "var(--info-soft)" }}>
                  <Volume2 className="size-3.5" style={{ color: "var(--info-on)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-foreground">{room.name}</p>
                  <p className="text-[10px] text-muted-foreground">{room.members.length} in room</p>
                </div>
                <div className="flex -space-x-1 mr-2">
                  {room.members.slice(0, 3).map((m) => (
                    <div key={m} title={m} className="w-5 h-5 rounded-full border-2 border-card overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ background: "var(--neutral-solid)" }}>
                      <span className="text-white text-[8px]">{m.charAt(0)}</span>
                    </div>
                  ))}
                </div>
                <button className="flex items-center gap-1 px-2.5 py-1 rounded-[6px] border border-border text-muted-foreground text-[11px] hover:bg-muted transition-colors flex-shrink-0">
                  <Headphones className="size-3" /> Join
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Online members */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color: "var(--text-overline)" }}>Members</p>
          <div className="space-y-1.5">
            {onlineMembers.map((m) => (
              <div key={m.name} className="flex items-center gap-2.5 py-1.5">
                <div className="relative flex-shrink-0">
                  <Avatar name={m.name} size={28} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card"
                    style={{ background: statusDot[m.status] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-foreground truncate">{m.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{m.activity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ── Section 8: Role-based panel ───────────────────────────────────────────────

function RolePanel() {
  const { userRole } = useAuth();

  if (userRole === "owner") {
    return (
      <Card className="flex flex-col">
        <CardHeader title="Team Health" icon={Shield} iconColor="var(--rally-brand)"
          action={<Link to="/app/team" className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors">Team <ArrowRight className="size-3" /></Link>}
        />
        <div className="p-4 space-y-3 flex-1">
          {[
            { icon: UserPlus,  label: "Pending invites", value: "3 pending",            color: "var(--warning-on)",     bg: "var(--warning-soft)",     action: "Review" },
            { icon: HardDrive, label: "Storage used",    value: "12.4 GB / 50 GB",      color: "var(--info-on)",        bg: "var(--info-soft)",        action: "Manage" },
            { icon: Users,     label: "Team members",    value: "5 active · 1 viewer",  color: "var(--success-on)",     bg: "var(--success-soft)",     action: "View"   },
            { icon: Lock,      label: "Permissions",     value: "All roles configured",  color: "var(--neutral-on)",     bg: "var(--neutral-soft)",     action: null     },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] border border-border bg-background">
              <div className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0" style={{ background: item.bg }}>
                <item.icon className="size-4" style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-muted-foreground">{item.label}</p>
                <p className="text-[13px] font-medium text-foreground">{item.value}</p>
              </div>
              {item.action && (
                <Link to="/app/team" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">{item.action}</Link>
              )}
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (userRole === "admin") {
    return (
      <Card className="flex flex-col">
        <CardHeader title="Admin Notices" icon={AlertTriangle} iconColor="var(--warning-on)" />
        <div className="p-4 space-y-2 flex-1">
          {[
            { text: "2 channels need descriptions",         color: "var(--warning-on)", bg: "var(--warning-soft)" },
            { text: "1 restricted-access request pending",  color: "var(--error-on)",   bg: "var(--error-soft)"   },
            { text: "Calendar permissions need review",     color: "var(--info-on)",    bg: "var(--info-soft)"    },
          ].map((n, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-[10px]" style={{ background: n.bg }}>
              <AlertCircle className="size-4 flex-shrink-0" style={{ color: n.color }} />
              <p className="text-[12px]" style={{ color: n.color }}>{n.text}</p>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (userRole === "member") {
    return (
      <Card className="flex flex-col">
        <CardHeader title="Assigned to Me" icon={CheckSquare} iconColor="var(--info-solid)" />
        <div className="p-4 space-y-2 flex-1">
          {tasks.map((t) => (
            <div key={t.id} className="flex items-center gap-2 px-3 py-2.5 rounded-[10px] border border-border bg-background">
              <TaskStatusIcon status={t.status} />
              <p className="text-[12px] text-foreground flex-1 truncate">{t.title}</p>
              <TaskStatusBadge status={t.status} />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  // viewer
  return (
    <Card className="flex flex-col">
      <CardHeader title="Read-only Summary" icon={Eye} iconColor="#5f514b" />
      <div className="p-4 space-y-2 flex-1">
        <p className="text-[13px] text-muted-foreground">You have read-only access to this workspace.</p>
        {events.map((e) => (
          <div key={e.id} className="flex items-center gap-2 px-3 py-2 rounded-[10px] border border-border bg-background">
            <Calendar className="size-4 text-muted-foreground flex-shrink-0" />
            <p className="text-[12px] text-foreground flex-1">{e.title}</p>
            <p className="text-[11px] text-muted-foreground">{e.time}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

// Widget system types & constants
type WidgetId   = 'ai-brief' | 'quick-actions' | 'my-work' | 'next-up' | 'mentions' | 'continue' | 'team-pulse' | 'role-panel';
type WidgetSize = 'small' | 'medium' | 'large';

// Small=4/12 cols (~340px)  Medium=6/12 (~50%)  Large=8/12 (~65%)
const SIZE_COLS: Record<WidgetSize, number> = { small: 4, medium: 6, large: 8 };

const WIDGET_META: Record<WidgetId, { label: string; defaultSize: WidgetSize; icon: React.ElementType; color: string }> = {
  'ai-brief':      { label: 'AI Daily Brief',   defaultSize: 'large',  icon: Sparkles,      color: 'var(--rally-brand)'  },
  'quick-actions': { label: 'Quick Actions',    defaultSize: 'small',  icon: Zap,           color: 'var(--rally-brand)'  },
  'my-work':       { label: 'My Work Now',      defaultSize: 'large',  icon: CheckCircle2,  color: '#0f5fd7'             },
  'next-up':       { label: 'Next Up',          defaultSize: 'small',  icon: Calendar,      color: 'var(--warning-on)'   },
  'mentions':      { label: 'Mentions & Chats', defaultSize: 'medium', icon: MessageSquare, color: 'var(--info-on)'      },
  'continue':      { label: 'Continue Working', defaultSize: 'medium', icon: RefreshCw,     color: 'var(--success-on)'   },
  'team-pulse':    { label: 'Team Pulse',       defaultSize: 'medium', icon: Activity,      color: 'var(--info-on)'      },
  'role-panel':    { label: 'Team Health',      defaultSize: 'medium', icon: Shield,        color: 'var(--rally-brand)'  },
};

const ALL_WIDGET_IDS: WidgetId[] = [
  'ai-brief','quick-actions','my-work','next-up','mentions','continue','team-pulse','role-panel',
];

const DEFAULT_LAYOUT: Array<{ id: WidgetId; size: WidgetSize }> = [
  { id: 'ai-brief',      size: 'large'  },
  { id: 'quick-actions', size: 'small'  },
  { id: 'my-work',       size: 'large'  },
  { id: 'next-up',       size: 'small'  },
  { id: 'mentions',      size: 'medium' },
  { id: 'continue',      size: 'medium' },
  { id: 'team-pulse',    size: 'medium' },
  { id: 'role-panel',    size: 'medium' },
];

// ── WidgetWrapper ──────────────────────────────────────────────────────────────

function WidgetWrapper({
  id, size, editMode,
  onRemove, onResize,
  onDragStart, onDragOver, onDragLeave, onDrop, onDragEnd,
  isDragTarget, children,
}: {
  id: WidgetId; size: WidgetSize; editMode: boolean;
  onRemove: () => void; onResize: (s: WidgetSize) => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver:  (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop:      (e: React.DragEvent) => void;
  onDragEnd:   () => void;
  isDragTarget: boolean;
  children: React.ReactNode;
}) {
  const meta = WIDGET_META[id];

  return (
    <div
      className="relative h-full"
      draggable={editMode}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      style={{
        opacity:   isDragTarget ? 0.45 : 1,
        transform: isDragTarget ? 'scale(0.98)' : 'scale(1)',
        transition:'opacity 120ms, transform 120ms',
      }}>

      {/* Widget content — frozen while editing */}
      <div
        className="h-full"
        style={{
          opacity:       editMode ? 0.65 : 1,
          pointerEvents: editMode ? 'none' : 'auto',
          userSelect:    editMode ? 'none' : 'auto',
          transition:    'opacity 120ms',
        }}>
        {children}
      </div>

      {/* Edit overlay */}
      {editMode && (
        <div
          className="absolute inset-0 rounded-[14px] pointer-events-none"
          style={{ border: '1.5px dashed #4a403c', zIndex: 10 }}>

          {/* Control bar */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center gap-2 px-2.5 rounded-t-[12px] pointer-events-auto"
            style={{ height: 38, background: '#1e1a18', borderBottom: '1px solid #4a403c' }}>

            <GripVertical
              className="size-4 flex-shrink-0 cursor-grab active:cursor-grabbing"
              style={{ color: '#5f514b' }} />

            <meta.icon className="size-3.5 flex-shrink-0" style={{ color: meta.color }} />
            <span className="text-[12px] font-medium flex-1 min-w-0 truncate" style={{ color: '#c7b8b2' }}>
              {meta.label}
            </span>

            {/* S / M / L */}
            <div className="flex items-center gap-[3px] flex-shrink-0">
              {(['small','medium','large'] as WidgetSize[]).map(s => (
                <button
                  key={s}
                  onClick={() => onResize(s)}
                  className="flex items-center justify-center rounded-[5px] text-[10px] font-medium transition-colors"
                  style={{
                    width: 22, height: 22,
                    background: size === s ? '#ff4615' : '#2c2c2c',
                    color:      size === s ? '#fff'     : '#7a6a62',
                    border:     `1px solid ${size === s ? '#ff4615' : '#4a403c'}`,
                  }}>
                  {s === 'small' ? 'S' : s === 'medium' ? 'M' : 'L'}
                </button>
              ))}
            </div>

            {/* Remove */}
            <button
              onClick={onRemove}
              className="flex items-center justify-center rounded-[5px] transition-colors hover:bg-white/10 flex-shrink-0"
              style={{ width: 22, height: 22, color: '#7a6a62', border: '1px solid #4a403c' }}>
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Row-group helpers ──────────────────────────────────────────────────────────

function computeRowGroups(
  layout: Array<{ id: WidgetId; size: WidgetSize }>
): Array<Array<{ id: WidgetId; size: WidgetSize }>> {
  const rows: Array<Array<{ id: WidgetId; size: WidgetSize }>> = [];
  let row: Array<{ id: WidgetId; size: WidgetSize }> = [];
  let cols = 0;
  for (const w of layout) {
    const c = SIZE_COLS[w.size];
    if (cols > 0 && cols + c > 12) { rows.push(row); row = []; cols = 0; }
    row.push(w);
    cols += c;
  }
  if (row.length) rows.push(row);
  return rows;
}

// ── Page export ────────────────────────────────────────────────────────────────

export function DashboardV2() {
  const { user } = useAuth();
  const greeting = useMemo(() => getGreeting(user?.name?.split(' ')[0]), [user?.name]);

  // ── Remove the Layout <main> stroke ring on this route only ──
  useEffect(() => {
    const mainEl = document.querySelector('main') as HTMLElement | null;
    if (!mainEl) return;
    const prevShadow  = mainEl.style.boxShadow;
    const prevRadius  = mainEl.style.borderRadius;
    mainEl.style.boxShadow    = 'none';
    mainEl.style.borderRadius = '0';
    return () => {
      mainEl.style.boxShadow    = prevShadow;
      mainEl.style.borderRadius = prevRadius;
    };
  }, []);

  // ── Widget layout ──
  const [layout,    setLayout]    = useState(DEFAULT_LAYOUT);
  const [editMode,  setEditMode]  = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied,    setCopied]    = useState(false);
  const [dragSrc,   setDragSrc]   = useState<WidgetId | null>(null);
  const [dragOver,  setDragOver]  = useState<WidgetId | null>(null);

  // ── Notification sidebar ──
  const [notifOpen, setNotifOpen] = useState(false);

  // ── Row heights (null = auto / content-sized) ──
  const rowGroups = useMemo(() => computeRowGroups(layout), [layout]);
  const [rowHeights, setRowHeights] = useState<(number | null)[]>(() =>
    rowGroups.map(() => null)
  );
  // Sync rowHeights array length with rowGroups count
  useEffect(() => {
    setRowHeights(prev => {
      const n = rowGroups.length;
      if (prev.length === n) return prev;
      const next = Array.from({ length: n }, (_, i) => prev[i] ?? null);
      return next;
    });
  }, [rowGroups.length]);

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const shareRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) setShareOpen(false);
    }
    if (shareOpen) document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [shareOpen]);

  // Widget CRUD
  const addWidget    = (id: WidgetId) => setLayout(p => [...p, { id, size: WIDGET_META[id].defaultSize }]);
  const removeWidget = (id: WidgetId) => setLayout(p => p.filter(w => w.id !== id));
  const resizeWidget = (id: WidgetId, size: WidgetSize) => setLayout(p => p.map(w => w.id === id ? { ...w, size } : w));
  const clearLayout  = () => { setLayout([]); setRowHeights([]); };

  // Drag-and-drop
  const handleDragStart = (e: React.DragEvent, id: WidgetId) => {
    setDragSrc(id);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragOver = (e: React.DragEvent, id: WidgetId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragSrc && dragSrc !== id) setDragOver(id);
  };
  const handleDragLeave = (id: WidgetId) => setDragOver(p => p === id ? null : p);
  const handleDrop = (e: React.DragEvent, targetId: WidgetId) => {
    e.preventDefault();
    if (!dragSrc || dragSrc === targetId) { setDragSrc(null); setDragOver(null); return; }
    setLayout(prev => {
      const arr = [...prev];
      const si  = arr.findIndex(w => w.id === dragSrc);
      const ti  = arr.findIndex(w => w.id === targetId);
      const [item] = arr.splice(si, 1);
      arr.splice(ti, 0, item);
      return arr;
    });
    // Reset heights when order changes — rows may reflow
    setRowHeights(rg => rg.map(() => null));
    setDragSrc(null);
    setDragOver(null);
  };
  const handleDragEnd = () => { setDragSrc(null); setDragOver(null); };

  // Row resize
  const startRowResize = useCallback((rowIdx: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    const startY      = e.clientY;
    const el          = rowRefs.current[rowIdx];
    const startHeight = el?.getBoundingClientRect().height ?? 280;

    const onMove = (ev: MouseEvent) => {
      const h = Math.max(100, startHeight + (ev.clientY - startY));
      setRowHeights(prev => {
        const next = [...prev];
        next[rowIdx] = h;
        return next;
      });
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor     = '';
      document.body.style.userSelect = '';
    };
    document.body.style.cursor     = 'ns-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
  }, []);

  const renderContent = (id: WidgetId) => {
    switch (id) {
      case 'ai-brief':      return <AIDailyBrief />;
      case 'quick-actions': return <QuickActions />;
      case 'my-work':       return <MyWorkNow />;
      case 'next-up':       return <NextUp />;
      case 'mentions':      return <MentionsChats />;
      case 'continue':      return <ContinueWorking />;
      case 'team-pulse':    return <TeamPulse />;
      case 'role-panel':    return <RolePanel />;
    }
  };

  const hiddenWidgets = ALL_WIDGET_IDS.filter(id => !layout.find(w => w.id === id));
  const shareUrl      = 'https://rally.app/layout/a8f3k2m9';
  const handleCopy    = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      <TopNav notifActive={notifOpen} onNotifToggle={() => setNotifOpen(o => !o)} />

      {/* ── Content row: widget area + notification sidebar ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Scrollable main content */}
        <div className="flex-1 overflow-y-auto px-[19px] py-5 min-w-0">

          {/* Greeting + toolbar */}
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-[22px] font-medium text-foreground">{greeting} 👋</h1>

            <div className="flex items-center gap-2">
              {editMode && (
                <>
                  <button
                    onClick={clearLayout}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border text-[12px] font-medium transition-colors hover:bg-muted"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                    <Trash2 className="size-3.5" /> Clear layout
                  </button>
                  <button
                    onClick={() => setShareOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border text-[12px] font-medium transition-colors hover:bg-muted"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                    <Share2 className="size-3.5" /> Share layout
                  </button>
                </>
              )}

              {/* Edit layout / Done */}
              <button
                onClick={() => setEditMode(e => !e)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border text-[12px] font-medium transition-all"
                style={{
                  background:  editMode ? '#ff4615' : 'transparent',
                  borderColor: editMode ? '#ff4615' : 'var(--border)',
                  color:       editMode ? '#fff'     : 'var(--text-muted)',
                }}>
                <LayoutGrid className="size-3.5" />
                {editMode ? 'Done' : 'Edit layout'}
              </button>

              {/* Refresh brief — icon only */}
              <button
                title="Refresh brief"
                className="flex items-center justify-center rounded-[10px] border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                style={{ width: 32, height: 32 }}>
                <RefreshCw className="size-3.5" />
              </button>
            </div>
          </div>

          {/* ── Widget area ── */}
          {layout.length === 0 ? (
            /* Empty state */
            <div
              className="flex flex-col items-center justify-center rounded-[16px]"
              style={{ minHeight: 420, border: '2px dashed var(--border)' }}>
              <LayoutGrid className="size-10 mb-3" style={{ color: 'var(--text-muted)' }} />
              <p className="text-[16px] font-medium text-foreground">No widgets added</p>
              <p className="text-[13px] text-muted-foreground mt-1">
                Use <span className="font-medium">Edit layout</span> to customise your dashboard
              </p>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-[13px] font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: '#ff4615' }}>
                  <LayoutGrid className="size-3.5" /> Edit layout
                </button>
              )}
            </div>
          ) : (
            /* Row-by-row grid so each row can be independently resized */
            <div className="flex flex-col" style={{ gap: 0 }}>
              {rowGroups.map((rowWidgets, rowIdx) => (
                <div key={rowIdx}>
                  {/* Row grid */}
                  <div
                    ref={el => { rowRefs.current[rowIdx] = el; }}
                    className="grid"
                    style={{
                      gridTemplateColumns: 'repeat(12, 1fr)',
                      columnGap: 16,
                      height:    rowHeights[rowIdx] != null ? rowHeights[rowIdx]! : undefined,
                      minHeight: 100,
                      marginTop: rowIdx === 0 ? 0 : 16,
                    }}>
                    {rowWidgets.map(({ id, size }) => (
                      <div key={id} style={{ gridColumn: `span ${SIZE_COLS[size]}` }}>
                        <WidgetWrapper
                          id={id} size={size} editMode={editMode}
                          onRemove={() => removeWidget(id)}
                          onResize={s  => resizeWidget(id, s)}
                          onDragStart={e => handleDragStart(e, id)}
                          onDragOver={e  => handleDragOver(e, id)}
                          onDragLeave={() => handleDragLeave(id)}
                          onDrop={e      => handleDrop(e, id)}
                          onDragEnd={handleDragEnd}
                          isDragTarget={dragOver === id}>
                          {renderContent(id)}
                        </WidgetWrapper>
                      </div>
                    ))}
                  </div>

                  {/* Row resize handle — only in edit mode, between rows */}
                  {editMode && rowIdx < rowGroups.length - 1 && (
                    <div
                      className="relative flex items-center justify-center"
                      style={{ height: 20, marginTop: 4, cursor: 'ns-resize', zIndex: 5 }}
                      onMouseDown={startRowResize(rowIdx)}>
                      {/* Full-width line */}
                      <div
                        className="absolute inset-x-0 top-1/2 -translate-y-1/2"
                        style={{ height: 1, background: '#4a403c' }}
                      />
                      {/* Centre pill */}
                      <div
                        className="relative flex items-center gap-1.5 px-2.5 py-0.5 rounded-full select-none"
                        style={{ background: '#2c2c2c', border: '1px solid #4a403c' }}>
                        <GripVertical
                          className="size-3 rotate-90"
                          style={{ color: '#7a6a62' }}
                        />
                        <span style={{ color: '#7a6a62', fontSize: 10 }}>
                          {rowHeights[rowIdx] != null
                            ? `${Math.round(rowHeights[rowIdx]!)}px`
                            : 'Drag to resize row'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Available widgets panel */}
          {editMode && hiddenWidgets.length > 0 && (
            <div
              className="mt-4 p-4 rounded-[14px]"
              style={{ border: '1px dashed var(--border)' }}>
              <p className="text-[11px] font-medium uppercase tracking-widest mb-3"
                style={{ color: 'var(--text-overline)' }}>
                Available widgets
              </p>
              <div className="flex flex-wrap gap-2">
                {hiddenWidgets.map(id => {
                  const m = WIDGET_META[id];
                  return (
                    <button
                      key={id}
                      onClick={() => addWidget(id)}
                      className="flex items-center gap-2 px-3 py-2 rounded-[10px] border text-[13px] font-medium transition-colors hover:bg-muted"
                      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', borderStyle: 'dashed' }}>
                      <Plus className="size-3.5" />
                      <m.icon className="size-3.5" style={{ color: m.color }} />
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="h-6" />
        </div>

        {/* Notification sidebar */}
        {notifOpen && <NotifSidebar onClose={() => setNotifOpen(false)} />}
      </div>

      {/* Share Layout modal */}
      {shareOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.55)' }}>
          <div
            ref={shareRef}
            className="relative w-[400px] rounded-[18px] p-6 shadow-2xl"
            style={{ background: '#1e1a18', border: '1px solid #4a403c' }}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Share2 className="size-4" style={{ color: '#ff4615' }} />
                <h3 className="text-[16px] font-medium" style={{ color: '#fff2ed' }}>Share layout</h3>
              </div>
              <button
                onClick={() => setShareOpen(false)}
                className="flex items-center justify-center rounded-[8px] transition-colors hover:bg-white/10"
                style={{ width: 28, height: 28, color: '#7a6a62' }}>
                <X className="size-4" />
              </button>
            </div>
            <p className="text-[13px] mb-4" style={{ color: '#7a6a62' }}>
              Anyone with this link can import your current widget layout.
            </p>
            <div className="flex items-center gap-2">
              <div
                className="flex-1 px-3 py-2 rounded-[10px] text-[13px] truncate"
                style={{ background: '#2c2c2c', border: '1px solid #4a403c', color: '#c7b8b2' }}>
                {shareUrl}
              </div>
              <button
                onClick={handleCopy}
                className="px-3 py-2 rounded-[10px] text-[13px] font-medium text-white transition-all hover:opacity-80 flex-shrink-0"
                style={{ background: copied ? '#27ae60' : '#ff4615', minWidth: 64 }}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-[11px] mt-3" style={{ color: '#5f514b' }}>
              Layout links are view-only and expire in 7 days.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
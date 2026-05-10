import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import {
  Search, Plus, Mic, MicOff, Headphones, Hash, Volume2, X,
  ChevronDown, Send, Paperclip, Smile, Sparkles,
  Pin, Users, FileText, Reply, Edit2, Trash2, Settings,
  Inbox, Circle, PhoneOff, Play, AtSign,
  MessageSquare, BellOff, Bell, CheckCheck,
  Video, VideoOff, Monitor, MoreHorizontal, VolumeX,
  UserPlus, Copy, LogOut, Flag, UserX, Link2, AlertTriangle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useSecondarySidebar } from "../contexts/SecondarySidebarContext";

// ── Types ─────────────────────────────────────────────────────────────────────

type ChannelType = "text" | "voice" | "dm";
type PanelMode   = "pins" | "summary" | "members" | "settings";

interface Channel {
  id: string; name: string; type: ChannelType;
  topic?: string; unread: number; dmUserId?: string;
  allowAi: boolean; members: string[]; pinned?: string[];
}

interface Reaction { emoji: string; count: number; reacted: boolean }

interface ChatMessage {
  id: string; channelId: string; userId: string; userName: string;
  message: string; timestamp: string;
  reactions?: Reaction[];
  attachment?: { name: string; type: "file" | "image"; size: string };
  replyTo?: string; edited?: boolean; pinned?: boolean;
}

interface VoiceRoom { id: string; name: string; participants: string[]; speaking: string[] }
interface ToastItem { id: string; msg: string; variant?: "success" | "error" | "info" }

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockChannels: Channel[] = [
  { id:"ch-general",       name:"general",       type:"text", topic:"Team-wide updates and conversation",     unread:2, allowAi:true,  members:["user-1","user-2","user-3","user-4"] },
  { id:"ch-announcements", name:"announcements", type:"text", topic:"Important updates from leadership",      unread:0, allowAi:false, members:["user-1","user-2","user-3","user-4","user-5"] },
  { id:"ch-design",        name:"design",        type:"text", topic:"Design work, Figma files, and feedback", unread:5, allowAi:true,  members:["user-1","user-2","user-4"], pinned:["msg-d2"] },
  { id:"ch-engineering",   name:"engineering",   type:"text", topic:"Code, PRs, staging, and deployment",     unread:1, allowAi:true,  members:["user-1","user-3","user-4"] },
  { id:"dm-sarah", name:"Sarah Johnson", type:"dm", unread:1, allowAi:true, members:["user-1","user-2"], dmUserId:"user-2" },
  { id:"dm-mike",  name:"Mike Chen",     type:"dm", unread:0, allowAi:true, members:["user-1","user-3"], dmUserId:"user-3" },
  { id:"dm-emily", name:"Emily Davis",   type:"dm", unread:3, allowAi:true, members:["user-1","user-4"], dmUserId:"user-4" },
];

const today = new Date().toISOString().slice(0,10);
function ts(h: number, m: number) { return `${today}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00`; }

const mockMessages: ChatMessage[] = [
  { id:"msg-g1", channelId:"ch-general", userId:"user-2", userName:"Sarah Johnson", message:"Good morning team! Ready for the client review today? 🎉", timestamp:ts(9,0), reactions:[{emoji:"👋",count:3,reacted:false},{emoji:"🔥",count:1,reacted:false}] },
  { id:"msg-g2", channelId:"ch-general", userId:"user-3", userName:"Mike Chen",     message:"Morning! Just pushed the latest changes to staging 🚀", timestamp:ts(9,3) },
  { id:"msg-g3", channelId:"ch-general", userId:"user-4", userName:"Emily Davis",   message:"I'll join the call a few minutes late — wrapping up the API docs.", timestamp:ts(9,10) },
  { id:"msg-g4", channelId:"ch-general", userId:"user-1", userName:"John Doe",      message:"No worries Emily. Sarah, did you get the updated brief from Alex?", timestamp:ts(9,15) },
  { id:"msg-g5", channelId:"ch-general", userId:"user-2", userName:"Sarah Johnson", message:"Yes got it! @John should I add the new brand assets to the Figma too?", timestamp:ts(9,18) },
  { id:"msg-g6", channelId:"ch-general", userId:"user-3", userName:"Mike Chen",     message:"The staging build is live btw — link in the engineering channel.", timestamp:ts(10,30), reactions:[{emoji:"✅",count:2,reacted:true}] },
  { id:"msg-g7", channelId:"ch-general", userId:"user-4", userName:"Emily Davis",   message:"Looks great! Found a minor spacing issue on mobile though, opening an issue now.", timestamp:ts(10,45) },

  { id:"msg-d1", channelId:"ch-design", userId:"user-2", userName:"Sarah Johnson", message:"New header designs are up in Figma 👇 Would love early feedback!", timestamp:ts(8,45), attachment:{name:"Website_Header_v3.fig",type:"file",size:"8.4 MB"}, reactions:[{emoji:"👀",count:4,reacted:false}] },
  { id:"msg-d2", channelId:"ch-design", userId:"user-3", userName:"Mike Chen",     message:"Love the direction! The spacing feels much better than v2. @John thoughts?", timestamp:ts(9,0), pinned:true },
  { id:"msg-d3", channelId:"ch-design", userId:"user-2", userName:"Sarah Johnson", message:"@John can you review the new header design when you get a chance? I added notes in the comments.", timestamp:ts(9,5) },
  { id:"msg-d4", channelId:"ch-design", userId:"user-4", userName:"Emily Davis",   message:"Just checked the Figma — the mobile version needs a bit of work on the nav drawer.", timestamp:ts(10,0) },
  { id:"msg-d5", channelId:"ch-design", userId:"user-2", userName:"Sarah Johnson", message:"On it! Should be updated within the hour 💪", timestamp:ts(10,15) },
  { id:"msg-d6", channelId:"ch-design", userId:"user-4", userName:"Emily Davis",   message:"Perfect. Also — can we discuss the color choices for the CTA buttons in today's sync?", timestamp:ts(10,20) },
  { id:"msg-d7", channelId:"ch-design", userId:"user-3", userName:"Mike Chen",     message:"Added it to the agenda 👍", timestamp:ts(10,22), reactions:[{emoji:"👍",count:2,reacted:false}] },

  { id:"msg-a1", channelId:"ch-announcements", userId:"user-1", userName:"John Doe", message:"📌 Q2 Sprint planning is scheduled for Friday at 3 PM EST. Please review the backlog before then. Prep doc is linked in the files tab.", timestamp:ts(8,0), pinned:true },

  { id:"msg-e1", channelId:"ch-engineering", userId:"user-3", userName:"Mike Chen",   message:"Staging is up ✅ Build #247 — all tests passing. Ready for QA.", timestamp:ts(10,30) },
  { id:"msg-e2", channelId:"ch-engineering", userId:"user-4", userName:"Emily Davis", message:"API docs updated, new endpoints are live in the sandbox. Let me know if you hit any issues.", timestamp:ts(10,45) },

  { id:"msg-s1", channelId:"dm-sarah", userId:"user-2", userName:"Sarah Johnson", message:"Hey! Do you have a minute to talk about the project timeline? 😅", timestamp:ts(10,0) },
  { id:"msg-s2", channelId:"dm-sarah", userId:"user-1", userName:"John Doe",      message:"Sure! What's on your mind?", timestamp:ts(10,2) },
  { id:"msg-s3", channelId:"dm-sarah", userId:"user-2", userName:"Sarah Johnson", message:"I think we need to push the launch by one week — the design review is taking longer than expected.", timestamp:ts(10,3) },
  { id:"msg-s4", channelId:"dm-sarah", userId:"user-2", userName:"Sarah Johnson", message:"Also the client wants to add a parallax hero section to the landing page 😬", timestamp:ts(10,30) },

  { id:"msg-em1", channelId:"dm-emily", userId:"user-4", userName:"Emily Davis", message:"Hi John! The API docs are ready for your review.", timestamp:ts(9,30) },
  { id:"msg-em2", channelId:"dm-emily", userId:"user-4", userName:"Emily Davis", message:"Also, I noticed a bug in the auth flow — can we hop on a quick call?", timestamp:ts(10,0) },
  { id:"msg-em3", channelId:"dm-emily", userId:"user-4", userName:"Emily Davis", message:"@John are you available around 2 PM?", timestamp:ts(10,15) },

  { id:"msg-m1", channelId:"dm-mike", userId:"user-3", userName:"Mike Chen", message:"Hey, just pushed the auth changes. Looks clean!", timestamp:ts(9,45) },
  { id:"msg-m2", channelId:"dm-mike", userId:"user-1", userName:"John Doe",  message:"Nice! I'll review the PR this afternoon.", timestamp:ts(10,0) },
];

const voiceRooms: VoiceRoom[] = [
  { id:"voice-design", name:"Design Voice", participants:["Sarah Johnson","Mike Chen"], speaking:["Sarah Johnson"] },
  { id:"voice-lounge", name:"Lounge",        participants:["Alex Turner"],              speaking:[] },
];

const pinnedAnnouncement = mockMessages.find(m => m.id === "msg-a1")!;

const onlineMembers = [
  { name:"Sarah Johnson", status:"active", activity:"In Design Voice 🎙" },
  { name:"Mike Chen",     status:"active", activity:"In Design Voice" },
  { name:"Emily Davis",   status:"active", activity:"Browsing engineering" },
  { name:"Alex Turner",   status:"idle",   activity:"In Lounge" },
  { name:"Tom Blake",     status:"dnd",    activity:"Do not disturb" },
];

const channelSummaries: Record<string, { topics: string[]; decisions: string[]; actions: string[] }> = {
  "ch-general": {
    topics:    ["Client review readiness", "Staging deployment status", "Brand asset updates"],
    decisions: ["Updated brief confirmed by Sarah", "Staging build #247 live and ready for QA"],
    actions:   ["Add new brand assets to Figma (Sarah)", "Review mobile spacing issue (Emily)"],
  },
  "ch-design": {
    topics:    ["New header designs (v3)", "Mobile nav drawer improvements", "CTA button color palette"],
    decisions: ["v3 spacing significantly better than v2", "CTA color discussion deferred to sync"],
    actions:   ["Fix mobile nav drawer layout (Sarah)", "Finalize CTA colors in today's sync"],
  },
  "ch-engineering": {
    topics:    ["Staging build #247", "API documentation update"],
    decisions: ["All CI tests passing — ready for QA", "New endpoints live in sandbox"],
    actions:   ["QA staging build #247", "Report API endpoint issues to Emily"],
  },
  "ch-announcements": {
    topics:    ["Q2 Sprint planning announcement"],
    decisions: ["Meeting scheduled Friday at 3 PM EST"],
    actions:   ["Review backlog before Friday", "Check prep doc in files tab"],
  },
  "dm-sarah": {
    topics:    ["Project timeline slip", "Parallax hero section request"],
    decisions: ["Launch may need a one-week delay"],
    actions:   ["Discuss timeline adjustment with team", "Scope the parallax hero section"],
  },
  "dm-emily": {
    topics:    ["API docs ready for review", "Auth flow bug", "Scheduling a 2 PM call"],
    decisions: ["API documentation is complete and ready"],
    actions:   ["Review API docs", "Investigate auth flow bug", "Confirm 2 PM availability"],
  },
  "dm-mike": {
    topics:    ["Auth changes merged to staging"],
    decisions: ["Auth changes look clean"],
    actions:   ["Review Mike's PR this afternoon"],
  },
};

const QUICK_EMOJIS = ["👍","👎","❤️","🔥","🎉","😂","😮","😢","👀","✅","💯","🚀","🙌","⚡","🎯","💡"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString("en-US", { hour:"numeric", minute:"2-digit" });
}

function formatDuration(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  return `${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
}

function avatarBg(name: string) {
  const colors = ["#3B82F6","#10B981","#F59E0B","#8B5CF6","#EC4899","#14B8A6","#F97316","#0f5fd7"];
  let h = 0; for (const c of name) h = c.charCodeAt(0) + ((h << 5) - h);
  return colors[Math.abs(h) % colors.length];
}

function Av({ name, size = 28, online }: { name: string; size?: number; online?: boolean }) {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2);
  return (
    <div className="relative flex-shrink-0" style={{ width:size, height:size }}>
      <div className="w-full h-full rounded-full flex items-center justify-center text-white"
        style={{ background:avatarBg(name), fontSize:size*0.38, fontWeight:600 }}>
        {initials}
      </div>
      {online !== undefined && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
          style={{ borderColor:"var(--card)", background:online ? "var(--status-active)" : "var(--status-limited)" }} />
      )}
    </div>
  );
}

function UnreadBadge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="ml-auto flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-white text-[10px] font-medium"
      style={{ background:"var(--rally-brand)" }}>
      {count > 9 ? "9+" : count}
    </span>
  );
}

// ── Toast Container ───────────────────────────────────────────────────────────

function ToastContainer({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: string) => void }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none" style={{ maxWidth:320 }}>
      {toasts.map(t => (
        <div key={t.id} className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-[10px] shadow-lg pointer-events-auto"
          style={{
            background: t.variant==="error" ? "var(--error-soft)" : t.variant==="success" ? "var(--success-soft)" : "var(--card)",
            border: "1px solid var(--border)",
            color: t.variant==="error" ? "var(--error-on)" : t.variant==="success" ? "var(--success-on)" : "var(--foreground)",
          }}>
          <span className="text-[12px] flex-1 leading-relaxed">{t.msg}</span>
          <button onClick={() => onDismiss(t.id)} className="opacity-50 hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0">
            <X className="size-3" />
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Emoji Picker ──────────────────────────────────────────────────────────────

function EmojiPicker({ onSelect, onClose }: { onSelect: (e: string) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);
  return (
    <div ref={ref} className="absolute right-0 bottom-full mb-1 z-50 flex flex-wrap gap-0.5 p-2 rounded-[10px] shadow-lg"
      style={{ width:200, background:"var(--card)", border:"1px solid var(--border)" }}>
      {QUICK_EMOJIS.map(e => (
        <button key={e} onClick={() => { onSelect(e); onClose(); }}
          className="text-[15px] rounded-[5px] p-1 w-8 h-8 flex items-center justify-center transition-colors hover:bg-muted">
          {e}
        </button>
      ))}
    </div>
  );
}

// ── Dividers ──────────────────────────────────────────────────────────────────

function SidebarDivider() {
  return <div className="mx-3 my-2" style={{ height:1, background:"var(--border-subtle)" }} />;
}

function MsgDivider({ label, brand }: { label: string; brand?: boolean }) {
  return (
    <div className="flex items-center gap-2 px-4 my-2">
      <div className="flex-1" style={{ height:1, background:brand ? "var(--rally-brand)" : "var(--border)" }} />
      <span className="text-[11px] font-medium flex-shrink-0 px-1"
        style={{ color:brand ? "var(--rally-brand-on)" : "var(--text-tertiary)" }}>
        — {label} —
      </span>
      <div className="flex-1" style={{ height:1, background:brand ? "var(--rally-brand)" : "var(--border)" }} />
    </div>
  );
}

function PanelDivider() {
  return <div className="mx-4 my-3" style={{ height:1, background:"var(--border-subtle)" }} />;
}

// ── Voice Room Screen ─────────────────────────────────────────────────────────

function VoiceRoomScreen({
  room, user, micMuted, onToggleMic, onLeave, onOpenChannel, notify,
}: {
  room: VoiceRoom;
  user: { id: string; name: string } | null;
  micMuted: boolean;
  onToggleMic: () => void;
  onLeave: () => void;
  onOpenChannel: (id: string) => void;
  notify: (msg: string, v?: "success"|"error"|"info") => void;
}) {
  const [elapsed,       setElapsed]       = useState(0);
  const [deafened,      setDeafened]      = useState(false);
  const [videoOn,       setVideoOn]       = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [activeSpeakers,setActiveSpeakers]= useState<Set<string>>(new Set(room.speaking));

  useEffect(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const allP = [...room.participants, user?.name ?? "John Doe"];
    const t = setInterval(() => {
      const s = new Set<string>();
      allP.forEach(p => { if (Math.random() > 0.65) s.add(p); });
      setActiveSpeakers(s);
      setTimeout(() => setActiveSpeakers(new Set()), 900);
    }, 2200);
    return () => clearInterval(t);
  }, [room.participants, user]);

  const allParticipants = [...room.participants, user?.name ?? "John Doe"];

  return (
    <div className="h-full flex flex-col" style={{ background:"var(--background)" }}>
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3"
        style={{ borderBottom:"1px solid var(--border)", background:"var(--card)" }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background:"var(--success-soft)" }}>
          <Volume2 className="size-4" style={{ color:"var(--status-active)" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-medium text-foreground">{room.name}</p>
          <p className="text-[11px] text-muted-foreground">
            {formatDuration(elapsed)} · {allParticipants.length} participant{allParticipants.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button onClick={() => onOpenChannel("ch-general")} title="Open text chat"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[7px] text-[11px] transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
          style={{ border:"1px solid var(--border)" }}>
          <MessageSquare className="size-3.5" /> Chat
        </button>
      </div>

      <div className="flex-1 overflow-auto flex items-center justify-center p-8">
        <div className={`grid gap-6 w-full max-w-2xl ${allParticipants.length <= 2 ? "grid-cols-2" : "grid-cols-3"}`}>
          {allParticipants.map(p => {
            const isSelf = p === (user?.name ?? "John Doe");
            const isSpeaking = activeSpeakers.has(p);
            const isMuted = isSelf && micMuted;
            return (
              <div key={p} className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="rounded-[18px] flex items-center justify-center transition-all duration-200"
                    style={{
                      width:96, height:96, background:"var(--muted)",
                      boxShadow: isSpeaking
                        ? `0 0 0 3px var(--status-active), 0 0 20px 4px color-mix(in srgb, var(--status-active) 25%, transparent)`
                        : "0 0 0 2px var(--border)",
                    }}>
                    <Av name={p} size={72} />
                  </div>
                  {isMuted && (
                    <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2"
                      style={{ background:"var(--error-solid)", borderColor:"var(--background)" }}>
                      <MicOff className="size-3 text-white" />
                    </div>
                  )}
                  {isSpeaking && !isMuted && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5 items-end">
                      {[3,5,4,6,3].map((h, i) => (
                        <span key={i} className="w-[3px] rounded-full"
                          style={{ height:h, background:"var(--status-active)", animation:`pulse ${0.4+i*0.08}s ease-in-out infinite alternate` }} />
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-[12px] font-medium text-foreground">{isSelf ? "You" : p}</p>
                  {isSpeaking && !isMuted && <p className="text-[10px]" style={{ color:"var(--status-active)" }}>speaking</p>}
                  {isMuted && <p className="text-[10px] text-muted-foreground">muted</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-shrink-0 px-4 py-5 flex items-center justify-center gap-4"
        style={{ borderTop:"1px solid var(--border)", background:"var(--card)" }}>
        {[
          { icon: micMuted ? MicOff : Volume2, label: micMuted ? "Unmute" : "Mute", active: micMuted, activeStyle:"error", action: onToggleMic },
          { icon: deafened ? VolumeX : Headphones, label: deafened ? "Undeafen" : "Deafen", active: deafened, activeStyle:"error", action: () => { setDeafened(v=>!v); notify(deafened ? "Headphones on" : "You are now deafened"); } },
          { icon: videoOn ? Video : VideoOff, label: "Camera", active: videoOn, activeStyle:"brand", action: () => { setVideoOn(v=>!v); notify(videoOn ? "Camera off" : "Camera on", videoOn ? "info" : "success"); } },
          { icon: Monitor, label: "Share", active: screenSharing, activeStyle:"info", action: () => { setScreenSharing(v=>!v); notify(screenSharing ? "Screen share stopped" : "Screen sharing started", screenSharing ? "info" : "success"); } },
        ].map(({ icon: Icon, label, active, activeStyle, action }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <button onClick={action} title={label}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: active
                  ? activeStyle==="brand" ? "var(--rally-brand-soft)" : activeStyle==="info" ? "var(--info-soft)" : "var(--error-soft)"
                  : "var(--muted)",
                color: active
                  ? activeStyle==="brand" ? "var(--rally-brand-on)" : activeStyle==="info" ? "var(--info-on)" : "var(--error-on)"
                  : "var(--muted-foreground)",
              }}>
              <Icon className="size-5" />
            </button>
            <span className="text-[10px] text-muted-foreground">{label}</span>
          </div>
        ))}
        <div className="flex flex-col items-center gap-1.5">
          <button onClick={() => { onLeave(); notify("Left voice channel"); }} title="Leave"
            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors text-white"
            style={{ background:"var(--error-solid)" }}>
            <PhoneOff className="size-5" />
          </button>
          <span className="text-[10px] text-muted-foreground">Leave</span>
        </div>
      </div>
    </div>
  );
}

// ── Right Panel ───────────────────────────────────────────────────────────────

function RightPanel({
  mode, channel, messages, mutedChannels, onToggleMute, onClose, notify, onOpenDm, canManage,
}: {
  mode: PanelMode;
  channel: Channel;
  messages: ChatMessage[];
  mutedChannels: Set<string>;
  onToggleMute: (id: string) => void;
  onClose: () => void;
  notify: (msg: string, v?: "success"|"error"|"info") => void;
  onOpenDm: (name: string) => void;
  canManage: boolean;
}) {
  // Summary loading simulation
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryReady,   setSummaryReady]   = useState(false);
  const [notifPref, setNotifPref] = useState<"all"|"mentions"|"nothing">("all");
  const [blocked,   setBlocked]   = useState(false);

  useEffect(() => {
    if (mode !== "summary") { setSummaryReady(false); return; }
    setSummaryLoading(true);
    setSummaryReady(false);
    const t = setTimeout(() => { setSummaryLoading(false); setSummaryReady(true); }, 1600);
    return () => clearTimeout(t);
  }, [mode, channel.id]);

  const panelTitles: Record<PanelMode, string> = {
    pins:    "Pinned Messages",
    summary: "AI Summary",
    members: "Online Now",
    settings: channel.type === "dm" ? `${channel.name}` : `#${channel.name} Settings`,
  };

  const pinnedMsgs   = messages.filter(m => m.channelId === channel.id && m.pinned);
  const summary      = channelSummaries[channel.id];
  const isMuted      = mutedChannels.has(channel.id);

  const statusDot: Record<string, string> = {
    active:"var(--status-active)", idle:"var(--status-limited)", dnd:"var(--status-disabled)",
  };

  return (
    <aside className="h-full flex flex-col flex-shrink-0 overflow-hidden"
      style={{ width:240, background:"var(--card)", borderLeft:"1px solid var(--border)" }}>

      {/* Panel header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3"
        style={{ borderBottom:"1px solid var(--border)" }}>
        <p className="text-[12px] font-medium text-foreground truncate">{panelTitles[mode]}</p>
        <button onClick={onClose} className="w-6 h-6 flex items-center justify-center rounded-[5px] transition-colors text-muted-foreground hover:text-foreground hover:bg-muted flex-shrink-0">
          <X className="size-3.5" />
        </button>
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto">

        {/* ── PINS ── */}
        {mode === "pins" && (
          <div className="p-4 space-y-3">
            {pinnedMsgs.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-8 text-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background:"var(--muted)" }}>
                  <Pin className="size-4 text-muted-foreground" />
                </div>
                <p className="text-[12px] font-medium text-foreground">No pinned messages</p>
                <p className="text-[11px] text-muted-foreground">Pin important messages so they're easy to find.</p>
              </div>
            ) : pinnedMsgs.map(m => (
              <button key={m.id}
                onClick={() => notify(`Jumped to message from ${m.userName}`)}
                className="w-full flex flex-col gap-1.5 p-3 rounded-[10px] text-left transition-colors hover:bg-muted"
                style={{ border:"1px solid var(--border)" }}>
                <div className="flex items-center gap-2">
                  <Av name={m.userName} size={18} />
                  <span className="text-[11px] font-medium text-foreground">{m.userName}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground">{formatTime(m.timestamp)}</span>
                </div>
                <p className="text-[12px] text-muted-foreground leading-snug line-clamp-3">{m.message}</p>
                {m.attachment && (
                  <div className="flex items-center gap-1.5 mt-0.5 px-2 py-1 rounded-[5px]"
                    style={{ background:"var(--muted)" }}>
                    <FileText className="size-3" style={{ color:"var(--info-solid)" }} />
                    <span className="text-[10px] text-muted-foreground truncate">{m.attachment.name}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* ── SUMMARY ── */}
        {mode === "summary" && (
          <div className="p-4">
            {summaryLoading ? (
              <div className="flex flex-col items-center gap-3 py-10">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background:"var(--rally-brand-soft)" }}>
                  <Sparkles className="size-4" style={{ color:"var(--rally-brand)" }} />
                </div>
                <div className="space-y-2 w-full">
                  {[80,60,90,50,70].map((w,i) => (
                    <div key={i} className="h-2.5 rounded-full animate-pulse" style={{ width:`${w}%`, background:"var(--muted)" }} />
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground">Generating summary…</p>
              </div>
            ) : summaryReady && summary ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-2.5 rounded-[8px]" style={{ background:"var(--rally-brand-soft)" }}>
                  <Sparkles className="size-3.5 flex-shrink-0" style={{ color:"var(--rally-brand)" }} />
                  <p className="text-[11px]" style={{ color:"var(--rally-brand-on)" }}>AI-generated summary</p>
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color:"var(--text-overline)" }}>Topics covered</p>
                  <ul className="space-y-1">
                    {summary.topics.map((t,i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background:"var(--rally-brand)" }} />
                        <span className="text-[12px] text-foreground">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <PanelDivider />

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color:"var(--text-overline)" }}>Decisions made</p>
                  <ul className="space-y-1">
                    {summary.decisions.map((d,i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCheck className="size-3 mt-0.5 flex-shrink-0" style={{ color:"var(--status-active)" }} />
                        <span className="text-[12px] text-foreground">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <PanelDivider />

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color:"var(--text-overline)" }}>Action items</p>
                  <ul className="space-y-1">
                    {summary.actions.map((a,i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-3.5 h-3.5 rounded-[3px] border flex-shrink-0 mt-0.5"
                          style={{ borderColor:"var(--border)" }} />
                        <span className="text-[12px] text-foreground">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ── MEMBERS (text channels only) ── */}
        {mode === "members" && (
          <div className="p-4 space-y-1">
            {onlineMembers.map(m => (
              <button key={m.name}
                onClick={() => { onOpenDm(m.name); notify(`Opening DM with ${m.name}…`); }}
                className="w-full flex items-center gap-2.5 px-2 py-2 rounded-[8px] transition-colors hover:bg-muted text-left">
                <div className="relative flex-shrink-0">
                  <Av name={m.name} size={28} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                    style={{ borderColor:"var(--card)", background:statusDot[m.status] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-foreground truncate">{m.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{m.activity}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── SETTINGS – text channel ── */}
        {mode === "settings" && channel.type === "text" && (
          <div className="py-3">
            {/* Channel info */}
            <div className="px-4 pb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-[8px] flex items-center justify-center" style={{ background:"var(--muted)" }}>
                  <Hash className="size-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-foreground">#{channel.name}</p>
                  <p className="text-[11px] text-muted-foreground">{channel.members.length} members</p>
                </div>
              </div>
              {channel.topic && (
                <p className="text-[12px] text-muted-foreground leading-snug">{channel.topic}</p>
              )}
            </div>

            <PanelDivider />

            {/* Notifications */}
            <div className="px-4 pb-3 space-y-3">
              <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color:"var(--text-overline)" }}>Notifications</p>

              {/* Mute toggle */}
              <button onClick={() => { onToggleMute(channel.id); notify(isMuted ? "Channel unmuted" : "Channel muted"); }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] transition-colors hover:bg-muted"
                style={{ border:"1px solid var(--border)" }}>
                <div className="flex items-center gap-2">
                  {isMuted ? <BellOff className="size-4 text-muted-foreground" /> : <Bell className="size-4 text-muted-foreground" />}
                  <span className="text-[12px] text-foreground">Mute channel</span>
                </div>
                <div className="w-8 h-4.5 rounded-full transition-colors flex items-center px-0.5"
                  style={{ background:isMuted ? "var(--rally-brand)" : "var(--border)", width:32, height:18 }}>
                  <div className="w-3.5 h-3.5 rounded-full bg-white transition-transform"
                    style={{ transform: isMuted ? "translateX(14px)" : "translateX(0)" }} />
                </div>
              </button>

              {/* Notification level */}
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground px-0.5">Notify me about</p>
                {(["all","mentions","nothing"] as const).map(pref => (
                  <button key={pref} onClick={() => { setNotifPref(pref); notify(`Notifications set to: ${pref}`); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] transition-colors hover:bg-muted text-left"
                    style={notifPref===pref ? { background:"var(--rally-brand-soft)", border:"1px solid var(--rally-brand)" } : { border:"1px solid transparent" }}>
                    <div className="w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center"
                      style={{ borderColor:notifPref===pref ? "var(--rally-brand)" : "var(--border)" }}>
                      {notifPref===pref && <div className="w-2 h-2 rounded-full" style={{ background:"var(--rally-brand)" }} />}
                    </div>
                    <span className="text-[12px] text-foreground capitalize">{pref==="nothing" ? "Nothing" : pref==="all" ? "All messages" : "Mentions only"}</span>
                  </button>
                ))}
              </div>
            </div>

            <PanelDivider />

            {/* Actions */}
            <div className="px-4 pb-3 space-y-0.5">
              <p className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color:"var(--text-overline)" }}>Actions</p>
              <button onClick={() => { navigator.clipboard?.writeText(`rally://ch/${channel.id}`); notify("Invite link copied!", "success"); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] transition-colors hover:bg-muted text-left">
                <Link2 className="size-3.5 text-muted-foreground" />
                <span className="text-[12px] text-foreground">Copy invite link</span>
              </button>
              {canManage && (
                <button onClick={() => notify("Channel editor opened", "info")}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] transition-colors hover:bg-muted text-left">
                  <Edit2 className="size-3.5 text-muted-foreground" />
                  <span className="text-[12px] text-foreground">Edit channel</span>
                </button>
              )}
              <button onClick={() => notify("Left channel", "info")}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] transition-colors hover:bg-muted text-left">
                <LogOut className="size-3.5 text-muted-foreground" />
                <span className="text-[12px] text-foreground">Leave channel</span>
              </button>
            </div>

            {canManage && (
              <>
                <PanelDivider />
                <div className="px-4 pb-3">
                  <button onClick={() => notify("Delete channel dialog opened", "error")}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] transition-colors hover:bg-muted text-left">
                    <Trash2 className="size-3.5" style={{ color:"var(--error-solid)" }} />
                    <span className="text-[12px]" style={{ color:"var(--error-solid)" }}>Delete channel</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── SETTINGS – DM ── */}
        {mode === "settings" && channel.type === "dm" && (
          <div className="py-4">
            {/* Profile block */}
            <div className="px-4 pb-4 flex flex-col items-center text-center gap-2">
              <Av name={channel.name} size={56} online />
              <p className="text-[14px] font-medium text-foreground mt-1">{channel.name}</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:"var(--status-active)" }} />
                <span className="text-[11px] text-muted-foreground">Active now</span>
              </div>
              <button
                onClick={() => notify(`Viewing ${channel.name}'s profile`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-[11px] font-medium transition-colors text-white mt-1"
                style={{ background:"var(--rally-brand)" }}>
                View full profile
              </button>
            </div>

            <PanelDivider />

            {/* Mute conversation */}
            <div className="px-4 pb-4 space-y-2">
              <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color:"var(--text-overline)" }}>Conversation</p>
              <button onClick={() => { onToggleMute(channel.id); notify(isMuted ? "Conversation unmuted" : "Conversation muted"); }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] transition-colors hover:bg-muted"
                style={{ border:"1px solid var(--border)" }}>
                <div className="flex items-center gap-2">
                  {isMuted ? <BellOff className="size-4 text-muted-foreground" /> : <Bell className="size-4 text-muted-foreground" />}
                  <span className="text-[12px] text-foreground">Mute conversation</span>
                </div>
                <div className="w-8 rounded-full transition-colors flex items-center px-0.5"
                  style={{ background:isMuted ? "var(--rally-brand)" : "var(--border)", width:32, height:18 }}>
                  <div className="w-3.5 h-3.5 rounded-full bg-white transition-transform"
                    style={{ transform: isMuted ? "translateX(14px)" : "translateX(0)" }} />
                </div>
              </button>

              <button onClick={() => notify(`Notification sound set to: ${isMuted ? "off" : "on"}`)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] transition-colors hover:bg-muted text-left">
                <Copy className="size-3.5 text-muted-foreground" />
                <span className="text-[12px] text-foreground">Copy user link</span>
              </button>
            </div>

            <PanelDivider />

            {/* Moderation */}
            <div className="px-4 pb-4 space-y-0.5">
              <p className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color:"var(--text-overline)" }}>Moderation</p>
              <button
                onClick={() => { setBlocked(v => !v); notify(blocked ? `${channel.name} unblocked` : `${channel.name} blocked`, blocked ? "success" : "info"); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] transition-colors hover:bg-muted text-left">
                <UserX className="size-3.5 text-muted-foreground" />
                <span className="text-[12px] text-foreground">{blocked ? "Unblock user" : "Block user"}</span>
              </button>
              <button onClick={() => notify("Chat history cleared")}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] transition-colors hover:bg-muted text-left">
                <Trash2 className="size-3.5 text-muted-foreground" />
                <span className="text-[12px] text-foreground">Clear chat history</span>
              </button>
              <button onClick={() => notify("Report submitted — our team will review this shortly")}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] transition-colors hover:bg-muted text-left">
                <Flag className="size-3.5" style={{ color:"var(--error-solid)" }} />
                <span className="text-[12px]" style={{ color:"var(--error-solid)" }}>Report conversation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

// ── Chat Sidebar ──────────────────────────────────────────────────────────────

function ChatSidebar({
  channels, selectedId, onSelect, inVoiceRoom, onJoinVoice, onLeaveVoice,
  micMuted, onToggleMic, user, canManage, mutedChannels, notify, onMarkAllRead,
}: {
  channels: Channel[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  inVoiceRoom: string | null;
  onJoinVoice: (id: string) => void;
  onLeaveVoice: () => void;
  micMuted: boolean;
  onToggleMic: () => void;
  user: { name: string } | null;
  canManage: boolean;
  mutedChannels: Set<string>;
  notify: (msg: string, v?: "success"|"error"|"info") => void;
  onMarkAllRead: () => void;
}) {
  const navigate = useNavigate();
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [searchVal,      setSearchVal]      = useState("");
  const [dmCollapsed,    setDmCollapsed]    = useState(false);
  const [chCollapsed,    setChCollapsed]    = useState(false);
  const [voiceCollapsed, setVoiceCollapsed] = useState(false);
  const [inviteRoomId,   setInviteRoomId]   = useState<string|null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const textChs     = channels.filter(c => c.type === "text");
  const dms         = channels.filter(c => c.type === "dm");
  const totalUnread = channels.reduce((acc,c) => acc + c.unread, 0);

  const filteredText = searchVal ? textChs.filter(c => c.name.toLowerCase().includes(searchVal.toLowerCase())) : textChs;
  const filteredDms  = searchVal ? dms.filter(c  => c.name.toLowerCase().includes(searchVal.toLowerCase())) : dms;

  return (
    <aside className="h-full flex flex-col flex-shrink-0"
      style={{ width:258, background:"var(--card)", borderRight:"1px solid var(--border)" }}>

      {/* Header */}
      <div className="flex-shrink-0 px-3 py-3" style={{ borderBottom:"1px solid var(--border)" }}>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-foreground">Design Team</span>
          <div className="flex items-center gap-0.5">
            <button title="Search" onClick={() => { setSearchOpen(v=>!v); setTimeout(()=>searchRef.current?.focus(),50); }}
              className={`w-7 h-7 flex items-center justify-center rounded-[7px] transition-colors ${searchOpen ? "text-[var(--rally-brand-on)]" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
              style={searchOpen ? { background:"var(--rally-brand-soft)" } : {}}>
              <Search className="size-4" />
            </button>
            <button title="New DM" onClick={() => notify("Opening new direct message…", "info")}
              className="w-7 h-7 flex items-center justify-center rounded-[7px] transition-colors text-muted-foreground hover:text-foreground hover:bg-muted">
              <Plus className="size-4" />
            </button>
            <button title="Mark all read" onClick={() => { onMarkAllRead(); notify("All messages marked as read ✓", "success"); }}
              className="w-7 h-7 flex items-center justify-center rounded-[7px] transition-colors text-muted-foreground hover:text-foreground hover:bg-muted">
              <CheckCheck className="size-4" />
            </button>
          </div>
        </div>

        {/* Collapsible search */}
        {searchOpen && (
          <div className="mt-2 flex items-center gap-2 px-2 py-1.5 rounded-[8px]"
            style={{ border:"1px solid var(--rally-brand)", background:"var(--background)" }}>
            <Search className="size-3.5 text-muted-foreground flex-shrink-0" />
            <input ref={searchRef} value={searchVal} onChange={e => setSearchVal(e.target.value)}
              placeholder="Search channels & DMs…"
              className="flex-1 bg-transparent text-[12px] text-foreground placeholder:text-muted-foreground outline-none" />
            <button onClick={() => { setSearchOpen(false); setSearchVal(""); }}
              className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="size-3" />
            </button>
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto py-2">

        {/* Inbox */}
        <div className="px-2 mb-1">
          <div role="button" tabIndex={0}
            onClick={() => onSelect(null)}
            onKeyDown={e => e.key==="Enter" && onSelect(null)}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[9px] transition-colors cursor-pointer ${selectedId===null && !inVoiceRoom ? "text-[var(--rally-brand-on)]" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
            style={selectedId===null && !inVoiceRoom ? { background:"var(--rally-brand-soft)" } : {}}>
            <Inbox className="size-4 flex-shrink-0" />
            <span className="text-[13px]">Inbox</span>
            {totalUnread > 0 && <UnreadBadge count={totalUnread} />}
          </div>
        </div>

        <SidebarDivider />

        {/* Direct Messages */}
        <div className="px-2 mt-1">
          <div className="flex items-center justify-between px-2 py-1.5">
            <button onClick={() => setDmCollapsed(v=>!v)}
              className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest transition-colors text-muted-foreground hover:text-foreground">
              <ChevronDown className={`size-3 transition-transform duration-150 ${dmCollapsed ? "-rotate-90" : ""}`} />
              Direct Messages
            </button>
            <button title="New DM" onClick={() => notify("Opening new direct message…", "info")}
              className="p-0.5 rounded transition-colors text-muted-foreground hover:text-foreground hover:bg-muted">
              <Plus className="size-3.5" />
            </button>
          </div>
          {!dmCollapsed && (
            <div className="space-y-0.5 mt-0.5">
              {filteredDms.map(dm => (
                <div key={dm.id} role="button" tabIndex={0}
                  onClick={() => onSelect(dm.id)}
                  onKeyDown={e => e.key==="Enter" && onSelect(dm.id)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[9px] transition-colors cursor-pointer ${selectedId===dm.id ? "text-[var(--rally-brand-on)]" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                  style={selectedId===dm.id ? { background:"var(--rally-brand-soft)" } : {}}>
                  <Av name={dm.name} size={22} online={["Sarah Johnson","Mike Chen","Emily Davis"].includes(dm.name)} />
                  <span className={`flex-1 text-[13px] text-left truncate ${dm.unread ? "font-medium text-foreground" : ""}`}>{dm.name}</span>
                  <UnreadBadge count={dm.unread} />
                </div>
              ))}
            </div>
          )}
        </div>

        <SidebarDivider />

        {/* Text Channels */}
        <div className="px-2 mt-1">
          <div className="flex items-center justify-between px-2 py-1.5">
            <button onClick={() => setChCollapsed(v=>!v)}
              className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest transition-colors text-muted-foreground hover:text-foreground">
              <ChevronDown className={`size-3 transition-transform duration-150 ${chCollapsed ? "-rotate-90" : ""}`} />
              Text Channels
            </button>
            {canManage && (
              <button title="Add channel" onClick={() => notify("Create channel opened", "info")}
                className="p-0.5 rounded transition-colors text-muted-foreground hover:text-foreground hover:bg-muted">
                <Plus className="size-3.5" />
              </button>
            )}
          </div>
          {!chCollapsed && (
            <div className="space-y-0.5 mt-0.5">
              {filteredText.map(ch => (
                <div key={ch.id} role="button" tabIndex={0}
                  onClick={() => onSelect(ch.id)}
                  onKeyDown={e => e.key==="Enter" && onSelect(ch.id)}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-[9px] transition-colors cursor-pointer ${selectedId===ch.id ? "text-[var(--rally-brand-on)]" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                  style={selectedId===ch.id ? { background:"var(--rally-brand-soft)" } : {}}>
                  <Hash className="size-3.5 flex-shrink-0" />
                  <span className={`flex-1 text-[13px] text-left truncate ${ch.unread && !mutedChannels.has(ch.id) ? "font-medium text-foreground" : ""}`}>{ch.name}</span>
                  {mutedChannels.has(ch.id) && <BellOff className="size-3 text-muted-foreground opacity-40 flex-shrink-0" />}
                  {!mutedChannels.has(ch.id) && <UnreadBadge count={ch.unread} />}
                </div>
              ))}
              {filteredText.length === 0 && searchVal && (
                <p className="px-4 py-2 text-[12px] text-muted-foreground">No channels found</p>
              )}
            </div>
          )}
        </div>

        <SidebarDivider />

        {/* Voice Channels */}
        <div className="px-2 mt-1">
          <div className="flex items-center justify-between px-2 py-1.5">
            <button onClick={() => setVoiceCollapsed(v=>!v)}
              className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest transition-colors text-muted-foreground hover:text-foreground">
              <ChevronDown className={`size-3 transition-transform duration-150 ${voiceCollapsed ? "-rotate-90" : ""}`} />
              Voice Channels
            </button>
            <button title="Add voice channel" onClick={() => notify("Create voice channel opened", "info")}
              className="p-0.5 rounded transition-colors text-muted-foreground hover:text-foreground hover:bg-muted">
              <Plus className="size-3.5" />
            </button>
          </div>
          {!voiceCollapsed && (
            <div className="space-y-1.5 mt-0.5">
              {voiceRooms.map(room => {
                const joined = inVoiceRoom === room.id;
                const notInRoom = ["Sarah Johnson","Mike Chen","Emily Davis","Alex Turner"].filter(p => !room.participants.includes(p));
                return (
                  <div key={room.id} className="rounded-[9px] overflow-hidden"
                    style={{ border:"1px solid var(--border)", background:"var(--background)" }}>
                    <div className="flex items-center gap-2 px-2.5 py-2">
                      <Volume2 className="size-3.5 flex-shrink-0"
                        style={{ color:room.participants.length > 0 ? "var(--status-active)" : "var(--text-secondary)" }} />
                      <span className="flex-1 text-[13px] text-foreground text-left truncate">{room.name}</span>
                      {room.participants.length > 0 && (
                        <span className="text-[10px] text-muted-foreground">{room.participants.length}</span>
                      )}
                      {/* Invite button */}
                      <button title="Invite to voice"
                        onClick={e => { e.stopPropagation(); setInviteRoomId(inviteRoomId===room.id ? null : room.id); }}
                        className={`w-5 h-5 flex items-center justify-center rounded transition-colors ${inviteRoomId===room.id ? "text-[var(--rally-brand-on)]" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                        style={inviteRoomId===room.id ? { background:"var(--rally-brand-soft)" } : {}}>
                        <UserPlus className="size-3" />
                      </button>
                      {!joined ? (
                        <button onClick={() => onJoinVoice(room.id)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-[5px] text-white text-[10px] flex-shrink-0 transition-colors"
                          style={{ background:"var(--rally-brand)" }}>
                          <Play className="size-2.5" /> Join
                        </button>
                      ) : (
                        <button onClick={onLeaveVoice}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-[5px] text-[10px] flex-shrink-0 transition-colors hover:bg-muted"
                          style={{ border:"1px solid var(--border)", color:"var(--text-secondary)" }}>
                          Leave
                        </button>
                      )}
                    </div>

                    {/* Invite picker */}
                    {inviteRoomId === room.id && (
                      <div className="px-2.5 pb-2.5 pt-0.5" style={{ borderTop:"1px solid var(--border-subtle)" }}>
                        <p className="text-[10px] text-muted-foreground mb-1.5 px-0.5">Invite to {room.name}</p>
                        {notInRoom.length === 0 ? (
                          <p className="text-[11px] text-muted-foreground px-0.5">Everyone is already here!</p>
                        ) : notInRoom.map(member => (
                          <button key={member}
                            onClick={() => { notify(`Invite sent to ${member} for ${room.name} 🎙`, "success"); setInviteRoomId(null); }}
                            className="w-full flex items-center gap-2 py-1.5 px-1 rounded-[6px] transition-colors hover:bg-muted">
                            <Av name={member} size={18} />
                            <span className="text-[12px] text-foreground">{member}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Participants */}
                    {room.participants.length > 0 && (
                      <div className="pb-2 px-3 space-y-1">
                        {room.participants.map(p => (
                          <div key={p} className="flex items-center gap-2">
                            <Av name={p} size={18} />
                            <span className="text-[11px] text-muted-foreground flex-1 truncate">{p}</span>
                            {room.speaking.includes(p) && (
                              <span className="flex gap-0.5 items-end h-3">
                                {[1,2,3].map(i => (
                                  <span key={i} className="w-0.5 rounded-full"
                                    style={{ height:[6,10,7][i-1], background:"var(--status-active)", animation:`pulse ${0.6+i*0.15}s ease-in-out infinite alternate` }} />
                                ))}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Me bar */}
      <div className="flex-shrink-0 px-3 py-2.5" style={{ borderTop:"1px solid var(--border)" }}>
        {inVoiceRoom && (
          <div className="mb-2 px-2.5 py-2 rounded-[9px] flex items-center gap-2"
            style={{ background:"var(--success-soft)", border:"1px solid var(--status-active)" }}>
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:"var(--status-active)" }} />
            <span className="text-[11px] flex-1 truncate" style={{ color:"var(--success-on)" }}>
              {voiceRooms.find(r=>r.id===inVoiceRoom)?.name}
            </span>
            <button onClick={onToggleMic} title={micMuted ? "Unmute" : "Mute"}
              className="text-muted-foreground hover:text-foreground transition-colors">
              {micMuted ? <MicOff className="size-3.5" /> : <Volume2 className="size-3.5" />}
            </button>
            <button onClick={onLeaveVoice} title="Leave voice"
              className="text-muted-foreground hover:text-foreground transition-colors">
              <PhoneOff className="size-3.5" />
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Av name={user?.name ?? "User"} size={28} online />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-foreground truncate">{user?.name}</p>
            <p className="text-[10px] text-muted-foreground">Active</p>
          </div>
          <button onClick={() => navigate("/app/profile")} title="Settings"
            className="text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="size-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

// ── Inbox view ────────────────────────────────────────────────────────────────

function InboxView({
  onOpenChannel, onMarkAllRead, onJoinVoice, notify,
}: {
  onOpenChannel: (id: string) => void;
  onMarkAllRead: () => void;
  onJoinVoice:   (id: string) => void;
  notify: (msg: string, v?: "success"|"error"|"info") => void;
}) {
  const mentions = [
    { id:"ch-design", label:"@mention in #design",   from:"Sarah Johnson", preview:"@John can you review the new header design?",   time:"1h ago" },
    { id:"dm-emily",  label:"Direct message",         from:"Emily Davis",   preview:"@John are you available around 2 PM?",          time:"45m ago" },
    { id:"dm-sarah",  label:"Direct message",         from:"Sarah Johnson", preview:"Also the client wants to add a parallax hero…", time:"30m ago" },
  ];

  return (
    <div className="h-full overflow-y-auto px-5 py-5 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-medium text-foreground">Inbox</h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">Here's where you need to act</p>
        </div>
        <button onClick={() => { onMarkAllRead(); notify("All channels marked as read ✓", "success"); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12px] transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
          style={{ border:"1px solid var(--border)" }}>
          <CheckCheck className="size-3.5" />
          <span>Mark all read</span>
        </button>
      </div>

      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest mb-3" style={{ color:"var(--text-overline)" }}>Mentions</h2>
        <div className="space-y-2">
          {mentions.map(item => (
            <div key={item.id}
              className="flex items-start gap-3 p-3 rounded-[12px] cursor-pointer group transition-colors hover:bg-muted"
              style={{ border:"1px solid var(--border)", background:"var(--card)" }}
              onClick={() => onOpenChannel(item.id)}>
              <Av name={item.from} size={34} online />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[12px] font-medium text-foreground">{item.from}</span>
                  <span className="text-[11px] text-muted-foreground">{item.label}</span>
                  <span className="ml-auto text-[11px] text-muted-foreground flex-shrink-0">{item.time}</span>
                </div>
                <p className="text-[12px] text-muted-foreground truncate">{item.preview}</p>
              </div>
              <button
                className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-[7px] text-white text-[11px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background:"var(--rally-brand)" }}
                onClick={e => { e.stopPropagation(); onOpenChannel(item.id); }}>
                <Reply className="size-3" /> Reply
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest mb-3" style={{ color:"var(--text-overline)" }}>Active Meetings</h2>
        <div className="grid grid-cols-2 gap-3">
          {voiceRooms.map(room => (
            <div key={room.id} className="p-3 rounded-[12px]" style={{ border:"1px solid var(--border)", background:"var(--card)" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-[7px] flex items-center justify-center" style={{ background:"var(--info-soft)" }}>
                  <Volume2 className="size-3.5" style={{ color:"var(--info-on)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-foreground truncate">{room.name}</p>
                  <p className="text-[10px] text-muted-foreground">{room.participants.length} in room</p>
                </div>
                {room.participants.length > 0 && (
                  <span className="w-2 h-2 rounded-full" style={{ background:"var(--status-active)" }} />
                )}
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="flex -space-x-1">
                  {room.participants.slice(0,3).map(p => (
                    <div key={p} title={p} className="rounded-full"
                      style={{ width:22, height:22, border:"2px solid var(--card)" }}>
                      <div className="w-full h-full rounded-full flex items-center justify-center text-white text-[8px]"
                        style={{ background:avatarBg(p) }}>
                        {p.charAt(0)}
                      </div>
                    </div>
                  ))}
                </div>
                <span className="text-[11px] text-muted-foreground flex-1 truncate">{room.participants.join(", ")}</span>
              </div>
              <button onClick={() => onJoinVoice(room.id)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-[7px] text-white text-[11px] font-medium"
                style={{ background:"var(--rally-brand)" }}>
                <Play className="size-3" /> Join Room
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest mb-3" style={{ color:"var(--text-overline)" }}>Important & Pinned</h2>
        <div className="p-3 rounded-[12px]" style={{ border:"1px solid var(--border)", background:"var(--card)" }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
              style={{ background:"var(--rally-brand-soft)" }}>
              <Pin className="size-4" style={{ color:"var(--rally-brand)" }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Av name={pinnedAnnouncement.userName} size={18} />
                <span className="text-[12px] font-medium text-foreground">{pinnedAnnouncement.userName}</span>
                <span className="text-[11px] text-muted-foreground">in #announcements</span>
              </div>
              <p className="text-[12px] text-foreground leading-relaxed">{pinnedAnnouncement.message}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="h-4" />
    </div>
  );
}

// ── Message Item ──────────────────────────────────────────────────────────────

function MessageItem({
  msg, allMessages, isOwn, canDelete, onReply, onEdit, onDelete, notify,
}: {
  msg: ChatMessage; allMessages: ChatMessage[]; isOwn: boolean; canDelete: boolean;
  onReply: (m: ChatMessage) => void; onEdit: (m: ChatMessage) => void;
  onDelete: (id: string) => void;
  notify: (msg: string, v?: "success"|"error"|"info") => void;
}) {
  const [reactions, setReactions]           = useState(msg.reactions ?? []);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const replyMsg = msg.replyTo ? allMessages.find(m => m.id === msg.replyTo) : null;

  const addReaction = (emoji: string) => {
    setReactions(prev => {
      const ex = prev.find(r => r.emoji===emoji);
      if (ex) return prev.map(r => r.emoji===emoji ? {...r,count:r.count+(r.reacted?-1:1),reacted:!r.reacted} : r).filter(r=>r.count>0);
      return [...prev, {emoji,count:1,reacted:true}];
    });
  };

  return (
    <div className="group flex gap-3 px-4 py-1.5 hover:bg-muted/40 rounded-[8px] transition-colors">
      <div className="flex-shrink-0 mt-0.5"><Av name={msg.userName} size={30} /></div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-medium text-foreground">{msg.userName}</span>
          <span className="text-[10px] text-muted-foreground">{formatTime(msg.timestamp)}</span>
          {msg.edited  && <span className="text-[10px] text-muted-foreground">(edited)</span>}
          {msg.pinned  && <Pin className="size-3 text-muted-foreground" />}
        </div>
        {replyMsg && (
          <div className="flex items-center gap-1.5 mb-1 pl-2" style={{ borderLeft:"2px solid var(--border)" }}>
            <Av name={replyMsg.userName} size={14} />
            <span className="text-[11px] text-muted-foreground truncate">{replyMsg.userName}: {replyMsg.message}</span>
          </div>
        )}
        <p className="text-[13px] text-foreground leading-relaxed">{msg.message}</p>
        {msg.attachment && (
          <button onClick={() => notify(`Opening ${msg.attachment!.name}…`)}
            className="mt-1.5 flex items-center gap-2 px-3 py-2 rounded-[8px] w-fit transition-colors hover:bg-muted"
            style={{ border:"1px solid var(--border)", background:"var(--background)" }}>
            <FileText className="size-4" style={{ color:"var(--info-solid)" }} />
            <div className="text-left">
              <p className="text-[12px] font-medium text-foreground">{msg.attachment.name}</p>
              <p className="text-[10px] text-muted-foreground">{msg.attachment.size}</p>
            </div>
          </button>
        )}
        {reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {reactions.map((r,i) => (
              <button key={i}
                onClick={() => setReactions(prev => prev.map((rx,ri) => ri===i ? {...rx,count:rx.count+(rx.reacted?-1:1),reacted:!rx.reacted} : rx).filter(rx=>rx.count>0))}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] transition-colors"
                style={r.reacted ? {border:"1px solid var(--rally-brand)",background:"var(--rally-brand-soft)",color:"var(--rally-brand-on)"} : {border:"1px solid var(--border)",background:"var(--muted)",color:"var(--foreground)"}}>
                {r.emoji} {r.count}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-start gap-0.5 flex-shrink-0 pt-0.5">
        <button onClick={() => onReply(msg)} title="Reply"
          className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <Reply className="size-3.5" />
        </button>
        <div className="relative">
          <button onClick={() => setShowEmojiPicker(v=>!v)} title="React"
            className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
            <Smile className="size-3.5" />
          </button>
          {showEmojiPicker && <EmojiPicker onSelect={addReaction} onClose={() => setShowEmojiPicker(false)} />}
        </div>
        {isOwn && (
          <button onClick={() => onEdit(msg)} title="Edit"
            className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
            <Edit2 className="size-3.5" />
          </button>
        )}
        {(isOwn || canDelete) && (
          <button onClick={() => { onDelete(msg.id); notify("Message deleted"); }} title="Delete"
            className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
            <Trash2 className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Channel View ──────────────────────────────────────────────────────────────

function ChannelView({
  channel, messages, user, canWrite, canDelete,
  activePanel, onPanelToggle, notify,
}: {
  channel: Channel;
  messages: ChatMessage[];
  user: { id: string; name: string } | null;
  canWrite: boolean; canDelete: boolean;
  activePanel: PanelMode | null;
  onPanelToggle: (mode: PanelMode) => void;
  notify: (msg: string, v?: "success"|"error"|"info") => void;
}) {
  const [allMessages,       setAllMessages]       = useState(messages);
  const [input,             setInput]             = useState("");
  const [replyingTo,        setReplyingTo]        = useState<ChatMessage | null>(null);
  const [editingMsg,        setEditingMsg]        = useState<ChatMessage | null>(null);
  const [searchVal,         setSearchVal]         = useState("");
  const [searchOpen,        setSearchOpen]        = useState(false);
  const [typing,            setTyping]            = useState(false);
  const [composerEmojiOpen, setComposerEmojiOpen] = useState(false);
  const bottomRef   = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLTextAreaElement>(null);
  const searchRef   = useRef<HTMLInputElement>(null);

  useEffect(() => { setAllMessages(messages); }, [messages]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [allMessages]);
  useEffect(() => {
    if (channel.type !== "dm") return;
    const t  = setTimeout(() => setTyping(true),  3000);
    const t2 = setTimeout(() => setTyping(false), 6000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [channel.id]);

  const visibleMessages = allMessages.filter(m =>
    m.channelId === channel.id &&
    (!searchVal.trim() || m.message.toLowerCase().includes(searchVal.toLowerCase()))
  );
  const unreadDividerIndex = channel.unread > 0 ? Math.max(0, visibleMessages.length - channel.unread - 1) : -1;

  const handleSend = () => {
    if (!input.trim() || !canWrite) return;
    if (editingMsg) {
      setAllMessages(prev => prev.map(m => m.id===editingMsg.id ? {...m,message:input,edited:true} : m));
      setEditingMsg(null);
    } else {
      setAllMessages(prev => [...prev, {
        id:`msg-${Date.now()}`, channelId:channel.id,
        userId:user?.id ?? "user-1", userName:user?.name ?? "John Doe",
        message:input, timestamp:new Date().toISOString(),
        replyTo:replyingTo?.id,
      }]);
      setReplyingTo(null);
    }
    setInput(""); inputRef.current?.focus();
  };

  const insertAtCursor = (text: string) => {
    const el = inputRef.current;
    if (!el) { setInput(i=>i+text); return; }
    const start = el.selectionStart ?? input.length;
    const end   = el.selectionEnd   ?? input.length;
    setInput(input.slice(0,start) + text + input.slice(end));
    setTimeout(() => { el.focus(); el.setSelectionRange(start+text.length, start+text.length); }, 0);
  };

  const headerBtnCls = (panel: PanelMode) =>
    `w-7 h-7 flex items-center justify-center rounded-[7px] transition-colors ${activePanel===panel ? "text-[var(--rally-brand-on)]" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`;
  const headerBtnStyle = (panel: PanelMode) =>
    activePanel === panel ? { background:"var(--rally-brand-soft)" } : {};

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3"
        style={{ borderBottom:"1px solid var(--border)", background:"var(--card)" }}>
        {channel.type === "text" && <Hash className="size-4 text-muted-foreground flex-shrink-0" />}
        {channel.type === "dm"   && <Av name={channel.name} size={24} online />}
        <div className="flex-1 min-w-0">
          <h2 className="text-[14px] font-medium text-foreground leading-none">{channel.name}</h2>
          {channel.topic && <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{channel.topic}</p>}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Search */}
          {searchOpen ? (
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
              <input ref={searchRef} value={searchVal} onChange={e=>setSearchVal(e.target.value)}
                onBlur={() => { if (!searchVal) setSearchOpen(false); }}
                placeholder="Search…"
                className="pl-7 pr-3 h-7 w-36 rounded-[7px] text-[12px] text-foreground placeholder:text-muted-foreground outline-none"
                style={{ border:"1px solid var(--rally-brand)", background:"var(--background)" }} />
            </div>
          ) : (
            <button title="Search" onClick={() => { setSearchOpen(true); setTimeout(()=>searchRef.current?.focus(),50); }}
              className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <Search className="size-4" />
            </button>
          )}

          {/* Pin → opens pins panel */}
          <button title="Pinned messages" onClick={() => onPanelToggle("pins")}
            className={headerBtnCls("pins")} style={headerBtnStyle("pins")}>
            <Pin className="size-4" />
          </button>

          {/* Summarize → opens summary panel */}
          {channel.allowAi && (
            <button title="AI Summarize" onClick={() => onPanelToggle("summary")}
              className={`flex items-center gap-1 px-2 h-7 rounded-[7px] text-[11px] transition-colors ${activePanel==="summary" ? "text-[var(--rally-brand-on)]" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
              style={{ ...(activePanel==="summary" ? { background:"var(--rally-brand-soft)" } : { border:"1px solid var(--border)" }) }}>
              <Sparkles className="size-3.5" /> Summarize
            </button>
          )}

          {/* Members → text channels only → opens members panel */}
          {channel.type === "text" && (
            <button title="Members" onClick={() => onPanelToggle("members")}
              className={headerBtnCls("members")} style={headerBtnStyle("members")}>
              <Users className="size-4" />
            </button>
          )}

          {/* Settings (3-dots) → opens settings panel */}
          <button title={channel.type==="dm" ? "Conversation settings" : "Channel settings"}
            onClick={() => onPanelToggle("settings")}
            className={headerBtnCls("settings")} style={headerBtnStyle("settings")}>
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-3">
        <div className="px-4 pb-4 mb-2" style={{ borderBottom:"1px solid var(--border-subtle)" }}>
          {channel.type === "dm"
            ? <div className="flex flex-col items-start gap-2">
                <Av name={channel.name} size={48} />
                <p className="text-[15px] font-medium text-foreground">{channel.name}</p>
                <p className="text-[12px] text-muted-foreground">This is the beginning of your direct message history with {channel.name}.</p>
              </div>
            : <div>
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-2" style={{ background:"var(--muted)" }}>
                  <Hash className="size-5 text-muted-foreground" />
                </div>
                <p className="text-[15px] font-medium text-foreground">#{channel.name}</p>
                {channel.topic && <p className="text-[12px] text-muted-foreground mt-0.5">{channel.topic}</p>}
              </div>
          }
        </div>

        <MsgDivider label="Today" />

        {visibleMessages.map((msg,i) => (
          <div key={msg.id}>
            {i===unreadDividerIndex+1 && <MsgDivider label="New Messages" brand />}
            <MessageItem
              msg={msg} allMessages={visibleMessages}
              isOwn={msg.userId===(user?.id ?? "user-1")}
              canDelete={canDelete} notify={notify}
              onReply={m=>{setReplyingTo(m);setEditingMsg(null);inputRef.current?.focus();}}
              onEdit={m=>{setEditingMsg(m);setInput(m.message);setReplyingTo(null);inputRef.current?.focus();}}
              onDelete={id=>setAllMessages(prev=>prev.filter(m=>m.id!==id))}
            />
          </div>
        ))}

        {typing && (
          <div className="flex items-center gap-3 px-4 py-1.5">
            <Av name={channel.name} size={22} />
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-muted-foreground">{channel.name} is typing</span>
              <span className="flex gap-0.5 ml-1">
                {[0,1,2].map(i => (
                  <span key={i} className="w-1 h-1 rounded-full bg-muted-foreground"
                    style={{ animation:`bounce 0.8s ease-in-out ${i*0.15}s infinite alternate` }} />
                ))}
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      {canWrite ? (
        <div className="flex-shrink-0 px-4 pb-4 pt-2">
          {(replyingTo || editingMsg) && (
            <div className="flex items-center gap-2 mb-2 px-3 py-2 rounded-[8px] bg-muted"
              style={{ border:"1px solid var(--border)" }}>
              {replyingTo && <><Reply className="size-3.5 text-muted-foreground" /><span className="text-[12px] text-muted-foreground flex-1 truncate">Replying to {replyingTo.userName}: {replyingTo.message}</span></>}
              {editingMsg  && <><Edit2 className="size-3.5 text-muted-foreground" /><span className="text-[12px] text-muted-foreground flex-1">Editing message</span></>}
              <button onClick={() => {setReplyingTo(null);setEditingMsg(null);setInput("");}} className="text-muted-foreground hover:text-foreground">
                <X className="size-3.5" />
              </button>
            </div>
          )}
          <div className="flex items-end gap-2 p-2 rounded-[12px] transition-colors"
            style={{ border:"1px solid var(--border)", background:"var(--background)" }}
            onFocus={e=>(e.currentTarget.style.borderColor="var(--rally-brand)")}
            onBlur={e=>(e.currentTarget.style.borderColor="var(--border)")}>
            <div className="flex gap-1 pb-1.5 pl-1">
              <button title="Attach file" onClick={() => notify("File upload — select a file from your device", "info")}
                className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Paperclip className="size-4" />
              </button>
              <button title="Mention" onClick={() => insertAtCursor("@")}
                className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <AtSign className="size-4" />
              </button>
              <div className="relative">
                <button title="Emoji" onClick={() => setComposerEmojiOpen(v=>!v)}
                  className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <Smile className="size-4" />
                </button>
                {composerEmojiOpen && (
                  <EmojiPicker onSelect={e=>{insertAtCursor(e);setComposerEmojiOpen(false);}} onClose={()=>setComposerEmojiOpen(false)} />
                )}
              </div>
            </div>
            <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();handleSend();}}}
              placeholder={`Message ${channel.type==="dm" ? channel.name : `#${channel.name}`}…`}
              rows={1}
              className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none resize-none max-h-32 py-1.5"
              style={{ lineHeight:"1.5" }}
            />
            <div className="flex gap-1 pb-1.5 pr-1">
              {channel.allowAi && (
                <button title="AI suggestion"
                  onClick={() => {
                    const s = channelSummaries[channel.id];
                    if (s) setInput(`Based on our conversation: ${s.actions[0]}`);
                    notify("AI suggestion inserted — review before sending", "info");
                    inputRef.current?.focus();
                  }}
                  className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted transition-colors"
                  style={{ color:"var(--rally-brand)" }}>
                  <Sparkles className="size-4" />
                </button>
              )}
              <button onClick={handleSend} disabled={!input.trim()}
                className="w-7 h-7 flex items-center justify-center rounded-[6px] text-white transition-colors disabled:opacity-40"
                style={{ background:input.trim() ? "var(--rally-brand)" : "var(--border)" }}>
                <Send className="size-4" />
              </button>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5 px-1">
            <kbd className="px-1 py-0.5 rounded text-[10px]" style={{ border:"1px solid var(--border)" }}>Enter</kbd> to send ·{" "}
            <kbd className="px-1 py-0.5 rounded text-[10px]" style={{ border:"1px solid var(--border)" }}>Shift+Enter</kbd> for new line
          </p>
        </div>
      ) : (
        <div className="flex-shrink-0 px-4 pb-4 pt-2">
          <div className="flex items-center gap-2 px-4 py-3 rounded-[12px] text-muted-foreground text-[13px]"
            style={{ border:"1px solid var(--border)", background:"var(--muted)" }}>
            <Circle className="size-4" />
            You don't have permission to send messages here.
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function ChatV2() {
  const { user, userRole, hasPermission } = useAuth();
  const { setSecondarySidebar } = useSecondarySidebar();

  useEffect(() => {
    setSecondarySidebar(null);
    return () => setSecondarySidebar(null);
  }, []);

  const [channels,          setChannels]         = useState<Channel[]>(mockChannels);
  const [selectedChannelId, setSelectedChannelId]= useState<string | null>(null);
  const [inVoiceRoom,       setInVoiceRoom]       = useState<string | null>(null);
  const [micMuted,          setMicMuted]          = useState(false);
  const [mutedChannels,     setMutedChannels]     = useState<Set<string>>(new Set());
  const [rightPanelMode,    setRightPanelMode]    = useState<PanelMode | null>(null);
  const [toasts,            setToasts]            = useState<ToastItem[]>([]);

  const canManage = hasPermission("manage_groups");
  const canDelete = hasPermission("delete");
  const isViewer  = userRole === "viewer";

  const notify = useCallback((msg: string, variant?: "success"|"error"|"info") => {
    const id = `t-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev.slice(-3), { id, msg, variant }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleChannelMute = useCallback((id: string) => {
    setMutedChannels(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const selectedChannel = channels.find(c => c.id === selectedChannelId) ?? null;

  const canWrite = selectedChannel
    ? (userRole ? selectedChannel.members.includes("user-1") && !isViewer : false)
    : false;

  const handleSelectChannel = useCallback((id: string | null) => {
    setSelectedChannelId(id);
    if (id) setChannels(prev => prev.map(c => c.id===id ? {...c,unread:0} : c));
  }, []);

  const handleMarkAllRead = useCallback(() => {
    setChannels(prev => prev.map(c => ({...c, unread:0})));
  }, []);

  const handleJoinVoice = useCallback((id: string) => {
    setInVoiceRoom(id);
    setSelectedChannelId(null);
  }, []);

  const handleLeaveVoice = useCallback(() => {
    setInVoiceRoom(null);
    setMicMuted(false);
  }, []);

  const handleOpenDm = useCallback((name: string) => {
    const dm = mockChannels.find(c => c.type==="dm" && c.name===name);
    if (dm) handleSelectChannel(dm.id);
  }, [handleSelectChannel]);

  // Panel toggle: same panel = close; different = switch
  const handlePanelToggle = useCallback((mode: PanelMode) => {
    setRightPanelMode(prev => prev === mode ? null : mode);
  }, []);

  const channelMessages    = mockMessages.filter(m => m.channelId === selectedChannelId);
  const activeVoiceRoom    = voiceRooms.find(r => r.id === inVoiceRoom) ?? null;
  const showVoiceScreen    = !!activeVoiceRoom && selectedChannelId === null;
  const rightPanelVisible  = !!rightPanelMode && !!selectedChannel;

  if (isViewer) {
    return (
      <div className="h-full flex items-center justify-center" style={{ background:"var(--background)" }}>
        <div className="text-center p-8">
          <div className="w-12 h-12 rounded-[14px] flex items-center justify-center mx-auto mb-4" style={{ background:"var(--muted)" }}>
            <MessageSquare className="size-6 text-muted-foreground" />
          </div>
          <p className="text-[14px] font-medium text-foreground mb-1">Chat is read-only for Viewers</p>
          <p className="text-[13px] text-muted-foreground">Upgrade your role to participate in conversations.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-full flex flex-row overflow-hidden"
        style={{
          background:   "var(--background)",
          borderRadius: "var(--radius-lg)",
          boxShadow:    "0 0 0 1px var(--border)",
        }}>

        <ChatSidebar
          channels={channels}
          selectedId={selectedChannelId}
          onSelect={handleSelectChannel}
          inVoiceRoom={inVoiceRoom}
          onJoinVoice={handleJoinVoice}
          onLeaveVoice={handleLeaveVoice}
          micMuted={micMuted}
          onToggleMic={() => setMicMuted(v=>!v)}
          user={user}
          canManage={canManage}
          mutedChannels={mutedChannels}
          notify={notify}
          onMarkAllRead={handleMarkAllRead}
        />

        <main className="flex-1 min-w-0 overflow-hidden">
          {showVoiceScreen ? (
            <VoiceRoomScreen
              room={activeVoiceRoom}
              user={user}
              micMuted={micMuted}
              onToggleMic={() => setMicMuted(v=>!v)}
              onLeave={handleLeaveVoice}
              onOpenChannel={handleSelectChannel}
              notify={notify}
            />
          ) : selectedChannel ? (
            <ChannelView
              channel={selectedChannel}
              messages={channelMessages}
              user={user}
              canWrite={canWrite}
              canDelete={canDelete}
              activePanel={rightPanelMode}
              onPanelToggle={handlePanelToggle}
              notify={notify}
            />
          ) : (
            <InboxView
              onOpenChannel={handleSelectChannel}
              onMarkAllRead={handleMarkAllRead}
              onJoinVoice={handleJoinVoice}
              notify={notify}
            />
          )}
        </main>

        {/* Context-aware right panel */}
        {rightPanelVisible && rightPanelMode && selectedChannel && (
          <RightPanel
            mode={rightPanelMode}
            channel={selectedChannel}
            messages={channelMessages}
            mutedChannels={mutedChannels}
            onToggleMute={toggleChannelMute}
            onClose={() => setRightPanelMode(null)}
            notify={notify}
            onOpenDm={handleOpenDm}
            canManage={canManage}
          />
        )}
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}

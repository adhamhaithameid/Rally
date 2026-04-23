import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router";
import {
  Search, Plus, Mic, MicOff, Headphones, Hash, Volume2, X,
  ChevronDown, Send, Paperclip, Smile, Bot, Sparkles,
  Pin, Users, FileText, Calendar, CheckSquare,
  MoreHorizontal, Reply, Edit2, Trash2, Settings,
  Inbox, Circle, ArrowRight, Phone, Play, AtSign,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useSecondarySidebar } from "../contexts/SecondarySidebarContext";

// ── Types ─────────────────────────────────────────────────────────────────────

type ChannelType = "text" | "voice" | "dm";

interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  topic?: string;
  unread: number;
  dmUserId?: string;
  allowAi: boolean;
  members: string[];
  pinned?: string[];
}

interface Reaction { emoji: string; count: number; reacted: boolean }

interface ChatMessage {
  id: string;
  channelId: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  reactions?: Reaction[];
  attachment?: { name: string; type: "file" | "image"; size: string };
  replyTo?: string;
  edited?: boolean;
  pinned?: boolean;
}

interface VoiceRoom { id: string; name: string; participants: string[]; speaking: string[] }
interface OnlineMember { name: string; status: "active" | "idle" | "dnd"; activity: string }
interface SharedItem { id: string; type: "file" | "task" | "event"; name: string; from: string; time: string; channelId: string }

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockChannels: Channel[] = [
  { id: "ch-general",       name: "general",       type: "text",  topic: "Team-wide updates and conversation",     unread: 2, allowAi: true,  members: ["user-1","user-2","user-3","user-4"] },
  { id: "ch-announcements", name: "announcements", type: "text",  topic: "Important updates from leadership",      unread: 0, allowAi: false, members: ["user-1","user-2","user-3","user-4","user-5"] },
  { id: "ch-design",        name: "design",        type: "text",  topic: "Design work, Figma files, and feedback", unread: 5, allowAi: true,  members: ["user-1","user-2","user-4"], pinned: ["msg-d2"] },
  { id: "ch-engineering",   name: "engineering",   type: "text",  topic: "Code, PRs, staging, and deployment",     unread: 1, allowAi: true,  members: ["user-1","user-3","user-4"] },
  { id: "dm-sarah",         name: "Sarah Johnson", type: "dm",    unread: 1, allowAi: true,  members: ["user-1","user-2"], dmUserId: "user-2" },
  { id: "dm-mike",          name: "Mike Chen",     type: "dm",    unread: 0, allowAi: true,  members: ["user-1","user-3"], dmUserId: "user-3" },
  { id: "dm-emily",         name: "Emily Davis",   type: "dm",    unread: 3, allowAi: true,  members: ["user-1","user-4"], dmUserId: "user-4" },
];

const today = new Date().toISOString().slice(0, 10);
function ts(h: number, m: number) { return `${today}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00`; }

const mockMessages: ChatMessage[] = [
  // #general
  { id:"msg-g1", channelId:"ch-general", userId:"user-2", userName:"Sarah Johnson", message:"Good morning team! Ready for the client review today? 🎉", timestamp:ts(9,0), reactions:[{emoji:"👋",count:3,reacted:false},{emoji:"🔥",count:1,reacted:false}] },
  { id:"msg-g2", channelId:"ch-general", userId:"user-3", userName:"Mike Chen", message:"Morning! Just pushed the latest changes to staging 🚀", timestamp:ts(9,3) },
  { id:"msg-g3", channelId:"ch-general", userId:"user-4", userName:"Emily Davis", message:"I'll join the call a few minutes late — wrapping up the API docs.", timestamp:ts(9,10) },
  { id:"msg-g4", channelId:"ch-general", userId:"user-1", userName:"John Doe", message:"No worries Emily. Sarah, did you get the updated brief from Alex?", timestamp:ts(9,15) },
  { id:"msg-g5", channelId:"ch-general", userId:"user-2", userName:"Sarah Johnson", message:"Yes got it! @John should I add the new brand assets to the Figma too?", timestamp:ts(9,18) },
  // unread below
  { id:"msg-g6", channelId:"ch-general", userId:"user-3", userName:"Mike Chen", message:"The staging build is live btw — link in the engineering channel.", timestamp:ts(10,30), reactions:[{emoji:"✅",count:2,reacted:true}] },
  { id:"msg-g7", channelId:"ch-general", userId:"user-4", userName:"Emily Davis", message:"Looks great! Found a minor spacing issue on mobile though, opening an issue now.", timestamp:ts(10,45) },

  // #design
  { id:"msg-d1", channelId:"ch-design", userId:"user-2", userName:"Sarah Johnson", message:"New header designs are up in Figma 👇 Would love early feedback!", timestamp:ts(8,45), attachment:{name:"Website_Header_v3.fig",type:"file",size:"8.4 MB"}, reactions:[{emoji:"👀",count:4,reacted:false}] },
  { id:"msg-d2", channelId:"ch-design", userId:"user-3", userName:"Mike Chen", message:"Love the direction! The spacing feels much better than v2. @John thoughts?", timestamp:ts(9,0), pinned:true },
  { id:"msg-d3", channelId:"ch-design", userId:"user-2", userName:"Sarah Johnson", message:"@John can you review the new header design when you get a chance? I added notes in the comments.", timestamp:ts(9,5) },
  // unread below
  { id:"msg-d4", channelId:"ch-design", userId:"user-4", userName:"Emily Davis", message:"Just checked the Figma — the mobile version needs a bit of work on the nav drawer.", timestamp:ts(10,0) },
  { id:"msg-d5", channelId:"ch-design", userId:"user-2", userName:"Sarah Johnson", message:"On it! Should be updated within the hour 💪", timestamp:ts(10,15) },
  { id:"msg-d6", channelId:"ch-design", userId:"user-4", userName:"Emily Davis", message:"Perfect. Also — can we discuss the color choices for the CTA buttons in today's sync?", timestamp:ts(10,20) },
  { id:"msg-d7", channelId:"ch-design", userId:"user-3", userName:"Mike Chen", message:"Added it to the agenda 👍", timestamp:ts(10,22), reactions:[{emoji:"👍",count:2,reacted:false}] },

  // #announcements (pinned)
  { id:"msg-a1", channelId:"ch-announcements", userId:"user-1", userName:"John Doe", message:"📌 Q2 Sprint planning is scheduled for **Friday at 3 PM EST**. Please review the backlog before then. Prep doc is linked in the files tab.", timestamp:ts(8,0), pinned:true },

  // #engineering
  { id:"msg-e1", channelId:"ch-engineering", userId:"user-3", userName:"Mike Chen", message:"Staging is up ✅ Build #247 — all tests passing. Ready for QA.", timestamp:ts(10,30) },
  { id:"msg-e2", channelId:"ch-engineering", userId:"user-4", userName:"Emily Davis", message:"API docs updated, new endpoints are live in the sandbox. Let me know if you hit any issues.", timestamp:ts(10,45) },

  // DM - Sarah
  { id:"msg-s1", channelId:"dm-sarah", userId:"user-2", userName:"Sarah Johnson", message:"Hey! Do you have a minute to talk about the project timeline? 😅", timestamp:ts(10,0) },
  { id:"msg-s2", channelId:"dm-sarah", userId:"user-1", userName:"John Doe", message:"Sure! What's on your mind?", timestamp:ts(10,2) },
  { id:"msg-s3", channelId:"dm-sarah", userId:"user-2", userName:"Sarah Johnson", message:"I think we need to push the launch by one week — the design review is taking longer than expected.", timestamp:ts(10,3) },
  { id:"msg-s4", channelId:"dm-sarah", userId:"user-2", userName:"Sarah Johnson", message:"Also the client wants to add a parallax hero section to the landing page 😬", timestamp:ts(10,30) },

  // DM - Emily
  { id:"msg-em1", channelId:"dm-emily", userId:"user-4", userName:"Emily Davis", message:"Hi John! The API docs are ready for your review.", timestamp:ts(9,30) },
  { id:"msg-em2", channelId:"dm-emily", userId:"user-4", userName:"Emily Davis", message:"Also, I noticed a bug in the auth flow — can we hop on a quick call?", timestamp:ts(10,0) },
  { id:"msg-em3", channelId:"dm-emily", userId:"user-4", userName:"Emily Davis", message:"@John are you available around 2 PM?", timestamp:ts(10,15) },

  // DM - Mike
  { id:"msg-m1", channelId:"dm-mike", userId:"user-3", userName:"Mike Chen", message:"Hey, just pushed the auth changes. Looks clean!", timestamp:ts(9,45) },
  { id:"msg-m2", channelId:"dm-mike", userId:"user-1", userName:"John Doe", message:"Nice! I'll review the PR this afternoon.", timestamp:ts(10,0) },
];

const voiceRooms: VoiceRoom[] = [
  { id:"voice-design", name:"Design Voice",       participants:["Sarah Johnson","Mike Chen"], speaking:["Sarah Johnson"] },
  { id:"voice-lounge", name:"Lounge",             participants:["Alex Turner"],              speaking:[] },
];

const onlineMembers: OnlineMember[] = [
  { name:"Sarah Johnson", status:"active", activity:"In Design Voice 🎙" },
  { name:"Mike Chen",     status:"active", activity:"In Design Voice" },
  { name:"Emily Davis",   status:"active", activity:"Browsing engineering" },
  { name:"Alex Turner",   status:"idle",   activity:"In Lounge" },
  { name:"Tom Blake",     status:"dnd",    activity:"Do not disturb" },
];

const sharedItems: SharedItem[] = [
  { id:"si-1", type:"file",  name:"Website_Header_v3.fig", from:"Sarah Johnson", time:"1h ago",        channelId:"ch-design" },
  { id:"si-2", type:"task",  name:"Fix mobile nav drawer",  from:"Mike Chen",    time:"2h ago",        channelId:"ch-design" },
  { id:"si-3", type:"file",  name:"Q2_Launch_Brief.pdf",    from:"John Doe",     time:"Yesterday",     channelId:"ch-general" },
  { id:"si-4", type:"event", name:"Sprint Planning — Fri 3 PM", from:"John Doe", time:"Today, 8:00 AM",channelId:"ch-announcements" },
];

const aiActions = [
  "Summarize what I missed",
  "Show messages that need a reply",
  "Turn this discussion into tasks",
  "Find the latest file mentioned in chat",
];

const pinnedAnnouncement = mockMessages.find(m => m.id === "msg-a1")!;

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString("en-US", { hour:"numeric", minute:"2-digit" });
}

function avatarBg(name: string) {
  const colors = ["#3B82F6","#10B981","#F59E0B","#8B5CF6","#EC4899","#14B8A6","#F97316","#0f5fd7"];
  let h = 0; for (const c of name) h = c.charCodeAt(0) + ((h << 5) - h);
  return colors[Math.abs(h) % colors.length];
}

function Av({ name, size = 28, online }: { name: string; size?: number; online?: boolean }) {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <div className="w-full h-full rounded-full flex items-center justify-center text-white"
        style={{ background: avatarBg(name), fontSize: size * 0.38, fontWeight: 600 }}>
        {initials}
      </div>
      {online !== undefined && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card"
          style={{ background: online ? "#0f6a43" : "#8a4f00" }} />
      )}
    </div>
  );
}

function UnreadBadge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="ml-auto flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
      style={{ background: "#ff4615" }}>
      {count > 9 ? "9+" : count}
    </span>
  );
}

// ── Chat Sidebar ──────────────────────────────────────────────────────────────

function ChatSidebar({
  channels, selectedId, onSelect, inVoiceRoom, onJoinVoice, onLeaveVoice,
  micMuted, onToggleMic, user, canManage,
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
}) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [dmCollapsed, setDmCollapsed] = useState(false);
  const [chCollapsed, setChCollapsed] = useState(false);
  const [voiceCollapsed, setVoiceCollapsed] = useState(false);

  const textChs = channels.filter(c => c.type === "text");
  const voiceChs = voiceRooms;
  const dms = channels.filter(c => c.type === "dm");

  const totalUnread = channels.reduce((acc, c) => acc + c.unread, 0);

  return (
    <aside className="h-full flex flex-col bg-card border-r border-border" style={{ width: 258, flexShrink: 0 }}>

      {/* Header */}
      <div className="flex-shrink-0 px-3 py-3 border-b border-border space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-foreground">Design Team</span>
          <div className="flex items-center gap-1">
            <button title="New DM" className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Plus className="size-4" />
            </button>
            <button title="Start voice" className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Headphones className="size-4" />
            </button>
            <Link to="/app/ai-chat" title="Open AI" className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Bot className="size-4" />
            </Link>
          </div>
        </div>
        {/* Search */}
        <div className={`flex items-center gap-2 px-2 py-1.5 rounded-[8px] border transition-colors ${searchFocused ? "border-[#ff4615]" : "border-border"} bg-background`}>
          <Search className="size-3.5 text-muted-foreground flex-shrink-0" />
          <input
            value={searchVal} onChange={e => setSearchVal(e.target.value)}
            placeholder="Search..." className="flex-1 bg-transparent text-[12px] text-foreground placeholder:text-muted-foreground outline-none"
            onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto py-2">

        {/* Inbox — pinned at top */}
        <div className="px-2 mb-1">
          <button
            onClick={() => onSelect(null)}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[9px] transition-colors ${selectedId === null ? "bg-[#fff2ed] text-[#c60f08] dark:bg-[#440608]/40 dark:text-[#ff9571]" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            <Inbox className="size-4 flex-shrink-0" />
            <span className="text-[13px]">Inbox</span>
            {totalUnread > 0 && <UnreadBadge count={totalUnread} />}
          </button>
        </div>

        <div className="mx-3 my-1 border-t border-border" />

        {/* Direct Messages */}
        <div className="px-2 mt-2">
          <button
            onClick={() => setDmCollapsed(v => !v)}
            className="w-full flex items-center gap-1 px-2 py-1.5 text-[10px] font-semibold text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors"
          >
            <ChevronDown className={`size-3 transition-transform duration-150 ${dmCollapsed ? "-rotate-90" : ""}`} />
            Direct Messages
          </button>
          {!dmCollapsed && (
            <div className="space-y-0.5 mt-0.5">
              {dms.map(dm => (
                <button key={dm.id} onClick={() => onSelect(dm.id)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[9px] transition-colors group ${selectedId === dm.id ? "bg-[#fff2ed] text-[#c60f08] dark:bg-[#440608]/40 dark:text-[#ff9571]" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                  <Av name={dm.name} size={22} online={["Sarah Johnson","Mike Chen","Emily Davis"].includes(dm.name)} />
                  <span className={`flex-1 text-[13px] text-left truncate ${dm.unread ? "font-medium text-foreground" : ""}`}>{dm.name}</span>
                  <UnreadBadge count={dm.unread} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mx-3 my-2 border-t border-border" />

        {/* Text Channels */}
        <div className="px-2 mt-1">
          <div className="flex items-center justify-between px-2 py-1.5">
            <button onClick={() => setChCollapsed(v => !v)}
              className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors">
              <ChevronDown className={`size-3 transition-transform duration-150 ${chCollapsed ? "-rotate-90" : ""}`} />
              Text Channels
            </button>
            {canManage && (
              <button title="Add channel" className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Plus className="size-3.5" />
              </button>
            )}
          </div>
          {!chCollapsed && (
            <div className="space-y-0.5 mt-0.5">
              {textChs.map(ch => (
                <button key={ch.id} onClick={() => onSelect(ch.id)}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-[9px] transition-colors group ${selectedId === ch.id ? "bg-[#fff2ed] text-[#c60f08] dark:bg-[#440608]/40 dark:text-[#ff9571]" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                  <Hash className="size-3.5 flex-shrink-0" />
                  <span className={`flex-1 text-[13px] text-left truncate ${ch.unread ? "font-medium text-foreground" : ""}`}>{ch.name}</span>
                  <UnreadBadge count={ch.unread} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mx-3 my-2 border-t border-border" />

        {/* Voice Rooms */}
        <div className="px-2 mt-1">
          <button onClick={() => setVoiceCollapsed(v => !v)}
            className="w-full flex items-center gap-1 px-2 py-1.5 text-[10px] font-semibold text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors">
            <ChevronDown className={`size-3 transition-transform duration-150 ${voiceCollapsed ? "-rotate-90" : ""}`} />
            Voice Rooms
          </button>
          {!voiceCollapsed && (
            <div className="space-y-1 mt-0.5">
              {voiceChs.map(room => {
                const joined = inVoiceRoom === room.id;
                return (
                  <div key={room.id} className="rounded-[9px] border border-border bg-background overflow-hidden">
                    <div className="flex items-center gap-2 px-2.5 py-2">
                      <Volume2 className="size-3.5 flex-shrink-0" style={{ color: room.participants.length > 0 ? "#0f6a43" : "#5f514b" }} />
                      <span className="flex-1 text-[13px] text-foreground text-left truncate">{room.name}</span>
                      {room.participants.length > 0 && (
                        <span className="text-[10px] text-muted-foreground">{room.participants.length}</span>
                      )}
                      {!joined ? (
                        <button onClick={() => onJoinVoice(room.id)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-[5px] text-white text-[10px] flex-shrink-0 transition-colors"
                          style={{ background: "#ff4615" }}>
                          <Play className="size-2.5" /> Join
                        </button>
                      ) : (
                        <button onClick={onLeaveVoice}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-[5px] border border-border text-muted-foreground text-[10px] flex-shrink-0 hover:bg-muted transition-colors">
                          Leave
                        </button>
                      )}
                    </div>
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
                                    style={{ height: [6,10,7][i-1], background: "#0f6a43", animation: `pulse ${0.6+i*0.15}s ease-in-out infinite alternate` }} />
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

      {/* Me / Voice Controls */}
      <div className="flex-shrink-0 border-t border-border px-3 py-2.5">
        {inVoiceRoom && (
          <div className="mb-2 px-2.5 py-2 rounded-[9px] border bg-[#eaf7f0] border-[#0f6a43]/30 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#0f6a43" }} />
            <span className="text-[11px] flex-1 truncate" style={{ color: "#0f6a43" }}>
              {voiceRooms.find(r => r.id === inVoiceRoom)?.name}
            </span>
            <button onClick={onToggleMic} className="text-muted-foreground hover:text-foreground transition-colors">
              {micMuted ? <MicOff className="size-3.5" /> : <Mic className="size-3.5" />}
            </button>
            <button onClick={onLeaveVoice} className="text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="size-3.5" />
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Av name={user?.name ?? "User"} size={28} online />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-foreground truncate">{user?.name}</p>
            <p className="text-[10px] text-muted-foreground">Active</p>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="size-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

// ── Inbox view ────────────────────────────────────────────────────────────────

function InboxView({
  channels, onOpenChannel, allowAi,
}: {
  channels: Channel[];
  onOpenChannel: (id: string) => void;
  allowAi: boolean;
}) {
  const needReply = [
    { id:"ch-design",  label:"@mention in #design",      from:"Sarah Johnson", preview:"@John can you review the new header design?", time:"1h ago",  unread: true },
    { id:"dm-emily",   label:"Direct message",           from:"Emily Davis",   preview:"@John are you available around 2 PM?",         time:"45m ago", unread: true },
    { id:"dm-sarah",   label:"Direct message",           from:"Sarah Johnson", preview:"Also the client wants to add a parallax hero…",  time:"30m ago", unread: true },
  ];

  const jumpBack = channels
    .filter(c => c.type !== "voice")
    .sort((a, b) => b.unread - a.unread)
    .slice(0, 5);

  const [aiDismissed, setAiDismissed] = useState<string[]>([]);

  return (
    <div className="h-full overflow-y-auto px-5 py-5 space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-medium text-foreground">Inbox</h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">Here's where you need to act</p>
        </div>
        <button className="px-3 py-1.5 rounded-[8px] border border-border text-[12px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          Mark all read
        </button>
      </div>

      {/* Need Reply */}
      <section>
        <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Need Reply</h2>
        <div className="space-y-2">
          {needReply.map(item => (
            <div key={item.id}
              className="flex items-start gap-3 p-3 rounded-[12px] border border-border bg-card hover:border-[#d1aa99] transition-colors cursor-pointer group"
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
                style={{ background: "#ff4615" }}
                onClick={e => { e.stopPropagation(); onOpenChannel(item.id); }}
              >
                <Reply className="size-3" /> Reply
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Live Now */}
      <section>
        <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Live Now</h2>
        <div className="grid grid-cols-2 gap-3">
          {voiceRooms.map(room => (
            <div key={room.id} className="p-3 rounded-[12px] border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-[7px] flex items-center justify-center" style={{ background: "#f5f3ff" }}>
                  <Volume2 className="size-3.5" style={{ color: "#8B5CF6" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-foreground truncate">{room.name}</p>
                  <p className="text-[10px] text-muted-foreground">{room.participants.length} in room</p>
                </div>
                {room.participants.length > 0 && (
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#0f6a43" }} />
                )}
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="flex -space-x-1">
                  {room.participants.slice(0, 3).map(p => (
                    <div key={p} title={p} className="border-2 border-card rounded-full" style={{ width:22, height:22 }}>
                      <div className="w-full h-full rounded-full flex items-center justify-center text-white text-[8px]"
                        style={{ background: avatarBg(p) }}>
                        {p.charAt(0)}
                      </div>
                    </div>
                  ))}
                </div>
                <span className="text-[11px] text-muted-foreground flex-1 truncate">{room.participants.join(", ")}</span>
              </div>
              <button className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-[7px] text-white text-[11px] font-medium transition-colors"
                style={{ background: "#ff4615" }}>
                <Play className="size-3" /> Join Room
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Jump Back In */}
      <section>
        <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Jump Back In</h2>
        <div className="space-y-1">
          {jumpBack.map(ch => {
            const lastMsg = mockMessages.filter(m => m.channelId === ch.id).at(-1);
            return (
              <button key={ch.id} onClick={() => onOpenChannel(ch.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] border border-border bg-card hover:bg-muted transition-colors text-left">
                {ch.type === "dm"
                  ? <Av name={ch.name} size={30} online />
                  : <div className="w-[30px] h-[30px] rounded-[7px] flex items-center justify-center flex-shrink-0 bg-muted border border-border">
                      <Hash className="size-3.5 text-muted-foreground" />
                    </div>
                }
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] text-foreground truncate ${ch.unread ? "font-medium" : ""}`}>
                    {ch.type === "dm" ? ch.name : `#${ch.name}`}
                  </p>
                  {lastMsg && (
                    <p className="text-[11px] text-muted-foreground truncate">{lastMsg.message}</p>
                  )}
                </div>
                {lastMsg && <span className="text-[10px] text-muted-foreground flex-shrink-0">{formatTime(lastMsg.timestamp)}</span>}
                <UnreadBadge count={ch.unread} />
              </button>
            );
          })}
        </div>
      </section>

      {/* Important / Pinned */}
      <section>
        <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Important & Pinned</h2>
        <div className="p-3 rounded-[12px] border border-border bg-card">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0" style={{ background:"#fff2ed" }}>
              <Pin className="size-4" style={{ color:"#ff4615" }} />
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

      {/* AI Catch-up */}
      {allowAi && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="size-3.5" style={{ color:"#ff4615" }} />
            <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">AI Catch-up</h2>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background:"#fff2ed", color:"#c60f08" }}>Beta</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {aiActions.filter(a => !aiDismissed.includes(a)).map(action => (
              <div key={action} className="flex items-center gap-1 pl-3 pr-2 py-1.5 rounded-full border border-border bg-card hover:border-[#ff4615] hover:bg-[#fff2ed] transition-colors group cursor-pointer">
                <span className="text-[12px] text-foreground">{action}</span>
                <button onClick={e => { e.stopPropagation(); setAiDismissed(d => [...d, action]); }}
                  className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">AI actions require confirmation. Only available in AI-enabled channels.</p>
        </section>
      )}

      {/* Shared in Chat */}
      <section>
        <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Shared in Chat</h2>
        <div className="space-y-2">
          {sharedItems.map(item => {
            const iconMap = { file: FileText, task: CheckSquare, event: Calendar };
            const colorMap = { file: { bg:"#eef4ff", color:"#0f5fd7" }, task: { bg:"#eaf7f0", color:"#0f6a43" }, event: { bg:"#fff4e5", color:"#8a4f00" } };
            const Icon = iconMap[item.type];
            const clr = colorMap[item.type];
            return (
              <div key={item.id} className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] border border-border bg-card hover:bg-muted transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0" style={{ background: clr.bg }}>
                  <Icon className="size-4" style={{ color: clr.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-foreground truncate">{item.name}</p>
                  <p className="text-[11px] text-muted-foreground">{item.from} · {item.time}</p>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-border text-muted-foreground capitalize flex-shrink-0">{item.type}</span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="h-4" />
    </div>
  );
}

// ── Message Item ──────────────────────────────────────────────────────────────

function MessageItem({
  msg, allMessages, isOwn, canDelete, onReply, onEdit, onDelete,
}: {
  msg: ChatMessage;
  allMessages: ChatMessage[];
  isOwn: boolean;
  canDelete: boolean;
  onReply: (m: ChatMessage) => void;
  onEdit: (m: ChatMessage) => void;
  onDelete: (id: string) => void;
}) {
  const [reactions, setReactions] = useState(msg.reactions ?? []);
  const replyMsg = msg.replyTo ? allMessages.find(m => m.id === msg.replyTo) : null;

  return (
    <div className="group flex gap-3 px-4 py-1.5 hover:bg-muted/40 rounded-[8px] transition-colors">
      <div className="flex-shrink-0 mt-0.5">
        <Av name={msg.userName} size={30} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-medium text-foreground">{msg.userName}</span>
          <span className="text-[10px] text-muted-foreground">{formatTime(msg.timestamp)}</span>
          {msg.edited && <span className="text-[10px] text-muted-foreground">(edited)</span>}
          {msg.pinned && <Pin className="size-3 text-muted-foreground" />}
        </div>
        {replyMsg && (
          <div className="flex items-center gap-1.5 mb-1 pl-2 border-l-2 border-border">
            <Av name={replyMsg.userName} size={14} />
            <span className="text-[11px] text-muted-foreground truncate">{replyMsg.userName}: {replyMsg.message}</span>
          </div>
        )}
        <p className="text-[13px] text-foreground leading-relaxed">{msg.message}</p>
        {msg.attachment && (
          <div className="mt-1.5 flex items-center gap-2 px-3 py-2 rounded-[8px] border border-border bg-background w-fit">
            <FileText className="size-4" style={{ color:"#0f5fd7" }} />
            <div>
              <p className="text-[12px] font-medium text-foreground">{msg.attachment.name}</p>
              <p className="text-[10px] text-muted-foreground">{msg.attachment.size}</p>
            </div>
          </div>
        )}
        {reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {reactions.map((r, i) => (
              <button key={i}
                onClick={() => setReactions(prev => prev.map((rx, ri) => ri === i ? { ...rx, count: rx.count + (rx.reacted ? -1 : 1), reacted: !rx.reacted } : rx))}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] transition-colors"
                style={r.reacted ? { borderColor:"#ff4615", background:"#fff2ed", color:"#c60f08" } : { borderColor:"var(--border)", background:"var(--muted)", color:"var(--foreground)" }}>
                {r.emoji} {r.count}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Hover actions */}
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button onClick={() => onReply(msg)} title="Reply" className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <Reply className="size-3.5" />
        </button>
        {isOwn && (
          <button onClick={() => onEdit(msg)} title="Edit" className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Edit2 className="size-3.5" />
          </button>
        )}
        {(isOwn || canDelete) && (
          <button onClick={() => onDelete(msg.id)} title="Delete" className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Trash2 className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Channel View ──────────────────────────────────────────────────────────────

function ChannelView({
  channel, messages, user, canWrite, canDelete, rightPanelOpen,
  onToggleRightPanel,
}: {
  channel: Channel;
  messages: ChatMessage[];
  user: { id: string; name: string } | null;
  canWrite: boolean;
  canDelete: boolean;
  rightPanelOpen: boolean;
  onToggleRightPanel: () => void;
}) {
  const [allMessages, setAllMessages] = useState(messages);
  const [input, setInput] = useState("");
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [editingMsg, setEditingMsg] = useState<ChatMessage | null>(null);
  const [searchVal, setSearchVal] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setAllMessages(messages);
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  // Simulate typing indicator for DMs
  useEffect(() => {
    if (channel.type !== "dm") return;
    const t = setTimeout(() => setTyping(true), 3000);
    const t2 = setTimeout(() => setTyping(false), 6000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [channel.id]);

  const visibleMessages = allMessages.filter(m =>
    m.channelId === channel.id &&
    (!searchVal.trim() || m.message.toLowerCase().includes(searchVal.toLowerCase()))
  );

  // Find unread divider index (last message before unread)
  const unreadDividerIndex = channel.unread > 0
    ? Math.max(0, visibleMessages.length - channel.unread - 1)
    : -1;

  const handleSend = () => {
    if (!input.trim() || !canWrite) return;
    if (editingMsg) {
      setAllMessages(prev => prev.map(m => m.id === editingMsg.id ? { ...m, message: input, edited: true } : m));
      setEditingMsg(null);
    } else {
      setAllMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        channelId: channel.id,
        userId: user?.id ?? "user-1",
        userName: user?.name ?? "John Doe",
        message: input,
        timestamp: new Date().toISOString(),
        replyTo: replyingTo?.id,
      }]);
      setReplyingTo(null);
    }
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
        {channel.type === "text" && <Hash className="size-4 text-muted-foreground flex-shrink-0" />}
        {channel.type === "dm" && <Av name={channel.name} size={24} online />}
        <div className="flex-1 min-w-0">
          <h2 className="text-[14px] font-medium text-foreground leading-none">
            {channel.type === "text" ? channel.name : channel.name}
          </h2>
          {channel.topic && (
            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{channel.topic}</p>
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
            <input value={searchVal} onChange={e => setSearchVal(e.target.value)}
              placeholder="Search…" className="pl-7 pr-3 h-7 w-36 rounded-[7px] border border-border bg-background text-[12px] text-foreground placeholder:text-muted-foreground outline-none focus:border-[#ff4615] transition-colors" />
          </div>
          <button title="Pins" className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Pin className="size-4" />
          </button>
          {channel.type === "text" && (
            <button title="Members" className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <Users className="size-4" />
            </button>
          )}
          {channel.allowAi && (
            <button title="AI Summarize" className="flex items-center gap-1 px-2 h-7 rounded-[7px] border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-[11px]">
              <Sparkles className="size-3.5" /> Summarize
            </button>
          )}
          <button onClick={onToggleRightPanel}
            className={`w-7 h-7 flex items-center justify-center rounded-[7px] transition-colors ${rightPanelOpen ? "bg-[#fff2ed] text-[#c60f08]" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}>
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-3">
        {/* Channel intro */}
        <div className="px-4 pb-4 mb-2 border-b border-border">
          {channel.type === "dm"
            ? <div className="flex flex-col items-start gap-2">
                <Av name={channel.name} size={48} />
                <p className="text-[15px] font-medium text-foreground">{channel.name}</p>
                <p className="text-[12px] text-muted-foreground">This is the beginning of your direct message history with {channel.name}.</p>
              </div>
            : <div>
                <div className="w-10 h-10 rounded-[10px] bg-muted flex items-center justify-center mb-2">
                  <Hash className="size-5 text-muted-foreground" />
                </div>
                <p className="text-[15px] font-medium text-foreground">#{channel.name}</p>
                {channel.topic && <p className="text-[12px] text-muted-foreground mt-0.5">{channel.topic}</p>}
              </div>
          }
        </div>

        {/* Today separator */}
        <div className="flex items-center gap-3 px-4 mb-2">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] font-medium text-muted-foreground flex-shrink-0">Today</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {visibleMessages.map((msg, i) => (
          <div key={msg.id}>
            {i === unreadDividerIndex + 1 && (
              <div className="flex items-center gap-3 px-4 my-2">
                <div className="flex-1 h-px" style={{ background: "#ff4615" }} />
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0" style={{ background:"#fff2ed", color:"#c60f08" }}>
                  New messages
                </span>
                <div className="flex-1 h-px" style={{ background:"#ff4615" }} />
              </div>
            )}
            <MessageItem
              msg={msg} allMessages={visibleMessages}
              isOwn={msg.userId === (user?.id ?? "user-1")}
              canDelete={canDelete}
              onReply={m => { setReplyingTo(m); setEditingMsg(null); inputRef.current?.focus(); }}
              onEdit={m => { setEditingMsg(m); setInput(m.message); setReplyingTo(null); inputRef.current?.focus(); }}
              onDelete={id => setAllMessages(prev => prev.filter(m => m.id !== id))}
            />
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex items-center gap-3 px-4 py-1.5">
            <Av name={channel.name} size={22} />
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-muted-foreground">{channel.name} is typing</span>
              <span className="flex gap-0.5 ml-1">
                {[0,1,2].map(i => (
                  <span key={i} className="w-1 h-1 rounded-full bg-muted-foreground"
                    style={{ animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite alternate` }} />
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
            <div className="flex items-center gap-2 mb-2 px-3 py-2 rounded-[8px] border border-border bg-muted">
              {replyingTo && <><Reply className="size-3.5 text-muted-foreground" /><span className="text-[12px] text-muted-foreground flex-1 truncate">Replying to {replyingTo.userName}: {replyingTo.message}</span></>}
              {editingMsg && <><Edit2 className="size-3.5 text-muted-foreground" /><span className="text-[12px] text-muted-foreground flex-1">Editing message</span></>}
              <button onClick={() => { setReplyingTo(null); setEditingMsg(null); setInput(""); }} className="text-muted-foreground hover:text-foreground"><X className="size-3.5" /></button>
            </div>
          )}
          <div className="flex items-end gap-2 p-2 rounded-[12px] border border-border bg-background focus-within:border-[#ff4615] transition-colors">
            <div className="flex gap-1 pb-1.5 pl-1">
              <button title="Attach" className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Paperclip className="size-4" />
              </button>
              <button title="Mention" className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <AtSign className="size-4" />
              </button>
              <button title="Emoji" className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Smile className="size-4" />
              </button>
            </div>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder={`Message ${channel.type === "dm" ? channel.name : `#${channel.name}`}…`}
              rows={1}
              className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none resize-none max-h-32 py-1.5"
              style={{ lineHeight: "1.5" }}
            />
            <div className="flex gap-1 pb-1.5 pr-1">
              {channel.allowAi && (
                <button title="AI assist" className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-muted transition-colors" style={{ color: "#ff4615" }}>
                  <Sparkles className="size-4" />
                </button>
              )}
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-7 h-7 flex items-center justify-center rounded-[6px] text-white transition-colors disabled:opacity-40"
                style={{ background: input.trim() ? "#ff4615" : "#d1aa99" }}
              >
                <Send className="size-4" />
              </button>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5 px-1">
            <kbd className="px-1 py-0.5 rounded border border-border text-[9px]">Enter</kbd> to send · <kbd className="px-1 py-0.5 rounded border border-border text-[9px]">Shift+Enter</kbd> for new line
          </p>
        </div>
      ) : (
        <div className="flex-shrink-0 px-4 pb-4 pt-2">
          <div className="flex items-center gap-2 px-4 py-3 rounded-[12px] border border-border bg-muted text-muted-foreground text-[13px]">
            <Circle className="size-4" />
            You don't have permission to send messages here.
          </div>
        </div>
      )}
    </div>
  );
}

// ── Right Panel ───────────────────────────────────────────────────────────────

function RightPanel({ selectedChannelId }: { selectedChannelId: string | null }) {
  const statusDot: Record<string, string> = { active:"#0f6a43", idle:"#8a4f00", dnd:"#d90000" };
  const channelPins = mockMessages.filter(m => m.channelId === selectedChannelId && m.pinned);
  const channelFiles = sharedItems.filter(s => s.channelId === selectedChannelId && s.type === "file");

  return (
    <aside className="h-full flex flex-col bg-card border-l border-border overflow-y-auto" style={{ width: 240, flexShrink: 0 }}>

      {/* Online now */}
      <div className="p-4 border-b border-border">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Online now</p>
        <div className="space-y-2">
          {onlineMembers.map(m => (
            <div key={m.name} className="flex items-center gap-2">
              <div className="relative flex-shrink-0">
                <Av name={m.name} size={28} />
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

      {/* Pinned in channel */}
      {channelPins.length > 0 && (
        <div className="p-4 border-b border-border">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Pinned</p>
          <div className="space-y-2">
            {channelPins.map(m => (
              <div key={m.id} className="flex items-start gap-2 p-2.5 rounded-[8px] border border-border bg-background">
                <Pin className="size-3 flex-shrink-0 mt-0.5" style={{ color:"#ff4615" }} />
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-foreground">{m.userName}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug mt-0.5 line-clamp-2">{m.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Files shared here */}
      {channelFiles.length > 0 && (
        <div className="p-4">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Files shared here</p>
          <div className="space-y-2">
            {channelFiles.map(f => (
              <div key={f.id} className="flex items-center gap-2 p-2.5 rounded-[8px] border border-border bg-background hover:bg-muted transition-colors cursor-pointer">
                <FileText className="size-4 flex-shrink-0" style={{ color:"#0f5fd7" }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-foreground truncate">{f.name}</p>
                  <p className="text-[10px] text-muted-foreground">{f.from} · {f.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related work shortcut */}
      <div className="p-4 mt-auto border-t border-border">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Related work</p>
        <div className="space-y-1.5">
          <Link to="/app/todo" className="flex items-center gap-2 px-2.5 py-2 rounded-[8px] hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <CheckSquare className="size-4" />
            <span className="text-[12px]">Open tasks</span>
            <ArrowRight className="size-3 ml-auto" />
          </Link>
          <Link to="/app/calendar" className="flex items-center gap-2 px-2.5 py-2 rounded-[8px] hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <Calendar className="size-4" />
            <span className="text-[12px]">View calendar</span>
            <ArrowRight className="size-3 ml-auto" />
          </Link>
          <Link to="/app/files" className="flex items-center gap-2 px-2.5 py-2 rounded-[8px] hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <FileText className="size-4" />
            <span className="text-[12px]">Browse files</span>
            <ArrowRight className="size-3 ml-auto" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function ChatV2() {
  const { user, userRole, hasPermission } = useAuth();
  const { setSecondarySidebar } = useSecondarySidebar();

  // Clear any V1 secondary sidebar
  useEffect(() => {
    setSecondarySidebar(null);
    return () => setSecondarySidebar(null);
  }, []);

  const [channels, setChannels] = useState<Channel[]>(mockChannels);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null); // null = inbox
  const [inVoiceRoom, setInVoiceRoom] = useState<string | null>(null);
  const [micMuted, setMicMuted] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  const canManage = hasPermission("manage_groups");
  const isViewer = userRole === "viewer";

  const selectedChannel = channels.find(c => c.id === selectedChannelId) ?? null;

  const canWrite = selectedChannel
    ? (userRole ? selectedChannel.members.includes("user-1") && !isViewer : false)
    : false;

  const canDelete = hasPermission("delete");

  // Mark channel as read when opened
  const handleSelectChannel = useCallback((id: string | null) => {
    setSelectedChannelId(id);
    if (id) {
      setChannels(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
    }
  }, []);

  const channelMessages = mockMessages.filter(m => m.channelId === selectedChannelId);

  if (isViewer) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <div className="w-12 h-12 rounded-[14px] bg-muted flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="size-6 text-muted-foreground" />
          </div>
          <p className="text-[14px] font-medium text-foreground mb-1">Chat is read-only for Viewers</p>
          <p className="text-[13px] text-muted-foreground">Upgrade your role to participate in conversations.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-row overflow-hidden bg-background">
      <ChatSidebar
        channels={channels}
        selectedId={selectedChannelId}
        onSelect={handleSelectChannel}
        inVoiceRoom={inVoiceRoom}
        onJoinVoice={id => setInVoiceRoom(id)}
        onLeaveVoice={() => { setInVoiceRoom(null); setMicMuted(false); }}
        micMuted={micMuted}
        onToggleMic={() => setMicMuted(v => !v)}
        user={user}
        canManage={canManage}
      />

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-hidden">
        {selectedChannel ? (
          <ChannelView
            channel={selectedChannel}
            messages={channelMessages}
            user={user}
            canWrite={canWrite}
            canDelete={canDelete}
            rightPanelOpen={rightPanelOpen}
            onToggleRightPanel={() => setRightPanelOpen(v => !v)}
          />
        ) : (
          <InboxView
            channels={channels}
            onOpenChannel={handleSelectChannel}
            allowAi={true}
          />
        )}
      </main>

      {/* Right panel */}
      {rightPanelOpen && (
        <RightPanel selectedChannelId={selectedChannelId} />
      )}
    </div>
  );
}

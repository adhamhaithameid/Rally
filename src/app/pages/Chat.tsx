import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
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
import { useAuth, UserRole } from "../contexts/AuthContext";
import { useSecondarySidebar } from "../contexts/SecondarySidebarContext";
import {
  Send,
  Plus,
  Settings,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Upload,
  Reply,
  Trash2,
  Edit,
  Hash,
  User,
  Volume2,
  X,
  ChevronDown,
  Search,
  MessageCircle,
  PhoneOff,
  Users,
} from "lucide-react";

type ChannelType = "text" | "voice" | "dm";

interface ChannelPermissions {
  write: UserRole[];
  read: UserRole[];
  delete: UserRole[];
  modify: UserRole[];
  notify: UserRole[];
  allowAi: boolean;
}

interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  teamId?: string;
  dmUserId?: string;
  dmUserName?: string;
  createdBy: string;
  permissions: ChannelPermissions;
  members: string[];
}

interface ChatMessage {
  id: string;
  channelId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  media?: string[];
  replyTo?: string;
  timestamp: string;
  edited?: boolean;
}

const defaultPermissions: ChannelPermissions = {
  write: ["owner", "admin", "member"],
  read: ["owner", "admin", "member", "viewer"],
  delete: ["owner", "admin"],
  modify: ["owner", "admin"],
  notify: ["owner", "admin"],
  allowAi: true,
};

const mockChannels: Channel[] = [
  { id: "text-1", name: "general", type: "text", teamId: "team-1", createdBy: "user-1", permissions: defaultPermissions, members: ["user-1", "user-2", "user-3"] },
  { id: "text-2", name: "announcements", type: "text", teamId: "team-1", createdBy: "user-1", permissions: { ...defaultPermissions, write: ["owner", "admin"], notify: ["owner", "admin"] }, members: ["user-1", "user-2", "user-3"] },
  { id: "voice-1", name: "Team Voice", type: "voice", teamId: "team-1", createdBy: "user-1", permissions: defaultPermissions, members: ["user-1", "user-2"] },
  { id: "dm-1", name: "Sarah Johnson", type: "dm", dmUserId: "user-2", dmUserName: "Sarah Johnson", createdBy: "user-1", permissions: defaultPermissions, members: ["user-1", "user-2"] },
];

const mockMessages: ChatMessage[] = [
  { id: "msg-1", channelId: "text-1", userId: "user-2", userName: "Sarah Johnson", message: "Hey team! How's everyone doing today?", timestamp: "2026-04-04T09:00:00" },
  { id: "msg-2", channelId: "text-1", userId: "user-3", userName: "Mike Chen", message: "Doing great! Just pushed the new feature branch.", timestamp: "2026-04-04T09:03:00" },
  { id: "msg-3", channelId: "text-1", userId: "user-1", userName: "John Doe", message: "Nice work Mike! I just finished the dashboard redesign.", timestamp: "2026-04-04T09:05:00" },
  { id: "msg-4", channelId: "dm-1", userId: "user-2", userName: "Sarah Johnson", message: "Hey, do you have a minute to discuss the project timeline?", timestamp: "2026-04-04T10:00:00" },
  { id: "msg-5", channelId: "dm-1", userId: "user-1", userName: "John Doe", message: "Sure! I'm free now. What's on your mind?", timestamp: "2026-04-04T10:02:00" },
];

const voiceParticipants = [
  { id: "user-2", name: "Sarah Johnson", muted: false },
  { id: "user-3", name: "Mike Chen", muted: true },
];

export function Chat() {
  const { user, userRole, hasPermission } = useAuth();
  const { setSecondarySidebar } = useSecondarySidebar();

  const [channels, setChannels] = useState<Channel[]>(mockChannels);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(channels[0] || null);
  const [messageInput, setMessageInput] = useState("");
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [inVoiceChannel, setInVoiceChannel] = useState<string | null>(null);
  const [micMuted, setMicMuted] = useState(false);
  const [camOff, setCamOff] = useState(true);

  const [textChannelsCollapsed, setTextChannelsCollapsed] = useState(false);
  const [voiceChannelsCollapsed, setVoiceChannelsCollapsed] = useState(false);
  const [dmChannelsCollapsed, setDmChannelsCollapsed] = useState(false);

  const [channelDialogOpen, setChannelDialogOpen] = useState(false);
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null);
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState<ChannelType>("text");
  const [permWrite, setPermWrite] = useState<UserRole[]>(["owner", "admin", "member"]);
  const [permRead, setPermRead] = useState<UserRole[]>(["owner", "admin", "member", "viewer"]);
  const [permDelete, setPermDelete] = useState<UserRole[]>(["owner", "admin"]);
  const [permModify, setPermModify] = useState<UserRole[]>(["owner", "admin"]);
  const [permNotify, setPermNotify] = useState<UserRole[]>(["owner", "admin"]);
  const [allowAi, setAllowAi] = useState(true);

  const canManageChannels = hasPermission("manage_groups") || hasPermission("*");
  const canWrite = selectedChannel && userRole && selectedChannel.permissions.write.includes(userRole);
  const canDelete = selectedChannel && userRole && selectedChannel.permissions.delete.includes(userRole);
  const canModify = selectedChannel && userRole && selectedChannel.permissions.modify.includes(userRole);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedChannel]);

  // ── Channel CRUD ──────────────────────────────────────────────────────────
  const handleCreateChannel = () => {
    if (!canManageChannels) return;
    const newChannel: Channel = {
      id: `${channelType}-${Date.now()}`,
      name: channelName,
      type: channelType,
      teamId: channelType !== "dm" ? "team-1" : undefined,
      createdBy: user?.id || "user-1",
      permissions: { write: permWrite, read: permRead, delete: permDelete, modify: permModify, notify: permNotify, allowAi },
      members: [user?.id || "user-1"],
    };
    setChannels((prev) => [...prev, newChannel]);
    setChannelDialogOpen(false);
    resetChannelForm();
  };

  const handleUpdateChannel = () => {
    if (!canManageChannels || !editingChannel) return;
    setChannels((prev) =>
      prev.map((ch) =>
        ch.id === editingChannel.id
          ? { ...ch, name: channelName, permissions: { write: permWrite, read: permRead, delete: permDelete, modify: permModify, notify: permNotify, allowAi } }
          : ch
      )
    );
    setChannelDialogOpen(false);
    resetChannelForm();
  };

  const handleDeleteChannel = (channelId: string) => {
    if (!canManageChannels) return;
    if (confirm("Delete this channel?")) {
      setChannels((prev) => prev.filter((ch) => ch.id !== channelId));
      setSelectedChannel((curr) => (curr?.id === channelId ? null : curr));
    }
  };

  const openEditChannel = (channel: Channel) => {
    setEditingChannel(channel);
    setChannelName(channel.name);
    setChannelType(channel.type);
    setPermWrite(channel.permissions.write);
    setPermRead(channel.permissions.read);
    setPermDelete(channel.permissions.delete);
    setPermModify(channel.permissions.modify);
    setPermNotify(channel.permissions.notify);
    setAllowAi(channel.permissions.allowAi);
    setChannelDialogOpen(true);
  };

  const resetChannelForm = () => {
    setEditingChannel(null);
    setChannelName("");
    setChannelType("text");
    setPermWrite(["owner", "admin", "member"]);
    setPermRead(["owner", "admin", "member", "viewer"]);
    setPermDelete(["owner", "admin"]);
    setPermModify(["owner", "admin"]);
    setPermNotify(["owner", "admin"]);
    setAllowAi(true);
  };

  // ── Message CRUD ──────────────────────────────────────────────────────────
  const handleSendMessage = () => {
    if (!canWrite || !messageInput.trim() || !selectedChannel) return;
    if (editingMessage) {
      setMessages((prev) => prev.map((m) => m.id === editingMessage.id ? { ...m, message: messageInput, edited: true } : m));
      setEditingMessage(null);
    } else {
      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        channelId: selectedChannel.id,
        userId: user?.id || "user-1",
        userName: user?.name || "User",
        userAvatar: user?.avatar,
        message: messageInput,
        replyTo: replyingTo?.id,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMsg]);
      setReplyingTo(null);
    }
    setMessageInput("");
  };

  const handleDeleteMessage = (messageId: string) => {
    if (confirm("Delete this message?")) {
      setMessages((prev) => prev.filter((m) => m.id !== messageId));
    }
  };

  const handleEditMessage = (message: ChatMessage) => {
    setEditingMessage(message);
    setMessageInput(message.message);
  };

  const handleStartDM = (targetUserId: string, targetUserName: string) => {
    const existing = channels.find((ch) => ch.type === "dm" && ch.dmUserId === targetUserId);
    if (existing) { setSelectedChannel(existing); return; }
    const newDM: Channel = {
      id: `dm-${Date.now()}`,
      name: targetUserName,
      type: "dm",
      dmUserId: targetUserId,
      dmUserName: targetUserName,
      createdBy: user?.id || "user-1",
      permissions: defaultPermissions,
      members: [user?.id || "user-1", targetUserId],
    };
    setChannels((prev) => [...prev, newDM]);
    setSelectedChannel(newDM);
  };

  const handleDeleteDM = (channelId: string) => {
    if (confirm("Delete this direct message conversation?")) {
      setMessages((prev) => prev.filter((m) => m.channelId !== channelId));
      setChannels((prev) => prev.filter((ch) => ch.id !== channelId));
      setSelectedChannel((curr) => (curr?.id === channelId ? channels.find((ch) => ch.type === "text") || null : curr));
    }
  };

  const handleJoinVoice = (channelId: string) => setInVoiceChannel(channelId);
  const handleLeaveVoice = () => { setInVoiceChannel(null); setMicMuted(false); setCamOff(true); };

  const getRepliedMessage = (replyToId: string) => messages.find((m) => m.id === replyToId);

  const formatTime = (ts: string) =>
    new Date(ts).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  const textChannels = channels.filter((ch) => ch.type === "text");
  const voiceChannels = channels.filter((ch) => ch.type === "voice");
  const dmChannels = channels.filter((ch) => ch.type === "dm");

  // ── Discord-style secondary sidebar injection ────────────────────────────
  useEffect(() => {
    if (userRole === "viewer") {
      setSecondarySidebar(null);
      return;
    }

    const sidebar = (
      <div className="h-full flex flex-col bg-card overflow-hidden">
        {/* Server name header */}
        <div className="px-4 py-3 border-b border-border flex-shrink-0">
          <h2 className="text-sm font-semibold text-foreground truncate">Team Workspace</h2>
        </div>

        {/* Channel list */}
        <div className="flex-1 overflow-y-auto py-2">
          {/* ── TEXT CHANNELS ──────────────────────────────────────────────── */}
          <div className="px-2 mb-1">
            <div className="flex items-center justify-between px-2 py-1.5">
              <button
                onClick={() => setTextChannelsCollapsed((v) => !v)}
                className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                <ChevronDown className={`size-3 transition-transform ${textChannelsCollapsed ? "-rotate-90" : ""}`} />
                Text Channels
              </button>
              {canManageChannels && (
                <button
                  onClick={() => { resetChannelForm(); setChannelType("text"); setChannelDialogOpen(true); }}
                  className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Add text channel"
                >
                  <Plus className="size-3.5" />
                </button>
              )}
            </div>
            {!textChannelsCollapsed && (
              <div className="space-y-0.5 mt-0.5">
                {textChannels.map((channel) => (
                  <div key={channel.id} className="flex items-center gap-1 group/channel">
                    <button
                      onClick={() => setSelectedChannel(channel)}
                      className={`flex-1 flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors text-sm ${
                        selectedChannel?.id === channel.id
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      <Hash className="size-4 flex-shrink-0" />
                      <span className="truncate">{channel.name}</span>
                    </button>
                    {canManageChannels && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 rounded hover:bg-muted text-muted-foreground opacity-0 group-hover/channel:opacity-100 transition-opacity">
                            <Settings className="size-3.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditChannel(channel)}>
                            <Edit className="size-3.5 mr-2" /> Edit Channel
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteChannel(channel.id)}>
                            <Trash2 className="size-3.5 mr-2" /> Delete Channel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── VOICE CHANNELS ─────────────────────────────────────────────── */}
          <div className="px-2 mt-4 mb-1">
            <div className="flex items-center justify-between px-2 py-1.5">
              <button
                onClick={() => setVoiceChannelsCollapsed((v) => !v)}
                className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                <ChevronDown className={`size-3 transition-transform ${voiceChannelsCollapsed ? "-rotate-90" : ""}`} />
                Voice Channels
              </button>
              {canManageChannels && (
                <button
                  onClick={() => { resetChannelForm(); setChannelType("voice"); setChannelDialogOpen(true); }}
                  className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Add voice channel"
                >
                  <Plus className="size-3.5" />
                </button>
              )}
            </div>
            {!voiceChannelsCollapsed && (
              <div className="space-y-0.5 mt-0.5">
                {voiceChannels.map((channel) => {
                  const isConnected = inVoiceChannel === channel.id;
                  return (
                    <div key={channel.id} className="flex items-center gap-1 group/channel">
                      <button
                        onClick={() => setSelectedChannel(channel)}
                        className={`flex-1 flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors text-sm ${
                          selectedChannel?.id === channel.id
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        <Volume2 className="size-4 flex-shrink-0" />
                        <span className="truncate flex-1">{channel.name}</span>
                        {isConnected && <span className="size-2 rounded-full bg-green-500 flex-shrink-0" />}
                      </button>
                      {canManageChannels && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 rounded hover:bg-muted text-muted-foreground opacity-0 group-hover/channel:opacity-100 transition-opacity">
                              <Settings className="size-3.5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditChannel(channel)}>
                              <Edit className="size-3.5 mr-2" /> Edit Channel
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteChannel(channel.id)}>
                              <Trash2 className="size-3.5 mr-2" /> Delete Channel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── DIRECT MESSAGES ────────────────────────────────────────────── */}
          <div className="px-2 mt-4 mb-1">
            <div className="flex items-center justify-between px-2 py-1.5">
              <button
                onClick={() => setDmChannelsCollapsed((v) => !v)}
                className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                <ChevronDown className={`size-3 transition-transform ${dmChannelsCollapsed ? "-rotate-90" : ""}`} />
                Direct Messages
              </button>
            </div>
            {!dmChannelsCollapsed && (
              <div className="space-y-0.5 mt-0.5">
                {dmChannels.map((channel) => (
                  <div key={channel.id} className="flex items-center gap-1 group/channel">
                    <button
                      onClick={() => setSelectedChannel(channel)}
                      className={`flex-1 flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors text-sm ${
                        selectedChannel?.id === channel.id
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      <div className="size-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-foreground">{channel.name[0]}</span>
                      </div>
                      <span className="truncate">{channel.name}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteDM(channel.id)}
                      className="p-1 rounded hover:bg-muted text-muted-foreground opacity-0 group-hover/channel:opacity-100 transition-opacity"
                      title="Delete conversation"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );

    setSecondarySidebar(sidebar);
    return () => setSecondarySidebar(null);
  }, [
    channels,
    selectedChannel,
    textChannelsCollapsed,
    voiceChannelsCollapsed,
    dmChannelsCollapsed,
    inVoiceChannel,
    canManageChannels,
    userRole,
  ]);

  const channelMessages = messages.filter((msg) => {
    if (msg.channelId !== selectedChannel?.id) return false;
    if (searchQuery.trim()) {
      return msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  // ── Viewer mode ────────────────────────────────────────────────────────────
  if (userRole === "viewer") {
    return (
      <div className="min-h-full bg-background p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-foreground mb-2">Chat</h1>
            <p className="text-muted-foreground">View team conversations (read-only)</p>
          </div>
          <div className="rounded-xl border border-border p-12 text-center bg-card">
            <MessageCircle className="size-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Chat is view-only for Viewers. Upgrade your role to participate.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-background flex flex-col overflow-hidden">
      {/* ── Channel Dialog ─────────────────────────────────────────────────── */}
      <Dialog open={channelDialogOpen} onOpenChange={setChannelDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingChannel ? "Edit Channel" : "Create Channel"}</DialogTitle>
            <DialogDescription>
              {editingChannel ? "Update channel settings" : `Create a new ${channelType} channel`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="channel-name">Channel Name</Label>
              <Input id="channel-name" value={channelName} onChange={(e) => setChannelName(e.target.value)} placeholder="e.g., general, announcements" />
            </div>
            {!editingChannel && (
              <div className="space-y-2">
                <Label htmlFor="channel-type">Type</Label>
                <Select value={channelType} onValueChange={(v) => setChannelType(v as ChannelType)}>
                  <SelectTrigger id="channel-type"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text Channel</SelectItem>
                    <SelectItem value="voice">Voice Channel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {channelType === "text" && (
              <div className="border-t pt-4 space-y-4">
                <h3 className="font-medium text-foreground">Permissions</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="allow-ai">Allow AI in this channel</Label>
                  <Switch id="allow-ai" checked={allowAi} onCheckedChange={setAllowAi} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Who can write messages?</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {(["owner", "admin", "member", "viewer"] as UserRole[]).map((role) => (
                      <button
                        key={role}
                        onClick={() =>
                          setPermWrite(
                            permWrite.includes(role) ? permWrite.filter((r) => r !== role) : [...permWrite, role]
                          )
                        }
                        className={`px-2 py-1 text-xs rounded transition-colors ${
                          permWrite.includes(role)
                            ? "bg-blue-100 text-blue-700 border border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                            : "bg-muted text-muted-foreground border border-border"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <Button onClick={editingChannel ? handleUpdateChannel : handleCreateChannel} className="w-full" disabled={!channelName}>
              {editingChannel ? "Update Channel" : "Create Channel"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Chat Area ─────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {selectedChannel ? (
          <>
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center justify-between gap-2 bg-card flex-shrink-0">
              <div className="flex items-center gap-2">
                {selectedChannel.type === "text" && <Hash className="size-4 text-muted-foreground" />}
                {selectedChannel.type === "voice" && <Volume2 className="size-4 text-muted-foreground" />}
                {selectedChannel.type === "dm" && (
                  <div className="size-7 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">{selectedChannel.name[0]}</span>
                  </div>
                )}
                <div>
                  <h2 className="text-sm font-semibold text-foreground">{selectedChannel.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedChannel.type === "dm" ? "Direct Message" : `${selectedChannel.members.length} members`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedChannel.type === "text" && (
                  <div className="relative hidden sm:block">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search messages…"
                      className="pl-8 h-8 w-48 text-sm"
                    />
                  </div>
                )}
                {selectedChannel.type === "dm" && (
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteDM(selectedChannel.id)} className="text-destructive hover:text-destructive" title="Delete conversation">
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Text / DM messages */}
            {(selectedChannel.type === "text" || selectedChannel.type === "dm") && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                  {channelMessages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-16">
                      <Hash className="size-12 text-muted-foreground mb-4 opacity-30" />
                      <p className="text-muted-foreground text-sm">
                        {searchQuery ? "No messages match your search." : "No messages yet. Be the first to say something!"}
                      </p>
                    </div>
                  )}

                  {channelMessages.map((message) => {
                    const isOwn = message.userId === user?.id;
                    const repliedMsg = message.replyTo ? getRepliedMessage(message.replyTo) : null;
                    const canEditThis = canModify || isOwn;
                    const canDeleteThis = canDelete || isOwn;

                    return (
                      <div key={message.id} className={`group flex items-end gap-2 py-0.5 ${isOwn ? "flex-row-reverse" : ""}`}>
                        {!isOwn && (
                          <div className="relative group/avatar flex-shrink-0 mb-1">
                            <Avatar className="size-7">
                              <AvatarFallback className="text-xs">
                                {message.userName.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <button
                              onClick={() => handleStartDM(message.userId, message.userName)}
                              className="absolute -top-1 -right-1 bg-blue-600 rounded-full p-0.5 opacity-0 group-hover/avatar:opacity-100 transition-opacity"
                              title={`Message ${message.userName}`}
                            >
                              <MessageCircle className="size-2.5 text-white" />
                            </button>
                          </div>
                        )}

                        <div className={`flex flex-col max-w-[70%] ${isOwn ? "items-end" : "items-start"}`}>
                          {!isOwn && (
                            <div className="flex items-center gap-2 mb-0.5 px-1 group/name">
                              <span className="text-xs font-medium text-foreground">{message.userName}</span>
                              <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                              {message.edited && <span className="text-xs text-muted-foreground">(edited)</span>}
                              <button
                                onClick={() => handleStartDM(message.userId, message.userName)}
                                className="opacity-0 group-hover/name:opacity-100 transition-opacity p-0.5 rounded hover:bg-muted text-muted-foreground"
                                title={`Message ${message.userName} privately`}
                              >
                                <MessageCircle className="size-3" />
                              </button>
                            </div>
                          )}
                          {isOwn && (
                            <div className="flex items-center gap-2 mb-0.5 px-1">
                              <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                              {message.edited && <span className="text-xs text-muted-foreground">(edited)</span>}
                            </div>
                          )}

                          {repliedMsg && (
                            <div className={`text-xs px-3 py-1.5 rounded-lg mb-1 border-l-2 border-blue-400 bg-muted max-w-full ${isOwn ? "text-right" : ""}`}>
                              <span className="font-medium text-foreground">{repliedMsg.userName}</span>
                              <span className="text-muted-foreground">: {repliedMsg.message.substring(0, 60)}…</span>
                            </div>
                          )}

                          <div className={`px-3 py-2 rounded-2xl text-sm break-words ${isOwn ? "bg-blue-600 text-white rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"}`}>
                            {message.message}
                          </div>

                          <div className={`flex items-center gap-0.5 mt-0.5 invisible group-hover:visible ${isOwn ? "flex-row-reverse" : ""}`}>
                            {canWrite && (
                              <button onClick={() => setReplyingTo(message)} className="group/btn flex items-center gap-1 p-1 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                                <Reply className="size-3.5 flex-shrink-0" />
                                <span className="text-xs max-w-0 overflow-hidden group-hover/btn:max-w-xs whitespace-nowrap transition-all duration-200">Reply</span>
                              </button>
                            )}
                            {canEditThis && (
                              <button onClick={() => handleEditMessage(message)} className="group/btn flex items-center gap-1 p-1 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                                <Edit className="size-3.5 flex-shrink-0" />
                                <span className="text-xs max-w-0 overflow-hidden group-hover/btn:max-w-xs whitespace-nowrap transition-all duration-200">Edit</span>
                              </button>
                            )}
                            {canDeleteThis && (
                              <button onClick={() => handleDeleteMessage(message.id)} className="group/btn flex items-center gap-1 p-1 rounded-lg hover:bg-muted transition-colors text-red-500 hover:text-red-600">
                                <Trash2 className="size-3.5 flex-shrink-0" />
                                <span className="text-xs max-w-0 overflow-hidden group-hover/btn:max-w-xs whitespace-nowrap transition-all duration-200">Delete</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {isOwn && (
                          <Avatar className="size-7 flex-shrink-0 mb-1">
                            <AvatarFallback className="text-xs bg-blue-600 text-white">
                              {(user?.name || "U").split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                {canWrite ? (
                  <div className="p-3 border-t border-border flex-shrink-0 bg-card">
                    {replyingTo && (
                      <div className="mb-2 px-3 py-1.5 bg-muted rounded-lg text-xs flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Replying to <span className="font-medium text-foreground">{replyingTo.userName}</span>
                          {": "}{replyingTo.message.substring(0, 50)}{replyingTo.message.length > 50 && "…"}
                        </span>
                        <button onClick={() => setReplyingTo(null)} className="ml-2 text-muted-foreground hover:text-foreground">
                          <X className="size-3.5" />
                        </button>
                      </div>
                    )}
                    {editingMessage && (
                      <div className="mb-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs flex items-center justify-between">
                        <span className="text-blue-700 dark:text-blue-400">Editing message…</span>
                        <button onClick={() => { setEditingMessage(null); setMessageInput(""); }} className="text-blue-700 dark:text-blue-400">
                          <X className="size-3.5" />
                        </button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-shrink-0"><Upload className="size-4" /></Button>
                      <Input
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                        placeholder={`Message ${selectedChannel.type === "dm" ? selectedChannel.name : `#${selectedChannel.name}`}`}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!messageInput.trim()} size="sm">
                        <Send className="size-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border-t border-border text-center text-sm text-muted-foreground bg-card">
                    You don't have permission to write in this channel.
                  </div>
                )}
              </>
            )}

            {/* Voice Channel Page */}
            {selectedChannel.type === "voice" && (
              <div className="flex-1 flex flex-col bg-background">
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Volume2 className="size-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">{selectedChannel.name}</h2>
                  <p className="text-sm text-muted-foreground mb-8">
                    {inVoiceChannel === selectedChannel.id ? "You are connected" : "Click Join to connect to this voice channel"}
                  </p>

                  {inVoiceChannel === selectedChannel.id && (
                    <div className="mb-8 w-full max-w-md">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 text-center">
                        Participants ({voiceParticipants.length + 1})
                      </p>
                      <div className="flex flex-wrap gap-4 justify-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className={`relative size-14 rounded-full flex items-center justify-center border-2 ${micMuted ? "border-red-400" : "border-green-400"} bg-muted`}>
                            <span className="font-medium text-foreground">{(user?.name || "Y").split(" ").map((n) => n[0]).join("")}</span>
                            {micMuted && <div className="absolute -bottom-0.5 -right-0.5 bg-red-500 rounded-full p-0.5"><MicOff className="size-2.5 text-white" /></div>}
                          </div>
                          <span className="text-xs text-foreground">You</span>
                        </div>
                        {voiceParticipants.map((p) => (
                          <div key={p.id} className="flex flex-col items-center gap-1">
                            <div className={`relative size-14 rounded-full flex items-center justify-center border-2 ${p.muted ? "border-muted" : "border-green-400"} bg-muted`}>
                              <span className="font-medium text-foreground">{p.name.split(" ").map((n) => n[0]).join("")}</span>
                              {p.muted && <div className="absolute -bottom-0.5 -right-0.5 bg-red-500 rounded-full p-0.5"><MicOff className="size-2.5 text-white" /></div>}
                            </div>
                            <span className="text-xs text-foreground">{p.name.split(" ")[0]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {inVoiceChannel === selectedChannel.id ? (
                    <div className="flex items-center gap-3">
                      <button onClick={() => setMicMuted(!micMuted)} className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors ${micMuted ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-muted text-foreground hover:bg-muted/80"}`}>
                        {micMuted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
                        <span className="text-xs">{micMuted ? "Unmute" : "Mute"}</span>
                      </button>
                      <button onClick={() => setCamOff(!camOff)} className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors ${camOff ? "bg-muted text-muted-foreground hover:bg-muted/80" : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"}`}>
                        {camOff ? <VideoOff className="size-5" /> : <Video className="size-5" />}
                        <span className="text-xs">Camera</span>
                      </button>
                      <button className="flex flex-col items-center gap-1 p-3 rounded-xl bg-muted text-foreground hover:bg-muted/80 transition-colors">
                        <Monitor className="size-5" />
                        <span className="text-xs">Share</span>
                      </button>
                      <button onClick={handleLeaveVoice} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors">
                        <PhoneOff className="size-5" />
                        <span className="text-xs">Leave</span>
                      </button>
                    </div>
                  ) : (
                    <Button onClick={() => handleJoinVoice(selectedChannel.id)} size="lg">
                      <Mic className="size-4 mr-2" />
                      Join Voice Channel
                    </Button>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Hash className="size-12 opacity-20 mx-auto mb-3" />
              <p className="text-sm">Select a channel to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

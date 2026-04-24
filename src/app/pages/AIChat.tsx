import { useState, useRef, useEffect } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useAuth } from "../contexts/AuthContext";
import { useSecondarySidebar } from "../contexts/SecondarySidebarContext";
import {
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
  Globe,
  Calendar as CalendarIcon,
  CheckSquare,
  Sparkles,
  MoreVertical,
  X,
  Pencil,
  TrendingUp,
  GraduationCap,
  Users,
  FileText,
  Zap,
  Mic,
  ArrowUp,
  Ghost,
} from "lucide-react";

interface AIAction {
  type: "search_events" | "create_event" | "search_todos" | "create_todo" | "search_internet";
  params: Record<string, unknown>;
  result: unknown;
}

interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  actions?: AIAction[];
}

interface AIChat {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  messages: AIMessage[];
}

const mockChats: AIChat[] = [
  {
    id: "chat-1",
    name: "General Assistant",
    userId: "user-1",
    createdAt: "2026-04-04T09:00:00",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "What meetings do I have this week?",
        timestamp: "2026-04-04T09:00:00",
      },
      {
        id: "msg-2",
        role: "assistant",
        content:
          "I found 3 meetings scheduled for this week:\n\n1. **Team Standup** – Daily at 10:00 AM\n2. **Client Presentation** – April 6, 2:00 PM\n3. **Sprint Review** – April 7, 3:00 PM\n\nWould you like more details about any of these?",
        timestamp: "2026-04-04T09:00:10",
        actions: [{ type: "search_events", params: { timeframe: "this_week" }, result: { count: 3 } }],
      },
    ],
  },
  {
    id: "chat-2",
    name: "Project Planning",
    userId: "user-1",
    createdAt: "2026-04-02T14:00:00",
    messages: [],
  },
];

const SUGGESTED_PROMPTS = [
  { icon: CheckSquare,  label: "Help me plan a team meeting",        emoji: "📋" },
  { icon: TrendingUp,   label: "Summarize project progress",         emoji: "📊" },
  { icon: Pencil,       label: "Draft a task assignment",            emoji: "✍️" },
  { icon: CalendarIcon, label: "Schedule a team sprint",             emoji: "📅" },
  { icon: Users,        label: "Analyze team productivity",          emoji: "" },
  { icon: GraduationCap,label: "Best practices for collaboration",   emoji: "💡" },
  { icon: FileText,     label: "Create a status report",             emoji: "📄" },
  { icon: Zap,          label: "Automate a repetitive workflow",     emoji: "⚡" },
];

export function AIChat() {
  const { user, userRole } = useAuth();
  const { setSecondarySidebar } = useSecondarySidebar();
  const [chats, setChats] = useState<AIChat[]>(mockChats);
  const [selectedChat, setSelectedChat] = useState<AIChat | null>(chats[0] || null);
  const [messageInput, setMessageInput] = useState("");
  const [internetSearch, setInternetSearch] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [tempChat, setTempChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Chat form state
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [editingChat, setEditingChat] = useState<AIChat | null>(null);
  const [chatName, setChatName] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat?.messages]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 180)}px`;
  }, [messageInput]);

  const canUseAI = userRole !== "viewer";

  // ── Inject secondary sidebar ─────────────────────────────────────────────
  useEffect(() => {
    if (!canUseAI) {
      setSecondarySidebar(null);
      return;
    }

    const sidebar = (
      <div className="h-full flex flex-col bg-card overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border flex items-center justify-between flex-shrink-0">
          <h2 className="text-sm font-semibold text-foreground">AI Chats</h2>
          <button
            onClick={() => { setEditingChat(null); setChatName(""); setChatDialogOpen(true); }}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title="New Chat"
          >
            <Plus className="size-4" />
          </button>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {chats.map((chat) => (
            <div key={chat.id} className="flex items-center gap-1 group/chat">
              <button
                onClick={() => setSelectedChat(chat)}
                className={`flex-1 flex items-center gap-2 px-2 py-2 rounded-lg transition-colors text-left ${
                  selectedChat?.id === chat.id
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <MessageSquare className="size-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{chat.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {chat.messages.length} message{chat.messages.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground opacity-0 group-hover/chat:opacity-100 transition-opacity">
                    <MoreVertical className="size-3.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => openRenameDialog(chat)}>
                    <Edit2 className="size-3.5 mr-2" /> Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteChat(chat.id)}>
                    <Trash2 className="size-3.5 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
    );

    setSecondarySidebar(sidebar);
    return () => setSecondarySidebar(null);
  }, [chats, selectedChat, canUseAI]);

  // ── Chat CRUD ─────────────────────────────────────────────────────────────
  const handleCreateChat = () => {
    const newChat: AIChat = {
      id: `chat-${Date.now()}`,
      name: chatName || "New Chat",
      userId: user?.id || "user-1",
      createdAt: new Date().toISOString(),
      messages: [],
    };
    setChats([newChat, ...chats]);
    setSelectedChat(newChat);
    setChatDialogOpen(false);
    setChatName("");
  };

  const handleRenameChat = () => {
    if (!editingChat) return;
    const updated = chats.map((c) => (c.id === editingChat.id ? { ...c, name: chatName } : c));
    setChats(updated);
    if (selectedChat?.id === editingChat.id) setSelectedChat({ ...selectedChat, name: chatName });
    setChatDialogOpen(false);
    setEditingChat(null);
    setChatName("");
  };

  const handleDeleteChat = (chatId: string) => {
    if (confirm("Delete this chat? This cannot be undone.")) {
      const remaining = chats.filter((c) => c.id !== chatId);
      setChats(remaining);
      if (selectedChat?.id === chatId) setSelectedChat(remaining[0] || null);
    }
  };

  const openRenameDialog = (chat: AIChat) => {
    setEditingChat(chat);
    setChatName(chat.name);
    setChatDialogOpen(true);
  };

  // ── AI response simulation ─────────────────────────────────────────────────
  const simulateStreamingResponse = async (userMessage: string) => {
    if (!selectedChat) return;
    setIsStreaming(true);

    const userMsg: AIMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: userMessage,
      timestamp: new Date().toISOString(),
    };

    const updatedChat = { ...selectedChat, messages: [...selectedChat.messages, userMsg] };
    setChats((prev) => prev.map((c) => (c.id === selectedChat.id ? updatedChat : c)));
    setSelectedChat(updatedChat);

    await new Promise((r) => setTimeout(r, 600));

    const actions: AIAction[] = [];
    let responseContent = "";
    const lower = userMessage.toLowerCase();

    if (lower.includes("event") || lower.includes("meeting") || lower.includes("calendar")) {
      if (lower.includes("create") || lower.includes("schedule") || lower.includes("add")) {
        actions.push({ type: "create_event", params: { msg: userMessage }, result: { success: true } });
        responseContent = "I've created a new event based on your request. You can find it in your Calendar. Would you like me to make any adjustments?";
      } else {
        actions.push({ type: "search_events", params: { query: userMessage }, result: { count: 2 } });
        responseContent = "I found 2 relevant events:\n\n1. **Team Standup** – Today at 10:00 AM\n2. **Client Meeting** – Tomorrow at 2:00 PM\n\nWould you like more details?";
      }
    } else if (lower.includes("task") || lower.includes("todo") || lower.includes("to-do")) {
      if (lower.includes("create") || lower.includes("add") || lower.includes("new")) {
        actions.push({ type: "create_todo", params: { msg: userMessage }, result: { success: true } });
        responseContent = "I've added that task to your To-Do list with medium priority. You can adjust it anytime in the Tasks page.";
      } else {
        actions.push({ type: "search_todos", params: { query: userMessage }, result: { count: 3 } });
        responseContent = "Here are your matching tasks:\n\n1. 📝 Review design mockups (High priority)\n2. ✅ Update documentation (Medium priority)\n3. 🚀 Deploy to production (Urgent)\n\nAnything specific you'd like to do with these?";
      }
    } else if (internetSearch) {
      actions.push({ type: "search_internet", params: { query: userMessage }, result: { sources: 3 } });
      responseContent = `I searched the web for \"${userMessage}\" and found information from 3 sources. Here's a summary:\n\n[Simulated web search result. In a live deployment, real search results and summaries would appear here.]\n\nWould you like me to dive deeper into any aspect?`;
    } else {
      responseContent = "I'm here to help with Rally! I can assist you with:\n\n• 📅 **Calendar** – Search or create events\n• ✅ **Tasks** – Find or add to-dos\n• 🌐 **Web Search** – Toggle the globe icon to search the web\n• 👥 **Team** – Insights about your workspace\n\nWhat would you like to do?";
    }

    const assistantMsg: AIMessage = {
      id: `msg-${Date.now() + 1}`,
      role: "assistant",
      content: responseContent,
      timestamp: new Date().toISOString(),
      actions: actions.length > 0 ? actions : undefined,
    };

    const finalChat = { ...updatedChat, messages: [...updatedChat.messages, assistantMsg] };
    setChats((prev) => prev.map((c) => (c.id === selectedChat.id ? finalChat : c)));
    setSelectedChat(finalChat);
    setIsStreaming(false);
  };

  const handleSendMessage = async () => {
    if (!canUseAI || !messageInput.trim() || !selectedChat || isStreaming) return;
    const msg = messageInput;
    setMessageInput("");
    await simulateStreamingResponse(msg);
  };

  const getActionIcon = (type: AIAction["type"]) => {
    switch (type) {
      case "search_events":
      case "create_event":
        return <CalendarIcon className="size-3" />;
      case "search_todos":
      case "create_todo":
        return <CheckSquare className="size-3" />;
      case "search_internet":
        return <Globe className="size-3" />;
      default:
        return <Sparkles className="size-3" />;
    }
  };

  const getActionLabel = (type: AIAction["type"]) => {
    switch (type) {
      case "search_events":   return "Searched Calendar";
      case "create_event":    return "Created Event";
      case "search_todos":    return "Searched Tasks";
      case "create_todo":     return "Created Task";
      case "search_internet": return "Searched Internet";
      default:                return "Action";
    }
  };

  const formatTime = (ts: string) =>
    new Date(ts).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  // ── Viewer mode ────────────────────────────────────────────────────────────
  if (userRole === "viewer") {
    return (
      <div className="min-h-full bg-background p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-medium text-foreground mb-2">AI Assistant</h1>
            <p className="text-muted-foreground">AI chat not available for viewers</p>
          </div>
          <div className="rounded-xl border border-border p-12 text-center bg-card">
            <MessageSquare className="size-12 text-muted-foreground mx-auto mb-4 opacity-40" />
            <p className="text-muted-foreground">AI Assistant requires Member, Admin, or Owner role.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-background flex flex-col overflow-hidden">
      {/* ── Chat Dialog ───────────────────────────────────────────────────── */}
      <Dialog open={chatDialogOpen} onOpenChange={setChatDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingChat ? "Rename Chat" : "New Chat"}</DialogTitle>
            <DialogDescription>
              {editingChat ? "Give your chat a new name" : "Start a new AI conversation"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="chat-name">Chat Name</Label>
              <Input
                id="chat-name"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (editingChat ? handleRenameChat() : handleCreateChat())}
                placeholder="e.g., Project Planning"
                autoFocus
              />
            </div>
            <Button
              onClick={editingChat ? handleRenameChat : handleCreateChat}
              className="w-full"
              disabled={!chatName.trim() && !editingChat}
            >
              {editingChat ? "Rename" : "Create Chat"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Chat Area ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col bg-background min-w-0 overflow-hidden">
        {selectedChat ? (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-8">
              {selectedChat.messages.length === 0 ? (
                /* Gemini-style greeting */
                <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto">
                  <div className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Sparkles className="size-6 text-blue-600" />
                      <span className="text-xl text-foreground">Hi {user?.name.split(" ")[0]}</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl text-foreground mb-10">Where should we start?</h1>
                  </div>

                  {/* Suggested prompts – 2 rows */}
                  <div className="w-full max-w-2xl space-y-3">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {SUGGESTED_PROMPTS.slice(0, 4).map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => setMessageInput(prompt.label)}
                          className="p-4 border border-border rounded-2xl hover:bg-muted transition-colors text-left bg-card"
                        >
                          <span className="text-2xl mb-2 block">{prompt.emoji}</span>
                          <p className="text-sm text-foreground">{prompt.label}</p>
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {SUGGESTED_PROMPTS.slice(4).map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => setMessageInput(prompt.label)}
                          className="p-4 border border-border rounded-2xl hover:bg-muted transition-colors text-left bg-card"
                        >
                          <span className="text-2xl mb-2 block">{prompt.emoji}</span>
                          <p className="text-sm text-foreground">{prompt.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 mb-6 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex-shrink-0 size-8 rounded-full bg-blue-600 flex items-center justify-center">
                          <Sparkles className="size-4 text-white" />
                        </div>
                      )}

                      <div className={`max-w-3xl ${message.role === "user" ? "flex flex-col items-end" : ""}`}>
                        <div
                          className={`inline-block px-4 py-3 rounded-2xl text-sm ${
                            message.role === "user"
                              ? "bg-blue-600 text-white rounded-br-sm"
                              : "bg-muted text-foreground rounded-bl-sm"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>

                        {message.actions && message.actions.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.actions.map((action, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs gap-1">
                                {getActionIcon(action.type)}
                                {getActionLabel(action.type)}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground mt-1 px-1">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>

                      {message.role === "user" && (
                        <div className="flex-shrink-0 size-8 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-sm font-medium text-foreground">
                            {user?.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}

                  {isStreaming && (
                    <div className="flex gap-3 mb-6">
                      <div className="flex-shrink-0 size-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <Sparkles className="size-4 text-white" />
                      </div>
                      <div className="inline-block px-4 py-3 rounded-2xl bg-muted">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Input Area ─────────────────────────────────────────────── */}
            <div className="p-4 lg:p-6 border-t border-border flex-shrink-0">
              <div className="max-w-3xl mx-auto">
                <div className="rounded-2xl border border-border bg-card shadow-sm">
                  {/* Temp-chat banner */}
                  {tempChat && (
                    <div className="flex items-center gap-2 px-4 pt-3 text-xs text-muted-foreground">
                      <Ghost className="size-3.5" />
                      <span>Temporary chat — conversation won't be saved</span>
                    </div>
                  )}

                  {/* Row 1: Text input */}
                  <div className="px-4 pt-3 pb-1">
                    <textarea
                      ref={textareaRef}
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                      placeholder={internetSearch ? "Search the web…" : "Ask Rally AI…"}
                      rows={2}
                      disabled={isStreaming}
                      className="w-full resize-none bg-transparent border-0 focus:outline-none text-sm text-foreground placeholder:text-muted-foreground leading-relaxed"
                    />
                  </div>

                  {/* Row 2: Tools bar */}
                  <div className="px-2 pb-2 flex items-center justify-between gap-1">
                    {/* Left tools */}
                    <div className="flex items-center gap-0.5">
                      {/* Add media */}
                      <button
                        className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="Add media"
                      >
                        <Plus className="size-4" />
                      </button>

                      {/* Search toggle */}
                      <button
                        onClick={() => setInternetSearch((s) => !s)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-sm transition-colors ${
                          internetSearch
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                        title="Toggle web search"
                      >
                        <Globe className="size-4" />
                        {internetSearch && <span className="text-xs font-medium">Search</span>}
                      </button>

                      {/* Temp chat toggle */}
                      <button
                        onClick={() => setTempChat((t) => !t)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-sm transition-colors ${
                          tempChat
                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                        title="Temporary chat"
                      >
                        <Ghost className="size-4" />
                        {tempChat && <span className="text-xs font-medium">Temp</span>}
                      </button>
                    </div>

                    {/* Right: mic + send */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="Voice input"
                      >
                        <Mic className="size-4" />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim() || isStreaming}
                        className="p-2 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Send"
                      >
                        <ArrowUp className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageSquare className="size-12 opacity-20 mx-auto mb-3" />
              <p className="text-sm">Select a chat or create a new one to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
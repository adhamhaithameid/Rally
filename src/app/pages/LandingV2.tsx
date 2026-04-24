import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight, Check, Star, ChevronRight,
  MessageSquare, Bot, CheckSquare, Calendar, FolderOpen,
  Users, LayoutDashboard, UserCircle, Shield, Zap,
  Menu, X, ExternalLink, TrendingUp, Clock, Globe,
} from "lucide-react";
import svgPaths from "../../imports/svg-gyowvurp60";

// ── Logo ──────────────────────────────────────────────────────────────────────

function RallyLogo({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="27 26 133 127" width={size} height={size} fill="none">
      <path d={svgPaths.p6b466c0} fill="var(--rally-brand)" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const MODULES = [
  { icon: LayoutDashboard, label: "Dashboard",  desc: "Project overview at a glance"     },
  { icon: MessageSquare,   label: "Chat",        desc: "Real-time team messaging"         },
  { icon: Bot,             label: "AI Chat",     desc: "AI-powered work assistant"        },
  { icon: CheckSquare,     label: "Tasks",       desc: "Smart to-do management"           },
  { icon: Calendar,        label: "Calendar",    desc: "Shared team scheduling"           },
  { icon: FolderOpen,      label: "Files",       desc: "Shared file system"              },
  { icon: Users,           label: "Team",        desc: "Member & role management"         },
  { icon: UserCircle,      label: "Profile",     desc: "Personal settings & preferences"  },
];

const STATS = [
  { value: "10K+",   label: "Active teams",       icon: Users      },
  { value: "500K+",  label: "Users worldwide",    icon: Globe      },
  { value: "99.9%",  label: "Uptime SLA",         icon: TrendingUp },
  { value: "< 50ms", label: "Avg. response time", icon: Clock      },
];

const TESTIMONIALS = [
  {
    name: "Sarah Johnson", role: "CEO", company: "TechCorp",
    content: "Rally replaced five separate tools for us. Now our entire team lives in one place and nothing gets lost.",
    avatar: "SJ", rating: 5, avatarBg: "#3B82F6",
  },
  {
    name: "Mike Chen", role: "Product Manager", company: "StartupXYZ",
    content: "The AI chat feature alone is worth it. I use it to draft specs, summarise threads, and unblock my team daily.",
    avatar: "MC", rating: 5, avatarBg: "#0f6a43",
  },
  {
    name: "Emily Davis", role: "Design Lead", company: "CreativeStudio",
    content: "Clean, fast, beautiful. V2 Command Center redesigned everything we needed without adding noise.",
    avatar: "ED", rating: 5, avatarBg: "#8B5CF6",
  },
];

const PRICING = [
  {
    name: "Free", price: "$0", per: "forever",
    desc: "For individuals and small teams getting started.",
    cta: "Get started", highlight: false,
    features: ["Up to 5 members", "3 active projects", "Chat & tasks", "1 GB file storage", "Community support"],
  },
  {
    name: "Pro", price: "$12", per: "per seat / month",
    desc: "For growing teams that need the full toolkit.",
    cta: "Start free trial", highlight: true,
    features: ["Unlimited members", "Unlimited projects", "All 8 modules", "AI Chat assistant", "50 GB file storage", "Priority support"],
  },
  {
    name: "Team", price: "$29", per: "per seat / month",
    desc: "For larger organisations that need control.",
    cta: "Contact sales", highlight: false,
    features: ["Everything in Pro", "Role-based access control", "SSO & SCIM", "250 GB file storage", "Admin audit logs", "Dedicated success manager"],
  },
];

const LOGOS = ["Stripe", "Linear", "Vercel", "Figma", "Notion", "Loom", "Intercom", "Framer"];

// ── App Mockup (hero visual) ──────────────────────────────────────────────────

function AppMockup() {
  return (
    <div className="relative w-full max-w-[580px] mx-auto">
      <div className="rounded-[16px] border border-border overflow-hidden shadow-xl bg-card">
        {/* URL bar */}
        <div className="flex items-center gap-2 px-3 py-2.5 bg-muted border-b border-border">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-2 px-3 py-1 rounded-[5px] bg-background border border-border text-[11px] text-muted-foreground truncate">
            app.rally.so/app/home
          </div>
        </div>

        {/* App shell */}
        <div className="flex h-[360px]">
          {/* Sidebar strip */}
          <div className="w-12 flex-shrink-0 border-r border-border bg-card flex flex-col items-center py-3 gap-3">
            <div className="w-7 h-7 rounded-[7px] flex items-center justify-center mb-1"
              style={{ background: "var(--rally-brand)" }}>
              <RallyLogo size={14} />
            </div>
            {[LayoutDashboard, MessageSquare, Bot, CheckSquare, Calendar, FolderOpen, Users].map((Icon, i) => (
              <div key={i}
                className={`w-7 h-7 rounded-[7px] flex items-center justify-center transition-colors ${i === 0 ? "" : "hover:bg-muted"}`}
                style={i === 0 ? { background: "var(--rally-brand-soft-light)" } : {}}>
                <Icon className="size-3.5"
                  style={i === 0 ? { color: "var(--rally-brand)" } : { color: "var(--muted-foreground)" }} />
              </div>
            ))}
            <div className="flex-1" />
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-semibold text-foreground">JD</div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden bg-background">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border flex-shrink-0">
              <div>
                <p className="text-[12px] font-semibold text-foreground">Good morning, John 👋</p>
                <p className="text-[10px] text-muted-foreground">Design Team · Website Redesign</p>
              </div>
              <div className="flex gap-1.5">
                {["3 tasks due", "2 messages"].map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-hidden px-4 py-3 flex gap-3">
              <div className="flex-1 space-y-2.5 min-w-0">
                <div className="grid grid-cols-3 gap-2">
                  {[["12", "Tasks"], ["3", "Events"], ["5", "Online"]].map(([n, l]) => (
                    <div key={l} className="rounded-[8px] bg-card border border-border px-2 py-1.5">
                      <p className="text-[13px] font-bold text-foreground">{n}</p>
                      <p className="text-[9px] text-muted-foreground">{l}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-[8px] bg-card border border-border p-2.5">
                  <p className="text-[10px] font-medium text-foreground mb-1.5">Recent Activity</p>
                  {[
                    { text: "Sarah completed Design tokens v2", time: "2m", color: "#0f6a43" },
                    { text: "Mike commented on Figma handoff",  time: "8m", color: "#0f5fd7" },
                    { text: "Emily uploaded Brand kit 2026.zip",time: "15m",color: "#8B5CF6" },
                  ].map(a => (
                    <div key={a.text} className="flex items-start gap-2 py-1">
                      <span className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: a.color }} />
                      <span className="text-[10px] text-muted-foreground flex-1 leading-tight">{a.text}</span>
                      <span className="text-[9px] text-muted-foreground">{a.time}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-[8px] bg-card border border-border p-2.5">
                  <p className="text-[10px] font-medium text-foreground mb-1.5">My Tasks</p>
                  {[
                    { label: "Review homepage mockups", done: true },
                    { label: "Update component library", done: false },
                    { label: "Sync with engineering",    done: false },
                  ].map(t => (
                    <div key={t.label} className="flex items-center gap-1.5 py-0.5">
                      <div className="w-3 h-3 rounded border flex items-center justify-center flex-shrink-0"
                        style={t.done
                          ? { background: "var(--rally-brand)", borderColor: "var(--rally-brand)" }
                          : { borderColor: "var(--border)" }}>
                        {t.done && <Check className="size-2 text-white" />}
                      </div>
                      <span className={`text-[10px] ${t.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-28 flex-shrink-0 space-y-2.5">
                <div className="rounded-[8px] bg-card border border-border p-2">
                  <p className="text-[10px] font-medium text-foreground mb-1.5">Team</p>
                  {[
                    { name: "Sarah J", color: "#3B82F6", online: true  },
                    { name: "Mike C",  color: "#0f6a43", online: true  },
                    { name: "Emily D", color: "#8B5CF6", online: true  },
                    { name: "Alex R",  color: "#F59E0B", online: false },
                  ].map(m => (
                    <div key={m.name} className="flex items-center gap-1.5 py-0.5">
                      <div className="relative flex-shrink-0">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center text-white"
                          style={{ background: m.color, fontSize: 7 }}>
                          {m.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        {m.online && <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-green-400 ring-1 ring-card" />}
                      </div>
                      <span className="text-[10px] text-muted-foreground truncate">{m.name}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-[8px] bg-card border border-border p-2">
                  <p className="text-[10px] font-medium text-foreground mb-1">AI Assistant</p>
                  <div className="rounded-[5px] p-1.5 mb-1" style={{ background: "var(--rally-brand-soft-light)" }}>
                    <p className="text-[9px]" style={{ color: "var(--rally-brand)" }}>3 tasks overdue this sprint</p>
                  </div>
                  <button className="w-full text-[9px] rounded-[5px] py-1 text-white"
                    style={{ background: "var(--rally-brand)" }}>
                    Ask AI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card shadow-md">
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10B981" }} />
        <span className="text-[11px] font-medium text-foreground">11 people online</span>
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = ["Features", "Pricing", "Changelog", "Docs"];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95" style={{ backdropFilter: "blur(8px)" }}>
      <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <RallyLogo size={26} />
          <span className="text-[17px] font-bold text-foreground">Rally</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full text-white font-medium"
            style={{ background: "var(--rally-brand)" }}>V2</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l} href="#" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">{l}</a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login-v2" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5">
            Sign in
          </Link>
          <Link to="/signup-v2">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-[8px] text-white text-[13px] font-medium"
              style={{ background: "var(--rally-brand)" }}>
              Get started <ArrowRight className="size-3.5" />
            </button>
          </Link>
        </div>

        <button onClick={() => setMobileOpen(v => !v)}
          className="md:hidden p-1.5 text-muted-foreground hover:text-foreground transition-colors">
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-5 py-4 space-y-3">
          {links.map(l => (
            <a key={l} href="#" className="block text-[14px] text-muted-foreground hover:text-foreground transition-colors py-1">{l}</a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            <Link to="/login-v2" className="text-center py-2 rounded-[8px] border border-border text-[13px] text-foreground hover:bg-muted transition-colors">Sign in</Link>
            <Link to="/signup-v2">
              <button className="w-full py-2 rounded-[8px] text-white text-[13px] font-medium"
                style={{ background: "var(--rally-brand)" }}>
                Get started
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-5 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card mb-6">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--rally-brand)" }} />
            <span className="text-[12px] text-muted-foreground">Introducing Rally V2 Command Center</span>
            <ChevronRight className="size-3.5 text-muted-foreground" />
          </div>

          <h1 className="text-[40px] md:text-[52px] font-bold text-foreground leading-[1.15] mb-5">
            One workspace.<br />
            <span style={{ color: "var(--rally-brand)" }}>Every tool</span> your<br />
            team needs.
          </h1>
          <p className="text-[15px] text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Rally brings together chat, AI, tasks, calendar, files, and team management into a single calm, powerful workspace — no tab-switching required.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-5">
            <Link to="/signup-v2">
              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] text-white text-[14px] font-medium w-full sm:w-auto"
                style={{ background: "var(--rally-brand)" }}>
                Start free trial <ArrowRight className="size-4" />
              </button>
            </Link>
            <Link to="/app/home">
              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] border border-border bg-background text-foreground text-[14px] hover:bg-muted transition-colors w-full sm:w-auto">
                <ExternalLink className="size-4" /> See a live demo
              </button>
            </Link>
          </div>

          <p className="text-[12px] text-muted-foreground">
            No credit card required · 14-day free trial · Cancel anytime
          </p>

          <div className="flex items-center gap-3 mt-6 justify-center lg:justify-start">
            <div className="flex">
              {["SJ", "MC", "ED", "AR", "TL"].map((init, i) => {
                const c = ["#3B82F6", "#0f6a43", "#8B5CF6", "#F59E0B", "#EC4899"];
                return (
                  <div key={init}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-semibold ring-2 ring-background"
                    style={{ background: c[i], marginLeft: i === 0 ? 0 : -10, zIndex: 5 - i }}>
                    {init}
                  </div>
                );
              })}
            </div>
            <div>
              <div className="flex items-center gap-0.5 mb-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-[11px] text-muted-foreground"><span className="text-foreground font-medium">1,200+ teams</span> love Rally</p>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-[580px]">
          <AppMockup />
        </div>
      </div>
    </section>
  );
}

// ── Logo strip ────────────────────────────────────────────────────────────────

function LogosStrip() {
  return (
    <section className="border-y border-border py-10 bg-muted/30">
      <div className="max-w-6xl mx-auto px-5">
        <p className="text-center text-[12px] text-muted-foreground mb-6 uppercase tracking-wide">Trusted by teams at</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {LOGOS.map(name => (
            <span key={name} className="text-[15px] font-bold text-muted-foreground opacity-50 hover:opacity-80 transition-opacity">{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────────────────────────

function Stats() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map(({ value, label, icon: Icon }) => (
          <div key={label} className="rounded-[14px] border border-border bg-card px-5 py-5 flex items-start gap-3">
            <div className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: "var(--rally-brand-soft-light)" }}>
              <Icon className="size-4" style={{ color: "var(--rally-brand)" }} />
            </div>
            <div>
              <p className="text-[24px] font-bold text-foreground leading-none mb-1">{value}</p>
              <p className="text-[12px] text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Modules grid ──────────────────────────────────────────────────────────────

function ModulesSection() {
  return (
    <section className="border-t border-border bg-muted/20 py-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="text-[12px] text-muted-foreground uppercase tracking-wide mb-3">All-in-one platform</p>
          <h2 className="text-[32px] font-bold text-foreground mb-3">8 integrated tools,<br />zero context switching</h2>
          <p className="text-[14px] text-muted-foreground max-w-lg mx-auto">
            Every feature your team needs, designed to work together seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MODULES.map(({ icon: Icon, label, desc }) => (
            <div key={label}
              className="group rounded-[12px] border border-border bg-card p-4 hover:shadow-md transition-all cursor-pointer"
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--rally-brand)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "")}>
              <div className="w-9 h-9 rounded-[9px] flex items-center justify-center mb-3 transition-colors"
                style={{ background: "var(--rally-brand-soft-light)" }}>
                <Icon className="size-4" style={{ color: "var(--rally-brand)" }} />
              </div>
              <p className="text-[13px] font-semibold text-foreground mb-1">{label}</p>
              <p className="text-[11px] text-muted-foreground leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Feature Spotlight ─────────────────────────────────────────────────────────

type SpotlightTab = "chat" | "tasks" | "ai";

function FeatureSpotlight() {
  const [active, setActive] = useState<SpotlightTab>("chat");

  const tabs: { id: SpotlightTab; label: string; icon: React.ElementType }[] = [
    { id: "chat",  label: "Chat & Messaging", icon: MessageSquare },
    { id: "tasks", label: "Tasks & Planning",  icon: CheckSquare  },
    { id: "ai",    label: "AI Assistant",      icon: Bot          },
  ];

  const content: Record<SpotlightTab, { headline: string; body: string; bullets: string[]; visual: React.ReactNode }> = {
    chat: {
      headline: "Keep every conversation in context",
      body: "Threaded channels, direct messages, file sharing, and emoji reactions — all connected to your projects and tasks.",
      bullets: [
        "Threaded conversations per project",
        "Rich media: files, code blocks, reactions",
        "Instant search across all channels",
        "Notifications that don't interrupt deep work",
      ],
      visual: (
        <div className="rounded-[12px] border border-border bg-card p-4 space-y-2.5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--rally-brand)" }} />
            <p className="text-[12px] font-medium text-foreground"># design-team</p>
          </div>
          {[
            { name: "Sarah J", color: "#3B82F6", msg: "Figma handoff is ready for review 🎨", time: "10:14" },
            { name: "Mike C",  color: "#0f6a43", msg: "On it! Leaving comments now",           time: "10:16" },
            { name: "You",     color: "var(--rally-brand)", msg: "Great work everyone 🙌",     time: "10:18" },
          ].map(m => (
            <div key={m.name} className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                style={{ background: m.color }}>
                {m.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-[11px] font-semibold text-foreground">{m.name}</span>
                  <span className="text-[10px] text-muted-foreground">{m.time}</span>
                </div>
                <p className="text-[12px] text-muted-foreground">{m.msg}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <div className="flex-1 px-2.5 py-1.5 rounded-[6px] bg-background border border-border text-[11px] text-muted-foreground">
              Message #design-team…
            </div>
            <button className="px-3 py-1.5 rounded-[6px] text-white text-[11px]"
              style={{ background: "var(--rally-brand)" }}>Send</button>
          </div>
        </div>
      ),
    },
    tasks: {
      headline: "Tasks that keep your team moving",
      body: "Smart to-dos with priorities, assignees, due dates, and tags. Linked directly to calendar events and chat threads.",
      bullets: [
        "Drag-and-drop Kanban and list views",
        "Subtasks, dependencies & due dates",
        "Smart filters: by person, tag, or sprint",
        "Integrates with the shared calendar",
      ],
      visual: (
        <div className="rounded-[12px] border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[12px] font-medium text-foreground">Sprint 14 · Apr 28 – May 11</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full text-white"
              style={{ background: "var(--rally-brand)" }}>8 open</span>
          </div>
          {[
            { label: "Review homepage mockups",  priority: "High", tag: "Design",   done: false },
            { label: "Update component library", priority: "Med",  tag: "Frontend", done: false },
            { label: "Set up CI pipeline",       priority: "High", tag: "DevOps",   done: false },
            { label: "Write release notes",      priority: "Low",  tag: "Content",  done: true  },
          ].map(t => {
            const pc: Record<string, string> = { High: "#EF4444", Med: "#F59E0B", Low: "#10B981" };
            return (
              <div key={t.label} className="flex items-center gap-2.5 py-1.5 border-b border-border last:border-0">
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${t.done ? "border-0" : ""}`}
                  style={t.done ? { background: "var(--rally-brand)" } : { borderColor: "var(--border)" }}>
                  {t.done && <Check className="size-2.5 text-white" />}
                </div>
                <span className={`flex-1 text-[11px] ${t.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{t.label}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{t.tag}</span>
                <span className="text-[9px] font-medium" style={{ color: pc[t.priority] }}>{t.priority}</span>
              </div>
            );
          })}
        </div>
      ),
    },
    ai: {
      headline: "Your AI teammate is always ready",
      body: "Rally's AI assistant can draft messages, summarise threads, unblock tasks, answer questions about your workspace, and more.",
      bullets: [
        "Summarise long threads in one click",
        "Draft replies, specs & meeting notes",
        "Ask questions about your team's work",
        "Suggests next actions based on context",
      ],
      visual: (
        <div className="rounded-[12px] border border-border bg-card p-4 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "var(--rally-brand-soft-light)" }}>
              <Bot className="size-3.5" style={{ color: "var(--rally-brand)" }} />
            </div>
            <p className="text-[12px] font-semibold text-foreground">Rally AI</p>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full text-white ml-auto" style={{ background: "#0f6a43" }}>Online</span>
          </div>

          <div className="rounded-[8px] p-3 bg-muted/50">
            <p className="text-[11px] text-muted-foreground">You asked:</p>
            <p className="text-[12px] text-foreground mt-0.5">Summarise what the design team has been working on this week</p>
          </div>

          <div className="rounded-[8px] p-3 border border-border bg-background">
            <p className="text-[11px] text-muted-foreground mb-1.5">Rally AI replied:</p>
            <p className="text-[12px] text-foreground leading-relaxed">
              This week the design team focused on <span className="font-medium">Website Redesign v3</span>. Sarah completed the Figma handoff. Mike reviewed and left 14 comments. Emily updated the brand kit. <span style={{ color: "var(--rally-brand)" }}>3 tasks</span> are still open for Sprint 14.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {["Create follow-up tasks", "Draft standup notes", "Share summary"].map(s => (
              <button key={s} className="text-[10px] px-2 py-1 rounded-full border border-border bg-background text-muted-foreground hover:bg-muted transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      ),
    },
  };

  const c = content[active];

  return (
    <section className="max-w-6xl mx-auto px-5 py-20">
      <div className="text-center mb-10">
        <p className="text-[12px] text-muted-foreground uppercase tracking-wide mb-3">Feature spotlight</p>
        <h2 className="text-[32px] font-bold text-foreground mb-3">Built for how teams actually work</h2>
        <p className="text-[14px] text-muted-foreground max-w-lg mx-auto">
          Rally doesn't just combine tools — it makes them smarter together.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-1 p-1 rounded-[10px] bg-muted border border-border">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActive(id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-[8px] text-[12px] font-medium transition-all"
              style={active === id
                ? { background: "var(--rally-brand)", color: "#fff" }
                : { color: "var(--muted-foreground)" }}>
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-[22px] font-bold text-foreground mb-3">{c.headline}</h3>
          <p className="text-[13px] text-muted-foreground mb-6 leading-relaxed">{c.body}</p>
          <ul className="space-y-3">
            {c.bullets.map(b => (
              <li key={b} className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "var(--rally-brand-soft-light)" }}>
                  <Check className="size-2.5" style={{ color: "var(--rally-brand)" }} />
                </span>
                <span className="text-[13px] text-foreground">{b}</span>
              </li>
            ))}
          </ul>
          <Link to="/signup-v2">
            <button className="mt-7 flex items-center gap-1.5 text-[13px] font-medium transition-colors hover:underline"
              style={{ color: "var(--rally-brand)" }}>
              Explore this feature <ArrowRight className="size-3.5" />
            </button>
          </Link>
        </div>
        <div>{c.visual}</div>
      </div>
    </section>
  );
}

// ── RBAC Banner ───────────────────────────────────────────────────────────────

function RBACBanner() {
  const roles = [
    { name: "Owner",  color: "var(--rally-brand)", desc: "Full access to everything, including billing and team settings." },
    { name: "Admin",  color: "#0f5fd7", desc: "Manage members and most settings, but can't delete the workspace." },
    { name: "Member", color: "#0f6a43", desc: "Collaborate on projects, tasks, and chat channels they're invited to." },
    { name: "Viewer", color: "#6b7280", desc: "Read-only access to content shared with them. No edits." },
  ];

  return (
    <section className="border-y border-border bg-muted/20 py-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-card text-[11px] text-muted-foreground mb-5">
              <Shield className="size-3.5" style={{ color: "var(--rally-brand)" }} /> Role-based access control
            </div>
            <h2 className="text-[28px] font-bold text-foreground mb-4">The right people see<br />the right things</h2>
            <p className="text-[13px] text-muted-foreground mb-6 leading-relaxed">
              Rally's 4-tier RBAC system gives you precise control over who can read, edit, or manage each part of your workspace.
            </p>
            <Link to="/signup-v2">
              <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-[8px] text-white text-[13px] font-medium"
                style={{ background: "var(--rally-brand)" }}>
                Set up your team <ArrowRight className="size-3.5" />
              </button>
            </Link>
          </div>

          <div className="space-y-3">
            {roles.map(r => (
              <div key={r.name} className="flex items-start gap-3 p-4 rounded-[12px] border border-border bg-card">
                <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: r.color }} />
                <div>
                  <p className="text-[13px] font-semibold text-foreground mb-0.5">{r.name}</p>
                  <p className="text-[12px] text-muted-foreground leading-snug">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-20">
      <div className="text-center mb-12">
        <p className="text-[12px] text-muted-foreground uppercase tracking-wide mb-3">What teams say</p>
        <h2 className="text-[32px] font-bold text-foreground mb-3">Loved by teams worldwide</h2>
        <p className="text-[14px] text-muted-foreground max-w-lg mx-auto">Real quotes from real Rally teams.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.map(t => (
          <div key={t.name} className="rounded-[14px] border border-border bg-card p-5 flex flex-col">
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-[13px] text-foreground leading-relaxed flex-1 mb-5">"{t.content}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-semibold flex-shrink-0"
                style={{ background: t.avatarBg }}>
                {t.avatar}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-foreground">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">{t.role}, {t.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────

function Pricing() {
  return (
    <section className="border-t border-border bg-muted/20 py-20" id="pricing">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="text-[12px] text-muted-foreground uppercase tracking-wide mb-3">Pricing</p>
          <h2 className="text-[32px] font-bold text-foreground mb-3">Simple, transparent pricing</h2>
          <p className="text-[14px] text-muted-foreground max-w-lg mx-auto">Start free. Upgrade when you need more. No hidden fees.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {PRICING.map(plan => (
            <div key={plan.name}
              className="rounded-[14px] border bg-card p-6 flex flex-col relative"
              style={{ borderColor: plan.highlight ? "var(--rally-brand)" : "var(--border)" }}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-0.5 rounded-full text-white text-[11px] font-medium"
                    style={{ background: "var(--rally-brand)" }}>Most popular</span>
                </div>
              )}

              <div className="mb-5">
                <p className="text-[14px] font-semibold text-foreground mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-[32px] font-bold text-foreground">{plan.price}</span>
                  <span className="text-[12px] text-muted-foreground">{plan.per}</span>
                </div>
                <p className="text-[12px] text-muted-foreground">{plan.desc}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: plan.highlight ? "var(--rally-brand-soft-light)" : "var(--muted)" }}>
                      <Check className="size-2.5"
                        style={{ color: plan.highlight ? "var(--rally-brand)" : "var(--muted-foreground)" }} />
                    </span>
                    <span className="text-[12px] text-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <Link to={plan.name === "Team" ? "/login-v2" : "/signup-v2"}>
                <button className="w-full py-2.5 rounded-[8px] text-[13px] font-medium transition-colors"
                  style={plan.highlight
                    ? { background: "var(--rally-brand)", color: "#fff" }
                    : { border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }}>
                  {plan.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-[12px] text-muted-foreground mt-6">
          All plans include a 14-day free trial on paid features. No credit card required.
        </p>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-20">
      <div className="rounded-[20px] border border-border bg-card px-8 py-14 text-center">
        <div className="w-14 h-14 rounded-[14px] flex items-center justify-center mx-auto mb-6"
          style={{ background: "var(--rally-brand-soft-light)" }}>
          <Zap className="size-7" style={{ color: "var(--rally-brand)" }} />
        </div>
        <h2 className="text-[32px] font-bold text-foreground mb-3">Ready to transform how your team works?</h2>
        <p className="text-[14px] text-muted-foreground mb-8 max-w-lg mx-auto">
          Join over 10,000 teams already using Rally to collaborate, ship faster, and do their best work.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/signup-v2">
            <button className="flex items-center justify-center gap-2 px-7 py-3 rounded-[10px] text-white text-[14px] font-medium"
              style={{ background: "var(--rally-brand)" }}>
              Start for free <ArrowRight className="size-4" />
            </button>
          </Link>
          <Link to="/app/home">
            <button className="flex items-center justify-center gap-2 px-7 py-3 rounded-[10px] border border-border bg-background text-foreground text-[14px] hover:bg-muted transition-colors">
              <ExternalLink className="size-4" /> Explore live demo
            </button>
          </Link>
        </div>
        <p className="text-[12px] text-muted-foreground mt-5">No credit card · Free 14-day trial · Cancel anytime</p>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    { heading: "Product",   links: ["Features", "Pricing", "Security", "Changelog", "Roadmap"] },
    { heading: "Company",   links: ["About", "Careers", "Blog", "Press", "Contact"] },
    { heading: "Resources", links: ["Docs", "Help Center", "Community", "API Reference", "Status"] },
    { heading: "Legal",     links: ["Privacy", "Terms", "Cookie Policy", "Licenses"] },
  ];

  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <RallyLogo size={22} />
              <span className="text-[15px] font-bold text-foreground">Rally</span>
            </div>
            <p className="text-[12px] text-muted-foreground leading-relaxed mb-4">
              One workspace for every tool your team needs.
            </p>
            <Link to="/" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              ← Switch to classic site
            </Link>
          </div>

          {cols.map(col => (
            <div key={col.heading}>
              <p className="text-[12px] font-semibold text-foreground mb-3">{col.heading}</p>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-muted-foreground">© 2026 Rally. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function LandingV2() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <LogosStrip />
      <Stats />
      <ModulesSection />
      <FeatureSpotlight />
      <RBACBanner />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

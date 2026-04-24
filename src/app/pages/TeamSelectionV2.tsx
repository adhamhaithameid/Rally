import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Users, Plus, ArrowRight, Crown, Shield, UserCheck, Eye,
  Check, X, ChevronRight, Search, Link2, Hash,
  Zap, Clock, Wifi, Tag, Briefcase, ArrowLeft,
} from "lucide-react";
import svgPaths from "../../imports/svg-gyowvurp60";

// ── Types ─────────────────────────────────────────────────────────────────────

type Role = "owner" | "admin" | "member" | "viewer";
type Panel = "none" | "create" | "join";
type CreateStep = 1 | 2 | 3;

// ── Config ────────────────────────────────────────────────────────────────────

const ROLE_CFG: Record<Role, { label: string; color: string; bg: string; Icon: React.ElementType }> = {
  owner:  { label: "Owner",  color: "var(--rally-brand)", bg: "var(--rally-brand-soft-light)", Icon: Crown },
  admin:  { label: "Admin",  color: "#0f5fd7", bg: "#eef4ff", Icon: Shield    },
  member: { label: "Member", color: "#0f6a43", bg: "#eaf7f0", Icon: UserCheck },
  viewer: { label: "Viewer", color: "#6b7280", bg: "#f3f4f6", Icon: Eye       },
};

// ── Mock data ─────────────────────────────────────────────────────────────────

interface MockTeam {
  id: number;
  name: string;
  projectName: string;
  description: string;
  role: Role;
  members: number;
  online: number;
  lastActive: string;
  tags: string[];
  memberAvatars: string[];
}

const MOCK_TEAMS: MockTeam[] = [
  {
    id: 1,
    name: "Design Team",
    projectName: "Website Redesign",
    description: "Redesigning the company website for clarity and better user experience.",
    role: "owner",
    members: 12,
    online: 3,
    lastActive: "2 hours ago",
    tags: ["Design", "UX", "Frontend"],
    memberAvatars: ["Sarah J", "Mike C", "Emily D"],
  },
  {
    id: 2,
    name: "Marketing Squad",
    projectName: "Q1 Campaign",
    description: "Running the Q1 marketing campaign across all channels and platforms.",
    role: "member",
    members: 8,
    online: 1,
    lastActive: "1 day ago",
    tags: ["Marketing", "Content", "Brand"],
    memberAvatars: ["Alex R", "Jordan K"],
  },
  {
    id: 3,
    name: "Engineering",
    projectName: "Mobile App",
    description: "Building the Rally mobile app with React Native and a shared backend.",
    role: "admin",
    members: 24,
    online: 7,
    lastActive: "5 min ago",
    tags: ["React Native", "API", "Backend"],
    memberAvatars: ["Tom L", "Priya N", "Chris B", "Dana M"],
  },
];

const TEAM_ICON_COLORS = ["var(--rally-brand)", "#0f5fd7", "#0f6a43", "#8B5CF6", "#F59E0B", "#EC4899"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function teamIconColor(name: string): string {
  let h = 0; for (const c of name) h = c.charCodeAt(0) + ((h << 5) - h);
  return TEAM_ICON_COLORS[Math.abs(h) % TEAM_ICON_COLORS.length];
}

function avatarBg(name: string): string {
  const c = ["#3B82F6","#10B981","#F59E0B","#8B5CF6","#EC4899","#14B8A6","#F97316"];
  let h = 0; for (const ch of name) h = ch.charCodeAt(0) + ((h << 5) - h);
  return c[Math.abs(h) % c.length];
}

function MiniAv({ name, size = 22 }: { name: string; size?: number }) {
  const init = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className="rounded-full flex items-center justify-center text-white flex-shrink-0 ring-2 ring-card"
      style={{ width: size, height: size, background: avatarBg(name), fontSize: size * 0.36, fontWeight: 600 }}>
      {init}
    </div>
  );
}

function RoleBadge({ role }: { role: Role }) {
  const cfg = ROLE_CFG[role];
  const Icon = cfg.Icon;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
      style={{ background: cfg.bg, color: cfg.color }}>
      <Icon className="size-2.5" />
      {cfg.label}
    </span>
  );
}

// ── Team Card ─────────────────────────────────────────────────────────────────

function TeamCard({ team, onSelect }: { team: MockTeam; onSelect: (id: number) => void }) {
  const iconColor = teamIconColor(team.name);

  return (
    <div
      className="group flex flex-col rounded-[16px] border border-border bg-card p-4 cursor-pointer transition-all hover:shadow-md"
      style={{ transition: "border-color 0.15s, box-shadow 0.15s" }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = iconColor + "80")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "")}
      onClick={() => onSelect(team.id)}
    >
      {/* Header row */}
      <div className="flex items-start gap-3 mb-3">
        {/* Icon */}
        <div className="w-11 h-11 rounded-[12px] flex items-center justify-center text-white flex-shrink-0 text-[18px] font-bold"
          style={{ background: iconColor }}>
          {team.name.charAt(0).toUpperCase()}
        </div>
        {/* Name + project */}
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-foreground truncate">{team.name}</p>
          <p className="text-[11px] text-muted-foreground truncate">{team.projectName}</p>
        </div>
        {/* Role */}
        <RoleBadge role={team.role} />
      </div>

      {/* Description */}
      <p className="text-[12px] text-muted-foreground leading-relaxed mb-3 line-clamp-2 flex-1">
        {team.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {team.tags.map(t => (
          <span key={t} className="px-1.5 py-0.5 rounded-full text-[10px] bg-muted text-muted-foreground">
            {t}
          </span>
        ))}
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
        <div className="flex items-center gap-3">
          {/* Stacked avatars */}
          <div className="flex items-center" style={{ marginLeft: 4 }}>
            {team.memberAvatars.slice(0, 3).map((name, i) => (
              <div key={name} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 3 - i }}>
                <MiniAv name={name} size={22} />
              </div>
            ))}
            {team.members > 3 && (
              <div className="w-[22px] h-[22px] rounded-full bg-muted border-2 border-card flex items-center justify-center text-[9px] text-muted-foreground font-medium"
                style={{ marginLeft: -8, zIndex: 0 }}>
                +{team.members - 3}
              </div>
            )}
          </div>
          <span className="text-[11px] text-muted-foreground">{team.members} members</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Online indicator */}
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
            <span className="text-[11px] text-muted-foreground">{team.online} online</span>
          </div>
          {/* Last active */}
          <div className="flex items-center gap-1 text-muted-foreground hidden sm:flex">
            <Clock className="size-3" />
            <span className="text-[11px]">{team.lastActive}</span>
          </div>
        </div>
      </div>

      {/* Open button */}
      <button
        className="mt-3 w-full h-9 flex items-center justify-center gap-1.5 rounded-[10px] text-[13px] font-medium transition-colors"
        style={
          team.role === "owner"
            ? { background: "var(--rally-brand)", color: "#fff" }
            : { border: "1px solid var(--border)", background: "var(--background)", color: "var(--text-foreground)" }
        }>
        Open workspace
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  );
}

// ── Create Panel ──────────────────────────────────────────────────────────────

const ICON_EMOJIS = ["🚀", "💡", "🎯", "⚡", "🔥", "🌟", "🛠️", "🎨", "📦", "🧠", "🌿", "🔮"];

function CreatePanel({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const [step,     setStep]     = useState<CreateStep>(1);
  const [teamName, setTeamName] = useState("");
  const [projName, setProjName] = useState("");
  const [desc,     setDesc]     = useState("");
  const [icon,     setIcon]     = useState("🚀");
  const [tags,     setTags]     = useState("");
  const [emails,   setEmails]   = useState("");

  const canNext1 = teamName.trim().length >= 2 && projName.trim().length >= 2;
  const canNext2 = true; // step 2 is optional

  function handleDone() {
    onDone();
  }

  return (
    <div className="rounded-[16px] border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
        <button onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground transition-colors flex-shrink-0">
          <ArrowLeft className="size-4" />
        </button>
        <div className="flex-1">
          <p className="text-[14px] font-semibold text-foreground">Create a new workspace</p>
          <p className="text-[11px] text-muted-foreground">Step {step} of 3</p>
        </div>
        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map(s => (
            <span key={s} className="w-2 h-2 rounded-full transition-colors"
              style={{ background: s <= step ? "var(--rally-brand)" : "var(--muted-foreground)", opacity: s < step ? 0.4 : 1 }} />
          ))}
        </div>
      </div>

      <div className="px-5 py-5">
        {/* Step 1 — Identity */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-medium text-foreground mb-1.5">Team Name <span className="text-red-400">*</span></label>
              <input value={teamName} onChange={e => setTeamName(e.target.value)}
                placeholder="e.g. Design Team"
                autoFocus
                className="w-full px-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground" />
              <p className="text-[10px] text-muted-foreground mt-1">The name of your team or department</p>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-foreground mb-1.5">Project Name <span className="text-red-400">*</span></label>
              <input value={projName} onChange={e => setProjName(e.target.value)}
                placeholder="e.g. Website Redesign"
                className="w-full px-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground" />
              <p className="text-[10px] text-muted-foreground mt-1">What is this workspace focused on?</p>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setStep(2)}
                disabled={!canNext1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-[8px] text-white text-[12px] font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "var(--rally-brand)" }}>
                Continue <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Details */}
        {step === 2 && (
          <div className="space-y-4">
            {/* Team icon */}
            <div>
              <label className="block text-[11px] font-medium text-foreground mb-1.5">Team Icon</label>
              <div className="flex items-center gap-3 flex-wrap">
                {/* Preview */}
                <div className="w-12 h-12 rounded-[12px] flex items-center justify-center text-[22px] flex-shrink-0"
                  style={{ background: teamIconColor(teamName) }}>
                  {icon}
                </div>
                {/* Picker */}
                <div className="flex flex-wrap gap-1.5">
                  {ICON_EMOJIS.map(e => (
                    <button key={e} onClick={() => setIcon(e)}
                      className="w-9 h-9 rounded-[8px] text-lg flex items-center justify-center transition-colors"
                      style={icon === e ? { background: "var(--rally-brand-soft-light)", border: "2px solid var(--rally-brand)" } : { border: "1px solid var(--border)", background: "var(--background)" }}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] font-medium text-foreground mb-1.5">Description <span className="text-muted-foreground">(optional)</span></label>
              <textarea value={desc} onChange={e => setDesc(e.target.value)}
                rows={2} placeholder="What is this team building or working on?"
                className="w-full px-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[var(--rally-brand)] resize-none transition-colors placeholder:text-muted-foreground" />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-[11px] font-medium text-foreground mb-1.5">Tags <span className="text-muted-foreground">(optional, comma-separated)</span></label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input value={tags} onChange={e => setTags(e.target.value)}
                  placeholder="Design, UX, Frontend"
                  className="w-full pl-9 pr-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground" />
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button onClick={() => setStep(1)}
                className="flex items-center gap-1 px-3 py-2 rounded-[8px] border border-border bg-background text-muted-foreground hover:bg-muted text-[12px] transition-colors">
                <ArrowLeft className="size-3.5" /> Back
              </button>
              <button onClick={() => setStep(3)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-[8px] text-white text-[12px] font-medium"
                style={{ background: "var(--rally-brand)" }}>
                Continue <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Invite */}
        {step === 3 && (
          <div className="space-y-4">
            {/* Preview card */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-[10px] bg-muted/40 border border-border">
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[18px] flex-shrink-0"
                style={{ background: teamIconColor(teamName) }}>
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground">{teamName}</p>
                <p className="text-[11px] text-muted-foreground">{projName}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full text-white" style={{ background: "var(--rally-brand)" }}>Owner</span>
            </div>

            {/* Invite emails */}
            <div>
              <label className="block text-[11px] font-medium text-foreground mb-1.5">Invite teammates <span className="text-muted-foreground">(optional)</span></label>
              <textarea value={emails} onChange={e => setEmails(e.target.value)}
                rows={3}
                placeholder={"sarah@company.com\nmike@company.com\nemily@company.com"}
                className="w-full px-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[12px] outline-none focus:border-[var(--rally-brand)] resize-none transition-colors placeholder:text-muted-foreground font-mono" />
              <p className="text-[10px] text-muted-foreground mt-1">One email per line. Invites will be sent when you create the workspace.</p>
            </div>

            <div className="flex justify-between pt-2">
              <button onClick={() => setStep(2)}
                className="flex items-center gap-1 px-3 py-2 rounded-[8px] border border-border bg-background text-muted-foreground hover:bg-muted text-[12px] transition-colors">
                <ArrowLeft className="size-3.5" /> Back
              </button>
              <button onClick={handleDone}
                className="flex items-center gap-1.5 px-5 py-2 rounded-[8px] text-white text-[12px] font-medium"
                style={{ background: "var(--rally-brand)" }}>
                <Zap className="size-3.5" />
                Create workspace
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Join Panel ────────────────────────────────────────────────────────────────

function JoinPanel({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const [code,       setCode]       = useState("");
  const [searching,  setSearching]  = useState(false);
  const [found,      setFound]      = useState(false);

  function handleLookup() {
    if (!code.trim()) return;
    setSearching(true);
    setTimeout(() => { setSearching(false); setFound(true); }, 900);
  }

  return (
    <div className="rounded-[16px] border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
        <button onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground transition-colors flex-shrink-0">
          <ArrowLeft className="size-4" />
        </button>
        <div>
          <p className="text-[14px] font-semibold text-foreground">Join a workspace</p>
          <p className="text-[11px] text-muted-foreground">Enter an invite link or team code</p>
        </div>
      </div>

      <div className="px-5 py-5 space-y-4">
        <div>
          <label className="block text-[11px] font-medium text-foreground mb-1.5">Invite link or team code</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input value={code} onChange={e => setCode(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLookup()}
                placeholder="https://rally.app/invite/… or TEAM-CODE"
                autoFocus
                className="w-full pl-9 pr-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground" />
            </div>
            <button onClick={handleLookup}
              disabled={!code.trim() || searching}
              className="px-3 py-2.5 rounded-[8px] text-[12px] font-medium border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0">
              {searching ? (
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full border-2 border-[var(--rally-brand)] border-t-transparent animate-spin" />
                  Looking…
                </span>
              ) : "Look up"}
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">Paste a Rally invite link or type a 9-character team code</p>
        </div>

        {/* Found team preview */}
        {found && (
          <div className="rounded-[12px] border border-border bg-muted/30 p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[18px]"
                style={{ background: "#0f6a43" }}>
                🌿
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground">Product Strategy</p>
                <p className="text-[11px] text-muted-foreground">Rally Roadmap 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="size-3" /> 15 members</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
                4 online
              </span>
              <span className="flex items-center gap-1"><Hash className="size-3" /> 3 channels</span>
            </div>
            <button onClick={onDone}
              className="w-full h-9 flex items-center justify-center gap-1.5 rounded-[8px] text-white text-[13px] font-medium"
              style={{ background: "var(--rally-brand)" }}>
              Join workspace <ArrowRight className="size-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function TeamSelectionV2() {
  const navigate = useNavigate();
  const [panel,  setPanel]  = useState<Panel>("none");
  const [search, setSearch] = useState("");

  const filtered = MOCK_TEAMS.filter(t =>
    !search ||
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.projectName.toLowerCase().includes(search.toLowerCase())
  );

  function handleSelectTeam(_id: number) {
    navigate("/app/home");
  }

  function handleDone() {
    navigate("/app/home");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-2.5">
          <svg viewBox="27 26 133 127" width="24" height="24" fill="none">
            <path d={svgPaths.p6b466c0} fill="var(--rally-brand)" />
          </svg>
          <span className="text-[16px] font-bold text-foreground">Rally</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full text-white ml-1" style={{ background: "var(--rally-brand)" }}>
            V2
          </span>
        </div>
        <button onClick={() => navigate("/team-selection")}
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="size-3.5" /> Classic view
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center px-4 py-8 overflow-y-auto">
        <div className="w-full max-w-4xl">

          {/* Greeting */}
          <div className="mb-7">
            <h1 className="text-[22px] font-bold text-foreground mb-1">Welcome back, John.</h1>
            <p className="text-[13px] text-muted-foreground">Pick a workspace to continue, or start a new one.</p>
          </div>

          {/* Panel: create or join */}
          {panel === "create" && (
            <div className="mb-6">
              <CreatePanel onClose={() => setPanel("none")} onDone={handleDone} />
            </div>
          )}
          {panel === "join" && (
            <div className="mb-6">
              <JoinPanel onClose={() => setPanel("none")} onDone={handleDone} />
            </div>
          )}

          {/* Teams section */}
          {panel === "none" && (
            <>
              {/* Search + actions row */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search workspaces…"
                    className="pl-8 pr-3 h-9 w-52 rounded-[8px] border border-border bg-background text-[12px] text-foreground placeholder:text-muted-foreground outline-none focus:border-[var(--rally-brand)] transition-colors" />
                </div>
                <div className="flex-1" />
                <button onClick={() => setPanel("join")}
                  className="flex items-center gap-1.5 h-9 px-3 rounded-[8px] border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-[12px]">
                  <Link2 className="size-3.5" /> Join with code
                </button>
                <button onClick={() => setPanel("create")}
                  className="flex items-center gap-1.5 h-9 px-3 rounded-[8px] text-white text-[12px] font-medium"
                  style={{ background: "var(--rally-brand)" }}>
                  <Plus className="size-3.5" /> New workspace
                </button>
              </div>

              {/* Team grid */}
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map(team => (
                    <TeamCard key={team.id} team={team} onSelect={handleSelectTeam} />
                  ))}

                  {/* Create card — always last */}
                  <div
                    onClick={() => setPanel("create")}
                    className="flex flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-border bg-background cursor-pointer hover:border-[var(--rally-brand)] hover:bg-[var(--rally-brand-soft-light)] transition-all group min-h-[220px]">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center mb-3 transition-colors"
                      style={{ background: "var(--rally-brand-soft-light)" }}>
                      <Plus className="size-5" style={{ color: "var(--rally-brand)" }} />
                    </div>
                    <p className="text-[13px] font-semibold text-foreground">New workspace</p>
                    <p className="text-[11px] text-muted-foreground mt-1">Start from scratch</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Users className="size-12 text-muted-foreground opacity-20 mb-3" />
                  <p className="text-[13px] text-muted-foreground">No workspaces match "{search}"</p>
                </div>
              )}

              {/* Stats bar */}
              <div className="flex items-center gap-5 mt-6 pt-5 border-t border-border text-[11px] text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="size-3.5" />
                  {MOCK_TEAMS.length} workspaces
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#10B981" }} />
                  {MOCK_TEAMS.reduce((s, t) => s + t.online, 0)} people online
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="size-3.5" />
                  {MOCK_TEAMS.reduce((s, t) => s + t.members, 0)} total members
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
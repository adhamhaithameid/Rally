import { Link, Outlet, useLocation, useNavigate } from "react-router";
import svgPaths from "../../imports/svg-gyowvurp60";
import {
  MessageSquare,
  Bot,
  CheckSquare,
  Calendar,
  FolderOpen,
  Users,
  Moon,
  Sun,
  Menu,
  X,
  User,
  Palette,
  Home,
  Check,
  Layers,
  Boxes,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useVersion } from "../contexts/VersionContext";
import {
  SecondarySidebarProvider,
  useSecondarySidebar,
} from "../contexts/SecondarySidebarContext";

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  id: string;
  shortcut: string;
}

// Nav items shared across both versions (only design-system is fully static now)
const sharedNavItems: NavItem[] = [
  { path: "/app/design-system",      label: "System",    icon: Palette, id: "nav-design-system",      shortcut: "S" },
  { path: "/app/theme-settings",     label: "Themes",    icon: Layers,  id: "nav-theme-settings",     shortcut: "Y" },
  { path: "/app/element-inventory",  label: "Elements",  icon: Boxes,   id: "nav-element-inventory",  shortcut: "E" },
];

const profileItem: NavItem = {
  path: "/app/profile",
  label: "Profile",
  icon: User,
  id: "nav-profile",
  shortcut: "P",
};

// ── Version switcher popover ───────────────────────────────────────────────────

const versions = [
  {
    id: "v1" as const,
    label: "Version 1",
    sub: "Classic",
    desc: "Original dashboard and layout",
    homePath: "/app/dashboard",
  },
  {
    id: "v2" as const,
    label: "Version 2",
    sub: "Command Center",
    desc: "New dashboard with AI brief & team pulse",
    homePath: "/app/home",
  },
];

function VersionSwitcher({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { version, setVersion } = useVersion();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      {/* Popover — floats to the right of the sidebar logo area */}
      <div
        className="fixed z-50 top-[12px] left-[87px] w-[220px] bg-card border border-border rounded-[14px] shadow-xl overflow-hidden"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      >
        {/* Header */}
        <div className="px-3 pt-3 pb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <svg viewBox="27 26 133 127" width="16" height="16" fill="none">
              <path d={svgPaths.p6b466c0} fill="var(--rally-brand)" />
            </svg>
            <span className="text-[12px] font-medium text-foreground">Rally</span>
            <span className="ml-auto text-[10px] text-muted-foreground">Switch version</span>
          </div>
        </div>

        {/* Version options */}
        <div className="p-2 space-y-1">
          {versions.map((v) => {
            const active = version === v.id;
            return (
              <button
                key={v.id}
                onClick={() => {
                  setVersion(v.id);
                  navigate(v.homePath);
                  onClose();
                }}
                className="w-full flex items-start gap-3 px-3 py-2.5 rounded-[10px] text-left transition-colors"
                style={
                  active
                    ? { background: "var(--rally-brand-soft)", border: "1px solid var(--rally-brand)" }
                    : { border: "1px solid transparent" }
                }
              >
                {/* Version badge */}
                <div
                  className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 text-[11px] font-bold mt-0.5"
                  style={
                    active
                      ? { background: "var(--rally-brand)", color: "#fff" }
                      : { background: "var(--muted)", color: "var(--muted-foreground)" }
                  }
                >
                  {v.id === "v1" ? "1" : "2"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[12px] font-medium"
                      style={{ color: active ? "var(--rally-brand)" : "var(--text-foreground)" }}
                    >
                      {v.label}
                    </span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={
                        active
                          ? { background: "var(--rally-brand)", color: "#fff" }
                          : { background: "var(--muted)", color: "var(--muted-foreground)" }
                      }
                    >
                      {v.sub}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                    {v.desc}
                  </p>
                </div>

                {active && (
                  <Check
                    className="size-3.5 flex-shrink-0 mt-1"
                    style={{ color: "var(--rally-brand)" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="px-3 py-2 border-t border-border">
          <p className="text-[10px] text-muted-foreground">
            Click the Rally logo anytime to switch.
          </p>
        </div>
      </div>
    </>
  );
}

// ── Corner badge (keyboard shortcut mode) ─────────────────────────────────────

function ShortcutCornerBadge({ letter }: { letter: string }) {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-1.5 -right-1.5 min-w-[15px] h-[15px] flex items-center justify-center rounded text-white text-[8px] font-mono font-bold leading-none border border-background pointer-events-none"
      style={{ background: "var(--info-solid)" }}
    >
      {letter}
    </span>
  );
}

// ── Layout inner ──────────────────────────────────────────────────────────────

function LayoutInner() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { version } = useVersion();
  const { secondarySidebar } = useSecondarySidebar();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shortcutMode, setShortcutMode] = useState(false);
  const [versionPopoverOpen, setVersionPopoverOpen] = useState(false);

  const isIconOnly = false;

  // Home nav item — path depends on active version
  const homeNavItem: NavItem = {
    path: version === "v2" ? "/app/home" : "/app/dashboard",
    label: "Home",
    icon: Home,
    id: "nav-home",
    shortcut: "G",
  };

  // Chat nav item — also version-aware
  const chatNavItem: NavItem = {
    path: version === "v2" ? "/app/chat-v2" : "/app/chat",
    label: "Chat",
    icon: MessageSquare,
    id: "nav-chat",
    shortcut: "H",
  };

  // AI Chat nav item — version-aware
  const aiChatNavItem: NavItem = {
    path: version === "v2" ? "/app/ai-chat-v2" : "/app/ai-chat",
    label: "AI Chat",
    icon: Bot,
    id: "nav-ai-chat",
    shortcut: "A",
  };

  // To-Do nav item — version-aware
  const todoNavItem: NavItem = {
    path: version === "v2" ? "/app/todo-v2" : "/app/todo",
    label: "To-Do",
    icon: CheckSquare,
    id: "nav-todo",
    shortcut: "T",
  };

  // Calendar nav item — version-aware
  const calendarNavItem: NavItem = {
    path: version === "v2" ? "/app/calendar-v2" : "/app/calendar",
    label: "Calendar",
    icon: Calendar,
    id: "nav-calendar",
    shortcut: "E",
  };

  // Files nav item — version-aware
  const filesNavItem: NavItem = {
    path: version === "v2" ? "/app/files-v2" : "/app/files",
    label: "Files",
    icon: FolderOpen,
    id: "nav-files",
    shortcut: "F",
  };

  // Team nav item — version-aware
  const teamNavItem: NavItem = {
    path: version === "v2" ? "/app/team-v2" : "/app/team",
    label: "Team",
    icon: Users,
    id: "nav-team",
    shortcut: "M",
  };

  // Profile nav item — version-aware
  const profileNavItem: NavItem = {
    path: version === "v2" ? "/app/profile-v2" : "/app/profile",
    label: "Profile",
    icon: User,
    id: "nav-profile",
    shortcut: "P",
  };

  const navItems: NavItem[] = [homeNavItem, chatNavItem, aiChatNavItem, todoNavItem, calendarNavItem, filesNavItem, teamNavItem, ...sharedNavItems];
  const allShortcuts = [...navItems, profileNavItem];

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Meta" || e.key === "Control") {
        setShortcutMode(true);
        return;
      }
      if (!e.ctrlKey && !e.metaKey) return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      const item = allShortcuts.find(
        (n) => n.shortcut.toLowerCase() === e.key.toLowerCase()
      );
      if (item) {
        e.preventDefault();
        navigate(item.path);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Meta" || e.key === "Control") setShortcutMode(false);
    };
    const onBlur = () => setShortcutMode(false);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [navigate, version]);

  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPod|iPad/.test(navigator.userAgent);
  const modKey = isMac ? "⌘" : "Ctrl+";

  function isActive(path: string) {
    if (location.pathname === path) return true;
    // Treat both home paths as active for the Home nav item
    if (
      path === homeNavItem.path &&
      (location.pathname === "/app" ||
        location.pathname === "/app/dashboard" ||
        location.pathname === "/app/home")
    ) {
      return (
        path === "/app/dashboard"
          ? location.pathname === "/app/dashboard" || location.pathname === "/app"
          : location.pathname === "/app/home"
      );
    }
    return false;
  }

  function navLinkClass(active: boolean) {
    return [
      "flex rounded-xl transition-colors",
      "flex-col items-center gap-1 py-2.5 px-1 w-full",
      active
        ? "bg-[var(--selected-bg)] text-[var(--selected-text)]"
        : "text-foreground hover:bg-muted",
    ].join(" ");
  }

  function renderNavIcon(Icon: React.ElementType, shortcut: string) {
    return (
      <div className="relative">
        <Icon className="size-5 flex-shrink-0" />
        {shortcutMode && <ShortcutCornerBadge letter={shortcut} />}
      </div>
    );
  }

  function renderNavLabel(label: string) {
    return (
      <span className="text-[10px] leading-tight font-medium text-center truncate w-full" style={{ color: "var(--text-tertiary)" }}>
        {label}
      </span>
    );
  }

  const primaryNavWidth = "w-[72px]";

  const sidebarContent = (
    <div className={`h-full flex flex-col flex-shrink-0 ${primaryNavWidth}`}>

      {/* Logo — click to open version switcher */}
      <div className="flex items-center justify-center border-b border-[var(--border-subtle)] px-2 py-4 flex-shrink-0">
        <button
          onClick={() => setVersionPopoverOpen((o) => !o)}
          className="relative flex items-center justify-center w-10 h-10 rounded-[10px] hover:bg-muted transition-colors group"
          title="Switch version"
          aria-label="Switch Rally version"
        >
          <svg viewBox="27 26 133 127" width="26" height="26" fill="none">
            <path d={svgPaths.p6b466c0} fill="var(--rally-brand)" />
          </svg>
          {/* Version badge — bottom-right corner of logo button */}
          <span
            className="absolute bottom-0.5 right-0.5 w-[14px] h-[14px] rounded-full flex items-center justify-center text-white text-[8px] font-bold leading-none border border-card transition-colors"
            style={{ background: "var(--rally-brand)" }}
          >
            {version === "v1" ? "1" : "2"}
          </span>
        </button>

        {/* Version switcher popover */}
        <VersionSwitcher
          open={versionPopoverOpen}
          onClose={() => setVersionPopoverOpen(false)}
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2" id="main-navigation">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <li key={item.id}>
                <Link
                  id={item.id}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={navLinkClass(active)}
                  title={`${item.label} (${modKey}${item.shortcut})`}
                >
                  {renderNavIcon(Icon, item.shortcut)}
                  {renderNavLabel(item.label)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom: theme + profile */}
      <div className="flex-shrink-0 border-t border-[var(--border-subtle)] px-2 py-3 space-y-1">

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center gap-1 py-2.5 px-1 w-full rounded-xl transition-colors text-foreground hover:bg-muted"
          title={theme === "light" ? "Dark Mode" : "Light Mode"}
        >
          {theme === "light" ? (
            <Moon className="size-5 flex-shrink-0" />
          ) : (
            <Sun className="size-5 flex-shrink-0" />
          )}
          <span className="text-[10px] leading-tight font-medium text-center" style={{ color: "var(--text-tertiary)" }}>Theme</span>
        </button>

        {/* Profile */}
        <Link
          to={profileNavItem.path}
          onClick={() => setSidebarOpen(false)}
          className={navLinkClass(location.pathname === "/app/profile" || location.pathname === "/app/profile-v2")}
          title={`Profile (${modKey}P)`}
        >
          <div className="relative">
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--rally-brand)" }}>
              <span className="text-white text-xs font-medium">
                {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
              </span>
            </div>
            {shortcutMode && <ShortcutCornerBadge letter={profileNavItem.shortcut} />}
          </div>
          <span className="text-[10px] leading-tight font-medium text-center truncate w-full" style={{ color: "var(--text-tertiary)" }}>
            Profile
          </span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-background p-3 gap-0">

      {/* Mobile hamburger */}
      <button
        onClick={() => setSidebarOpen((o) => !o)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-card p-2 rounded-xl border border-border"
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          sidebarOpen ? "fixed inset-y-0 left-0 z-40 m-3" : "hidden lg:flex",
          "rounded-2xl bg-card border overflow-hidden flex-shrink-0 flex flex-row mr-3 transition-[border-color] duration-150",
          shortcutMode ? "border-[var(--info-solid)]" : "border-border",
        ].join(" ")}
      >
        {sidebarContent}

        {/* Secondary sidebar (Chat, AI Chat, etc.) */}
        {secondarySidebar && (
          <>
            <div className="w-px bg-border flex-shrink-0" />
            <div className="w-60 flex flex-col overflow-hidden">
              {secondarySidebar}
            </div>
          </>
        )}
      </aside>

      {/* Main content — wrapped with #4A403C stroke */}
      <main
        className="flex-1 overflow-hidden rounded-xl bg-background min-w-0"
        style={{ boxShadow: "0 0 0 1px #4a403c" }}
      >
        {/* Inner scroll container so the border-radius isn't clipped */}
        <div className="h-full overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function Layout() {
  return (
    <SecondarySidebarProvider>
      <LayoutInner />
    </SecondarySidebarProvider>
  );
}
import { useState, useRef, useCallback } from "react";
import {
  Search, Upload, Plus, Zap, X, Star, StarOff, Download,
  Folder, FolderOpen, ChevronRight, ChevronDown, MoreHorizontal,
  FileText, MessageSquare, Calendar, CheckSquare, Clock, Users,
  ArrowUpRight, LayoutGrid, List, Pencil, Trash2, Move,
  AlertCircle, History, Lock, Eye, Check, Home,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

// ── Types ─────────────────────────────────────────────────────────────────────

type NavView   = "home" | "browse" | "recents" | "starred";
type LinkKind  = "chat" | "task" | "event" | "ai";
type ViewMode  = "list" | "grid";
type SortKey   = "name" | "date" | "size" | "type";

interface FileLink { type: LinkKind; label: string }

interface VersionEntry {
  ver: number; author: string; time: string; note: string;
}

interface FileItem {
  id: string; name: string; ext: string;
  folderId: string; size: string;
  lastEditedBy: string; lastEditedAt: string;
  starred: boolean; version: number;
  links?: FileLink[];
}

interface FolderItem {
  id: string; name: string; parentId: string | null;
  color: string; fileCount: number; lastUpdated: string; starred: boolean;
}

// ── Config ────────────────────────────────────────────────────────────────────

const EXT: Record<string, { color: string; label: string }> = {
  fig:  { color: "#8B5CF6", label: "Figma"   },
  pdf:  { color: "#EF4444", label: "PDF"     },
  xlsx: { color: "#10B981", label: "Sheet"   },
  md:   { color: "#3B82F6", label: "Doc"     },
  pptx: { color: "#F97316", label: "Slides"  },
  docx: { color: "#60A5FA", label: "Doc"     },
  png:  { color: "#14B8A6", label: "Image"   },
  jpg:  { color: "#14B8A6", label: "Image"   },
  zip:  { color: "#9CA3AF", label: "Archive" },
  mp4:  { color: "#EC4899", label: "Video"   },
};
const EXTS = (ext: string) => EXT[ext] ?? { color: "#6B7280", label: "File" };

const LINK_COLOR: Record<LinkKind, string> = {
  chat: "var(--info-on)", task: "var(--warning-on)", event: "var(--error-on)", ai: "var(--rally-brand-on)",
};
const LINK_ICON: Record<LinkKind, React.ElementType> = {
  chat: MessageSquare, task: CheckSquare, event: Calendar, ai: Zap,
};

// ── Mock data ─────────────────────────────────────────────────────────────────

const initialFolders: FolderItem[] = [
  { id: "design",      name: "Design",      parentId: null,      color: "#8B5CF6", fileCount: 4,  lastUpdated: "2h ago",   starred: true  },
  { id: "engineering", name: "Engineering", parentId: null,      color: "#3B82F6", fileCount: 5,  lastUpdated: "1h ago",   starred: false },
  { id: "marketing",   name: "Marketing",   parentId: null,      color: "#F97316", fileCount: 3,  lastUpdated: "2d ago",   starred: false },
  { id: "planning",    name: "Planning",    parentId: null,      color: "#10B981", fileCount: 4,  lastUpdated: "4h ago",   starred: true  },
  { id: "shared",      name: "Shared",      parentId: null,      color: "#6B7280", fileCount: 2,  lastUpdated: "1w ago",   starred: false },
  { id: "logo-assets", name: "Logo Assets", parentId: "design",  color: "#8B5CF6", fileCount: 4,  lastUpdated: "1w ago",   starred: false },
  { id: "sprint-docs", name: "Sprint Docs", parentId: "engineering", color: "#3B82F6", fileCount: 7, lastUpdated: "3h ago", starred: false },
];

const initialFiles: FileItem[] = [
  {
    id: "f1", name: "Website_Header_v3", ext: "fig", folderId: "design",
    size: "24 MB", lastEditedBy: "John Doe", lastEditedAt: "2h ago",
    starred: false, version: 3,
    links: [{ type: "task", label: "Review mobile header design" }, { type: "chat", label: "#design" }],
  },
  {
    id: "f2", name: "Design_System_Audit", ext: "pdf", folderId: "design",
    size: "4.2 MB", lastEditedBy: "Sarah Johnson", lastEditedAt: "Yesterday",
    starred: true, version: 1, links: [],
  },
  {
    id: "f3", name: "API_Spec_v2", ext: "md", folderId: "engineering",
    size: "312 KB", lastEditedBy: "Emily Davis", lastEditedAt: "1h ago",
    starred: false, version: 3,
    links: [{ type: "task", label: "Finalize API spec v2" }],
  },
  {
    id: "f4", name: "Sprint_23_Backlog", ext: "xlsx", folderId: "engineering",
    size: "1.8 MB", lastEditedBy: "Mike Chen", lastEditedAt: "3h ago",
    starred: true, version: 2,
    links: [{ type: "event", label: "Sprint Planning" }, { type: "chat", label: "#engineering" }],
  },
  {
    id: "f5", name: "Demo_Deck_v2", ext: "pptx", folderId: "marketing",
    size: "18.4 MB", lastEditedBy: "Emily Davis", lastEditedAt: "2d ago",
    starred: false, version: 2,
    links: [{ type: "event", label: "Customer Demo" }, { type: "chat", label: "#demos" }],
  },
  {
    id: "f6", name: "Brand_Guidelines", ext: "pdf", folderId: "marketing",
    size: "7.1 MB", lastEditedBy: "Sarah Johnson", lastEditedAt: "1w ago",
    starred: true, version: 1, links: [],
  },
  {
    id: "f7", name: "Q2_Launch_Brief", ext: "pdf", folderId: "planning",
    size: "2.3 MB", lastEditedBy: "John Doe", lastEditedAt: "4h ago",
    starred: false, version: 2,
    links: [{ type: "task", label: "Prepare Q2 launch brief" }, { type: "event", label: "Q2 Planning Session" }],
  },
  {
    id: "f8", name: "Product_Roadmap_Q2", ext: "pdf", folderId: "planning",
    size: "3.7 MB", lastEditedBy: "John Doe", lastEditedAt: "Yesterday",
    starred: true, version: 1,
    links: [{ type: "chat", label: "#product" }],
  },
  {
    id: "f9", name: "Company_Handbook", ext: "pdf", folderId: "shared",
    size: "5.2 MB", lastEditedBy: "Sarah Johnson", lastEditedAt: "1mo ago",
    starred: false, version: 1, links: [],
  },
  {
    id: "f10", name: "Onboarding_Guide", ext: "docx", folderId: "shared",
    size: "840 KB", lastEditedBy: "John Doe", lastEditedAt: "2w ago",
    starred: false, version: 1, links: [],
  },
  {
    id: "f11", name: "Header_v3_Annotations", ext: "fig", folderId: "design",
    size: "12.8 MB", lastEditedBy: "Sarah Johnson", lastEditedAt: "3h ago",
    starred: false, version: 4,
    links: [{ type: "task", label: "Review mobile header design" }],
  },
  {
    id: "f12", name: "Component_Library", ext: "fig", folderId: "logo-assets",
    size: "89.3 MB", lastEditedBy: "Sarah Johnson", lastEditedAt: "5d ago",
    starred: true, version: 8, links: [],
  },
];

const MOCK_VERSIONS: Record<string, VersionEntry[]> = {
  f3: [
    { ver: 3, author: "Emily Davis",    time: "1h ago",    note: "Added error codes section" },
    { ver: 2, author: "Emily Davis",    time: "2 days ago", note: "Restructured API endpoints" },
    { ver: 1, author: "Emily Davis",    time: "1 week ago", note: "Initial draft" },
  ],
  f1: [
    { ver: 3, author: "John Doe",       time: "2h ago",    note: "Header review annotations" },
    { ver: 2, author: "Sarah Johnson",  time: "Yesterday", note: "Updated CTA button styles" },
    { ver: 1, author: "Sarah Johnson",  time: "3 days ago", note: "Initial designs" },
  ],
  f4: [
    { ver: 2, author: "Mike Chen",      time: "3h ago",    note: "Added capacity planning" },
    { ver: 1, author: "Mike Chen",      time: "1 week ago", note: "Initial sprint backlog" },
  ],
  f7: [
    { ver: 2, author: "John Doe",       time: "4h ago",    note: "Added risk matrix" },
    { ver: 1, author: "John Doe",       time: "2 days ago", note: "First draft" },
  ],
};

// Curated lists for Home sections
const CONTINUE_WORKING_IDS = ["f1", "f7", "f4", "f8", "f5"];
const RECENTLY_UPDATED: { fileId: string; who: string; when: string }[] = [
  { fileId: "f3",  who: "Emily Davis",   when: "1h ago"    },
  { fileId: "f11", who: "Sarah Johnson", when: "3h ago"    },
  { fileId: "f4",  who: "Mike Chen",     when: "3h ago"    },
  { fileId: "f7",  who: "John Doe",      when: "4h ago"    },
  { fileId: "f2",  who: "Sarah Johnson", when: "Yesterday" },
];
const LINKED_IDS = ["f3", "f4", "f1", "f7", "f5"];

// ── Helpers ───────────────────────────────────────────────────────────────────

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

// ── File type icon ────────────────────────────────────────────────────────────

function FileTypeIcon({ ext, size = 34 }: { ext: string; size?: number }) {
  const cfg = EXTS(ext);
  const label = ext.slice(0, 4).toUpperCase();
  return (
    <div className="flex-shrink-0 rounded-[8px] flex items-center justify-center"
      style={{ width: size, height: size, background: `${cfg.color}18` }}>
      <span className="font-medium" style={{ color: cfg.color, fontSize: size * 0.26 }}>{label}</span>
    </div>
  );
}

// ── File preview placeholder ──────────────────────────────────────────────────

function FilePreviewBlock({ file }: { file: FileItem }) {
  const cfg = EXTS(file.ext);
  return (
    <div className="rounded-[10px] border border-border flex flex-col items-center justify-center py-8"
      style={{ background: `${cfg.color}08` }}>
      <div className="text-[36px] font-black mb-2" style={{ color: `${cfg.color}40` }}>
        {file.ext.toUpperCase()}
      </div>
      <p className="text-[11px] text-muted-foreground max-w-[160px] truncate text-center">
        {file.name}.{file.ext}
      </p>
      <button className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] border border-border bg-card text-[11px] text-foreground hover:bg-muted transition-colors">
        <ArrowUpRight className="size-3.5" /> Open file
      </button>
    </div>
  );
}

// ── Link chip ─────────────────────────────────────────────────────────────────

function LinkChip({ link }: { link: FileLink }) {
  const Icon  = LINK_ICON[link.type];
  const color = LINK_COLOR[link.type];
  return (
    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[10px] font-medium"
      style={{ borderColor: `${color}40`, background: `${color}0d`, color }}>
      <Icon className="size-2.5 flex-shrink-0" />
      <span className="max-w-[80px] truncate">{link.label}</span>
    </div>
  );
}

// ── File row (list view) ──────────────────────────────────────────────────────

function FileRow({
  file, selected, onSelect, onStar, canEdit,
}: {
  file: FileItem; selected: boolean;
  onSelect: () => void; onStar: () => void; canEdit: boolean;
}) {
  const [menu, setMenu] = useState(false);
  const cfg = EXTS(file.ext);

  return (
    <div onClick={onSelect}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] border cursor-pointer group transition-all ${
        selected ? "border-[var(--rally-brand)] bg-[var(--rally-brand-soft)]" : "border-border bg-card hover:bg-muted/30 hover:border-[var(--border)]"
      }`}>
      <FileTypeIcon ext={file.ext} size={32} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-foreground truncate">{file.name}.{file.ext}</span>
          {file.version > 1 && (
            <span className="flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded-full"
              style={{ background: `${cfg.color}18`, color: cfg.color }}>
              v{file.version}
            </span>
          )}
        </div>
        {file.links && file.links.length > 0 && (
          <div className="flex items-center gap-1 mt-1 flex-wrap">
            {file.links.slice(0, 3).map((lk, i) => <LinkChip key={i} link={lk} />)}
          </div>
        )}
      </div>

      {/* Meta — hidden on narrow screens */}
      <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
        <Av name={file.lastEditedBy} size={18} />
        <span className="text-[11px] text-muted-foreground">{file.lastEditedAt}</span>
      </div>
      <span className="hidden md:block text-[11px] text-muted-foreground flex-shrink-0 w-16 text-right">{file.size}</span>

      {/* Actions */}
      <button onClick={e => { e.stopPropagation(); onStar(); }}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
        {file.starred
          ? <Star className="size-3.5 fill-current" style={{ color: "#F59E0B" }} />
          : <StarOff className="size-3.5" />}
      </button>

      <div className="relative flex-shrink-0">
        <button onClick={e => { e.stopPropagation(); setMenu(v => !v); }}
          className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 flex items-center justify-center rounded-[6px] hover:bg-muted text-muted-foreground">
          <MoreHorizontal className="size-3.5" />
        </button>
        {menu && (
          <>
            <div className="fixed inset-0 z-30" onClick={e => { e.stopPropagation(); setMenu(false); }} />
            <div className="absolute right-0 top-7 z-40 bg-card border border-border rounded-[10px] shadow-lg overflow-hidden w-36 py-1">
              {[
                { icon: Download, label: "Download"  },
                ...(canEdit ? [
                  { icon: Pencil,   label: "Rename"    },
                  { icon: Move,     label: "Move"      },
                  { icon: Trash2,   label: "Delete", danger: true },
                ] : []),
              ].map(item => (
                <button key={item.label}
                  onClick={e => { e.stopPropagation(); setMenu(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-[12px] hover:bg-muted transition-colors ${(item as any).danger ? "" : "text-foreground"}`}
                  style={(item as any).danger ? { color: "var(--error-on)" } : {}}>
                  <item.icon className="size-3.5" /> {item.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── File card (grid view) ─────────────────────────────────────────────────────

function FileCard({
  file, selected, onSelect, onStar,
}: {
  file: FileItem; selected: boolean; onSelect: () => void; onStar: () => void;
}) {
  const cfg = EXTS(file.ext);
  return (
    <div onClick={onSelect}
      className={`rounded-[12px] border cursor-pointer group transition-all hover:shadow-sm ${
        selected ? "border-[var(--rally-brand)] bg-[var(--rally-brand-soft)]" : "border-border bg-card hover:bg-muted/30"
      }`}>
      {/* Preview area */}
      <div className="rounded-t-[12px] h-24 flex items-center justify-center"
        style={{ background: `${cfg.color}10` }}>
        <span className="text-[28px] font-black" style={{ color: `${cfg.color}40` }}>
          {file.ext.toUpperCase()}
        </span>
      </div>
      <div className="px-3 py-2.5">
        <div className="flex items-start justify-between gap-1">
          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-foreground truncate">{file.name}</p>
            <p className="text-[10px] text-muted-foreground">.{file.ext} · {file.size}</p>
          </div>
          <button onClick={e => { e.stopPropagation(); onStar(); }}
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            {file.starred
              ? <Star className="size-3.5 fill-current" style={{ color: "#F59E0B" }} />
              : <StarOff className="size-3.5 text-muted-foreground" />}
          </button>
        </div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <Av name={file.lastEditedBy} size={16} />
          <span className="text-[10px] text-muted-foreground flex-1 truncate">{file.lastEditedAt}</span>
          {file.version > 1 && (
            <span className="text-[10px] px-1 py-0.5 rounded-full" style={{ background: `${cfg.color}18`, color: cfg.color }}>
              v{file.version}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Folder tile ───────────────────────────────────────────────────────────────

function FolderTile({ folder, onClick }: { folder: FolderItem; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-3 px-4 py-3.5 rounded-[12px] border border-border bg-card hover:bg-muted/40 hover:border-[var(--border-color)] transition-all text-left w-full group">
      <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
        style={{ background: `${folder.color}18` }}>
        <Folder className="size-5" style={{ color: folder.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-foreground truncate">{folder.name}</p>
        <p className="text-[10px] text-muted-foreground">{folder.fileCount} files · {folder.lastUpdated}</p>
      </div>
      <ChevronRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

// ── Continue working card ─────────────────────────────────────────────────────

function ContinueCard({ file, onSelect }: { file: FileItem; onSelect: () => void }) {
  const cfg = EXTS(file.ext);
  return (
    <button onClick={onSelect}
      className="flex-shrink-0 w-44 rounded-[12px] border border-border bg-card hover:bg-muted/30 hover:border-[var(--border-color)] transition-all text-left overflow-hidden group">
      <div className="h-16 flex items-center justify-center" style={{ background: `${cfg.color}10` }}>
        <span className="text-[24px] font-black" style={{ color: `${cfg.color}40` }}>
          {file.ext.toUpperCase()}
        </span>
      </div>
      <div className="px-3 py-2">
        <p className="text-[11px] font-medium text-foreground truncate">{file.name}</p>
        <p className="text-[10px] text-muted-foreground truncate">{file.lastEditedBy === "John Doe" ? "You" : file.lastEditedBy} · {file.lastEditedAt}</p>
        {file.version > 1 && (
          <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: `${cfg.color}18`, color: cfg.color }}>
            v{file.version}
          </span>
        )}
      </div>
    </button>
  );
}

// ── Left rail ─────────────────────────────────────────────────────────────────

function LeftRail({
  view, onView, folders, onBrowseFolder,
}: {
  view: NavView;
  onView: (v: NavView) => void;
  folders: FolderItem[];
  onBrowseFolder: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["design", "engineering"]));
  const rootFolders = folders.filter(f => f.parentId === null);

  function toggleExpand(id: string) {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  const navItems: { id: NavView; label: string; icon: React.ElementType }[] = [
    { id: "home",    label: "Home",    icon: Home    },
    { id: "browse",  label: "Browse",  icon: FolderOpen },
    { id: "recents", label: "Recents", icon: Clock   },
    { id: "starred", label: "Starred", icon: Star    },
  ];

  return (
    <div className="w-48 flex-shrink-0 border-r border-border bg-card flex flex-col overflow-y-auto hidden lg:flex">
      {/* Nav */}
      <div className="px-2 pt-3 pb-2 space-y-0.5">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <button key={item.id} onClick={() => onView(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-left text-[12px] transition-colors ${
                active ? "text-[var(--rally-brand-on)] font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              style={active ? { background: "var(--rally-brand-soft)" } : {}}>
              <Icon className="size-4 flex-shrink-0" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="h-px bg-border mx-3 my-2" />

      {/* Folder tree */}
      <div className="px-2 pb-3 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-widest px-2 mb-1.5" style={{ color: "var(--text-overline)" }}>
          Folders
        </p>
        {rootFolders.map(folder => {
          const children   = folders.filter(f => f.parentId === folder.id);
          const isExpanded = expanded.has(folder.id);

          return (
            <div key={folder.id}>
              <div className="flex items-center gap-1">
                {children.length > 0 ? (
                  <button onClick={() => toggleExpand(folder.id)}
                    className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                    {isExpanded
                      ? <ChevronDown className="size-3 text-muted-foreground" />
                      : <ChevronRight className="size-3 text-muted-foreground" />}
                  </button>
                ) : <span className="w-4 flex-shrink-0" />}
                <button onClick={() => onBrowseFolder(folder.id)}
                  className="flex-1 flex items-center gap-1.5 px-1.5 py-1.5 rounded-[7px] hover:bg-muted transition-colors min-w-0">
                  <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: folder.color }} />
                  <span className="text-[11px] text-foreground truncate">{folder.name}</span>
                </button>
              </div>
              {isExpanded && children.map(child => (
                <button key={child.id} onClick={() => onBrowseFolder(child.id)}
                  className="flex items-center gap-1.5 w-full px-1.5 py-1.5 ml-5 rounded-[7px] hover:bg-muted transition-colors">
                  <span className="w-1.5 h-1.5 rounded-sm flex-shrink-0" style={{ background: child.color }} />
                  <span className="text-[11px] text-muted-foreground truncate">{child.name}</span>
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Files Home ────────────────────────────────────────────────────────────────

function FilesHome({
  files, folders, onFileSelect, onFolderBrowse, onStar, selectedId, canEdit,
}: {
  files: FileItem[]; folders: FolderItem[];
  onFileSelect: (f: FileItem) => void;
  onFolderBrowse: (id: string) => void;
  onStar: (id: string) => void;
  selectedId: string | null; canEdit: boolean;
}) {
  const byId = Object.fromEntries(files.map(f => [f.id, f]));
  const continueFiles  = CONTINUE_WORKING_IDS.map(id => byId[id]).filter(Boolean);
  const recentUpdated  = RECENTLY_UPDATED.map(r => ({ ...r, file: byId[r.fileId] })).filter(r => r.file);
  const linkedFiles    = LINKED_IDS.map(id => byId[id]).filter(Boolean);
  const pinnedFolders  = folders.filter(f => f.parentId === null);

  return (
    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-8">
      {/* Continue Working */}
      <section>
        <h2 className="text-[12px] font-medium text-foreground mb-3">Continue Working</h2>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {continueFiles.map(f => (
            <ContinueCard key={f.id} file={f} onSelect={() => onFileSelect(f)} />
          ))}
        </div>
      </section>

      {/* Pinned Folders */}
      <section>
        <h2 className="text-[12px] font-medium text-foreground mb-3">Team Folders</h2>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-2.5">
          {pinnedFolders.map(f => (
            <FolderTile key={f.id} folder={f} onClick={() => onFolderBrowse(f.id)} />
          ))}
        </div>
      </section>

      {/* Recently Updated */}
      <section>
        <h2 className="text-[12px] font-medium text-foreground mb-3">Recently Updated</h2>
        <div className="space-y-1.5">
          {recentUpdated.map(({ file, who, when }) => {
            const cfg = EXTS(file.ext);
            return (
              <div key={file.id} onClick={() => onFileSelect(file)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] border cursor-pointer transition-all ${
                  selectedId === file.id ? "border-[var(--rally-brand)] bg-[var(--rally-brand-soft)]" : "border-border bg-card hover:bg-muted/30 hover:border-[var(--border)]"
                }`}>
                <FileTypeIcon ext={file.ext} size={30} />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-foreground truncate">{file.name}.{file.ext}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Av name={who} size={14} />
                    <span className="text-[10px] text-muted-foreground">{who} · {when}</span>
                  </div>
                </div>
                {file.version > 1 && (
                  <span className="flex-shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                    style={{ background: `${cfg.color}18`, color: cfg.color }}>
                    v{file.version}
                  </span>
                )}
                {file.links && file.links.length > 0 && (
                  <div className="hidden sm:flex gap-1 flex-shrink-0">
                    {file.links.slice(0, 2).map((lk, i) => {
                      const Icon = LINK_ICON[lk.type];
                      return <Icon key={i} className="size-3.5" style={{ color: LINK_COLOR[lk.type], opacity: 0.7 }} />;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Linked to Work */}
      <section>
        <h2 className="text-[12px] font-medium text-foreground mb-3">Linked to Work</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
          {linkedFiles.map(f => (
            <div key={f.id} onClick={() => onFileSelect(f)}
              className={`flex items-start gap-3 px-3 py-3 rounded-[10px] border cursor-pointer transition-all ${
                selectedId === f.id ? "border-[var(--rally-brand)] bg-[var(--rally-brand-soft)]" : "border-border bg-card hover:bg-muted/30 hover:border-[var(--border)]"
              }`}>
              <FileTypeIcon ext={f.ext} size={28} />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-foreground truncate">{f.name}.{f.ext}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {f.links?.map((lk, i) => <LinkChip key={i} link={lk} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Browse view ───────────────────────────────────────────────────────────────

function BrowseView({
  files, folders, navStack, onNavigate, onBack, onFileSelect,
  onStar, selectedId, canEdit, viewMode, onViewMode,
}: {
  files: FileItem[]; folders: FolderItem[];
  navStack: string[];
  onNavigate: (id: string) => void;
  onBack: () => void;
  onFileSelect: (f: FileItem) => void;
  onStar: (id: string) => void;
  selectedId: string | null; canEdit: boolean;
  viewMode: ViewMode; onViewMode: (m: ViewMode) => void;
}) {
  const [sort, setSort] = useState<SortKey>("date");
  const currentId = navStack[navStack.length - 1] ?? null;

  const subFolders = folders.filter(f => f.parentId === currentId);
  const curFiles   = files.filter(f => f.folderId === (currentId ?? "root"));

  // Build breadcrumb
  const crumbs: { id: string | null; name: string }[] = [{ id: null, name: "Files" }];
  for (const id of navStack) {
    const folder = folders.find(f => f.id === id);
    if (folder) crumbs.push({ id, name: folder.name });
  }

  // Sort files
  const sortedFiles = [...curFiles].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "size") return a.size.localeCompare(b.size);
    if (sort === "type") return a.ext.localeCompare(b.ext);
    return 0; // date: keep mock order
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Browse toolbar */}
      <div className="flex-shrink-0 px-5 py-3 border-b border-border flex items-center gap-2 flex-wrap">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 flex-1 min-w-0">
          {crumbs.map((c, i) => (
            <div key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3.5 text-muted-foreground flex-shrink-0" />}
              <button onClick={() => {
                if (i === 0) onNavigate("__root__");
                else { /* navigate to that crumb level */ }
              }}
                className={`text-[12px] truncate max-w-[100px] transition-colors ${
                  i === crumbs.length - 1 ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}>
                {c.name}
              </button>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <select value={sort} onChange={e => setSort(e.target.value as SortKey)}
            className="h-7 px-2 rounded-[7px] border border-border bg-background text-[11px] text-foreground outline-none">
            <option value="date">Date</option>
            <option value="name">Name</option>
            <option value="size">Size</option>
            <option value="type">Type</option>
          </select>
          <div className="flex rounded-[7px] border border-border overflow-hidden">
            {(["list","grid"] as ViewMode[]).map(m => {
              const Icon = m === "list" ? List : LayoutGrid;
              return (
                <button key={m} onClick={() => onViewMode(m)}
                  className={`w-7 h-7 flex items-center justify-center transition-colors ${
                    viewMode === m ? "text-white" : "text-muted-foreground hover:bg-muted"
                  }`}
                  style={viewMode === m ? { background: "var(--rally-brand)" } : {}}>
                  <Icon className="size-3.5" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Sub-folders */}
        {subFolders.length > 0 && (
          <div className="mb-5">
            <p className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color: "var(--text-overline)" }}>Folders</p>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-2.5">
              {subFolders.map(f => (
                <FolderTile key={f.id} folder={f} onClick={() => onNavigate(f.id)} />
              ))}
            </div>
          </div>
        )}

        {/* Files */}
        {sortedFiles.length > 0 && (
          <div>
            {subFolders.length > 0 && (
              <p className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color: "var(--text-overline)" }}>Files</p>
            )}
            {viewMode === "list" ? (
              <div className="space-y-1.5">
                {sortedFiles.map(f => (
                  <FileRow key={f.id} file={f} selected={selectedId === f.id}
                    onSelect={() => onFileSelect(f)} onStar={() => onStar(f.id)} canEdit={canEdit} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                {sortedFiles.map(f => (
                  <FileCard key={f.id} file={f} selected={selectedId === f.id}
                    onSelect={() => onFileSelect(f)} onStar={() => onStar(f.id)} />
                ))}
              </div>
            )}
          </div>
        )}

        {subFolders.length === 0 && sortedFiles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Folder className="size-10 text-muted-foreground opacity-30 mb-3" />
            <p className="text-[13px] text-muted-foreground">This folder is empty</p>
            {canEdit && (
              <p className="text-[11px] text-muted-foreground mt-1">Upload files or create new ones</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Recents & Starred (simple list views) ─────────────────────────────────────

function SimpleFileList({
  files, onFileSelect, onStar, selectedId, canEdit, emptyMsg,
}: {
  files: FileItem[]; onFileSelect: (f: FileItem) => void;
  onStar: (id: string) => void; selectedId: string | null;
  canEdit: boolean; emptyMsg: string;
}) {
  if (!files.length) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
        <FileText className="size-10 text-muted-foreground opacity-30 mb-3" />
        <p className="text-[13px] text-muted-foreground">{emptyMsg}</p>
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1.5">
      {files.map(f => (
        <FileRow key={f.id} file={f} selected={selectedId === f.id}
          onSelect={() => onFileSelect(f)} onStar={() => onStar(f.id)} canEdit={canEdit} />
      ))}
    </div>
  );
}

// ── File detail panel ─────────────────────────────────────────────────────��───

function FileDetailPanel({
  file, folders, onClose, onStar, canEdit,
}: {
  file: FileItem; folders: FolderItem[];
  onClose: () => void; onStar: () => void; canEdit: boolean;
}) {
  const [showVersions, setShowVersions] = useState(false);
  const [showPerms,   setShowPerms]   = useState(false);
  const [editName,    setEditName]    = useState(file.name);
  const cfg      = EXTS(file.ext);
  const folder   = folders.find(f => f.id === file.folderId);
  const versions = MOCK_VERSIONS[file.id] ?? [{ ver: file.version, author: file.lastEditedBy, time: file.lastEditedAt, note: "Current version" }];

  return (
    <aside className="h-full flex flex-col bg-card border-l border-border" style={{ width: 304, flexShrink: 0 }}>
      {/* Color strip */}
      <div className="h-1 flex-shrink-0" style={{ background: cfg.color }} />

      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)]">
        <span className="flex-1 text-[12px] font-medium text-muted-foreground">File details</span>
        <button onClick={onStar} className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground transition-colors">
          {file.starred
            ? <Star className="size-4 fill-current" style={{ color: "#F59E0B" }} />
            : <StarOff className="size-4" />}
        </button>
        <button onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground transition-colors">
          <X className="size-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {/* Preview */}
        <FilePreviewBlock file={file} />

        {/* Name */}
        <div>
          {canEdit ? (
            <input value={editName} onChange={e => setEditName(e.target.value)}
              className="w-full text-[14px] font-medium text-foreground bg-transparent outline-none border-b border-transparent hover:border-border focus:border-[var(--rally-brand)] pb-0.5 transition-colors" />
          ) : (
            <p className="text-[14px] font-medium text-foreground">{file.name}</p>
          )}
          <p className="text-[11px] text-muted-foreground mt-0.5">.{file.ext} · {cfg.label} · {file.size}</p>
        </div>

        {/* Meta */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <Folder className="size-3.5 text-muted-foreground flex-shrink-0" />
            <span className="text-[12px] text-muted-foreground">
              {folder ? folder.name : "Unknown folder"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Av name={file.lastEditedBy} size={18} />
            <span className="text-[12px] text-muted-foreground">{file.lastEditedBy} · {file.lastEditedAt}</span>
          </div>
          {file.version > 1 && (
            <div className="flex items-center gap-2">
              <History className="size-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-[12px] text-muted-foreground">Version {file.version}</span>
            </div>
          )}
        </div>

        {/* Linked to work */}
        {file.links && file.links.length > 0 && (
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: "var(--text-overline)" }}>Linked to</p>
            <div className="space-y-1.5">
              {file.links.map((lk, i) => {
                const Icon = LINK_ICON[lk.type];
                return (
                  <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded-[8px] border border-border bg-background hover:bg-muted transition-colors cursor-pointer">
                    <Icon className="size-3.5 flex-shrink-0" style={{ color: LINK_COLOR[lk.type] }} />
                    <span className="text-[12px] text-foreground flex-1 truncate">{lk.label}</span>
                    <ArrowUpRight className="size-3.5 text-muted-foreground" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Version history */}
        <div className="rounded-[10px] border border-border overflow-hidden">
          <button onClick={() => setShowVersions(v => !v)}
            className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-muted transition-colors">
            <History className="size-3.5 text-muted-foreground" />
            <span className="text-[12px] text-foreground flex-1 text-left">Version history</span>
            <span className="text-[10px] text-muted-foreground mr-1">{versions.length}</span>
            {showVersions ? <ChevronDown className="size-3.5 text-muted-foreground" /> : <ChevronRight className="size-3.5 text-muted-foreground" />}
          </button>
          {showVersions && (
            <div className="border-t border-[var(--border-subtle)] px-3 py-2 space-y-3">
              {versions.map(v => (
                <div key={v.ver} className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground flex-shrink-0 mt-0.5">
                    v{v.ver}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-foreground leading-snug">{v.note}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Av name={v.author} size={12} />
                      <span className="text-[10px] text-muted-foreground">{v.author} · {v.time}</span>
                    </div>
                  </div>
                  {canEdit && v.ver < file.version && (
                    <button className="text-[10px] text-muted-foreground hover:text-foreground flex-shrink-0 mt-0.5">
                      Restore
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Permissions */}
        <div className="rounded-[10px] border border-border overflow-hidden">
          <button onClick={() => setShowPerms(v => !v)}
            className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-muted transition-colors">
            <Lock className="size-3.5 text-muted-foreground" />
            <span className="text-[12px] text-foreground flex-1 text-left">Permissions</span>
            {showPerms ? <ChevronDown className="size-3.5 text-muted-foreground" /> : <ChevronRight className="size-3.5 text-muted-foreground" />}
          </button>
          {showPerms && (
            <div className="border-t border-[var(--border-subtle)] px-3 py-2 space-y-2">
              {[
                { label: "Can view",   roles: ["Owner", "Admin", "Member", "Viewer"] },
                { label: "Can edit",   roles: ["Owner", "Admin", "Member"] },
                { label: "Can delete", roles: ["Owner", "Admin"] },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground w-16 flex-shrink-0">{row.label}</span>
                  <div className="flex gap-1 flex-wrap">
                    {row.roles.map(r => (
                      <span key={r} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{r}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex-shrink-0 border-t border-[var(--border-subtle)] px-4 py-3">
        <div className="flex gap-2">
          <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-[8px] border border-border bg-background text-foreground hover:bg-muted transition-colors text-[12px]">
            <Download className="size-3.5" /> Download
          </button>
          {canEdit && (
            <>
              <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-[8px] border border-border bg-background text-foreground hover:bg-muted transition-colors text-[12px]">
                <Pencil className="size-3.5" /> Rename
              </button>
              <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-[8px] border border-border bg-background transition-colors text-[12px] ml-auto hover:bg-muted"
                style={{ color: "var(--error-on)" }}>
                <Trash2 className="size-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

// ── New item modal ────────────────────────────────────────────────────────────

function NewItemModal({
  open, onClose, onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (type: "folder" | "doc" | "sheet", name: string) => void;
}) {
  const [type, setType] = useState<"folder" | "doc" | "sheet">("folder");
  const [name, setName] = useState("");

  if (!open) return null;

  function handleSubmit() {
    if (!name.trim()) return;
    onSubmit(type, name.trim());
    setName("");
    onClose();
  }

  const types = [
    { id: "folder" as const, label: "Folder",      icon: Folder   },
    { id: "doc"    as const, label: "Document",    icon: FileText },
    { id: "sheet"  as const, label: "Spreadsheet", icon: LayoutGrid },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-[16px] shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-[14px] font-medium text-foreground flex-1">Create New</h2>
            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-muted text-muted-foreground">
              <X className="size-4" />
            </button>
          </div>
          <div className="flex gap-2 mb-4">
            {types.map(t => {
              const Icon = t.icon;
              return (
                <button key={t.id} onClick={() => setType(t.id)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-[8px] border text-[11px] transition-colors ${
                    type === t.id ? "border-[var(--rally-brand)] bg-[var(--rally-brand-soft)] text-[var(--rally-brand-on)]" : "border-border text-muted-foreground hover:bg-muted"
                  }`}>
                  <Icon className="size-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
          <input value={name} onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder={type === "folder" ? "Folder name" : "File name"}
            autoFocus
            className="w-full px-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground mb-4" />
          <div className="flex gap-2">
            <button onClick={onClose}
              className="px-4 py-2 rounded-[8px] border border-border text-muted-foreground hover:bg-muted text-[12px] transition-colors">
              Cancel
            </button>
            <button onClick={handleSubmit}
              className="flex-1 py-2 rounded-[8px] text-white text-[12px] font-medium"
              style={{ background: "var(--rally-brand)" }}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function FilesV2() {
  const { userRole } = useAuth();
  const canEdit = userRole !== "viewer";

  const [view,      setView]      = useState<NavView>("home");
  const [navStack,  setNavStack]  = useState<string[]>([]);
  const [files,     setFiles]     = useState<FileItem[]>(initialFiles);
  const [folders,   setFolders]   = useState<FolderItem[]>(initialFolders);
  const [selected,  setSelected]  = useState<FileItem | null>(null);
  const [viewMode,  setViewMode]  = useState<ViewMode>("list");
  const [search,    setSearch]    = useState("");
  const [newOpen,   setNewOpen]   = useState(false);
  const [isDragOver,setIsDragOver]= useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function toggleStar(id: string) {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, starred: !f.starred } : f));
    if (selected?.id === id) setSelected(f => f ? { ...f, starred: !f.starred } : f);
  }

  function handleBrowseFolder(id: string) {
    if (id === "__root__") { setNavStack([]); }
    else { setNavStack([id]); }
    setView("browse");
  }

  function handleNavigateInto(id: string) {
    setNavStack(prev => [...prev, id]);
  }

  function handleCreateNew(type: "folder" | "doc" | "sheet", name: string) {
    if (type === "folder") {
      const newFolder: FolderItem = {
        id: `folder-${Date.now()}`, name, parentId: navStack[navStack.length - 1] ?? null,
        color: "#6B7280", fileCount: 0, lastUpdated: "Just now", starred: false,
      };
      setFolders(prev => [...prev, newFolder]);
    } else {
      const ext = type === "doc" ? "docx" : "xlsx";
      const newFile: FileItem = {
        id: `file-${Date.now()}`, name, ext,
        folderId: navStack[navStack.length - 1] ?? "shared",
        size: "0 KB", lastEditedBy: "John Doe", lastEditedAt: "Just now",
        starred: false, version: 1, links: [],
      };
      setFiles(prev => [...prev, newFile]);
    }
  }

  // Search-filtered files
  const filteredFiles = search.trim()
    ? files.filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.ext.toLowerCase().includes(search.toLowerCase())
      )
    : files;

  const starredFiles  = filteredFiles.filter(f => f.starred);
  const recentFiles   = filteredFiles.slice(0, 12);

  // Drag-and-drop handlers
  function onDragOver(e: React.DragEvent) { e.preventDefault(); setIsDragOver(true); }
  function onDragLeave()                  { setIsDragOver(false); }
  function onDrop(e: React.DragEvent)     { e.preventDefault(); setIsDragOver(false); }

  const viewTitles: Record<NavView, string> = {
    home: "Files", browse: "Browse", recents: "Recents", starred: "Starred",
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-background"
      onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>

      {/* Drag-over overlay */}
      {isDragOver && (
        <div className="absolute inset-0 z-50 m-3 rounded-[16px] border-2 border-dashed border-[var(--rally-brand)] bg-[var(--rally-brand-soft)]/90 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <Upload className="size-10 mx-auto mb-2" style={{ color: "var(--rally-brand)" }} />
            <p className="text-[14px] font-medium" style={{ color: "var(--rally-brand)" }}>Drop files to upload</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex-shrink-0 px-5 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-[15px] font-medium text-foreground">{viewTitles[view]}</h1>
          <div className="flex-1" />

          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search files…"
              className="pl-8 pr-3 h-8 w-44 rounded-[8px] border border-border bg-background text-[12px] text-foreground placeholder:text-muted-foreground outline-none focus:border-[var(--rally-brand)] transition-colors" />
          </div>

          {/* Upload */}
          {canEdit && (
            <>
              <input ref={fileInputRef} type="file" multiple className="hidden"
                onChange={() => {/* mock upload */}} />
              <button onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] border border-border bg-background text-muted-foreground hover:bg-muted transition-colors text-[12px]">
                <Upload className="size-3.5" /> Upload
              </button>
            </>
          )}

          {/* New */}
          {canEdit && (
            <button onClick={() => setNewOpen(true)}
              className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] text-white text-[12px] font-medium"
              style={{ background: "var(--rally-brand)" }}>
              <Plus className="size-3.5" /> New
            </button>
          )}
        </div>

      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left rail */}
        <LeftRail view={view} onView={setView} folders={folders} onBrowseFolder={handleBrowseFolder} />

        {/* Main content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {view === "home" && (
            <FilesHome
              files={filteredFiles} folders={folders}
              onFileSelect={setSelected} onFolderBrowse={handleBrowseFolder}
              onStar={toggleStar} selectedId={selected?.id ?? null} canEdit={canEdit}
            />
          )}
          {view === "browse" && (
            <BrowseView
              files={filteredFiles} folders={folders}
              navStack={navStack}
              onNavigate={handleNavigateInto}
              onBack={() => setNavStack(p => p.slice(0, -1))}
              onFileSelect={setSelected} onStar={toggleStar}
              selectedId={selected?.id ?? null} canEdit={canEdit}
              viewMode={viewMode} onViewMode={setViewMode}
            />
          )}
          {view === "recents" && (
            <SimpleFileList
              files={recentFiles} onFileSelect={setSelected} onStar={toggleStar}
              selectedId={selected?.id ?? null} canEdit={canEdit}
              emptyMsg="No recent files" />
          )}
          {view === "starred" && (
            <SimpleFileList
              files={starredFiles} onFileSelect={setSelected} onStar={toggleStar}
              selectedId={selected?.id ?? null} canEdit={canEdit}
              emptyMsg="No starred files yet — star files to find them quickly" />
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <FileDetailPanel
            key={selected.id} file={selected} folders={folders}
            onClose={() => setSelected(null)} onStar={() => toggleStar(selected.id)}
            canEdit={canEdit}
          />
        )}
      </div>

      {/* Viewer badge */}
      {!canEdit && (
        <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border-t border-border bg-muted/30">
          <AlertCircle className="size-3.5 text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground">Read-only — upgrade your role to upload or create files.</p>
        </div>
      )}

      <NewItemModal open={newOpen && canEdit} onClose={() => setNewOpen(false)} onSubmit={handleCreateNew} />
    </div>
  );
}
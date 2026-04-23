import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { useAuth, UserRole } from "../contexts/AuthContext";
import {
  Folder,
  File as FileIcon,
  Upload,
  Download,
  Trash2,
  FolderPlus,
  ChevronRight,
  Home,
  Lock,
} from "lucide-react";

interface FilePermissions {
  owner: string;
  read: UserRole[];
  write: UserRole[];
  delete: UserRole[];
}

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  path: string;
  size?: number;
  permissions: FilePermissions;
  createdBy: string;
  createdAt: string;
  modifiedAt: string;
  parent?: string;
}

const defaultPermissions: FilePermissions = {
  owner: "user-1",
  read: ["owner", "admin", "member", "viewer"],
  write: ["owner", "admin", "member"],
  delete: ["owner", "admin"],
};

const mockFileSystem: FileNode[] = [
  {
    id: "folder-1",
    name: "Design Assets",
    type: "folder",
    path: "/Design Assets",
    permissions: defaultPermissions,
    createdBy: "user-1",
    createdAt: "2026-03-01T10:00:00",
    modifiedAt: "2026-03-15T14:30:00",
  },
  {
    id: "file-1",
    name: "dashboard-mockup.fig",
    type: "file",
    path: "/Design Assets/dashboard-mockup.fig",
    size: 2457600,
    permissions: defaultPermissions,
    createdBy: "user-1",
    createdAt: "2026-03-10T09:00:00",
    modifiedAt: "2026-03-15T14:30:00",
    parent: "folder-1",
  },
  {
    id: "file-2",
    name: "logo.svg",
    type: "file",
    path: "/Design Assets/logo.svg",
    size: 15360,
    permissions: defaultPermissions,
    createdBy: "user-2",
    createdAt: "2026-03-05T11:00:00",
    modifiedAt: "2026-03-05T11:00:00",
    parent: "folder-1",
  },
  {
    id: "folder-2",
    name: "Documentation",
    type: "folder",
    path: "/Documentation",
    permissions: {
      owner: "user-1",
      read: ["owner", "admin", "member", "viewer"],
      write: ["owner", "admin"],
      delete: ["owner"],
    },
    createdBy: "user-1",
    createdAt: "2026-03-01T10:00:00",
    modifiedAt: "2026-03-20T16:00:00",
  },
  {
    id: "file-3",
    name: "API-Guide.pdf",
    type: "file",
    path: "/Documentation/API-Guide.pdf",
    size: 1048576,
    permissions: {
      owner: "user-1",
      read: ["owner", "admin", "member", "viewer"],
      write: ["owner", "admin"],
      delete: ["owner"],
    },
    createdBy: "user-1",
    createdAt: "2026-03-20T16:00:00",
    modifiedAt: "2026-03-20T16:00:00",
    parent: "folder-2",
  },
  {
    id: "file-4",
    name: "README.md",
    type: "file",
    path: "/README.md",
    size: 4096,
    permissions: defaultPermissions,
    createdBy: "user-1",
    createdAt: "2026-03-01T10:00:00",
    modifiedAt: "2026-03-22T09:00:00",
  },
];

export function FileSystem() {
  const { user, userRole } = useAuth();
  const [fileSystem, setFileSystem] = useState<FileNode[]>(mockFileSystem);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);

  // Folder form state
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  // Upload file state
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  // Permissions dialog state
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [editingNode, setEditingNode] = useState<FileNode | null>(null);
  const [permRead, setPermRead] = useState<UserRole[]>(["owner", "admin", "member", "viewer"]);
  const [permWrite, setPermWrite] = useState<UserRole[]>(["owner", "admin", "member"]);
  const [permDelete, setPermDelete] = useState<UserRole[]>(["owner", "admin"]);

  const getCurrentPathString = () =>
    currentPath.length === 0 ? "/" : "/" + currentPath.join("/");

  const getNodesInCurrentPath = () => {
    const pathString = getCurrentPathString();
    if (pathString === "/") {
      return fileSystem.filter((node) => !node.parent);
    }
    const currentFolder = fileSystem.find(
      (node) => node.type === "folder" && node.path === pathString
    );
    if (!currentFolder) return [];
    return fileSystem.filter((node) => node.parent === currentFolder.id);
  };

  const canRead = (node: FileNode) => {
    if (!userRole) return false;
    if (node.permissions.owner === user?.id) return true;
    return node.permissions.read.includes(userRole);
  };

  const canWrite = (node: FileNode) => {
    if (!userRole) return false;
    if (node.permissions.owner === user?.id) return true;
    return node.permissions.write.includes(userRole);
  };

  const canDelete = (node: FileNode) => {
    if (!userRole) return false;
    if (node.permissions.owner === user?.id) return true;
    return node.permissions.delete.includes(userRole);
  };

  const canCreateInCurrentPath = () => {
    if (!userRole) return false;
    if (userRole === "viewer") return false;
    if (currentPath.length === 0) {
      return ["owner", "admin", "member"].includes(userRole);
    }
    const pathString = getCurrentPathString();
    const currentFolder = fileSystem.find(
      (node) => node.type === "folder" && node.path === pathString
    );
    return currentFolder ? canWrite(currentFolder) : false;
  };

  const handleNavigate = (folderName: string) => {
    setCurrentPath([...currentPath, folderName]);
  };

  const handleNavigateUp = () => {
    if (currentPath.length > 0) setCurrentPath(currentPath.slice(0, -1));
  };

  const handleNavigateToRoot = () => setCurrentPath([]);

  const handleCreateFolder = () => {
    if (!canCreateInCurrentPath()) return;
    const pathString = getCurrentPathString();
    const fullPath = pathString === "/" ? `/${folderName}` : `${pathString}/${folderName}`;
    const parentFolder = currentPath.length > 0
      ? fileSystem.find((node) => node.path === pathString)
      : undefined;
    const newFolder: FileNode = {
      id: `folder-${Date.now()}`,
      name: folderName,
      type: "folder",
      path: fullPath,
      permissions: {
        owner: user?.id || "user-1",
        read: ["owner", "admin", "member", "viewer"],
        write: ["owner", "admin", "member"],
        delete: ["owner", "admin"],
      },
      createdBy: user?.id || "user-1",
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      parent: parentFolder?.id,
    };
    setFileSystem([...fileSystem, newFolder]);
    setFolderDialogOpen(false);
    setFolderName("");
  };

  const handleUploadFile = () => {
    if (!canCreateInCurrentPath()) return;
    const pathString = getCurrentPathString();
    const fullPath = pathString === "/" ? `/${fileName}` : `${pathString}/${fileName}`;
    const parentFolder = currentPath.length > 0
      ? fileSystem.find((node) => node.path === pathString)
      : undefined;
    const newFile: FileNode = {
      id: `file-${Date.now()}`,
      name: fileName,
      type: "file",
      path: fullPath,
      size: parseInt(fileSize) || 0,
      permissions: {
        owner: user?.id || "user-1",
        read: ["owner", "admin", "member", "viewer"],
        write: ["owner", "admin", "member"],
        delete: ["owner", "admin"],
      },
      createdBy: user?.id || "user-1",
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      parent: parentFolder?.id,
    };
    setFileSystem([...fileSystem, newFile]);
    setUploadDialogOpen(false);
    setFileName("");
    setFileSize("");
  };

  const handleDeleteNode = (node: FileNode) => {
    if (!canDelete(node)) return;
    const message =
      node.type === "folder"
        ? `Delete folder "${node.name}" and all its contents?`
        : `Delete file "${node.name}"?`;
    if (confirm(message)) {
      const nodesToDelete = [node.id];
      if (node.type === "folder") {
        const findChildren = (parentId: string) => {
          const children = fileSystem.filter((n) => n.parent === parentId);
          children.forEach((child) => {
            nodesToDelete.push(child.id);
            if (child.type === "folder") findChildren(child.id);
          });
        };
        findChildren(node.id);
      }
      setFileSystem(fileSystem.filter((n) => !nodesToDelete.includes(n.id)));
    }
  };

  const handleDownload = (node: FileNode) => {
    if (!canRead(node)) return;
    alert(`Downloading ${node.name}...`);
  };

  const openPermissionsDialog = (node: FileNode) => {
    if (node.permissions.owner !== user?.id && userRole !== "owner") return;
    setEditingNode(node);
    setPermRead(node.permissions.read);
    setPermWrite(node.permissions.write);
    setPermDelete(node.permissions.delete);
    setPermissionsDialogOpen(true);
  };

  const handleUpdatePermissions = () => {
    if (!editingNode) return;
    setFileSystem(
      fileSystem.map((node) =>
        node.id === editingNode.id
          ? { ...node, permissions: { ...node.permissions, read: permRead, write: permWrite, delete: permDelete } }
          : node
      )
    );
    setPermissionsDialogOpen(false);
    setEditingNode(null);
  };

  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes) return "0 B";
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  const visibleNodes = getNodesInCurrentPath().filter(canRead);

  // Permission toggle button helper
  const PermToggle = ({
    role,
    active,
    onToggle,
  }: {
    role: UserRole;
    active: boolean;
    onToggle: () => void;
  }) => (
    <button
      onClick={onToggle}
      className={`px-2 py-1 text-xs rounded transition-colors ${
        active
          ? "bg-blue-100 text-blue-700 border border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
          : "bg-muted text-muted-foreground border border-border"
      }`}
    >
      {role}
    </button>
  );

  // Breadcrumb + file list shared across both viewer and normal mode
  const FileBrowser = ({ readOnly = false }: { readOnly?: boolean }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
            <button
              onClick={handleNavigateToRoot}
              className="p-1 rounded hover:bg-muted transition-colors"
              title="Go to root"
            >
              <Home className="size-4" />
            </button>
            <span>/</span>
            {currentPath.map((folder, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPath(currentPath.slice(0, idx + 1))}
                  className="hover:text-foreground transition-colors"
                >
                  {folder}
                </button>
                <ChevronRight className="size-3" />
              </div>
            ))}
          </div>

          {!readOnly && canCreateInCurrentPath() && (
            <div className="flex gap-2">
              <Dialog open={folderDialogOpen} onOpenChange={setFolderDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <FolderPlus className="size-4 mr-2" />
                    New Folder
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Folder</DialogTitle>
                    <DialogDescription>Create a new folder in {getCurrentPathString()}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="folder-name">Folder Name</Label>
                      <Input
                        id="folder-name"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        placeholder="e.g., Project Files"
                      />
                    </div>
                    <Button onClick={handleCreateFolder} className="w-full" disabled={!folderName.trim()}>
                      Create Folder
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Upload className="size-4 mr-2" />
                    Upload File
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>Upload a file to {getCurrentPathString()}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="file-name">File Name</Label>
                      <Input
                        id="file-name"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="e.g., document.pdf"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="file-size">File Size (bytes)</Label>
                      <Input
                        id="file-size"
                        type="number"
                        value={fileSize}
                        onChange={(e) => setFileSize(e.target.value)}
                        placeholder="e.g., 1048576"
                      />
                      <p className="text-xs text-muted-foreground">Simulated upload – enter file size in bytes</p>
                    </div>
                    <Button
                      onClick={handleUploadFile}
                      className="w-full"
                      disabled={!fileName.trim() || !fileSize.trim()}
                    >
                      Upload File
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {visibleNodes.length === 0 && currentPath.length === 0 ? (
          <div className="text-center py-12">
            <Folder className="size-12 text-muted-foreground mx-auto mb-4 opacity-40" />
            <p className="text-muted-foreground mb-4">No files or folders yet</p>
            {!readOnly && canCreateInCurrentPath() && (
              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={() => setFolderDialogOpen(true)}>
                  <FolderPlus className="size-4 mr-2" />
                  Create Folder
                </Button>
                <Button onClick={() => setUploadDialogOpen(true)}>
                  <Upload className="size-4 mr-2" />
                  Upload File
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-1.5">
            {currentPath.length > 0 && (
              <button
                onClick={handleNavigateUp}
                className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors text-left"
              >
                <Folder className="size-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">..</span>
              </button>
            )}

            {visibleNodes.map((node) => {
              const nodeCanDelete = canDelete(node);
              const isOwner = node.permissions.owner === user?.id;

              return (
                <div
                  key={node.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <button
                    onClick={() => node.type === "folder" && handleNavigate(node.name)}
                    className="flex items-center gap-3 flex-1 text-left min-w-0"
                  >
                    {node.type === "folder" ? (
                      <Folder className="size-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    ) : (
                      <FileIcon className="size-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{node.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        {node.type === "file" && (
                          <>
                            <span>{formatFileSize(node.size)}</span>
                            <span>•</span>
                          </>
                        )}
                        <span>Modified {formatDate(node.modifiedAt)}</span>
                        {isOwner && (
                          <>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">Owner</Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!readOnly && (isOwner || userRole === "owner") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openPermissionsDialog(node)}
                        title="Manage permissions"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Lock className="size-4" />
                      </Button>
                    )}

                    {node.type === "file" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(node)}
                        title="Download"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Download className="size-4" />
                      </Button>
                    )}

                    {!readOnly && nodeCanDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteNode(node)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Viewer mode
  if (userRole === "viewer") {
    return (
      <div className="min-h-full bg-background p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Files</h1>
            <p className="text-muted-foreground">Browse team files and folders</p>
            <Badge variant="outline" className="mt-2">
              Your Role: Viewer (Read-only)
            </Badge>
          </div>
          <FileBrowser readOnly />
        </div>
      </div>
    );
  }

  // Member, Admin, Owner modes
  return (
    <div className="min-h-full bg-background p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">File System</h1>
          <p className="text-muted-foreground">Manage team files and folders</p>
          <Badge variant="outline" className="mt-2">
            Your Role: {userRole?.charAt(0).toUpperCase()}{userRole?.slice(1)}
          </Badge>
        </div>

        <FileBrowser />

        {/* Permissions Dialog */}
        <Dialog open={permissionsDialogOpen} onOpenChange={setPermissionsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Permissions</DialogTitle>
              <DialogDescription>Set who can read, write, and delete "{editingNode?.name}"</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Who can read?</Label>
                <div className="grid grid-cols-4 gap-2">
                  {(["owner", "admin", "member", "viewer"] as UserRole[]).map((role) => (
                    <PermToggle
                      key={role}
                      role={role}
                      active={permRead.includes(role)}
                      onToggle={() =>
                        setPermRead(permRead.includes(role) ? permRead.filter((r) => r !== role) : [...permRead, role])
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Who can write/modify?</Label>
                <div className="grid grid-cols-4 gap-2">
                  {(["owner", "admin", "member", "viewer"] as UserRole[]).map((role) => (
                    <PermToggle
                      key={role}
                      role={role}
                      active={permWrite.includes(role)}
                      onToggle={() =>
                        setPermWrite(permWrite.includes(role) ? permWrite.filter((r) => r !== role) : [...permWrite, role])
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Who can delete?</Label>
                <div className="grid grid-cols-4 gap-2">
                  {(["owner", "admin", "member", "viewer"] as UserRole[]).map((role) => (
                    <PermToggle
                      key={role}
                      role={role}
                      active={permDelete.includes(role)}
                      onToggle={() =>
                        setPermDelete(permDelete.includes(role) ? permDelete.filter((r) => r !== role) : [...permDelete, role])
                      }
                    />
                  ))}
                </div>
              </div>

              <Button onClick={handleUpdatePermissions} className="w-full">
                Save Permissions
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

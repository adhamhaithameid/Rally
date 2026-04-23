import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useAuth, UserRole, generateAvatar } from "../contexts/AuthContext";
import { Users, Crown, Shield, Eye, Copy, Check, Upload, Edit2, Trash2, UserPlus } from "lucide-react";

// Deterministic color assignment for communication tags
const TAG_COLORS = [
  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
];

function tagColor(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = (hash * 31 + tag.charCodeAt(i)) | 0;
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

function ColoredTag({ tag }: { tag: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${tagColor(tag)}`}>
      {tag}
    </span>
  );
}

export function Team() {
  const { user, currentTeam, userRole, hasPermission } = useAuth();
  const [copied, setCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [teamName, setTeamName] = useState(currentTeam?.name || "");
  const [projectName, setProjectName] = useState(currentTeam?.projectName || "");
  const [description, setDescription] = useState(currentTeam?.description || "");
  const [tags, setTags] = useState(currentTeam?.communication.join(", ") || "");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<UserRole>("member");

  const copyInviteLink = () => {
    if (currentTeam?.inviteLink) {
      navigator.clipboard.writeText(currentTeam.inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "owner":  return <Crown className="size-4 text-yellow-600" />;
      case "admin":  return <Shield className="size-4 text-blue-600" />;
      case "member": return <Users className="size-4 text-green-600" />;
      case "viewer": return <Eye className="size-4 text-muted-foreground" />;
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "owner":  return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800";
      case "admin":  return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
      case "member": return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      case "viewer": return "bg-muted text-muted-foreground border-border";
    }
  };

  const canEditTeam = hasPermission("*"); // Only owner
  const canManageMembers = hasPermission("manage_members") || hasPermission("*");

  const handleSaveTeam = () => {
    console.log("Saving team:", { teamName, projectName, description, tags: tags.split(",").map((t) => t.trim()) });
    setEditMode(false);
  };

  const handleInviteMember = () => {
    console.log("Inviting member:", { email: newMemberEmail, role: newMemberRole });
    setNewMemberEmail("");
  };

  const handleChangeRole = (memberId: string, newRole: UserRole) => {
    console.log("Changing role:", { memberId, newRole });
  };

  const handleRemoveMember = (memberId: string) => {
    console.log("Removing member:", memberId);
  };

  if (!currentTeam) {
    return (
      <div className="min-h-full bg-background p-4 lg:p-8 flex items-center justify-center">
        <p className="text-muted-foreground">No team selected</p>
      </div>
    );
  }

  // Viewer mode - read-only
  if (userRole === "viewer") {
    return (
      <div className="min-h-full bg-background p-4 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Team</h1>
            <p className="text-muted-foreground">View team information</p>
            <Badge variant="outline" className="mt-2">
              Your Role: Viewer (Read-only)
            </Badge>
          </div>

          {/* Team Info - Read Only */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src={currentTeam.avatar || generateAvatar(currentTeam.name)}
                  alt={currentTeam.name}
                  className="size-16 rounded-lg"
                />
                <div>
                  <CardTitle>{currentTeam.name}</CardTitle>
                  <CardDescription>Project: {currentTeam.projectName}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Description</Label>
                <p className="text-sm text-muted-foreground mt-1">{currentTeam.description}</p>
              </div>
              <div>
                <Label>Communication Tags</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {currentTeam.communication.map((tag) => (
                    <ColoredTag key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Members - Read Only */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members ({currentTeam.members.length})</CardTitle>
              <CardDescription>View team members and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentTeam.members.map((member) => (
                  <div key={member.userId} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar || generateAvatar(member.name)}
                        alt={member.name}
                        className="size-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-sm text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <Badge className={getRoleBadgeColor(member.role)}>
                      <span className="flex items-center gap-1">
                        {getRoleIcon(member.role)}
                        {member.role}
                      </span>
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Member, Admin, Owner modes
  return (
    <div className="min-h-full bg-background p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Team Management</h1>
          <p className="text-muted-foreground">Manage your team settings and members</p>
          <Badge variant="outline" className="mt-2">
            Your Role: {userRole?.charAt(0).toUpperCase()}{userRole?.slice(1)}
          </Badge>
        </div>

        {/* Team Information */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <img
                    src={currentTeam.avatar || generateAvatar(currentTeam.name)}
                    alt={currentTeam.name}
                    className="size-16 rounded-lg"
                  />
                  {canEditTeam && (
                    <button className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="size-6 text-white" />
                    </button>
                  )}
                </div>
                <div>
                  <CardTitle>{editMode ? "Edit Team" : currentTeam.name}</CardTitle>
                  <CardDescription>Project: {currentTeam.projectName}</CardDescription>
                </div>
              </div>
              {canEditTeam && !editMode && (
                <Button variant="outline" onClick={() => setEditMode(true)}>
                  <Edit2 className="size-4 mr-2" />
                  Edit Team
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {editMode && canEditTeam ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input
                    id="team-name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your team and project"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Communication Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Design, UX, Frontend"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveTeam}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label>Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{currentTeam.description}</p>
                </div>
                <div>
                  <Label>Communication Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {currentTeam.communication.map((tag) => (
                      <ColoredTag key={tag} tag={tag} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Invitation Link</Label>
                  <div className="flex gap-2 mt-1">
                    <Input value={currentTeam.inviteLink} readOnly className="flex-1" />
                    <Button variant="outline" size="sm" onClick={copyInviteLink}>
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Share this link to invite new members</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Team Members ({currentTeam.members.length})</CardTitle>
                <CardDescription>Manage team members and their roles</CardDescription>
              </div>
              {canManageMembers && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="size-4 mr-2" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite Team Member</DialogTitle>
                      <DialogDescription>Send an invitation to join your team</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="member-email">Email Address</Label>
                        <Input
                          id="member-email"
                          type="email"
                          value={newMemberEmail}
                          onChange={(e) => setNewMemberEmail(e.target.value)}
                          placeholder="colleague@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="member-role">Role</Label>
                        <Select value={newMemberRole} onValueChange={(v) => setNewMemberRole(v as UserRole)}>
                          <SelectTrigger id="member-role">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {userRole === "owner" && (
                              <SelectItem value="admin">Admin - Manage members &amp; calendars</SelectItem>
                            )}
                            <SelectItem value="member">Member - Normal interaction</SelectItem>
                            <SelectItem value="viewer">Viewer - View only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleInviteMember} className="w-full">
                        Send Invitation
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentTeam.members.map((member) => {
                const isCurrentUser = member.userId === user?.id;
                const canModifyMember =
                  canManageMembers &&
                  !isCurrentUser &&
                  member.role !== "owner" &&
                  (userRole === "owner" || (userRole === "admin" && member.role !== "admin"));

                return (
                  <div
                    key={member.userId}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <img
                        src={member.avatar || generateAvatar(member.name)}
                        alt={member.name}
                        className="size-10 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground">
                          {member.name}
                          {isCurrentUser && <span className="text-muted-foreground ml-2">(You)</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Joined {member.joinedAt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {canModifyMember ? (
                        <Select
                          value={member.role}
                          onValueChange={(v) => handleChangeRole(member.userId, v as UserRole)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {userRole === "owner" && (
                              <SelectItem value="admin">
                                Admin
                              </SelectItem>
                            )}
                            <SelectItem value="member">
                              Member
                            </SelectItem>
                            <SelectItem value="viewer">
                              Viewer
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge className={getRoleBadgeColor(member.role)}>
                          <span className="flex items-center gap-1">
                            {getRoleIcon(member.role)}
                            {member.role}
                          </span>
                        </Badge>
                      )}

                      {canModifyMember && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMember(member.userId)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Role Permissions Reference */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>Understand what each role can do</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-yellow-200 dark:border-yellow-900/50 rounded-lg bg-yellow-50 dark:bg-yellow-900/10">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="size-4 text-yellow-600 dark:text-yellow-400" />
                  <h3 className="text-yellow-900 dark:text-yellow-300">Owner</h3>
                </div>
                <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                  <li>• Manage admins</li>
                  <li>• Manage team data</li>
                  <li>• All admin permissions</li>
                  <li>• Delete team</li>
                </ul>
              </div>
              <div className="p-4 border border-blue-200 dark:border-blue-900/50 rounded-lg bg-blue-50 dark:bg-blue-900/10">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="size-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-blue-900 dark:text-blue-300">Admin</h3>
                </div>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• Manage members</li>
                  <li>• Manage calendars</li>
                  <li>• Manage chat groups</li>
                  <li>• All member permissions</li>
                </ul>
              </div>
              <div className="p-4 border border-green-200 dark:border-green-900/50 rounded-lg bg-green-50 dark:bg-green-900/10">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="size-4 text-green-600 dark:text-green-400" />
                  <h3 className="text-green-900 dark:text-green-300">Member</h3>
                </div>
                <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>• Create tasks</li>
                  <li>• Send messages</li>
                  <li>• Upload files</li>
                  <li>• Normal interaction</li>
                </ul>
              </div>
              <div className="p-4 border border-border rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="size-4 text-muted-foreground" />
                  <h3 className="text-foreground">Viewer</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• View content only</li>
                  <li>• No modifications</li>
                  <li>• Read-only access</li>
                  <li>• Cannot interact</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
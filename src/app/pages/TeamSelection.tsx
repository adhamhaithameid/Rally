import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Users, Plus, ArrowRight, Crown, Clock, Zap } from "lucide-react";

const mockTeams = [
  {
    id: 1,
    name: "Design Team",
    members: 12,
    role: "Owner",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Marketing Squad",
    members: 8,
    role: "Member",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Engineering",
    members: 24,
    role: "Admin",
    lastActive: "5 minutes ago",
  },
];

export function TeamSelection() {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [teamName, setTeamName] = useState("");

  const handleSelectTeam = (teamId: number) => {
    // Mock team selection - in real app, set active team in context/state
    navigate("/dashboard");
  };

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock team creation - in real app, create team via API
    navigate("/dashboard");
  };

  return (
    <div className="min-h-full bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Rally</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Choose Your Team</h1>
          <p className="text-muted-foreground">Select a team to continue or create a new one</p>
          {/* V2 link */}
          <button
            onClick={() => navigate("/team-selection-v2")}
            className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-sm"
          >
            <Zap className="size-3.5" style={{ color: "var(--rally-brand)" }} />
            Try the new experience
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        {!showCreateForm ? (
          <div className="space-y-6">
            {/* Teams List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockTeams.map((team) => (
                <Card 
                  key={team.id}
                  className="cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                  onClick={() => handleSelectTeam(team.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Users className="size-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      {team.role === "Owner" && (
                        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800">
                          <Crown className="size-3 mr-1" />
                          Owner
                        </Badge>
                      )}
                      {team.role === "Admin" && (
                        <Badge className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800">
                          Admin
                        </Badge>
                      )}
                      {team.role === "Member" && (
                        <Badge variant="outline">Member</Badge>
                      )}
                    </div>
                    <CardTitle>{team.name}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Users className="size-3" />
                          {team.members} members
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {team.lastActive}
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Open Team
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {/* Create New Team Card */}
              <Card 
                className="cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-colors border-2 border-dashed"
                onClick={() => setShowCreateForm(true)}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-2">
                    <Plus className="size-6 text-muted-foreground" />
                  </div>
                  <CardTitle>Create New Team</CardTitle>
                  <CardDescription>
                    Start a new workspace for your team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Get Started
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle>Create New Team</CardTitle>
              <CardDescription>
                Set up your team workspace in Rally
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTeam} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input
                    id="teamName"
                    placeholder="e.g., Design Team"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Choose a name that represents your team or project
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamDescription">Description (Optional)</Label>
                  <Input
                    id="teamDescription"
                    placeholder="What's your team working on?"
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Create Team
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Calendar, CheckCircle2, MessageSquare, ArrowRight, Users, Bot } from "lucide-react";

// Deterministic color assignment for tags
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
import { OnboardingProvider } from "../contexts/OnboardingContext";
import { DashboardTour } from "../components/onboarding/DashboardTour";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router";

const recentActivities = [
  { user: "Sarah Johnson", action: "completed", item: "Website Redesign Task", time: "5 min ago", type: "task" },
  { user: "Mike Chen", action: "commented on", item: "Q1 Report", time: "15 min ago", type: "chat" },
  { user: "Emily Davis", action: "created", item: "New Project Brief", time: "1 hour ago", type: "file" },
  { user: "Alex Turner", action: "updated", item: "Marketing Campaign Event", time: "2 hours ago", type: "calendar" },
  { user: "Lisa Wong", action: "shared", item: "Design Assets", time: "3 hours ago", type: "file" },
];

const upcomingEvents = [
  { title: "Team Standup", time: "Today, 10:00 AM", calendar: "General", color: "bg-blue-600" },
  { title: "Project Deadline", time: "Tomorrow, 5:00 PM", calendar: "Deadlines", color: "bg-red-600" },
  { title: "Client Presentation", time: "Mar 24, 2:00 PM", calendar: "Meetings", color: "bg-purple-600" },
  { title: "Sprint Review", time: "Mar 25, 3:00 PM", calendar: "General", color: "bg-green-600" },
];

const quickActions = [
  { label: "Create Task", icon: CheckCircle2, link: "/app/todo", color: "text-blue-600" },
  { label: "New Message", icon: MessageSquare, link: "/app/chat", color: "text-green-600" },
  { label: "Add Event", icon: Calendar, link: "/app/calendar", color: "text-purple-600" },
  { label: "Ask AI", icon: Bot, link: "/app/ai-chat", color: "text-orange-600" },
];

export function Dashboard() {
  const { user, currentTeam, userRole } = useAuth();

  // Role-specific quick actions
  const getQuickActionsForRole = () => {
    switch (userRole) {
      case 'owner':
      case 'admin':
        return quickActions; // All 4 actions
      case 'member':
        return quickActions.filter(action => 
          action.label === 'Create Task' || action.label === 'Ask AI'
        );
      case 'viewer':
      default:
        return []; // No actions for viewers
    }
  };

  const roleQuickActions = getQuickActionsForRole();

  return (
    <OnboardingProvider totalSteps={8} autoStart={true}>
      <div className="min-h-full bg-background p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8" id="user-profile-menu">
            <h1 className="text-3xl font-bold text-foreground mb-2">Home</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Here's what's happening in{" "}
              <span className="font-medium text-blue-600 dark:text-blue-400">{currentTeam?.projectName}</span>.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" id="dashboard-stats">
            {roleQuickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.label} to={action.link}>
                  <Card className="hover:bg-muted transition-colors cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <Icon className={`size-8 ${action.color} dark:opacity-80 mb-3`} />
                      <p className="font-medium text-sm text-foreground">{action.label}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{activity.user}</span>{" "}
                          <span className="text-muted-foreground">{activity.action}</span>{" "}
                          <span className="font-medium">{activity.item}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your schedule for the next few days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-1 h-12 rounded ${event.color}`} />
                        <div>
                          <p className="font-medium text-sm text-foreground">{event.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {event.calendar}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/app/calendar">
                    View Full Calendar <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Team Overview - Role-Specific */}
          <Card>
            <CardHeader>
              <CardTitle>Team Overview</CardTitle>
              <CardDescription>
                {currentTeam?.name} - {currentTeam?.projectName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Description</p>
                  <p className="text-sm text-muted-foreground">{currentTeam?.description}</p>
                </div>

                {/* Owner/Admin View: Show all members with their tags */}
                {(userRole === 'owner' || userRole === 'admin') && (
                  <div>
                    <p className="text-sm font-medium text-foreground mb-3">Team Members</p>
                    <div className="space-y-3">
                      {currentTeam?.members.map((member) => (
                        <div key={member.userId} className="flex items-start justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-sm text-foreground">{member.name}</p>
                              <Badge variant="outline" className="text-xs">
                                {member.role}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{member.email}</p>
                            {member.communicationTags && member.communicationTags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {member.communicationTags.map((tag) => (
                                  <ColoredTag key={tag} tag={tag} />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4" asChild>
                      <Link to="/app/team">
                        Manage Team <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </div>
                )}

                {/* Member View: Show personal stats and team count */}
                {userRole === 'member' && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Your Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {currentTeam?.members
                          .find((m) => m.userId === user?.id)
                          ?.communicationTags?.map((tag) => (
                            <ColoredTag key={tag} tag={tag} />
                          ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <p className="text-sm font-medium text-foreground">Team Members</p>
                        <p className="text-2xl font-bold text-foreground">{currentTeam?.members.length}</p>
                      </div>
                      <Button variant="outline" asChild>
                        <Link to="/app/team">
                          View Team <ArrowRight className="ml-2 size-4" />
                        </Link>
                      </Button>
                    </div>
                  </>
                )}

                {/* Viewer View: Read-only basic info */}
                {userRole === 'viewer' && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Project Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {currentTeam?.communication.map((tag) => (
                          <ColoredTag key={tag} tag={tag} />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <p className="text-sm font-medium text-foreground">Team Members</p>
                        <p className="text-2xl font-bold text-foreground">{currentTeam?.members.length}</p>
                      </div>
                      <Badge variant="outline">
                        <Users className="size-3 mr-1" />
                        View Only
                      </Badge>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Onboarding Tour */}
      <DashboardTour />
    </OnboardingProvider>
  );
}
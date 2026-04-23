import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'owner' | 'admin' | 'member' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  gender?: string;
  job?: string;
  phone?: string;
  timezone: string;
  tags: string[];
  avatar?: string;
  teams: TeamMembership[];
}

export interface TeamMembership {
  teamId: string;
  teamName: string;
  projectName: string;
  role: UserRole;
}

export interface Team {
  id: string;
  name: string;
  projectName: string;
  description: string;
  communication: string[]; // tags
  inviteLink: string;
  avatar?: string;
  ownerId: string;
  members: TeamMember[];
  calendars: Calendar[];
  createdAt: string;
}

export interface TeamMember {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  joinedAt: string;
  communicationTags?: string[]; // Optional tags for each member
}

export interface Calendar {
  id: string;
  name: string;
  color: string;
  teamId: string;
  createdBy: string;
  events: CalendarEvent[];
}

export interface CalendarEvent {
  id: string;
  calendarId: string;
  title: string;
  description: string;
  start: string;
  end: string;
  allDay: boolean;
  timezone: string;
  rule?: string; // recurrence rule
  createdBy: string;
}

interface AuthContextType {
  user: User | null;
  currentTeam: Team | null;
  userRole: UserRole | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  selectTeam: (teamId: string) => void;
  updateUser: (updates: Partial<User>) => void;
  hasPermission: (action: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  gender: 'Male',
  job: 'Product Manager',
  phone: '+1 (555) 123-4567',
  timezone: 'America/New_York',
  tags: ['Product', 'Design', 'Leadership'],
  avatar: undefined,
  teams: [
    {
      teamId: 'team-1',
      teamName: 'Design Team',
      projectName: 'Website Redesign',
      role: 'owner',
    },
    {
      teamId: 'team-2',
      teamName: 'Marketing Squad',
      projectName: 'Q1 Campaign',
      role: 'admin',
    },
    {
      teamId: 'team-3',
      teamName: 'Engineering',
      projectName: 'Mobile App',
      role: 'member',
    },
  ],
};

const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Design Team',
    projectName: 'Website Redesign',
    description: 'Redesigning the company website for better UX',
    communication: ['Design', 'UX', 'Frontend'],
    inviteLink: 'https://platform-io.com/invite/design-team-abc123',
    ownerId: 'user-1',
    members: [
      {
        userId: 'user-1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'owner',
        joinedAt: '2026-01-15',
        communicationTags: ['Product', 'Design', 'Leadership'],
      },
      {
        userId: 'user-2',
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        role: 'admin',
        joinedAt: '2026-01-20',
        communicationTags: ['UX', 'Research', 'Testing'],
      },
      {
        userId: 'user-3',
        name: 'Mike Chen',
        email: 'mike.c@example.com',
        role: 'member',
        joinedAt: '2026-02-01',
        communicationTags: ['Frontend', 'React', 'TypeScript'],
      },
      {
        userId: 'user-4',
        name: 'Emily Davis',
        email: 'emily.d@example.com',
        role: 'member',
        joinedAt: '2026-02-05',
        communicationTags: ['Backend', 'API', 'Database'],
      },
      {
        userId: 'user-5',
        name: 'Alex Turner',
        email: 'alex.t@example.com',
        role: 'viewer',
        joinedAt: '2026-02-10',
        communicationTags: ['Client', 'Stakeholder'],
      },
    ],
    calendars: [],
    createdAt: '2026-01-15',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(mockTeams[0]);

  const userRole: UserRole | null = currentTeam
    ? user?.teams.find((t) => t.teamId === currentTeam.id)?.role || null
    : null;

  const login = async (email: string, password: string) => {
    // Mock login - in real app, call API
    setUser(mockUser);
    setCurrentTeam(mockTeams[0]);
  };

  const logout = () => {
    setUser(null);
    setCurrentTeam(null);
  };

  const selectTeam = (teamId: string) => {
    const team = mockTeams.find((t) => t.id === teamId);
    if (team) {
      setCurrentTeam(team);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const hasPermission = (action: string): boolean => {
    if (!userRole) return false;

    const permissions: Record<UserRole, string[]> = {
      owner: ['*'], // All permissions
      admin: [
        'manage_members',
        'manage_calendars',
        'create_events',
        'manage_groups',
        'manage_permissions',
        'read',
        'write',
        'delete',
        'modify',
      ],
      member: ['read', 'write', 'create_tasks', 'create_messages'],
      viewer: ['read'],
    };

    const userPermissions = permissions[userRole];
    return userPermissions.includes('*') || userPermissions.includes(action);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentTeam,
        userRole,
        login,
        logout,
        selectTeam,
        updateUser,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper function to generate avatar from name
export function generateAvatar(name: string): string {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  // Generate color based on name hash
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // yellow
    '#EF4444', // red
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#14B8A6', // teal
    '#F97316', // orange
  ];
  
  const color = colors[Math.abs(hash) % colors.length];
  
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect width="100" height="100" fill="${color}"/>
      <text x="50" y="50" font-size="40" fill="white" text-anchor="middle" dominant-baseline="central" font-family="system-ui, sans-serif" font-weight="600">
        ${initials}
      </text>
    </svg>
  `)}`;
}
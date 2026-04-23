import { CoachMark } from './CoachMark';

const tourSteps = [
  {
    title: 'Welcome to Rally! 👋',
    description: 'Let\'s take a quick tour to help you get started with your new collaboration workspace.',
    position: 'center' as const,
  },
  {
    title: 'Navigation Menu',
    description: 'Access all your tools from here: Dashboard, Chat, AI Assistant, Tasks, Calendar, Files, and Team settings.',
    targetId: 'main-navigation',
    position: 'right' as const,
  },
  {
    title: 'Dashboard Overview',
    description: 'Your dashboard shows key metrics, recent activity, and quick actions. Everything you need at a glance.',
    targetId: 'dashboard-stats',
    position: 'bottom' as const,
  },
  {
    title: 'Team Chat',
    description: 'Communicate with your team in real-time. Click on Chat in the navigation to start conversations.',
    targetId: 'nav-chat',
    position: 'right' as const,
  },
  {
    title: 'AI Assistant',
    description: 'Get help from our AI assistant. Ask questions, get suggestions, and boost your productivity.',
    targetId: 'nav-ai-chat',
    position: 'right' as const,
  },
  {
    title: 'Task Management',
    description: 'Stay organized with our To-Do system. Create, assign, and track tasks for you and your team.',
    targetId: 'nav-todo',
    position: 'right' as const,
  },
  {
    title: 'User Profile',
    description: 'Manage your profile settings and preferences. Click here to customize your experience.',
    targetId: 'user-profile-menu',
    position: 'bottom' as const,
  },
  {
    title: 'You\'re All Set! 🎉',
    description: 'That\'s it! You\'re ready to collaborate with your team. Explore the platform and discover more features as you go.',
    position: 'center' as const,
  },
];

export function DashboardTour() {
  return (
    <>
      {tourSteps.map((step, index) => (
        <CoachMark
          key={index}
          step={index}
          title={step.title}
          description={step.description}
          targetId={step.targetId}
          position={step.position}
        />
      ))}
    </>
  );
}
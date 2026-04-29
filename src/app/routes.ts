import { createBrowserRouter } from "react-router";
import { DashboardV2 } from "./pages/DashboardV2";
import { Chat } from "./pages/Chat";
import { ChatV2 } from "./pages/ChatV2";
import { Layout } from "./components/Layout";
import { Landing } from "./pages/Landing";
import { LandingV2 } from "./pages/LandingV2";
import { Login } from "./pages/Login";
import { LoginV2 } from "./pages/LoginV2";
import { Signup } from "./pages/Signup";
import { SignupV2 } from "./pages/SignupV2";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ForgotPasswordV2 } from "./pages/ForgotPasswordV2";
import { ResetPassword } from "./pages/ResetPassword";
import { ResetPasswordV2 } from "./pages/ResetPasswordV2";
import { TeamSelection } from "./pages/TeamSelection";
import { TeamSelectionV2 } from "./pages/TeamSelectionV2";
import { Dashboard } from "./pages/Dashboard";
import { AIChat } from "./pages/AIChat";
import { AIChatV2 } from "./pages/AIChatV2";
import { Todo } from "./pages/Todo";
import { TodoV2 } from "./pages/TodoV2";
import { CalendarPage } from "./pages/CalendarPage";
import { CalendarV2 } from "./pages/CalendarV2";
import { Profile } from "./pages/Profile";
import { ProfileV2 } from "./pages/ProfileV2";
import { FileSystem } from "./pages/FileSystem";
import { FilesV2 } from "./pages/FilesV2";
import { Team } from "./pages/Team";
import { TeamV2 } from "./pages/TeamV2";
import { DesignSystem } from "./pages/DesignSystem";
import { ColorAuditV2 } from "./pages/ColorAuditV2";
import { ThemeSettings } from "./pages/ThemeSettings";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/v2",
    Component: LandingV2,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/login-v2",
    Component: LoginV2,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/signup-v2",
    Component: SignupV2,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/forgot-password-v2",
    Component: ForgotPasswordV2,
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
  },
  {
    path: "/reset-password-v2",
    Component: ResetPasswordV2,
  },
  {
    path: "/team-selection",
    Component: TeamSelection,
  },
  {
    path: "/team-selection-v2",
    Component: TeamSelectionV2,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "dashboard", Component: Dashboard },
      { path: "home", Component: DashboardV2 },
      { path: "chat", Component: Chat },
      { path: "chat-v2", Component: ChatV2 },
      { path: "ai-chat", Component: AIChat },
      { path: "ai-chat-v2", Component: AIChatV2 },
      { path: "todo", Component: Todo },
      { path: "todo-v2", Component: TodoV2 },
      { path: "calendar", Component: CalendarPage },
      { path: "calendar-v2", Component: CalendarV2 },
      { path: "profile", Component: Profile },
      { path: "profile-v2", Component: ProfileV2 },
      { path: "files", Component: FileSystem },
      { path: "files-v2", Component: FilesV2 },
      { path: "team", Component: Team },
      { path: "team-v2", Component: TeamV2 },
      { path: "design-system", Component: DesignSystem },
      { path: "color-audit",   Component: ColorAuditV2 },
      { path: "theme-settings",Component: ThemeSettings },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
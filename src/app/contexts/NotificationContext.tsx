import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Lightbulb, X } from "lucide-react";

export type NotificationType = "success" | "warning" | "error" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
}

interface NotificationContextType {
  showNotification: (type: NotificationType, title: string, message?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
}

const NOTIFICATION_CONFIG: Record<
  NotificationType,
  { bg: string; icon: typeof CheckCircle2 }
> = {
  success: { bg: "bg-green-500", icon: CheckCircle2 },
  warning: { bg: "bg-yellow-500", icon: AlertTriangle },
  error:   { bg: "bg-red-500",   icon: XCircle },
  info:    { bg: "bg-blue-500",  icon: Lightbulb },
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (type: NotificationType, title: string, message?: string) => {
      const id = `notif-${Date.now()}-${Math.random()}`;
      setNotifications((prev) => [...prev, { id, type, title, message }]);
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 5000);
    },
    []
  );

  const dismiss = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {/* Notification panel – fixed top-right */}
      <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none max-w-sm w-full px-2">
        {notifications.map((notif) => {
          const { bg, icon: Icon } = NOTIFICATION_CONFIG[notif.type];
          return (
            <div
              key={notif.id}
              className="pointer-events-auto flex items-start gap-3 bg-card border border-border rounded-xl p-3 animate-in slide-in-from-right duration-300"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
            >
              {/* Colored square icon */}
              <div className={`${bg} rounded-lg p-2 flex-shrink-0`}>
                <Icon className="size-4 text-white" />
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm font-medium text-foreground leading-snug">{notif.title}</p>
                {notif.message && (
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{notif.message}</p>
                )}
              </div>
              {/* Dismiss */}
              <button
                onClick={() => dismiss(notif.id)}
                className="text-muted-foreground hover:text-foreground transition-colors mt-0.5 flex-shrink-0"
              >
                <X className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
}

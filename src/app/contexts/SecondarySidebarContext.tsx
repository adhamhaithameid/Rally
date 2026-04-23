import { createContext, useContext, useState, ReactNode } from "react";

interface SecondarySidebarContextType {
  secondarySidebar: ReactNode | null;
  setSecondarySidebar: (content: ReactNode | null) => void;
}

export const SecondarySidebarContext = createContext<SecondarySidebarContextType>({
  secondarySidebar: null,
  setSecondarySidebar: () => {},
});

export function useSecondarySidebar() {
  return useContext(SecondarySidebarContext);
}

export function SecondarySidebarProvider({ children }: { children: ReactNode }) {
  const [secondarySidebar, setSecondarySidebar] = useState<ReactNode | null>(null);
  return (
    <SecondarySidebarContext.Provider value={{ secondarySidebar, setSecondarySidebar }}>
      {children}
    </SecondarySidebarContext.Provider>
  );
}

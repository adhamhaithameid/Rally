import { createContext, useContext, useState, ReactNode } from "react";

export type AppVersion = "v1" | "v2";

interface VersionContextType {
  version: AppVersion;
  setVersion: (v: AppVersion) => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export function VersionProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState<AppVersion>("v1");
  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
}

export function useVersion() {
  const ctx = useContext(VersionContext);
  if (!ctx) throw new Error("useVersion must be used within VersionProvider");
  return ctx;
}

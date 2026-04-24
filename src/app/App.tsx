import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PaletteProvider } from "./contexts/PaletteContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { VersionProvider } from "./contexts/VersionContext";

function App() {
  return (
    <ThemeProvider>
      <PaletteProvider>
        <AuthProvider>
          <NotificationProvider>
            <VersionProvider>
              <RouterProvider router={router} />
            </VersionProvider>
          </NotificationProvider>
        </AuthProvider>
      </PaletteProvider>
    </ThemeProvider>
  );
}

export default App;
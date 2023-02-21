import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

export const App = () => {
  
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppThemeProvider>
  );
}

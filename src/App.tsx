import { DrawerProvider, AppThemeProvider } from "./shared/contexts";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { MenuLateral } from "./shared/components";

export const App = () => {

  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
}

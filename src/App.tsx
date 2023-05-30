import { DrawerProvider, AppThemeProvider } from "./shared/contexts"
import { MenuLateral } from "./shared/components"
import { BrowserRouter } from "react-router-dom"
import "./shared/forms/TraducoesYup"
import { AppRoutes } from "./routes"

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

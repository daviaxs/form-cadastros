import { createContext, useCallback, useContext, useState } from "react";


interface IDrawerContextData {
  isDrawerOpen: boolean;
  drawerOptions: IdrawerOptions[];
  toggleDrawerOpen: () => void;
  setDrawerOptions: (newDrawerOptions: IdrawerOptions[]) => void;
}

interface IdrawerOptions {
  path: string;
  icon: string;
  label: string;
}

interface IThemeProvider {
  children: React.ReactNode
}

const DrawerContext = createContext({} as IDrawerContextData)

export const useDrawerContext = () => {
  return useContext(DrawerContext)
}

export const DrawerProvider: React.FC<IThemeProvider> = ({ children }) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [drawerOptions, setdrawerOptions] = useState<IdrawerOptions[]>([])

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
  }, [])

  const handlesetdrawerOptions = useCallback((newDrawerOptions: IdrawerOptions[]) => {
    setdrawerOptions(newDrawerOptions)
  }, [])


  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions,toggleDrawerOpen, setDrawerOptions: handlesetdrawerOptions }}>
          {children}
    </DrawerContext.Provider>
  )
}

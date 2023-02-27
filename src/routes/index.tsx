import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from 'react'
import { useDrawerContext } from "../shared/contexts";


export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext()

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      }
    ]);
  }, [setDrawerOptions])

  return (
    <Routes>
      <Route path="/pagina-inicial" element={
        <Button
        variant="contained"
        color="primary"
        onClick={ toggleDrawerOpen }>Click</Button> }
      />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  )
}

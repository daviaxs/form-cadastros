import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from 'react'
import { useDrawerContext } from "../shared/contexts";
import { Dashboard, ListagemDePessoas, DetalheDePessoas } from "../pages";


export const AppRoutes = () => {
  const {  setDrawerOptions } = useDrawerContext()

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
      {
        icon: 'location_city',
        path: '/cidades',
        label: 'Cidades',
      },
      {
        icon: 'people',
        path: '/pessoas',
        label: 'Pessoas',
      }
    ]);
  }, [setDrawerOptions])

  return (
    <Routes>
      <Route path="/pagina-inicial" element={ <Dashboard/> }/>

      <Route path="/pessoas" element={ <ListagemDePessoas/> }/>
      <Route path="/pessoas/detalhe/:id" element={ <DetalheDePessoas/> }/>
      
      <Route path="/cidades" element={ <ListagemDePessoas/> }/>
      <Route path="/cidades/detalhe/:id" element={ <DetalheDePessoas/> }/>

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  )
}

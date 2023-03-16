import { useEffect, useMemo } from "react"
import { useSearchParams } from "react-router-dom"

import { FerramentasDaListagem } from "../../shared/components"
import { useDebounce } from "../../shared/hooks"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService"



export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce(3000)

  const busca = useMemo(() => {
    return searchParams.get('busca') || ''
  }, [searchParams])


  useEffect(() => {

    debounce(() => {
      PessoasService.getAll(1, busca)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            console.log(result)
          }
        })
    })
  }, [busca, debounce])

  return (
    <LayoutBaseDePagina
      titulo="Listagem de Pessoas"
      barraDeFerramentas={<FerramentasDaListagem
        mostrarInputBusca
        textoBotaoNovo="Nova"
        textoDaBusca={busca}
        aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
      />}>

    </LayoutBaseDePagina>
  )
}
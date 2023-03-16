import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { FerramentasDaListagem } from "../../shared/components"
import { useDebounce } from "../../shared/hooks"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService"



export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce()

  const [rows, setRows] = useState<IListagemPessoa[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const busca = useMemo(() => {
    return searchParams.get('busca') || ''
  }, [searchParams])


  useEffect(() => {
    setIsLoading(true)

    debounce(() => {
      PessoasService.getAll(1, busca)
        .then((result) => {
          setIsLoading(true)

          if (result instanceof Error) {
            alert(result.message)
          } else {
            console.log(result)

            setTotalCount(result.totalCount)
            setRows(result.data)
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
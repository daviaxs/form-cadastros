import { useEffect, useMemo, useState } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import { useSearchParams } from "react-router-dom"

import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService"
import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useDebounce } from "../../shared/hooks"



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

      <TableContainer component={Paper} variant={"outlined"} sx={{ m: 1, width: "auto" }}>
        <Table>
          <TableHead>

            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>

            {rows.map(row => (
              <TableRow key={row.id}>
              <TableCell>Ações</TableCell>
              <TableCell>{row.nomeCompleto}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>

    </LayoutBaseDePagina>
  )
}
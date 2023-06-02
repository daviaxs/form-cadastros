import { useEffect, useState } from "react"
import { Box, Grid, Card, CardContent, Typography } from "@mui/material"

import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { CidadesService } from "../../shared/services/api/cidades/CidadesService"
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService"

export const Dashboard = () => {
  const [isLoadingCidades, setIsLoadingCidades] = useState(true)
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true)

  const [totalCountCidades, setTotalCountCidades] = useState(0)
  const [totalCountPessoas, setTotalCountPessoas] = useState(0)

  useEffect(() => {
    setIsLoadingCidades(true)

    CidadesService.getAll(1)
      .then((result) => {
        setIsLoadingCidades(false)

        if (result instanceof Error) {
          alert(result.message)
        } else {
          setTotalCountCidades(result.totalCount)
        }

      })
  }, [])

  useEffect(() => {
    setIsLoadingPessoas(true)

    PessoasService.getAll(1)
      .then((result) => {
        setIsLoadingPessoas(false)

        if (result instanceof Error) {
          alert(result.message)
        } else {
          setTotalCountPessoas(result.totalCount)
        }

      })
  }, [])

  return (
    <LayoutBaseDePagina
      titulo="Página inicial"
      barraDeFerramentas={(
        <FerramentasDaListagem mostrarBotaoNovo={false} />
      )}
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>

            <Grid item xs={12} md={6} lg={4} xl={2}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de pessoas
                  </Typography>

                  <Box padding={6}>
                    <Typography variant="h1" align="center">
                      {totalCountPessoas}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={2}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de cidades
                  </Typography>

                  <Box padding={6}>
                    <Typography variant="h1" align="center">
                      {totalCountCidades}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  )
}
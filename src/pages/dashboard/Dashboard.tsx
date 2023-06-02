import { Box, Grid } from "@mui/material"
import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      titulo="Página inicial"
      barraDeFerramentas={(
        <FerramentasDaListagem mostrarBotaoNovo={false} />
      )}
    >
      <Box>
        <Grid container>
          <Grid item container>
            <Grid item xs={12} md={6} lg={4} xl={2}>

            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  )
}
import { Box, Grid, Card } from "@mui/material"
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
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>

            <Grid item xs={12} md={6} lg={4} xl={2}>
              <Card>
                Test
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={2}>
              <Card>
                Test
              </Card>
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  )
}
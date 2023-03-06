import { Button, Divider, Icon, Paper, useTheme } from "@mui/material"
import { Box } from "@mui/system"


export const FerramentasDeDetalhe = () => {
  const theme = useTheme()


  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      gap={1}
      padding={1}
      paddingX={1}
      display='flex'
      alignItems='center'
      component={Paper}
    >
      <Button
        color="primary"
        disableElevation
        variant="contained"
        startIcon={<Icon>save</Icon>}
      >Salvar</Button>
      <Button
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={<Icon>save</Icon>}
      >Salvar e Voltar</Button>
      <Button
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={<Icon>delete</Icon>}
      >Apagar</Button>
      <Button
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={<Icon>add</Icon>}
      >Novo</Button>

      <Divider orientation="vertical" variant="middle" />

      <Button
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={<Icon>arrow_back</Icon>}
      >Voltar</Button>
    </Box>
  )
}
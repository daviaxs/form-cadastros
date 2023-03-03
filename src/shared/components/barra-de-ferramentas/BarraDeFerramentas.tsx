import { Button, Icon, Paper, TextField, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import * as React from "react";


interface IBarraDeFerramentasProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;

  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}

export const BarraDeFerramentas: React.FC<IBarraDeFerramentasProps> = ({
  textoDaBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoBotaoNovo = 'Novo',
  aoClicarEmNovo,
  mostrarBotaoNovo = true
}) => {
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
      {mostrarInputBusca && (
        <TextField
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          size="small"
          placeholder="Pesquisar..."
        />
      )}

      <Box display='flex' flex={1} justifyContent='end'>
        {mostrarBotaoNovo && (
          <Button
            color="primary"
            disableElevation
            onClick={aoClicarEmNovo}
            variant="contained"
            endIcon={<Icon>add</Icon>}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>

    </Box >
  )
}
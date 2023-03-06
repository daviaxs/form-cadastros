import { Button, Divider, Icon, Paper, useTheme } from "@mui/material"
import { Box } from "@mui/system"

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = 'Novo',

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar
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
      {mostrarBotaoSalvar &&(<Button
        onClick={aoClicarEmSalvar}
        color="primary"
        disableElevation
        variant="contained"
        startIcon={<Icon>save</Icon>}
      >Salvar</Button>)}

      {mostrarBotaoSalvarEFechar &&(<Button
        onClick={aoClicarEmSalvarEFechar}
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={<Icon>save</Icon>}
      >Salvar e Voltar</Button>)}

      {mostrarBotaoApagar &&(<Button
        onClick={aoClicarEmApagar}
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={<Icon>delete</Icon>}
      >Apagar</Button>)}

      {mostrarBotaoNovo &&(<Button
        onClick={aoClicarEmNovo}
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={<Icon>add</Icon>}
      >{textoBotaoNovo}</Button>)}

      <Divider orientation="vertical" variant="middle" />

      {mostrarBotaoVoltar &&(<Button
        onClick={aoClicarEmVoltar}
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={<Icon>arrow_back</Icon>}
      >Voltar</Button>)}
    </Box>
  )
}
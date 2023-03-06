import { Button, Divider, Icon, Paper, Skeleton, useTheme } from "@mui/material"
import { Box } from "@mui/system"

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEFecharCarregando?: boolean;

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

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEFecharCarregando = false,

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
      {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) &&(<Button
        onClick={aoClicarEmSalvar}
        color="primary"
        disableElevation
        variant="contained"
        startIcon={<Icon>save</Icon>}
      >Salvar</Button>)}

      {mostrarBotaoSalvarCarregando && (
        <Skeleton  width={110} height={60}/>
      )}

      {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando) && (<Button
        onClick={aoClicarEmSalvarEFechar}
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={<Icon>save</Icon>}
      >Salvar e Voltar</Button>)}

      {mostrarBotaoSalvarEFecharCarregando && (
        <Skeleton  width={180} height={60}/>
      )}


      {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) &&(<Button
        onClick={aoClicarEmApagar}
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={<Icon>delete</Icon>}
      >Apagar</Button>)}

      {mostrarBotaoApagarCarregando && (
        <Skeleton  width={110} height={60}/>
      )}

      {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando) &&(<Button
        onClick={aoClicarEmNovo}
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={<Icon>add</Icon>}
      >{textoBotaoNovo}</Button>)}

      {mostrarBotaoNovoCarregando && (
        <Skeleton  width={110} height={60}/>
      )}

      <Divider orientation="vertical" variant="middle" />

      {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) &&(<Button
        onClick={aoClicarEmVoltar}
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={<Icon>arrow_back</Icon>}
      >Voltar</Button>)}

      {mostrarBotaoVoltarCarregando && (
       <Skeleton  width={110} height={60}/>
      )}
      
    </Box>
  )
}
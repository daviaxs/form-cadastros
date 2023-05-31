import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ObjectSchema, object, string, number, ValidationError } from "yup"
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material"

import { PessoasService } from "../../shared/services/api/pessoas/PessoasService"
import { VTextField, VForm, useVForm } from "../../shared/forms"
import { FerramentasDeDetalhe } from "../../shared/components"
import { IVFormErrors } from "../../shared/forms/IVFormErrors"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { AutoCompleteCidade } from "./utils/AutoCompleteCidade"



interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

const formValidationSchema: ObjectSchema<IFormData> = object({
  nomeCompleto: string().defined().min(3),
  email: string().email().defined(),
  cidadeId: number().defined(),
})


export const DetalheDePessoas: React.FC = () => {
  const { formRef, save, saveAndClose, IsSaveAndClose } = useVForm()
  const { id = 'nova' } = useParams<'id'>()
  const navigate = useNavigate()


  const [isLoading, setIsLoading] = useState(false)
  const [nome, setNome] = useState('Carregando')

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true)
      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message)
          } else {
            setNome(result.nomeCompleto)
            formRef.current?.setData(result)
          }
        })
    } else {
      formRef.current?.setData({
        nomeCompleto: '',
        cidadeId: '',
        email: '',
      })
    }
  }, [id, formRef])

  const handleSave = (dados: IFormData) => {

    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true)

        if (id === 'nova') {
          PessoasService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false)

              if (result instanceof Error) {
                alert(result.message)
              } else {
                if (IsSaveAndClose()) {
                  navigate(`/pessoas`)
                } else {
                  navigate(`/pessoas/detalhe/${result}`)
                }
              }
            })

        } else {
          PessoasService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false)

              if (result instanceof Error) {
                alert(result.message)
              } else {
                if (IsSaveAndClose()) {
                  navigate(`/pessoas`)
                }
              }
            })
        }
      })
      .catch((errors: ValidationError) => {
        const validationErrors: IVFormErrors = {}

        errors.inner.forEach(error => {
          if (!error.path) return

          validationErrors[error.path] = error.message
        })

        formRef.current?.setErrors(validationErrors)
      })


  }

  const handleDelete = (id: number) => {
    if (window.confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            alert('Registro apagado com sucesso')
            navigate('/pessoas')
          }
        })
    }
  }

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate('/pessoas')}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
        />}
    >

      <VForm ref={formRef} onSubmit={handleSave} >
        <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>

          <Grid container direction='column' padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Nome completo'
                  name='nomeCompleto'
                  disabled={isLoading}
                  onChange={e => setNome(e.target.value)} />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Email'
                  name='email'
                  disabled={isLoading} />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <AutoCompleteCidade isExternalLoading={isLoading} />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>


    </LayoutBaseDePagina>
  )

}
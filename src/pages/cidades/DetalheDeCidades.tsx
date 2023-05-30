import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ObjectSchema, object, string, ValidationError } from "yup"
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material"

import { CidadesService } from "../../shared/services/api/cidades/CidadesService"
import { VTextField, VForm, useVForm } from "../../shared/forms"
import { FerramentasDeDetalhe } from "../../shared/components"
import { IVFormErrors } from "../../shared/forms/IVFormErrors"
import { LayoutBaseDePagina } from "../../shared/layouts"

interface IFormData {
  nome: string;
}

const formValidationSchema: ObjectSchema<IFormData> = object({
  nome: string().defined().min(3),
})

export const DetalheDeCidades: React.FC = () => {
  const { formRef, save, saveAndClose, IsSaveAndClose } = useVForm()
  const { id = 'nova' } = useParams<'id'>()
  const navigate = useNavigate()


  const [isLoading, setIsLoading] = useState(false)
  const [nome, setNome] = useState('Carregando')

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true)
      CidadesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message)
          } else {
            setNome(result.nome)
            formRef.current?.setData(result)
          }
        })
    } else {
      formRef.current?.setData({
        nome: '',
      })
    }
  }, [id, formRef])

  const handleSave = (dados: IFormData) => {

    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true)

        if (id === 'nova') {
          CidadesService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false)

              if (result instanceof Error) {
                alert(result.message)
              } else {
                if (IsSaveAndClose()) {
                  navigate(`/cidades`)
                } else {
                  navigate(`/cidades/detalhe/${result}`)
                }
              }
            })

        } else {
          CidadesService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false)

              if (result instanceof Error) {
                alert(result.message)
              } else {
                if (IsSaveAndClose()) {
                  navigate(`/cidades`)
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
      CidadesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            alert('Registro apagado com sucesso')
            navigate('/cidades')
          }
        })
    }
  }

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova cidade' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate('/cidades')}
          aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
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
                  label='Nome'
                  name='nome'
                  disabled={isLoading}
                  onChange={e => setNome(e.target.value)} />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>


    </LayoutBaseDePagina>
  )

}
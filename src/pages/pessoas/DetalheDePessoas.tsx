import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { PessoasService } from '../../shared/services/api/pessoas/PessoasService'
import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { VTextField } from '../../shared/forms'


interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>()
  const navigate = useNavigate()

  const formRef = useRef<FormHandles>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [nome, setNome] = useState('false')

  useEffect(() => {
    setIsLoading(true)

    if (id !== 'nova') {
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
    }
  }, [id])

  const handleSave = (dados: IFormData) => {
    setIsLoading(true)

    if (id === 'nova') {
      PessoasService
        .create(dados)
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message)
          } else {
            navigate(`/pessoas/detalhe/${result}`)
          }
        })

    } else {
      PessoasService
        .updateById(Number(id), { id: Number(id), ...dados })
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message)
          }
        })
    }
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

          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate('/pessoas')}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
        />}
    >

      <Form ref={formRef} onSubmit={handleSave} >

        <VTextField placeholder='Nome completo' name='nomeCompleto' />
        <VTextField placeholder='Email' name='email' />
        <VTextField placeholder='Cidade id' name='cidadeId' />
      </Form>


    </LayoutBaseDePagina>
  )

}
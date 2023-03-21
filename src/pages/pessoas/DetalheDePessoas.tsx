import { useEffect, useState } from 'react'
import { FerramentasDeDetalhe } from "../../shared/components"
import { useNavigate, useParams } from "react-router-dom"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { Form } from '@unform/web'

import { PessoasService } from '../../shared/services/api/pessoas/PessoasService'
import { VTextField } from '../../shared/forms'


export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>()
  const navigate = useNavigate()

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
            console.log(result)
          }
        })
    }
  }, [id])

  const handleSave = () => {
    console.log('Save')
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

          aoClicarEmSalvarEFechar={handleSave}
          aoClicarEmSalvar={handleSave}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate('/pessoas')}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
        />}
    >

      <Form onSubmit={(dados) => console.log(dados)} >

        <VTextField
          name='nomeCompleto'

        />

        <button type='submit'>Submit</button>
      </Form>


    </LayoutBaseDePagina>
  )

}
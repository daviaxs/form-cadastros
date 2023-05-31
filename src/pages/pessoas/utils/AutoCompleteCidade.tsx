import { useEffect, useMemo, useState } from "react"
import { Autocomplete, CircularProgress, TextField } from "@mui/material"

import { CidadesService } from "../../../shared/services/api/cidades/CidadesService"
import { useDebounce } from "../../../shared/hooks"

type TAutoCompleteOption = {
  id: number
  label: string
}

interface IAutoCompleteCidadeProps {
  isExternalLoading?: boolean
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({ isExternalLoading = false }) => {
  const { debounce } = useDebounce()

  const [selectedId, setSelectedId] = useState<number | undefined>(undefined)
  const [options, setOptions] = useState<TAutoCompleteOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [busca, setBusca] = useState('')

  useEffect(() => {

    setIsLoading(true)

    debounce(() => {
      CidadesService.getAll(1, busca)
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message)
          } else {
            setOptions(result.data.map(cidade => ({ id: cidade.id, label: cidade.nome })))
          }

        })
    })
  }, [debounce, busca])

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId === undefined) return undefined

    const selectedOption = options.find(option => option.id === selectedId)

    return selectedOption
  }, [options, selectedId])

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem opções"
      loadingText="Carregando..."

      options={options}
      loading={isLoading}
      disabled={isExternalLoading}
      value={autoCompleteSelectedOption}
      popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={22} /> : undefined}

      onInputChange={(_, newValue) => setBusca(newValue)}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id)
        setBusca('')
      }}

      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
        />
      )}
    />
  )
}
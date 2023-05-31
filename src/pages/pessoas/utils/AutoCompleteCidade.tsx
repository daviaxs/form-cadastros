import { Autocomplete, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useDebounce } from "../../../shared/hooks"
import { CidadesService } from "../../../shared/services/api/cidades/CidadesService"

type TAutoCompleteOption = {
  id: number
  label: string
}

export const AutoCompleteCidade: React.FC = () => {
  const { debounce } = useDebounce()
  const [options, setOptions] = useState<TAutoCompleteOption[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    setIsLoading(true)

    debounce(() => {
      CidadesService.getAll(1/*, busca*/)
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message)
          } else {
            setOptions(result.data.map(cidade => ({ id: cidade.id, label: cidade.nome })))
          }

        })
    })
  }, [debounce])

  return (
    <Autocomplete
      options={[options]}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
        />
      )}
    />
  )
}
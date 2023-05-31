import { Autocomplete, TextField } from "@mui/material"

type TAutoCompleteOption = {
  id: number
  label: string
}

export const AutoCompleteCidade: React.FC = () => {
  return (
    <Autocomplete
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
        />
      )}
    />
  )
}
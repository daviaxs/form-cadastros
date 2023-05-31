import { Autocomplete, TextField } from "@mui/material"

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
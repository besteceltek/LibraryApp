import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';

function AuthorDialogContent({ authorObject, inputChangeFunction }) {
  return (
    <DialogContent id='content'>
      <TextField
        autoFocus
        required
        label="Name"
        name="name"
        value={authorObject.name}
        size="small"
        onChange={inputChangeFunction}
        autoComplete='false'
      />
      <TextField
        required
        label="Country"
        name="country"
        value={authorObject.country}
        size="small"
        onChange={inputChangeFunction}
        autoComplete='false'
      />
      <TextField
        required
        label="Birth Date"
        name="birthDate"
        value={authorObject.birthDate}
        size="small"
        onChange={inputChangeFunction}
        autoComplete='false'
      />
    </DialogContent>
  )
}

export default AuthorDialogContent
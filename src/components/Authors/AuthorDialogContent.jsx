import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';

function AuthorDialogContent({ authorObject, inputChangeFunction }) {
  return (
    <DialogContent id='content'>
      <TextField
        required
        label="Name"
        name="name"
        defaultValue={0}
        value={authorObject.name}
        size="small"
        onChange={inputChangeFunction}
      />
      <TextField
        required
        label="Country"
        name="country"
        defaultValue={""}
        value={authorObject.country}
        size="small"
        onChange={inputChangeFunction}
      />
      <TextField
        required
        label="Birth Date"
        name="birthDate"
        defaultValue={""}
        value={authorObject.birthDate}
        size="small"
        onChange={inputChangeFunction}
      />
    </DialogContent>
  )
}

export default AuthorDialogContent
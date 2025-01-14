import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';

function CategoryDialogContent({ categoryObject, inputChangeFunction }) {
  return (
    <DialogContent id='content'>
      <TextField
        autoFocus
        required
        label="Name"
        name="name"
        value={categoryObject.name}
        size="small"
        onChange={inputChangeFunction}
        autoComplete='off'
      />
      <TextField
        required
        label="Description"
        name="description"
        value={categoryObject.description}
        size="small"
        onChange={inputChangeFunction}
        autoComplete='off'
      />
    </DialogContent>
  )
}

export default CategoryDialogContent
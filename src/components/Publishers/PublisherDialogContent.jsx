import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';

function PublisherDialogContent({ publisherObject, inputChangeFunction }) {
  return (
    <DialogContent id='content'>
      <TextField
        autoFocus
        required
        label="Name"
        name="name"
        value={publisherObject.name}
        size="small"
        onChange={inputChangeFunction}
        autoComplete='false'
      />
      <TextField
        required
        label="Establishment Year"
        name="establishmentYear"
        value={publisherObject.establishmentYear}
        size="small"
        onChange={inputChangeFunction}
        autoComplete='false'
      />
      <TextField
        required
        label="Address"
        name="address"
        value={publisherObject.address}
        size="small"
        onChange={inputChangeFunction}
        autoComplete='false'
      />
    </DialogContent>
  )
}

export default PublisherDialogContent
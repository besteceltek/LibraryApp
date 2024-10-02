import './Modal.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

function UpdateModal({ dialogContent, prop, updateFunction, updateModalOpen, handleModalClose }) {

  return (
    <>
      <Dialog
        id='modal'
        open={updateModalOpen}
        onClose={handleModalClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault()
            updateFunction()
            handleModalClose()
          }
        }}
      >
        <DialogTitle>Update {prop}</DialogTitle>
        {dialogContent}
        <DialogActions id='actions'>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UpdateModal
import './Modal.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import AppButton from '../AppButton';

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
          <AppButton
            text="Cancel"
            buttonFunc={handleModalClose}
          />
          <AppButton
            text="Update"
            buttonFunc={handleModalClose}
            type="submit"
          />
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UpdateModal
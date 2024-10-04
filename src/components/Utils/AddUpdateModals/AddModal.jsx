import { useState } from 'react';
import './Modal.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import AppButton from '../AppButton';

function AddModal({ dialogContent, prop, addFunction }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="add-button">
        <AppButton text={`Add ${prop}`} buttonFunc={handleModalOpen}/>
      </div>
      <Dialog
        id='modal'
        open={modalOpen}
        onClose={handleModalClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault()
            addFunction()
            handleModalClose()
          }
        }}
      >
        <DialogTitle>Add {prop}</DialogTitle>
        {dialogContent}
        <DialogActions id='actions'>
          <AppButton
            text="Cancel"
            buttonFunc={handleModalClose}
          />
          <AppButton
            text="Add"
            buttonFunc={handleModalClose}
            type="submit"
          />
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddModal
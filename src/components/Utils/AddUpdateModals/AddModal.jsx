import { useState } from 'react';
import './Modal.css'
import Button from '@mui/material/Button';
import AppButton from '../AppButton'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

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
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddModal
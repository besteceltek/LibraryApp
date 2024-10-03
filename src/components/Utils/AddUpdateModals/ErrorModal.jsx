import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import './Modal.css'

function ErrorModal({ error, errorModalOpen, handleModalClose }) {

  return (
    <>
      <Dialog
        id='modal'
        open={errorModalOpen}
        onClose={handleModalClose}
        PaperProps={{
          component: 'dialog'
        }}
      >
        <DialogTitle>Error</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleModalClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'var(--secondary-color)',
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent id='content'>
          {error?.message}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ErrorModal

import './AppButton.css';
import Button from '@mui/material/Button';

function AppButton({ id, buttonFunc, text }) {
  return (
    <div className="button-container">
      <Button id={id ? id : 'app-button'} variant="contained" onClick={buttonFunc}>
        {text}
      </Button>
    </div>
  )
}

export default AppButton
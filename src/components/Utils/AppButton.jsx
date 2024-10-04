import './AppButton.css';
import Button from '@mui/material/Button';

function AppButton({ id, buttonFunc, text, type }) {
  return (
    <div className="button-container">
      <Button type={type} id={id ? id : 'app-button'} variant="contained" onClick={buttonFunc}>
        {text}
      </Button>
    </div>
  )
}

export default AppButton
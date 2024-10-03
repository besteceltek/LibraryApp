import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';

function UpdateBorrowDialogContent({ borrowObject, inputChangeFunction, handleBookSelect, books }) {
  return (
    <DialogContent id='content'>
      {Object.keys(borrowObject).map((key) => {
        if (key === "borrowerName" || key === "returnDate" || key === "borrowingDate") {
          return (
            <TextField
              key={`borrow-${key}-input`}
              required
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              value={borrowObject[key] ? borrowObject[key] : ""}
              size="small"
              onChange={inputChangeFunction}
              autoComplete='off'
            />
          )
        }
      })}
    </DialogContent>
  )
}

export default UpdateBorrowDialogContent
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

function AddBorrowDialogContent({ borrowObject, inputChangeFunction, handleBookSelect, books }) {
  return (
    <DialogContent id='content'>
      {Object.keys(borrowObject).map((key) => {
        if (key === "borrowerName" || key === "borrowerMail" || key === "borrowingDate") {
          return (
            <TextField
              key={`borrow-${key}-input`}
              required
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              value={borrowObject[key]}
              size="small"
              onChange={inputChangeFunction}
              autoComplete='off'
            />
          )
        }
      })}
      <FormControl sx={{ width: 300}} size="small">
        <InputLabel id="book-select-label">Book</InputLabel>
        <Select
          labelId="book-select-label"
          value={borrowObject.book?.id}
          label="Book"
          name="bookForBorrowingRequest"
          onChange={handleBookSelect}
        >
          {books?.map((book, index) => (
            <MenuItem 
              key={`${index}book`} 
              value={book.id}
            >
              {book.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </DialogContent>
  )
}

export default AddBorrowDialogContent
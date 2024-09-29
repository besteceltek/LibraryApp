import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

function BookTable({ books, newBook, handleUpdateBookBtn, handleDeleteBook }) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            <TableRow>
              {Object.keys(newBook).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{book.name}</TableCell>
                <TableCell>{book.publicationYear}</TableCell>
                <TableCell>{book.stock}</TableCell>
                <TableCell>{book.author.name}</TableCell>
                <TableCell>{book.publisher.name}</TableCell>
                <TableCell>{book.categories.map((category, index) => 
                  { return (
                    <Chip key={index} label={category.name} />
                  )})}
                </TableCell>
                <TableCell>
                  <Button 
                    onClick={() => {handleUpdateBookBtn(book)}} 
                    color="secondary" 
                    variant="contained"
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell>
                  <Button id={book.id} onClick={handleDeleteBook} color="secondary" variant="contained">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BookTable
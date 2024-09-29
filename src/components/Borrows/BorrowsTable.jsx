import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function BorrowsTable({ borrows, newBorrow, handleUpdateBorrowBtn, handleDeleteBorrow }) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            <TableRow>
              {Object.keys(newBorrow).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {borrows.map((borrow, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{borrow.borrowerName}</TableCell>
                <TableCell>{borrow.borrowerMail}</TableCell>
                <TableCell>{borrow.borrowingDate}</TableCell>
                <TableCell>{borrow.returnDate}</TableCell>
                <TableCell>{borrow.book.name}</TableCell>
                <TableCell>
                  <Button 
                    onClick={() => {handleUpdateBorrowBtn(borrow)}} 
                    color="secondary" 
                    variant="contained"
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell>
                  <Button id={borrow.id} onClick={handleDeleteBorrow} color="secondary" variant="contained">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BorrowsTable
import { useContext } from 'react';
import { UpdatePageContext } from '../../context/UpdatePageProvider'
import axios from "axios"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function AuthorTable({ authors, newAuthor, handleUpdateAuthorBtn }) {
  const { setUpdatePage } = useContext(UpdatePageContext)

  const handleDeleteAuthor = (e) => {
    axios.delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors/" + e.target.id)
    .then(() => {
      setUpdatePage(true)
    })
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            <TableRow>
              {Object.keys(newAuthor).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{author.name}</TableCell>
                <TableCell>{author.birthDate}</TableCell>
                <TableCell>{author.country}</TableCell>
                <TableCell>
                  <Button onClick={() => {handleUpdateAuthorBtn(author)}} color="secondary" variant="contained">Update</Button>
                </TableCell>
                <TableCell>
                  <Button id={author.id} onClick={handleDeleteAuthor} color="secondary" variant="contained">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AuthorTable
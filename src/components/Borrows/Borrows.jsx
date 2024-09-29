import { useContext, useEffect, useState } from "react"
import axios from "axios"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UpdatePageContext } from "../../context/UpdatePageProvider"
import BorrowsTable from "./BorrowsTable";

function Borrows() {
  const [borrows, setBorrows] = useState([])
  const [books, setBooks] = useState([])
  const { updatePage, setUpdatePage } = useContext(UpdatePageContext)
  const [newBorrow, setNewBorrow] = useState(
    {
      "borrowerName": "",
      "borrowerMail": "",
      "borrowingDate": "",
      "bookForBorrowingRequest": {
        "id": "",
        "name": "",
        "publicationYear": "",
        "stock": ""
      }
    }
  )

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows")
    .then((res) => {
      setBorrows(res.data)
      setUpdatePage(false)
    })
    axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books")
    .then((res) => {
      setBooks(res.data)
    })
  }, [updatePage])

  const handleNewBorrowInputChange = (e) => {
    const { name, value } = e.target
    setNewBorrow((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNewBorrowBookSelect = (e) => {
    const { name, value } = e.target
    const newBorrowBook = books.find((book) => book.id === value)
    setNewBorrow((prev) => ({
      ...prev,
      [name]: newBorrowBook
    }))
  }

  const handleAddBorrow = () => {
    axios.post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows", newBorrow)
    .then(() => {
      setUpdatePage(true)
      setNewBorrow(
        {
          "borrowerName": "",
          "borrowerMail": "",
          "borrowingDate": "",
          "bookForBorrowingRequest": {
            "id": "",
            "name": "",
            "publicationYear": "",
            "stock": ""
          }
        }
      )
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleUpdateBorrowBtn = () => {}
  const handleDeleteBorrow = () => {}

  console.log(newBorrow)

  return (
    <div>
      <div className="borrow-inputs">
        <div className="new-borrow">
          <h3>New Book Borrowing</h3>
          <input 
            type="text"
            placeholder='Name'
            onChange={handleNewBorrowInputChange}
            name='borrowerName'
            value={newBorrow.borrowerName}
            autoComplete='off' 
          />
          <br />
          <input 
            type="text"
            placeholder='Mail'
            onChange={handleNewBorrowInputChange}
            name='borrowerMail'
            value={newBorrow.borrowerMail}
            autoComplete='off' 
          />
          <br />
          <input 
            type="text"
            placeholder='Borrow Date'
            onChange={handleNewBorrowInputChange}
            name='borrowingDate'
            value={newBorrow.borrowingDate}
            autoComplete='off' 
          />
          <br />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="book-select-label">Book</InputLabel>
            <Select
              labelId="book-select-label"
              defaultValue={0}
              label="Book"
              name="bookForBorrowingRequest"
              onChange={handleNewBorrowBookSelect}
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
          <br />
          <button onClick={handleAddBorrow}>Gönder</button>
        </div>
      </div>
      <h1>Book Borrows</h1>
      <BorrowsTable
        borrows={borrows}
        newBorrow={newBorrow}
        handleUpdateBorrowBtn={handleUpdateBorrowBtn}
        handleDeleteBorrow={handleDeleteBorrow}
      />
      {borrows.map((borrow, index) => (
        <div key={index}>
          <p>{index + 1} - {borrow.borrowerName} - {borrow.book.name}</p>
        </div>
      ))}
    </div>
  )
}

export default Borrows

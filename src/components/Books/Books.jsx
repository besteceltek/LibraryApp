import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UpdatePageContext } from "../../context/UpdatePageProvider"
import AppTable from "../Utils/AppTable";
import AddModal from "../Utils/AddUpdateModals/AddModal";

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';

import BookDialogContent from "./BookDialogContent";





function Books() {
  
  const [books, setBooks] = useState([])
  const [authors, setAuthors] = useState([])
  const [publishers, setPublishers] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [updatedCategories, setUpdatedCategories] = useState([])
  const { updatePage, setUpdatePage } = useContext(UpdatePageContext)
  const [newBook, setNewBook] = useState(
    {
      name: "",
      publicationYear: "",
      stock: "",
      author: {
        id: "",
        name: "",
        birthDate: "",
        country: ""
      },
      publisher: {
        id: "",
        name: "",
        establishmentYear: "",
        address: ""
      },
      categories: [
        {
          id: "",
          name: "",
          description: ""
        }
      ]
    }
  )
  const [updateBook, setUpdateBook] = useState(
    {
      id: "",
      name: "",
      publicationYear: "",
      stock: "",
      author: {
        id: "",
        name: "",
        birthDate: "",
        country: ""
      },
      publisher: {
        id: "",
        name: "",
        establishmentYear: "",
        address: ""
      },
      categories: [
        {
          id: "",
          name: "",
          description: ""
        }
      ]
    }
  )

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books")
    .then((res) => {
      setBooks(res.data)
      setUpdatePage(false) 
    })
    axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories")
    .then((res) => {
      setCategories(res.data)
    })
    axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors")
    .then((res) => {
      setAuthors(res.data)
    })
    axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers")
    .then((res) => {
      setPublishers(res.data)
    })
  }, [updatePage])

  const handleNewBookInputChange = (e) => {
    const { name, value } = e.target
    setNewBook((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNewBookAuthorSelect = (e) => {
    const { name, value } = e.target
    const newBookAuthor = authors.find((author) => author.id === value)
    setNewBook((prev) => ({
      ...prev,
      [name]: newBookAuthor
    }))
  }

  const handleNewBookPublisherSelect = (e) => {
    const { name, value } = e.target
    const newBookPublisher = publishers.find((publisher) => publisher.id === value)
    setNewBook((prev) => ({
      ...prev,
      [name]: newBookPublisher
    }))
  }

  const handleNewBookCategorySelect = (e) => {
    const { name, value } = e.target
    const categoryIdList = Array.isArray(value) ? value : value.split(',');
    setSelectedCategories(categoryIdList);
    const newBookCategories = categoryIdList.map((id) => (
      categories.find((cat) => cat.id === id)
    ))
    setNewBook((prev) => ({
      ...prev,
      [name]: newBookCategories
    }))
  }

  const handleAddBook = (e) => {
    axios.post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books", newBook)
    .then(() => {
      setUpdatePage(true)
      setNewBook(
        {
          name: "",
          publicationYear: "",
          stock: "",
          author: {
            id: "",
            name: "",
            birthDate: "",
            country: ""
          },
          publisher: {
            id: "",
            name: "",
            establishmentYear: "",
            address: ""
          },
          categories: [
            {
              id: "",
              name: "",
              description: ""
            }
          ]
        }
      )
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleDeleteBook = (e) => {
    axios.delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books/" + e.target.id)
    .then(() => {
      setUpdatePage(true)
    })
  }

  const handleUpdateBookBtn = (book) => {
    setUpdateBook(book)
  }

  const handleUpdateBookInputChange = (e) => {
    const { name, value } = e.target
    setUpdateBook((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateBookAuthorSelect = (e) => {
    const { name, value } = e.target
    const updateBookAuthor = authors.find((author) => author.id === value)
    setUpdateBook((prev) => ({
      ...prev,
      [name]: updateBookAuthor
    }))
  }

  const handleUpdateBookPublisherSelect = (e) => {
    const { name, value } = e.target
    const updateBookPublisher = publishers.find((publisher) => publisher.id === value)
    setUpdateBook((prev) => ({
      ...prev,
      [name]: updateBookPublisher
    }))
  }

  const handleUpdateBookCategorySelect = (e) => {
    const { name, value } = e.target
    const categoryIdList = Array.isArray(value) ? value : value.split(',');
    setUpdatedCategories(categoryIdList);
    const updateBookCategories = categoryIdList.map((id) => (
      categories.find((cat) => cat.id === id)
    ))
    setUpdateBook((prev) => ({
      ...prev,
      [name]: updateBookCategories
    }))
  }

  const handleUpdateBook = () => {
    axios.put(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books/" + updateBook.id, updateBook)
    .then(() => {
      setUpdatePage(true)
      setUpdateBook(
        {
          id: "",
          name: "",
          publicationYear: "",
          stock: "",
          author: {
            id: "",
            name: "",
            birthDate: "",
            country: ""
          },
          publisher: {
            id: "",
            name: "",
            establishmentYear: "",
            address: ""
          },
          categories: [
            {
              id: "",
              name: "",
              description: ""
            }
          ]
        }
      )
    })
  }

  return (
    <div>
      <AddModal
        dialogContent={
          <BookDialogContent 
            bookObject={newBook}
            inputChangeFunction={handleNewBookInputChange}
            handleNewBookAuthorSelect={handleNewBookAuthorSelect}
            authors={authors}
            handleNewBookPublisherSelect={handleNewBookPublisherSelect}
            publishers={publishers}
            selectedCategories={selectedCategories}
            handleNewBookCategorySelect={handleNewBookCategorySelect}
            categories={categories}
          />
        }
        prop="Book"
        addFunction={handleAddBook} 
      />
      <div className="bookInputs">
        <div className="updateBook">
          <h3>Update Book</h3>
          <Box
            className="bookForm"
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              label="Name"
              name="name"
              defaultValue={0}
              value={updateBook.name}
              size="small"
              onChange={handleUpdateBookInputChange}
            />
            <TextField
              required
              label="Publication Year"
              name="publicationYear"
              defaultValue={0}
              value={updateBook.publicationYear}
              size="small"
              onChange={handleUpdateBookInputChange}
            />
            <TextField
              required
              label="Stock"
              name="stock"
              defaultValue={0}
              value={updateBook.stock}
              size="small"
              onChange={handleUpdateBookInputChange}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="author-select-label">Author</InputLabel>
              <Select
                labelId="author-select-label"
                defaultValue={0}
                value={updateBook.author.name}
                label="Author"
                name="author"
                onChange={handleUpdateBookAuthorSelect}
              >
                {authors?.map((author, index) => (
                  <MenuItem 
                    key={`${index}author`} 
                    value={author.id}
                  >
                    {author.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="publisher-select-label">Publisher</InputLabel>
              <Select
                labelId="publisher-select-label"
                defaultValue={0}
                value={updateBook.publisher.name}
                label="Publisher"
                name="publisher"
                onChange={handleUpdateBookPublisherSelect}
              >
                {publishers?.map((publisher, index) => (
                  <MenuItem 
                    key={`${index}publisher`} 
                    value={publisher.id}
                  >
                    {publisher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
          </Box>
          <Button color="secondary" variant="contained" onClick={handleUpdateBook}>Create</Button>
        </div>
      </div>
      <h1 style={{ color: 'var(--text-color)'}}>Authors</h1>
      <AppTable
        keyItem={newBook}
        list={books}
        updateFunc={handleUpdateBookBtn}
        deleteFunc={handleDeleteBook}
      />
    </div>
  )
}

export default Books
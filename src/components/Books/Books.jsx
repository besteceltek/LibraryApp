import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UpdatePageContext } from "../../context/UpdatePageProvider"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useTheme } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(categoryName, selectedCategories, theme) {
  return {
    fontWeight: selectedCategories.includes(categoryName)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

function Books() {
  const theme = useTheme()
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
      <div className="book-inputs">
        <div className="add-book">
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={newBook.name}
            onChange={handleNewBookInputChange} />
          <br />
          <input 
            type="text" 
            name="publicationYear" 
            placeholder="Publication Year" 
            value={newBook.publicationYear}
            onChange={handleNewBookInputChange} />
          <br />
          <input 
            type="text" 
            name="stock" 
            placeholder="Stock" 
            value={newBook.stock}
            onChange={handleNewBookInputChange} />
          <br />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="author-select-label">Author</InputLabel>
            <Select
              labelId="authorSelect"
              defaultValue={0}
              label="Author"
              name="author"
              onChange={handleNewBookAuthorSelect}
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
          <br />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="publisher-select-label">Publisher</InputLabel>
            <Select
              labelId="publisherSelect"
              defaultValue={0}
              label="Publisher"
              name="publisher"
              onChange={handleNewBookPublisherSelect}
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
          <br />
          <FormControl sx={{ m: 1, width: 300}}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              multiple
              name="categories"
              value={selectedCategories}
              onChange={handleNewBookCategorySelect}
              input={<OutlinedInput label="Chip"/>}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const category = categories.find((cat) => cat.id === value);
                    return <Chip key={value} label={category ? category.name : ''} /> 
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categories.map((category, index) => (
                <MenuItem
                  key={`${index}category`}
                  value={category.id}
                  style={getStyles(category.name, selectedCategories, theme)}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button onClick={handleAddBook}>Gönder</button>
        </div>
        <div className="update-book">
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={updateBook.name}
            onChange={handleUpdateBookInputChange} />
          <br />
          <input 
            type="text" 
            name="publicationYear" 
            placeholder="Publication Year" 
            value={updateBook.publicationYear}
            onChange={handleUpdateBookInputChange} />
          <br />
          <input 
            type="text" 
            name="stock" 
            placeholder="Stock" 
            value={updateBook.stock}
            onChange={handleUpdateBookInputChange} />
          <br />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="author-select-label">Author</InputLabel>
            <Select
              labelId="authorSelect"
              defaultValue={0}
              value={updateBook.author.id}
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
          <br />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="publisher-select-label">Publisher</InputLabel>
            <Select
              labelId="publisherSelect"
              defaultValue={0}
              value={updateBook.publisher.id}
              label="Publisher"
              name="publisher"
              onChange={handleNewBookPublisherSelect}
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
          <br />
          <FormControl sx={{ m: 1, width: 300}}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              multiple
              name="categories"
              value={updateBook?.categories?.map((cat) => cat.id) || []}
              onChange={handleUpdateBookCategorySelect}
              input={<OutlinedInput label="Chip"/>}
              renderValue={(selected) => (
                // Only render chips if categories are selected, otherwise it remains empty
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.length > 0
                    ? selected.map((value) => {
                        const category = categories.find((cat) => cat.id === value);
                        return category ? (
                          <Chip key={value} label={category.name} />
                        ) : null;
                      })
                    : null}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categories.map((category, index) => (
                <MenuItem
                  key={`${index}category`}
                  value={category.id}
                  style={getStyles(category.name, updatedCategories, theme)}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button onClick={handleUpdateBook}>Gönder</button>
        </div>
      </div>
      <h1>Books</h1>
      {books.map((book, index) => (
        <div key={index}>
          <p>
            {index+1} - {book.name} -
            <span id={book.id} onClick={handleDeleteBook}> X</span> -
            <span onClick={() => handleUpdateBookBtn(book)}> U</span>
          </p>
        </div>
      ))}
    </div>
  )
}

export default Books
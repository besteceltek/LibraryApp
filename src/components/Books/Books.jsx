import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UpdatePageContext } from "../../context/UpdatePageProvider"
import AppTable from "../Utils/AppTable";
import AddModal from "../Utils/AddUpdateModals/AddModal";
import UpdateModal from "../Utils/AddUpdateModals/UpdateModal";
import BookDialogContent from "./BookDialogContent";
import ErrorModal from "../Utils/AddUpdateModals/ErrorModal";

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

  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleUpdateModalOpen = () => {
    setUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
  };

  const [error, setError] = useState()
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleErrorModalOpen = () => {
    setErrorModalOpen(true);
  };

  const handleErrorModalClose = () => {
    setErrorModalOpen(false);
  };

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
      handleErrorModalOpen()
      setError(err)
    })
  }

  const handleDeleteBook = (e) => {
    axios.delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books/" + e.target.id)
    .then(() => {
      setUpdatePage(true)
    })
    .catch((err) => {
      handleErrorModalOpen()
      setError(err)
    })
  }

  const handleUpdateBookBtn = (book) => {
    handleUpdateModalOpen()
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
    .catch((err) => {
      handleErrorModalOpen()
      setError(err)
    })
  }

  return (
    <div>
      <AddModal
        dialogContent={
          <BookDialogContent 
            bookObject={newBook}
            authors={authors}
            publishers={publishers}
            selectedCategories={selectedCategories}
            categories={categories}
            inputChangeFunction={handleNewBookInputChange}
            handleAuthorSelect={handleNewBookAuthorSelect}
            handlePublisherSelect={handleNewBookPublisherSelect}
            handleCategorySelect={handleNewBookCategorySelect}
          />
        }
        prop="Book"
        addFunction={handleAddBook} 
      />
      <UpdateModal
        dialogContent={
          <BookDialogContent
            bookObject={updateBook}
            authors={authors}
            publishers={publishers}
            selectedCategories={updatedCategories}
            categories={categories}
            inputChangeFunction={handleUpdateBookInputChange}
            handleAuthorSelect={handleUpdateBookAuthorSelect}
            handlePublisherSelect={handleUpdateBookPublisherSelect}
            handleCategorySelect={handleUpdateBookCategorySelect}
          />
        }
        prop="Book"
        updateFunction={handleUpdateBook}
        updateModalOpen={updateModalOpen}
        handleModalClose={handleUpdateModalClose}
      />
      <ErrorModal
        error={error}
        errorModalOpen={errorModalOpen}
        handleModalClose={handleErrorModalClose}
      />
      <h1 style={{ color: 'var(--text-color)'}}>Books</h1>
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
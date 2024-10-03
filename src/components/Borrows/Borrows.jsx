import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UpdatePageContext } from "../../context/UpdatePageProvider"
import AppTable from "../Utils/AppTable";
import AddModal from "../Utils/AddUpdateModals/AddModal";
import UpdateModal from "../Utils/AddUpdateModals/UpdateModal";
import AddBorrowDialogContent from "./AddBorrowDialogContent";
import UpdateBorrowDialogContent from "./UpdateBorrowDialogContent";
import ErrorModal from "../Utils/AddUpdateModals/ErrorModal";

function Borrows() {
  const borrowForKeys = {
    borrowerName: "",
    borrowerMail: "",
    borrowingDate: "",
    returnDate: "",
    book: {}
  }
  const [borrows, setBorrows] = useState([])
  const [books, setBooks] = useState([])
  const { updatePage, setUpdatePage } = useContext(UpdatePageContext)
  const [newBorrow, setNewBorrow] = useState(
    {
      borrowerName: "",
      borrowerMail: "",
      borrowingDate: "",
      returnDate: "",
      bookForBorrowingRequest: {
        id: "",
        name: "",
        publicationYear: "",
        stock: ""
      }
    }
  )
  const [updateBorrow, setUpdateBorrow] = useState(
    {
      id: "",
      borrowerName: "",
      borrowingDate: "",
      returnDate: ""
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
      handleErrorModalOpen()
      setError(err)
    })
  }

  const handleDeleteBorrow = (e) => {
    axios.delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows/" + e.target.id)
    .then(() => {
      setUpdatePage()
    })
    .catch((err) => {
      handleErrorModalOpen()
      setError(err)
    })
  }

  const handleUpdateBorrowBtn = (borrow) => {
    handleUpdateModalOpen()
    setUpdateBorrow(borrow)
  }

  const handleUpdateBorrowInputChange = (e) => {
    const { name, value } = e.target
    setUpdateBorrow((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdateBorrow = () => {
    axios.put(import.meta.env.VITE_APP_BASE_URL + "api/v1/borrows/" + updateBorrow.id, updateBorrow)
    .then(() => {
      setUpdatePage(true)
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
          <AddBorrowDialogContent
            borrowObject={newBorrow}
            books={books}
            inputChangeFunction={handleNewBorrowInputChange}
            handleBookSelect={handleNewBorrowBookSelect}
          />
        }
        prop="Borrow"
        addFunction={handleAddBorrow}
      />
      <UpdateModal
        dialogContent={
          <UpdateBorrowDialogContent
            borrowObject={updateBorrow}
            inputChangeFunction={handleUpdateBorrowInputChange}
          />
        }
        prop="Borrow"
        updateFunction={handleUpdateBorrow}
        updateModalOpen={updateModalOpen}
        handleModalClose={handleUpdateModalClose}
      />
      <ErrorModal
        error={error}
        errorModalOpen={errorModalOpen}
        handleModalClose={handleErrorModalClose}
      />
      <h1 style={{ color: 'var(--text-color)'}}>Book Borrows</h1>
      <AppTable
        keyItem={borrowForKeys}
        list={borrows}
        updateFunc={handleUpdateBorrowBtn}
        deleteFunc={handleDeleteBorrow}
      />
    </div>
  )
}

export default Borrows

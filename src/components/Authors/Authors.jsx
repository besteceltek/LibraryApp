import { useEffect, useState, useContext } from 'react'
import { UpdatePageContext } from '../../context/UpdatePageProvider'
import { LoadingContext } from '../../context/LoadingProvider'
import axios from "axios"
import AuthorDialogContent from './AuthorDialogContent'
import AddModal from '../Utils/AddUpdateModals/AddModal'
import UpdateModal from '../Utils/AddUpdateModals/UpdateModal'
import AppTable from '../Utils/AppTable'
import ErrorModal from "../Utils/AddUpdateModals/ErrorModal";

function Authors() {
  const [authors, setAuthors] = useState([])
  const [newAuthor, setNewAuthor] = useState(
    {
      name: "",
      birthDate: "",
      country: ""
    }
  )
  const [updateAuthor, setUpdateAuthor] = useState(
    {
      id: "",
      name: "",
      birthDate: "",
      country: ""
    }
  )
  const { updatePage, setUpdatePage } = useContext(UpdatePageContext)
  const { loading, setLoading } = useContext(LoadingContext)

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
    axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors")
    .then(res => {
      setAuthors(res.data)
      setLoading(false)
      setUpdatePage(false)
    })
  }, [updatePage])
  
  const handleAddAuthor = () => {
    axios.post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors", newAuthor)
    .then(() => {
      setUpdatePage(true)
      setNewAuthor(
        {
          name: "",
          birthDate: "",
          country: ""
        }
      )
    })
    .catch((err) => {
      handleErrorModalOpen()
      setError(err)
    })
  }

  const handleNewAuthorInputChange = (e) => {
    const { name, value } = e.target
    setNewAuthor((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateAuthor = () => {
    axios.put(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors/" + updateAuthor.id, updateAuthor)
    .then(() => {
      setUpdatePage(true)
      setUpdateAuthor(
        {
          id: "",
          name: "",
          birthDate: "",
          country: ""
        }
      )
    })
    .catch((err) => {
      handleErrorModalOpen()
      setError(err)
    })
  }

  const handleUpdateAuthorInputChange = (e) => {
    const { name, value } = e.target
    setUpdateAuthor((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateAuthorBtn = (author) => {
    handleUpdateModalOpen()
    setUpdateAuthor(author)
  }

  const handleDeleteAuthor = (e) => {
    axios.delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors/" + e.target.id)
    .then(() => {
      setUpdatePage(true)
    })
    .catch((err) => {
      handleErrorModalOpen()
      setError(err)
    })
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <AddModal
        dialogContent={
          <AuthorDialogContent 
            authorObject={newAuthor}
            inputChangeFunction={handleNewAuthorInputChange}
          />
        }
        prop="Author"
        addFunction={handleAddAuthor} 
      />
      <UpdateModal
        dialogContent={
          <AuthorDialogContent 
            authorObject={updateAuthor}
            inputChangeFunction={handleUpdateAuthorInputChange}
          />
        }
        prop="Author"
        updateFunction={handleUpdateAuthor}
        updateModalOpen={updateModalOpen}
        handleModalClose={handleUpdateModalClose}
      />
      <ErrorModal
        error={error}
        errorModalOpen={errorModalOpen}
        handleModalClose={handleErrorModalClose}
      />
      <h1 style={{ color: 'var(--text-color)'}}>Authors</h1>
      <AppTable
        keyItem={newAuthor}
        list={authors}
        updateFunc={handleUpdateAuthorBtn}
        deleteFunc={handleDeleteAuthor}
      />
    </div>
  )
}

export default Authors
import { useEffect, useState, useContext } from 'react'
import { UpdatePageContext } from '../../context/UpdatePageProvider'
import { LoadingContext } from '../../context/LoadingProvider'
import axios from "axios"
import AuthorDialogContent from './AuthorDialogContent'
import AddModal from '../AddUpdateModals/AddModal'
import UpdateModal from '../AddUpdateModals/UpdateModal'
import AppTable from '../Utils/AppTable'

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

  const handleModalOpen = () => {
    setUpdateModalOpen(true);
  };

  const handleModalClose = () => {
    setUpdateModalOpen(false);
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
      console.log(err)
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
  }

  const handleUpdateAuthorInputChange = (e) => {
    const { name, value } = e.target
    setUpdateAuthor((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateAuthorBtn = (author) => {
    setUpdateAuthor(author)
  }

  const handleDeleteAuthor = (e) => {
    axios.delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors/" + e.target.id)
    .then(() => {
      setUpdatePage(true)
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
            publisherObject={newAuthor}
            inputChangeFunction={handleNewAuthorInputChange}
          />
        }
        prop="Author"
        addFunction={handleAddAuthor} 
      />
      <UpdateModal
        dialogContent={
          <AuthorDialogContent 
            publisherObject={updateAuthor}
            inputChangeFunction={handleUpdateAuthorInputChange}
          />
        }
        prop="Author"
        updateFunction={handleUpdateAuthor}
        updateModalOpen={updateModalOpen}
        handleModalClose={handleModalClose}
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
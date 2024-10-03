import { useEffect, useState, useContext } from "react"
import { UpdatePageContext } from '../../context/UpdatePageProvider'
import axios from "axios"
import AddModal from "../Utils/AddUpdateModals/AddModal";
import UpdateModal from "../Utils/AddUpdateModals/UpdateModal";
import CategoryDialogContent from "./CategoryDialogContent";
import AppTable from "../Utils/AppTable";
import ErrorModal from "../Utils/AddUpdateModals/ErrorModal";

function Categories() {
  const [categories, setCategories] = useState([])
  const { updatePage, setUpdatePage } = useContext(UpdatePageContext)
  const [newCategory, setNewCategory] = useState(
    {
      name: "",
      description: ""
    }
  )
  const [updateCategory, setUpdateCategory] = useState(
    {
      id: "",
      name: "",
      description: ""
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
    axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories")
    .then((res) => {
      setCategories(res.data)
      setUpdatePage(false)
    })
  }, [updatePage])

  const handleNewCategoryInputChange = (e) => {
    const { name, value } = e.target
    setNewCategory((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddCategory = () => {
    axios.post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories", newCategory)
    .then(() => {
      setUpdatePage(true)
      setNewCategory(
        {
          name: "",
          description: ""
        }
      )
    })
    .catch((err) => {
      handleErrorModalOpen()
      setError(err)
    })
  }

  const handleDeleteCategory = (e) => {
    axios.delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories/" + e.target.id)
    .then(() => {
      setUpdatePage(true)
    })
    .catch((err) => {
      handleErrorModalOpen()
      setError(err)
    })
  }

  const handleUpdateCategoryBtn = (category) => {
    setUpdateCategory(category)
    handleUpdateModalOpen()
    console.log(category)
  }

  const handleUpdateCategoryInputChange = (e) => {
    const {name, value} = e.target
    setUpdateCategory((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdateCategory = () => {
    console.log(updateCategory)
    axios.put(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories/" + updateCategory.id, updateCategory)
    .then(() => {
      setUpdatePage(true)
      setUpdateCategory(
        {
          id: "",
          name: "",
          description: ""
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
          <CategoryDialogContent 
            categoryObject={newCategory}
            inputChangeFunction={handleNewCategoryInputChange}
          />
        }
        prop="Category"
        addFunction={handleAddCategory} 
      />
      <UpdateModal 
        dialogContent={
          <CategoryDialogContent 
            categoryObject={updateCategory}
            inputChangeFunction={handleUpdateCategoryInputChange}
          />
        }
        prop="Category"
        updateFunction={handleUpdateCategory}
        updateModalOpen={updateModalOpen}
        handleModalClose={handleUpdateModalClose}
      />
      <ErrorModal
        error={error}
        errorModalOpen={errorModalOpen}
        handleModalClose={handleErrorModalClose}
      />
      <h1 style={{ color: 'var(--text-color)'}}>Categories</h1>
      <AppTable
        keyItem={newCategory}
        list={categories}
        updateFunc={handleUpdateCategoryBtn}
        deleteFunc={handleDeleteCategory}
      />
    </div>
  )
}

export default Categories
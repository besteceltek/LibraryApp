import { useEffect, useState, useContext } from "react"
import { UpdatePageContext } from '../../context/UpdatePageProvider'
import axios from "axios"
import CategoryTable from "./CategoryTable"
import ErrorModal from "../ErrorModal"

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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
  }

  const handleDeleteCategory = (e) => {
    axios.delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories/" + e.target.id)
    .then(() => {
      setUpdatePage(true)
    })
  }

  const handleUpdateCategoryBtn = (category) => {
    setUpdateCategory(category)
  }

  const handleUpdateCategoryInputChange = (e) => {
    const {name, value} = e.target
    setUpdateCategory((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdateCategory = () => {
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
      return (
        <ErrorModal error={err} openValue={true}/>
      )
    })
  }

  return (
    <div>
      <div className="categoryInputs">
        <div className="addCategory">
          <h3>New Category</h3>
          <Box
            className="categoryForm"
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              label="Name"
              name="name"
              defaultValue={newCategory.name}
              size="small"
              onChange={handleNewCategoryInputChange}
            />
            <TextField
              required
              label="Description"
              name="description"
              defaultValue={newCategory.description}
              size="small"
              onChange={handleNewCategoryInputChange}
            />
          </Box>
          <Button color="secondary" variant="contained" onClick={handleAddCategory}>Create</Button>
        </div>
        <div className="updateCategory">
          <h3>Update Category</h3>
          <Box
            className="categoryForm"
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              label="Name"
              name="name"
              defaultValue={0}
              value={updateCategory.name}
              size="small"
              onChange={handleUpdateCategoryInputChange}
            />
            <TextField
              required
              label="Description"
              name="description"
              defaultValue={0}
              value={updateCategory.description}
              size="small"
              onChange={handleUpdateCategoryInputChange}
            />
          </Box>
          <Button color="secondary" variant="contained" onClick={handleUpdateCategory}>Update</Button>
        </div>
      </div>
      <h1>Categories</h1>
      <CategoryTable 
        categories= {categories}
        newCategory= {newCategory}
        handleUpdateCategoryBtn= {handleUpdateCategoryBtn}
        handleDeleteCategory= {handleDeleteCategory}
      />
    </div>
  )
}

export default Categories
import { useEffect, useState, useContext } from "react"
import { UpdatePageContext } from '../../context/UpdatePageProvider'
import axios from "axios"

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
    axios.get(import.meta.env.BASE_URL + "/api/v1/categories")
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
    axios.post(import.meta.env.BASE_URL + "/api/v1/categories", newCategory)
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
    axios.delete(import.meta.env.BASE_URL + "/api/v1/categories/" + e.target.id)
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
    axios.put(import.meta.env.BASE_URL + "/api/v1/categories/" + updateCategory.id, updateCategory)
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
  }

  return (
    <div>
      <div className="categoryInputs">
        <div className="addCategory">
          <h3>New Category</h3>
          <input 
            type="text" 
            name="name" 
            value={newCategory.name}
            placeholder="Name"
            onChange={handleNewCategoryInputChange} />
          <br />
          <input 
            type="text" 
            name="description" 
            value={newCategory.description}
            placeholder="Description"
            onChange={handleNewCategoryInputChange} />
          <br />
          <button onClick={handleAddCategory}>Gönder</button>
        </div>
        <div className="updateCategory">
          <h3>Update Category</h3>
          <input 
            type="text" 
            name="name" 
            value={updateCategory.name}
            placeholder="Name"
            onChange={handleUpdateCategoryInputChange} />
          <br />
          <input 
            type="text" 
            name="description" 
            value={updateCategory.description}
            placeholder="Description"
            onChange={handleUpdateCategoryInputChange} />
          <br />
          <button onClick={handleUpdateCategory}>Gönder</button>
        </div>
      </div>
      <h1>Categories</h1>
      {categories.map((category, index) => (
        <p key={index}>{index + 1} - {category.name} - {category.description} -
          <span id={category.id} onClick={handleDeleteCategory}> X</span> -
          <span onClick={() => {handleUpdateCategoryBtn(category)}}> U</span>
        </p>
      ))}
    </div>
  )
}

export default Categories
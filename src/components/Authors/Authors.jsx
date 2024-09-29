import { useEffect, useState, useContext } from 'react'
import { UpdatePageContext } from '../../context/UpdatePageProvider'
import { LoadingContext } from '../../context/LoadingProvider'
import axios from "axios"
import AuthorTable from './AuthorTable'

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
    <div className='authorInputs'>
      <div className='addAuthor'>
        <h3>New Author</h3>
        <Box
          className="authorForm"
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            label="Name"
            name="name"
            defaultValue={newAuthor.name}
            size="small"
            onChange={handleNewAuthorInputChange}
          />
          <TextField
            required
            label="Country"
            name="country"
            defaultValue={newAuthor.description}
            size="small"
            onChange={handleNewAuthorInputChange}
          />
          <TextField
            required
            label="Birth Date"
            name="birthDate"
            defaultValue={newAuthor.address}
            size="small"
            onChange={handleNewAuthorInputChange}
          />
        </Box>
        <Button color="secondary" variant="contained" onClick={handleAddAuthor}>Create</Button>
      </div>
      <div className='updateAuthor'>
        <h3>Update Author</h3>
        <Box
          className="authorForm"
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            label="Name"
            name="name"
            defaultValue={0}
            value={updateAuthor.name}
            size="small"
            onChange={handleUpdateAuthorInputChange}
          />
          <TextField
            required
            label="Country"
            name="country"
            defaultValue={""}
            value={updateAuthor.country}
            size="small"
            onChange={handleUpdateAuthorInputChange}
          />
          <TextField
            required
            label="Birth Date"
            name="birthDate"
            defaultValue={""}
            value={updateAuthor.birthDate}
            size="small"
            onChange={handleUpdateAuthorInputChange}
          />
        </Box>
        <Button color="secondary" variant="contained" onClick={handleUpdateAuthor}>Update</Button>
      </div>
    </div>
    <br />
    <h1>Authors</h1>
    <AuthorTable
      authors={authors}
      newAuthor={newAuthor}
      handleUpdateAuthorBtn={handleUpdateAuthorBtn}
    />
    </>
  )
}

export default Authors
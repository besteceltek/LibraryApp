import { useEffect, useState, useContext } from 'react'
import { UpdatePageContext } from '../../context/UpdatePageProvider'
import axios from "axios"
import PublisherTable from './PublisherTable'

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Publishers() {
  const [publishers, setPublishers] = useState([])
  const [newPublisher, setNewPublisher] = useState(
    {
      name: "",
      establishmentYear: "",
      address: ""
    }
  )
  const [updatePublisher, setUpdatePublisher] = useState(
    {
      id: "",
      name: "",
      establishmentYear: "",
      address: ""
    }
  )
  const { updatePage, setUpdatePage } = useContext(UpdatePageContext)

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers")
    .then((res) => {
      setPublishers(res.data)
      setUpdatePage(false)
    })
  }, [updatePage])

  const handleNewPublisherInputChange = (e) => {
    const { name, value } = e.target
    setNewPublisher((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddPublisher = () => {
    axios.post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers", newPublisher)
    .then(() => {
      setUpdatePage(true)
      setNewPublisher(
        {
          name: "",
          establishmentYear: "",
          address: ""
        }
      )
  })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleDeletePublisher = (e) => {
    axios.delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers/" + e.target.id)
    .then(() => {
      setUpdatePage(true)
    })
  }

  const handleUpdatePublisherInputChange = (e) => {
    const { name, value } = e.target
    setUpdatePublisher((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdatePublisherBtn = (publisher) => {
    setUpdatePublisher(publisher)
  }

  const handleUpdatePublisher = () => {
    axios.put(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers/" + updatePublisher.id, updatePublisher)
    .then(() => {
      setUpdatePage(true)
      setUpdatePublisher(
        {
          id: "",
          name: "",
          establishmentYear: "",
          address: ""
        }
      )
    })
  }

  return (
    <div>
      <div className="publisherInputs">
        <div className='addPublisher'>
          <h3>New Publisher</h3>
          <Box
            className="publisherForm"
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              label="Name"
              name="name"
              defaultValue={""}
              size="small"
              onChange={handleNewPublisherInputChange}
            />
            <TextField
              required
              label="Establishment Year"
              name="establishmentYear"
              defaultValue={""}
              size="small"
              onChange={handleNewPublisherInputChange}
            />
            <TextField
              required
              label="Address"
              name="address"
              defaultValue={""}
              size="small"
              onChange={handleNewPublisherInputChange}
            />
          </Box>
          <Button color="secondary" variant="contained" onClick={handleAddPublisher}>Create</Button>
        </div>
        <div className='updatePublisher'>
          <h3>New Publisher</h3>
          <Box
            className="publisherForm"
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              label="Name"
              name="name"
              defaultValue={""}
              value={updatePublisher.name}
              size="small"
              onChange={handleUpdatePublisherInputChange}
            />
            <TextField
              required
              label="Establishment Year"
              name="establishmentYear"
              defaultValue={""}
              value={updatePublisher.establishmentYear}
              size="small"
              onChange={handleUpdatePublisherInputChange}
            />
            <TextField
              required
              label="Address"
              name="address"
              defaultValue={""}
              value={updatePublisher.address}
              size="small"
              onChange={handleUpdatePublisherInputChange}
            />
          </Box>
          <Button color="secondary" variant="contained" onClick={handleUpdatePublisher}>Update</Button>
        </div>
      </div>
      <h1>Publishers</h1>
      <PublisherTable
        publishers={publishers}
        newPublisher={newPublisher}
        handleUpdatePublisherBtn={handleUpdatePublisherBtn}
        handleDeletePublisher={handleDeletePublisher}
      />
    </div>
  )
}

export default Publishers
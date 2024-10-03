import { useEffect, useState, useContext } from 'react'
import { UpdatePageContext } from '../../context/UpdatePageProvider'
import axios from "axios"
import PublisherDialogContent from './PublisherDialogContent'
import AddModal from '../Utils/AddUpdateModals/AddModal'
import UpdateModal from '../Utils/AddUpdateModals/UpdateModal'
import AppTable from '../Utils/AppTable'

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

  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleUpdateModalOpen = () => {
    setUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
  };

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
    handleUpdateModalOpen()
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
      <AddModal
        dialogContent={
          <PublisherDialogContent 
            publisherObject={newPublisher}
            inputChangeFunction={handleNewPublisherInputChange}
          />
        }
        prop="Publisher"
        addFunction={handleAddPublisher} 
      />
      <UpdateModal
        dialogContent={
          <PublisherDialogContent 
            publisherObject={updatePublisher}
            inputChangeFunction={handleUpdatePublisherInputChange}
          />
        }
        prop="Publisher"
        updateFunction={handleUpdatePublisher}
        updateModalOpen={updateModalOpen}
        handleModalClose={handleUpdateModalClose}
      />
      <h1 style={{ color: 'var(--text-color)'}}>Publishers</h1>
      <AppTable
        keyItem={newPublisher}
        list={publishers}
        updateFunc={handleUpdatePublisherBtn}
        deleteFunc={handleDeletePublisher}
      />
    </div>
  )
}

export default Publishers
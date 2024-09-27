import { useEffect, useState, useContext } from 'react'
import { UpdatePageContext } from '../../context/UpdatePageProvider'
import axios from "axios"

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
    axios.get("http://127.0.0.1:8080/api/v1/publishers")
    .then((res) => {
      setPublishers(res.data)
      setUpdatePage((prev) => !prev)
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
    axios.post("http://127.0.0.1:8080/api/v1/publishers", newPublisher)
    .then(() => {
      setUpdatePage((prev) => !prev)
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
    axios.delete("http://127.0.0.1:8080/api/v1/publishers/" + e.target.id)
    .then(() => {
      setUpdatePage((prev) => !prev)
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
    axios.put("http://127.0.0.1:8080/api/v1/publishers/" + updatePublisher.id, updatePublisher)
    .then(() => {
      setUpdatePage((prev) => !prev)
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
          <input
            type="text"
            placeholder='Name'
            name='name'
            value={newPublisher.name}
            autoComplete='off'
            onChange={handleNewPublisherInputChange}
          />
          <br />
          <input
            type="text"
            placeholder='Establishment Year'
            name='establishmentYear'
            value={newPublisher.establishmentYear}
            autoComplete='off'
            onChange={handleNewPublisherInputChange}
          />
          <br />
          <input
            type="text"
            placeholder='Address'
            name='address'
            value={newPublisher.address}
            autoComplete='off'
            onChange={handleNewPublisherInputChange}
          />
          <br />
          <button onClick={handleAddPublisher}>Gönder</button>
        </div>
        <div className='updatePublisher'>
          <h3>New Publisher</h3>
          <input
            type="text"
            placeholder='Name'
            name='name'
            value={updatePublisher.name}
            autoComplete='off'
            onChange={handleUpdatePublisherInputChange}
          />
          <br />
          <input
            type="text"
            placeholder='Establishment Year'
            name='establishmentYear'
            value={updatePublisher.establishmentYear}
            autoComplete='off'
            onChange={handleUpdatePublisherInputChange}
          />
          <br />
          <input
            type="text"
            placeholder='Address'
            name='address'
            value={updatePublisher.address}
            autoComplete='off'
            onChange={handleUpdatePublisherInputChange}
          />
          <br />
          <button onClick={handleUpdatePublisher}>Gönder</button>
        </div>
      </div>
      <h1>Publishers</h1>
      {publishers.map((publisher, index) => (
        <div key={index}>
          <p>
            {index + 1} - {publisher.name} - {publisher.establishmentYear} - {publisher.address} -
            <span id={publisher.id} onClick={handleDeletePublisher}>X</span> - 
            <span onClick={() => handleUpdatePublisherBtn(publisher)}>U</span>
          </p>
        </div>
      ))}
    </div>
  )
}

export default Publishers
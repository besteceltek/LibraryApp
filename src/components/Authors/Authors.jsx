import { useEffect, useState } from 'react'
import axios from "axios"

function Authors({ setLoading }) {
  const [authors, setAuthors] = useState([])
  const [update, setUpdate] = useState(false)
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

  useEffect(() => {
      axios.get("http://127.0.0.1:8080/api/v1/authors")
      .then(res => {
        setAuthors(res.data)
        setLoading(false)
        setUpdate(true)
      })
    }, [update])
  
    const handleAddAuthor = () => {
      axios.post("http://127.0.0.1:8080/api/v1/authors", newAuthor)
      .then(() => {
        setUpdate(false)
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
  
    const handleDeleteAuthor = (e) => {
      axios.delete("http://127.0.0.1:8080/api/v1/authors/" + e.target.id)
      .then(() => {
        setUpdate(false)
      })
    }
  
    const handleUpdateAuthor = () => {
      axios.put("http://127.0.0.1:8080/api/v1/authors/" + updateAuthor.id, updateAuthor)
      .then(() => {
        setUpdate(false)
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

  return (
    <>
    <div className='authorInputs'>
      <div>
        <h3>New Author</h3>
        <input
          type="text"
          placeholder='Name'
          onChange={handleNewAuthorInputChange}
          name='name'
          value={newAuthor.name}
          autoComplete='off'
        />
        <br />
        <input
          type="text"
          placeholder='Country'
          onChange={handleNewAuthorInputChange}
          name='country'
          value={newAuthor.country}
          autoComplete='off'
        />
        <br />
        <input
          type="text"
          placeholder='Birth Date'
          onChange={handleNewAuthorInputChange}
          name='birthDate'
          value={newAuthor.birthDate}
          autoComplete='off'
        />
        <br />
        <button onClick={handleAddAuthor}>Gönder</button>
      </div>
      <div>
        <h3>Update Author</h3>
        <input
          type="text"
          placeholder='Name'
          onChange={handleUpdateAuthorInputChange}
          name='name'
          value={updateAuthor.name}
          autoComplete='off'
        />
        <br />
        <input
          type="text"
          placeholder='Country'
          onChange={handleUpdateAuthorInputChange}
          name='country'
          value={updateAuthor.country}
          autoComplete='off'
        />
        <br />
        <input
          type="text"
          placeholder='Birth Date'
          onChange={handleUpdateAuthorInputChange}
          name='birthDate'
          value={updateAuthor.birthDate}
          autoComplete='off'
        />
        <br />
        <button onClick={handleUpdateAuthor}>Gönder</button>
      </div>
    </div>
    <br />
    <h1>Authors</h1>
      {authors.map((author, index) => (
        <div key={index}>
          <p>
            {index + 1} - {author.name} {author.country} - 
            <span id={author.id} onClick={handleDeleteAuthor}>X</span> - 
            <span onClick={() => handleUpdateAuthorBtn(author)}>U</span>
          </p>
        </div>
      ))}
    </>
  )
}

export default Authors
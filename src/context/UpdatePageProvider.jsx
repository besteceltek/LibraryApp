import { useState, createContext } from "react";

const UpdatePageContext = createContext()

function UpdatePageProvider({ children }) {
  const [updatePage, setUpdatePage] = useState(false)

  return (
    <UpdatePageContext.Provider value={{ updatePage, setUpdatePage }}>
      { children }
    </UpdatePageContext.Provider>
  )
}

export default UpdatePageProvider
export { UpdatePageContext }
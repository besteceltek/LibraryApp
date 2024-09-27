import { useState, createContext } from "react"

const LoadingContext = createContext()

function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(true)
  
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      { children }
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
export { LoadingContext }
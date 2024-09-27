import { useState } from 'react'
import './App.css'
import Authors from './components/Authors/Authors'
import ActivePageProvider from './context/ActivePageProvider'
import Navbar from './components/Navbar/Navbar'
import Main from './components/Main/Main'

function App() {
  const [activePage, setActivePage] = useState("Active Page")

  return (
    <ActivePageProvider>
      <Navbar />
      <Main />
    </ActivePageProvider>
  )
}

export default App

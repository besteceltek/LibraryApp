import './App.css'
import ActivePageProvider from './context/ActivePageProvider'
import Navbar from './components/Navbar/Navbar'
import Main from './components/Main/Main'
import UpdatePageProvider from './context/UpdatePageProvider'

function App() {
  return (
    <ActivePageProvider>
      <UpdatePageProvider>
        <Navbar />
        <Main />
      </UpdatePageProvider>
    </ActivePageProvider>
  )
}

export default App

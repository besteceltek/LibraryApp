import './App.css'
import ActivePageProvider from './context/ActivePageProvider'
import UpdatePageProvider from './context/UpdatePageProvider'
import LoadingProvider from './context/LoadingProvider'
import Navbar from './components/Navbar/Navbar'
import Main from './components/Main/Main'

function App() {
  return (
    <ActivePageProvider>
      <UpdatePageProvider>
        <LoadingProvider>
          <Navbar />
          <Main />
        </LoadingProvider>
      </UpdatePageProvider>
    </ActivePageProvider>
  )
}

export default App

import './App.css'
import UpdatePageProvider from './context/UpdatePageProvider'
import LoadingProvider from './context/LoadingProvider'
import Navbar from './components/Navbar/Navbar'
import MainArea from './components/MainArea/MainArea'

function App() {
  return (
    <UpdatePageProvider>
      <LoadingProvider>
        <header>
          <Navbar />
        </header>
        <div className='main-area'>
          <MainArea />
        </div>
      </LoadingProvider>
    </UpdatePageProvider>
  )
}

export default App

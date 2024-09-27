import { useContext } from "react"
import { ActivePageContext } from '../../context/ActivePageProvider'

function Navbar() {
  const { setActivePage } = useContext(ActivePageContext)
  return (
    <div className="navbar">
      <div className="links">
        <span onClick={() => setActivePage("Dashboard")}>Dashboard</span>
        <span onClick={() => setActivePage("Books")}>Books</span>
        <span onClick={() => setActivePage("Authors")}>Authors</span>
        <span onClick={() => setActivePage("Categories")}>Categories</span>
        <span onClick={() => setActivePage("Publishers")}>Publishers</span>
        <span onClick={() => setActivePage("Rentals")}>Rentals</span>
      </div>
    </div>
  )
}

export default Navbar
import { useContext } from "react"
import { ActivePageContext } from "../../context/ActivePageProvider"
import Authors from "../Authors/Authors"

function Main() {
    const { activePage } = useContext(ActivePageContext)
    if (activePage === 'Dashboard') {
        return <Dashboard />
    } else if (activePage === 'Books') {
        return <Books />
    } else if (activePage === 'Authors') {
        return <Authors />
    }
}

export default Main
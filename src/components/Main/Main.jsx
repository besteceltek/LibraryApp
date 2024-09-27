import { useContext } from "react"
import { ActivePageContext } from "../../context/ActivePageProvider"
import Authors from "../Authors/Authors"
import Publishers from "../Publishers/Publishers"

function Main() {
    const { activePage } = useContext(ActivePageContext)
    
    if (activePage === 'Dashboard') {
        return <Dashboard />
    } else if (activePage === 'Books') {
        return <Books />
    } else if (activePage === 'Authors') {
        return <Authors />
    } else if (activePage === 'Publishers') {
        return <Publishers />
    }
}

export default Main
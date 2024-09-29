import { useContext } from "react"
import { ActivePageContext } from "../../context/ActivePageProvider"
import Authors from "../Authors/Authors"
import Publishers from "../Publishers/Publishers"
import Categories from "../Categories/Categories"
import Books from "../Books/Books"

function Main() {
    const { activePage } = useContext(ActivePageContext)
    
    if (activePage === 'Authors') {
        return <Authors />
    } else if (activePage === 'Publishers') {
        return <Publishers />
    } else if (activePage === 'Categories') {
        return <Categories />
    } else if (activePage === 'Books') {
        return <Books />
    }
}

export default Main
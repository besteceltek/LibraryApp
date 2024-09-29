import { useContext } from "react"
import { ActivePageContext } from '../../context/ActivePageProvider'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

function Navbar() {
  const { setActivePage } = useContext(ActivePageContext)
  const pages = ['Dashboard', 'Books', 'Authors', 'Categories', 'Publishers', 'Borrows'];

  return (
    <div className="navbar">
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Box sx={{ display: { md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ color: 'white', display: 'block' }}
                  onClick={() => setActivePage(page)}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Navbar
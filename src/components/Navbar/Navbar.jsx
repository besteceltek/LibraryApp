import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { Link } from "react-router-dom";
import './Navbar.css'

function Navbar() {

  const pages = ['Books', 'Authors', 'Categories', 'Publishers', 'Borrows', 'Dashboard'];

  return (
    <nav className="navbar">
      <div className="appbar">
        <div className="container">
          <div className="toolbar">
            <ul>
              <li key="Home">
                <Link to="/">Home</Link>
              </li>
              {pages.map((page) => (
                <li key={page}>
                  <Link to={`/${page.toLowerCase()}`}>{page}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
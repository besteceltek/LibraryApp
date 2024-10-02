import React from 'react'
import { Routes, Route } from "react-router-dom";

import Books from "../Books/Books";
import Authors from "../Authors/Authors";
import Categories from "../Categories/Categories";
import Publishers from "../Publishers/Publishers";
import Borrows from "../Borrows/Borrows";

function MainArea() {
  return (
    <Routes>
      
      <Route path="/books" element={<Books />}></Route>
      <Route path="/authors" element={<Authors />}></Route>
      <Route path="/categories" element={<Categories />}></Route>
      <Route path="/publishers" element={<Publishers />}></Route>
      <Route path="/borrows" element={<Borrows />}></Route>
    </Routes>
  )
}

export default MainArea

//<Route path="/" element={<Home />}></Route>
//<Route path="/dashboard" element={<Dashboard />}></Route>
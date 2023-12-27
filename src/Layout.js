import React from 'react'
import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import {Home} from './screens/Home'
import {Create} from './screens/Create'
import {ViewOne} from './screens/ViewOne'

const Layout = () => {
  return (
    <div className="layout">
        <BrowserRouter>
            <NavBar/>  
            <Routes element>
                <Route exact path="/" element={<Home/>} />
                <Route path="/:id" element={<ViewOne/>} />
                <Route exact path="/create" element={<Create/>} />
            </Routes>
        </BrowserRouter>

    </div>
  )
}

export default Layout
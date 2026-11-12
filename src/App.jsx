import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './User'
import Posts from './Posts'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<User />} />
        <Route path='/user/:id' element={<Posts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
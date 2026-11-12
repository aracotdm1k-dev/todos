import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import User from './User'
import Posts from './Posts'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<User />} />
        <Route path='/user/:id' element={<Posts />} />
      </Routes>
    </HashRouter>
  )
}

export default App
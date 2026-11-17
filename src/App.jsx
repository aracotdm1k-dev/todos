import React from 'react'
import { Provider } from './ThemeContext'
import Header from './Header'

function App() {
  return (
    <Provider>
      <Header />
    </Provider>
  )
}

export default App

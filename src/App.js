import { useState } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('')
  return currentPage === 'signup' ? (
    <Register onPageClick={() => setCurrentPage('login')} />
  ) : (
    <Login onPageClick={() => setCurrentPage('signup')} />
  )
}

export default App

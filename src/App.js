import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function App() {
  return window.location.pathname === '/signup' ? <Register /> : <Login />
}

export default App

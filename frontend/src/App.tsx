import {Routes, Route} from "react-router"
import './App.css'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App

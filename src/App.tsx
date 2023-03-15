import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/layout'
import Index from './pages/Index'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>   
    </> 
  )
}

export default App

import './App.scss'
import { Route, Routes, useLocation } from 'react-router-dom'
import { NavBar, Networks, Background } from './components/layout'
import Index from './pages/Index'
import About from './pages/About'

import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();

  return (
    <>
      <Background />
      <NavBar />
      <Networks />
      <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>   
      </AnimatePresence>
    </> 
  )
}

export default App;
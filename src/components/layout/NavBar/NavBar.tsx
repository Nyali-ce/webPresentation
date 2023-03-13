import './NavBar.scss'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="navBar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
    </nav>
  )
}

export default NavBar

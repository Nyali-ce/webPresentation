import './NavBar.scss'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <>
      <div className='logo-container'>
        <Link className='logo-text' to='/'>Nyali.ce</Link>
      </div>
      <nav className='navBar'>
        <Link className='navBar-item' to='/'>Home</Link>
        <Link className='navBar-item' to='/about'>About</Link>
      </nav>
    </>
  )
}

export default NavBar

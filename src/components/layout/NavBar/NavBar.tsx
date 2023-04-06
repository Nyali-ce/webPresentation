import './NavBar.scss'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <>
      <div className='logo-container'>
        <h1 className='logo-text'>Nyali.ce</h1>
      </div>
      <nav className='navBar'>
        <Link className='navBar-item' to='/'>Home</Link>
        <Link className='navBar-item' to='/about'>About</Link>
      </nav>
    </>
  )
}

export default NavBar

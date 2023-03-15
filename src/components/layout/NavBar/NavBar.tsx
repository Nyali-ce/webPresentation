import './NavBar.scss'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <>
      <div className='logo'>
        <img src='img/logo.png' alt='Nyali Logo' />
        <h1>Nyali</h1>
      </div>
      <nav className='navBar'>
        <Link className='navBar-item' to='/'>Home</Link>
        <Link className='navBar-item' to='/about'>About</Link>
      </nav>
    </>
  )
}

export default NavBar

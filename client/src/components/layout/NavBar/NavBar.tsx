import "./NavBar.scss";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <div className="logo-container">
        <Link className="logo-text" to="/">
          Nyali.ce
        </Link>
      </div>
      <nav className="navBar">
        <Link
          className={`navBar-item navBar-home ${
            location.pathname === "/" ? " active" : ""
          }`}
          to="/"
        >
          Home
        </Link> 
        <Link
          className={`navBar-item ${
            location.pathname === "/works" ? " active" : ""
          }`}
          to="/works"
        >
          Works
        </Link>
        <Link
          className={`navBar-item ${
            location.pathname === "/about" ? " active" : ""
          }`}
          to="/about"
        >
          About
        </Link>
      </nav>
    </>
  );
}

export default NavBar;

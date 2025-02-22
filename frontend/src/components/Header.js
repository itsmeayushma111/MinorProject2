import {Link} from 'react-router-dom'
function Header(){

    return(
        // Navbar using plain Bootstrap classes
      <div className="container pb-5">
        <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#5DADE2', zIndex: 1000 }}>
          <div className="container ">
            <Link className="navbar-brand text-white" to="/">ThopaThopa</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                <Link className="nav-link text-white" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" aria-current="page" to="/">About Us</Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link text-white" aria-current="page" to="/">Services</Link>
                </li> */}
                <li className="nav-item">
                <Link className="nav-link text-white" aria-current="page" to="/categories">Categories</Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    My Account
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/customer/register">Register</Link></li>
                    <li><Link className="dropdown-item" to="/customer/login">Login</Link></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><Link className="dropdown-item" to="/customer/dashboard">Dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/customer/logout">Logout</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                <Link className="nav-link text-white" aria-current="page" to="/checkout">My Cart (1)</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
}

export default Header;
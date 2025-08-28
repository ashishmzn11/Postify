import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary shadow-sm py-3">
        <Container>
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <Logo width="70px" />
          </Link>

          {/* Toggler for mobile */}
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

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              {navItems.map((item) =>
                item.active ? (
                  <li className="nav-item mx-2" key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="btn btn-outline-light px-3"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              
              {/* Logout Button */}
              {authStatus && (
                <li className="nav-item ms-2">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  )
}

export default Header

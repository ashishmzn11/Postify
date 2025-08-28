import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="bg-light border-top py-5">
      <div className="container">
        <div className="row">

          {/* Logo and copyright */}
          <div className="col-12 col-md-6 col-lg-5 mb-4">
            <div className="d-flex flex-column h-100 justify-content-between">
              <div className="mb-3">
                <Logo width="100px" />
              </div>
              <p className="text-muted small mb-0">
                &copy; Copyright 2023. All Rights Reserved by DevUI.
              </p>
            </div>
          </div>

          {/* Company */}
          <div className="col-6 col-md-6 col-lg-2 mb-4">
            <h6 className="text-uppercase text-muted fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link className="text-dark text-decoration-none" to="/">Features</Link>
              </li>
              <li className="mb-2">
                <Link className="text-dark text-decoration-none" to="/">Pricing</Link>
              </li>
              <li className="mb-2">
                <Link className="text-dark text-decoration-none" to="/">Affiliate Program</Link>
              </li>
              <li>
                <Link className="text-dark text-decoration-none" to="/">Press Kit</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-6 col-md-6 col-lg-2 mb-4">
            <h6 className="text-uppercase text-muted fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link className="text-dark text-decoration-none" to="/">Account</Link>
              </li>
              <li className="mb-2">
                <Link className="text-dark text-decoration-none" to="/">Help</Link>
              </li>
              <li className="mb-2">
                <Link className="text-dark text-decoration-none" to="/">Contact Us</Link>
              </li>
              <li>
                <Link className="text-dark text-decoration-none" to="/">Customer Support</Link>
              </li>
            </ul>
          </div>

          {/* Legals */}
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <h6 className="text-uppercase text-muted fw-bold mb-3">Legals</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link className="text-dark text-decoration-none" to="/">Terms &amp; Conditions</Link>
              </li>
              <li className="mb-2">
                <Link className="text-dark text-decoration-none" to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link className="text-dark text-decoration-none" to="/">Licensing</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer

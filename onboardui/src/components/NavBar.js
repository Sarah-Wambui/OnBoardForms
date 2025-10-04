import React from 'react'
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
        <Link to="/"  aria-current="page" className="navbar-brand">
        <img src="/obf.png" alt="logo" className="logo" />
        </Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <Link to="/"  aria-current="page" className="nav-link active">Home</Link>
            </li>
            <li class="nav-item">
                <Link to="/forms" className="nav-link">Forms</Link>
            </li>
            </ul>
        </div>
        </div>
    </nav>
  )
}

export default NavBar
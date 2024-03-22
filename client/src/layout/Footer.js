import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="py-3 my-4 bg-light">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><Link to={'/'} className="nav-link px-2 text-muted text-white">Home</Link></li>
            <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted text-white">Features</Link></li>
            <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted text-white">Pricing</Link></li>
            <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted text-white">FAQs</Link></li>
            <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted text-white">About</Link></li>
        </ul>
        <p className="text-center text-muted text-white">© 2024 Jobify, Inc</p>
    </footer>
  )
}
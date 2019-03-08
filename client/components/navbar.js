import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => (
  <div>
    <h1>Jump or Dump - Skydiving Insurance Analyzer</h1>
    <nav>
      <div>
        <Link to="/">Home</Link>
      </div>
    </nav>
    <hr />
  </div>
)

export default Navbar

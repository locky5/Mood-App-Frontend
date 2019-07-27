import React from 'react'
import {Link} from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    return (
      
    <div className="navbar">
      <Link to="/posts">Home</Link>
      <Link to="#">Profile</Link>
      <Link to="/login">Log In</Link>
      <Link to="/signup">Signup</Link>
    </div>
      
    )
  }
}

export default NavBar

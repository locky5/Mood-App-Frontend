import React from 'react'
import LoginForm from '../components/LoginForm'
import {Link} from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    return (
      
    <div class="navbar">
      <Link to="/posts">Home</Link>
      <Link to="#">Profile</Link>
      <Link to="/login">Log In</Link>
      <Link to="/signup">Signup</Link>
    </div>
      
    )
  }
}

export default NavBar

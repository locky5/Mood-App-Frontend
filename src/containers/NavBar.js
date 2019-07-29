import React from 'react'
import {Link} from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    console.log(this.props.currentUser)
    return (
      
    <div className="navbar">
      
      <Link to="/posts">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Log In</Link>
      <Link to="/signup">Signup</Link>
      <button onClick={this.props.logout}>{this.props.currentUser ? `Logout ${this.props.currentUser.name}` : null}</button>onClick={this.props.logout}
    </div>
    )
  }
}

export default NavBar

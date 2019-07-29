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
      <div>
        {this.props.currentUser ?
          <button onClick={this.props.logout}>
            Logout {this.props.currentUser.name}
          </button>
         : null}
      </div>
    </div>
    )
  }
}

export default NavBar

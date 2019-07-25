import React from 'react'
import LoginForm from '../components/LoginForm'

class NavBar extends React.Component {
  render() {
    return (
      
    <div class="navbar">
      <a href="#home">Home</a>
      <a href="#profile">Profile</a>
      <LoginForm handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit} />
    </div>
      
    )
  }
}

export default NavBar

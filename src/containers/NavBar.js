import React from 'react'
import LoginForm from '../components/LoginForm'

class NavBar extends React.Component {
  render() {
    return (
      <div className="NavBar">
        <LoginForm handleChange={this.props.handleChange}/>
      </div>
    )
  }
}

export default NavBar

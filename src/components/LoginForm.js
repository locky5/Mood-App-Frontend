import React from 'react'

class LoginForm extends React.Component {

  render() {
    return (
      <div>
        <form id="login-form" onSubmit={this.props.handleSubmit}>
          <input name="username" onChange={this.props.handleChange}/>
          <input name="password" onChange={this.props.handleChange}/>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
}

export default LoginForm

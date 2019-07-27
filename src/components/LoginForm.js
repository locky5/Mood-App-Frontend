import React from 'react'

class LoginForm extends React.Component {

  render() {
    return (
      <div id="signup">
        <form onSubmit={this.props.handleSubmit}>
          Username: <input name="username" onChange={this.props.handleChange} />
          Password: <input name="password" onChange={this.props.handleChange} />
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
}

export default LoginForm

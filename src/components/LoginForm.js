import React from 'react'

class LoginForm extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.state.password === "123") {
      alert('success!')
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="username" onChange={this.props.handleChange}/>
          <input name="password" onChange={this.props.handleChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default LoginForm

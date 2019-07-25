import React from 'react'

class LoginForm extends React.Component {

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

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
          <input name="username" onChange={this.handleChange}/>
          <input name="password" onChange={this.handleChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default LoginForm

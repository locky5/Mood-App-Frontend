import React from 'react'

class LoginForm extends React.Component {

  state = {
    username: "",
    password: ""
  }


  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    fetch('http://localhost:3000/api/v1/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: this.state.username,
        password: this.state.password
      })
    })
      .then(resp => resp.json())
      .then(response => {
        if (response.errors) {
          alert(response.errors)
        } else {
          this.props.setUser(response)
        }
      }
      )
  }

  render() {
    return (
      <div>
        <div id="login">
          <form onSubmit={this.handleSubmit}>
            Username: <input name="username" onChange={this.handleChange} />
            Password: <input name="password" type="password" onChange={this.handleChange} />
            <input type="submit" value="Submit"></input>
          </form>
        </div>
        <img id="gif" src="https://i.imgur.com/7cCWmGI.gif"/>
      </div>
    )
  }
}

export default LoginForm

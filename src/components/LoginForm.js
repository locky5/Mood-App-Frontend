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
            Password: <input name="password" onChange={this.handleChange} />
            <input type="submit" value="Submit"></input>
          </form>
        </div>
        {/* <img id="gif" src="https://i.imgur.com/7cCWmGI.gif"/> */}
        <div>
          <svg width="100%"
              height="100%"
              style={{background: "#082330"}}>
            <symbol id="s-text">
              <text text-anchor="middle"
                    x="50%"
                    y="35%"
                    className="text--line"
              >
                Moody
              </text>
            </symbol>
            <g className="g-ants">
              <use xlinkHref="#s-text"
                className="text-copy"></use>
              <use xlinkHref="#s-text"
                className="text-copy"></use>
              <use xlinkHref="#s-text"
                className="text-copy"></use>
              <use xlinkHref="#s-text"
                className="text-copy"></use>
              <use xlinkHref="#s-text"
                className="text-copy"></use>
            </g>
          </svg>
        </div>
      </div>
    )
  }
}

export default LoginForm

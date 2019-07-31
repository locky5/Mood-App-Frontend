import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

class SignupForm extends React.Component {

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

    fetch('http://localhost:3000/api/v1/signup', {
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
          <div id="login">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
                <form className='form-signin' onSubmit={this.handleSubmit}>
                  <p className="h5 text-center mb-4">Sign Up</p>
                  <div className="grey-text">
                    <MDBInput
                      icon="envelope"
                      group
                      type="username"
                      validate
                      error="wrong"
                      success="right"
                      name="username"
                      onChange={this.handleChange}
                    />
                    <MDBInput
                      icon="lock"
                      group
                      type="password"
                      validate
                      name="password"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="text-center">
                    <MDBBtn
                      type="submit"
                      value="Submit"
                      style={{color: "white"}}
                    >Go!
                    </MDBBtn>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          </div>
        </div>
      </div>
    )
  }
}

export default SignupForm

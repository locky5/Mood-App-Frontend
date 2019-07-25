import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './containers/NavBar'
import MainContainer from './containers/MainContainer'
import Chat from './components/Chat'
import SockJS from 'sockjs-client'
import Graph from './components/Graph'

class App extends React.Component {

  state = {
    username: "",
    password: "",
    loggedIn: false,
    userId: null
  }


  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.state.password === "123") {
      alert('success!')
    }

    fetch('http://localhost:3000/api/v1/users', {
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
    .then(user => {
      this.setState({
        loggedIn: true,
        userId: user.id
      })
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <NavBar handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        <MainContainer username={this.state.username}/>
        {/*<Chat {...this.state} />*/}
        <Graph />
      </div>
    )
  }
}

export default App;

// constructor(props) {
//   super(props)
//
//   const sock = new SockJS('https://chat-server.azurewebsites.net/chat')
//
//   sock.onopen = () => {
//     console.log('connection open')
//   }
//
//   sock.onmessage = (e) => {
//     console.log('message received: ', e.data)
//   }
//
//   sock.onclose = () => {
//     console.log('closed')
//   }
//
//   this.state = {
//     actions: sock,
//     messages: []
//   }
// }

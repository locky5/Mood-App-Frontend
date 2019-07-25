import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './containers/NavBar'
import MainContainer from './containers/MainContainer'
import Chat from './components/Chat'
import SockJS from 'sockjs-client'

class App extends React.Component {

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

  render() {
    return (
      <div className="App">
        <NavBar />
        <MainContainer />
      </div>
    )
  }
}

export default App;

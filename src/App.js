import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './containers/NavBar'
import MainContainer from './containers/MainContainer'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Chat from './components/Chat'
import SockJS from 'sockjs-client'
import Graph from './containers/Graph'
import { Route, Switch, Link } from "react-router-dom"

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
  //     messages: [],
  //     currentUser: null,
  //     posts: null,
  //     moods: null
  //   }
  // }

  state = {
    currentUser: null,
    posts: null,
    moods: null
  }



  setUser = (user) => {
    this.setState({
      currentUser: user
    }, () => {this.props.history.push("/posts")})
  }

  componentDidMount() {
    this.renderData()
  }

  renderData = () => {
    fetch('http://localhost:3000/api/v1/posts')
      .then(res => res.json())
      .then(data =>
        this.setState({
          posts: data
        })
      )
    fetch('http://localhost:3000/api/v1/moods')
      .then(res => res.json())
      .then(data =>
        this.setState({
          moods: data
        })
      )
  }


  render() {
    console.log(this.state.posts)
    return (
      <div className="App">
          <NavBar currentUser={this.state.currentUser} />
          <Switch>
            <Route path="/login" render={() => <LoginForm setUser={this.setUser} />} />
            <Route path="/signup" render={() => <SignupForm setUser={this.setUser} />} />
            <Route path="/posts" render={() => <MainContainer username={this.state.username} />} />
            {this.state.posts && this.state.moods ? <Route path="/profile" render={() =>
                <Graph
                  posts={this.state.posts} moods={this.state.moods} currentUser={this.state.currentUser}
                />
            } /> : null }
          </Switch>
        // <Chat {...this.state} />
      </div>
    )
  }
}

export default App

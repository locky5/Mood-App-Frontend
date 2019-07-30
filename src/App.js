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
import PostPage from './containers/PostPage'

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
    moods: null,
    id: null,
    comments: [],
    form: 1
  }

  setStuff = (thisId, thisComments) => {
    this.setState({
      id: thisId,
      comments: thisComments
    })
  }

  setUser = (user) => {
    this.setState({
      currentUser: user
    }, () => {
      localStorage.user_id = user.id
      this.props.history.push("/posts")
    })
  }

  componentDidMount() {
    const user_id = localStorage.user_id

    if (user_id) {
      fetch('http://localhost:3000/api/v1/auto_login', {
        headers: {
          "Authorization": user_id
        }
      })
      .then(res => res.json())
      .then(response => {
        if (response.errors) {
          alert(response.errors)
        } else {
          this.setState({
            currentUser: response
          })
        }
      })
    }

    this.renderData()
  }

  logout = () => {
    this.setState({
      currentUser: null
    }, () => {
      localStorage.removeItem("user_id")
      this.props.history.push("/login")
    })
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

  handleSubmit = (event) => {
    event.preventDefault()

    if (this.state.description) {
      fetch('http://localhost:3000/api/v1/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          description: this.state.description,
          likes: 0,
          user_id: this.state.currentUser.id,
          mood_id: this.state.form
        })
      })
        .then(res => res.json())
        .then(post =>
          this.setState({
            posts: [...this.state.posts, post]
          })
        )
    } else if (!this.state.description) {
      alert('You Need A Description!')
    }
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
          <NavBar currentUser={this.state.currentUser} logout={this.logout} />
          <Switch>
            <Route path="/login" render={() => <LoginForm setUser={this.setUser} />} />
            <Route path="/signup" render={() => <SignupForm setUser={this.setUser} />} />
          {this.state.id && this.state.comments ? <Route path="/postpage" render={() => <PostPage id={this.state.id} comments={this.state.comments} currentUser={this.state.currentUser} />}  /> : null}
          <Route path="/posts" render={() =>
              <MainContainer
                username={this.state.username}
                setStuff={this.setStuff}
                currentUser={this.state.currentUser}
                posts={this.state.posts}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                handleFormChange={this.handleFormChange}
              />}
          />
        {this.state.posts && this.state.moods ? <Route path="/profile" render={() =>
                <Graph
                  posts={this.state.posts}
                  moods={this.state.moods}
                  currentUser={this.state.currentUser}
                />
            } /> : null }
          </Switch>
        {/* <Chat {...this.state} /> */}
      </div>
    )
  }
}

export default App

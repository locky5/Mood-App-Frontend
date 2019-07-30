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
    clickedPost: null,
    moodData: null
  }

  setStuff = (thisId, thisComments, thisData, clickedPost) => {
    this.setState({
      id: thisId,
      comments: thisComments,
      moodData: thisData,
      clickedPost: clickedPost
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

  render() {
    const {id, username, comments, currentUser, clickedPost, posts, moods, moodData} = this.state
    return (
      <div className="App">
          <NavBar currentUser={currentUser} logout={this.logout} />
          <Switch>
            <Route path="/login" render={() => <LoginForm setUser={this.setUser} />} />
            <Route path="/signup" render={() => <SignupForm setUser={this.setUser} />} />
          {id && comments ? <Route path="/postpage" render={() => <PostPage id={id} comments={comments} currentUser={currentUser} clickedPost={clickedPost} moodData={this.state.moodData} />}  /> : null}
          <Route path="/posts" render={() => <MainContainer username={username} setStuff={this.setStuff} currentUser={currentUser}/>} />
            {posts && moods ? <Route path="/profile" render={() =>
                <Graph
                  posts={posts} moods={moods} currentUser={currentUser}
                />
            } /> : null }
          </Switch>
        {/* <Chat {...this.state} /> */}
      </div>
    )
  }
}

export default App

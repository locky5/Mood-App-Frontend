import React from 'react'
import ProfileContainer from './ProfileContainer'
import PostContainer from './PostContainer'
import LoadingPage from '../components/LoadingPage'

class MainContainer extends React.Component {

  state = {
    posts: null,
    form: 1
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
  }

  clickPost = () => {
    //Routes to post page/comment feed
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

  handleSubmit = (event) => {
    event.preventDefault()

    fetch('http://localhost:3000/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        description: this.state.description,
        user_id: 1,
        mood_id: this.state.form
      })
    })
  }

  render() {
    return (
      <div className="main">
        <ProfileContainer
          handleChange={this.handleChange} handleFormChange={this.handleFormChange} handleSubmit={this.handleSubmit}
        />
        {
          this.state.posts ?
          <PostContainer
            posts={this.state.posts} clickPost={this.clickPost}
          />
          :
          <LoadingPage/>
        }
      </div>
    )
  }
}

export default MainContainer

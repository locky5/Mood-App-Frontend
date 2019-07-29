import React from 'react'
import ProfileContainer from './ProfileContainer'
import PostContainer from './PostContainer'
import LoadingPage from '../components/LoadingPage'

class MainContainer extends React.Component {

  state = {
    posts: null,
    form: 1,
    filteredPosts: null
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
    console.log(event.target.name)
    this.setState({
      [event.target.name]: event.target.value
    })
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
          user_id: this.props.currentUser.id,
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

  findPostsByMood = (event) => {
    let myFilteredPosts = this.state.posts.filter(post => post.mood.id === parseInt(event.target.value))
    console.log(myFilteredPosts)
    this.setState({
      filteredPosts: myFilteredPosts
    })
  }

  findText = (event) => {
    let myFilteredPosts = this.state.posts.filter(post => post.description.includes(event.target.value))
    this.setState({
      filteredPosts: myFilteredPosts
    })
  }

  orderByLikes = () => {
    let myFilteredPosts = this.state.posts.sort((a, b) =>
    (a.likes > b.likes) ? 1: -1)
    this.setState({
      filteredPosts: myFilteredPosts
    })
  }

  orderAlphabetically = () => {
    let myFilteredPosts = this.state.posts.sort((a, b) =>
    (a.description > b.description) ? 1: -1)
    this.setState({
      filteredPosts: myFilteredPosts
    })
  }

  render() {
    return (
      <div className="main">
          <ProfileContainer
            handleChange={this.handleChange} handleFormChange={this.handleFormChange} handleSubmit={this.handleSubmit}
            findPostsByMood={this.findPostsByMood}
            findText={this.findText}
            orderByLikes={this.orderByLikes}
            orderAlphabetically={this.orderAlphabetically}
          />
          {
            this.state.posts ?
            <PostContainer
              posts={this.state.posts}
              clickPost={this.clickPost}
              filteredPosts={this.state.filteredPosts}
              setStuff={this.props.setStuff}
            />
            :
            <LoadingPage/>
          }
      </div>
    )
  }
}

export default MainContainer

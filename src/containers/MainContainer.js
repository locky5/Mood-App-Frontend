import React from 'react'
import ProfileContainer from './ProfileContainer'
import PostContainer from './PostContainer'
import LoadingPage from '../components/LoadingPage'

class MainContainer extends React.Component {

  state = {
    filteredPosts: null
  }

  findPostsByMood = (event) => {
    let myFilteredPosts = this.props.posts.filter(post => post.mood.id === parseInt(event.target.value))
    console.log(myFilteredPosts)
    this.setState({
      filteredPosts: myFilteredPosts
    })
  }

  findText = (event) => {
    let myFilteredPosts = this.props.posts.filter(post => post.description.includes(event.target.value))
    this.setState({
      filteredPosts: myFilteredPosts
    })
  }

  orderByLikes = () => {
    let myFilteredPosts = this.props.posts.sort((a, b) =>
    (a.likes < b.likes) ? 1: -1)
    this.setState({
      filteredPosts: myFilteredPosts
    })
  }

  orderAlphabetically = () => {
    let myFilteredPosts = this.props.posts.sort((a, b) =>
    (a.description > b.description) ? 1: -1)
    this.setState({
      filteredPosts: myFilteredPosts
    })
  }

  render() {
    return (
      <div className="main">
          <ProfileContainer
            handleChange={this.props.handleChange} handleFormChange={this.props.handleFormChange} handleSubmit={this.props.handleSubmit}
            findPostsByMood={this.findPostsByMood}
            findText={this.findText}
            orderByLikes={this.orderByLikes}
            orderAlphabetically={this.orderAlphabetically}
            currentUser={this.props.currentUser}
          />
          {
            this.props.posts ?
            <PostContainer
              posts={this.props.posts}
              clickPost={this.clickPost}
              filteredPosts={this.state.filteredPosts}
              setStuff={this.props.setStuff}
              currentUser={this.props.currentUser}
            />
            :
            <LoadingPage/>
          }
      </div>
    )
  }
}

export default MainContainer

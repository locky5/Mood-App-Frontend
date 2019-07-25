import React from 'react'
import ProfileContainer from './ProfileContainer'
import PostContainer from './PostContainer'
import LoadingPage from '../components/LoadingPage'

class MainContainer extends React.Component {

  state = {
    posts: null
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

  render() {
    console.log(this.props.username)
    return (
      <div className="main">
        <ProfileContainer />
        {this.state.posts ? <PostContainer posts={this.state.posts} clickPost={this.clickPost} /> : <LoadingPage/>}
      </div>
    )
  }
}

export default MainContainer

import React from 'react'
import Post from '../components/Post'

class PostContainer extends React.Component {

  renderPosts = () => {
    return this.props.posts.map(post => <Post key={post.id} description={post.description} clickPost={this.props.clickPost} />)
  }

  render() {
    return (
      <div className="post-container">
        {this.renderPosts()}
      </div>
    )
  }
}

export default PostContainer

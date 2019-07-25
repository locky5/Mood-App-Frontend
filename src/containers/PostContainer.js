import React from 'react'
import Post from '../components/Post'

class PostContainer extends React.Component {

  renderPosts = () => {
    return this.props.posts.map(post => <Post description={post.description}/>)
  }

  render() {
    console.log(this.props)
    return (
      <div className="PostContainer">
        {this.renderPosts()}
      </div>
    )
  }
}

export default PostContainer

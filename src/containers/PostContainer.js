import React from 'react'
import Post from '../components/Post'

class PostContainer extends React.Component {

  renderPosts = () => {
    return this.props.posts.map(post =>
      <Post
        key={post.id}
        id={post.id}
        description={post.description}
        likes={post.likes}
        clickPost={this.props.clickPost} moodId={post.mood_id}
      />
    )
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

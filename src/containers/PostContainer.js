import React from 'react'
import Post from '../components/Post'

class PostContainer extends React.Component {

  state = {
    data: null
  }

  getComments = () => {
    fetch('http://localhost:3000/api/v1/comments')
      .then(res => res.json())
      .then(comments =>
        this.setState({
          data: comments
        })
      )
  }

  renderPosts = () => {
    return this.props.posts.map(post =>
      <Post
        key={post.id}
        id={post.id}
        description={post.description}
        likes={post.likes}
        clickPost={this.props.clickPost}
        moodId={post.mood_id}
        comments={this.state.data.filter(comment => comment.post_id === post.id)}
      />
    )
  }

  render() {

    return (
      <div className="post-container">
        {this.state.data ? null : this.getComments()}
        {this.state.data ? this.renderPosts() : null}
      </div>
    )
  }
}

export default PostContainer

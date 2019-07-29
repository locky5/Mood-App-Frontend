import React from 'react'
import Post from '../components/Post'

class PostContainer extends React.Component {

  state = {
    data: null
  }

  componentDidMount() {
    this.getComments()
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
    if (this.props.filteredPosts) {
      return this.props.filteredPosts.map(post =>
        <Post
          key={post.id}
          id={post.id}
          description={post.description}
          likes={post.likes}
          clickPost={this.props.clickPost}
          moodId={post.mood.id}
          comments={this.state.data.filter(comment => comment.post.id === parseInt(post.id))}
          setStuff={this.props.setStuff}
          currentUser={this.props.currentUser}
        />
      )
    }
    return this.props.posts.map(post =>
      <Post
        key={post.id}
        id={post.id}
        description={post.description}
        likes={post.likes}
        clickPost={this.props.clickPost}
        moodId={post.mood.id}
        comments={this.state.data.filter(comment => comment.post.id === post.id)}
        setStuff={this.props.setStuff}
        currentUser={this.props.currentUser}
      />
    )
  }

  render() {
    return (
      <div className="post-container">
        {this.state.data ? this.renderPosts() : null}
      </div>
    )
  }
}

export default PostContainer

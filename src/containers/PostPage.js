import React from 'react'


class PostPage extends React.Component {

  state = {
    makeComment: false,
    commentValue: null,
    comments: this.props.comments
  }

  commentValue = (event) => {
    this.setState({
      commentValue: event.target.value
    })
  }

  handleCommentSubmit = (event) => {
    event.preventDefault()

    if (this.state.commentValue) {
      fetch('http://localhost:3000/api/v1/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          description: this.state.commentValue,
          post_id: this.props.id
        })
      })
        .then(res => res.json())
        .then(comment =>
          this.setState({
            comments: [...this.state.comments, comment]
          })
        )
    } else if (!this.state.commentValue) {
      alert('You need a message!')
    }
  }

  postComment = () => {
    this.setState({
      makeComment: !this.state.makeComment
    })
  }

  render() {
    return (
      <div className="post-page">
        <br></br>
        <br></br>
        <br></br>
        <button onClick={this.postComment}>Make a Comment!</button>
        {
          this.state.makeComment ?
          <div>
            <form onSubmit={this.handleCommentSubmit}>
              <textarea class="comment-text" onChange={this.commentValue}></textarea>
              <button>Submit Comment</button>
            </form>
          </div>
          :
          null
        }
        <h1>Comments: </h1>
        {
          this.state.comments ?
          this.state.comments.map(comment => <div>{comment.description}</div>)
          :
          null
        }
      </div>
    )
  }
}

export default PostPage

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

  determineColor = () => {
    if (this.props.moodData.filter(mood => mood.id === this.props.clickedPost.props.moodId)[0].name === 'calm') {
      return '#15f9d6'
    } else if (this.props.moodData.filter(mood => mood.id === this.props.clickedPost.props.moodId)[0].name === 'happy') {
      return '#ffdf29'
    } else if (this.props.moodData.filter(mood => mood.id === this.props.clickedPost.props.moodId)[0].name === 'bored') {
      return '#f0b3f3'
    } else if (this.props.moodData.filter(mood => mood.id === this.props.clickedPost.props.moodId)[0].name === 'angry') {
      return '#ff1102'
    } else if (this.props.moodData.filter(mood => mood.id === this.props.clickedPost.props.moodId)[0].name === 'depressed') {
      return '#1374e0'
    } else if (this.props.moodData.filter(mood => mood.id === this.props.clickedPost.props.moodId)[0].name === 'annoyed') {
      return '#ef2480'
    } else if (this.props.moodData.filter(mood => mood.id === this.props.clickedPost.props.moodId)[0].name === 'optimistic') {
      return '#a3ff00'
    } else if (this.props.moodData.filter(mood => mood.id === this.props.clickedPost.props.moodId)[0].name === 'disgusted') {
      return '#d47c9e'
    } else if (this.props.moodData.filter(mood => mood.id === this.props.clickedPost.props.moodId)[0].name === 'sad') {
      return '#641cff'
    } else if (this.props.moodData.filter(mood => mood.id === this.props.clickedPost.props.moodId)[0].name === 'excited') {
      return '#f523d7'
    } else if (this.props.moodData.filter(mood => mood.id === this.props.clickedPost.props.moodId)[0].name === 'energetic') {
      return '#ff8b32'
    }
  }

  render() {

    return (
      <div className="post-page">
        <div className="comment-post-container">
          <div className="comment-post">
            <div className="post" >
              
              <div className="post-it">

                <a href='#'
                  style={{ background: this.determineColor() }}>
                  <p>{`${this.props.clickedPost.props.user.name}:`}</p>
                  <p>{this.props.clickedPost.props.description}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="comments-container">
          <h1>Comments: </h1>
          {
            this.state.comments ?
            this.state.comments.map(comment => <div>{comment.description}</div>)
            :
            null
          }
        </div>
        <div className="comment-form">
          <button onClick={this.postComment}>Make a Comment!</button>
          {
            this.state.makeComment ?
            <div className="comment-form">
              <form onSubmit={this.handleCommentSubmit}>
                <textarea className="comment-text" onChange={this.commentValue}></textarea>
                <button>Submit Comment</button>
              </form>
            </div>
            :
            null
          }
        </div>
      </div>
    )
  }
}

export default PostPage

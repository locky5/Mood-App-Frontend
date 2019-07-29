import React from 'react'

class Post extends React.Component {

  state = {
    data: null,
    color: '#ffc',
    likes: this.props.likes,
    makeComment: false,
    commentValue: null,
    comments: this.props.comments
  }

  componentDidMount() {
    this.renderMoods()
  }

  renderMoods = () => {
    fetch('http://localhost:3000/api/v1/moods')
      .then(res => res.json())
      .then(moods =>
        this.setState({
          data: moods
        })
      )
  }

  getMoodName = () => {
    console.log(this.props.moodId)
    return this.state.data.filter(mood => mood.id === this.props.moodId)[0].name
  }

  determineColor = () => {
    if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'calm') {
      return '#41D3BD'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'happy') {
      return '#97F9F9'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'bored') {
      return '#B6B8D6'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'angry') {
      return '#E3170A'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'depressed') {
      return '#083D77'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'annoyed') {
      return '#FED4E7'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'optimistic') {
      return '#FFE0B5'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'disgusted') {
      return '#86BA90'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'sad') {
      return '#1446A0'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'excited') {
      return '#FFD335'
    }
  }

  updateLikes = () => {
    fetch(`http://localhost:3000/api/v1/posts/${this.props.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        likes: parseInt(this.state.likes) + 1
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          likes: res.likes
        })
      })
  }

  postComment = () => {
    this.setState({
      makeComment: !this.state.makeComment
    })
  }

  commentValue = (event) => {
    this.setState({
      commentValue: event.target.value
    })
  }

  handleCommentSubmit = (event) => {
    event.preventDefault()

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
  }

  render() {
    return (
      <div className="post" onClick={this.props.clickPost}>
        {
          this.state.data ?
          <div className="post-it">
            {/* <li>
              <a href="#">
                <h2>Title #1</h2>
                <p>Text Content #1</p>
              </a>
            </li> */}

              <a href="#" style={{background: this.determineColor()}}>
                <p>{this.props.description}</p>
                <p>Mood:
                  {
                    this.getMoodName()
                  }
                </p>
                <button onClick={this.updateLikes}>Like!</button>
                <button onClick={this.postComment}>Make A Comment</button>
                <p>{this.state.likes}</p>
                {
                  this.state.makeComment ?
                  <div>
                    <form onSubmit={this.handleCommentSubmit}>
                      <textarea onChange={this.commentValue}></textarea>
                      <button>Submit Comment</button>
                    </form>
                  </div>
                  :
                  null
                }
                {
                  this.state.comments ?

                  this.state.comments.map(comment => <p>{comment.description}</p>)
                  :
                  null
                }
              </a>

          </div>
           :
          null
        }
      </div>
    )
  }
}

export default Post

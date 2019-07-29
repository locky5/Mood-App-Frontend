import React from 'react'
import {Link} from 'react-router-dom'

class Post extends React.Component {

  state = {
    data: null,
    color: '#ffc',
    likes: this.props.likes
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

  shortenDescription = () => {
    if (this.props.description.length > 10) {
      return this.props.description.slice(0, 10)
    } else {
      return this.props.description
    }
  }

  render() {
    return (
      <div className="post" onClick={this.props.clickPost}>
        {
          this.state.data ?
          <div className="post-it">

              <Link to='/postpage'
                style={{background: this.determineColor()}}
                onClick={() => this.props.setStuff(this.props.id, this.props.comments)}
              >
                <p>{`${this.props.user.name}:`}</p>
                <p>{this.shortenDescription()}</p>
                <p>Mood: {this.getMoodName()}
                </p>
                <button onClick={this.updateLikes}>{this.state.likes} likes!</button>
              </Link>

          </div>
           :
          null
        }
      </div>
    )
  }
}

export default Post

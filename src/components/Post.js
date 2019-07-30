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
      return '#15f9d6'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'happy') {
      return '#ffdf29'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'bored') {
      return '#f0b3f3'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'angry') {
      return '#ff1102'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'depressed') {
      return '#1374e0'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'annoyed') {
      return '#ef2480'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'optimistic') {
      return '#a3ff00'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'disgusted') {
      return '#d47c9e'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'sad') {
      return '#641cff'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'excited') {
      return '#f523d7'
    } else if (this.state.data.filter(mood => mood.id === this.props.moodId)[0].name === 'energetic') {
      return '#ff8b32'
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
    if (this.props.description.length > 20) {
      return `${this.props.description.slice(0, 20)}...`
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
                onClick={() => this.props.setStuff(this.props.id, this.props.comments, this.state.data, this)}
              >
                <p>{`${this.props.user.name}:`}</p>
                <p>{this.shortenDescription()}</p>
                <p>Mood: {this.getMoodName()}
                </p>
              </Link>
                <button onClick={this.updateLikes}>{(this.state.likes > 1 || this.state.likes === 0) ? `${this.state.likes} likes` : `${this.state.likes} like`}!</button>

          </div>
           :
          null
        }
      </div>
    )
  }
}

export default Post

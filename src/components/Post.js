import React from 'react'

class Post extends React.Component {

  state = {
    data: null
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

  render() {
    return (
      <div className="post" onClick={this.props.clickPost}>
        <h1>{this.props.description}</h1>
        {this.state.data ? this.getMoodName() : null}
      </div>
    )
  }
}

export default Post

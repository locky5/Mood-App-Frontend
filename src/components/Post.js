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
        <ul>
          {/* <li>
            <a href="#">
              <h2>Title #1</h2>
              <p>Text Content #1</p>
            </a>
          </li> */}
          <li>
            <a href="#">
              <p>{this.props.description}</p>
              <p>{this.state.data ? this.getMoodName() : null}</p>
              <p>{this.props.createdAt.split('T').join(' ').slice(0,-5)}</p>

            </a>
          </li>
          </ul>
      </div>
    )
  }
}

export default Post

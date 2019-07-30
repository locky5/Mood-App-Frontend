import React from 'react'
import Select from 'react-styled-select'

class ProfileContainer extends React.Component {

  state = {
    data: null
  }

  componentDidMount() {
    this.getMoods()
  }

  getMoods = () => {
    fetch('http://localhost:3000/api/v1/moods')
      .then(res => res.json())
      .then(moods =>
        this.setState({
          data: moods
        })
      )
  }

  createMoods = () => {
    if (this.state.data) {
      return this.state.data.map(mood =>
        <option value={mood.id}>{mood.name}</option>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div className="home-profile-container">

        Submit A New Post!
        <select class="select-css" name="form" onChange={this.props.handleFormChange}>
          {this.createMoods()}
        </select>

        <input
          name="description" onChange={this.props.handleChange}>
        </input>

        <button
          type="submit"
          onClick={this.props.handleSubmit}
        >Submit
        </button>

        <br></br>
        <br></br>

        Search Posts By Mood
        <select class="select-css" onChange={this.props.findPostsByMood}>
          <option value={0}>all</option>
          {this.createMoods()}
        </select>

        <br></br>
        <br></br>

        Search Posts By Description
        <input
          onChange={this.props.findText}>
        </input>

        <br></br>
        <br></br>

        Order By Likes
        <button
          type="submit" onClick={this.props.orderByLikes}>Go
        </button>

        <br></br>
        <br></br>

        Order Alphabetically
        <button
          type="submit" onClick={this.props.orderAlphabetically}>Go
        </button>

      </div>
    )
  }
}

export default ProfileContainer

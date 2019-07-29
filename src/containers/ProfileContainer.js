import React from 'react'
import Select from 'react-styled-select'
import ProfileCard from '../components/ProfileCard'

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
      <div className="profile-container">
        <ProfileCard />
        <br></br>
        <br></br>
        <br></br>

        Submit A New Post!
        <select onChange={this.props.handleFormChange}>
          {this.createMoods()}
        </select>

        <textarea
          name="description" onChange={this.props.handleChange}>
        </textarea>

        <button
          type="submit" onClick={this.props.handleSubmit}>Submit
        </button>

        <br></br>
        <br></br>

        Search Posts By Mood
        <select onChange={this.props.handleFormChange}>
          {this.createMoods()}
        </select>

        <br></br>
        <br></br>

        Search Posts By Description
        <textarea
          onChange={this.props.findText}>
        </textarea>

        <br></br>
        <br></br>

        Order By Likes
        <button
          type="submit" onClick={this.props.orderByLikes}>:D
        </button>

        <br></br>
        <br></br>

        Order Alphabetically
        <button
          type="submit" onClick={this.props.orderAlphabetically}>:D
        </button>

      </div>
    )
  }
}

export default ProfileContainer

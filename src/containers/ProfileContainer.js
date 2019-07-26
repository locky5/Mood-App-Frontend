import React from 'react'
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
        <select name="form" onChange={this.props.handleFormChange}>
          {this.createMoods()}
        </select>
        <textarea name="description" onChange={this.props.handleChange}></textarea>
        <button type="submit" onClick={this.props.handleSubmit}>Submit</button>
      </div>
    )
  }
}

export default ProfileContainer

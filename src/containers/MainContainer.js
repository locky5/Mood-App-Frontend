import React from 'react'
import ProfileContainer from './ProfileContainer'
import PostContainer from './PostContainer'

class MainContainer extends React.Component {

  state = {
    data: null
  }

  componentDidMount() {
    this.renderData()
  }

  renderData = () => {
    fetch()
      .then(res => res.json)
      .then(data =>
        this.setState({

        })
      )
  }

  render() {
    return (
      <div>
        <ProfileContainer />
        <PostContainer />
      </div>
    )
  }
}

export default MainContainer

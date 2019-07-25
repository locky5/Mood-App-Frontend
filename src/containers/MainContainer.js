import React from 'react'
import ProfileContainer from './ProfileContainer'
import PostContainer from './PostContainer'
import MainContainer from './MainContainer'

class MainContainer extends React.Component {
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

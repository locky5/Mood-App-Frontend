import React from 'react'
import ProfileContainer from './ProfileContainer'
import PostContainer from './PostContainer'

class MainContainer extends React.Component {
  render() {
    return (
      <div className="main-flex">
        <ProfileContainer />
        <PostContainer />
      </div>
    )
  }
}

export default MainContainer

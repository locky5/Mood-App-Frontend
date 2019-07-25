import React from 'react'
import ProfileContainer from './ProfileContainer'
import PostContainer from './PostContainer'
import LoadingPage from '../components/LoadingPage'

class MainContainer extends React.Component {

  state = {
    posts: null
  }

  componentDidMount() {
    this.renderData()
  }

  renderData = () => {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data =>
        this.setState({
          posts: data
        })
      )
  }

  render() {
    console.log(this.state.posts)
    return (
      <div className="main-flex">
        <ProfileContainer />
        {this.state.posts ? <PostContainer posts={this.state.posts}/> : <LoadingPage/>}
      </div>
    )
  }
}

export default MainContainer

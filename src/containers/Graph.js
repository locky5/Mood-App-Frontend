import React from 'react'
import ThisLineChart from '../components/ThisLineChart'
import ThisPieChart from '../components/ThisPieChart'
import FadeIn from 'react-fade-in'
import Post from '../components/Post'
import {Link} from 'react-router-dom'

export default class Graph extends React.Component {

  state = {
    currentUserPosts: null,
    data: null,
    postDelete: false
  }

  componentDidMount() {
    if (this.props.currentUser) {

      let filteredPosts = this.props.posts.filter(post => post.user.id === this.props.currentUser.id)

      this.setState({
        currentUserPosts: filteredPosts
      })
    }
    this.renderMoods()
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.postDelete != nextState.postDelete
  // }



  renderMoods = () => {
    fetch('http://localhost:3000/api/v1/moods')
      .then(res => res.json())
      .then(moods =>
        this.setState({
          data: moods
        })
      )
  }

  determineColor = (moodId) => {
    console.log(moodId)
    if (moodId === 1) {
      return '#15f9d6'
    } else if (moodId === 2) {
      return '#ffdf29'
    } else if (moodId === 6) {
      return '#f0b3f3'
    } else if (moodId === 8) {
      return '#ff1102'
    } else if (moodId === 11) {
      return '#1374e0'
    } else if (moodId === 9) {
      return '#ef2480'
    } else if (moodId === 3) {
      return '#a3ff00'
    } else if (moodId === 10) {
      return '#d47c9e'
    } else if (moodId === 7) {
      return '#641cff'
    } else if (moodId === 4) {
      return '#f523d7'
    } else if (moodId === 5) {
      return '#ff8b32'
    }
  }

  // handleDelete(post) {
  //   debugger
  //   fetch(`http://localhost:3000/api/v1/posts/${post.id}`, {
  //     method: "DELETE"
  //   })
  //   .then(this.setState({
  //     postDelete: !this.state.postDelete
  //   }))
  // }

  render() {
    return (
      <div className="profile-container">
        {
          this.props.currentUser && this.state.currentUserPosts ?
          <div>

            <div className="profile-header">
              <FadeIn>
                <h2>Hi, {this.props.currentUser.name} </h2>
                <h4>Here are Some of Your Popular Posts: </h4>
              </FadeIn>
            </div>
            <div className="user-posts">
              { this.state.currentUserPosts.length > 0 && this.state.data ?

              this.state.currentUserPosts.sort((a, b) =>
              (a.likes < b.likes) ? 1: -1).slice(0,4).map(post =>
                  <div className="post" >
                    <div className="post-it">
                      <Link to='/postpage'
                        style={{ background: this.determineColor(post.mood.id)}}>
                        <p><strong>{`${post.user.name}:`}</strong></p>
                        <p>"{post.description}"</p>
                        
                        Likes: {post.likes}
                      </Link>
                    </div>
                  </div>
              )
              :
              <div>
                <p>None Yet... Start Posting!</p>
                <Link to='/posts'>Posts
                </Link>
              </div>
              }
            </div>
            <div className="chart-container">
              <h4>Here are Some Analytics of Your Moods:</h4>
              <div className="line-chart">
                <ThisLineChart
                  posts={this.state.currentUserPosts}
                  moods={this.props.moods}
                />
              </div>
              <div className="pie-chart">
                <ThisPieChart
                  posts={this.state.currentUserPosts}
                  moods={this.props.moods}
                />
              </div>
            </div>
          </div>
          :
          <div>
            <br></br>
            <br></br>
            <p>Please sign in!</p>
            <Link to='/login'>Login
            </Link>
          </div>
        }
      </div>
    )
  }
}

import React from 'react'
import ThisLineChart from '../components/ThisLineChart'
import ThisPieChart from '../components/ThisPieChart'
import FadeIn from 'react-fade-in'
import {Link} from 'react-router-dom'

export default class Graph extends React.Component {

  state = {
    currentUserPosts: null,
    data: null
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

  render() {
    return (
      <div>
        {
          this.props.currentUser && this.state.currentUserPosts ?
          <div>
            <br></br>
            <FadeIn>
              <h1>Hi, {this.props.currentUser.name} </h1>

              <br></br>

              <h1>Here's Some Of Your Popular Posts: </h1>
            </FadeIn>
            {
              this.state.currentUserPosts.length > 0 && this.state.data ?

              this.state.currentUserPosts.sort((a, b) =>
              (a.likes < b.likes) ? 1: -1).slice(0,4).map(post =>
                  <div className="post" >
                    <div className="post-it">
                      <a href='#'
                        style={{ background: this.determineColor(post.mood.id)}}>
                        <p>{post.description}</p>
                        <br></br>
                        Likes: {post.likes}
                      </a>
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
            <br></br>
            <h2>Here's Some Analytics Of Your Moods:</h2>
            <ThisLineChart
              posts={this.state.currentUserPosts}
              moods={this.props.moods}
            />
            <ThisPieChart
              posts={this.state.currentUserPosts}
              moods={this.props.moods}
            />
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

import React from 'react'
import ThisLineChart from '../components/ThisLineChart'
import ThisPieChart from '../components/ThisPieChart'
import {Link} from 'react-router-dom'

export default class Graph extends React.Component {

  state = {
    currentUserPosts: null
  }

  componentDidMount() {

    if (this.props.currentUser) {

      let filteredPosts = this.props.posts.filter(post => post.user.id === this.props.currentUser.id)

      this.setState({
        currentUserPosts: filteredPosts
      })
    }
  }

  render() {
    return (
      <div>
        {
          this.props.currentUser && this.state.currentUserPosts ?
          <div>
            <br></br>
            <h1>Hi, {this.props.currentUser.name}</h1>
            <br></br>

            <h1>Here's Some Of Your Popular Posts: </h1>
            { this.state.currentUserPosts.length > 0 ?

            this.state.currentUserPosts.sort((a, b) =>
            (a.likes < b.likes) ? 1: -1).slice(0,4).map(post =>
              <div className="post">
                <div className="post-it">
                  {post.description}
                  <br></br>
                  Likes: {post.likes}
                </div>
              </div>
            )
            :
            <div>
              <p>Start Posting!</p>
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

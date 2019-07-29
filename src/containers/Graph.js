import React from 'react'
import ThisLineChart from '../components/ThisLineChart'
import ThisPieChart from '../components/ThisPieChart'

export default class Graph extends React.Component {

  render() {
    console.log(this.props.currentUser.posts)
    return (
      <div>
        <br></br>
        <h1>Hi, {this.props.currentUser.name}</h1>
        <br></br>

        <h1>Here's Some Of Your Popular Posts: </h1>
        {this.props.currentUser.posts.map(post =>
          <div className="post">
            <div className="post-it">
              {post.description}
              <br></br>
              Likes: {post.likes}
            </div>
          </div>
        )}

        <br></br>
        <h2>Here's Some Analytics Of Your Moods:</h2>
        <ThisLineChart
          posts={this.props.posts}
          moods={this.props.moods}
        />
        <ThisPieChart
          posts={this.props.posts}
          moods={this.props.moods}
        />
      </div>
    )
  }
}

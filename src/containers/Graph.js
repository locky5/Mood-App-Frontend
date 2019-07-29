import React from 'react'
import ThisLineChart from '../components/ThisLineChart'
import ThisPieChart from '../components/ThisPieChart'

export default class Graph extends React.Component {

  render() {
    return (
      <div>
        <ThisLineChart posts={this.props.posts}
        moods={this.props.moods} 
        />
        <ThisPieChart posts={this.props.posts} moods={this.props.moods}/>
      </div>
    )
  }
}

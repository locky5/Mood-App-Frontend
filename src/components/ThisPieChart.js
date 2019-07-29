import React from 'react'
import { PieChart } from 'react-chartkick'
import 'chart.js'

export default class ThisPieChart extends React.Component {

  createPieGraph = () => {
    for (const post of this.props.posts) {
      let mood = this.props.moods.filter(mood => mood.id === post.mood.id)[0]
      let moodName = this.props.moods.filter(mood => mood.id === post.mood.id)[0].name
      let timesOccured = this.props.posts.filter(thisPost => thisPost.mood.id === mood.id).length
      this.setState({
        [moodName]: timesOccured
      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {this.state ? null : this.createPieGraph()}
        <PieChart
          data={this.state}
        />
      </div>
    )
  }
}

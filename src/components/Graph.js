import React from 'react'
import { LineChart, PieChart, BarChart, AreaChart } from 'react-chartkick'
import 'chart.js'

export default class Graph extends React.Component {

  // state = {
  //   line: {},
  //   pie: {}
  // }

  createLineGraph = () => {
    for (const post of this.props.posts) {
      let timestamp = post.created_at.split('T').join(' ').slice(0,-5)
      let value = this.props.moods.filter(mood => mood.id === post.mood_id)[0].value
      this.setState({
        [timestamp]: value
      })
    }
  }

  createPieGraph = () => {
    for (const post of this.props.posts) {
      let mood = this.props.moods.filter(mood => mood.id === post.mood_id)[0].name
      let timesOccured = this.props.posts.filter(thisPost => thisPost.name === post.name).length
      this.setState({
        [mood]: timesOccured
      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {this.state ? null : this.createLineGraph()}
        {this.state ? null : this.createPieGraph()}
        <LineChart
          data={this.state}
          xtitle="Time"
          ytitle="Mood"
          download={true}
        />
        <PieChart
          data={this.state}
        />
      </div>
    )
  }
}

{/* <LineChart data={
  {
    "2017-05-13 00:00:00 -0800": 2,
    "2017-05-14 00:00:00 -0800": 5
  }
}/> */}

import React from 'react'
import { LineChart } from 'react-chartkick'
import 'chart.js'

export default class ThisLineChart extends React.Component {

  createLineGraph = () => {
    for (const post of this.props.posts) {
      let timestamp = post.created_at.split('T').join(' ').slice(0,-5)
      let value = this.props.moods.filter(mood => mood.id === post.mood.id)[0].value
      this.setState({
        [timestamp]: value
      })
    }
  }

  getDate = () => {
    let today = new Date().toLocaleDateString()
    return today
  }

  render() {
    return (
      <div>
        {this.state ? null : this.createLineGraph()}
        <LineChart
          data={this.state}
          xtitle="Time"
          ytitle="Mood"
          download={true}
          title={this.getDate()}
        />
      </div>
    )
  }
}

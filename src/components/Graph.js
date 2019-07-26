import React from 'react'
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'

export default class Graph extends React.Component {

  createGraph = () => {
    for (const post of this.props.posts) {
      let timestamp = post.created_at.split('T').join(' ').slice(0,-5)
      console.log(timestamp)
      let value = this.props.moods.filter(mood => mood.id === post.mood_id)[0].value
      console.log(value)
      this.setState({
        [timestamp]: value
      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {this.state ? <div></div> : this.createGraph()}
        <LineChart data={this.state}/>
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

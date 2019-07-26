import React from 'react'
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'

export default class Graph extends React.Component {

  render() {
    return (
      <div>
        <LineChart data={{"2017-05-13 00:00:00 -0800": 2, "2017-05-14 00:00:00 -0800": 5}}/>
      </div>
    )
  }
}

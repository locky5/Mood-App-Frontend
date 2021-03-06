import React from 'react'
import { PieChart } from 'react-chartkick'
import FadeIn from 'react-fade-in'
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

  getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value)
  }

  getCommonMood = () => {
    let obj = this.state

    let arr = Object.values(obj)
    let max = Math.max(...arr);

    let commonMood = this.getKeyByValue(this.state, max)
    return commonMood
  }

  advice = () => {
    let obj = this.state

    let arr = Object.values(obj)
    let max = Math.max(...arr);

    let commonMood = this.getKeyByValue(this.state, max)

    if (commonMood === 'calm') {
      return "Get angry."
    } else if (commonMood === 'happy') {
      return "Stop indulging in sugar."
    } else if (commonMood === 'optimistic') {
      return "Stop believing so hard."
    } else if (commonMood === 'excited') {
      return "Nothing's ever gonna happen."
    } else if (commonMood === 'energetic') {
      return "Calm down sonny."
    } else if (commonMood === 'bored') {
      return "Read a book."
    } else if (commonMood === 'sad') {
      return "Get happy."
    } else if (commonMood === 'angry') {
      return "Stop being mad."
    } else if (commonMood === 'annoyed') {
      return "Get over yourself."
    } else if (commonMood === 'disgusted') {
      return "Look in a mirror."
    } else if (commonMood === 'depressed') {
      return "There's a lot of people worse off than you."
    }
  }

  render() {
    return (
      <div>
        {
          this.state ?
          null
          :
          this.createPieGraph()
        }
        <PieChart
          data={this.state}
          title="Mood Breakdown"
        />
        {
          this.state ?
        <FadeIn>
          <div className="pie-chart-text">
            <h5>
              It looks like you're feeling {this.getCommonMood()} a lot...
              <br></br>
              <br></br>
              <p>
                Here's some advice to make you feel better:
                <br></br>
                <i><b>{this.advice()}</b></i>
              </p>
            </h5>
          </div>
        </FadeIn>
          :
          null
        }
      </div>
    )
  }
}

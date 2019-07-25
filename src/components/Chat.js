import React from 'react'

class Chat extends React.Component {

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let text = this.state.text
    this.props.actions.send(text)
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="text" onChange={this.handleChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Chat

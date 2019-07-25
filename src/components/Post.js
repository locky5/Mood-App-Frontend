import React from 'react'

class Post extends React.Component {
  render() {
    return (
      <div className="post" onClick={this.props.clickPost}>
        <h1>{this.props.description}</h1>
      </div>
    )
  }
}

export default Post

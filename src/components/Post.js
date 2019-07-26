import React from 'react'

class Post extends React.Component {
  render() {
    return (
      <div className="post" onClick={this.props.clickPost}>
        <ul>
          {/* <li>
            <a href="#">
              <h2>Title #1</h2>
              <p>Text Content #1</p>
            </a>
          </li> */}
          <li>
            <a href="#">
              <p>{this.props.description}</p>
            </a>
          </li>
          </ul>
      </div>
    )
  }
}

export default Post

import React, { Component } from 'react'
import "./index.css"
export default class Enter extends Component {

  handleClick = () => {
    this.props.enterLine();
  }
  render() {
    return (
      <div className="enter" onClick={this.handleClick}>Enter</div>
    )
  }
}

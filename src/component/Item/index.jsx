import React, { Component } from "react";
import "./index.css"


export default class Item extends Component {
  render() {
    const { word, active, attribute } = this.props
    const { isWrong, isCorrect, isElsewhere } = attribute;
    return <div className={`item ${active ? "active" : null} ${isWrong ? "wrong" : null} ${isCorrect ? "correct" : null} ${isElsewhere ? "elsewhere" : null}`}>
      {word.toUpperCase()}
    </div>;
  }
}

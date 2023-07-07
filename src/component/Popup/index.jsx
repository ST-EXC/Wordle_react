import React, { Component } from 'react'
import "./index.css"
export default class Popup extends Component {
    render() {
        const { content,opacity } = this.props;
        return (
            <div className="popup" style={{ opacity: opacity }}>{content}</div>
        )
    }
}

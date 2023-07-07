import React, { Component } from 'react'
import "./index.css"
export default class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    render() {
        const { content,opacity } = this.props;
        return (
            <div className="popup" style={{ opacity: opacity }}>{content}</div>
        )
    }
}

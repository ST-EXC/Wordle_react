import React, { Component } from 'react'
import deleteSvg from "./delete.svg"
import "./index.css"
export default class Delete extends Component {
    handleClick = () => {
        this.props.deleteWord();
    }
    render() {
        return (
            <div className={"delete"} onClick={this.handleClick}>
                <img src={deleteSvg} alt="Delete" />
            </div>
        )
    }
}

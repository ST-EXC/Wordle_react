import React, { Component } from 'react'
import restartSVG from "./restart.svg"
import "./index.css"
export default class Restart extends Component {
    handleClick = ()=>{
        this.props.restart();
        console.log("restart")
    }
    render() {
        return (
            <div className='restart' onClick={this.handleClick}> <img className="restartSVG"src={restartSVG} alt="restart" /></div>
        )
    }
}

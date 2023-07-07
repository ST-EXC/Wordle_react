import React, { Component } from 'react'
import Item from "../Item"
import { nanoid } from "nanoid"
import "./index.css"
export default class Screen extends Component {
    render() {
        const { words, actives,attributes } = this.props
        return (
            <div className="screen">
                {
                    words.map((word, index) => {
                        return <Item key={nanoid()} word={word} active={actives[index]} attribute={attributes[index]} />
                    })
                }
            </div>
        )
    }
}

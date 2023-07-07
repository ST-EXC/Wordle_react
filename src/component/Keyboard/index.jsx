import React, { Component } from "react"
import Key from "../Key"
import Enter from "../Enter"
import Delete from "../Delete"
import Restart from "../Restart"
import { nanoid } from "nanoid"
import "./index.css"

export default class Keyboard extends Component {
    state = {
        row1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        row2: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        row3: ["Z", "X", "C", "V", "B", "N", "M"],
    }
    render() {
        const { row1, row2, row3 } = this.state;
        const { addWord, enterLine, deleteWord, keysAttributes,restart } = this.props
        return (
            <div className="keyboard">
                <div className="row1">
                    {
                        row1.map((word) => {
                            //console.log("word", word,keysAttributes[ word ]);
                            return <Key key={nanoid()} ref={word} word={word} addWord={addWord} keyAttributes={keysAttributes[word]} />
                        })
                    }
                </div>
                <div className="row2">
                    {
                        row2.map((word) => {
                            return <Key key={nanoid()} ref={word} word={word} addWord={addWord} keyAttributes={keysAttributes[word]} />
                        })
                    }
                </div>
                <div className="row3">
                    <Delete key={nanoid()} ref={myDelete => this.myDelete = myDelete} deleteWord={deleteWord} />
                    {
                        row3.map((word) => {
                            return <Key key={nanoid()} ref={word} word={word} addWord={addWord} keyAttributes={keysAttributes[word]} />
                        })
                    }
                    <Enter key={nanoid} ref={enter => this.enter = enter} enterLine={enterLine} />
                    <Restart restart={restart}/>
                </div>
            </div>
        )
    }
}


import { Component } from "react";
import "./index.css";

export default class Key extends Component {
    constructor(props) {
        super(props);
        const { word } = this.props;
        this.state = {
            word,
            isWrong: false,
            isCorrect: false,
            isElsewhere: false,
            keyAttributes: props.keyAttributes,
        }

    };

    handleClicked = (word) => {
        return () => {
            const { addWord } = this.props;
            addWord(word.toLowerCase());
        };
    };
    render() {
        const { word, keyAttributes } = this.state;
        const { isCorrect, isElsewhere, isWrong } = keyAttributes;
        //console.log("key",keyAttributes);
        return (
            <div className={`key ${isWrong ? "wrong" : null} ${isCorrect ? "correct" : null} ${isElsewhere ? "elsewhere" : null}`} id={word} onClick={this.handleClicked(word)}>
                {word}
            </div>
        );
    }
}

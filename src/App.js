import React, { Component } from "react";
import Screen from "./component/Screen";
import Keyboard from "./component/Keyboard";
import { wordsTable } from "./words";
import Popup from "./component/Popup";
export default class App extends Component {
  constructor(props) {
    super(props);
    const { wordsList } = wordsTable;
    const l = wordsList.length;
    const index = parseInt(Math.random() * l);
    const answer = wordsList[index];
    console.log(answer);
    const words = new Array(30).fill("");
    const actives = new Array(30).fill(false);
    const attributes = new Array(30).fill({
      isCorrect: false,
      isWrong: false,
      isElsewhere: false,
    });
    const cha = [
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
    ];
    const a = {
      isCorrect: false,
      isWrong: false,
      isElsewhere: false,
    };
    let keysAttributes = {};
    cha.forEach((ch) => {
      keysAttributes[ch] = a;
    });
    this.state = {
      words,
      actives,
      attributes,
      keysAttributes,
      answer,
      wordsList,
      column: 5,
      row: 6,
      rowIndex: 0,
      columnIndex: 0,
      content: "",
      opacity: 0,
      isOver: false,
      isWin: false,
    };
  }
  restart = () => {
    const { wordsList } = wordsTable;
    const l = wordsList.length;
    const index = parseInt(Math.random() * l);
    const answer = wordsList[index];
    console.log(answer);
    const words = new Array(30).fill("");
    const actives = new Array(30).fill(false);
    const attributes = new Array(30).fill({
      isCorrect: false,
      isWrong: false,
      isElsewhere: false,
    });
    const cha = [
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
    ];
    const a = {
      isCorrect: false,
      isWrong: false,
      isElsewhere: false,
    };
    let keysAttributes = {};
    cha.forEach((ch) => {
      keysAttributes[ch] = a;
    });
    let state = {
      words,
      actives,
      attributes,
      keysAttributes,
      answer,
      wordsList,
      column: 5,
      row: 6,
      rowIndex: 0,
      columnIndex: 0,
      content: "",
      opacity: 0,
      isOver: false,
      isWin: false,
    };
    this.setState(state);
  }

  addWord = (word) => {
    let { words, actives, column, rowIndex, columnIndex, isOver, isWin } =
      this.state;
    if (isOver || isWin) return;
    if (columnIndex === column) return;
    let index = column * rowIndex + columnIndex;
    words[index] = word;
    actives[index] = true;
    columnIndex++;
    this.setState({ words, actives, columnIndex });
  };
  enterLine = () => {
    let {
      rowIndex,
      columnIndex,
      column,
      row,
      actives,
      content,
      isOver,
      isWin,
      answer,
    } = this.state;
    if (isWin || isOver) return;
    if (columnIndex !== column) {
      content = "单词过短";
      this.popup(content);
      return;
    } else if (!this.isWordExist(this.getCurrentWord())) {
      content = "单词不存在";
      this.setState({ content });
      this.popup(content);
      return;
    }
    this.indicate();
    let word = this.getCurrentWord();
    if (word === answer) {
      isWin = true;
      content = "胜利";
      this.popup(content);
      this.setState({ isWin });
      return;
    }
    actives.forEach((active, index) => {
      actives[index] = false;
    });
    if (rowIndex + 1 === row) {
      isOver = true;
      this.popup("你输了");
    }
    this.setState({ rowIndex: rowIndex + 1, columnIndex: 0, actives, isOver });
  };
  deleteWord = () => {
    let { words, actives, column, rowIndex, columnIndex, isWin, isOver } = this.state;
    if (isOver || isWin) return;
    let index = column * rowIndex + columnIndex;
    if (columnIndex === 0) {
      words[index] = "";
      actives[index] = false;
      this.setState({ words, actives });
    } else {
      index--;
      words[index] = "";
      actives[index] = false;
      columnIndex--;
      this.setState({ words, actives, columnIndex });
    }
    return;
  };
  getCurrentWord = () => {
    const { words, column, columnIndex, rowIndex } = this.state;
    let index = rowIndex * column + columnIndex;
    return words.slice(index - column, index + 1).join("");
  };
  isWordExist = (word) => {
    const { wordsList } = this.state;
    return wordsList.includes(word);
  };
  indicate = () => {
    let { answer, attributes, column, rowIndex, columnIndex, keysAttributes } =
      this.state;
    let endIndex = rowIndex * column + columnIndex;
    let startIndex = endIndex - 5;
    let currentWords = this.getCurrentWord().split("");
    const defaultAttribute = {
      isCorrect: false,
      isElsewhere: false,
      isWrong: false,
    };
    currentWords.forEach((word, index) => {
      //console.log(word);
      if (answer.charAt(index) === word) {
        attributes[index + startIndex] = {
          ...defaultAttribute,
          isCorrect: true,
        };
        keysAttributes[word.toUpperCase()] = {
          ...defaultAttribute,
          isCorrect: true,
        };
      } else if (answer.includes(word)) {
        attributes[index + startIndex] = {
          ...defaultAttribute,
          isElsewhere: true,
        };
        if (keysAttributes[word.toUpperCase()].isCorrect) return;
        keysAttributes[word.toUpperCase()] = {
          ...defaultAttribute,
          isElsewhere: true,
        };
      } else {
        if (attributes[index + startIndex].isElsewhere) return;
        attributes[index + startIndex] = {
          ...defaultAttribute,
          isWrong: true,
        };
        keysAttributes[word.toUpperCase()] = {
          ...defaultAttribute,
          isWrong: true,
        };
      }
    });
    this.setState({ attributes, keysAttributes });
  };
  popup = (content) => {
    this.setState({ opacity: 1, content });
    setTimeout(() => {
      this.setState({ opacity: 0 });
    }, 800);
  };
  render() {
    const { words, actives, attributes, keysAttributes, content, opacity } =
      this.state;
    return (
      <div className="WordleContainer">
        <Screen words={words} actives={actives} attributes={attributes} />
        <Keyboard
          ref={(keyboard) => (this.keyboard = keyboard)}
          addWord={this.addWord}
          enterLine={this.enterLine}
          deleteWord={this.deleteWord}
          keysAttributes={keysAttributes}
          restart={this.restart}
        />
        <Popup content={content} opacity={opacity} />
      </div>
    );
  }
}

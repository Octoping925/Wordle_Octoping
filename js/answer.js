import {CONSTANTS} from "./config.js";

export class Answer {
  word;

  constructor(word) {
    this.word = word;
  }

  isEqual(word) {
    return this.word === word;
  }

  getColor(char, idx) {
    switch(true) {
      case this.word[idx] === char:
        return CONSTANTS.GREEN;
      case this.word.includes(char):
        return CONSTANTS.YELLOW;
      default:
        return CONSTANTS.GRAY;
    }
  }

  getWord() {
    return this.word;
  }
}
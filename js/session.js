import {CONSTANTS} from "./config.js";
import {Answer} from "./answer.js";

export class Session {
  answer;
  leftTryCount;
  submittedWord;
  submittedResult;

  constructor(answer) {
    this.answer = new Answer(answer);
    this.leftTryCount = CONSTANTS.TRY_COUNT;
    this.submittedWord = [];
    this.submittedResult = [];
  }

  submitAnswer(inputWord) {
    this.submittedWord.push(inputWord);
    this.submittedResult.push(this.getColorArray(inputWord));
    --this.leftTryCount;
  }

  getColorArray(inputWord) {
    return inputWord.split('').map((x, idx) => this.answer.getColor(x, idx));
  }

  isGameEnd() {
    return this.isWin() || this.leftTryCount === 0;
  }

  isWin() {
    const lastSubmitWord = this.submittedWord[this.submittedWord.length - 1];
    return this.isAnswer(lastSubmitWord);
  }

  isAnswer(inputWord) {
    return this.answer.isEqual(inputWord);
  }

  getWordleTableHTML() {
    let tableHTML = '<table>';
    for(let i = 0; i < CONSTANTS.TRY_COUNT; ++i) {
      tableHTML += '<tr>';
      for(let j = 0; j < CONSTANTS.WORD_LEN; ++j) {
        if(i < this.submittedWord.length) {
          tableHTML += `<td class=${CONSTANTS.TD_TYPE[this.submittedResult[i][j]]}>${this.submittedWord[i][j]}</td>`;
        }
        else {
          tableHTML += `<td></td>`;
        }
      }
      tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    return tableHTML;
  }

  getResultStr() {
    return this.submittedResult.map(submitResult => submitResult.map(x => CONSTANTS.ICON[x]).join('')).join('\n');
  }

  getAnswer() {return this.answer.word;}
  getSubmitCnt() {return this.submittedWord.length;}
}
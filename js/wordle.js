import {CONSTANTS, wordDict} from "./config.js";

let answerWord;
let leftTryCount;
let submittedWord;
let submittedResult;

window.onload = function () {
  initData();
  initEvent();
  makeTable();
}

function initData() {
  const randomIdx = Math.floor(Math.random() * wordDict.length);
  answerWord = wordDict[randomIdx].toUpperCase();
  leftTryCount = CONSTANTS.TRY_COUNT;
  submittedWord = [];
  submittedResult = [];
}

function initEvent() {
  const wordInput = document.getElementById("wordInput");

  wordInput.addEventListener("keyup", e => {
    const wordInput = document.getElementById("wordInput");
    const wordInputValue = wordInput.value;

    if(e.keyCode === 13) {
      game(wordInputValue);
      wordInput.value = '';
    }
  });

  wordInput.addEventListener("input", () => {
    wordInput.value = wordInput.value.replace(/[^A-Za-z]/ig, '');
  });

  document.getElementById("copybutton").addEventListener("click", copyResult);

  wordInput.setAttribute("maxlength", `${CONSTANTS.WORD_LEN}`);
}

function game(inputWord) {
  if(!chkValidInput(inputWord)) return;

  inputWord = inputWord.toUpperCase();
  submitAnswer(inputWord);
  makeTable();

  if(isEqualToAnswer(inputWord)) {
    makeAlert("Success");
  }
  else if(leftTryCount === 0) {
    makeAlert("Fail");
  }
}

function submitAnswer(inputWord) {
  submittedWord.push(inputWord);
  submittedResult.push(chkAnswer(inputWord));
  --leftTryCount;
}

function chkValidInput(inputWord) {
  if(inputWord.length < CONSTANTS.WORD_LEN) {
    alert(`단어 길이는 ${CONSTANTS.WORD_LEN}글자여야 합니다`);
    return false;
  }
  if(!wordDict.includes(inputWord)) {
    alert("사전에 있는 단어여야 합니다");
    return false;
  }

  return true;
}

function chkAnswer(inputWord) {
  const result = [];
  for(let i = 0; i < CONSTANTS.WORD_LEN; ++i) {
    if(answerWord[i] === inputWord[i]) {
      result.push(CONSTANTS.GREEN);
    }
    else if(answerWord.includes(inputWord[i])) {
      result.push(CONSTANTS.YELLOW);
    }
    else {
      result.push(CONSTANTS.GRAY);
    }
  }
  return result;
}

function isEqualToAnswer(inputWord) {
  return answerWord === inputWord;
}

function makeAlert(alertStr) {
  alert(alertStr);
  // TODO: 게임 초기화 혹은 비활성화 기능 구현
}

function makeTable() {
  let tableHTML = '<table>';
  for(let i = 0; i < CONSTANTS.TRY_COUNT; ++i) {
    tableHTML += '<tr>';
    for(let j = 0; j < CONSTANTS.WORD_LEN; ++j) {
      if(i < submittedWord.length) {
        tableHTML += `<td class=${CONSTANTS.TD_TYPE[submittedResult[i][j]]}>${submittedWord[i][j]}</td>`;
      }
      else {
        tableHTML += `<td></td>`;
      }
    }
    tableHTML += '</tr>';
  }
  tableHTML += '</table>';

  document.getElementById("wordleTable").innerHTML = tableHTML;
}

function copyResult() {
  const resultStr = submittedResult.map(submitResult => submitResult.map(x => CONSTANTS.ICON[x]).join('')).join('\n');
  window.navigator.clipboard.writeText(resultStr);
}
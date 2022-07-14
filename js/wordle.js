import {CONSTANTS, wordDict, dictionary} from "./config.js";

let nowWord;
let nowTryCount;
let submittedWord;
let submittedResult;

window.onload = function () {
  initData();
  initEvent();
  makeTable();
}

function initData() {
  const randomIdx = Math.floor(Math.random() * wordDict.length);
  nowWord = wordDict[randomIdx];
  nowTryCount = CONSTANTS.TRY_COUNT;
  submittedWord = [];
  submittedResult = [];
}

function initEvent() {
  const wordInput = document.getElementById("wordInput");

  wordInput.addEventListener("keyup", e => {
    const wordInput = document.getElementById("wordInput");
    const wordInputValue = wordInput.value;

    if(e.keyCode === 13) {
      if(chkValidInput(wordInputValue)) {
        submitAnswer(wordInputValue.toUpperCase());
      }
      wordInput.value = '';
    }
  });

  wordInput.addEventListener("input", e => {
    wordInput.value = wordInput.value.replace(/[^A-Za-z]/ig, '');
  });

  wordInput.setAttribute("maxlength", `${CONSTANTS.WORD_LEN}`);
}

function submitAnswer(inputWord) {
  submittedWord.push(inputWord);
  submittedResult.push(chkAnswer(inputWord));
  makeTable();

  if(isEqualToAnswer(inputWord)) {
    makeAlert("Success");
  }

  if(submittedWord.length === CONSTANTS.TRY_COUNT) {
    makeAlert("Fail");
  }
}

function chkValidInput(inputWord) {
  if(inputWord.length < CONSTANTS.WORD_LEN) {
    alert(`단어 길이는 ${CONSTANTS.WORD_LEN}글자여야 합니다`);
    return false;
  }
  if(!dictionary.includes(inputWord)) {
    alert("사전에 있는 단어여야 합니다");
    return false;
  }

  return true;
}

function chkAnswer(inputWord) {
  const result = [];
  for(let i = 0; i < CONSTANTS.WORD_LEN; ++i) {
    if(nowWord[i] === inputWord[i]) {
      result.push(CONSTANTS.GREEN);
    }
    else if(nowWord.includes(inputWord[i])) {
      result.push(CONSTANTS.YELLOW);
    }
    else {
      result.push(CONSTANTS.GRAY);
    }
  }
  return result;
}

function isEqualToAnswer(inputWord) {
  return nowWord === inputWord;
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
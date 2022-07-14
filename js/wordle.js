import {CONSTANTS, wordDict} from "./config.js";

let nowWord;
// nowWord = "HELLO"; //테스트용
let nowTryCount;
const submittedWord = [];
const submittedResult = [];

window.onload = function () {
  const randomIdx = Math.floor(Math.random() * wordDict.length);
  nowWord = wordDict[randomIdx];
  nowTryCount = CONSTANTS.TRY_COUNT;

  initEvent();
  makeTable();
}

function initEvent() {
  document.getElementById("wordInput").addEventListener("keyup", (e) => {
    const wordInput = document.getElementById("wordInput");
    const wordInputValue = wordInput.value;

    if(e.keyCode === 13) {
      if(chkValid(wordInputValue)) {
        submitAnswer(wordInputValue.toUpperCase());
      }
      wordInput.value = '';
    }
    else {
      wordInput.value = wordInputValue.substring(0, 5);
    }

  });
}

function submitAnswer(inputWord) {
  submittedWord.push(inputWord);
  submittedResult.push(chkAnswer(inputWord));
  makeTable();

  if(isItAnswer(inputWord)) {
    makeAlert("Success");
  }

  if(submittedWord.length === CONSTANTS.TRY_COUNT) {
    makeAlert("Fail");
  }
}

function chkValid(inputWord) {
  // if(!onlyEnglish) {  // TODO: 영어 단어인지 체크 기능 추가
  //   alert("영어 단어만 입력할 수 있습니다");
  //   return false;
  // }
  if(inputWord.length !== 5) {
    alert("단어 길이는 5글자여야 합니다");
    return false;
  }
  // if(!dictionary.includes(inputWord)) {  // TODO: 사전에 있는 단어인지 확인 기능 추가
  //   alert("사전에 있는 단어여야 합니다");
  //   return false;
  // }

  return true;
}

function chkAnswer(inputWord) {
  const result = [];
  for(let i = 0; i < nowWord.length; ++i) {
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

function isItAnswer(inputWord) {
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
    if(i < submittedWord.length) {
      for(let j = 0; j < nowWord.length; ++j) {
        tableHTML += `<td class=${CONSTANTS.TD_TYPE[submittedResult[i][j]]}>${submittedWord[i][j]}</td>`;
      }
    }
    else {
      for(let j = 0; j < nowWord.length; ++j) {
        tableHTML += `<td></td>`;
      }
    }
    tableHTML += '</tr>';
  }
  tableHTML += '</table>';

  document.getElementById("wordleTable").innerHTML = tableHTML;
}
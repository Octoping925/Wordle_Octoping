import {CONSTANTS, wordDict} from "./config.js";
import {Session} from "./session.js";

let nowSession;

window.onload = function () {
  initEvent();
  gameStart();
}

function initData() {
  const randomIdx = Math.floor(Math.random() * wordDict.length);
  const answer = wordDict[randomIdx];
  nowSession = new Session(answer);
}

function initEvent() {
  const wordInput = document.getElementById("wordInput");

  wordInput.addEventListener("keyup", e => {
    const wordInput = document.getElementById("wordInput");
    const wordInputValue = wordInput.value;

    if(e.keyCode === 13) {
      game(wordInputValue.toUpperCase());
      wordInput.value = '';
    }
  });

  wordInput.addEventListener("input", () => {
    wordInput.value = wordInput.value.replace(/[^A-Za-z]/ig, '');
  });

  document.getElementById("copybutton").addEventListener("click", copyResult);

  wordInput.setAttribute("maxlength", `${CONSTANTS.WORD_LEN}`);
}

function gameStart() {
  initData();
  makeTable();
}

function game(inputWord) {
  if(!chkInputValid(inputWord)) return;
  nowSession.submitAnswer(inputWord);
  makeTable();

  if(nowSession.isAnswer(inputWord)) {
    makeAlert("Success");
  }
  else if(nowSession.leftTryCount === 0) {
    makeAlert("Fail");
  }
}

function chkInputValid(inputWord) {
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

function makeAlert(alertStr) {
  alert(alertStr);
  // TODO: 게임 초기화 혹은 비활성화 기능 구현
}

function makeTable() {
  document.getElementById("wordleTable").innerHTML = nowSession.getWordleTableHTML();
}

function copyResult() {
  const resultStr = nowSession.getResultStr();
  window.navigator.clipboard.writeText(resultStr);
}
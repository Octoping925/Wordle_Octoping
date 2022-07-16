import {CONSTANTS, wordDict} from "./config.js";
import {Session} from "./session.js";
import {toggleModal, makeToast} from "./modal.js";

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
  const modal = document.getElementById("resultModal");

  wordInput.addEventListener("keyup", e => {
    const wordInput = document.getElementById("wordInput");

    if(e.key === "Enter") {
      game(wordInput.value);
      wordInput.value = '';
    }
  });

  wordInput.addEventListener("input", () => {
    wordInput.value = wordInput.value.replace(/[^A-Za-z]/ig, '').toUpperCase();
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.toggle('show');

      if (!modal.classList.contains('show')) {
        document.querySelector('body').style.overflow = 'auto';
      }
    }
  });

  document.getElementById("resultModalRestartButton").addEventListener('click', () => {
    toggleModal(nowSession);
    gameStart();
  });

  document.getElementById("resultModalResultCopyButton").addEventListener('click', () => {
    const resultStr = nowSession.getResultStr();
    window.navigator.clipboard.writeText(resultStr);
  });

  document.getElementById("modalDebug").addEventListener("click", ()=>toggleModal(nowSession));

  wordInput.setAttribute("maxlength", `${CONSTANTS.WORD_LEN}`);
}

function gameStart() {
  initData();
  makeTable();
  disableInput(false);
}

function game(inputWord) {
  if(!chkInputValid(inputWord)) return;
  nowSession.submitAnswer(inputWord);
  makeTable();

  if(nowSession.isGameEnd()) {
    disableInput(true);
    toggleModal(nowSession);
  }
}

function chkInputValid(inputWord) {
  if(inputWord.length < CONSTANTS.WORD_LEN) {
    makeToast(`단어 길이는 ${CONSTANTS.WORD_LEN}글자여야 합니다`)
    return false;
  }
  if(!wordDict.includes(inputWord)) {
    makeToast("사전에 있는 단어여야 합니다");
    return false;
  }

  return true;
}

function makeTable() {
  document.getElementById("wordleTable").innerHTML = nowSession.getWordleTableHTML();
}

function disableInput(status) {
  document.getElementById("wordInput").disabled = status;
}
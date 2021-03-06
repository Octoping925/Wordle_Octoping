const successTitleHTML = "<h2 style='color: blue'>SUCCESS</h2>";
const failTitleHTML = "<h2 style='color: red'>FAIL</h2>";

export function toggleModal(session) {
  const body = document.querySelector('body');
  const modal = document.getElementById("resultModal");

  setModalData(session);

  modal.classList.toggle('show');
  if (modal.classList.contains('show')) {
    body.style.overflow = 'hidden';
  }
}

export function makeToast(message) {
  const toast = document.getElementById("toast");
  const toastTime = 1500;
  toast.classList.add("reveal");
  toast.innerText = message;

  setTimeout(() => toast.classList.remove("reveal"), toastTime);
}

function setModalData(session) {
  document.getElementById("resultModalsuccessStatus").innerHTML = session.isWin() ? successTitleHTML : failTitleHTML;
  document.getElementById("resultModalBodyAnswer").innerText = session.getAnswer();
  document.getElementById("resultModalBodyTryCount").innerText = session.getSubmitCnt();
}


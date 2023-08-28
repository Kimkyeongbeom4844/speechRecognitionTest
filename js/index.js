const startButton = document.querySelector(".startButton");
const endButton = document.querySelector(".endButton");
const speachText = document.querySelector(".speachText");
let errorMessage = "";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "ko-KR";

const onClickStartButton = () => {
  console.log("시작");
  startButton.disabled = true;
  endButton.disabled = false;
  recognition.start();
};

const onClickEndButton = () => {
  console.log("끝");
  startButton.disabled = false;
  endButton.disabled = true;
  recognition.stop();
};

recognition.onend = () => {
  if (startButton.disabled === true && errorMessage !== "not-allowed") {
    console.log("재시작");
    recognition.start();
  }
};

recognition.onerror = (e) => {
  errorMessage = e.error;
  console.log("에러 : ", errorMessage);
  switch (errorMessage) {
    case "not-allowed":
      alert("마이크 없음");
      break;
  }
};

recognition.onresult = (e) => {
  const transcript = e.results[0][0].transcript;
  speachText.innerText = transcript;
};

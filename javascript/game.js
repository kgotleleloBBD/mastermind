let level = 1;
let secretCode = [];
let codeLength = 4; // Initial code length
let baseTimeLimit = 60; // Base time limit in seconds for each level
let timeLimit = baseTimeLimit;
let muted = false;
const instruction = document.getElementsByClassName("sub-instruction");
const gameOverPopup = document.getElementById("gameOverPopup");
const howToPopup = document.getElementById("how-to-play");
const navigateHome = document.getElementsByClassName('home_btn');
const howToBtn = document.getElementsByClassName('icon-btn');
const mute = document.getElementById('mute-button');
const unmute = document.getElementById('unmute-button');
const music = document.getElementById('music');

let countdownInterval;

function startGame() {
  gameOverPopup.style.display = "none";
  howToPopup.style.display = "none";
  level = 1;
  timeLimit = baseTimeLimit;
  startLevel();
}

function startLevel() {
  secretCode = generateSecretCode(codeLength);
  document.getElementById("level").textContent = level;
  instruction[0].textContent = "Enter your guess";
  startCountdown();
}

function startCountdown() {
  let timeLeft = timeLimit;
  let isMinuteMode = true;
  updateTimerDisplay(timeLeft, isMinuteMode);


  countdownInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      showGameOverPopup();
    } else {
        if (isMinuteMode && timeLeft <= 60) {
            isMinuteMode = false;
          }
        updateTimerDisplay(timeLeft, isMinuteMode);
    }
  }, 1000);
}

function updateTimerDisplay(timeLeft, isMinuteMode) {

    let secondsDisplay = document.getElementById("seconds");
    let minutesDisplay = document.getElementById("minutes");

    if (isMinuteMode) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        secondsDisplay.innerHTML = seconds;
        minutesDisplay.innerHTML = minutes;
      } else {
        secondsDisplay.innerHTML = timeLeft;
        minutesDisplay.innerHTML = 0;
      }

  }

function showGameOverPopup() {
  clearInterval(countdownInterval);
  gameOverPopup.style.display = "block";
}

function restartGame() {
  gameOverPopup.style.display = "none";
  document.getElementById('guess-input').value = '';
  startGame();
}

function generateSecretCode(length) {
  const code = [];
  for (let i = 0; i < length; i++) {
    code.push(Math.floor(Math.random() * 10));
  }
  return code;
}

function checkGuess() {
  const guessInput = document.querySelector('.guess-input');
  const guess = guessInput.value.trim();

  if (guess.length !== codeLength || !/^\d+$/.test(guess)) {
    instruction[0].textContent = `Invalid guess! Please enter a ${codeLength}-digit code.`;
    document.getElementById('guess-input').value = '';
    return;
  }

  const guessArray = guess.split("").map(Number);

  let correctPositionAndValue = 0;
  let correctValue = 0;

  for (let i = 0; i < codeLength; i++) {
    if (guessArray[i] === secretCode[i]) {
      correctPositionAndValue++;
    } else if (secretCode.includes(guessArray[i])) {
      correctValue++;
    }
  }

  if (correctPositionAndValue === codeLength) {
    clearInterval(countdownInterval);
    instruction[0].textContent = `Congratulations! You cracked the secret code. Level ${level + 1} will have a longer code.`;
    level++;
    codeLength++; // Increase code length for the next level
    timeLimit += 30; // Increase time limit for the next level
    setTimeout(startLevel, 1000);
    document.getElementById('guess-input').value = '';
  } else {
    instruction[0].textContent = `Correct position and value: ${correctPositionAndValue}, Correct value but wrong position: ${correctValue}`;
  }

  
}

function closePopup() {
  if (gameOverPopup.style.display == "block") {
    gameOverPopup.style.display = "none";
    howToPopup.style.display = "none";
    window.location.href = 'home.html';
  }
  gameOverPopup.style.display = "none";
  howToPopup.style.display = "none";
}

function mudeAudio() {
  muted = true;
  music.pause();
}

function unmuteAudio() {
  muted = false;
  music.play();
}

navigateHome[0].addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'home.html';
});

howToBtn[2].addEventListener('click', (e) => {
  e.preventDefault();
  howToPopup.style.display = "block";
});

mute.addEventListener("click", mudeAudio);
unmute.addEventListener("click", unmuteAudio);

// Start the game when the page loads
startGame();
addEventListener("DOMContentLoaded", (event) => { unmuteAudio() });
onDOMContentLoaded = (event) => { unmuteAudio() };

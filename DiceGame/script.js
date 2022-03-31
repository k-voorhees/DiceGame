'use strict';

// grab the elements that we will need to use later
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const p1CurrentScore = document.querySelector('#current--0');
const p2CurrentScore = document.querySelector('#current--1');

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// global variables
let currentScore = 0;
let p1IsActive = true; // boolean to check who is active player
let p1TotalScore = 0;
let p2TotalScore = 0;

// changes the image of the dice after the roll
const updateDiceImg = diceNumber => {
  switch (diceNumber) {
    case 1:
      diceEl.src = `dice-1.png`;
      break;
    case 2:
      diceEl.src = `dice-2.png`;
      break;
    case 3:
      diceEl.src = `dice-3.png`;
      break;
    case 4:
      diceEl.src = `dice-4.png`;
      break;
    case 5:
      diceEl.src = `dice-5.png`;
      break;
    case 6:
      diceEl.src = `dice-6.png`;
      break;
  }
};

// ** BUTTON FUNCTIONS **
// roll dice button
const rollDice = () => {
  // rng roll then pass that number through update function
  const num = Math.floor(Math.random() * 6) + 1;
  updateDiceImg(num); // update the dice image based on the num rolled
  diceEl.classList.remove('hidden'); // show the image
  // logic to update current score and decide if turns swap
  if (num > 1) {
    currentScore += num;
  } else if (num === 1) {
    loseTurn();
  }
  updateCurrentScore();
};
// new game button
const newGame = () => {
  // clear current score and total score
  // hide dice image
  diceEl.classList.add('hidden');
  // resets all scores and displays
  currentScore = 0;
  p1CurrentScore.textContent = 0;
  p2CurrentScore.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  p1TotalScore = 0;
  p2TotalScore = 0;
  //sets player 1 as the active player
  if (!p1IsActive) {
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
    p1IsActive = true;
  }
  // displays the game buttons if starting a new game
  rollDiceBtn.classList.remove('hidden');
  holdBtn.classList.remove('hidden');
};
// hold button function
const holdScore = () => {
  // add current score to total score.
  // clear current score
  // swap players
  updateTotalScore();
  updateCurrentScore();
  changePlayer();
};

// lose turn function
const loseTurn = () => {
  // if 1 is rolled, set current score to 0
  currentScore = 0;
  updateCurrentScore();
  // switch to next player
  changePlayer();
};
const changePlayer = () => {
  // looking for the active class- if its there, remove it, and set it to the other player
  if (player1.classList.contains('player--active')) {
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
    p1IsActive = false;
  } else if (player2.classList.contains('player--active')) {
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
    p1IsActive = true;
  }
};
const updateCurrentScore = () => {
  // if p1 is playing, update their current score, if p2 is playing, update theirs
  if (p1IsActive) {
    p1CurrentScore.textContent = currentScore;
  } else if (!p1IsActive) {
    p2CurrentScore.textContent = currentScore;
  }
};
const updateTotalScore = () => {
  if (p1IsActive) {
    score0El.textContent = Number(score0El.textContent) + currentScore;
    p1TotalScore += currentScore;
  } else if (!p1IsActive) {
    score1El.textContent = Number(score1El.textContent) + currentScore;
    p2TotalScore += currentScore;
  }
  currentScore = 0;
  checkGameWinner();
};
const checkGameWinner = () => {
  if (p1TotalScore >= 100) {
    score0El.textContent = 'WINNER!!!';
    handleEndGame();
  }
  if (p2TotalScore >= 100) {
    score1El.textContent = 'WINNER!!!';
    handleEndGame();
  }
};
const handleEndGame = () => {
  diceEl.classList.add('hidden');
  rollDiceBtn.classList.add('hidden');
  holdBtn.classList.add('hidden');
};

// handle rules modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  // console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// end rules modal

holdBtn.addEventListener('click', holdScore);
rollDiceBtn.addEventListener('click', rollDice);
newGameBtn.addEventListener('click', newGame);

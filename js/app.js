/* VARIABLES */

const deck = document.querySelector(".deck");
const movesNum = document.querySelector(".moves");
const timer = document.querySelector(".timer");
const createStars = document.querySelector(".stars");
const popUp = document.querySelector(".popup");
const cards = [ "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb",
                "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"
              ];
let movesCounter = "";
let openCards = [];
let matchesCards = [];
let countTime = "";
let timerSeconds = "";
let timerMinutes = "";

/* SETUP GAME FUNCTION */

// shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// generate HTML for deck and shuffle cards
function initGame() {
  shuffle(cards).forEach(function(card) {
    deck.insertAdjacentHTML("afterbegin",`<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`);
  });
  createThreeStars();
  counterZero();
  resetTimer();
  eventListener();
}

// initialize game
initGame();

// create stars for rating
function createThreeStars() {
  createStars.innerHTML = `<li class="one-star"><i class="fa fa-star"></i></li>
                           <li class="two-stars"><i class="fa fa-star"></i></li>
                           <li class="three-stars"><i class="fa fa-star"></i></li>`
}

// start timer
function startTimer() {
  timer.innerHTML = `in ${timerMinutes}min ${timerSeconds}sec`;
  timerSeconds++;
  if (timerSeconds === 60) {
    timerMinutes++;
    timerSeconds = 0;
  }
}

/* EVENT LISTENER */

// add event listener
function eventListener() {
  const clickCard = document.querySelectorAll(".card");
  // create click on card as event to listent to
  clickCard.forEach(function(card) {
    card.addEventListener("click", displaySymbol);
  });
  restartGame();
}

/* INGAME */

// show card symbol
function displaySymbol(event) {
  if (countTime === 0) {
    countTime = setInterval(startTimer, 1000);
  }
  const card = event.currentTarget;
  if (openCards.length < 2 && !card.classList.contains("show") && !card.classList.contains("open") && !card.classList.contains("match")) {
    card.classList.add("open", "show");
    // add card to open cards list
    openCards.push(card);
  }
  checkMatch();
}

// check if the two cards match and add them to list of matched cards
function checkMatch() {
  if (openCards.length === 2) {
  addMoveCounter();
  removeStarRating();
    if (openCards[0].dataset.card === openCards[1].dataset.card) {
      openCards[0].classList.add("match");
      openCards[1].classList.add("match");
      matchesCards.push(openCards[0].dataset.card, openCards[1].dataset.card);
      gameWon();
      openCards = [];
    } else {
      noMatch();
      }
    }
}

// check if two cards do not match remove cards from list of open cards
function noMatch() {
  setTimeout(function() {
    openCards.forEach(function(card) {
      card.classList.remove("show", "open");
    });
    openCards = [];
  }, 700);
}

// add move to counter
function addMoveCounter() {
  movesCounter++;
    if (movesCounter === 1) {
        movesNum.innerHTML = `${movesCounter} Move`;
    } else {
      movesNum.innerHTML = `${movesCounter} Moves`;
    }
}

// remove star from rating
function removeStarRating() {
  if (movesCounter === 8) {
    const starRatingThree = document.querySelector(".three-stars");
      starRatingThree.remove();
  }
  else if (movesCounter === 14) {
    const starRatingTwo = document.querySelector(".two-stars");
      starRatingTwo.remove();
  }
}

/* RESET & RESTART */

// reset counter to 0
function counterZero() {
  movesCounter = 0;
  movesNum.innerHTML = `${movesCounter} Moves`;
}

// reset timer
function resetTimer() {
  timerSeconds = 0;
  timerMinutes = 0;
  countTime = 0;
  timer.innerHTML = `in ${timerMinutes}min ${timerSeconds}sec`;
}

// restart game
function restartGame() {
  const restartGame = document.querySelector(".restart");
  restartGame.addEventListener("click", function(event) {
    deck.innerHTML = "";
    clearInterval(countTime);
    initGame();
  });
}

/* GAME END */

// if all cards are matches, game is won
function gameWon() {
  if (matchesCards.length === 16) {
    //stop timer
    clearInterval(countTime);
    popUpWindow();
  }
}

// show winning notification pop up
function popUpWindow() {
  popUp.classList.add("show");
  loadScores();
  playAgain();
}

// load scores to pop up
function loadScores() {
  const popUpText = document.querySelector(".popup-text");
  popUpText.innerHTML = `Congratulations! You completed the game in ${timer.outerHTML}.<br>You needed ${movesNum.outerHTML}.<br>Resulting in a final star score of ${createStars.outerHTML}!`;
}

// close popup and restart game
function playAgain() {
  const leavePopUp = document.querySelector(".leave");
  leavePopUp.addEventListener("click", function() {
    popUp.classList.remove("show");
    deck.innerHTML = "";
    clearInterval(countTime);
    initGame();
  });
}

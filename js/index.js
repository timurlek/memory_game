const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;

const flipCard = e => {
  if (boardLocked) return;

  const target = e.target.parentElement;

  if (target === firstCard) return;

  target.classList.add("flip");

  if (!hasFlippedCard) {
    // First click
    hasFlippedCard = true;
    firstCard = target;
  } else {
    // Second click

    hasFlippedCard = false;
    secondCard = target;

    // Check for match
    checkForMatch();
  }
};

const checkForMatch = () => {
  const isEqual = firstCard.dataset.framework === secondCard.dataset.framework;

  isEqual ? disableCards() : unflipCards();
};

const disableCards = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
};

const unflipCards = () => {
  boardLocked = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
};

const resetBoard = () => {
  // SPREAD
  //   [hasFlippedCard, boardLocked] = [false, false];
  //   [firstCard, secondCard] = [null, null];

  // Double insertation
  hasFlippedCard = boardLocked = false;
  firstCard = secondCard = false;
};

cards.forEach(card => {
  //Add Event Listener to every card
  card.addEventListener("click", flipCard);

  const randomIndex = Math.floor(Math.random() * cards.length);
  card.style.order = randomIndex;
});

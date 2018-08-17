// Audio for when a match is completed.
const matchedSound = new Audio("sounds/matched.wav");

// Get all cards on the board.
const allCards = document.querySelectorAll(".matching-card");

let hasFlippedCard = false;

/* If user tries to flip another set of cards before the first set of cards is flipped,
logic is broken. Lock the board when 2 cards chosen, unlock board after matching logic. */
let lockBoard = false;

let firstCard, secondCard;

function flipCard() {
	if(lockBoard) {
		return;
	}

	if(this === firstCard) {
		/* If you click on the first card, then you click on the same card,
		it will reflip the card. */
		this.classList.remove("flip");
		resetBoard();
		return;
	}

	// 'this' refers to the the element that caused the event.
	this.classList.add("flip");

	if(!hasFlippedCard) {
		/* First time the player flipped the card. */
		hasFlippedCard = true;
		firstCard = this;

		return;
	}
	/* Second time the player flipped the card. */
	secondCard = this;

	checkMatch();
}

function checkMatch() {
	/* Check to see if the cards matched. */
	if(firstCard.dataset.framework === secondCard.dataset.framework) {
		/* If the cards matched! */
		matchedSound.play();
		disableCards();
	} else {
		/* If the cards did not match! */
		reflipCards();
	}

	/*
	Practiced using tenary operator.
	condition ? statement1 : statement2;

	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

	isMatch ? disableCards() : unflipCards();
	*/
}

function disableCards() {
	firstCard.removeEventListener("click", flipCard);
	secondCard.removeEventListener("click", flipCard);

	resetBoard();
}

function reflipCards() {
	lockBoard = true;

	setTimeout(() => {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");

		resetBoard();
	}, 750);
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

/* Wrap this function so it is immediately evoked after itss definition. */
(function shuffle() {
	allCards.forEach(card => {
		/* Math.random returns number between 0 and 1 excluding 1. Want a number
		between 0 to 11, we multiply that random number by 12. Then use .floor() method
		to get an integer. */
		let randomPosition = Math.floor(Math.random() * 12);
		card.style.order = randomPosition;
	})
})();

// For each card, whenever it's clicked, execute the function: flipCard()
allCards.forEach(card => card.addEventListener("click", flipCard));

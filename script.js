// Get all cards on the board.
const allCards = document.querySelectorAll(".matching-card");

let hasFlippedCard = false;

/* If user tries to flip another set of cards before the first set of cards is flipped,
logic is broken. Lock the board when 2 cards chosen, unlock board after matching logic. */
let lockBoard = false;

let firstCard, secondCard;

function flipCard() {
	console.log(firstCard, secondCard);

	if(lockBoard) {
		return;
	}

	if(this === firstCard) {
		/* If you click on the first card, then you click on the same card, it will not register
		that same card as the second card. */
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

// For each card, whenever it's clicked, execute the function: flipCard()
allCards.forEach(card => card.addEventListener("click", flipCard));
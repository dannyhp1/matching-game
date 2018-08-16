// Get all cards on the board.
const allCards = document.querySelectorAll(".matching-card");

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
	// 'this' refers to the the element that caused the event.
	this.classList.add("flip");

	if(!hasFlippedCard) {
		/* First time the player flipped the card. */
		hasFlippedCard = true;
		firstCard = this;

		return;
	} 
	/* Second time the player flipped the card. */
	hasFlippedCard = false;
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
}

function reflipCards() {
	setTimeout(() => {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");
	}, 750);
}

// For each card, whenever it's clicked, execute the function: flipCard()
allCards.forEach(card => card.addEventListener("click", flipCard));
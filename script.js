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

		console.log([hasFlippedCard, firstCard]);
	} else {
		/* Second time the player flipped the card. */
		hasFlippedCard = false;
		secondCard = this;

		/* Check to see if the cards matched. */
		if(firstCard.dataset.framework === secondCard.dataset.framework) {
			firstCard.removeEventListener("click", flipCard);
			secondCard.removeEventListener("click", flipCard);
		}
	}
}

// For each card, whenever it's clicked, execute the function: flipCard()
allCards.forEach(card => card.addEventListener("click", flipCard));
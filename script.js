// Get all cards on the board.
const allCards = document.querySelectorAll(".matching-card");

function flipCard() {
	// 'this' refers to the the element that caused the event.
	this.classList.toggle("flip");
}

// For each card, whenever it's clicked, execute the function: flipCard()
allCards.forEach(card => card.addEventListener("click", flipCard));
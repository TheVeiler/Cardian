import { PseudoCard } from "@lib";

const suitInitials = {
	"♦": "d",
	"♠": "s",
	"♥": "h",
	"♣": "c",
};

/**
 * A standard 52-card deck of French-suited playing cards (Ace to King, for each of the four suits: clubs, diamonds, hearts and spades).
 */
export default (): Array<PseudoCard> => {
	const ranks = new Set(["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"]);
	const suits = new Set(["♦", "♠", "♥", "♣"]);

	const pseudoCards: Array<PseudoCard> = [];

	for (const suit of suits) {
		for (const rank of ranks) {
			pseudoCards.push({
				name: `${rank}${suit}`,
				assets: {
					front: `./assets/${rank.toLowerCase()}${suitInitials[suit]}.svg`,
					back: "./assets/back_blue.svg",
				},
			});
		}
	}

	return pseudoCards;
};

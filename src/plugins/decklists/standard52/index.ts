import type { CardValue, CardSuit } from "./index.d";
import { Decklist, PseudoCard } from "@lib";

const suitInitials = {
	"♦": "d",
	"♠": "s",
	"♥": "h",
	"♣": "c",
};

/**
 * A standard 52-card deck of French-suited playing cards (Ace to King, for each of the four suits: clubs, diamonds, hearts and spades).
 */
export default (): Decklist => {
	const setValues: Set<CardValue> = new Set([
		"A",
		"K",
		"Q",
		"J",
		"10",
		"9",
		"8",
		"7",
		"6",
		"5",
		"4",
		"3",
		"2",
	]);
	const setSuits: Set<CardSuit> = new Set(["♦", "♠", "♥", "♣"]);

	const pseudoCards: Array<PseudoCard> = [];

	for (const suit of setSuits) {
		for (const value of setValues) {
			pseudoCards.push({
				name: `${value}${suit}`,
				assets: {
					front: `./assets/${value.toLowerCase()}${suitInitials[suit]}.svg`,
					back: "./assets/back_blue.svg",
				},
			});
		}
	}

	return new Decklist(...pseudoCards);
};

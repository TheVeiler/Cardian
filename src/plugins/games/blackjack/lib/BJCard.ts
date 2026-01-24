import { type PseudoCard, Card } from "@lib";
import { BJDecklist } from "./BJDecklist";

type CardRank = "A" | "K" | "Q" | "J" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2";
type CardSuit = "♣" | "♦" | "♥" | "♠";
type CardName = `${CardRank}${CardSuit}`;

export class BJCard extends Card {
	#name: CardName;
	get name() {
		return this.#name;
	}

	get rank() {
		return this.name.slice(0, -1) as CardRank;
	}
	get suit() {
		return this.name.slice(-1) as CardSuit;
	}

	constructor(decklist: BJDecklist, pseudoCard: PseudoCard) {
		super(decklist, pseudoCard);
	}
}

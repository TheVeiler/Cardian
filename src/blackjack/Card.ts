import type { PseudoCard, CardRank, CardScore } from "/types";
import { Card } from "/common";
import { List } from "/blackjack";

class BJCard extends Card {
	#rank: CardRank;
	get rank() {
		return this.#rank;
	}

	#value: CardScore;
	get value() {
		return this.#value;
	}

	constructor(decklist: List, pseudoCard: PseudoCard) {
		super(decklist, pseudoCard);

		this.#rank = super.name.slice(0, -1) as CardRank;

		switch (this.rank) {
			case "A":
				this.#value = 1;
				break;
			case "J":
			case "Q":
			case "K":
				this.#value = 10;
				break;
			default:
				this.#value = Number(this.rank) as CardScore;
				break;
		}
	}
}

export { BJCard as Card };

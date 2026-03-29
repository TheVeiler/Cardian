import type { CardRank, CardSuit, PseudoCard } from "/types";
import { Card } from "/common";
import { List } from "/holdem";

class HECard extends Card {
	#rank: CardRank;
	get rank() {
		return this.#rank;
	}

	#suit: CardSuit;
	get suit() {
		return this.#suit;
	}

	constructor(decklist: List, pseudoCard: PseudoCard) {
		super(decklist, pseudoCard);

		this.#rank = super.name.slice(0, -1) as CardRank;
		this.#suit = super.name.at(-1) as CardSuit;
	}
}

export { HECard as Card };

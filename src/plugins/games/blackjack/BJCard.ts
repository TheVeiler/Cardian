import type { PseudoCard } from "../../../lib";
import { Card, Decklist } from "../../..";

export class BJCard extends Card {
	get value() {
		const rank = super.name.slice(0, -1);

		switch (rank) {
			case "A":
				return 1;
			case "2":
				return 2;
			case "3":
				return 3;
			case "4":
				return 4;
			case "5":
				return 5;
			case "6":
				return 6;
			case "7":
				return 7;
			case "8":
				return 8;
			case "9":
				return 9;
			case "10":
			case "J":
			case "Q":
			case "K":
				return 10;
			default:
				return 0;
		}
	}

	constructor(decklist: Decklist, pseudoCard: PseudoCard) {
		super(decklist, pseudoCard);
	}
}

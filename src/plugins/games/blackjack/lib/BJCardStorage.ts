import { CardStorage } from "@lib";
import { type BJCard, type Player } from "./";

export class BJCardStorage extends CardStorage {
	owner: Player;

	#content: Array<BJCard>;
	get content() {
		return this.#content;
	}

	get score() {
		let score = 0;
		let containsAce = false;

		for (const card of this.content) {
			switch (card.rank) {
				case "A":
					containsAce = true;
					score += 11;
					break;
				case "K":
				case "Q":
				case "J":
					score += 10;
					break;
				default:
					score += Number(card.rank);
					break;
			}
		}

		if (score > 21 && containsAce) {
			score -= 10;
			containsAce = false;
		}

		return score;
	}
    
	isPlaying = false;

	constructor(name: string, player: Player) {
		super(`${player.name}:${name}`);

		this.owner = player;
	}
}

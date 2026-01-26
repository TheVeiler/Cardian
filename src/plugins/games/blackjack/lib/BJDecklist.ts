import { Decklist, PseudoCard } from "lib";
import { BJCardStorage } from "./";

export class BJDecklist extends Decklist {
	#defaultStorage: BJCardStorage;
	get defaultStorage() {
		return this.#defaultStorage;
	}
	set defaultStorage(storage: BJCardStorage) {
		this.#defaultStorage = storage;

		for (const card of this) {
			card.moveTo(storage);
		}
	}

	constructor(pseudoCards: Array<PseudoCard>) {
		super(pseudoCards);
		console.log(this);
		this.#defaultStorage = new BJCardStorage("deck", null);
		this.add(...pseudoCards);
	}
}

import type * as types from "/types";
import * as common from "/common";
import * as blackjack from "/blackjack";
import * as holdem from "/holdem";

import * as decklists from "/decklists";

export interface IComponents {
	Card: Card;
	Box: Box;
	List: List;
}
export type Card = typeof common.Card | typeof blackjack.Card | typeof holdem.Card;
export type Box = typeof common.Box | typeof blackjack.Box | typeof holdem.Box;
export type List = typeof common.List | typeof blackjack.List | typeof holdem.List;

class Cardian {
	static singleton = false;

	#components: IComponents;
	get Card() {
		return this.#components.Card;
	}
	get Box() {
		return this.#components.Box;
	}
	get List() {
		return this.#components.List;
	}

	#standard52: types.PseudoCard[];
	get standard52() {
		return this.#standard52;
	}
	#standard52_sextet: types.PseudoCard[];
	get standard52_sextet() {
		return this.#standard52_sextet;
	}

	constructor() {
		if (Cardian.singleton) {
			throw new Error("Cardian class must be used as a singleton and is already instantiated.");
		}
		Cardian.singleton = true;

		this.#components = common;

		this.#standard52 = decklists.standard52;
		this.#standard52_sextet = decklists.standard52_sextet;
	}

	setMode(mode: types.Mode = "none"): void {
		switch (mode) {
			case "none":
				this.#components = common;
				break;

			case "blackjack":
				this.#components = blackjack;
				break;

			case "holdem":
				this.#components = holdem;
				break;
		}
	}
}

export default new Cardian();

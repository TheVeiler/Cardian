import { CardStorage } from "lib";
import { BJCardStorage, Game } from "./";

export class Player {
	static #list: Array<Player> = [];

	static #add(player: Player) {
		Player.#list.push(player);
	}

	static all() {
		return Player.#list;
	}
	static getById(id: number): Player {
		return Player.#list.find((player) => player.id === id);
	}
	static getByName(name: string): Player {
		return Player.#list.find((player) => player.name === name);
	}

	#id: number;
	get id() {
		return this.#id;
	}

	name: string;
	game: Game;

	hands: Array<BJCardStorage> = [];
	get hand() {
		return this.hands[0];
	}
	get splits() {
		return this.hands.slice(1);
	}

	get isPlaying() {
		return this.game.currentHand.owner.id === this.id;
	}

	constructor(name: string, game: Game) {
		this.name = name;
		this.game = game;
		this.hands.push(new BJCardStorage("hand", this));

		this.#id = Player.#list.length + 1;
		Player.#add(this);
	}

	drawFrom(storage: BJCardStorage | CardStorage, number: number = 1) {
		return this.hand.drawFrom(storage, number);
	}

	hit() {
		if (!this.isPlaying) {
			throw new TurnError(this);
		}

		return this;
	}

	stand() {
		if (!this.isPlaying) {
			throw new TurnError(this);
		}

		this.game.next();

		return this;
	}

	double() {
		if (!this.isPlaying) {
			throw new TurnError(this);
		}

		return this;
	}

	split() {
		if (!this.isPlaying) {
			throw new TurnError(this);
		}

		return this;
	}
}

class TurnError extends Error {
	constructor(player: Player) {
		super();
		this.message = `${player.name} tries to play while it isn't their turn.`;
	}
}

class IllegalSplit extends Error {
	constructor(player: Player, hand: BJCardStorage) {
		super();
		this.message = `${player.name} tries to split with: ${hand}.`;
	}
}

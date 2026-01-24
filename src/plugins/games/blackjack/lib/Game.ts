import { Dealer, Player, BJCardStorage, BJDecklist } from "./";
import { decklists } from "@plugins";

export class Game {
	#decklist: BJDecklist;
	deck: BJCardStorage;
	dealer: Dealer;
	players: Array<Player> = [];

	get hands() {
		return this.players.map((player) => player.hands).flat();
	}

	#currentHandIndex: number;
	get currentHand() {
		return this.hands[this.#currentHandIndex];
	}

	constructor() {
		this.#decklist = new BJDecklist(decklists.standard52());
		this.deck = this.#decklist.defaultStorage;
		this.dealer = new Dealer(this);
	}

	addPlayers(...names: Array<string>) {
		for (const name of names) {
			this.players.push(new Player(name, this));
		}

		return this;
	}

	removePlayers(...names: Array<string>) {
		for (const name of names) {
			const index = this.players.findIndex((player) => player.name === name);

			if (index > -1) {
				this.players.splice(index, 1);
			}
		}

		return this;
	}

	start() {
		if (this.players.length === 0) {
			throw new Error("You need at least one Player to start the game.");
		}

		for (let i = 0; i < 2; i++) {
			for (const player of this.players) {
				player.drawFrom(this.deck);
			}
			this.dealer.drawFrom(this.deck);
		}

		this.#currentHandIndex = 0;

		console.log(`It is your turn, ${this.currentHand.owner}.`);

		this.waitForPlayer();

		return this;
	}

	waitForPlayer() {
		console.log(
			`What do you do with: ${this.currentHand.content.map((card) => card.toString()).join("-")} ?`,
		);

		return this;
	}

	next() {
		this.#currentHandIndex++;

		if (this.#currentHandIndex < this.hands.length) {
			return this;
		}

		this.dealerTurn();

		return this;
	}

	dealerTurn() {
		return this;
	}

	reset() {
		this.#decklist.reset();
		this.players.splice(0, this.players.length);

		return this;
	}
}

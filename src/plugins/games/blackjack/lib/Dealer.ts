import { Game, Player } from "./";

export class Dealer extends Player {
	constructor(game: Game) {
		super("Dealer", game);

		delete this.double;
		delete this.split;
	}
}

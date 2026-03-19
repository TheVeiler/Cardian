import { Decklist } from "../../..";
import type { PseudoCard } from "../../../lib";

export class BJDecklist extends Decklist {
	constructor(pseudoCards: Array<PseudoCard>) {
		super(pseudoCards);
	}
}

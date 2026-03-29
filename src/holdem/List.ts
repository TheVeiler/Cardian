import type { PseudoCard } from "/types";
import { List } from "/common";

class HEList extends List {
	constructor(pseudoCards: Array<PseudoCard>) {
		super(pseudoCards);
	}
}

export { HEList as List };

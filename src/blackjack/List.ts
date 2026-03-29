import type { PseudoCard } from "/types";
import { List } from "/common";

class BJList extends List {
	constructor(pseudoCards: Array<PseudoCard>) {
		super(pseudoCards);
	}
}

export { BJList as List };

import { CardStorage } from "../../..";
import { BJCard } from "./BJCard";

export class BJCardStorage extends CardStorage {
	get total(): number {
		return super.content.reduce((card: BJCard, value: number) => value + card.value, 0);
	}

	constructor(name: string) {
		super(name);
	}
}

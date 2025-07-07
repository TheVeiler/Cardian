import type { CardList, CardCollectionOptions } from "./"
import { CardCollection } from "./"

export class Deck extends CardCollection {
	constructor(cardList: CardList, options?: CardCollectionOptions) {
		super(options)

		for (const card of cardList) {
			this.push(card)
		}
	}
}

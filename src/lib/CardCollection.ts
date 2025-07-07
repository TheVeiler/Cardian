import type { Card } from "./"

export interface CardCollectionOptions {
	maxSize?: number
	canBeShuffled?: boolean
	// canBeSeenBy?: 'none' | People[] | '*'
}

export abstract class CardCollection extends Array<Card> {
	constructor(options?: CardCollectionOptions) {
		super()

		if (options) {
			console.log(options)
		}
	}

	shuffle() {
		const initialContent = [...this.values()]

		for (let i = 0; initialContent.length; i++) {
			const randomIndex = Math.floor(initialContent.length * Math.random())
			this[i] = initialContent.splice(randomIndex, 1)[0]
		}
	}

	draw(nCards: number, fromCollection: CardCollection) {
		if (nCards < 0 || nCards % 1 > 0) {
			throw new TypeError(
				`CardCollection.draw(nCards, fromCollection): nCards: Expected a positive integer, received: ${nCards}`,
			)
		}
		if (!(fromCollection instanceof CardCollection)) {
			throw new TypeError(
				`CardCollection.draw(nCards, fromCollection): fromCollection: Expected a CardCollection instance, received: ${fromCollection}`,
			)
		}

		for (let i = 0; i < nCards; i++) {
			this.push(fromCollection.shift())
		}
	}
}

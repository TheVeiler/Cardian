import type { CardId } from "./"
import { Card } from "./"

export interface PseudoCard {
	id: CardId
	nCopies?: number
}

export class CardList extends Array<Card> {
	constructor(...CardListElement: Array<CardId | PseudoCard>) {
		super()

		try {
			for (const element of CardListElement) {
				if (typeof element === "string") {
					this.addCardFromCardId(element)
				} else if (element.id) {
					this.addCardFromPseudoCard(element)
				} else {
					throw new TypeError(`'${element}' is not a valid CardListElement`)
				}
			}
		} catch (err) {
			console.error(err)
		}
	}

	private addCardFromCardId(cardId: CardId) {
		this.push(new Card(cardId))
	}
	private addCardFromPseudoCard(pseudoCard: PseudoCard) {
		const nCopies = pseudoCard.nCopies ?? 1

		for (let i = 0; i < nCopies; i++) {
			this.push(new Card(pseudoCard.id))
		}
	}
}

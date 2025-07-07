export type CardValue = "A" | "K" | "Q" | "J" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2"
export type CardSuit = "♣" | "♦" | "♥" | "♠"
export type CardId = `${CardValue}${CardSuit}`

export class Card {
	readonly id: CardId

	get value() {
		return this.id.slice(0, -1) as CardValue
	}
	get suit() {
		return this.id.slice(-1) as CardSuit
	}

	constructor(id: CardId) {
		Card.checkId(id)

		this.id = id
	}

	private static checkId(possibleId: CardId) {
		const setValues = new Set(["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"])
		const setSuits = new Set(["♣", "♦", "♥", "♠"])

		const HAS_VALID_VALUE = setValues.has(possibleId.slice(0, -1))
		const HAS_VALID_SUIT = setSuits.has(possibleId.slice(-1))

		if (!HAS_VALID_VALUE || !HAS_VALID_SUIT) {
			throw new TypeError(`'${possibleId}' is not a valid CardId`)
		}
	}
}

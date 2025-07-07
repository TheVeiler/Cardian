import { Deck, Board } from "@lib"
import { standard52 } from "@plugins/decklists"

const deck = new Deck(standard52())

deck.shuffle()

const board = new Board()
board.draw(5, deck)

readBoard(board)

function readBoard(board: Board) {
	console.log(board)

	const arrCards = Array.from(board.values())

	const cardValues = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"].map(
		(value) => ({
			value,
			nCopies: arrCards.filter((card) => card.value === value).length,
		}),
	)
	const cardSuits = ["♦", "♠", "♥", "♣"].map((suit) => ({
		suit,
		nCopies: arrCards.filter((card) => card.suit === suit).length,
	}))

	const VALIDATOR_PAIR = cardValues.filter((cardValue) => cardValue.nCopies === 2).length === 1
	const VALIDATOR_TWO_PAIRS = cardValues.filter((cardValue) => cardValue.nCopies === 2).length === 2
	const VALIDATOR_THREE_KIND =
		cardValues.filter((cardValue) => cardValue.nCopies === 3).length === 1
	const VALIDATOR_STRAIGHT = cardValues.find(
		(_, i, list) =>
			list[i].nCopies === 1 &&
			list[i + 1]?.nCopies === 1 &&
			list[i + 2]?.nCopies === 1 &&
			list[i + 3]?.nCopies === 1 &&
			(list[i + 4]?.nCopies === 1 ||
				(list[i].value === "5" && list.find((cardValue) => cardValue.value === "A").nCopies === 1)),
	)
	const VALIDATOR_FLUSH = cardSuits.filter((cardSuit) => cardSuit.nCopies === 5).length === 1
	const VALIDATOR_FULL_HOUSE =
		cardValues.filter((cardValue) => cardValue.nCopies === 3).length === 1 &&
		cardValues.filter((cardValue) => cardValue.nCopies === 2).length === 1
	const VALIDATOR_FOUR_KIND = cardValues.filter((cardValue) => cardValue.nCopies === 4).length === 1
	const VALIDATOR_STRAIGHT_FLUSH = VALIDATOR_STRAIGHT && VALIDATOR_FLUSH
	const VALIDATOR_ROYAL_FLUSH =
		VALIDATOR_STRAIGHT_FLUSH &&
		cardValues.find((cardValue) => cardValue.value === "A").nCopies === 1 &&
		cardValues.find((cardValue) => cardValue.value === "K").nCopies === 1

	if (VALIDATOR_ROYAL_FLUSH) {
		console.log("Royal Flush")
		return
	}

	if (VALIDATOR_STRAIGHT_FLUSH) {
		const power =
			cardValues.filter((cardValue) => cardValue.nCopies === 1)[0].value === "A" &&
			cardValues.filter((cardValue) => cardValue.nCopies === 1)[1].value === "5"
				? "5"
				: cardValues.find((cardValue) => cardValue.nCopies === 1).value
		console.log("Straight Flush", power)
		return
	}

	if (VALIDATOR_FOUR_KIND) {
		const power = cardValues.find((cardValue) => cardValue.nCopies === 4).value
		console.log("Four of a Kind", power)
		return
	}

	if (VALIDATOR_FULL_HOUSE) {
		const power = `${cardValues.find((cardValue) => cardValue.nCopies === 3).value} - ${cardValues.find((cardValue) => cardValue.nCopies === 2).value}`
		console.log("Full House", power)
		return
	}

	if (VALIDATOR_FLUSH) {
		console.log("Flush")
		return
	}

	if (VALIDATOR_STRAIGHT) {
		const power =
			cardValues.filter((cardValue) => cardValue.nCopies === 1)[0].value === "A" &&
			cardValues.filter((cardValue) => cardValue.nCopies === 1)[1].value === "5"
				? "5"
				: cardValues.find((cardValue) => cardValue.nCopies === 1).value
		console.log("Straight", power)
		return
	}

	if (VALIDATOR_THREE_KIND) {
		const power = cardValues.find((cardValue) => cardValue.nCopies === 3).value
		console.log("Three of a Kind", power)
		return
	}

	if (VALIDATOR_TWO_PAIRS) {
		const power = cardValues
			.filter((cardValue) => cardValue.nCopies === 2)
			.map((cardValue) => cardValue.value)
			.join(" - ")
		console.log("Two Pairs", power)
		return
	}

	if (VALIDATOR_PAIR) {
		const power = cardValues.find((cardValue) => cardValue.nCopies === 2).value
		console.log("Pair", power)
		return
	}

	const power = cardValues.find((cardValue) => cardValue.nCopies === 1).value
	console.log("High Card", power)
	return
}

import type { CardValue, CardSuit } from "@lib"
import { CardList } from "@lib"

export default () => {
	const setValues: Set<CardValue> = new Set([
		"A",
		"K",
		"Q",
		"J",
		"10",
		"9",
		"8",
		"7",
		"6",
		"5",
		"4",
		"3",
		"2",
	])
	const setSuits: Set<CardSuit> = new Set(["♦", "♠", "♥", "♣"])

	const allPossibleCardIds = []
	for (const suit of setSuits) {
		for (const value of setValues) {
			allPossibleCardIds.push(`${value}${suit}`)
		}
	}

	return new CardList(...allPossibleCardIds)
}

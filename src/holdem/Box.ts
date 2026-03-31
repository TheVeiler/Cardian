import { Box } from "/common";
import { Card } from "/holdem";
import { CardRank } from "/types";

const tagValues = ["HIG", "1PA", "2PA", "THR", "STR", "FLU", "FUL", "FOU", "SFL"];
const allRanks = [
	"A",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"J",
	"Q",
	"K",
	"A",
] as CardRank[];

class HEHand {
	#cards: Card[];
	get cards() {
		return this.#cards;
	}

	#score: number;
	get score() {
		return this.#score;
	}

	#identifier: string;
	get identifier() {
		return this.#identifier;
	}

	static highLow: boolean = false;

	#getIdentifier(): string {
		const cardRanks = this.cards.map((card) => card.rank);
		const rankOccurrences: Map<CardRank, number> = new Map();
		for (const rank of cardRanks) {
			rankOccurrences.set(rank, 1 + (rankOccurrences.get(rank) ?? 0));
		}
		const occurrences = [...rankOccurrences.values()];
		const distinctRanks = [...new Set(cardRanks)];

		const F_PAIR = distinctRanks.length === 4 && occurrences.includes(2);
		const F_TWO_PAIRS = distinctRanks.length === 3 && occurrences.includes(2);
		const F_THREE_OF_KIND = distinctRanks.length === 3 && occurrences.includes(3);
		const F_STRAIGHT =
			distinctRanks.length === 5 &&
			allRanks.find(
				(_, i) =>
					i >= 4 &&
					distinctRanks.includes(allRanks[i]) &&
					distinctRanks.includes(allRanks[i - 1]) &&
					distinctRanks.includes(allRanks[i - 2]) &&
					distinctRanks.includes(allRanks[i - 3]) &&
					distinctRanks.includes(allRanks[i - 4]),
			) !== undefined;
		const F_FLUSH = this.cards.every((card) => card.suit === this.cards[0].suit);
		const F_FULL_HOUSE = occurrences.includes(2) && occurrences.includes(3);
		const F_FOUR_OF_KIND = occurrences.includes(4);
		const F_STRAIGHT_FLUSH = F_FLUSH && F_STRAIGHT;
		// ---
		const F_HIGH_CARD =
			!F_PAIR && !F_TWO_PAIRS && !F_THREE_OF_KIND && !F_STRAIGHT && !F_FLUSH && !F_FOUR_OF_KIND;

		const orderedRanks = distinctRanks.sort((a, b) => {
			const nbA = rankOccurrences.get(a);
			const nbB = rankOccurrences.get(b);

			if (nbA !== nbB) {
				return nbB - nbA;
			}

			const lowAce = F_STRAIGHT && distinctRanks.includes("5");
			const sliceIndex = Number(!lowAce);
			const ranks = allRanks.slice(sliceIndex);

			const indexA = ranks.indexOf(a);
			const indexB = ranks.indexOf(b);

			return indexB - indexA;
		});

		const tagList = ["SFL", "FOU", "FUL", "FLU", "STR", "THR", "2PA", "1PA", "HIG"];
		const flagList = [
			F_STRAIGHT_FLUSH,
			F_FOUR_OF_KIND,
			F_FULL_HOUSE,
			F_FLUSH,
			F_STRAIGHT,
			F_THREE_OF_KIND,
			F_TWO_PAIRS,
			F_PAIR,
			F_HIGH_CARD,
		];
		const tag = tagList[flagList.indexOf(true)];

		return `${tag}-${F_STRAIGHT ? orderedRanks[0] : orderedRanks.join("-")}`;
	}

	#getScore(): number {
		const [tag, ...kickers] = this.#identifier.split("-");

		const highScore =
			tagValues.indexOf(tag) * 13 ** 5 +
			kickers
				.map((rank: CardRank, i) => allRanks.slice(1).indexOf(rank) * 13 ** (4 - i))
				.reduce((a, b) => a + b);

		return HEHand.highLow ? -highScore : highScore;
	}

	constructor(cards: Card[]) {
		this.#cards = cards;

		this.#identifier = this.#getIdentifier();
		this.#score = this.#getScore();
	}
}

class HEBox extends Box {
	get allHands(): HEHand[] {
		const hands: HEHand[] = [];

		for (let i1 = 0; i1 < this.size - 4; i1++) {
			for (let i2 = i1 + 1; i2 < this.size - 3; i2++) {
				for (let i3 = i2 + 1; i3 < this.size - 2; i3++) {
					for (let i4 = i3 + 1; i4 < this.size - 1; i4++) {
						for (let i5 = i4 + 1; i5 < this.size; i5++) {
							hands.push(
								new HEHand([
									this.content[i1] as Card,
									this.content[i2] as Card,
									this.content[i3] as Card,
									this.content[i4] as Card,
									this.content[i5] as Card,
								]),
							);
						}
					}
				}
			}
		}

		return hands.sort((a, b) => b.score - a.score);
	}

	get bestHand() {
		return this.allHands[0];
	}

	constructor(name: string) {
		super(name);
	}
}

export { HEBox as Box };

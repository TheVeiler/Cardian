import { Card } from "./";

type Position = "top" | "bottom";

/**
 * A CardStorage is a pile of Cards that can be used to create hands, boards, and discard piles.
 * @constructor
 * @param {string} name - The name of the CardStorage; Be careful as names are not required to be unique
 */
export class CardStorage {
	/**
	 * All the currently existing CardStorages.
	 * @type {Array<CardStorage>}
	 * @private
	 */
	static #list: Array<CardStorage> = [];

	/**
	 * Gets all the currently existing CardStorages.
	 * @returns All the currently existing CardStorages
	 * @public
	 */
	static all() {
		return CardStorage.#list;
	}

	/**
	 * Gets a CardStorage by its name.
	 * @param {string} name - The name of the CardStorage; Be careful as names are not required to be unique
	 * @returns The CardStorage instance, or undefined if name didn't match
	 * @public
	 */
	static getByName(name: string): CardStorage {
		return CardStorage.#list.find((storage) => storage.name === name);
	}

	/**
	 * Adds a new CardStorage to the list of existing ones.
	 * @param {CardStorage} storage - The CardStorage to add
	 * @private
	 */
	static #add(storage: CardStorage) {
		CardStorage.#list.push(storage);
	}

	#name: string;
	/**
	 * The name of a CardStorage. Be careful as names are not required to be unique.
	 * @type {string}
	 * @readonly
	 */
	get name() {
		return this.#name;
	}

	#content: Array<Card> = [];
	/**
	 * All the Cards stored in a CardStorage.
	 * @type {Array<Card>}
	 * @readonly
	 */
	get content() {
		return this.#content;
	}

	/**
	 * The number of Cards stored in a CardStorage.
	 * @type {number}
	 * @readonly
	 */
	get length() {
		return this.content.length;
	}

	/**
	 * The Card stored at the beginning of a CardStorage.
	 * @type {Card}
	 * @readonly
	 */
	get top() {
		return this.content[0];
	}

	/**
	 * The Card stored at the end of a CardStorage.
	 * @type {Card}
	 * @readonly
	 */
	get bottom() {
		return this.content.at(-1);
	}

	constructor(name: string) {
		this.#name = name;

		CardStorage.#add(this);
	}

	/**
	 * Adds Cards to a CardStorage.
	 * @param {Array<Cards>} cards - The Cards to add to the CardStorage
	 * @returns The updated CardStorage
	 * @public
	 */
	add(...cards: Array<Card>): CardStorage;
	/**
	 * Adds Cards to a CardStorage, at the given position.
	 * @param {"top" | "bottom"} position - The position at which to insert the Cards (default: "bottom")
	 * @param {Array<Cards>} cards - The Cards to add
	 * @returns The updated CardStorage
	 * @public
	 */
	add(position: Position, ...cards: Array<Card>): CardStorage;
	add(positionOrfirstCard: Card | Position, ...cards: Array<Card>): CardStorage {
		let position: "bottom" | "top";

		if (positionOrfirstCard instanceof Card) {
			cards.unshift(positionOrfirstCard);
			position = "bottom";
		} else {
			position = positionOrfirstCard;
		}

		const index = position === "top" ? 0 : -1;

		this.#content.splice(index, 0, ...cards);

		return this;
	}

	/**
	 * Removes Cards from a CardStorage by returning them to their default location.
	 * @param {Array<Cards>} cards - The Cards to remove
	 * @returns The updated CardStorage
	 * @public
	 */
	remove(...cards: Array<Card>): CardStorage {
		for (const card of cards) {
			const index = this.#content.findIndex((storageCard) => storageCard.id === card.id);

			if (index > -1) {
				this.#content.splice(index, 1);
			}
		}

		return this;
	}

	/**
	 * Draws Cards from a given CardStorage. If the sender doesn't have enough Cards, a RangeError will be thrown and none of the Cards will move.
	 * @param {CardStorage} sender - The CardStorage from which draw Cards.
	 * @param {number} number - The number of cards to draw (default: 1)
	 * @returns The updated CardStorage
	 * @public
	 */
	drawFrom(sender: CardStorage, number: number = 1): CardStorage {
		if (sender.length < number) {
			throw new RangeError(
				`Not enough Cards to be drawn. CardStorage's length: ${sender.length}. Number wanted: ${number}`,
			);
		}

		for (let i = 0; i < number; i++) {
			sender.top.moveTo(this);
		}

		return this;
	}

	/**
	 * Empties a CardStorage by returning each of the cards previously stored in it to their default locations.
	 * @returns The updated CardStorage
	 * @public
	 */
	empty(): CardStorage {
		for (const card of this.#content) {
			card.return();
		}

		return this;
	}

	/**
	 * Shuffles the content of a CardStorage.
	 * @returns The updated CardStorage
	 * @public
	 */
	shuffle(): CardStorage {
		const initialContent = [...this.content];
		this.#content = [];

		while (initialContent.length > 0) {
			const randomIndex = Math.floor(Math.random() * initialContent.length);

			this.add(...initialContent.splice(randomIndex, 1));
		}

		return this;
	}
}

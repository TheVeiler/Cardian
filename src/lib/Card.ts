import { Decklist, CardStorage } from "./";

export interface PseudoCard {
	name?: string;
	copies?: number;
	assets?: {
		front?: URL;
		back?: URL;
	};
}

/**
 * The core element of this library. It represents a real world card.
 * @constructor
 * @param {Decklist} decklist - The Decklist the Card is part of
 * @param {PseudoCard} pseudoCard - The blueprint of the Card
 */
export class Card {
	/**
	 * The list of all existing Cards.
	 * @type {Array<Card>}
	 * @private
	 */
	static #list: Array<Card> = [];

	/**
	 * Gets a Card by its ID.
	 * @param {number} id - The ID of the Card
	 * @returns The Card or undefined if ID didn't match
	 * @public
	 */
	static getById(id: number): Card {
		return Card.#list.find((card) => card.id === id);
	}

	/**
	 * Adds a new Card to the list of existing ones.
	 * @param {Card} card - The Card to add
	 * @private
	 */
	static #add(card: Card) {
		Card.#list.push(card);
	}

	#id: number;
	/**
	 * The ID of a Card.
	 * @type {number}
	 * @readonly
	 */
	get id() {
		return this.#id;
	}

	#name: string;
	/**
	 * The name of a Card.
	 * @type {string}
	 * @readonly
	 */
	get name() {
		return this.#name;
	}

	/**
	 * The Decklist a Card comes from.
	 * @type {Decklist}
	 * @private
	 */
	#decklist: Decklist;

	#location: CardStorage;
	/**
	 * The current location of a Card.
	 * @type {CardStorage}
	 * @readonly
	 */
	get location() {
		return this.#location;
	}
	set location(destination: CardStorage) {
		this.location.remove(this);

		this.#location = destination;
		destination.add(this);
	}

	#images = {
		back: undefined,
		front: undefined,
	};
	/**
	 * The image sources of a Card.
	 * @type {Object}
	 * @readonly
	 */
	get images() {
		return this.#images;
	}

	constructor(deckList: Decklist, pseudoCard: PseudoCard) {
		this.#name = pseudoCard.name;

		this.#decklist = deckList;
		this.#location = deckList.defaultStorage;
		this.#location.add(this);

		this.#images.front = pseudoCard.assets?.front ?? "";
		this.#images.back = pseudoCard.assets?.back ?? "";

		this.#id = Card.#list.length + 1;
		Card.#add(this);
	}

	/**
	 * Moves a Card to the given CardStorage.
	 * @param {CardStorage} destination - The CardStorage the Card moves to
	 * @returns The updated Card
	 * @public
	 */
	moveTo(destination: CardStorage): Card {
		this.location = destination;

		return this;
	}

	/**
	 * Returns a Card to its default CardStorage.
	 * @returns The updated Card
	 * @public
	 */
	return(): Card {
		this.location = this.#decklist.defaultStorage;

		return this;
	}

	/**
	 * Returns a string representation of an object.
	 */
	toString(): string {
		return this.name;
	}
}

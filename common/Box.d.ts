import { Card } from "/common";
type Position = "top" | "bottom";
/**
 * A Box is an ordered pile of Cards that can be used to represent hands, boards, and discard piles.
 * @constructor
 * @param {string} name - The name of the Box; Be careful when using names as identifiers as they are not required to be unique
 */
export declare class Box {
    #private;
    /**
     * Gets all the currently existing Boxes.
     * @returns All the currently existing Boxes
     * @public
     */
    static all(): Box[];
    /**
     * Gets a Box by its name.
     * @param {string} name - The name of the Box; Be careful when using names as identifiers as they are not required to be unique
     * @returns The Box instance, or undefined if name didn't match
     * @public
     */
    static getByName(name: string): Box | undefined;
    /**
     * The name of a Box. Be careful when using names as identifiers as they are not required to be unique
     * @type {string}
     * @readonly
     */
    get name(): string;
    /**
     * All the Cards stored in a Box.
     * @type {Array<Card>}
     * @readonly
     */
    get content(): Card[];
    /**
     * The number of Cards stored in a Box.
     * @type {number}
     * @readonly
     */
    get size(): number;
    /**
     * The Card stored at the beginning of a Box.
     * @type {Card}
     * @readonly
     */
    get top(): Card;
    /**
     * The Card stored at the end of a Box.
     * @type {Card}
     * @readonly
     */
    get bottom(): Card;
    /**
     * Adds Cards to a Box.
     * @param {Array<Cards>} cards - The Cards to add to the Box
     * @returns The updated Box
     * @public
     */
    addCards(...cards: Array<Card>): Box;
    /**
     * Adds Cards to a Box, at given position.
     * @param {"top" | "bottom"} position - The position at which to insert the Cards (default: "bottom")
     * @param {Array<Cards>} cards - The Cards to add
     * @returns The updated Box
     * @public
     */
    addCards(position: Position, ...cards: Array<Card>): Box;
    /**
     * Removes Cards from a Box by returning them to their default location.
     * @param {Array<Cards>} cards - The Cards to remove
     * @returns The updated Box
     * @public
     */
    removeCards(...cards: Array<Card>): Box;
    /**
     * Draws Cards from a given Box. If the Box doesn't have enough Cards, a RangeError will be thrown and none of the Cards will move.
     * @param {Box} box - The Box from which draw Cards.
     * @param {number} number - The number of cards to draw (default: 1)
     * @returns The updated Box
     * @public
     */
    drawFrom(box: Box, number?: number): Box;
    /**
     * Empties a Box by returning each of the cards previously stored in it to their default locations.
     * @returns The updated Box
     * @public
     */
    empty(): Box;
    /**
     * Shuffles the content of a Box.
     * @returns The updated Box
     * @public
     */
    shuffle(): Box;
    constructor(name: string);
    get [Symbol.toStringTag](): string;
}
export {};
//# sourceMappingURL=Box.d.ts.map
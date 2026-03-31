import type { Position, PseudoCard } from "/types";
import { List, Box } from "/common";
/**
 * The core element of this library. It represents a real world card.
 * @constructor
 * @param {List} List - The List the Card is part of
 * @param {PseudoCard} pseudoCard - The blueprint of the Card
 */
export declare class Card {
    #private;
    /**
     * Gets a Card by its ID.
     * @param {number} id - The ID of the Card
     * @returns The Card or undefined if ID didn't match
     * @public
     */
    static getById(id: number): Card | undefined;
    /**
     * The ID of a Card.
     * @type {number}
     * @readonly
     */
    get id(): number;
    /**
     * The name of a Card.
     * @type {string}
     * @readonly
     */
    get name(): string;
    /**
     * The current location of a Card.
     * @type {Box}
     * @readonly
     */
    get location(): Box;
    /**
     * The image sources of a Card.
     * @type {Object}
     * @readonly
     */
    get images(): {
        back?: URL;
        front?: URL;
    };
    get onMoveStart(): (origin?: Box, destination?: Box) => void;
    set onMoveStart(callback: (origin?: Box, destination?: Box) => void);
    get onMoveEnd(): (origin?: Box, destination?: Box) => void;
    set onMoveEnd(callback: (origin?: Box, destination?: Box) => void);
    /**
     * Moves a Card to the given Box.
     * @param {Box} destination - The Box the Card moves to
     * @returns The updated Card
     * @public
     */
    moveTo(destination: Box, position?: Position): Card;
    /**
     * Returns a Card to its default Box.
     * @returns The updated Card
     * @public
     */
    return(): Card;
    constructor(List: List, pseudoCard: PseudoCard);
    get [Symbol.toStringTag](): string;
}
//# sourceMappingURL=Card.d.ts.map
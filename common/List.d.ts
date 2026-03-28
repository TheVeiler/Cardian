import type { Box, Card, PseudoCard } from "/common";
/**
 * A List is a complete collection of Cards.
 * @constructor
 * @param {Array<PseudoCard>} pseudoCards - All the Cards' blueprints to populate the List with
 * @public
 */
export declare class List extends Array<Card> {
    #private;
    /**
     * The default location of all of a List's Cards.
     * @type {Box}
     * @public
     */
    get mainBox(): Box;
    set mainBox(storage: Box);
    /**
     * Adds Cards to a List using blueprints.
     * @param {Array<PseudoCard>} pseudoCards - All the Cards' blueprints to populate the List with
     * @returns The updated List
     * @public
     */
    add(...pseudoCards: Array<PseudoCard>): List;
    /**
     * Returns every Cards of a List to their default Box.
     * @returns The updated List
     * @public
     */
    reset(): List;
    /**
     * Checks and fixes a List's Cards' locations
     * @returns The updated List
     * @public
     */
    fixLocations(): List;
    constructor(pseudoCards: Array<PseudoCard>);
}
//# sourceMappingURL=List.d.ts.map
import type { CardRank, CardSuit, PseudoCard } from "/types";
import { Card } from "/common";
import { List } from "/holdem";
declare class HECard extends Card {
    #private;
    get rank(): CardRank;
    get suit(): CardSuit;
    constructor(decklist: List, pseudoCard: PseudoCard);
}
export { HECard as Card };
//# sourceMappingURL=Card.d.ts.map
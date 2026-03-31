import type { PseudoCard, CardRank, CardScore } from "/types";
import { Card } from "/common";
import { List } from "/blackjack";
declare class BJCard extends Card {
    #private;
    get rank(): CardRank;
    get value(): CardScore;
    constructor(decklist: List, pseudoCard: PseudoCard);
}
export { BJCard as Card };
//# sourceMappingURL=Card.d.ts.map
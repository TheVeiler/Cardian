import type * as types from "/types";
import * as common from "/common";
import * as blackjack from "/blackjack";
import * as holdem from "/holdem";
export interface IComponents {
    Card: Card;
    Box: Box;
    List: List;
}
export type Card = typeof common.Card | typeof blackjack.Card | typeof holdem.Card;
export type Box = typeof common.Box | typeof blackjack.Box | typeof holdem.Box;
export type List = typeof common.List | typeof blackjack.List | typeof holdem.List;
declare class Cardian {
    #private;
    static singleton: boolean;
    get Card(): Card;
    get Box(): Box;
    get List(): List;
    get standard52(): types.PseudoCard[];
    get standard52_sextet(): types.PseudoCard[];
    constructor();
    setMode(mode?: types.Mode): void;
}
declare const _default: Cardian;
export default _default;
//# sourceMappingURL=Cardian.d.ts.map
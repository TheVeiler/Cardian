import * as common from "/common";
import * as blackjack from "/blackjack";
type Card = typeof common.Card | typeof blackjack.Card;
type Box = typeof common.Box | typeof blackjack.Box;
type List = typeof common.List | typeof blackjack.List;
type Mode = "none" | "blackjack";
declare class Cardian {
    #private;
    static singleton: boolean;
    get Card(): Card;
    get Box(): Box;
    get List(): List;
    get standard52(): common.PseudoCard[];
    get standard52_sextet(): common.PseudoCard[];
    constructor();
    setMode(mode?: Mode): void;
}
declare const _default: Cardian;
export default _default;
//# sourceMappingURL=Cardian.d.ts.map
export type CardScore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type CardRank = "A" | "K" | "Q" | "J" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2";
export type CardSuit = "♣" | "♦" | "♥" | "♠";
export type CardName = `${CardRank}${CardSuit}`;
export type Position = "top" | "bottom";
export interface PseudoCard {
    name?: string;
    copies?: number;
    assets?: {
        front?: URL;
        back?: URL;
    };
}
export type Mode = "none" | "blackjack" | "holdem";
//# sourceMappingURL=index.d.ts.map
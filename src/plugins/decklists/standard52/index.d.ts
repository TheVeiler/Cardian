export type CardValue =
	| "A"
	| "K"
	| "Q"
	| "J"
	| "10"
	| "9"
	| "8"
	| "7"
	| "6"
	| "5"
	| "4"
	| "3"
	| "2";
export type CardSuit = "♣" | "♦" | "♥" | "♠";
export type CardName = `${CardValue}${CardSuit}`;
